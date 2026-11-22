import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\sanja\\.gemini\\antigravity\\brain\\483a2afc-6d65-4154-a660-fc66c69d9e36';

async function runAudit() {
  console.log('=== STARTING BIOLOGY REALISTIC EUKARYOTIC CELL AUDIT ===');
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

  // ── 1. BIOLOGY STATION OVERVIEW: SHOWCASING BIO-CHAMBER & NEW 3D CUTAWAY CELL ──
  console.log('1. Capturing entrance view of Biology Pod with 3D Eukaryotic Cell...');
  await page.evaluate(() => {
    const sim = window.__sim;
    // Biology station center is at (-9.71, 0, 7.05)
    sim.camera.position.set(-6.2, 2.3, 4.2);
    sim.camera.lookAt(-9.71, 1.8, 7.05);
    if (sim.controls) {
      sim.controls.target.set(-9.71, 1.8, 7.05);
      sim.controls.update();
    }
  });

  await new Promise((r) => setTimeout(r, 1500));
  const overviewShot = path.join(artifactDir, 'audit_biology_realistic_cell_overview.png');
  await page.screenshot({ path: overviewShot });
  console.log('Saved:', overviewShot);

  // ── 2. CLOSE-UP: 3D ANATOMICAL CUTAWAY CELL (NUCLEUS, RER, MITO, GOLGI, CENTRIOLES) ──
  console.log('2. Capturing close-up of 3D cutaway eukaryotic cell...');
  await page.evaluate(() => {
    const sim = window.__sim;
    // Cell is at (-8.51, 2.15, 7.05)
    sim.camera.position.set(-7.1, 2.3, 8.2);
    sim.camera.lookAt(-8.51, 2.15, 7.05);
    if (sim.controls) {
      sim.controls.target.set(-8.51, 2.15, 7.05);
      sim.controls.update();
    }
  });

  await new Promise((r) => setTimeout(r, 1500));
  const closeupShot = path.join(artifactDir, 'audit_biology_realistic_cell_closeup.png');
  await page.screenshot({ path: closeupShot });
  console.log('Saved:', closeupShot);

  // ── 3. CUTAWAY ANGLE: LOOKING INTO THE OPEN BILAYER MEMBRANE & NUCLEOPLASM ──
  console.log('3. Capturing cutaway interior angle (nucleus, chromatin, cristae, ribosomes)...');
  await page.evaluate(() => {
    const sim = window.__sim;
    sim.camera.position.set(-8.2, 2.5, 5.7);
    sim.camera.lookAt(-8.51, 2.15, 7.05);
    if (sim.controls) {
      sim.controls.target.set(-8.51, 2.15, 7.05);
      sim.controls.update();
    }
  });

  await new Promise((r) => setTimeout(r, 1500));
  const interiorShot = path.join(artifactDir, 'audit_biology_cell_interior_cutaway.png');
  await page.screenshot({ path: interiorShot });
  console.log('Saved:', interiorShot);

  // ── 4. ORGANELLE ISOLATION: NUCLEUS FOCUS ──
  console.log('4. Testing organelle isolation (Nucleus Focus)...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('.vz-btn-pill'));
    const nucBtn = buttons.find(b => b.textContent.includes('Nucleus'));
    if (nucBtn) nucBtn.click();
  });

  await new Promise((r) => setTimeout(r, 1500));
  const nucShot = path.join(artifactDir, 'audit_biology_cell_nucleus_focus.png');
  await page.screenshot({ path: nucShot });
  console.log('Saved:', nucShot);

  // ── 5. ORGANELLE ISOLATION: MITOCHONDRIA FOCUS ──
  console.log('5. Testing organelle isolation (Mitochondria Focus)...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('.vz-btn-pill'));
    const mitoBtn = buttons.find(b => b.textContent.includes('Mito'));
    if (mitoBtn) mitoBtn.click();
  });

  await new Promise((r) => setTimeout(r, 1500));
  const mitoShot = path.join(artifactDir, 'audit_biology_cell_mito_focus.png');
  await page.screenshot({ path: mitoShot });
  console.log('Saved:', mitoShot);

  console.log('Total browser errors encountered:', errors.length);
  await browser.close();
  console.log('=== AUDIT COMPLETE ===');
}

runAudit().catch(console.error);
