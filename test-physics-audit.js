// test-physics-audit.js — Targeted high-resolution audit of the Physics plasma spark system
import puppeteer from 'puppeteer-core';
import fs from 'fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\sanja\\.gemini\\antigravity\\brain\\483a2afc-6d65-4154-a660-fc66c69d9e36';

async function auditPhysics() {
  console.log('--- AUDITING REALISTIC PLASMA DISCHARGE SPARKS ---');
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

  // Wait for loading screen fade
  await new Promise((r) => setTimeout(r, 2200));

  // Navigate directly to Physics Station
  console.log('Navigating camera to Physics Station...');
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

  await new Promise((r) => setTimeout(r, 800));

  // 1. Capture Ambient Multi-Filament Plasma Discharge
  const ambientPath = 'G:\\Vizon Website\\Sim\\public\\audit_physics_sparks_ambient.png';
  await page.screenshot({ path: ambientPath });
  fs.copyFileSync(ambientPath, `${artifactDir}\\audit_physics_sparks_ambient.png`);
  fs.copyFileSync(ambientPath, `${artifactDir}\\audit_physics_station.png`);
  fs.copyFileSync(ambientPath, 'G:\\Vizon Website\\Sim\\public\\audit_physics_station.png');
  console.log('✓ Captured Ambient Plasma Sparks: public/audit_physics_sparks_ambient.png');

  // 2. Move pointer onto the plasma ball to trigger interactive pointer attraction
  console.log('Moving cursor over plasma ball to test pointer attraction...');
  // The center of the screen at 1920x1080 corresponds to the plasma ball in physics view
  await page.mouse.move(960, 520);
  await new Promise((r) => setTimeout(r, 600));

  const interactivePath = 'G:\\Vizon Website\\Sim\\public\\audit_physics_sparks_interactive.png';
  await page.screenshot({ path: interactivePath });
  fs.copyFileSync(interactivePath, `${artifactDir}\\audit_physics_sparks_interactive.png`);
  console.log('✓ Captured Interactive Plasma Sparks: public/audit_physics_sparks_interactive.png');

  await browser.close();

  if (errors.length > 0) {
    console.error('Audit failed with errors:', errors);
    process.exit(1);
  } else {
    console.log('SUCCESS: Plasma sparks render with zero console or shader errors!');
    process.exit(0);
  }
}

auditPhysics().catch((err) => {
  console.error('Audit exception:', err);
  process.exit(1);
});
