// test-mobile-robots-roaming.js — Verify complete post-interaction exit and roaming
import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\sanja\\.gemini\\antigravity\\brain\\483a2afc-6d65-4154-a660-fc66c69d9e36';

async function testRoaming() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--use-gl=angle', '--use-angle=swiftshader'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });
  await new Promise((r) => setTimeout(r, 3500));

  console.log('Triggering short 1.5s interaction...');
  await page.evaluate(() => {
    const mb = window.__sim.mobileRobots;
    mb.triggerInteraction(1.5);
  });

  // Step 4 seconds of animation in the page
  console.log('Stepping 4 seconds of animation...');
  await page.evaluate(async () => {
    const mb = window.__sim.mobileRobots;
    for (let f = 0; f < 80; f++) {
      mb.update(f * 0.05, 0.05);
    }
  });

  const state = await page.evaluate(() => {
    const mb = window.__sim.mobileRobots;
    return {
      r2Interacting: mb.r2State.isInteracting,
      pragyanInteracting: mb.pragyanState.isInteracting,
      r2Speed: mb.r2State.speed,
      pragyanSpeed: mb.pragyanState.speed,
      r2Pos: mb.r2State.pos,
      pragyanPos: mb.pragyanState.pos,
    };
  });

  console.log('Post-Interaction Wandering State:', state);

  // Position camera to see them moving apart
  await page.evaluate(() => {
    const sim = window.__sim;
    sim.camera.position.set(0.0, 4.0, 6.0);
    sim.camera.lookAt(0.0, 0.5, 0.0);
    if (sim.controls) {
      sim.controls.target.set(0.0, 0.5, 0.0);
      sim.controls.update();
    }
  });

  await new Promise((r) => setTimeout(r, 500));
  const roamShot = path.join(artifactDir, 'audit_robots_roaming_atrium.png');
  await page.screenshot({ path: roamShot });
  console.log('Saved:', roamShot);

  await browser.close();
}

testRoaming().catch(console.error);
