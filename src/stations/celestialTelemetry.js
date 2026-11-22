// src/stations/celestialTelemetry.js — Interactive Scientific Telemetry for Sun & Planets on Click/Touch
import * as THREE from 'three';

// ── AUTHENTIC SCIENTIFIC CELESTIAL DATABASE ──
export const CELESTIAL_DATA = {
  Sun: {
    name: 'THE SUN (SOL)',
    designation: 'G-Type Main-Sequence Star // Spectral Class G2V',
    accentColor: '#ffaa00',
    stats: [
      { label: 'EQUATORIAL RADIUS', value: '696,340 km (109.3 × Earth)' },
      { label: 'SOLAR MASS', value: '1.989 × 10³⁰ kg (333,000 × Earth)' },
      { label: 'SURFACE TEMPERATURE', value: '5,500 °C (5,778 K Photosphere)' },
      { label: 'CORE TEMPERATURE', value: '15,000,000 °C (Nuclear Fusion)' },
      { label: 'ROTATION PERIOD', value: '25.05 Days (Equator) to 34.4 Days (Poles)' },
      { label: 'SYSTEM MASS FRACTION', value: '99.86% of Total Solar System Mass' },
      { label: 'COMPOSITION', value: '73.46% Hydrogen, 24.85% Helium, 1.69% O/C/Fe' },
      { label: 'MAGNETIC PHENOMENA', value: 'Sunspots, Coronal Loops, Solar Flares & CMEs' },
    ],
    summary:
      'The central gravitational anchor of our solar system. A middle-aged G2V yellow dwarf star generating 3.828 × 10²⁶ Watts via proton-proton chain nuclear fusion in its core. Active magnetic fields drive sunspots and eruptive coronal mass ejections.',
  },

  Mercury: {
    name: 'MERCURY',
    designation: 'Terrestrial Planet // 1st from Sun',
    accentColor: '#9e9e9e',
    stats: [
      { label: 'DISTANCE FROM SUN', value: '57.9 Million km (0.387 AU)' },
      { label: 'MEAN RADIUS', value: '2,439.7 km (0.383 × Earth)' },
      { label: 'ORBITAL PERIOD', value: '87.97 Earth Days' },
      { label: 'SURFACE TEMPERATURE', value: '-180 °C (Night) to +430 °C (Day)' },
      { label: 'SURFACE GRAVITY', value: '3.7 m/s² (0.38 g)' },
      { label: 'NATURAL SATELLITES', value: '0 Moons' },
      { label: 'ATMOSPHERE', value: 'Trace Exosphere (Oxygen, Sodium, Hydrogen)' },
      { label: 'PRIMARY MISSIONS', value: 'Mariner 10, MESSENGER, BepiColombo' },
    ],
    summary:
      'Smallest planet in the solar system and closest to the Sun. Heavily cratered surface resembling Earth’s Moon, with a massive iron-nickel metallic core making up 85% of its planetary radius.',
  },

  Venus: {
    name: 'VENUS',
    designation: 'Terrestrial Planet // 2nd from Sun',
    accentColor: '#e6c280',
    stats: [
      { label: 'DISTANCE FROM SUN', value: '108.2 Million km (0.723 AU)' },
      { label: 'MEAN RADIUS', value: '6,051.8 km (0.949 × Earth)' },
      { label: 'ORBITAL PERIOD', value: '224.7 Earth Days (Retrograde Rotation)' },
      { label: 'SURFACE TEMPERATURE', value: '+465 °C (Lead-Melting Greenhouse)' },
      { label: 'SURFACE PRESSURE', value: '92 bar (Equivalent to 900m Underwater)' },
      { label: 'NATURAL SATELLITES', value: '0 Moons' },
      { label: 'ATMOSPHERIC COMP.', value: '96.5% CO₂, 3.5% N₂, Sulfuric Acid Clouds' },
      { label: 'PRIMARY MISSIONS', value: 'Venera 7-14, Magellan, Akatsuki, DAVINCI+' },
    ],
    summary:
      'Often called Earth’s twin in size and mass, but afflicted by a runaway greenhouse effect making it the hottest planet in the solar system. Rotates backwards relative to most planets with a day longer than its year (243 Earth days).',
  },

  Earth: {
    name: 'EARTH (TERRA)',
    designation: 'Terrestrial Planet // 3rd from Sun',
    accentColor: '#3b82f6',
    stats: [
      { label: 'DISTANCE FROM SUN', value: '149.6 Million km (1.000 AU)' },
      { label: 'MEAN RADIUS', value: '6,371.0 km (Equatorial: 6,378.1 km)' },
      { label: 'ORBITAL PERIOD', value: '365.256 Days (1.000 Year)' },
      { label: 'SURFACE TEMPERATURE', value: 'Mean +15 °C (-89.2 °C to +56.7 °C)' },
      { label: 'SURFACE GRAVITY', value: '9.807 m/s² (1.00 g)' },
      { label: 'NATURAL SATELLITES', value: '1 (The Moon / Luna, R = 1,737 km)' },
      { label: 'ATMOSPHERE', value: '78.08% N₂, 20.95% O₂, 0.93% Ar, 0.04% CO₂' },
      { label: 'BIOSPHERE STATUS', value: 'Only Known Astronomical Body Harboring Life' },
    ],
    summary:
      'Humanity’s home world. The only known celestial body possessing liquid water oceans on its surface, an active dynamic plate tectonic system, a protective geomagnetic field, and an oxygen-rich atmosphere sustaining complex life.',
  },

  Mars: {
    name: 'MARS',
    designation: 'Terrestrial Planet // 4th from Sun',
    accentColor: '#ef4444',
    stats: [
      { label: 'DISTANCE FROM SUN', value: '227.9 Million km (1.524 AU)' },
      { label: 'MEAN RADIUS', value: '3,389.5 km (0.532 × Earth)' },
      { label: 'ORBITAL PERIOD', value: '686.98 Earth Days (Sol = 24h 37m)' },
      { label: 'SURFACE TEMPERATURE', value: '-140 °C to +20 °C (Mean -63 °C)' },
      { label: 'SURFACE GRAVITY', value: '3.72 m/s² (0.379 g)' },
      { label: 'NATURAL SATELLITES', value: '2 Moons (Phobos & Deimos)' },
      { label: 'ATMOSPHERE', value: '95.32% CO₂, 2.6% N₂, 1.9% Ar (Thin 6.1 mbar)' },
      { label: 'EXPLORATION FLEET', value: 'Curiosity, Perseverance, Ingenuity, MRO' },
    ],
    summary:
      'The Red Planet, colored by ferric oxide (rust) dust on its surface. Hosts Olympus Mons (the largest volcano in the solar system, 21.9 km high) and Valles Marineris canyon. Abundant evidence of ancient flowing liquid water riverbeds and lake basins.',
  },

  Jupiter: {
    name: 'JUPITER',
    designation: 'Gas Giant // 5th from Sun',
    accentColor: '#d97706',
    stats: [
      { label: 'DISTANCE FROM SUN', value: '778.5 Million km (5.204 AU)' },
      { label: 'EQUATORIAL RADIUS', value: '71,492 km (11.209 × Earth)' },
      { label: 'ORBITAL PERIOD', value: '11.86 Earth Years (Rotation: 9h 55m)' },
      { label: 'CLOUD TOP TEMP.', value: '-110 °C (Core: ~24,000 °C)' },
      { label: 'PLANETARY MASS', value: '1.898 × 10²⁷ kg (317.8 × Earth, 2.5× All Others)' },
      { label: 'NATURAL SATELLITES', value: '95 Confirmed Moons (Io, Europa, Ganymede, Callisto)' },
      { label: 'ATMOSPHERE', value: '89.8% H₂, 10.2% He, Ammonia & Methane Clouds' },
      { label: 'PRIMARY MISSIONS', value: 'Pioneer, Voyager, Galileo, Juno, JUICE' },
    ],
    summary:
      'The undisputed king of planets. A colossal gas giant with an internal metallic hydrogen mantle generating an immense magnetosphere. Features the Great Red Spot—an anticyclonic storm larger than Earth that has raged for over 350 years.',
  },

  Saturn: {
    name: 'SATURN',
    designation: 'Gas Giant // 6th from Sun',
    accentColor: '#fde047',
    stats: [
      { label: 'DISTANCE FROM SUN', value: '1.434 Billion km (9.582 AU)' },
      { label: 'EQUATORIAL RADIUS', value: '60,268 km (9.449 × Earth)' },
      { label: 'ORBITAL PERIOD', value: '29.45 Earth Years (Rotation: 10h 33m)' },
      { label: 'MEAN DENSITY', value: '0.687 g/cm³ (Less Dense than Liquid Water)' },
      { label: 'RING SYSTEM SPAN', value: '282,000 km Wide, Only ~10–30 Meters Thick' },
      { label: 'NATURAL SATELLITES', value: '146 Confirmed Moons (Titan, Enceladus, Mimas)' },
      { label: 'RING COMPOSITION', value: '99% Pure Water Ice Particles with Silicate Dust' },
      { label: 'PRIMARY MISSIONS', value: 'Pioneer 11, Voyager 1 & 2, Cassini-Huygens' },
    ],
    summary:
      'Celebrated for its majestic ring system made of billions of icy fragments. Saturn is orbited by Titan (possessing a dense nitrogen atmosphere and liquid methane lakes) and Enceladus (harboring an active subsurface ocean with erupting cryovolcanic geysers).',
  },

  Uranus: {
    name: 'URANUS',
    designation: 'Ice Giant // 7th from Sun',
    accentColor: '#38bdf8',
    stats: [
      { label: 'DISTANCE FROM SUN', value: '2.871 Billion km (19.19 AU)' },
      { label: 'EQUATORIAL RADIUS', value: '25,559 km (4.007 × Earth)' },
      { label: 'ORBITAL PERIOD', value: '84.02 Earth Years (Rotation: 17h 14m)' },
      { label: 'AXIAL TILT', value: '97.77° (Rotates Completely on its Side)' },
      { label: 'CLOUD TOP TEMP.', value: '-224 °C (Coldest Planetary Atmosphere)' },
      { label: 'NATURAL SATELLITES', value: '28 Known Moons (Titania, Oberon, Miranda)' },
      { label: 'ATMOSPHERE', value: '83% H₂, 15% He, 2.3% CH₄ (Methane Blue Tint)' },
      { label: 'PRIMARY MISSIONS', value: 'Voyager 2 Flyby (January 1986)' },
    ],
    summary:
      'An enigmatic ice giant rolling through space on its side due to a catastrophic ancient proto-planetary collision. Its blue-green cyan color stems from atmospheric methane absorbing red wavelengths of sunlight.',
  },

  Neptune: {
    name: 'NEPTUNE',
    designation: 'Ice Giant // 8th from Sun',
    accentColor: '#2563eb',
    stats: [
      { label: 'DISTANCE FROM SUN', value: '4.495 Billion km (30.07 AU)' },
      { label: 'EQUATORIAL RADIUS', value: '24,764 km (3.883 × Earth)' },
      { label: 'ORBITAL PERIOD', value: '164.8 Earth Years (Rotation: 16h 06m)' },
      { label: 'SUPERSONIC WINDS', value: 'Up to 2,100 km/h (Fastest in Solar System)' },
      { label: 'CLOUD TOP TEMP.', value: '-218 °C' },
      { label: 'NATURAL SATELLITES', value: '16 Known Moons (Triton, Proteus, Nereid)' },
      { label: 'ATMOSPHERE', value: '80% H₂, 19% He, 1.5% CH₄ (Deep Azure Azure)' },
      { label: 'PRIMARY MISSIONS', value: 'Voyager 2 Flyby (August 1989)' },
    ],
    summary:
      'The outermost major planet of the solar system, shrouded in deep vivid blue skies swept by violent supersonic winds. Its largest moon, Triton, orbits retrograde and shoots active nitrogen ice geysers into its tenuous atmosphere.',
  },
};

