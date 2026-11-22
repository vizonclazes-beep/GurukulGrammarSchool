// src/ui/deviceOrientation.js — Mobile & Tablet Gyroscope / DeviceOrientation Controls
import * as THREE from 'three';

// Coordinate transform constants
const zee = new THREE.Vector3(0, 0, 1);
const up = new THREE.Vector3(0, 1, 0);
const euler = new THREE.Euler();
const q0 = new THREE.Quaternion();
const q1 = new THREE.Quaternion(-Math.sqrt(0.5), 0, 0, Math.sqrt(0.5)); // -PI/2 around X axis
const qYaw = new THREE.Quaternion();

/**
 * Checks if the current browser environment is on a mobile phone or tablet device.
 * @returns {boolean}
 */
export function isMobileOrTablet() {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent || '';
  const touch = typeof navigator.maxTouchPoints === 'number' && navigator.maxTouchPoints > 1;
  const isSmall = typeof window !== 'undefined' && window.innerWidth <= 900;
  return /Android|iPhone|iPad|iPod|Windows Phone|Mobile|Tablet/i.test(ua) || (touch && isSmall);
}

/**
 * Gets current screen orientation angle in degrees (0, 90, 180, 270).
 * @returns {number}
 */
export function getScreenOrientation() {
  if (typeof window === 'undefined') return 0;
  if (window.screen && window.screen.orientation && typeof window.screen.orientation.angle === 'number') {
    return window.screen.orientation.angle;
  }
  if (typeof window.orientation === 'number') {
    return window.orientation;
  }
  return 0;
}

/**
 * DeviceOrientationManager manages mobile gyroscope sensors, single-event stream binding,
 * smooth shortest-arc quaternion slerp, stationary vantage point locking, and touch-drag yaw panning.
 */
export class DeviceOrientationManager {
  /**
   * @param {THREE.PerspectiveCamera} camera
   * @param {import('three/addons/controls/OrbitControls.js').OrbitControls} controls
   */
  constructor(camera, controls) {
    this.camera = camera;
    this.controls = controls;

    this.enabled = false;
    this.hasSensorData = false;
    this.permissionGranted = false;

    // Filtered continuous sensor angles
    this.rawAlpha = null;
    this.rawBeta = 90;
    this.rawGamma = 0;
    this.screenOrientation = 0;

    this.yawOffset = 0;
    this.initialHeadingCalibrated = false;

    this.targetQuat = new THREE.Quaternion();
    this.currentQuat = new THREE.Quaternion();

    this._activeEventListener = null;

    // Bound event handlers
    this._onDeviceOrientation = this._onDeviceOrientation.bind(this);
    this._onScreenOrientationChange = this._onScreenOrientationChange.bind(this);

    // Auto-setup listeners
    this._initListeners();
    this._injectStyles();
    this._createUI();

    // Auto-detect mobile and try auto-enabling on initial touch gesture
    if (isMobileOrTablet()) {
      const autoEnableHandler = async () => {
        window.removeEventListener('touchstart', autoEnableHandler);
        window.removeEventListener('touchend', autoEnableHandler);
        if (!this.enabled) {
          await this.enable();
        }
      };
      window.addEventListener('touchend', autoEnableHandler, { passive: true, once: true });
    }
  }

