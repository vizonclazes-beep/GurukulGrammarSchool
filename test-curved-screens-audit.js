// test-curved-screens-audit.js — Automated Verification for Curved Holographic Displays in Astronomy Pod
import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\sanja\\.gemini\\antigravity\\brain\\483a2afc-6d65-4154-a660-fc66c69d9e36';

async function audit() {
  console.log('=== STARTING CURVED HOLOGRAPHIC DISPLAYS AUDIT ===');
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
  await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded', timeout: 20000 });

  // Wait for loading screen fade
  await new Promise((r) => setTimeout(r, 4000));

  // ── 1. WIDE VIEW LOOKING INTO ASTRONOMY POD FROM ENTRANCE ──
  console.log('1. Capturing overview of Astronomy Pod with 3 curved holographic displays around the edge...');
  await page.evaluate(() => {
    const sim = window.__sim;
    // Astronomy station center is at X=3.71, Z=-11.41
    // Position camera slightly towards atrium center looking into pod
    sim.camera.position.set(2.1, 2.2, -6.8);
    sim.camera.lookAt(3.71, 1.8, -11.41);
    if (sim.controls) {
      sim.controls.target.set(3.71, 1.8, -11.41);
      sim.controls.update();
    }
  });

  await new Promise((r) => setTimeout(r, 1500));
  const overviewShot = path.join(artifactDir, 'audit_astro_curved_screens_overview.png');
  await page.screenshot({ path: overviewShot });
  console.log('Saved:', overviewShot);

  // ── 2. CLOSE-UP OF BACK CURVED DISPLAY (VOYAGER 1 & ISS) ──
  console.log('2. Inspecting Back curved holographic display (Voyager 1 & ISS)...');
  await page.evaluate(() => {
    const sim = window.__sim;
    // Stand in center of pod looking back towards the perimeter wall
    sim.camera.position.set(3.71, 1.6, -11.41);
    // Back direction is (0.309, 0, -0.951)
    sim.camera.lookAt(3.71 + 0.309 * 4.0, 1.65, -11.41 - 0.951 * 4.0);
    if (sim.controls) {
      sim.controls.target.set(3.71 + 0.309 * 4.0, 1.65, -11.41 - 0.951 * 4.0);
      sim.controls.update();
    }
  });

  await new Promise((r) => setTimeout(r, 1500));
  const backShot = path.join(artifactDir, 'audit_astro_curved_screen_back_voyager.png');
  await page.screenshot({ path: backShot });
  console.log('Saved:', backShot);

  // ── 3. CLOSE-UP OF LEFT CURVED DISPLAY (NEBULAS) ──
  console.log('3. Inspecting Left curved holographic display (Nebulas)...');
  await page.evaluate(() => {
    const sim = window.__sim;
    // Stand in center of pod looking towards left screen
    sim.camera.position.set(3.71, 1.6, -11.41);
    // Left direction is (-0.951, 0, -0.309)
    sim.camera.lookAt(3.71 - 0.951 * 4.0, 1.65, -11.41 - 0.309 * 4.0);
    if (sim.controls) {
      sim.controls.target.set(3.71 - 0.951 * 4.0, 1.65, -11.41 - 0.309 * 4.0);
      sim.controls.update();
    }
  });

  await new Promise((r) => setTimeout(r, 1500));
  const leftShot = path.join(artifactDir, 'audit_astro_curved_screen_left_nebulas.png');
  await page.screenshot({ path: leftShot });
  console.log('Saved:', leftShot);

  // ── 4. CLOSE-UP OF RIGHT CURVED DISPLAY (GALAXIES) ──
  console.log('4. Inspecting Right curved holographic display (Galaxies)...');
  await page.evaluate(() => {
    const sim = window.__sim;
    // Stand in center of pod looking towards right screen
    sim.camera.position.set(3.71, 1.6, -11.41);
    // Right direction is (0.951, 0, 0.309)
    sim.camera.lookAt(3.71 + 0.951 * 4.0, 1.65, -11.41 + 0.309 * 4.0);
    if (sim.controls) {
      sim.controls.target.set(3.71 + 0.951 * 4.0, 1.65, -11.41 + 0.309 * 4.0);
      sim.controls.update();
    }
  });

  await new Promise((r) => setTimeout(r, 1500));
  const rightShot = path.join(artifactDir, 'audit_astro_curved_screen_right_galaxies.png');
  await page.screenshot({ path: rightShot });
  console.log('Saved:', rightShot);

  // ── 5. INSIDE OBSERVATORY VIEW: ORRERY & ENCIRCLING WRAP-AROUND SCREENS ──
  console.log('5. Capturing panoramic view from slightly behind orrery showing curved screens and solar system...');
  await page.evaluate(() => {
    const sim = window.__sim;
    sim.camera.position.set(3.71 + 0.309 * 1.8, 1.8, -11.41 - 0.951 * 1.8);
    sim.camera.lookAt(3.71 - 0.309 * 3.0, 2.0, -11.41 + 0.951 * 3.0);
    if (sim.controls) {
      sim.controls.target.set(3.71 - 0.309 * 3.0, 2.0, -11.41 + 0.951 * 3.0);
      sim.controls.update();
    }
  });

  await new Promise((r) => setTimeout(r, 1500));
  const bridgeShot = path.join(artifactDir, 'audit_astro_inside_observatory_bridge.png');
  await page.screenshot({ path: bridgeShot });
  console.log('Saved:', bridgeShot);

  await browser.close();

  console.log('=== AUDIT COMPLETE ===');
  console.log('Errors logged:', errors);
}

audit().catch(console.error);
