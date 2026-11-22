// test-astro-dual-consoles-audit.js — Automated Verification for Lowered Orrery & Dual Physics-Style Consoles
import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\sanja\\.gemini\\antigravity\\brain\\483a2afc-6d65-4154-a660-fc66c69d9e36';

async function audit() {
  console.log('=== STARTING ASTRONOMY DUAL CONSOLES & LOWERED ORRERY AUDIT ===');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--use-gl=angle',
      '--use-angle=swiftshader',
      '--enable-unsafe-swiftshader',
    ],
  });

  const page = await browser.newPage();
  const errors = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
      console.error('[BROWSER ERROR]:', msg.text());
    }
  });

  await page.setViewport({ width: 1920, height: 1080 });
  console.log('Navigating to http://localhost:5173/ ...');
  await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded', timeout: 20000 });

  // Wait for loading screen fade
  console.log('Waiting for sim initialization...');
  await new Promise((r) => setTimeout(r, 4500));

  // ── 1. WIDE VIEW FROM ENTRANCE: LOWERED ORRERY & DUAL ANGLED CONSOLES ──
  console.log('1. Capturing entrance overview: Lowered solar system & dual physics-style consoles...');
  await page.evaluate(() => {
    const sim = window.__sim;
    // Astronomy station center is at (3.71, 0, -11.41)
    // Position camera just outside entrance looking into pod
    sim.camera.position.set(1.6, 2.1, -6.5);
    sim.camera.lookAt(3.71, 1.45, -11.41);
    if (sim.controls) {
      sim.controls.target.set(3.71, 1.45, -11.41);
      sim.controls.update();
    }
  });

  await new Promise((r) => setTimeout(r, 1500));
  const overviewShot = path.join(artifactDir, 'audit_astro_dual_consoles_overview.png');
  await page.screenshot({ path: overviewShot });
  console.log('Saved:', overviewShot);

  // ── 2. CLOSE-UP: LEFT CONSOLE (DEEP-SPACE OBSERVATORY) ──
  console.log('2. Capturing close-up of Left Console (Nebulas & Galaxies)...');
  await page.evaluate(() => {
    const sim = window.__sim;
    // Left console is located to the left of the orrery
    // Target left console head
    sim.camera.position.set(2.4, 1.65, -9.8);
    sim.camera.lookAt(2.0, 1.35, -11.2);
    if (sim.controls) {
      sim.controls.target.set(2.0, 1.35, -11.2);
      sim.controls.update();
    }
  });

  await new Promise((r) => setTimeout(r, 1500));
  const leftShot = path.join(artifactDir, 'audit_astro_console_left_deep_space.png');
  await page.screenshot({ path: leftShot });
  console.log('Saved:', leftShot);

  // ── 3. CLOSE-UP: RIGHT CONSOLE (VOYAGER 1 & ISS) ──
  console.log('3. Capturing close-up of Right Console (Voyager 1 & ISS)...');
  await page.evaluate(() => {
    const sim = window.__sim;
    // Right console is located to the right of the orrery
    sim.camera.position.set(4.8, 1.65, -9.6);
    sim.camera.lookAt(5.2, 1.35, -11.0);
    if (sim.controls) {
      sim.controls.target.set(5.2, 1.35, -11.0);
      sim.controls.update();
    }
  });

  await new Promise((r) => setTimeout(r, 1500));
  const rightShot = path.join(artifactDir, 'audit_astro_console_right_spaceflight.png');
  await page.screenshot({ path: rightShot });
  console.log('Saved:', rightShot);

  // ── 4. CLOSE-UP: LOWERED SOLAR SYSTEM ORRERY & PEDESTAL ──
  console.log('4. Capturing close-up of lowered solar system orrery & central pedestal...');
  await page.evaluate(() => {
    const sim = window.__sim;
    sim.camera.position.set(3.71, 1.85, -9.6);
    sim.camera.lookAt(3.71, 1.42, -11.41);
    if (sim.controls) {
      sim.controls.target.set(3.71, 1.42, -11.41);
      sim.controls.update();
    }
  });

  await new Promise((r) => setTimeout(r, 1500));
  const sunShot = path.join(artifactDir, 'audit_astro_lowered_orrery_closeup.png');
  await page.screenshot({ path: sunShot });
  console.log('Saved:', sunShot);

  // ── 5. STANDING ON OBSERVATION DECK LOOKING THROUGH POD TO WALL ──
  console.log('5. Capturing view from deck standing between dual consoles looking through to Apollo 11 & Newton...');
  await page.evaluate(() => {
    const sim = window.__sim;
    // Stand right on the pod deck in front of the lowered orrery
    sim.camera.position.set(3.2, 1.65, -10.0);
    sim.camera.lookAt(4.2, 1.6, -13.5);
    if (sim.controls) {
      sim.controls.target.set(4.2, 1.6, -13.5);
      sim.controls.update();
    }
  });

  await new Promise((r) => setTimeout(r, 1500));
  const bridgeShot = path.join(artifactDir, 'audit_astro_open_sightlines_deck.png');
  await page.screenshot({ path: bridgeShot });
  console.log('Saved:', bridgeShot);

  await browser.close();

  console.log('=== ASTRONOMY DUAL CONSOLES AUDIT COMPLETE ===');
  console.log('Errors logged:', errors);
}

audit().catch(console.error);
