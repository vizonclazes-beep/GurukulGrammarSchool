// src/audio/ambientAudio.js — Web Audio API & HTML5 Audio Dual-Engine Soundscape Manager for VIZON
// High-fidelity background audio with iOS/iPadOS Safari autoplay unlock, smooth fades, and real-time visualization.

const STORAGE_KEY_MUTED = 'vizon_ambient_muted';
const STORAGE_KEY_VOLUME = 'vizon_ambient_volume';
const DEFAULT_VOLUME = 0.35; // Ideal non-intrusive ambient level

export class AmbientAudioController {
  constructor() {
    this.audioCtx = null;
    this.masterGain = null;
    this.filterNode = null;
    this.analyser = null;
    this.analyserData = null;
    this.sourceNode = null;
    this.audioBuffer = null;

    // Dual-mode HTML5 Audio element for 100% reliable iOS/iPadOS playback
    this.audioEl = null;
    this.mediaElementSource = null;

    // State
    this.isLoaded = false;
    this.isPlaying = false;
    this.targetVolume = DEFAULT_VOLUME;
    this.isMuted = false;
    this.listeners = new Set();
    this.isUnlocked = false;

    // Load user preferences
    this._loadPreferences();

    // Setup global interaction handlers for browser autoplay compliance
    this._setupAutoplayUnlock();
  }

  _loadPreferences() {
    try {
      // Sound is ON by default for all modes (desktop, mobile, iPad, tablet)
      this.isMuted = false;
      try {
        localStorage.removeItem(STORAGE_KEY_MUTED);
      } catch (e) {}

      const storedVol = localStorage.getItem(STORAGE_KEY_VOLUME);
      if (storedVol !== null) {
        const v = parseFloat(storedVol);
        if (!isNaN(v) && v >= 0 && v <= 1) {
          this.targetVolume = v;
        }
      }
    } catch (e) {
      console.warn('[Audio] LocalStorage not available:', e);
    }
  }

  _savePreferences() {
    try {
      localStorage.setItem(STORAGE_KEY_MUTED, String(this.isMuted));
      localStorage.setItem(STORAGE_KEY_VOLUME, String(this.targetVolume));
    } catch (e) {
      // Ignore
    }
  }

  /**
   * Initializes Web Audio Context on first demand or gesture.
   */
  _ensureAudioContext() {
    if (this.audioCtx) return this.audioCtx;

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
      console.warn('[Audio] Web Audio API is not supported in this browser.');
      return null;
    }

    try {
      this.audioCtx = new AudioContextClass();

      // Master Low-pass warm filter (rolls off harsh frequencies above 11.5kHz)
      this.filterNode = this.audioCtx.createBiquadFilter();
      this.filterNode.type = 'lowpass';
      this.filterNode.frequency.setValueAtTime(11500, this.audioCtx.currentTime);
      this.filterNode.Q.setValueAtTime(0.7, this.audioCtx.currentTime);

      // Master Gain for smooth volume and mute envelopes
      this.masterGain = this.audioCtx.createGain();
      this.masterGain.gain.setValueAtTime(0, this.audioCtx.currentTime);

      // Analyser Node for visualizer wave bars on the HUD
      this.analyser = this.audioCtx.createAnalyser();
      this.analyser.fftSize = 64;
      this.analyser.smoothingTimeConstant = 0.82;
      this.analyserData = new Uint8Array(this.analyser.frequencyBinCount);

      // Audio Graph: Source -> Filter -> Analyser -> MasterGain -> Destination
      this.filterNode.connect(this.analyser);
      this.analyser.connect(this.masterGain);
      this.masterGain.connect(this.audioCtx.destination);
    } catch (err) {
      console.warn('[Audio] Web Audio context initialization notice:', err);
    }

