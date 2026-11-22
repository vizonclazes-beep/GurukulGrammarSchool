// src/shaders/hologramShader.js — Holographic display material with scanlines and flicker
import * as THREE from 'three';

/**
 * Creates a hologram ShaderMaterial.
 * @param {Object} globalUniforms - Shared global uniforms
 * @param {Object} [opts] - Customization options
 * @param {THREE.Color|number} [opts.color=0x00e5ff] - Base hologram color
 * @param {number} [opts.opacity=0.7] - Base opacity
 * @param {number} [opts.scanlineSpeed=2.0] - Scanline scroll speed
 * @param {number} [opts.scanlineDensity=80.0] - Number of scanlines
 * @param {number} [opts.flickerSpeed=8.0] - Flicker frequency
 * @param {boolean} [opts.doubleSide=true] - Whether to render both sides
 * @returns {THREE.ShaderMaterial}
 */
export function createHologramMaterial(globalUniforms, opts = {}) {
  const baseColor = opts.color !== undefined
    ? (opts.color instanceof THREE.Color ? opts.color : new THREE.Color(opts.color))
    : new THREE.Color(0x00e5ff);

  const uniforms = {
    uTime:           globalUniforms.uTime,
    uColor:          { value: baseColor },
    uOpacity:        { value: opts.opacity ?? 0.7 },
    uScanlineSpeed:  { value: opts.scanlineSpeed ?? 2.0 },
    uScanlineDensity:{ value: opts.scanlineDensity ?? 80.0 },
    uFlickerSpeed:   { value: opts.flickerSpeed ?? 8.0 },
  };

  return new THREE.ShaderMaterial({
    uniforms,
    vertexShader: /* glsl */ `
      varying vec3 vPosition;
      varying vec3 vNormal;
      varying vec2 vUv;
      varying vec3 vWorldPosition;

      void main() {
        vPosition = position;
        vNormal = normalize(normalMatrix * normal);
        vUv = uv;
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vWorldPosition = wp.xyz;
        gl_Position = projectionMatrix * viewMatrix * wp;
      }
    `,
    fragmentShader: /* glsl */ `
      precision highp float;

      uniform float uTime;
      uniform vec3 uColor;
      uniform float uOpacity;
      uniform float uScanlineSpeed;
      uniform float uScanlineDensity;
      uniform float uFlickerSpeed;

      varying vec3 vPosition;
      varying vec3 vNormal;
      varying vec2 vUv;
      varying vec3 vWorldPosition;

      float random(vec2 st) {
        return fract(sin(dot(st, vec2(12.9898, 78.233))) * 43758.5453123);
      }

      void main() {
        // Scanlines
        float scanline = sin((vWorldPosition.y + uTime * uScanlineSpeed) * uScanlineDensity) * 0.5 + 0.5;
        scanline = smoothstep(0.3, 0.7, scanline);

        // Flicker
        float flicker = 0.95 + 0.05 * sin(uTime * uFlickerSpeed);
        flicker *= 0.97 + 0.03 * sin(uTime * uFlickerSpeed * 3.17);

        // Fresnel edge glow
        float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.0);

        // Noise grain
        float grain = random(vUv + uTime * 0.01) * 0.08;

        // Composite color
        vec3 col = uColor * (0.6 + 0.4 * scanline);
        col += uColor * fresnel * 0.5;
        col += grain;
        col *= flicker;

        // Holographic edge highlight
        col += vec3(1.0) * pow(fresnel, 4.0) * 0.3;

        float alpha = uOpacity * (0.5 + 0.5 * scanline) * flicker;
        alpha = clamp(alpha, 0.0, 1.0);

        gl_FragColor = vec4(col, alpha);
      }
    `,
    transparent: true,
    side: opts.doubleSide !== false ? THREE.DoubleSide : THREE.FrontSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
}
