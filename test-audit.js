// test-audit.js — Automated headless browser verification & console audit
import puppeteer from 'puppeteer-core';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function audit() {
  console.log('--- STARTING VIZON SYSTEM SELF-AUDIT ---');
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
  const consoleLogs = [];
  const errors = [];

  page.on('console', (msg) => {
    const text = msg.text();
    consoleLogs.push({ type: msg.type(), text });
    if (msg.type() === 'error') {
      errors.push(text);
      console.error('[BROWSER ERROR]:', text);
    } else {
      console.log(`[BROWSER ${msg.type().toUpperCase()}]:`, text);
    }
  });

  page.on('pageerror', (err) => {
    errors.push(err.message);
    console.error('[PAGE ERROR]:', err.message);
  });

  // 1. Audit Desktop Viewport (1920x1080)
  console.log('Testing Desktop Viewport (1920x1080)...');
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded', timeout: 15000 });

  // Wait for loading screen fade
  await new Promise((r) => setTimeout(r, 2000));

  const artifactDir = 'C:\\Users\\sanja\\.gemini\\antigravity\\brain\\483a2afc-6d65-4154-a660-fc66c69d9e36';

  await page.screenshot({ path: 'G:\\Vizon Website\\Sim\\public\\audit_spawn_view.png' });
  await page.screenshot({ path: `${artifactDir}\\audit_spawn_view.png` });
  console.log('✓ Spawn overview captured: public/audit_spawn_view.png');

  // Verify WebGL Canvas is active
  const canvasExists = await page.evaluate(() => {
    const canvas = document.querySelector('canvas');
    return canvas !== null && canvas.width > 0 && canvas.height > 0;
  });
  console.log('✓ WebGL Canvas active:', canvasExists);

  // Look up at ceiling dome & coffered ribs
  console.log('Capturing Ceiling Dome & Vaulted Ribs view...');
  await page.evaluate(() => {
    if (window.__sim && window.__sim.camera && window.__sim.controls) {
      window.__sim.camera.position.set(0, 2.0, 1.0);
      window.__sim.controls.target.set(0, 11.5, 0);
      window.__sim.camera.lookAt(0, 11.5, 0);
      window.__sim.controls.update();
    }
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: 'G:\\Vizon Website\\Sim\\public\\audit_ceiling_dome.png' });
  await page.screenshot({ path: `${artifactDir}\\audit_ceiling_dome.png` });
  console.log('✓ Ceiling Dome view captured: public/audit_ceiling_dome.png');

  // Helper to transition camera and capture
  async function visitStation(name, filename) {
    console.log(`Navigating to ${name} Station...`);
    const keyMap = {
      Physics: 'physics',
      Chemistry: 'chemistry',
      Biology: 'biology',
      Mathematics: 'mathematics',
      Astronomy: 'astronomy',
    };
    const key = keyMap[name];

    await page.evaluate((targetKey, btnName) => {
      // Click UI button to highlight HUD tab & open panel
      const btns = document.querySelectorAll('.vz-nav-btn');
      for (const b of btns) {
        if (b.textContent.includes(btnName)) {
          b.click();
          break;
        }
      }
      // Snap camera directly to station focus for crisp audit capture
      if (window.__sim && window.__sim.cameraAnim) {
        window.__sim.cameraAnim.transitionTo(targetKey, true);
      }
    }, key, name);

    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: `G:\\Vizon Website\\Sim\\public\\${filename}` });
    await page.screenshot({ path: `${artifactDir}\\${filename}` });
    console.log(`✓ ${name} Station view captured: public/${filename}`);
  }

  await visitStation('Physics', 'audit_physics_station.png');
  await visitStation('Chemistry', 'audit_chemistry_station.png');
  await visitStation('Biology', 'audit_biology_station.png');
  await visitStation('Mathematics', 'audit_math_station.png');
  await visitStation('Astronomy', 'audit_astronomy_station.png');

  // 2. Audit Mobile Viewport (390x844 - iPhone 14)
  console.log('Testing Mobile Viewport (390x844)...');
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: 'G:\\Vizon Website\\Sim\\public\\audit_mobile.png' });
  await page.screenshot({ path: `${artifactDir}\\audit_mobile.png` });
  console.log('✓ Mobile screenshot captured: public/audit_mobile.png');

  await browser.close();

  console.log('--- AUDIT COMPLETE ---');
  console.log('Total console logs captured:', consoleLogs.length);
  console.log('Total errors:', errors.length);
  if (errors.length > 0) {
    console.error('FAIL: Detected runtime errors during audit:', errors);
    process.exit(1);
  } else {
    console.log('SUCCESS: ZERO console/shader compilation errors detected across all stations!');
    process.exit(0);
  }
}

audit().catch((err) => {
  console.error('Audit script exception:', err);
  process.exit(1);
});
