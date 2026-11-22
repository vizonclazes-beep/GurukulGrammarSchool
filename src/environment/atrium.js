// src/environment/atrium.js — Seamless curved circular spaceship atrium with modular off-white panels
import * as THREE from 'three';
import {
  ATRIUM_RADIUS,
  ATRIUM_HEIGHT,
  FLOOR_Y,
  COLOR_OFFWHITE_PANEL,
  COLOR_OFFWHITE_WALL,
  COLOR_OFFWHITE_CEIL,
  COLOR_FLOOR_SATIN,
  COLOR_POD_WHITE,
  COLOR_SEAM_GROOVE,
  COLOR_PANEL_DARK,
  COLOR_ALUMINUM,
  COLOR_CYAN_ACCENT,
  COLOR_VIOLET_ACCENT,
  COLOR_COVE_WARM,
} from '../core/constants.js';
import { buildWallExhibits } from './scientistExhibits.js';

/**
 * Builds the curved spaceship atrium structure, panels, recessed seams, LED coves,
 * and procedural environment map using tuned off-white PBR materials to prevent glare.
 * @param {THREE.Scene} scene
 * @param {Object} globalUniforms
 * @returns {THREE.Group}
 */
export function buildAtrium(scene, globalUniforms) {
  const atriumGroup = new THREE.Group();
  atriumGroup.name = 'AtriumGroup';
  scene.add(atriumGroup);

  // ── 1. PROCEDURAL HDR ENVIRONMENT MAP VIA PMREMGENERATOR ──
  generateProceduralEnvMap(scene);

  // ── 2. SATIN COMPOSITE FLOOR WITH MODULAR RECESSED GROOVES ──
  createCompositeFloor(atriumGroup);

  // ── 3. CURVED ATRIUM SHELL (MATTE OFF-WHITE COMPOSITE CERAMIC) ──
  createCurvedAtriumShell(atriumGroup);

  // ── 4. MODULAR WALL PANELS & ANODIZED ALUMINUM BEVELS ──
  createRadialWallPanels(atriumGroup);

  // ── 5. SCIENTIST MUSEUM EXHIBIT PLAQUES (CAROUSEL FORMAT IN ALCOVE WINDOWS) ──
  buildWallExhibits(atriumGroup);

  // ── 6. MODULAR CEILING VAULT RIBS & COFFERED GRID ──
  createCeilingStructure(atriumGroup);

  // ── 7. RECESSED INDIRECT COVE STRIPS ──
  createLedCoves(atriumGroup);

  // ── 8. CENTRAL SPAWN PODIUM & ACCENT RINGS ──
  createCentralSpawnPodium(atriumGroup);

  return atriumGroup;
}

/**
 * Generates a clean, studio-grade sci-fi HDRI cubemap procedurally
 * using PMREMGenerator and applies it to scene.environment.
 */
function generateProceduralEnvMap(scene) {
  const renderer = new THREE.WebGLRenderer({ antialias: false });
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();

  const envScene = new THREE.Scene();
  envScene.background = new THREE.Color(0x0c1018);

  // Subtle luminous strips to bake into reflection map (soft diffuse highlights)
  const stripGeo = new THREE.BoxGeometry(8, 0.35, 1.5);
  const cyanMat = new THREE.MeshBasicMaterial({ color: 0x00b8d4 });
  const warmMat = new THREE.MeshBasicMaterial({ color: 0xfff0dd });
  const violetMat = new THREE.MeshBasicMaterial({ color: 0x5e35b1 });

  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const strip = new THREE.Mesh(stripGeo, i % 2 === 0 ? warmMat : cyanMat);
    strip.position.set(Math.cos(angle) * 14, 7.5 + Math.sin(i) * 1.5, Math.sin(angle) * 14);
    strip.rotation.y = -angle;
    envScene.add(strip);
  }

  // Ceiling ring light in env map
  const topRing = new THREE.Mesh(new THREE.TorusGeometry(8, 0.3, 16, 64), warmMat);
  topRing.position.set(0, 11, 0);
  topRing.rotation.x = Math.PI / 2;
  envScene.add(topRing);

  const envCamera = new THREE.CubeCamera(0.1, 100, new THREE.WebGLCubeRenderTarget(256));
  envCamera.update(renderer, envScene);

  const envMap = pmremGenerator.fromCubemap(envCamera.renderTarget.texture).texture;
  scene.environment = envMap;

  // Cleanup temporary renderer
  renderer.dispose();
  pmremGenerator.dispose();
}

