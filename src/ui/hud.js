// src/ui/hud.js — Glassmorphic HUD overlay: nav bar + context-sensitive station panels
// Pure HTML/CSS injected into the DOM. No external stylesheets required.
import { FLAME_ELEMENTS } from '../stations/chemistry.js';
import { ambientAudio } from '../audio/ambientAudio.js';

/**
 * @typedef {Object} StationContexts
 * @property {Object} physics
 * @property {Object} chemistry
 * @property {Object} biology
 * @property {Object} math
 * @property {Object} astroRobotics
 * @property {{ transitionTo: Function, transitionToSpawn: Function, onStationChange: Function }} cameraAnim
 */

// ─── Station metadata ───
const STATIONS = [
  { key: 'physics',      icon: '⚡', label: 'Physics' },
  { key: 'chemistry',    icon: '🧪', label: 'Chemistry' },
  { key: 'biology',      icon: '🧬', label: 'Biology' },
  { key: 'mathematics',  icon: '📐', label: 'Mathematics' },
  { key: 'astronomy',    icon: '🔭', label: 'Astronomy' },
];

// ─── CSS injection ───
function injectStyles() {
  if (document.getElementById('vizon-hud-styles')) return;
  const style = document.createElement('style');
  style.id = 'vizon-hud-styles';
  style.textContent = /* css */ `
    /* ── Reset for HUD layer ── */
    #vizon-hud {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 1000;
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      color: #e0e8ff;
      -webkit-font-smoothing: antialiased;
    }

    /* ── Glassmorphic base ── */
    .vz-glass {
      background: rgba(10, 14, 26, 0.6);
      backdrop-filter: blur(20px) saturate(1.4);
      -webkit-backdrop-filter: blur(20px) saturate(1.4);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
    }

    /* ═══════════════════════════════
       NAV BAR — bottom center pill
    ═══════════════════════════════ */
    #vz-navbar {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      gap: 2px;
      padding: 6px 8px;
      pointer-events: auto;
      z-index: 1001;
      transition: opacity 0.3s ease;
    }

    .vz-nav-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2px;
      padding: 10px 14px;
      border: 2px solid transparent;
      border-radius: 12px;
      background: transparent;
      color: #e0e8ff;
      cursor: pointer;
      transition: all 0.25s ease;
      font-family: inherit;
      pointer-events: auto;
      min-width: 64px;
    }

    .vz-nav-btn:hover {
      background: rgba(0, 229, 255, 0.08);
      border-color: rgba(0, 229, 255, 0.25);
    }

    .vz-nav-btn.active {
      border-color: #00e5ff;
      background: rgba(0, 229, 255, 0.12);
    }

    .vz-nav-btn.active .vz-nav-label {
      color: #00e5ff;
    }

    .vz-nav-icon {
      font-size: 20px;
      line-height: 1;
    }

    .vz-nav-label {
      font-size: 9px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      opacity: 0.7;
      transition: color 0.25s ease, opacity 0.25s ease;
    }

    .vz-nav-btn:hover .vz-nav-label,
    .vz-nav-btn.active .vz-nav-label {
      opacity: 1;
    }

    /* Home divider */
    .vz-nav-divider {
      width: 1px;
      height: 32px;
      background: rgba(255, 255, 255, 0.1);
      margin: 0 4px;
    }

    /* ═══════════════════════════════
       STATION PANELS — responsive right side with hide/show
    ═══════════════════════════════ */
    #vz-panel-container {
      position: fixed;
      top: 50%;
      right: 24px;
      transform: translateY(-50%);
      pointer-events: none;
      z-index: 1001;
      width: 275px;
      max-height: calc(100vh - 160px);
      transition: opacity 0.35s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }

    #vz-panel-container.hidden-state {
      opacity: 0;
      transform: translateY(-50%) translateX(35px);
      pointer-events: none !important;
    }

    .vz-panel {
      pointer-events: auto;
      padding: 16px 18px;
      opacity: 0;
      transform: translateX(20px);
      transition: opacity 0.35s ease, transform 0.35s ease;
      display: none;
      max-height: calc(100vh - 160px);
      overflow-y: auto;
      overflow-x: hidden;
      border-radius: 14px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.65), 0 0 16px rgba(0, 229, 255, 0.12);
    }

    .vz-panel::-webkit-scrollbar {
      width: 4px;
    }
    .vz-panel::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.04);
      border-radius: 2px;
    }
    .vz-panel::-webkit-scrollbar-thumb {
      background: rgba(0, 229, 255, 0.35);
      border-radius: 2px;
    }

    .vz-panel.visible {
      display: block;
      opacity: 1;
      transform: translateX(0);
    }

    .vz-panel-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
      padding-bottom: 8px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }

    .vz-panel-title {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.10em;
      color: #00e5ff;
      margin: 0;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .vz-panel-close-btn {
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.18);
      border-radius: 6px;
      color: rgba(224, 232, 255, 0.8);
      cursor: pointer;
      font-size: 10px;
      font-weight: 700;
      font-family: inherit;
      padding: 3px 8px;
      line-height: 1;
      letter-spacing: 0.06em;
      display: inline-flex;
      align-items: center;
      gap: 3px;
      transition: all 0.2s ease;
    }

    .vz-panel-close-btn:hover {
      color: #00e5ff;
      background: rgba(0, 229, 255, 0.2);
      border-color: rgba(0, 229, 255, 0.5);
      box-shadow: 0 0 10px rgba(0, 229, 255, 0.3);
    }

    /* Universal Edge Tab for reopening hidden controls across all pods */
    .vz-edge-tab {
      position: fixed;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      padding: 9px 14px 9px 12px;
      border: 1px solid rgba(0, 229, 255, 0.5);
      border-right: none;
      border-radius: 10px 0 0 10px;
      background: rgba(8, 14, 28, 0.92);
      backdrop-filter: blur(18px);
      -webkit-backdrop-filter: blur(18px);
      color: #00e5ff;
      font-family: inherit;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      cursor: pointer;
      pointer-events: auto;
      z-index: 1002;
      display: none;
      align-items: center;
      gap: 7px;
      transition: all 0.25s ease;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6), 0 0 14px rgba(0, 229, 255, 0.25);
    }

    .vz-edge-tab:hover {
      background: rgba(0, 229, 255, 0.22);
      box-shadow: 0 0 18px rgba(0, 229, 255, 0.55);
      transform: translateY(-50%) translateX(-2px);
    }

    .vz-edge-tab.visible {
      display: flex;
    }

    /* ── Bottom Nav Sound Button ── */
    .vz-sound-btn {
      margin-left: 2px;
      transition: all 0.2s ease;
    }
    .vz-sound-btn.playing {
      color: #00e5ff;
    }
    .vz-sound-btn.muted {
      color: rgba(224, 232, 255, 0.45);
    }
    .vz-sound-btn:hover {
      color: #00e5ff;
      background: rgba(0, 229, 255, 0.15);
    }
    .vz-nav-music-svg {
      display: block;
      transition: transform 0.2s ease;
    }
    .vz-sound-btn:hover .vz-nav-music-svg {
      transform: scale(1.15);
    }

    .vz-panel-row {
      margin-bottom: 14px;
    }

    .vz-panel-row:last-child {
      margin-bottom: 0;
    }

    .vz-panel-label {
      font-size: 9px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      opacity: 0.6;
      margin-bottom: 6px;
      display: block;
    }

    .vz-panel-info {
      font-size: 11px;
      opacity: 0.5;
      line-height: 1.5;
    }

    /* ── Custom range slider ── */
    .vz-slider {
      -webkit-appearance: none;
      appearance: none;
      width: 100%;
      height: 4px;
      border-radius: 2px;
      background: rgba(255, 255, 255, 0.1);
      outline: none;
      pointer-events: auto;
      cursor: pointer;
    }

    .vz-slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: #ffffff;
      border: 2px solid #00e5ff;
      cursor: pointer;
      box-shadow: 0 0 8px rgba(0, 229, 255, 0.4);
      transition: box-shadow 0.2s ease;
    }

    .vz-slider::-webkit-slider-thumb:hover {
      box-shadow: 0 0 14px rgba(0, 229, 255, 0.7);
    }

    .vz-slider::-moz-range-thumb {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: #ffffff;
      border: 2px solid #00e5ff;
      cursor: pointer;
      box-shadow: 0 0 8px rgba(0, 229, 255, 0.4);
    }

    .vz-slider::-webkit-slider-runnable-track {
      height: 4px;
      border-radius: 2px;
      background: linear-gradient(to right, #00e5ff var(--fill, 50%), rgba(255,255,255,0.1) var(--fill, 50%));
    }

    .vz-slider::-moz-range-track {
      height: 4px;
      border-radius: 2px;
      background: rgba(255, 255, 255, 0.1);
    }

    .vz-slider::-moz-range-progress {
      height: 4px;
      border-radius: 2px;
      background: #00e5ff;
    }

    .vz-slider-value {
      font-size: 12px;
      font-weight: 600;
      color: #00e5ff;
      text-align: right;
      margin-top: 4px;
    }

    /* ── Organelle buttons ── */
    .vz-btn-group {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .vz-btn-pill {
      padding: 6px 12px;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.04);
      color: #e0e8ff;
      font-family: inherit;
      font-size: 10px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      cursor: pointer;
      transition: all 0.2s ease;
      pointer-events: auto;
    }

    .vz-btn-pill:hover {
      background: rgba(0, 229, 255, 0.1);
      border-color: rgba(0, 229, 255, 0.3);
    }

    .vz-btn-pill.active {
      background: rgba(0, 229, 255, 0.15);
      border-color: #00e5ff;
      color: #00e5ff;
    }

    /* ── Weld target dual-axis control ── */
    .vz-dual-slider {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .vz-dual-slider .vz-axis-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .vz-dual-slider .vz-axis-label {
      font-size: 10px;
      font-weight: 700;
      opacity: 0.5;
      width: 12px;
      flex-shrink: 0;
    }

    .vz-dual-slider .vz-slider {
      flex: 1;
    }

    /* ═══════════════════════════════
       RESPONSIVE — Device-Tailored HUD
    ═══════════════════════════════ */
    @media (max-width: 900px) {
      #vz-navbar {
        bottom: 12px;
        padding: 4px 6px;
        gap: 2px;
      }

      .vz-nav-btn {
        padding: 6px 8px;
        min-width: 46px;
      }

      .vz-nav-icon {
        font-size: 15px;
      }

      .vz-nav-label {
        font-size: 8px;
      }

      #vz-panel-container {
        right: 14px;
        width: 245px;
      }

      .vz-panel {
        padding: 14px 16px;
      }
    }

    @media (max-width: 640px) {
      .vz-nav-label {
        display: none;
      }

      .vz-nav-btn {
        min-width: 38px;
        padding: 7px 5px;
      }

      /* Compact corner positioning on mobile so main 3D experiment is 100% visible */
      #vz-panel-container {
        top: auto;
        bottom: 78px;
        right: 10px;
        left: auto;
        width: 285px;
        max-width: calc(100vw - 20px);
        max-height: 42vh;
        transform: none;
      }

      #vz-panel-container.hidden-state {
        transform: translateY(20px);
      }

      .vz-edge-tab {
        top: auto;
        bottom: 78px;
        right: 10px;
        border-radius: 20px;
        border-right: 1px solid rgba(0, 229, 255, 0.5);
        transform: none;
        padding: 7px 14px;
      }

      .vz-edge-tab:hover {
        transform: translateY(-2px);
      }
    }
  `;
  document.head.appendChild(style);
}

