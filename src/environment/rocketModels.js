// src/environment/rocketModels.js — Photorealistic Monumental Scale Models of ISRO, NASA, SpaceX & Skyroot Rockets
// Configured to reach "upto to the roof" (~6.0m - 7.2m tall) on architectural white exhibition launch platforms.
import * as THREE from 'three';
import { ATRIUM_RADIUS, FLOOR_Y, COLOR_ALUMINUM } from '../core/constants.js';
import { ROCKET_DATA } from './rocketTelemetry.js';

/**
 * Builds all 13 high-fidelity scale rocket models on sleek white exhibition launch pedestals
 * placed along the perimeter wall in the intermediate gap spaces between the scientist portraits.
 *
 * @param {THREE.Scene} scene
 * @param {Object} telemetry - The rocket telemetry controller from createRocketTelemetry.
 * @param {THREE.Camera} camera
 * @returns {{ group: THREE.Group, update: Function, interactiveTargets: Array }}
 */
export function buildRocketExhibits(scene, telemetry, camera) {
  const rocketsMasterGroup = new THREE.Group();
  rocketsMasterGroup.name = 'RocketExhibitsMasterGroup';
  scene.add(rocketsMasterGroup);

  const interactiveTargets = [];

  // ═════════════════════════════════════════════════════════════════
  // SHARED ARCHITECTURAL WHITE BASE PLATFORM MATERIALS
  // ═════════════════════════════════════════════════════════════════
  // Light white matte architectural ceramic pedestal finish (no glare)
  const whitePlatformMat = new THREE.MeshStandardMaterial({
    color: 0xf5f7fa,
    roughness: 0.85,
    metalness: 0.04,
  });
  // Brushed silver aluminum beveled rim
  const aluminumRimMat = new THREE.MeshPhysicalMaterial({
    color: 0xdce0e8,
    roughness: 0.25,
    metalness: 0.90,
    clearcoat: 0.5,
  });
  // Light satin titanium-white launch blast deck
  const launchDeckMat = new THREE.MeshStandardMaterial({
    color: 0xebf0f6,
    roughness: 0.60,
    metalness: 0.25,
  });
  // Launch clamp hardware (anodized aluminum & dark steel joints)
  const clampArmMat = new THREE.MeshStandardMaterial({
    color: 0xc8ccd4,
    roughness: 0.35,
    metalness: 0.85,
  });
  const clampPistonMat = new THREE.MeshStandardMaterial({
    color: 0x334155,
    roughness: 0.30,
    metalness: 0.90,
  });

  // Common metallic & mechanical materials for rockets
  const nozzleMetalMat = new THREE.MeshStandardMaterial({
    color: 0x272a33,
    roughness: 0.28,
    metalness: 0.88,
  });
  const goldThermalMat = new THREE.MeshStandardMaterial({
    color: 0xe5a932,
    roughness: 0.30,
    metalness: 0.85,
  });
  const interstageRingMat = new THREE.MeshStandardMaterial({
    color: 0x1a1e28,
    roughness: 0.45,
    metalness: 0.70,
  });

  // ═════════════════════════════════════════════════════════════════
  // PROCEDURAL HIGH-RESOLUTION TEXTURE GENERATORS (PHOTOREALISTIC LIVERIES)
  // ═════════════════════════════════════════════════════════════════

  /**
   * Generates authentic ISRO rocket liveries with Indian national emblem,
   * Hindi & English typography ("इसरो", "ISRO", "भारत", "INDIA"), vehicle name,
   * stage separation lines, panel weld seams, and cryogenic foam insulation.
   */
  function createIsroTexture({ name, subtitle, isCryoFoam = false, hasTricolor = true }) {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    // Base coat
    if (isCryoFoam) {
      // Cryogenic foam insulation (mottled burnt-orange SOFI pattern)
      const grad = ctx.createLinearGradient(0, 0, 1024, 0);
      grad.addColorStop(0, '#be4b18');
      grad.addColorStop(0.3, '#d35920');
      grad.addColorStop(0.7, '#c24e1a');
      grad.addColorStop(1, '#a83e12');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1024, 1024);

      // Cryo foam spray textures & weld hoop lines
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      for (let y = 30; y < 1024; y += 45) {
        ctx.fillRect(0, y, 1024, 3);
      }
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      for (let y = 33; y < 1024; y += 45) {
        ctx.fillRect(0, y, 1024, 2);
      }
    } else {
      // Crisp aerospace white composite lacquer
      const grad = ctx.createLinearGradient(0, 0, 1024, 0);
      grad.addColorStop(0, '#f1f4f8');
      grad.addColorStop(0.5, '#ffffff');
      grad.addColorStop(1, '#e5e9f0');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1024, 1024);

      // Panel joint lines & rivet seams
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.12)';
      ctx.lineWidth = 2;
      for (let y = 60; y < 1024; y += 120) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(1024, y);
        ctx.stroke();

        // Rivets
        ctx.fillStyle = 'rgba(0, 0, 0, 0.18)';
        for (let x = 20; x < 1024; x += 32) {
          ctx.beginPath();
          ctx.arc(x, y - 4, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // Longitudinal panel weld seams
    ctx.strokeStyle = isCryoFoam ? 'rgba(0, 0, 0, 0.25)' : 'rgba(0, 0, 0, 0.10)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(256, 0); ctx.lineTo(256, 1024);
    ctx.moveTo(768, 0); ctx.lineTo(768, 1024);
    ctx.stroke();

    // Indian Tricolor Decal (Quadrant 1 & 3)
    if (hasTricolor) {
      [256, 768].forEach((cx) => {
        const flagW = 200;
        const flagH = 100;
        const fx = cx - flagW / 2;
        const fy = 160;

        ctx.fillStyle = '#ff9933';
        ctx.fillRect(fx, fy, flagW, 33);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(fx, fy + 33, flagW, 34);
        ctx.fillStyle = '#138808';
        ctx.fillRect(fx, fy + 67, flagW, 33);

        // Ashoka Chakra
        ctx.strokeStyle = '#000080';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(cx, fy + 50, 14, 0, Math.PI * 2);
        ctx.stroke();

        // Chakra spokes
        for (let s = 0; s < 24; s++) {
          const spAng = (s / 24) * Math.PI * 2;
          ctx.beginPath();
          ctx.moveTo(cx, fy + 50);
          ctx.lineTo(cx + Math.cos(spAng) * 13, fy + 50 + Math.sin(spAng) * 13);
          ctx.stroke();
        }
      });
    }

    // ISRO Official Logo & Typography
    [256, 768].forEach((cx) => {
      // Official ISRO chevron icon
      const iconY = 320;
      ctx.fillStyle = '#0284c7'; // Satellite blue
      ctx.beginPath();
      ctx.moveTo(cx, iconY - 30);
      ctx.lineTo(cx + 28, iconY + 15);
      ctx.lineTo(cx + 12, iconY + 10);
      ctx.lineTo(cx, iconY - 10);
      ctx.lineTo(cx - 12, iconY + 10);
      ctx.lineTo(cx - 28, iconY + 15);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#ea580c'; // Thrust orange
      ctx.beginPath();
      ctx.arc(cx + 16, iconY - 14, 10, 0, Math.PI * 2);
      ctx.fill();

      // Text: ISRO & Hindi इसरो
      ctx.font = '900 46px "Inter", sans-serif';
      ctx.fillStyle = isCryoFoam ? '#ffffff' : '#0f172a';
      ctx.textAlign = 'center';
      ctx.fillText('ISRO', cx, iconY + 68);

      ctx.font = 'bold 30px "Inter", sans-serif';
      ctx.fillStyle = isCryoFoam ? '#ffedd5' : '#ea580c';
      ctx.fillText('इसरो  |  भारत', cx, iconY + 106);

      // Vehicle Name (e.g. LVM3, PSLV, GSLV)
      ctx.font = '900 64px "Inter", sans-serif';
      ctx.fillStyle = isCryoFoam ? '#ffffff' : '#0f172a';
      ctx.fillText(name, cx, iconY + 220);

      if (subtitle) {
        ctx.font = 'bold 26px "Inter", monospace';
        ctx.fillStyle = isCryoFoam ? '#ffedd5' : '#0284c7';
        ctx.fillText(subtitle, cx, iconY + 265);
      }
    });

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    return tex;
  }

  /**
   * Generates exact Apollo 11 Saturn V black-and-white roll pattern,
   * "UNITED STATES", "USA", and American flag livery.
   */
  function createSaturnVTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    // White base coat
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, 1024, 1024);

    // Exact NASA Apollo 11 S-IC black vertical roll quadrants (Quadrants 2 & 4)
    ctx.fillStyle = '#111318';
    ctx.fillRect(180, 260, 240, 764);
    ctx.fillRect(680, 260, 240, 764);

    // Corrugated S-II stringers
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)';
    ctx.lineWidth = 2;
    for (let x = 0; x < 1024; x += 16) {
      ctx.beginPath();
      ctx.moveTo(x, 0); ctx.lineTo(x, 260);
      ctx.stroke();
    }

    // Horizontal stage separation bands
    ctx.fillStyle = '#0a0d14';
    ctx.fillRect(0, 252, 1024, 8);
    ctx.fillRect(0, 520, 1024, 6);

    // "UNITED STATES" in bold red on white quadrants
    [60, 560].forEach((cx) => {
      ctx.save();
      ctx.translate(cx, 600);
      ctx.rotate(-Math.PI / 2);
      ctx.font = '900 52px "Inter", sans-serif';
      ctx.fillStyle = '#b22234';
      ctx.textAlign = 'center';
      ctx.fillText('UNITED STATES', 0, 0);
      ctx.restore();

      // USA Flag
      const fx = cx - 50;
      const fy = 660;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(fx, fy, 100, 55);
      for (let s = 0; s < 7; s++) {
        ctx.fillStyle = '#b22234';
        ctx.fillRect(fx, fy + s * 8, 100, 4);
      }
      ctx.fillStyle = '#3c3b6e';
      ctx.fillRect(fx, fy, 44, 28);
    });

    // "USA" on upper stage
    [60, 560].forEach((cx) => {
      ctx.font = '900 68px "Inter", sans-serif';
      ctx.fillStyle = '#111318';
      ctx.textAlign = 'center';
      ctx.fillText('USA', cx, 160);
    });

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    return tex;
  }

  /**
   * Generates SpaceX Falcon 9 sleek white livery with vertical "SPACEX" billboard logo,
   * carbon interstage pattern, and reentry heat markings.
   */
  function createFalcon9Texture() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    // Smooth aerospace white composite
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, 1024, 1024);

    // Carbon fiber interstage top band
    ctx.fillStyle = '#12141a';
    ctx.fillRect(0, 0, 1024, 180);

    // Interstage acoustic & separation tiles
    ctx.strokeStyle = '#232733';
    ctx.lineWidth = 2;
    for (let x = 0; x < 1024; x += 32) {
      ctx.beginPath();
      ctx.moveTo(x, 0); ctx.lineTo(x, 180);
      ctx.stroke();
    }

    // Panel weld seams down booster
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.08)';
    ctx.lineWidth = 2;
    for (let y = 200; y < 1024; y += 140) {
      ctx.beginPath();
      ctx.moveTo(0, y); ctx.lineTo(1024, y);
      ctx.stroke();
    }

    // Vertical "SPACEX" billboard logo
    [256, 768].forEach((cx) => {
      ctx.save();
      ctx.translate(cx, 620);
      ctx.rotate(-Math.PI / 2);
      ctx.font = '900 76px "Inter", sans-serif';
      ctx.fillStyle = '#0f172a';
      ctx.textAlign = 'center';
      ctx.letterSpacing = '12px';
      ctx.fillText('SPACEX', 0, 0);
      ctx.restore();

      // Falcon 9 logo & American flag
      ctx.font = 'bold 34px "Inter", sans-serif';
      ctx.fillStyle = '#334155';
      ctx.textAlign = 'center';
      ctx.fillText('FALCON 9', cx, 280);

      // Mini flag
      const fx = cx - 36;
      const fy = 310;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(fx, fy, 72, 40);
      for (let s = 0; s < 7; s++) {
        ctx.fillStyle = '#b22234';
        ctx.fillRect(fx, fy + s * 6, 72, 3);
      }
      ctx.fillStyle = '#3c3b6e';
      ctx.fillRect(fx, fy, 32, 21);
    });

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    return tex;
  }

  /**
   * Generates authentic high-performance carbon-fiber composite twill weave texture
   * for Skyroot Vikram-1 / Vikram-2 and ISRO SSLV fairing.
   */
  function createCarbonWeaveTexture({ title, subtitle, accentCol = '#00e5ff' }) {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    // Dark charcoal carbon composite base
    ctx.fillStyle = '#14171e';
    ctx.fillRect(0, 0, 1024, 1024);

    // Procedural 2x2 carbon fiber twill weave pattern
    const tileSize = 16;
    for (let y = 0; y < 1024; y += tileSize) {
      for (let x = 0; x < 1024; x += tileSize) {
        const isAlt = ((x / tileSize) + (y / tileSize)) % 2 === 0;
        ctx.fillStyle = isAlt ? '#1e232d' : '#101319';
        ctx.fillRect(x, y, tileSize, tileSize);

        // Highlight fiber strand
        ctx.fillStyle = isAlt ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.2)';
        ctx.fillRect(x, y, tileSize / 2, tileSize / 2);
      }
    }

    // Metallic separation joint rings
    ctx.fillStyle = accentCol;
    ctx.fillRect(0, 480, 1024, 8);

    // Skyroot Wing Emblem & Text
    [256, 768].forEach((cx) => {
      // Skyroot Wing Crest
      const wy = 260;
      ctx.fillStyle = accentCol;
      ctx.beginPath();
      ctx.moveTo(cx, wy - 28);
      ctx.lineTo(cx + 38, wy + 18);
      ctx.lineTo(cx + 14, wy + 12);
      ctx.lineTo(cx, wy - 6);
      ctx.lineTo(cx - 14, wy + 12);
      ctx.lineTo(cx - 38, wy + 18);
      ctx.closePath();
      ctx.fill();

      ctx.font = '900 48px "Inter", sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.fillText(title, cx, wy + 80);

      ctx.font = 'bold 24px "Inter", monospace';
      ctx.fillStyle = accentCol;
      ctx.fillText(subtitle, cx, wy + 120);

      // Indian Flag
      const fx = cx - 40;
      const fy = wy + 160;
      ctx.fillStyle = '#ff9933';
      ctx.fillRect(fx, fy, 80, 14);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(fx, fy + 14, 80, 14);
      ctx.fillStyle = '#138808';
      ctx.fillRect(fx, fy + 28, 80, 14);
    });

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    return tex;
  }

  /**
   * Generates SpaceX Crew Dragon white thermal matrix tiles and PICA-X heat shield textures.
   */
  function createDragonTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    // Smooth ceramic thermal matrix white
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, 1024, 1024);

    // Heat tile seams
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.08)';
    ctx.lineWidth = 1.5;
    for (let y = 0; y < 1024; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y); ctx.lineTo(1024, y);
      ctx.stroke();
    }

    // Windows / Astronaut Viewports & Hatch Seam
    [256, 768].forEach((cx) => {
      // Crew ingress hatch outline
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 4;
      ctx.strokeRect(cx - 65, 360, 130, 200);

      // Tinted dark glass window
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(cx, 440, 28, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 3;
      ctx.stroke();

      // SpaceX Logo
      ctx.font = '900 36px "Inter", sans-serif';
      ctx.fillStyle = '#0f172a';
      ctx.textAlign = 'center';
      ctx.fillText('DRAGON', cx, 630);
      ctx.font = 'bold 20px "Inter", monospace';
      ctx.fillStyle = '#0284c7';
      ctx.fillText('COMMERCIAL CREW', cx, 665);
    });

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    return tex;
  }

  /**
   * Generates historic SLV-3 black and white roll pattern as flown on July 18, 1980.
   */
  function createSlv3Texture() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, 1024, 1024);

    // Historic alternating black bands
    ctx.fillStyle = '#111318';
    ctx.fillRect(0, 180, 1024, 220);
    ctx.fillRect(0, 580, 1024, 200);

    // SLV-3 Stencil
    [256, 768].forEach((cx) => {
      ctx.font = '900 64px "Inter", sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.fillText('SLV-3', cx, 305);

      ctx.font = '900 52px "Inter", sans-serif';
      ctx.fillStyle = '#111318';
      ctx.fillText('ISRO', cx, 500);

      // Flag
      const fx = cx - 50;
      const fy = 830;
      ctx.fillStyle = '#ff9933';
      ctx.fillRect(fx, fy, 100, 20);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(fx, fy + 20, 100, 20);
      ctx.fillStyle = '#138808';
      ctx.fillRect(fx, fy + 40, 100, 20);
    });

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    return tex;
  }

  // Pre-generate textured materials
  const matPslv = new THREE.MeshStandardMaterial({ map: createIsroTexture({ name: 'PSLV', subtitle: 'POLAR SATELLITE LAUNCH VEHICLE' }), roughness: 0.35, metalness: 0.1 });
  const matLvm3 = new THREE.MeshStandardMaterial({ map: createIsroTexture({ name: 'LVM3', subtitle: 'CHANDRAYAAN-3', isCryoFoam: true }), roughness: 0.55, metalness: 0.05 });
  const matS200 = new THREE.MeshStandardMaterial({ map: createIsroTexture({ name: 'S200', subtitle: 'SOLID BOOSTER', hasTricolor: true }), roughness: 0.40, metalness: 0.1 });
  const matGslv = new THREE.MeshStandardMaterial({ map: createIsroTexture({ name: 'GSLV', subtitle: 'GEOSYNCHRONOUS LAUNCH VEHICLE' }), roughness: 0.35, metalness: 0.1 });
  const matSaturnV = new THREE.MeshStandardMaterial({ map: createSaturnVTexture(), roughness: 0.35, metalness: 0.12 });
  const matFalcon9 = new THREE.MeshStandardMaterial({ map: createFalcon9Texture(), roughness: 0.32, metalness: 0.10 });
  const matDragon = new THREE.MeshStandardMaterial({ map: createDragonTexture(), roughness: 0.30, metalness: 0.08 });
  const matVikram1 = new THREE.MeshStandardMaterial({ map: createCarbonWeaveTexture({ title: 'VIKRAM-I', subtitle: 'SKYROOT AEROSPACE', accentCol: '#f97316' }), roughness: 0.45, metalness: 0.35 });
  const matVikram2 = new THREE.MeshStandardMaterial({ map: createCarbonWeaveTexture({ title: 'VIKRAM-II', subtitle: 'CRYOGENIC DHAWAN-II', accentCol: '#00e5ff' }), roughness: 0.45, metalness: 0.35 });
  const matSlv3 = new THREE.MeshStandardMaterial({ map: createSlv3Texture(), roughness: 0.40, metalness: 0.1 });
  const matAslv = new THREE.MeshStandardMaterial({ map: createIsroTexture({ name: 'ASLV', subtitle: 'AUGMENTED SATELLITE LAUNCH VEHICLE' }), roughness: 0.40, metalness: 0.1 });
  const matHrlv = new THREE.MeshStandardMaterial({ map: createIsroTexture({ name: 'HRLV', subtitle: 'NEXT GEN REUSABLE LAUNCH VEHICLE' }), roughness: 0.32, metalness: 0.15 });
  const matSslv = new THREE.MeshStandardMaterial({ map: createIsroTexture({ name: 'SSLV', subtitle: 'SMALL SATELLITE LAUNCH VEHICLE' }), roughness: 0.35, metalness: 0.1 });

  // Modern Clean White Museum Plaque Helper
  function createWhitePlaque(rocketData) {
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 640;
    pCanvas.height = 200;
    const pCtx = pCanvas.getContext('2d');

    // Clean museum white satin plaque background
    pCtx.fillStyle = '#ffffff';
    pCtx.fillRect(0, 0, 640, 200);

    // Accent line
    pCtx.fillStyle = rocketData.accentColor;
    pCtx.fillRect(0, 0, 16, 200);

    pCtx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
    pCtx.lineWidth = 3;
    pCtx.strokeRect(1, 1, 638, 198);

    // Rocket Name
    pCtx.font = '900 40px "Inter", sans-serif';
    pCtx.fillStyle = '#0f172a';
    pCtx.textAlign = 'left';
    pCtx.textBaseline = 'top';
    pCtx.fillText(rocketData.name, 36, 24);

    // Operator & Category
    pCtx.font = 'bold 20px "Inter", monospace';
    pCtx.fillStyle = rocketData.accentColor;
    pCtx.fillText(rocketData.operator, 36, 76);

    // Status Pill
    pCtx.fillStyle = rocketData.statusColor;
    pCtx.font = 'bold 18px "Inter", monospace';
    pCtx.fillText(`STATUS: [ ${rocketData.status} ]`, 36, 112);

    pCtx.fillStyle = '#64748b';
    pCtx.font = 'italic 16px "Inter", sans-serif';
    pCtx.fillText('TOUCH TO VIEW TELEMETRY ➜', 36, 152);

    const pTex = new THREE.CanvasTexture(pCanvas);
    const pMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(0.85, 0.265),
      new THREE.MeshBasicMaterial({ map: pTex, side: THREE.FrontSide })
    );
    return pMesh;
  }

  // Helper to add Hold-Down Launch Clamps on the White Platform
  function addLaunchClamps(parentGroup, radius, pedHeight) {
    for (let c = 0; c < 4; c++) {
      const cAng = (c / 4) * Math.PI * 2 + Math.PI / 4;
      const clampGroup = new THREE.Group();
      clampGroup.position.set(Math.cos(cAng) * (radius + 0.16), pedHeight + 0.02, Math.sin(cAng) * (radius + 0.16));
      clampGroup.rotation.y = -cAng + Math.PI / 2;

      // Heavy mounting base
      const bMount = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.16, 0.26), clampArmMat);
      bMount.position.y = 0.08;
      clampGroup.add(bMount);

      // Angled claw arm holding rocket base
      const claw = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.32, 0.12), clampArmMat);
      claw.position.set(0, 0.22, -0.10);
      claw.rotation.x = -0.35;
      clampGroup.add(claw);

      // Hydraulic piston cylinder
      const piston = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.24, 16), clampPistonMat);
      piston.position.set(0, 0.18, 0.08);
      piston.rotation.x = 0.30;
      clampGroup.add(piston);

      parentGroup.add(clampGroup);
    }
  }

  // 12 Gap Bay Definitions (Indices 1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23)
  const gapPositions = [
    { bayIndex: 1,  rocketId: 'slv3' },     // Between Kalam & Radhakrishnan
    { bayIndex: 3,  rocketId: 'aslv' },     // Between Radhakrishnan & Raman
    { bayIndex: 5,  rocketId: 'sounding' }, // Between Raman & Ramanujan
    { bayIndex: 7,  rocketId: 'pslv' },     // Between Ramanujan & SN Bose
    { bayIndex: 9,  rocketId: 'gslv' },     // Between SN Bose & Bhabha
    { bayIndex: 11, rocketId: 'lvm3' },     // Between Bhabha & Sarabhai
    { bayIndex: 13, rocketId: 'hrlv' },     // Between Sarabhai & JC Bose
    { bayIndex: 15, rocketId: 'sslv' },     // Between JC Bose & Newton
    { bayIndex: 17, rocketId: 'apollo11' }, // Between Newton & Curie
    { bayIndex: 19, rocketId: 'falcon9' },  // Between Curie & Tesla
    { bayIndex: 21, rocketId: 'dragon' },   // Between Tesla & Einstein
    { bayIndex: 23, rocketId: 'skyroot' },  // Between Einstein & Kalam (Vikram-1 & Vikram-2)
  ];

  const panelCount = 24;
  const R_PEDESTAL = 16.35; // Placed at perimeter wall gap

  gapPositions.forEach((item) => {
    const angle = (item.bayIndex / panelCount) * Math.PI * 2;
    const nextAngle = ((item.bayIndex + 1) / panelCount) * Math.PI * 2;
    const midAngle = (angle + nextAngle) / 2;

    const bayGroup = new THREE.Group();
    bayGroup.name = `RocketBay_${item.rocketId}`;
    bayGroup.position.set(
      Math.cos(midAngle) * R_PEDESTAL,
      FLOOR_Y,
      Math.sin(midAngle) * R_PEDESTAL
    );
    bayGroup.lookAt(0, FLOOR_Y, 0); // Face inward towards the Home Pod
    rocketsMasterGroup.add(bayGroup);

    // ── 1. CLEAN ARCHITECTURAL WHITE BASE PLATFORM ──
    const isDual = item.rocketId === 'skyroot';
    const pedRadius = isDual ? 1.55 : 1.15;
    const pedHeight = 0.35;

    // Base Octagonal White Plinth (roughness 0.85, metalness 0.04)
    const basePlinth = new THREE.Mesh(
      new THREE.CylinderGeometry(pedRadius, pedRadius * 1.06, pedHeight, 16),
      whitePlatformMat
    );
    basePlinth.position.y = pedHeight / 2;
    basePlinth.castShadow = true;
    basePlinth.receiveShadow = true;
    bayGroup.add(basePlinth);

    // Brushed Aluminum Rim Accent
    const plinthRim = new THREE.Mesh(
      new THREE.CylinderGeometry(pedRadius * 1.02, pedRadius * 1.02, 0.04, 16),
      aluminumRimMat
    );
    plinthRim.position.y = pedHeight;
    bayGroup.add(plinthRim);

    // Titanium-White Launch Blast Deck Plate
    const deck = new THREE.Mesh(
      new THREE.CylinderGeometry(pedRadius * 0.92, pedRadius * 0.92, 0.02, 32),
      launchDeckMat
    );
    deck.position.y = pedHeight + 0.015;
    deck.receiveShadow = true;
    bayGroup.add(deck);

    // Soft Ambient Cove Under-Glow
    const accentCol = item.rocketId === 'skyroot' ? 0x00b8d4 : ROCKET_DATA[item.rocketId]?.accentColor || 0x00e5ff;
    const ledRing = new THREE.Mesh(
      new THREE.TorusGeometry(pedRadius * 1.04, 0.018, 12, 48),
      new THREE.MeshBasicMaterial({ color: accentCol })
    );
    ledRing.rotation.x = Math.PI / 2;
    ledRing.position.y = 0.02;
    bayGroup.add(ledRing);

    // White Museum Exhibit Plaque
    if (item.rocketId !== 'skyroot') {
      const plaque = createWhitePlaque(ROCKET_DATA[item.rocketId]);
      plaque.position.set(0, 0.18, pedRadius * 0.88);
      plaque.rotation.x = -0.32; // Angled up for comfortable reading
      bayGroup.add(plaque);
    }

    // ── 2. BUILD HIGH-FIDELITY MONUMENTAL ROCKET MODELS (UPTO THE ROOF) ──
    if (item.rocketId === 'pslv') {
      buildPslvModel(bayGroup, pedHeight, interactiveTargets, matPslv, nozzleMetalMat, goldThermalMat, addLaunchClamps);
    } else if (item.rocketId === 'lvm3') {
      buildLvm3Model(bayGroup, pedHeight, interactiveTargets, matLvm3, matS200, nozzleMetalMat, addLaunchClamps);
    } else if (item.rocketId === 'gslv') {
      buildGslvModel(bayGroup, pedHeight, interactiveTargets, matGslv, nozzleMetalMat, addLaunchClamps);
    } else if (item.rocketId === 'sounding') {
      buildSoundingRocketModel(bayGroup, pedHeight, interactiveTargets, nozzleMetalMat);
    } else if (item.rocketId === 'slv3') {
      buildSlv3Model(bayGroup, pedHeight, interactiveTargets, matSlv3, nozzleMetalMat, addLaunchClamps);
    } else if (item.rocketId === 'aslv') {
      buildAslvModel(bayGroup, pedHeight, interactiveTargets, matAslv, nozzleMetalMat, addLaunchClamps);
    } else if (item.rocketId === 'hrlv') {
      buildHrlvModel(bayGroup, pedHeight, interactiveTargets, matHrlv, nozzleMetalMat, addLaunchClamps);
    } else if (item.rocketId === 'sslv') {
      buildSslvModel(bayGroup, pedHeight, interactiveTargets, matSslv, nozzleMetalMat, addLaunchClamps);
    } else if (item.rocketId === 'apollo11') {
      buildApollo11Model(bayGroup, pedHeight, interactiveTargets, matSaturnV, nozzleMetalMat, addLaunchClamps);
    } else if (item.rocketId === 'falcon9') {
      buildFalcon9Model(bayGroup, pedHeight, interactiveTargets, matFalcon9, nozzleMetalMat, addLaunchClamps);
    } else if (item.rocketId === 'dragon') {
      buildDragonModel(bayGroup, pedHeight, interactiveTargets, matDragon, nozzleMetalMat);
    } else if (item.rocketId === 'skyroot') {
      buildSkyrootDualModel(bayGroup, pedHeight, interactiveTargets, matVikram1, matVikram2, nozzleMetalMat, createWhitePlaque, addLaunchClamps);
    }
  });

  // Add 3D telemetry card to interactive targets for instant tap-to-dismiss
  if (telemetry.cardMesh) {
    interactiveTargets.push(telemetry.cardMesh);
  }

  // ── 3. INTERACTIVE RAYCASTING TOUCH & CLICK HANDLER ──
  let pointerDownPos = { x: 0, y: 0, time: 0 };

  const onPointerDown = (e) => {
    pointerDownPos = {
      x: e.clientX ?? e.touches?.[0]?.clientX ?? 0,
      y: e.clientY ?? e.touches?.[0]?.clientY ?? 0,
      time: performance.now(),
    };
  };

  const onPointerUp = (e) => {
    if (!camera) return;
    const upX = e.clientX ?? e.changedTouches?.[0]?.clientX ?? 0;
    const upY = e.clientY ?? e.changedTouches?.[0]?.clientY ?? 0;
    const dist = Math.hypot(upX - pointerDownPos.x, upY - pointerDownPos.y);
    const elapsed = performance.now() - pointerDownPos.time;

    // Filter out drags/rotations
    if (dist > 8 || elapsed > 650) return;

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2(
      (upX / window.innerWidth) * 2 - 1,
      -(upY / window.innerHeight) * 2 + 1
    );
    raycaster.setFromCamera(pointer, camera);

    const hits = raycaster.intersectObjects(interactiveTargets, true);
    if (hits.length > 0) {
      const hitObj = hits[0].object;

      // If user tapped directly on the 3D telemetry card, dismiss it
      if (hitObj.userData?.isCardMesh || hitObj.userData?.isRocketCard) {
        telemetry.deselect();
        return;
      }

      const rocketId = hitObj.userData?.rocketId || hitObj.parent?.userData?.rocketId;
      if (rocketId && ROCKET_DATA[rocketId]) {
        if (telemetry.getActiveRocket && telemetry.getActiveRocket()?.id === rocketId) {
          // Toggle off if already selected
          telemetry.deselect();
        } else {
          telemetry.selectRocket(hitObj, rocketId);
        }
      }
    } else {
      // Tap outside / empty space deselects active rocket telemetry
      if (telemetry.getActiveRocket && telemetry.getActiveRocket()) {
        telemetry.deselect();
      }
    }
  };

  window.addEventListener('pointerdown', onPointerDown, { passive: true });
  window.addEventListener('pointerup', onPointerUp, { passive: true });

  const update = (elapsed, dt) => {
    telemetry.update(elapsed, dt);
  };

  return {
    group: rocketsMasterGroup,
    update,
    interactiveTargets,
  };
}

