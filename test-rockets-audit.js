// test-rockets-audit.js — Automated Verification for Scale Rocket Models & Telemetry
import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\sanja\\.gemini\\antigravity\\brain\\483a2afc-6d65-4154-a660-fc66c69d9e36';

async function audit() {
  console.log('=== STARTING ROCKET SCALE MODELS & TELEMETRY AUDIT ===');
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
  await new Promise((r) => setTimeout(r, 3800));

  // ── 1. VERIFY ALL 13 ROCKETS REGISTERED IN SCENE ──
  console.log('1. Verifying rocket exhibits and interactive targets...');
  const inventory = await page.evaluate(() => {
    const sim = window.__sim;
    const targets = sim.rocketExhibits.interactiveTargets;
    const rocketIds = targets.map((t) => t.userData?.rocketId);
    return {
      targetCount: targets.length,
      rocketIds,
    };
  });

  console.log('Rocket Inventory in Scene:', inventory);

  // ── 2. CAPTURE SLV-3 IN THE GAP BETWEEN DR. KALAM & DR. RADHAKRISHNAN ──
  console.log('2. Inspecting SLV-3 in gap between Dr. Kalam and Dr. Radhakrishnan...');
  await page.evaluate(() => {
    const sim = window.__sim;
    const scene = sim.scene;
    const slv3Bay = scene.getObjectByName('RocketBay_slv3');
    if (slv3Bay) {
      const pos = slv3Bay.position;
      sim.camera.position.set(pos.x * 0.54, 2.5, pos.z * 0.54);
      sim.camera.lookAt(pos.x, 3.4, pos.z);
      if (sim.controls) {
        sim.controls.target.set(pos.x, 3.4, pos.z);
        sim.controls.update();
      }
    }
  });

  await new Promise((r) => setTimeout(r, 1500));
  const slv3Shot = path.join(artifactDir, 'audit_rocket_slv3_kalam_gap.png');
  await page.screenshot({ path: slv3Shot });
  console.log('Saved:', slv3Shot);

  // ── 3. CAPTURE PSLV CLOSE-UP AND TRIGGER INTERACTIVE TELEMETRY ──
  console.log('3. Inspecting PSLV and triggering interactive telemetry...');
  await page.evaluate(() => {
    const sim = window.__sim;
    const scene = sim.scene;
    const pslvBay = scene.getObjectByName('RocketBay_pslv');
    if (pslvBay) {
      const pos = pslvBay.position;
      sim.camera.position.set(pos.x * 0.54, 2.6, pos.z * 0.54);
      sim.camera.lookAt(pos.x, 3.8, pos.z);
      if (sim.controls) {
        sim.controls.target.set(pos.x, 3.8, pos.z);
        sim.controls.update();
      }

      // Trigger selection of PSLV
      const hit = pslvBay.getObjectByName('HitMesh_pslv');
      if (hit) {
        sim.rocketTelemetry.selectRocket(hit, 'pslv');
      }
    }
  });

  await new Promise((r) => setTimeout(r, 1200));
  const pslvShot = path.join(artifactDir, 'audit_rocket_bay_pslv.png');
  await page.screenshot({ path: pslvShot });
  console.log('Saved:', pslvShot);

  // Check HUD drawer state
  const pslvHudState = await page.evaluate(() => {
    const drawer = document.getElementById('rocket-telemetry-hud');
    return {
      isActive: drawer ? drawer.classList.contains('active') : false,
      title: document.getElementById('rkt-title')?.textContent,
      height: document.getElementById('rkt-height')?.textContent,
      missions: document.getElementById('rkt-missions')?.textContent,
    };
  });
  console.log('PSLV Telemetry Drawer State:', pslvHudState);

  // ── 4. CAPTURE LVM3 (CHANDRAYAAN-3 LAUNCHER) WITH S200 BOOSTERS ──
  console.log('4. Inspecting LVM3 (Chandrayaan-3 launcher) and selecting...');
  await page.evaluate(() => {
    const sim = window.__sim;
    const scene = sim.scene;
    const lvm3Bay = scene.getObjectByName('RocketBay_lvm3');
    if (lvm3Bay) {
      const pos = lvm3Bay.position;
      sim.camera.position.set(pos.x * 0.55, 2.6, pos.z * 0.55);
      sim.camera.lookAt(pos.x, 3.6, pos.z);
      if (sim.controls) {
        sim.controls.target.set(pos.x, 3.6, pos.z);
        sim.controls.update();
      }

      const hit = lvm3Bay.getObjectByName('HitMesh_lvm3');
      if (hit) {
        sim.rocketTelemetry.selectRocket(hit, 'lvm3');
      }
    }
  });

  await new Promise((r) => setTimeout(r, 1200));
  const lvm3Shot = path.join(artifactDir, 'audit_rocket_bay_lvm3.png');
  await page.screenshot({ path: lvm3Shot });
  console.log('Saved:', lvm3Shot);

  // ── 5. CAPTURE APOLLO 11 (SATURN V) SUPER HEAVY-LIFT ROCKET ──
  console.log('5. Inspecting NASA Apollo 11 (Saturn V) and selecting...');
  await page.evaluate(() => {
    const sim = window.__sim;
    const scene = sim.scene;
    const apolloBay = scene.getObjectByName('RocketBay_apollo11');
    if (apolloBay) {
      const pos = apolloBay.position;
      sim.camera.position.set(pos.x * 0.52, 2.8, pos.z * 0.52);
      sim.camera.lookAt(pos.x, 4.0, pos.z);
      if (sim.controls) {
        sim.controls.target.set(pos.x, 4.0, pos.z);
        sim.controls.update();
      }

      const hit = apolloBay.getObjectByName('HitMesh_apollo11');
      if (hit) {
        sim.rocketTelemetry.selectRocket(hit, 'apollo11');
      }
    }
  });

  await new Promise((r) => setTimeout(r, 1200));
  const apolloShot = path.join(artifactDir, 'audit_rocket_bay_apollo11.png');
  await page.screenshot({ path: apolloShot });
  console.log('Saved:', apolloShot);

  // ── 6. CAPTURE SKYROOT AEROSPACE: VIKRAM-1 & VIKRAM-2 DUAL PLATFORM ──
  console.log('6. Inspecting Skyroot Aerospace Vikram-1 & Vikram-2 dual platform...');
  await page.evaluate(() => {
    const sim = window.__sim;
    const scene = sim.scene;
    const skyrootBay = scene.getObjectByName('RocketBay_skyroot');
    if (skyrootBay) {
      const pos = skyrootBay.position;
      // Position camera right in front of the platform along the perimeter walkway
      sim.camera.position.set(pos.x * 0.74, 2.2, pos.z * 0.74);
      sim.camera.lookAt(pos.x, 3.6, pos.z);
      if (sim.controls) {
        sim.controls.target.set(pos.x, 3.6, pos.z);
        sim.controls.update();
      }

      const hit = skyrootBay.getObjectByName('HitMesh_vikram1');
      if (hit) {
        sim.rocketTelemetry.selectRocket(hit, 'vikram1');
      }
    }
  });

  await new Promise((r) => setTimeout(r, 1200));
  const skyrootShot = path.join(artifactDir, 'audit_rocket_bay_skyroot.png');
  await page.screenshot({ path: skyrootShot });
  console.log('Saved:', skyrootShot);

  // ── 6B. CAPTURE SPACEX FALCON 9 ──
  console.log('6B. Inspecting SpaceX Falcon 9...');
  await page.evaluate(() => {
    const sim = window.__sim;
    const scene = sim.scene;
    const f9Bay = scene.getObjectByName('RocketBay_falcon9');
    if (f9Bay) {
      const pos = f9Bay.position;
      sim.camera.position.set(pos.x * 0.58, 2.5, pos.z * 0.58);
      sim.camera.lookAt(pos.x, 3.8, pos.z);
      if (sim.controls) {
        sim.controls.target.set(pos.x, 3.8, pos.z);
        sim.controls.update();
      }

      const hit = f9Bay.getObjectByName('HitMesh_falcon9');
      if (hit) {
        sim.rocketTelemetry.selectRocket(hit, 'falcon9');
      }
    }
  });

  await new Promise((r) => setTimeout(r, 1200));
  const f9Shot = path.join(artifactDir, 'audit_rocket_bay_falcon9.png');
  await page.screenshot({ path: f9Shot });
  console.log('Saved:', f9Shot);

  // ── 7. WIDE OVERVIEW SHOWING ROCKETS IN GAPS BETWEEN SCIENTISTS ──
  console.log('7. Capturing wide panoramic atrium overview of rockets along the perimeter...');
  await page.evaluate(() => {
    const sim = window.__sim;
    sim.camera.position.set(0, 3.2, 5.0);
    sim.camera.lookAt(0, 3.8, -16.0);
    if (sim.controls) {
      sim.controls.target.set(0, 3.8, -16.0);
      sim.controls.update();
    }
  });

  await new Promise((r) => setTimeout(r, 1200));
  const wideShot = path.join(artifactDir, 'audit_rockets_wall_overview.png');
  await page.screenshot({ path: wideShot });
  console.log('Saved:', wideShot);

  await browser.close();

  console.log('=== AUDIT COMPLETE ===');
  console.log('Errors logged:', errors);
}

audit().catch(console.error);
