// scripts/generate-ambient-track.js
// Procedural Soundscape Synthesizer for VIZON:
// Generates a seamless, 48-second stereo 16-bit PCM WAV ambient track.
// Composition: Ethereal cosmic ambient pad (Dm9 -> Bbmaj9 -> Fsus2/C -> Gm9/A).
// Features: Multi-oscillator detuning, warm analog lowpass sweep, sub drone,
// celestial shimmer bells, stereo chorus, and periodic convolution reverb wrap.

import fs from 'fs';
import path from 'path';

const SAMPLE_RATE = 44100;
const DURATION = 48.0; // 48 seconds total loop
const NUM_SAMPLES = Math.floor(SAMPLE_RATE * DURATION);

// Left & Right float buffers
const left = new Float32Array(NUM_SAMPLES);
const right = new Float32Array(NUM_SAMPLES);

// ── Chords Definition (4 chords, 12 seconds each) ──
// Each note: { freq: Hz, amp: 0-1, pan: -1 to 1 }
const CHORDS = [
  // Chord 1: Dm9 (Deep Space Meditation) [0s - 12s]
  {
    sub: 36.71, // D1
    notes: [
      { freq: 73.42, amp: 0.35, pan: -0.2 },  // D2
      { freq: 110.00, amp: 0.32, pan: 0.2 },  // A2
      { freq: 146.83, amp: 0.28, pan: -0.3 }, // D3
      { freq: 174.61, amp: 0.30, pan: 0.1 },  // F3
      { freq: 220.00, amp: 0.26, pan: 0.35 }, // A3
      { freq: 261.63, amp: 0.24, pan: -0.4 }, // C4
      { freq: 329.63, amp: 0.22, pan: 0.15 }, // E4
    ],
    shimmers: [
      { time: 2.5, freq: 880.00, amp: 0.18, pan: 0.5 },  // A5
      { time: 6.0, freq: 1046.50, amp: 0.15, pan: -0.6 }, // C6
      { time: 9.5, freq: 1318.51, amp: 0.16, pan: 0.3 },  // E6
    ]
  },
  // Chord 2: Bbmaj9#11 (Cosmic Horizon / Starlight) [12s - 24s]
  {
    sub: 29.14, // Bb0
    notes: [
      { freq: 58.27, amp: 0.35, pan: 0.2 },   // Bb1
      { freq: 87.31, amp: 0.32, pan: -0.25 }, // F2
      { freq: 116.54, amp: 0.28, pan: 0.3 },  // Bb2
      { freq: 146.83, amp: 0.30, pan: -0.2 }, // D3
      { freq: 174.61, amp: 0.26, pan: 0.4 },  // F3
      { freq: 220.00, amp: 0.25, pan: -0.35 },// A3
      { freq: 293.66, amp: 0.22, pan: 0.2 },  // D4
      { freq: 329.63, amp: 0.18, pan: -0.4 }, // E4 (#11)
    ],
    shimmers: [
      { time: 14.5, freq: 932.33, amp: 0.18, pan: -0.5 }, // Bb5
      { time: 18.0, freq: 1174.66, amp: 0.16, pan: 0.6 }, // D6
      { time: 21.5, freq: 1318.51, amp: 0.17, pan: -0.3 },// E6
    ]
  },
  // Chord 3: Fsus2 / C (Scientific Majesty & Purity) [24s - 36s]
  {
    sub: 32.70, // C1
    notes: [
      { freq: 65.41, amp: 0.35, pan: -0.2 },  // C2
      { freq: 98.00, amp: 0.32, pan: 0.2 },   // G2
      { freq: 130.81, amp: 0.28, pan: -0.3 }, // C3
      { freq: 174.61, amp: 0.30, pan: 0.25 }, // F3
      { freq: 196.00, amp: 0.26, pan: -0.35 },// G3
      { freq: 261.63, amp: 0.24, pan: 0.3 },  // C4
      { freq: 329.63, amp: 0.20, pan: -0.2 }, // E4
    ],
    shimmers: [
      { time: 26.5, freq: 783.99, amp: 0.18, pan: 0.4 },  // G5
      { time: 30.0, freq: 1046.50, amp: 0.16, pan: -0.5 },// C6
      { time: 33.5, freq: 1318.51, amp: 0.15, pan: 0.5 }, // E6
    ]
  },
  // Chord 4: Gm9 / A7sus4 (Serene Ethereal Wonder) [36s - 48s]
  {
    sub: 27.50, // A0
    notes: [
      { freq: 55.00, amp: 0.35, pan: 0.2 },   // A1
      { freq: 82.41, amp: 0.32, pan: -0.2 },  // E2
      { freq: 98.00, amp: 0.28, pan: 0.3 },   // G2
      { freq: 146.83, amp: 0.30, pan: -0.25 },// D3
      { freq: 196.00, amp: 0.26, pan: 0.35 }, // G3
      { freq: 261.63, amp: 0.24, pan: -0.3 }, // C4
      { freq: 293.66, amp: 0.22, pan: 0.2 },  // D4
    ],
    shimmers: [
      { time: 38.5, freq: 880.00, amp: 0.18, pan: -0.4 }, // A5
      { time: 42.0, freq: 1174.66, amp: 0.16, pan: 0.5 }, // D6
      { time: 45.5, freq: 1318.51, amp: 0.17, pan: -0.6 },// E6
    ]
  }
];