// ═════════════════════════════════════════════════════════════════
// 1. ISRO PSLV — POLAR SATELLITE LAUNCH VEHICLE (H = 6.5m)
// ═════════════════════════════════════════════════════════════════
function buildPslvModel(parent, pedHeight, targets, matPslv, nozzleMat, goldMat, addClamps) {
  const group = new THREE.Group();
  group.name = 'Rocket_PSLV';
  group.position.set(0, pedHeight + 0.02, 0);
  parent.add(group);

  const coreRadius = 0.24;
  const darkRingMat = new THREE.MeshStandardMaterial({ color: 0x1f242e, roughness: 0.5, metalness: 0.7 });

  // Stage 1 (PS1 Solid Rocket Booster - Segmented Steel Casing)
  const ps1 = new THREE.Mesh(new THREE.CylinderGeometry(coreRadius, coreRadius, 2.10, 32), matPslv);
  ps1.position.y = 1.05;
  ps1.castShadow = true;
  group.add(ps1);

  // PS1 Nozzle Bell with Gimbal Rings
  const noz1 = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.28, 24), nozzleMat);
  noz1.rotation.x = Math.PI;
  noz1.position.y = 0.04;
  group.add(noz1);

  // Interstage 1/2 Truss Ring
  const ring1 = new THREE.Mesh(new THREE.CylinderGeometry(coreRadius * 1.01, coreRadius * 1.01, 0.14, 32), darkRingMat);
  ring1.position.y = 2.17;
  group.add(ring1);

  // Stage 2 (PS2 Vikas Liquid Engine Stage)
  const ps2 = new THREE.Mesh(new THREE.CylinderGeometry(coreRadius, coreRadius, 1.35, 32), matPslv);
  ps2.position.y = 2.24 + 0.675;
  ps2.castShadow = true;
  group.add(ps2);

  // Vikas turbopump exhaust cowlings & roll thrusters
  [-0.26, 0.26].forEach((xOff) => {
    const pod = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.24, 0.06), darkRingMat);
    pod.position.set(xOff, 2.38, 0);
    group.add(pod);
  });

  // Stage 3 (PS3 Solid Motor)
  const ps3 = new THREE.Mesh(new THREE.CylinderGeometry(coreRadius * 0.95, coreRadius, 1.15, 32), matPslv);
  ps3.position.y = 3.59 + 0.575;
  group.add(ps3);

  // Stage 4 (PS4 Liquid Upper Stage)
  const ps4 = new THREE.Mesh(new THREE.CylinderGeometry(coreRadius * 0.90, coreRadius * 0.95, 0.65, 32), darkRingMat);
  ps4.position.y = 4.74 + 0.325;
  group.add(ps4);

  // Dual Ogive Golden Satellite Fairing (Up to the Roof: 6.5m)
  const fairing = new THREE.Mesh(new THREE.ConeGeometry(coreRadius * 1.02, 1.25, 32), goldMat);
  fairing.position.y = 5.39 + 0.625;
  group.add(fairing);

  // 6 PSOM-XL Solid Strap-on Boosters
  for (let i = 0; i < 6; i++) {
    const ang = (i / 6) * Math.PI * 2;
    const bGroup = new THREE.Group();
    bGroup.position.set(Math.cos(ang) * 0.36, 0.95, Math.sin(ang) * 0.36);

    const bCyl = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, 1.65, 20), matPslv);
    bGroup.add(bCyl);

    const bNose = new THREE.Mesh(new THREE.ConeGeometry(0.075, 0.32, 20), darkRingMat);
    bNose.position.y = 0.825 + 0.16;
    bGroup.add(bNose);

    const bNoz = new THREE.Mesh(new THREE.ConeGeometry(0.055, 0.14, 16), nozzleMat);
    bNoz.rotation.x = Math.PI;
    bNoz.position.y = -0.825 - 0.07;
    bGroup.add(bNoz);

    // Thrust transfer bracket
    const strut = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.08, 0.08), darkRingMat);
    strut.position.set(0, 0.60, -0.06);
    bGroup.add(strut);

    group.add(bGroup);
  }

  // Aerodynamic Longitudinal Conduit (Cable Raceway running down fuselage)
  const raceway = new THREE.Mesh(new THREE.BoxGeometry(0.04, 4.8, 0.04), darkRingMat);
  raceway.position.set(0, 2.50, coreRadius + 0.015);
  group.add(raceway);

  // Launch Clamps on White Platform
  addClamps(parent, coreRadius, pedHeight);

  // Hitbox covering entire soaring height
  const hit = createHitMesh('pslv', 0.65, 6.6, 3.3);
  group.add(hit);
  targets.push(hit);
}

