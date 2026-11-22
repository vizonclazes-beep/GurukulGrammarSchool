// src/stations/chemistry.js — Atomic Flame Test & Quantum Emission Spectroscopy Station
import * as THREE from 'three';
import { stationPosition, STATION_ANGLES, COLOR_ALUMINUM, COLOR_POD_WHITE, COLOR_CYAN_ACCENT } from '../core/constants.js';
import { createFlameMaterial } from '../shaders/flameShader.js';

/**
 * High School Chemistry Element Catalog:
 * Contains authentic spectral emission data, dominant wavelengths, flame colors, and quantum transitions.
 */
export const FLAME_ELEMENTS = {
  clean: {
    name: 'Base Blue (Hydrocarbon)',
    ion: 'CH* / C₂*',
    salt: 'Pure Fuel (Methane/Propane)',
    colorName: 'Electric Premixed Blue',
    outerColor: 0x0066ff,
    innerColor: 0x00f0ff,
    tipColor: 0x002288,
    lightColor: 0x0077ff,
    lightIntensity: 0.85,
    wavelengths: ['431.4 nm (CH*)', '473.7 nm (Swan)', '516.5 nm (C₂*)'],
    spectralLines: [
      { nm: 431.4, color: '#00ccff', intensity: 0.8 },
      { nm: 473.7, color: '#00aaff', intensity: 0.9 },
      { nm: 516.5, color: '#00ffaa', intensity: 0.85 },
    ],
    quantumTransition: 'Radical electronic band transitions (Swan & CH*)',
    deltaE: '2.4–2.9 eV',
  },
  copper: {
    name: 'Copper',
    ion: 'Cu²⁺',
    salt: 'Copper(II) Chloride (CuCl₂)',
    colorName: 'Emerald Green & Turquoise',
    outerColor: 0x00e676,
    innerColor: 0x80ffdb,
    tipColor: 0x00b4d8,
    lightColor: 0x00e676,
    lightIntensity: 0.95,
    wavelengths: ['510.5 nm', '515.3 nm', '521.8 nm', '578.2 nm'],
    spectralLines: [
      { nm: 510.5, color: '#00ff88', intensity: 0.95 },
      { nm: 515.3, color: '#10f590', intensity: 0.9 },
      { nm: 521.8, color: '#38ef7d', intensity: 1.0 },
      { nm: 578.2, color: '#c6ff00', intensity: 0.7 },
    ],
    quantumTransition: '4p → 4s (Excited d-orbital & s-orbital relaxation)',
    deltaE: '2.38 eV',
  },
  strontium: {
    name: 'Strontium',
    ion: 'Sr²⁺',
    salt: 'Strontium Chloride (SrCl₂)',
    colorName: 'Brilliant Crimson Scarlet',
    outerColor: 0xff1744,
    innerColor: 0xff7597,
    tipColor: 0xd50000,
    lightColor: 0xff1744,
    lightIntensity: 1.05,
    wavelengths: ['460.7 nm', '605.0 nm', '668.0 nm', '683.0 nm'],
    spectralLines: [
      { nm: 460.7, color: '#3d5afe', intensity: 0.4 },
      { nm: 605.0, color: '#ff5252', intensity: 0.75 },
      { nm: 646.0, color: '#ff1744', intensity: 0.85 },
      { nm: 668.0, color: '#d50000', intensity: 1.0 },
      { nm: 683.0, color: '#b71c1c', intensity: 0.9 },
    ],
    quantumTransition: '5p → 5s (Singlet & triplet de-excitation)',
    deltaE: '1.85 eV',
  },
  sodium: {
    name: 'Sodium',
    ion: 'Na⁺',
    salt: 'Sodium Chloride (NaCl / Halite)',
    colorName: 'Intense Golden Yellow (D-Lines)',
    outerColor: 0xffb300,
    innerColor: 0xfff176,
    tipColor: 0xff8f00,
    lightColor: 0xffa000,
    lightIntensity: 1.10,
    wavelengths: ['589.0 nm (D₂)', '589.6 nm (D₁)'],
    spectralLines: [
      { nm: 589.0, color: '#ffea00', intensity: 1.0 },
      { nm: 589.6, color: '#ffd600', intensity: 0.95 },
    ],
    quantumTransition: '3p → 3s (Fine-structure spin-orbit doublet)',
    deltaE: '2.10 eV',
  },
  potassium: {
    name: 'Potassium',
    ion: 'K⁺',
    salt: 'Potassium Chloride (KCl)',
    colorName: 'Ethereal Lilac / Violet',
    outerColor: 0xb388ff,
    innerColor: 0xf3e5f5,
    tipColor: 0x7c4dff,
    lightColor: 0xaa00ff,
    lightIntensity: 0.90,
    wavelengths: ['404.4 nm (Violet)', '766.5 nm (Near-IR)', '769.9 nm'],
    spectralLines: [
      { nm: 404.4, color: '#b388ff', intensity: 0.9 },
      { nm: 404.7, color: '#d1c4e9', intensity: 0.7 },
      { nm: 693.9, color: '#b71c1c', intensity: 0.3 },
      { nm: 766.5, color: '#880e4f', intensity: 0.95 },
    ],
    quantumTransition: '4p → 4s and 5p → 4s (High-energy violet & IR)',
    deltaE: '3.06 eV & 1.62 eV',
  },
  barium: {
    name: 'Barium',
    ion: 'Ba²⁺',
    salt: 'Barium Chloride (BaCl₂)',
    colorName: 'Apple Pale Green',
    outerColor: 0x84cc16,
    innerColor: 0xecfccb,
    tipColor: 0x4d7c0f,
    lightColor: 0x84cc16,
    lightIntensity: 0.90,
    wavelengths: ['513.7 nm', '524.2 nm', '534.1 nm', '553.5 nm'],
    spectralLines: [
      { nm: 513.7, color: '#65a30d', intensity: 0.75 },
      { nm: 524.2, color: '#84cc16', intensity: 0.95 },
      { nm: 534.1, color: '#a3e635', intensity: 0.9 },
      { nm: 553.5, color: '#bef264', intensity: 1.0 },
    ],
    quantumTransition: '6p → 6s (Multiplet green line cascade)',
    deltaE: '2.24 eV',
  },
  calcium: {
    name: 'Calcium',
    ion: 'Ca²⁺',
    salt: 'Calcium Chloride (CaCl₂)',
    colorName: 'Fiery Brick-Red / Orange',
    outerColor: 0xff5722,
    innerColor: 0xffccbc,
    tipColor: 0xd84315,
    lightColor: 0xff5722,
    lightIntensity: 0.95,
    wavelengths: ['422.7 nm (Violet)', '616.2 nm', '622.0 nm (Orange-Red)'],
    spectralLines: [
      { nm: 422.7, color: '#7c4dff', intensity: 0.5 },
      { nm: 616.2, color: '#ff7043', intensity: 0.85 },
      { nm: 622.0, color: '#ff5722', intensity: 1.0 },
    ],
    quantumTransition: '4p → 4s and molecular CaOH orange bands',
    deltaE: '2.00 eV',
  },
};