// ─── Helpers ───

/** Create an element with optional class, attributes, and children. */
function el(tag, { cls, attrs, html, children } = {}) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (attrs) for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
  if (html) e.innerHTML = html;
  if (children) for (const c of children) e.appendChild(c);
  return e;
}

/** Update the fill gradient CSS variable on a slider. */
function updateSliderFill(slider) {
  const min = parseFloat(slider.min) || 0;
  const max = parseFloat(slider.max) || 100;
  const val = parseFloat(slider.value);
  const pct = ((val - min) / (max - min)) * 100;
  slider.style.setProperty('--fill', `${pct}%`);
}

/** Create a standardized panel header with title and HIDE toggle button. */
function createPanelHeader(titleText, onHide) {
  const header = el('div', { cls: 'vz-panel-header' });
  const title = el('div', { cls: 'vz-panel-title', html: titleText });
  const hideBtn = el('button', {
    cls: 'vz-panel-close-btn',
    html: '<span style="font-size:11px; margin-right:3px;">✕</span> HIDE',
    attrs: { title: 'Hide controls for unobstructed 3D viewing' },
  });
  hideBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    onHide?.();
  });
  header.appendChild(title);
  header.appendChild(hideBtn);
  return header;
}

/**
 * Builds the complete HUD overlay and injects it into the DOM.
 *
 * @param {StationContexts} ctx
 * @returns {{ setActiveStation: (key: string|null) => void }}
 */
