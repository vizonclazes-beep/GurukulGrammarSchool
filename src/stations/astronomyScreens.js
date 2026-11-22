// src/stations/astronomyScreens.js — Single Large Curved Holographic Screen on Top of Astro Pod
// Features:
// - Curved widescreen panoramic geometry (3.6m wide x 1.48m high, radius 2.8m).
// - Centered on top of the Astro Pod (R = 2.60m) safely outside Neptune (R = 1.85m).
// - Concave face oriented directly towards Home Pod & entrance visitors.
// - Real-time holographic shader: translucent glass where dark space is see-through,
//   allowing visitors to see the background rockets and museum walls right through the screen.
// - 2.5s dynamic slide rotation (2-3 sec user requirement) with smooth 0.55s crossfade.
// - Full interactive raycast control (click left: prev, click right: next, click center: pause/resume).
// - Single architectural aerospace support pylon on top of the pod deck.
import * as THREE from 'three';
import {
  stationPosition,
  COLOR_POD_WHITE,
  COLOR_ALUMINUM,
  COLOR_PANEL_DARK,
} from '../core/constants.js';

// ── 9 MASTER CURATED SCIENTIFIC EXHIBIT SLIDES ──
export const ASTRONOMY_MASTER_SLIDES = [
  {
    title: 'PILLARS OF CREATION',
    sub: 'MESSIER 16 // EAGLE NEBULA',
    category: 'EMISSION NEBULA & STAR NURSERY',
    image: '/astronomy/nebula_pillars.jpg',
    type: 'Ionized Hydrogen (H II) & Molecular Gas Columns',
    dist: '6,500 Light-Years',
    sector: 'Serpens // Sagittarius Arm',
    instrument: 'JWST NIRCam & Hubble WFC3',
    facts:
      'Towering interstellar dust columns 4-5 light-years tall harboring active protostellar Evaporating Gaseous Globules (EGGs). Infrared imaging penetrates obscuring dust to reveal newborn star clusters.',
    accentColor: '#00e5ff',
    accentHex: 0x00e5ff,
  },
  {
    title: 'VOYAGER 1 PROBE',
    sub: 'NASA JPL // INTERSTELLAR MISSION',
    category: 'DEEP-SPACE INTERSTELLAR EXPLORER',
    image: '/astronomy/voyager1_interstellar.jpg',
    type: 'Interstellar Boundary & Plasma Wave Explorer',
    dist: '163.8 AU (24.5 Billion km)',
    sector: 'Heliosheath Outer Boundary // Ophiuchus',
    instrument: 'Cosmic Ray Subsystem // Golden Record',
    facts:
      'First human-made spacecraft to cross the Heliopause into interstellar space (Aug 2012). Traveling at 17 km/s (38,000 mph) carrying the Golden Record message for distant civilizations.',
    accentColor: '#f59e0b',
    accentHex: 0xf59e0b,
  },
  {
    title: 'ANDROMEDA GALAXY',
    sub: 'MESSIER 31 // NGC 224',
    category: 'MAJOR LOCAL GROUP SPIRAL GALAXY',
    image: '/astronomy/galaxy_andromeda.jpg',
    type: 'Barred Spiral Galaxy (SA(s)b)',
    dist: '2.537 Million Light-Years',
    sector: 'Andromeda Constellation',
    instrument: 'Hubble Space Telescope HD Mosaic',
    facts:
      'Nearest major spiral galaxy to the Milky Way, spanning 220,000 light-years and containing over one trillion stars. Approaching our galaxy at 110 km/s on a cosmic merger trajectory.',
    accentColor: '#c084fc',
    accentHex: 0xc084fc,
  },
  {
    title: 'CARINA NEBULA',
    sub: 'NGC 3372 // COSMIC CLIFFS',
    category: 'DIFFUSE GIANT STAR-FORMING NURSERY',
    image: '/astronomy/nebula_carina.jpg',
    type: 'Massive Emission & Reflection Nebula Complex',
    dist: '7,600 Light-Years',
    sector: 'Carina-Sagittarius Arm',
    instrument: 'JWST NIRCam / MIRI Infrared Suite',
    facts:
      'Spectacular hyper-active star factory carved by intense ultraviolet radiation from monstrous O-type stars. The famous Cosmic Cliffs reveal embryonic stars emerging from dense molecular gas ridges.',
    accentColor: '#00e5ff',
    accentHex: 0x00e5ff,
  },
  {
    title: 'INTERNATIONAL SPACE STATION',
    sub: 'ISS // LOW EARTH ORBIT OBSERVATORY',
    category: 'CREWED MICROGRAVITY LABORATORY',
    image: '/astronomy/iss_orbit.jpg',
    type: 'Permanently Crewed Orbital Research Platform',
    dist: 'Orbital Altitude: 418 km',
    sector: 'Low Earth Orbit (Thermosphere)',
    instrument: '8 Solar Wings (120 kW) // AMS-02',
    facts:
      'Spanning 108.5 meters with a mass of 450,000 kg, the ISS has maintained continuous human presence in space since Nov 2000, orbiting Earth every 92 minutes at 27,600 km/h (7.66 km/s).',
    accentColor: '#fbbf24',
    accentHex: 0xfbbf24,
  },
  {
    title: 'WHIRLPOOL GALAXY',
    sub: 'MESSIER 51a // NGC 5194',
    category: 'GRAND-DESIGN INTERACTING SPIRAL',
    image: '/astronomy/galaxy_whirlpool.jpg',
    type: 'Grand-Design Spiral Galaxy with Companion',
    dist: '23 Million Light-Years',
    sector: 'Canes Venatici',
    instrument: 'Hubble Space Telescope ACS',
    facts:
      'Archetypal grand-design spiral galaxy engaged in violent gravitational tidal interaction with dwarf companion NGC 5195, triggering intense shockwaves and burst star formation along spiral arms.',
    accentColor: '#c084fc',
    accentHex: 0xc084fc,
  },
  {
    title: 'CRAB NEBULA',
    sub: 'MESSIER 1 // NGC 1952',
    category: 'SUPERNOVA REMNANT & PULSAR WIND',
    image: '/astronomy/nebula_crab.jpg',
    type: 'Synchrotron Radiation Filamentary Remnant',
    dist: '6,500 Light-Years',
    sector: 'Taurus Constellation',
    instrument: 'Hubble / Chandra X-Ray Observatory',
    facts:
      'Expanding debris field from historic core-collapse supernova witnessed in 1054 AD. Driven from within by a 30 Hz spinning neutron star emitting intense magnetic synchrotron radiation.',
    accentColor: '#00e5ff',
    accentHex: 0x00e5ff,
  },
  {
    title: 'ISS OVER PLANET EARTH',
    sub: 'ISS // HIGH-INCLINATION OVERFLIGHT',
    category: 'EARTH OBSERVATION FROM THERMOSPHERE',
    image: '/astronomy/iss_earth.jpg',
    type: 'Orbital Inclination: 51.64 Degrees',
    dist: 'Velocity: 7.66 km/s (17,100 mph)',
    sector: 'Circum-Terrestrial Low Orbit',
    instrument: 'Cupola 7-Window Observation Bay',
    facts:
      'Completing 15.5 full orbits around Earth each day, astronauts aboard the ISS witness 16 sunrises and sunsets every 24 hours while capturing environmental climate telemetry.',
    accentColor: '#38bdf8',
    accentHex: 0x38bdf8,
  },
  {
    title: 'SOMBRERO GALAXY',
    sub: 'MESSIER 104 // NGC 4594',
    category: 'HYBRID SPIRAL / LENTICULAR GALAXY',
    image: '/astronomy/galaxy_sombrero.jpg',
    type: 'Unbarred Spiral with Enormous Central Bulge',
    dist: '29.3 Million Light-Years',
    sector: 'Virgo / Corvus Border',
    instrument: 'Hubble Space Telescope & Spitzer',
    facts:
      'Distinguished by its brilliant white central bulbous core and prominent symmetric dark dust lane. Anchored by an ultra-massive central black hole exceeding one billion solar masses.',
    accentColor: '#c084fc',
    accentHex: 0xc084fc,
  },
];

