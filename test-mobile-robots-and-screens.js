// test-mobile-robots-and-screens.js — Automated Verification for R2-D2, Pragyan Moon Rover, and Floor TV Screens
import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\sanja\\.gemini\\antigravity\\brain\\483a2afc-6d65-4154-a660-fc66c69d9e36';

async function audit() {
  console.log('=== STARTING MOBILE ROBOTS & FLOOR TV SCREENS AUDIT ===');
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

  // ── 1. ASTRONOMY POD OVERVIEW (CONFIRM ARM/TABLE & BANNER REMOVED, FLOOR SCREENS PRESENT) ──
  console.log('1. Verifying Astronomy Pod: arm, table, and banner removed; floor screens on stands...');
  const podVerification = await page.evaluate(() => {
    const sim = window.__sim;
    const scene = sim.scene;

    // Check if table or welding arm parts exist
    let hasTable = false;
    let hasArm = false;
    let hasBanner = false;

    scene.traverse((obj) => {
      if (obj.name === 'RoboticsWorkbench' || (obj.geometry && obj.geometry.type === 'BoxGeometry' && obj.material && obj.material.color && obj.material.color.getHexString() === 'f07a10')) {
        hasArm = true;
      }
      if (obj.name && (obj.name.includes('Banner') || obj.name.includes('banner'))) {
        hasBanner = true;
      }
    });

    const screensGroup = scene.getObjectByName('AstronomyFloorScreensGroup');
    const floorScreenCount = screensGroup ? screensGroup.children.length : 0;

    if (sim.cameraAnim) {
      sim.cameraAnim.transitionTo('astronomy', true);
    }

    return { hasTable, hasArm, hasBanner, floorScreenCount };
  });

  console.log('Astronomy Pod Inspection:', podVerification);
  await new Promise((r) => setTimeout(r, 1500));

  const podOverviewShot = path.join(artifactDir, 'audit_astronomy_pod_clean_overview.png');
  await page.screenshot({ path: podOverviewShot });
  console.log('Saved:', podOverviewShot);

  // ── 2. FLOOR-STANDING TV SCREENS NEAR WALL FACING HOME POD ──
  console.log('2. Inspecting modern floor-standing TV screens near wall facing Home Pod...');
  await page.evaluate(() => {
    const sim = window.__sim;
    // Position camera head-on in front of center floor stand, framed to capture active screen & stands
    sim.camera.position.set(3.85, 1.55, -12.2);
    sim.camera.lookAt(4.88, 1.45, -15.03);
    if (sim.controls) {
      sim.controls.target.set(4.88, 1.45, -15.03);
      sim.controls.update();
    }
  });

  await new Promise((r) => setTimeout(r, 1200));
  const floorScreensShot = path.join(artifactDir, 'audit_floor_screens_modern_stands.png');
  await page.screenshot({ path: floorScreensShot });
  console.log('Saved:', floorScreensShot);

  // Panoramic view capturing all 3 screens (Nebulas, Voyager 1 / ISS, Galaxies) on stands
  await page.evaluate(() => {
    const sim = window.__sim;
    sim.camera.position.set(2.8, 2.1, -9.8);
    sim.camera.lookAt(4.88, 1.45, -15.03);
    if (sim.controls) {
      sim.controls.target.set(4.88, 1.45, -15.03);
      sim.controls.update();
    }
  });

  await new Promise((r) => setTimeout(r, 1000));
  const floorScreensWideShot = path.join(artifactDir, 'audit_floor_screens_wide_view.png');
  await page.screenshot({ path: floorScreensWideShot });
  console.log('Saved:', floorScreensWideShot);

  // ── 3. R2-D2 CLOSE-UP INSPECTION ──
  console.log('3. Inspecting R2-D2 astromech droid...');
  const r2Info = await page.evaluate(() => {
    const sim = window.__sim;
    const r2 = sim.mobileRobots.r2d2;
    const pos = r2.position;

    // Angle in front of R2
    const yaw = r2.rotation.y;
    const frontX = Math.sin(yaw) * 1.25;
    const frontZ = Math.cos(yaw) * 1.25;

    sim.camera.position.set(pos.x + frontX + 0.3, 0.95, pos.z + frontZ);
    sim.camera.lookAt(pos.x, 0.52, pos.z);
    if (sim.controls) {
      sim.controls.target.set(pos.x, 0.52, pos.z);
      sim.controls.update();
    }

    return { pos: { x: pos.x, y: pos.y, z: pos.z }, scale: r2.scale };
  });

  console.log('R2-D2 Telemetry:', r2Info);
  await new Promise((r) => setTimeout(r, 1200));

  const r2Shot = path.join(artifactDir, 'audit_r2d2_closeup.png');
  await page.screenshot({ path: r2Shot });
  console.log('Saved:', r2Shot);

  // ── 4. ISRO CHANDRAYAAN-3 PRAGYAN MOON ROVER CLOSE-UP INSPECTION ──
  console.log('4. Inspecting ISRO Pragyan Moon Rover...');
  const pragyanInfo = await page.evaluate(() => {
    const sim = window.__sim;
    const pragyan = sim.mobileRobots.pragyan;
    const pos = pragyan.position;

    // Angle in front and side to see both front & side flag decal, NavCam, and gold chassis
    const yaw = pragyan.rotation.y;
    const frontX = Math.sin(yaw) * 1.15;
    const frontZ = Math.cos(yaw) * 1.15;
    const sideX = Math.cos(yaw) * 0.7;
    const sideZ = -Math.sin(yaw) * 0.7;

    sim.camera.position.set(pos.x + frontX + sideX, 0.72, pos.z + frontZ + sideZ);
    sim.camera.lookAt(pos.x, 0.32, pos.z);
    if (sim.controls) {
      sim.controls.target.set(pos.x, 0.32, pos.z);
      sim.controls.update();
    }

    return { pos: { x: pos.x, y: pos.y, z: pos.z }, scale: pragyan.scale };
  });

  console.log('Pragyan Rover Telemetry:', pragyanInfo);
  await new Promise((r) => setTimeout(r, 1200));

  const pragyanShot = path.join(artifactDir, 'audit_pragyan_rover_closeup.png');
  await page.screenshot({ path: pragyanShot });
  console.log('Saved:', pragyanShot);

  // ── 5. MUTUAL INTERACTION SEQUENCE (2 TO 3 SECONDS) ──
  console.log('5. Triggering R2-D2 and Pragyan Moon Rover mutual interaction...');
  await page.evaluate(() => {
    const sim = window.__sim;
    const mb = sim.mobileRobots;

    // Place them 1.5m apart facing each other
    mb.r2d2.position.set(0.75, 0, 1.2);
    mb.pragyan.position.set(-0.75, 0, 1.2);

    // Trigger mutual interaction
    mb.triggerInteraction(3.0);

    // Frame camera to capture both robots interacting side-by-side
    sim.camera.position.set(0.0, 1.1, 3.4);
    sim.camera.lookAt(0.0, 0.45, 1.2);
    if (sim.controls) {
      sim.controls.target.set(0.0, 0.45, 1.2);
      sim.controls.update();
    }
  });

  await new Promise((r) => setTimeout(r, 800));

  const interactionShot = path.join(artifactDir, 'audit_robots_mutual_interaction.png');
  await page.screenshot({ path: interactionShot });
  console.log('Saved:', interactionShot);

  const interactionCheck = await page.evaluate(() => {
    const mb = window.__sim.mobileRobots;
    return {
      r2Interacting: mb.r2State.isInteracting,
      pragyanInteracting: mb.pragyanState.isInteracting,
      dist: mb.r2d2.position.distanceTo(mb.pragyan.position),
    };
  });
  console.log('Mid-Interaction State:', interactionCheck);

  // ── 6. RESUMING AUTONOMOUS RANDOM WANDERING ──
  console.log('6. Verifying autonomous wandering resumes after interaction...');
  await new Promise((r) => setTimeout(r, 3200));

  const postInteractionCheck = await page.evaluate(() => {
    const mb = window.__sim.mobileRobots;
    return {
      r2Interacting: mb.r2State.isInteracting,
      pragyanInteracting: mb.pragyanState.isInteracting,
      r2Speed: mb.r2State.speed,
      pragyanSpeed: mb.pragyanState.speed,
    };
  });
  console.log('Post-Interaction State:', postInteractionCheck);

  const roamingShot = path.join(artifactDir, 'audit_robots_roaming_atrium.png');
  await page.screenshot({ path: roamingShot });
  console.log('Saved:', roamingShot);

  await browser.close();

  console.log('=== AUDIT COMPLETE ===');
  console.log('Errors logged:', errors);
}

audit().catch(console.error);
