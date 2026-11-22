// src/stations/physics.js — Physics Station with Tesla coils & authentic reactive plasma sphere
import * as THREE from 'three';
import {
  stationPosition,
  COLOR_ALUMINUM,
  COLOR_POD_WHITE,
  COLOR_CYAN_ACCENT,
  COLOR_SEAM_GROOVE,
  COLOR_PANEL_DARK,
} from '../core/constants.js';
import {
  createPlasmaFilamentMaterial,
  createNobleGasHazeMaterial,
  createGlassContactSpotMaterial,
  createElectrodeCoronaMaterial,
} from '../shaders/plasmaShader.js';
import { createHologramMaterial } from '../shaders/hologramShader.js';

/**
 * Custom 3D Helix Curve for Tesla Coil
 */
class HelixCurve extends THREE.Curve {
  constructor(radius = 0.5, height = 2.2, turns = 8) {
    super();
    this.radius = radius;
    this.height = height;
    this.turns = turns;
  }

  getPoint(t, optionalTarget = new THREE.Vector3()) {
    const point = optionalTarget;
    const angle = t * Math.PI * 2 * this.turns;
    const x = Math.cos(angle) * this.radius;
    const y = t * this.height;
    const z = Math.sin(angle) * this.radius;
    return point.set(x, y, z);
  }
}

/**
 * Builds the complete Physics Station featuring:
 * - Dual high-power Tesla coils with helical copper conductors & toroid terminals.
 * - Central realistic plasma globe with 18 dynamic procedural electric discharge filaments.
 * - Real-time pointer interaction (primary arc bends & tracks cursor contact on glass).
 * - Central graphite electrode with violet corona field emission shell.
 * - Noble gas volumetric Rayleigh haze and dielectric glass contact spots.
 * - Ultra-clear borosilicate glass envelope (IOR 1.47, transmission 0.97).
 * - Dual angled holographic telemetry consoles.
 * @param {THREE.Scene} scene
 * @param {Object} globalUniforms
 * @param {THREE.Camera} [camera]
 * @returns {{ group: THREE.Group, update: Function, controls: Object }}
 */
