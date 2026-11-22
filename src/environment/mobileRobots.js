// src/environment/mobileRobots.js — Autonomous R2-D2 & ISRO Pragyan Moon Rover Roaming the Atrium
import * as THREE from 'three';
import { createRobotTelemetry } from './robotTelemetry.js';

/**
 * Builds and initializes autonomous R2-D2 and India's Pragyan Moon Rover.
 * Both robots roam freely across the circular atrium floor and periodically
 * discover each other, stop, and interact for 2 to 3 seconds.
 *
 * @param {THREE.Scene} scene
 * @param {THREE.Camera} [camera]
 * @returns {{ update: Function, r2d2: THREE.Group, pragyan: THREE.Group, telemetry: Object, selectRobot: Function }}
 */
export function buildMobileRobots(scene, camera, controls = null) {
  const robotsGroup = new THREE.Group();
  robotsGroup.name = 'MobileRobotsFleet';
  scene.add(robotsGroup);

  // ═════════════════════════════════════════════════════════
  // 0. REAL-TIME ROBOT TELEMETRY SYSTEM
  // ═════════════════════════════════════════════════════════
  const telemetry = createRobotTelemetry(scene, camera, controls);

  // ═════════════════════════════════════════════════════════
  // 1. R2-D2 ASTROMECH DROID BUILDER
  // ═════════════════════════════════════════════════════════
  const r2Group = new THREE.Group();
  r2Group.name = 'R2D2';
  robotsGroup.add(r2Group);

  // Materials
  const r2WhiteMat = new THREE.MeshStandardMaterial({
    color: 0xf5f7fa,
    roughness: 0.35,
    metalness: 0.12,
  });
  const r2BlueMat = new THREE.MeshStandardMaterial({
    color: 0x0a4ebd,
    roughness: 0.3,
    metalness: 0.45,
  });
  const r2SilverMat = new THREE.MeshStandardMaterial({
    color: 0xdce2ec,
    roughness: 0.22,
    metalness: 0.82,
  });
  const r2DarkMat = new THREE.MeshStandardMaterial({
    color: 0x1a1e24,
    roughness: 0.6,
    metalness: 0.5,
  });
  const r2LensMat = new THREE.MeshPhysicalMaterial({
    color: 0x050810,
    roughness: 0.1,
    metalness: 0.9,
    clearcoat: 1.0,
  });

  // Main Cylinder Body (Radius 0.20m, Height 0.46m)
  const bodyRadius = 0.20;
  const bodyHeight = 0.46;
  const bodyCenterY = 0.44;

  const bodyMesh = new THREE.Mesh(
    new THREE.CylinderGeometry(bodyRadius, bodyRadius, bodyHeight, 32),
    r2WhiteMat
  );
  bodyMesh.position.y = bodyCenterY;
  bodyMesh.castShadow = true;
  r2Group.add(bodyMesh);

  // Invisible larger hit mesh for raycasting & touch selection
  const r2HitMesh = new THREE.Mesh(
    new THREE.CylinderGeometry(0.38, 0.38, 0.95, 16),
    new THREE.MeshBasicMaterial({ visible: false })
  );
  r2HitMesh.position.y = 0.45;
  r2HitMesh.name = 'HitMesh_R2D2';
  r2HitMesh.userData = { isRobot: true, robotKey: 'R2D2' };
  r2Group.add(r2HitMesh);

  // Body Blue Panels & Vents
  for (let i = 0; i < 4; i++) {
    const panel = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 0.08, 0.015),
      r2BlueMat
    );
    const pAng = (i - 1.5) * 0.35;
    panel.position.set(
      Math.sin(pAng) * (bodyRadius + 0.005),
      bodyCenterY + 0.08,
      Math.cos(pAng) * (bodyRadius + 0.005)
    );
    panel.rotation.y = pAng;
    r2Group.add(panel);
  }

  // Front acoustic vents (lower abdomen)
  const ventMesh = new THREE.Mesh(
    new THREE.BoxGeometry(0.12, 0.09, 0.015),
    r2SilverMat
  );
  ventMesh.position.set(0, bodyCenterY - 0.12, bodyRadius + 0.005);
  r2Group.add(ventMesh);

  // Rotating Dome Head (Radius 0.20m)
  const domeHead = new THREE.Group();
  domeHead.position.set(0, bodyCenterY + bodyHeight / 2, 0);
  r2Group.add(domeHead);

  const domeMesh = new THREE.Mesh(
    new THREE.SphereGeometry(bodyRadius, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.5),
    r2SilverMat
  );
  domeMesh.castShadow = true;
  domeHead.add(domeMesh);

  // Dome Blue Band & Accents
  const domeBand = new THREE.Mesh(
    new THREE.CylinderGeometry(bodyRadius * 1.002, bodyRadius * 1.002, 0.035, 32, 1, true),
    r2BlueMat
  );
  domeBand.position.y = 0.02;
  domeHead.add(domeBand);

  // Blue Panels on Dome
  for (let b = 0; b < 6; b++) {
    const piePanel = new THREE.Mesh(
      new THREE.BoxGeometry(0.05, 0.06, 0.01),
      r2BlueMat
    );
    const bAng = (b / 6) * Math.PI * 2;
    piePanel.position.set(
      Math.sin(bAng) * (bodyRadius * 0.88),
      0.11,
      Math.cos(bAng) * (bodyRadius * 0.88)
    );
    piePanel.rotation.y = bAng;
    domeHead.add(piePanel);
  }

  // Primary Photoreceptor "Radar Eye" Lens
  const radarEye = new THREE.Mesh(
    new THREE.CylinderGeometry(0.045, 0.05, 0.035, 16),
    r2DarkMat
  );
  radarEye.rotation.x = Math.PI / 2;
  radarEye.position.set(0, 0.10, bodyRadius * 0.86);
  domeHead.add(radarEye);

  const eyeLens = new THREE.Mesh(
    new THREE.SphereGeometry(0.032, 16, 16),
    r2LensMat
  );
  eyeLens.position.set(0, 0.10, bodyRadius * 0.90);
  domeHead.add(eyeLens);

  // Secondary Holographic Projector
  const holoProjector = new THREE.Mesh(
    new THREE.CylinderGeometry(0.025, 0.03, 0.03, 16),
    r2SilverMat
  );
  holoProjector.rotation.x = Math.PI / 2.2;
  holoProjector.position.set(0.08, 0.07, bodyRadius * 0.86);
  domeHead.add(holoProjector);

  // Hologram emitter light beam (active during interaction)
  const holoBeamMat = new THREE.MeshBasicMaterial({
    color: 0x00e5ff,
    transparent: true,
    opacity: 0.0,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const holoBeam = new THREE.Mesh(
    new THREE.ConeGeometry(0.35, 1.2, 16, 1, true),
    holoBeamMat
  );
  holoBeam.rotation.x = -Math.PI / 2.2;
  holoBeam.position.set(0.08, 0.07, bodyRadius * 0.86 + 0.6);
  domeHead.add(holoBeam);

  // Front Logic Display LEDs (Blinking red/blue)
  const redLedMat = new THREE.MeshBasicMaterial({ color: 0xff1122 });
  const blueLedMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff });

  const logicRed = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.03, 0.01), redLedMat);
  logicRed.position.set(-0.06, 0.12, bodyRadius * 0.88);
  domeHead.add(logicRed);

  const logicBlue = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.025, 0.01), blueLedMat);
  logicBlue.position.set(-0.06, 0.07, bodyRadius * 0.88);
  domeHead.add(logicBlue);

  // Outer Legs & Feet
  const legWidth = 0.06;
  const legDepth = 0.08;
  const legLength = 0.52;

  [-0.25, 0.25].forEach((xSide) => {
    const legGroup = new THREE.Group();
    legGroup.position.set(xSide, bodyCenterY + 0.16, 0);
    r2Group.add(legGroup);

    // Shoulder Hub Disc
    const shoulderDisc = new THREE.Mesh(
      new THREE.CylinderGeometry(0.07, 0.07, 0.04, 24),
      r2SilverMat
    );
    shoulderDisc.rotation.z = Math.PI / 2;
    legGroup.add(shoulderDisc);

    // Vertical Leg Strut
    const legStrut = new THREE.Mesh(
      new THREE.BoxGeometry(legWidth, legLength, legDepth),
      r2WhiteMat
    );
    legStrut.position.set(0, -legLength / 2, 0);
    legStrut.castShadow = true;
    legGroup.add(legStrut);

    // Blue Inset on Leg
    const legBlue = new THREE.Mesh(
      new THREE.BoxGeometry(legWidth + 0.005, 0.16, 0.04),
      r2BlueMat
    );
    legBlue.position.set(0, -legLength * 0.45, 0);
    legGroup.add(legBlue);

    // Foot Chassis (Beveled Battery Box with Rollers)
    const footBox = new THREE.Mesh(
      new THREE.BoxGeometry(0.12, 0.07, 0.24),
      r2WhiteMat
    );
    footBox.position.set(0, -legLength - 0.02, 0);
    footBox.castShadow = true;
    legGroup.add(footBox);

    // Wheel Rollers under foot
    const wheelL = new THREE.Mesh(
      new THREE.CylinderGeometry(0.028, 0.028, 0.09, 16),
      r2DarkMat
    );
    wheelL.rotation.z = Math.PI / 2;
    wheelL.position.set(0, -legLength - 0.045, 0.06);
    legGroup.add(wheelL);

    const wheelR = new THREE.Mesh(
      new THREE.CylinderGeometry(0.028, 0.028, 0.09, 16),
      r2DarkMat
    );
    wheelR.rotation.z = Math.PI / 2;
    wheelR.position.set(0, -legLength - 0.045, -0.06);
    legGroup.add(wheelR);
  });

  // Center Front Caster Foot (Tripod Configuration)
  const centerFootGroup = new THREE.Group();
  centerFootGroup.position.set(0, 0.14, 0.15);
  r2Group.add(centerFootGroup);

  const centerStrut = new THREE.Mesh(
    new THREE.BoxGeometry(0.06, 0.14, 0.06),
    r2WhiteMat
  );
  centerStrut.rotation.x = Math.PI / 8;
  centerFootGroup.add(centerStrut);

  const centerFoot = new THREE.Mesh(
    new THREE.BoxGeometry(0.10, 0.06, 0.18),
    r2WhiteMat
  );
  centerFoot.position.set(0, -0.08, 0.05);
  centerFootGroup.add(centerFoot);

  const centerWheel = new THREE.Mesh(
    new THREE.CylinderGeometry(0.028, 0.028, 0.08, 16),
    r2DarkMat
  );
  centerWheel.rotation.z = Math.PI / 2;
  centerWheel.position.set(0, -0.10, 0.05);
  centerFootGroup.add(centerWheel);

  // Overall scale: Life-size R2-D2 (~0.98m total height)
  r2Group.scale.set(1.0, 1.0, 1.0);

  // ═════════════════════════════════════════════════════════
  // 2. ISRO CHANDRAYAAN-3 PRAGYAN MOON ROVER BUILDER
  // ═════════════════════════════════════════════════════════
  const pragyanGroup = new THREE.Group();
  pragyanGroup.name = 'PragyanMoonRover';
  robotsGroup.add(pragyanGroup);

  // Materials
  const goldMliMat = new THREE.MeshStandardMaterial({
    color: 0xf4bb32, // Gold aluminized Kapton thermal blanket
    roughness: 0.42,
    metalness: 0.45,
    emissive: 0x3d2904,
    emissiveIntensity: 0.35,
  });
  const roverDarkTitanium = new THREE.MeshStandardMaterial({
    color: 0x22262e,
    roughness: 0.45,
    metalness: 0.75,
  });
  const lunarWheelMat = new THREE.MeshStandardMaterial({
    color: 0x9aa0a8, // Cleated aluminum lunar wheels
    roughness: 0.35,
    metalness: 0.85,
  });
  const solarPanelMat = new THREE.MeshPhysicalMaterial({
    color: 0x0a1428, // Deep blue silicon photovoltaic cells
    roughness: 0.2,
    metalness: 0.4,
    clearcoat: 0.8,
  });

  // Main Chassis Box (Length 0.65m, Width 0.46m, Height 0.18m)
  const chassis = new THREE.Mesh(
    new THREE.BoxGeometry(0.46, 0.18, 0.65),
    goldMliMat
  );
  chassis.position.y = 0.26;
  chassis.castShadow = true;
  pragyanGroup.add(chassis);

  // Invisible larger hit box for raycasting & touch selection
  const pragyanHitMesh = new THREE.Mesh(
    new THREE.BoxGeometry(0.72, 0.65, 0.88),
    new THREE.MeshBasicMaterial({ visible: false })
  );
  pragyanHitMesh.position.y = 0.36;
  pragyanHitMesh.name = 'HitMesh_Pragyan';
  pragyanHitMesh.userData = { isRobot: true, robotKey: 'Pragyan' };
  pragyanGroup.add(pragyanHitMesh);

  // Top Equipment Deck
  const deckPlate = new THREE.Mesh(
    new THREE.BoxGeometry(0.44, 0.02, 0.63),
    roverDarkTitanium
  );
  deckPlate.position.set(0, 0.36, 0);
  pragyanGroup.add(deckPlate);

  // Tilted Deployable Solar Array (45° tilt to capture low-angle lunar polar sunlight)
  const solarGroup = new THREE.Group();
  solarGroup.position.set(0, 0.37, 0.05);
  solarGroup.rotation.x = -Math.PI / 4.8;
  pragyanGroup.add(solarGroup);

  const solarPanel = new THREE.Mesh(
    new THREE.BoxGeometry(0.50, 0.015, 0.44),
    solarPanelMat
  );
  solarPanel.castShadow = true;
  solarGroup.add(solarPanel);

  // Solar panel gold edge border
  const solarBorder = new THREE.Mesh(
    new THREE.BoxGeometry(0.52, 0.012, 0.46),
    goldMliMat
  );
  solarGroup.add(solarBorder);

  // High-Resolution Indian Flag & ISRO Decal Canvas
  const decalCanvas = document.createElement('canvas');
  decalCanvas.width = 256;
  decalCanvas.height = 128;
  const dCtx = decalCanvas.getContext('2d');

  // Indian Tricolor Flag
  dCtx.fillStyle = '#ff9933'; // Saffron
  dCtx.fillRect(0, 0, 256, 32);
  dCtx.fillStyle = '#ffffff'; // White
  dCtx.fillRect(0, 32, 256, 32);
  dCtx.fillStyle = '#138808'; // Green
  dCtx.fillRect(0, 64, 256, 32);

  // 24-Spoke Ashoka Chakra (Navy Blue)
  dCtx.strokeStyle = '#000080';
  dCtx.lineWidth = 2;
  dCtx.beginPath();
  dCtx.arc(128, 48, 12, 0, Math.PI * 2);
  dCtx.stroke();
  for (let s = 0; s < 24; s++) {
    const sAng = (s / 24) * Math.PI * 2;
    dCtx.beginPath();
    dCtx.moveTo(128, 48);
    dCtx.lineTo(128 + Math.cos(sAng) * 12, 48 + Math.sin(sAng) * 12);
    dCtx.stroke();
  }

  // ISRO // PRAGYAN Bottom banner
  dCtx.fillStyle = '#0a101c';
  dCtx.fillRect(0, 96, 256, 32);
  dCtx.font = 'bold 16px "Inter", sans-serif';
  dCtx.fillStyle = '#ffaa00';
  dCtx.textAlign = 'center';
  dCtx.textBaseline = 'middle';
  dCtx.fillText('ISRO // PRAGYAN ROVER', 128, 112);

  const decalTex = new THREE.CanvasTexture(decalCanvas);
  const flagDecal = new THREE.Mesh(
    new THREE.PlaneGeometry(0.18, 0.09),
    new THREE.MeshBasicMaterial({ map: decalTex, side: THREE.DoubleSide })
  );
  flagDecal.position.set(0.231, 0.26, 0.08);
  flagDecal.rotation.y = Math.PI / 2;
  pragyanGroup.add(flagDecal);

  const flagDecalL = flagDecal.clone();
  flagDecalL.position.set(-0.231, 0.26, 0.08);
  flagDecalL.rotation.y = -Math.PI / 2;
  pragyanGroup.add(flagDecalL);

  const flagDecalFront = new THREE.Mesh(
    new THREE.PlaneGeometry(0.20, 0.095),
    new THREE.MeshBasicMaterial({ map: decalTex, side: THREE.DoubleSide })
  );
  flagDecalFront.position.set(0, 0.26, 0.326);
  pragyanGroup.add(flagDecalFront);

  // Stereo Navigation Camera (NavCam) Mast
  const mastGroup = new THREE.Group();
  mastGroup.position.set(0.12, 0.37, 0.26);
  pragyanGroup.add(mastGroup);

  const mastPole = new THREE.Mesh(
    new THREE.CylinderGeometry(0.015, 0.018, 0.26, 16),
    goldMliMat
  );
  mastPole.position.y = 0.13;
  mastGroup.add(mastPole);

  const navCamHead = new THREE.Group();
  navCamHead.position.set(0, 0.26, 0);
  mastGroup.add(navCamHead);

  const navCamBox = new THREE.Mesh(
    new THREE.BoxGeometry(0.14, 0.05, 0.06),
    roverDarkTitanium
  );
  navCamHead.add(navCamBox);

  // Dual stereo optical lenses
  [-0.045, 0.045].forEach((lx) => {
    const lens = new THREE.Mesh(
      new THREE.CylinderGeometry(0.016, 0.018, 0.025, 16),
      r2LensMat
    );
    lens.rotation.x = Math.PI / 2;
    lens.position.set(lx, 0, 0.035);
    navCamHead.add(lens);
  });

  // Status payload sensor LED on mast
  const pragyanLedMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
  const sensorLed = new THREE.Mesh(
    new THREE.SphereGeometry(0.012, 12, 12),
    pragyanLedMat
  );
  sensorLed.position.set(0, 0.035, 0.03);
  navCamHead.add(sensorLed);

  // Rear Scientific Instrument: APXS (Alpha Particle X-ray Spectrometer)
  const apxsGroup = new THREE.Group();
  apxsGroup.position.set(0, 0.22, -0.34);
  pragyanGroup.add(apxsGroup);

  const apxsSensor = new THREE.Mesh(
    new THREE.CylinderGeometry(0.04, 0.05, 0.08, 16),
    goldMliMat
  );
  apxsSensor.rotation.x = Math.PI / 3;
  apxsGroup.add(apxsSensor);

  // 6 Cleated Lunar Wheels & Rocker-Bogie Suspension
  const wheels = [];
  const wheelRadius = 0.095;
  const wheelWidth = 0.065;
  const wheelZOffsets = [-0.25, 0.0, 0.25];

  [-0.28, 0.28].forEach((sideX) => {
    // Rocker-Bogie Link Bar
    const bogieBar = new THREE.Mesh(
      new THREE.BoxGeometry(0.025, 0.03, 0.54),
      roverDarkTitanium
    );
    bogieBar.position.set(sideX * 0.9, 0.16, 0);
    pragyanGroup.add(bogieBar);

    wheelZOffsets.forEach((zOff) => {
      const wheelGroup = new THREE.Group();
      wheelGroup.position.set(sideX, wheelRadius, zOff);
      pragyanGroup.add(wheelGroup);

      // Cleated Lunar Wheel Rim
      const wheelCyl = new THREE.Mesh(
        new THREE.CylinderGeometry(wheelRadius, wheelRadius, wheelWidth, 24),
        lunarWheelMat
      );
      wheelCyl.rotation.z = Math.PI / 2;
      wheelCyl.castShadow = true;
      wheelGroup.add(wheelCyl);

      // Radial Cleats / Grousers around rim for lunar regolith traction
      for (let g = 0; g < 12; g++) {
        const gAng = (g / 12) * Math.PI * 2;
        const cleat = new THREE.Mesh(
          new THREE.BoxGeometry(wheelWidth + 0.005, 0.012, 0.008),
          roverDarkTitanium
        );
        cleat.position.set(0, Math.sin(gAng) * wheelRadius, Math.cos(gAng) * wheelRadius);
        wheelGroup.add(cleat);
      }

      wheels.push(wheelGroup);
    });
  });

  // Pragyan Scale: Life-size (~0.88m length, 0.72m width, 0.62m total height)
  pragyanGroup.scale.set(1.0, 1.0, 1.0);

  // ═════════════════════════════════════════════════════════
  // 3. AUTONOMOUS WANDERING & MUTUAL INTERACTION AI
  // ═════════════════════════════════════════════════════════
  // Initial spawn positions on atrium floor
  r2Group.position.set(2.5, 0, 3.5);
  pragyanGroup.position.set(-2.5, 0, -3.5);

  const ATRIUM_MAX_RADIUS = 15.5; // Stay well clear of outer wall (R=18m)
  const STATION_AVOID_RADIUS = 3.6; // Avoid pods at R=12m

  // Station Pod Centers to avoid
  const stationCenters = [
    new THREE.Vector3(12, 0, 0),                       // Physics
    new THREE.Vector3(3.71, 0, 11.41),                 // Chemistry
    new THREE.Vector3(-9.71, 0, 7.05),                 // Biology
    new THREE.Vector3(-9.71, 0, -7.05),                // Mathematics
    new THREE.Vector3(3.71, 0, -11.41),                // Astronomy
  ];

  const r2State = {
    pos: r2Group.position,
    yaw: 0.5,
    targetYaw: 0.5,
    speed: 1.1,
    turnTimer: 0,
    domeAngle: 0,
    targetDomeAngle: 0,
    headTurnTimer: 0,
    isInteracting: false,
  };

  const pragyanState = {
    pos: pragyanGroup.position,
    yaw: Math.PI + 0.4,
    targetYaw: Math.PI + 0.4,
    speed: 0.95,
    turnTimer: 0,
    mastAngle: 0,
    targetMastAngle: 0,
    wheelAngle: 0,
    isInteracting: false,
  };

  let interactionTimer = 0;
  let interactionCooldown = 6.0; // Seconds before next interaction can trigger
  const INTERACTION_DURATION = 2.8; // 2.5 to 3.0 seconds interaction

  const update = (elapsed, dt) => {
    const clampedDt = Math.min(dt, 0.1);

    // ── INTERACTION STATE CHECK ──
    const distBetween = r2State.pos.distanceTo(pragyanState.pos);
    interactionCooldown -= clampedDt;

    // Trigger spontaneous interaction when close enough (or periodically rendezvous)
    if (
      !r2State.isInteracting &&
      interactionCooldown <= 0 &&
      distBetween < 3.2
    ) {
      r2State.isInteracting = true;
      pragyanState.isInteracting = true;
      interactionTimer = INTERACTION_DURATION;

      // Turn to face each other
      const dirR2ToPragyan = pragyanState.pos.clone().sub(r2State.pos).normalize();
      const dirPragyanToR2 = r2State.pos.clone().sub(pragyanState.pos).normalize();

      r2State.targetYaw = Math.atan2(dirR2ToPragyan.x, dirR2ToPragyan.z);
      pragyanState.targetYaw = Math.atan2(dirPragyanToR2.x, dirPragyanToR2.z);
    }

    if (r2State.isInteracting) {
      interactionTimer -= clampedDt;

      // Smoothly stop & face each other
      r2State.speed = THREE.MathUtils.lerp(r2State.speed, 0, clampedDt * 6);
      pragyanState.speed = THREE.MathUtils.lerp(pragyanState.speed, 0, clampedDt * 6);

      r2State.yaw = THREE.MathUtils.lerp(r2State.yaw, r2State.targetYaw, clampedDt * 4);
      pragyanState.yaw = THREE.MathUtils.lerp(pragyanState.yaw, pragyanState.targetYaw, clampedDt * 4);

      // Interaction Gestures:
      // 1. R2-D2 rotates dome excitedly and flashes logic lights
      domeHead.rotation.y = Math.sin(elapsed * 9.0) * 0.65;
      holoBeamMat.opacity = Math.sin(elapsed * 12.0) > 0 ? 0.65 : 0.15;
      redLedMat.color.setHex(Math.sin(elapsed * 16.0) > 0 ? 0xff0044 : 0x440011);
      blueLedMat.color.setHex(Math.cos(elapsed * 16.0) > 0 ? 0x00ffff : 0x002244);

      // 2. Pragyan Rover pans NavCam mast and blinks sensor LED
      navCamHead.rotation.y = Math.sin(elapsed * 6.0) * 0.45;
      pragyanLedMat.color.setHex(Math.sin(elapsed * 14.0) > 0 ? 0x10b981 : 0xf59e0b);

      // Conclude interaction after 2.8 seconds
      if (interactionTimer <= 0) {
        r2State.isInteracting = false;
        pragyanState.isInteracting = false;
        interactionCooldown = 18.0 + Math.random() * 12.0; // Cooldown 18-30s

        // Steer away in different directions
        r2State.targetYaw += (Math.random() > 0.5 ? 1 : -1) * (Math.PI * 0.6 + Math.random() * 0.5);
        pragyanState.targetYaw += (Math.random() > 0.5 ? 1 : -1) * (Math.PI * 0.6 + Math.random() * 0.5);

        r2State.speed = 1.1;
        pragyanState.speed = 0.95;
        holoBeamMat.opacity = 0.0;
        navCamHead.rotation.y = 0;
      }
    } else {
      // ── AUTONOMOUS WANDERING LOGIC ──
      holoBeamMat.opacity = 0.0;

      // 1. R2-D2 Navigation
      r2State.turnTimer -= clampedDt;
      if (r2State.turnTimer <= 0) {
        r2State.turnTimer = 3.5 + Math.random() * 4.0;
        r2State.targetYaw += (Math.random() - 0.5) * 1.4;
      }

      // Avoid outer atrium wall
      const r2DistOrigin = Math.hypot(r2State.pos.x, r2State.pos.z);
      if (r2DistOrigin > ATRIUM_MAX_RADIUS) {
        r2State.targetYaw = Math.atan2(-r2State.pos.x, -r2State.pos.z);
      }

      // Avoid station pods
      stationCenters.forEach((sCenter) => {
        if (r2State.pos.distanceTo(sCenter) < STATION_AVOID_RADIUS) {
          const pushAway = r2State.pos.clone().sub(sCenter).normalize();
          r2State.targetYaw = Math.atan2(pushAway.x, pushAway.z);
        }
      });

      r2State.yaw = THREE.MathUtils.lerp(r2State.yaw, r2State.targetYaw, clampedDt * 2.5);
      const r2Move = r2State.speed * clampedDt;
      r2State.pos.x += Math.sin(r2State.yaw) * r2Move;
      r2State.pos.z += Math.cos(r2State.yaw) * r2Move;

      // Subtle body rocking & dome twirling
      r2Group.rotation.y = r2State.yaw;
      r2Group.rotation.z = Math.sin(elapsed * 8.0) * 0.02; // Gentle stride sway

      r2State.headTurnTimer -= clampedDt;
      if (r2State.headTurnTimer <= 0) {
        r2State.headTurnTimer = 2.0 + Math.random() * 3.0;
        r2State.targetDomeAngle = (Math.random() - 0.5) * 1.2;
      }
      r2State.domeAngle = THREE.MathUtils.lerp(r2State.domeAngle, r2State.targetDomeAngle, clampedDt * 3);
      domeHead.rotation.y = r2State.domeAngle;

      // Ambient logic LED blink
      redLedMat.color.setHex(Math.sin(elapsed * 5.0) > 0 ? 0xff2222 : 0x550000);
      blueLedMat.color.setHex(Math.cos(elapsed * 4.0) > 0 ? 0x00e5ff : 0x003366);

      // 2. Pragyan Rover Navigation
      pragyanState.turnTimer -= clampedDt;
      if (pragyanState.turnTimer <= 0) {
        pragyanState.turnTimer = 4.0 + Math.random() * 5.0;
        pragyanState.targetYaw += (Math.random() - 0.5) * 1.2;
      }

      const pDistOrigin = Math.hypot(pragyanState.pos.x, pragyanState.pos.z);
      if (pDistOrigin > ATRIUM_MAX_RADIUS) {
        pragyanState.targetYaw = Math.atan2(-pragyanState.pos.x, -pragyanState.pos.z);
      }

      stationCenters.forEach((sCenter) => {
        if (pragyanState.pos.distanceTo(sCenter) < STATION_AVOID_RADIUS) {
          const pushAway = pragyanState.pos.clone().sub(sCenter).normalize();
          pragyanState.targetYaw = Math.atan2(pushAway.x, pushAway.z);
        }
      });

      pragyanState.yaw = THREE.MathUtils.lerp(pragyanState.yaw, pragyanState.targetYaw, clampedDt * 2.2);
      const pMove = pragyanState.speed * clampedDt;
      pragyanState.pos.x += Math.sin(pragyanState.yaw) * pMove;
      pragyanState.pos.z += Math.cos(pragyanState.yaw) * pMove;

      pragyanGroup.rotation.y = pragyanState.yaw;

      // Rolling 6 cleated lunar wheels
      pragyanState.wheelAngle += pMove / wheelRadius;
      wheels.forEach((w) => {
        w.children[0].rotation.x = pragyanState.wheelAngle; // Wheel rim
      });

      // Subtle NavCam scanning
      navCamHead.rotation.y = Math.sin(elapsed * 1.5) * 0.15;
      pragyanLedMat.color.setHex(Math.sin(elapsed * 3.0) > 0 ? 0x10b981 : 0x054020);
    }

    // 3. Update Real-Time Robot Telemetry Card (Continuously follows active robot)
    telemetry.update(clampedDt);
  };

  // ═════════════════════════════════════════════════════════
  // TOUCH & CLICK RAYCASTING HANDLER FOR AUTONOMOUS ROBOTS
  // ═════════════════════════════════════════════════════════
  const interactiveRobots = [r2HitMesh, pragyanHitMesh, r2Group, pragyanGroup];
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
    if (dist > 14 || elapsed > 650) return;

    // Ignore clicks inside HUD panels or UI buttons
    if (
      e.target &&
      (e.target.closest('#robot-telemetry-hud') ||
        e.target.closest('#celestial-telemetry-hud') ||
        e.target.closest('#rocket-telemetry-hud') ||
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
    const hits = raycaster.intersectObjects(interactiveRobots, true);

    if (hits.length > 0) {
      // Find which robot was hit
      let hitKey = null;
      let hitGrp = null;
      for (const h of hits) {
        let obj = h.object;
        while (obj) {
          if (obj.userData?.robotKey) {
            hitKey = obj.userData.robotKey;
            hitGrp = hitKey === 'Pragyan' ? pragyanGroup : r2Group;
            break;
          }
          if (obj === r2Group) {
            hitKey = 'R2D2';
            hitGrp = r2Group;
            break;
          }
          if (obj === pragyanGroup) {
            hitKey = 'Pragyan';
            hitGrp = pragyanGroup;
            break;
          }
          obj = obj.parent;
        }
        if (hitKey) break;
      }

      if (hitKey && hitGrp) {
        if (telemetry.getCurrentTarget()?.dataKey === hitKey) {
          telemetry.deselect();
        } else {
          telemetry.selectRobot(hitGrp, hitKey);
        }
      }
    } else {
      if (telemetry.getCurrentTarget()) {
        telemetry.deselect();
      }
    }
  };

  window.addEventListener('pointerdown', handlePointerDown, { passive: true });
  window.addEventListener('pointerup', handlePointerUp, { passive: true });

  /**
   * Helper to manually trigger an immediate mutual interaction sequence.
   * @param {number} [duration=2.8]
   */
  function triggerInteraction(duration = 2.8) {
    r2State.isInteracting = true;
    pragyanState.isInteracting = true;
    interactionTimer = duration;

    // Direct orientation to face each other
    const dirR2ToPragyan = pragyanState.pos.clone().sub(r2State.pos).normalize();
    const dirPragyanToR2 = r2State.pos.clone().sub(pragyanState.pos).normalize();

    r2State.targetYaw = Math.atan2(dirR2ToPragyan.x, dirR2ToPragyan.z);
    pragyanState.targetYaw = Math.atan2(dirPragyanToR2.x, dirPragyanToR2.z);
    r2State.yaw = r2State.targetYaw;
    pragyanState.yaw = pragyanState.targetYaw;
    r2Group.rotation.y = r2State.yaw;
    pragyanGroup.rotation.y = pragyanState.yaw;
  }

  return {
    group: robotsGroup,
    r2d2: r2Group,
    pragyan: pragyanGroup,
    r2State,
    pragyanState,
    telemetry,
    update,
    triggerInteraction,
    setControls: (ctrls) => telemetry.setControls(ctrls),
    selectRobot: (key) => telemetry.selectRobot(key === 'Pragyan' ? pragyanGroup : r2Group, key),
    deselect: () => telemetry.deselect(),
  };
}
