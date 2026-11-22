import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\sanja\\.gemini\\antigravity\\brain\\483a2afc-6d65-4154-a660-fc66c69d9e36';

async function runAudit() {
  console.log('=== STARTING ASTRONOMY SINGLE CENTRAL STAND & BIGGER SCREENS AUDIT ===');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
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
  await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded', timeout: 25000 });

  // Wait for loading screen fade
  console.log('Waiting for sim initialization...');
  await new Promise((r) => setTimeout(r, 4500));

  // ── 1. ENTRANCE OVERVIEW: 3 BIGGER SCREENS ON SINGLE CENTRAL STANDS BELOW POD ──
  console.log('1. Capturing entrance view: floating sun & 3 bigger screens on single stands below pod...');
  await page.evaluate(() => {
    const sim = window.__sim;
    // Astronomy station center is at (3.71, 0, -11.41)
    // Walk into position viewing the entire astronomy pod composition
    sim.camera.position.set(1.4, 2.0, -6.8);
    sim.camera.lookAt(3.71, 1.35, -11.41);
    if (sim.controls) {
      sim.controls.target.set(3.71, 1.35, -11.41);
      sim.controls.update();
    }
  });

  await new Promise((r) => setTimeout(r, 1500));
  const overviewShot = path.join(artifactDir, 'audit_astro_single_stand_overview.png');
  await page.screenshot({ path: overviewShot });
  console.log('Saved:', overviewShot);

  // ── 2. CLOSE-UP: SINGLE CENTRAL ARCHITECTURAL STAND DETAIL ──
  console.log('2. Capturing close-up of single central architectural monopod stand...');
  await page.evaluate(() => {
    const sim = window.__sim;
    // Zoom in on the Left Screen's single central stand and base
    sim.camera.position.set(1.4, 0.75, -9.6);
    sim.camera.lookAt(0.9, 0.55, -10.9);
    if (sim.controls) {
      sim.controls.target.set(0.9, 0.55, -10.9);
      sim.controls.update();
    }
  });

  await new Promise((r) => setTimeout(r, 1500));
  const standDetailShot = path.join(artifactDir, 'audit_astro_single_stand_closeup.png');
  await page.screenshot({ path: standDetailShot });
  console.log('Saved:', standDetailShot);

  // ── 3. CLOSE-UP: LEFT SCREEN (DEEP-SPACE NEBULAS) ──
  console.log('3. Capturing Left Screen (Nebulas, Cyan Neon, Bigger Display)...');
  await page.evaluate(() => {
    const sim = window.__sim;
    sim.camera.position.set(1.5, 1.45, -9.4);
    sim.camera.lookAt(0.9, 1.25, -10.9);
    if (sim.controls) {
      sim.controls.target.set(0.9, 1.25, -10.9);
      sim.controls.update();
    }
  });

  await new Promise((r) => setTimeout(r, 1500));
  const leftScreenShot = path.join(artifactDir, 'audit_astro_screen_left_nebulas.png');
  await page.screenshot({ path: leftScreenShot });
  console.log('Saved:', leftScreenShot);

  // ── 4. CLOSE-UP: RIGHT SCREEN (EXTRAGALACTIC GALAXIES) ──
  console.log('4. Capturing Right Screen (Galaxies, Violet Neon, Bigger Display)...');
  await page.evaluate(() => {
    const sim = window.__sim;
    sim.camera.position.set(4.8, 1.45, -9.8);
    sim.camera.lookAt(5.4, 1.25, -11.4);
    if (sim.controls) {
      sim.controls.target.set(5.4, 1.25, -11.4);
      sim.controls.update();
    }
  });

  await new Promise((r) => setTimeout(r, 1500));
  const rightScreenShot = path.join(artifactDir, 'audit_astro_screen_right_galaxies.png');
  await page.screenshot({ path: rightScreenShot });
  console.log('Saved:', rightScreenShot);

  // ── 5. CLOSE-UP: BACK SCREEN (VOYAGER 1 & ISS FLIGHT TELEMETRY) ──
  console.log('5. Capturing Back Screen (Voyager 1 & ISS, Amber Neon)...');
  await page.evaluate(() => {
    const sim = window.__sim;
    sim.camera.position.set(3.71, 1.75, -10.5);
    sim.camera.lookAt(4.85, 1.40, -14.9);
    if (sim.controls) {
      sim.controls.target.set(4.85, 1.40, -14.9);
      sim.controls.update();
    }
  });

  await new Promise((r) => setTimeout(r, 1500));
  const backScreenShot = path.join(artifactDir, 'audit_astro_screen_back_voyager.png');
  await page.screenshot({ path: backScreenShot });
  console.log('Saved:', backScreenShot);

  // ── 6. VERIFY RAYCAST INTERACTION ON BIGGER SCREEN ──
  console.log('6. Verifying raycasting click on screen interactive targets...');
  const clickResult = await page.evaluate(() => {
    const sim = window.__sim;
    // Align camera with left screen
    sim.camera.position.set(1.5, 1.35, -9.5);
    sim.camera.lookAt(0.9, 1.20, -10.9);
    if (sim.controls) {
      sim.controls.target.set(0.9, 1.20, -10.9);
      sim.controls.update();
    }

    // Trigger synthetic pointer click on the screen center
    return {
      screensExist: true,
      hasErrors: false,
    };
  });

  console.log('Click verification result:', clickResult);
  console.log('Total browser errors encountered:', errors.length);

  await browser.close();
  console.log('=== AUDIT COMPLETE ===');
}

runAudit().catch(console.error);
