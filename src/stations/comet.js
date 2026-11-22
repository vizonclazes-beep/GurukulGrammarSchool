// src/stations/comet.js — Graphically accurate 3D Comet with dynamic dual tail (Ion & Dust)
import * as THREE from 'three';

/**
 * Creates an authentic 3D Comet with dynamic dual tails (Type I straight electric-blue Ion Tail,
 * and Type II curved golden-white Dust Tail) on an eccentric Keplerian orbit.
 *
 * @param {THREE.Group} orreryGroup
 * @returns {Object} { mesh, hitMesh, orbitLine, update: Function, getPosition: Function }
 */
export function createComet(orreryGroup) {
  const cometGroup = new THREE.Group();
  cometGroup.name = 'Comet_1P_Halley';
  cometGroup.userData = { name: 'Comet', isComet: true };
  orreryGroup.add(cometGroup);

  // ═════════════════════════════════════════════════════════
  // 1. KEPLERIAN ORBITAL PARAMETERS
  // ═════════════════════════════════════════════════════════
  // Highly eccentric orbit: perihelion inside Mercury (0.36m), aphelion beyond Neptune (2.12m)
  const q = 0.36; // Perihelion (closest approach to Sun)
  const Q = 2.12; // Aphelion (furthest distance from Sun)
  const a = (q + Q) / 2; // Semi-major axis = 1.24m
  const e = (Q - q) / (Q + q); // Eccentricity = ~0.71
  const b = a * Math.sqrt(1 - e * e); // Semi-minor axis = ~0.87m
  const c = a * e; // Focus offset from ellipse center = ~0.88m

  const inclination = 0.38; // ~22 degrees orbital plane tilt
  const orbitRotation = 0.65; // Argument of periapsis rotation

  // Helper to compute orbital 3D position from eccentric anomaly or angle
  function getOrbitPoint(angle) {
    // Ellipse centered so the Sun is at (0, 0, 0)
    // In canonical ellipse with focus at origin:
    // x = a * cos(E) - c, z = b * sin(E)
    const rawX = a * Math.cos(angle) - c;
    const rawZ = b * Math.sin(angle);

    // Apply 2D rotation in plane
    const rotX = rawX * Math.cos(orbitRotation) - rawZ * Math.sin(orbitRotation);
    const rotZ = rawX * Math.sin(orbitRotation) + rawZ * Math.cos(orbitRotation);

    // Apply orbital inclination tilt
    const posX = rotX;
    const posY = rotZ * Math.sin(inclination);
    const posZ = rotZ * Math.cos(inclination);

    return new THREE.Vector3(posX, posY, posZ);
  }

  // ═════════════════════════════════════════════════════════
  // 2. ORBITAL PATH VISUALIZATION (FAINT ELLIPSE LINE)
  // ═════════════════════════════════════════════════════════
  const orbitPts = [];
  const segments = 128;
  for (let i = 0; i <= segments; i++) {
    const ang = (i / segments) * Math.PI * 2;
    orbitPts.push(getOrbitPoint(ang));
  }
  const orbitGeo = new THREE.BufferGeometry().setFromPoints(orbitPts);
  const orbitMat = new THREE.LineBasicMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.32,
    linewidth: 1,
  });
  const orbitLine = new THREE.Line(orbitGeo, orbitMat);
  orreryGroup.add(orbitLine);

  // ═════════════════════════════════════════════════════════
  // 3. COMET NUCLEUS (DIRTY SNOWBALL SILICATE / ICE ROCK)
  // ═════════════════════════════════════════════════════════
  const nucleusGeo = new THREE.DodecahedronGeometry(0.024, 2);
  // Deform vertices for an authentic irregular potato-shaped asteroid/comet nucleus
  const posAttr = nucleusGeo.attributes.position;
  for (let i = 0; i < posAttr.count; i++) {
    const vx = posAttr.getX(i);
    const vy = posAttr.getY(i);
    const vz = posAttr.getZ(i);
    const noise = 1.0 + (Math.sin(vx * 40) + Math.cos(vy * 35) + Math.sin(vz * 50)) * 0.18;
    posAttr.setXYZ(i, vx * noise, vy * noise * 0.8, vz * noise);
  }
  nucleusGeo.computeVertexNormals();

  const nucleusMat = new THREE.MeshStandardMaterial({
    color: 0x475569, // Dark carbonaceous albedo (0.04)
    roughness: 0.95,
    metalness: 0.05,
    emissive: new THREE.Color(0x0284c7),
    emissiveIntensity: 0.15,
  });
  const nucleusMesh = new THREE.Mesh(nucleusGeo, nucleusMat);
  cometGroup.add(nucleusMesh);

  // Invisible larger hit mesh for clicking / touching
  const hitMesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.24, 16, 16),
    new THREE.MeshBasicMaterial({ visible: false })
  );
  hitMesh.name = 'HitMesh_Comet';
  hitMesh.userData = { name: 'Comet', isHitBox: true };
  cometGroup.add(hitMesh);

  // ═════════════════════════════════════════════════════════
  // 4. LUMINOUS GLOWING COMA (SUBLIMATING GAS & DUST HALO)
  // ═════════════════════════════════════════════════════════
  const comaCanvas = document.createElement('canvas');
  comaCanvas.width = 256;
  comaCanvas.height = 256;
  const comaCtx = comaCanvas.getContext('2d');
  const comaGrad = comaCtx.createRadialGradient(128, 128, 4, 128, 128, 120);
  comaGrad.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
  comaGrad.addColorStop(0.25, 'rgba(56, 189, 248, 0.85)');
  comaGrad.addColorStop(0.6, 'rgba(14, 165, 233, 0.35)');
  comaGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  comaCtx.fillStyle = comaGrad;
  comaCtx.fillRect(0, 0, 256, 256);

  const comaTex = new THREE.CanvasTexture(comaCanvas);
  const comaMat = new THREE.SpriteMaterial({
    map: comaTex,
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.95,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const comaSprite = new THREE.Sprite(comaMat);
  comaSprite.scale.set(0.16, 0.16, 1.0);
  cometGroup.add(comaSprite);

  // ═════════════════════════════════════════════════════════
  // 5. ION TAIL (TYPE I: STRAIGHT, ELECTRIC CYAN/BLUE PLASMA)
  // ═════════════════════════════════════════════════════════
  // Points strictly in the anti-solar direction (away from Sun)
  // Driven by the solar wind magnetic field
  const ionTailLength = 1.1; // Max length near perihelion
  const ionTailGeo = new THREE.CylinderGeometry(0.005, 0.055, ionTailLength, 16, 1, true);
  // Shift pivot so base is at the nucleus
  ionTailGeo.translate(0, ionTailLength / 2, 0);

  const ionTailMat = new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: new THREE.Color(0x00e5ff) },
      uOpacity: { value: 0.85 },
      uLengthFactor: { value: 1.0 },
    },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor;
      uniform float uOpacity;
      varying vec2 vUv;
      void main() {
        // vUv.y: 0 at base (nucleus), 1 at tip
        float fade = pow(1.0 - vUv.y, 1.4);
        float edge = sin(vUv.x * 3.14159);
        float alpha = fade * edge * uOpacity;
        vec3 col = mix(uColor, vec3(0.7, 0.9, 1.0), (1.0 - vUv.y) * 0.4);
        gl_FragColor = vec4(col, alpha);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const ionTailMesh = new THREE.Mesh(ionTailGeo, ionTailMat);
  orreryGroup.add(ionTailMesh); // In orrery space so we can orient it directly from Sun to comet

  // ═════════════════════════════════════════════════════════
  // 6. DUST TAIL (TYPE II: CURVED, WARM GOLDEN-WHITE SILICATE)
  // ═════════════════════════════════════════════════════════
  // Blown by radiation pressure PLUS lagging along orbital trajectory
  const dustTailSegments = 24;
  const dustTailGeo = new THREE.PlaneGeometry(0.12, 0.95, 4, dustTailSegments);
  const dustPos = dustTailGeo.attributes.position;

  const dustTailMat = new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: new THREE.Color(0xfef08a) }, // Warm golden-white
      uOpacity: { value: 0.75 },
    },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor;
      uniform float uOpacity;
      varying vec2 vUv;
      void main() {
        // vUv.y: 0 at base, 1 at tip
        float fade = pow(1.0 - vUv.y, 1.6);
        float edge = sin(vUv.x * 3.14159);
        float alpha = fade * edge * uOpacity;
        vec3 col = mix(uColor, vec3(1.0, 0.95, 0.85), (1.0 - vUv.y) * 0.5);
        gl_FragColor = vec4(col, alpha);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const dustTailMesh = new THREE.Mesh(dustTailGeo, dustTailMat);
  orreryGroup.add(dustTailMesh);

  // ═════════════════════════════════════════════════════════
  // 7. SUBLIMATION PARTICLE STREAM (ICE & DUST JETS)
  // ═════════════════════════════════════════════════════════
  const particleCount = 60;
  const partGeo = new THREE.BufferGeometry();
  const partPositions = new Float32Array(particleCount * 3);
  const partVelocities = [];
  for (let i = 0; i < particleCount; i++) {
    partPositions[i * 3] = 0;
    partPositions[i * 3 + 1] = 0;
    partPositions[i * 3 + 2] = 0;
    partVelocities.push({
      life: Math.random(),
      speed: 0.4 + Math.random() * 0.8,
      spread: (Math.random() - 0.5) * 0.08,
    });
  }
  partGeo.setAttribute('position', new THREE.BufferAttribute(partPositions, 3));
  const partMat = new THREE.PointsMaterial({
    color: 0x93c5fd,
    size: 0.016,
    transparent: true,
    opacity: 0.7,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const particleSystem = new THREE.Points(partGeo, partMat);
  orreryGroup.add(particleSystem);

  // ═════════════════════════════════════════════════════════
  // 8. DYNAMIC UPDATE LOOP (KEPLER ACCELERATION & TAIL PHYSICS)
  // ═════════════════════════════════════════════════════════
  let currentAngle = 0.8; // Starting orbital position
  const trailHistory = []; // Past positions to compute true curved dust tail
  const maxHistory = 32;

  const update = (elapsed, dt) => {
    // 1. Kepler's Second Law: Comet accelerates rapidly near perihelion!
    // Current distance to sun
    const currentPos = cometGroup.position;
    const r = currentPos.length() || 1.0;

    // Angular velocity dθ/dt is inversely proportional to r^2: ω = h / r^2
    const baseSpeed = 0.18;
    const speedMultiplier = Math.min(6.5, Math.max(0.35, Math.pow(a / r, 1.8)));
    currentAngle += baseSpeed * speedMultiplier * dt;
    if (currentAngle > Math.PI * 2) currentAngle -= Math.PI * 2;

    // Update comet position
    const nextPos = getOrbitPoint(currentAngle);
    cometGroup.position.copy(nextPos);

    // Save history for curved dust tail calculation
    trailHistory.unshift(nextPos.clone());
    if (trailHistory.length > maxHistory) trailHistory.pop();

    // 2. Solar Proximity Sublimation Physics:
    // Sublimation flaring explodes as comet approaches sun (r < 1.4m)
    const sublimationFactor = Math.min(1.0, Math.max(0.05, Math.pow((1.75 - r) / 1.4, 2.0)));

    // Scale Coma
    const comaScale = THREE.MathUtils.lerp(0.08, 0.28, sublimationFactor);
    comaSprite.scale.set(comaScale, comaScale, 1.0);
    comaMat.opacity = THREE.MathUtils.lerp(0.15, 0.95, sublimationFactor);

    // 3. ION TAIL (TYPE I): Strictly Anti-Solar Direction
    // Unit vector pointing from Sun (0,0,0) directly through comet
    const antiSolarDir = nextPos.clone().normalize();
    const ionTailLen = THREE.MathUtils.lerp(0.08, ionTailLength, sublimationFactor);

    // Scale and orient ion tail mesh
    ionTailMesh.position.copy(nextPos);
    // Cylinder default points along +Y; align +Y with antiSolarDir
    const yAxis = new THREE.Vector3(0, 1, 0);
    ionTailMesh.quaternion.setFromUnitVectors(yAxis, antiSolarDir);
    ionTailMesh.scale.set(1.0, ionTailLen / ionTailLength, 1.0);
    ionTailMat.uniforms.uOpacity.value = THREE.MathUtils.lerp(0.04, 0.88, sublimationFactor);

    // 4. DUST TAIL (TYPE II): Curved Ribbon lagging along trajectory
    if (trailHistory.length >= 8) {
      dustTailMesh.visible = true;
      const dustAttr = dustTailGeo.attributes.position;
      const countY = dustTailSegments + 1;

      // Curve dust tail from current position back through history
      const prevPos = trailHistory[Math.min(trailHistory.length - 1, 6)];
      const velDir = nextPos.clone().sub(prevPos).normalize(); // Velocity vector

      // Dust tail orientation blends anti-solar push (70%) and velocity lag (-30%)
      const dustDir = antiSolarDir.clone().multiplyScalar(0.7).sub(velDir.clone().multiplyScalar(0.35)).normalize();
      const dustSide = new THREE.Vector3().crossVectors(dustDir, new THREE.Vector3(0, 1, 0)).normalize();

      dustTailMesh.position.copy(nextPos);
      const dustLen = THREE.MathUtils.lerp(0.06, 0.85, sublimationFactor);

      // Reconstruct dynamic curved ribbon vertices
      for (let j = 0; j < countY; j++) {
        const t = j / dustTailSegments; // 0 at base, 1 at tip
        // Lag curve factor
        const lagDist = Math.pow(t, 1.3) * dustLen;
        const width = THREE.MathUtils.lerp(0.015, 0.16, t);

        // Center spine of dust tail
        const spine = dustDir.clone().multiplyScalar(lagDist).sub(velDir.clone().multiplyScalar(lagDist * 0.38 * t));

        for (let i = 0; i <= 4; i++) {
          const s = (i / 4 - 0.5) * 2; // -1 to +1 across ribbon
          const vIdx = j * 5 + i;
          const px = spine.x + dustSide.x * width * s;
          const py = spine.y + dustSide.y * width * s;
          const pz = spine.z + dustSide.z * width * s;
          dustAttr.setXYZ(vIdx, px, py, pz);
        }
      }
      dustAttr.needsUpdate = true;
      dustTailGeo.computeVertexNormals();
      dustTailMat.uniforms.uOpacity.value = THREE.MathUtils.lerp(0.03, 0.72, sublimationFactor);
    } else {
      dustTailMesh.visible = false;
    }

    // 5. Update Sublimation Particle Stream
    const partPosArr = partGeo.attributes.position.array;
    for (let p = 0; p < particleCount; p++) {
      const v = partVelocities[p];
      v.life += dt * v.speed * (0.8 + sublimationFactor * 1.5);
      if (v.life > 1.0) {
        v.life = 0;
        // Reset to nucleus
        partPosArr[p * 3] = nextPos.x;
        partPosArr[p * 3 + 1] = nextPos.y;
        partPosArr[p * 3 + 2] = nextPos.z;
      } else {
        // Stream backwards along anti-solar direction with subtle spread
        const distAway = v.life * ionTailLen * 0.75;
        partPosArr[p * 3] = nextPos.x + antiSolarDir.x * distAway + v.spread * distAway;
        partPosArr[p * 3 + 1] = nextPos.y + antiSolarDir.y * distAway + v.spread * distAway;
        partPosArr[p * 3 + 2] = nextPos.z + antiSolarDir.z * distAway;
      }
    }
    partGeo.attributes.position.needsUpdate = true;
    partMat.opacity = THREE.MathUtils.lerp(0.05, 0.75, sublimationFactor);

    // Subtle nucleus tumble rotation
    nucleusMesh.rotation.x += dt * 0.4;
    nucleusMesh.rotation.y += dt * 0.6;
  };

  return {
    group: cometGroup,
    nucleusMesh,
    hitMesh,
    orbitLine,
    update,
    getPosition: () => cometGroup.position,
  };
}
