// src/environment/scientistTelemetry.js — Rich Biographical & Scientific Telemetry UI for World & Indian Pioneers
import * as THREE from 'three';
import { isMobileOrTablet, getViewportRoot } from '../ui/deviceOrientation.js';

export const SCIENTIST_DATA = {
  kalam: {
    id: 'kalam',
    name: 'DR. A.P.J. ABDUL KALAM',
    fullName: 'Avul Pakir Jainulabdeen Abdul Kalam',
    honorific: 'Missile Man of India & 11th President of India (2002–2007)',
    category: 'INDIAN SCIENTIFIC PIONEER',
    lifespan: '1931 – 2015',
    field: 'Aerospace Engineering & Rocket Propulsion',
    almaMater: 'Madras Institute of Technology (MIT)',
    recognition: 'Bharat Ratna (1997), Padma Vibhushan (1990)',
    accentColor: '#00e5ff',
    keyInventions:
      'Architect of SLV-3 (India’s first Satellite Launch Vehicle); Guided Missile Program (Agni & Prithvi); Carbon-Composite Re-Entry Heat Shields; Kalam-Raju Stent for affordable cardiac care.',
    famousQuote:
      '“Dream is not that which you see while sleeping, it is something that does not let you sleep. To succeed in your mission, you must have single-minded devotion to your goal.”',
    biography:
      'Widely revered as the "People’s President", Dr. Kalam was the visionary architect of India’s indigenous aerospace and missile launch systems. As Project Director at ISRO, he led the historic SLV-3 mission that placed the Rohini satellite in orbit in 1980. He later spearheaded the Integrated Guided Missile Development Programme (DRDO) and dedicated his post-presidency to educating and inspiring millions of youth toward scientific innovation and national self-reliance.',
  },

  radhakrishnan: {
    id: 'radhakrishnan',
    name: 'DR. S. RADHAKRISHNAN',
    fullName: 'Sarvepalli Radhakrishnan',
    honorific: 'Statesman, Philosopher & 2nd President of India (1962–1967)',
    category: 'INDIAN SCHOLAR & PHILOSOPHER',
    lifespan: '1888 – 1975',
    field: 'Epistemology, Ethics & Comparative Philosophy',
    almaMater: 'Madras Christian College | Oxford Spalding Professor',
    recognition: 'Bharat Ratna (1954), Templeton Prize (1975)',
    accentColor: '#f59e0b',
    keyInventions:
      'Synthesis of Eastern Epistemology with Modern Scientific Rationality; Global UNESCO Intellectual Leadership; Inspiration for National Teachers’ Day (5th September).',
    famousQuote:
      '“The true teachers are those who help us think for ourselves. Knowledge gives power, but wisdom gives fullness. When we think we know, we cease to learn.”',
    biography:
      'One of the 20th century’s most luminous thinkers, Dr. Radhakrishnan illuminated the vital connection between scientific empirical inquiry and ethical humanism. As a distinguished Spalding Professor of Eastern Religions and Ethics at the University of Oxford, he built profound bridges between Western scientific logic and Eastern philosophical wisdom, championing higher education, intellectual curiosity, and freedom of thought across global forums.',
  },

  raman: {
    id: 'raman',
    name: 'SIR C.V. RAMAN',
    fullName: 'Chandrasekhara Venkata Raman',
    honorific: 'Nobel Laureate in Physics (1930)',
    category: 'INDIAN SCIENTIFIC PIONEER',
    lifespan: '1888 – 1970',
    field: 'Optics, Molecular Light Scattering & Spectroscopy',
    almaMater: 'Presidency College, Chennai (University of Madras)',
    recognition: 'Nobel Prize in Physics (1930), Bharat Ratna (1954)',
    accentColor: '#38bdf8',
    keyInventions:
      'The Raman Effect (Inelastic scattering of photons by molecular vibrations); Raman Spectroscopy (Fundamental tool in molecular crystallography, chemistry & medicine).',
    famousQuote:
      '“The essence of science is independent thinking, hard work, and not equipment. I am the master of my failure. If I never fail how will I ever learn?”',
    biography:
      'Sir C.V. Raman was the first Asian scientist to receive the Nobel Prize in Physics for his 1928 discovery that light scattered by molecules undergoes frequency shifts corresponding to internal molecular energy levels. This phenomenon, known globally as the Raman Effect, revolutionized non-destructive chemical analysis and crystallography. He founded the Indian Academy of Sciences and the Raman Research Institute in Bangalore.',
  },

  ramanujan: {
    id: 'ramanujan',
    name: 'SRINIVASA RAMANUJAN',
    fullName: 'Srinivasa Ramanujan Aiyangar',
    honorific: 'Fellow of the Royal Society, Cambridge',
    category: 'INDIAN SCIENTIFIC PIONEER',
    lifespan: '1887 – 1920',
    field: 'Pure Mathematics, Analytic Number Theory & Infinite Series',
    almaMater: 'Trinity College, Cambridge (Collaborated with G.H. Hardy)',
    recognition: 'Fellow of the Royal Society (1918), Trinity Fellow (1918)',
    accentColor: '#10b981',
    keyInventions:
      'Ramanujan Theta Functions; Mock Modular Forms; Highly Composite Numbers; Rapidly Convergent Infinite Series for π; Hardy-Ramanujan Asymptotic Partition Formula p(n).',
    famousQuote:
      '“An equation for me has no meaning unless it expresses a thought of God. It is impossible to set value on work which is entirely original and of extraordinary depth.”',
    biography:
      'An astonishing mathematical prodigy who, with minimal formal university training, independently discovered nearly 3,900 identities, infinite series, and asymptotic formulas. Working with G.H. Hardy at Cambridge, Ramanujan introduced foundational concepts into partition theory and mock theta functions that today solve deep problems in string theory, statistical mechanics, and quantum black hole entropy.',
  },

  snbose: {
    id: 'snbose',
    name: 'SATYENDRA NATH BOSE',
    fullName: 'Satyendra Nath Bose',
    honorific: 'Pioneer of Quantum Statistics & Bosons',
    category: 'INDIAN SCIENTIFIC PIONEER',
    lifespan: '1894 – 1974',
    field: 'Quantum Statistical Mechanics & Theoretical Physics',
    almaMater: 'Presidency College, Kolkata',
    recognition: 'Padma Vibhushan (1954), Fellow of the Royal Society (1958)',
    accentColor: '#a855f7',
    keyInventions:
      'Bose-Einstein Statistics; Prediction of Bose-Einstein Condensate (5th state of matter); Naming namesake for all integer-spin subatomic particles: "Bosons".',
    famousQuote:
      '“If science is to flourish, it must be pursued for the love of truth and with absolute freedom of spirit. The mind must remain open to the surprising ways of nature.”',
    biography:
      'Renowned for providing the revolutionary derivation of Planck’s blackbody radiation law without reference to classical electrodynamics, founding the field of quantum statistics. Albert Einstein recognized the brilliance of Bose’s short paper, translated it into German, and expanded it to atomic gases. In recognition of his seminal work, Paul Dirac named all fundamental force-carrying particles (photons, gluons, Higgs) "Bosons".',
  },

  bhabha: {
    id: 'bhabha',
    name: 'DR. HOMI J. BHABHA',
    fullName: 'Homi Jehangir Bhabha',
    honorific: 'Father of the Indian Nuclear Programme',
    category: 'INDIAN SCIENTIFIC PIONEER',
    lifespan: '1909 – 1966',
    field: 'Nuclear Physics & Cosmic Ray Electrodynamics',
    almaMater: 'Cambridge University (Gonville and Caius College)',
    recognition: 'Adams Prize (1942), Fellow of the Royal Society (1941)',
    accentColor: '#ef4444',
    keyInventions:
      'Bhabha Scattering (Relativistic electron-positron cross section in QED); Cascade Theory of Cosmic Ray Showers; India’s Three-Stage Nuclear Power Strategy (Thorium Cycle).',
    famousQuote:
      '“For the full industrialisation of any country, the vastest physical basis is atomic energy. Science does not simply solve problems; it builds the intellectual infrastructure of civilization.”',
    biography:
      'Visionary nuclear physicist who laid the institutional foundation of modern Indian science. He formulated the quantum relativistic cross-section for electron-positron scattering (Bhabha Scattering) and designed India’s innovative 3-stage nuclear energy program centered on tapping abundant indigenous thorium resources. He founded the Tata Institute of Fundamental Research (TIFR) and the Bhabha Atomic Research Centre (BARC).',
  },

  sarabhai: {
    id: 'sarabhai',
    name: 'DR. VIKRAM SARABHAI',
    fullName: 'Vikram Ambalal Sarabhai',
    honorific: 'Father of the Indian Space Programme (ISRO)',
    category: 'INDIAN SCIENTIFIC PIONEER',
    lifespan: '1919 – 1971',
    field: 'Cosmic Ray Astrophysics & Satellite Technology',
    almaMater: 'Cambridge University (Doctorate under Sir C.V. Raman)',
    recognition: 'Padma Bhushan (1966), Padma Vibhushan (Posthumous 1972)',
    accentColor: '#f97316',
    keyInventions:
      'Founding of ISRO; Thumba Equatorial Rocket Launching Station (TERLS); Physical Research Laboratory (PRL); Satellite Instructional Television Experiment (SITE); IIM Ahmedabad.',
    famousQuote:
      '“We must be second to none in the application of advanced technologies to the real problems of man and society. He who can listen to music in the midst of noise can achieve the greatest things.”',
    biography:
      'The visionary industrialist and scientist who founded India’s space program. Sarabhai firmly believed that developing nations must harness cutting-edge satellite and space technologies directly to empower rural education, telecommunications, agriculture, and cyclone warning. He founded ISRO, spearheaded the launch of India’s first satellite Aryabhata, and established world-class institutions including PRL and IIMA.',
  },

  jcbose: {
    id: 'jcbose',
    name: 'SIR JAGADISH CHANDRA BOSE',
    fullName: 'Jagadish Chandra Bose',
    honorific: 'Pioneer of Millimetre Radio Waves & Plant Biophysics',
    category: 'INDIAN SCIENTIFIC PIONEER',
    lifespan: '1858 – 1937',
    field: 'Microwave Optics, Wireless Telecom & Plant Neurobiology',
    almaMater: 'Christ’s College, Cambridge & University of London',
    recognition: 'Companion of the Star of India (1903), Knighthood (1917), FRS (1920)',
    accentColor: '#14b8a6',
    keyInventions:
      '60 GHz Millimetre-Wave Radio Apparatus; Semiconductor Galena Crystal Point-Contact Detector (Precursor to Diodes); Crescograph (Magnifying plant growth movements 10,000×).',
    famousQuote:
      '“The true laboratory is the mind, where behind all illusions we uncover the immutable laws of truth. In the pursuit of science, there is no barrier of race or country.”',
    biography:
      'A brilliant polymath who conducted groundbreaking experiments in 1895 generating and detecting 60 GHz microwave radiation, anticipating modern 5G and Wi-Fi by more than a century. Bose invented semiconductor crystal detectors and later pioneered plant electrophysiology using his ultra-sensitive Crescograph, demonstrating that living plant tissue exhibits electrical impulses and fatigue analogous to animal nerve cells.',
  },

  einstein: {
    id: 'einstein',
    name: 'ALBERT EINSTEIN',
    fullName: 'Albert Einstein',
    honorific: 'Nobel Laureate in Physics (1921)',
    category: 'GLOBAL SCIENTIFIC HERITAGE',
    lifespan: '1879 – 1955',
    field: 'Theoretical Physics & Relativistic Spacetime Geometry',
    almaMater: 'Federal Polytechnic School, Zurich (ETH) & University of Zurich',
    recognition: 'Nobel Prize in Physics (1921), Copley Medal (1925)',
    accentColor: '#eab308',
    keyInventions:
      'Special & General Theory of Relativity; Mass-Energy Equivalence (E = mc²); Photoelectric Effect (Light Quantum Hypothesis); Einstein Field Equations (Spacetime Curvature).',
    famousQuote:
      '“Imagination is more important than knowledge. For knowledge is limited, whereas imagination embraces the entire world, stimulating progress, giving birth to evolution.”',
    biography:
      'Widely regarded as the most influential physicist of the modern age. In his "Annus Mirabilis" of 1905, Einstein published four revolutionary papers introducing special relativity, the photon hypothesis, and mass-energy equivalence. In 1915, he completed General Relativity, demonstrating that gravitational forces arise from the geometrical warping of four-dimensional spacetime by mass and energy.',
  },

  newton: {
    id: 'newton',
    name: 'SIR ISAAC NEWTON',
    fullName: 'Sir Isaac Newton',
    honorific: 'Foundations of Modern Mathematical Physics',
    category: 'GLOBAL SCIENTIFIC HERITAGE',
    lifespan: '1643 – 1727',
    field: 'Classical Mechanics, Universal Gravitation & Optics',
    almaMater: 'Trinity College, Cambridge',
    recognition: 'President of the Royal Society (1703–1727), Knighthood (1705)',
    accentColor: '#60a5fa',
    keyInventions:
      'Three Fundamental Laws of Motion; Law of Universal Gravitation; Infinitesimal Calculus; Reflecting Telescope; Prismatic Dispersion of White Light Spectrum.',
    famousQuote:
      '“If I have seen further, it is by standing on the shoulders of giants. I do not know what I may appear to the world, but to myself I seem to have been only like a boy playing on the seashore.”',
    biography:
      'Newton’s 1687 masterpiece "Philosophiae Naturalis Principia Mathematica" laid the mathematical foundations of classical mechanics and universal gravitation. He proved that planetary motions and falling objects on Earth obey identical physical laws, invented calculus independently, and designed the reflecting telescope using curved parabolic mirrors.',
  },

  curie: {
    id: 'curie',
    name: 'MARIE SKŁODOWSKA CURIE',
    fullName: 'Maria Salomea Skłodowska-Curie',
    honorific: 'Two-Time Nobel Laureate (Physics 1903, Chemistry 1911)',
    category: 'GLOBAL SCIENTIFIC HERITAGE',
    lifespan: '1867 – 1934',
    field: 'Radiochemistry & Atomic Physics',
    almaMater: 'University of Paris (Sorbonne)',
    recognition: 'Nobel Prize in Physics (1903), Nobel Prize in Chemistry (1911)',
    accentColor: '#ec4899',
    keyInventions:
      'Discovery and Isolation of Radium and Polonium; Coined the term "Radioactivity"; Mobile Battlefield X-Ray Radiography Units ("Petites Curies") during World War I.',
    famousQuote:
      '“Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less. Be less curious about people and more curious about ideas.”',
    biography:
      'The first woman to win a Nobel Prize, the first person to win twice, and the only individual honored across two distinct scientific fields (Physics and Chemistry). Curie discovered the radioactive elements Polonium and Radium, developed rigorous methods for isolating radioactive isotopes, and pioneered the therapeutic medical applications of radiation in oncology.',
  },

  tesla: {
    id: 'tesla',
    name: 'NIKOLA TESLA',
    fullName: 'Nikola Tesla',
    honorific: 'Visionary Pioneer of Alternating Current & Electromagnetism',
    category: 'GLOBAL SCIENTIFIC HERITAGE',
    lifespan: '1856 – 1943',
    field: 'Electrical Engineering, High-Frequency AC & Resonant Circuits',
    almaMater: 'Graz University of Technology & Charles-Ferdinand University, Prague',
    recognition: 'Edison Medal (1916), Over 300 Global Patents in Electrical Power',
    accentColor: '#818cf8',
    keyInventions:
      'AC Polyphase Induction Motor; Tesla Resonant Transformer Coil; Rotating Magnetic Field Principle; Niagara Falls Hydroelectric Power System; Wireless Teleautomation.',
    famousQuote:
      '“If you want to find the secrets of the universe, think in terms of energy, frequency and vibration. The present is theirs; the future, for which I really worked, is mine.”',
    biography:
      'Visionary inventor whose pioneering work on alternating current (AC) electricity transformed human civilization and enabled modern global electrification. Tesla invented the brushless AC induction motor, patented polyphase power transmission, built high-frequency resonant transformers, and demonstrated wireless telecommunications and remote-controlled vessels.',
  },
};

