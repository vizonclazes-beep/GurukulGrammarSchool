// src/shaders/plasmaShader.js — Realistic Volumetric Plasma Arc & Filament Shader Pipeline
import * as THREE from 'three';

/**
 * Creates the camera-facing billboard ShaderMaterial for high-energy plasma filaments.
 * Features:
 * - White-hot central electric thread (luminance > 4.0 for selective bloom)
 * - Intense cyan inner gas discharge channel
 * - Radiant ultraviolet / magenta corona fringe
 * - Longitudinal high-speed traveling charge pulses
 * - 60Hz stochastic electrical crackle / micro-flicker
 * @param {Object} globalUniforms
 * @param {Object} [opts]
 * @returns {{ material: THREE.ShaderMaterial, uniforms: Object }}
 */
export function createPlasmaFilamentMaterial(globalUniforms, opts = {}) {
  const uniforms = {
    uTime:        globalUniforms.uTime,
    uResolution:  globalUniforms.uResolution,
    uVoltage:     { value: opts.voltage ?? 0.65 },
    uWidth:       { value: opts.width ?? 0.042 },
    uColorCore:   { value: new THREE.Color(0xffffff) },
    uColorCyan:   { value: new THREE.Color(0x00f5ff) },
    uColorViolet: { value: new THREE.Color(0xb5179e) },
    uColorDeep:   { value: new THREE.Color(0x7209b7) },
  };

  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: /* glsl */ `
      attribute float aSide;       // -1.0 for left edge, +1.0 for right edge
      attribute float aProgress;   // 0.0 at electrode to 1.0 at glass
      attribute vec3  aTangent;    // Direction vector along arc segment
      attribute float aFilamentId; // Unique ID per filament for de-synchronized flicker

      uniform float uTime;
      uniform float uVoltage;
      uniform float uWidth;

      varying float vSide;
      varying float vProgress;
      varying float vFilamentId;

      void main() {
        vSide = aSide;
        vProgress = aProgress;
        vFilamentId = aFilamentId;

        vec3 t = aTangent;
        if (length(t) < 0.0001) {
          t = vec3(0.0, 1.0, 0.0);
        }

        vec3 worldPos = (modelMatrix * vec4(position, 1.0)).xyz;
        vec3 worldTangent = normalize((modelMatrix * vec4(t, 0.0)).xyz);
        vec3 viewDir = normalize(cameraPosition - worldPos);

        vec3 billboardPerp = cross(worldTangent, viewDir);
        if (length(billboardPerp) < 0.0001) {
          billboardPerp = vec3(0.0, 1.0, 0.0);
        } else {
          billboardPerp = normalize(billboardPerp);
        }

        // Width tapers at the electrode contact and expands slightly towards the glass
        float widthFactor = (0.75 + 0.5 * sin(aProgress * 3.14159)) * (0.85 + uVoltage * 0.45);
        float width = uWidth * widthFactor;

        // High-frequency electrical micro-jitter (crackle)
        float jitterPhase = uTime * 45.0 + aFilamentId * 17.3 + aProgress * 25.0;
        vec3 jitter = billboardPerp * (sin(jitterPhase) * 0.006 * uVoltage);

        vec3 expandedWorldPos = worldPos + billboardPerp * (aSide * width) + jitter;

        gl_Position = projectionMatrix * viewMatrix * vec4(expandedWorldPos, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      precision highp float;

      uniform float uTime;
      uniform float uVoltage;
      uniform vec3  uColorCore;
      uniform vec3  uColorCyan;
      uniform vec3  uColorViolet;
      uniform vec3  uColorDeep;

      varying float vSide;
      varying float vProgress;
      varying float vFilamentId;

      void main() {
        float distFromCenter = abs(vSide); // 0.0 at center line, 1.0 at outer edge

        // 1. Ultra-intense white-hot central core (luminance > 4.0 to cleanly hit bloom threshold)
        float core = exp(-distFromCenter * distFromCenter * 28.0);

        // 2. High-energy electric cyan ionization channel
        float innerGlow = exp(-distFromCenter * distFromCenter * 6.0);

        // 3. Radiant noble gas ultraviolet/magenta corona fringe
        float outerCorona = exp(-distFromCenter * 2.2);

        // 4. Longitudinal traveling charge pulse (electrons streaming to the glass)
        float pulseSpeed = 28.0 + uVoltage * 20.0;
        float pulse = 0.85 + 0.25 * sin(vProgress * 36.0 - uTime * pulseSpeed + vFilamentId * 4.7);

        // 5. High-frequency stochastic micro-flicker (20kHz AC Tesla discharge simulation)
        float flicker = 0.88 + 0.15 * fract(sin(uTime * 85.0 + vFilamentId * 31.7) * 43758.5453);

        // Composite multi-spectrum color gradient
        vec3 col = uColorCore * core * (4.2 + uVoltage * 2.5);
        col += uColorCyan * innerGlow * (2.8 + uVoltage * 1.8);
        col += mix(uColorViolet, uColorDeep, vProgress) * outerCorona * (1.8 + uVoltage * 1.2);

        // Modulate by dynamic electrical pulses
        col *= pulse * flicker;

        float alpha = clamp(core * 1.5 + innerGlow * 1.0 + outerCorona * 0.5, 0.0, 1.0);

        gl_FragColor = vec4(col, alpha);
      }
    `,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  return { material, uniforms };
}

