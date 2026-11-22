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

  // Helper to wait
  const wait = ms => new Promise(res => setTimeout(res, ms));

  // 1. Desktop Test - Physics Pod
  console.log('--- Test 1: Desktop Mode (Physics Pod) ---');
  await page.evaluate(() => {
    // Navigate to physics station
    const btn = Array.from(document.querySelectorAll('.vz-nav-btn')).find(b => b.textContent.includes('Physics'));
    if (btn) btn.click();
  });
  await wait(1000);

  // Check that Physics menu is visible and has Auto-Hide button
  let state = await page.evaluate(() => {
    const container = document.getElementById('vz-panel-container');
    const autoHideBtn = container.querySelector('.vz-panel.visible .vz-panel-autohide-btn');
    const closeBtn = container.querySelector('.vz-panel.visible .vz-panel-close-btn');
    const track = container.querySelector('.vz-panel.visible .vz-autohide-track');
    const isHidden = container.classList.contains('hidden-state');
    return {
      hasContainer: !!container,
      isHidden,
      hasAutoHideBtn: !!autoHideBtn,
      autoHideBtnText: autoHideBtn ? autoHideBtn.innerText : null,
      autoHideBtnActive: autoHideBtn ? autoHideBtn.classList.contains('active') : false,
      hasCloseBtn: !!closeBtn,
      hasTrack: !!track,
    };
  });
  console.log('Physics Pod initial state:', state);

  await page.screenshot({ path: `${artifactDir}/verify_autohide_desktop_physics_visible.png` });

  // Wait 6.5s of inactivity so auto-hide triggers
  console.log('Waiting 6.5s for auto-hide to trigger on desktop...');
  await wait(6500);

  state = await page.evaluate(() => {
    const container = document.getElementById('vz-panel-container');
    const edgeTab = document.getElementById('vz-global-edge-tab');
    return {
      panelHidden: container.classList.contains('hidden-state'),
      edgeTabVisible: edgeTab.classList.contains('visible'),
      edgeTabLabel: edgeTab.innerText,
    };
  });
  console.log('Physics Pod after 6.5s inactivity:', state);
  await page.screenshot({ path: `${artifactDir}/verify_autohide_desktop_physics_hidden.png` });

  // Click edge tab to restore
  console.log('Clicking edge tab to restore Physics pod menu...');
  await page.evaluate(() => {
    const edgeTab = document.getElementById('vz-global-edge-tab');
    edgeTab.click();
  });
  await wait(500);

  state = await page.evaluate(() => {
    const container = document.getElementById('vz-panel-container');
    const edgeTab = document.getElementById('vz-global-edge-tab');
    return {
      panelHidden: container.classList.contains('hidden-state'),
      edgeTabVisible: edgeTab.classList.contains('visible'),
    };
  });
  console.log('After clicking edge tab:', state);

  // Toggle Auto-Hide OFF
  console.log('Toggling Auto-Hide OFF...');
  await page.evaluate(() => {
    const autoHideBtn = document.querySelector('.vz-panel.visible .vz-panel-autohide-btn');
    autoHideBtn.click();
  });
  await wait(300);

  state = await page.evaluate(() => {
    const autoHideBtn = document.querySelector('.vz-panel.visible .vz-panel-autohide-btn');
    const track = document.querySelector('.vz-panel.visible .vz-autohide-track');
    return {
      autoHideBtnText: autoHideBtn ? autoHideBtn.innerText : null,
      autoHideBtnActive: autoHideBtn ? autoHideBtn.classList.contains('active') : false,
      trackDisplay: track ? track.style.display : null,
    };
  });
  console.log('After toggling Auto-Hide OFF:', state);
  await page.screenshot({ path: `${artifactDir}/verify_autohide_desktop_toggle_off.png` });

  // Wait 6.5s to verify it stays open when Auto-Hide is OFF
  console.log('Waiting 6.5s with Auto-Hide OFF (should remain open)...');
  await wait(6500);

  state = await page.evaluate(() => {
    const container = document.getElementById('vz-panel-container');
    return {
      panelHidden: container.classList.contains('hidden-state'),
    };
  });
  console.log('After 6.5s with Auto-Hide OFF (panelHidden should be false):', state);

  // Toggle Auto-Hide back ON
  console.log('Toggling Auto-Hide back ON...');
  await page.evaluate(() => {
    const autoHideBtn = document.querySelector('.vz-panel.visible .vz-panel-autohide-btn');
    autoHideBtn.click();
  });
  await wait(300);

  // 2. Mobile Portrait Test (Chemistry Pod)
  console.log('\n--- Test 2: Mobile Portrait Mode (Chemistry Pod) ---');
  await page.setViewport({ width: 375, height: 667, isMobile: true, hasTouch: true });
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('.vz-nav-btn')).find(b => b.textContent.includes('Chemistry'));
    if (btn) btn.click();
  });
  await wait(1000);

  state = await page.evaluate(() => {
    const container = document.getElementById('vz-panel-container');
    const activePanel = container.querySelector('.vz-panel.visible');
    const autoHideBtn = activePanel ? activePanel.querySelector('.vz-panel-autohide-btn') : null;
    const shortTxt = autoHideBtn ? autoHideBtn.querySelector('.vz-text-short') : null;
    const fullTxt = autoHideBtn ? autoHideBtn.querySelector('.vz-text-full') : null;
    const shortComputed = shortTxt ? window.getComputedStyle(shortTxt).display : null;
    const fullComputed = fullTxt ? window.getComputedStyle(fullTxt).display : null;
    return {
      panelWidth: container.offsetWidth,
      autoHideBtnText: autoHideBtn ? autoHideBtn.innerText : null,
      shortComputed,
      fullComputed,
    };
  });
  console.log('Mobile Portrait Chemistry Pod state:', state);
  await page.screenshot({ path: `${artifactDir}/verify_autohide_mobile_portrait_chem_visible.png` });

  console.log('Waiting 6.5s for mobile auto-hide to trigger...');
  await wait(6500);

  state = await page.evaluate(() => {
    const container = document.getElementById('vz-panel-container');
    const edgeTab = document.getElementById('vz-global-edge-tab');
    return {
      panelHidden: container.classList.contains('hidden-state'),
      edgeTabVisible: edgeTab.classList.contains('visible'),
      edgeTabLabel: edgeTab.innerText,
      edgeTabRect: edgeTab.getBoundingClientRect(),
    };
  });
  console.log('Mobile Portrait after auto-hide:', state);
  await page.screenshot({ path: `${artifactDir}/verify_autohide_mobile_portrait_chem_hidden.png` });

  // 3. Tablet Landscape Test (Astronomy Pod)
  console.log('\n--- Test 3: Tablet Landscape Mode (Astronomy Pod) ---');
  await page.setViewport({ width: 1024, height: 768, isMobile: true, hasTouch: true });
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('.vz-nav-btn')).find(b => b.textContent.includes('Astronomy'));
    if (btn) btn.click();
  });
  await wait(1000);

  state = await page.evaluate(() => {
    const container = document.getElementById('vz-panel-container');
    const activePanel = container.querySelector('.vz-panel.visible');
    const autoHideBtn = activePanel ? activePanel.querySelector('.vz-panel-autohide-btn') : null;
    return {
      panelWidth: container.offsetWidth,
      panelHeight: container.offsetHeight,
      autoHideBtnText: autoHideBtn ? autoHideBtn.innerText : null,
      autoHideActive: autoHideBtn ? autoHideBtn.classList.contains('active') : false,
    };
  });
  console.log('Tablet Landscape Astronomy Pod state:', state);
  await page.screenshot({ path: `${artifactDir}/verify_autohide_tablet_landscape_astro_visible.png` });

  // 4. Verify all 5 pods have the Auto-Hide control
  console.log('\n--- Test 4: Verifying Auto-Hide option on all 5 pods ---');
  const stations = ['physics', 'chemistry', 'biology', 'mathematics', 'astronomy'];
  const results = {};
  for (const st of stations) {
    const r = await page.evaluate((key) => {
      const btn = Array.from(document.querySelectorAll('.vz-nav-btn')).find(b => b.innerHTML.toLowerCase().includes(key));
      if (btn) btn.click();
      const p = document.querySelector(`.vz-panel.${key}`) || document.querySelectorAll('.vz-panel')[['physics', 'chemistry', 'biology', 'mathematics', 'astronomy'].indexOf(key)];
      const autoBtn = p ? p.querySelector('.vz-panel-autohide-btn') : null;
      const closeBtn = p ? p.querySelector('.vz-panel-close-btn') : null;
      const track = p ? p.querySelector('.vz-autohide-track') : null;
      return {
        hasAutoHideBtn: !!autoBtn,
        autoBtnText: autoBtn ? autoBtn.innerText.trim() : null,
        hasCloseBtn: !!closeBtn,
        hasTrack: !!track,
      };
    }, st);
    results[st] = r;
    await wait(300);
  }
  console.log('All 5 pods check:', JSON.stringify(results, null, 2));

  await browser.close();
  console.log('\nAll tests completed successfully!');
})();
