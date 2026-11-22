// src/stations/astronomyRobotics.js — Kepler solar system orrery & deep-space observation pod
import * as THREE from 'three';
import { stationPosition, COLOR_POD_WHITE } from '../core/constants.js';
import { createAstronomyScreens } from './astronomyScreens.js';
import { createSunAndFlares } from './sunAndFlares.js';
import { createCelestialTelemetry, CELESTIAL_DATA } from './celestialTelemetry.js';

/**
 * Builds the Astronomy Dome Orrery & Deep Space Observation Hub.
 * @param {THREE.Scene} scene
 * @param {Object} globalUniforms
 * @param {THREE.Camera} [camera]
 * @returns {{ group: THREE.Group, update: Function, controls: Object, telemetry: Object, selectCelestialBody: Function }}
 */
export function buildAstronomyRoboticsHub(scene, globalUniforms, camera) {
  const group = new THREE.Group();
  group.name = 'AstronomyObservationHub';
  const basePos = stationPosition('astronomy');
  group.position.copy(basePos);
  scene.add(group);

  const controls = {
    orbitalTimeScale: { value: 1.0 },
  };

  // ── 1. BASE SCIENTIFIC PLATFORM (LIGHT WHITE MATTE NO REFLECTING SURFACE) ──
  const baseMat = new THREE.MeshStandardMaterial({
    color: COLOR_POD_WHITE,
    roughness: 0.92,
    metalness: 0.0,
  });

  const basePlinth = new THREE.Mesh(new THREE.CylinderGeometry(3.0, 3.3, 0.6, 64), baseMat);
  basePlinth.position.y = 0.3;
  basePlinth.castShadow = true;
  basePlinth.receiveShadow = true;
  group.add(basePlinth);

  // Embedded outer LED ring
  const ledRing = new THREE.Mesh(
    new THREE.TorusGeometry(3.1, 0.04, 16, 64),
    new THREE.MeshPhysicalMaterial({
      color: 0x110022,
      emissive: new THREE.Color(0x9d4edd),
      emissiveIntensity: 2.5,
    })
  );
  ledRing.rotation.x = Math.PI / 2;
  ledRing.position.y = 0.05;
  group.add(ledRing);

  // ═════════════════════════════════════════════════════════
  //  KEPLER SOLAR SYSTEM ORRERY (FLOATING WEIGHTLESSLY AT EYE LEVEL)
  // ═════════════════════════════════════════════════════════
  // No platform pedestal under the sun — floats purely in space at y = 1.42m
  const orreryGroup = new THREE.Group();
  orreryGroup.position.set(0, 1.42, 0);
  group.add(orreryGroup);

  // ── 2. REALISTIC SUN WITH GRANULATION, SUNSPOTS & CORONAL SOLAR FLARES ──
  const sunSystem = createSunAndFlares(orreryGroup, globalUniforms);
  const sunMesh = sunSystem.sunMesh;

  // Keplerian planetary orbital parameters: [name, distance, size, speedFactor, color]
  // Orbital distances scaled so all 8 planets rotate well inside R <= 1.85m,
  // guaranteeing a massive >0.53m clear buffer zone from the perimeter screens (R >= 2.38m)
  const planetData = [
    { name: 'Mercury', dist: 0.38, size: 0.035, speed: 4.15, color: 0x9e9e9e },
    { name: 'Venus',   dist: 0.52, size: 0.052, speed: 1.62, color: 0xe6c280 },
    { name: 'Earth',   dist: 0.68, size: 0.060, speed: 1.00, color: 0x3b82f6 },
    { name: 'Mars',    dist: 0.84, size: 0.045, speed: 0.53, color: 0xef4444 },
    { name: 'Jupiter', dist: 1.08, size: 0.105, speed: 0.24, color: 0xd97706, bands: true },
    { name: 'Saturn',  dist: 1.34, size: 0.085, speed: 0.12, color: 0xfde047, ring: true },
    { name: 'Uranus',  dist: 1.62, size: 0.065, speed: 0.06, color: 0x38bdf8 },
    { name: 'Neptune', dist: 1.85, size: 0.060, speed: 0.03, color: 0x2563eb },
  ];

  const planets = [];
  const interactiveTargets = [sunSystem.hitMesh, sunMesh];

  // Saturn ring alpha-gradient shader
  const saturnRingMat = new THREE.ShaderMaterial({
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      varying vec2 vUv;
      void main() {
        float r = length(vUv - 0.5) * 2.0;
        if (r < 0.4 || r > 1.0) discard;
        float band = sin(r * 35.0) * 0.2 + 0.8;
        float alpha = smoothstep(0.4, 0.5, r) * smoothstep(1.0, 0.85, r) * 0.85;
        vec3 col = vec3(0.92, 0.82, 0.65) * band;
        gl_FragColor = vec4(col, alpha);
      }
    `,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  // Jupiter procedural atmospheric band shader
  const jupiterBandMat = new THREE.ShaderMaterial({
    uniforms: { uTime: globalUniforms.uTime },
    vertexShader: /* glsl */ `
      varying vec3 vNormal;
      varying vec2 vUv;
      void main() {
        vNormal = normal;
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform float uTime;
      varying vec3 vNormal;
      varying vec2 vUv;
      void main() {
        float bands = sin(vUv.y * 30.0 + sin(vUv.x * 10.0 + uTime * 0.2) * 1.5) * 0.5 + 0.5;
        vec3 colorA = vec3(0.85, 0.55, 0.35);
        vec3 colorB = vec3(0.95, 0.88, 0.75);
        vec3 col = mix(colorA, colorB, bands);
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  });

  planetData.forEach((p) => {
    // 1. Orbital Ellipse Path Line
    const curve = new THREE.EllipseCurve(0, 0, p.dist, p.dist, 0, 2 * Math.PI, false, 0);
    const pts = curve.getPoints(96);
    const lineGeo = new THREE.BufferGeometry().setFromPoints(
      pts.map((pt) => new THREE.Vector3(pt.x, 0, pt.y))
    );
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x4488bb,
      transparent: true,
      opacity: 0.35,
    });
    const orbitLine = new THREE.Line(lineGeo, lineMat);
    orreryGroup.add(orbitLine);

    // 2. Planet Sphere Mesh
    let mat;
    if (p.bands) {
      mat = jupiterBandMat;
    } else {
      mat = new THREE.MeshPhysicalMaterial({
        color: p.color,
        roughness: 0.4,
        metalness: 0.1,
      });
    }

    const mesh = new THREE.Mesh(new THREE.SphereGeometry(p.size, 24, 24), mat);
    mesh.name = `Planet_${p.name}`;
    mesh.userData = { name: p.name, isPlanet: true };
    orreryGroup.add(mesh);

    // Invisible larger hitSphere for mobile touch & desktop click raycasting
    const hitRadius = Math.max(0.18, p.size * 2.4);
    const hitMesh = new THREE.Mesh(
      new THREE.SphereGeometry(hitRadius, 16, 16),
      new THREE.MeshBasicMaterial({ visible: false })
    );
    hitMesh.name = `HitMesh_${p.name}`;
    hitMesh.userData = { name: p.name, isHitBox: true };
    mesh.add(hitMesh);
    interactiveTargets.push(hitMesh, mesh);

    // Add Saturn Ring
    if (p.ring) {
      const ringMesh = new THREE.Mesh(new THREE.RingGeometry(p.size * 1.4, p.size * 2.8, 32), saturnRingMat);
      ringMesh.rotation.x = Math.PI / 2.3;
      mesh.add(ringMesh);
    }

    planets.push({
      mesh,
      name: p.name,
      dist: p.dist,
      speed: p.speed,
      angle: Math.random() * Math.PI * 2,
    });
  });

  // ── 3. DUAL ANGLED TELEMETRY CONSOLES (LEFT & RIGHT) IN PHYSICS POD STYLE ──
  const screensManager = createAstronomyScreens(group, camera);

  // ── 4. CELESTIAL TELEMETRY (3D CARD ALONGSIDE TARGET & 2D HUD DRAWER) ──
  const telemetry = createCelestialTelemetry(orreryGroup, camera);

  // ── 5. TOUCH & CLICK RAYCASTING HANDLER ──
  const raycaster = new THREE.Raycaster();
  const pointerPos = new THREE.Vector2();
  let pointerDownPos = { x: 0, y: 0, time: 0 };

  const handlePointerDown = (e) => {
    pointerDownPos = {
      x: e.clientX ?? e.touches?.[0]?.clientX ?? 0,
      y: e.clientY ?? e.touches?.[0]?.clientY ?? 0,
      time: performance.now(),
    };
  };

  const handlePointerUp = (e) => {
    if (!camera) return;
    const upX = e.clientX ?? e.changedTouches?.[0]?.clientX ?? 0;
    const upY = e.clientY ?? e.changedTouches?.[0]?.clientY ?? 0;
    const dist = Math.hypot(upX - pointerDownPos.x, upY - pointerDownPos.y);
    const elapsed = performance.now() - pointerDownPos.time;

    // Filter out drags or long presses
    if (dist > 12 || elapsed > 650) return;

    // Ignore clicks inside HUD panels or UI buttons
    if (
      e.target &&
      (e.target.closest('#celestial-telemetry-hud') ||
        e.target.closest('#hud-container') ||
        e.target.closest('.hud-panel') ||
        e.target.closest('button') ||
        e.target.closest('input'))
    ) {
      return;
    }

    pointerPos.x = (upX / window.innerWidth) * 2 - 1;
    pointerPos.y = -(upY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(pointerPos, camera);
    const hits = raycaster.intersectObjects(interactiveTargets, true);

    if (hits.length > 0) {
      const hitObj = hits[0].object;
      const targetName = hitObj.userData?.name || hitObj.parent?.userData?.name;
      const targetMesh = hitObj.userData?.isHitBox ? hitObj.parent : hitObj;
      if (targetName && CELESTIAL_DATA[targetName]) {
        if (telemetry.getCurrentTarget && telemetry.getCurrentTarget()?.dataKey === targetName) {
          telemetry.deselect();
        } else {
          telemetry.selectBody(targetMesh, targetName);
        }
      }
    } else {
      if (telemetry.getCurrentTarget && telemetry.getCurrentTarget()) {
        telemetry.deselect();
      }
    }
  };

  window.addEventListener('pointerdown', handlePointerDown, { passive: true });
  window.addEventListener('pointerup', handlePointerUp, { passive: true });

  // ── 6. UPDATE LOOP (ORBITS, SUN, TELEMETRY & SCREENS) ──
  const update = (elapsed, dt) => {
    // 1. Advance Keplerian orbits
    const timeScale = controls.orbitalTimeScale.value;
    planets.forEach((p) => {
      p.angle += p.speed * 0.25 * timeScale * dt;
      p.mesh.position.x = Math.cos(p.angle) * p.dist;
      p.mesh.position.z = Math.sin(p.angle) * p.dist;
    });

    // 2. Update Floor-Standing TV Screens (Nebulas, Voyager 1 & ISS, Galaxies)
    screensManager.update(dt);

    // 3. Update Photorealistic Sun, Sunspots & Coronal Flares
    sunSystem.update(elapsed, dt);

    // 4. Update Celestial Telemetry (3D Card & Orientation)
    telemetry.update(elapsed, dt);
  };

  return {
    group,
    update,
    controls,
    telemetry,
    selectCelestialBody: (name) => {
      if (name === 'Sun') {
        telemetry.selectBody(sunMesh, 'Sun');
      } else {
        const found = planets.find((p) => p.name === name);
        if (found) telemetry.selectBody(found.mesh, name);
      }
    },
  };
}
