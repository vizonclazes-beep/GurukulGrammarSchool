// src/shaders/flameShader.js — Realistic procedural volumetric Bunsen burner flame shader
import * as THREE from 'three';

/**
 * Creates the volumetric procedural flame ShaderMaterial for the Bunsen burner.
 * Features:
 * - Dual-zone inner reducing cone & outer turbulent flame envelope
 * - Procedural vertical simplex noise turbulence rising with time
 * - Clamped luminance to strictly prevent post-processing bloom numeric overflow
 * - Smooth color interpolation between element emission spectra
 * - 50–60Hz realistic combustion jitter
 * @param {Object} globalUniforms
 * @param {Object} [opts]
 * @returns {{ material: THREE.ShaderMaterial, uniforms: Object }}
 */
export function createFlameMaterial(globalUniforms, opts = {}) {
  const uniforms = {
    uTime: globalUniforms.uTime,
    uFlameMode: { value: opts.flameMode ?? 1.0 }, // 0.0 = Safety yellow flame, 1.0 = Roaring heating flame
    uColorOuter: { value: new THREE.Color(opts.colorOuter ?? 0x0077ff) },
    uColorInner: { value: new THREE.Color(opts.colorInner ?? 0x66ffff) },
    uColorTip: { value: new THREE.Color(opts.colorTip ?? 0x0033aa) },
    uFlicker: { value: 1.0 },
    uHeightScale: { value: 1.0 },
    uTurbulence: { value: 1.1 },
    uIntensity: { value: opts.intensity ?? 1.4 },
  };

  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: /* glsl */ `
      uniform float uTime;
      uniform float uFlameMode;
      uniform float uHeightScale;
      uniform float uTurbulence;

      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPosition;

      // 3D Simplex-like noise helper
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

      float snoise(vec3 v) {
        const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

        vec3 i  = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);

        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);

        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;

        i = mod289(i);
        vec4 p = permute(permute(permute(
                  i.z + vec4(0.0, i1.z, i2.z, 1.0))
                + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                + i.x + vec4(0.0, i1.x, i2.x, 1.0));

        float n_ = 0.142857142857;
        vec3  ns = n_ * D.wyz - D.xzx;

        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_);

        vec4 x = x_ * ns.x + ns.yyyy;
        vec4 y = y_ * ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);

        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);

        vec4 s0 = floor(b0) * 2.0 + 1.0;
        vec4 s1 = floor(b1) * 2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));

        vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

        vec3 p0 = vec3(a0.xy, h.x);
        vec3 p1 = vec3(a0.zw, h.y);
        vec3 p2 = vec3(a1.xy, h.z);
        vec3 p3 = vec3(a1.zw, h.w);

        vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
        p0 *= norm.x;
        p1 *= norm.y;
        p2 *= norm.z;
        p3 *= norm.w;

        vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
        m = m * m;
        return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
      }

      void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);

        float h = uv.y;
        float speed = mix(2.2, 4.0, uFlameMode);
        vec3 noiseCoord = vec3(position.x * 3.5, position.y * 2.5 - uTime * speed, position.z * 3.5);
        float n = snoise(noiseCoord) * uTurbulence;

        float sway = sin(uTime * 3.0 + h * 4.0) * (1.0 - uFlameMode) * 0.05;

        vec3 pos = position;
        pos.y *= uHeightScale;
        pos.x += n * 0.10 * h + sway;
        pos.z += snoise(noiseCoord + 43.12) * 0.10 * h;

        vPosition = pos;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      precision highp float;

      uniform float uTime;
      uniform float uFlameMode;
      uniform vec3 uColorOuter;
      uniform vec3 uColorInner;
      uniform vec3 uColorTip;
      uniform float uFlicker;
      uniform float uIntensity;

      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPosition;

      void main() {
        float y = vUv.y;
        float r = length(vUv - vec2(0.5, y));

        // Radial falloff: hottest at axis, transparent at perimeter
        float radialAlpha = smoothstep(0.48, 0.05, r * 2.0);

        // Vertical gradient
        float coreCone = smoothstep(0.50, 0.05, y) * smoothstep(0.35, 0.0, r * 2.0);
        float tipFlame = smoothstep(0.65, 1.0, y);

        // Base color blending
        vec3 col = mix(uColorInner, uColorOuter, smoothstep(0.1, 0.7, y + r));
        col = mix(col, uColorTip, tipFlame * 0.6);

        // Inner hot core
        col += uColorInner * coreCone * 0.8;

        // Combustion jitter
        float jitter = 0.96 + 0.04 * sin(uTime * 48.0) * sin(uTime * 64.0 + 1.3);
        col *= jitter * uFlicker * uIntensity;

        // Soft Fresnel edge
        float edgeGlow = pow(1.0 - abs(vNormal.z), 1.6) * 0.35;
        col += uColorOuter * edgeGlow;

        // Clamp to strictly prevent bloom blowout / NaN overflow
        col = clamp(col, 0.0, 1.85);

        // Vertical alpha taper
        float alpha = radialAlpha * (1.0 - pow(y, 2.5)) * jitter;
        alpha = clamp(alpha * 1.1, 0.0, 0.92);

        if (alpha < 0.015) discard;

        gl_FragColor = vec4(col, alpha);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.FrontSide,
  });

  return { material, uniforms };
}