/**
 * Creates the soft ionized noble gas volumetric haze inside the plasma sphere.
 * Provides subtle ambient glow with Rayleigh-like Fresnel edge scattering.
 */
export function createNobleGasHazeMaterial(globalUniforms) {
  const uniforms = {
    uTime:     globalUniforms.uTime,
    uVoltage:  { value: 0.65 },
    uColorGas: { value: new THREE.Color(0x00b4d8) },
    uColorRim: { value: new THREE.Color(0x7209b7) },
  };

  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: /* glsl */ `
      varying vec3 vNormal;
      varying vec3 vViewPosition;

      void main() {
        vNormal = normalize(normalMatrix * normal);
        vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
        vViewPosition = -mvPos.xyz;
        gl_Position = projectionMatrix * mvPos;
      }
    `,
    fragmentShader: /* glsl */ `
      precision highp float;

      uniform float uTime;
      uniform float uVoltage;
      uniform vec3  uColorGas;
      uniform vec3  uColorRim;

      varying vec3 vNormal;
      varying vec3 vViewPosition;

      void main() {
        vec3 normal = normalize(vNormal);
        vec3 viewDir = normalize(vViewPosition);

        // Delicate inverted Fresnel: translucent center, subtly luminous rim
        float fresnel = pow(1.0 - abs(dot(normal, viewDir)), 2.6);
        float pulse = 0.9 + 0.1 * sin(uTime * 3.0);

        vec3 col = mix(uColorGas * 0.35, uColorRim * 0.75, fresnel) * (0.6 + uVoltage * 0.6) * pulse;
        float alpha = clamp(fresnel * (0.16 + uVoltage * 0.12) + 0.03, 0.0, 0.35);

        gl_FragColor = vec4(col, alpha);
      }
    `,
    transparent: true,
    side: THREE.BackSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  return { material, uniforms };
}

/**
 * Creates the glowing dielectric contact spot material where arcs touch the glass.
 */
export function createGlassContactSpotMaterial(globalUniforms) {
  const uniforms = {
    uTime:     globalUniforms.uTime,
    uVoltage:  { value: 0.65 },
    uColorSpot:{ value: new THREE.Color(0x00f5ff) },
    uColorHalo:{ value: new THREE.Color(0xd500f9) },
  };

  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      precision highp float;

      uniform float uTime;
      uniform float uVoltage;
      uniform vec3  uColorSpot;
      uniform vec3  uColorHalo;

      varying vec2 vUv;

      void main() {
        vec2 p = vUv * 2.0 - 1.0;
        float r = length(p);
        if (r > 1.0) discard;

        float core = exp(-r * r * 14.0);
        float halo = exp(-r * r * 3.0);

        vec3 col = vec3(1.0) * core * 3.5 + uColorSpot * core * 2.5 + uColorHalo * halo * 1.8;
        col *= (0.8 + uVoltage * 0.8);
        float alpha = clamp(core * 1.0 + halo * 0.6, 0.0, 1.0);

        gl_FragColor = vec4(col, alpha);
      }
    `,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  return { material, uniforms };
}

/**
 * Creates the high-voltage corona glow surrounding the central graphite electrode.
 */
export function createElectrodeCoronaMaterial(globalUniforms) {
  const uniforms = {
    uTime:    globalUniforms.uTime,
    uVoltage: { value: 0.65 },
  };

  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: /* glsl */ `
      varying vec3 vNormal;
      varying vec3 vViewPosition;

      void main() {
        vNormal = normalize(normalMatrix * normal);
        vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
        vViewPosition = -mvPos.xyz;
        gl_Position = projectionMatrix * mvPos;
      }
    `,
    fragmentShader: /* glsl */ `
      precision highp float;

      uniform float uTime;
      uniform float uVoltage;

      varying vec3 vNormal;
      varying vec3 vViewPosition;

      void main() {
        vec3 normal = normalize(vNormal);
        vec3 viewDir = normalize(vViewPosition);

        float fresnel = pow(1.0 - abs(dot(normal, viewDir)), 1.8);
        float pulse = 0.85 + 0.15 * sin(uTime * 14.0);

        vec3 col = mix(vec3(0.0, 0.9, 1.0), vec3(0.7, 0.1, 1.0), fresnel);
        col *= (2.0 + uVoltage * 2.5) * pulse;
        float alpha = clamp(fresnel * 0.75 + 0.25, 0.0, 1.0) * (0.6 + uVoltage * 0.4);

        gl_FragColor = vec4(col, alpha);
      }
    `,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  return { material, uniforms };
}

// Backwards compatibility export
export function createPlasmaMaterial(globalUniforms, opts = {}) {
  return createPlasmaFilamentMaterial(globalUniforms, opts);
}

export function updatePlasma(uniforms, elapsed, voltage) {
  if (uniforms.uVoltage) {
    uniforms.uVoltage.value = voltage;
  }
}
