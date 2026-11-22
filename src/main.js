// src/main.js — Application bootstrap (wires agents' modules together)
import * as THREE from 'three';
import { createRenderer, createCamera, createComposer, handleResize } from './core/renderer.js';
import { buildAtrium } from './environment/atrium.js';
import { setupLighting } from './environment/lighting.js';
import { setupControls, animateCamera, enforceRoomBoundaries } from './ui/controls.js';
import { initDeviceOrientation } from './ui/deviceOrientation.js';
import { buildHUD } from './ui/hud.js';
import { setupWebXR } from './ui/webxr.js';
import { initAudioWidget } from './ui/audioWidget.js';
import { ambientAudio } from './audio/ambientAudio.js';

// Stations
import { buildPhysicsStation } from './stations/physics.js';
import { buildChemistryStation } from './stations/chemistry.js';
import { buildBiologyStation } from './stations/biology.js';
import { buildMathStation } from './stations/math.js';
import { buildAstronomyRoboticsHub } from './stations/astronomyRobotics.js';
import { buildMobileRobots } from './environment/mobileRobots.js';
import { createRocketTelemetry } from './environment/rocketTelemetry.js';
import { buildRocketExhibits } from './environment/rocketModels.js';
import { createScientistTelemetry } from './environment/scientistTelemetry.js';

// Shader tick registries
import { registerShaderTick } from './shaders/shaderRegistry.js';

// ─── Loading manager ───
const loadingScreen = document.getElementById('loading-screen');
const loaderFill = document.getElementById('loader-fill');
const loadingPct = document.getElementById('loading-pct');
let loadProgress = 0;
function setLoadProgress(pct, label) {
  loadProgress = pct;
  loaderFill.style.width = `${pct}%`;
  loadingPct.textContent = label || `${Math.round(pct)}%`;
}

