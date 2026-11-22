// test-audio-audit.js — Automated Verification for Ambient Space Audio Soundscape
import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\sanja\\.gemini\\antigravity\\brain\\483a2afc-6d65-4154-a660-fc66c69d9e36';

async function audit() {
  console.log('=== STARTING AMBIENT SPACE AUDIO AUDIT ===');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--use-gl=angle',
      '--use-angle=swiftshader',
      '--enable-unsafe-swiftshader',
      '--autoplay-policy=no-user-gesture-required', // Allow audio in headless Chrome
    ],
  });

  const page = await browser.newPage();
  const errors = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
      console.error('[BROWSER ERROR]:', msg.text());
    } else {
      console.log(`[BROWSER ${msg.type().toUpperCase()}]:`, msg.text());
    }
  });

  await page.setViewport({ width: 1920, height: 1080 });
  console.log('Navigating to http://localhost:5173/ ...');
  await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded', timeout: 20000 });

  // Wait for loading screen fade
  console.log('Waiting for sim initialization and audio loading...');
  await new Promise((r) => setTimeout(r, 4500));

  // ── 1. VERIFY AUDIO CONTROLLER & BUFFER ──
  console.log('1. Checking ambientAudio controller and loaded track status...');
  const audioInfo = await page.evaluate(async () => {
    const sim = window.__sim;
    if (!sim || !sim.ambientAudio) {
      return { ok: false, error: 'window.__sim.ambientAudio not found' };
    }
    const audio = sim.ambientAudio;
    return {
      ok: true,
      isLoaded: audio.isLoaded,
      isMuted: audio.isMuted,
      isPlaying: audio.isPlaying,
      duration: audio.audioBuffer ? audio.audioBuffer.duration : 0,
      channels: audio.audioBuffer ? audio.audioBuffer.numberOfChannels : 0,
      sampleRate: audio.audioBuffer ? audio.audioBuffer.sampleRate : 0,
      volume: audio.targetVolume,
      ctxState: audio.audioCtx ? audio.audioCtx.state : 'none',
    };
  });
  console.log('Audio Info:', audioInfo);

  // ── 2. TRIGGER PLAYBACK VIA GESTURE / TOGGLE ──
  console.log('2. Simulating user gesture on audio widget to start soundscape...');
  await page.evaluate(() => {
    const sim = window.__sim;
    sim.ambientAudio.unlock();
    sim.ambientAudio.play();
  });

  await new Promise((r) => setTimeout(r, 1200));

  const playingState = await page.evaluate(() => {
    const sim = window.__sim;
    const audio = sim.ambientAudio;
    const widget = document.getElementById('vz-audio-widget');
    const statusText = document.getElementById('vz-audio-status')?.textContent;
    const iconText = document.getElementById('vz-audio-icon')?.textContent;
    return {
      isPlaying: audio.isPlaying,
      isMuted: audio.isMuted,
      ctxState: audio.audioCtx?.state,
      widgetClasses: widget?.className,
      statusText,
      iconText,
    };
  });
  console.log('Playing State:', playingState);

  // Capture wide overview showing Audio HUD widget active at top-left
  const wideShot = path.join(artifactDir, 'audit_ambient_soundscape_overview.png');
  await page.screenshot({ path: wideShot });
  console.log('Saved:', wideShot);

  // Capture closeup of Audio HUD widget
  const audioWidgetEl = await page.$('#vz-audio-widget');
  if (audioWidgetEl) {
    const widgetShot = path.join(artifactDir, 'audit_audio_widget_playing.png');
    await audioWidgetEl.screenshot({ path: widgetShot });
    console.log('Saved:', widgetShot);
  }

  // ── 3. TEST MUTE TOGGLE ──
  console.log('3. Testing Mute toggle...');
  await page.evaluate(() => {
    const sim = window.__sim;
    sim.ambientAudio.toggle();
  });

  await new Promise((r) => setTimeout(r, 600));

  const mutedState = await page.evaluate(() => {
    const sim = window.__sim;
    const audio = sim.ambientAudio;
    const statusText = document.getElementById('vz-audio-status')?.textContent;
    const iconText = document.getElementById('vz-audio-icon')?.textContent;
    return {
      isMuted: audio.isMuted,
      isPlaying: audio.isPlaying,
      statusText,
      iconText,
    };
  });
  console.log('Muted State:', mutedState);

  if (audioWidgetEl) {
    const mutedShot = path.join(artifactDir, 'audit_audio_widget_muted.png');
    await audioWidgetEl.screenshot({ path: mutedShot });
    console.log('Saved:', mutedShot);
  }

  // ── 4. TEST VOLUME ADJUSTMENT & UNMUTE ──
  console.log('4. Testing volume adjustment and unmuting...');
  await page.evaluate(() => {
    const sim = window.__sim;
    sim.ambientAudio.setVolume(0.55);
    sim.ambientAudio.play();
  });

  await new Promise((r) => setTimeout(r, 800));

  const volumeState = await page.evaluate(() => {
    const sim = window.__sim;
    const audio = sim.ambientAudio;
    const volPct = document.getElementById('vz-audio-vol-pct')?.textContent;
    const vizData = audio.getVisualizerData();
    return {
      targetVolume: audio.targetVolume,
      isMuted: audio.isMuted,
      isPlaying: audio.isPlaying,
      volPct,
      visualizerLevel: vizData.level,
      bars: vizData.bars,
    };
  });
  console.log('Volume & Visualizer State:', volumeState);

  if (audioWidgetEl) {
    const volumeShot = path.join(artifactDir, 'audit_audio_widget_volume_adjusted.png');
    await audioWidgetEl.screenshot({ path: volumeShot });
    console.log('Saved:', volumeShot);
  }

  // ── 5. FINAL PANORAMIC VIEW FROM SPAWN WITH AUDIO & GYRO HUD ──
  console.log('5. Capturing panoramic museum view with HUD...');
  await page.evaluate(() => {
    const sim = window.__sim;
    sim.camera.position.set(0, 3.2, 14.5);
    sim.camera.lookAt(0, 2.0, 0);
    if (sim.controls) {
      sim.controls.target.set(0, 2.0, 0);
      sim.controls.update();
    }
  });

  await new Promise((r) => setTimeout(r, 1200));
  const finalShot = path.join(artifactDir, 'audit_atrium_with_audio_and_gyro_hud.png');
  await page.screenshot({ path: finalShot });
  console.log('Saved:', finalShot);

  await browser.close();

  console.log('=== AMBIENT AUDIO AUDIT COMPLETE ===');
  console.log('Errors logged:', errors);
}

audit().catch(console.error);
