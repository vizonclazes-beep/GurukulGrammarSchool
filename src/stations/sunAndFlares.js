// src/stations/sunAndFlares.js — Realistic Sun with Granulation, Sunspots, Coronal Loops & Solar Flares
import * as THREE from 'three';

/**
 * Creates the photorealistic Sun with convective granulation, active sunspot groups,
 * 3D coronal magnetic loops, dynamic solar flares, and chromospheric halo.
 * @param {THREE.Group} orreryGroup
 * @param {Object} globalUniforms
 * @returns {{ sunMesh: THREE.Mesh, update: Function, hitMesh: THREE.Mesh }}
 */
export function createSunAndFlares(orreryGroup, globalUniforms) {
  const sunRadius = 0.24;

  // ═════════════════════════════════════════════════════════
  // 1. PHOTOSPHERE WITH CONVECTIVE GRANULATION & SUNSPOTS SHADER
  // ═════════════════════════════════════════════════════════
  const sunUniforms = {
    uTime: globalUniforms.uTime,
    uGranulationScale: { value: 28.0 },
    uSunspotIntensity: { value: 1.0 },
    uLimbDarkening: { value: 0.65 },
  };

  const sunShaderMat = new THREE.ShaderMaterial({
    uniforms: sunUniforms,
    vertexShader: /* glsl */ `
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec2 vUv;
      varying vec3 vViewPosition;

      void main() {
        vNormal = normalize(normalMatrix * normal);
        vPosition = position;
        vUv = uv;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vViewPosition = -mvPosition.xyz;
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform float uTime;
      uniform float uGranulationScale;
      uniform float uSunspotIntensity;
      uniform float uLimbDarkening;

      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec2 vUv;
      varying vec3 vViewPosition;

      // ── GLSL 3D Simplex-Style Noise for Solar Convection ──
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

      float snoise(vec3 v) {
        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
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
        vec3 ns = n_ * D.wyz - D.xzx;
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_);
        vec4 x = x_ *ns.x + ns.yyyy;
        vec4 y = y_ *ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);
        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
        vec3 p0 = vec3(a0.xy, h.x);
        vec3 p1 = vec3(a0.zw, h.y);
        vec3 p2 = vec3(a1.xy, h.z);
        vec3 p3 = vec3(a1.zw, h.w);
        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
        p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
      }

      // Fractal Brownian Motion for turbulent granulation
      float fbm(vec3 p) {
        float total = 0.0;
        float amp = 0.55;
        float freq = 1.0;
        for (int i = 0; i < 4; i++) {
          total += snoise(p * freq) * amp;
          freq *= 2.15;
          amp *= 0.48;
        }
        return total;
      }

      // Procedural Sunspot Calculation with Umbra & Penumbra
      // Sunspots occur predominantly at solar active latitudes (+/- 15° to +/- 30°)
      float getSunspotMask(vec3 pos, vec3 center, float radius, out float penumbraMask) {
        float d = distance(pos, center);
        float umbra = smoothstep(radius * 0.45, radius * 0.25, d);
        penumbraMask = smoothstep(radius, radius * 0.4, d);
        return umbra;
      }

      void main() {
        vec3 norm = normalize(vNormal);
        vec3 viewDir = normalize(vViewPosition);

        // Slow differential solar rotation
        float rotAngle = uTime * 0.08;
        mat3 rotY = mat3(
          cos(rotAngle), 0.0, sin(rotAngle),
          0.0,           1.0, 0.0,
          -sin(rotAngle), 0.0, cos(rotAngle)
        );
        vec3 rotPos = rotY * normalize(vPosition);

        // 1. Convective Granulation (Boiling Plasma Convection Cells)
        vec3 noiseCoords = rotPos * uGranulationScale;
        float granTime = uTime * 0.35;
        float granulation = fbm(noiseCoords + vec3(0.0, granTime, 0.0));
        granulation = granulation * 0.5 + 0.5;

        // Base Photosphere Color Palette (T ~ 5,800 K)
        vec3 interGranularDark = vec3(0.92, 0.42, 0.04); // Deep orange convective lane
        vec3 granuleMid        = vec3(1.00, 0.76, 0.22); // Solar gold photosphere
        vec3 granuleCoreHot    = vec3(1.00, 0.98, 0.88); // Hot incandescent white-yellow cell center

        vec3 photoColor = mix(interGranularDark, granuleMid, smoothstep(0.3, 0.65, granulation));
        photoColor = mix(photoColor, granuleCoreHot, smoothstep(0.72, 0.95, granulation));

        // 2. Realistic Bipolar Sunspot Groups (Active Magnetic Regions)
        // Group A (Northern Active Latitude ~ +22°)
        vec3 spotCenterA1 = normalize(vec3(0.65, 0.36, 0.65));
        vec3 spotCenterA2 = normalize(vec3(0.78, 0.38, 0.52));
        vec3 spotCenterA3 = normalize(vec3(0.72, 0.34, 0.60));

        // Group B (Southern Active Latitude ~ -18°)
        vec3 spotCenterB1 = normalize(vec3(-0.62, -0.32, 0.70));
        vec3 spotCenterB2 = normalize(vec3(-0.52, -0.28, 0.80));

        // Group C (Equatorial Active Drift)
        vec3 spotCenterC1 = normalize(vec3(0.20, 0.15, -0.96));
        vec3 spotCenterC2 = normalize(vec3(0.32, 0.18, -0.92));

        float penA1, penA2, penA3, penB1, penB2, penC1, penC2;
        float umbA1 = getSunspotMask(rotPos, spotCenterA1, 0.12, penA1);
        float umbA2 = getSunspotMask(rotPos, spotCenterA2, 0.09, penA2);
        float umbA3 = getSunspotMask(rotPos, spotCenterA3, 0.06, penA3);
        float umbB1 = getSunspotMask(rotPos, spotCenterB1, 0.14, penB1);
        float umbB2 = getSunspotMask(rotPos, spotCenterB2, 0.08, penB2);
        float umbC1 = getSunspotMask(rotPos, spotCenterC1, 0.11, penC1);
        float umbC2 = getSunspotMask(rotPos, spotCenterC2, 0.07, penC2);

        float totalUmbra = clamp(umbA1 + umbA2 + umbA3 + umbB1 + umbB2 + umbC1 + umbC2, 0.0, 1.0);
        float totalPenumbra = clamp(penA1 + penA2 + penA3 + penB1 + penB2 + penC1 + penC2, 0.0, 1.0);

        // Magnetic Penumbral Striations (Radial filaments)
        float striation = snoise(rotPos * 80.0) * 0.15 + 0.85;

        // Faculae: Hot magnetic plages surrounding sunspots (T ~ 6,500 K)
        float faculae = smoothstep(0.3, 0.7, totalPenumbra) * (1.0 - totalUmbra) * snoise(rotPos * 40.0);
        faculae = max(0.0, faculae) * 0.7;

        // Apply Penumbra (dark brownish-orange with magnetic filaments, T ~ 4,500 K)
        vec3 penumbraColor = vec3(0.48, 0.20, 0.04) * striation;
        photoColor = mix(photoColor, penumbraColor, totalPenumbra * 0.88);

        // Apply Umbra (Deep, cool core T ~ 3,800 K)
        vec3 umbraColor = vec3(0.08, 0.03, 0.02);
        photoColor = mix(photoColor, umbraColor, totalUmbra * 0.98);

        // Add Faculae highlight around sunspot active regions
        photoColor += vec3(0.8, 0.7, 0.4) * faculae;

        // 3. Solar Limb Darkening (Eddington Approximation)
        // Center of disk is brighter; limb is cooler and dimmer
        float mu = max(0.0, dot(norm, viewDir));
        float limbFactor = 1.0 - uLimbDarkening * (1.0 - pow(mu, 0.75));
        photoColor *= limbFactor;

        // Limb Emission Boost (Atmospheric Chromosphere edge rim)
        float rim = 1.0 - mu;
        vec3 chromoRim = vec3(1.0, 0.35, 0.05) * pow(rim, 3.5) * 2.2;
        photoColor += chromoRim;

        gl_FragColor = vec4(photoColor, 1.0);
      }
    `,
  });

  const sunMesh = new THREE.Mesh(new THREE.SphereGeometry(sunRadius, 64, 64), sunShaderMat);
  sunMesh.name = 'SunMesh';
  orreryGroup.add(sunMesh);

  // Invisible larger hit mesh for effortless mobile touch & click raycasting
  const hitGeo = new THREE.SphereGeometry(sunRadius * 1.5, 16, 16);
  const hitMat = new THREE.MeshBasicMaterial({ visible: false });
  const hitMesh = new THREE.Mesh(hitGeo, hitMat);
  hitMesh.name = 'SunHitMesh';
  hitMesh.userData = { isSun: true, name: 'Sun' };
  sunMesh.add(hitMesh);

  // Embedded omnidirectional Solar Point Light
  const sunLight = new THREE.PointLight(0xffaa44, 2.8, 8.0, 1.6);
  orreryGroup.add(sunLight);

  // ═════════════════════════════════════════════════════════
  // 2. CHROMOSPHERE & CORONA ATMOSPHERIC GLOW
  // ═════════════════════════════════════════════════════════
  const coronaShaderMat = new THREE.ShaderMaterial({
    uniforms: {
      uTime: globalUniforms.uTime,
    },
    vertexShader: /* glsl */ `
      varying vec3 vNormal;
      varying vec3 vViewPosition;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vViewPosition = -mvPosition.xyz;
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform float uTime;
      varying vec3 vNormal;
      varying vec3 vViewPosition;

      void main() {
        vec3 norm = normalize(vNormal);
        vec3 viewDir = normalize(vViewPosition);
        float d = dot(norm, viewDir);
        float rim = 1.0 - abs(d);
        float alpha = pow(rim, 2.8) * 0.85;

        // Coronal streamer pulsation
        float pulse = sin(uTime * 1.5) * 0.1 + 0.9;
        vec3 coronaColor = mix(vec3(1.0, 0.55, 0.1), vec3(1.0, 0.88, 0.4), rim);
        gl_FragColor = vec4(coronaColor * pulse, alpha);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
    depthWrite: false,
  });

  const coronaMesh = new THREE.Mesh(new THREE.SphereGeometry(sunRadius * 1.35, 48, 48), coronaShaderMat);
  orreryGroup.add(coronaMesh);

  // ═════════════════════════════════════════════════════════
  // 3. REALISTIC 3D MAGNETIC CORONAL PROMINENCE LOOPS
  // ═════════════════════════════════════════════════════════
  // Prominence arches originate at active sunspot latitudes and loop through corona
  const prominenceGroup = new THREE.Group();
  orreryGroup.add(prominenceGroup);

  const loopShaderMat = new THREE.ShaderMaterial({
    uniforms: {
      uTime: globalUniforms.uTime,
    },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      varying vec3 vPosition;
      void main() {
        vUv = uv;
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform float uTime;
      varying vec2 vUv;
      varying vec3 vPosition;

      void main() {
        // Plasma flow speed along arch
        float flow = vUv.x * 6.0 - uTime * 3.5;
        float stream = sin(flow) * 0.35 + 0.65;
        float edge = sin(vUv.y * 3.14159);

        // Blazing H-Alpha crimson & white-hot magnetic core
        vec3 plasmaCore = vec3(1.0, 0.95, 0.8);
        vec3 plasmaMid  = vec3(1.0, 0.45, 0.05);
        vec3 plasmaEdge = vec3(0.9, 0.12, 0.05);

        vec3 col = mix(plasmaMid, plasmaCore, pow(edge, 2.0));
        col = mix(plasmaEdge, col, stream);

        float alpha = edge * (0.65 + 0.35 * sin(flow * 1.5));
        gl_FragColor = vec4(col * 2.2, alpha * 0.9);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  // Generate 6 distinct 3D magnetic coronal loops
  const loopConfigs = [
    // Loop 1 (Over Sunspot Group A)
    { p0: [0.65, 0.36, 0.65], apex: [0.95, 0.58, 0.85], p1: [0.78, 0.38, 0.52], radius: 0.012 },
    // Loop 2 (Higher secondary arch)
    { p0: [0.60, 0.42, 0.68], apex: [0.88, 0.72, 0.75], p1: [0.72, 0.34, 0.60], radius: 0.009 },
    // Loop 3 (Over Sunspot Group B - Southern active zone)
    { p0: [-0.62, -0.32, 0.70], apex: [-0.92, -0.45, 0.95], p1: [-0.52, -0.28, 0.80], radius: 0.013 },
    // Loop 4 (Twisted cross-field arch)
    { p0: [-0.55, -0.35, 0.65], apex: [-0.80, -0.62, 0.82], p1: [-0.48, -0.22, 0.85], radius: 0.008 },
    // Loop 5 (Equatorial flare loop)
    { p0: [0.20, 0.15, -0.96], apex: [0.38, 0.28, -1.35], p1: [0.32, 0.18, -0.92], radius: 0.011 },
    // Loop 6 (Active limb prominence)
    { p0: [0.95, -0.10, 0.10], apex: [1.38, -0.12, 0.14], p1: [0.90, -0.22, 0.18], radius: 0.014 },
  ];

  loopConfigs.forEach((cfg) => {
    const start = new THREE.Vector3(...cfg.p0).normalize().multiplyScalar(sunRadius * 0.98);
    const mid   = new THREE.Vector3(...cfg.apex).normalize().multiplyScalar(sunRadius * (1.3 + Math.random() * 0.3));
    const end   = new THREE.Vector3(...cfg.p1).normalize().multiplyScalar(sunRadius * 0.98);

    const curve = new THREE.CatmullRomCurve3([start, mid, end]);
    const tubeGeo = new THREE.TubeGeometry(curve, 32, cfg.radius, 12, false);
    const tubeMesh = new THREE.Mesh(tubeGeo, loopShaderMat);
    prominenceGroup.add(tubeMesh);
  });

  // ═════════════════════════════════════════════════════════
  // 4. DYNAMIC ERUPTIVE SOLAR FLARES (CME Tendrils & Flashes)
  // ═════════════════════════════════════════════════════════
  const flareGroup = new THREE.Group();
  orreryGroup.add(flareGroup);

  // Eruptive flare burst sprites at sunspot active centers
  const flareTexture = createSolarFlareTexture();
  const flareMat = new THREE.SpriteMaterial({
    map: flareTexture,
    color: 0xffeedd,
    blending: THREE.AdditiveBlending,
    transparent: true,
    opacity: 0.85,
    depthWrite: false,
  });

  const flares = [];
  const flarePositions = [
    new THREE.Vector3(0.72, 0.36, 0.58).normalize().multiplyScalar(sunRadius * 1.05),
    new THREE.Vector3(-0.58, -0.30, 0.75).normalize().multiplyScalar(sunRadius * 1.05),
    new THREE.Vector3(0.26, 0.16, -0.94).normalize().multiplyScalar(sunRadius * 1.05),
    new THREE.Vector3(0.95, -0.15, 0.14).normalize().multiplyScalar(sunRadius * 1.05),
  ];

  flarePositions.forEach((pos, idx) => {
    const sprite = new THREE.Sprite(flareMat.clone());
    sprite.position.copy(pos);
    sprite.scale.set(0.18, 0.18, 0.18);
    flareGroup.add(sprite);

    flares.push({
      sprite,
      basePos: pos.clone(),
      phase: idx * 1.5,
      scaleSpeed: 2.0 + idx * 0.5,
    });
  });

  function createSolarFlareTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
    grad.addColorStop(0.2, 'rgba(255, 200, 80, 0.9)');
    grad.addColorStop(0.5, 'rgba(255, 100, 20, 0.5)');
    grad.addColorStop(0.8, 'rgba(200, 30, 10, 0.15)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);

    // Cross diffraction spikes
    ctx.strokeStyle = 'rgba(255, 240, 200, 0.6)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(64, 10);
    ctx.lineTo(64, 118);
    ctx.moveTo(10, 64);
    ctx.lineTo(118, 64);
    ctx.stroke();

    return new THREE.CanvasTexture(canvas);
  }

  // ── UPDATE FUNCTION ──
  const update = (elapsed, dt) => {
    // Differential slow rotation of Sun group
    sunMesh.rotation.y = elapsed * 0.05;
    prominenceGroup.rotation.y = elapsed * 0.05;
    flareGroup.rotation.y = elapsed * 0.05;

    // Pulsing flare outbursts & CME bursts
    flares.forEach((f) => {
      const pulse = Math.sin(elapsed * f.scaleSpeed + f.phase);
      const isBursting = pulse > 0.4;
      const flareScale = isBursting ? 0.22 + (pulse - 0.4) * 0.35 : 0.12 + Math.abs(pulse) * 0.06;
      f.sprite.scale.set(flareScale, flareScale, flareScale);
      f.sprite.material.opacity = isBursting ? 0.95 : 0.4 + Math.abs(pulse) * 0.3;
    });

    // Flickering Solar Point Light matching coronal activity
    sunLight.intensity = 2.6 + Math.sin(elapsed * 4.0) * 0.3 + (Math.random() * 0.15);
  };

  return {
    sunMesh,
    hitMesh,
    update,
  };
}
