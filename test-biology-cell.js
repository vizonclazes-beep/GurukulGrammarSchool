import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\sanja\\.gemini\\antigravity\\brain\\483a2afc-6d65-4154-a660-fc66c69d9e36';

async function runAudit() {
  console.log('[AUDIT] Launching Chrome...');
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

  page.on('pageerror', (err) => {
    errors.push(err.message);
    console.error('[PAGE ERROR]:', err.message);
  });

  await page.setViewport({ width: 1920, height: 1080 });
  console.log('[AUDIT] Navigating to http://localhost:5173/ ...');
  await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded', timeout: 25000 });

  console.log('[AUDIT] Waiting 3.5s for scene load...');
  await new Promise((r) => setTimeout(r, 3500));

  // 1. Biology Pod Overview
  console.log('[AUDIT] 1. Positioning camera to Biology Pod Overview...');
  await page.evaluate(() => {
    const sim = window.__sim;
    sim.camera.position.set(-5.8, 2.2, 4.5);
    sim.camera.lookAt(-9.71, 1.8, 7.05);
    if (sim.controls) {
      sim.controls.target.set(-9.71, 1.8, 7.05);
      sim.controls.update();
    }
  });
  await new Promise((r) => setTimeout(r, 1000));
  const overviewShot = path.join(artifactDir, 'audit_biology_realistic_cell_overview.png');
  await page.screenshot({ path: overviewShot });
  console.log('[AUDIT] Saved overview:', overviewShot);

  // 2. Cell Close-up
  console.log('[AUDIT] 2. Capturing close-up of 3D cutaway eukaryotic cell...');
  await page.evaluate(() => {
    const sim = window.__sim;
    sim.camera.position.set(-7.0, 2.25, 7.9);
    sim.camera.lookAt(-8.51, 2.15, 7.05);
    if (sim.controls) {
      sim.controls.target.set(-8.51, 2.15, 7.05);
      sim.controls.update();
    }
  });
  await new Promise((r) => setTimeout(r, 1000));
  const closeupShot = path.join(artifactDir, 'audit_biology_realistic_cell_closeup.png');
  await page.screenshot({ path: closeupShot });
  console.log('[AUDIT] Saved closeup:', closeupShot);

  // 3. Organelle Isolation (Nucleus Focus)
  console.log('[AUDIT] 3. Testing organelle isolation (Nucleus focus)...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('.vz-btn-pill'));
    const nucBtn = buttons.find(b => b.textContent.includes('Nucleus'));
    if (nucBtn) nucBtn.click();
  });
  await new Promise((r) => setTimeout(r, 1000));
  const isolationShot = path.join(artifactDir, 'audit_biology_cell_nucleus_isolation.png');
  await page.screenshot({ path: isolationShot });
  console.log('[AUDIT] Saved isolation:', isolationShot);

  console.log('[AUDIT] Total browser errors:', errors.length);
  await browser.close();
  console.log('=== AUDIT COMPLETE ===');
}

runAudit().catch(console.error);