export function buildPhysicsStation(scene, globalUniforms, camera) {
  const group = new THREE.Group();
  group.name = 'PhysicsStation';
  const basePos = stationPosition('physics');
  group.position.copy(basePos);
  scene.add(group);

  const controls = {
    voltage: { value: 0.65 },
  };

  // ── 1. CIRCULAR SCIENTIFIC PEDESTAL (LIGHT WHITE MATTE NO REFLECTING SURFACE) ──
  const pedestalMat = new THREE.MeshStandardMaterial({
    color: COLOR_POD_WHITE,
    roughness: 0.92,
    metalness: 0.0,
  });

  const trimMat = new THREE.MeshPhysicalMaterial({
    color: COLOR_ALUMINUM,
    metalness: 0.94,
    roughness: 0.22,
    clearcoat: 0.6,
  });

  const grooveMat = new THREE.MeshStandardMaterial({
    color: COLOR_SEAM_GROOVE,
    roughness: 0.88,
    metalness: 0.1,
  });

  const pedestalGeo = new THREE.CylinderGeometry(2.8, 3.1, 0.7, 64);
  const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
  pedestal.position.y = 0.35;
  pedestal.castShadow = true;
  pedestal.receiveShadow = true;
  group.add(pedestal);

  // Recessed groove reveal ring around pedestal
  const grooveRing = new THREE.Mesh(new THREE.TorusGeometry(2.68, 0.04, 8, 64), grooveMat);
  grooveRing.position.y = 0.68;
  grooveRing.rotation.x = Math.PI / 2;
  group.add(grooveRing);

  // Light white matte top platform disc
  const topPlateGeo = new THREE.CylinderGeometry(2.6, 2.6, 0.05, 64);
  const topPlate = new THREE.Mesh(topPlateGeo, pedestalMat);
  topPlate.position.y = 0.725;
  topPlate.receiveShadow = true;
  group.add(topPlate);

  // Concentric glowing cyan accent ring on pedestal
  const accentRingGeo = new THREE.RingGeometry(2.1, 2.22, 64);
  accentRingGeo.rotateX(-Math.PI / 2);
  const accentRingMat = new THREE.MeshPhysicalMaterial({
    color: 0x001122,
    emissive: COLOR_CYAN_ACCENT,
    emissiveIntensity: 2.2,
    roughness: 0.2,
  });
  const accentRing = new THREE.Mesh(accentRingGeo, accentRingMat);
  accentRing.position.y = 0.751;
  group.add(accentRing);

  // ── 2. DUAL HIGH-POWER TESLA COILS (PLACED TO THE SIDES AT Z = ±1.5) ──
  const copperMat = new THREE.MeshPhysicalMaterial({
    color: 0xd97c38,
    metalness: 0.96,
    roughness: 0.18,
    clearcoat: 0.8,
    clearcoatRoughness: 0.1,
  });

  const ceramicMat = new THREE.MeshStandardMaterial({
    color: COLOR_POD_WHITE,
    roughness: 0.92,
    metalness: 0.0,
  });

  const coilPositions = [
    new THREE.Vector3(0, 0.74, -1.5),
    new THREE.Vector3(0, 0.74, 1.5),
  ];

  coilPositions.forEach((pos) => {
    // Insulated ceramic base cylinder
    const baseCyl = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.65, 0.5, 32), ceramicMat);
    baseCyl.position.set(pos.x, pos.y + 0.25, pos.z);
    baseCyl.castShadow = true;
    group.add(baseCyl);

    // Inner ferrite core rod
    const coreCyl = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 2.3, 32), pedestalMat);
    coreCyl.position.set(pos.x, pos.y + 1.6, pos.z);
    coreCyl.castShadow = true;
    group.add(coreCyl);

    // Helical copper tube coil
    const helixCurve = new HelixCurve(0.48, 2.1, 10);
    const tubeGeo = new THREE.TubeGeometry(helixCurve, 240, 0.04, 16, false);
    const coilMesh = new THREE.Mesh(tubeGeo, copperMat);
    coilMesh.position.set(pos.x, pos.y + 0.52, pos.z);
    coilMesh.castShadow = true;
    group.add(coilMesh);

    // Top copper toroid electrode cap
    const toroidCap = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.18, 24, 48), copperMat);
    toroidCap.rotation.x = Math.PI / 2;
    toroidCap.position.set(pos.x, pos.y + 2.7, pos.z);
    toroidCap.castShadow = true;
    group.add(toroidCap);
  });

  // ═════════════════════════════════════════════════════════
  //  PART 3: AUTHENTIC VOLUMETRIC PLASMA GLOBE & DISCHARGE ARCS
  // ═════════════════════════════════════════════════════════
  const plasmaY = 2.4;
  const plasmaRadius = 1.15;
  const sphereCenter = new THREE.Vector3(0, plasmaY, 0);
  const R_electrode = 0.18;
  const R_glass = 1.11;

  const plasmaBallGroup = new THREE.Group();
  plasmaBallGroup.name = 'PlasmaGlobeAssembly';
  group.add(plasmaBallGroup);

  // A. Insulated Dark Ceramic Mount Stalk
  const stalkMat = new THREE.MeshStandardMaterial({
    color: 0x161820,
    roughness: 0.55,
    metalness: 0.15,
  });
  const stalk = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.055, 0.72, 24), stalkMat);
  stalk.position.set(0, 0.75 + 0.36, 0);
  stalk.castShadow = true;
  plasmaBallGroup.add(stalk);

  // Metallic Collar fitting at stalk top
  const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.06, 24), trimMat);
  collar.position.set(0, plasmaY - R_electrode - 0.03, 0);
  plasmaBallGroup.add(collar);

  // B. Central Conductive Graphite Electrode (Dark Conductive Core)
  const graphiteMat = new THREE.MeshPhysicalMaterial({
    color: 0x141822,
    roughness: 0.38,
    metalness: 0.75,
    clearcoat: 0.3,
  });
  const electrodeMesh = new THREE.Mesh(new THREE.SphereGeometry(R_electrode, 32, 32), graphiteMat);
  electrodeMesh.position.copy(sphereCenter);
  electrodeMesh.renderOrder = 2;
  plasmaBallGroup.add(electrodeMesh);

  // C. High-Voltage Ionized Corona Shell (Hugging Central Electrode)
  const coronaMat = createElectrodeCoronaMaterial(globalUniforms);
  const coronaMesh = new THREE.Mesh(new THREE.SphereGeometry(R_electrode * 1.15, 32, 32), coronaMat);
  coronaMesh.position.copy(sphereCenter);
  coronaMesh.renderOrder = 3;
  plasmaBallGroup.add(coronaMesh);

  // D. Noble Gas Volumetric Haze (Ionized Gas Ambient Glow)
  const hazeMat = createNobleGasHazeMaterial(globalUniforms);
  const hazeMesh = new THREE.Mesh(new THREE.SphereGeometry(plasmaRadius * 0.99, 48, 48), hazeMat);
  hazeMesh.position.copy(sphereCenter);
  hazeMesh.renderOrder = 4;
  plasmaBallGroup.add(hazeMesh);

  // E. Procedural Electrical Discharge Filaments (The Sparks!)
  // 18 filaments:
  // - 1 Primary interactive arc (tracking pointer on glass)
  // - 11 Ambient convective drifting arcs
  // - 6 Secondary dielectric branches
  const FILAMENT_COUNT = 18;
  const POINTS_PER_FILAMENT = 32;

  const filaments = [];
  for (let i = 0; i < FILAMENT_COUNT; i++) {
    const isPrimary = i === 0;
    const isBranch = i >= 12;
    const parentId = isBranch ? (i % 6) : null;

    filaments.push({
      id: i,
      isPrimary,
      isBranch,
      parentId,
      branchT: 0.65 + Math.random() * 0.2, // where it branches from parent
      theta: isPrimary ? 1.0 : (Math.random() * Math.PI * 0.6 + 0.35),
      phi: isPrimary ? 0.0 : (Math.random() * Math.PI * 2),
      convectionSpeed: 0.08 + Math.random() * 0.14,
      seed: Math.random() * 500.0,
      targetPos: new THREE.Vector3(),
      active: true,
      intensity: 1.0,
    });
  }

  // Camera-facing Billboard Quad-Strip Geometry
  // For each point, 2 vertices (left & right). N points = 2N vertices.
  const vertsPerFilament = POINTS_PER_FILAMENT * 2;
  const totalVerts = FILAMENT_COUNT * vertsPerFilament;
  const totalIndices = FILAMENT_COUNT * (POINTS_PER_FILAMENT - 1) * 6;

  const positions = new Float32Array(totalVerts * 3);
  const tangents = new Float32Array(totalVerts * 3);
  const sides = new Float32Array(totalVerts);
  const progresses = new Float32Array(totalVerts);
  const filamentIds = new Float32Array(totalVerts);
  const indices = [];

  // Generate static mesh topology
  for (let f = 0; f < FILAMENT_COUNT; f++) {
    const baseVert = f * vertsPerFilament;

    for (let p = 0; p < POINTS_PER_FILAMENT; p++) {
      const vLeft = baseVert + p * 2;
      const vRight = vLeft + 1;
      const t = p / (POINTS_PER_FILAMENT - 1);

      sides[vLeft] = -1.0;
      sides[vRight] = 1.0;

      progresses[vLeft] = t;
      progresses[vRight] = t;

      filamentIds[vLeft] = f;
      filamentIds[vRight] = f;

      if (p < POINTS_PER_FILAMENT - 1) {
        const a = vLeft;
        const b = vRight;
        const c = vLeft + 2;
        const d = vRight + 2;

        indices.push(a, b, c);
        indices.push(b, d, c);
      }
    }
  }

  // Pre-initialize tangents with valid unit vector so shader never encounters zero length / NaN
  for (let i = 0; i < totalVerts; i++) {
    tangents[i * 3] = 0.0;
    tangents[i * 3 + 1] = 1.0;
    tangents[i * 3 + 2] = 0.0;
  }

  const filamentGeo = new THREE.BufferGeometry();
  filamentGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  filamentGeo.setAttribute('aTangent', new THREE.BufferAttribute(tangents, 3));
  filamentGeo.setAttribute('aSide', new THREE.BufferAttribute(sides, 1));
  filamentGeo.setAttribute('aProgress', new THREE.BufferAttribute(progresses, 1));
  filamentGeo.setAttribute('aFilamentId', new THREE.BufferAttribute(filamentIds, 1));
  filamentGeo.setIndex(indices);

  const { material: filamentMat, uniforms: filamentUniforms } = createPlasmaFilamentMaterial(globalUniforms, {
    voltage: controls.voltage.value,
    width: 0.042,
  });

  const filamentMesh = new THREE.Mesh(filamentGeo, filamentMat);
  filamentMesh.renderOrder = 15;
  plasmaBallGroup.add(filamentMesh);

  // F. Dielectric Glass Contact Spots (Luminous Blooms Where Sparks Touch Glass)
  const contactSpotCount = 14;
  const contactSpotGeo = new THREE.CircleGeometry(0.08, 16);
  const contactSpotMat = createGlassContactSpotMaterial(globalUniforms);
  const contactSpots = [];

  for (let i = 0; i < contactSpotCount; i++) {
    const spot = new THREE.Mesh(contactSpotGeo, contactSpotMat);
    spot.renderOrder = 18;
    plasmaBallGroup.add(spot);
    contactSpots.push(spot);
  }

  // G. Dynamic Point Light Linked to Collective Spark Voltage & Flicker
  const plasmaPointLight = new THREE.PointLight(0x00e5ff, 2.5, 7.5, 1.8);
  plasmaPointLight.position.copy(sphereCenter);
  plasmaBallGroup.add(plasmaPointLight);

  // H. Ultra-Clear Borosilicate Glass Envelope (Physical Reflections & Fresnel)
  // Uses transmission: 0 + depthWrite: false so internal plasma sparks are 100% visible
  const glassEnvelopeMat = new THREE.MeshPhysicalMaterial({
    color: 0xebf5ff,
    transparent: true,
    opacity: 0.18,
    roughness: 0.03,
    metalness: 0.05,
    clearcoat: 1.0,
    clearcoatRoughness: 0.02,
    reflectivity: 0.95,
    depthWrite: false, // Key fix: lets internal sparks shine through with crystal clarity
  });
  const outerGlassSphere = new THREE.Mesh(
    new THREE.SphereGeometry(plasmaRadius, 64, 64),
    glassEnvelopeMat
  );
  outerGlassSphere.position.copy(sphereCenter);
  outerGlassSphere.renderOrder = 30;
  plasmaBallGroup.add(outerGlassSphere);

  // ── 4. OVERHEAD ACCELERATOR RING HOUSING ──
  const overheadRingGroup = new THREE.Group();
  overheadRingGroup.position.set(0, 4.6, 0);

  const overheadRingGeo = new THREE.TorusGeometry(2.2, 0.16, 24, 64);
  overheadRingGeo.rotateX(Math.PI / 2);
  const ringMat = new THREE.MeshPhysicalMaterial({
    color: 0x222634,
    metalness: 0.9,
    roughness: 0.25,
    clearcoat: 0.4,
  });
  const overheadRing = new THREE.Mesh(overheadRingGeo, ringMat);
  overheadRingGroup.add(overheadRing);

  const statusLeds = [];
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    const ledMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.05, 16, 16),
      new THREE.MeshPhysicalMaterial({
        color: 0x00e5ff,
        emissive: 0x00e5ff,
        emissiveIntensity: 2.5,
      })
    );
    ledMesh.position.set(Math.cos(a) * 2.2, 0, Math.sin(a) * 2.2);
    overheadRingGroup.add(ledMesh);
    statusLeds.push(ledMesh);
  }

  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2 + 0.5;
    const pylon = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.8, 16), ringMat);
    pylon.position.set(Math.cos(a) * 2.2, 0.9, Math.sin(a) * 2.2);
    overheadRingGroup.add(pylon);
  }

  group.add(overheadRingGroup);

  // ── 6. FAST 3D MULTI-OCTAVE ARC NOISE HELPER ──
  function arcNoise3D(x, y, z, time) {
    const s1 = Math.sin(x * 4.2 + time * 3.8) * Math.cos(y * 3.6 - time * 3.2);
    const s2 = Math.sin(z * 4.8 + time * 4.4) * Math.cos(x * 5.1 + time * 2.9) * 0.5;
    const s3 = Math.sin((x + y + z) * 12.0 + time * 18.0) * 0.25;
    return s1 + s2 + s3;
  }

  // Pointer Raycaster & Sphere Intersection
  const raycaster = new THREE.Raycaster();
  const pointerNDC = new THREE.Vector2();
  const sphereWorldPos = new THREE.Vector3();
  const raySphereIntersection = new THREE.Vector3();
  let isPointerHovering = false;

  // Stored 3D points per filament for tangent calculation and branch anchors
  const filamentPoints = [];
  for (let f = 0; f < FILAMENT_COUNT; f++) {
    const pts = [];
    for (let p = 0; p < POINTS_PER_FILAMENT; p++) {
      pts.push(new THREE.Vector3());
    }
    filamentPoints.push(pts);
  }

  // ── 7. PER-FRAME UPDATE LOOP ──
  const update = (elapsed, dt, uniformsRef) => {
    const v = controls.voltage.value;
    const uniforms = uniformsRef || globalUniforms;

    // A. Update Shaders
    filamentUniforms.uVoltage.value = v;
    coronaMat.uniforms.uVoltage.value = v;
    hazeMat.uniforms.uVoltage.value = v;
    contactSpotMat.uniforms.uVoltage.value = v;

    // B. Pointer Proximity & Raycast
    outerGlassSphere.getWorldPosition(sphereWorldPos);

    if (camera && uniforms.uPointer) {
      pointerNDC.copy(uniforms.uPointer.value);
      raycaster.setFromCamera(pointerNDC, camera);

      // Ray-Sphere intersection test
      const ray = raycaster.ray;
      const vToSphere = sphereWorldPos.clone().sub(ray.origin);
      const proj = vToSphere.dot(ray.direction);
      const closestPointOnRay = ray.origin.clone().addScaledVector(ray.direction, proj);
      const distToSphere = closestPointOnRay.distanceTo(sphereWorldPos);

      if (distToSphere < plasmaRadius * 1.35 && proj > 0) {
        isPointerHovering = true;
        // Direction from sphere center to closest point on ray
        const hitDir = closestPointOnRay.clone().sub(sphereWorldPos).normalize();
        raySphereIntersection.copy(sphereWorldPos).addScaledVector(hitDir, R_glass);
      } else {
        isPointerHovering = false;
      }
    }

    // C. Update Filament Targets & Convection Drift
    const activeFilamentCount = Math.floor(6 + v * (FILAMENT_COUNT - 6));

    for (let f = 0; f < FILAMENT_COUNT; f++) {
      const fil = filaments[f];
      fil.active = f < activeFilamentCount;

      if (!fil.active) continue;

      if (fil.isPrimary) {
        // Primary Interactive Arc
        if (isPointerHovering) {
          // Attract towards cursor position on glass (converted to local sphere coords)
          const localHit = raySphereIntersection.clone().sub(sphereWorldPos);
          fil.targetPos.lerp(localHit, 0.22);
          fil.intensity = 1.6;
        } else {
          // Drifts majestically near upper hemisphere
          const target = new THREE.Vector3(
            Math.sin(1.1) * Math.cos(elapsed * 0.4) * R_glass,
            Math.cos(1.1) * R_glass,
            Math.sin(1.1) * Math.sin(elapsed * 0.4) * R_glass
          );
          fil.targetPos.lerp(target, 0.08);
          fil.intensity = 1.0;
        }
      } else if (fil.isBranch) {
        // Secondary dielectric branch forks off parent filament
        const parent = filaments[fil.parentId];
        if (parent && parent.active) {
          // Target is slightly offset on glass from parent target
          const offsetAngle = fil.id * 1.3;
          const branchTarget = parent.targetPos.clone();
          branchTarget.x += Math.cos(offsetAngle) * 0.35;
          branchTarget.z += Math.sin(offsetAngle) * 0.35;
          branchTarget.normalize().multiplyScalar(R_glass);
          fil.targetPos.copy(branchTarget);
          fil.intensity = parent.intensity * 0.75;
        }
      } else {
        // Ambient Convective Arcs (Drift upwards to apex)
        fil.theta -= fil.convectionSpeed * dt * (0.8 + v * 0.6);

        // When arc reaches apex, extinguish and re-ignite near bottom
        if (fil.theta < 0.28) {
          fil.theta = 1.9 + Math.random() * 0.5;
          fil.phi = Math.random() * Math.PI * 2;
          fil.seed = Math.random() * 500.0;
          fil.convectionSpeed = 0.08 + Math.random() * 0.14;
        }

        fil.targetPos.set(
          Math.sin(fil.theta) * Math.cos(fil.phi) * R_glass,
          Math.cos(fil.theta) * R_glass,
          Math.sin(fil.theta) * Math.sin(fil.phi) * R_glass
        );
        fil.intensity = 1.0;
      }
    }

    // D. Compute 3D Splines, Curl Perturbation & Populate Mesh Buffers
    const posAttr = filamentGeo.attributes.position;
    const tanAttr = filamentGeo.attributes.aTangent;
    const posArr = posAttr.array;
    const tanArr = tanAttr.array;

    const timeVal = elapsed * (1.2 + v * 1.5);

    for (let f = 0; f < FILAMENT_COUNT; f++) {
      const fil = filaments[f];
      const baseVert = f * vertsPerFilament;
      const pts = filamentPoints[f];

      if (!fil.active) {
        // Collapse inactive filaments to center
        for (let p = 0; p < POINTS_PER_FILAMENT; p++) {
          const vLeft = (baseVert + p * 2) * 3;
          const vRight = vLeft + 3;
          posArr[vLeft] = posArr[vRight] = 0;
          posArr[vLeft + 1] = posArr[vRight + 1] = plasmaY;
          posArr[vLeft + 2] = posArr[vRight + 2] = 0;
        }
        continue;
      }

      // Determine Start & End Points
      let startPt;
      if (fil.isBranch && filaments[fil.parentId]) {
        // Branch starts from parent's mid-point
        const parentPts = filamentPoints[fil.parentId];
        const branchIdx = Math.floor(POINTS_PER_FILAMENT * fil.branchT);
        startPt = parentPts[branchIdx].clone().sub(new THREE.Vector3(0, plasmaY, 0));
      } else {
        // Starts on surface of central graphite electrode
        startPt = fil.targetPos.clone().normalize().multiplyScalar(R_electrode);
      }

      const endPt = fil.targetPos;
      const arcDir = endPt.clone().sub(startPt);
      const arcLen = arcDir.length();
      arcDir.normalize();

      // Orthonormal basis perpendicular to arc
      let up = new THREE.Vector3(0, 1, 0);
      if (Math.abs(arcDir.dot(up)) > 0.9) up = new THREE.Vector3(1, 0, 0);
      const perp1 = new THREE.Vector3().crossVectors(arcDir, up).normalize();
      const perp2 = new THREE.Vector3().crossVectors(arcDir, perp1).normalize();

      // Sample 32 points along arc
      for (let p = 0; p < POINTS_PER_FILAMENT; p++) {
        const t = p / (POINTS_PER_FILAMENT - 1);
        const env = Math.sin(t * Math.PI); // Anchored at both electrode & glass

        // Base linear interpolation
        const pt = startPt.clone().addScaledVector(arcDir, t * arcLen);

        // Thermal convection upward lift (+Y)
        const lift = 0.16 * env * (1.0 - t * 0.25) * (0.8 + v * 0.5);
        pt.y += lift;

        // Multi-octave curl perturbation
        const noiseCoord = pt.clone().multiplyScalar(3.2);
        const curl1 = arcNoise3D(noiseCoord.x + fil.seed, noiseCoord.y, noiseCoord.z, timeVal) * 0.15 * env;
        const curl2 = arcNoise3D(noiseCoord.z, noiseCoord.x - fil.seed, noiseCoord.y, timeVal + 37.0) * 0.15 * env;

        // High-frequency electrical jitter
        const jitter1 = (Math.random() - 0.5) * 0.024 * env * v;
        const jitter2 = (Math.random() - 0.5) * 0.024 * env * v;

        pt.addScaledVector(perp1, (curl1 + jitter1) * (0.7 + v * 0.5));
        pt.addScaledVector(perp2, (curl2 + jitter2) * (0.7 + v * 0.5));

        // Constrain strictly within glass radius
        if (pt.length() > R_glass) {
          pt.normalize().multiplyScalar(R_glass);
        }

        // Store local point (offset by sphereCenter.y for world geometry)
        pts[p].set(pt.x, pt.y + plasmaY, pt.z);
      }

      // Write positions and tangents into quad-strip buffer
      for (let p = 0; p < POINTS_PER_FILAMENT; p++) {
        const pCurr = pts[p];
        const pNext = p < POINTS_PER_FILAMENT - 1 ? pts[p + 1] : pCurr;
        const pPrev = p > 0 ? pts[p - 1] : pCurr;
        const tangent = pNext.clone().sub(pPrev).normalize();

        const vLeft = (baseVert + p * 2) * 3;
        const vRight = vLeft + 3;

        posArr[vLeft]     = posArr[vRight]     = pCurr.x;
        posArr[vLeft + 1] = posArr[vRight + 1] = pCurr.y;
        posArr[vLeft + 2] = posArr[vRight + 2] = pCurr.z;

        tanArr[vLeft]     = tanArr[vRight]     = tangent.x;
        tanArr[vLeft + 1] = tanArr[vRight + 1] = tangent.y;
        tanArr[vLeft + 2] = tanArr[vRight + 2] = tangent.z;
      }
    }

    posAttr.needsUpdate = true;
    tanAttr.needsUpdate = true;

    // E. Update Glass Dielectric Contact Spots
    let spotIdx = 0;
    for (let f = 0; f < FILAMENT_COUNT && spotIdx < contactSpotCount; f++) {
      const fil = filaments[f];
      if (!fil.active) continue;

      const spot = contactSpots[spotIdx++];
      spot.visible = true;

      // Position spot at glass inner surface
      const localTarget = fil.targetPos.clone();
      spot.position.set(localTarget.x, localTarget.y + plasmaY, localTarget.z);

      // Orient spot tangent to sphere surface (normal facing inwards to center)
      spot.lookAt(0, plasmaY, 0);

      // Scale spot dynamically with voltage & primary status
      const scale = (fil.isPrimary && isPointerHovering ? 1.5 : 0.85) * (0.8 + v * 0.5);
      spot.scale.setScalar(scale);
    }
    for (let s = spotIdx; s < contactSpotCount; s++) {
      contactSpots[s].visible = false;
    }

    // F. Dynamic Collective Discharge Light Flicker
    const baseLight = 1.6 + v * 2.8;
    const stochasticFlicker = 0.86 + 0.14 * Math.sin(elapsed * 45.0) * Math.sin(elapsed * 97.0);
    plasmaPointLight.intensity = baseLight * stochasticFlicker;

    // G. Rotate Overhead Accelerator Ring & Pulse Status LEDs
    overheadRingGroup.rotation.y = elapsed * 0.15;
    for (let i = 0; i < statusLeds.length; i++) {
      const phase = elapsed * 4.0 + i * 0.8;
      const intensity = 1.0 + Math.sin(phase) * 1.5;
      statusLeds[i].material.emissiveIntensity = Math.max(0.5, intensity * v);
    }
  };

  // Pre-seed geometry buffers so sparks are immediately rendered on frame 0
  update(0, 0.016, globalUniforms);

  return { group, update, controls };
}
