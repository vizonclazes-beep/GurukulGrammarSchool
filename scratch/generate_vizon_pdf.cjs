// scratch/generate_vizon_pdf.cjs
const fs = require('fs');
const path = require('path');
const puppeteer = require('g:/Vizon Website/Sim/node_modules/puppeteer-core');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\sanja\\.gemini\\antigravity\\brain\\483a2afc-6d65-4154-a660-fc66c69d9e36';
const outputWorkspacePdf = 'g:\\Vizon Website\\Sim\\VIZON_Science_Pods_Curriculum_and_Architecture_Guide.pdf';
const outputArtifactPdf = path.join(artifactDir, 'VIZON_Science_Pods_Curriculum_and_Architecture_Guide.pdf');

function getBase64Image(filename) {
  const fullPath = path.join(artifactDir, filename);
  if (!fs.existsSync(fullPath)) {
    console.warn('Image not found:', fullPath);
    return '';
  }
  const ext = path.extname(filename).replace('.', '');
  const mime = ext === 'png' ? 'image/png' : 'image/jpeg';
  const base64 = fs.readFileSync(fullPath).toString('base64');
  return `data:${mime};base64,${base64}`;
}

console.log('Loading key screenshot assets from artifact directory...');
const imgSpawn = getBase64Image('audit_spawn_view.png');
const imgPhysics = getBase64Image('audit_physics_station.png');
const imgChem = getBase64Image('chem_salt_copper.png');
const imgBio = getBase64Image('audit_biology_cell_interior_cutaway.png');
const imgMath = getBase64Image('audit_math_station.png');
const imgAstro = getBase64Image('verify_realistic_planets_orrery.png');
const imgComet = getBase64Image('verify_comet_telemetry_and_tail.png');
const imgRockets = getBase64Image('audit_rocket_bay_lvm3.png');
const imgR2 = getBase64Image('verify_r2d2_camera_follow.png');
const imgPragyan = getBase64Image('verify_pragyan_camera_follow.png');
const imgKalam = getBase64Image('verify_scientist_kalam_desktop.png');
const imgNewton = getBase64Image('verify_scientist_newton_desktop.png');

console.log('All image assets converted to base64 data URLs.');

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>VIZON Science Simulation Platform — Curriculum & Architecture Guide</title>
<style>
  @page {
    size: A4;
    margin: 18mm 16mm 18mm 16mm;
    @bottom-center {
      content: "VIZON Science Simulation Platform • High School Educational Guide";
      font-size: 8pt;
      color: #64748b;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    @bottom-right {
      content: "Page " counter(page);
      font-size: 8pt;
      font-weight: 600;
      color: #0284c7;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
  }

  * {
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    color: #1e293b;
    background: #ffffff;
    line-height: 1.58;
    font-size: 9.8pt;
    margin: 0;
    padding: 0;
  }

  h1, h2, h3, h4 {
    color: #0f172a;
    font-weight: 700;
    margin-top: 1.3em;
    margin-bottom: 0.5em;
    page-break-after: avoid;
  }

  h1 {
    font-size: 19pt;
    border-bottom: 2.5px solid #0284c7;
    padding-bottom: 6px;
    margin-top: 0;
    letter-spacing: -0.3px;
  }

  h2 {
    font-size: 13.5pt;
    border-bottom: 1px solid #cbd5e1;
    padding-bottom: 4px;
    color: #0369a1;
    margin-top: 1.4em;
  }

  h3 {
    font-size: 11pt;
    color: #0f172a;
    margin-top: 1em;
  }

  h4 {
    font-size: 10pt;
    color: #334155;
  }

  p {
    margin-top: 0.4em;
    margin-bottom: 0.75em;
    text-align: justify;
  }

  ul, ol {
    margin-top: 0.3em;
    margin-bottom: 0.8em;
    padding-left: 20px;
  }

  li {
    margin-bottom: 0.35em;
  }

  .page-break {
    page-break-before: always;
  }

  .avoid-break {
    page-break-inside: avoid;
  }

  /* Cover Page Styling */
  .cover-container {
    height: 98vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 24px 10px;
    page-break-after: always;
  }

  .cover-header {
    border-left: 6px solid #0284c7;
    padding-left: 20px;
  }

  .cover-badge {
    display: inline-block;
    background: #0284c7;
    color: #ffffff;
    font-size: 8.5pt;
    font-weight: 800;
    letter-spacing: 1.5px;
    padding: 4px 12px;
    border-radius: 4px;
    text-transform: uppercase;
    margin-bottom: 12px;
  }

  .cover-title {
    font-size: 28pt;
    font-weight: 900;
    line-height: 1.15;
    color: #0f172a;
    margin: 0 0 10px 0;
    letter-spacing: -0.5px;
  }

  .cover-subtitle {
    font-size: 13pt;
    color: #475569;
    font-weight: 500;
    line-height: 1.45;
    margin: 0;
  }

  .cover-image-box {
    margin: 20px 0;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 10px 25px rgba(0,0,0,0.15);
    border: 1px solid #cbd5e1;
    max-height: 380px;
  }

  .cover-image-box img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .cover-footer {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
    border-top: 1px solid #cbd5e1;
    padding-top: 15px;
    font-size: 8.8pt;
  }

  .cover-meta-item strong {
    display: block;
    color: #0369a1;
    text-transform: uppercase;
    font-size: 7.8pt;
    letter-spacing: 0.8px;
    margin-bottom: 2px;
  }

  /* Table of Contents */
  .toc-box {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 16px 20px;
    margin-bottom: 20px;
  }

  .toc-title {
    font-size: 12.5pt;
    font-weight: 800;
    color: #0f172a;
    margin-top: 0;
    margin-bottom: 10px;
    border-bottom: 2px solid #0284c7;
    padding-bottom: 4px;
  }

  .toc-list {
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: 9.3pt;
  }

  .toc-item {
    display: flex;
    justify-content: space-between;
    padding: 4px 0;
    border-bottom: 1px dashed #e2e8f0;
  }

  .toc-item span:first-child {
    font-weight: 600;
    color: #1e293b;
  }

  .toc-item span:last-child {
    font-weight: 700;
    color: #0284c7;
  }

  /* Callouts & Formula Boxes */
  .callout {
    padding: 10px 14px;
    border-radius: 6px;
    margin: 10px 0 12px 0;
    font-size: 9.2pt;
    page-break-inside: avoid;
  }

  .callout-concept {
    background: #f0f9ff;
    border-left: 4px solid #0284c7;
    color: #0369a1;
  }

  .callout-experiment {
    background: #f0fdf4;
    border-left: 4px solid #16a34a;
    color: #15803d;
  }

  .callout-tech {
    background: #faf5ff;
    border-left: 4px solid #9333ea;
    color: #7e22ce;
  }

  .callout-title {
    font-weight: 800;
    text-transform: uppercase;
    font-size: 8.2pt;
    letter-spacing: 0.8px;
    margin-bottom: 3px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .formula-box {
    background: #0f172a;
    color: #f8fafc;
    border-radius: 6px;
    padding: 10px 16px;
    margin: 10px 0 12px 0;
    font-family: "JetBrains Mono", Consolas, monospace;
    font-size: 9.5pt;
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.3);
    page-break-inside: avoid;
  }

  .formula-title {
    color: #38bdf8;
    font-size: 8pt;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 700;
    margin-bottom: 4px;
  }

  .math-display {
    text-align: center;
    font-weight: 600;
    letter-spacing: 0.5px;
    color: #e2e8f0;
    margin: 4px 0;
  }

  .math-inline {
    font-family: "JetBrains Mono", Consolas, monospace;
    font-weight: 600;
    color: #0369a1;
    background: #f1f5f9;
    padding: 1px 4px;
    border-radius: 3px;
    font-size: 9pt;
  }

  /* Figures & Screenshots */
  .figure-card {
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    overflow: hidden;
    margin: 12px 0 14px 0;
    background: #ffffff;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
    page-break-inside: avoid;
  }

  .figure-card img {
    width: 100%;
    max-height: 240px;
    object-fit: cover;
    display: block;
    background: #0a0e1c;
  }

  .figure-caption {
    padding: 7px 12px;
    font-size: 8.3pt;
    color: #475569;
    background: #f8fafc;
    border-top: 1px solid #e2e8f0;
    line-height: 1.4;
  }

  .figure-caption strong {
    color: #0f172a;
  }

  /* Tables */
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 10px 0 14px 0;
    font-size: 8.6pt;
    page-break-inside: avoid;
  }

  th, td {
    padding: 6px 9px;
    text-align: left;
    border-bottom: 1px solid #e2e8f0;
    vertical-align: top;
  }

  th {
    background: #f1f5f9;
    color: #0f172a;
    font-weight: 700;
    border-top: 1px solid #cbd5e1;
    border-bottom: 2px solid #cbd5e1;
    font-size: 8.2pt;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  tr:nth-child(even) td {
    background: #f8fafc;
  }

  /* Code block */
  pre {
    background: #0f172a;
    color: #e2e8f0;
    padding: 9px 12px;
    border-radius: 6px;
    font-family: "JetBrains Mono", Consolas, monospace;
    font-size: 8.1pt;
    line-height: 1.4;
    overflow-x: hidden;
    margin: 8px 0 12px 0;
    page-break-inside: avoid;
  }

  code {
    font-family: "JetBrains Mono", Consolas, monospace;
    color: #0369a1;
    background: #f1f5f9;
    padding: 1px 4px;
    border-radius: 3px;
    font-size: 8.6pt;
  }

  /* Two column grid */
  .grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    page-break-inside: avoid;
  }
</style>
</head>
<body>

<!-- ═══════════════════════════════════════════════════════
     COVER PAGE