/**
 * Creates the soft satin off-white composite floor disc with recessed grooves and aluminum rings.
 * Prevents hot specular patches or bloom washout.
 */
function createCompositeFloor(parent) {
  const floorRadius = ATRIUM_RADIUS + 0.5;

  // Main floor disc: tuned satin composite finish (roughness 0.30, metalness 0.04)
  const floorGeo = new THREE.CylinderGeometry(floorRadius, floorRadius, 0.2, 128);
  const floorMat = new THREE.MeshPhysicalMaterial({
    color: COLOR_FLOOR_SATIN,
    roughness: 0.30,
    metalness: 0.04,
    clearcoat: 0.22,
    clearcoatRoughness: 0.28,
    reflectivity: 0.45,
    envMapIntensity: 0.7,
  });

  const floor = new THREE.Mesh(floorGeo, floorMat);
  floor.position.y = FLOOR_Y - 0.1;
  floor.receiveShadow = true;
  parent.add(floor);

  // Concentric brushed aluminum rings embedded flush into floor
  const ringRadii = [4.2, 8.2, 12.0, 15.6];
  const ringMat = new THREE.MeshPhysicalMaterial({
    color: COLOR_ALUMINUM,
    metalness: 0.94,
    roughness: 0.24,
    clearcoat: 0.5,
  });

  // Dark recessed groove material (#222630) underneath/flanking rings
  const grooveMat = new THREE.MeshStandardMaterial({
    color: COLOR_SEAM_GROOVE,
    roughness: 0.88,
    metalness: 0.1,
  });

  for (const r of ringRadii) {
    // Recessed dark groove ring (width 0.14)
    const grooveGeo = new THREE.RingGeometry(r - 0.08, r + 0.08, 96);
    grooveGeo.rotateX(-Math.PI / 2);
    const grooveMesh = new THREE.Mesh(grooveGeo, grooveMat);
    grooveMesh.position.y = FLOOR_Y + 0.001;
    grooveMesh.receiveShadow = true;
    parent.add(grooveMesh);

    // Aluminum accent ring inside groove
    const ringGeo = new THREE.RingGeometry(r - 0.04, r + 0.04, 96);
    ringGeo.rotateX(-Math.PI / 2);
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.position.y = FLOOR_Y + 0.002;
    ringMesh.receiveShadow = true;
    parent.add(ringMesh);
  }

  // Radial seams with recessed reveal grooves (24 fine dark seam lines)
  for (let i = 0; i < 24; i++) {
    const angle = (i / 24) * Math.PI * 2;
    const seamLength = floorRadius - 3.2;
    const seamGeo = new THREE.PlaneGeometry(0.045, seamLength);
    seamGeo.rotateX(-Math.PI / 2);
    seamGeo.rotateY(angle);
    const seam = new THREE.Mesh(seamGeo, grooveMat);
    seam.position.set(
      Math.cos(angle) * (seamLength / 2 + 2.8),
      FLOOR_Y + 0.0015,
      Math.sin(angle) * (seamLength / 2 + 2.8)
    );
    parent.add(seam);
  }
}

/**
 * Creates the smooth curved lathe atrium outer shell with matte off-white composite ceramic.
 * Roughness: 0.74, Metalness: 0.04, Color: #EAECEF.
 * Scatters light softly without creating glare or specular blowout.
 */
