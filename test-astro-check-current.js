import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\sanja\\.gemini\\antigravity\\brain\\483a2afc-6d65-4154-a660-fc66c69d9e36';

async function check() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });
  await new Promise((r) => setTimeout(r, 4000));

  await page.evaluate(() => {
    const sim = window.__sim;
    // Walk into astronomy pod viewing area
    sim.camera.position.set(2.0, 2.0, -7.5);
    sim.camera.lookAt(3.71, 1.4, -11.41);
    if (sim.controls) {
      sim.controls.target.set(3.71, 1.4, -11.41);
      sim.controls.update();
    }
  });

  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(artifactDir, 'current_astro_view.png') });
  console.log('Saved current_astro_view.png');
  await browser.close();
}

check().catch(console.error);
