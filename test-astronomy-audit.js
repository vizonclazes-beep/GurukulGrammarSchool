// test-astronomy-audit.js — Final Verification of 3 Screens, Sunspots & Flares, and Celestial Telemetry
import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\sanja\\.gemini\\antigravity\\brain\\483a2afc-6d65-4154-a660-fc66c69d9e36';

async function audit() {
  console.log('=== STARTING FINAL ASTRONOMY POD VERIFICATION AUDIT ===');
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
  await new Promise((r) => setTimeout(r, 3500));

  console.log('1. Flying camera directly to Astronomy Observation Station...');
  await page.evaluate(() => {
    const sim = window.__sim;
    if (sim && sim.cameraAnim) {
      sim.cameraAnim.transitionTo('astronomy', true);
    }
  });

  await new Promise((r) => setTimeout(r, 1500));
  const astroPodShot = path.join(artifactDir, 'audit_astronomy_pod_overview.png');
  await page.screenshot({ path: astroPodShot });
  console.log('Saved:', astroPodShot);

  console.log('2. Framing Floating Screen 1: Nebulas (Carina / Pillars of Creation)...');
  await page.evaluate(() => {
    const sim = window.__sim;
    const ax = 3.7082;
    const az = -11.4127;
    const ay = 3.4;

    const ang = -0.72;
    const r = 2.95;
    const sx = ax + Math.sin(ang) * r;
    const sz = az + Math.cos(ang) * r;
    const sy = ay + 0.28;

    sim.controls.target.set(sx, sy, sz);
    // Camera inside station looking at concave display face
    sim.camera.position.set(ax + Math.sin(ang) * 1.2, sy - 0.05, az + Math.cos(ang) * 1.2);
    sim.camera.lookAt(sx, sy, sz);
    sim.controls.update();
  });
  await new Promise((r) => setTimeout(r, 1500));
  const screenNebulaShot = path.join(artifactDir, 'audit_screen_nebulas.png');
  await page.screenshot({ path: screenNebulaShot });
  console.log('Saved:', screenNebulaShot);

  console.log('3. Framing Floating Screen 2: Center Space Missions (Voyager 1 & ISS in Space)...');
  await page.evaluate(() => {
    const sim = window.__sim;
    const ax = 3.7082;
    const az = -11.4127;
    const ay = 3.4;

    const ang = 0.0;
    const r = 2.95;
    const sx = ax + Math.sin(ang) * r;
    const sz = az + Math.cos(ang) * r;
    const sy = ay + 0.52;

    sim.controls.target.set(sx, sy, sz);
    sim.camera.position.set(ax + Math.sin(ang) * 1.2, sy - 0.05, az + Math.cos(ang) * 1.2);
    sim.camera.lookAt(sx, sy, sz);
    sim.controls.update();
  });
  await new Promise((r) => setTimeout(r, 1500));
  const screenMissionsShot = path.join(artifactDir, 'audit_screen_voyager_iss.png');
  await page.screenshot({ path: screenMissionsShot });
  console.log('Saved:', screenMissionsShot);

  console.log('4. Framing Floating Screen 3: Galaxies (Andromeda / Whirlpool / Sombrero)...');
  await page.evaluate(() => {
    const sim = window.__sim;
    const ax = 3.7082;
    const az = -11.4127;
    const ay = 3.4;

    const ang = 0.72;
    const r = 2.95;
    const sx = ax + Math.sin(ang) * r;
    const sz = az + Math.cos(ang) * r;
    const sy = ay + 0.28;

    sim.controls.target.set(sx, sy, sz);
    sim.camera.position.set(ax + Math.sin(ang) * 1.2, sy - 0.05, az + Math.cos(ang) * 1.2);
    sim.camera.lookAt(sx, sy, sz);
    sim.controls.update();
  });
  await new Promise((r) => setTimeout(r, 1500));
  const screenGalaxyShot = path.join(artifactDir, 'audit_screen_galaxies.png');
  await page.screenshot({ path: screenGalaxyShot });
  console.log('Saved:', screenGalaxyShot);

  console.log('5. Framing Closeup of Sun (Granulation, Sunspots & Coronal Prominence Arches)...');
  await page.evaluate(() => {
    const sim = window.__sim;
    const ax = 3.7082;
    const az = -11.4127;
    const ay = 3.4;

    sim.controls.target.set(ax, ay, az);
    sim.camera.position.set(ax + 0.45, ay + 0.2, az + 0.55);
    sim.camera.lookAt(ax, ay, az);
    sim.controls.update();
  });
  await new Promise((r) => setTimeout(r, 1500));
  const sunCloseupShot = path.join(artifactDir, 'audit_sun_sunspots_flares.png');
  await page.screenshot({ path: sunCloseupShot });
  console.log('Saved:', sunCloseupShot);

  console.log('6. Interacting: Selecting Sun to trigger 3D Telemetry Card & HUD Drawer...');
  await page.evaluate(() => {
    const sim = window.__sim;
    if (sim && sim.astroCtx && sim.astroCtx.selectCelestialBody) {
      sim.astroCtx.selectCelestialBody('Sun');
    }
    const ax = 3.7082;
    const az = -11.4127;
    const ay = 3.4;
    sim.controls.target.set(ax + 0.4, ay + 0.2, az);
    sim.camera.position.set(ax + 0.4, ay + 0.3, az + 1.8);
    sim.camera.lookAt(ax + 0.4, ay + 0.2, az);
    sim.controls.update();
  });
  await new Promise((r) => setTimeout(r, 1500));
  const sunTelemetryShot = path.join(artifactDir, 'audit_sun_telemetry_card.png');
  await page.screenshot({ path: sunTelemetryShot });
  console.log('Saved:', sunTelemetryShot);

  console.log('7. Interacting: Selecting Saturn to test planetary telemetry...');
  await page.evaluate(() => {
    const sim = window.__sim;
    if (sim && sim.astroCtx && sim.astroCtx.selectCelestialBody) {
      sim.astroCtx.selectCelestialBody('Saturn');
    }
  });
  await new Promise((r) => setTimeout(r, 1500));
  const saturnTelemetryShot = path.join(artifactDir, 'audit_saturn_telemetry_card.png');
  await page.screenshot({ path: saturnTelemetryShot });
  console.log('Saved:', saturnTelemetryShot);

  console.log('All audits completed successfully!');
  await browser.close();
}

audit().catch((err) => {
  console.error('Audit failed:', err);
  process.exit(1);
});
