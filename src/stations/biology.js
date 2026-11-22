// src/stations/biology.js — Medical-grade anatomical cutaway eukaryotic cell & SGU Atlas Terminal
import * as THREE from 'three';
import { stationPosition, COLOR_ALUMINUM, COLOR_POD_WHITE, COLOR_CYAN_ACCENT } from '../core/constants.js';

/**
 * Builds the complete Biology Station.
 * @param {THREE.Scene} scene
 * @param {Object} globalUniforms
 * @param {THREE.Camera} [camera]
 * @returns {{ group: THREE.Group, update: Function, controls: Object, openSguModal: Function, interactiveTargets: Array }}
 */
export function buildBiologyStation(scene, globalUniforms, camera) {
  const group = new THREE.Group();
  group.name = 'BiologyStation';
  const basePos = stationPosition('biology');
  group.position.copy(basePos);
  scene.add(group);

  const controls = {
    organelleIsolation: { value: 'all' },
  };

  const interactiveTargets = [];

  // ── 1. PEDESTAL (LIGHT WHITE MATTE NO REFLECTING SURFACE) ──
  const baseMat = new THREE.MeshStandardMaterial({
    color: COLOR_POD_WHITE,
    roughness: 0.92,
    metalness: 0.0,
  });

  const mainPlinth = new THREE.Mesh(new THREE.CylinderGeometry(2.6, 2.9, 0.6, 64), baseMat);
  mainPlinth.position.y = 0.3;
  mainPlinth.castShadow = true;
  mainPlinth.receiveShadow = true;
  group.add(mainPlinth);

  // Recessed LED ring on plinth
  const plinthLedGeo = new THREE.TorusGeometry(2.7, 0.04, 16, 64);
  plinthLedGeo.rotateX(Math.PI / 2);
  const plinthLed = new THREE.Mesh(
    plinthLedGeo,
    new THREE.MeshPhysicalMaterial({
      color: 0x002211,
      emissive: new THREE.Color(0x00ff88),
      emissiveIntensity: 2.2,
    })
  );
  plinthLed.position.y = 0.05;
  group.add(plinthLed);

  // ── 2. SEALED GLASS BIO-CONTAINMENT CYLINDER (LEFT SIDE) ──
  const chamberGroup = new THREE.Group();
  chamberGroup.position.set(-1.1, 0.6, 0);

  // Lower containment ring
  const ringMat = new THREE.MeshPhysicalMaterial({
    color: COLOR_ALUMINUM,
    metalness: 0.95,
    roughness: 0.2,
    clearcoat: 0.6,
  });
  const lowerRing = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.9, 0.25, 32), ringMat);
  lowerRing.position.y = 0.125;
  lowerRing.castShadow = true;
  chamberGroup.add(lowerRing);

  // Glass chamber cylinder
  const glassChamberMat = new THREE.MeshPhysicalMaterial({
    transmission: 0.94,
    ior: 1.5,
    roughness: 0.03,
    metalness: 0.02,
    thickness: 0.12,
    transparent: true,
    opacity: 1.0,
    color: 0xffffff,
    clearcoat: 1.0,
  });
  const glassCylinder = new THREE.Mesh(new THREE.CylinderGeometry(0.82, 0.82, 2.8, 48, 1, true), glassChamberMat);
  glassCylinder.position.y = 1.65;
  chamberGroup.add(glassCylinder);

  // Upper containment cap & air filtration manifold
  const upperCap = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.85, 0.3, 32), ringMat);
  upperCap.position.y = 3.2;
  upperCap.castShadow = true;
  chamberGroup.add(upperCap);

  // Internal nutrient substrate disc at chamber bottom
  const substrate = new THREE.Mesh(
    new THREE.CylinderGeometry(0.78, 0.78, 0.15, 32),
    new THREE.MeshPhysicalMaterial({ color: 0x221a10, roughness: 0.8 })
  );
  substrate.position.y = 0.32;
  chamberGroup.add(substrate);

  // Internal biological growth grow-light
  const growLight = new THREE.PointLight(0x44ff88, 1.2, 4.0, 1.8);
  growLight.position.set(0, 3.0, 0);
  chamberGroup.add(growLight);

  // ── 3. PROCEDURAL BRANCHED BOTANICAL SPECIMEN ──
  const plantGroup = new THREE.Group();
  plantGroup.position.set(0, 0.4, 0);

  const barkMat = new THREE.MeshPhysicalMaterial({
    color: 0x3d2817,
    roughness: 0.85,
    metalness: 0.05,
  });

  const leafMat = new THREE.MeshPhysicalMaterial({
    color: 0x248a44,
    roughness: 0.3,
    metalness: 0.05,
    sheen: 0.6,
    sheenColor: new THREE.Color(0x55ee77),
    transmission: 0.28,
    thickness: 0.3,
    side: THREE.DoubleSide,
  });

  function createBranch(startPoint, dir, length, radius, depth) {
    if (depth <= 0 || length < 0.12) return;
    const endPoint = startPoint.clone().add(dir.clone().multiplyScalar(length));
    const curve = new THREE.LineCurve3(startPoint, endPoint);
    const tubeGeo = new THREE.TubeGeometry(curve, 8, radius, 8, false);
    const tubeMesh = new THREE.Mesh(tubeGeo, barkMat);
    plantGroup.add(tubeMesh);

    if (depth <= 2) {
      const leafCount = 2 + Math.floor(Math.random() * 3);
      for (let l = 0; l < leafCount; l++) {
        const leafGeo = new THREE.PlaneGeometry(0.18, 0.32);
        leafGeo.translate(0, 0.16, 0);
        const leaf = new THREE.Mesh(leafGeo, leafMat);
        leaf.position.copy(endPoint);
        leaf.rotation.set(
          Math.random() * Math.PI,
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI
        );
        plantGroup.add(leaf);
      }
    }

    const childCount = 2;
    for (let c = 0; c < childCount; c++) {
      const spreadAngle = 0.35 + Math.random() * 0.25;
      const rotAngle = (c * Math.PI) + (Math.random() - 0.5) * 0.5;
      const childDir = dir.clone()
        .applyAxisAngle(new THREE.Vector3(1, 0, 0), spreadAngle)
        .applyAxisAngle(new THREE.Vector3(0, 1, 0), rotAngle)
        .normalize();
      createBranch(endPoint, childDir, length * 0.72, radius * 0.65, depth - 1);
    }
  }

  createBranch(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1, 0), 0.75, 0.065, 4);
  chamberGroup.add(plantGroup);
  group.add(chamberGroup);

  // ── 4. MEDICAL-GRADE 3D CUTAWAY EUKARYOTIC CELL (SGU BENCHMARK) ──
  // Floating biological showpiece at x = 1.2, y = 2.15, z = 0
  const cellGroup = new THREE.Group();
  cellGroup.name = 'EukaryoticCellModel';
  cellGroup.position.set(1.2, 2.15, 0);
  group.add(cellGroup);

  // Hologram Projector Dais & Illumination Cone
  const emitterGeo = new THREE.CylinderGeometry(0.85, 0.95, 0.18, 48);
  const emitter = new THREE.Mesh(emitterGeo, baseMat);
  emitter.position.set(1.2, 0.65, 0);
  group.add(emitter);

  const emitterRing = new THREE.Mesh(
    new THREE.RingGeometry(0.65, 0.82, 48),
    new THREE.MeshPhysicalMaterial({
      color: 0x00e5ff,
      emissive: new THREE.Color(0x00e5ff),
      emissiveIntensity: 2.2,
      side: THREE.DoubleSide,
    })
  );
  emitterRing.rotateX(-Math.PI / 2);
  emitterRing.position.set(1.2, 0.742, 0);
  group.add(emitterRing);

  // Soft upward biological illumination cone
  const coneGeo = new THREE.CylinderGeometry(1.0, 0.75, 1.4, 32, 1, true);
  const coneMat = new THREE.MeshBasicMaterial({
    color: 0x00e5ff,
    transparent: true,
    opacity: 0.08,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const bioCone = new THREE.Mesh(coneGeo, coneMat);
  bioCone.position.set(1.2, 1.45, 0);
  group.add(bioCone);

  // Point light inside emitter illuminating cell from below
  const cellSubLight = new THREE.PointLight(0x00e5ff, 1.5, 3.5, 1.8);
  cellSubLight.position.set(1.2, 1.0, 0);
  group.add(cellSubLight);

  // ── A) 3/4 CUTAWAY PLASMA MEMBRANE & CYTOSOL (LIPID BILAYER) ──
  // Cuts out a 80-degree wedge (phiLength = Math.PI * 1.55) exposing the interior
  const membraneGroup = new THREE.Group();
  membraneGroup.name = 'Organelle_Membrane';
  cellGroup.add(membraneGroup);

  const CUT_ANGLE = Math.PI * 1.55; // 279 degrees arc, ~81 degrees cutaway

  const outerMemMat = new THREE.MeshPhysicalMaterial({
    color: 0x0284c7, // Pearlescent deep cyan-teal
    roughness: 0.22,
    metalness: 0.04,
    transmission: 0.45,
    thickness: 0.35,
    ior: 1.35,
    sheen: 0.85,
    sheenColor: new THREE.Color(0x7dd3fc),
    clearcoat: 0.7,
    side: THREE.DoubleSide,
  });

  const innerMemMat = new THREE.MeshPhysicalMaterial({
    color: 0x0369a1,
    roughness: 0.3,
    metalness: 0.02,
    transmission: 0.3,
    side: THREE.DoubleSide,
  });

  const R_OUTER = 1.20;
  const R_INNER = 1.13;

  const outerMemMesh = new THREE.Mesh(
    new THREE.SphereGeometry(R_OUTER, 64, 48, 0, CUT_ANGLE),
    outerMemMat
  );
  membraneGroup.add(outerMemMesh);

  const innerMemMesh = new THREE.Mesh(
    new THREE.SphereGeometry(R_INNER, 64, 48, 0, CUT_ANGLE),
    innerMemMat
  );
  membraneGroup.add(innerMemMesh);

  // Flat cutaway cross-section sealing cap (lipid bilayer rim wall)
  const cutRimGeo = new THREE.PlaneGeometry(R_OUTER - R_INNER, 2.0, 1, 32);
  const cutRimMat = new THREE.MeshPhysicalMaterial({
    color: 0xf8fafc,
    roughness: 0.25,
    metalness: 0.05,
    side: THREE.DoubleSide,
  });

  // Microvilli (organic cellular surface nodules on outer membrane)
  const microvilliCount = 85;
  const microvilliGeo = new THREE.SphereGeometry(0.045, 12, 12);
  microvilliGeo.scale(1.0, 1.8, 1.0);
  const microvilliMat = new THREE.MeshPhysicalMaterial({
    color: 0x38bdf8,
    roughness: 0.3,
    sheen: 0.6,
  });
  const microvilliMesh = new THREE.InstancedMesh(microvilliGeo, microvilliMat, microvilliCount);
  const dummy = new THREE.Object3D();

  let vIdx = 0;
  for (let i = 0; i < microvilliCount * 2 && vIdx < microvilliCount; i++) {
    const theta = Math.acos(2 * Math.random() - 1);
    const phi = Math.random() * CUT_ANGLE;
    // ensure within cut arc
    const x = R_OUTER * Math.sin(theta) * Math.cos(phi);
    const y = R_OUTER * Math.cos(theta);
    const z = R_OUTER * Math.sin(theta) * Math.sin(phi);

    dummy.position.set(x, y, z);
    dummy.lookAt(x * 2, y * 2, z * 2);
    dummy.scale.setScalar(0.7 + Math.random() * 0.5);
    dummy.updateMatrix();
    microvilliMesh.setMatrixAt(vIdx++, dummy.matrix);
  }
  microvilliMesh.instanceMatrix.needsUpdate = true;
  membraneGroup.add(microvilliMesh);

  // Colloidal Cytosol Interior Gel
  const cytosolMat = new THREE.MeshPhysicalMaterial({
    color: 0x0284c7,
    transmission: 0.88,
    roughness: 0.15,
    ior: 1.33,
    transparent: true,
    opacity: 0.22,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const cytosolMesh = new THREE.Mesh(
    new THREE.SphereGeometry(R_INNER - 0.01, 36, 24, 0, CUT_ANGLE),
    cytosolMat
  );
  membraneGroup.add(cytosolMesh);

  // ── B) CUTAWAY NUCLEUS, PORES, NUCLEOLUS & CHROMATIN ──
  const nucleusGroup = new THREE.Group();
  nucleusGroup.name = 'Organelle_Nucleus';
  const NUC_POS = new THREE.Vector3(-0.10, 0.05, 0.02);
  nucleusGroup.position.copy(NUC_POS);
  cellGroup.add(nucleusGroup);

  const nucRadius = 0.46;
  const nucEnvelopeMat = new THREE.MeshPhysicalMaterial({
    color: 0x7c3aed, // Royal violet/purple
    emissive: new THREE.Color(0x4c1d95),
    emissiveIntensity: 0.25,
    roughness: 0.35,
    metalness: 0.05,
    sheen: 0.9,
    sheenColor: new THREE.Color(0xc084fc),
    side: THREE.DoubleSide,
  });

  const nucEnvelopeMesh = new THREE.Mesh(
    new THREE.SphereGeometry(nucRadius, 48, 36, 0, CUT_ANGLE),
    nucEnvelopeMat
  );
  nucleusGroup.add(nucEnvelopeMesh);

  // Inner nuclear lamina
  const nucLaminaMat = new THREE.MeshPhysicalMaterial({
    color: 0x3b0764,
    roughness: 0.5,
    side: THREE.BackSide,
  });
  const nucLamina = new THREE.Mesh(
    new THREE.SphereGeometry(nucRadius - 0.02, 36, 24, 0, CUT_ANGLE),
    nucLaminaMat
  );
  nucleusGroup.add(nucLamina);

  // Nuclear Pore Complexes (NPCs) embedded in outer nuclear envelope
  const poreGeo = new THREE.TorusGeometry(0.022, 0.007, 8, 16);
  const poreMat = new THREE.MeshPhysicalMaterial({
    color: 0xd8b4fe,
    roughness: 0.2,
    emissive: new THREE.Color(0xa855f7),
    emissiveIntensity: 0.4,
  });

  for (let p = 0; p < 36; p++) {
    const pTheta = 0.3 + Math.random() * (Math.PI - 0.6);
    const pPhi = Math.random() * CUT_ANGLE;
    const px = nucRadius * Math.sin(pTheta) * Math.cos(pPhi);
    const py = nucRadius * Math.cos(pTheta);
    const pz = nucRadius * Math.sin(pTheta) * Math.sin(pPhi);

    const poreMesh = new THREE.Mesh(poreGeo, poreMat);
    poreMesh.position.set(px, py, pz);
    poreMesh.lookAt(px * 2, py * 2, pz * 2);
    nucleusGroup.add(poreMesh);
  }

  // Nucleolus (Dense spherical core with warm ruby/amber emission)
  const nucleolusGeo = new THREE.SphereGeometry(0.18, 32, 32);
  const nucleolusMat = new THREE.MeshPhysicalMaterial({
    color: 0xf59e0b,
    emissive: new THREE.Color(0xd97706),
    emissiveIntensity: 0.65,
    roughness: 0.4,
    clearcoat: 0.5,
  });
  const nucleolusMesh = new THREE.Mesh(nucleolusGeo, nucleolusMat);
  nucleusGroup.add(nucleolusMesh);

  // Chromatin Fibers (DNA/histone multi-point 3D spline coils in nucleoplasm)
  const chromatinMat = new THREE.MeshPhysicalMaterial({
    color: 0xec4899,
    roughness: 0.4,
    sheen: 0.7,
  });

  for (let f = 0; f < 4; f++) {
    const points = [];
    const rCoil = 0.24 + f * 0.04;
    for (let pt = 0; pt < 16; pt++) {
      const a = (pt / 16) * Math.PI * 2;
      points.push(
        new THREE.Vector3(
          Math.sin(a * 2.5) * rCoil,
          Math.cos(a * 3.2) * (rCoil * 0.75),
          Math.sin(a * 1.8) * rCoil
        )
      );
    }
    const spline = new THREE.CatmullRomCurve3(points, true);
    const fiberMesh = new THREE.Mesh(new THREE.TubeGeometry(spline, 36, 0.012, 8, true), chromatinMat);
    nucleusGroup.add(fiberMesh);
  }

  // ── C) ROUGH ENDOPLASMIC RETICULUM (RER) WITH STUDDED RIBOSOMES ──
  const rerGroup = new THREE.Group();
  rerGroup.name = 'Organelle_RER';
  cellGroup.add(rerGroup);

  const rerSheetMat = new THREE.MeshPhysicalMaterial({
    color: 0xf43f5e, // Salmon rose-pink
    emissive: new THREE.Color(0x9f1239),
    emissiveIntensity: 0.2,
    roughness: 0.35,
    sheen: 0.75,
    sheenColor: new THREE.Color(0xfecdd3),
    side: THREE.DoubleSide,
  });

  // Layered concentric cisternae folds wrapping around nucleus
  const rerLayers = 4;
  const ribosomePositions = [];

  for (let l = 0; l < rerLayers; l++) {
    const layerRadius = 0.58 + l * 0.09;
    const arcLen = Math.PI * 0.95;
    const arcStart = Math.PI * 0.55;

    // Curved wavy ribbon geometry
    const ribbonPoints = [];
    const steps = 32;
    for (let s = 0; s <= steps; s++) {
      const u = s / steps;
      const angle = arcStart + u * arcLen;
      const wave = Math.sin(u * Math.PI * 4.0) * 0.045;
      const rx = (layerRadius + wave) * Math.cos(angle);
      const rz = (layerRadius + wave) * Math.sin(angle);
      const ry = (u - 0.5) * 0.5;
      ribbonPoints.push(new THREE.Vector3(rx, ry, rz).add(NUC_POS));
    }

    const rerCurve = new THREE.CatmullRomCurve3(ribbonPoints);
    const rerGeo = new THREE.TubeGeometry(rerCurve, 32, 0.038, 12, false);
    const rerMesh = new THREE.Mesh(rerGeo, rerSheetMat);
    rerGroup.add(rerMesh);

    // Collect coordinates for ribosomes along RER sheet
    for (let s = 1; s < steps; s += 2) {
      const p = ribbonPoints[s];
      for (let dot = 0; dot < 3; dot++) {
        ribosomePositions.push(
          new THREE.Vector3(
            p.x + (Math.random() - 0.5) * 0.05,
            p.y + (dot - 1) * 0.035,
            p.z + (Math.random() - 0.5) * 0.05
          )
        );
      }
    }
  }

  // Ribosome Beads (InstancedMesh)
  const ribosomeCount = ribosomePositions.length;
  const riboGeo = new THREE.SphereGeometry(0.013, 8, 8);
  const riboMat = new THREE.MeshPhysicalMaterial({
    color: 0xe0f2fe,
    emissive: new THREE.Color(0x38bdf8),
    emissiveIntensity: 0.6,
    roughness: 0.25,
  });
  const riboInstanced = new THREE.InstancedMesh(riboGeo, riboMat, ribosomeCount);
  ribosomePositions.forEach((pos, i) => {
    dummy.position.copy(pos);
    dummy.scale.setScalar(1.0);
    dummy.updateMatrix();
    riboInstanced.setMatrixAt(i, dummy.matrix);
  });
  riboInstanced.instanceMatrix.needsUpdate = true;
  rerGroup.add(riboInstanced);

  // ── D) SMOOTH ENDOPLASMIC RETICULUM (SER) ──
  const serGroup = new THREE.Group();
  serGroup.name = 'Organelle_SER';
  cellGroup.add(serGroup);

  const serMat = new THREE.MeshPhysicalMaterial({
    color: 0xfb923c, // Coral amber
    emissive: new THREE.Color(0xc2410c),
    emissiveIntensity: 0.2,
    roughness: 0.25,
    clearcoat: 0.6,
  });

  // Winding tubular network branching outward
  const serBranches = [
    [new THREE.Vector3(-0.6, -0.1, 0.4), new THREE.Vector3(-0.75, -0.05, 0.55), new THREE.Vector3(-0.9, -0.15, 0.45)],
    [new THREE.Vector3(-0.75, -0.05, 0.55), new THREE.Vector3(-0.7, 0.15, 0.65), new THREE.Vector3(-0.85, 0.25, 0.55)],
    [new THREE.Vector3(-0.6, -0.25, 0.2), new THREE.Vector3(-0.8, -0.35, 0.3), new THREE.Vector3(-0.7, -0.45, 0.15)],
    [new THREE.Vector3(-0.7, 0.15, 0.65), new THREE.Vector3(-0.6, 0.35, 0.55), new THREE.Vector3(-0.5, 0.45, 0.4)],
  ];

  serBranches.forEach((pts) => {
    const curve = new THREE.CatmullRomCurve3(pts);
    const tubeGeo = new THREE.TubeGeometry(curve, 16, 0.024, 10, false);
    const tubeMesh = new THREE.Mesh(tubeGeo, serMat);
    serGroup.add(tubeMesh);
  });

  // ── E) GOLGI APPARATUS & SECRETORY VESICLES ──
  const golgiGroup = new THREE.Group();
  golgiGroup.name = 'Organelle_Golgi';
  golgiGroup.position.set(0.48, 0.12, 0.32);
  golgiGroup.rotation.set(-0.25, 0.4, 0.2);
  cellGroup.add(golgiGroup);

  const golgiMat = new THREE.MeshPhysicalMaterial({
    color: 0xeab308, // Golden amber
    emissive: new THREE.Color(0xa16207),
    emissiveIntensity: 0.25,
    roughness: 0.2,
    transmission: 0.25,
    clearcoat: 0.85,
    sheen: 0.8,
    side: THREE.DoubleSide,
  });

  // 6 curved stacked crescent cisternae
  for (let c = 0; c < 6; c++) {
    const crescentArc = Math.PI * 0.75;
    const cisternaR = 0.22 + c * 0.035;
    const crescentGeo = new THREE.TorusGeometry(cisternaR, 0.025, 12, 36, crescentArc);
    crescentGeo.scale(1.0, 0.45, 1.0);
    const cisternaMesh = new THREE.Mesh(crescentGeo, golgiMat);
    cisternaMesh.position.y = (c - 2.5) * 0.045;
    cisternaMesh.rotation.x = Math.PI / 2;
    golgiGroup.add(cisternaMesh);
  }

  // Budding Secretory Vesicles trailing toward plasma membrane
  const vesicleMat = new THREE.MeshPhysicalMaterial({
    color: 0xfde047,
    roughness: 0.15,
    transmission: 0.4,
    clearcoat: 0.9,
    emissive: new THREE.Color(0xca8a04),
    emissiveIntensity: 0.4,
  });

  const golgiVesicles = [];
  for (let v = 0; v < 16; v++) {
    const vRadius = 0.028 + Math.random() * 0.025;
    const vMesh = new THREE.Mesh(new THREE.SphereGeometry(vRadius, 16, 16), vesicleMat);
    vMesh.position.set(
      (Math.random() - 0.5) * 0.35 + 0.15,
      (Math.random() - 0.5) * 0.35,
      (Math.random() - 0.5) * 0.35 + 0.12
    );
    vMesh.userData = { initialPos: vMesh.position.clone(), speed: 1.5 + Math.random() * 2.0 };
    golgiGroup.add(vMesh);
    golgiVesicles.push(vMesh);
  }

  // ── F) MITOCHONDRIA WITH VISIBLE INNER CRISTAE FOLDS (4 ANATOMICAL SPECIMENS) ──
  const mitoGroup = new THREE.Group();
  mitoGroup.name = 'Organelle_Mitochondria';
  cellGroup.add(mitoGroup);

  const mitoOuterMat = new THREE.MeshPhysicalMaterial({
    color: 0x059669, // Emerald green
    roughness: 0.3,
    metalness: 0.05,
    clearcoat: 0.6,
    side: THREE.DoubleSide,
  });

  const mitoCristaeMat = new THREE.MeshPhysicalMaterial({
    color: 0x34d399, // Luminous lime/mint green cristae
    emissive: new THREE.Color(0x10b981),
    emissiveIntensity: 0.65,
    roughness: 0.25,
    side: THREE.DoubleSide,
  });

  function createDetailedMitochondrion() {
    const mSingle = new THREE.Group();
    // Longitudinal half capsule (cutaway revealing inner chamber)
    const capGeo = new THREE.CapsuleGeometry(0.11, 0.28, 16, 16);
    const capMesh = new THREE.Mesh(capGeo, mitoOuterMat);
    mSingle.add(capMesh);

    // Inner transverse cristae folded membrane plates
    const cristaeCount = 6;
    for (let cr = 0; cr < cristaeCount; cr++) {
      const crY = (cr - (cristaeCount - 1) / 2) * 0.055;
      const crWidth = 0.14 * (1.0 - Math.abs(crY) * 1.5);
      const crGeo = new THREE.BoxGeometry(crWidth, 0.012, 0.16);
      crGeo.rotateZ((cr % 2 === 0 ? 1 : -1) * 0.2);
      const crMesh = new THREE.Mesh(crGeo, mitoCristaeMat);
      crMesh.position.set((cr % 2 === 0 ? 0.02 : -0.02), crY, 0.04);
      mSingle.add(crMesh);
    }
    return mSingle;
  }

  const mitoConfigs = [
    { pos: new THREE.Vector3(-0.55, -0.28, 0.45), rot: new THREE.Euler(0.4, 0.8, -0.3) },
    { pos: new THREE.Vector3(0.40, -0.42, -0.35), rot: new THREE.Euler(-0.6, -0.4, 0.9) },
    { pos: new THREE.Vector3(-0.48, 0.45, -0.38), rot: new THREE.Euler(0.8, -0.5, 0.3) },
    { pos: new THREE.Vector3(0.52, 0.40, 0.22),  rot: new THREE.Euler(-0.3, 1.1, -0.6) },
  ];

  mitoConfigs.forEach((cfg) => {
    const mito = createDetailedMitochondrion();
    mito.position.copy(cfg.pos);
    mito.rotation.copy(cfg.rot);
    mitoGroup.add(mito);
  });

  // ── G) CENTROSOME & PAIRED 90° CENTRIOLES (9-TRIPLET MICROTUBULE BARRELS) ──
  const centrioleGroup = new THREE.Group();
  centrioleGroup.name = 'Organelle_Centrioles';
  centrioleGroup.position.set(-0.25, 0.48, 0.12);
  cellGroup.add(centrioleGroup);

  const centrioleMat = new THREE.MeshPhysicalMaterial({
    color: 0xd97706, // Golden bronze
    metalness: 0.45,
    roughness: 0.25,
    clearcoat: 0.5,
  });

  function createCentrioleBarrel() {
    const barrel = new THREE.Group();
    // 9 microtubule triplets arranged radially in a cylinder
    for (let b = 0; b < 9; b++) {
      const angle = (b / 9) * Math.PI * 2;
      const bx = Math.cos(angle) * 0.055;
      const bz = Math.sin(angle) * 0.055;
      const bladeGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.22, 8);
      const bladeMesh = new THREE.Mesh(bladeGeo, centrioleMat);
      bladeMesh.position.set(bx, 0, bz);
      barrel.add(bladeMesh);
    }
    return barrel;
  }

  // Centriole 1: Vertical barrel
  const cBarrel1 = createCentrioleBarrel();
  centrioleGroup.add(cBarrel1);

  // Centriole 2: Strict 90-degree perpendicular horizontal barrel
  const cBarrel2 = createCentrioleBarrel();
  cBarrel2.rotation.z = Math.PI / 2;
  cBarrel2.position.set(0.08, 0.08, 0.02);
  centrioleGroup.add(cBarrel2);

  // ── H) LYSOSOMES & PEROXISOMES (METABOLIC VESICLES) ──
  const vesicleGroup = new THREE.Group();
  vesicleGroup.name = 'Organelle_Vesicles';
  cellGroup.add(vesicleGroup);

  const lysoMat = new THREE.MeshPhysicalMaterial({
    color: 0x2563eb, // Royal sapphire blue
    emissive: new THREE.Color(0x1d4ed8),
    emissiveIntensity: 0.35,
    roughness: 0.25,
    transmission: 0.35,
    clearcoat: 0.8,
  });

  const peroxiMat = new THREE.MeshPhysicalMaterial({
    color: 0x6366f1, // Indigo with dense core
    emissive: new THREE.Color(0x4338ca),
    emissiveIntensity: 0.3,
    roughness: 0.3,
  });

  const lysoPositions = [
    new THREE.Vector3(0.25, -0.35, 0.45),
    new THREE.Vector3(-0.35, -0.45, -0.25),
    new THREE.Vector3(0.65, 0.15, -0.30),
    new THREE.Vector3(-0.15, 0.35, -0.55),
    new THREE.Vector3(0.35, 0.55, -0.15),
  ];

  lysoPositions.forEach((pos) => {
    const lyso = new THREE.Mesh(new THREE.SphereGeometry(0.062, 16, 16), lysoMat);
    lyso.position.copy(pos);
    vesicleGroup.add(lyso);
  });

  const peroxiPositions = [
    new THREE.Vector3(0.45, -0.15, 0.55),
    new THREE.Vector3(-0.45, 0.25, 0.35),
    new THREE.Vector3(0.15, -0.55, -0.15),
    new THREE.Vector3(-0.55, -0.15, -0.45),
    new THREE.Vector3(0.55, 0.30, 0.45),
  ];

  peroxiPositions.forEach((pos) => {
    const peroxi = new THREE.Mesh(new THREE.SphereGeometry(0.052, 16, 16), peroxiMat);
    peroxi.position.copy(pos);
    // dense internal enzyme core
    const core = new THREE.Mesh(
      new THREE.SphereGeometry(0.022, 8, 8),
      new THREE.MeshBasicMaterial({ color: 0x1e1b4b })
    );
    peroxi.add(core);
    vesicleGroup.add(peroxi);
  });

  // ── I) CYTOSKELETON MICROTUBULE FILAMENTS ──
  const cytoskeletonGroup = new THREE.Group();
  cytoskeletonGroup.name = 'Organelle_Cytoskeleton';
  cellGroup.add(cytoskeletonGroup);

  const microtubuleMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.65,
  });

  for (let t = 0; t < 12; t++) {
    const endTheta = Math.random() * Math.PI;
    const endPhi = Math.random() * CUT_ANGLE;
    const endPt = new THREE.Vector3(
      R_INNER * Math.sin(endTheta) * Math.cos(endPhi) * 0.92,
      R_INNER * Math.cos(endTheta) * 0.92,
      R_INNER * Math.sin(endTheta) * Math.sin(endPhi) * 0.92
    );
    const midPt = centrioleGroup.position.clone().lerp(endPt, 0.5).add(
      new THREE.Vector3((Math.random() - 0.5) * 0.2, (Math.random() - 0.5) * 0.2, (Math.random() - 0.5) * 0.2)
    );
    const spline = new THREE.CatmullRomCurve3([centrioleGroup.position.clone(), midPt, endPt]);
    const filGeo = new THREE.TubeGeometry(spline, 20, 0.006, 6, false);
    const filMesh = new THREE.Mesh(filGeo, microtubuleMat);
    cytoskeletonGroup.add(filMesh);
  }

  // ── 5. SGU SKETCHFAB INTERACTIVE MODAL (LAUNCHABLE FROM HUD) ──
  function openSguModal() {
    let modal = document.getElementById('vz-sgu-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'vz-sgu-modal';
      modal.style.cssText = `
        position: fixed;
        inset: 0;
        z-index: 99999;
        background: rgba(4, 10, 24, 0.90);
        backdrop-filter: blur(14px);
        display: flex;
        flex-direction: column;
        animation: vzFadeIn 0.25s ease;
        font-family: 'Inter', -apple-system, sans-serif;
      `;
      modal.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; padding:16px 24px; background:rgba(6, 14, 30, 0.96); border-bottom:1px solid rgba(0, 229, 255, 0.35);">
          <div>
            <div style="font-size:18px; font-weight:900; color:#ffffff; letter-spacing:0.5px; display:flex; align-items:center; gap:10px;">
              <span style="color:#00e5ff; font-size:22px;">🔬</span> THE CENTER FOR BIOMEDICAL VISUALIZATION AT SGU (@SGUMedArt)
            </div>
            <div style="font-size:13px; color:#94a3b8; margin-top:2px; font-family:monospace;">
              High-Resolution Eukaryotic Cell 3D Anatomical Atlas • 3.53M Polygons • St. George's University
            </div>
          </div>
          <div style="display:flex; align-items:center; gap:16px;">
            <a href="https://sketchfab.com/3d-models/eukaryotic-cell-b7d84e5f2d5e411fbb195ab2742f2256" target="_blank" rel="noopener noreferrer" style="color:#38bdf8; font-size:13px; text-decoration:none; font-weight:700; padding:8px 14px; border:1px solid rgba(56, 189, 248, 0.4); border-radius:6px; background:rgba(56, 189, 248, 0.12);">
              View on Sketchfab ↗
            </a>
            <button id="vz-sgu-modal-close" style="background:#ef4444; color:#ffffff; border:none; border-radius:6px; padding:8px 18px; font-weight:800; font-size:13px; cursor:pointer; transition:background 0.2s;">
              ✕ CLOSE [ESC]
            </button>
          </div>
        </div>
        <div style="flex:1; position:relative; width:100%; height:100%; background:#000000;">
          <iframe title="Eukaryotic Cell - SGUMedArt" src="https://sketchfab.com/models/b7d84e5f2d5e411fbb195ab2742f2256/embed?autostart=1&ui_theme=dark&annotations_visible=1" style="width:100%; height:100%; border:none;" allow="autoplay; fullscreen; xr-spatial-tracking" xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered web-share allowfullscreen></iframe>
        </div>
      `;
      document.body.appendChild(modal);

      const closeBtn = modal.querySelector('#vz-sgu-modal-close');
      const closeModal = () => {
        modal.remove();
        window.removeEventListener('keydown', onKeyDown);
      };
      closeBtn.addEventListener('click', closeModal);
      const onKeyDown = (e) => {
        if (e.key === 'Escape') closeModal();
      };
      window.addEventListener('keydown', onKeyDown);
    }
  }

  // ── 6. UPDATE LOOP & ORGANELLE ISOLATION LOGIC ──
  const update = (elapsed, dt) => {
    // Gentle plant sway inside chamber
    plantGroup.rotation.z = Math.sin(elapsed * 0.8) * 0.02;

    // Organic floating cell rotation and breathing pulsation (cutaway oriented toward front walkway)
    cellGroup.rotation.y = -1.2 + elapsed * 0.16;
    const pulse = 1.0 + Math.sin(elapsed * 1.5) * 0.012;
    cellGroup.scale.set(pulse, pulse, pulse);

    // Micro-motion of Golgi transport vesicles
    golgiVesicles.forEach((v, idx) => {
      const u = v.userData;
      v.position.x = u.initialPos.x + Math.sin(elapsed * u.speed + idx) * 0.018;
      v.position.y = u.initialPos.y + Math.cos(elapsed * u.speed * 0.8 + idx) * 0.018;
    });

    // Organelle isolation logic
    const isolation = controls.organelleIsolation.value;
    const showAll = isolation === 'all' || isolation === 0 || !isolation;
    const showNucleus = showAll || isolation === 'nucleus' || isolation === 1;
    const showMito = showAll || isolation === 'mitochondria' || isolation === 2;
    const showER = showAll || isolation === 'er' || isolation === 3;
    const showGolgi = showAll || isolation === 'golgi' || isolation === 4;
    const showCentrioles = showAll || isolation === 'centrioles' || isolation === 5;

    // Target visibility & ghosting opacities
    membraneGroup.visible = showAll; // hide outer membrane when isolating internal organelles
    nucleusGroup.visible = showNucleus;
    mitoGroup.visible = showMito;
    rerGroup.visible = showER;
    serGroup.visible = showER;
    golgiGroup.visible = showGolgi;
    centrioleGroup.visible = showCentrioles;
    vesicleGroup.visible = showAll || showGolgi;
    cytoskeletonGroup.visible = showAll || showCentrioles;

    // Highlight emissive punch on isolated organelle
    if (isolation === 'nucleus') {
      nucEnvelopeMat.emissiveIntensity = 0.8;
      nucleolusMat.emissiveIntensity = 1.0;
    } else {
      nucEnvelopeMat.emissiveIntensity = 0.25;
      nucleolusMat.emissiveIntensity = 0.65;
    }

    if (isolation === 'mitochondria') {
      mitoCristaeMat.emissiveIntensity = 1.2;
    } else {
      mitoCristaeMat.emissiveIntensity = 0.65;
    }

    if (isolation === 'er') {
      rerSheetMat.emissiveIntensity = 0.7;
      riboMat.emissiveIntensity = 1.2;
    } else {
      rerSheetMat.emissiveIntensity = 0.2;
      riboMat.emissiveIntensity = 0.6;
    }

    if (isolation === 'golgi') {
      golgiMat.emissiveIntensity = 0.8;
    } else {
      golgiMat.emissiveIntensity = 0.25;
    }
  };

  const destroy = () => {};

  return {
    group,
    update,
    controls,
    openSguModal,
    interactiveTargets,
    destroy,
  };
}
