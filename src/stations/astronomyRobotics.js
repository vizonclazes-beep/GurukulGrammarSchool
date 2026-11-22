// src/stations/astronomyRobotics.js — Kepler solar system orrery & deep-space observation pod
import * as THREE from 'three';
import { stationPosition, COLOR_POD_WHITE } from '../core/constants.js';
import { createAstronomyScreens } from './astronomyScreens.js';
import { createSunAndFlares } from './sunAndFlares.js';
import { createCelestialTelemetry, CELESTIAL_DATA } from './celestialTelemetry.js';
import {
  createMercuryTexture,
  createVenusTexture,
  createEarthSurfaceTexture,
  createEarthCloudTexture,
  createMarsTexture,
  createJupiterTexture,
  createSaturnTexture,
  createSaturnRingTexture,
  createUranusTexture,
  createNeptuneTexture,
} from './planetTextures.js';
import { createComet } from './comet.js';

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

  // Keplerian planetary orbital parameters: realistic procedural textures, sizes and axial tilts
  const planetData = [
    {
      name: 'Mercury',
      dist: 0.38,
      size: 0.035,
      speed: 4.15,
      axialTilt: 0.001,
      spinSpeed: 0.25,
      createMaterial: () =>
        new THREE.MeshStandardMaterial({
          map: createMercuryTexture(),
          roughness: 0.88,
          metalness: 0.05,
        }),
    },
    {
      name: 'Venus',
      dist: 0.52,
      size: 0.052,
      speed: 1.62,
      axialTilt: 3.09, // Retrograde rotation
      spinSpeed: -0.18,
      createMaterial: () =>
        new THREE.MeshStandardMaterial({
          map: createVenusTexture(),
          roughness: 0.42,
          metalness: 0.02,
        }),
    },
    {
      name: 'Earth',
      dist: 0.68,
      size: 0.060,
      speed: 1.00,
      axialTilt: 0.41, // 23.4° tilt
      spinSpeed: 0.75,
      hasClouds: true,
      createMaterial: () =>
        new THREE.MeshStandardMaterial({
          map: createEarthSurfaceTexture(),
          roughness: 0.52,
          metalness: 0.08,
        }),
    },
    {
      name: 'Mars',
      dist: 0.84,
      size: 0.045,
      speed: 0.53,
      axialTilt: 0.44, // 25.2° tilt
      spinSpeed: 0.70,
      createMaterial: () =>
        new THREE.MeshStandardMaterial({
          map: createMarsTexture(),
          roughness: 0.82,
          metalness: 0.04,
        }),
    },
    {
      name: 'Jupiter',
      dist: 1.08,
      size: 0.105,
      speed: 0.24,
      axialTilt: 0.054, // 3.1° tilt
      spinSpeed: 1.4, // Rapid Jovian rotation
      createMaterial: () =>
        new THREE.MeshStandardMaterial({
          map: createJupiterTexture(),
          roughness: 0.54,
          metalness: 0.02,
        }),
    },
    {
      name: 'Saturn',
      dist: 1.34,
      size: 0.085,
      speed: 0.12,
      axialTilt: 0.466, // 26.7° tilt
      spinSpeed: 1.25,
      hasRing: true,
      createMaterial: () =>
        new THREE.MeshStandardMaterial({
          map: createSaturnTexture(),
          roughness: 0.55,
          metalness: 0.02,
        }),
    },
    {
      name: 'Uranus',
      dist: 1.62,
      size: 0.065,
      speed: 0.06,
      axialTilt: 1.707, // 97.8° tilt (rotates on its side)
      spinSpeed: 0.85,
      hasRing: true,
      isUranusRing: true,
      createMaterial: () =>
        new THREE.MeshStandardMaterial({
          map: createUranusTexture(),
          roughness: 0.46,
          metalness: 0.02,
        }),
    },
    {
      name: 'Neptune',
      dist: 1.85,
      size: 0.060,
      speed: 0.03,
      axialTilt: 0.494, // 28.3° tilt
      spinSpeed: 0.90,
      createMaterial: () =>
        new THREE.MeshStandardMaterial({
          map: createNeptuneTexture(),
          roughness: 0.45,
          metalness: 0.02,
        }),
    },
  ];

  const planets = [];
  const interactiveTargets = [sunSystem.hitMesh, sunMesh];

  // Enhanced Photorealistic Saturn Ring Shader with Cassini Division
  const saturnRingTex = createSaturnRingTexture();
  const saturnRingMat = new THREE.ShaderMaterial({
    uniforms: {
      uRingTex: { value: saturnRingTex },
    },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform sampler2D uRingTex;
      varying vec2 vUv;
      void main() {
        float r = length(vUv - vec2(0.5)) * 2.0;
        float innerR = 0.4737;
        float outerR = 1.0;
        if (r < innerR || r > outerR) discard;
        float u = clamp((r - innerR) / (outerR - innerR), 0.0, 1.0);
        vec4 col = texture2D(uRingTex, vec2(u, 0.5));
        if (col.a < 0.02) discard;
        gl_FragColor = col;
      }
    `,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
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

    // 2. Planet Sphere Mesh with realistic procedural texture
    const mat = p.createMaterial();
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(p.size, 32, 32), mat);
    mesh.name = `Planet_${p.name}`;
    mesh.userData = { name: p.name, isPlanet: true };
    mesh.rotation.z = p.axialTilt; // Apply authentic axial tilt
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

    // Add Earth's concentric swirling atmospheric clouds
    let cloudsMesh = null;
    if (p.hasClouds) {
      const cloudTex = createEarthCloudTexture();
      const cloudMat = new THREE.MeshStandardMaterial({
        map: cloudTex,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
        roughness: 0.7,
      });
      cloudsMesh = new THREE.Mesh(new THREE.SphereGeometry(p.size * 1.018, 32, 32), cloudMat);
      mesh.add(cloudsMesh);
    }

    // Add Saturn Photorealistic Ring System
    if (p.hasRing && !p.isUranusRing) {
      const ringMesh = new THREE.Mesh(
        new THREE.RingGeometry(p.size * 1.35, p.size * 2.85, 64),
        saturnRingMat
      );
      ringMesh.rotation.x = Math.PI / 2.3;
      mesh.add(ringMesh);
    }

    // Add Uranus delicate ring
    if (p.isUranusRing) {
      const uranRingMat = new THREE.MeshBasicMaterial({
        color: 0x7dd3fc,
        transparent: true,
        opacity: 0.28,
        side: THREE.DoubleSide,
      });
      const uranRingMesh = new THREE.Mesh(
        new THREE.RingGeometry(p.size * 1.3, p.size * 1.7, 48),
        uranRingMat
      );
      uranRingMesh.rotation.x = Math.PI / 2.0;
      mesh.add(uranRingMesh);
    }

    planets.push({
      mesh,
      cloudsMesh,
      name: p.name,
      dist: p.dist,
      speed: p.speed,
      spinSpeed: p.spinSpeed,
      angle: Math.random() * Math.PI * 2,
    });
  });

  // ═════════════════════════════════════════════════════════
  // 3. COMET WITH DYNAMIC DUAL TAIL (ION & DUST)
  // ═════════════════════════════════════════════════════════
  const comet = createComet(orreryGroup);
  interactiveTargets.push(comet.hitMesh, comet.nucleusMesh);

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

  // ── 6. UPDATE LOOP (ORBITS, SUN, TELEMETRY, COMET & SCREENS) ──
  const update = (elapsed, dt) => {
    // 1. Advance Keplerian orbits & planet axial spins
    const timeScale = controls.orbitalTimeScale.value;
    planets.forEach((p) => {
      p.angle += p.speed * 0.25 * timeScale * dt;
      p.mesh.position.x = Math.cos(p.angle) * p.dist;
      p.mesh.position.z = Math.sin(p.angle) * p.dist;
      p.mesh.rotation.y += p.spinSpeed * dt;
      if (p.cloudsMesh) {
        p.cloudsMesh.rotation.y += p.spinSpeed * 1.3 * dt;
      }
    });

    // 2. Update Dynamic Comet (Kepler acceleration, Coma flaring & Dual Tails)
    comet.update(elapsed, dt);

    // 3. Update Floor-Standing TV Screens (Nebulas, Voyager 1 & ISS, Galaxies)
    screensManager.update(dt);

    // 4. Update Photorealistic Sun, Sunspots & Coronal Flares
    sunSystem.update(elapsed, dt);

    // 5. Update Celestial Telemetry (3D Card & Orientation)
    telemetry.update(elapsed, dt);
  };

  return {
    group,
    update,
    controls,
    telemetry,
    comet,
    selectCelestialBody: (name) => {
      if (name === 'Sun') {
        telemetry.selectBody(sunMesh, 'Sun');
      } else if (name === 'Comet') {
        telemetry.selectBody(comet.group, 'Comet');
      } else {
        const found = planets.find((p) => p.name === name);
        if (found) telemetry.selectBody(found.mesh, name);
      }
    },
  };
}
