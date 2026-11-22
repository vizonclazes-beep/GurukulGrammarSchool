// src/audio/ambientAudio.js — Web Audio API Ambient Soundscape Manager for VIZON
// High-fidelity background audio with smooth fades, autoplay unlock, and real-time visualization.

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
      const storedMuted = localStorage.getItem(STORAGE_KEY_MUTED);
      if (storedMuted !== null) {
        this.isMuted = storedMuted === 'true';
      }
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

    this.audioCtx = new AudioContextClass();

    // Master Low-pass warm filter (rolls off harsh frequencies above 10kHz)
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

    return this.audioCtx;
  }

  /**
   * Loads the ambient audio asset and decodes it into an AudioBuffer.
   * @param {string} url Path to audio file
   */
  async loadTrack(url = '/audio/ambient_space.wav') {
    this._ensureAudioContext();
    if (!this.audioCtx) return;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to load audio asset: ${response.status} ${response.statusText}`);
      }
      const arrayBuffer = await response.arrayBuffer();
      this.audioBuffer = await this.audioCtx.decodeAudioData(arrayBuffer);
      this.isLoaded = true;
      console.log(`[Audio] Ambient space soundscape loaded (${this.audioBuffer.duration.toFixed(1)}s, ${this.audioBuffer.numberOfChannels}ch).`);

      // If unlocked and not muted, begin playing
      if (this.isUnlocked && !this.isMuted) {
        this.play();
      }
    } catch (err) {
      console.warn('[Audio] Failed to load WAV, engaging procedural ambient fallback:', err.message);
      this._setupProceduralFallback();
    }
  }

  /**
   * Procedural synthesizer fallback in case the WAV asset fails to load.
   */
  _setupProceduralFallback() {
    this._ensureAudioContext();
    if (!this.audioCtx) return;

    // Create 4-chord procedural ambient oscillators
    const chords = [
      [73.42, 110.00, 146.83, 174.61, 220.00], // Dm9
      [58.27, 87.31, 116.54, 146.83, 220.00],  // Bbmaj7
      [65.41, 98.00, 130.81, 174.61, 196.00],  // Fsus2
      [55.00, 82.41, 98.00, 146.83, 220.00],   // Gm9
    ];

    const subOsc = this.audioCtx.createOscillator();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(36.71, this.audioCtx.currentTime); // D1

    const subGain = this.audioCtx.createGain();
    subGain.gain.setValueAtTime(0.2, this.audioCtx.currentTime);
    subOsc.connect(subGain);
    subGain.connect(this.filterNode);
    subOsc.start();

    // Lush polyphonic drone
    const chordGains = [];
    chords[0].forEach((freq) => {
      const osc = this.audioCtx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
      const g = this.audioCtx.createGain();
      g.gain.setValueAtTime(0.06, this.audioCtx.currentTime);
      osc.connect(g);
      g.connect(this.filterNode);
      osc.start();
      chordGains.push({ osc, g });
    });

    this.isLoaded = true;
    if (this.isUnlocked && !this.isMuted) {
      this._fadeIn();
    }
  }

  /**
   * Starts playback of the ambient soundscape with smooth fade-in.
   */
  play() {
    this._ensureAudioContext();
    if (!this.audioCtx) return;

    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    if (this.audioBuffer && (!this.sourceNode || !this.isPlaying)) {
      if (this.sourceNode) {
        try { this.sourceNode.stop(); } catch (e) { /* ignore */ }
      }
      this.sourceNode = this.audioCtx.createBufferSource();
      this.sourceNode.buffer = this.audioBuffer;
      this.sourceNode.loop = true;
      this.sourceNode.connect(this.filterNode);
      this.sourceNode.start(0);
    }

    this.isPlaying = true;
    this.isMuted = false;
    this._savePreferences();
    this._fadeIn();
    this._notify();
  }

  /**
   * Smoothly pauses/mutes playback.
   */
  pause() {
    this.isMuted = true;
    this._savePreferences();
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
    if (this.audioCtx && this.masterGain && this.isPlaying && !this.isMuted) {
      const now = this.audioCtx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.linearRampToValueAtTime(this.targetVolume, now + 0.15);
    }
    this._notify();
  }

  _fadeIn(duration = 2.5) {
    if (!this.audioCtx || !this.masterGain) return;
    const now = this.audioCtx.currentTime;
    const currentGain = this.masterGain.gain.value;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(currentGain, now);
    this.masterGain.gain.linearRampToValueAtTime(this.targetVolume, now + duration);
  }

  _fadeOut(callback, duration = 1.2) {
    if (!this.audioCtx || !this.masterGain) {
      if (callback) callback();
      return;
    }
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
  }

  /**
   * Unlocks audio context on user interaction.
   */
  unlock() {
    this.isUnlocked = true;
    this._ensureAudioContext();
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    if (!this.isPlaying && !this.isMuted && this.isLoaded) {
      this.play();
    }
  }

  _setupAutoplayUnlock() {
    const unlockHandler = () => {
      this.unlock();
      // Remove listeners once unlocked
      window.removeEventListener('pointerdown', unlockHandler);
      window.removeEventListener('touchstart', unlockHandler);
      window.removeEventListener('keydown', unlockHandler);
    };

    window.addEventListener('pointerdown', unlockHandler, { once: true, passive: true });
    window.addEventListener('touchstart', unlockHandler, { once: true, passive: true });
    window.addEventListener('keydown', unlockHandler, { once: true, passive: true });
  }

  /**
   * Returns live audio level (0.0 to 1.0) and spectrum bars for HUD equalizer animations.
   * @returns {{ level: number, bars: number[] }}
   */
  getVisualizerData() {
    if (!this.analyser || !this.isPlaying || this.isMuted || !this.audioCtx || this.audioCtx.state !== 'running') {
      return { level: 0, bars: [0.15, 0.1, 0.2, 0.12] };
    }

    this.analyser.getByteFrequencyData(this.analyserData);

    // Sample 4 distinct frequency bands: Sub/Bass, Low-Mid, High-Mid, Presence
    const b0 = (this.analyserData[1] || 0) / 255;
    const b1 = (this.analyserData[3] || 0) / 255;
    const b2 = (this.analyserData[7] || 0) / 255;
    const b3 = (this.analyserData[14] || 0) / 255;

    const avg = (b0 + b1 + b2 + b3) / 4;
    return {
      level: avg,
      bars: [b0, b1, b2, b3],
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
