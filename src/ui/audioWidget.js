// src/ui/audioWidget.js — Ambient Audio Service Integration
import { ambientAudio } from '../audio/ambientAudio.js';

/**
 * Initializes the ambient audio service.
 * Audio toggle is integrated into the bottom navigation bar alongside Home and station buttons.
 * Device/system volume handles loudness without UI slider clutter.
 */
export function initAudioWidget() {
  // Preload ambient sound track
  ambientAudio.loadTrack('/audio/ambient_space.wav').catch((e) => {
    console.warn('[Audio] Preload notice:', e);
  });

  // Global keyboard shortcut: 'M' to toggle mute
  window.addEventListener('keydown', (e) => {
    if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
    if (e.key === 'm' || e.key === 'M') {
      ambientAudio.toggle();
    }
  });

  return {
    ambientAudio,
  };
}
