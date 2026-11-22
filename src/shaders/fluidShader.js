// src/shaders/fluidShader.js — Convection fluid material for liquid simulation
import * as THREE from 'three';

/**
 * Creates a ShaderMaterial simulating heated convecting fluid.
 * @param {Object} globalUniforms - Shared global uniforms
 * @param {Object} [opts] - Configuration
 * @param {THREE.Color|number} [opts.color=0x3366ff] - Base fluid color
 * @param {THREE.Color|number} [opts.hotColor=0xff4400] - Hot convection color
 * @param {number} [opts.viscosity=1.0] - Flow speed factor
 * @param {number} [opts.opacity=0.75] - Base opacity
 * @returns {{ material: THREE.ShaderMaterial, uniforms: Object }}
 */
export function createConvectionFluid(globalUniforms, opts = {}) {
  const baseColor = opts.color !== undefined
    ? (opts.color instanceof THREE.Color ? opts.color : new THREE.Color(opts.color))
    : new THREE.Color(0x3366ff);
  const hotColor = opts.hotColor !== undefined
    ? (opts.hotColor instanceof THREE.Color ? opts.hotColor : new THREE.Color(opts.hotColor))
    : new THREE.Color(0xff4400);

  const uniforms = {
    uTime:      globalUniforms.uTime,
    uBaseColor: { value: baseColor },
    uHotColor:  { value: hotColor },
    uViscosity: { value: opts.viscosity ?? 1.0 },
    uOpacity:   { value: opts.opacity ?? 0.75 },
    uReaction:  { value: 0.0 }, // 0..1 for titration / reaction level
  };

  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: /* glsl */ `
      varying vec3 vPosition;
      varying vec3 vNormal;
      varying vec2 vUv;

      void main() {
        vPosition = position;
        vNormal = normalize(normalMatrix * normal);
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      precision highp float;

      uniform float uTime;
      uniform vec3 uBaseColor;
      uniform vec3 uHotColor;
      uniform float uViscosity;
      uniform float uOpacity;
      uniform float uReaction;

      varying vec3 vPosition;
      varying vec3 vNormal;
      varying vec2 vUv;

      vec3 hash33(vec3 p) {
        p = vec3(
          dot(p, vec3(127.1, 311.7, 74.7)),
          dot(p, vec3(269.5, 183.3, 246.1)),
          dot(p, vec3(113.5, 271.9, 124.6))
        );
        return -1.0 + 2.0 * fract(sin(p) * 43758.5453);
      }

      float noise(vec3 p) {
        vec3 i = floor(p);
        vec3 f = fract(p);
        vec3 u = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(
            mix(dot(hash33(i), f),
                dot(hash33(i + vec3(1,0,0)), f - vec3(1,0,0)), u.x),
            mix(dot(hash33(i + vec3(0,1,0)), f - vec3(0,1,0)),
                dot(hash33(i + vec3(1,1,0)), f - vec3(1,1,0)), u.x),
            u.y),
          mix(
            mix(dot(hash33(i + vec3(0,0,1)), f - vec3(0,0,1)),
                dot(hash33(i + vec3(1,0,1)), f - vec3(1,0,1)), u.x),
            mix(dot(hash33(i + vec3(0,1,1)), f - vec3(0,1,1)),
                dot(hash33(i + vec3(1,1,1)), f - vec3(1,1,1)), u.x),
            u.y),
          u.z);
      }

      void main() {
        float t = uTime * uViscosity * 0.3;

        // Convection cells
        vec3 p = vPosition * 3.0;
        float n1 = noise(p + vec3(0.0, t, 0.0));
        float n2 = noise(p * 2.0 + vec3(t * 0.5, 0.0, t * 0.3));

        // Rising heat columns
        float convection = smoothstep(-0.2, 0.6, n1 + n2 * 0.5);

        // Color blend based on convection and reaction level
        vec3 reactionColor = mix(uBaseColor, uHotColor, uReaction);
        vec3 col = mix(reactionColor, uHotColor, convection * 0.5);

        // Subsurface glow at base
        float baseGlow = smoothstep(0.3, -0.5, vPosition.y) * 0.3;
        col += uHotColor * baseGlow * (0.5 + uReaction);

        // Fresnel rim for liquid surface feel
        float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.5);
        col += vec3(0.2, 0.4, 0.6) * fresnel * 0.2;

        float alpha = uOpacity * (0.7 + convection * 0.3);

        gl_FragColor = vec4(col, alpha);
      }
    `,
    transparent: true,
    side: THREE.FrontSide,
    depthWrite: false,
  });

  return { material, uniforms };
}