// ═════════════════════════════════════════════════════════════════
// 2. ISRO LVM3 — CHANDRAYAAN-3 LAUNCHER (H = 6.4m, Giant S200s)
// ═════════════════════════════════════════════════════════════════
function buildLvm3Model(parent, pedHeight, targets, matLvm3, matS200, nozzleMat, addClamps) {
  const group = new THREE.Group();
  group.name = 'Rocket_LVM3';
  group.position.set(0, pedHeight + 0.02, 0);
  parent.add(group);

  const coreRadius = 0.34;
  const darkMat = new THREE.MeshStandardMaterial({ color: 0x1f242e, roughness: 0.5, metalness: 0.7 });
  const whiteMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.35 });

  // Core L110 Liquid Stage (Burnt-Orange Cryo Foam Insulation)
  const l110 = new THREE.Mesh(new THREE.CylinderGeometry(coreRadius, coreRadius, 2.75, 32), matLvm3);
  l110.position.y = 1.375;
  l110.castShadow = true;
  group.add(l110);

  // Dual Vikas Liquid Engine Nozzles at Base
  [-0.14, 0.14].forEach((xOff) => {
    const noz = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.28, 20), nozzleMat);
    noz.rotation.x = Math.PI;
    noz.position.set(xOff, 0.05, 0);
    group.add(noz);
  });

  // C25 Cryogenic Upper Stage (CE-20 Engine)
  const c25 = new THREE.Mesh(new THREE.CylinderGeometry(coreRadius, coreRadius, 1.35, 32), whiteMat);
  c25.position.y = 2.75 + 0.675;
  c25.castShadow = true;
  group.add(c25);

  // Interstage Venting Stringers
  const c25Band = new THREE.Mesh(new THREE.CylinderGeometry(coreRadius * 1.01, coreRadius * 1.01, 0.18, 32), darkMat);
  c25Band.position.y = 2.75;
  group.add(c25Band);

  // Massive 5m Ogive Payload Fairing (Chandrayaan-3)
  const fairing = new THREE.Mesh(new THREE.ConeGeometry(coreRadius * 1.25, 2.10, 32), whiteMat);
  fairing.position.y = 4.10 + 1.05;
  fairing.castShadow = true;
  group.add(fairing);

  // 2 Massive S200 Solid Rocket Boosters (World's 2nd largest solid boosters)
  [-0.62, 0.62].forEach((xOff) => {
    const s200Group = new THREE.Group();
    s200Group.position.set(xOff, 1.60, 0);

    // Segmented motor casing
    const s200Cyl = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 3.15, 24), matS200);
    s200Group.add(s200Cyl);

    // Black aerodynamic nosecone with canted tip
    const nose = new THREE.Mesh(new THREE.ConeGeometry(0.24, 0.68, 24), darkMat);
    nose.position.y = 1.575 + 0.34;
    s200Group.add(nose);

    // Massive canted solid nozzle
    const noz = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.35, 20), nozzleMat);
    noz.rotation.x = Math.PI;
    noz.position.y = -1.575 - 0.175;
    s200Group.add(noz);

    // Heavy forward & aft thrust struts connecting to L110 core
    const strutFwd = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.12, 0.12), darkMat);
    strutFwd.position.set(xOff > 0 ? -0.16 : 0.16, 1.2, 0);
    s200Group.add(strutFwd);

    const strutAft = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.14, 0.14), darkMat);
    strutAft.position.set(xOff > 0 ? -0.16 : 0.16, -1.2, 0);
    s200Group.add(strutAft);

    group.add(s200Group);
  });

  // Longitudinal Cable Raceways
  const raceway = new THREE.Mesh(new THREE.BoxGeometry(0.06, 3.8, 0.05), darkMat);
  raceway.position.set(0, 2.1, coreRadius + 0.02);
  group.add(raceway);

  addClamps(parent, coreRadius * 1.35, pedHeight);

  const hit = createHitMesh('lvm3', 0.95, 6.5, 3.25);
  group.add(hit);
  targets.push(hit);
}

