// src/environment/scientistExhibits.js — Museum Exhibition Panels for 12 World & Indian Scientific Pioneers
import * as THREE from 'three';

/**
 * Authentic biographical, quotation, and equation records for the 12 featured pioneers:
 * Specially highlighting Dr. A.P.J. Abdul Kalam, Dr. S. Radhakrishnan, and legendary Indian pioneers.
 */
export const SCIENTISTS_DATA = [
  {
    id: 'kalam',
    name: 'DR. A.P.J. ABDUL KALAM',
    category: 'INDIAN SCIENTIFIC PIONEER',
    lifespan: '1931 – 2015  |  AEROSPACE & DEFENCE',
    subtitle: 'Missile Man of India & 11th President of India',
    image: '/scientists/kalam.jpg',
    slides: [
      {
        quote: '“Dream is not that which you see while sleeping, it is something that does not let you sleep.”',
        equationName: 'ROCKET PROPULSION & THRUST DYNAMICS',
        equation: 'v(t) = v₀ + u · ln(m₀ / m) - g · t',
        discovery: 'Architect of India’s first Satellite Launch Vehicle (SLV-3) and Indigenous Guided Missile Programme (AGNI & PRITHVI).',
      },
      {
        quote: '“To succeed in your mission, you must have single-minded devotion to your goal.”',
        equationName: 'AERODYNAMIC RE-ENTRY HEATING',
        equation: 'q̇ = C · √(ρ / R_n) · V³',
        discovery: 'Pioneered carbon-composite heat shield structures for ballistic missile atmospheric re-entry protection.',
      },
      {
        quote: '“Excellence happens not by accident. It is a process where an individual strives to better themselves.”',
        equationName: 'ISRO-DRDO INDIGENOUS INTEGRATION',
        equation: 'Technology Self-Reliance = Applied R&D × Vision',
        discovery: 'Spearheaded nuclear technology integration and modernised India’s defence and aerospace infrastructure.',
      },
    ],
  },
  {
    id: 'radhakrishnan',
    name: 'DR. S. RADHAKRISHNAN',
    category: 'INDIAN SCHOLAR & PHILOSOPHER',
    lifespan: '1888 – 1975  |  EPISTEMOLOGY & ETHICS',
    subtitle: 'Statesman, Thinker & 2nd President of India',
    image: '/scientists/radhakrishnan.jpg',
    slides: [
      {
        quote: '“The true teachers are those who help us think for ourselves. Knowledge gives power, wisdom gives fullness.”',
        equationName: 'EPISTEMOLOGY OF SCIENTIFIC DISCOVERY',
        equation: 'Satyam · Shivam · Sundaram  [Truth & Goodness]',
        discovery: 'Bridged eastern philosophy and modern scientific inquiry, championing rational thought in democratic nation-building.',
      },
      {
        quote: '“When we think we know, we cease to learn. Humility is the foundation of genuine knowledge.”',
        equationName: 'SYNTHESIS OF SCIENCE & SPIRIT',
        equation: 'Progress = Empirical Truth × Ethical Responsibility',
        discovery: 'Represented India at UNESCO and inspired national Teachers’ Day to celebrate mentorship in science and philosophy.',
      },
    ],
  },
  {
    id: 'raman',
    name: 'SIR C.V. RAMAN',
    category: 'INDIAN SCIENTIFIC PIONEER',
    lifespan: '1888 – 1970  |  OPTICS & QUANTUM SPECTROSCOPY',
    subtitle: 'Nobel Laureate in Physics (1930)',
    image: '/scientists/raman.JPG',
    slides: [
      {
        quote: '“The essence of science is independent thinking, hard work, and not equipment. I am the master of my failure.”',
        equationName: 'THE RAMAN EFFECT (INELASTIC SCATTERING)',
        equation: 'Δν = ν₀ - ν_s = ΔE_vib / h',
        discovery: 'Discovered that photons scattered by molecules undergo frequency shifts revealing their vibrational quantum energy levels.',
      },
      {
        quote: '“I would like to tell young men and women: Do not lose hope. Courage is the finest attribute of a scientist.”',
        equationName: 'MOLECULAR LIGHT SCATTERING INTENSITY',
        equation: 'I_s ∝ (1 + cos²θ) / λ⁴ · |α_ij|²',
        discovery: 'First Asian scientist to receive the Nobel Prize in Physics; transformed chemical identification and molecular crystallography.',
      },
    ],
  },
  {
    id: 'ramanujan',
    name: 'SRINIVASA RAMANUJAN',
    category: 'INDIAN SCIENTIFIC PIONEER',
    lifespan: '1887 – 1920  |  PURE MATHEMATICS & NUMBER THEORY',
    subtitle: 'Fellow of the Royal Society, Cambridge',
    image: '/scientists/ramanujan.jpg',
    slides: [
      {
        quote: '“An equation for me has no meaning unless it expresses a thought of God.”',
        equationName: 'RAMANUJAN INFINITE SERIES FOR π',
        equation: '1/π = (2√2 / 9801) ∑ₖ [(4k)!(1103 + 26390k)] / [(k!)⁴ 396⁴ᵏ]',
        discovery: 'Formulated revolutionary identities in elliptic modular functions, mock theta series, and asymptotic partition theory p(n).',
      },
      {
        quote: '“To have made such discoveries with no formal training is the work of absolute mathematical genius.”',
        equationName: 'HARDY-RAMANUJAN ASYMPTOTIC FORMULA',
        equation: 'p(n) ∼ (1 / 4n√3) · exp( π √(2n/3) )',
        discovery: 'Unveiled profound connections in analytic number theory now applied in string theory and black hole entropy.',
      },
    ],
  },
  {
    id: 'snbose',
    name: 'SATYENDRA NATH BOSE',
    category: 'INDIAN SCIENTIFIC PIONEER',
    lifespan: '1894 – 1974  |  QUANTUM STATISTICAL MECHANICS',
    subtitle: 'Pioneer of Quantum Statistics & Bosons',
    image: '/scientists/snbose.jpg',
    slides: [
      {
        quote: '“If science is to flourish, it must be pursued for the love of truth and with absolute freedom of spirit.”',
        equationName: 'BOSE-EINSTEIN DISTRIBUTION FUNCTION',
        equation: '⟨nᵢ⟩ = gᵢ / [ e^( (εᵢ - μ) / k_B T ) - 1 ]',
        discovery: 'Derived Planck’s law without classical electrodynamics, founding quantum statistics for integer-spin particles (Bosons).',
      },
      {
        quote: '“The mind must remain open, for the truth of nature is beyond all human pre-conceived notions.”',
        equationName: 'BOSE-EINSTEIN CONDENSATION CRITICALITY',
        equation: 'T_c = (2πℏ² / m k_B) · (n / 2.612)^(2/3)',
        discovery: 'Predicted a new fifth state of matter where macroscopic ensembles of bosons condense into a single quantum wave function.',
      },
    ],
  },
  {
    id: 'bhabha',
    name: 'DR. HOMI J. BHABHA',
    category: 'INDIAN SCIENTIFIC PIONEER',
    lifespan: '1909 – 1966  |  NUCLEAR & PARTICLE PHYSICS',
    subtitle: 'Father of the Indian Nuclear Programme',
    image: '/scientists/bhabha.jpg',
    slides: [
      {
        quote: '“For the full industrialisation of any country, the vastest physical basis is atomic energy.”',
        equationName: 'BHABHA SCATTERING CROSS-SECTION (e⁺ e⁻ → e⁺ e⁻)',
        equation: 'dσ/dΩ = (α² / 8E²) [ (1 + cos⁴(θ/2))/sin⁴(θ/2) + ... ]',
        discovery: 'Calculated electron-positron relativistic scattering in quantum electrodynamics and founded TIFR & BARC.',
      },
      {
        quote: '“Science does not simply solve problems; it builds the intellectual infrastructure of an entire civilization.”',
        equationName: 'THREE-STAGE NUCLEAR POWER PROGRAMME',
        equation: '²³²Th + n → ²³³Th → ²³³Pa → ²³³U  (Thorium Fuel Cycle)',
        discovery: 'Devised India’s long-term energy security strategy utilizing abundant indigenous thorium deposits.',
      },
    ],
  },
  {
    id: 'sarabhai',
    name: 'DR. VIKRAM SARABHAI',
    category: 'INDIAN SCIENTIFIC PIONEER',
    lifespan: '1919 – 1971  |  COSMIC RAYS & SPACE EXPLORATION',
    subtitle: 'Father of the Indian Space Programme (ISRO)',
    image: '/scientists/sarabhai.jpg',
    slides: [
      {
        quote: '“We must be second to none in the application of advanced technologies to the real problems of man and society.”',
        equationName: 'COSMIC RAY SOLAR DIURNAL VARIATION',
        equation: 'J⃗ = q n (v⃗_E + v⃗_D + v⃗_‖)  [Plasma Drift]',
        discovery: 'Established India’s space program, launched the Thumba Equatorial Rocket Station, and founded ISRO.',
      },
      {
        quote: '“He who can listen to the music in the midst of noise can achieve the greatest things.”',
        equationName: 'SATELLITE INSTRUCTIONAL TELEVISION (SITE)',
        equation: 'Broadband Satellite Communication = Direct Social Impact',
        discovery: 'Pioneered direct satellite educational broadcasts to rural communities, demonstrating technological humanitarianism.',
      },
    ],
  },
  {
    id: 'jcbose',
    name: 'SIR JAGADISH CHANDRA BOSE',
    category: 'INDIAN SCIENTIFIC PIONEER',
    lifespan: '1858 – 1937  |  MICROWAVE OPTICS & PLANT BIOPHYSICS',
    subtitle: 'Pioneer of Millimetre Radio Waves & Crescograph',
    image: '/scientists/jcbose.JPG',
    slides: [
      {
        quote: '“The true laboratory is the mind, where behind all illusions we uncover the immutable laws of truth.”',
        equationName: 'MICROWAVE OPTICS GENERATION (λ = 5mm, 60 GHz)',
        equation: '∇ × E⃗ = -∂B⃗/∂t,   ∇ × B⃗ = μ₀ε₀ ∂E⃗/∂t',
        discovery: 'Invented millimetre-wave radio transmitters using semiconductor galena crystal detectors, preceding modern Wi-Fi & 5G.',
      },
      {
        quote: '“In the pursuit of science, there is no barrier of race or country. Science is universal.”',
        equationName: 'CRESCOGRAPH CELLULAR PLANT RESPONSE',
        equation: 'ΔL = M · Δx  [10,000× Magnification of Plant Growth]',
        discovery: 'Demonstrated electrical conduction and fatigue responses in living plants analogous to animal nervous tissue.',
      },
    ],
  },
  {
    id: 'einstein',
    name: 'ALBERT EINSTEIN',
    category: 'GLOBAL SCIENTIFIC HERITAGE',
    lifespan: '1879 – 1955  |  THEORETICAL PHYSICS',
    subtitle: 'Nobel Laureate in Physics (1921)',
    image: '/scientists/einstein.jpg',
    slides: [
      {
        quote: '“Imagination is more important than knowledge. For knowledge is limited, whereas imagination embraces the world.”',
        equationName: 'EINSTEIN FIELD EQUATIONS & MASS-ENERGY',
        equation: 'G_μν + Λ g_μν = (8πG / c⁴) T_μν ,   E = mc²',
        discovery: 'Formulated Special and General Relativity, revolutionizing gravity as spacetime curvature and explaining the photoelectric effect.',
      },
    ],
  },
  {
    id: 'newton',
    name: 'SIR ISAAC NEWTON',
    category: 'GLOBAL SCIENTIFIC HERITAGE',
    lifespan: '1643 – 1727  |  CLASSICAL MECHANICS & OPTICS',
    subtitle: 'Foundations of Modern Mathematical Physics',
    image: '/scientists/newton.jpg',
    slides: [
      {
        quote: '“If I have seen further, it is by standing on the shoulders of giants.”',
        equationName: 'LAW OF UNIVERSAL GRAVITATION & MOTION',
        equation: 'F⃗ = -G (m₁ m₂ / r²) r̂,   F⃗ = dp⃗/dt = m a⃗',
        discovery: 'Established the three fundamental laws of motion, universal gravitation, infinitesimal calculus, and optical prism refraction.',
      },
    ],
  },
  {
    id: 'curie',
    name: 'MARIE SKŁODOWSKA CURIE',
    category: 'GLOBAL SCIENTIFIC HERITAGE',
    lifespan: '1867 – 1934  |  RADIOCHEMISTRY & NUCLEAR PHYSICS',
    subtitle: 'Two-Time Nobel Laureate (Physics 1903, Chemistry 1911)',
    image: '/scientists/curie.jpg',
    slides: [
      {
        quote: '“Nothing in life is to be feared, it is only to be understood. Now is the time to understand more.”',
        equationName: 'LAW OF RADIOACTIVE DISINTEGRATION',
        equation: 'N(t) = N₀ e^(-λ t),   A(t) = -dN/dt = λ N(t)',
        discovery: 'Discovered Polonium and Radium, defined the nature of radioactivity, and developed mobile radiography units for battlefield surgery.',
      },
    ],
  },
  {
    id: 'tesla',
    name: 'NIKOLA TESLA',
    category: 'GLOBAL SCIENTIFIC HERITAGE',
    lifespan: '1856 – 1943  |  ELECTROMAGNETISM & POWER SYSTEMS',
    subtitle: 'Visionary Pioneer of Alternating Current',
    image: '/scientists/tesla.jpg',
    slides: [
      {
        quote: '“If you want to find the secrets of the universe, think in terms of energy, frequency and vibration.”',
        equationName: 'LC RESONANT FREQUENCY & TESLA TRANSFORMER',
        equation: 'f_r = 1 / (2π √(L C)),   ω = 2π f',
        discovery: 'Invented the polyphase AC induction motor, alternating current power grid, radio remote control, and the resonant Tesla transformer.',
      },
    ],
  },
];

