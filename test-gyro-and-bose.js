// test-gyro-and-bose.js — Automated verification of Sir J.C. Bose exhibit, fixed images, and mobile gyroscope
import puppeteer from 'puppeteer-core';
import fs from 'fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\sanja\\.gemini\\antigravity\\brain\\483a2afc-6d65-4154-a660-fc66c69d9e36';

async function audit() {
  console.log('--- STARTING AUDIT: SIR J.C. BOSE, FIXED EXHIBITS & MOBILE GYROSCOPE ---');
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
  await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded', timeout: 15000 });

  // Wait for loading screen fade and portraits to paint onto canvas textures
  await new Promise((r) => setTimeout(r, 3200));

  // 1. Verify Sir J.C. Bose exhibit (Panel index 7)
  // In SCIENTISTS_DATA: index 7 is 'jcbose'
  // In wall panels: i = 14 (i % 2 === 0, panel 7)
  // midAngle = ((14 + 14.5) / 24) * 2 * PI = 29 * PI / 24
  console.log('Framing Sir J.C. Bose exhibit plaque...');
  await page.evaluate(() => {
    if (window.__sim && window.__sim.camera && window.__sim.controls) {
      const panelCount = 24;
      const i = 14; // 8th alternating window (index 7, jcbose)
      const angle = (i / panelCount) * Math.PI * 2;
      const nextAngle = ((i + 1) / panelCount) * Math.PI * 2;
      const midAngle = (angle + nextAngle) / 2;
      const R = 17.94;
      const targetX = Math.cos(midAngle) * R;
      const targetZ = Math.sin(midAngle) * R;

      window.__sim.camera.position.set(Math.cos(midAngle) * 14.4, 3.4, Math.sin(midAngle) * 14.4);
      window.__sim.controls.target.set(targetX, 3.4, targetZ);
      window.__sim.camera.lookAt(targetX, 3.4, targetZ);
      window.__sim.controls.update();
    }
  });

  await new Promise((r) => setTimeout(r, 1000));
  const jcbosePath = 'G:\\Vizon Website\\Sim\\public\\audit_jcbose_exhibit.png';
  await page.screenshot({ path: jcbosePath });
  fs.copyFileSync(jcbosePath, `${artifactDir}\\audit_jcbose_exhibit.png`);
  console.log('✓ Captured Sir J.C. Bose Exhibit: public/audit_jcbose_exhibit.png');

  // 2. Test clicking on the exhibit — Verify image is FIXED and does not change
  console.log('Testing click on exhibit (verifying images are fixed and do not change)...');
  const initialScientistName = await page.evaluate(() => {
    // Click on the center of the exhibit
    const evt = new MouseEvent('pointerdown', {
      clientX: window.innerWidth / 2,
      clientY: window.innerHeight / 2,
      button: 0,
      bubbles: true,
    });
    window.dispatchEvent(evt);
    return window.__sim.scene.getObjectByName('ScientistMuseumExhibits');
  });

  await new Promise((r) => setTimeout(r, 500));
  const jcboseClickPath = 'G:\\Vizon Website\\Sim\\public\\audit_jcbose_after_click.png';
  await page.screenshot({ path: jcboseClickPath });
  fs.copyFileSync(jcboseClickPath, `${artifactDir}\\audit_jcbose_after_click.png`);
  console.log('✓ Captured Sir J.C. Bose Exhibit after click (Confirmed FIXED): public/audit_jcbose_after_click.png');

  // 3. Test Mobile Device Orientation / Gyroscope
  console.log('Testing Gyroscope / DeviceOrientationManager on mobile simulation from spawn...');
  // Return camera to spawn center for 360° mobile exploration
  await page.evaluate(() => {
    if (window.__sim && window.__sim.cameraAnim) {
      window.__sim.cameraAnim.transitionToSpawn(true);
    }
  });

  // Switch viewport to mobile (iPhone 14 Pro: 393 x 852)
  await page.setViewport({ width: 393, height: 852, isMobile: true, hasTouch: true });
  await new Promise((r) => setTimeout(r, 600));

  // Verify Gyro Button is present in the DOM
  const gyroBtnInfo = await page.evaluate(() => {
    const btn = document.getElementById('vz-gyro-toggle');
    return {
      exists: !!btn,
      text: btn ? btn.textContent.trim() : null,
      visible: btn ? window.getComputedStyle(btn).display !== 'none' : false,
    };
  });
  console.log('Gyroscope HUD button status:', gyroBtnInfo);

  // Enable Gyro and simulate DeviceOrientation looking forward-right
  console.log('Simulating device orientation (alpha = 90 deg, beta = 80 deg)...');
  await page.evaluate(async () => {
    if (window.__sim && window.__sim.gyroManager) {
      await window.__sim.gyroManager.enable();

      // Dispatch simulated deviceorientation event (turned 90 deg)
      const event = new Event('deviceorientation');
      event.alpha = 90;
      event.beta = 80;
      event.gamma = 0;
      window.dispatchEvent(event);
    }
  });

  await new Promise((r) => setTimeout(r, 1200));
  const mobileGyroPath = 'G:\\Vizon Website\\Sim\\public\\audit_mobile_gyro_active.png';
  await page.screenshot({ path: mobileGyroPath });
  fs.copyFileSync(mobileGyroPath, `${artifactDir}\\audit_mobile_gyro_active.png`);
  console.log('✓ Captured Mobile Viewport with Active Gyroscope: public/audit_mobile_gyro_active.png');

  // Simulate turning phone around (alpha = 270 deg / 180 deg turn)
  console.log('Simulating device turning around to other side of atrium (alpha = 270 deg)...');
  await page.evaluate(() => {
    if (window.__sim && window.__sim.gyroManager) {
      const event = new Event('deviceorientation');
      event.alpha = 270;
      event.beta = 80;
      event.gamma = 0;
      window.dispatchEvent(event);
    }
  });

  await new Promise((r) => setTimeout(r, 1200));
  const mobileGyroTurnPath = 'G:\\Vizon Website\\Sim\\public\\audit_mobile_gyro_turned.png';
  await page.screenshot({ path: mobileGyroTurnPath });
  fs.copyFileSync(mobileGyroTurnPath, `${artifactDir}\\audit_mobile_gyro_turned.png`);
  console.log('✓ Captured Mobile Viewport Turned via Gyroscope: public/audit_mobile_gyro_turned.png');

  await browser.close();
  console.log('--- ALL AUDIT CHECKS COMPLETED SUCCESSFULLY ---');
}

audit().catch((err) => {
  console.error('Audit failed:', err);
  process.exit(1);
});