function createCurvedAtriumShell(parent) {
  const points = [];
  const R = ATRIUM_RADIUS;
  const H = ATRIUM_HEIGHT;

  // Base perimeter footing
  points.push(new THREE.Vector2(R + 0.6, FLOOR_Y));
  points.push(new THREE.Vector2(R, FLOOR_Y + 0.05));

  // Vertical wall profile with gentle ergonomic curve
  for (let i = 0; i <= 12; i++) {
    const t = i / 12;
    const y = FLOOR_Y + 0.05 + t * 6.2;
    const r = R + Math.sin(t * Math.PI) * 0.35;
    points.push(new THREE.Vector2(r, y));
  }

  // Upper chamfered architectural cove transition
  points.push(new THREE.Vector2(R - 0.25, FLOOR_Y + 6.8));
  points.push(new THREE.Vector2(R - 1.15, FLOOR_Y + 7.9));

  // Inward sweeping ceiling dome vault
  for (let i = 0; i <= 12; i++) {
    const t = i / 12;
    const theta = (t * Math.PI) / 2;
    const y = FLOOR_Y + 7.9 + Math.sin(theta) * (H - 7.9);
    const r = (R - 1.15) * (1.0 - Math.sin(theta * 0.94));
    points.push(new THREE.Vector2(Math.max(r, 2.6), y));
  }

  // Top oculus opening rim
  points.push(new THREE.Vector2(2.6, H + 0.15));
  points.push(new THREE.Vector2(2.9, H + 0.45));

  const latheGeo = new THREE.LatheGeometry(points, 96);
  latheGeo.computeVertexNormals();
  // Matte off-white ceramic panel finish
  const shellMat = new THREE.MeshStandardMaterial({
    color: COLOR_OFFWHITE_CEIL,
    roughness: 0.74, // Matte/satin finish to scatter light softly (0.65-0.88 range)
    metalness: 0.04, // Low metalness (0.0-0.15 range)
    side: THREE.BackSide,
  });

  const shellMesh = new THREE.Mesh(latheGeo, shellMat);
  shellMesh.receiveShadow = true;
  parent.add(shellMesh);
}

/**
 * Creates radial architectural wall panels, recessed dark grooves (#1F242D to #2B303A),
 * and brushed anodized aluminum trim ribs every 15 degrees.
 */
function createRadialWallPanels(parent) {
  const panelCount = 24; // Every 15 degrees
  const R = ATRIUM_RADIUS - 0.05;

  // High metalness anodized aluminum trim
  const trimMat = new THREE.MeshPhysicalMaterial({
    color: COLOR_ALUMINUM,
    metalness: 0.94,
    roughness: 0.22,
    clearcoat: 0.5,
  });

  // Dark recessed groove backing material (#222630)
  const grooveMat = new THREE.MeshStandardMaterial({
    color: COLOR_SEAM_GROOVE,
    roughness: 0.88,
    metalness: 0.12,
  });

  // Matte off-white architectural wall panel insert
  const offWhitePanelMat = new THREE.MeshStandardMaterial({
    color: COLOR_OFFWHITE_PANEL,
    roughness: 0.72,
    metalness: 0.04,
  });

  // Dark contrast hardware insert
  const darkPanelMat = new THREE.MeshPhysicalMaterial({
    color: COLOR_PANEL_DARK,
    roughness: 0.35,
    metalness: 0.65,
    clearcoat: 0.3,
  });

  for (let i = 0; i < panelCount; i++) {
    const angle = (i / panelCount) * Math.PI * 2;
    const nextAngle = ((i + 1) / panelCount) * Math.PI * 2;
    const midAngle = (angle + nextAngle) / 2;

    // 1. Recessed dark groove strip between modular panels (provides depth & subtle shadow)
    const grooveGeo = new THREE.BoxGeometry(0.18, 6.3, 0.32);
    const grooveMesh = new THREE.Mesh(grooveGeo, grooveMat);
    grooveMesh.position.set(Math.cos(angle) * (R + 0.02), FLOOR_Y + 3.2, Math.sin(angle) * (R + 0.02));
    grooveMesh.rotation.y = -angle + Math.PI / 2;
    parent.add(grooveMesh);

    // 2. Beveled anodized aluminum structural rib centered over groove
    const ribGeo = new THREE.BoxGeometry(0.10, 6.2, 0.22);
    const rib = new THREE.Mesh(ribGeo, trimMat);
    rib.position.set(Math.cos(angle) * R, FLOOR_Y + 3.2, Math.sin(angle) * R);
    rib.rotation.y = -angle + Math.PI / 2;
    rib.castShadow = true;
    rib.receiveShadow = true;
    parent.add(rib);

    // 3. Modular off-white wall panel with beveled perimeter
    const panelWidth = (2 * Math.PI * R) / panelCount - 0.26;
    const panelGeo = new THREE.BoxGeometry(panelWidth, 5.8, 0.06);
    const panelMesh = new THREE.Mesh(panelGeo, offWhitePanelMat);
    panelMesh.position.set(
      Math.cos(midAngle) * (R - 0.02),
      FLOOR_Y + 3.2,
      Math.sin(midAngle) * (R - 0.02)
    );
    panelMesh.rotation.y = -midAngle + Math.PI / 2;
    panelMesh.receiveShadow = true;
    parent.add(panelMesh);
  }
}