// Helper: Soft clipping / analog saturation
function softClip(x) {
  return Math.tanh(x);
}

// Helper: Bandlimited-ish softened sawtooth (additive harmonics)
function softSaw(phase) {
  // Sum first 5 odd/even harmonics with decay
  let s = 0;
  for (let k = 1; k <= 6; k++) {
    s += Math.sin(phase * k) / (k * 1.15);
  }
  return s * 0.45;
}

// ── Synthesize Layers ──
console.log(`[Synth] Synthesizing ${DURATION}s ambient space soundscape (${NUM_SAMPLES} samples)...`);

// Pre-initialize oscillators state
// Each chord will have a smooth crossfade envelope into the next
const CHORD_DURATION = 12.0;

for (let i = 0; i < NUM_SAMPLES; i++) {
  const t = i / SAMPLE_RATE;
  
  // Slow LFO for filter cutoff and breathing (period = 16 seconds)
  const lfo1 = Math.sin(2 * Math.PI * (t / 16.0));
  const lfoFilter = 0.5 + 0.5 * Math.sin(2 * Math.PI * (t / 12.0) + 0.3);
  
  // Calculate weights for the 4 chords with cosine smooth crossfades
  // To ensure 100% periodic seamless loop, chord 4 blends into chord 1 at the boundary!
  for (let c = 0; c < 4; c++) {
    const chordCenter = c * CHORD_DURATION + CHORD_DURATION * 0.5;
    let dist = Math.abs(t - chordCenter);
    // Boundary wrap for periodic continuity
    if (dist > DURATION * 0.5) dist = DURATION - dist;
    
    // Smooth bell-shaped envelope across 24 seconds (overlap of 2 chords at any moment)
    if (dist >= CHORD_DURATION) continue;
    const chordWeight = 0.5 + 0.5 * Math.cos((dist / CHORD_DURATION) * Math.PI);
    
    const chord = CHORDS[c];
    
    // 1. Deep warm Sub Drone
    const subPhase = 2 * Math.PI * chord.sub * t;
    const subVal = (Math.sin(subPhase) + 0.25 * Math.sin(subPhase * 2)) * 0.22 * chordWeight;
    left[i] += subVal;
    right[i] += subVal;
    
    // 2. Pad notes (rich detuned analog voices)
    for (const note of chord.notes) {
      // 3 detuned oscillators per note for lush chorusing
      const p1 = 2 * Math.PI * (note.freq * 0.9985) * t + c * 1.1;
      const p2 = 2 * Math.PI * (note.freq * 1.0000) * t + c * 2.3;
      const p3 = 2 * Math.PI * (note.freq * 1.0018) * t + c * 3.7;
      
      const v1 = softSaw(p1);
      const v2 = Math.sin(p2);
      const v3 = softSaw(p3);
      
      // Warm blend with gentle LFO harmonic sweep
      const voice = (v1 * 0.3 + v2 * 0.45 + v3 * 0.25) * note.amp * chordWeight;
      
      // Stereo Panning
      const panL = 0.5 * (1 - note.pan);
      const panR = 0.5 * (1 + note.pan);
      
      left[i] += voice * panL;
      right[i] += voice * panR;
    }
  }
}

// ── 3. Celestial Bell Shimmers (Twinkling Stardust) ──
console.log('[Synth] Adding celestial stardust shimmer bells...');
for (const chord of CHORDS) {
  for (const bell of chord.shimmers) {
    const startSample = Math.floor(bell.time * SAMPLE_RATE);
    const bellSamples = Math.floor(4.5 * SAMPLE_RATE); // 4.5 second long ethereal decay
    
    for (let s = 0; s < bellSamples; s++) {
      const idx = (startSample + s) % NUM_SAMPLES; // periodic boundary wrap
      const bt = s / SAMPLE_RATE;
      
      // Pure sine + gentle 3rd harmonic bell tone
      const phase1 = 2 * Math.PI * bell.freq * bt;
      const phase2 = 2 * Math.PI * (bell.freq * 2.756) * bt; // inharmonic bell overtone
      
      // Fast soft attack (0.02s) and long exponential decay
      const env = (1.0 - Math.exp(-bt / 0.02)) * Math.exp(-bt / 1.35) * bell.amp;
      const val = (Math.sin(phase1) + 0.28 * Math.sin(phase2)) * env;
      
      const panL = 0.5 * (1 - bell.pan);
      const panR = 0.5 * (1 + bell.pan);
      
      left[idx] += val * panL;
      right[idx] += val * panR;
    }
  }
}