/**
 * Builds the complete Atomic Flame Test & Quantum Emission Spectroscopy Chemistry Station.
 * @param {THREE.Scene} scene
 * @param {Object} globalUniforms
 * @returns {{ group: THREE.Group, update: Function, controls: Object }}
 */
export function buildChemistryStation(scene, globalUniforms) {
  const group = new THREE.Group();
  group.name = 'ChemistryStation';

  // Base position in museum atrium
  const basePos = stationPosition('chemistry');
  group.position.copy(basePos);
  scene.add(group);

  // Basis vectors for station geometry orientation relative to incoming walkway:
  const stAngle = STATION_ANGLES.chemistry;
  const fwdX = Math.cos(stAngle);  // +0.3090
  const fwdZ = Math.sin(stAngle);  // +0.9511
  // Perpendicular vector to visitor's screen LEFT:
  const scrLeftX = fwdZ;    // +0.9511
  const scrLeftZ = -fwdX;   // -0.3090
  // Perpendicular vector to visitor's screen RIGHT:
  const scrRightX = -fwdZ;  // -0.9511
  const scrRightZ = fwdX;   // +0.3090
  // Vector facing visitor (towards camera):
  const faceVisX = -fwdX;   // -0.3090
  const faceVisZ = -fwdZ;   // -0.9511
  const faceVisRotY = Math.atan2(faceVisX, faceVisZ);

  // State controls for HUD & simulation
  const controls = {
    element: { value: 'sodium' },
    airCollar: { value: 1.0 }, // 0.0 = Safety yellow flame, 1.0 = Roaring blue premixed flame
    setElement: null,
  };

  // ════════════════════════════════════════════════════════════════════
  // 1. ARCHITECTURAL PEDESTAL & REFRACTORY CERAMIC HEARTH
  // ════════════════════════════════════════════════════════════════════
  const plinthMat = new THREE.MeshStandardMaterial({
    color: COLOR_POD_WHITE,
    roughness: 0.92,
    metalness: 0.0,
  });

  const chromeMat = new THREE.MeshPhysicalMaterial({
    color: COLOR_ALUMINUM,
    metalness: 0.95,
    roughness: 0.15,
    clearcoat: 0.8,
  });

  const brassMat = new THREE.MeshPhysicalMaterial({
    color: 0xd4af37,
    metalness: 0.88,
    roughness: 0.28,
    clearcoat: 0.5,
  });

  const obsidianMat = new THREE.MeshStandardMaterial({
    color: 0x16181f,
    roughness: 0.82,
    metalness: 0.1,
  });

  // Circular tiered plinth
  const plinthGeo = new THREE.CylinderGeometry(2.1, 2.25, 0.82, 48);
  const plinth = new THREE.Mesh(plinthGeo, plinthMat);
  plinth.position.y = 0.41;
  plinth.receiveShadow = true;
  plinth.castShadow = true;
  group.add(plinth);

  // Brushed aluminum accent rim
  const rimGeo = new THREE.TorusGeometry(2.12, 0.03, 16, 64);
  const rim = new THREE.Mesh(rimGeo, chromeMat);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.82;
  group.add(rim);

  // Base illuminated LED halo
  const haloGeo = new THREE.TorusGeometry(2.26, 0.02, 16, 64);
  const haloMat = new THREE.MeshBasicMaterial({
    color: COLOR_CYAN_ACCENT,
    transparent: true,
    opacity: 0.7,
  });
  const halo = new THREE.Mesh(haloGeo, haloMat);
  halo.rotation.x = Math.PI / 2;
  halo.position.y = 0.03;
  group.add(halo);

  // Heat-resistant refractory ceramic hearth disc
  const hearthGeo = new THREE.CylinderGeometry(1.4, 1.45, 0.06, 48);
  const hearth = new THREE.Mesh(hearthGeo, obsidianMat);
  hearth.position.y = 0.85;
  hearth.receiveShadow = true;
  group.add(hearth);

  // Stainless steel reveal ring inside hearth
  const innerRingGeo = new THREE.TorusGeometry(0.55, 0.015, 16, 48);
  const innerRing = new THREE.Mesh(innerRingGeo, chromeMat);
  innerRing.rotation.x = Math.PI / 2;
  innerRing.position.y = 0.88;
  group.add(innerRing);

  // ════════════════════════════════════════════════════════════════════
  // 2. PRECISION SCIENTIFIC BUNSEN BURNER
  // ════════════════════════════════════════════════════════════════════
  const burnerGroup = new THREE.Group();
  burnerGroup.position.set(0, 0.88, 0);
  group.add(burnerGroup);

  // Machined brass base collar anchoring burner to hearth ring
  const burnerBaseMat = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    roughness: 0.42,
    metalness: 0.72,
  });
  const burnerBase = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.25, 0.05, 32), burnerBaseMat);
  burnerBase.position.y = 0.025;
  burnerBase.castShadow = false;
  burnerGroup.add(burnerBase);

  // Serrated side gas intake nozzle
  const gasNozzleGeo = new THREE.CylinderGeometry(0.025, 0.02, 0.22, 16);
  const gasNozzle = new THREE.Mesh(gasNozzleGeo, brassMat);
  gasNozzle.rotation.z = Math.PI / 2;
  gasNozzle.position.set(-0.24, 0.05, 0);
  burnerGroup.add(gasNozzle);

  // Braided stainless steel gas hose descending into hearth
  class HoseCurve extends THREE.Curve {
    getPoint(t, opt = new THREE.Vector3()) {
      const x = -0.35 - t * 0.45;
      const y = 0.05 - Math.sin(t * Math.PI) * 0.12 - t * 0.07;
      const z = Math.sin(t * 1.5) * 0.15;
      return opt.set(x, y, z);
    }
  }
  const hoseGeo = new THREE.TubeGeometry(new HoseCurve(), 24, 0.016, 12, false);
  const hose = new THREE.Mesh(hoseGeo, chromeMat);
  burnerGroup.add(hose);

  // Rotatable knurled air-control collar (physically rotates with air slider)
  const airCollarGroup = new THREE.Group();
  airCollarGroup.position.y = 0.14;
  burnerGroup.add(airCollarGroup);

  const airCollarGeo = new THREE.CylinderGeometry(0.068, 0.068, 0.09, 32);
  const airCollar = new THREE.Mesh(airCollarGeo, chromeMat);
  airCollarGroup.add(airCollar);

  // Air vent holes
  const ventMat = new THREE.MeshBasicMaterial({ color: 0x050505 });
  for (let i = 0; i < 2; i++) {
    const vent = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.05, 0.14), ventMat);
    vent.rotation.y = (i * Math.PI) / 2;
    airCollarGroup.add(vent);
  }

  // Polished chrome mixing tube / barrel
  const barrelGeo = new THREE.CylinderGeometry(0.052, 0.052, 0.62, 32);
  const barrel = new THREE.Mesh(barrelGeo, chromeMat);
  barrel.position.y = 0.48;
  barrel.castShadow = true;
  burnerGroup.add(barrel);

  // Flame stabilizer nozzle rim at top
  const nozzleRimGeo = new THREE.CylinderGeometry(0.062, 0.052, 0.04, 32);
  const nozzleRim = new THREE.Mesh(nozzleRimGeo, chromeMat);
  nozzleRim.position.y = 0.80;
  burnerGroup.add(nozzleRim);

  // Stainless flame grid mesh
  const gridGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.005, 16);
  const grid = new THREE.Mesh(gridGeo, obsidianMat);
  grid.position.y = 0.815;
  burnerGroup.add(grid);

  // ════════════════════════════════════════════════════════════════════
  // 3. MULTI-ZONE PROCEDURAL 3D FLAME & VOLUMETRIC LIGHTING
  // ════════════════════════════════════════════════════════════════════
  const flameGroup = new THREE.Group();
  flameGroup.position.set(0, 0.82, 0); // mouth of the burner
  burnerGroup.add(flameGroup);

  // Outer turbulent flame envelope
  const { material: flameMaterial, uniforms: flameUniforms } = createFlameMaterial(globalUniforms, {
    flameMode: 1.0,
    intensity: 1.4,
  });

  const outerFlameGeo = new THREE.CylinderGeometry(0.008, 0.065, 0.92, 32, 48, true);
  outerFlameGeo.translate(0, 0.46, 0);
  const outerFlameMesh = new THREE.Mesh(outerFlameGeo, flameMaterial);
  flameGroup.add(outerFlameMesh);


  // Dynamic point light simulating combustion emission (linear decay without d=0 singularity)
  const flameLight = new THREE.PointLight(0xffa000, 0.72, 3.6, 1.0);
  flameLight.position.set(0, 0.45, 0);
  flameGroup.add(flameLight);

  // Incandescent vapor & sparkler particle system
  const sparkCount = 65;
  const sparkGeo = new THREE.BufferGeometry();
  const sparkPositions = new Float32Array(sparkCount * 3);
  const sparkVels = [];

  for (let i = 0; i < sparkCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const r = Math.random() * 0.055;
    sparkPositions[i * 3 + 0] = Math.cos(angle) * r;
    sparkPositions[i * 3 + 1] = Math.random() * 0.92;
    sparkPositions[i * 3 + 2] = Math.sin(angle) * r;

    sparkVels.push({
      vx: (Math.random() - 0.5) * 0.08,
      vy: 0.65 + Math.random() * 0.85,
      vz: (Math.random() - 0.5) * 0.08,
      seed: Math.random() * 100,
    });
  }
  sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPositions, 3));

  const sparkMat = new THREE.PointsMaterial({
    size: 0.026,
    color: 0xffcc44,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const sparkPoints = new THREE.Points(sparkGeo, sparkMat);
  flameGroup.add(sparkPoints);

  // ════════════════════════════════════════════════════════════════════
  // 4. REAGENT DISH CAROUSEL ON FRONT ARC (FACING VISITOR)
  // ════════════════════════════════════════════════════════════════════
  const watchGlassGroup = new THREE.Group();
  watchGlassGroup.position.set(0, 0.88, 0);
  group.add(watchGlassGroup);

  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xf0f8ff,
    transmission: 0.92,
    ior: 1.5,
    roughness: 0.04,
    metalness: 0.05,
    transparent: true,
    opacity: 0.85,
  });

  // Arrayed symmetrically along front edge facing the visitor
  const saltConfigs = [
    { key: 'copper',    label: 'Cu²⁺', saltName: 'CuCl₂',  color: 0x059669, alpha: -0.65 },
    { key: 'strontium', label: 'Sr²⁺', saltName: 'SrCl₂',  color: 0xdc2626, alpha: -0.39 },
    { key: 'sodium',    label: 'Na⁺',  saltName: 'NaCl',   color: 0xf59e0b, alpha: -0.13 },
    { key: 'potassium', label: 'K⁺',   saltName: 'KCl',    color: 0xa855f7, alpha: +0.13 },
    { key: 'barium',    label: 'Ba²⁺', saltName: 'BaCl₂',  color: 0x84cc16, alpha: +0.39 },
    { key: 'calcium',   label: 'Ca²⁺', saltName: 'CaCl₂',  color: 0xea580c, alpha: +0.65 },
  ];

  const saltMeshes = {};

  saltConfigs.forEach((cfg) => {
    const dish = new THREE.Group();
    const cA = Math.cos(cfg.alpha);
    const sA = Math.sin(cfg.alpha);
    const posX = 0.98 * (cA * faceVisX + sA * scrRightX);
    const posZ = 0.98 * (cA * faceVisZ + sA * scrRightZ);
    dish.position.set(posX, 0.01, posZ);

    // Watch glass shallow dish
    const dishProfile = [
      new THREE.Vector2(0.001, 0),
      new THREE.Vector2(0.08, 0.005),
      new THREE.Vector2(0.11, 0.02),
      new THREE.Vector2(0.12, 0.024),
    ];
    const dishGeo = new THREE.LatheGeometry(dishProfile, 32);
    const dishMesh = new THREE.Mesh(dishGeo, glassMat);
    dishMesh.receiveShadow = true;
    dish.add(dishMesh);

    // Crystalline powder mound
    const saltGeo = new THREE.ConeGeometry(0.085, 0.026, 24);
    saltGeo.translate(0, 0.013, 0);
    const saltMat = new THREE.MeshStandardMaterial({
      color: cfg.color,
      roughness: 0.65,
      metalness: 0.1,
    });
    const saltMesh = new THREE.Mesh(saltGeo, saltMat);
    dish.add(saltMesh);

    // Etched chemical formula label disc on hearth
    const labelCanvas = document.createElement('canvas');
    labelCanvas.width = 256;
    labelCanvas.height = 128;
    const lCtx = labelCanvas.getContext('2d');
    lCtx.clearRect(0, 0, 256, 128);
    lCtx.font = 'bold 50px monospace';
    lCtx.fillStyle = '#ffffff';
    lCtx.textAlign = 'center';
    lCtx.textBaseline = 'middle';
    lCtx.fillText(cfg.label, 128, 64);

    const lTex = new THREE.CanvasTexture(labelCanvas);
    const labelSpriteMat = new THREE.SpriteMaterial({
      map: lTex,
      transparent: true,
      opacity: 0.88,
    });
    const labelSprite = new THREE.Sprite(labelSpriteMat);
    labelSprite.scale.set(0.32, 0.16, 1.0);
    labelSprite.position.set(0, 0.06, 0.12);
    dish.add(labelSprite);

    watchGlassGroup.add(dish);
    saltMeshes[cfg.key] = { group: dish, position: new THREE.Vector3(posX, 0.89, posZ) };
  });

  // Acid rinse beaker
  const rinseGroup = new THREE.Group();
  const rPosX = 0.98 * (Math.cos(-0.95) * faceVisX + Math.sin(-0.95) * scrRightX);
  const rPosZ = 0.98 * (Math.cos(-0.95) * faceVisZ + Math.sin(-0.95) * scrRightZ);
  rinseGroup.position.set(rPosX, 0.01, rPosZ);

  const rinseBeaker = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.14, 24), glassMat);
  rinseBeaker.position.y = 0.07;
  rinseGroup.add(rinseBeaker);

  const rinseFluid = new THREE.Mesh(
    new THREE.CylinderGeometry(0.086, 0.086, 0.09, 24),
    new THREE.MeshPhysicalMaterial({ color: 0x88ccff, transmission: 0.9, opacity: 0.8, transparent: true })
  );
  rinseFluid.position.y = 0.06;
  rinseGroup.add(rinseFluid);

  const rCanvas = document.createElement('canvas');
  rCanvas.width = 256;
  rCanvas.height = 128;
  const rCtx = rCanvas.getContext('2d');
  rCtx.font = 'bold 44px monospace';
  rCtx.fillStyle = '#88ccff';
  rCtx.textAlign = 'center';
  rCtx.textBaseline = 'middle';
  rCtx.fillText('HCl Rinse', 128, 64);
  const rTex = new THREE.CanvasTexture(rCanvas);
  const rSprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: rTex, transparent: true, opacity: 0.8 }));
  rSprite.scale.set(0.32, 0.16, 1.0);
  rSprite.position.set(0, 0.06, 0.12);
  rinseGroup.add(rSprite);

  watchGlassGroup.add(rinseGroup);

  // ════════════════════════════════════════════════════════════════════
  // 5. MOTORIZED INOCULATION SAMPLE ARM & PLATINUM LOOP
  // ════════════════════════════════════════════════════════════════════
  const armBase = new THREE.Group();
  armBase.position.set(scrRightX * 0.55, 0.88, scrRightZ * 0.55);
  group.add(armBase);

  // Articulated robotic servo column
  const servoPillar = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.06, 0.45, 24), chromeMat);
  servoPillar.position.y = 0.225;
  servoPillar.castShadow = true;
  armBase.add(servoPillar);

  // Rotating shoulder knuckle
  const shoulder = new THREE.Group();
  shoulder.position.y = 0.45;
  armBase.add(shoulder);

  const shoulderJoint = new THREE.Mesh(new THREE.SphereGeometry(0.06, 16, 16), brassMat);
  shoulder.add(shoulderJoint);

  // Insulated handle rod
  const wand = new THREE.Group();
  shoulder.add(wand);

  const wandRod = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.82, 16), chromeMat);
  wandRod.rotation.z = Math.PI / 2;
  wandRod.position.x = 0.41;
  wand.add(wandRod);

  // Coiled platinum wire tip with sample loop
  const platinumMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.98,
    roughness: 0.1,
    clearcoat: 1.0,
  });
  const loopMesh = new THREE.Mesh(new THREE.TorusGeometry(0.018, 0.003, 16, 32), platinumMat);
  loopMesh.rotation.y = Math.PI / 2;
  loopMesh.position.set(0.84, 0, 0);
  wand.add(loopMesh);


  // ════════════════════════════════════════════════════════════════════
  // 6. 3D HOLOGRAPHIC SPECTROSCOPE SCREEN (3% TRANSPARENCY, FACING HOME POD)
  // ════════════════════════════════════════════════════════════════════
  // Positioned on the left flank with its concave face oriented directly towards the Home Pod
  const spectroGroup = new THREE.Group();
  spectroGroup.position.set(scrLeftX * 1.35, 1.82, scrLeftZ * 1.35);

  // Mathematically orient the screen to face directly toward the Home Pod at (0, 0, 0)
  const screenWorldX = basePos.x + scrLeftX * 1.35;
  const screenWorldZ = basePos.z + scrLeftZ * 1.35;
  const angleToHome = Math.atan2(-screenWorldX, -screenWorldZ);
  spectroGroup.rotation.y = angleToHome;
  group.add(spectroGroup);

  // Optical glass dispersion prism
  const prismShape = new THREE.Shape();
  prismShape.moveTo(-0.12, -0.10);
  prismShape.lineTo(0.12, -0.10);
  prismShape.lineTo(0.0, 0.14);
  prismShape.closePath();

  const prismGeo = new THREE.ExtrudeGeometry(prismShape, { depth: 0.18, bevelEnabled: false });
  prismGeo.center();
  const opticalGlassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transmission: 0.98,
    ior: 1.58,
    roughness: 0.01,
    metalness: 0.0,
    clearcoat: 1.0,
    transparent: true,
    opacity: 0.9,
  });
  const prismMesh = new THREE.Mesh(prismGeo, opticalGlassMat);
  prismMesh.position.set(0.78, -0.15, 0.0);
  spectroGroup.add(prismMesh);

  // Incoming light ray from flame mouth into prism
  const rayMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.45,
    blending: THREE.AdditiveBlending,
  });
  const rayGeo = new THREE.CylinderGeometry(0.007, 0.007, 0.9, 8);
  const rayMesh = new THREE.Mesh(rayGeo, rayMat);
  rayMesh.position.set(1.15, -0.32, 0.0);
  rayMesh.rotation.z = -Math.PI * 0.30;
  spectroGroup.add(rayMesh);

  // High-DPI Canvas for Dynamic Quantum Emission Spectral Lines
  const specCanvas = document.createElement('canvas');
  specCanvas.width = 1024;
  specCanvas.height = 256;
  const specCtx = specCanvas.getContext('2d');
  const specTexture = new THREE.CanvasTexture(specCanvas);
  specTexture.minFilter = THREE.LinearFilter;

  // Curved holographic screen ribbon (concave face towards Home Pod)
  const ribbonGeo = new THREE.PlaneGeometry(2.0, 0.60, 32, 1);
  const posAttr = ribbonGeo.attributes.position;
  for (let i = 0; i < posAttr.count; i++) {
    const x = posAttr.getX(i);
    posAttr.setZ(i, -Math.sin(((x + 1.0) / 2.0) * Math.PI) * 0.15);
  }
  ribbonGeo.computeVertexNormals();

  // 3% TRANSPARENCY (97% OPACITY): deep dark holographic glass with high contrast
  const ribbonMat = new THREE.MeshBasicMaterial({
    map: specTexture,
    transparent: true,
    opacity: 0.97, // Exactly 3% transparency requested by user
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const ribbonMesh = new THREE.Mesh(ribbonGeo, ribbonMat);
  ribbonMesh.position.set(-0.20, 0.0, 0.0);
  spectroGroup.add(ribbonMesh);

  // Curved top and bottom aluminum bezel rails
  const railCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-1.00 - 0.20, 0, 0.0),
    new THREE.Vector3(-0.50 - 0.20, 0, -0.10),
    new THREE.Vector3(0.00 - 0.20, 0, -0.15),
    new THREE.Vector3(0.50 - 0.20, 0, -0.10),
    new THREE.Vector3(1.00 - 0.20, 0, 0.0),
  ]);
  const railGeo = new THREE.TubeGeometry(railCurve, 32, 0.012, 12, false);
  const topRail = new THREE.Mesh(railGeo, chromeMat);
  topRail.position.y = 0.30;
  spectroGroup.add(topRail);

  const btmRail = new THREE.Mesh(railGeo, chromeMat);
  btmRail.position.y = -0.30;
  spectroGroup.add(btmRail);

  // Glowing cyan neon strip accents along screen bezel
  const neonLineMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff });
  const neonLineGeo = new THREE.TubeGeometry(railCurve, 32, 0.0035, 8, false);
  const topNeon = new THREE.Mesh(neonLineGeo, neonLineMat);
  topNeon.position.y = 0.29;
  spectroGroup.add(topNeon);

  const btmNeon = new THREE.Mesh(neonLineGeo, neonLineMat);
  btmNeon.position.y = -0.29;
  spectroGroup.add(btmNeon);

  // Aerospace support struts anchoring the screen to the pod deck
  const strutMat = chromeMat;
  const leftStrut = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.018, 0.95, 16), strutMat);
  leftStrut.position.set(-1.18, -0.48, 0.0);
  spectroGroup.add(leftStrut);

  const rightStrut = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.018, 0.95, 16), strutMat);
  rightStrut.position.set(0.78, -0.48, 0.0);
  spectroGroup.add(rightStrut);

  /**
   * Redraws the quantum emission spectrum canvas with high scientific accuracy.
   */
  function renderSpectrumCanvas(elementKey) {
    const elData = FLAME_ELEMENTS[elementKey] || FLAME_ELEMENTS.sodium;
    specCtx.clearRect(0, 0, 1024, 256);

    // Deep dark holographic glass background with 97% opacity (3% transparency)
    specCtx.fillStyle = 'rgba(5, 10, 24, 0.97)';
    specCtx.fillRect(6, 6, 1012, 244);

    // Glowing cyan aerospace border with corner notches
    specCtx.strokeStyle = 'rgba(0, 229, 255, 0.85)';
    specCtx.lineWidth = 2.5;
    specCtx.strokeRect(6, 6, 1012, 244);

    // Subtle holographic corner brackets
    specCtx.strokeStyle = '#00e5ff';
    specCtx.lineWidth = 4;
    specCtx.beginPath();
    specCtx.moveTo(6, 32); specCtx.lineTo(6, 6); specCtx.lineTo(32, 6);
    specCtx.stroke();
    specCtx.beginPath();
    specCtx.moveTo(992, 6); specCtx.lineTo(1018, 6); specCtx.lineTo(1018, 32);
    specCtx.stroke();
    specCtx.beginPath();
    specCtx.moveTo(6, 218); specCtx.lineTo(6, 244); specCtx.lineTo(32, 244);
    specCtx.stroke();
    specCtx.beginPath();
    specCtx.moveTo(992, 244); specCtx.lineTo(1018, 244); specCtx.lineTo(1018, 218);
    specCtx.stroke();

    // Header title & quantum info
    specCtx.font = 'bold 22px monospace';
    specCtx.fillStyle = '#00e5ff';
    specCtx.textAlign = 'left';
    specCtx.fillText(`ATOMIC EMISSION SPECTRUM — ${elData.name.toUpperCase()} [${elData.ion}]`, 30, 42);

    specCtx.font = '16px monospace';
    specCtx.fillStyle = 'rgba(224, 232, 255, 0.85)';
    specCtx.fillText(`Salt: ${elData.salt} | ΔE = ${elData.deltaE}`, 30, 68);

    // Spectral bar zone: 380 nm to 750 nm mapped across X = 40 to 984 (width = 944 px)
    const barX = 40;
    const barY = 88;
    const barW = 944;
    const barH = 88;
    const minNm = 380;
    const maxNm = 750;

    // Faint continuous visible spectrum backdrop
    const rainbowGrad = specCtx.createLinearGradient(barX, 0, barX + barW, 0);
    rainbowGrad.addColorStop(0.00, 'rgba(120, 0, 220, 0.15)');  // 380nm violet
    rainbowGrad.addColorStop(0.18, 'rgba(0, 80, 255, 0.15)');   // 450nm blue
    rainbowGrad.addColorStop(0.35, 'rgba(0, 220, 180, 0.15)');  // 510nm cyan
    rainbowGrad.addColorStop(0.48, 'rgba(0, 240, 50, 0.15)');   // 550nm green
    rainbowGrad.addColorStop(0.60, 'rgba(240, 230, 0, 0.15)');  // 600nm yellow
    rainbowGrad.addColorStop(0.75, 'rgba(255, 100, 0, 0.15)');  // 650nm orange
    rainbowGrad.addColorStop(1.00, 'rgba(220, 20, 20, 0.15)');  // 750nm red

    specCtx.fillStyle = rainbowGrad;
    specCtx.fillRect(barX, barY, barW, barH);
    specCtx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    specCtx.strokeRect(barX, barY, barW, barH);

    // Discrete Bright Emission Lines
    elData.spectralLines.forEach((line) => {
      const nmClamped = Math.max(minNm, Math.min(maxNm, line.nm));
      const lineX = barX + ((nmClamped - minNm) / (maxNm - minNm)) * barW;

      // Glow behind the line
      specCtx.save();
      specCtx.shadowColor = line.color;
      specCtx.shadowBlur = 18;
      specCtx.fillStyle = line.color;
      specCtx.fillRect(lineX - 2.5, barY, 5, barH);
      specCtx.restore();

      // Sharp core of line
      specCtx.fillStyle = '#ffffff';
      specCtx.fillRect(lineX - 0.75, barY, 1.5, barH);

      // Wavelength label with indicator tick
      specCtx.font = 'bold 15px monospace';
      specCtx.fillStyle = line.color;
      specCtx.textAlign = 'center';
      specCtx.fillText(`${line.nm.toFixed(1)} nm`, lineX, barY + barH + 22);

      specCtx.beginPath();
      specCtx.moveTo(lineX, barY + barH);
      specCtx.lineTo(lineX, barY + barH + 6);
      specCtx.strokeStyle = line.color;
      specCtx.stroke();
    });

    // Scientific rule caption
    specCtx.font = '14px monospace';
    specCtx.fillStyle = 'rgba(0, 229, 255, 0.9)';
    specCtx.textAlign = 'right';
    specCtx.fillText(`Photon Emission: ΔE = h·c / λ`, 980, 42);

    specCtx.font = '13px monospace';
    specCtx.fillStyle = 'rgba(224, 232, 255, 0.7)';
    specCtx.fillText(elData.quantumTransition, 980, 68);

    specTexture.needsUpdate = true;
  }

  // ════════════════════════════════════════════════════════════════════
  // 7. FLOATING 3D QUANTUM BOHR MODEL (SCREEN RIGHT)
  // ════════════════════════════════════════════════════════════════════
  // Placed on visitor's right flank, perfectly balancing the composition
  const bohrGroup = new THREE.Group();
  bohrGroup.position.set(scrRightX * 1.35, 1.78, scrRightZ * 1.35);
  bohrGroup.rotation.y = faceVisRotY + 0.18; // angled gently toward visitor
  group.add(bohrGroup);

  // Central atomic nucleus
  const nucleusGroup = new THREE.Group();
  bohrGroup.add(nucleusGroup);
  const protonMat = new THREE.MeshStandardMaterial({ color: 0xff3366, roughness: 0.3, emissive: 0x660011 });
  const neutronMat = new THREE.MeshStandardMaterial({ color: 0x00ccff, roughness: 0.3, emissive: 0x003366 });

  for (let i = 0; i < 9; i++) {
    const isProton = i % 2 === 0;
    const nucleon = new THREE.Mesh(new THREE.SphereGeometry(0.024, 16, 16), isProton ? protonMat : neutronMat);
    const th = Math.random() * Math.PI * 2;
    const ph = Math.random() * Math.PI;
    const r = Math.random() * 0.04;
    nucleon.position.set(r * Math.sin(ph) * Math.cos(th), r * Math.sin(ph) * Math.sin(th), r * Math.cos(ph));
    nucleusGroup.add(nucleon);
  }

  // Concentric quantized energy level orbital rings (n=1, n=2, n=3, n=4)
  const ringRadii = [0.18, 0.32, 0.48, 0.64];
  ringRadii.forEach((rad, idx) => {
    const ringGeo = new THREE.TorusGeometry(rad, 0.0025, 12, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      transparent: true,
      opacity: 0.35 + idx * 0.1,
      blending: THREE.AdditiveBlending,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2 + (idx * 0.12);
    ring.rotation.y = idx * 0.18;
    bohrGroup.add(ring);
  });

  // Animated valence electron
  const electronMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    blending: THREE.AdditiveBlending,
  });
  const electron = new THREE.Mesh(new THREE.SphereGeometry(0.022, 16, 16), electronMat);
  bohrGroup.add(electron);

  // Emitted photon pulse wave ring
  const photonPulseGeo = new THREE.RingGeometry(0.015, 0.025, 32);
  const photonPulseMat = new THREE.MeshBasicMaterial({
    color: 0xffea00,
    transparent: true,
    opacity: 0.0,
    side: THREE.FrontSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const photonPulse = new THREE.Mesh(photonPulseGeo, photonPulseMat);
  photonPulse.rotation.x = Math.PI / 2;
  bohrGroup.add(photonPulse);

  // Title label above Bohr Model using 2D Sprite (always faces camera, un-mirrored)
  const bohrCanvas = document.createElement('canvas');
  bohrCanvas.width = 512;
  bohrCanvas.height = 128;
  const bCtx = bohrCanvas.getContext('2d');
  bCtx.clearRect(0, 0, 512, 128);
  bCtx.font = 'bold 36px monospace';
  bCtx.fillStyle = '#00e5ff';
  bCtx.textAlign = 'center';
  bCtx.textBaseline = 'middle';
  bCtx.fillText('BOHR QUANTUM ATOM', 256, 45);
  bCtx.font = '24px monospace';
  bCtx.fillStyle = 'rgba(224, 232, 255, 0.8)';
  bCtx.fillText('ΔE = h·ν = hc / λ', 256, 85);
  const bTex = new THREE.CanvasTexture(bohrCanvas);
  const bohrLabelSprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: bTex, transparent: true, opacity: 0.9 }));
  bohrLabelSprite.scale.set(0.9, 0.22, 1.0);
  bohrLabelSprite.position.set(0, 0.65, 0);
  bohrGroup.add(bohrLabelSprite);

  // ════════════════════════════════════════════════════════════════════
  // 8. INTERACTIVE TRANSITION & UPDATE LOOP
  // ════════════════════════════════════════════════════════════════════
  let currentElementKey = 'sodium';
  let targetOuterColor = new THREE.Color(FLAME_ELEMENTS.sodium.outerColor);
  let targetInnerColor = new THREE.Color(FLAME_ELEMENTS.sodium.innerColor);
  let targetTipColor   = new THREE.Color(FLAME_ELEMENTS.sodium.tipColor);
  let targetLightColor = new THREE.Color(FLAME_ELEMENTS.sodium.lightColor);
  let targetIntensity  = FLAME_ELEMENTS.sodium.lightIntensity;

  // Initialize spectrum canvas
  renderSpectrumCanvas('sodium');

  // Arm kinematics target positions
  let targetShoulderRotY = 0.0;
  let targetWandRotZ = 0.0;

  /**
   * Sets the active test element and triggers physical arm motion & spectroscopy update.
   */
  const setElement = (key) => {
    if (!FLAME_ELEMENTS[key]) key = 'sodium';
    currentElementKey = key;
    controls.element.value = key;
    const el = FLAME_ELEMENTS[key];

    targetOuterColor.setHex(el.outerColor);
    targetInnerColor.setHex(el.innerColor);
    targetTipColor.setHex(el.tipColor);
    targetLightColor.setHex(el.lightColor);
    targetIntensity = el.lightIntensity;

    sparkMat.color.setHex(el.outerColor);
    photonPulseMat.color.setHex(el.outerColor);

    renderSpectrumCanvas(key);

    // Animate robotic inoculation arm
    if (key === 'clean') {
      targetShoulderRotY = -0.85;
      targetWandRotZ = 0.30;
    } else {
      // Inoculate loop in flame
      targetShoulderRotY = 0.12;
      targetWandRotZ = -0.06;
    }
  };

  controls.setElement = setElement;
  setElement('sodium');

  const update = (elapsed, dt) => {
    const airMode = controls.airCollar.value; // 0.0 = Safety, 1.0 = Roaring

    // Rotate physical air collar mesh based on air ratio
    airCollarGroup.rotation.y = THREE.MathUtils.lerp(airCollarGroup.rotation.y, (1.0 - airMode) * Math.PI * 0.45, dt * 5.0);

    // Feed air mode to flame shader
    if (flameUniforms.uFlameMode) {
      flameUniforms.uFlameMode.value = THREE.MathUtils.lerp(flameUniforms.uFlameMode.value, airMode, dt * 4.0);
    }

    // Safety flame is yellow-orange diffusion; roaring flame uses element color
    const effectiveOuter = new THREE.Color();
    const effectiveInner = new THREE.Color();
    const effectiveTip = new THREE.Color();

    if (airMode < 0.99) {
      const yellowDiffusionOuter = new THREE.Color(0xff8800);
      const yellowDiffusionInner = new THREE.Color(0xfff2a0);
      const yellowDiffusionTip = new THREE.Color(0xd94400);

      effectiveOuter.lerpColors(yellowDiffusionOuter, targetOuterColor, airMode);
      effectiveInner.lerpColors(yellowDiffusionInner, targetInnerColor, airMode);
      effectiveTip.lerpColors(yellowDiffusionTip, targetTipColor, airMode);
    } else {
      effectiveOuter.copy(targetOuterColor);
      effectiveInner.copy(targetInnerColor);
      effectiveTip.copy(targetTipColor);
    }

    // Smooth color lerping
    flameUniforms.uColorOuter.value.lerp(effectiveOuter, dt * 6.0);
    flameUniforms.uColorInner.value.lerp(effectiveInner, dt * 6.0);
    flameUniforms.uColorTip.value.lerp(effectiveTip, dt * 6.0);

    // Light color & dynamic gentle flicker (calibrated intensity)
    flameLight.color.lerp(targetLightColor, dt * 6.0);
    const flicker = 0.97 + 0.03 * Math.sin(elapsed * 52.0) * Math.sin(elapsed * 67.0);
    flameLight.intensity = targetIntensity * flicker * (0.62 + airMode * 0.18);

    // Animate robotic inoculation arm kinematics
    shoulder.rotation.y = THREE.MathUtils.lerp(shoulder.rotation.y, targetShoulderRotY, dt * 3.5);
    wand.rotation.z = THREE.MathUtils.lerp(wand.rotation.z, targetWandRotZ, dt * 3.5);

    // Update rising incandescent sparkler particles
    const posArr = sparkGeo.attributes.position.array;
    for (let i = 0; i < sparkCount; i++) {
      const v = sparkVels[i];
      posArr[i * 3 + 1] += v.vy * dt;
      posArr[i * 3 + 0] += Math.sin(elapsed * 4.0 + v.seed) * 0.003;
      posArr[i * 3 + 2] += Math.cos(elapsed * 4.0 + v.seed) * 0.003;

      // Reset when particle reaches top of flame
      if (posArr[i * 3 + 1] > 0.95) {
        posArr[i * 3 + 1] = 0.05;
        const angle = Math.random() * Math.PI * 2;
        const r = Math.random() * 0.035;
        posArr[i * 3 + 0] = Math.cos(angle) * r;
        posArr[i * 3 + 2] = Math.sin(angle) * r;
      }
    }
    sparkGeo.attributes.position.needsUpdate = true;

    // Animate Quantum Bohr Model
    nucleusGroup.rotation.y = elapsed * 0.4;
    nucleusGroup.rotation.x = Math.sin(elapsed * 0.3) * 0.2;

    // Electron orbit & quantum jump cycle (every 3 seconds)
    const jumpCycle = (elapsed % 3.0) / 3.0; // 0 to 1
    let currentOrbitRadius = ringRadii[1]; // n=2 ground level

    if (jumpCycle > 0.35 && jumpCycle < 0.75) {
      // Excited state n=4
      currentOrbitRadius = THREE.MathUtils.lerp(ringRadii[1], ringRadii[3], (jumpCycle - 0.35) / 0.1);
    } else if (jumpCycle >= 0.75) {
      // De-excitation drop back to n=2
      currentOrbitRadius = THREE.MathUtils.lerp(ringRadii[3], ringRadii[1], (jumpCycle - 0.75) / 0.1);

      // Trigger emitted photon pulse (gentle pulse scale)
      const pulseT = (jumpCycle - 0.75) / 0.25;
      photonPulse.scale.setScalar(1.0 + pulseT * 3.5);
      photonPulseMat.opacity = Math.max(0, 1.0 - pulseT * 1.5) * 0.7;
    } else {
      photonPulseMat.opacity = 0.0;
    }

    const electronAngle = elapsed * 5.0;
    electron.position.set(
      Math.cos(electronAngle) * currentOrbitRadius,
      Math.sin(electronAngle * 0.7) * 0.05,
      Math.sin(electronAngle) * currentOrbitRadius
    );

    // Gently float spectroscope & Bohr model in subtle optical hover
    spectroGroup.position.y = 1.78 + Math.sin(elapsed * 1.5) * 0.02;
    bohrGroup.position.y = 1.78 + Math.cos(elapsed * 1.5) * 0.02;
  };

  return { group, update, controls };
}
