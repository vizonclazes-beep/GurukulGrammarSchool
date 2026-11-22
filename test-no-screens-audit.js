import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\sanja\\.gemini\\antigravity\\brain\\483a2afc-6d65-4154-a660-fc66c69d9e36';

async function runAudit() {
  console.log('=== STARTING NO SCREENS AUDIT (APART FROM ASTRO POD) ===');
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

  console.log('Waiting for sim initialization...');
  await new Promise((r) => setTimeout(r, 4500));

  // 1. Physics Pod (No screens, clean deck with Tesla coils & plasma sphere)
  console.log('1. Capturing Physics Pod (confirming 0 screens)...');
  await page.evaluate(() => {
    const sim = window.__sim;
    // Physics station is at stationPosition('physics')
    // Angle = 2 * PI / 5 = 1.2566 rad -> x = 12 * sin(1.2566) = 11.41, z = 12 * cos(1.2566) = 3.71
    sim.camera.position.set(7.5, 2.2, 2.2);
    sim.camera.lookAt(11.41, 1.8, 3.71);
    if (sim.controls) {
      sim.controls.target.set(11.41, 1.8, 3.71);
      sim.controls.update();
    }
  });
  await new Promise((r) => setTimeout(r, 1500));
  const physicsShot = path.join(artifactDir, 'audit_physics_pod_no_screens.png');
  await page.screenshot({ path: physicsShot });
  console.log('Saved:', physicsShot);

  // 2. Biology Pod (No screens, clean deck with plant chamber & 3D cell)
  console.log('2. Capturing Biology Pod (confirming 0 screens on deck)...');
  await page.evaluate(() => {
    const sim = window.__sim;
    sim.camera.position.set(-6.2, 2.3, 4.2);
    sim.camera.lookAt(-9.71, 1.8, 7.05);
    if (sim.controls) {
      sim.controls.target.set(-9.71, 1.8, 7.05);
      sim.controls.update();
    }
  });
  await new Promise((r) => setTimeout(r, 1500));
  const bioShot = path.join(artifactDir, 'audit_biology_pod_no_screens.png');
  await page.screenshot({ path: bioShot });
  console.log('Saved:', bioShot);

  // 3. Astronomy Pod (Screen preserved hanging from roof)
  console.log('3. Capturing Astronomy Pod (confirming single hanging curved screen preserved)...');
  await page.evaluate(() => {
    const sim = window.__sim;
    sim.camera.position.set(1.4, 2.0, -6.8);
    sim.camera.lookAt(3.71, 1.45, -11.41);
    if (sim.controls) {
      sim.controls.target.set(3.71, 1.45, -11.41);
      sim.controls.update();
    }
  });
  await new Promise((r) => setTimeout(r, 1500));
  const astroShot = path.join(artifactDir, 'audit_astro_pod_screen_preserved.png');
  await page.screenshot({ path: astroShot });
  console.log('Saved:', astroShot);

  console.log('Total browser errors encountered:', errors.length);
  await browser.close();
  console.log('=== AUDIT COMPLETE ===');
}

runAudit().catch(console.error);