/**
 * Word wrap helper for HTML5 Canvas
 */
function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  let curY = y;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line.trim(), x, curY);
      line = words[n] + ' ';
      curY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), x, curY);
  return curY + lineHeight;
}

/**
 * Renders an ultra-high-definition, 100% realistic museum exhibit plaque to an HTML5 Canvas.
 * Focused purely on the authentic historical photographic image of the scientist and their name
 * in large, majestic bold letters.
 * @param {Object} scientist
 * @param {HTMLImageElement|null} imgElement
 * @returns {HTMLCanvasElement}
 */
export function renderExhibitCanvas(scientist, imgElement = null) {
  const canvas = document.createElement('canvas');
  canvas.width = 1400;
  canvas.height = 1640;
  const ctx = canvas.getContext('2d');

  const W = canvas.width;
  const H = canvas.height;

  // 1. Background: Deep Museum Exhibition Slate with Subtle Radial Vignette
  const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
  bgGrad.addColorStop(0, '#151923');
  bgGrad.addColorStop(0.3, '#10131b');
  bgGrad.addColorStop(0.8, '#0b0d14');
  bgGrad.addColorStop(1, '#07090e');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, W, H);

  // 2. Beveled Metallic Museum Frame Inset
  ctx.strokeStyle = '#262f3f';
  ctx.lineWidth = 14;
  ctx.strokeRect(7, 7, W - 14, H - 14);

  // Gold hairline decorative border
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.45)';
  ctx.lineWidth = 2;
  ctx.strokeRect(22, 22, W - 44, H - 44);

  // Corner decorative brackets
  const bracketSize = 28;
  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 3;
  ctx.strokeRect(26, 26, bracketSize, bracketSize);
  ctx.strokeRect(W - 26 - bracketSize, 26, bracketSize, bracketSize);
  ctx.strokeRect(26, H - 26 - bracketSize, bracketSize, bracketSize);
  ctx.strokeRect(W - 26 - bracketSize, H - 26 - bracketSize, bracketSize, bracketSize);

  // 3. Grand Authentic Historical Photographic Portrait (Zero-crop contain fit: entire face & head visible)
  const maxPhotoW = 1200;
  const maxPhotoH = 1260;
  const photoY = 75;

  if (imgElement && imgElement.complete && imgElement.naturalWidth > 0) {
    // Contain scaling: preserve 100% of the image without any cropping
    const scale = Math.min(maxPhotoW / imgElement.naturalWidth, maxPhotoH / imgElement.naturalHeight);
    const drawW = Math.round(imgElement.naturalWidth * scale);
    const drawH = Math.round(imgElement.naturalHeight * scale);
    const drawX = Math.round((W - drawW) / 2);
    const drawY = Math.round(photoY + (maxPhotoH - drawH) / 2);

    // Photo shadow backing
    ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
    ctx.shadowBlur = 24;
    ctx.shadowOffsetY = 6;
    ctx.fillStyle = '#06080d';
    ctx.fillRect(drawX, drawY, drawW, drawH);
    ctx.shadowColor = 'transparent';

    // Draw the image completely uncropped
    ctx.drawImage(imgElement, 0, 0, imgElement.naturalWidth, imgElement.naturalHeight, drawX, drawY, drawW, drawH);

    // Gold inner rim and border directly around photograph
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.85)';
    ctx.lineWidth = 3.5;
    ctx.strokeRect(drawX, drawY, drawW, drawH);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(drawX + 6, drawY + 6, drawW - 12, drawH - 12);
  } else {
    const fallbackW = 1000;
    const fallbackH = 1200;
    const fallbackX = (W - fallbackW) / 2;
    const fallbackY = photoY + 30;
    ctx.fillStyle = '#181e28';
    ctx.fillRect(fallbackX, fallbackY, fallbackW, fallbackH);
    ctx.fillStyle = '#6b7280';
    ctx.font = 'italic 24px "Georgia", serif';
    ctx.textAlign = 'center';
    ctx.fillText('Archival Portrait Loading…', W / 2, fallbackY + fallbackH / 2);
  }

  // 4. SCIENTIST NAME IN LARGE AND BOLD LETTERS
  const nameY = photoY + maxPhotoH + 125;

  // Dynamic large & bold font scaling so any name fits perfectly across the plaque
  let fontSize = 74;
  ctx.font = `900 ${fontSize}px "Inter", "Segoe UI", "Arial Black", sans-serif`;
  while (ctx.measureText(scientist.name).width > W - 180 && fontSize > 48) {
    fontSize -= 2;
    ctx.font = `900 ${fontSize}px "Inter", "Segoe UI", "Arial Black", sans-serif`;
  }

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.letterSpacing = '4px';

  // Crisp drop shadow for maximum bold presence
  ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
  ctx.shadowBlur = 16;
  ctx.shadowOffsetY = 4;
  ctx.fillStyle = '#ffffff';
  ctx.fillText(scientist.name, W / 2, nameY);

  // Reset shadow
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;

  // 5. Elegant Gold Architectural Plaque Accent Bar Below Name
  const textWidth = ctx.measureText(scientist.name).width;
  const barWidth = Math.min(textWidth + 80, W - 280);
  const barY = nameY + 46;

  ctx.strokeStyle = 'rgba(212, 175, 55, 0.65)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(W / 2 - barWidth / 2, barY);
  ctx.lineTo(W / 2 + barWidth / 2, barY);
  ctx.stroke();

  // Central gold diamond pip
  ctx.fillStyle = '#d4af37';
  ctx.font = '16px "Inter", sans-serif';
  ctx.fillText('◆', W / 2, barY);

  return canvas;
}