export function buildHUD(ctx) {
  injectStyles();

  const { cameraAnim } = ctx;

  // ════════════════════════════════
  //  ROOT CONTAINER
  // ════════════════════════════════
  const hud = el('div', { attrs: { id: 'vizon-hud' } });
  document.body.appendChild(hud);

  // ════════════════════════════════
  //  NAV BAR
  // ════════════════════════════════
  const navbar = el('div', { cls: 'vz-glass', attrs: { id: 'vz-navbar' } });
  hud.appendChild(navbar);

  // Home button
  const homeBtn = el('button', {
    cls: 'vz-nav-btn',
    html: `<span class="vz-nav-icon">🏠</span><span class="vz-nav-label">Home</span>`,
  });
  homeBtn.addEventListener('click', () => {
    setActiveStation(null);
    cameraAnim.transitionToSpawn();
  });
  navbar.appendChild(homeBtn);

  // Divider
  navbar.appendChild(el('div', { cls: 'vz-nav-divider' }));

  // Station buttons
  const navButtons = {};
  for (const st of STATIONS) {
    const btn = el('button', {
      cls: 'vz-nav-btn',
      html: `<span class="vz-nav-icon">${st.icon}</span><span class="vz-nav-label">${st.label}</span>`,
    });
    btn.addEventListener('click', () => {
      setActiveStation(st.key);
      cameraAnim.transitionTo(st.key);
    });
    navbar.appendChild(btn);
    navButtons[st.key] = btn;
  }

  // Divider before audio
  navbar.appendChild(el('div', { cls: 'vz-nav-divider' }));

  // ── Bottom Nav Audio Control (Music symbol to unmute, cut music symbol to mute) ──
  const soundBtn = el('button', {
    cls: 'vz-nav-btn vz-sound-btn muted',
    attrs: { id: 'vz-nav-sound-btn', title: 'Unmute Ambient Sound' },
  });

  const soundIconWrap = el('span', { cls: 'vz-nav-icon' });
  const soundLabel = el('span', { cls: 'vz-nav-label', html: 'Sound' });
  soundBtn.appendChild(soundIconWrap);
  soundBtn.appendChild(soundLabel);
  navbar.appendChild(soundBtn);

  function updateSoundButton() {
    const isMuted = ambientAudio.isMuted || !ambientAudio.isPlaying;
    if (isMuted) {
      // Muted: show music symbol to UNMUTE
      soundIconWrap.innerHTML = `
        <svg class="vz-nav-music-svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 18V5l12-2v13"></path>
          <circle cx="6" cy="18" r="3" fill="currentColor"></circle>
          <circle cx="18" cy="16" r="3" fill="currentColor"></circle>
        </svg>
      `;
      soundLabel.textContent = 'Unmute';
      soundBtn.classList.add('muted');
      soundBtn.classList.remove('playing');
      soundBtn.setAttribute('title', 'Click to Unmute Ambient Sound');
    } else {
      // Playing: show cut music symbol to MUTE
      soundIconWrap.innerHTML = `
        <svg class="vz-nav-music-svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 18V5l12-2v13"></path>
          <circle cx="6" cy="18" r="3" fill="currentColor"></circle>
          <circle cx="18" cy="16" r="3" fill="currentColor"></circle>
          <line x1="3" y1="3" x2="21" y2="21" stroke="#ff4757" stroke-width="2.5"></line>
        </svg>
      `;
      soundLabel.textContent = 'Mute';
      soundBtn.classList.remove('muted');
      soundBtn.classList.add('playing');
      soundBtn.setAttribute('title', 'Click to Mute Ambient Sound');
    }
  }

  soundBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    ambientAudio.toggle();
    updateSoundButton();
  });

  ambientAudio.onStateChange(() => {
    updateSoundButton();
  });

  updateSoundButton();

  // ════════════════════════════════
  //  STATION PANELS (right side)
  // ════════════════════════════════
  const panelContainer = el('div', { attrs: { id: 'vz-panel-container' } });
  hud.appendChild(panelContainer);

  let isControlsHidden = false;

  // Universal Edge Tab for reopening hidden controls
  const globalEdgeTab = el('button', {
    cls: 'vz-edge-tab',
    attrs: { id: 'vz-global-edge-tab', title: 'Show Station Controls' },
  });
  globalEdgeTab.innerHTML = `<span class="vz-edge-icon">⚙️</span><span class="vz-edge-label">SHOW CONTROLS</span>`;
  document.body.appendChild(globalEdgeTab);

  function hideControls() {
    isControlsHidden = true;
    panelContainer.classList.add('hidden-state');
    if (currentStation) {
      const st = STATIONS.find((s) => s.key === currentStation);
      globalEdgeTab.innerHTML = `<span class="vz-edge-icon">${st?.icon || '⚙️'}</span><span class="vz-edge-label">SHOW ${st?.label.toUpperCase() || 'CONTROLS'}</span>`;
      globalEdgeTab.classList.add('visible');
    }
  }

  function showControls() {
    isControlsHidden = false;
    panelContainer.classList.remove('hidden-state');
    globalEdgeTab.classList.remove('visible');
  }

  globalEdgeTab.addEventListener('click', (e) => {
    e.stopPropagation();
    showControls();
  });

  const onHide = () => {
    hideControls();
  };

  const panels = {};

  // ── Physics Panel ──
  panels.physics = buildPhysicsPanel(ctx.physics, onHide);
  panelContainer.appendChild(panels.physics);

  // ── Chemistry Panel ──
  panels.chemistry = buildChemistryPanel(ctx.chemistry, onHide);
  panelContainer.appendChild(panels.chemistry);

  // ── Biology Panel ──
  panels.biology = buildBiologyPanel(ctx.biology, onHide);
  panelContainer.appendChild(panels.biology);

  // ── Mathematics Panel ──
  panels.mathematics = buildMathPanel(ctx.math, onHide);
  panelContainer.appendChild(panels.mathematics);

  // ── Astronomy Panel ──
  panels.astronomy = buildAstronomyPanel(ctx.astroRobotics, onHide);
  panelContainer.appendChild(panels.astronomy);

  // ════════════════════════════════
  //  STATE MANAGEMENT
  // ════════════════════════════════
  let currentStation = null;

  function setActiveStation(key) {
    currentStation = key;

    // Update nav button highlights
    homeBtn.classList.toggle('active', key === null);
    for (const st of STATIONS) {
      navButtons[st.key].classList.toggle('active', st.key === key);
    }

    if (key === null) {
      // At home: hide edge tab and panels
      globalEdgeTab.classList.remove('visible');
      panelContainer.classList.remove('hidden-state');
      isControlsHidden = false;
      for (const st of STATIONS) {
        panels[st.key].classList.remove('visible');
        panels[st.key].style.display = 'none';
      }
      return;
    }

    // Entering a station: show controls
    isControlsHidden = false;
    panelContainer.classList.remove('hidden-state');
    globalEdgeTab.classList.remove('visible');

    // Show/hide panels
    for (const st of STATIONS) {
      const panel = panels[st.key];
      if (st.key === key) {
        panel.style.display = 'block';
        panel.offsetHeight; // Force reflow
        panel.classList.add('visible');
      } else {
        panel.classList.remove('visible');
        const p = panel;
        const handler = () => {
          if (!p.classList.contains('visible')) p.style.display = 'none';
          p.removeEventListener('transitionend', handler);
        };
        p.addEventListener('transitionend', handler);
        setTimeout(() => {
          if (!p.classList.contains('visible')) p.style.display = 'none';
        }, 400);
      }
    }
  }

  // Listen to camera animation station changes
  if (cameraAnim.onStationChange) {
    cameraAnim.onStationChange((key) => {
      setActiveStation(key);
    });
  }

  // Start at home
  setActiveStation(null);

  return {
    setActiveStation,
    get currentStation() {
      return currentStation;
    },
  };
}