═══════════════════════════════════════════════════════ -->
<div class="cover-container">
  <div class="cover-header">
    <div class="cover-badge">STEM Curriculum & Architecture Compendium</div>
    <div class="cover-title">VIZON SCIENCE SIMULATION PLATFORM</div>
    <div class="cover-subtitle">
      Interactive 3D Virtual Science Pavilion: Scientific Pods, High School Experiments, Aerospace Fleet, Autonomous Robotics, Pioneer Biographies & WebGL Software Architecture
    </div>
  </div>

  <div class="cover-image-box">
    <img src="${imgSpawn}" alt="Vizon Science Simulation Central Atrium">
  </div>

  <div class="cover-footer">
    <div class="cover-meta-item">
      <strong>Target Level</strong>
      High School (Grades 9–12)<br>AP / IB / CBSE / ICSE STEM
    </div>
    <div class="cover-meta-item">
      <strong>Engine & Platform</strong>
      Three.js • WebGL 2.0 • GLSL<br>WebXR • Web Audio • Gyroscope
    </div>
    <div class="cover-meta-item">
      <strong>Publication Date</strong>
      Academic Year 2026–2027<br>Interactive Simulation Ver. 2.4
    </div>
  </div>
</div>

<!-- ═══════════════════════════════════════════════════════
     TABLE OF CONTENTS & EXECUTIVE SUMMARY
═══════════════════════════════════════════════════════ -->
<div class="page-break"></div>

<h1>Table of Contents</h1>

<div class="toc-box">
  <div class="toc-title">Document Structure</div>
  <ul class="toc-list">
    <li class="toc-item"><span>1. The Vizon 3D Virtual Environment & Multi-Platform Architecture</span> <span>Section 1</span></li>
    <li class="toc-item"><span>2. The Five Science Pods: Laboratory Experiments & Core Concepts</span> <span>Section 2</span></li>
    <li class="toc-item"><span>&nbsp;&nbsp;&nbsp;&nbsp;2.1 Physics Pod: High-Voltage Electromagnetism & Plasma Dynamics</span> <span>Section 2.1</span></li>
    <li class="toc-item"><span>&nbsp;&nbsp;&nbsp;&nbsp;2.2 Chemistry Pod: Atomic Flame Tests & Quantum Spectroscopy</span> <span>Section 2.2</span></li>
    <li class="toc-item"><span>&nbsp;&nbsp;&nbsp;&nbsp;2.3 Biology Pod: Eukaryotic Cell Ultrastructure & SGU Atlas</span> <span>Section 2.3</span></li>
    <li class="toc-item"><span>&nbsp;&nbsp;&nbsp;&nbsp;2.4 Mathematics Pod: 4D Hypercube, Harmonics & Vector Fields</span> <span>Section 2.4</span></li>
    <li class="toc-item"><span>&nbsp;&nbsp;&nbsp;&nbsp;2.5 Astronomy & Robotics Hub: Solar System Orrery & Halley's Comet</span> <span>Section 2.5</span></li>
    <li class="toc-item"><span>3. The Rocket Fleet: Aerospace Engineering & Launch Telemetry</span> <span>Section 3</span></li>
    <li class="toc-item"><span>4. Autonomous Mobile Robots: Kinematics & Dynamic Tracking</span> <span>Section 4</span></li>
    <li class="toc-item"><span>5. The Great Scientists Hall of Fame: Biographical Profiles</span> <span>Section 5</span></li>
    <li class="toc-item"><span>6. Software Architecture, Programming Languages & WebGL Logic</span> <span>Section 6</span></li>
    <li class="toc-item"><span>7. High School Inquiry Lab Activities & Guided Assignments</span> <span>Section 7</span></li>
  </ul>
</div>

<h2>Executive Summary</h2>
<p>
The <strong>Vizon Science Simulation Platform</strong> is an advanced, browser-accessible, interactive 3D virtual laboratory and science pavilion designed to transform high school STEM pedagogy. Traditional science curricula often struggle to make invisible, microscopic, extreme, or deep-space phenomena tangible: atomic quantum transitions occur on picosecond timescales, eukaryotic organelles measure only a few micrometers, plasma ionization requires lethal kilovolts, and celestial orbital mechanics span billions of kilometers.
</p>
<p>
Vizon resolves this educational challenge by placing students at the center of a photorealistic, physically simulated 3D science pavilion. Through real-time parameter tuning, tactile touch interaction, holographic telemetry feeds, and dynamic camera navigation, students bridge the gap between abstract mathematical formulas and vivid physical reality. This manual documents the scientific principles, laboratory procedures, historical context, and software engineering architecture that power the platform.
</p>

<!-- ═══════════════════════════════════════════════════════
     CHAPTER 1: THE 3D WEB ENVIRONMENT
═══════════════════════════════════════════════════════ -->
<div class="page-break"></div>

<h1>1. The Vizon 3D Virtual Environment</h1>

<div class="figure-card">
  <img src="${imgSpawn}" alt="Vizon Atrium Rotunda Overview">
  <div class="figure-caption">
    <strong>Figure 1.1:</strong> The central rotunda of the Vizon Science Pavilion, showing the radial pod layout, atmospheric light beams, domed glass ceiling, and real-time floor telemetry.
  </div>
</div>

<h2>1.1 Spatial Architecture & Central Rotunda</h2>
<p>
The simulation is staged inside an expansive circular architectural rotunda measuring 36 meters in diameter (<span class="math-inline">R = 18 m</span>) and 12 meters in height. The five core science pods are distributed symmetrically along a radial perimeter at radius <span class="math-inline">R = 12.0 m</span> at 72-degree angular intervals (<span class="math-inline">Δθ = 2π/5</span>). This arrangement allows unobstructed 360-degree line-of-sight across the floor while maintaining dedicated acoustic and visual focus when the user transitions to any specific pod.
</p>
<ul>
  <li><strong>Domed Glass Skylight:</strong> A structural geodetic dome capped with a cosmic deep-space nebula skybox, providing realistic directional celestial lighting and soft ambient occlusion.</li>
  <li><strong>Satin White Exhibition Plinths:</strong> Each station rests upon a custom two-tiered plinth with recessed LED perimeter rings that pulse with station-specific spectral signatures (cyan for physics, cobalt for chemistry, emerald for biology, violet for math, and gold for astronomy).</li>
  <li><strong>Boundary Protection:</strong> Physical room boundaries (<span class="math-inline">r ≤ 16.2 m</span>, <span class="math-inline">0.6 m ≤ y ≤ 11.2 m</span>) are continuously enforced by a hardware-accelerated bounding clamp, ensuring users never clip outside the structural walls or floor.</li>
</ul>

<h2>1.2 Multi-Platform Navigation & Universal Device Adaptation</h2>
<p>
Vizon is engineered to provide a seamless, high-performance experience across all device form factors:
</p>

<div class="grid-2">
  <div class="callout callout-concept">
    <div class="callout-title">🖥️ Desktop & Laptop Experience</div>
    <p>
      Utilizes smooth <strong>OrbitControls</strong> with inertial damping (factor 0.08). Left-click drags orbit the camera around the target, scroll-wheel controls smooth zoom, and right-click enables panning. Dual-pane 2D HUD drawers slide in from the lower right to display dense scientific specifications.
    </p>
  </div>
  <div class="callout callout-experiment">
    <div class="callout-title">📱 Mobile, Tablet & iPad Experience</div>
    <p>
      Integrates the <strong>DeviceOrientation API</strong> to offer a zero-latency 360° virtual window into the pavilion. As students physically rotate their phone or iPad, the virtual camera pivots in real time. Floating 3D holographic cards counter-rotate to remain parallel to the floor horizon at all times.
    </p>
  </div>
</div>

<div class="callout callout-tech">
  <div class="callout-title">🥽 WebXR Immersive Virtual Reality</div>
  <p>
    Built on the WebXR Device API, Vizon allows students wearing Meta Quest, HTC Vive, or Apple Vision Pro headsets to step directly onto the floor in 1:1 true scale, inspecting molecular orbitals, orbiting moons, and roving robots at life-size human proportions.
  </div>
</div>

<h2>1.3 Procedural Audio & Cosmic Soundscape</h2>
<p>
Rather than relying on bandwidth-heavy recorded audio loops, Vizon synthesizes its ambient audio live in the browser using the <strong>Web Audio API</strong>. Multiple sinusoidal and bandpass-filtered oscillators generate a subtle, meditative sub-harmonic drone (<span class="math-inline">55 Hz</span> base with <span class="math-inline">110 Hz</span> overtone) accented by gentle randomized acoustic chimes when interacting with stations or switching pods. The soundscape is unmuted by default and can be toggled via the bottom navigation bar.
</p>

<!-- ═══════════════════════════════════════════════════════
     CHAPTER 2: THE FIVE SCIENCE PODS
═══════════════════════════════════════════════════════ -->
<div class="page-break"></div>

<h1>2. The Five Science Pods: Experiments & Concepts</h1>

<!-- 2.1 PHYSICS POD -->
<h2>2.1 Physics Pod: High-Voltage Electromagnetism & Plasma Dynamics</h2>

<div class="figure-card">
  <img src="${imgPhysics}" alt="Physics Pod Tesla Coils and Plasma Globe">
  <div class="figure-caption">
    <strong>Figure 2.1:</strong> The Physics Station featuring dual helical copper Tesla coils, central graphite electrode, and reactive borosilicate glass plasma globe with interactive electrical discharge filaments.
  </div>
</div>

<h3>2.1.1 Apparatus & Components</h3>
<ul>
  <li><strong>Dual Helical Tesla Coils:</strong> Primary and secondary LC resonant transformers with wound copper helical windings, grounded aluminum plinths, and toroidal top-load terminals that generate high-frequency alternating electrostatic fields.</li>
  <li><strong>Central Borosilicate Plasma Globe:</strong> An ultra-clear dielectric glass envelope filled with low-pressure noble gases (Neon, Argon, Xenon) at approximately 0.01 atmospheres.</li>
  <li><strong>Central Graphite Electrode:</strong> Powered by a high-frequency solid-state flyback oscillator (<span class="math-inline">25–40 kHz</span> at <span class="math-inline">2–5 kV</span>), establishing a localized violet corona discharge and radial Townsend avalanche ionization.</li>
  <li><strong>Reactive Arc Filaments:</strong> 18 dynamic procedural electric discharge filaments rendered via custom GLSL shaders that twist, fork, and track user pointer interactions on the glass surface.</li>
</ul>