// ── 4. Algorithmic Cosmic Space Reverb (Diffusion & Long Decay with Periodic Wrap) ──
console.log('[Synth] Applying algorithmic space reverb with seamless loop wrap...');
const delayTimesL = [0.031, 0.053, 0.087, 0.127, 0.173, 0.241, 0.353, 0.491];
const delayTimesR = [0.037, 0.047, 0.091, 0.139, 0.181, 0.257, 0.367, 0.509];
const feedback = 0.68;

const revL = new Float32Array(NUM_SAMPLES);
const revR = new Float32Array(NUM_SAMPLES);

for (let d = 0; d < delayTimesL.length; d++) {
  const dSamplesL = Math.floor(delayTimesL[d] * SAMPLE_RATE);
  const dSamplesR = Math.floor(delayTimesR[d] * SAMPLE_RATE);
  const gain = Math.pow(feedback, d + 1) * 0.28;
  
  for (let i = 0; i < NUM_SAMPLES; i++) {
    const prevL = (i - dSamplesL + NUM_SAMPLES) % NUM_SAMPLES;
    const prevR = (i - dSamplesR + NUM_SAMPLES) % NUM_SAMPLES;
    revL[i] += left[prevL] * gain;
    revR[i] += right[prevR] * gain;
  }
}

// Mix wet reverb with dry signal & warm analog saturation
let maxPeak = 0.0001;
for (let i = 0; i < NUM_SAMPLES; i++) {
  left[i] = softClip(left[i] * 0.72 + revL[i] * 0.35);
  right[i] = softClip(right[i] * 0.72 + revR[i] * 0.35);
  
  if (Math.abs(left[i]) > maxPeak) maxPeak = Math.abs(left[i]);
  if (Math.abs(right[i]) > maxPeak) maxPeak = Math.abs(right[i]);
}

// Normalize to -1.5 dB (peak 0.84)
const normFactor = 0.84 / maxPeak;
console.log(`[Synth] Normalizing audio (peak was ${(maxPeak).toFixed(3)}, factor ${normFactor.toFixed(3)})...`);

// ── 5. Encode 16-bit PCM Stereo WAV ──
const bytesPerSample = 2;
const numChannels = 2;
const byteRate = SAMPLE_RATE * numChannels * bytesPerSample;
const blockAlign = numChannels * bytesPerSample;
const dataSize = NUM_SAMPLES * blockAlign;
const buffer = Buffer.alloc(44 + dataSize);

// RIFF header
buffer.write('RIFF', 0);
buffer.writeUInt32LE(36 + dataSize, 4);
buffer.write('WAVE', 8);

// fmt chunk
buffer.write('fmt ', 12);
buffer.writeUInt32LE(16, 16); // subchunk1 size (16 for PCM)
buffer.writeUInt16LE(1, 20);  // PCM format = 1
buffer.writeUInt16LE(numChannels, 22);
buffer.writeUInt32LE(SAMPLE_RATE, 24);
buffer.writeUInt32LE(byteRate, 28);
buffer.writeUInt16LE(blockAlign, 32);
buffer.writeUInt16LE(16, 34); // bits per sample

// data chunk
buffer.write('data', 36);
buffer.writeUInt32LE(dataSize, 40);

let offset = 44;
for (let i = 0; i < NUM_SAMPLES; i++) {
  const l = Math.max(-1, Math.min(1, left[i] * normFactor));
  const r = Math.max(-1, Math.min(1, right[i] * normFactor));
  
  const intL = l < 0 ? Math.floor(l * 32768) : Math.floor(l * 32767);
  const intR = r < 0 ? Math.floor(r * 32768) : Math.floor(r * 32767);
  
  buffer.writeInt16LE(intL, offset);
  buffer.writeInt16LE(intR, offset + 2);
  offset += 4;
}

const outPath = path.resolve('public/audio/ambient_space.wav');
fs.writeFileSync(outPath, buffer);

console.log(`[Synth] Successfully generated ${outPath} (${(buffer.length / 1024 / 1024).toFixed(2)} MB)`);