// ════════════════════════════════════════
//  PANEL BUILDERS
// ════════════════════════════════════════

function buildPhysicsPanel(physicsCtx, onHide) {
  const panel = el('div', { cls: 'vz-panel vz-glass' });
  panel.appendChild(createPanelHeader('⚡ Physics Controls', onHide));

  // Voltage slider
  const row = el('div', { cls: 'vz-panel-row' });
  const label = el('span', { cls: 'vz-panel-label', html: 'Voltage' });
  row.appendChild(label);

  const slider = el('input', {
    cls: 'vz-slider',
    attrs: { type: 'range', min: '0', max: '100', step: '1', value: '50' },
  });

  const valueDisplay = el('div', { cls: 'vz-slider-value', html: '50%' });

  slider.addEventListener('input', () => {
    const v = parseFloat(slider.value) / 100;
    valueDisplay.textContent = `${slider.value}%`;
    updateSliderFill(slider);
    if (physicsCtx?.controls?.voltage) {
      physicsCtx.controls.voltage.value = v;
    }
  });

  updateSliderFill(slider);
  row.appendChild(slider);
  row.appendChild(valueDisplay);
  panel.appendChild(row);

  return panel;
}

function buildChemistryPanel(chemCtx, onHide) {
  const panel = el('div', { cls: 'vz-panel vz-glass' });
  panel.appendChild(createPanelHeader('🧪 Flame Test & Spectroscopy', onHide));

  // Metal Salt Inoculation Selector
  const elemRow = el('div', { cls: 'vz-panel-row' });
  const elemLabel = el('span', { cls: 'vz-panel-label', html: 'Inoculate Element Salt' });
  elemRow.appendChild(elemLabel);

  const elemGroup = el('div', { cls: 'vz-btn-group' });

  const elements = [
    { key: 'sodium',    label: '🟡 Na⁺ (589nm)' },
    { key: 'copper',    label: '🟢 Cu²⁺ (521nm)' },
    { key: 'strontium', label: '🔴 Sr²⁺ (668nm)' },
    { key: 'potassium', label: '🟣 K⁺ (404nm)' },
    { key: 'barium',    label: '🍏 Ba²⁺ (553nm)' },
    { key: 'calcium',   label: '🟠 Ca²⁺ (622nm)' },
    { key: 'clean',     label: '🔵 Pure Blue (HCl)' },
  ];

  let activeElem = 'sodium';
  const elemButtons = {};

  const infoCard = el('div', {
    cls: 'vz-panel-info',
    style: 'margin-top:12px; padding:10px; background:rgba(0,0,0,0.4); border-radius:6px; border-left:3px solid #ffea00; font-size:11px; line-height:1.45;',
  });

  function updateInfo(key) {
    const data = FLAME_ELEMENTS[key] || FLAME_ELEMENTS.sodium;
    infoCard.style.borderLeftColor = data.spectralLines[0]?.color || '#00e5ff';
    infoCard.innerHTML = `
      <div style="font-weight:700; color:#fff; margin-bottom:3px;">${data.name} [${data.ion}]</div>
      <div style="opacity:0.85; margin-bottom:2px;"><b>Salt:</b> ${data.salt}</div>
      <div style="opacity:0.85; margin-bottom:2px;"><b>Flame:</b> ${data.colorName}</div>
      <div style="opacity:0.85; margin-bottom:2px;"><b>Key Lines:</b> ${data.wavelengths.join(', ')}</div>
      <div style="opacity:0.75; font-size:10px; margin-top:4px; color:#00e5ff;"><b>Quantum Transition:</b> ${data.quantumTransition} (ΔE ≈ ${data.deltaE})</div>
    `;
  }

  for (const item of elements) {
    const btn = el('button', {
      cls: `vz-btn-pill${item.key === 'sodium' ? ' active' : ''}`,
      html: item.label,
    });
    btn.addEventListener('click', () => {
      activeElem = item.key;
      for (const [k, b] of Object.entries(elemButtons)) {
        b.classList.toggle('active', k === item.key);
      }
      chemCtx?.controls?.setElement?.(item.key);
      updateInfo(item.key);
    });
    elemButtons[item.key] = btn;
    elemGroup.appendChild(btn);
  }

  elemRow.appendChild(elemGroup);
  panel.appendChild(elemRow);

  // Air Collar Slider (Safety vs Roaring Premixed Flame)
  const collarRow = el('div', { cls: 'vz-panel-row', style: 'margin-top:10px;' });
  const collarLabel = el('span', { cls: 'vz-panel-label', html: 'Air Collar (Premix Ratio)' });
  collarRow.appendChild(collarLabel);

  const slider = el('input', {
    cls: 'vz-slider',
    attrs: { id: 'vz-chem-air-slider', type: 'range', min: '0', max: '100', step: '1', value: '100' },
  });

  const valueDisplay = el('div', { cls: 'vz-slider-value', html: 'Roaring Flame (100% Air)' });

  slider.addEventListener('input', () => {
    const v = parseFloat(slider.value) / 100;
    if (v < 0.25) {
      valueDisplay.textContent = 'Safety Flame (Yellow/Cool)';
    } else if (v < 0.75) {
      valueDisplay.textContent = `Partial Premix (${slider.value}%)`;
    } else {
      valueDisplay.textContent = `Roaring Flame (${slider.value}% Air)`;
    }
    updateSliderFill(slider);
    if (chemCtx?.controls?.airCollar) {
      chemCtx.controls.airCollar.value = v;
    }
  });

  updateSliderFill(slider);
  collarRow.appendChild(slider);
  collarRow.appendChild(valueDisplay);
  panel.appendChild(collarRow);

  // Educational info card
  updateInfo('sodium');
  panel.appendChild(infoCard);

  return panel;
}

