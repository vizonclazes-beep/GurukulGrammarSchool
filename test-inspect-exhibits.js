// test-inspect-exhibits.js — Detailed visual verification of scientist exhibits closeup
import puppeteer from 'puppeteer-core';
import fs from 'fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\sanja\\.gemini\\antigravity\\brain\\483a2afc-6d65-4154-a660-fc66c69d9e36';

async function run() {
  console.log('--- STARTING EXHIBIT CLOSEUP AUDIT ---');
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
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded', timeout: 15000 });

  // Wait for loading screen fade and images to paint
  await new Promise((r) => setTimeout(r, 3000));

  // 1. Frame Dr. A.P.J. Abdul Kalam Exhibit Closeup
  console.log('Framing Dr. A.P.J. Abdul Kalam exhibit...');
  await page.evaluate(() => {
    if (window.__sim && window.__sim.camera && window.__sim.controls) {
      const midAngle = Math.PI / 24;
      const R = 17.94;
      const targetX = Math.cos(midAngle) * R;
      const targetZ = Math.sin(midAngle) * R;

      window.__sim.camera.position.set(Math.cos(midAngle) * 14.4, 3.4, Math.sin(midAngle) * 14.4);
      window.__sim.controls.target.set(targetX, 3.4, targetZ);
      window.__sim.camera.lookAt(targetX, 3.4, targetZ);
      window.__sim.controls.update();
    }
  });

  await new Promise((r) => setTimeout(r, 1200));
  const kalamPath = 'G:\\Vizon Website\\Sim\\public\\audit_kalam_exhibit_closeup.png';
  await page.screenshot({ path: kalamPath });
  fs.copyFileSync(kalamPath, `${artifactDir}\\audit_kalam_exhibit_closeup.png`);
  console.log('✓ Captured Kalam Exhibit: public/audit_kalam_exhibit_closeup.png');

  // 2. Advance carousel to Slide 2
  console.log('Clicking to advance carousel on Dr. Kalam exhibit...');
  await page.evaluate(() => {
    const exhibitsGroup = window.__sim.scene.getObjectByName('ScientistMuseumExhibits');
    // Find first exhibit and cycle its slide
    if (window.__sim && window.__sim.scene) {
      window.__sim.scene.traverse((obj) => {
        if (obj.isMesh && obj.material && obj.material.map && obj.material.map.isCanvasTexture) {
          // Trigger mouse click at center of screen
        }
      });
    }
    // Simulate mouse click on the screen to trigger pointerdown listener
    const evt = new MouseEvent('pointerdown', {
      clientX: window.innerWidth / 2 + 100,
      clientY: window.innerHeight / 2,
      button: 0,
      bubbles: true,
    });
    window.dispatchEvent(evt);
  });

  await new Promise((r) => setTimeout(r, 800));
  const kalamSlide2Path = 'G:\\Vizon Website\\Sim\\public\\audit_kalam_slide2.png';
  await page.screenshot({ path: kalamSlide2Path });
  fs.copyFileSync(kalamSlide2Path, `${artifactDir}\\audit_kalam_slide2.png`);
  console.log('✓ Captured Kalam Slide 2: public/audit_kalam_slide2.png');

  // 3. Frame Dr. S. Radhakrishnan Exhibit Closeup
  console.log('Framing Dr. S. Radhakrishnan exhibit...');
  await page.evaluate(() => {
    if (window.__sim && window.__sim.camera && window.__sim.controls) {
      const midAngle = (5 * Math.PI) / 24;
      const R = 17.94;
      const targetX = Math.cos(midAngle) * R;
      const targetZ = Math.sin(midAngle) * R;

      window.__sim.camera.position.set(Math.cos(midAngle) * 14.4, 3.4, Math.sin(midAngle) * 14.4);
      window.__sim.controls.target.set(targetX, 3.4, targetZ);
      window.__sim.camera.lookAt(targetX, 3.4, targetZ);
      window.__sim.controls.update();
    }
  });

  await new Promise((r) => setTimeout(r, 1200));
  const radhaPath = 'G:\\Vizon Website\\Sim\\public\\audit_radhakrishnan_exhibit_closeup.png';
  await page.screenshot({ path: radhaPath });
  fs.copyFileSync(radhaPath, `${artifactDir}\\audit_radhakrishnan_exhibit_closeup.png`);
  console.log('✓ Captured Radhakrishnan Exhibit: public/audit_radhakrishnan_exhibit_closeup.png');

  // 4. Also capture wall perspective from center spawn
  console.log('Capturing atrium wide angle showing multiple wall exhibits...');
  await page.evaluate(() => {
    if (window.__sim && window.__sim.camera && window.__sim.controls) {
      window.__sim.camera.position.set(0, 3.8, 4.5);
      window.__sim.controls.target.set(12, 3.4, 8);
      window.__sim.camera.lookAt(12, 3.4, 8);
      window.__sim.controls.update();
    }
  });

  await new Promise((r) => setTimeout(r, 1000));
  const widePath = 'G:\\Vizon Website\\Sim\\public\\audit_wall_exhibits_wide.png';
  await page.screenshot({ path: widePath });
  fs.copyFileSync(widePath, `${artifactDir}\\audit_wall_exhibits_wide.png`);
  console.log('✓ Captured Wall Exhibits Wide: public/audit_wall_exhibits_wide.png');

  await browser.close();
  console.log('--- EXHIBIT CLOSEUP AUDIT COMPLETE ---');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
