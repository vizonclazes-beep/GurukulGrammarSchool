// src/ui/controls.js — OrbitControls configuration & camera transitions
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {
  SPAWN_POSITION,
  SPAWN_TARGET,
  STATION_ANGLES,
  STATION_RADIUS,
  FLOOR_Y,
  stationPosition,
} from '../core/constants.js';

// ─── Auto-rotate idle timer ───
const IDLE_TIMEOUT = 10; // seconds before auto-rotate kicks in

/**
 * Sets up OrbitControls with damping, constraints, touch, and idle auto-rotate.
 * @param {THREE.PerspectiveCamera} camera
 * @param {THREE.WebGLRenderer}    renderer
 * @returns {OrbitControls}
 */
export function setupControls(camera, renderer) {
  const controls = new OrbitControls(camera, renderer.domElement);

  // ── Damping ──
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;

  // ── Constraints ──
  controls.minDistance = 0.5;
  controls.maxDistance = 14.5;
  controls.maxPolarAngle = Math.PI * 0.465; // prevent going below floor
  controls.minPolarAngle = 0.08; // prevent flipping through ceiling

  // ── Initial target ──
  controls.target.copy(SPAWN_TARGET);
  controls.update();

  // ── Touch ──
  controls.touches = {
    ONE: THREE.TOUCH.ROTATE,
    TWO: THREE.TOUCH.DOLLY_PAN,
  };
  controls.enablePan = true;

  // ── Auto-rotate on idle ──
  controls.autoRotate = false;
  controls.autoRotateSpeed = 0.3;

  let idleTimer = null;

  const resetIdleTimer = () => {
    controls.autoRotate = false;
    if (idleTimer !== null) clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      controls.autoRotate = true;
    }, IDLE_TIMEOUT * 1000);
  };

  // Listen to user interaction events on the canvas
  const domEl = renderer.domElement;
  const interactionEvents = [
    'pointerdown', 'pointermove', 'pointerup',
    'wheel', 'touchstart', 'touchmove',
  ];
  for (const evt of interactionEvents) {
    domEl.addEventListener(evt, resetIdleTimer, { passive: true });
  }

  // Start the initial idle timer
  resetIdleTimer();

  return controls;
}

/**
 * Computes a camera position and look-at target for a given station key.
 * Camera sits behind and above the station (offset +Y3, pulled back 5 units
 * from center along the radial direction), looking at the station + Y2.
 */
function computeStationView(stationKey) {
  const pos = stationPosition(stationKey);
  const angle = STATION_ANGLES[stationKey];

  // Direction from center toward station (unit vector on XZ)
  const dirX = Math.cos(angle);
  const dirZ = Math.sin(angle);

  // Position camera in front of station looking toward it
  const isAstro = stationKey === 'astronomy';
  const cameraPos = new THREE.Vector3(
    pos.x - dirX * (isAstro ? 4.6 : 5.2),
    pos.y + (isAstro ? 2.1 : 2.5),
    pos.z - dirZ * (isAstro ? 4.6 : 5.2)
  );

  // Look-at target: station apparatus center (lowered for astronomy tabletop orrery)
  const lookTarget = new THREE.Vector3(
    pos.x,
    pos.y + (isAstro ? 1.50 : 2.2),
    pos.z
  );

  return { cameraPos, lookTarget };
}

/**
 * Returns an animation controller with:
 *   - transitionTo(stationKey) — animate camera to a station
 *   - transitionToSpawn()      — animate camera back to spawn
 *   - update(dt)               — per-frame camera flight step
 *
 * @param {THREE.PerspectiveCamera} camera
 * @param {OrbitControls}           controls
 */