function buildBiologyPanel(bioCtx, onHide) {
  const panel = el('div', { cls: 'vz-panel vz-glass' });
  panel.appendChild(createPanelHeader('🧬 Biology Controls', onHide));

  // Organelle isolation buttons
  const row = el('div', { cls: 'vz-panel-row' });
  const label = el('span', { cls: 'vz-panel-label', html: 'Organelle Isolation' });
  row.appendChild(label);

  const group = el('div', { cls: 'vz-btn-group' });

  const organelles = [
    { key: 'all',           label: 'All' },
    { key: 'nucleus',       label: 'Nucleus' },
    { key: 'mitochondria',  label: 'Mito' },
    { key: 'er',            label: 'ER & Ribosomes' },
    { key: 'golgi',         label: 'Golgi' },
    { key: 'centrioles',    label: 'Centrioles' },
  ];

  let activeOrganelle = 'all';
  const orgButtons = {};

  for (const org of organelles) {
    const btn = el('button', {
      cls: `vz-btn-pill${org.key === 'all' ? ' active' : ''}`,
      html: org.label,
    });
    btn.addEventListener('click', () => {
      activeOrganelle = org.key;
      // Update button states
      for (const [k, b] of Object.entries(orgButtons)) {
        b.classList.toggle('active', k === org.key);
      }
      // Feed control
      if (bioCtx?.controls?.organelleIsolation) {
        bioCtx.controls.organelleIsolation.value = org.key;
      }
    });
    orgButtons[org.key] = btn;
    group.appendChild(btn);
  }

  row.appendChild(group);
  panel.appendChild(row);

  // High-Resolution SGU Medical Atlas Modal Button
  const sguRow = el('div', { cls: 'vz-panel-row', style: 'margin-top:10px; display:flex; justify-content:space-between; align-items:center;' });
  const sguBtn = el('button', {
    cls: 'vz-btn-pill',
    style: 'width:100%; font-weight:800; background:rgba(14, 165, 233, 0.2); border-color:#00e5ff; color:#38bdf8;',
    html: '🔬 Launch SGU 3.5M Cell Atlas',
  });
  sguBtn.addEventListener('click', () => {
    bioCtx?.openSguModal?.();
  });
  sguRow.appendChild(sguBtn);
  panel.appendChild(sguRow);

  return panel;
}

