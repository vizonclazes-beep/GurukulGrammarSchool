import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:/Users/sanja/.gemini/antigravity/brain/483a2afc-6d65-4154-a660-fc66c69d9e36';

(async () => {
  console.log('Launching browser to audit Chemistry Pod Flame Test & Spectroscopy…');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    defaultViewport: { width: 1920, height: 1080 },
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      console.log('PAGE ERROR:', msg.text());
      consoleErrors.push(msg.text());
    }
  });

  await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded', timeout: 30000 });
  console.log('Page loaded, waiting for scene build…');
  await new Promise((r) => setTimeout(r, 4500));

  // Snap directly to Chemistry Pod
  console.log('Transitioning camera to Chemistry Pod…');
  await page.evaluate(() => {
    window.__sim.cameraAnim.transitionTo('chemistry', true);
  });

  await new Promise((r) => setTimeout(r, 1000));

  // 1. Overview with Default Sodium (Golden Yellow Flame)
  console.log('Capturing audit_chem_overview_sodium.png…');
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'audit_chem_overview_sodium.png'),
  });

  // 2. Switch to Copper (Cu2+)
  console.log('Switching to Copper (Cu2+)…');
  await page.evaluate(() => {
    const pills = Array.from(document.querySelectorAll('.vz-btn-pill'));
    const cuBtn = pills.find((p) => p.textContent.includes('Cu'));
    if (cuBtn) cuBtn.click();
  });
  await new Promise((r) => setTimeout(r, 1000));

  console.log('Capturing audit_chem_copper_flame.png…');
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'audit_chem_copper_flame.png'),
  });

  // 3. Switch to Strontium (Sr2+)
  console.log('Switching to Strontium (Sr2+)…');
  await page.evaluate(() => {
    const pills = Array.from(document.querySelectorAll('.vz-btn-pill'));
    const srBtn = pills.find((p) => p.textContent.includes('Sr'));
    if (srBtn) srBtn.click();
  });
  await new Promise((r) => setTimeout(r, 1000));

  console.log('Capturing audit_chem_strontium_flame.png…');
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'audit_chem_strontium_flame.png'),
  });

  // 4. Switch to Potassium (K+)
  console.log('Switching to Potassium (K+)…');
  await page.evaluate(() => {
    const pills = Array.from(document.querySelectorAll('.vz-btn-pill'));
    const kBtn = pills.find((p) => p.textContent.includes('K'));
    if (kBtn) kBtn.click();
  });
  await new Promise((r) => setTimeout(r, 1000));

  console.log('Capturing audit_chem_potassium_flame.png…');
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'audit_chem_potassium_flame.png'),
  });

  // 5. Test Safety Flame Mode (Air collar closed)
  console.log('Testing Safety Flame mode (air collar slider to 0%)…');
  await page.evaluate(() => {
    const slider = document.getElementById('vz-chem-air-slider');
    if (slider) {
      slider.value = '0';
      slider.dispatchEvent(new Event('input', { bubbles: true }));
    }
  });
  await new Promise((r) => setTimeout(r, 1500));

  console.log('Capturing audit_chem_safety_yellow_flame.png…');
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'audit_chem_safety_yellow_flame.png'),
  });

  await browser.close();
  console.log('Audit complete! Total console errors:', consoleErrors.length);
})();