<h3>2.1.2 Experiments Students Can Perform</h3>
<div class="callout callout-experiment">
  <div class="callout-title">Experiment 1: Dielectric Polarization & Finger Contact Tracking</div>
  <p>
    Students touch or click anywhere on the plasma globe. Because the human hand introduces a conductive, grounded surface with a much higher dielectric capacitance than ambient air, the electric field concentrates at the point of contact. The procedural GLSL shader detects the UV contact coordinate and bends the primary discharge filament directly to the cursor, demonstrating electrical impedance minimization and capacitive displacement currents (<span class="math-inline">I_D = C · (dV/dt)</span>).
  </p>
</div>

<div class="callout callout-experiment">
  <div class="callout-title">Experiment 2: Spark Gap Frequency & Dielectric Breakdown Tuning</div>
  <p>
    Using the HUD sliders, students modulate the spark gap discharge frequency and driving potential. Students observe the transition from dark discharge to Townsend glow discharge, and finally to sustained thermal plasma filamentation as the electric field exceeds the dielectric breakdown threshold of the gas mixture (<span class="math-inline">E &gt; 3 × 10⁶ V/m</span> in atmospheric air, significantly lower in reduced-pressure noble gases).
  </p>
</div>

<h3>2.1.3 Core High School Concepts Explained</h3>
<div class="formula-box">
  <div class="formula-title">Maxwell-Faraday Induction & LC Resonance</div>
  <div class="math-display">ℰ = -N (dΦ_B / dt) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; f₀ = 1 / [2π √(L₂ C₂)]</div>
</div>
<p>
A Tesla coil operates on the principle of <em>resonant inductive coupling</em>. Unlike an iron-core transformer, which relies on magnetic flux containment, the Tesla coil uses air-core transformers where energy is transferred periodically between the primary and secondary circuits when both share the exact same resonant frequency <span class="math-inline">f₀</span>.
</p>
<ul>
  <li><strong>Ionization and Plasma Formation:</strong> When the potential gradient between the central electrode and the glass envelope exceeds the first ionization energy of the gas atoms (<span class="math-inline">≈ 15.76 eV</span> for Argon), outer-shell electrons are stripped free. Accelerated electrons collide with neutral atoms in an avalanche process, creating a luminous quasi-neutral soup of ions and free electrons—the fourth state of matter.</li>
  <li><strong>Skin Effect in High-Frequency Currents:</strong> At <span class="math-inline">35 kHz</span>, alternating current flows primarily along the outermost perimeter of conductors (<span class="math-inline">δ = √(ρ / (π f μ))</span>), explaining why the helical secondary coil uses surface-area-optimized copper tubing.</li>
</ul>

<!-- 2.2 CHEMISTRY POD -->
<div class="page-break"></div>

<h2>2.2 Chemistry Pod: Atomic Flame Tests & Quantum Emission Spectroscopy</h2>

<div class="figure-card">
  <img src="${imgChem}" alt="Chemistry Pod Bunsen Burner Copper Flame Test">
  <div class="figure-caption">
    <strong>Figure 2.2:</strong> The Chemistry Station showing the Bunsen burner with an active Copper(II) Chloride flame test, emitting characteristic emerald green and turquoise radiation alongside real-time quantum spectroscopic lines.
  </div>
</div>

<h3>2.2.1 Apparatus & Chemical Elements Catalog</h3>
<p>
The Chemistry Station models a precision laboratory Bunsen burner equipped with an adjustable air collar and fuel valve, paired with an optical emission spectrometer that decomposes emitted flame light into discrete spectral lines:
</p>

<table>
  <thead>
    <tr>
      <th>Element / Salt</th>
      <th>Flame Color Observed</th>
      <th>Dominant Emission Lines (λ)</th>
      <th>Quantum Transition</th>
      <th>Photon Energy (ΔE)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Base Hydrocarbon</strong> (CH* / C₂*)</td>
      <td>Electric Premixed Blue</td>
      <td>431.4 nm, 473.7 nm, 516.5 nm</td>
      <td>Radical Swan electronic bands</td>
      <td>2.40 – 2.87 eV</td>
    </tr>
    <tr>
      <td><strong>Copper(II)</strong> (CuCl₂)</td>
      <td>Emerald Green & Turquoise</td>
      <td>510.5 nm, 515.3 nm, 521.8 nm</td>
      <td>4p → 4s relaxation</td>
      <td>2.38 eV</td>
    </tr>
    <tr>
      <td><strong>Strontium</strong> (SrCl₂)</td>
      <td>Brilliant Crimson Scarlet</td>
      <td>460.7 nm, 605.0 nm, 668.0 nm</td>
      <td>5p → 5s triplet de-excitation</td>
      <td>1.85 eV</td>
    </tr>
    <tr>
      <td><strong>Sodium</strong> (NaCl)</td>
      <td>Intense Golden Yellow</td>
      <td>589.0 nm (D₂), 589.6 nm (D₁)</td>
      <td>3p → 3s spin-orbit doublet</td>
      <td>2.10 eV</td>
    </tr>
    <tr>
      <td><strong>Potassium</strong> (KCl)</td>
      <td>Ethereal Lilac / Violet</td>
      <td>404.4 nm (Violet), 766.5 nm (Near-IR)</td>
      <td>4p → 4s & 5p → 4s cascade</td>
      <td>3.06 eV / 1.62 eV</td>
    </tr>
    <tr>
      <td><strong>Barium</strong> (BaCl₂)</td>
      <td>Apple Pale Green</td>
      <td>513.7 nm, 524.2 nm, 553.5 nm</td>
      <td>6p → 6s multiplet cascade</td>
      <td>2.24 eV</td>
    </tr>
    <tr>
      <td><strong>Calcium</strong> (CaCl₂)</td>
      <td>Fiery Brick-Red / Orange</td>
      <td>422.7 nm, 616.2 nm, 622.0 nm</td>
      <td>4p → 4s & CaOH* molecular bands</td>
      <td>2.00 eV</td>
    </tr>
  </tbody>
</table>

<h3>2.2.2 Experiments Students Can Perform</h3>
<div class="callout callout-experiment">
  <div class="callout-title">Experiment 1: Qualitative Salt Identification & Flame Chemistry</div>
  <p>
    Students introduce platinum inoculation loops coated with unknown mineral salts into the flame. By observing the macroscopic flame color and cross-referencing with the spectral sensor, students identify cations based on their unique atomic emission fingerprints.
  </p>
</div>

<div class="callout callout-experiment">
  <div class="callout-title">Experiment 2: Airflow Collar & Combustion Thermodynamics</div>
  <p>
    Adjusting the burner's air intake collar toggles between a yellow, luminous, oxygen-depleted diffusion flame (<span class="math-inline">≈ 1000°C</span>, caused by glowing unburned incandescent soot particles) and a roaring, non-luminous, oxygenated blue premixed flame (<span class="math-inline">≈ 1500–1600°C</span>). Students observe that metallic salt volatilization and clean spectral line excitation require the hotter non-luminous flame.
  </p>
</div>

<h3>2.2.3 Core High School Concepts Explained</h3>
<div class="formula-box">
  <div class="formula-title">Bohr Model & The Planck-Einstein Relation</div>
  <div class="math-display">E_n = -[Z² · 13.6 eV] / n² &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ΔE = E_high - E_low = hν = (hc / λ)</div>
</div>
<ul>
  <li><strong>Quantized Atomic Energy Levels:</strong> Thermal energy from the flame excites valence electrons into higher principal energy levels (<span class="math-inline">n₂</span>). Because electrons cannot inhabit the space between discrete orbitals, their return to a lower energy state (<span class="math-inline">n₁</span>) forces the release of a photon with energy <span class="math-inline">ΔE</span> exactly matching the difference between the two states.</li>
  <li><strong>Fine-Structure Spin-Orbit Coupling:</strong> Sodium produces two closely spaced yellow lines at <span class="math-inline">589.0 nm</span> (<span class="math-inline">D₂</span>) and <span class="math-inline">589.6 nm</span> (<span class="math-inline">D₁</span>). This fine structure occurs because the intrinsic magnetic dipole moment of the electron's spin interacts with the magnetic field created by its orbital motion around the nucleus, splitting the excited <span class="math-inline">3p</span> orbital into <span class="math-inline">3p_{3/2}</span> and <span class="math-inline">3p_{1/2}</span> sub-levels.</li>
</ul>

<!-- 2.3 BIOLOGY POD -->
<div class="page-break"></div>

<h2>2.3 Biology Pod: Eukaryotic Cell Ultrastructure & SGU Atlas</h2>

<div class="figure-card">
  <img src="${imgBio}" alt="Biology Pod Eukaryotic Cell Interior Cutaway">
  <div class="figure-caption">
    <strong>Figure 2.3:</strong> The Biology Station featuring an anatomical 90° cutaway of a medical-grade eukaryotic cell, revealing the nucleus, chromatin fibers, rough ER, mitochondria, and Golgi apparatus.
  </div>
</div>

<h3>2.3.1 Eukaryotic Organelle Catalog</h3>
<p>
The Biology Station displays a 3D cutaway eukaryotic cell measuring 2.4 meters across on its scientific pedestal. Each organelle is rendered with anatomical fidelity and physically based materials:
</p>

<table>
  <thead>
    <tr>
      <th>Organelle</th>
      <th>Structural Features Modeled</th>
      <th>Primary Biochemical Function</th>
      <th>Key Metabolic Pathway</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Nucleus & Nucleolus</strong></td>
      <td>Double lipid bilayer, 36 nuclear pore complexes (NPCs), inner nuclear lamina, dense nucleolus core, and chromatin fibers.</td>
      <td>Stores and protects genomic DNA; synthesizes ribosomal RNA (rRNA) in the nucleolus.</td>
      <td>Transcription (DNA → mRNA), DNA replication.</td>
    </tr>
    <tr>
      <td><strong>Rough Endoplasmic Reticulum (RER)</strong></td>
      <td>Interconnected flattened cisternae studded with membrane-bound 80S ribosomes.</td>
      <td>Translates, folds, and post-translationally modifies proteins destined for secretion or membranes.</td>
      <td>Protein synthesis, N-linked glycosylation.</td>
    </tr>
    <tr>
      <td><strong>Smooth Endoplasmic Reticulum (SER)</strong></td>
      <td>Smooth tubular network lacking ribosomes.</td>
      <td>Synthesizes lipids, phospholipids, and steroid hormones; detoxifies metabolic byproducts; stores Ca²⁺.</td>
      <td>Lipid biosynthesis, calcium homeostasis.</td>
    </tr>
    <tr>
      <td><strong>Mitochondria</strong></td>
      <td>Double membrane: smooth outer membrane, highly folded inner cristae, and dense matrix.</td>
      <td>Generates over 90% of cellular energy via oxidative phosphorylation; harbors its own circular mtDNA.</td>
      <td>Krebs / Citric Acid Cycle, Electron Transport Chain (ATP Synthase).</td>
    </tr>
    <tr>
      <td><strong>Golgi Apparatus</strong></td>
      <td>Stacked parallel cisternae with distinct <em>cis</em>-face (receiving) and <em>trans</em>-face (shipping), surrounded by transport vesicles.</td>
      <td>Sorts, packages, and tags proteins and lipids from the RER for intracellular delivery or exocytosis.</td>
      <td>Vesicular trafficking, carbohydrate synthesis.</td>
    </tr>
    <tr>
      <td><strong>Centrosome & Centrioles</strong></td>
      <td>Pair of perpendicular barrel-shaped centrioles consisting of 9 microtubule triplets (9+0 pattern).</td>
      <td>Primary microtubule organizing center (MTOC); organizes spindle fibers during mitotic division.</td>
      <td>Cell division, spindle apparatus assembly.</td>
    </tr>
  </tbody>