// ═════════════════════════════════════════════════════════════════
// 3. ISRO GSLV MK II (H = 6.6m, 4 Liquid Vikas Strap-ons)
// ═════════════════════════════════════════════════════════════════
function buildGslvModel(parent, pedHeight, targets, matGslv, nozzleMat, addClamps) {
  const group = new THREE.Group();
  group.name = 'Rocket_GSLV';
  group.position.set(0, pedHeight + 0.02, 0);
  parent.add(group);

  const coreRadius = 0.24;
  const darkMat = new THREE.MeshStandardMaterial({ color: 0x1e2430, roughness: 0.5 });
  const whiteMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.35 });

  // Core S139 Solid Stage
  const s139 = new THREE.Mesh(new THREE.CylinderGeometry(coreRadius, coreRadius, 2.50, 32), matGslv);
  s139.position.y = 1.25;
  group.add(s139);

  // GS2 Liquid Second Stage
  const gs2 = new THREE.Mesh(new THREE.CylinderGeometry(coreRadius, coreRadius, 1.45, 32), matGslv);
  gs2.position.y = 2.50 + 0.725;
  group.add(gs2);

  // Indigenous Cryogenic Upper Stage (CUS)
  const cus = new THREE.Mesh(new THREE.CylinderGeometry(coreRadius, coreRadius, 1.20, 32), whiteMat);
  cus.position.y = 3.95 + 0.60;
  group.add(cus);

  // Ogive Payload Fairing (Reaching 6.6m)
  const fairing = new THREE.Mesh(new THREE.ConeGeometry(coreRadius * 1.20, 1.55, 32), whiteMat);
  fairing.position.y = 5.15 + 0.775;
  group.add(fairing);

  // 4 Liquid Strap-on Boosters (L40 Vikas)
  for (let i = 0; i < 4; i++) {
    const ang = (i / 4) * Math.PI * 2 + Math.PI / 4;
    const l40 = new THREE.Group();
    l40.position.set(Math.cos(ang) * 0.40, 1.25, Math.sin(ang) * 0.40);

    const bCyl = new THREE.Mesh(new THREE.CylinderGeometry(0.10, 0.10, 2.30, 20), matGslv);
    l40.add(bCyl);

    const bNose = new THREE.Mesh(new THREE.ConeGeometry(0.10, 0.45, 20), darkMat);
    bNose.position.y = 1.15 + 0.225;
    l40.add(bNose);

    const bNoz = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.18, 16), nozzleMat);
    bNoz.rotation.x = Math.PI;
    bNoz.position.y = -1.15 - 0.09;
    l40.add(bNoz);

    group.add(l40);
  }

  addClamps(parent, coreRadius, pedHeight);

  const hit = createHitMesh('gslv', 0.75, 6.7, 3.35);
  group.add(hit);
  targets.push(hit);
}