function buildMathPanel(mathCtx, onHide) {
  const panel = el('div', { cls: 'vz-panel vz-glass' });
  panel.appendChild(createPanelHeader('📐 Mathematics', onHide));

  // ── Mode Selector ──
  const modeRow = el('div', { cls: 'vz-panel-row' });
  const modeLabel = el('span', { cls: 'vz-panel-label', html: 'Topological Geometry' });
  modeRow.appendChild(modeLabel);

  const modeGroup = el('div', { cls: 'vz-btn-group' });
  const modes = [
    { key: 'hypercube', label: '4D Hypercube' },
    { key: 'harmonic', label: 'Harmonic' },
    { key: 'dual', label: 'Dual Overlay' },
  ];

  const modeButtons = {};
  for (const m of modes) {
    const btn = el('button', {
      cls: `vz-tag-btn ${m.key === 'hypercube' ? 'active' : ''}`,
      html: m.label,
    });
    btn.addEventListener('click', () => {
      for (const [k, b] of Object.entries(modeButtons)) {
        b.classList.toggle('active', k === m.key);
      }
      if (mathCtx?.controls?.displayMode) {
        mathCtx.controls.displayMode.value = m.key;
      }
    });
    modeButtons[m.key] = btn;
    modeGroup.appendChild(btn);
  }
  modeRow.appendChild(modeGroup);
  panel.appendChild(modeRow);

  // ── Rotation Speed Slider ──
  const speedRow = el('div', { cls: 'vz-panel-row' });
  const speedLabel = el('span', { cls: 'vz-panel-label', html: '4D Rotation Speed' });
  speedRow.appendChild(speedLabel);

  const speedSlider = el('input', {
    cls: 'vz-slider',
    attrs: { type: 'range', min: '0.1', max: '3.0', step: '0.1', value: '1.0' },
  });
  speedSlider.addEventListener('input', (e) => {
    if (mathCtx?.controls?.rotationSpeed) {
      mathCtx.controls.rotationSpeed.value = parseFloat(e.target.value);
    }
  });
  speedRow.appendChild(speedSlider);
  panel.appendChild(speedRow);

  const row = el('div', { cls: 'vz-panel-row' });
  const info = el('div', {
    cls: 'vz-panel-info',
    html: 'Visualizing 4D tesseract stereographic projection and standing-wave spherical harmonics.',
  });
  row.appendChild(info);
  panel.appendChild(row);

  return panel;
}