async function init() {
  setLoadProgress(5, 'CREATING RENDERER…');

  // Core
  const container = document.getElementById('app');
  const renderer = createRenderer(container);
  const camera = createCamera();
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x060a14);

  setLoadProgress(10, 'COMPOSITING POST-PROCESSING…');
  const { composer, bloomPass } = createComposer(renderer, scene, camera);
  handleResize(renderer, camera, composer);

  // Global clock & uniforms
  const clock = new THREE.Clock();
  const globalUniforms = {
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    uPointer: { value: new THREE.Vector2(0, 0) },
    uPointerWorld: { value: new THREE.Vector3(0, 0, 0) },
  };

  // Track pointer
  window.addEventListener('pointermove', (e) => {
    globalUniforms.uPointer.value.set(
      (e.clientX / window.innerWidth) * 2 - 1,
      -(e.clientY / window.innerHeight) * 2 + 1
    );
  });

  // Raycaster for pointer world position
  const raycaster = new THREE.Raycaster();
  const pointerNDC = new THREE.Vector2();

  // ─── Build Scene ───
  setLoadProgress(15, 'BUILDING ATRIUM & SCIENTIST EXHIBITS…');
  const scientistTelemetry = createScientistTelemetry(scene, camera);
  const atriumGroup = buildAtrium(scene, globalUniforms, scientistTelemetry, camera);

  setLoadProgress(25, 'CONFIGURING LIGHTING…');
  setupLighting(scene);

  setLoadProgress(35, 'ASSEMBLING PHYSICS STATION…');
  const physicsCtx = buildPhysicsStation(scene, globalUniforms, camera);

  setLoadProgress(45, 'ASSEMBLING CHEMISTRY STATION…');
  const chemCtx = buildChemistryStation(scene, globalUniforms);

  setLoadProgress(55, 'ASSEMBLING BIOLOGY STATION…');
  const bioCtx = buildBiologyStation(scene, globalUniforms, camera);

  setLoadProgress(65, 'ASSEMBLING MATHEMATICS STATION…');
  const mathCtx = buildMathStation(scene, globalUniforms);

  setLoadProgress(75, 'ASSEMBLING ASTRONOMY OBSERVATION STATION…');
  const astroCtx = buildAstronomyRoboticsHub(scene, globalUniforms, camera);

  setLoadProgress(80, 'DEPLOYING AUTONOMOUS MOBILE ROBOTS (R2-D2 & PRAGYAN ROVER)…');
  const mobileRobots = buildMobileRobots(scene, camera);

  setLoadProgress(85, 'INITIALIZING CONTROLS…');
  const controls = setupControls(camera, renderer);
  const cameraAnim = animateCamera(camera, controls);
  const gyroManager = initDeviceOrientation(camera, controls);
  mobileRobots.setControls(controls);

  setLoadProgress(90, 'BUILDING HUD…');
  const hud = buildHUD({
    physics: physicsCtx,
    chemistry: chemCtx,
    biology: bioCtx,
    math: mathCtx,
    astroRobotics: astroCtx,
    cameraAnim,
  });

  setLoadProgress(93, 'DEPLOYING ROCKET FLEET (ISRO, NASA, SPACEX & SKYROOT)…');
  const rocketTelemetry = createRocketTelemetry(scene, camera);
  const rocketExhibits = buildRocketExhibits(scene, rocketTelemetry, camera);

  setLoadProgress(96, 'TUNING COSMIC AMBIENT SOUNDSCAPE…');
  const audioWidget = initAudioWidget();

  setLoadProgress(98, 'ENABLING WEBXR…');
  setupWebXR(renderer);

  setLoadProgress(100, 'LAUNCH');
  await new Promise(r => setTimeout(r, 400));
  loadingScreen.classList.add('fade-out');
  setTimeout(() => loadingScreen.remove(), 1000);

  // Expose for testing/debugging
  window.THREE = THREE;
  window.__sim = { renderer, composer, camera, controls, cameraAnim, scene, gyroManager, astroCtx, mobileRobots, rocketTelemetry, rocketExhibits, scientistTelemetry, wallExhibits: atriumGroup.userData.wallExhibits, ambientAudio, audioWidget };

  // ─── Render Loop ───
  const shaderTicks = registerShaderTick.getAll();

  renderer.setAnimationLoop((timestamp, frame) => {
    const dt = clock.getDelta();
    const elapsed = clock.getElapsedTime();
    globalUniforms.uTime.value = elapsed;

    // Raycaster for pointer
    raycaster.setFromCamera(globalUniforms.uPointer.value, camera);
    const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const pointerTarget = new THREE.Vector3();
    raycaster.ray.intersectPlane(groundPlane, pointerTarget);
    if (pointerTarget) globalUniforms.uPointerWorld.value.copy(pointerTarget);

    // Step camera animation during transitions
    cameraAnim.update?.(dt);

    // Update gyro orientation on mobile/tablet devices, or OrbitControls when not transitioning
    if (!cameraAnim.isTransitioning) {
      if (gyroManager.enabled && gyroManager.hasSensorData) {
        gyroManager.update(dt);
      } else {
        controls.update();
      }
    }

    // Strict boundary enforcement: prevents camera or target from exiting walls, floor, or ceiling
    enforceRoomBoundaries(camera, controls);

    // Tick all registered shader/vfx updaters
    for (const tick of shaderTicks) {
      tick(elapsed, dt, globalUniforms);
    }

    // Per-station, autonomous mobile robots & rocket exhibits updates
    physicsCtx.update?.(elapsed, dt, globalUniforms);
    chemCtx.update?.(elapsed, dt, globalUniforms);
    bioCtx.update?.(elapsed, dt, globalUniforms);
    mathCtx.update?.(elapsed, dt, globalUniforms);
    astroCtx.update?.(elapsed, dt, globalUniforms);
    mobileRobots.update?.(elapsed, dt, globalUniforms);
    rocketExhibits.update?.(elapsed, dt, globalUniforms);
    scientistTelemetry.update?.(elapsed, dt);

    // Render
    composer.render();
  });
}

init().catch(err => {
  console.error('VIZON init failed:', err);
  document.getElementById('loading-pct').textContent = `ERROR: ${err.message}`;
});