/**
 * Modular ceiling dome structure with radial coffered ribs, concentric reveals,
 * and oculus skylight ring.
 */
function createCeilingStructure(parent) {
  const ceilingGroup = new THREE.Group();
  ceilingGroup.name = 'CeilingGrid';

  const trimMat = new THREE.MeshPhysicalMaterial({
    color: COLOR_ALUMINUM,
    metalness: 0.94,
    roughness: 0.22,
    clearcoat: 0.5,
  });

  const grooveMat = new THREE.MeshStandardMaterial({
    color: COLOR_SEAM_GROOVE,
    roughness: 0.88,
    metalness: 0.1,
  });

  // 1. Concentric ceiling rings breaking up the dome into architectural panel tiers
  const ceilingRings = [
    { r: 15.2, y: 8.2, w: 0.12 },
    { r: 12.4, y: 9.3, w: 0.10 },
    { r: 9.0,  y: 10.3, w: 0.10 },
    { r: 5.6,  y: 11.2, w: 0.08 },
  ];

  for (const cr of ceilingRings) {
    // Recessed dark groove ring
    const grooveGeo = new THREE.TorusGeometry(cr.r, cr.w * 0.7, 8, 96);
    const groove = new THREE.Mesh(grooveGeo, grooveMat);
    groove.position.y = cr.y;
    groove.rotation.x = Math.PI / 2;
    ceilingGroup.add(groove);

    // Aluminum trim rib
    const ringGeo = new THREE.TorusGeometry(cr.r, cr.w * 0.45, 8, 96);
    const ringMesh = new THREE.Mesh(ringGeo, trimMat);
    ringMesh.position.y = cr.y + 0.02;
    ringMesh.rotation.x = Math.PI / 2;
    ceilingGroup.add(ringMesh);
  }

  // 2. Radial arched ceiling ribs sweeping from upper wall to oculus ring (12 ribs)
  const ribCount = 12;
  for (let i = 0; i < ribCount; i++) {
    const angle = (i / ribCount) * Math.PI * 2;

    // Create curved spline curve for ceiling rib
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(Math.cos(angle) * (ATRIUM_RADIUS - 1.2), 7.8, Math.sin(angle) * (ATRIUM_RADIUS - 1.2)),
      new THREE.Vector3(Math.cos(angle) * 7.5, 11.2, Math.sin(angle) * 7.5),
      new THREE.Vector3(Math.cos(angle) * 2.7, ATRIUM_HEIGHT + 0.05, Math.sin(angle) * 2.7)
    );

    const ribTubeGeo = new THREE.TubeGeometry(curve, 32, 0.07, 8, false);
    const ribMesh = new THREE.Mesh(ribTubeGeo, trimMat);
    ribMesh.castShadow = true;
    ribMesh.receiveShadow = true;
    ceilingGroup.add(ribMesh);
  }

  // 3. Central Oculus ring & natural white light skylight disc
  const oculusRingGeo = new THREE.TorusGeometry(2.65, 0.16, 16, 64);
  const oculusMat = new THREE.MeshPhysicalMaterial({
    color: COLOR_ALUMINUM,
    roughness: 0.18,
    metalness: 0.92,
    clearcoat: 0.6,
  });
  const oculusRing = new THREE.Mesh(oculusRingGeo, oculusMat);
  oculusRing.position.set(0, ATRIUM_HEIGHT + 0.1, 0);
  oculusRing.rotation.x = Math.PI / 2;
  ceilingGroup.add(oculusRing);

  // Natural white light skylight disc filling the central oculus opening
  const discGeo = new THREE.CircleGeometry(2.58, 64);
  discGeo.rotateX(Math.PI / 2);
  const discMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
  });
  const disc = new THREE.Mesh(discGeo, discMat);
  disc.position.set(0, ATRIUM_HEIGHT + 0.12, 0);
  ceilingGroup.add(disc);

  // Soft architectural glow trim ring around the skylight
  const glowRingGeo = new THREE.RingGeometry(2.42, 2.62, 64);
  glowRingGeo.rotateX(Math.PI / 2);
  const glowRingMat = new THREE.MeshBasicMaterial({
    color: 0xf4f8ff,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.95,
  });
  const glowRing = new THREE.Mesh(glowRingGeo, glowRingMat);
  glowRing.position.set(0, ATRIUM_HEIGHT + 0.11, 0);
  ceilingGroup.add(glowRing);

  // Natural daylight illumination flooding down from the skylight into the atrium
  const skylightDownLight = new THREE.SpotLight(0xfffdfa, 2.8, 24, Math.PI * 0.38, 0.5, 1.2);
  skylightDownLight.position.set(0, ATRIUM_HEIGHT + 0.05, 0);
  skylightDownLight.target.position.set(0, 0, 0);
  ceilingGroup.add(skylightDownLight);
  ceilingGroup.add(skylightDownLight.target);

  parent.add(ceilingGroup);
}