/**
 * Creates the Single Large Curved Holographic Screen on top of the Astro Pod.
 * @param {THREE.Group} parentGroup - Astronomy station group
 * @param {THREE.Camera} [camera] - Scene camera for click raycasting
 * @returns {{ screen: Object, interactiveTargets: Array, group: THREE.Group, update: Function, destroy: Function }}
 */
export function createAstronomyScreens(parentGroup, camera) {
  const screensGroup = new THREE.Group();
  screensGroup.name = 'AstronomyCurvedHolographicScreenGroup';
  parentGroup.add(screensGroup);

  const interactiveTargets = [];
  const slides = ASTRONOMY_MASTER_SLIDES;

  // ── 1. DIRECTION VECTORS ──
  // Base position of astronomy pod:
  const basePos = stationPosition('astronomy');
  // Entrance vector points towards Home Pod / Atrium center:
  const dirEntrance = new THREE.Vector3(-basePos.x, 0, -basePos.z).normalize();
  const dirBack = dirEntrance.clone().negate();
  const baseLookAngle = Math.atan2(dirEntrance.x, dirEntrance.z);

  // ── 2. SCREEN DIMENSIONS & CURVATURE (HANGING FROM ROOF) ──
  const SCREEN_WIDTH = 4.40;   // 4.40 meters wide along curve (expansive panoramic arc)
  const SCREEN_HEIGHT = 1.65;  // 1.65 meters tall (grand museum scale)
  const R_BEND = 2.65;         // Curvature radius (hugs the circular pod perimeter)

  // Positioned in the rear (R = 2.60m), hanging from the ceiling structure facing Home Pod
  // Neptune orbit is at R = 1.85m -> 0.75m clearance guaranteed!
  const screenPos = dirBack.clone().multiplyScalar(2.60);
  const headCenterY = 2.05;    // Screen center at y = 2.05m (bottom at 1.225m, top at 2.875m)
  const CEILING_Y = 8.85;      // Ceiling dome vault height above astronomy pod
  const screenGroup = new THREE.Group();
  screenGroup.name = 'AstroSingleCurvedScreenConsole';
  screenGroup.position.set(screenPos.x, 0.0, screenPos.z); // Hanging from ceiling, zero floor/deck clutter
  screenGroup.rotation.y = baseLookAngle;
  screensGroup.add(screenGroup);

  // ── 3. HIGH-RESOLUTION CANVAS FOR HOLOGRAPHIC HUD ($1920 \times 1080$) ──
  const canvas = document.createElement('canvas');
  canvas.width = 1920;
  canvas.height = 1080;
  const ctx = canvas.getContext('2d');

  const canvasTexture = new THREE.CanvasTexture(canvas);
  canvasTexture.minFilter = THREE.LinearFilter;
  canvasTexture.magFilter = THREE.LinearFilter;
  canvasTexture.generateMipmaps = false;

  // Preload all 9 slide photos
  const loadedImages = [];
  slides.forEach((s) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = s.image;
    img.onload = () => {
      renderScreen();
    };
    loadedImages.push(img);
  });

  // Timing controls: 2.5s duration (between 2 and 3 sec as requested)
  let currentIndex = 0;
  let nextIndex = 0;
  let transitionProgress = 1.0;
  let slideTimer = 0;
  let isPaused = false;
  const SLIDE_DURATION = 2.5;       // Exactly 2.5s per image
  const TRANSITION_DURATION = 0.55;  // Fluid 0.55s crossfade

  // ── 4. CANVAS RENDERING ENGINE (HOLOGRAPHIC PANORAMIC HUD) ──
  function renderScreen() {
    ctx.clearRect(0, 0, 1920, 1080);

    const activeSlide = transitionProgress > 0.5 ? slides[nextIndex] : slides[currentIndex];
    const displayIndex = (transitionProgress > 0.5 ? nextIndex : currentIndex) + 1;
    const accentColor = activeSlide.accentColor;

    // A. Holographic 3-5% Translucent Glass Background (96% Opacity, 4% Transparency)
    ctx.fillStyle = 'rgba(4, 8, 18, 0.96)';
    ctx.fillRect(0, 0, 1920, 1080);

    // Subtle digital cyan grid lines in glass
    ctx.strokeStyle = 'rgba(0, 229, 255, 0.04)';
    ctx.lineWidth = 1;
    for (let x = 80; x < 1920; x += 160) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 1080);
      ctx.stroke();
    }

    // B. Draw Panoramic Cosmic Slide with Smooth Crossfade
    function drawSlidePhoto(idx, alpha) {
      if (idx < 0 || idx >= loadedImages.length) return;
      const img = loadedImages[idx];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(1, alpha)) * 0.95;

      // Draw photo across center panorama (feathered at edges into solid glass)
      const canvasAspect = 1920 / 1080;
      const imgAspect = img.naturalWidth / img.naturalHeight;
      let dw, dh, dx, dy;

      if (imgAspect > canvasAspect) {
        dh = 1080;
        dw = 1080 * imgAspect;
        dx = (1920 - dw) / 2;
        dy = 0;
      } else {
        dw = 1920;
        dh = 1920 / imgAspect;
        dx = 0;
        dy = (1080 - dh) / 2;
      }

      ctx.drawImage(img, dx, dy, dw, dh);

      // Radial vignette blending softly into dark edges
      const vignette = ctx.createRadialGradient(960, 540, 280, 960, 540, 960);
      vignette.addColorStop(0, 'rgba(4, 8, 18, 0.0)');
      vignette.addColorStop(0.60, 'rgba(4, 8, 18, 0.30)');
      vignette.addColorStop(1, 'rgba(4, 8, 18, 0.92)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, 1920, 1080);

      ctx.restore();
    }

    if (transitionProgress >= 1.0) {
      drawSlidePhoto(currentIndex, 1.0);
    } else {
      drawSlidePhoto(currentIndex, 1.0 - transitionProgress);
      drawSlidePhoto(nextIndex, transitionProgress);
    }

    // C. Center Holographic Crosshairs & Horizon Marks
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(960, 80);
    ctx.lineTo(960, 140);
    ctx.moveTo(960, 920);
    ctx.lineTo(960, 980);
    ctx.moveTo(840, 540);
    ctx.lineTo(900, 540);
    ctx.moveTo(1020, 540);
    ctx.lineTo(1080, 540);
    ctx.stroke();

    // D. Top Header Bar (Height 68px, Bold 22px-24px Typography)
    ctx.fillStyle = 'rgba(6, 12, 26, 0.94)';
    ctx.fillRect(0, 0, 1920, 68);
    ctx.fillStyle = accentColor;
    ctx.fillRect(0, 0, 1920, 5);

    ctx.font = '900 22px "Inter", monospace';
    ctx.fillStyle = accentColor;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(`★ NASA / ESA / JWST ASTRONOMY ATLAS // ${activeSlide.category}`, 50, 36);

    ctx.textAlign = 'right';
    ctx.font = 'bold 22px "Inter", monospace';
    ctx.fillStyle = isPaused ? '#f59e0b' : 'rgba(255, 255, 255, 0.90)';
    ctx.fillText(
      isPaused
        ? `[ ⏸ STREAM PAUSED ]`
        : `[ LIVE STREAM // SLIDE ${String(displayIndex).padStart(2, '0')} / 09  •  2.5s DYNAMIC CYCLE ]`,
      1870,
      36
    );

    // E. Left Telemetry Wing (High-Contrast Solid HUD Card, Width 570px)
    const cardY = 120;
    const cardH = 820;
    const leftCardW = 570;

    ctx.fillStyle = 'rgba(6, 12, 26, 0.94)';
    ctx.fillRect(50, cardY, leftCardW, cardH);
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 2.5;
    ctx.strokeRect(50, cardY, leftCardW, cardH);
    drawCornerBrackets(ctx, 50, cardY, leftCardW, cardH, accentColor);

    // Left Title Block (Bold 50px Title, 24px Subtitle)
    ctx.textAlign = 'left';
    ctx.font = '900 50px "Inter", "Segoe UI", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(activeSlide.title, 80, cardY + 68);

    ctx.font = '900 24px "Inter", monospace';
    ctx.fillStyle = accentColor;
    ctx.fillText(activeSlide.sub, 80, cardY + 116);

    // Architectural Divider
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.20)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(80, cardY + 145);
    ctx.lineTo(50 + leftCardW - 30, cardY + 145);
    ctx.stroke();

    // Large Telemetry Fields (20px labels, 26px values!)
    const tCol1 = 80;
    let tY = cardY + 195;
    const stepY = 88;

    const telemetryFields = [
      { label: 'CLASSIFICATION:', val: activeSlide.type, color: '#f1f5f9' },
      { label: 'DISTANCE / RANGE:', val: activeSlide.dist, color: '#38bdf8' },
      { label: 'CONSTELLATION / SECTOR:', val: activeSlide.sector, color: '#c084fc' },
      { label: 'OBSERVATION INSTRUMENT:', val: activeSlide.instrument, color: '#fbbf24' },
    ];

    telemetryFields.forEach((f) => {
      ctx.font = '900 18px "Inter", monospace';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(f.label, tCol1, tY);

      ctx.font = '900 26px "Inter", "Segoe UI", sans-serif';
      ctx.fillStyle = f.color;
      wrapText(ctx, f.val, tCol1, tY + 34, leftCardW - 60, 32);

      tY += stepY + 28;
    });

    // F. Right Telemetry Wing (High-Contrast Solid HUD Card, Width 570px)
    const rightCardX = 1300;
    const rightCardW = 570;

    ctx.fillStyle = 'rgba(6, 12, 26, 0.94)';
    ctx.fillRect(rightCardX, cardY, rightCardW, cardH);
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 2.5;
    ctx.strokeRect(rightCardX, cardY, rightCardW, cardH);
    drawCornerBrackets(ctx, rightCardX, cardY, rightCardW, accentColor);

    // Right Header (Bold 24px)
    ctx.font = '900 24px "Inter", monospace';
    ctx.fillStyle = accentColor;
    ctx.fillText('MISSION & ASTROPHYSICAL SUMMARY', rightCardX + 35, cardY + 60);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.20)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(rightCardX + 35, cardY + 90);
    ctx.lineTo(rightCardX + rightCardW - 35, cardY + 90);
    ctx.stroke();

    // Narrative Paragraph (Bold 24px text with 38px line height!)
    ctx.font = 'bold 24px "Inter", "Segoe UI", sans-serif';
    ctx.fillStyle = '#f8fafc';
    wrapText(ctx, activeSlide.facts, rightCardX + 35, cardY + 140, rightCardW - 70, 38);

    // Live Stream Diagnostic Box (Large 20px-22px text)
    const diagY = cardY + 490;
    ctx.fillStyle = 'rgba(8, 16, 34, 0.95)';
    ctx.fillRect(rightCardX + 35, diagY, rightCardW - 70, 280);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(rightCardX + 35, diagY, rightCardW - 70, 280);

    ctx.font = '900 20px "Inter", monospace';
    ctx.fillStyle = '#38bdf8';
    ctx.fillText('OPTICAL PAYLOAD TELEMETRY:', rightCardX + 60, diagY + 45);

    ctx.font = 'bold 20px "Inter", monospace';
    ctx.fillStyle = '#cbd5e1';
    ctx.fillText('• QUANTUM SENSOR EFFICIENCY: 99.4%', rightCardX + 60, diagY + 95);
    ctx.fillText('• ATMOSPHERIC EXTINCTION: ZERO (SPACE)', rightCardX + 60, diagY + 145);
    ctx.fillText('• MULTI-WAVELENGTH INFRARED: ACTIVE', rightCardX + 60, diagY + 195);
    ctx.fillText('• TIME-STEP REFRESH: 2.50 SECONDS', rightCardX + 60, diagY + 245);

    // G. Bottom Interactive Navigation Bar (Large 26px Buttons)
    const footY = 1015;
    ctx.fillStyle = 'rgba(5, 12, 26, 0.94)';
    ctx.fillRect(0, 960, 1920, 120);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.20)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 960);
    ctx.lineTo(1920, 960);
    ctx.stroke();

    // [ ◀ PREV SLIDE ] button zone
    ctx.font = '900 26px "Inter", monospace';
    ctx.fillStyle = accentColor;
    ctx.textAlign = 'left';
    ctx.fillText(`◀ PREV SLIDE  (Click Left)`, 60, footY + 15);

    // Center slide dots & Pause/Resume indicator
    ctx.textAlign = 'center';
    ctx.font = 'bold 20px "Inter", monospace';
    ctx.fillStyle = isPaused ? '#f59e0b' : 'rgba(255, 255, 255, 0.85)';
    ctx.fillText(
      isPaused ? `[ ⏸ STREAM PAUSED — CLICK TO RESUME ]` : `[ CLICK CENTER TO PAUSE / RESUME ]`,
      960,
      footY - 8
    );

    const totalSlides = slides.length;
    const dotSpacing = 36;
    const dotStartX = 960 - ((totalSlides - 1) * dotSpacing) / 2;
    for (let d = 0; d < totalSlides; d++) {
      const dx = dotStartX + d * dotSpacing;
      ctx.beginPath();
      ctx.arc(dx, footY + 26, d === displayIndex - 1 ? 8 : 4.5, 0, Math.PI * 2);
      ctx.fillStyle = d === displayIndex - 1 ? accentColor : 'rgba(255, 255, 255, 0.35)';
      ctx.fill();
    }

    // [ NEXT SLIDE ▶ ] button zone
    ctx.textAlign = 'right';
    ctx.fillStyle = accentColor;
    ctx.fillText(`NEXT SLIDE ▶  (Click Right)`, 1860, footY + 15);

    canvasTexture.needsUpdate = true;
  }

  renderScreen();

  // ── 5. CURVED SCREEN 3D GEOMETRY BUILDER (CYLINDRICAL BENDING) ──
  const curvedScreenGeo = new THREE.PlaneGeometry(SCREEN_WIDTH, SCREEN_HEIGHT, 48, 16);
  const posAttr = curvedScreenGeo.attributes.position;
  for (let i = 0; i < posAttr.count; i++) {
    const x = posAttr.getX(i);
    // Smooth cylindrical curve forward towards viewer (+Z)
    const sinVal = Math.max(-0.95, Math.min(0.95, x / R_BEND));
    const zOffset = R_BEND * (1.0 - Math.cos(Math.asin(sinVal)));
    posAttr.setZ(i, zOffset);
  }
  curvedScreenGeo.computeVertexNormals();

  // ── 6. REAL-TIME HOLOGRAPHIC TRANSPARENT SHADER MATERIAL ──
  const activeColorObj = new THREE.Color(slides[0].accentHex);
  const hologramMat = new THREE.ShaderMaterial({
    uniforms: {
      uTexture: { value: canvasTexture },
      uTime: { value: 0.0 },
      uAccentColor: { value: activeColorObj },
      uOpacity: { value: 0.96 }, // User requested 3-5% transparency (95-97% opacity)
    },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vWorldPosition;
      varying vec3 vViewPosition;

      void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vWorldPosition = wp.xyz;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vViewPosition = -mvPosition.xyz;
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform sampler2D uTexture;
      uniform float uTime;
      uniform vec3 uAccentColor;
      uniform float uOpacity;

      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vWorldPosition;
      varying vec3 vViewPosition;

      void main() {
        vec4 texColor = texture2D(uTexture, vUv);

        // Perceptual brightness of texel
        float lum = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));

        // Horizontal digital scanlines
        float scanline = sin((vWorldPosition.y + uTime * 0.35) * 110.0) * 0.5 + 0.5;
        scanline = smoothstep(0.15, 0.85, scanline) * 0.12 + 0.88;

        // Subtle digital matrix grain
        float dotGrid = sin(vUv.x * 480.0) * sin(vUv.y * 280.0);
        float gridPulse = smoothstep(0.75, 1.0, dotGrid) * 0.06;

        // Holographic flicker
        float flicker = 0.99 + 0.01 * sin(uTime * 15.0) * cos(uTime * 25.0);

        // Luminous Fresnel rim glow along edges
        vec3 viewDir = normalize(vViewPosition);
        vec3 normal = normalize(vNormal);
        float fresnel = pow(1.0 - abs(dot(normal, viewDir)), 2.6);

        // Color composition
        vec3 col = texColor.rgb * scanline * flicker;
        col += uAccentColor * gridPulse * 0.4;
        col += (uAccentColor + vec3(0.20)) * fresnel * 0.35;

        // HOLOGRAPHIC 3-5% TRANSPARENCY (95-97% OPACITY):
        // User requested around 3 to 5% transparency (95-97% opacity)
        // so content, high-res photos and text are ultra-crisp, rich and punchy
        // while maintaining subtle holographic depth pass-through.
        float baseAlpha = texColor.a * (0.95 + lum * 0.03);
        float alpha = clamp((baseAlpha + fresnel * 0.10) * uOpacity, 0.94, 0.98);

        gl_FragColor = vec4(col, alpha);
      }
    `,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false, // Ensures objects behind are seen through the screen!
  });

  // ── 7. HEAD GROUP & MESHES ──
  const headGroup = new THREE.Group();
  headGroup.position.set(0, headCenterY, 0); // Position at hanging height (y = 2.05m)
  headGroup.rotation.x = -0.06; // Slight ergonomic tilt back towards viewer
  screenGroup.add(headGroup);

  const screenMesh = new THREE.Mesh(curvedScreenGeo, hologramMat);
  screenMesh.name = 'AstroSingleCurvedScreenMesh';
  screenMesh.userData = { isScreen: true };
  headGroup.add(screenMesh);
  interactiveTargets.push(screenMesh);

  // ── 8. CURVED TOP & BOTTOM BEZEL RAILS WITH NEON ACCENT STRIPS ──
  const pedestalMat = new THREE.MeshStandardMaterial({
    color: COLOR_POD_WHITE,
    roughness: 0.92,
    metalness: 0.0,
  });

  const aluminumTrimMat = new THREE.MeshPhysicalMaterial({
    color: COLOR_ALUMINUM,
    metalness: 0.94,
    roughness: 0.22,
    clearcoat: 0.6,
  });

  const neonMat = new THREE.MeshPhysicalMaterial({
    color: slides[0].accentHex,
    emissive: new THREE.Color(slides[0].accentHex),
    emissiveIntensity: 2.5,
    roughness: 0.2,
  });

  // Helper to bend a box geometry along the same R_BEND curve
  function createCurvedBezelRail(w, h, d, yOffset) {
    const boxGeo = new THREE.BoxGeometry(w, h, d, 48, 1, 1);
    const bPos = boxGeo.attributes.position;
    for (let i = 0; i < bPos.count; i++) {
      const x = bPos.getX(i);
      const sinVal = Math.max(-0.95, Math.min(0.95, x / R_BEND));
      const zOffset = R_BEND * (1.0 - Math.cos(Math.asin(sinVal)));
      bPos.setZ(i, bPos.getZ(i) + zOffset);
    }
    boxGeo.computeVertexNormals();
    const railMesh = new THREE.Mesh(boxGeo, pedestalMat);
    railMesh.position.y = yOffset;
    railMesh.castShadow = true;
    headGroup.add(railMesh);

    // Glowing Neon Edge Strip inside Rail
    const neonGeo = new THREE.BoxGeometry(w - 0.04, 0.012, d + 0.01, 48, 1, 1);
    const nPos = neonGeo.attributes.position;
    for (let i = 0; i < nPos.count; i++) {
      const x = nPos.getX(i);
      const sinVal = Math.max(-0.95, Math.min(0.95, x / R_BEND));
      const zOffset = R_BEND * (1.0 - Math.cos(Math.asin(sinVal)));
      nPos.setZ(i, nPos.getZ(i) + zOffset);
    }
    neonGeo.computeVertexNormals();
    const neonMesh = new THREE.Mesh(neonGeo, neonMat);
    neonMesh.position.y = yOffset;
    headGroup.add(neonMesh);

    return { railMesh, neonMesh };
  }

  // Top and Bottom curved frame rails
  createCurvedBezelRail(SCREEN_WIDTH + 0.08, 0.035, 0.035, SCREEN_HEIGHT / 2 + 0.018);
  createCurvedBezelRail(SCREEN_WIDTH + 0.08, 0.035, 0.035, -SCREEN_HEIGHT / 2 - 0.018);

  // ── 9. ARCHITECTURAL CEILING SUSPENSION RIGGING (HANGING FROM THE ROOF) ──
  // The screen hangs weightlessly from high-tensile aircraft cables descending from the ceiling dome.
  // ZERO stands on the floor or pod deck, leaving the entire Astro Pod platform 100% open and pristine!
  const suspensionRigGroup = new THREE.Group();
  screenGroup.add(suspensionRigGroup);

  // Curved horizontal structural backbone spanning the back of the screen
  const spineBoxGeo = new THREE.BoxGeometry(2.40, 0.06, 0.05, 32, 1, 1);
  const sPos = spineBoxGeo.attributes.position;
  for (let i = 0; i < sPos.count; i++) {
    const x = sPos.getX(i);
    const sinVal = Math.max(-0.95, Math.min(0.95, x / R_BEND));
    const zOffset = R_BEND * (1.0 - Math.cos(Math.asin(sinVal)));
    sPos.setZ(i, sPos.getZ(i) + zOffset);
  }
  spineBoxGeo.computeVertexNormals();
  const spineMesh = new THREE.Mesh(spineBoxGeo, aluminumTrimMat);
  spineMesh.position.set(0, headCenterY, -0.035);
  spineMesh.rotation.x = -0.06;
  screenGroup.add(spineMesh);

  // 4 High-Tensile Polished Aircraft Suspension Cables descending from Ceiling Dome
  const topRailY = headCenterY + SCREEN_HEIGHT / 2 + 0.018; // y = 2.893m
  const cableLength = CEILING_Y - topRailY;                 // ~5.95m
  const cableCenterY = topRailY + cableLength / 2;          // ~5.87m
  const cableOffsets = [-1.65, -0.55, 0.55, 1.65];

  cableOffsets.forEach((cx) => {
    const sinVal = Math.max(-0.95, Math.min(0.95, cx / R_BEND));
    const cz = R_BEND * (1.0 - Math.cos(Math.asin(sinVal)));

    // Polished Stainless/Aluminum Aircraft Suspension Cable
    const cableGeo = new THREE.CylinderGeometry(0.010, 0.010, cableLength, 16);
    const cableMesh = new THREE.Mesh(cableGeo, aluminumTrimMat);
    cableMesh.position.set(cx, cableCenterY, cz);
    suspensionRigGroup.add(cableMesh);

    // Bottom Turnbuckle Cable Tensioner Fitting on Screen Top Rail
    const tensionerGeo = new THREE.CylinderGeometry(0.022, 0.022, 0.09, 16);
    const tensionerMesh = new THREE.Mesh(tensionerGeo, aluminumTrimMat);
    tensionerMesh.position.set(cx, topRailY + 0.045, cz);
    suspensionRigGroup.add(tensionerMesh);

    // Top Ceiling Anchor Flange Escutcheon Plate at Ceiling Vault
    const anchorGeo = new THREE.CylinderGeometry(0.12, 0.14, 0.04, 24);
    const anchorMesh = new THREE.Mesh(anchorGeo, pedestalMat);
    anchorMesh.position.set(cx, CEILING_Y, cz);
    suspensionRigGroup.add(anchorMesh);

    // Glowing Neon Accent Ring around Ceiling Anchor
    const anchorTrimGeo = new THREE.TorusGeometry(0.13, 0.01, 12, 24);
    anchorTrimGeo.rotateX(Math.PI / 2);
    const anchorTrimMesh = new THREE.Mesh(anchorTrimGeo, neonMat);
    anchorTrimMesh.position.set(cx, CEILING_Y - 0.02, cz);
    suspensionRigGroup.add(anchorTrimMesh);
  });

  // Ambient Volumetric Accent Glow
  const floorGlow = new THREE.PointLight(slides[0].accentHex, 1.4, 6.0, 1.6);
  floorGlow.position.set(0, headCenterY - 0.40, 0.3);
  floorGlow.position.set(0, 0.35, 0.3);
  screenGroup.add(floorGlow);

  // ── 10. INTERACTION CONTROLS (PREV / NEXT / PAUSE) ──
  function nextSlide() {
    if (transitionProgress < 1.0) return;
    nextIndex = (currentIndex + 1) % slides.length;
    transitionProgress = 0.0;
    slideTimer = 0;
  }

  function prevSlide() {
    if (transitionProgress < 1.0) return;
    nextIndex = (currentIndex - 1 + slides.length) % slides.length;
    transitionProgress = 0.0;
    slideTimer = 0;
  }

  function togglePause() {
    isPaused = !isPaused;
    renderScreen();
  }

  const screenManager = {
    screenMesh,
    nextSlide,
    prevSlide,
    togglePause,
    update(dt) {
      // Advance slide timer if not paused
      if (!isPaused) {
        slideTimer += dt;
        if (slideTimer >= SLIDE_DURATION && transitionProgress >= 1.0) {
          nextIndex = (currentIndex + 1) % slides.length;
          transitionProgress = 0.0;
          slideTimer = 0;
        }
      }

      // Handle smooth crossfade transition
      if (transitionProgress < 1.0) {
        transitionProgress += dt / TRANSITION_DURATION;
        if (transitionProgress >= 1.0) {
          transitionProgress = 1.0;
          currentIndex = nextIndex;
          // Synchronize accent colors on transition completion
          const activeSlide = slides[currentIndex];
          activeColorObj.set(activeSlide.accentHex);
          neonMat.color.set(activeSlide.accentHex);
          neonMat.emissive.set(activeSlide.accentHex);
          floorGlow.color.set(activeSlide.accentHex);
        }
        renderScreen();
      }

      // Advance holographic shader time uniform
      hologramMat.uniforms.uTime.value += dt;
    },
  };

  // ── 11. TOUCH & CLICK RAYCASTING HANDLER ──
  const raycaster = new THREE.Raycaster();
  const pointerPos = new THREE.Vector2();
  let pointerDownPos = { x: 0, y: 0, time: 0 };

  const handlePointerDown = (e) => {
    pointerDownPos = {
      x: e.clientX ?? e.touches?.[0]?.clientX ?? 0,
      y: e.clientY ?? e.touches?.[0]?.clientY ?? 0,
      time: performance.now(),
    };
  };

  const handlePointerUp = (e) => {
    if (!camera) return;
    const upX = e.clientX ?? e.changedTouches?.[0]?.clientX ?? 0;
    const upY = e.clientY ?? e.changedTouches?.[0]?.clientY ?? 0;
    const dist = Math.hypot(upX - pointerDownPos.x, upY - pointerDownPos.y);
    const elapsed = performance.now() - pointerDownPos.time;

    if (dist > 12 || elapsed > 650) return;

    if (
      e.target &&
      (e.target.closest('#hud-container') ||
        e.target.closest('.hud-panel') ||
        e.target.closest('button') ||
        e.target.closest('input'))
    ) {
      return;
    }

    pointerPos.x = (upX / window.innerWidth) * 2 - 1;
    pointerPos.y = -(upY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(pointerPos, camera);
    const hits = raycaster.intersectObjects(interactiveTargets, true);

    if (hits.length > 0) {
      const hit = hits[0];
      if (hit.uv) {
        // Horizontal UV interaction zones:
        // Left 28%: Previous Slide
        // Right 28%: Next Slide
        // Center 44%: Toggle Pause / Resume
        if (hit.uv.x < 0.28) {
          screenManager.prevSlide();
        } else if (hit.uv.x > 0.72) {
          screenManager.nextSlide();
        } else {
          screenManager.togglePause();
        }
      }
    }
  };

  window.addEventListener('pointerdown', handlePointerDown, { passive: true });
  window.addEventListener('pointerup', handlePointerUp, { passive: true });

  return {
    screens: [screenManager],
    interactiveTargets,
    group: screensGroup,
    update(dt) {
      screenManager.update(dt);
    },
    destroy() {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
    },
  };
}

// ── UTILITY DRAWING HELPERS ──
function wrapText(context, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  let curY = y;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = context.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      context.fillText(line.trim(), x, curY);
      line = words[n] + ' ';
      curY += lineHeight;
    } else {
      line = testLine;
    }
  }
  context.fillText(line.trim(), x, curY);
  return curY + lineHeight;
}

function drawCornerBrackets(ctx, x, y, w, h, color) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.5;
  const len = 20;

  // Top Left
  ctx.beginPath();
  ctx.moveTo(x, y + len);
  ctx.lineTo(x, y);
  ctx.lineTo(x + len, y);
  ctx.stroke();

  // Top Right
  ctx.beginPath();
  ctx.moveTo(x + w - len, y);
  ctx.lineTo(x + w, y);
  ctx.lineTo(x + w, y + len);
  ctx.stroke();

  // Bottom Left
  ctx.beginPath();
  ctx.moveTo(x, y + h - len);
  ctx.lineTo(x, y + h);
  ctx.lineTo(x + len, y + h);
  ctx.stroke();

  // Bottom Right
  ctx.beginPath();
  ctx.moveTo(x + w - len, y + h);
  ctx.lineTo(x + w, y + h);
  ctx.lineTo(x + w, y + h - len);
  ctx.stroke();
}
