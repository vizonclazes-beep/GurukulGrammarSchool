// src/stations/planetTextures.js — High-fidelity procedural planetary textures for Kepler Orrery
import * as THREE from 'three';

/**
 * Creates a procedural canvas texture for Mercury (cratered basaltic regolith).
 */
export function createMercuryTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Base charcoal-gray basalt gradient
  const grad = ctx.createLinearGradient(0, 0, 0, 512);
  grad.addColorStop(0, '#52525b');
  grad.addColorStop(0.5, '#71717a');
  grad.addColorStop(1, '#3f3f46');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 512);

  // Micro-terrain noise / regolith granulation
  const imgData = ctx.getImageData(0, 0, 1024, 512);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 45;
    data[i] = Math.max(0, Math.min(255, data[i] + noise));
    data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise));
    data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise * 0.9));
  }
  ctx.putImageData(imgData, 0, 0);

  // Dark volcanic lowlands (Maria & inter-crater plains)
  ctx.fillStyle = 'rgba(39, 39, 42, 0.45)';
  for (let m = 0; m < 14; m++) {
    const mx = Math.random() * 1024;
    const my = 80 + Math.random() * 350;
    const mr = 40 + Math.random() * 80;
    ctx.beginPath();
    ctx.ellipse(mx, my, mr, mr * 0.7, Math.random() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }

  // Impact craters with rims and bright central peaks
  for (let c = 0; c < 120; c++) {
    const cx = Math.random() * 1024;
    const cy = 30 + Math.random() * 450;
    const cr = 4 + Math.random() * 26;

    // Dark floor
    ctx.beginPath();
    ctx.arc(cx, cy, cr, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(24, 24, 27, 0.7)';
    ctx.fill();

    // Bright illuminated rim
    ctx.beginPath();
    ctx.arc(cx, cy, cr, Math.PI * 0.75, Math.PI * 1.75);
    ctx.lineWidth = Math.max(1, cr * 0.2);
    ctx.strokeStyle = 'rgba(212, 212, 216, 0.85)';
    ctx.stroke();

    // Shadowed rim
    ctx.beginPath();
    ctx.arc(cx, cy, cr, -Math.PI * 0.25, Math.PI * 0.75);
    ctx.lineWidth = Math.max(1, cr * 0.2);
    ctx.strokeStyle = 'rgba(9, 9, 11, 0.9)';
    ctx.stroke();

    // Bright central peak for larger craters
    if (cr > 14) {
      ctx.beginPath();
      ctx.arc(cx, cy, cr * 0.2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(244, 244, 245, 0.8)';
      ctx.fill();
    }
  }

  // Caloris Basin & Rayed Crater Systems (bright radial streaks)
  const rayCraters = [
    { x: 340, y: 220, r: 24 },
    { x: 780, y: 310, r: 18 },
    { x: 160, y: 150, r: 15 },
  ];
  rayCraters.forEach(({ x, y, r }) => {
    ctx.strokeStyle = 'rgba(244, 244, 245, 0.35)';
    ctx.lineWidth = 1.2;
    for (let a = 0; a < 16; a++) {
      const ang = (a / 16) * Math.PI * 2 + (Math.random() - 0.5) * 0.2;
      const rayLen = r * 3 + Math.random() * r * 4;
      ctx.beginPath();
      ctx.moveTo(x + Math.cos(ang) * (r * 0.8), y + Math.sin(ang) * (r * 0.8));
      ctx.lineTo(x + Math.cos(ang) * rayLen, y + Math.sin(ang) * rayLen);
      ctx.stroke();
    }
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/**
 * Creates a procedural canvas texture for Venus (opaque creamy sulfuric acid cloud layers).
 */
export function createVenusTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Base creamy ochre/buff tone
  const grad = ctx.createLinearGradient(0, 0, 0, 512);
  grad.addColorStop(0, '#fef3c7');
  grad.addColorStop(0.2, '#fde68a');
  grad.addColorStop(0.5, '#f59e0b');
  grad.addColorStop(0.8, '#d97706');
  grad.addColorStop(1, '#fef3c7');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 512);

  // Atmospheric Chevron Waves (Pioneer Venus UV chevron patterns)
  for (let layer = 0; layer < 16; layer++) {
    const yBase = (layer / 16) * 512;
    ctx.beginPath();
    ctx.moveTo(0, yBase);
    for (let x = 0; x <= 1024; x += 16) {
      // Chevron V-shape meeting at equator
      const latFactor = (yBase - 256) / 256; // -1 to +1
      const chevron = Math.abs(Math.sin((x / 1024) * Math.PI * 4)) * 30 * Math.sign(latFactor);
      const wave = Math.sin((x / 80) + layer) * 12 + Math.cos((x / 140) * 2) * 8;
      ctx.lineTo(x, yBase + chevron + wave);
    }
    ctx.lineWidth = 16 + Math.random() * 22;
    ctx.strokeStyle = layer % 2 === 0 ? 'rgba(254, 240, 138, 0.45)' : 'rgba(180, 83, 9, 0.28)';
    ctx.stroke();
  }

  // Diffuse atmospheric cloud swirls
  for (let s = 0; s < 25; s++) {
    const sx = Math.random() * 1024;
    const sy = 100 + Math.random() * 312;
    const sr = 60 + Math.random() * 120;
    const swirlGrad = ctx.createRadialGradient(sx, sy, 0, sx, sy, sr);
    swirlGrad.addColorStop(0, 'rgba(255, 251, 235, 0.4)');
    swirlGrad.addColorStop(0.5, 'rgba(251, 191, 36, 0.2)');
    swirlGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = swirlGrad;
    ctx.fillRect(sx - sr, sy - sr, sr * 2, sr * 2);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/**
 * Creates procedural canvas textures for Earth:
 * 1. Surface texture: continents, oceans, desert belts, polar ice sheets, turquoise shelves.
 * 2. Swirling cloud texture: cyclone spirals, weather fronts, equatorial ITCZ bands.
 */
export function createEarthSurfaceTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Deep ocean gradient
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, 512);
  oceanGrad.addColorStop(0, '#0c2340');
  oceanGrad.addColorStop(0.3, '#103768');
  oceanGrad.addColorStop(0.5, '#1e4b8a');
  oceanGrad.addColorStop(0.7, '#103768');
  oceanGrad.addColorStop(1, '#0c2340');
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, 1024, 512);

  // Continental Shelf Shallow Waters (Turquoise fringes)
  ctx.fillStyle = 'rgba(6, 182, 212, 0.4)';

  function drawLandmass(pts, landColor, desertColor, shelf = true) {
    if (shelf) {
      ctx.beginPath();
      pts.forEach((p, i) => {
        const x = p[0] * 1024;
        const y = p[1] * 512;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.lineWidth = 14;
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.35)';
      ctx.stroke();
    }

    // Main Landmass
    ctx.beginPath();
    pts.forEach((p, i) => {
      const x = p[0] * 1024;
      const y = p[1] * 512;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fillStyle = landColor;
    ctx.fill();

    // Desert / arid interior
    if (desertColor) {
      ctx.beginPath();
      pts.forEach((p, i) => {
        const cx = 0.5; // pull slightly inward
        const cy = 0.5;
        const x = (p[0] * 0.75 + 0.12) * 1024;
        const y = (p[1] * 0.75 + 0.12) * 512;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.fillStyle = desertColor;
      ctx.fill();
    }
  }

  // 1. Eurasia & Africa
  drawLandmass([
    [0.46, 0.18], [0.55, 0.15], [0.68, 0.16], [0.82, 0.19], [0.88, 0.32],
    [0.78, 0.42], [0.72, 0.46], [0.68, 0.40], [0.60, 0.48], [0.52, 0.42],
    [0.48, 0.34], [0.44, 0.26]
  ], '#15803d', '#ca8a04');

  // Africa continent
  drawLandmass([
    [0.46, 0.36], [0.56, 0.38], [0.62, 0.48], [0.56, 0.68], [0.52, 0.74],
    [0.48, 0.65], [0.44, 0.48]
  ], '#166534', '#d97706');

  // 2. North America
  drawLandmass([
    [0.12, 0.16], [0.26, 0.14], [0.32, 0.22], [0.28, 0.36], [0.22, 0.42],
    [0.16, 0.38], [0.10, 0.28]
  ], '#15803d', '#ca8a04');

  // 3. South America
  drawLandmass([
    [0.24, 0.44], [0.34, 0.48], [0.36, 0.58], [0.30, 0.72], [0.26, 0.80],
    [0.22, 0.65], [0.20, 0.52]
  ], '#166534', null);

  // 4. Australia & Oceania
  drawLandmass([
    [0.78, 0.58], [0.88, 0.56], [0.92, 0.66], [0.86, 0.74], [0.76, 0.70]
  ], '#15803d', '#ea580c');

  // 5. India subcontinent & Himalayas
  drawLandmass([
    [0.66, 0.38], [0.73, 0.40], [0.70, 0.54], [0.65, 0.46]
  ], '#15803d', '#ca8a04');

  // 6. Polar Ice Caps (Arctic and Antarctica)
  // North Pole
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.ellipse(512, 18, 480, 26, 0, 0, Math.PI * 2);
  ctx.fill();

  // South Pole (Antarctica)
  ctx.beginPath();
  ctx.ellipse(512, 498, 512, 38, 0, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/**
 * Creates Earth's procedural swirling cloud texture (with alpha transparency).
 */
export function createEarthCloudTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, 1024, 512);

  // Equatorial Intertropical Convergence Zone (ITCZ) cloud bands
  ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
  for (let i = 0; i < 6; i++) {
    const y = 230 + Math.sin(i) * 35;
    ctx.beginPath();
    ctx.moveTo(0, y);
    for (let x = 0; x <= 1024; x += 32) {
      const cy = y + Math.sin((x / 60) + i) * 16 + Math.cos((x / 120)) * 12;
      ctx.lineTo(x, cy);
    }
    ctx.lineWidth = 16 + Math.random() * 20;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.stroke();
  }

  // Mid-latitude swirling cyclones & storm fronts
  const cycloneCenters = [
    { x: 220, y: 150, r: 80 },
    { x: 680, y: 140, r: 90 },
    { x: 380, y: 360, r: 75 },
    { x: 820, y: 370, r: 85 },
  ];
  cycloneCenters.forEach(({ x, y, r }) => {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
    for (let spiral = 0; spiral < 5; spiral++) {
      ctx.beginPath();
      const startAng = spiral * 1.2;
      for (let step = 0; step < 40; step++) {
        const theta = startAng + (step / 40) * Math.PI * 2.5;
        const rad = (step / 40) * r;
        const px = x + Math.cos(theta) * rad;
        const py = y + Math.sin(theta) * rad * 0.7;
        if (step === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.lineWidth = 4 + Math.random() * 6;
      ctx.stroke();
    }
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/**
 * Creates a procedural canvas texture for Mars (iron-oxide regolith, volcanic shields & polar caps).
 */
export function createMarsTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Rich rusty red-orange regolith gradient
  const grad = ctx.createLinearGradient(0, 0, 0, 512);
  grad.addColorStop(0, '#7c2d12');
  grad.addColorStop(0.2, '#c2410c');
  grad.addColorStop(0.5, '#ea580c');
  grad.addColorStop(0.8, '#9a3412');
  grad.addColorStop(1, '#7c2d12');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 512);

  // Micro-granulation noise
  const imgData = ctx.getImageData(0, 0, 1024, 512);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 35;
    data[i] = Math.max(0, Math.min(255, data[i] + noise));
    data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise * 0.7));
    data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise * 0.5));
  }
  ctx.putImageData(imgData, 0, 0);

  // Dark volcanic basalt albedo features (Syrtis Major, Acidalia Planitia, Sinus Sabaeus)
  ctx.fillStyle = 'rgba(67, 20, 7, 0.65)';
  const darkFeatures = [
    { x: 550, y: 240, rx: 90, ry: 60, rot: -0.3 }, // Syrtis Major
    { x: 320, y: 160, rx: 110, ry: 70, rot: 0.2 }, // Acidalia
    { x: 420, y: 310, rx: 130, ry: 45, rot: 0.1 }, // Sinus Sabaeus
    { x: 780, y: 290, rx: 100, ry: 50, rot: -0.2 }, // Mare Tyrrhenum
  ];
  darkFeatures.forEach(({ x, y, rx, ry, rot }) => {
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, rot, 0, Math.PI * 2);
    ctx.fill();
  });

  // Valles Marineris Grand Canyon rift (long dark jagged gash across equatorial Mars)
  ctx.beginPath();
  ctx.moveTo(180, 270);
  ctx.quadraticCurveTo(280, 285, 380, 275);
  ctx.lineWidth = 10;
  ctx.strokeStyle = 'rgba(40, 10, 4, 0.85)';
  ctx.stroke();

  // Olympus Mons Volcano Caldera & Ring
  ctx.beginPath();
  ctx.arc(140, 220, 32, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(234, 88, 12, 0.8)';
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = 'rgba(67, 20, 7, 0.7)';
  ctx.stroke();
  // Caldera crater center
  ctx.beginPath();
  ctx.arc(140, 220, 8, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(40, 10, 4, 0.9)';
  ctx.fill();

  // Brilliant White Polar Ice Caps (Water ice & Frozen CO2 Dry Ice)
  // North Pole: Planum Boreum
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.ellipse(512, 22, 240, 24, 0, 0, Math.PI * 2);
  ctx.fill();
  // South Pole: Planum Australe
  ctx.beginPath();
  ctx.ellipse(512, 492, 180, 22, 0, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/**
 * Creates a procedural canvas texture for Jupiter (dynamic alternating Jovian belts, zones, eddies & Great Red Spot).
 */
export function createJupiterTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Alternating Jovian atmospheric belts (dark brown/orange) and zones (pale cream/white)
  const bands = [
    { y: 0,   h: 45,  col: '#78350f' }, // North Polar Region
    { y: 45,  h: 35,  col: '#fef3c7' }, // North North Temperate Zone
    { y: 80,  h: 40,  col: '#9a3412' }, // North North Temperate Belt
    { y: 120, h: 45,  col: '#fed7aa' }, // North Temperate Zone
    { y: 165, h: 50,  col: '#7c2d12' }, // North Equatorial Belt (NEB - prominent dark)
    { y: 215, h: 55,  col: '#fffbeb' }, // Equatorial Zone (EZ - bright white)
    { y: 270, h: 55,  col: '#9a3412' }, // South Equatorial Belt (SEB - hosts Great Red Spot)
    { y: 325, h: 45,  col: '#ffedd5' }, // South Temperate Zone
    { y: 370, h: 45,  col: '#78350f' }, // South Temperate Belt
    { y: 415, h: 40,  col: '#fed7aa' }, // South South Temperate Zone
    { y: 455, h: 57,  col: '#451a03' }, // South Polar Region
  ];

  bands.forEach(({ y, h, col }) => {
    ctx.fillStyle = col;
    ctx.fillRect(0, y, 1024, h);
  });

  // Turbulent wave boundaries and micro-eddies between belts
  bands.forEach(({ y }) => {
    if (y === 0) return;
    ctx.beginPath();
    ctx.moveTo(0, y);
    for (let x = 0; x <= 1024; x += 16) {
      const dy = Math.sin(x / 24) * 5 + Math.cos(x / 48) * 4;
      ctx.lineTo(x, y + dy);
    }
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'rgba(69, 26, 3, 0.4)';
    ctx.stroke();
  });

  // White oval storms (pearls) in southern temperate belt
  for (let o = 0; o < 8; o++) {
    const ox = (o / 8) * 1024 + 40;
    const oy = 345 + (Math.random() - 0.5) * 10;
    ctx.beginPath();
    ctx.ellipse(ox, oy, 14, 7, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(120, 53, 15, 0.4)';
    ctx.stroke();
  }

  // ═════════════════════════════════════════════════════════
  // THE ICONIC GREAT RED SPOT (GRS) IN SOUTHERN EQUATORIAL BELT
  // ═════════════════════════════════════════════════════════
  const grsX = 620;
  const grsY = 295;
  const grsRadiusX = 54;
  const grsRadiusY = 32;

  // Outer dark rim / halo
  ctx.beginPath();
  ctx.ellipse(grsX, grsY, grsRadiusX + 6, grsRadiusY + 4, -0.05, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(69, 26, 3, 0.5)';
  ctx.fill();

  // Core brick-red anticyclonic storm oval
  const grsGrad = ctx.createRadialGradient(grsX, grsY, 4, grsX, grsY, grsRadiusX);
  grsGrad.addColorStop(0, '#ef4444');
  grsGrad.addColorStop(0.4, '#b91c1c');
  grsGrad.addColorStop(0.85, '#7f1d1d');
  grsGrad.addColorStop(1, '#991b1b');
  ctx.beginPath();
  ctx.ellipse(grsX, grsY, grsRadiusX, grsRadiusY, -0.05, 0, Math.PI * 2);
  ctx.fillStyle = grsGrad;
  ctx.fill();

  // Inner spiral eddies of the Red Spot
  ctx.strokeStyle = 'rgba(254, 202, 202, 0.65)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.ellipse(grsX, grsY, grsRadiusX * 0.55, grsRadiusY * 0.5, -0.05, 0, Math.PI * 1.8);
  ctx.stroke();

  // GRS Turbulent wake stream flowing eastward
  ctx.beginPath();
  ctx.moveTo(grsX - grsRadiusX, grsY);
  ctx.quadraticCurveTo(grsX - grsRadiusX - 40, grsY - 14, grsX - grsRadiusX - 110, grsY - 4);
  ctx.lineWidth = 10;
  ctx.strokeStyle = 'rgba(254, 243, 199, 0.6)';
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/**
 * Creates procedural canvas textures for Saturn (creamy butterscotch banded atmosphere).
 */
export function createSaturnTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Subtle golden-butterscotch pastel atmosphere
  const grad = ctx.createLinearGradient(0, 0, 0, 512);
  grad.addColorStop(0, '#78552b'); // North polar hexagon zone
  grad.addColorStop(0.15, '#eab308');
  grad.addColorStop(0.35, '#fde047');
  grad.addColorStop(0.5, '#fef08a'); // Warm golden equator
  grad.addColorStop(0.65, '#fde047');
  grad.addColorStop(0.85, '#ca8a04');
  grad.addColorStop(1, '#654321');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 512);

  // Fine atmospheric latitude striations
  for (let l = 0; l < 40; l++) {
    const y = (l / 40) * 512;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(1024, y);
    ctx.lineWidth = 3 + Math.random() * 4;
    ctx.strokeStyle = l % 2 === 0 ? 'rgba(254, 240, 138, 0.25)' : 'rgba(161, 98, 7, 0.18)';
    ctx.stroke();
  }

  // North polar hexagonal shading
  ctx.fillStyle = 'rgba(66, 75, 54, 0.45)';
  ctx.beginPath();
  ctx.ellipse(512, 28, 160, 24, 0, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/**
 * Creates high-fidelity Saturn rings procedural texture:
 * Includes C-ring (crepe ring), bright dense B-ring, dark Cassini Division gap, and A-ring with Encke gap!
 */
export function createSaturnRingTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, 1024, 64);

  // Ring zones mapped across x (0 = inner radius, 1024 = outer radius):
  // 0 – 160: Empty inner gap
  // 160 – 340: C Ring (semi-transparent crepe ring)
  // 340 – 680: B Ring (bright, dense, fine ice rippling)
  // 680 – 740: Cassini Division (dark black void gap!)
  // 740 – 970: A Ring (with faint Encke gap at ~890)
  // 970 – 1024: F Ring thread & outer taper

  for (let x = 0; x < 1024; x++) {
    let alpha = 0.0;
    let r = 240, g = 220, b = 180;

    if (x >= 140 && x < 330) {
      // C Ring
      const norm = (x - 140) / (330 - 140);
      alpha = 0.25 + Math.sin(norm * 25) * 0.08;
      r = 180; g = 165; b = 140;
    } else if (x >= 330 && x < 680) {
      // B Ring (Main, bright and opaque)
      const norm = (x - 330) / (680 - 330);
      alpha = 0.88 + Math.sin(norm * 45) * 0.08;
      r = 248; g = 236; b = 205;
    } else if (x >= 680 && x < 735) {
      // Cassini Division (4,800 km wide dark gap!)
      alpha = 0.02; // Near zero / translucent gap
      r = 40; g = 35; b = 25;
    } else if (x >= 735 && x < 965) {
      // A Ring
      if (x >= 885 && x <= 895) {
        // Encke Division
        alpha = 0.08;
      } else {
        const norm = (x - 735) / (965 - 735);
        alpha = 0.68 + Math.sin(norm * 30) * 0.06;
        r = 235; g = 220; b = 190;
      }
    } else if (x >= 980 && x < 1005) {
      // F Ring
      alpha = 0.35;
      r = 245; g = 235; b = 210;
    }

    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
    ctx.fillRect(x, 0, 1, 64);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/**
 * Creates a procedural canvas texture for Uranus (cyan-aquamarine methane atmosphere with soft haze).
 */
export function createUranusTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Aquamarine/cyan methane absorption gradient
  const grad = ctx.createLinearGradient(0, 0, 0, 512);
  grad.addColorStop(0, '#0284c7');
  grad.addColorStop(0.2, '#38bdf8');
  grad.addColorStop(0.5, '#7dd3fc');
  grad.addColorStop(0.8, '#38bdf8');
  grad.addColorStop(1, '#0369a1');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 512);

  // Soft high-latitude methane haze bands
  for (let b = 0; b < 18; b++) {
    const y = (b / 18) * 512;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(1024, y);
    ctx.lineWidth = 12;
    ctx.strokeStyle = b % 2 === 0 ? 'rgba(186, 230, 253, 0.28)' : 'rgba(2, 132, 199, 0.18)';
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/**
 * Creates a procedural canvas texture for Neptune (deep azure blue with Great Dark Spot & white cirrus clouds).
 */
export function createNeptuneTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Deep supersonic azure blue gradient
  const grad = ctx.createLinearGradient(0, 0, 0, 512);
  grad.addColorStop(0, '#172554');
  grad.addColorStop(0.3, '#1e40af');
  grad.addColorStop(0.5, '#2563eb');
  grad.addColorStop(0.7, '#1d4ed8');
  grad.addColorStop(1, '#172554');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 512);

  // High-velocity wind shear bands
  for (let b = 0; b < 22; b++) {
    const y = (b / 22) * 512;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(1024, y);
    ctx.lineWidth = 14;
    ctx.strokeStyle = b % 2 === 0 ? 'rgba(59, 130, 246, 0.3)' : 'rgba(30, 58, 138, 0.35)';
    ctx.stroke();
  }

  // The Great Dark Spot (southern hemisphere dark vortex)
  const gdsX = 580;
  const gdsY = 320;
  ctx.beginPath();
  ctx.ellipse(gdsX, gdsY, 48, 26, -0.15, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(15, 23, 42, 0.65)';
  ctx.fill();

  // High-altitude bright white methane-ice cirrus clouds ("Scooter")
  const cirrusStreaks = [
    { x: 540, y: 300, w: 90, h: 6 },
    { x: 320, y: 220, w: 120, h: 8 },
    { x: 740, y: 190, w: 100, h: 7 },
    { x: 620, y: 350, w: 80, h: 5 },
  ];
  cirrusStreaks.forEach(({ x, y, w, h }) => {
    ctx.beginPath();
    ctx.ellipse(x, y, w * 0.5, h * 0.5, -0.05, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.fill();
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}
