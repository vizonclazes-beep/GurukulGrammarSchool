// src/shaders/particleShader.js — GPU-driven convection particles and welding sparks
import * as THREE from 'three';
import { registerShaderTick } from './shaderRegistry.js';

/**
 * Creates convection particles that rise within a container volume.
 * @param {Object} globalUniforms - Shared global uniforms
 * @param {Object} [opts] - Configuration
 * @param {THREE.Vector3} [opts.origin] - Center of emission volume
 * @param {number} [opts.count=150] - Number of particles
 * @param {number} [opts.radius=0.8] - Emission cylinder radius
 * @param {number} [opts.height=2.0] - Emission cylinder height
 * @param {THREE.Color|number} [opts.color=0x00e5ff] - Particle color
 * @returns {{ points: THREE.Points, uniforms: Object }}
 */
export function createConvectionParticles(globalUniforms, opts = {}) {
  const count  = opts.count  ?? 150;
  const radius = opts.radius ?? 0.8;
  const height = opts.height ?? 2.0;
  const origin = opts.origin ?? new THREE.Vector3(0, 0, 0);
  const color  = opts.color !== undefined
    ? (opts.color instanceof THREE.Color ? opts.color : new THREE.Color(opts.color))
    : new THREE.Color(0x00e5ff);

  const positions = new Float32Array(count * 3);
  const randoms   = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const r = Math.random() * radius;
    positions[i * 3]     = Math.cos(angle) * r;
    positions[i * 3 + 1] = Math.random() * height;
    positions[i * 3 + 2] = Math.sin(angle) * r;

    randoms[i * 3]     = Math.random();
    randoms[i * 3 + 1] = Math.random();
    randoms[i * 3 + 2] = Math.random();
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('aRandom',  new THREE.BufferAttribute(randoms, 3));

  const uniforms = {
    uTime:   globalUniforms.uTime,
    uColor:  { value: color },
    uHeight: { value: height },
    uOrigin: { value: origin.clone() },
  };

  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: /* glsl */ `
      attribute vec3 aRandom;
      uniform float uTime;
      uniform float uHeight;
      uniform vec3 uOrigin;

      varying float vAlpha;

      void main() {
        vec3 pos = position;

        // Rise with individual speed
        float speed = 0.2 + aRandom.x * 0.4;
        pos.y = mod(pos.y + uTime * speed, uHeight);

        // Gentle drift
        pos.x += sin(uTime * 0.5 + aRandom.y * 6.28) * 0.05;
        pos.z += cos(uTime * 0.4 + aRandom.z * 6.28) * 0.05;

        // Offset to world origin
        pos += uOrigin;

        // Fade at top and bottom
        float normalizedY = pos.y / uHeight;
        vAlpha = smoothstep(0.0, 0.1, normalizedY) * smoothstep(1.0, 0.8, normalizedY);
        vAlpha *= 0.4 + 0.6 * aRandom.x;

        vec4 mvp = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        gl_Position = mvp;
        gl_PointSize = (2.0 + aRandom.y * 3.0) * (300.0 / -mvp.z);
      }
    `,
    fragmentShader: /* glsl */ `
      precision highp float;
      uniform vec3 uColor;
      varying float vAlpha;

      void main() {
        float d = length(gl_PointCoord - 0.5) * 2.0;
        float circle = smoothstep(1.0, 0.3, d);
        gl_FragColor = vec4(uColor, circle * vAlpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const points = new THREE.Points(geometry, material);
  return { points, uniforms };
}

/**
 * Creates welding spark particles bursting from a point.
 * @param {Object} globalUniforms - Shared global uniforms
 * @param {Object} [opts] - Configuration
 * @param {THREE.Vector3} [opts.origin] - Spark emission point
 * @param {number} [opts.count=200] - Number of spark particles
 * @returns {{ points: THREE.Points, uniforms: Object }}
 */
export function createWeldingSparks(globalUniforms, opts = {}) {
  const count  = opts.count  ?? 200;
  const origin = opts.origin ?? new THREE.Vector3(0, 0, 0);

  const positions  = new Float32Array(count * 3);
  const velocities = new Float32Array(count * 3);
  const lifetimes  = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    // Start at origin
    positions[i * 3]     = 0;
    positions[i * 3 + 1] = 0;
    positions[i * 3 + 2] = 0;

    // Random burst velocity
    const theta = Math.random() * Math.PI * 2;
    const phi   = Math.random() * Math.PI * 0.6; // upward bias
    const speed = 1.0 + Math.random() * 3.0;
    velocities[i * 3]     = Math.sin(phi) * Math.cos(theta) * speed;
    velocities[i * 3 + 1] = Math.cos(phi) * speed;
    velocities[i * 3 + 2] = Math.sin(phi) * Math.sin(theta) * speed;

    lifetimes[i] = Math.random(); // phase offset
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position',  new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('aVelocity', new THREE.BufferAttribute(velocities, 3));
  geometry.setAttribute('aLifetime', new THREE.BufferAttribute(lifetimes, 1));

  const uniforms = {
    uTime:   globalUniforms.uTime,
    uOrigin: { value: origin.clone() },
  };

  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: /* glsl */ `
      attribute vec3 aVelocity;
      attribute float aLifetime;
      uniform float uTime;
      uniform vec3 uOrigin;

      varying float vAlpha;
      varying float vHeat;

      void main() {
        float cycle = 0.6; // seconds per spark life
        float t = mod(uTime + aLifetime * cycle, cycle) / cycle;

        // Position: ballistic with gravity
        vec3 pos = uOrigin + aVelocity * t - vec3(0.0, 4.9 * t * t, 0.0);

        vAlpha = (1.0 - t) * (1.0 - t); // fade out
        vHeat = 1.0 - t; // hot → cool

        vec4 mvp = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        gl_Position = mvp;
        gl_PointSize = max(1.0, (1.5 + vHeat * 2.0) * (200.0 / -mvp.z));
      }
    `,
    fragmentShader: /* glsl */ `
      precision highp float;
      varying float vAlpha;
      varying float vHeat;

      void main() {
        float d = length(gl_PointCoord - 0.5) * 2.0;
        if (d > 1.0) discard;

        // Hot white → orange → red
        vec3 col = mix(vec3(1.0, 0.3, 0.05), vec3(1.0, 0.95, 0.8), vHeat);
        float glow = exp(-d * d * 3.0);

        gl_FragColor = vec4(col * (1.0 + glow), vAlpha * glow);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const points = new THREE.Points(geometry, material);
  return { points, uniforms };
}