/**
 * Creates recessed LED coves (warm white, soft cyan, subtle violet)
 * shielded inside dark reveal channels to avoid direct wall glare.
 */
function createLedCoves(parent) {
  const R = ATRIUM_RADIUS;

  // Base floor LED cove (Cyan) recessed in dark perimeter reveal
  const baseCoveGeo = new THREE.TorusGeometry(R - 0.12, 0.045, 12, 96);
  const cyanLedMat = new THREE.MeshStandardMaterial({
    color: 0x002233,
    emissive: COLOR_CYAN_ACCENT,
    emissiveIntensity: 2.2,
    roughness: 0.2,
  });
  const baseCove = new THREE.Mesh(baseCoveGeo, cyanLedMat);
  baseCove.position.y = FLOOR_Y + 0.06;
  baseCove.rotation.x = Math.PI / 2;
  parent.add(baseCove);

  // Upper wall/ceiling transition cove (Soft warm white / amber accent)
  const upperCoveGeo = new THREE.TorusGeometry(R - 1.22, 0.05, 12, 96);
  const warmLedMat = new THREE.MeshStandardMaterial({
    color: 0x332211,
    emissive: COLOR_COVE_WARM,
    emissiveIntensity: 2.0,
    roughness: 0.2,
  });
  const upperCove = new THREE.Mesh(upperCoveGeo, warmLedMat);
  upperCove.position.y = FLOOR_Y + 7.65;
  upperCove.rotation.x = Math.PI / 2;
  parent.add(upperCove);

  // Mid-wall accent light strip segments (Subtle violet accent)
  const midCoveGeo = new THREE.TorusGeometry(R + 0.08, 0.035, 12, 96);
  const violetLedMat = new THREE.MeshStandardMaterial({
    color: 0x221133,
    emissive: COLOR_VIOLET_ACCENT,
    emissiveIntensity: 2.0,
    roughness: 0.2,
  });
  const midCove = new THREE.Mesh(midCoveGeo, violetLedMat);
  midCove.position.y = FLOOR_Y + 4.2;
  midCove.rotation.x = Math.PI / 2;
  parent.add(midCove);
}

/**
 * Central spawn podium and concentric navigational ring with satin finish
 */