// ═════════════════════════════════════════════════════════════════
// 4. ISRO SOUNDING ROCKET — ROHINI RH-200 ON MOBILE LAUNCH TOWER (H = 6.2m)
// ═════════════════════════════════════════════════════════════════
function buildSoundingRocketModel(parent, pedHeight, targets, nozzleMat) {
  const group = new THREE.Group();
  group.name = 'Rocket_Sounding';
  group.position.set(0, pedHeight + 0.02, 0);
  parent.add(group);

  const steelTrussMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.85, roughness: 0.25 });
  const whiteMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.35 });
  const safetyOrangeMat = new THREE.MeshStandardMaterial({ color: 0xff3b00, roughness: 0.35 });

  // Towering Structural Steel Launch Rail Truss (Up to 6.2m tall, angled at 82 degrees)
  const tower = new THREE.Group();
  tower.rotation.x = -0.10; // 82 degree authentic launch elevation
  group.add(tower);

  // Main square launch rail spine
  const mainRail = new THREE.Mesh(new THREE.BoxGeometry(0.12, 6.20, 0.12), steelTrussMat);
  mainRail.position.set(0, 3.10, -0.12);
  tower.add(mainRail);

  // Ladder rungs & elevation gear teeth along the rail
  for (let y = 0.4; y < 6.0; y += 0.35) {
    const rung = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.24, 8), steelTrussMat);
    rung.rotation.z = Math.PI / 2;
    rung.position.set(0, y, -0.12);
    tower.add(rung);
  }

  // Dual hydraulic tilt cylinders at the base
  [-0.18, 0.18].forEach((xOff) => {
    const piston = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.2, 16), steelTrussMat);
    piston.position.set(xOff, 0.6, 0.2);
    piston.rotation.x = 0.45;
    group.add(piston);
  });

  // Two-Stage Rohini RH-200 Sounding Rocket on Rail
  const rkt = new THREE.Group();
  rkt.position.set(0, 0.85, 0.06);
  tower.add(rkt);

  // Stage 1 Solid Booster
  const s1 = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 2.10, 24), whiteMat);
  s1.position.y = 1.05;
  rkt.add(s1);

  // Stage 2 Sustainer
  const s2 = new THREE.Mesh(new THREE.CylinderGeometry(0.060, 0.060, 2.20, 24), whiteMat);
  s2.position.y = 2.10 + 1.10;
  rkt.add(s2);

  // High-Visibility Safety-Orange Nosecone
  const nose = new THREE.Mesh(new THREE.ConeGeometry(0.060, 0.75, 24), safetyOrangeMat);
  nose.position.y = 4.30 + 0.375;
  rkt.add(nose);

  // 4 Swept Delta Stabilizing Fins at Base
  for (let f = 0; f < 4; f++) {
    const fAng = (f / 4) * Math.PI * 2;
    const fin = new THREE.Mesh(new THREE.BoxGeometry(0.01, 0.45, 0.28), safetyOrangeMat);
    fin.position.set(Math.cos(fAng) * 0.16, 0.25, Math.sin(fAng) * 0.16);
    fin.rotation.y = -fAng;
    rkt.add(fin);
  }

  const hit = createHitMesh('sounding', 0.55, 6.3, 3.15);
  group.add(hit);
  targets.push(hit);
}

