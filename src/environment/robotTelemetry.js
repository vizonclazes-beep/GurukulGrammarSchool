// src/environment/robotTelemetry.js — Real-time following telemetry system for autonomous mobile robots
import * as THREE from 'three';
import { isMobileOrTablet, getViewportRoot } from '../ui/deviceOrientation.js';
import { enforceRoomBoundaries } from '../ui/controls.js';

export const ROBOT_DATA = {
  Pragyan: {
    name: 'ISRO PRAGYAN ROVER',
    designation: 'Chandrayaan-3 Lunar Surface Exploration Robot // Shiv Shakti Point',
    accentColor: '#10b981',
    stats: [
      { label: 'MISSION OBJECTIVE', value: 'In-Situ Lunar South Pole Surface Science' },
      { label: 'LANDING LOCATION', value: 'Shiv Shakti Point (69.373° S, 32.319° E)' },
      { label: 'LANDING DATE', value: 'August 23, 2023 // 18:04 IST' },
      { label: 'ROVER MASS', value: '26 kg (Ultralight Carbon-Composite Chassis)' },
      { label: 'MOBILITY SYSTEM', value: '6-Wheel Rocker-Bogie Suspension' },
      { label: 'POWER GENERATION', value: '50W Solar Array + High-Capacity Li-Ion' },
      { label: 'TOP VELOCITY', value: '1 cm/second (Stereo NavCam Guidance)' },
      { label: 'SPECTROMETER (LIBS)', value: 'Laser-Induced Breakdown Spectroscope' },
      { label: 'X-RAY PAYLOAD (APXS)', value: 'Alpha Particle X-Ray Spectrometer' },
      { label: 'LUNAR DISCOVERY', value: 'Direct In-Situ Confirmation of Sulphur (S), Al, Fe, Ca' },
      { label: 'WHEEL EMBOSS', value: 'ISRO Emblem & National Ashoka Lion Capital' },
      { label: 'OPERATIONAL STATUS', value: 'Primary Mission Accomplished // Lunar Night Hibernation' },
    ],
    summary:
      "India's historic lunar surface rover that achieved the world's first soft landing near the unexplored lunar south pole. Utilizing a 6-wheel rocker-bogie mechanism, Pragyan rolled across the regolith and fired laser pulses to vaporize soil samples, conducting groundbreaking in-situ spectroscopy that confirmed elemental sulphur, aluminum, calcium, and iron around Shiv Shakti Point.",
  },

  R2D2: {
    name: 'R2-D2 ASTROMECH DROID',
    designation: 'Industrial Automaton R2 Series // Astrogation & Starship Mechanic',
    accentColor: '#00e5ff',
    stats: [
      { label: 'MANUFACTURER', value: 'Industrial Automaton (R2 Series)' },
      { label: 'PRIMARY ROLE', value: 'Starship Hyperspace Astrogation & Repair' },
      { label: 'HEIGHT / WEIGHT', value: '1.09 meters // 32 kg' },
      { label: 'CHASSIS ALLOY', value: 'Reinforced Durasteel & Polished Cobalt Trim' },
      { label: 'PROPULSION', value: 'Dual All-Terrain Treads + Deployable Center Caster' },
      { label: 'SENSOR ARRAYS', value: 'Radar Eye, Heat Sensor, Acoustic & Life Scanner' },
      { label: 'PROJECTOR SYSTEM', value: 'Holographic Emitter & 3D Optical Recording Diode' },
      { label: 'COMPUTER INTERFACE', value: 'Universal High-Speed Retractable Scomp Link' },
      { label: 'TOOL ARSENAL', value: 'Fusion Welder, Scomp Jack, Circular Saw, Periscope' },
      { label: 'ROCKET BOOSTERS', value: 'Liquid-Fuel Leg Thrusters for Brief Flight' },
      { label: 'VOCAL SYNTHESIS', value: 'Binary Acoustic Beeps, Whistles, Chirps & Trills' },
      { label: 'OPERATING STATUS', value: 'Fully Autonomous // Logic Matrix Online' },
    ],
    summary:
      'The legendary astromech droid renowned for resourceful heroics, brilliant starship repairs under fire, and intricate computer slicing. Equipped with a spinning radar eye dome, multi-tool mechanical appendages, holographic projector, and an expressive binary vocabulary, R2-D2 remains the galaxy’s most indispensable robotic companion.',
  },
};