export function animateCamera(camera, controls) {
  let activeTransition = null;
  let activeStation = null;

  // Listeners that should be notified when station changes
  const listeners = [];

  function _easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  /**
   * Internal transition helper.
   * Animates camera.position → targetPos, controls.target → lookAt
   * over duration seconds with smooth cubic in-out easing.
   */
  function _transition(targetPos, lookAt, stationKey, duration = 1.4) {
    // Disable controls during transition so OrbitControls does not fight camera motion
    controls.enabled = false;
    controls.enableDamping = false;
    controls.autoRotate = false;

    activeTransition = {
      startPos: camera.position.clone(),
      targetPos: targetPos.clone(),
      startTarget: controls.target.clone(),
      lookAt: lookAt.clone(),
      stationKey,
      elapsed: 0,
      duration,
    };
  }

  /**
   * Per-frame update method called from renderer animation loop.
   * @param {number} dt — frame delta in seconds
   */
  function update(dt) {
    if (!activeTransition) return;

    activeTransition.elapsed += dt;
    const progress = Math.min(activeTransition.elapsed / activeTransition.duration, 1.0);
    const ease = _easeInOutCubic(progress);

    camera.position.lerpVectors(activeTransition.startPos, activeTransition.targetPos, ease);
    controls.target.lerpVectors(activeTransition.startTarget, activeTransition.lookAt, ease);
    camera.lookAt(controls.target);

    if (progress >= 1.0) {
      const { targetPos, lookAt, stationKey } = activeTransition;
      camera.position.copy(targetPos);
      controls.target.copy(lookAt);
      controls.enabled = true;
      controls.enableDamping = true;
      controls.update();

      activeTransition = null;
      activeStation = stationKey;
      for (const fn of listeners) fn(stationKey);
    }
  }

  /**
   * Smoothly fly camera to the given station.
   * @param {string} stationKey — one of 'physics','chemistry','biology','mathematics','astronomy'
   * @param {boolean} [instant=false] — snap immediately without tween (useful for VR/screenshots)
   */
  function transitionTo(stationKey, instant = false) {
    const { cameraPos, lookTarget } = computeStationView(stationKey);
    if (instant) {
      activeTransition = null;
      camera.position.copy(cameraPos);
      controls.target.copy(lookTarget);
      controls.enabled = true;
      controls.enableDamping = true;
      controls.update();
      activeStation = stationKey;
      for (const fn of listeners) fn(stationKey);
      return;
    }
    _transition(cameraPos, lookTarget, stationKey);
  }

  /**
   * Smoothly return camera to the spawn overview.
   * @param {boolean} [instant=false]
   */
  function transitionToSpawn(instant = false) {
    if (instant) {
      activeTransition = null;
      camera.position.copy(SPAWN_POSITION);
      controls.target.copy(SPAWN_TARGET);
      controls.enabled = true;
      controls.enableDamping = true;
      controls.update();
      activeStation = null;
      for (const fn of listeners) fn(null);
      return;
    }
    _transition(
      SPAWN_POSITION.clone(),
      SPAWN_TARGET.clone(),
      null,
    );
  }

  return {
    transitionTo,
    transitionToSpawn,
    update,
    /** Register a callback fired when a transition completes. fn(stationKey|null) */
    onStationChange(fn) {
      listeners.push(fn);
    },
    /** Whether a camera transition is currently in progress */
    get isTransitioning() {
      return activeTransition !== null;
    },
    /** Currently active station key (null = spawn) */
    get activeStation() {
      return activeStation;
    },
  };
}

/**
 * Strict physical boundary clamping: clamps camera and controls target
 * strictly within the atrium cylinder [radius <= 16.2, floor >= 0.6, ceiling <= 11.2].
 * User can NEVER escape the walls, floor, or ceiling on mobile or desktop.
 * @param {THREE.PerspectiveCamera} camera
 * @param {OrbitControls} controls
 */
export function enforceRoomBoundaries(camera, controls) {
  const MAX_RADIUS = 16.2; // Atrium wall radius is 18; keeps camera safely inside perimeter walls and exhibits
  const MIN_Y = 0.6;       // Floor eye-height barrier (floor is at Y = 0)
  const MAX_Y = 11.2;      // Ceiling dome barrier (apex is at Y = 12)

  // 1. Clamp camera horizontal radial distance from atrium center
  const camR = Math.hypot(camera.position.x, camera.position.z);
  if (camR > MAX_RADIUS) {
    const scale = MAX_RADIUS / camR;
    camera.position.x *= scale;
    camera.position.z *= scale;
  }

  // 2. Clamp camera vertical height between floor and ceiling
  camera.position.y = Math.max(MIN_Y, Math.min(MAX_Y, camera.position.y));

  // 3. Clamp controls look target inside atrium so camera never flips to outside
  if (controls && controls.target) {
    const TARGET_MAX_R = 15.0;
    const tr = Math.hypot(controls.target.x, controls.target.z);
    if (tr > TARGET_MAX_R) {
      const tScale = TARGET_MAX_R / tr;
      controls.target.x *= tScale;
      controls.target.z *= tScale;
    }
    controls.target.y = Math.max(0.3, Math.min(9.5, controls.target.y));
  }
}