// ═════════════════════════════════════════════════════════════════
// 5. ISRO SLV-3 — DR. KALAM HISTORIC FIRST LAUNCHER (H = 5.8m)
// ═════════════════════════════════════════════════════════════════
function buildSlv3Model(parent, pedHeight, targets, matSlv3, nozzleMat, addClamps) {
  const group = new THREE.Group();
  group.name = 'Rocket_SLV3';
  group.position.set(0, pedHeight + 0.02, 0);
  parent.add(group);

  const redMat = new THREE.MeshStandardMaterial({ color: 0xd92222, roughness: 0.35 });
  const goldMat = new THREE.MeshStandardMaterial({ color: 0xe5a932, roughness: 0.3, metalness: 0.8 });

  // 4 Solid Propellant Stages (Tapering from 0.20m to 0.14m radius, reaching 5.8m)
  const s1 = new THREE.Mesh(new THREE.CylinderGeometry(0.20, 0.20, 1.90, 28), matSlv3);
  s1.position.y = 0.95;
  group.add(s1);

  const s2 = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.20, 1.40, 28), matSlv3);
  s2.position.y = 1.90 + 0.70;
  group.add(s2);

  const s3 = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.18, 1.15, 28), matSlv3);
  s3.position.y = 3.30 + 0.575;
  group.add(s3);

  const s4 = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.16, 0.80, 28), matSlv3);
  s4.position.y = 4.45 + 0.40;
  group.add(s4);

  // Rohini RS-1 Satellite Nosecone Fairing
  const nose = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.65, 28), matSlv3);
  nose.position.y = 5.25 + 0.325;
  group.add(nose);

  // Golden satellite separation band
  const band = new THREE.Mesh(new THREE.CylinderGeometry(0.142, 0.142, 0.06, 28), goldMat);
  band.position.y = 5.25;
  group.add(band);

  // 4 Red Base Stabilizing Delta Fins
  for (let f = 0; f < 4; f++) {
    const fAng = (f / 4) * Math.PI * 2;
    const fin = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.48, 0.32), redMat);
    fin.position.set(Math.cos(fAng) * 0.28, 0.30, Math.sin(fAng) * 0.28);
    fin.rotation.y = -fAng;
    group.add(fin);
  }

  addClamps(parent, 0.20, pedHeight);

  const hit = createHitMesh('slv3', 0.55, 6.0, 3.0);
  group.add(hit);
  targets.push(hit);
}

// ═════════════════════════════════════════════════════════════════
// 6. ISRO ASLV — AUGMENTED SATELLITE LAUNCH VEHICLE (H = 6.0m)
// ═════════════════════════════════════════════════════════════════
function buildAslvModel(parent, pedHeight, targets, matAslv, nozzleMat, addClamps) {
  const group = new THREE.Group();
  group.name = 'Rocket_ASLV';
  group.position.set(0, pedHeight + 0.02, 0);
  parent.add(group);

  const coreRadius = 0.18;
  const darkMat = new THREE.MeshStandardMaterial({ color: 0x1f242e, roughness: 0.5 });

  // Core All-Solid Fuselage
  const core = new THREE.Mesh(new THREE.CylinderGeometry(coreRadius, coreRadius, 4.40, 28), matAslv);
  core.position.y = 2.20;
  group.add(core);

  // Characteristic Bulbous Fairing (Heat shield transition + cone)
  const bulb = new THREE.Mesh(new THREE.SphereGeometry(coreRadius * 1.35, 24, 18), matAslv);
  bulb.position.y = 4.40 + 0.18;
  group.add(bulb);

  const nose = new THREE.Mesh(new THREE.ConeGeometry(coreRadius * 1.30, 0.85, 24), matAslv);
  nose.position.y = 4.58 + 0.425;
  group.add(nose);

  // 2 Stage-0 Strap-on Solid Boosters
  [-0.38, 0.38].forEach((xOff) => {
    const sGroup = new THREE.Group();
    sGroup.position.set(xOff, 1.45, 0);

    const sCyl = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 2.50, 20), matAslv);
    sGroup.add(sCyl);

    const sNose = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.45, 20), darkMat);
    sNose.position.y = 1.25 + 0.225;
    sGroup.add(sNose);

    const sNoz = new THREE.Mesh(new THREE.ConeGeometry(0.10, 0.18, 16), nozzleMat);
    sNoz.rotation.x = Math.PI;
    sNoz.position.y = -1.25 - 0.09;
    sGroup.add(sNoz);

    group.add(sGroup);
  });

  addClamps(parent, coreRadius, pedHeight);

  const hit = createHitMesh('aslv', 0.65, 6.2, 3.1);
  group.add(hit);
  targets.push(hit);
}

// ═════════════════════════════════════════════════════════════════
// 7. ISRO HRLV / NGLV — HUMAN-RATED REUSABLE LAUNCHER (H = 6.9m)
// ═════════════════════════════════════════════════════════════════
function buildHrlvModel(parent, pedHeight, targets, matHrlv, nozzleMat, addClamps) {
  const group = new THREE.Group();
  group.name = 'Rocket_HRLV';
  group.position.set(0, pedHeight + 0.02, 0);
  parent.add(group);

  const coreRadius = 0.35;
  const darkMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.5 });
  const titaniumMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.88, roughness: 0.22 });

  // Reusable Methalox Booster
  const booster = new THREE.Mesh(new THREE.CylinderGeometry(coreRadius, coreRadius, 3.80, 32), matHrlv);
  booster.position.y = 1.90;
  group.add(booster);

  // Cluster of 9 Methalox Engine Bells at Base
  for (let e = 0; e < 8; e++) {
    const eAng = (e / 8) * Math.PI * 2;
    const noz = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.22, 16), nozzleMat);
    noz.rotation.x = Math.PI;
    noz.position.set(Math.cos(eAng) * 0.20, 0.04, Math.sin(eAng) * 0.20);
    group.add(noz);
  }
  const centerNoz = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.24, 16), nozzleMat);
  centerNoz.rotation.x = Math.PI;
  centerNoz.position.set(0, 0.04, 0);
  group.add(centerNoz);

  // Semi-Cryogenic & Cryogenic Upper Stages
  const upper = new THREE.Mesh(new THREE.CylinderGeometry(coreRadius * 0.95, coreRadius, 1.60, 32), titaniumMat);
  upper.position.y = 3.80 + 0.80;
  group.add(upper);

  // Gaganyaan Orbital Module Adapter & Ogive Fairing (Reaching 6.9m)
  const fairing = new THREE.Mesh(new THREE.ConeGeometry(coreRadius * 1.02, 1.50, 32), matHrlv);
  fairing.position.y = 5.40 + 0.75;
  group.add(fairing);

  // 4 Planar Titanium Grid Fins for Atmospheric Reentry
  for (let g = 0; g < 4; g++) {
    const gAng = (g / 4) * Math.PI * 2;
    const fin = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.26, 0.26), darkMat);
    fin.position.set(Math.cos(gAng) * (coreRadius + 0.10), 3.65, Math.sin(gAng) * (coreRadius + 0.10));
    fin.rotation.y = -gAng;
    group.add(fin);
  }

  // 4 Folded Carbon Landing Legs at Base
  for (let l = 0; l < 4; l++) {
    const lAng = (l / 4) * Math.PI * 2 + Math.PI / 4;
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.03, 1.45, 0.03), darkMat);
    leg.position.set(Math.cos(lAng) * (coreRadius + 0.02), 0.75, Math.sin(lAng) * (coreRadius + 0.02));
    group.add(leg);
  }

  addClamps(parent, coreRadius, pedHeight);

  const hit = createHitMesh('hrlv', 0.85, 7.0, 3.5);
  group.add(hit);
  targets.push(hit);
}