  _initListeners() {
    window.addEventListener('orientationchange', this._onScreenOrientationChange, false);
    if (window.screen && window.screen.orientation) {
      window.screen.orientation.addEventListener('change', this._onScreenOrientationChange, false);
    }
    this._onScreenOrientationChange();

    // Touch swipe horizontal yaw offset (allows user to swipe to turn while gyro is active)
    let touchStartX = 0;
    let isSwiping = false;

    window.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        isSwiping = true;
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (isSwiping && this.enabled && e.touches && e.touches.length === 1) {
        const dx = e.touches[0].clientX - touchStartX;
        touchStartX = e.touches[0].clientX;
        // Sensitivity factor in radians per pixel
        this.yawOffset -= dx * 0.0035;
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isSwiping = false;
    }, { passive: true });
  }

  _onScreenOrientationChange() {
    this.screenOrientation = getScreenOrientation();
  }

  _onDeviceOrientation(event) {
    if (typeof event.alpha !== 'number') return;

    const inAlpha = event.alpha;
    const inBeta = event.beta ?? 90;
    const inGamma = event.gamma ?? 0;

    // Calibrate initial heading on first valid sensor reading so user starts seamlessly facing current view
    if (!this.initialHeadingCalibrated || this.rawAlpha === null) {
      this.initialHeadingCalibrated = true;
      this.rawAlpha = inAlpha;
      this.rawBeta = inBeta;
      this.rawGamma = inGamma;

      // Calculate existing camera forward heading
      const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(this.camera.quaternion);
      const currentCameraYaw = Math.atan2(-forward.x, -forward.z);
      const deviceAlphaRad = THREE.MathUtils.degToRad(inAlpha);
      this.yawOffset = currentCameraYaw - (Math.PI - deviceAlphaRad);
      this.currentQuat.copy(this.camera.quaternion);
      this.hasSensorData = true;

      if (this._uiBtn && !this._uiBtn.classList.contains('active')) {
        this._updateUIState(true);
      }
      return;
    }

    // Shortest-distance circular smoothing on alpha (0..360) to eliminate boundary jitter
    let dAlpha = (inAlpha - this.rawAlpha + 540) % 360 - 180;
    this.rawAlpha = (this.rawAlpha + dAlpha * 0.40) % 360;
    if (this.rawAlpha < 0) this.rawAlpha += 360;

    // Exponential smoothing on pitch and roll
    this.rawBeta += (inBeta - this.rawBeta) * 0.40;
    this.rawGamma += (inGamma - this.rawGamma) * 0.40;

    this.hasSensorData = true;

    if (this._uiBtn && !this._uiBtn.classList.contains('active')) {
      this._updateUIState(true);
    }
  }

  /**
   * Request motion permission (specifically for iOS 13+ Safari/WebKit)
   * @returns {Promise<boolean>}
   */
  async requestPermission() {
    if (
      typeof DeviceOrientationEvent !== 'undefined' &&
      typeof DeviceOrientationEvent.requestPermission === 'function'
    ) {
      try {
        const response = await DeviceOrientationEvent.requestPermission();
        this.permissionGranted = response === 'granted';
        return this.permissionGranted;
      } catch (err) {
        console.warn('DeviceOrientationEvent.requestPermission failed:', err);
        return false;
      }
    }
    // Android and standard browsers without explicit permission API
    this.permissionGranted = true;
    return true;
  }

  /**
   * Enables the gyroscope controls.
   */
  async enable() {
    const granted = await this.requestPermission();
    if (!granted) {
      console.warn('Gyroscope permission not granted.');
      return false;
    }

    this.enabled = true;
    this.initialHeadingCalibrated = false; // Recalibrate smoothly to current view

    // Completely disable OrbitControls while gyro is active so it never conflicts with orientation or jumps camera position
    if (this.controls) {
      this.controls.enabled = false;
      this.controls.autoRotate = false;
    }

    // Unbind any previous listener first to ensure only a single stream is ever active
    if (this._activeEventListener) {
      window.removeEventListener(this._activeEventListener, this._onDeviceOrientation, false);
      this._activeEventListener = null;
    }

    // Select ONE single event stream: if deviceorientationabsolute exists and works, use it; otherwise standard deviceorientation
    // NEVER bind both at the same time to avoid alternating 180-degree flip oscillations between relative and absolute north!
    const useAbsolute = ('ondeviceorientationabsolute' in window);
    this._activeEventListener = useAbsolute ? 'deviceorientationabsolute' : 'deviceorientation';
    window.addEventListener(this._activeEventListener, this._onDeviceOrientation, false);

    this._updateUIState(true);
    return true;
  }

  /**
   * Disables gyroscope controls, returning 100% control to OrbitControls.
   */
  disable() {
    this.enabled = false;
    this.hasSensorData = false;

    if (this._activeEventListener) {
      window.removeEventListener(this._activeEventListener, this._onDeviceOrientation, false);
      this._activeEventListener = null;
    }

    // Smoothly restore OrbitControls facing the direction the user was looking
    if (this.controls) {
      const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(this.camera.quaternion);
      this.controls.target.copy(this.camera.position).addScaledVector(forward, 5.0);
      this.controls.enabled = true;
      this.controls.update();
    }

    this._updateUIState(false);
  }

  /**
   * Toggles gyroscope controls on/off.
   */
  async toggle() {
    if (this.enabled) {
      this.disable();
    } else {
      await this.enable();
    }
  }

  /**
   * Per-frame update called in the render loop.
   * Smoothly interpolates the camera rotation based on device orientation.
   * Keeps camera position strictly stationary at current vantage point.
   * @param {number} dt Delta time in seconds
   */
  update(dt = 0.016) {
    if (!this.enabled || !this.hasSensorData || this.rawAlpha === null) return;

    const alphaRad = THREE.MathUtils.degToRad(this.rawAlpha);
    const betaRad = THREE.MathUtils.degToRad(this.rawBeta);
    const gammaRad = THREE.MathUtils.degToRad(this.rawGamma);
    const orientRad = THREE.MathUtils.degToRad(this.screenOrientation);

    // Standard camera rotation transform
    euler.set(betaRad, alphaRad, -gammaRad, 'YXZ');
    this.targetQuat.setFromEuler(euler);
    this.targetQuat.multiply(q1); // Camera looks out back of phone
    this.targetQuat.multiply(q0.setFromAxisAngle(zee, -orientRad)); // Screen orientation

    // Apply horizontal yaw offset from initial calibration & touch swipe panning
    if (this.yawOffset !== 0) {
      qYaw.setFromAxisAngle(up, this.yawOffset);
      this.targetQuat.premultiply(qYaw);
    }

    // Ensure shortest-arc on quaternion slerp (prevents 180-degree sign flip spin)
    if (this.camera.quaternion.dot(this.targetQuat) < 0) {
      this.targetQuat.x = -this.targetQuat.x;
      this.targetQuat.y = -this.targetQuat.y;
      this.targetQuat.z = -this.targetQuat.z;
      this.targetQuat.w = -this.targetQuat.w;
    }

    // Smooth slerp to eliminate sensor jitter
    const slerpFactor = Math.min(1.0, dt * 18.0);
    this.camera.quaternion.slerp(this.targetQuat, slerpFactor);

    // Notice: camera.position is NEVER modified by gyro, preventing forward/backward jumping!
  }

  _injectStyles() {
    if (document.getElementById('vz-gyro-styles')) return;
    const style = document.createElement('style');
    style.id = 'vz-gyro-styles';
    style.textContent = /* css */ `
      #vz-gyro-toggle {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1002;
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 9px 16px;
        border: 1px solid rgba(0, 229, 255, 0.35);
        border-radius: 12px;
        background: rgba(10, 14, 26, 0.72);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        color: #e0e8ff;
        font-family: 'Inter', system-ui, -apple-system, sans-serif;
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        cursor: pointer;
        pointer-events: auto;
        transition: all 0.25s ease;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
        user-select: none;
        -webkit-user-select: none;
      }

      #vz-gyro-toggle:hover {
        background: rgba(0, 229, 255, 0.15);
        border-color: #00e5ff;
        box-shadow: 0 0 16px rgba(0, 229, 255, 0.4);
      }

      #vz-gyro-toggle.active {
        background: rgba(0, 229, 255, 0.18);
        border-color: #00e5ff;
        color: #00f5ff;
        box-shadow: 0 0 20px rgba(0, 229, 255, 0.5);
      }

      #vz-gyro-toggle .vz-gyro-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #64748b;
        transition: all 0.25s ease;
      }

      #vz-gyro-toggle.active .vz-gyro-dot {
        background: #00f5ff;
        box-shadow: 0 0 8px #00f5ff;
        animation: vz-pulse-dot 1.8s infinite ease-in-out;
      }

      @keyframes vz-pulse-dot {
        0%, 100% { transform: scale(1); opacity: 0.8; }
        50% { transform: scale(1.35); opacity: 1; }
      }

      @media (max-width: 600px) {
        #vz-gyro-toggle {
          top: 14px;
          right: 14px;
          padding: 8px 12px;
          font-size: 11px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  _createUI() {
    const btn = document.createElement('button');
    btn.id = 'vz-gyro-toggle';
    btn.innerHTML = `
      <span class="vz-gyro-dot"></span>
      <span class="vz-gyro-icon">🧭</span>
      <span class="vz-gyro-text">GYRO 360°</span>
    `;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggle();
    });

    document.body.appendChild(btn);
    this._uiBtn = btn;
  }

  _updateUIState(active) {
    if (!this._uiBtn) return;
    if (active) {
      this._uiBtn.classList.add('active');
      const text = this._uiBtn.querySelector('.vz-gyro-text');
      if (text) text.textContent = 'GYRO ACTIVE';
    } else {
      this._uiBtn.classList.remove('active');
      const text = this._uiBtn.querySelector('.vz-gyro-text');
      if (text) text.textContent = 'GYRO 360°';
    }
  }
}

/**
 * Initializes mobile gyroscope / device orientation tracking.
 * @param {THREE.PerspectiveCamera} camera
 * @param {import('three/addons/controls/OrbitControls.js').OrbitControls} controls
 * @returns {DeviceOrientationManager}
 */
export function initDeviceOrientation(camera, controls) {
  return new DeviceOrientationManager(camera, controls);
}