/**
 * Creates the Scientist Exhibition Telemetry System.
 * When a scientist portrait plaque is clicked on the atrium wall:
 * 1. Floats a high-definition 3D holographic card beside the plaque facing the visitor.
 * 2. Connects the plaque to the card with a glowing neon leader line and illuminated frame reticle.
 * 3. Pops up a responsive 2D scientific telemetry HUD drawer (with desktop, mobile portrait bottom-sheet,
 *    and landscape side-drawer layouts matching the rocket data cards).
 *
 * @param {THREE.Group} parentGroup
 * @param {THREE.Camera} camera
 * @returns {Object}
 */
export function createScientistTelemetry(parentGroup, camera) {
  const telemetryGroup = new THREE.Group();
  telemetryGroup.name = 'ScientistTelemetryAnchorGroup';
  parentGroup.add(telemetryGroup);

  let activeScientist = null;
  let activeAnchor = null;
  const baseCardPos = new THREE.Vector3();

  // 1. 3D Floating Holographic Card (High-Definition 1024x640 Canvas)
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 640;
  const ctx = canvas.getContext('2d');

  const cardTexture = new THREE.CanvasTexture(canvas);
  cardTexture.minFilter = THREE.LinearFilter;
  cardTexture.magFilter = THREE.LinearFilter;

  const cardGeo = new THREE.PlaneGeometry(2.10, 1.31);
  const cardMat = new THREE.MeshBasicMaterial({
    map: cardTexture,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  const cardMesh = new THREE.Mesh(cardGeo, cardMat);
  cardMesh.name = 'Scientist3DTelemetryCard';
  cardMesh.userData = { isCardMesh: true, isScientistCard: true };
  cardMesh.visible = false;
  telemetryGroup.add(cardMesh);

  // Leader line & reticle ring connecting to scientist portrait
  const lineGeo = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0.5, 0.5, 0),
  ]);
  const lineMat = new THREE.LineBasicMaterial({
    color: 0x00e5ff,
    transparent: true,
    opacity: 0.88,
    linewidth: 2,
  });
  const leaderLine = new THREE.Line(lineGeo, lineMat);
  leaderLine.visible = false;
  telemetryGroup.add(leaderLine);

  const reticleMat = new THREE.MeshBasicMaterial({
    color: 0x00e5ff,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.9,
  });
  const reticleRing = new THREE.Mesh(
    new THREE.RingGeometry(0.12, 0.16, 32),
    reticleMat
  );
  reticleRing.visible = false;
  telemetryGroup.add(reticleRing);

  // 2. 2D Glassmorphic HUD Drawer (Identical rules and responsive layout to rocket cards)
  let hudContainer = document.getElementById('scientist-telemetry-hud');
  if (!hudContainer) {
    hudContainer = document.createElement('div');
    hudContainer.id = 'scientist-telemetry-hud';
    hudContainer.innerHTML = `
      <style>
        #scientist-telemetry-hud {
          position: fixed;
          bottom: 24px;
          right: -520px;
          width: 440px;
          max-width: calc(100vw - 32px);
          max-height: 82vh;
          overflow-y: auto;
          background: rgba(10, 14, 24, 0.95);
          border: 1px solid rgba(0, 229, 255, 0.35);
          border-left: 5px solid #00e5ff;
          border-radius: 14px;
          padding: 22px 24px;
          color: #e2e8f0;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          box-shadow: 0 16px 48px rgba(0, 0, 0, 0.8), 0 0 24px rgba(0, 229, 255, 0.2);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          transition: right 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
          opacity: 0;
          z-index: 9999;
          pointer-events: auto;
        }
        #scientist-telemetry-hud.active {
          right: 24px;
          opacity: 1;
        }

        /* ── PORTRAIT MODE (Phones & Tablets) ──
           Transforms the scientist data card into a bottom sheet drawer */
        @media (orientation: portrait), (max-width: 640px) and (orientation: portrait) {
          #scientist-telemetry-hud {
            bottom: 74px;
            left: 12px;
            right: 12px;
            top: auto;
            width: auto;
            max-width: calc(100% - 24px);
            max-height: 52vh;
            padding: 16px 18px;
            border-radius: 16px;
            transform: translateY(120%);
            transition: transform 0.38s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
          }
          #scientist-telemetry-hud.active {
            transform: translateY(0);
            right: 12px;
            opacity: 1;
          }
          .sci-title {
            font-size: 20px;
          }
          .sci-grid {
            grid-template-columns: 1fr 1fr;
            gap: 8px 10px;
            padding: 10px 12px;
          }
        }

        /* ── LANDSCAPE MODE (Phones, Tablets & iPads) ──
           Adapts into a landscape side-drawer on the right */
        @media (orientation: landscape) {
          #scientist-telemetry-hud {
            top: 12px;
            bottom: 58px;
            right: -520px;
            left: auto;
            width: 440px;
            max-width: calc(100% - 80px);
            max-height: calc(100% - 70px);
            padding: 14px 18px;
            border-radius: 14px;
            transform: none;
            transition: right 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
          }
          #scientist-telemetry-hud.active {
            right: 14px;
            opacity: 1;
          }
          .sci-title {
            font-size: 20px;
          }
          .sci-grid {
            grid-template-columns: 1fr 1fr;
            gap: 6px 10px;
            padding: 8px 12px;
            margin-bottom: 12px;
          }
        }

        body.vz-orientation-landscape #scientist-telemetry-hud {
          top: 12px;
          bottom: 58px;
          right: -520px;
          left: auto;
          width: 440px;
          max-width: calc(100% - 80px);
          max-height: calc(100% - 70px);
          padding: 14px 18px;
          border-radius: 14px;
          transform: none;
          transition: right 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
        }
        body.vz-orientation-landscape #scientist-telemetry-hud.active {
          right: 14px;
          opacity: 1;
        }

        .sci-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 14px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
          padding-bottom: 12px;
        }
        .sci-title-area {
          flex: 1;
        }
        .sci-title {
          font-size: 22px;
          font-weight: 900;
          letter-spacing: 0.04em;
          color: #ffffff;
          line-height: 1.15;
          margin-bottom: 4px;
        }
        .sci-sub {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #00e5ff;
          text-transform: uppercase;
        }
        .sci-close {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #e2e8f0;
          font-size: 16px;
          font-weight: bold;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
        .sci-close:hover {
          background: rgba(239, 68, 68, 0.4);
          border-color: #ef4444;
          color: #ffffff;
        }
        .sci-badge {
          display: inline-block;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.08em;
          padding: 3px 8px;
          border-radius: 4px;
          margin-bottom: 14px;
          text-transform: uppercase;
        }
        .sci-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px 14px;
          margin-bottom: 16px;
          background: rgba(0, 0, 0, 0.28);
          padding: 12px 14px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.06);
        }
        .sci-stat {
          display: flex;
          flex-direction: column;
        }
        .sci-stat-label {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: #94a3b8;
          text-transform: uppercase;
          margin-bottom: 2px;
        }
        .sci-stat-val {
          font-size: 12px;
          font-weight: 700;
          color: #f8fafc;
        }
        .sci-quote {
          font-size: 12px;
          line-height: 1.5;
          font-style: italic;
          color: #fbbf24;
          background: rgba(251, 191, 36, 0.08);
          padding: 10px 12px;
          border-radius: 6px;
          border-left: 3px solid #fbbf24;
          margin-bottom: 14px;
        }
        .sci-section {
          margin-bottom: 14px;
        }
        .sci-sec-title {
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: #38bdf8;
          text-transform: uppercase;
          margin-bottom: 4px;
        }
        .sci-sec-body {
          font-size: 12px;
          line-height: 1.55;
          color: #cbd5e1;
        }
      </style>
      <div class="sci-header">
        <div class="sci-title-area">
          <div class="sci-title" id="sci-title">DR. A.P.J. ABDUL KALAM</div>
          <div class="sci-sub" id="sci-sub">INDIAN SCIENTIFIC PIONEER</div>
        </div>
        <button class="sci-close" id="sci-close-btn" title="Close Scientist Info">✕</button>
      </div>
      <div id="sci-badge-container"></div>
      <div class="sci-grid">
        <div class="sci-stat">
          <span class="sci-stat-label">Field of Study</span>
          <span class="sci-stat-val" id="sci-field">Aerospace Engineering</span>
        </div>
        <div class="sci-stat">
          <span class="sci-stat-label">Lifespan</span>
          <span class="sci-stat-val" id="sci-lifespan">1931 – 2015</span>
        </div>
        <div class="sci-stat" style="grid-column: span 2;">
          <span class="sci-stat-label">Alma Mater / Affiliation</span>
          <span class="sci-stat-val" id="sci-alma">Madras Institute of Technology</span>
        </div>
        <div class="sci-stat" style="grid-column: span 2;">
          <span class="sci-stat-label">Key Honors / Distinction</span>
          <span class="sci-stat-val" id="sci-recognition">Bharat Ratna (1997)</span>
        </div>
      </div>
      <div class="sci-quote" id="sci-quote">“Dream is not that which you see while sleeping...”</div>
      <div class="sci-section">
        <div class="sci-sec-title">Key Scientific Inventions & Discoveries</div>
        <div class="sci-sec-body" id="sci-inventions">SLV-3, Agni & Prithvi Missile Systems...</div>
      </div>
      <div class="sci-section">
        <div class="sci-sec-title">Biographical Overview & Legacy</div>
        <div class="sci-sec-body" id="sci-bio">...</div>
      </div>
    `;
    const root = getViewportRoot();
    root.appendChild(hudContainer);

    document.getElementById('sci-close-btn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      deselect();
    });
  }

  function wrapText(context, text, x, y, maxWidth, lineHeight, maxLines = 4) {
    if (!text) return y;
    const words = text.split(' ');
    let line = '';
    let count = 0;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = context.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        count++;
        if (count >= maxLines) {
          context.fillText(line.trim() + '…', x, y);
          return y + lineHeight;
        }
        context.fillText(line, x, y);
        line = words[n] + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    context.fillText(line, x, y);
    return y + lineHeight;
  }

  function render3DCard(data) {
    ctx.clearRect(0, 0, 1024, 640);

    // Solid deep obsidian glassmorphic backdrop
    ctx.fillStyle = '#080c16';
    ctx.fillRect(0, 0, 1024, 640);

    // Accent border
    ctx.strokeStyle = data.accentColor;
    ctx.lineWidth = 3;
    ctx.strokeRect(4, 4, 1016, 632);

    // ── 1. Top Header Banner ──
    ctx.fillStyle = data.accentColor;
    ctx.fillRect(0, 0, 1024, 56);

    ctx.font = '900 24px "Inter", "Segoe UI", sans-serif';
    ctx.fillStyle = '#070b14';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(`★ SCIENTIST PROFILE // ${data.name}`, 24, 28);

    // Dismiss indicator
    ctx.font = 'bold 20px "Inter", sans-serif';
    ctx.fillStyle = '#070b14';
    ctx.textAlign = 'right';
    ctx.fillText('✕', 1000, 28);

    // ── 2. Sub-header (Category & Honorific) ──
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
    ctx.font = 'bold 14px "Inter", monospace';
    ctx.fillStyle = data.accentColor;
    ctx.fillText(`CATEGORY: ${data.category}   |   ERA: ${data.lifespan}`, 24, 84);

    // ── 3. Specifications 2-Column Grid ──
    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.fillRect(20, 98, 984, 114);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    ctx.strokeRect(20, 98, 984, 114);

    const col1X = 36;
    const col2X = 520;

    // Col 1
    ctx.font = 'bold 12px "Inter", monospace';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('FIELD OF STUDY:', col1X, 124);
    ctx.font = 'bold 13px "Inter", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(data.field, col1X + 130, 124);

    ctx.font = 'bold 12px "Inter", monospace';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('HONORS / PRIZES:', col1X, 156);
    ctx.font = 'bold 13px "Inter", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(data.recognition, col1X + 130, 156);

    // Col 2
    ctx.font = 'bold 12px "Inter", monospace';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('ALMA MATER:', col2X, 124);
    ctx.font = 'bold 13px "Inter", sans-serif';
    ctx.fillStyle = '#ffffff';

    let almaStr = data.almaMater;
    if (ctx.measureText(almaStr).width > 340) {
      while (ctx.measureText(almaStr + '…').width > 340 && almaStr.length > 5) {
        almaStr = almaStr.slice(0, -1);
      }
      almaStr = almaStr.trim() + '…';
    }
    ctx.fillText(almaStr, col2X + 120, 124);

    ctx.font = 'bold 12px "Inter", monospace';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('ROLE / TITLE:', col2X, 156);
    ctx.font = 'bold 13px "Inter", sans-serif';
    ctx.fillStyle = '#ffffff';

    let titleStr = data.honorific;
    if (ctx.measureText(titleStr).width > 340) {
      while (ctx.measureText(titleStr + '…').width > 340 && titleStr.length > 5) {
        titleStr = titleStr.slice(0, -1);
      }
      titleStr = titleStr.trim() + '…';
    }
    ctx.fillText(titleStr, col2X + 120, 156);

    // ── 4. Famous Quote Box ──
    ctx.fillStyle = 'rgba(251, 191, 36, 0.05)';
    ctx.fillRect(20, 222, 984, 92);
    ctx.strokeStyle = 'rgba(251, 191, 36, 0.28)';
    ctx.strokeRect(20, 222, 984, 92);

    ctx.font = 'bold 12px "Inter", monospace';
    ctx.fillStyle = '#fbbf24';
    ctx.fillText('WORDS OF WISDOM & PHILOSOPHY', 36, 242);

    ctx.font = 'italic 13px "Inter", sans-serif';
    ctx.fillStyle = '#fef08a';
    wrapText(ctx, data.famousQuote, 36, 264, 952, 20, 2);

    // ── 5. Key Discoveries Box ──
    ctx.fillStyle = 'rgba(0, 229, 255, 0.04)';
    ctx.fillRect(20, 324, 984, 114);
    ctx.strokeStyle = 'rgba(0, 229, 255, 0.22)';
    ctx.strokeRect(20, 324, 984, 114);

    ctx.font = 'bold 12px "Inter", monospace';
    ctx.fillStyle = '#00e5ff';
    ctx.fillText('KEY SCIENTIFIC INVENTIONS & BREAKTHROUGHS', 36, 344);

    ctx.font = '13px "Inter", sans-serif';
    ctx.fillStyle = '#e2e8f0';
    wrapText(ctx, data.keyInventions, 36, 366, 952, 20, 3);

    // ── 6. Biographical Overview Box ──
    ctx.fillStyle = 'rgba(56, 189, 248, 0.04)';
    ctx.fillRect(20, 448, 984, 142);
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.18)';
    ctx.strokeRect(20, 448, 984, 142);

    ctx.font = 'bold 12px "Inter", monospace';
    ctx.fillStyle = '#38bdf8';
    ctx.fillText('BIOGRAPHICAL OVERVIEW & LEGACY', 36, 468);

    ctx.font = '13px "Inter", sans-serif';
    ctx.fillStyle = '#cbd5e1';
    wrapText(ctx, data.biography, 36, 490, 952, 20, 4);

    // ── 7. Footer Prompt ──
    ctx.font = 'bold 12px "Inter", monospace';
    ctx.fillStyle = '#64748b';
    ctx.textAlign = 'center';
    ctx.fillText('✕ TOUCH CARD, PLAQUE OR EMPTY SPACE TO CLOSE', 512, 622);

    cardTexture.needsUpdate = true;
  }

  function selectScientist(arg1, arg2) {
    let anchor, scientistId;
    if (typeof arg1 === 'string') {
      scientistId = arg1;
      anchor = arg2;
    } else {
      anchor = arg1;
      scientistId = arg2;
    }

    const data = SCIENTIST_DATA[scientistId];
    if (!data) return;

    // Deselect other telemetry systems to maintain clean uncluttered UI
    if (typeof window !== 'undefined' && window.__sim) {
      window.__sim.rocketTelemetry?.deselect();
      window.__sim.astroCtx?.telemetry?.deselect();
      window.__sim.mobileRobots?.telemetry?.deselect();
    }

    // Auto-resolve anchor if not provided
    if (!anchor && typeof window !== 'undefined' && window.__sim?.wallExhibits) {
      const found = window.__sim.wallExhibits.exhibits?.find((e) => e.scientist.id === scientistId);
      if (found) anchor = found.anchor;
    }

    activeScientist = data;
    activeAnchor = anchor;

    // Render 3D card
    render3DCard(data);

    // Position 3D card directly in front of the plaque toward the atrium center
    const worldPos = new THREE.Vector3();
    anchor.getWorldPosition(worldPos);

    // Vector from portrait towards the center of the atrium (0, 3.4, 0)
    const toCenter = new THREE.Vector3(-worldPos.x, 0, -worldPos.z).normalize();
    // Perpendicular vector along perimeter wall
    const perp = new THREE.Vector3(-toCenter.z, 0, toCenter.x);

    // Position card forward and slightly to the side at comfortable visitor eye-level
    const cardPos = worldPos
      .clone()
      .add(toCenter.clone().multiplyScalar(2.20))
      .add(perp.clone().multiplyScalar(0.85))
      .add(new THREE.Vector3(0, 0.35, 0));

    baseCardPos.copy(cardPos);
    cardMesh.position.copy(cardPos);
    cardMesh.visible = true;

    // Position reticle ring at plaque center
    reticleRing.position.copy(worldPos).add(toCenter.clone().multiplyScalar(0.08));
    reticleRing.visible = true;

    // Connect leader line from plaque reticle to 3D card
    const pts = [reticleRing.position.clone(), cardMesh.position.clone()];
    leaderLine.geometry.setFromPoints(pts);
    lineMat.color.set(data.accentColor);
    reticleMat.color.set(data.accentColor);
    leaderLine.visible = true;

    // Update 2D telemetry HUD drawer
    const titleEl = document.getElementById('sci-title');
    const subEl = document.getElementById('sci-sub');
    const fieldEl = document.getElementById('sci-field');
    const lifespanEl = document.getElementById('sci-lifespan');
    const almaEl = document.getElementById('sci-alma');
    const recEl = document.getElementById('sci-recognition');
    const quoteEl = document.getElementById('sci-quote');
    const invEl = document.getElementById('sci-inventions');
    const bioEl = document.getElementById('sci-bio');

    if (titleEl) titleEl.textContent = data.name;
    if (subEl) subEl.textContent = `${data.category} // ${data.honorific}`;
    if (fieldEl) fieldEl.textContent = data.field;
    if (lifespanEl) lifespanEl.textContent = data.lifespan;
    if (almaEl) almaEl.textContent = data.almaMater;
    if (recEl) recEl.textContent = data.recognition;
    if (quoteEl) quoteEl.textContent = data.famousQuote;
    if (invEl) invEl.textContent = data.keyInventions;
    if (bioEl) bioEl.textContent = data.biography;

    const badgeContainer = document.getElementById('sci-badge-container');
    if (badgeContainer) {
      badgeContainer.innerHTML = `
        <span class="sci-badge" style="background: ${data.accentColor}22; color: ${data.accentColor}; border: 1px solid ${data.accentColor}66;">
          ● ${data.category}
        </span>
        <span class="sci-badge" style="background: rgba(255,255,255,0.08); color: #cbd5e1; border: 1px solid rgba(255,255,255,0.15); margin-left: 6px;">
          ${data.lifespan}
        </span>
      `;
    }

    hudContainer.style.borderLeftColor = data.accentColor;
    hudContainer.classList.add('active');
  }

  function deselect() {
    activeScientist = null;
    activeAnchor = null;
    cardMesh.visible = false;
    leaderLine.visible = false;
    reticleRing.visible = false;
    if (hudContainer) {
      hudContainer.classList.remove('active');
    }
  }

  function update(elapsed, dt) {
    if (!activeScientist || !cardMesh.visible || !camera) return;

    // Make 3D card and reticle face the active camera
    cardMesh.quaternion.copy(camera.quaternion);
    reticleRing.quaternion.copy(camera.quaternion);

    // Subtle gentle float without drift
    cardMesh.position.y = baseCardPos.y + Math.sin(elapsed * 2.0) * 0.04;

    // Update line connecting plaque reticle to card
    const pts = [reticleRing.position.clone(), cardMesh.position.clone()];
    leaderLine.geometry.setFromPoints(pts);

    // Pulse reticle ring
    const scale = 1.0 + Math.sin(elapsed * 4.0) * 0.08;
    reticleRing.scale.set(scale, scale, scale);
  }

  return {
    selectScientist,
    deselect,
    update,
    getActiveScientist: () => activeScientist,
    cardMesh,
  };
}