// ═════════════════════════════════════════════════════════════════
// 8. ISRO SSLV — SMALL SATELLITE LAUNCH VEHICLE (H = 5.8m)
// ═════════════════════════════════════════════════════════════════
function buildSslvModel(parent, pedHeight, targets, matSslv, nozzleMat, addClamps) {
  const group = new THREE.Group();
  group.name = 'Rocket_SSLV';
  group.position.set(0, pedHeight + 0.02, 0);
  parent.add(group);

  const coreRadius = 0.22;
  const cyanMat = new THREE.MeshStandardMaterial({ color: 0x00e5ff, roughness: 0.3 });
  const carbonMat = new THREE.MeshStandardMaterial({ color: 0x16181f, roughness: 0.45, metalness: 0.5 });

  // 3 Solid Stages (SS1, SS2, SS3)
  const ss1 = new THREE.Mesh(new THREE.CylinderGeometry(coreRadius, coreRadius, 2.20, 28), matSslv);
  ss1.position.y = 1.10;
  group.add(ss1);

  const ss2 = new THREE.Mesh(new THREE.CylinderGeometry(coreRadius, coreRadius, 1.30, 28), matSslv);
  ss2.position.y = 2.20 + 0.65;
  group.add(ss2);

  const ss3 = new THREE.Mesh(new THREE.CylinderGeometry(coreRadius * 0.92, coreRadius, 1.00, 28), matSslv);
  ss3.position.y = 3.50 + 0.50;
  group.add(ss3);

  // Liquid Velocity Trimming Module (VTM Ring)
  const vtm = new THREE.Mesh(new THREE.CylinderGeometry(coreRadius * 0.92, coreRadius * 0.92, 0.16, 28), cyanMat);
  vtm.position.y = 4.50 + 0.08;
  group.add(vtm);

  // Carbon-Composite Lightweight Fairing (Up to 5.8m)
  const fairing = new THREE.Mesh(new THREE.ConeGeometry(coreRadius * 1.05, 1.15, 28), carbonMat);
  fairing.position.y = 4.66 + 0.575;
  group.add(fairing);

  addClamps(parent, coreRadius, pedHeight);

  const hit = createHitMesh('sslv', 0.55, 6.0, 3.0);
  group.add(hit);
  targets.push(hit);
}

// ═════════════════════════════════════════════════════════════════
// 9. NASA APOLLO 11 (SATURN V) SUPER HEAVY-LIFT ROCKET (H = 7.2m, Upto Roof!)
// ═════════════════════════════════════════════════════════════════
function buildApollo11Model(parent, pedHeight, targets, matSaturnV, nozzleMat, addClamps) {
  const group = new THREE.Group();
  group.name = 'Rocket_Apollo11';
  group.position.set(0, pedHeight + 0.02, 0);
  parent.add(group);

  const coreRadius = 0.38;
  const redMat = new THREE.MeshStandardMaterial({ color: 0xb22234, roughness: 0.35 });
  const silverMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.25, metalness: 0.85 });

  // S-IC First Stage (Black-and-White Roll Pattern)
  const sic = new THREE.Mesh(new THREE.CylinderGeometry(coreRadius, coreRadius, 2.60, 36), matSaturnV);
  sic.position.y = 1.30;
  sic.castShadow = true;
  group.add(sic);

  // 5 Massive Rocketdyne F-1 Engine Bell Nozzles
  for (let e = 0; e < 4; e++) {
    const eAng = (e / 4) * Math.PI * 2;
    const f1 = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.32, 20), nozzleMat);
    f1.rotation.x = Math.PI;
    f1.position.set(Math.cos(eAng) * 0.22, 0.06, Math.sin(eAng) * 0.22);
    group.add(f1);
  }
  const f1Center = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.34, 20), nozzleMat);
  f1Center.rotation.x = Math.PI;
  f1Center.position.set(0, 0.06, 0);
  group.add(f1Center);

  // 4 S-IC Aerodynamic Fins with Fairing Cowlings
  for (let f = 0; f < 4; f++) {
    const fAng = (f / 4) * Math.PI * 2;
    const fin = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.65, 0.42), silverMat);
    fin.position.set(Math.cos(fAng) * (coreRadius + 0.16), 0.45, Math.sin(fAng) * (coreRadius + 0.16));
    fin.rotation.y = -fAng;
    group.add(fin);
  }

  // S-II Second Stage
  const sii = new THREE.Mesh(new THREE.CylinderGeometry(coreRadius, coreRadius, 1.70, 36), matSaturnV);
  sii.position.y = 2.60 + 0.85;
  sii.castShadow = true;
  group.add(sii);

  // S-IVB Third Stage (Tapered interstage adapter)
  const sivb = new THREE.Mesh(new THREE.CylinderGeometry(coreRadius * 0.70, coreRadius, 1.25, 36), matSaturnV);
  sivb.position.y = 4.30 + 0.625;
  group.add(sivb);

  // Apollo Command and Service Module (CSM)
  const sm = new THREE.Mesh(new THREE.CylinderGeometry(coreRadius * 0.48, coreRadius * 0.48, 0.55, 32), silverMat);
  sm.position.y = 5.55 + 0.275;
  group.add(sm);

  const cm = new THREE.Mesh(new THREE.ConeGeometry(coreRadius * 0.48, 0.38, 32), silverMat);
  cm.position.y = 6.10 + 0.19;
  group.add(cm);

  // Authentic Launch Escape System (LES) Tower (Reaching 7.2m right to roof cove!)
  const lesTower = new THREE.Group();
  lesTower.position.y = 6.29;

  // 4 Open titanium truss legs
  for (let l = 0; l < 4; l++) {
    const lAng = (l / 4) * Math.PI * 2 + Math.PI / 4;
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.55, 8), redMat);
    leg.position.set(Math.cos(lAng) * 0.06, 0.275, Math.sin(lAng) * 0.06);
    lesTower.add(leg);
  }
  // Escape motor body & jettison nozzles
  const motor = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.035, 0.45, 16), redMat);
  motor.position.y = 0.55 + 0.225;
  lesTower.add(motor);

  const noseSpike = new THREE.Mesh(new THREE.ConeGeometry(0.025, 0.20, 16), redMat);
  noseSpike.position.y = 1.00 + 0.10;
  lesTower.add(noseSpike);

  group.add(lesTower);

  addClamps(parent, coreRadius, pedHeight);

  const hit = createHitMesh('apollo11', 0.95, 7.3, 3.65);
  group.add(hit);
  targets.push(hit);
}

// ═════════════════════════════════════════════════════════════════
// 10. SPACEX FALCON 9 (H = 6.8m, Sleek White, Grid Fins, Legs)
// ═════════════════════════════════════════════════════════════════
function buildFalcon9Model(parent, pedHeight, targets, matFalcon9, nozzleMat, addClamps) {
  const group = new THREE.Group();
  group.name = 'Rocket_Falcon9';
  group.position.set(0, pedHeight + 0.02, 0);
  parent.add(group);

  const coreRadius = 0.26;
  const darkMat = new THREE.MeshStandardMaterial({ color: 0x11141a, roughness: 0.5 });
  const whiteMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.32 });

  // First Stage Reusable Booster (Fuselage with vertical "SPACEX" logo)
  const stage1 = new THREE.Mesh(new THREE.CylinderGeometry(coreRadius, coreRadius, 4.20, 32), matFalcon9);
  stage1.position.y = 2.10;
  stage1.castShadow = true;
  group.add(stage1);

  // Octaweb Cluster of 9 Merlin 1D Rocket Engines
  for (let e = 0; e < 8; e++) {
    const eAng = (e / 8) * Math.PI * 2;
    const m1d = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.20, 16), nozzleMat);
    m1d.rotation.x = Math.PI;
    m1d.position.set(Math.cos(eAng) * 0.16, 0.04, Math.sin(eAng) * 0.16);
    group.add(m1d);
  }
  const m1dCenter = new THREE.Mesh(new THREE.ConeGeometry(0.065, 0.22, 16), nozzleMat);
  m1dCenter.rotation.x = Math.PI;
  m1dCenter.position.set(0, 0.04, 0);
  group.add(m1dCenter);

  // Carbon-Fiber Interstage
  const interstage = new THREE.Mesh(new THREE.CylinderGeometry(coreRadius, coreRadius, 0.60, 32), darkMat);
  interstage.position.y = 4.20 + 0.30;
  group.add(interstage);

  // Second Stage
  const stage2 = new THREE.Mesh(new THREE.CylinderGeometry(coreRadius, coreRadius, 0.90, 32), whiteMat);
  stage2.position.y = 4.80 + 0.45;
  group.add(stage2);

  // 5.2m Payload Fairing (Reaching 6.8m)
  const fairing = new THREE.Mesh(new THREE.ConeGeometry(coreRadius * 1.25, 1.45, 32), whiteMat);
  fairing.position.y = 5.70 + 0.725;
  group.add(fairing);

  // 4 Hypersonic Titanium Grid Fins with perforated waffle ribs
  for (let g = 0; g < 4; g++) {
    const gAng = (g / 4) * Math.PI * 2;
    const finGroup = new THREE.Group();
    finGroup.position.set(Math.cos(gAng) * (coreRadius + 0.08), 4.35, Math.sin(gAng) * (coreRadius + 0.08));
    finGroup.rotation.y = -gAng;

    const finPlate = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.24, 0.22), darkMat);
    finGroup.add(finPlate);
    group.add(finGroup);
  }

  // 4 Folded Carbon-Fiber Landing Legs
  for (let l = 0; l < 4; l++) {
    const lAng = (l / 4) * Math.PI * 2 + Math.PI / 4;
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.025, 1.65, 0.025), darkMat);
    leg.position.set(Math.cos(lAng) * (coreRadius + 0.02), 0.85, Math.sin(lAng) * (coreRadius + 0.02));
    group.add(leg);
  }

  addClamps(parent, coreRadius, pedHeight);

  const hit = createHitMesh('falcon9', 0.80, 6.9, 3.45);
  group.add(hit);
  targets.push(hit);
}

