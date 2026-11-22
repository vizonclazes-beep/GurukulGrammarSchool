// src/ui/controls.js — OrbitControls configuration & GSAP camera transitions
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import gsap from 'gsap';
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
  controls.minDistance = 3;
  controls.maxDistance = 35;
  controls.maxPolarAngle = Math.PI * 0.48; // prevent going below floor

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
 *
 * @param {THREE.PerspectiveCamera} camera
 * @param {OrbitControls}           controls
 * @returns {{ transitionTo: (key: string) => void, transitionToSpawn: () => void }}
 */
export function animateCamera(camera, controls) {
  let activeTween = null;
  let activeStation = null;

  // Listeners that should be notified when station changes
  const listeners = [];

  /**
   * Internal transition helper.
   * Animates camera.position → targetPos, controls.target → lookAt
   * over 2 s with power2.inOut easing.
   */
  function _transition(targetPos, lookAt, stationKey) {
    if (activeTween) {
      activeTween.kill();
      activeTween = null;
    }

    // Disable damping during tween so GSAP has full precision
    controls.enableDamping = false;
    controls.autoRotate = false;

    const tl = gsap.timeline({
      defaults: { duration: 1.4, ease: 'power2.inOut' },
      onComplete: () => {
        camera.position.copy(targetPos);
        controls.target.copy(lookAt);
        controls.enableDamping = true;
        controls.update();
        activeTween = null;
        activeStation = stationKey;
        for (const fn of listeners) fn(stationKey);
      },
    });

    tl.to(camera.position, {
      x: targetPos.x,
      y: targetPos.y,
      z: targetPos.z,
    }, 0);

    tl.to(controls.target, {
      x: lookAt.x,
      y: lookAt.y,
      z: lookAt.z,
    }, 0);

    activeTween = tl;
  }

  /**
   * Smoothly fly camera to the given station.
   * @param {string} stationKey — one of 'physics','chemistry','biology','mathematics','astronomy'
   * @param {boolean} [instant=false] — snap immediately without tween (useful for VR/screenshots)
   */
  function transitionTo(stationKey, instant = false) {
    const { cameraPos, lookTarget } = computeStationView(stationKey);
    if (instant) {
      if (activeTween) {
        activeTween.kill();
        activeTween = null;
      }
      camera.position.copy(cameraPos);
      controls.target.copy(lookTarget);
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
      if (activeTween) {
        activeTween.kill();
        activeTween = null;
      }
      camera.position.copy(SPAWN_POSITION);
      controls.target.copy(SPAWN_TARGET);
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
    /** Register a callback fired when a transition completes. fn(stationKey|null) */
    onStationChange(fn) {
      listeners.push(fn);
    },
    /** Currently active station key (null = spawn) */
    get activeStation() {
      return activeStation;
    },
  };
}