function createCentralSpawnPodium(parent) {
  const podiumGroup = new THREE.Group();
  podiumGroup.position.set(0, FLOOR_Y, 0);

  // Stepped circular platform — light white matte no reflecting surface
  const baseGeo = new THREE.CylinderGeometry(2.4, 2.6, 0.15, 64);
  const baseMat = new THREE.MeshStandardMaterial({
    color: COLOR_POD_WHITE,
    roughness: 0.92,
    metalness: 0.0,
  });
  const base = new THREE.Mesh(baseGeo, baseMat);
  base.position.y = 0.075;
  base.receiveShadow = true;
  podiumGroup.add(base);

  // Upper glowing ring on podium
  const innerRingGeo = new THREE.RingGeometry(1.8, 1.95, 64);
  innerRingGeo.rotateX(-Math.PI / 2);
  const innerRingMat = new THREE.MeshStandardMaterial({
    emissive: COLOR_CYAN_ACCENT,
    emissiveIntensity: 2.0,
    color: 0x00e5ff,
  });
  const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
  innerRing.position.y = 0.151;
  podiumGroup.add(innerRing);

  // Senior Green House 2026-27 School Crest Medallion (replacing previous dark star figure)
  const emblemTexture = createSeniorGreenHouseEmblemTexture();
  const emblemGeo = new THREE.CircleGeometry(1.68, 64);
  emblemGeo.rotateX(-Math.PI / 2);
  const emblemMat = new THREE.MeshStandardMaterial({
    map: emblemTexture,
    roughness: 0.25,
    metalness: 0.1,
    polygonOffset: true,
    polygonOffsetFactor: -1,
    polygonOffsetUnits: -1,
  });
  const emblemMesh = new THREE.Mesh(emblemGeo, emblemMat);
  emblemMesh.position.y = 0.152;
  podiumGroup.add(emblemMesh);

  // Subtle metallic gold outer bezel rim
  const rimGeo = new THREE.RingGeometry(1.67, 1.71, 64);
  rimGeo.rotateX(-Math.PI / 2);
  const rimMat = new THREE.MeshStandardMaterial({
    color: 0xd4af37, // Polished gold
    metalness: 0.85,
    roughness: 0.2,
  });
  const rimMesh = new THREE.Mesh(rimGeo, rimMat);
  rimMesh.position.y = 0.153;
  podiumGroup.add(rimMesh);

  parent.add(podiumGroup);
}

/**
 * Generates high-resolution circular medallion texture for Senior Green House 2026-27
 * featuring the Gurukul Grammar Senior Secondary School logo in the center.
 */
function createSeniorGreenHouseEmblemTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 2048;
  const ctx = canvas.getContext('2d');
  const W = 2048;
  const H = 2048;
  const cx = W / 2;
  const cy = H / 2;

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 16;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;

  function drawEmblem(loadedImg) {
    ctx.clearRect(0, 0, W, H);

    // 1. Outer subtle glow/shadow base
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, 995, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = 'rgba(0, 229, 255, 0.45)';
    ctx.shadowBlur = 45;
    ctx.fill();
    ctx.restore();

    // 2. Outermost Polished Gold Bezel
    const bezelGrad = ctx.createLinearGradient(0, 0, W, H);
    bezelGrad.addColorStop(0.0, '#ffd700');
    bezelGrad.addColorStop(0.2, '#fff2a3');
    bezelGrad.addColorStop(0.45, '#d4af37');
    bezelGrad.addColorStop(0.7, '#fff8db');
    bezelGrad.addColorStop(1.0, '#a38426');

    ctx.beginPath();
    ctx.arc(cx, cy, 985, 0, Math.PI * 2);
    ctx.fillStyle = bezelGrad;
    ctx.fill();

    // Dark accent ring
    ctx.beginPath();
    ctx.arc(cx, cy, 962, 0, Math.PI * 2);
    ctx.fillStyle = '#022116';
    ctx.fill();

    // 3. Rich Emerald Green House Ring
    const greenGrad = ctx.createRadialGradient(cx, cy, 660, cx, cy, 960);
    greenGrad.addColorStop(0.0, '#064e3b');
    greenGrad.addColorStop(0.4, '#046a48');
    greenGrad.addColorStop(0.8, '#023826');
    greenGrad.addColorStop(1.0, '#012015');

    ctx.beginPath();
    ctx.arc(cx, cy, 952, 0, Math.PI * 2);
    ctx.arc(cx, cy, 668, 0, Math.PI * 2, true);
    ctx.fillStyle = greenGrad;
    ctx.fill();

    // Concentric Gold Pinstripes on green ring
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#d4af37';
    ctx.beginPath();
    ctx.arc(cx, cy, 944, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(cx, cy, 676, 0, Math.PI * 2);
    ctx.stroke();

    // 4. Circular Text
    // Top Arch: "SENIOR GREEN HOUSE"
    drawCurvedText(ctx, 'SENIOR GREEN HOUSE', cx, cy, 810, -Math.PI / 2, false, 86);

    // Bottom Arch: "2026-27"
    drawCurvedText(ctx, '2026-27', cx, cy, 810, Math.PI / 2, true, 86);

    // Flanking Gold Stars at 9 o'clock and 3 o'clock
    drawStar(ctx, cx - 810, cy, 5, 34, 16, '#ffd700');
    drawStar(ctx, cx + 810, cy, 5, 34, 16, '#ffd700');

    // 5. Inner Gold Stepped Bevel
    ctx.beginPath();
    ctx.arc(cx, cy, 664, 0, Math.PI * 2);
    ctx.fillStyle = bezelGrad;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(cx, cy, 642, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();

    // 6. Draw School Logo in center circle
    if (loadedImg && loadedImg.complete && loadedImg.naturalWidth > 0) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, 634, 0, Math.PI * 2);
      ctx.clip();
      const imgSize = 1240;
      ctx.drawImage(loadedImg, cx - imgSize / 2, cy - imgSize / 2, imgSize, imgSize);
      ctx.restore();
    }

    // Inner boundary stroke
    ctx.lineWidth = 6;
    ctx.strokeStyle = '#d4af37';
    ctx.beginPath();
    ctx.arc(cx, cy, 634, 0, Math.PI * 2);
    ctx.stroke();
  }

  function drawStar(cCtx, starCx, starCy, spikes, outerRadius, innerRadius, color) {
    let rot = (Math.PI / 2) * 3;
    let x = starCx;
    let y = starCy;
    const step = Math.PI / spikes;

    cCtx.save();
    cCtx.beginPath();
    cCtx.moveTo(starCx, starCy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = starCx + Math.cos(rot) * outerRadius;
      y = starCy + Math.sin(rot) * outerRadius;
      cCtx.lineTo(x, y);
      rot += step;

      x = starCx + Math.cos(rot) * innerRadius;
      y = starCy + Math.sin(rot) * innerRadius;
      cCtx.lineTo(x, y);
      rot += step;
    }
    cCtx.lineTo(starCx, starCy - outerRadius);
    cCtx.closePath();
    cCtx.fillStyle = color;
    cCtx.shadowColor = '#ffe066';
    cCtx.shadowBlur = 18;
    cCtx.fill();
    cCtx.restore();
  }

  function drawCurvedText(cCtx, text, tCx, tCy, radius, centerAngle, isBottom, fontSize = 84) {
    cCtx.save();
    cCtx.font = `900 ${fontSize}px "Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;
    cCtx.fillStyle = '#ffffff';
    cCtx.shadowColor = 'rgba(0, 0, 0, 0.85)';
    cCtx.shadowBlur = 14;
    cCtx.shadowOffsetX = 2;
    cCtx.shadowOffsetY = 3;

    const letters = text.split('');
    const letterWidths = letters.map((ch) => cCtx.measureText(ch).width + 10);
    const totalWidth = letterWidths.reduce((a, b) => a + b, 0);
    const totalAngle = totalWidth / radius;

    let currentAngle = isBottom ? centerAngle + totalAngle / 2 : centerAngle - totalAngle / 2;

    for (let i = 0; i < letters.length; i++) {
      const char = letters[i];
      const charWidth = letterWidths[i];
      const charAngle = charWidth / radius;

      cCtx.save();
      if (isBottom) {
        currentAngle -= charAngle / 2;
        const x = tCx + radius * Math.cos(currentAngle);
        const y = tCy + radius * Math.sin(currentAngle);
        cCtx.translate(x, y);
        cCtx.rotate(currentAngle - Math.PI / 2);
        cCtx.fillText(char, -charWidth / 2, 0);
        currentAngle -= charAngle / 2;
      } else {
        currentAngle += charAngle / 2;
        const x = tCx + radius * Math.cos(currentAngle);
        const y = tCy + radius * Math.sin(currentAngle);
        cCtx.translate(x, y);
        cCtx.rotate(currentAngle + Math.PI / 2);
        cCtx.fillText(char, -charWidth / 2, 0);
        currentAngle += charAngle / 2;
      }
      cCtx.restore();
    }

    cCtx.restore();
  }

  // Initial draw
  drawEmblem(null);

  // Load school crest
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = () => {
    drawEmblem(img);
    texture.needsUpdate = true;
  };
  img.src = '/2077927617.jpg';

  return texture;
}