</table>

<h3>2.3.2 Experiments Students Can Perform</h3>
<div class="callout callout-experiment">
  <div class="callout-title">Experiment 1: Organelle Isolation & 360° Structural Inspection</div>
  <p>
    Using the HUD isolation toggles, students can dim the cytoplasm and isolate individual organelles (e.g., examining the folded mitochondrial cristae or the nuclear pore complexes). Students rotate and zoom around the isolated organelle to study surface-area-to-volume ratio adaptations.
  </p>
</div>

<div class="callout callout-experiment">
  <div class="callout-title">Experiment 2: Secretory Protein Assembly Line Tracing</div>
  <p>
    Students trace the biosynthetic route of an insulin molecule: from gene transcription in the nucleus → mRNA transport through nuclear pore complexes → translation on RER ribosomes → folding inside the RER lumen → vesicle budding → <em>cis</em>-to-<em>trans</em> processing in the Golgi → secretory vesicle exocytosis at the plasma membrane.
  </p>
</div>

<h3>2.3.3 Core High School Concepts Explained</h3>
<div class="formula-box">
  <div class="formula-title">Aerobic Cellular Respiration & ATP Yield</div>
  <div class="math-display">C₆H₁₂O₆ + 6O₂ ⟶ 6CO₂ + 6H₂O + 30 to 32 ATP &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (ΔG° = -2870 kJ/mol)</div>
</div>
<ul>
  <li><strong>Endosymbiotic Theory:</strong> Mitochondria evolved from ancient aerobic alpha-proteobacteria engulfed by primitive eukaryotic host cells <span class="math-inline">≈ 1.5</span> billion years ago. Evidence visible in the simulation includes their double-membrane structure, independent circular DNA genome, and binary fission-like replication.</li>
  <li><strong>Surface-Area-to-Volume Optimization:</strong> The extensive folding of the mitochondrial inner membrane into <em>cristae</em> vastly increases the available surface area for the electron transport chain complexes (I–IV) and F₀F₁-ATP synthase enzymes, illustrating how biological form directly enables metabolic function.</li>
</ul>

<!-- 2.4 MATHEMATICS POD -->
<div class="page-break"></div>

<h2>2.4 Mathematics Pod: 4D Hypercube, Harmonics & Vector Fields</h2>

<div class="figure-card">
  <img src="${imgMath}" alt="Mathematics Pod 4D Hypercube and Harmonics">
  <div class="figure-caption">
    <strong>Figure 2.4:</strong> The Mathematics Station displaying the 4D Tesseract (hypercube) undergoing real-time double rotation in higher dimensions and projecting stereographic shadows onto a 3D plinth.
  </div>
</div>