function buildAstronomyPanel(astroCtx, onHide) {
  const panel = el('div', { cls: 'vz-panel vz-glass', attrs: { id: 'vz-astro-panel' } });

  // ── Header with Title and Minimize/Dismiss Button ──
  panel.appendChild(createPanelHeader('🔭 Kepler Orrery & Deep Space', onHide));

  // ── Orbital time-scale slider ──
  const timeRow = el('div', { cls: 'vz-panel-row' });
  const timeLabel = el('span', { cls: 'vz-panel-label', html: 'Orbital Time Scale' });
  timeRow.appendChild(timeLabel);

  const timeSlider = el('input', {
    cls: 'vz-slider',
    attrs: { type: 'range', min: '0.1', max: '10', step: '0.1', value: '1' },
  });

  const timeValue = el('div', { cls: 'vz-slider-value', html: '1.0×' });

  timeSlider.addEventListener('input', () => {
    const v = parseFloat(timeSlider.value);
    timeValue.textContent = `${v.toFixed(1)}×`;
    updateSliderFill(timeSlider);
    if (astroCtx?.controls?.orbitalTimeScale) {
      astroCtx.controls.orbitalTimeScale.value = v;
    }
    resetAutoHide();
  });

  updateSliderFill(timeSlider);
  timeRow.appendChild(timeSlider);
  timeRow.appendChild(timeValue);
  panel.appendChild(timeRow);

  // ── Telemetry Quick-Select Info ──
  const infoRow = el('div', { cls: 'vz-panel-row' });
  const info = el('div', {
    cls: 'vz-panel-info',
    html: 'Touch or click any planet or the Sun to reveal live scientific telemetry cards and atmospheric data.',
  });
  infoRow.appendChild(info);
  panel.appendChild(infoRow);

  return panel;
}
