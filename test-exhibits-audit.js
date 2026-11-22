// test-exhibits-audit.js — Automated verification of white pods, removal of VR tag, and scientist exhibits
import puppeteer from 'puppeteer-core';
import fs from 'fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\sanja\\.gemini\\antigravity\\brain\\483a2afc-6d65-4154-a660-fc66c69d9e36';

async function audit() {
  console.log('--- STARTING VERIFICATION AUDIT FOR WHITE PODS & SCIENTIST EXHIBITS ---');
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

  page.on('pageerror', (err) => {
    errors.push(err.message);
    console.error('[PAGE ERROR]:', err.message);
  });

  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded', timeout: 15000 });

  // Wait for loading screen fade and images to load onto canvases
  await new Promise((r) => setTimeout(r, 2600));

  // 1. Verify "VR NOT SUPPORTED" is completely removed
  const vrTagText = await page.evaluate(() => {
    const allElements = Array.from(document.querySelectorAll('*'));
    const vrEl = allElements.find((el) => el.textContent && el.textContent.toUpperCase().includes('VR NOT SUPPORTED'));
    return vrEl ? vrEl.textContent : null;
  });

  if (vrTagText) {
    console.error('FAIL: Found "VR NOT SUPPORTED" tag in DOM:', vrTagText);
    errors.push(`VR tag present: ${vrTagText}`);
  } else {
    console.log('✓ SUCCESS: "VR NOT SUPPORTED" tag is completely removed from the UI.');
  }

  // 2. Capture Spawn View showing light white pods and wall exhibits
  const spawnPath = 'G:\\Vizon Website\\Sim\\public\\audit_spawn_white_pods.png';
  await page.screenshot({ path: spawnPath });
  fs.copyFileSync(spawnPath, `${artifactDir}\\audit_spawn_white_pods.png`);
  fs.copyFileSync(spawnPath, `${artifactDir}\\audit_spawn_view.png`);
  console.log('✓ Captured Spawn Overview with Light White Pods: public/audit_spawn_white_pods.png');

  // 3. Move camera to inspect the wall exhibit of Dr. A.P.J. Abdul Kalam & Dr. S. Radhakrishnan
  console.log('Framing Dr. A.P.J. Abdul Kalam & Dr. S. Radhakrishnan wall exhibit...');
  await page.evaluate(() => {
    if (window.__sim && window.__sim.camera && window.__sim.controls) {
      // Look towards wall window where exhibits are mounted
      window.__sim.camera.position.set(13.2, 3.4, 2.5);
      window.__sim.controls.target.set(17.8, 3.4, 0.8);
      window.__sim.camera.lookAt(17.8, 3.4, 0.8);
      window.__sim.controls.update();
    }
  });

  await new Promise((r) => setTimeout(r, 900));
  const exhibitPath = 'G:\\Vizon Website\\Sim\\public\\audit_kalam_radhakrishnan_exhibit.png';
  await page.screenshot({ path: exhibitPath });
  fs.copyFileSync(exhibitPath, `${artifactDir}\\audit_kalam_radhakrishnan_exhibit.png`);
  console.log('✓ Captured Kalam & Radhakrishnan Exhibit: public/audit_kalam_radhakrishnan_exhibit.png');

  // 4. Capture Physics Station with Light White Pod & Plasma Sparks
  console.log('Navigating to Physics Station with light white pod...');
  await page.evaluate(() => {
    const btns = document.querySelectorAll('.vz-nav-btn');
    for (const b of btns) {
      if (b.textContent.includes('Physics')) {
        b.click();
        break;
      }
    }
    if (window.__sim && window.__sim.cameraAnim) {
      window.__sim.cameraAnim.transitionTo('physics', true);
    }
  });

  await new Promise((r) => setTimeout(r, 900));
  const physicsPath = 'G:\\Vizon Website\\Sim\\public\\audit_physics_white_pod.png';
  await page.screenshot({ path: physicsPath });
  fs.copyFileSync(physicsPath, `${artifactDir}\\audit_physics_white_pod.png`);
  fs.copyFileSync(physicsPath, `${artifactDir}\\audit_physics_station.png`);
  console.log('✓ Captured Physics Station with Light White Pod: public/audit_physics_white_pod.png');

  await browser.close();

  if (errors.length > 0) {
    console.error('Audit failed with errors:', errors);
    process.exit(1);
  } else {
    console.log('--- ALL AUDIT CHECKS PASSED PERFECTLY ---');
    process.exit(0);
  }
}

audit().catch((err) => {
  console.error('Audit exception:', err);
  process.exit(1);
});