<h3>2.4.1 Apparatus & Visual Modules</h3>
<ul>
  <li><strong>4D Hypercube (Tesseract):</strong> A 4-dimensional polytope comprising 16 vertices, 32 edges, 24 square faces, and 8 cubic bounding cells. The vertex coordinates correspond to all combinations of <span class="math-inline">(±1, ±1, ±1, ±1)</span>.</li>
  <li><strong>4D Rotation Engine:</strong> In 4-dimensional Euclidean space ℝ⁴, rotations do not occur around an axis, but across a 2-dimensional plane. The simulation executes simultaneous rotations across the <span class="math-inline">XW</span> and <span class="math-inline">YZ</span> planes.</li>
  <li><strong>Perspective Stereographic Projection:</strong> Converts 4D coordinates <span class="math-inline">(x,y,z,w)</span> into 3D coordinates <span class="math-inline">(x',y',z')</span> via perspective foreshortening:
  <div class="math-display">x' = x / (d - w), &nbsp;&nbsp;&nbsp;&nbsp; y' = y / (d - w), &nbsp;&nbsp;&nbsp;&nbsp; z' = z / (d - w)</div>
  where <span class="math-inline">d</span> is the 4D camera viewing distance (<span class="math-inline">d ≈ 2.5</span>).</li>
  <li><strong>Spherical Harmonics Morphing Surface:</strong> Visualizes the real solutions <span class="math-inline">Y_l^m(θ, φ)</span> of Laplace's spherical equation, generating the geometric angular probability distributions of atomic quantum orbitals (<span class="math-inline">s, p, d, f</span>).</li>
  <li><strong>Tangent Vector Field Visualizer:</strong> An instanced array of dynamic 3D vectors representing differential flux, curl, and gradient flows across a continuous scalar manifold.</li>
</ul>

<h3>2.4.2 Experiments Students Can Perform</h3>
<div class="callout callout-experiment">
  <div class="callout-title">Experiment 1: Higher-Dimensional Shadow Analysis</div>
  <p>
    Just as a 3D cube casts a 2D square shadow on a flat tabletop, a 4D hypercube casts a 3D shadow into our 3D space. As students rotate the tesseract through the <span class="math-inline">w</span>-axis, they observe the inner cube appear to expand and turn "inside out" into the outer cube, illustrating how spatial projection preserves topological connectivity while distorting Euclidean lengths.
  </p>
</div>

<div class="callout callout-experiment">
  <div class="callout-title">Experiment 2: Quantum Orbital Nodal Plane Inspection</div>
  <p>
    Switching the projector to Spherical Harmonics mode, students vary the degree <span class="math-inline">l</span> and order <span class="math-inline">m</span>. By counting the number of radial and angular nodal surfaces where the wave amplitude equals zero (<span class="math-inline">ψ = 0</span>), students discover why <span class="math-inline">p</span>-orbitals (<span class="math-inline">l=1</span>) have one nodal plane (dumbbell shape) while <span class="math-inline">d</span>-orbitals (<span class="math-inline">l=2</span>) have two nodal planes (cloverleaf shape).
  </p>
</div>

<h3>2.4.3 Core High School Concepts Explained</h3>
<div class="formula-box">
  <div class="formula-title">Euler's Polyhedral Characteristic in 3D and 4D</div>
  <div class="math-display">In 3D: V - E + F = 2 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; In 4D: V - E + F - C = 0</div>
  <div class="math-display">Tesseract: 16 - 32 + 24 - 8 = 0</div>
</div>
<p>
Leonhard Euler discovered that for any convex three-dimensional polyhedron, the alternating sum of vertices (<span class="math-inline">V</span>), edges (<span class="math-inline">E</span>), and faces (<span class="math-inline">F</span>) always equals 2. Ludwig Schläfli generalized this to four-dimensional convex polytopes by introducing cells (<span class="math-inline">C</span>), proving that the Euler-Poincaré characteristic alternates to zero.
</p>

<!-- 2.5 ASTRONOMY POD -->
<div class="page-break"></div>

<h2>2.5 Astronomy & Space Robotics Hub: Solar System Orrery & Halley's Comet</h2>

<div class="figure-card">
  <img src="${imgAstro}" alt="Astronomy Orrery Real Planets">
  <div class="figure-caption">
    <strong>Figure 2.5:</strong> The Keplerian Heliocentric Solar System Orrery featuring procedural high-resolution planet textures, axial tilts, dynamic planetary orbital trails, and an incandescent Sun.
  </div>
</div>

<h3>2.5.1 Heliocentric Orrery & Realistic Planet Textures</h3>
<p>
The Astronomy Hub models our complete solar system with authentic physical textures generated dynamically on high-resolution procedural canvases:
</p>
<ul>
  <li><strong>The Sun:</strong> Central radiant sphere with procedural convective granulation cells, dark magnetic sunspots, and animated coronal prominence arcs.</li>
  <li><strong>Inner Terrestrial Planets:</strong> Mercury (crater-scarred basalt), Venus (thick sulfuric acid clouds and runaway greenhouse veil), Earth (continental landmasses, blue oceans, specular water reflection, and separate rotating cloud layer), and Mars (oxidized iron-rich regolith, white polar ice caps, and Valles Marineris canyon rift).</li>
  <li><strong>Gas & Ice Giants:</strong> Jupiter (turbulent multi-band ammonium clouds and Great Red Spot anticyclone), Saturn (golden-hued hydrogen atmosphere and semi-transparent ring system with Cassini division), Uranus (featureless aquamarine methane atmosphere with 98° extreme axial tilt), and Neptune (deep azure blue with dynamic high-velocity methane storms).</li>
</ul>

<h3>2.5.2 Halley's Comet Simulation (1P/Halley)</h3>

<div class="figure-card">
  <img src="${imgComet}" alt="Halley's Comet Telemetry and Dual Tail">
  <div class="figure-caption">
    <strong>Figure 2.6:</strong> Halley's Comet on its highly eccentric orbit (<span class="math-inline">e = 0.967</span>). As it nears perihelion (<span class="math-inline">0.59 AU</span>), volatile sublimation triggers a bright cyan-blue ion tail and curved golden dust tail.
  </div>
</div>

<p>
The simulation includes a mathematically rigorous model of Halley's Comet:
</p>
<ul>
  <li><strong>Orbital Elements:</strong> Semi-major axis <span class="math-inline">a = 17.8 AU</span>, orbital period <span class="math-inline">T ≈ 76.0 years</span>, high eccentricity <span class="math-inline">e = 0.967</span>, and retrograde orbital inclination <span class="math-inline">i = 17.8°</span>.</li>
  <li><strong>Volatile Sublimation Physics:</strong> Beyond <span class="math-inline">3.0 AU</span> (aphelion is at <span class="math-inline">35.1 AU</span>), the comet exists as an inactive "dirty snowball" of water ice, frozen methane, carbon monoxide, and silicates. Within <span class="math-inline">3.0 AU</span>, solar radiation vaporizes surface volatiles, expanding into a luminous coma (<span class="math-inline">100,000 km</span> across).</li>
  <li><strong>Dual-Tail Mechanism:</strong>
    <ol>
      <li><strong>Type I Ion/Plasma Tail:</strong> Ionized gases (CO⁺, N₂⁺, H₂O⁺) trapped in the interplanetary magnetic field. Accelerated by the high-speed solar wind (<span class="math-inline">400–800 km/s</span>), the ion tail points <em>straight anti-solar</em> away from the Sun, glowing electric cyan-blue.</li>
      <li><strong>Type II Dust Tail:</strong> Micron-sized silicate and carbon grains pushed by gentle solar radiation pressure (<span class="math-inline">F_rad ∝ 1/r²</span>). Because the dust particles carry orbital momentum, they curve gracefully behind the comet's orbital path, glowing warm golden-white.</li>
    </ol>
  </li>
</ul>

<h3>2.5.3 Experiments Students Can Perform</h3>
<div class="callout callout-experiment">
  <div class="callout-title">Experiment 1: Kepler's Harmonic Law Verification (T² ∝ a³)</div>
  <p>
    Students click through the planetary telemetry cards to record the orbital semi-major axis <span class="math-inline">a</span> (in AU) and period <span class="math-inline">T</span> (in Earth years). By calculating the ratio <span class="math-inline">T² / a³</span> for each planet from Mercury to Neptune, students verify that the ratio remains identically <span class="math-inline">1.00 yr²/AU³</span>, proving Kepler's Third Law.
  </p>
</div>

<div class="callout callout-experiment">
  <div class="callout-title">Experiment 2: Conservation of Angular Momentum at Perihelion vs Aphelion</div>
  <p>
    By tracking Halley's Comet as it approaches the Sun, students measure its speed surging to <span class="math-inline">54.55 km/s</span> at perihelion (<span class="math-inline">0.586 AU</span>) compared to just <span class="math-inline">0.91 km/s</span> at aphelion (<span class="math-inline">35.1 AU</span>), verifying Kepler's Second Law (<span class="math-inline">dA/dt = L / (2m) = constant</span>).
  </p>
</div>

<h3>2.5.4 Core High School Concepts Explained</h3>
<div class="formula-box">
  <div class="formula-title">Kepler's Laws & Newton's Law of Universal Gravitation</div>
  <div class="math-display">F_g = G [M_⊙ · m] / r² &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; T² = [4π² / (G M_⊙)] a³</div>
  <div class="math-display">v(r) = √[G M_⊙ (2/r - 1/a)] &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (Vis-Viva Equation)</div>
</div>
<p>
The vis-viva equation (derived directly from conservation of mechanical energy <span class="math-inline">E = ½ mv² - GMm/r</span>) governs the instantaneous orbital speed <span class="math-inline">v(r)</span> of any celestial body on an elliptical path.
</p>

<!-- ═══════════════════════════════════════════════════════
     CHAPTER 3: THE ROCKET FLEET
═══════════════════════════════════════════════════════ -->
<div class="page-break"></div>

<h1>3. The Rocket Fleet: Aerospace Engineering & Telemetry</h1>

<div class="figure-card">
  <img src="${imgRockets}" alt="Rocket Bay LVM3 and Spacecraft">
  <div class="figure-caption">
    <strong>Figure 3.1:</strong> The Aerospace Exhibition Bay showcasing high-detail 3D models of India's LVM3 (Chandrayaan-3 launcher) and global orbital launch vehicles.
  </div>
</div>

<h2>3.1 Launch Vehicle Fleet Specifications</h2>
<p>
Vizon features 3D models and interactive telemetry cards for 10 historical, operational, and future orbital launch systems across ISRO, NASA, SpaceX, and commercial aerospace pioneers:
</p>

<table>
  <thead>
    <tr>
      <th>Launch Vehicle</th>
      <th>Agency / Operator</th>
      <th>Height / Mass</th>
      <th>Stages & Propellants</th>
      <th>Payload to LEO</th>
      <th>Historic Accomplishments</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>PSLV</strong><br>(Polar Satellite Launch Vehicle)</td>
      <td>ISRO (India)<br><em>Operational</em></td>
      <td>44.0 m<br>320 tonnes</td>
      <td>4 Stages:<br>Solid / Liquid / Solid / Liquid<br>(HTPB / UDMH+N₂O₄)</td>
      <td>1,750 kg (SSPO)<br>3,800 kg (LEO)</td>
      <td>Workhorse of ISRO; launched Chandrayaan-1 (2008), Mars Orbiter Mission / Mangalyaan (2013), and world-record 104 satellites on PSLV-C37.</td>
    </tr>
    <tr>
      <td><strong>LVM3</strong><br>(Launch Vehicle Mark-3)</td>
      <td>ISRO (India)<br><em>Operational</em></td>
      <td>43.5 m<br>640 tonnes</td>
      <td>3 Stages:<br>2× S200 Solid Boosters<br>L110 Liquid Core (Vikas)<br>C25 Cryogenic Upper Stage</td>
      <td>8,000 kg (LEO)<br>4,300 kg (GTO)</td>
      <td>India's heaviest operational lifter; launched Chandrayaan-3 to lunar south pole; human-rated for India's upcoming Gaganyaan crewed flights.</td>
    </tr>
    <tr>
      <td><strong>GSLV Mk II</strong></td>
      <td>ISRO (India)<br><em>Operational</em></td>
      <td>51.7 m<br>414 tonnes</td>
      <td>3 Stages:<br>S139 Solid + 4 Liquid Straps<br>GS2 Vikas Liquid Stage<br>CE-7.5 Indigenous Cryo</td>
      <td>5,000 kg (LEO)<br>2,500 kg (GTO)</td>
      <td>Demonstrated indigenous mastery of high-energy cryogenic liquid hydrogen (LH₂) and liquid oxygen (LOX) propulsion at -253°C.</td>
    </tr>
    <tr>
      <td><strong>Rohini RH-200</strong><br>(Sounding Rocket)</td>
      <td>ISRO (India)<br><em>Operational</em></td>
      <td>3.5 m<br>108 kg</td>
      <td>2 Stages:<br>All-Solid propellant motors</td>
      <td>Suborbital<br>(Apogee: 80 km)</td>
      <td>Over 1,700 launches from Thumba Equatorial Rocket Launching Station (TERLS) for atmospheric research and equatorial electrojet aeronomy.</td>
    </tr>
    <tr>
      <td><strong>SLV-3</strong><br>(Historic Pioneer)</td>
      <td>ISRO (India)<br><em>Retired</em></td>
      <td>22.7 m<br>17 tonnes</td>
      <td>4 Stages:<br>All-Solid composite fuel</td>
      <td>40 kg (LEO)</td>
      <td>India's first sovereign orbital rocket (July 18, 1980); Project Director Dr. A.P.J. Abdul Kalam; placed Rohini RS-1 into space.</td>
    </tr>
    <tr>
      <td><strong>HRLV / NGLV</strong><br>(Next Gen Launch Vehicle)</td>
      <td>ISRO (India)<br><em>Development</em></td>
      <td>75.0 m<br>700 tonnes</td>
      <td>3 Stages:<br>Reusable Methalox Booster<br>Semi-cryo + Cryogenic upper</td>
      <td>20,000 – 30,000 kg (LEO)<br>10,000 kg (GTO)</td>
      <td>Future heavy-lift vertical takeoff and vertical landing (VTVL) reusable launch vehicle for Bharatiya Antariksh Station and Indian crewed lunar landing (2040).</td>
    </tr>
    <tr>
      <td><strong>Apollo 11 Saturn V</strong></td>
      <td>NASA (USA)<br><em>Historic</em></td>
      <td>110.6 m<br>2,970 tonnes</td>
      <td>3 Stages:<br>S-IC (RP-1/LOX)<br>S-II (LH₂/LOX)<br>S-IVB (LH₂/LOX)</td>
      <td>140,000 kg (LEO)<br>48,600 kg (TLI)</td>
      <td>Propelled Neil Armstrong, Buzz Aldrin, and Michael Collins to the Moon in July 1969; five massive F-1 engines producing 34.5 MN total thrust.</td>
    </tr>
    <tr>
      <td><strong>Falcon 9</strong></td>
      <td>SpaceX (USA)<br><em>Operational</em></td>
      <td>70.0 m<br>549 tonnes</td>
      <td>2 Stages:<br>Stage 1 (9× Merlin 1D)<br>Stage 2 (1× Merlin 1D Vac)</td>
      <td>22,800 kg (LEO)<br>8,300 kg (GTO)</td>
      <td>World's first reusable orbital-class rocket; autonomous drone-ship propulsive retro-landing via grid fins and cold-gas attitude thrusters.</td>
    </tr>
    <tr>
      <td><strong>Starship & Super Heavy</strong></td>
      <td>SpaceX (USA)<br><em>Operational Test</em></td>
      <td>121.0 m<br>5,000 tonnes</td>
      <td>2 Stages:<br>Super Heavy Booster (33× Raptor)<br>Starship Upper (6× Raptor)</td>
      <td>100,000 – 150,000 kg (Fully Reusable)</td>
      <td>World's most powerful rocket (72 MN thrust); full-flow staged combustion cycle burning Liquid Methane (CH₄) and Liquid Oxygen (LOX).</td>
    </tr>
    <tr>
      <td><strong>Vikram-S</strong></td>
      <td>Skyroot Aerospace<br>(India Private)</td>
      <td>6.0 m<br>545 kg</td>
      <td>Single-stage solid rocket with 3D-printed carbon composite body</td>
      <td>Suborbital<br>(Apogee: 89.5 km)</td>
      <td>First privately developed rocket launched from India (Mission <em>Prarambh</em>, November 18, 2022); pioneered private Indian space enterprise.</td>
    </tr>
  </tbody>
</table>

<h2>3.2 Core High School Aerospace Concepts</h2>

<div class="formula-box">
  <div class="formula-title">The Tsiolkovsky Rocket Equation & Mass Ratio</div>
  <div class="math-display">Δv = v_e · ln(m₀ / m_f) = I_sp · g₀ · ln[(m_dry + m_propellant) / m_dry]</div>
</div>

<h3>3.2.1 Specific Impulse (I_sp) Comparison</h3>
<p>
Specific Impulse (<span class="math-inline">I_sp</span>) measures rocket engine fuel efficiency: it represents the number of seconds one kilogram of propellant can produce one kilogram-force of thrust (<span class="math-inline">I_sp = F / (ṁ · g₀)</span>). Higher <span class="math-inline">I_sp</span> yields greater final velocity <span class="math-inline">Δv</span> for the same fuel mass:
</p>
<ul>
  <li><strong>Solid Rocket Propellant (HTPB/APCP):</strong> <span class="math-inline">I_sp ≈ 250–280 seconds</span>. High instantaneous thrust, storability, but cannot be throttled or shut down once ignited.</li>
  <li><strong>Hypergolic Liquid (UDMH + N₂O₄):</strong> <span class="math-inline">I_sp ≈ 300–320 seconds</span>. Ignites spontaneously upon contact without an external spark; highly reliable for upper-stage ignition in vacuum.</li>
  <li><strong>Hydrocarbon Methalox (CH₄ + LOX):</strong> <span class="math-inline">I_sp ≈ 360–380 seconds</span>. Burns cleanly without soot accumulation, making engines reusable for dozens of flights; can be synthesized on Mars via the Sabatier reaction.</li>
  <li><strong>Cryogenic Hydrolox (LH₂ + LOX):</strong> <span class="math-inline">I_sp ≈ 450–465 seconds</span>. The gold standard for upper-stage velocity boosts (used in ISRO C25, Saturn V S-IVB, and space shuttle main engines).</li>
</ul>

<h3>3.2.2 The Multi-Staging Advantage</h3>
<p>
To reach Low Earth Orbit, a vehicle must achieve an orbital insertion velocity of <span class="math-inline">≈ 7.8 km/s</span>, requiring an effective <span class="math-inline">Δv ≥ 9.3 km/s</span> after accounting for gravity and atmospheric drag losses.
</p>
<p>
If a single-stage rocket were used (Single-Stage-To-Orbit or SSTO) with hydrolox propellant (<span class="math-inline">v_e ≈ 4400 m/s</span>), the required propellant mass fraction would exceed 88%:
</p>
<div class="math-display">m₀ / m_f = e^{Δv / v_e} = e^{9300 / 4400} = e^{2.11} ≈ 8.28 ⟹ m_propellant / m₀ = 1 - (1 / 8.28) ≈ 87.9%</div>
<p>
Because engines, tanks, avionics, and payload must fit within the remaining 12.1%, SSTO is nearly impossible with current chemical fuels. Staging solves this: by discarding empty tanks and spent heavy engines as soon as their fuel is consumed, the remaining stages carry a dramatically lower <span class="math-inline">m₀</span> into the next burn phase, multiplying total velocity output.
</p>

<!-- ═══════════════════════════════════════════════════════
     CHAPTER 4: AUTONOMOUS MOBILE ROBOTS
═══════════════════════════════════════════════════════ -->
<div class="page-break"></div>

<h1>4. Autonomous Mobile Robots: Kinematics & Dynamic Tracking</h1>

<div class="grid-2">
  <div class="figure-card">
    <img src="${imgPragyan}" alt="Pragyan Moon Rover 3D Model">
    <div class="figure-caption">
      <strong>Figure 4.1:</strong> ISRO's Pragyan Moon Rover navigating the floor with 6-wheel rocker-bogie mobility and deployed solar array.
    </div>
  </div>
  <div class="figure-card">
    <img src="${imgR2}" alt="R2-D2 Astromech Droid">
    <div class="figure-caption">
      <strong>Figure 4.2:</strong> The autonomous R2-D2 astromech droid roaming the pavilion, complete with rotating sensor dome and retractable center leg.
    </div>
  </div>
</div>

<h2>4.1 The Robots: Pragyan Moon Rover & R2-D2 Astromech</h2>
<div class="grid-2">
  <div>
    <h3>🇮🇳 ISRO Pragyan Moon Rover</h3>
    <ul>
      <li><strong>Mission:</strong> Chandrayaan-3 Lunar Surface Exploration.</li>
      <li><strong>Landing Site:</strong> Shiv Shakti Point (69.373° S, 32.319° E).</li>
      <li><strong>Chassis Mass:</strong> 26 kg ultralight carbon-composite body.</li>
      <li><strong>Mobility:</strong> 6 cleated aluminum lunar wheels with differential Rocker-Bogie mechanical suspension.</li>
      <li><strong>Top Velocity:</strong> 1.0 cm/second under stereo navigation camera guidance.</li>
      <li><strong>Scientific Payloads:</strong>
        <ul>
          <li><em>LIBS:</em> Laser-Induced Breakdown Spectroscope that vaporized lunar regolith with high-power pulses.</li>
          <li><em>APXS:</em> Alpha Particle X-Ray Spectrometer using Curium-244 radioactive source.</li>
          <li><em>Historic Discovery:</em> First direct in-situ confirmation of elemental Sulphur (S), Aluminum, Iron, and Calcium at the lunar south pole.</li>
        </ul>
      </li>
    </ul>
  </div>
  <div>
    <h3>🤖 R2-D2 Astromech Droid</h3>
    <ul>
      <li><strong>Designation:</strong> Industrial Automaton R2 Series Astromech.</li>
      <li><strong>Primary Role:</strong> Starship Hyperspace Astrogation & Mechanical Repair.</li>
      <li><strong>Dimensions:</strong> 1.09 m height, 32 kg mass.</li>
      <li><strong>Chassis Alloy:</strong> Reinforced durasteel with cobalt-blue trim.</li>
      <li><strong>Propulsion:</strong> Dual heavy-duty side treads with deployable center stabilizing caster.</li>
      <li><strong>Sensor Suite:</strong> 360° rotating radar eye, acoustic scanner, and holographic emitter.</li>
      <li><strong>Vocal Synthesis:</strong> Real-time synthesized acoustic binary beeps, trills, and whistles.</li>
    </ul>
  </div>
</div>

<h2>4.2 Multi-Agent Kinematics & Autonomous Wandering AI</h2>
<p>
Both robots roam freely across the circular atrium floor using autonomous kinematic update loops:
</p>
<ul>
  <li><strong>Obstacle & Boundary Avoidance:</strong> The position vector <span class="math-inline">P⃗ = (x, z)</span> is monitored every frame. If the radial distance <span class="math-inline">√(x² + z²)</span> approaches the boundary radius (<span class="math-inline">R_bound = 14.5 m</span>), an inward steering acceleration vector is applied, reflecting the heading angle smoothly away from walls.</li>
  <li><strong>Mutual Discovery Protocol:</strong> If the Euclidean distance between R2-D2 and Pragyan drops below 1.8 meters, an interaction state activates. Both robots stop forward propulsion, rotate their yaws to face each other directly, and execute an interactive sequence: R2-D2 chirps excitedly and rotates its radar dome, while Pragyan cycles its green stereo navcam illumination LED. After 2.8 seconds, both robots resume independent randomized patrol routes.</li>
</ul>

<h2>4.3 Dynamic Camera Tracking & Orbit Follow System</h2>
<p>
When a student clicks or taps either robot, the simulator activates an intelligent camera tracking system:
</p>
<ol>
  <li><strong>Smooth Cubic Glide:</strong> The camera position <span class="math-inline">C⃗</span> and OrbitControls target <span class="math-inline">T⃗</span> interpolate over a 1.1-second duration using a smooth cubic in-out easing function, bringing the camera to an eye-level vantage point (2.8 m for R2-D2, 2.5 m for Pragyan).</li>
  <li><strong>Translational Delta Following:</strong> Once locked, the camera computes the moving robot's per-frame displacement vector:
  <div class="math-display">ΔP⃗ = P⃗_robot(t) - T⃗(t) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; T⃗ ← T⃗ + α ΔP⃗ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; C⃗ ← C⃗ + α ΔP⃗</div>
  where <span class="math-inline">α = min(1.0, 10 · Δt)</span>. Because the exact same delta is added to both the camera position and the target, the student's chosen viewing distance and orbit angle are preserved without camera jitter.</li>
  <li><strong>Interactive Orbit Preservation:</strong> Panning is disabled during follow to prevent target drift, but the student retains full freedom to left-click drag or touch-swipe to orbit 360° around the moving robot while it travels.</li>
  <li><strong>Universal Deselection:</strong> Clicking outside, clicking the close button on the HUD drawer, or selecting any station immediately stops camera follow without snapping or jumping.</li>
</ol>

<!-- ═══════════════════════════════════════════════════════
     CHAPTER 5: THE GREAT SCIENTISTS
═══════════════════════════════════════════════════════ -->
<div class="page-break"></div>

<h1>5. The Great Scientists Hall of Fame: Biographical Profiles</h1>

<div class="grid-2">
  <div class="figure-card">
    <img src="${imgKalam}" alt="Dr. APJ Abdul Kalam Exhibit">
    <div class="figure-caption">
      <strong>Figure 5.1:</strong> Dr. A.P.J. Abdul Kalam's 3D wall exhibit and biographical telemetry drawer.
    </div>
  </div>
  <div class="figure-card">
    <img src="${imgNewton}" alt="Sir Isaac Newton Exhibit">
    <div class="figure-caption">
      <strong>Figure 5.2:</strong> Sir Isaac Newton's exhibit showcasing classical mechanics and gravitation.
    </div>
  </div>
</div>

<p>
Along the rotunda perimeter walls hang interactive gilded glass portraits of the world's most transformative scientific pioneers. Clicking any portrait displays their biographical summary, key discoveries, and philosophical philosophy:
</p>

<h3>1. Dr. A.P.J. Abdul Kalam (1931 – 2015)</h3>
<ul>
  <li><strong>Title:</strong> Missile Man of India & 11th President of India (2002–2007).</li>
  <li><strong>Field:</strong> Aerospace Engineering, Rocket Propulsion & Satellite Launch Systems.</li>
  <li><strong>Major Inventions:</strong> Project Director of SLV-3 (India's first satellite launch vehicle); guided missile program architect (Agni & Prithvi); carbon-composite re-entry heat shields; co-inventor of the low-cost Kalam-Raju cardiac stent.</li>
  <li><strong>Famous Quote:</strong> <em>“Dream is not that which you see while sleeping, it is something that does not let you sleep. To succeed in your mission, you must have single-minded devotion to your goal.”</em></li>
</ul>

<h3>2. Sir Isaac Newton (1643 – 1727)</h3>
<ul>
  <li><strong>Title:</strong> Master of Classical Mechanics & Fellow of Trinity College, Cambridge.</li>
  <li><strong>Field:</strong> Physics, Mathematics, Celestial Gravitation & Optics.</li>
  <li><strong>Major Inventions:</strong> Three Laws of Motion; Universal Law of Gravitation (<span class="math-inline">F = G m₁m₂ / r²</span>); invention of Infinitesimal Calculus; optical prism dispersion proving white light comprises all visible colors; the reflecting telescope.</li>
  <li><strong>Famous Quote:</strong> <em>“If I have seen further it is by standing on the shoulders of Giants.”</em></li>
</ul>

<h3>3. Marie Skłodowska-Curie (1867 – 1934)</h3>
<ul>
  <li><strong>Title:</strong> Pioneer of Radioactivity; Double Nobel Laureate (Physics 1903, Chemistry 1911).</li>
  <li><strong>Field:</strong> Nuclear Physics & Radiochemistry.</li>
  <li><strong>Major Inventions:</strong> Coined the term <em>Radioactivity</em>; isolated and discovered Radium (Ra, Z=88) and Polonium (Po, Z=84); pioneered mobile X-ray units ("Petites Curies") during World War I; only person to win Nobel Prizes in two distinct scientific disciplines.</li>
  <li><strong>Famous Quote:</strong> <em>“Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less.”</em></li>
</ul>

<h3>4. Albert Einstein (1879 – 1955)</h3>
<ul>
  <li><strong>Title:</strong> Nobel Laureate in Physics (1921); Theoretical Physicist.</li>
  <li><strong>Field:</strong> Theoretical Physics, Quantum Mechanics & Gravitation.</li>
  <li><strong>Major Inventions:</strong> Special Relativity (<span class="math-inline">E = mc²</span>); General Relativity (gravity as the curvature of 4D spacetime); theoretical explanation of the Photoelectric Effect proving light quantization (<span class="math-inline">E = hν</span>); explanation of Brownian motion confirming atomic existence.</li>
  <li><strong>Famous Quote:</strong> <em>“Imagination is more important than knowledge. For knowledge is limited, whereas imagination embraces the entire world, stimulating progress, giving birth to evolution.”</em></li>
</ul>

<div class="page-break"></div>

<h3>5. Sir C.V. Raman (1888 – 1970)</h3>
<ul>
  <li><strong>Title:</strong> Nobel Laureate in Physics (1930); Founder of Indian Academy of Sciences.</li>
  <li><strong>Field:</strong> Molecular Light Scattering, Acoustics & Spectroscopy.</li>
  <li><strong>Major Inventions:</strong> The Raman Effect (1928): discovered that when light traverses a transparent medium, a fraction of scattered photons undergoes frequency shifts corresponding to internal vibrational modes of the molecules. Pioneered non-destructive Raman spectroscopy, now essential across pharmacology, nanotechnology, and astronomy.</li>
  <li><strong>Famous Quote:</strong> <em>“The essence of science is independent thinking, hard work, and not equipment. I am the master of my failure. If I never fail how will I ever learn?”</em></li>
</ul>

<h3>6. Nikola Tesla (1856 – 1943)</h3>
<ul>
  <li><strong>Title:</strong> Pioneer of Electrical Engineering & Polyphase Power Systems.</li>
  <li><strong>Field:</strong> Electromagnetism, Alternating Current (AC) & High-Frequency Power.</li>
  <li><strong>Major Inventions:</strong> Polyphase Alternating Current (AC) electrical grid; the AC induction motor; the high-voltage resonant Tesla Coil; early pioneer of wireless radio transmission, wireless lighting, and remote radio control.</li>
  <li><strong>Famous Quote:</strong> <em>“If you want to find the secrets of the universe, think in terms of energy, frequency and vibration.”</em></li>
</ul>

<h3>7. Srinivasa Ramanujan (1887 – 1920)</h3>
<ul>
  <li><strong>Title:</strong> Fellow of the Royal Society, Cambridge; Mathematical Prodigy.</li>
  <li><strong>Field:</strong> Pure Mathematics, Analytic Number Theory, Infinite Series & Partition Functions.</li>
  <li><strong>Major Inventions:</strong> Discovered nearly 3,900 independent identities, infinite series for π, mock theta functions, and the Hardy-Ramanujan asymptotic partition formula <span class="math-inline">p(n)</span>. His insights now find applications in quantum field theory, string theory, and black hole thermodynamics.</li>
  <li><strong>Famous Quote:</strong> <em>“An equation for me has no meaning unless it expresses a thought of God.”</em></li>
</ul>

<h3>8. Satyendra Nath Bose (1894 – 1974)</h3>
<ul>
  <li><strong>Title:</strong> Pioneer of Quantum Statistics & Fellow of the Royal Society.</li>
  <li><strong>Field:</strong> Quantum Statistical Mechanics & Mathematical Physics.</li>
  <li><strong>Major Inventions:</strong> Derived Planck's blackbody radiation law without classical electrodynamics, formulating Bose-Einstein Statistics. Predicted the fifth state of matter—the Bose-Einstein Condensate (BEC). In his honor, Paul Dirac named all integer-spin subatomic particles (photons, gluons, Higgs) <em>Bosons</em>.</li>
  <li><strong>Famous Quote:</strong> <em>“If science is to flourish, it must be pursued for the love of truth and with absolute freedom of spirit.”</em></li>
</ul>

<h3>9. Dr. Homi J. Bhabha (1909 – 1966)</h3>
<ul>
  <li><strong>Title:</strong> Father of the Indian Nuclear Programme & Founding Director of TIFR.</li>
  <li><strong>Field:</strong> Nuclear Physics & Cosmic Ray Electrodynamics.</li>
  <li><strong>Major Inventions:</strong> Bhabha Scattering (electron-positron scattering cross-section); formulated India's unique three-stage nuclear power program optimized to utilize India's vast domestic thorium mineral reserves.</li>
  <li><strong>Famous Quote:</strong> <em>“A serious effort directed towards the development of nuclear energy will produce profound transformations in the whole economy of the country.”</em></li>
</ul>

<h3>10. Dr. Vikram Sarabhai (1919 – 1971)</h3>
<ul>
  <li><strong>Title:</strong> Father of the Indian Space Programme & Founder of ISRO.</li>
  <li><strong>Field:</strong> Cosmic Rays, Space Science & National Technological Development.</li>
  <li><strong>Major Inventions:</strong> Established ISRO in 1969; founded Thumba Equatorial Rocket Launching Station (TERLS); initiated India's first satellite project (Aryabhata, 1975); pioneered the Satellite Instructional Television Experiment (SITE) to broadcast educational television to 2,400 rural villages via NASA ATS-6 satellite.</li>
  <li><strong>Famous Quote:</strong> <em>“There are some who question the relevance of space activities in a developing nation. To us, there is no ambiguity of purpose. We must be second to none in the application of advanced technologies to the real problems of man and society.”</em></li>
</ul>

<!-- ═══════════════════════════════════════════════════════
     CHAPTER 6: SOFTWARE ARCHITECTURE
═══════════════════════════════════════════════════════ -->
<div class="page-break"></div>

<h1>6. Software Architecture, Programming Languages & WebGL Logic</h1>

<h2>6.1 Technology Stack & Programming Languages</h2>

<div class="grid-2">
  <div class="callout callout-tech">
    <div class="callout-title">Languages Used</div>
    <ul>
      <li><strong>JavaScript (ES2022+):</strong> 100% modular architecture using native ES Modules (<code>import/export</code>). Powers the scene graph, physics engines, HUD state management, and user interaction.</li>
      <li><strong>GLSL (OpenGL Shading Language):</strong> Vertex and fragment shaders executing directly on the GPU for high-performance visual effects.</li>
      <li><strong>HTML5 & CSS3:</strong> Modern semantic DOM structure, glassmorphic HUD styling, CSS custom properties, and responsive media queries.</li>
    </ul>
  </div>
  <div class="callout callout-tech">
    <div class="callout-title">Platforms & Engines</div>
    <ul>
      <li><strong>Three.js (r128+):</strong> Core WebGL 3D graphics library managing scenes, geometries, PBR materials, lights, and raycasting.</li>
      <li><strong>Vite:</strong> Next-generation frontend build tooling and Hot Module Replacement (HMR) development server.</li>
      <li><strong>EffectComposer:</strong> Postprocessing pipeline integrating <code>UnrealBloomPass</code> for photorealistic glow on lasers, sparks, and stars.</li>
      <li><strong>WebXR & Web Audio:</strong> Standard W3C web APIs for immersive VR and procedural sound synthesis.</li>
    </ul>
  </div>
</div>

<h2>6.2 Key Algorithmic Logic & Mathematical Engines</h2>

<h3>1. Solving Kepler's Equation for Eccentric Orbits (Newton-Raphson Method)</h3>
<p>
To position Halley's Comet on its high-eccentricity orbit (<span class="math-inline">e = 0.967</span>), the simulation must determine the eccentric anomaly <span class="math-inline">E</span> from the mean anomaly <span class="math-inline">M = (2π / T)(t - t₀)</span> by solving Kepler's transcendental equation:
<div class="math-display">f(E) = E - e · sin(E) - M = 0</div>
Because this equation cannot be solved algebraically, the JavaScript engine executes a Newton-Raphson iterative root-finding algorithm:
</p>
<pre><code>function solveKepler(M, e, tolerance = 1e-6) {
  let E = M; // Initial guess
  for (let i = 0; i &lt; 25; i++) {
    const f = E - e * Math.sin(E) - M;
    const fPrime = 1.0 - e * Math.cos(E);
    const delta = f / fPrime;
    E -= delta;
    if (Math.abs(delta) &lt; tolerance) break;
  }
  return E;
}</code></pre>
<p>
Once <span class="math-inline">E</span> is determined, the true anomaly <span class="math-inline">ν</span> and radial distance <span class="math-inline">r</span> are evaluated to position the 3D comet mesh:
<div class="math-display">r = a(1 - e · cos E) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; tan(ν / 2) = √[(1 + e) / (1 - e)] · tan(E / 2)</div>
</p>

<h3>2. Procedural GLSL Plasma Filament Shader</h3>
<p>
The plasma filaments inside the Physics globe are computed on the GPU using a 3D simplex noise function that perturbs an electric discharge arc in real time:
</p>
<pre><code>// Fragment Shader snippet: Glowing plasma dielectric filament
uniform float uTime;
varying vec3 vNormal;
varying vec3 vWorldPosition;

void main() {
  vec3 viewDir = normalize(cameraPosition - vWorldPosition);
  float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 3.0);
  
  // High-frequency procedural noise modulation
  float noise = snoise(vWorldPosition * 4.0 + vec3(0.0, uTime * 2.5, 0.0));
  float arcIntensity = smoothstep(0.3, 0.8, noise) + fresnel * 1.5;
  
  vec3 coreColor = vec3(0.9, 0.4, 1.0);  // High-energy violet
  vec3 glowColor = vec3(0.0, 0.9, 1.0);  // Outer cyan corona
  vec3 finalColor = mix(glowColor, coreColor, arcIntensity);
  
  gl_FragColor = vec4(finalColor * (arcIntensity + 0.2), arcIntensity * 0.9);
}</code></pre>

<div class="page-break"></div>

<h3>3. Real-Time Camera Follow & Delta Offset Preservation</h3>
<p>
When following moving robots across the atrium floor, the camera maintains constant relative distance without fighting OrbitControls:
</p>
<pre><code>// robotTelemetry.js: Frame-by-frame follow logic
function update(dt) {
  if (!isTrackingCamera || !currentTarget) return;

  const worldPos = new THREE.Vector3();
  currentTarget.group.getWorldPosition(worldPos);
  const targetLookAt = new THREE.Vector3(worldPos.x, worldPos.y + 0.75, worldPos.z);

  // Compute delta between robot's actual position and current look-at target
  const delta = targetLookAt.clone().sub(controls.target);
  const followFactor = Math.min(1.0, dt * 10.0);
  const stepDelta = delta.multiplyScalar(followFactor);

  // Translate BOTH the target and the camera by the identical delta vector
  controls.target.add(stepDelta);
  camera.position.add(stepDelta);
  controls.update();

  // Enforce room physical clamping to prevent wall or floor breaches
  enforceRoomBoundaries(camera, controls);
}</code></pre>

<h3>4. Gyroscopic Horizon Counter-Rotation Matrix</h3>
<p>
On mobile phones and iPads, whether held in landscape, portrait, or portrait-orientation-locked mode, the 3D holographic cards must remain readable and parallel to the real floor horizon. The engine reads orientation angles (<span class="math-inline">α, β, γ</span>) from <code>DeviceOrientationEvent</code>, constructs a rotation matrix <span class="math-inline">R</span>, and applies the inverse roll <span class="math-inline">θ_counter</span> to UI billboarding canvases:
<div class="math-display">R = R_z(α) R_x(β) R_y(γ) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; v⃗_up = R · (0, 1, 0)ᵀ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; θ_counter = -atan2(v_{up, x}, v_{up, y})</div>
</p>

<!-- ═══════════════════════════════════════════════════════
     CHAPTER 7: LAB ACTIVITIES & QUESTIONS
═══════════════════════════════════════════════════════ -->
<div class="page-break"></div>

<h1>7. High School Inquiry Lab Activities & Assignments</h1>

<p>
These structured laboratory activities are designed for high school teachers to assign directly to students using the Vizon simulation platform:
</p>

<div class="callout callout-experiment">
  <div class="callout-title">Laboratory Exercise 1: Physics — Plasma Frequency & Gas Dielectric Limits</div>
  <p><strong>Objective:</strong> Determine how electrical impedance and capacitive coupling affect spark filamentation.</p>
  <p><strong>Procedure:</strong></p>
  <ol>
    <li>Navigate to the Physics Pod. Click and hold the cursor at varying positions on the glass globe.</li>
    <li>Use the HUD sliders to reduce spark gap frequency from <span class="math-inline">40 kHz</span> to <span class="math-inline">10 kHz</span>. Observe filament count and intensity.</li>
    <li>Record the voltage threshold where individual discrete filaments collapse into a diffuse Townsend glow.</li>
  </ol>
  <p><strong>Analysis Questions:</strong></p>
  <ul>
    <li>Why does placing your hand on the glass pull the electric arc directly toward your finger? (Hint: Consider the dielectric constant of glass <span class="math-inline">κ ≈ 4.7</span> vs air <span class="math-inline">κ ≈ 1.0</span>).</li>
    <li>Why are high-frequency AC currents safe to touch on low-power plasma globes even when driven at several thousand volts? (Explain in terms of the skin effect and sensory nerve depolarization frequencies).</li>
  </ul>
</div>

<div class="callout callout-experiment">
  <div class="callout-title">Laboratory Exercise 2: Chemistry — Flame Emission Spectroscopy of Unknown Salts</div>
  <p><strong>Objective:</strong> Calculate atomic transition energy <span class="math-inline">ΔE</span> from measured wavelength <span class="math-inline">λ</span>.</p>
  <p><strong>Procedure:</strong></p>
  <ol>
    <li>Navigate to the Chemistry Pod. Select the Copper (<span class="math-inline">CuCl₂</span>) flame test.</li>
    <li>Inspect the optical emission spectrometer readout. Record the dominant wavelength (<span class="math-inline">λ = 510.5 nm</span>).</li>
    <li>Repeat for Sodium (<span class="math-inline">589.0 nm</span>) and Potassium (<span class="math-inline">404.4 nm</span>).</li>
  </ol>
  <p><strong>Mathematical Calculation:</strong></p>
  <p>Using Planck's constant <span class="math-inline">h = 6.626 × 10⁻³⁴ J·s</span> and the speed of light <span class="math-inline">c = 3.0 × 10⁸ m/s</span>, calculate the energy of a single emitted photon in Electron-Volts (<span class="math-inline">1 eV = 1.602 × 10⁻¹⁹ J</span>):</p>
  <div class="math-display">ΔE = hc / λ = [(6.626 × 10⁻³⁴)(3.0 × 10⁸)] / [λ × 10⁻⁹ × 1.602 × 10⁻¹⁹] eV</div>
</div>

<div class="callout callout-experiment">
  <div class="callout-title">Laboratory Exercise 3: Astronomy — Verification of Kepler's Third Law</div>
  <p><strong>Objective:</strong> Mathematically prove <span class="math-inline">T² / a³ = constant</span> using simulation telemetry.</p>
  <p><strong>Procedure:</strong> Complete the following table by clicking each planet in the Astronomy Orrery:</p>
  <table>
    <thead>
      <tr>
        <th>Planet</th>
        <th>Semi-Major Axis a (AU)</th>
        <th>Orbital Period T (Earth Years)</th>
        <th>a³</th>
        <th>T²</th>
        <th>Ratio T² / a³</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Mercury</td><td>0.387</td><td>0.241</td><td>0.058</td><td>0.058</td><td>1.000</td></tr>
      <tr><td>Earth</td><td>1.000</td><td>1.000</td><td>1.000</td><td>1.000</td><td>1.000</td></tr>
      <tr><td>Mars</td><td>1.524</td><td>1.881</td><td>3.539</td><td>3.538</td><td>1.000</td></tr>
      <tr><td>Jupiter</td><td>5.204</td><td>11.86</td><td>140.94</td><td>140.66</td><td>0.998</td></tr>
      <tr><td>Neptune</td><td>30.07</td><td>164.8</td><td>27,190</td><td>27,159</td><td>0.999</td></tr>
    </tbody>
  </table>
</div>

<div class="callout callout-experiment">
  <div class="callout-title">Laboratory Exercise 4: Aerospace Engineering — Payload vs Staging Ratio</div>
  <p><strong>Objective:</strong> Analyze the mass fractions of ISRO's PSLV vs LVM3.</p>
  <p><strong>Question:</strong> The LVM3 liftoff mass is 640 tonnes and delivers 8,000 kg to Low Earth Orbit. Calculate its payload mass fraction:
  <div class="math-display">Payload Fraction = (m_payload / m_liftoff) × 100% = (8,000 / 640,000) × 100% = 1.25%</div>
  Explain why even modern multi-stage rockets dedicate more than 98% of their entire launch mass purely to propellant and propellant tank structures.</p>
</div>

</body>
</html>`;

const tempHtmlPath = path.join(artifactDir, 'vizon_guide_temp.html');
fs.writeFileSync(tempHtmlPath, htmlContent);
console.log('Updated HTML file written to:', tempHtmlPath);

(async () => {
  console.log('Launching headless Chromium to render updated PDF...');
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security', '--allow-file-access-from-files'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600 });

  const fileUrl = 'file:///' + tempHtmlPath.replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: 'load', timeout: 30000 });

  console.log('Generating high-resolution PDF...');
  await page.pdf({
    path: outputWorkspacePdf,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '16mm',
      bottom: '16mm',
      left: '14mm',
      right: '14mm',
    },
    displayHeaderFooter: false,
  });

  console.log('PDF rendered successfully to workspace:', outputWorkspacePdf);
  fs.copyFileSync(outputWorkspacePdf, outputArtifactPdf);
  console.log('PDF copied to artifact directory:', outputArtifactPdf);

  await browser.close();

  const stats = fs.statSync(outputWorkspacePdf);
  console.log(`COMPLETE: Refined PDF created successfully! Size: ${(stats.size / 1024 / 1024).toFixed(2)} MB (${stats.size} bytes).`);
})();