    return this.audioCtx;
  }

  /**
   * Loads the ambient audio asset and configures both HTML5 Audio and Web Audio decoding.
   * @param {string} url Path to audio file
   */
  async loadTrack(url = '/audio/ambient_space.wav') {
    this._ensureAudioContext();

    // 1. Initialize HTML5 Audio element (instant playback on iOS Safari & tablets)
    if (typeof Audio !== 'undefined' && !this.audioEl) {
      try {
        const el = new Audio(url);
        el.loop = true;
        el.volume = this.targetVolume;
        el.preload = 'auto';
        el.crossOrigin = 'anonymous';
        this.audioEl = el;

        // Attempt routing through Web Audio analyser & filter
        if (this.audioCtx && !this.mediaElementSource) {
          try {
            this.mediaElementSource = this.audioCtx.createMediaElementSource(el);
            this.mediaElementSource.connect(this.filterNode);
          } catch (e) {
            // If cross-origin or iOS policy prevents MediaElementSource routing, audioEl plays directly to speakers
            console.log('[Audio] HTML5 audio playing directly to system output');
          }
        }
      } catch (e) {
        console.warn('[Audio] HTML5 Audio element setup notice:', e);
      }
    }

    // 2. Fetch and decode AudioBuffer for Web Audio synthesis
    try {
      const response = await fetch(url);
      if (response.ok) {
        const arrayBuffer = await response.arrayBuffer();
        if (this.audioCtx) {
          this.audioBuffer = await this.audioCtx.decodeAudioData(arrayBuffer);
        }
      }
    } catch (err) {
      console.warn('[Audio] Web Audio buffer decoding notice:', err.message);
    }

    this.isLoaded = true;

    // Sound is ON by default: begin playing immediately (or upon first gesture)
    if (!this.isMuted) {
      this.play().catch(() => {
        // Will activate automatically on first gesture
      });
    }
  }

  /**
   * Starts playback of the ambient soundscape with smooth fade-in.
   */
  async play() {
    this._ensureAudioContext();

    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      try {
        await this.audioCtx.resume();
      } catch (e) {
        // Continue
      }
    }

    this.isPlaying = true;
    this.isMuted = false;
    this._savePreferences();

    // 1. Play HTML5 Audio element
    if (this.audioEl) {
      try {
        this.audioEl.volume = this.targetVolume;
        this.audioEl.loop = true;
        const playPromise = this.audioEl.play();
        if (playPromise !== undefined) {
          await playPromise;
        }
      } catch (err) {
        console.warn('[Audio] HTML5 audio play notice:', err.message);
      }
    }

    // 2. Play Web Audio source node if audioEl is not active or as secondary
    if (!this.audioEl && this.audioBuffer && (!this.sourceNode || !this.isPlaying)) {
      if (this.sourceNode) {
        try { this.sourceNode.stop(); } catch (e) {}
      }
      if (this.audioCtx) {
        this.sourceNode = this.audioCtx.createBufferSource();
        this.sourceNode.buffer = this.audioBuffer;
        this.sourceNode.loop = true;
        this.sourceNode.connect(this.filterNode);
        this.sourceNode.start(0);
      }
    }

    this._fadeIn();
    this._notify();
  }

  /**
   * Smoothly pauses/mutes playback.
   */
  pause() {
    this.isMuted = true;
    this._savePreferences();

    if (this.audioEl) {
      try {
        this.audioEl.pause();
      } catch (e) {}
    }

    this._fadeOut(() => {
      this.isPlaying = false;
      this._notify();
    });
    this._notify();
  }

  /**
   * Toggles between mute and unmuted play states.
   * @returns {boolean} New muted status
   */
  toggle() {
    this.unlock();
    if (this.isPlaying && !this.isMuted) {
      this.pause();
      return true; // Now muted
    } else {
      this.play();
      return false; // Now unmuted
    }
  }

  /**
   * Sets target volume (0.0 to 1.0) with smooth transition.
   * @param {number} vol 
   */
  setVolume(vol) {
    this.targetVolume = Math.max(0, Math.min(1, vol));
    this._savePreferences();

    if (this.audioEl) {
      this.audioEl.volume = this.targetVolume;
    }

    if (this.audioCtx && this.masterGain && this.isPlaying && !this.isMuted) {
      const now = this.audioCtx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.linearRampToValueAtTime(this.targetVolume, now + 0.15);
    }
    this._notify();
  }

  _fadeIn(duration = 2.0) {
    if (!this.audioCtx || !this.masterGain) return;
    try {
      const now = this.audioCtx.currentTime;
      const currentGain = this.masterGain.gain.value;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(currentGain, now);
      this.masterGain.gain.linearRampToValueAtTime(this.targetVolume, now + duration);
    } catch (e) {}
  }

  _fadeOut(callback, duration = 1.0) {
    if (!this.audioCtx || !this.masterGain) {
      if (callback) callback();
      return;
    }
    try {
      const now = this.audioCtx.currentTime;
      const currentGain = this.masterGain.gain.value;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(currentGain, now);
      this.masterGain.gain.linearRampToValueAtTime(0.0001, now + duration);
      setTimeout(() => {
        if (this.isMuted && this.masterGain) {
          this.masterGain.gain.setValueAtTime(0, this.audioCtx.currentTime);
        }
        if (callback) callback();
      }, duration * 1000 + 50);
    } catch (e) {
      if (callback) callback();
    }
  }

  /**
   * Unlocks audio context on user interaction (iOS/iPadOS compliant).
   */
  async unlock() {
    this.isUnlocked = true;
    this._ensureAudioContext();

    if (this.audioCtx) {
      if (this.audioCtx.state === 'suspended') {
        try {
          await this.audioCtx.resume();
        } catch (e) {}
      }

      // iOS WebKit silent buffer trigger to open the hardware output pipe
      try {
        const buf = this.audioCtx.createBuffer(1, 1, 22050);
        const src = this.audioCtx.createBufferSource();
        src.buffer = buf;
        src.connect(this.audioCtx.destination);
        src.start(0);
      } catch (e) {}
    }

    if (!this.isPlaying && !this.isMuted) {
      await this.play();
    }
  }

  /**
   * Configures persistent user interaction listeners across all mobile/tablet/desktop platforms.
   */
  _setupAutoplayUnlock() {
    const events = ['click', 'touchend', 'touchstart', 'pointerdown', 'pointerup', 'keydown', 'wheel'];

    const unlockHandler = async () => {
      await this.unlock();
      // Remove listeners once audio is actively playing or audio context is running
      if (
        this.isPlaying ||
        (this.audioCtx && this.audioCtx.state === 'running') ||
        (this.audioEl && !this.audioEl.paused)
      ) {
        events.forEach(evt => window.removeEventListener(evt, unlockHandler));
      }
    };

    // User gesture triggers across all platforms (Desktop, Mobile, iPad, Tablet)
    events.forEach(evt => window.addEventListener(evt, unlockHandler, { passive: true }));
  }

  /**
   * Returns live audio level (0.0 to 1.0) and spectrum bars for HUD equalizer animations.
   * @returns {{ level: number, bars: number[] }}
   */
  getVisualizerData() {
    if (!this.isPlaying || this.isMuted) {
      return { level: 0, bars: [0.15, 0.1, 0.2, 0.12] };
    }

    if (this.analyser && this.audioCtx && this.audioCtx.state === 'running') {
      try {
        this.analyser.getByteFrequencyData(this.analyserData);
        const b0 = (this.analyserData[1] || 0) / 255;
        const b1 = (this.analyserData[3] || 0) / 255;
        const b2 = (this.analyserData[7] || 0) / 255;
        const b3 = (this.analyserData[14] || 0) / 255;
        const avg = (b0 + b1 + b2 + b3) / 4;
        return {
          level: avg,
          bars: [b0, b1, b2, b3],
        };
      } catch (e) {}
    }

    // Lively fallback bars while HTML5 audio plays
    const t = performance.now() * 0.003;
    const s0 = 0.3 + 0.2 * Math.sin(t * 1.5);
    const s1 = 0.4 + 0.3 * Math.cos(t * 2.1);
    const s2 = 0.5 + 0.25 * Math.sin(t * 2.7);
    const s3 = 0.35 + 0.2 * Math.cos(t * 1.8);
    return {
      level: (s0 + s1 + s2 + s3) / 4,
      bars: [s0, s1, s2, s3],
    };
  }

  /**
   * Subscribe to audio state changes (muted, volume, playing).
   * @param {Function} cb 
   */
  onStateChange(cb) {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  }

  _notify() {
    const state = {
      isLoaded: this.isLoaded,
      isPlaying: this.isPlaying && !this.isMuted,
      isMuted: this.isMuted,
      volume: this.targetVolume,
    };
    for (const cb of this.listeners) {
      try { cb(state); } catch (e) { /* ignore */ }
    }
  }
}

// Global singleton instance
export const ambientAudio = new AmbientAudioController();