/**
 * Creates the Celestial Telemetry Interactive System (3D floating card & 2D HUD drawer).
 * @param {THREE.Group} orreryGroup
 * @param {THREE.Camera} camera
 * @returns {{ selectBody: Function, deselect: Function, update: Function, cardGroup: THREE.Group }}
 */
export function createCelestialTelemetry(orreryGroup, camera) {
  const cardGroup = new THREE.Group();
  cardGroup.name = 'CelestialTelemetryCard';
  cardGroup.visible = false;
  orreryGroup.add(cardGroup);

  // 3D Holographic Floating Card Canvas (1024x512)
  const cardCanvas = document.createElement('canvas');
  cardCanvas.width = 1024;
  cardCanvas.height = 512;
  const ctx = cardCanvas.getContext('2d');

  const cardTexture = new THREE.CanvasTexture(cardCanvas);
  cardTexture.minFilter = THREE.LinearFilter;
  cardTexture.magFilter = THREE.LinearFilter;

  // 3D Plane Mesh for Floating Holographic Card
  const planeGeo = new THREE.PlaneGeometry(1.05, 0.52);
  const planeMat = new THREE.MeshBasicMaterial({
    map: cardTexture,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const cardMesh = new THREE.Mesh(planeGeo, planeMat);
  cardGroup.add(cardMesh);

  // Connecting neon leader line from target body to card
  const lineGeo = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0.5, 0.4, 0),
  ]);
  const lineMat = new THREE.LineBasicMaterial({
    color: 0x00e5ff,
    transparent: true,
    opacity: 0.85,
    linewidth: 2,
  });
  const leaderLine = new THREE.Line(lineGeo, lineMat);
  cardGroup.add(leaderLine);

  // Holographic reticle / selection ring
  const reticleGeo = new THREE.RingGeometry(0.12, 0.15, 32);
  const reticleMat = new THREE.MeshBasicMaterial({
    color: 0x00e5ff,
    transparent: true,
    opacity: 0.9,
    side: THREE.DoubleSide,
  });
  const reticleMesh = new THREE.Mesh(reticleGeo, reticleMat);
  reticleMesh.rotation.x = Math.PI / 2;
  cardGroup.add(reticleMesh);

  // ── Helper to detect mobile mode (viewports <= 768px or mobile devices) ──
  function isMobileMode() {
    return (
      window.innerWidth <= 768 ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      ('ontouchstart' in window && window.innerWidth <= 1024)
    );
  }

  // ── 2D HUD DRAWER (Bottom-Right Scientific Overlay) ──
  let hudContainer = document.getElementById('celestial-telemetry-hud');
  if (!hudContainer) {
    hudContainer = document.createElement('div');
    hudContainer.id = 'celestial-telemetry-hud';

    // Inject mobile-suppression CSS rule so 2D celestial data popup is never visible in mobile mode
    const hudStyle = document.createElement('style');
    hudStyle.textContent = `
      @media (max-width: 768px) {
        #celestial-telemetry-hud {
          display: none !important;
          pointer-events: none !important;
        }
      }
    `;
    document.head.appendChild(hudStyle);

    hudContainer.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 420px;
      max-width: calc(100vw - 48px);
      background: rgba(10, 14, 24, 0.92);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(0, 229, 255, 0.35);
      border-radius: 12px;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6), 0 0 24px rgba(0, 229, 255, 0.15);
      color: #f1f5f9;
      font-family: 'Inter', -apple-system, sans-serif;
      z-index: 9999;
      transform: translateY(120%);
      transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease;
      opacity: 0;
      pointer-events: auto;
      overflow: hidden;
    `;
    document.body.appendChild(hudContainer);
  }

  let currentTarget = null; // { mesh, dataKey }

  function render3DCard(data) {
    ctx.clearRect(0, 0, 1024, 512);

    // Deep glassmorphic background
    ctx.fillStyle = 'rgba(8, 12, 22, 0.92)';
    ctx.fillRect(0, 0, 1024, 512);

    // Card border
    ctx.strokeStyle = data.accentColor;
    ctx.lineWidth = 3;
    ctx.strokeRect(4, 4, 1016, 504);

    // Top Header Banner
    ctx.fillStyle = data.accentColor;
    ctx.fillRect(0, 0, 1024, 60);

    ctx.font = '900 28px "Inter", "Segoe UI", sans-serif';
    ctx.fillStyle = '#0a0e1c';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(`★ CELESTIAL TELEMETRY // ${data.name}`, 24, 30);

    // Dismiss indicator
    ctx.font = 'bold 20px "Inter", sans-serif';
    ctx.fillStyle = '#0a0e1c';
    ctx.textAlign = 'right';
    ctx.fillText('✕', 1000, 30);

    // Subtitle Designation
    ctx.font = 'bold 18px "Inter", monospace';
    ctx.fillStyle = data.accentColor;
    ctx.fillText(data.designation, 24, 90);

    // Stats Grid (2 columns)
    const col1X = 24;
    const col2X = 530;
    let y = 130;

    data.stats.slice(0, 6).forEach((st, idx) => {
      const curX = idx % 2 === 0 ? col1X : col2X;
      if (idx % 2 === 0 && idx > 0) y += 52;

      ctx.font = 'bold 13px "Inter", monospace';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(st.label, curX, y);

      ctx.font = 'bold 17px "Inter", "Segoe UI", sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(st.value, curX, y + 22);
    });

    // Summary description box at bottom
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.fillRect(24, 320, 976, 160);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.strokeRect(24, 320, 976, 160);

    ctx.font = 'italic 16px "Inter", "Segoe UI", sans-serif';
    ctx.fillStyle = '#e2e8f0';
    wrapText(ctx, data.summary, 44, 345, 936, 26);

    cardTexture.needsUpdate = true;
  }

  function render2DHUD(data) {
    const statsHtml = data.stats
      .map(
        (s) => `
        <div style="display:flex; justify-content:space-between; align-items:baseline; padding:6px 0; border-bottom:1px solid rgba(255,255,255,0.06); font-size:12.5px;">
          <span style="color:#94a3b8; font-family:monospace; font-weight:600; letter-spacing:0.04em;">${s.label}</span>
          <span style="color:#ffffff; font-weight:700; text-align:right; margin-left:12px;">${s.value}</span>
        </div>
      `
      )
      .join('');

    hudContainer.innerHTML = `
      <div style="background:${data.accentColor}; color:#0a0e1c; padding:10px 16px; display:flex; justify-content:space-between; align-items:center; font-weight:900; font-size:13px; letter-spacing:0.05em;">
        <span>★ CELESTIAL DATA // ${data.name}</span>
        <button id="close-telemetry-hud" style="background:transparent; border:none; color:#0a0e1c; font-size:18px; font-weight:900; cursor:pointer; padding:0 4px; line-height:1;">✕</button>
      </div>
      <div style="padding:16px 20px; max-height:480px; overflow-y:auto;">
        <div style="color:${data.accentColor}; font-size:11px; font-weight:700; font-family:monospace; margin-bottom:12px; letter-spacing:0.08em;">
          ${data.designation}
        </div>
        <div style="margin-bottom:14px;">
          ${statsHtml}
        </div>
        <div style="background:rgba(255,255,255,0.04); border-left:3px solid ${data.accentColor}; padding:10px 12px; font-size:12px; line-height:1.55; color:#cbd5e1; border-radius:0 6px 6px 0;">
          ${data.summary}
        </div>
      </div>
    `;

    document.getElementById('close-telemetry-hud')?.addEventListener('click', (e) => {
      e.stopPropagation();
      deselect();
    });

    hudContainer.style.transform = 'translateY(0)';
    hudContainer.style.opacity = '1';
  }

  function wrapText(context, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = context.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        context.fillText(line, x, y);
        line = words[n] + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    context.fillText(line, x, y);
  }

  function selectBody(mesh, dataKey) {
    const data = CELESTIAL_DATA[dataKey];
    if (!data) return;

    currentTarget = { mesh, dataKey, data };
    render3DCard(data);

    // In mobile mode, do not show 2D celestial data popup; only show 3D celestial telemetry
    if (!isMobileMode()) {
      render2DHUD(data);
    } else {
      hudContainer.style.transform = 'translateY(120%)';
      hudContainer.style.opacity = '0';
    }

    cardGroup.visible = true;
    lineMat.color.set(data.accentColor);
    reticleMat.color.set(data.accentColor);
  }

  function deselect() {
    currentTarget = null;
    cardGroup.visible = false;
    hudContainer.style.transform = 'translateY(120%)';
    hudContainer.style.opacity = '0';
  }

  const worldPos = new THREE.Vector3();
  const cardTargetPos = new THREE.Vector3();

  const update = (elapsed, dt) => {
    if (!currentTarget || !cardGroup.visible) return;

    // Follow selected target mesh in local orrery coordinates
    const targetPos = currentTarget.mesh.position;
    reticleMesh.position.copy(targetPos);

    // Pulse reticle
    const reticleScale = 1.0 + Math.sin(elapsed * 4.0) * 0.15;
    reticleMesh.scale.set(reticleScale, reticleScale, 1.0);

    // Position 3D card slightly above and to the side of the target body
    const isSun = currentTarget.dataKey === 'Sun';
    const offsetX = isSun ? 0.65 : (targetPos.x > 0 ? 0.45 : -0.45);
    cardTargetPos.set(targetPos.x + offsetX, targetPos.y + 0.42, targetPos.z);
    cardMesh.position.copy(cardTargetPos);

    // Make 3D card face the camera for crystal clarity
    if (camera) {
      cardMesh.quaternion.copy(camera.quaternion);
    }

    // Update leader line points
    const anchorOff = offsetX > 0 ? -0.45 : 0.45;
    const pts = [targetPos.clone(), cardTargetPos.clone().add(new THREE.Vector3(anchorOff, -0.15, 0))];
    leaderLine.geometry.setFromPoints(pts);
  };

  return {
    selectBody,
    deselect,
    update,
    getCurrentTarget: () => currentTarget,
    cardMesh,
    cardGroup,
  };
}
