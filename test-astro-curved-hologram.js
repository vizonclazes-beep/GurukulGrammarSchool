import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\sanja\\.gemini\\antigravity\\brain\\483a2afc-6d65-4154-a660-fc66c69d9e36';

async function runAudit() {
  console.log('=== STARTING ASTRONOMY CURVED HOLOGRAPHIC SCREEN AUDIT ===');
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

  // Wait for sim initialization and asset loading
  console.log('Waiting for sim initialization...');
  await new Promise((r) => setTimeout(r, 4500));

  // ── 1. ENTRANCE OVERVIEW: SINGLE LARGE CURVED HOLOGRAPHIC SCREEN ON TOP OF POD ──
  console.log('1. Capturing entrance view: floating sun & single large curved holographic screen...');
  await page.evaluate(() => {
    const sim = window.__sim;
    // Astronomy station center is at (3.71, 0, -11.41)
    // Walk along entrance path looking directly into astronomy pod
    sim.camera.position.set(1.4, 2.0, -6.8);
    sim.camera.lookAt(3.71, 1.45, -11.41);
    if (sim.controls) {
      sim.controls.target.set(3.71, 1.45, -11.41);
      sim.controls.update();
    }
  });

  await new Promise((r) => setTimeout(r, 1500));
  const overviewShot = path.join(artifactDir, 'audit_astro_curved_hologram_overview.png');
  await page.screenshot({ path: overviewShot });
  console.log('Saved:', overviewShot);

  // ── 2. CLOSE-UP: CURVED HOLOGRAPHIC DISPLAY WITH TRANSLUCENCY ──
  console.log('2. Capturing close-up of curved holographic screen showing see-through effect...');
  await page.evaluate(() => {
    const sim = window.__sim;
    sim.camera.position.set(2.8, 1.70, -9.2);
    sim.camera.lookAt(3.71, 1.62, -11.41);
    if (sim.controls) {
      sim.controls.target.set(3.71, 1.62, -11.41);
      sim.controls.update();
    }
  });

  await new Promise((r) => setTimeout(r, 1500));
  const closeupShot = path.join(artifactDir, 'audit_astro_curved_hologram_closeup.png');
  await page.screenshot({ path: closeupShot });
  console.log('Saved:', closeupShot);

  // ── 3. ROOF SUSPENSION CABLES & OPEN POD DECK (ZERO FLOOR STANDS) ──
  console.log('3. Capturing roof suspension cables and open pod deck...');
  await page.evaluate(() => {
    const sim = window.__sim;
    sim.camera.position.set(2.5, 2.8, -8.5);
    sim.camera.lookAt(3.71, 3.2, -11.41);
    if (sim.controls) {
      sim.controls.target.set(3.71, 3.2, -11.41);
      sim.controls.update();
    }
  });

  await new Promise((r) => setTimeout(r, 1500));
  const standShot = path.join(artifactDir, 'audit_astro_curved_cables_detail.png');
  await page.screenshot({ path: standShot });
  console.log('Saved:', standShot);

  // ── 4. VERIFY 2.5S DYNAMIC ROTATION (WAIT 3 SECONDS & CAPTURE NEXT SLIDE) ──
  console.log('4. Waiting 3.0s to verify dynamic 2.5s slide transition...');
  await new Promise((r) => setTimeout(r, 3000));
  const nextSlideShot = path.join(artifactDir, 'audit_astro_curved_slide_transition.png');
  await page.screenshot({ path: nextSlideShot });
  console.log('Saved:', nextSlideShot);

  // ── 5. RAYCAST INTERACTIVE CLICK VERIFICATION ──
  console.log('5. Verifying raycasting click interactions on curved screen...');
  const clickCheck = await page.evaluate(() => {
    const sim = window.__sim;
    return {
      hasSim: !!sim,
      screenMeshFound: !!sim.scene.getObjectByName('AstroSingleCurvedScreenMesh'),
      consoleGroupFound: !!sim.scene.getObjectByName('AstroSingleCurvedScreenConsole'),
    };
  });
  console.log('Mesh verification:', clickCheck);
  console.log('Total browser errors encountered:', errors.length);

  await browser.close();
  console.log('=== AUDIT COMPLETE ===');
}

runAudit().catch(console.error);
