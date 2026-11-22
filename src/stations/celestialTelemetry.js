// src/stations/celestialTelemetry.js — Interactive Scientific Telemetry for Sun, Planets & Comets on Click/Touch
import * as THREE from 'three';
import { isMobileOrTablet, getViewportRoot } from '../ui/deviceOrientation.js';

// ── AUTHENTIC ASTROPHYSICAL & PLANETARY SCIENCE DATABASE ──
export const CELESTIAL_DATA = {
  Sun: {
    name: 'THE SUN (SOL)',
    designation: 'G-Type Main-Sequence Star // Spectral Class G2V // Solar Anchor',
    accentColor: '#ffaa00',
    stats: [
      { label: 'EQUATORIAL RADIUS', value: '696,340 km (109.3 × Earth)' },
      { label: 'SOLAR MASS', value: '1.989 × 10³⁰ kg (333,000 × Earth)' },
      { label: 'SURFACE TEMPERATURE', value: '5,500 °C (5,778 K Photosphere)' },
      { label: 'CORE TEMPERATURE', value: '15,700,000 °C (Proton Fusion)' },
      { label: 'ROTATION PERIOD', value: '25.05 Days (Equator) / 34.4 Days (Poles)' },
      { label: 'LUMINOSITY OUTPUT', value: '3.828 × 10²⁶ Watts (Continuous Power)' },
      { label: 'CORE PRESSURE', value: '2.477 × 10¹¹ bar (Center of Gravity)' },
      { label: 'SYSTEM MASS RATIO', value: '99.86% of Total Solar System Mass' },
      { label: 'CORONAL TEMPERATURE', value: '1,000,000 to 3,000,000 K' },
      { label: 'SOLAR WIND VELOCITY', value: '400 – 750 km/s (Supersonic Plasma)' },
      { label: 'CHEMICAL ABUNDANCE', value: '73.46% Hydrogen, 24.85% Helium, 1.69% Heavy' },
      { label: 'FLAGSHIP MISSIONS', value: 'Parker Solar Probe, SOHO, SDO, Aditya-L1' },
    ],
    summary:
      'The gravitational anchor and thermodynamic powerhouse of our solar system. A 4.6-billion-year-old yellow dwarf fusing 600 million metric tons of hydrogen into helium every second in its core. Dynamic twisted magnetic flux tubes power sunspot cycles, eruptive solar flares, and coronal mass ejections.',
  },

  Mercury: {
    name: 'MERCURY',
    designation: 'Terrestrial Metalloid Planet // 1st from Sun',
    accentColor: '#a1a1aa',
    stats: [
      { label: 'DISTANCE FROM SUN', value: '57.91 Million km (0.387 AU)' },
      { label: 'MEAN RADIUS', value: '2,439.7 km (0.383 × Earth)' },
      { label: 'ORBITAL PERIOD', value: '87.97 Earth Days (Eccentricity 0.2056)' },
      { label: 'ROTATION (DAY LENGTH)', value: '58.65 Earth Days (3:2 Spin-Orbit)' },
      { label: 'SURFACE TEMPERATURE', value: '-180 °C (Night) to +430 °C (Day)' },
      { label: 'SURFACE GRAVITY', value: '3.70 m/s² (0.378 g)' },
      { label: 'METALLIC CORE', value: '85% of Radius (Molten Iron Dynamo)' },
      { label: 'NATURAL SATELLITES', value: '0 Moons' },
      { label: 'EXOSPHERE DENSITY', value: 'Trace (Oxygen, Sodium, Hydrogen, Helium)' },
      { label: 'IMPACT BASIN', value: 'Caloris Basin (1,550 km Diameter)' },
      { label: 'ORBITAL SPEED', value: '47.36 km/s (Fastest in Solar System)' },
      { label: 'FLAGSHIP MISSIONS', value: 'Mariner 10, MESSENGER, BepiColombo' },
    ],
    summary:
      'Smallest planet and closest to the Sun. Possesses a disproportionately enormous metallic iron-nickel core creating an active global magnetic field. Heavily battered by craters and compression scarps, experiencing the most extreme temperature swings in the solar system (+430°C to -180°C).',
  },

  Venus: {
    name: 'VENUS',
    designation: 'Terrestrial Super-Greenhouse Planet // 2nd from Sun',
    accentColor: '#f59e0b',
    stats: [
      { label: 'DISTANCE FROM SUN', value: '108.2 Million km (0.723 AU)' },
      { label: 'MEAN RADIUS', value: '6,051.8 km (0.949 × Earth)' },
      { label: 'ORBITAL PERIOD', value: '224.7 Earth Days' },
      { label: 'RETROGRADE ROTATION', value: '243.0 Earth Days (Clockwise Spin)' },
      { label: 'SURFACE TEMPERATURE', value: '+465 °C (Hotter than Mercury)' },
      { label: 'ATMOSPHERIC PRESSURE', value: '92.0 bar (900m Underwater Equivalent)' },
      { label: 'ATMOSPHERIC COMP.', value: '96.5% CO₂, 3.5% N₂, H₂SO₄ Clouds' },
      { label: 'NATURAL SATELLITES', value: '0 Moons' },
      { label: 'SUPER-ROTATION', value: 'Cloud Winds reach 360 km/h (4-day cycle)' },
      { label: 'VOLCANIC LANDMARKS', value: 'Maat Mons, Maxwell Montes (11 km high)' },
      { label: 'SURFACE GRAVITY', value: '8.87 m/s² (0.904 g)' },
      { label: 'FLAGSHIP MISSIONS', value: 'Venera 7–14, Magellan, Akatsuki, DAVINCI+' },
    ],
    summary:
      'Earth’s topological twin transformed into a hellish pressure-cooker by an ancient runaway greenhouse catastrophe. Its dense carbon dioxide atmosphere and sulfuric acid cloud decks trap heat to a uniform 465°C. Spins backwards (retrograde) so slowly that its day is longer than its orbital year.',
  },

  Earth: {
    name: 'EARTH (TERRA)',
    designation: 'Habitable Ocean World // 3rd from Sun // Planetary Biosphere',
    accentColor: '#0ea5e9',
    stats: [
      { label: 'DISTANCE FROM SUN', value: '149.6 Million km (1.000 AU)' },
      { label: 'EQUATORIAL RADIUS', value: '6,378.1 km (Mean: 6,371.0 km)' },
      { label: 'ORBITAL PERIOD', value: '365.256 Days (Mean Speed 29.78 km/s)' },
      { label: 'ROTATION PERIOD', value: '23h 56m 04s (Sidereal Day)' },
      { label: 'SURFACE TEMPERATURE', value: 'Mean +15 °C (-89.2 °C to +56.7 °C)' },
      { label: 'SURFACE GRAVITY', value: '9.807 m/s² (1.000 g Standard)' },
      { label: 'SURFACE LIQUID WATER', value: '70.8% Oceans (1.332 Billion km³)' },
      { label: 'ATMOSPHERIC COMP.', value: '78.08% N₂, 20.95% O₂, 0.93% Ar, 0.04% CO₂' },
      { label: 'NATURAL SATELLITES', value: '1 (The Moon / Luna, Orbit 384,400 km)' },
      { label: 'AXIAL TILT (OBLIQUITY)', value: '23.44° (Stable Four-Season Cycle)' },
      { label: 'GEODYNAMO FIELD', value: 'Dipole Shield Deflecting Cosmic Radiation' },
      { label: 'BIOSPHERE STATUS', value: 'Only Confirmed Life-Bearing Astronomical Body' },
    ],
    summary:
      'Humanity’s oasis in deep space. Possesses dynamic active plate tectonics, expansive liquid water oceans, an oxygen-rich atmosphere, and a molten iron core geodynamo creating a protective magnetosphere that shields millions of species of terrestrial and marine life.',
  },

  Mars: {
    name: 'MARS',
    designation: 'Terrestrial Desert Planet // 4th from Sun',
    accentColor: '#f97316',
    stats: [
      { label: 'DISTANCE FROM SUN', value: '227.9 Million km (1.524 AU)' },
      { label: 'EQUATORIAL RADIUS', value: '3,396.2 km (0.533 × Earth)' },
      { label: 'ORBITAL PERIOD', value: '686.98 Earth Days (1.88 Earth Years)' },
      { label: 'SOL (DAY LENGTH)', value: '24h 37m 22s (Nearly Identical to Earth)' },
      { label: 'SURFACE TEMPERATURE', value: '-140 °C (Winter Pole) to +20 °C (Noon)' },
      { label: 'SURFACE GRAVITY', value: '3.72 m/s² (0.379 g)' },
      { label: 'ATMOSPHERIC PRESSURE', value: '6.1 mbar (0.6% of Earth, 95.3% CO₂)' },
      { label: 'SHIELD VOLCANO', value: 'Olympus Mons (21.9 km High, Solar System Record)' },
      { label: 'GRAND CANYON', value: 'Valles Marineris (4,000 km Long, 7 km Deep)' },
      { label: 'POLAR ICE RESERVOIRS', value: 'North & South Caps (Water Ice + CO₂ Dry Ice)' },
      { label: 'NATURAL SATELLITES', value: '2 (Phobos & Deimos, Captured Asteroids)' },
      { label: 'EXPLORATION FLEET', value: 'Curiosity, Perseverance, Ingenuity, MRO, MAVEN' },
    ],
    summary:
      'The Red Planet, tinted by oxidized iron mineral dust across its ancient river valleys, dried lakebeds, and basaltic dune fields. Hosts the colossal Olympus Mons volcano and the planetary Valles Marineris rift. Active rovers are currently extracting cores to search for ancient biosignatures.',
  },

  Jupiter: {
    name: 'JUPITER',
    designation: 'Gas Giant Jovian Anchor // 5th from Sun',
    accentColor: '#ea580c',
    stats: [
      { label: 'DISTANCE FROM SUN', value: '778.5 Million km (5.204 AU)' },
      { label: 'EQUATORIAL RADIUS', value: '71,492 km (11.209 × Earth)' },
      { label: 'PLANETARY MASS', value: '1.898 × 10²⁷ kg (317.8 × Earth, 2.5× All Planets)' },
      { label: 'ORBITAL PERIOD', value: '11.86 Earth Years' },
      { label: 'ROTATION PERIOD', value: '9h 55m 30s (Fastest Spin in Solar System)' },
      { label: 'GREAT RED SPOT', value: '16,350 km Anticyclone (Raging >350 Years)' },
      { label: 'CLOUD TOP TEMP.', value: '-110 °C (Mantle Core: ~24,000 °C)' },
      { label: 'NATURAL SATELLITES', value: '95 Moons (Io, Europa, Ganymede, Callisto)' },
      { label: 'ATMOSPHERIC COMP.', value: '89.8% H₂, 10.2% He, NH₃ Crystals & CH₄' },
      { label: 'MAGNETOSPHERE SPAN', value: 'Largest Structure in Solar System (20,000× Earth)' },
      { label: 'INTERIOR STRUCTURE', value: 'Liquid Metallic Hydrogen Dynamo' },
      { label: 'FLAGSHIP MISSIONS', value: 'Voyager 1 & 2, Galileo, Juno, JUICE, Europa Clipper' },
    ],
    summary:
      'The undisputed titan of the planetary system. A vast gas giant featuring alternating turbulent ammonia cloud belts and zones with the iconic Great Red Spot storm. Inside, immense gravitational pressures turn hydrogen into liquid electrical metal, generating a ferocious radiation belt and magnetosphere.',
  },

  Saturn: {
    name: 'SATURN',
    designation: 'Ringed Gas Giant // 6th from Sun',
    accentColor: '#eab308',
    stats: [
      { label: 'DISTANCE FROM SUN', value: '1.434 Billion km (9.582 AU)' },
      { label: 'EQUATORIAL RADIUS', value: '60,268 km (9.449 × Earth)' },
      { label: 'ORBITAL PERIOD', value: '29.45 Earth Years' },
      { label: 'ROTATION PERIOD', value: '10h 33m 38s (Rapid Oblate Flattening)' },
      { label: 'MEAN BULK DENSITY', value: '0.687 g/cm³ (Would Float in Water Ocean)' },
      { label: 'RING SYSTEM SPAN', value: '282,000 km Across, Only ~10–30m Thick' },
      { label: 'RING COMPOSITION', value: '99% Pure Water Ice Particles with Tholins' },
      { label: 'NATURAL SATELLITES', value: '146 Confirmed Moons (Titan, Enceladus, Mimas)' },
      { label: 'OCEAN MOONS', value: 'Enceladus (Cryovolcanoes) & Titan (Methane Seas)' },
      { label: 'POLAR PHENOMENON', value: 'North Polar Hexagonal Jet Stream (30,000 km wide)' },
      { label: 'ATMOSPHERIC COMP.', value: '96.3% H₂, 3.25% He, 0.45% CH₄ & Ammonia' },
      { label: 'FLAGSHIP MISSIONS', value: 'Pioneer 11, Voyager 1 & 2, Cassini-Huygens' },
    ],
    summary:
      'Renowned for its breathtaking ring system of pure reflective water ice sheets spanning 282,000 km. Saturn has the lowest bulk density of any planet. Orbits Titan—possessing a thick nitrogen sky and liquid ethane/methane lakes—and Enceladus, erupting geysers from its warm subsurface liquid ocean.',
  },

  Uranus: {
    name: 'URANUS',
    designation: 'Ice Giant Planet // 7th from Sun // Retrograde Rolling World',
    accentColor: '#38bdf8',
    stats: [
      { label: 'DISTANCE FROM SUN', value: '2.871 Billion km (19.19 AU)' },
      { label: 'EQUATORIAL RADIUS', value: '25,559 km (4.007 × Earth)' },
      { label: 'ORBITAL PERIOD', value: '84.02 Earth Years' },
      { label: 'ROTATION PERIOD', value: '17h 14m 24s' },
      { label: 'AXIAL TILT (OBLIQUITY)', value: '97.77° (Rotates Completely on its Side)' },
      { label: 'CLOUD TOP TEMP.', value: '-224.2 °C (Coldest Planetary Atmosphere)' },
      { label: 'METHANE ABSORPTION', value: 'Absorbs Red Photons, Reflects Cyan Sky' },
      { label: 'NATURAL SATELLITES', value: '28 Known Moons (Titania, Oberon, Miranda, Ariel)' },
      { label: 'RING SYSTEM', value: '13 Narrow Opaque Dark Rings (Epsilon Ring)' },
      { label: 'MANTLE COMPOSITION', value: 'Water, Ammonia & Methane Supercritical Ices' },
      { label: 'MAGNETIC FIELD', value: 'Tilted 59° from Rotational Axis & Off-Center' },
      { label: 'PRIMARY MISSIONS', value: 'Voyager 2 Flyby (January 1986)' },
    ],
    summary:
      'A serene pale-cyan ice giant knocked completely onto its side by an ancient proto-planetary cataclysm, producing 42-year long seasonal extremes of polar sunlight and darkness. Its icy mantle of dense supercritical fluids envelopes a small rocky core surrounded by 13 charcoal-dark rings.',
  },

  Neptune: {
    name: 'NEPTUNE',
    designation: 'Ice Giant Outer World // 8th from Sun // Supersonic Storm System',
    accentColor: '#3b82f6',
    stats: [
      { label: 'DISTANCE FROM SUN', value: '4.495 Billion km (30.07 AU)' },
      { label: 'EQUATORIAL RADIUS', value: '24,764 km (3.883 × Earth)' },
      { label: 'ORBITAL PERIOD', value: '164.79 Earth Years (Discovered 1846)' },
      { label: 'ROTATION PERIOD', value: '16h 06m 36s' },
      { label: 'SUPERSONIC WINDS', value: 'Up to 2,100 km/h (Fastest in Solar System)' },
      { label: 'INTERNAL HEAT FLUX', value: 'Radiates 2.61× More Energy than Absorbed' },
      { label: 'CLOUD TOP TEMP.', value: '-218 °C' },
      { label: 'NATURAL SATELLITES', value: '16 Known Moons (Triton, Proteus, Nereid)' },
      { label: 'RETROGRADE MOON', value: 'Triton (Captured Kuiper Belt Object, N₂ Geysers)' },
      { label: 'ATMOSPHERIC COMP.', value: '80% H₂, 19% He, 1.5% CH₄ (Deep Azure Azure)' },
      { label: 'STORM SYSTEMS', value: 'Great Dark Spot & Rapid Methane Cirrus Bands' },
      { label: 'PRIMARY MISSIONS', value: 'Voyager 2 Flyby (August 1989)' },
    ],
    summary:
      'The outermost major planet of our solar system, an azure blue ice world whipped by violent supersonic winds exceeding 2,100 km/h. It generates strong internal geothermal heat driving turbulent storm systems. Its largest moon, Triton, orbits backward and vents nitrogen cryovolcanic geysers into vacuum.',
  },

  Comet: {
    name: 'COMET 1P/HALLEY & NEOWISE',
    designation: 'Periodic Primitive Icy Body // Highly Eccentric Keplerian Orbit',
    accentColor: '#22d3ee',
    stats: [
      { label: 'ORBITAL ECCENTRICITY', value: 'e = 0.967 (Highly Elliptical Trajectory)' },
      { label: 'PERIHELION DISTANCE', value: '0.586 AU (Whips Close to the Sun)' },
      { label: 'APHELION DISTANCE', value: '35.1 AU (Extends Past Neptune / Kuiper)' },
      { label: 'ORBITAL PERIOD', value: '75.3 – 76.0 Earth Years' },
      { label: 'NUCLEUS GEOMETRY', value: '15 × 8 × 8 km (Porous "Dirty Snowball")' },
      { label: 'NUCLEUS ALBEDO', value: '0.04 (Darker than Coal / Charcoal)' },
      { label: 'SUBLIMATION RATE', value: '10 – 50 Tonnes/sec of Water Ice & Dust' },
      { label: 'ION TAIL (TYPE I)', value: 'Blue Plasma (CO⁺/N₂⁺) Points Exactly Away from Sun' },
      { label: 'DUST TAIL (TYPE II)', value: 'Golden-White Silicate Dust Curved by Radiation Pressure' },
      { label: 'MAX TAIL LENGTH', value: 'Up to 100 Million km at Perihelion' },
      { label: 'METEOR SHOWERS', value: 'Eta Aquariids (May) & Orionids (October)' },
      { label: 'HISTORIC FLYBYS', value: 'Giotto (ESA), Vega 1 & 2, Suisei, Sakigake' },
    ],
    summary:
      'A pristine frozen relic from the dawn of the solar system 4.6 billion years ago. Composed of water ice, frozen methane, carbon monoxide, and dark carbonaceous silicate dust. As it plunges toward the Sun, solar heat sublimates its ice into a luminous glowing coma and produces two distinct tails: a narrow electric-blue ion tail pushed by the solar wind, and a sweeping curved white dust tail.',
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
  const planeGeo = new THREE.PlaneGeometry(1.10, 0.55);
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

  // ── Helper to detect mobile mode ──
  function isMobileMode() {
    return isMobileOrTablet();
  }

  // ── 2D HUD DRAWER (Bottom-Right Scientific Overlay) ──
  let hudContainer = document.getElementById('celestial-telemetry-hud');
  if (!hudContainer) {
    hudContainer = document.createElement('div');
    hudContainer.id = 'celestial-telemetry-hud';

    // Inject responsive CSS rules
    const hudStyle = document.createElement('style');
    hudStyle.textContent = `
      @media (max-width: 768px), (pointer: coarse) {
        #celestial-telemetry-hud {
          display: none !important;
          pointer-events: none !important;
        }
      }
      body.vz-mobile-tablet #celestial-telemetry-hud {
        display: none !important;
        pointer-events: none !important;
      }
    `;
    document.head.appendChild(hudStyle);

    hudContainer.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 440px;
      max-width: calc(100vw - 48px);
      max-height: 82vh;
      background: rgba(10, 14, 24, 0.94);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(0, 229, 255, 0.35);
      border-radius: 14px;
      box-shadow: 0 16px 48px rgba(0, 0, 0, 0.75), 0 0 24px rgba(0, 229, 255, 0.2);
      color: #f1f5f9;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      z-index: 9999;
      transform: translateY(120%);
      transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease;
      opacity: 0;
      pointer-events: auto;
      overflow-y: auto;
    `;
    const root = getViewportRoot();
    root.appendChild(hudContainer);
  }

  let currentTarget = null; // { mesh, dataKey }

  function render3DCard(data) {
    ctx.clearRect(0, 0, 1024, 512);

    // Solid deep glassmorphic background
    ctx.fillStyle = '#080c16';
    ctx.fillRect(0, 0, 1024, 512);

    // Card border
    ctx.strokeStyle = data.accentColor;
    ctx.lineWidth = 3;
    ctx.strokeRect(4, 4, 1016, 504);

    // Top Header Banner
    ctx.fillStyle = data.accentColor;
    ctx.fillRect(0, 0, 1024, 56);

    ctx.font = '900 26px "Inter", "Segoe UI", sans-serif';
    ctx.fillStyle = '#0a0e1c';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(`★ CELESTIAL TELEMETRY // ${data.name}`, 24, 28);

    // Dismiss indicator
    ctx.font = 'bold 20px "Inter", sans-serif';
    ctx.fillStyle = '#0a0e1c';
    ctx.textAlign = 'right';
    ctx.fillText('✕', 1000, 28);

    // Subtitle Designation
    ctx.font = 'bold 16px "Inter", monospace';
    ctx.fillStyle = data.accentColor;
    ctx.fillText(data.designation, 24, 82);

    // Stats Grid (2 columns × 4 rows = 8 key scientific attributes)
    const col1X = 24;
    const col2X = 530;
    let y = 118;

    data.stats.slice(0, 8).forEach((st, idx) => {
      const curX = idx % 2 === 0 ? col1X : col2X;
      if (idx % 2 === 0 && idx > 0) y += 46;

      ctx.font = 'bold 12px "Inter", monospace';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(st.label, curX, y);

      ctx.font = 'bold 15px "Inter", "Segoe UI", sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(st.value, curX, y + 18);
    });

    // Summary description box at bottom
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.fillRect(24, 308, 976, 180);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.strokeRect(24, 308, 976, 180);

    ctx.font = 'italic 15px "Inter", "Segoe UI", sans-serif';
    ctx.fillStyle = '#e2e8f0';
    wrapText(ctx, data.summary, 42, 335, 940, 24);

    cardTexture.needsUpdate = true;
  }

  function render2DHUD(data) {
    const statsHtml = data.stats
      .map(
        (s) => `
        <div style="display:flex; justify-content:space-between; align-items:baseline; padding:6px 0; border-bottom:1px solid rgba(255,255,255,0.06); font-size:12px;">
          <span style="color:#94a3b8; font-family:monospace; font-weight:600; letter-spacing:0.04em;">${s.label}</span>
          <span style="color:#ffffff; font-weight:700; text-align:right; margin-left:12px;">${s.value}</span>
        </div>
      `
      )
      .join('');

    hudContainer.innerHTML = `
      <div style="background:${data.accentColor}; color:#0a0e1c; padding:12px 18px; display:flex; justify-content:space-between; align-items:center; font-weight:900; font-size:13px; letter-spacing:0.05em;">
        <span>★ CELESTIAL TELEMETRY // ${data.name}</span>
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

  function selectBody(arg1, arg2) {
    let key, mesh;
    if (typeof arg1 === 'string') {
      key = arg1;
      mesh = arg2;
    } else {
      mesh = arg1;
      key = arg2;
    }
    const data = CELESTIAL_DATA[key];
    if (!data) return;

    // Deselect other telemetry systems to maintain clean uncluttered UI
    if (typeof window !== 'undefined' && window.__sim) {
      window.__sim.scientistTelemetry?.deselect();
      window.__sim.rocketTelemetry?.deselect();
      window.__sim.mobileRobots?.telemetry?.deselect();
    }

    currentTarget = { mesh, dataKey: key };

    // Update leader line color and reticle
    const accentHex = parseInt(data.accentColor.replace('#', '0x'), 16);
    lineMat.color.setHex(accentHex);
    reticleMat.color.setHex(accentHex);

    render3DCard(data);
    cardGroup.visible = true;

    // Show 2D HUD drawer
    if (!isMobileMode()) {
      render2DHUD(data);
    }
  }

  function deselect() {
    currentTarget = null;
    cardGroup.visible = false;
    hudContainer.style.transform = 'translateY(120%)';
    hudContainer.style.opacity = '0';
  }

  function update(dt = 0.016) {
    if (!cardGroup.visible || !currentTarget || !currentTarget.mesh) return;

    // Follow target world position in real-time
    const worldPos = new THREE.Vector3();
    currentTarget.mesh.getWorldPosition(worldPos);

    // Convert to orreryGroup local coordinates
    const localPos = worldPos.clone();
    orreryGroup.worldToLocal(localPos);

    // Place card offset from planet/comet relative to camera view
    const cardPos = localPos.clone();
    if (camera) {
      const camRight = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion);
      cardPos.add(camRight.multiplyScalar(0.50));
    } else {
      cardPos.x += 0.50;
    }
    cardPos.y += 0.42;
    cardMesh.position.copy(cardPos);

    // Billboard: Card always turns to face camera
    if (camera) {
      cardMesh.quaternion.copy(camera.quaternion);
    }

    // Connect leader line from target to card
    const positions = lineGeo.attributes.position.array;
    positions[0] = localPos.x;
    positions[1] = localPos.y;
    positions[2] = localPos.z;
    positions[3] = cardPos.x;
    positions[4] = cardPos.y - 0.25;
    positions[5] = cardPos.z;
    lineGeo.attributes.position.needsUpdate = true;

    // Position holographic reticle ring around target
    reticleMesh.position.copy(localPos);
    reticleMesh.rotation.z += dt * 1.5;
  }

  return {
    selectBody,
    deselect,
    update,
    cardGroup,
    getCurrentTarget: () => currentTarget,
  };
}