/**
 * Creates the Mobile Robot Telemetry System.
 * Floats a 3D holographic card above the clicked robot, continuously follows its
 * world coordinates as it roams the atrium floor, and tracks/follows it with the camera.
 *
 * @param {THREE.Scene} scene
 * @param {THREE.Camera} camera
 * @param {import('three/addons/controls/OrbitControls.js').OrbitControls} [controls=null]
 * @returns {Object}
 */
export function createRobotTelemetry(scene, camera, controls = null) {
  let _controls = controls;

  // ── Camera Tracking & Following State ──
  let isTrackingCamera = false;
  let isTransitioningToRobot = false;
  let transitionElapsed = 0;
  let savedEnablePan = true;
  const TRANSITION_DURATION = 1.1; // Smooth 1.1s cubic glide to robot

  const transitionStartCamPos = new THREE.Vector3();
  const transitionStartTarget = new THREE.Vector3();
  const transitionOffset = new THREE.Vector3();
  const prevFollowTarget = new THREE.Vector3();

  function setControls(ctrls) {
    _controls = ctrls;
  }

  const cardGroup = new THREE.Group();
  cardGroup.name = 'RobotTelemetryCard';
  cardGroup.visible = false;
  scene.add(cardGroup);

  // 1. 3D Holographic Card Canvas (1024x512)
  const cardCanvas = document.createElement('canvas');
  cardCanvas.width = 1024;
  cardCanvas.height = 512;
  const ctx = cardCanvas.getContext('2d');

  const cardTexture = new THREE.CanvasTexture(cardCanvas);
  cardTexture.minFilter = THREE.LinearFilter;
  cardTexture.magFilter = THREE.LinearFilter;

  const planeGeo = new THREE.PlaneGeometry(1.15, 0.58);
  const planeMat = new THREE.MeshBasicMaterial({
    map: cardTexture,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const cardMesh = new THREE.Mesh(planeGeo, planeMat);
  cardGroup.add(cardMesh);

  // 2. Dynamic Neon Connecting Leader Line
  const lineGeo = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0.5, 0.5, 0),
  ]);
  const lineMat = new THREE.LineBasicMaterial({
    color: 0x00e5ff,
    transparent: true,
    opacity: 0.85,
    linewidth: 2,
  });
  const leaderLine = new THREE.Line(lineGeo, lineMat);
  cardGroup.add(leaderLine);

  // 3. Ground Reticle Ring (Follows robot floor shadow)
  const reticleGeo = new THREE.RingGeometry(0.32, 0.38, 36);
  const reticleMat = new THREE.MeshBasicMaterial({
    color: 0x00e5ff,
    transparent: true,
    opacity: 0.9,
    side: THREE.DoubleSide,
  });
  const reticleMesh = new THREE.Mesh(reticleGeo, reticleMat);
  reticleMesh.rotation.x = -Math.PI / 2;
  cardGroup.add(reticleMesh);

  // 4. Desktop 2D HUD Scientific Drawer
  let hudContainer = document.getElementById('robot-telemetry-hud');
  if (!hudContainer) {
    hudContainer = document.createElement('div');
    hudContainer.id = 'robot-telemetry-hud';

    const hudStyle = document.createElement('style');
    hudStyle.textContent = `
      @media (max-width: 768px), (pointer: coarse) {
        #robot-telemetry-hud {
          display: none !important;
          pointer-events: none !important;
        }
      }
      body.vz-mobile-tablet #robot-telemetry-hud {
        display: none !important;
        pointer-events: none !important;
      }
    `;
    document.head.appendChild(hudStyle);

    hudContainer.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 440px;
      max-width: calc(100vw - 48px);
      max-height: 82vh;
      background: rgba(10, 14, 24, 0.94);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(0, 229, 255, 0.35);
      border-radius: 14px;
      box-shadow: 0 16px 48px rgba(0, 0, 0, 0.75), 0 0 24px rgba(0, 229, 255, 0.2);
      color: #f1f5f9;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      z-index: 9999;
      transform: translateY(120%);
      transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease;
      opacity: 0;
      pointer-events: auto;
      overflow-y: auto;
    `;
    const root = getViewportRoot();
    root.appendChild(hudContainer);
  }

  let currentTarget = null; // { robotGroup, dataKey }

  function render3DCard(data) {
    ctx.clearRect(0, 0, 1024, 512);

    // Completely solid deep obsidian glassmorphic background
    ctx.fillStyle = '#080c16';
    ctx.fillRect(0, 0, 1024, 512);

    // Accent border
    ctx.strokeStyle = data.accentColor;
    ctx.lineWidth = 3;
    ctx.strokeRect(4, 4, 1016, 504);

    // Top Header Banner
    ctx.fillStyle = data.accentColor;
    ctx.fillRect(0, 0, 1024, 56);

    ctx.font = '900 24px "Inter", "Segoe UI", sans-serif';
    ctx.fillStyle = '#0a0e1c';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(`★ ROBOT TELEMETRY // ${data.name}`, 24, 28);

    // Dismiss '✕' button
    ctx.font = 'bold 20px "Inter", sans-serif';
    ctx.fillStyle = '#0a0e1c';
    ctx.textAlign = 'right';
    ctx.fillText('✕', 1000, 28);

    // Subtitle Designation
    ctx.font = 'bold 16px "Inter", monospace';
    ctx.fillStyle = data.accentColor;
    ctx.fillText(data.designation, 24, 82);

    // Stats Grid (2 columns × 4 rows = 8 key specifications)
    const col1X = 24;
    const col2X = 530;
    let y = 118;

    data.stats.slice(0, 8).forEach((st, idx) => {
      const isLeft = idx % 2 === 0;
      const x = isLeft ? col1X : col2X;
      if (!isLeft && idx > 0) y += 52;

      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.fillRect(x, y - 18, 470, 44);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y - 18, 470, 44);

      ctx.font = 'bold 12px "Inter", monospace';
      ctx.fillStyle = '#94a3b8';
      ctx.textAlign = 'left';
      ctx.fillText(st.label, x + 12, y - 2);

      ctx.font = 'bold 15px "Inter", sans-serif';
      ctx.fillStyle = '#f8fafc';
      ctx.fillText(st.value, x + 12, y + 16);
    });

    // Summary Box at bottom
    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.fillRect(24, 342, 976, 146);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.strokeRect(24, 342, 976, 146);

    ctx.font = 'bold 13px "Inter", monospace';
    ctx.fillStyle = data.accentColor;
    ctx.fillText('MISSION OVERVIEW & ROBOTIC ANALYSIS', 38, 362);

    ctx.font = '14px "Inter", sans-serif';
    ctx.fillStyle = '#cbd5e1';
    wrapText(ctx, data.summary, 38, 386, 948, 20);

    cardTexture.needsUpdate = true;
  }

  function render2DHUD(data) {
    hudContainer.innerHTML = `
      <div style="padding: 20px; border-bottom: 1px solid rgba(255,255,255,0.12); display: flex; justify-content: space-between; align-items: center; background: rgba(15, 23, 42, 0.6);">
        <div>
          <div style="font-size: 11px; letter-spacing: 1.5px; color: ${data.accentColor}; font-weight: 800; font-family: monospace;">AUTONOMOUS FLEET // ROBOT TELEMETRY</div>
          <div style="font-size: 22px; font-weight: 900; letter-spacing: 0.5px; color: #fff; margin-top: 2px;">${data.name}</div>
        </div>
        <button id="close-robot-hud" style="background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); color: #fff; width: 34px; height: 34px; border-radius: 8px; font-size: 18px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.2s;">✕</button>
      </div>

      <div style="padding: 18px 20px;">
        <div style="font-size: 13px; color: ${data.accentColor}; font-weight: 700; margin-bottom: 14px; font-family: monospace; letter-spacing: 0.5px;">${data.designation}</div>

        <div style="display: grid; grid-template-columns: 1fr; gap: 10px; margin-bottom: 18px;">
          ${data.stats
            .map(
              (s) => `
            <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 10px 14px;">
              <div style="font-size: 11px; color: #94a3b8; font-family: monospace; font-weight: 700; letter-spacing: 0.5px;">${s.label}</div>
              <div style="font-size: 14px; color: #f8fafc; font-weight: 600; margin-top: 2px;">${s.value}</div>
            </div>
          `
            )
            .join('')}
        </div>

        <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 14px;">
          <div style="font-size: 11px; color: ${data.accentColor}; font-family: monospace; font-weight: 800; letter-spacing: 1px; margin-bottom: 6px;">ROBOTIC MISSION PROFILE</div>
          <div style="font-size: 13px; color: #cbd5e1; line-height: 1.6;">${data.summary}</div>
        </div>
      </div>
    `;

    const closeBtn = hudContainer.querySelector('#close-robot-hud');
    if (closeBtn) {
      closeBtn.onclick = () => deselect();
    }

    hudContainer.style.transform = 'translateY(0)';
    hudContainer.style.opacity = '1';
  }

  function wrapText(context, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = context.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        context.fillText(line, x, y);
        line = words[n] + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    context.fillText(line, x, y);
  }

  function selectRobot(robotGroup, dataKey) {
    const data = ROBOT_DATA[dataKey];
    if (!data) return;

    // Deselect other telemetry systems to maintain clean uncluttered UI
    if (typeof window !== 'undefined' && window.__sim) {
      window.__sim.scientistTelemetry?.deselect();
      window.__sim.rocketTelemetry?.deselect();
      window.__sim.astroCtx?.telemetry?.deselect();
    }

    currentTarget = { group: robotGroup, dataKey };

    const accentHex = parseInt(data.accentColor.replace('#', '0x'), 16);
    lineMat.color.setHex(accentHex);
    reticleMat.color.setHex(accentHex);

    render3DCard(data);
    cardGroup.visible = true;

    if (!isMobileOrTablet()) {
      render2DHUD(data);
    }

    // ── Initiate Camera Tracking & Following ──
    const activeControls = _controls || (typeof window !== 'undefined' ? window.__sim?.controls : null);
    if (camera && activeControls) {
      _controls = activeControls;
      if (_controls.enablePan !== undefined) {
        savedEnablePan = _controls.enablePan;
        _controls.enablePan = false;
      }
      const worldPos = new THREE.Vector3();
      robotGroup.getWorldPosition(worldPos);
      const robotHeight = dataKey === 'Pragyan' ? 0.45 : 0.75;
      const targetLookAt = new THREE.Vector3(worldPos.x, worldPos.y + robotHeight, worldPos.z);

      // Approach vector from camera to robot on horizontal plane
      const camApproach = camera.position.clone().sub(targetLookAt);
      camApproach.y = 0;
      if (camApproach.lengthSq() < 0.04) {
        camApproach.set(0, 0, 1);
      } else {
        camApproach.normalize();
      }

      // Stand ~2.8m from R2-D2 / ~2.5m from Pragyan Rover, elevated to eye-level
      const followDist = dataKey === 'Pragyan' ? 2.5 : 2.8;
      const followElevation = dataKey === 'Pragyan' ? 1.35 : 1.65;

      transitionOffset.copy(camApproach).multiplyScalar(followDist);
      transitionOffset.y = followElevation - targetLookAt.y;

      transitionStartCamPos.copy(camera.position);
      transitionStartTarget.copy(_controls.target);
      prevFollowTarget.copy(targetLookAt);

      transitionElapsed = 0;
      isTransitioningToRobot = true;
      isTrackingCamera = true;
      _controls.autoRotate = false;
    }
  }

  function deselect() {
    if (_controls && savedEnablePan !== undefined) {
      _controls.enablePan = savedEnablePan;
    }
    currentTarget = null;
    isTrackingCamera = false;
    isTransitioningToRobot = false;
    cardGroup.visible = false;
    hudContainer.style.transform = 'translateY(120%)';
    hudContainer.style.opacity = '0';
  }

  /**
   * Updates card position, leader line, reticle, and actively follows/tracks
   * the robot with the camera across the atrium floor.
   */
  function update(dt = 0.016) {
    if (!cardGroup.visible || !currentTarget || !currentTarget.group) return;

    // 1. Get real-time world position of the moving robot
    const worldPos = new THREE.Vector3();
    currentTarget.group.getWorldPosition(worldPos);

    // 2. Position 3D card comfortably above and to the side relative to camera view
    const robotTopY = currentTarget.dataKey === 'Pragyan' ? 0.48 : 0.88;
    const cardY = worldPos.y + robotTopY + 0.52;

    const cardPos = worldPos.clone();
    if (camera) {
      const camRight = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion);
      cardPos.add(camRight.multiplyScalar(0.48));
    } else {
      cardPos.x += 0.48;
    }
    cardPos.y = cardY;
    cardMesh.position.copy(cardPos);

    // 3. Billboard: Card always turns to face camera
    if (camera) {
      cardMesh.quaternion.copy(camera.quaternion);
    }

    // 4. Update dynamic leader line connecting robot to floating card
    const positions = lineGeo.attributes.position.array;
    positions[0] = worldPos.x;
    positions[1] = worldPos.y + robotTopY; // Top of robot
    positions[2] = worldPos.z;
    positions[3] = cardPos.x;
    positions[4] = cardPos.y - 0.28;
    positions[5] = cardPos.z;
    lineGeo.attributes.position.needsUpdate = true;

    // 5. Ground reticle ring follows robot shadow on the floor
    reticleMesh.position.set(worldPos.x, 0.02, worldPos.z);
    reticleMesh.rotation.z += dt * 1.5;

    // 6. Real-Time Camera Tracking & Following
    const activeControls = _controls || (typeof window !== 'undefined' ? window.__sim?.controls : null);
    if (isTrackingCamera && camera && activeControls) {
      _controls = activeControls;

      // If station or spawn camera transition is active, disengage robot tracking
      if (typeof window !== 'undefined' && window.__sim?.cameraAnim?.isTransitioning) {
        deselect();
        return;
      }

      const robotHeight = currentTarget.dataKey === 'Pragyan' ? 0.45 : 0.75;
      const targetLookAt = new THREE.Vector3(worldPos.x, worldPos.y + robotHeight, worldPos.z);

      if (isTransitioningToRobot) {
        transitionElapsed += dt;
        const p = Math.min(1.0, transitionElapsed / TRANSITION_DURATION);
        // Smooth cubic in-out easing
        const ease = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;

        const currentDesiredCamPos = targetLookAt.clone().add(transitionOffset);

        camera.position.lerpVectors(transitionStartCamPos, currentDesiredCamPos, ease);
        _controls.target.lerpVectors(transitionStartTarget, targetLookAt, ease);
        _controls.update();
        enforceRoomBoundaries(camera, _controls);

        if (p >= 1.0) {
          isTransitioningToRobot = false;
          prevFollowTarget.copy(targetLookAt);
        }
      } else {
        // Continuous smooth tracking: follow robot movement delta
        const delta = targetLookAt.clone().sub(_controls.target);

        // Smooth follow factor
        const followFactor = Math.min(1.0, dt * 10.0);
        const stepDelta = delta.multiplyScalar(followFactor);

        _controls.target.add(stepDelta);
        camera.position.add(stepDelta);
        _controls.update();
        enforceRoomBoundaries(camera, _controls);
      }
    }
  }

  return {
    selectRobot,
    deselect,
    update,
    cardGroup,
    setControls,
    get isTrackingCamera() {
      return isTrackingCamera;
    },
    getCurrentTarget: () => currentTarget,
  };
}