// ═════════════════════════════════════════════════════════════════
// 11. SPACEX DRAGON — CREW DRAGON ON EXHIBITION TOWER (H = 5.8m)
// ═════════════════════════════════════════════════════════════════
function buildDragonModel(parent, pedHeight, targets, matDragon, nozzleMat) {
  const group = new THREE.Group();
  group.name = 'Spacecraft_Dragon';
  group.position.set(0, pedHeight + 0.02, 0);
  parent.add(group);

  const whiteMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.35 });
  const solarMat = new THREE.MeshStandardMaterial({ color: 0x0a1018, roughness: 0.35, metalness: 0.7 });
  const heatShieldMat = new THREE.MeshStandardMaterial({ color: 0x16181f, roughness: 0.65 });
  const towerMat = new THREE.MeshStandardMaterial({ color: 0xedf2f7, roughness: 0.55, metalness: 0.2 });

  // Sleek Architectural White Launch Adapter Column / Display Mast (Height 3.6m)
  const adapterTower = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.45, 3.60, 32), towerMat);
  adapterTower.position.y = 1.80;
  adapterTower.castShadow = true;
  group.add(adapterTower);

  // Umbilical conduit running along display tower
  const conduit = new THREE.Mesh(new THREE.BoxGeometry(0.08, 3.55, 0.08), heatShieldMat);
  conduit.position.set(0, 1.80, 0.40);
  group.add(conduit);

  // Dragon Trunk (Unpressurized Service Module with Photovoltaic Solar Array wrap)
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 1.15, 32), solarMat);
  trunk.position.y = 3.60 + 0.575;
  group.add(trunk);

  // 4 Aerodynamic Trunk Fins
  for (let f = 0; f < 4; f++) {
    const fAng = (f / 4) * Math.PI * 2;
    const fin = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.05, 0.025), whiteMat);
    fin.position.set(Math.cos(fAng) * 0.48, 3.60 + 0.525, Math.sin(fAng) * 0.48);
    fin.rotation.y = -fAng;
    group.add(fin);
  }

  // PICA-X Heat Shield Base Ring
  const shield = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.43, 0.12, 32), heatShieldMat);
  shield.position.y = 4.75 + 0.06;
  group.add(shield);

  // Crew Dragon Capsule (Pressure vessel with astronaut windows)
  const capsule = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.42, 0.95, 32), matDragon);
  capsule.position.y = 4.87 + 0.475;
  group.add(capsule);

  // Aerodynamic Nosecone Hatch (Reaching 5.8m)
  const nose = new THREE.Mesh(new THREE.SphereGeometry(0.24, 32, 20, 0, Math.PI * 2, 0, Math.PI * 0.45), whiteMat);
  nose.position.y = 5.82;
  group.add(nose);

  // 4 SuperDraco Abort Engine Blisters with canted dual nozzles
  for (let s = 0; s < 4; s++) {
    const sAng = (s / 4) * Math.PI * 2 + Math.PI / 4;
    const pod = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.18, 0.06), heatShieldMat);
    pod.position.set(Math.cos(sAng) * 0.38, 5.25, Math.sin(sAng) * 0.38);
    pod.rotation.y = -sAng;
    group.add(pod);
  }

  const hit = createHitMesh('dragon', 0.85, 6.0, 3.0);
  group.add(hit);
  targets.push(hit);
}

// ═════════════════════════════════════════════════════════════════
// 12. SKYROOT AEROSPACE — VIKRAM-1 & VIKRAM-2 DUAL PLATFORM (H = 6.0m / 6.4m)
// ═════════════════════════════════════════════════════════════════
function buildSkyrootDualModel(parent, pedHeight, targets, matVikram1, matVikram2, nozzleMat, makePlaque, addClamps) {
  const whiteMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.35 });
  const orangeRingMat = new THREE.MeshStandardMaterial({ color: 0xf97316, roughness: 0.35 });
  const cyanRingMat = new THREE.MeshStandardMaterial({ color: 0x00e5ff, roughness: 0.30 });

  // ── LEFT: VIKRAM-1 (ALL-CARBON FIBER SOLID + RAMAN LIQUID) ──
  const v1Group = new THREE.Group();
  v1Group.name = 'Rocket_Vikram1';
  v1Group.position.set(-0.65, pedHeight + 0.02, 0);
  parent.add(v1Group);

  const r1 = 0.20;
  // Kalam Series Solid Motor Fuselage
  const v1Body = new THREE.Mesh(new THREE.CylinderGeometry(r1, r1, 4.10, 28), matVikram1);
  v1Body.position.y = 2.05;
  v1Body.castShadow = true;
  v1Group.add(v1Body);

  // Raman 3D-Printed Liquid Upper Stage Ring
  const raman = new THREE.Mesh(new THREE.CylinderGeometry(r1, r1, 0.45, 28), orangeRingMat);
  raman.position.y = 4.10 + 0.225;
  v1Group.add(raman);

  // Lightweight Payload Fairing (Reaching 6.0m)
  const fairing1 = new THREE.Mesh(new THREE.ConeGeometry(r1 * 1.05, 1.25, 28), whiteMat);
  fairing1.position.y = 4.55 + 0.625;
  v1Group.add(fairing1);

  // Nozzle
  const noz1 = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.26, 20), nozzleMat);
  noz1.rotation.x = Math.PI;
  noz1.position.y = 0.04;
  v1Group.add(noz1);

  // Plaque 1
  const plaque1 = makePlaque(ROCKET_DATA.vikram1);
  plaque1.position.set(-0.65, 0.18, 1.25);
  plaque1.rotation.x = -0.32;
  parent.add(plaque1);

  addClamps(v1Group, r1, 0);

  const hit1 = createHitMesh('vikram1', 0.55, 6.2, 3.1);
  v1Group.add(hit1);
  targets.push(hit1);

  // ── RIGHT: VIKRAM-2 (CRYOGENIC DHAWAN-II ENGINE) ──
  const v2Group = new THREE.Group();
  v2Group.name = 'Rocket_Vikram2';
  v2Group.position.set(0.65, pedHeight + 0.02, 0);
  parent.add(v2Group);

  const r2 = 0.21;
  // Composite Fuselage
  const v2Body = new THREE.Mesh(new THREE.CylinderGeometry(r2, r2, 4.30, 28), whiteMat);
  v2Body.position.y = 2.15;
  v2Body.castShadow = true;
  v2Group.add(v2Body);

  // 3D-Printed Cryogenic Upper Stage (Dhawan-II LNG + LOX) in Skyroot Cyan
  const dhawan = new THREE.Mesh(new THREE.CylinderGeometry(r2, r2, 0.65, 28), cyanRingMat);
  dhawan.position.y = 4.30 + 0.325;
  v2Group.add(dhawan);

  // Carbon Composite Fairing (Reaching 6.4m)
  const fairing2 = new THREE.Mesh(new THREE.ConeGeometry(r2 * 1.05, 1.45, 28), matVikram2);
  fairing2.position.y = 4.95 + 0.725;
  v2Group.add(fairing2);

  // Cryogenic Nozzle
  const noz2 = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.28, 20), nozzleMat);
  noz2.rotation.x = Math.PI;
  noz2.position.y = 0.04;
  v2Group.add(noz2);

  // Plaque 2
  const plaque2 = makePlaque(ROCKET_DATA.vikram2);
  plaque2.position.set(0.65, 0.18, 1.25);
  plaque2.rotation.x = -0.32;
  parent.add(plaque2);

  addClamps(v2Group, r2, 0);

  const hit2 = createHitMesh('vikram2', 0.55, 6.5, 3.25);
  v2Group.add(hit2);
  targets.push(hit2);
}

// ═════════════════════════════════════════════════════════════════
// HELPER: CREATE INVISIBLE CLICKABLE HITBOX (SPANS FULL ROOF HEIGHT)
// ═════════════════════════════════════════════════════════════════
function createHitMesh(rocketId, radius, height, centerY) {
  const geo = new THREE.CylinderGeometry(radius, radius, height, 16);
  const mat = new THREE.MeshBasicMaterial({ visible: false });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.y = centerY;
  mesh.name = `HitMesh_${rocketId}`;
  mesh.userData = { rocketId, isHitBox: true };
  return mesh;
}
