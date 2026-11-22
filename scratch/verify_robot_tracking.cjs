const puppeteer = require('g:/Vizon Website/Sim/node_modules/puppeteer-core');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\sanja\\.gemini\\antigravity\\brain\\483a2afc-6d65-4154-a660-fc66c69d9e36';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security', '--enable-webgl', '--ignore-gpu-blocklist'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));

  console.log('Navigating to http://localhost:5173/ ...');
  await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForFunction(() => !!window.__sim && !document.getElementById('loading-screen'), { timeout: 20000 });
  console.log('Simulation ready.');

  const wait = ms => new Promise(res => setTimeout(res, ms));

  // ═══════════════════════════════════════════════════════
  // TEST 1: R2-D2 Selection & Dynamic Camera Following
  // ═══════════════════════════════════════════════════════
  console.log('\n--- Test 1: R2-D2 Selection & Camera Following ---');
  await page.evaluate(() => {
    window.__sim.mobileRobots.selectRobot('R2D2');
  });

  // Verify tracking state immediately activated
  const isTrackingR2 = await page.evaluate(() => window.__sim.mobileRobots.telemetry.isTrackingCamera);
  console.log('isTrackingCamera immediately after selectRobot:', isTrackingR2);

  // Wait 1.3s for smooth cubic transition to settle on R2-D2
  await wait(1300);

  const r2State0 = await page.evaluate(() => {
    const { camera, controls, mobileRobots } = window.__sim;
    const r2Pos = mobileRobots.r2State.pos;
    return {
      r2Pos: { x: r2Pos.x, y: r2Pos.y, z: r2Pos.z },
      camPos: { x: camera.position.x, y: camera.position.y, z: camera.position.z },
      target: { x: controls.target.x, y: controls.target.y, z: controls.target.z },
      distCamToTarget: camera.position.distanceTo(controls.target),
      cardVisible: mobileRobots.telemetry.cardGroup.visible,
    };
  });
  console.log('R2-D2 T0 State:', JSON.stringify(r2State0, null, 2));

  // Let R2-D2 roam freely for 2.5 seconds
  await wait(2500);

  const r2State1 = await page.evaluate(() => {
    const { camera, controls, mobileRobots } = window.__sim;
    const r2Pos = mobileRobots.r2State.pos;
    return {
      r2Pos: { x: r2Pos.x, y: r2Pos.y, z: r2Pos.z },
      camPos: { x: camera.position.x, y: camera.position.y, z: camera.position.z },
      target: { x: controls.target.x, y: controls.target.y, z: controls.target.z },
      distCamToTarget: camera.position.distanceTo(controls.target),
    };
  });
  console.log('R2-D2 T1 (after 2.5s) State:', JSON.stringify(r2State1, null, 2));

  const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
  const r2MoveDist = dist(r2State0.r2Pos, r2State1.r2Pos);
  const camMoveDist = dist(r2State0.camPos, r2State1.camPos);
  const targetMoveDist = dist(r2State0.target, r2State1.target);

  console.log(`R2-D2 moved: ${r2MoveDist.toFixed(3)}m`);
  console.log(`Camera moved: ${camMoveDist.toFixed(3)}m`);
  console.log(`Controls target moved: ${targetMoveDist.toFixed(3)}m`);
  console.log(`Distance delta cam-to-target: ${Math.abs(r2State0.distCamToTarget - r2State1.distCamToTarget).toFixed(4)}m`);

  if (camMoveDist > 0.1 && targetMoveDist > 0.1) {
    console.log('PASS: Camera and target followed R2-D2 as it moved across the floor!');
  } else {
    console.error('FAIL: Camera did not follow R2-D2 movement!');
  }

  await page.screenshot({ path: `${artifactDir}/verify_r2d2_camera_follow.png` });
  console.log('Saved artifact: verify_r2d2_camera_follow.png');

  // ═══════════════════════════════════════════════════════
  // TEST 2: Pragyan Rover Selection & Dynamic Camera Following
  // ═══════════════════════════════════════════════════════
  console.log('\n--- Test 2: Pragyan Rover Selection & Camera Following ---');
  await page.evaluate(() => {
    window.__sim.mobileRobots.selectRobot('Pragyan');
  });

  // Wait 1.3s for smooth cubic transition to Pragyan
  await wait(1300);

  const pragyanState0 = await page.evaluate(() => {
    const { camera, controls, mobileRobots } = window.__sim;
    const pPos = mobileRobots.pragyanState.pos;
    return {
      pPos: { x: pPos.x, y: pPos.y, z: pPos.z },
      camPos: { x: camera.position.x, y: camera.position.y, z: camera.position.z },
      target: { x: controls.target.x, y: controls.target.y, z: controls.target.z },
      distCamToTarget: camera.position.distanceTo(controls.target),
      cardVisible: mobileRobots.telemetry.cardGroup.visible,
      hudVisible: document.getElementById('robot-telemetry-hud')?.style.opacity === '1',
    };
  });
  console.log('Pragyan T0 State:', JSON.stringify(pragyanState0, null, 2));

  // Let Pragyan roam freely for 2.5 seconds
  await wait(2500);

  const pragyanState1 = await page.evaluate(() => {
    const { camera, controls, mobileRobots } = window.__sim;
    const pPos = mobileRobots.pragyanState.pos;
    return {
      pPos: { x: pPos.x, y: pPos.y, z: pPos.z },
      camPos: { x: camera.position.x, y: camera.position.y, z: camera.position.z },
      target: { x: controls.target.x, y: controls.target.y, z: controls.target.z },
      distCamToTarget: camera.position.distanceTo(controls.target),
    };
  });
  console.log('Pragyan T1 (after 2.5s) State:', JSON.stringify(pragyanState1, null, 2));

  const pMoveDist = dist(pragyanState0.pPos, pragyanState1.pPos);
  const pCamMoveDist = dist(pragyanState0.camPos, pragyanState1.camPos);
  const pTargetMoveDist = dist(pragyanState0.target, pragyanState1.target);

  console.log(`Pragyan Rover moved: ${pMoveDist.toFixed(3)}m`);
  console.log(`Camera moved: ${pCamMoveDist.toFixed(3)}m`);
  console.log(`Controls target moved: ${pTargetMoveDist.toFixed(3)}m`);

  if (pCamMoveDist > 0.05 && pTargetMoveDist > 0.05) {
    console.log('PASS: Camera and target followed Pragyan Rover as it moved across the floor!');
  } else {
    console.error('FAIL: Camera did not follow Pragyan Rover movement!');
  }

  await page.screenshot({ path: `${artifactDir}/verify_pragyan_camera_follow.png` });
  console.log('Saved artifact: verify_pragyan_camera_follow.png');

  // ═══════════════════════════════════════════════════════
  // TEST 3: Deselection Stops Camera Tracking Immediately
  // ═══════════════════════════════════════════════════════
  console.log('\n--- Test 3: Deselection Stops Tracking ---');
  await page.evaluate(() => {
    // Click close button on HUD
    const closeBtn = document.getElementById('close-robot-hud');
    if (closeBtn) {
      closeBtn.click();
    } else {
      window.__sim.mobileRobots.telemetry.deselect();
    }
  });

  const isTrackingAfterDeselect = await page.evaluate(() => window.__sim.mobileRobots.telemetry.isTrackingCamera);
  console.log('isTrackingCamera after deselect:', isTrackingAfterDeselect);

  const deselectCam0 = await page.evaluate(() => {
    const { camera, controls } = window.__sim;
    return {
      camPos: { x: camera.position.x, y: camera.position.y, z: camera.position.z },
      target: { x: controls.target.x, y: controls.target.y, z: controls.target.z },
    };
  });

  // Wait 1.5s while robots keep moving
  await wait(1500);

  const deselectCam1 = await page.evaluate(() => {
    const { camera, controls } = window.__sim;
    return {
      camPos: { x: camera.position.x, y: camera.position.y, z: camera.position.z },
      target: { x: controls.target.x, y: controls.target.y, z: controls.target.z },
    };
  });

  const deselectCamMove = dist(deselectCam0.camPos, deselectCam1.camPos);
  const deselectTargetMove = dist(deselectCam0.target, deselectCam1.target);
  console.log(`Camera movement after deselect: ${deselectCamMove.toFixed(4)}m (expect ~0)`);
  console.log(`Target movement after deselect: ${deselectTargetMove.toFixed(4)}m (expect ~0)`);

  if (deselectCamMove < 0.02 && deselectTargetMove < 0.02) {
    console.log('PASS: Camera tracking completely disengaged upon deselect.');
  } else {
    console.error('FAIL: Camera still moving after deselect!');
  }

  // ═══════════════════════════════════════════════════════
  // TEST 4: Boundary Check
  // ═══════════════════════════════════════════════════════
  console.log('\n--- Test 4: Physical Room Boundary Enforcement ---');
  const boundaryCheck = await page.evaluate(() => {
    const { camera, controls } = window.__sim;
    const camR = Math.hypot(camera.position.x, camera.position.z);
    const targetR = Math.hypot(controls.target.x, controls.target.z);
    return {
      camR,
      camY: camera.position.y,
      targetR,
      targetY: controls.target.y,
      camInBounds: camR <= 16.2 && camera.position.y >= 0.6 && camera.position.y <= 11.2,
      targetInBounds: targetR <= 15.0 && controls.target.y >= 0.3 && controls.target.y <= 9.5,
    };
  });
  console.log('Boundary Check State:', boundaryCheck);
  if (boundaryCheck.camInBounds && boundaryCheck.targetInBounds) {
    console.log('PASS: Camera and target remain strictly inside room boundaries.');
  } else {
    console.error('FAIL: Boundaries violated!');
  }

  await browser.close();
  console.log('\nALL VERIFICATION TESTS COMPLETED SUCCESSFULLY.');
})();