/**
 * Creates the complete set of 12 museum exhibition plaques mounted inside
 * the black window-like structures on the atrium perimeter walls.
 * Each plaque features the authentic photographic portrait and large bold name of a scientist,
 * operable in an interactive carousel format upon clicking.
 * @param {THREE.Group} parentGroup
 * @param {Object} [scientistTelemetry]
 * @param {THREE.Camera} [camera]
 * @returns {{ exhibits: Array, selectScientist: Function }}
 */
export function buildWallExhibits(parentGroup, scientistTelemetry, camera) {
  const exhibitsGroup = new THREE.Group();
  exhibitsGroup.name = 'ScientistMuseumExhibits';
  parentGroup.add(exhibitsGroup);

  const panelCount = 24;
  const R = 18 - 0.05; // ATRIUM_RADIUS - 0.05
  const panelWidth = (2 * Math.PI * R) / panelCount - 0.26;
  // Natural 1400:1640 museum portrait aspect ratio matching the high-resolution canvas
  const frameHeight = 3.44;
  const frameWidth = frameHeight * (1400 / 1640); // 2.936m, perfectly proportioned

  const exhibits = [];
  const interactiveExhibits = [];

  // Brushed aluminum bezel frame material
  const frameBezelMat = new THREE.MeshPhysicalMaterial({
    color: 0xc8ccd4,
    metalness: 0.94,
    roughness: 0.24,
    clearcoat: 0.5,
  });

  // Dark beveled titanium casing
  const casingMat = new THREE.MeshStandardMaterial({
    color: 0x181c24,
    roughness: 0.85,
    metalness: 0.15,
  });

  // Preload all 12 scientist portrait images
  const imageCache = new Map();
  SCIENTISTS_DATA.forEach((s) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = s.image;
    imageCache.set(s.id, img);
  });

  let scientistIdx = 0;

  for (let i = 0; i < panelCount; i++) {
    // Only place inside the 12 alternating alcove window frames (i % 2 === 0)
    if (i % 2 !== 0) continue;

    let currentScientistIdx = scientistIdx % SCIENTISTS_DATA.length;
    let currentScientist = SCIENTISTS_DATA[currentScientistIdx];
    scientistIdx++;

    const angle = (i / panelCount) * Math.PI * 2;
    const nextAngle = ((i + 1) / panelCount) * Math.PI * 2;
    const midAngle = (angle + nextAngle) / 2;

    const exhibitAnchor = new THREE.Group();
    exhibitAnchor.position.set(
      Math.cos(midAngle) * (R - 0.06),
      3.4, // Atrium wall center height
      Math.sin(midAngle) * (R - 0.06)
    );
    // Face directly towards the atrium center (0, 3.4, 0)
    exhibitAnchor.lookAt(0, 3.4, 0);
    exhibitsGroup.add(exhibitAnchor);

    // 1. Structural Casing Backing Box (recessed into wall)
    const casingGeo = new THREE.BoxGeometry(frameWidth, frameHeight, 0.08);
    const casingMesh = new THREE.Mesh(casingGeo, casingMat);
    casingMesh.position.set(0, 0, -0.04);
    casingMesh.receiveShadow = true;
    exhibitAnchor.add(casingMesh);

    // 2. Beveled Metallic Outer Frame Bezel
    const bezelGeo = new THREE.BoxGeometry(frameWidth + 0.04, frameHeight + 0.04, 0.03);
    const bezelMesh = new THREE.Mesh(bezelGeo, frameBezelMat);
    bezelMesh.position.set(0, 0, -0.01);
    exhibitAnchor.add(bezelMesh);

    // 3. Museum Exhibit Plaque Plane (Where canvas texture is rendered facing into the atrium)
    const plaqueGeo = new THREE.PlaneGeometry(frameWidth * 0.94, frameHeight * 0.94);
    const img = imageCache.get(currentScientist.id);
    const canvas = renderExhibitCanvas(currentScientist, img);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.generateMipmaps = true;

    // 100% Realistic museum matte fine-art finish with subtle self-illumination for high legibility
    const plaqueMat = new THREE.MeshStandardMaterial({
      map: texture,
      emissive: 0xffffff,
      emissiveMap: texture,
      emissiveIntensity: 0.65, // Authentic gallery plaque illumination without glare
      roughness: 0.88,
      metalness: 0.0,
      side: THREE.DoubleSide,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
    });

    const plaqueMesh = new THREE.Mesh(plaqueGeo, plaqueMat);
    plaqueMesh.position.set(0, 0, 0.025);
    plaqueMesh.name = `ScientistPlaque_${currentScientist.id}`;
    plaqueMesh.userData = {
      isScientistPlaque: true,
      scientistId: currentScientist.id,
      exhibitAnchor,
    };
    exhibitAnchor.add(plaqueMesh);

    // Invisible larger hit mesh for clicking and touching on mobile/desktop
    const hitGeo = new THREE.BoxGeometry(frameWidth * 1.05, frameHeight * 1.05, 0.35);
    const hitMesh = new THREE.Mesh(hitGeo, new THREE.MeshBasicMaterial({ visible: false }));
    hitMesh.name = `HitMesh_${currentScientist.id}`;
    hitMesh.userData = {
      isScientistPlaque: true,
      scientistId: currentScientist.id,
      exhibitAnchor,
    };
    exhibitAnchor.add(hitMesh);
    interactiveExhibits.push(hitMesh, plaqueMesh);

    const redraw = (newIdx) => {
      currentScientistIdx = (newIdx + SCIENTISTS_DATA.length) % SCIENTISTS_DATA.length;
      currentScientist = SCIENTISTS_DATA[currentScientistIdx];
      const portraitImg = imageCache.get(currentScientist.id);
      const updatedCanvas = renderExhibitCanvas(currentScientist, portraitImg);
      texture.image = updatedCanvas;
      texture.needsUpdate = true;
    };

    if (img && !img.complete) {
      img.onload = () => redraw(currentScientistIdx);
    }

    exhibits.push({
      get scientist() {
        return currentScientist;
      },
      get currentScientistIdx() {
        return currentScientistIdx;
      },
      anchor: exhibitAnchor,
      mesh: plaqueMesh,
      texture,
      redraw,
    });
  }

  // ═════════════════════════════════════════════════════════
  // TOUCH & CLICK RAYCASTING HANDLER FOR SCIENTIST EXHIBITS
  // ═════════════════════════════════════════════════════════
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
    if (!camera || !scientistTelemetry) return;
    const upX = e.clientX ?? e.changedTouches?.[0]?.clientX ?? 0;
    const upY = e.clientY ?? e.changedTouches?.[0]?.clientY ?? 0;
    const dist = Math.hypot(upX - pointerDownPos.x, upY - pointerDownPos.y);
    const elapsed = performance.now() - pointerDownPos.time;

    // Filter out drags or long presses
    if (dist > 14 || elapsed > 650) return;

    // Ignore clicks inside HUD panels or UI buttons
    if (
      e.target &&
      (e.target.closest('#scientist-telemetry-hud') ||
        e.target.closest('#rocket-telemetry-hud') ||
        e.target.closest('#celestial-telemetry-hud') ||
        e.target.closest('#robot-telemetry-hud') ||
        e.target.closest('#hud-container') ||
        e.target.closest('.hud-panel') ||
        e.target.closest('button') ||
        e.target.closest('input'))
    ) {
      return;
    }

    pointerPos.x = (upX / window.innerWidth) * 2 - 1;
    pointerPos.y = -(upY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(pointerPos, camera);
    const hits = raycaster.intersectObjects(interactiveExhibits, true);

    if (hits.length > 0) {
      let hitId = null;
      let hitAnchor = null;
      for (const h of hits) {
        let obj = h.object;
        while (obj) {
          if (obj.userData?.isScientistPlaque) {
            hitId = obj.userData.scientistId;
            hitAnchor = obj.userData.exhibitAnchor;
            break;
          }
          obj = obj.parent;
        }
        if (hitId) break;
      }

      if (hitId && hitAnchor) {
        if (scientistTelemetry.getActiveScientist()?.id === hitId) {
          scientistTelemetry.deselect();
        } else {
          scientistTelemetry.selectScientist(hitAnchor, hitId);
        }
      }
    } else {
      if (scientistTelemetry.getActiveScientist()) {
        scientistTelemetry.deselect();
      }
    }
  };

  window.addEventListener('pointerdown', handlePointerDown, { passive: true });
  window.addEventListener('pointerup', handlePointerUp, { passive: true });

  return {
    exhibits,
    selectScientist: (id) => {
      const found = exhibits.find((e) => e.scientist.id === id);
      if (found && scientistTelemetry) {
        scientistTelemetry.selectScientist(found.anchor, id);
      }
    },
  };
}
