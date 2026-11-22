// src/environment/rocketTelemetry.js — Rich Aerospace Datasets & Interactive Telemetry UI for Rockets
import * as THREE from 'three';

export const ROCKET_DATA = {
  // ── ISRO OPERATIONAL ──
  pslv: {
    id: 'pslv',
    name: 'PSLV',
    fullName: 'POLAR SATELLITE LAUNCH VEHICLE',
    operator: 'ISRO (INDIA)',
    category: 'ISRO OPERATIONAL',
    status: 'OPERATIONAL',
    statusColor: '#10b981',
    accentColor: '#00e5ff',
    height: '44.0 m (144.3 ft)',
    diameter: '2.8 m (9.2 ft)',
    liftOffMass: '320 tonnes (XL variant)',
    stages: '4 Stages (Solid / Liquid / Solid / Liquid)',
    payloadLeo: '1,750 kg to Sun-Synchronous Polar Orbit (600 km)',
    payloadGto: '1,425 kg to Sub-GTO',
    propulsion: 'PS1 Solid (HTPB) + 6 PSOM-XL strap-ons, PS2 Vikas Liquid (UDMH+N₂O₄), PS3 Solid, PS4 Dual Liquid (MMH+MON-3)',
    firstFlight: 'September 20, 1993 (59+ launches)',
    famousMissions: 'Chandrayaan-1 (2008), Mars Orbiter Mission / Mangalyaan (2013), Aditya-L1 (2023), World Record 104 Satellites in Single Flight (PSLV-C37, 2017).',
    description:
      'Widely revered as the "Workhorse of ISRO", PSLV is India\'s third-generation launch vehicle. Equipped with alternating solid and liquid propulsion stages, PSLV has established an internationally renowned track record for precision orbital injection, launching satellites from over 36 countries across polar, geosynchronous, and deep-space trajectories.',
  },

  lvm3: {
    id: 'lvm3',
    name: 'LVM3',
    fullName: 'LAUNCH VEHICLE MARK-3 (GSLV MK III)',
    operator: 'ISRO (INDIA)',
    category: 'ISRO OPERATIONAL',
    status: 'OPERATIONAL',
    statusColor: '#10b981',
    accentColor: '#f59e0b',
    height: '43.5 m (142.7 ft)',
    diameter: '4.0 m core / 5.0 m fairing',
    liftOffMass: '640 tonnes',
    stages: '3 Stages (Solid Boosters + Liquid Core + Cryogenic Upper Stage)',
    payloadLeo: '8,000 kg to Low Earth Orbit',
    payloadGto: '4,300 kg to Geosynchronous Transfer Orbit',
    propulsion: '2× S200 Solid Strap-ons (207 t solid each), L110 Core with 2× Vikas liquid engines, C25 Cryogenic Upper Stage (CE-20 engine, 200 kN thrust, LH₂+LOX)',
    firstFlight: 'December 18, 2014 (Experimental) / June 5, 2017 (Orbital)',
    famousMissions: 'Chandrayaan-2 (2019), Chandrayaan-3 (Historic Lunar South Pole Landing, 2023), OneWeb 72-satellite commercial constellations, Gaganyaan TV-D1 test.',
    description:
      'LVM3 is India’s heaviest operational orbital launch vehicle. Powered by the world’s second-largest solid rocket boosters (S200) and the indigenous CE-20 cryogenic engine, LVM3 achieved the historic Chandrayaan-3 lunar landing mission and is fully human-rated for India\'s upcoming Gaganyaan crewed spaceflights.',
  },

  gslv: {
    id: 'gslv',
    name: 'GSLV MK II',
    fullName: 'GEOSYNCHRONOUS SATELLITE LAUNCH VEHICLE',
    operator: 'ISRO (INDIA)',
    category: 'ISRO OPERATIONAL',
    status: 'OPERATIONAL',
    statusColor: '#10b981',
    accentColor: '#38bdf8',
    height: '51.7 m (169.6 ft)',
    diameter: '2.8 m core / 3.4 m fairing',
    liftOffMass: '414 tonnes',
    stages: '3 Stages (Solid Core + 4 Liquid Strap-ons + Liquid GS2 + Cryogenic CUS)',
    payloadLeo: '5,000 kg to Low Earth Orbit',
    payloadGto: '2,500 kg to Geosynchronous Transfer Orbit',
    propulsion: 'S139 Solid Core + 4× L40 Vikas Liquid Strap-ons, GS2 Vikas Liquid Stage, CUS indigenous Cryogenic Upper Stage (CE-7.5 engine, LH₂+LOX)',
    firstFlight: 'April 18, 2001 (Indigenous Cryogenic Mark-II operational since 2014)',
    famousMissions: 'GSAT communication fleet (GSAT-6, 7A, 9 South Asia Satellite), INSAT weather satellites, NVS-01 Navigation Satellite (NavIC constellation).',
    description:
      'GSLV Mk II solved one of India’s most critical aerospace challenges by demonstrating full mastery over the indigenous cryogenic upper stage (CE-7.5). Operating with liquid hydrogen and liquid oxygen at 20 Kelvin (-253°C), GSLV regularly deploys India’s national telecommunications and NavIC satellites.',
  },

  sounding: {
    id: 'sounding',
    name: 'SOUNDING ROCKET',
    fullName: 'ROHINI RH-200 METEOROLOGICAL ROCKET',
    operator: 'ISRO (INDIA)',
    category: 'ISRO OPERATIONAL',
    status: 'OPERATIONAL',
    statusColor: '#10b981',
    accentColor: '#ef4444',
    height: '3.5 m (11.5 ft)',
    diameter: '0.2 m (7.9 in)',
    liftOffMass: '108 kg',
    stages: '2 Stages (Solid / Solid)',
    payloadLeo: 'Suborbital Apogee: 70 – 80 km',
    payloadGto: 'N/A (Suborbital Sounding)',
    propulsion: 'Two-stage solid propellant rocket motor with high-energy composite fuel',
    firstFlight: 'Rohini series active since 1967; RH-200 launched over 1,700 times',
    famousMissions: 'Equatorial Electrojet aeronomy surveys, Indian Monsoon upper-atmospheric dynamics, atmospheric chemical payload releases from TERLS (Thumba).',
    description:
      'The Rohini Sounding Rocket program was the bedrock of India’s space journey, initiated under Dr. Vikram Sarabhai at Thumba in 1963. The reliable two-stage RH-200 is launched regularly from TERLS to probe equatorial mesosphere phenomena and upper-altitude weather systems.',
  },

  // ── ISRO RETIRED ──
  slv3: {
    id: 'slv3',
    name: 'SLV-3',
    fullName: 'SATELLITE LAUNCH VEHICLE-3',
    operator: 'ISRO (INDIA)',
    category: 'ISRO RETIRED',
    status: 'RETIRED (HISTORIC)',
    statusColor: '#f59e0b',
    accentColor: '#d97706',
    height: '22.7 m (74.5 ft)',
    diameter: '1.0 m (3.3 ft)',
    liftOffMass: '17 tonnes',
    stages: '4 Stages (All-Solid Propellant)',
    payloadLeo: '40 kg to Low Earth Orbit (300 km)',
    payloadGto: 'N/A',
    propulsion: '4 Solid propellant rocket motors (composite propellant with open-nozzle control)',
    firstFlight: 'July 18, 1980 (Historical orbital success placing Rohini RS-1 into space)',
    famousMissions: 'Rohini RS-1 (1980), RS-D1 (1981), RS-D2 (1983). Project Director: Dr. A.P.J. Abdul Kalam.',
    description:
      'India’s first sovereign satellite launch vehicle. Directed by Dr. A.P.J. Abdul Kalam, the historic launch of SLV-3 on July 18, 1980 catapulted India into the elite club of just six nations possessing independent orbital launch capability. SLV-3 laid the fundamental architecture for all subsequent Indian space vehicles.',
  },

  aslv: {
    id: 'aslv',
    name: 'ASLV',
    fullName: 'AUGMENTED SATELLITE LAUNCH VEHICLE',
    operator: 'ISRO (INDIA)',
    category: 'ISRO RETIRED',
    status: 'RETIRED',
    statusColor: '#f59e0b',
    accentColor: '#b45309',
    height: '24.0 m (78.7 ft)',
    diameter: '1.0 m core / 2.8 m booster span',
    liftOffMass: '41 tonnes',
    stages: '5 Stages (All-Solid, including 2 Strap-on Solid Boosters)',
    payloadLeo: '150 kg to 400 km circular Low Earth Orbit',
    payloadGto: 'N/A',
    propulsion: '5 Solid stages (2 Stage-0 strap-ons identical to core stage 1, bulbous payload fairing)',
    firstFlight: 'March 24, 1987 / Successful orbital injections in 1992 & 1994',
    famousMissions: 'SROSS-C (1992) and SROSS-C2 (1994) missions carrying celestial gamma-ray burst detectors and aeronomy payloads.',
    description:
      'Developed as an intermediate technology demonstrator, ASLV pioneered essential launch technologies including strap-on solid booster staging, bulbous payload fairings, canted nozzles, and closed-loop digital autopilot inertial guidance that paved the way directly for the PSLV.',
  },

  // ── ISRO UNDER DEVELOPMENT ──
  hrlv: {
    id: 'hrlv',
    name: 'HRLV / NGLV',
    fullName: 'HEAVY / HUMAN-RATED REUSABLE LAUNCH VEHICLE',
    operator: 'ISRO (INDIA)',
    category: 'ISRO UNDER DEVELOPMENT',
    status: 'UNDER DEVELOPMENT',
    statusColor: '#00e5ff',
    accentColor: '#00e5ff',
    height: '75.0 m (246 ft)',
    diameter: '5.4 m (17.7 ft)',
    liftOffMass: '700 tonnes',
    stages: '3 Stages (Reusable Methane-LOX Booster + Semi-cryo + Cryogenic)',
    payloadLeo: '20,000 – 30,000 kg to Low Earth Orbit',
    payloadGto: '10,000 kg to Geosynchronous Transfer Orbit',
    propulsion: 'Reusable first-stage booster with cluster of methalox (liquid methane + liquid oxygen) engines with grid fins & VTVL landing legs',
    firstFlight: 'Projected 2030 (Development approved by Government of India)',
    famousMissions: 'Bharatiya Antariksh Station (BAS modules), Indian Crewed Lunar Landing (2040), interplanetary deep-space cargo.',
    description:
      'HRLV / NGLV (Next Generation Launch Vehicle) is ISRO’s future heavy-lift reusable launch system. Featuring high-efficiency green methalox propulsion, vertical takeoff and vertical propulsive landing (VTVL), and a modular design, it will power India’s permanent space station and human missions to the Moon.',
  },

  sslv: {
    id: 'sslv',
    name: 'SSLV',
    fullName: 'SMALL SATELLITE LAUNCH VEHICLE',
    operator: 'ISRO / NSIL (INDIA)',
    category: 'ISRO UNDER DEVELOPMENT',
    status: 'UNDER DEVELOPMENT / ROLLOUT',
    statusColor: '#00e5ff',
    accentColor: '#38bdf8',
    height: '34.0 m (111.5 ft)',
    diameter: '2.0 m (6.6 ft)',
    liftOffMass: '120 tonnes',
    stages: '3 Solid Stages + Liquid Velocity Trimming Module (VTM)',
    payloadLeo: '500 kg to 500 km planar orbit / 300 kg to SSPO',
    payloadGto: 'N/A (Specialized SmallSat launcher)',
    propulsion: 'SS1, SS2, SS3 Solid Propellant stages + Liquid Velocity Trimming Module with multiple reaction thrusters',
    firstFlight: 'August 7, 2022 (D1) / February 10, 2023 (D2 Success) / SSLV-D3 (2024)',
    famousMissions: 'EOS-07 earth observation satellite, Janus-1 (USA), AzaadiSAT-2 student payload. Ready for full commercial transfer to Indian aerospace industry.',
    description:
      'SSLV is designed for ultra-rapid turnarounds, capable of being integrated and launched in under 72 hours by a compact operations crew. Aimed at commercial rideshare constellations, SSLV provides dedicated, low-cost access to space for micro, nano, and mini satellites.',
  },

  // ── INTERNATIONAL & COMMERCIAL PIONEERS ──
  apollo11: {
    id: 'apollo11',
    name: 'APOLLO 11 (SATURN V)',
    fullName: 'SATURN V SUPER HEAVY-LIFT LAUNCH VEHICLE',
    operator: 'NASA (USA)',
    category: 'INTERNATIONAL HISTORIC',
    status: 'HISTORIC (RETIRED)',
    statusColor: '#f59e0b',
    accentColor: '#eab308',
    height: '110.6 m (363 ft)',
    diameter: '10.1 m (33 ft)',
    liftOffMass: '2,970 tonnes (6.5 million lb)',
    stages: '3 Stages (S-IC + S-II + S-IVB) + Apollo CSM & Lunar Module + LES Tower',
    payloadLeo: '140,000 kg (310,000 lb) to Low Earth Orbit',
    payloadGto: '48,600 kg (107,100 lb) Trans-Lunar Injection (TLI)',
    propulsion: 'S-IC: 5× Rocketdyne F-1 engines (34.5 MN thrust, RP-1/LOX); S-II: 5× J-2 engines (LH₂/LOX); S-IVB: 1× J-2 engine (restartable)',
    firstFlight: 'November 9, 1967 (Apollo 4) / July 16, 1969 (Apollo 11 Moon Landing)',
    famousMissions: 'Apollo 11 (Neil Armstrong & Buzz Aldrin first humans on the Moon, July 20, 1969), Apollo 8 (First lunar orbit), Apollo 13, Skylab orbital space station.',
    description:
      'The most powerful launch vehicle ever brought to operational success in human history. Standing 110.6 meters tall and generating 34.5 Meganewtons of liftoff thrust, Saturn V remains the only spacecraft that has propelled human beings beyond Low Earth Orbit to land on another celestial world.',
  },

  falcon9: {
    id: 'falcon9',
    name: 'FALCON 9',
    fullName: 'FALCON 9 FULL THRUST (BLOCK 5)',
    operator: 'SPACEX (USA)',
    category: 'COMMERCIAL REUSABLE',
    status: 'OPERATIONAL',
    statusColor: '#10b981',
    accentColor: '#ffffff',
    height: '70.0 m (229.6 ft)',
    diameter: '3.7 m (12.1 ft)',
    liftOffMass: '549 tonnes',
    stages: '2 Stages (Reusable Booster + Expendable/Vacuum Second Stage)',
    payloadLeo: '22,800 kg (Expendable) / 17,500 kg (Drone ship landing recovery)',
    payloadGto: '8,300 kg (Expendable) / 5,500 kg (Reusable)',
    propulsion: 'Stage 1: 9× SpaceX Merlin 1D engines (RP-1/LOX, 7.6 MN thrust) with 4 titanium grid fins & 4 carbon landing legs; Stage 2: 1× Merlin Vacuum engine',
    firstFlight: 'June 4, 2010 (Over 350+ flights with 300+ booster landings)',
    famousMissions: 'NASA Commercial Crew astronaut launches to ISS, Starlink global broadband constellation, DART asteroid deflection probe, Europa Clipper launch support.',
    description:
      'The world\'s first orbital-class reusable rocket. Falcon 9 revolutionized global space economics through routine vertical propulsive booster recovery on ocean drone ships and landing pads, with individual boosters achieving over 20 successful flights each.',
  },

  dragon: {
    id: 'dragon',
    name: 'CREW DRAGON',
    fullName: 'SPACEX DRAGON 2 SPACECRAFT & TRUNK',
    operator: 'SPACEX / NASA (USA)',
    category: 'COMMERCIAL SPACECRAFT',
    status: 'OPERATIONAL',
    statusColor: '#10b981',
    accentColor: '#38bdf8',
    height: '8.1 m (26.7 ft) capsule + trunk',
    diameter: '4.0 m (13.0 ft)',
    liftOffMass: '12,500 kg',
    stages: 'Reusable Capsule Pressure Vessel + Unpressurized Trunk with Solar Array',
    payloadLeo: 'Crew: Up to 4 – 7 astronauts / 6,000 kg pressurized & trunk cargo',
    payloadGto: 'Orbital Autonomous Rendezvous & Soft Ocean Splashdown Recovery',
    propulsion: '16× Draco reaction control thrusters + 8× SuperDraco launch abort engines (hypergolic MMH/NTO with 71 kN thrust each)',
    firstFlight: 'March 2, 2019 (Demo-1) / May 30, 2020 (Demo-2 first crewed flight)',
    famousMissions: 'NASA Crew-1 through Crew-9 long-duration ISS expeditions, Inspiration4 (first all-civilian orbital mission), Polaris Dawn commercial spacewalk mission.',
    description:
      'The world’s first commercially developed orbital crew transport vehicle. Featuring touchscreen controls, fully autonomous rendezvous and docking to the International Space Station, PICA-X heat shield thermal protection, and quad-parachute water recovery.',
  },

  vikram1: {
    id: 'vikram1',
    name: 'VIKRAM-1',
    fullName: 'SKYROOT AEROSPACE VIKRAM-1',
    operator: 'SKYROOT AEROSPACE (INDIA)',
    category: 'INDIAN PRIVATE SPACE',
    status: 'OPERATIONAL TESTING / IMMINENT',
    statusColor: '#10b981',
    accentColor: '#f97316',
    height: '20.0 m (65.6 ft)',
    diameter: '1.7 m (5.6 ft)',
    liftOffMass: '30 tonnes',
    stages: '3 Solid Stages (Kalam Series) + 1 Liquid Upper Stage (Raman Engine)',
    payloadLeo: '480 kg to 500 km Low Inclination Orbit / 290 kg to SSPO',
    payloadGto: 'N/A (Dedicated SmallSat commercial launch)',
    propulsion: 'Kalam-1200, Kalam-250, Kalam-100 high-strength carbon composite solid motors + Raman 4× 3D-printed bi-propellant liquid upper stage',
    firstFlight: 'Suborbital precursor Vikram-S launched Nov 18, 2022 (Mission Prarambh)',
    famousMissions: 'Mission Prarambh (First privately developed rocket launched from India), upcoming orbital maiden test launch.',
    description:
      'Spearheading India’s private NewSpace revolution, Vikram-1 is an all-carbon-fiber multi-stage launch vehicle built by Skyroot Aerospace in Hyderabad. Equipped with state-of-the-art 3D-printed liquid engines (Raman) and solid rocket motors named after Dr. A.P.J. Abdul Kalam.',
  },

  vikram2: {
    id: 'vikram2',
    name: 'VIKRAM-2',
    fullName: 'SKYROOT AEROSPACE VIKRAM-2 (CRYOGENIC)',
    operator: 'SKYROOT AEROSPACE (INDIA)',
    category: 'INDIAN PRIVATE SPACE',
    status: 'UNDER DEVELOPMENT',
    statusColor: '#00e5ff',
    accentColor: '#06b6d4',
    height: '24.0 m (78.7 ft)',
    diameter: '1.7 m (5.6 ft)',
    liftOffMass: '38 tonnes',
    stages: 'Multi-stage with 3D-Printed Cryogenic Upper Stage (Dhawan Engine)',
    payloadLeo: '592 kg to 500 km Low Earth Orbit / 400 kg to SSPO',
    payloadGto: 'Multi-orbit satellite constellation injection',
    propulsion: 'Carbon composite solid booster stages + Dhawan-II indigenous 3D-printed Cryogenic Upper Stage (Liquid Methane LNG + Liquid Oxygen)',
    firstFlight: 'Target 2025–2026 (Dhawan-I and Dhawan-II cryogenic tests completed successfully)',
    famousMissions: 'Dedicated commercial small-satellite constellation deployments across multiple independent orbital inclinations.',
    description:
      'Vikram-2 represents the cutting edge of Indian private aerospace engineering, featuring the indigenous Dhawan-II cryogenic engine fueled by green liquefied natural gas (LNG) and liquid oxygen. The 3D-printed cryogenic upper stage enables multi-restart capabilities for complex multi-orbit satellite insertions.',
  },
};

/**
 * Creates and manages the interactive 3D Holographic Telemetry Card and 2D HUD Drawer for rockets.
 * @param {THREE.Group} parentGroup
 * @param {THREE.Camera} camera
 * @returns {{ selectRocket: Function, update: Function, deselect: Function }}
 */
export function createRocketTelemetry(parentGroup, camera) {
  const telemetryGroup = new THREE.Group();
  telemetryGroup.name = 'RocketTelemetryAnchorGroup';
  parentGroup.add(telemetryGroup);

  let activeRocket = null;
  let activeMesh = null;

  // 1. 3D Floating Holographic Card
  const canvas = document.createElement('canvas');
  canvas.width = 768;
  canvas.height = 420;
  const ctx = canvas.getContext('2d');

  const cardTexture = new THREE.CanvasTexture(canvas);
  cardTexture.minFilter = THREE.LinearFilter;
  cardTexture.magFilter = THREE.LinearFilter;

  const cardGeo = new THREE.PlaneGeometry(1.5, 0.82);
  const cardMat = new THREE.MeshBasicMaterial({
    map: cardTexture,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  const cardMesh = new THREE.Mesh(cardGeo, cardMat);
  cardMesh.visible = false;
  telemetryGroup.add(cardMesh);

  // Leader line & reticle ring connecting to rocket
  const lineGeo = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0.4, 0.4, 0),
  ]);
  const lineMat = new THREE.LineBasicMaterial({
    color: 0x00e5ff,
    transparent: true,
    opacity: 0.8,
  });
  const leaderLine = new THREE.Line(lineGeo, lineMat);
  leaderLine.visible = false;
  telemetryGroup.add(leaderLine);

  const reticleRing = new THREE.Mesh(
    new THREE.RingGeometry(0.08, 0.10, 32),
    new THREE.MeshBasicMaterial({ color: 0x00e5ff, side: THREE.DoubleSide, transparent: true, opacity: 0.85 })
  );
  reticleRing.visible = false;
  telemetryGroup.add(reticleRing);

  // 2. 2D Glassmorphic HUD Drawer
  let hudContainer = document.getElementById('rocket-telemetry-hud');
  if (!hudContainer) {
    hudContainer = document.createElement('div');
    hudContainer.id = 'rocket-telemetry-hud';
    hudContainer.innerHTML = `
      <style>
        #rocket-telemetry-hud {
          position: fixed;
          bottom: 24px;
          right: -480px;
          width: 440px;
          max-width: calc(100vw - 32px);
          max-height: 82vh;
          overflow-y: auto;
          background: rgba(10, 14, 24, 0.94);
          border: 1px solid rgba(0, 229, 255, 0.35);
          border-left: 5px solid #00e5ff;
          border-radius: 14px;
          padding: 22px 24px;
          color: #e2e8f0;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          box-shadow: 0 16px 48px rgba(0, 0, 0, 0.75), 0 0 24px rgba(0, 229, 255, 0.2);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          transition: right 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
          opacity: 0;
          z-index: 9999;
          pointer-events: auto;
        }
        #rocket-telemetry-hud.active {
          right: 24px;
          opacity: 1;
        }
        .rkt-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 14px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
          padding-bottom: 12px;
        }
        .rkt-title-area {
          flex: 1;
        }
        .rkt-title {
          font-size: 24px;
          font-weight: 900;
          letter-spacing: 0.05em;
          color: #ffffff;
          line-height: 1.1;
          margin-bottom: 4px;
        }
        .rkt-sub {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #00e5ff;
          text-transform: uppercase;
        }
        .rkt-close {
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
        .rkt-close:hover {
          background: rgba(239, 68, 68, 0.4);
          border-color: #ef4444;
          color: #ffffff;
        }
        .rkt-badge {
          display: inline-block;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.08em;
          padding: 3px 8px;
          border-radius: 4px;
          margin-bottom: 14px;
          text-transform: uppercase;
        }
        .rkt-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px 14px;
          margin-bottom: 16px;
          background: rgba(0, 0, 0, 0.25);
          padding: 12px 14px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.06);
        }
        .rkt-stat {
          display: flex;
          flex-direction: column;
        }
        .rkt-stat-label {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: #94a3b8;
          text-transform: uppercase;
          margin-bottom: 2px;
        }
        .rkt-stat-val {
          font-size: 12px;
          font-weight: 700;
          color: #f8fafc;
        }
        .rkt-section {
          margin-bottom: 14px;
        }
        .rkt-sec-title {
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: #38bdf8;
          text-transform: uppercase;
          margin-bottom: 4px;
        }
        .rkt-sec-body {
          font-size: 12px;
          line-height: 1.5;
          color: #cbd5e1;
        }
        .rkt-missions {
          font-size: 11px;
          line-height: 1.45;
          color: #fbbf24;
          background: rgba(251, 191, 36, 0.08);
          padding: 8px 10px;
          border-radius: 6px;
          border-left: 3px solid #fbbf24;
          margin-bottom: 14px;
        }
        @media (max-width: 600px) {
          #rocket-telemetry-hud {
            width: calc(100vw - 24px);
            bottom: 12px;
            right: -100vw;
            padding: 16px 18px;
          }
          #rocket-telemetry-hud.active {
            right: 12px;
          }
        }
      </style>
      <div class="rkt-header">
        <div class="rkt-title-area">
          <div class="rkt-title" id="rkt-title">PSLV</div>
          <div class="rkt-sub" id="rkt-sub">POLAR SATELLITE LAUNCH VEHICLE // ISRO</div>
        </div>
        <button class="rkt-close" id="rkt-close-btn" title="Close Telemetry">✕</button>
      </div>
      <div id="rkt-badge-container"></div>
      <div class="rkt-grid">
        <div class="rkt-stat">
          <span class="rkt-stat-label">Height</span>
          <span class="rkt-stat-val" id="rkt-height">44.0 m</span>
        </div>
        <div class="rkt-stat">
          <span class="rkt-stat-label">Diameter</span>
          <span class="rkt-stat-val" id="rkt-diameter">2.8 m</span>
        </div>
        <div class="rkt-stat">
          <span class="rkt-stat-label">Liftoff Mass</span>
          <span class="rkt-stat-val" id="rkt-mass">320 tonnes</span>
        </div>
        <div class="rkt-stat">
          <span class="rkt-stat-label">Stages</span>
          <span class="rkt-stat-val" id="rkt-stages">4 Stages</span>
        </div>
        <div class="rkt-stat" style="grid-column: span 2;">
          <span class="rkt-stat-label">Payload Capacity (LEO / Polar)</span>
          <span class="rkt-stat-val" id="rkt-payload-leo">1,750 kg to SSPO</span>
        </div>
        <div class="rkt-stat" style="grid-column: span 2;">
          <span class="rkt-stat-label">Payload Capacity (GTO)</span>
          <span class="rkt-stat-val" id="rkt-payload-gto">1,425 kg to GTO</span>
        </div>
      </div>
      <div class="rkt-section">
        <div class="rkt-sec-title">Propulsion Architecture</div>
        <div class="rkt-sec-body" id="rkt-propulsion">Stage 1 Solid, Stage 2 Vikas...</div>
      </div>
      <div class="rkt-section">
        <div class="rkt-sec-title">Key Missions & Flight Heritage</div>
        <div class="rkt-missions" id="rkt-missions">Chandrayaan-1, Mangalyaan, Aditya-L1...</div>
      </div>
      <div class="rkt-section">
        <div class="rkt-sec-title">Engineering Overview</div>
        <div class="rkt-sec-body" id="rkt-description">...</div>
      </div>
    `;
    document.body.appendChild(hudContainer);

    document.getElementById('rkt-close-btn').addEventListener('click', () => {
      deselect();
    });
  }

  function render3DCard(data) {
    ctx.clearRect(0, 0, 768, 420);

    // Dark glassmorphic backdrop
    ctx.fillStyle = 'rgba(8, 12, 22, 0.92)';
    ctx.fillRect(0, 0, 768, 420);

    // Neon border
    ctx.strokeStyle = data.accentColor;
    ctx.lineWidth = 3;
    ctx.strokeRect(4, 4, 760, 412);

    // Corner tech crosshairs
    const sz = 16;
    ctx.lineWidth = 4;
    // Top-left
    ctx.beginPath();
    ctx.moveTo(4, 4 + sz);
    ctx.lineTo(4, 4);
    ctx.lineTo(4 + sz, 4);
    ctx.stroke();
    // Top-right
    ctx.beginPath();
    ctx.moveTo(764 - sz, 4);
    ctx.lineTo(764, 4);
    ctx.lineTo(764, 4 + sz);
    ctx.stroke();

    // Top Header Banner
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(4, 4, 760, 60);

    ctx.fillStyle = data.accentColor;
    ctx.fillRect(4, 62, 760, 2);

    // Title
    ctx.font = '900 32px "Inter", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(data.name, 24, 34);

    // Status Pill
    ctx.textAlign = 'right';
    ctx.fillStyle = data.statusColor;
    ctx.font = 'bold 15px "Inter", monospace';
    ctx.fillText(`● [${data.status}]`, 744, 34);

    // Subtitle
    ctx.textAlign = 'left';
    ctx.font = 'bold 16px "Inter", monospace';
    ctx.fillStyle = data.accentColor;
    ctx.fillText(data.fullName, 24, 94);

    ctx.font = '14px "Inter", monospace';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(`OPERATOR: ${data.operator}`, 24, 124);

    // Key stats
    ctx.font = 'bold 15px "Inter", sans-serif';
    ctx.fillStyle = '#e2e8f0';
    ctx.fillText(`HEIGHT: ${data.height}`, 24, 160);
    ctx.fillText(`DIAMETER: ${data.diameter}`, 24, 190);
    ctx.fillText(`MASS: ${data.liftOffMass}`, 24, 220);
    ctx.fillText(`STAGES: ${data.stages}`, 24, 250);

    // Payload stats
    ctx.fillStyle = data.accentColor;
    ctx.fillText(`LEO / POLAR: ${data.payloadLeo}`, 24, 290);
    ctx.fillStyle = '#f8fafc';
    ctx.fillText(`GTO / TLI: ${data.payloadGto}`, 24, 320);

    // Footer
    ctx.font = 'italic 13px "Inter", sans-serif';
    ctx.fillStyle = '#64748b';
    ctx.fillText('CLICK MODEL TO VIEW COMPLETE SPECIFICATIONS DRAWER ➜', 24, 380);

    cardTexture.needsUpdate = true;
  }

  function selectRocket(mesh, rocketId) {
    const data = ROCKET_DATA[rocketId];
    if (!data) return;

    activeRocket = data;
    activeMesh = mesh;

    // Render 3D card
    render3DCard(data);

    // Position 3D card
    const worldPos = new THREE.Vector3();
    mesh.getWorldPosition(worldPos);

    // Position 3D card directly in front of the rocket toward the atrium center
    const toCenter = new THREE.Vector3(-worldPos.x, 0, -worldPos.z).normalize();
    // Offset card forward towards the visitor at comfortable eye-level
    const perp = new THREE.Vector3(-toCenter.z, 0, toCenter.x);
    const cardPos = worldPos
      .clone()
      .add(toCenter.clone().multiplyScalar(1.25))
      .add(perp.clone().multiplyScalar(0.70))
      .add(new THREE.Vector3(0, 2.30, 0));

    cardMesh.position.copy(cardPos);
    cardMesh.visible = true;

    // Position reticle ring at rocket mid-stage body
    reticleRing.position.copy(worldPos).add(new THREE.Vector3(0, 2.10, 0));
    reticleRing.visible = true;

    // Line from reticle to card
    const pts = [reticleRing.position.clone(), cardMesh.position.clone()];
    leaderLine.geometry.setFromPoints(pts);
    leaderLine.visible = true;

    // Update 2D HUD Drawer
    document.getElementById('rkt-title').textContent = data.name;
    document.getElementById('rkt-sub').textContent = `${data.fullName} // ${data.operator}`;
    document.getElementById('rkt-height').textContent = data.height;
    document.getElementById('rkt-diameter').textContent = data.diameter;
    document.getElementById('rkt-mass').textContent = data.liftOffMass;
    document.getElementById('rkt-stages').textContent = data.stages;
    document.getElementById('rkt-payload-leo').textContent = data.payloadLeo;
    document.getElementById('rkt-payload-gto').textContent = data.payloadGto;
    document.getElementById('rkt-propulsion').textContent = data.propulsion;
    document.getElementById('rkt-missions').textContent = data.famousMissions;
    document.getElementById('rkt-description').textContent = data.description;

    const badgeContainer = document.getElementById('rkt-badge-container');
    badgeContainer.innerHTML = `
      <span class="rkt-badge" style="background: ${data.statusColor}22; color: ${data.statusColor}; border: 1px solid ${data.statusColor}66;">
        ● ${data.status}
      </span>
      <span class="rkt-badge" style="background: rgba(255,255,255,0.08); color: #cbd5e1; border: 1px solid rgba(255,255,255,0.15); margin-left: 6px;">
        ${data.category}
      </span>
    `;

    hudContainer.style.borderLeftColor = data.accentColor;
    hudContainer.classList.add('active');
  }

  function deselect() {
    activeRocket = null;
    activeMesh = null;
    cardMesh.visible = false;
    leaderLine.visible = false;
    reticleRing.visible = false;
    hudContainer.classList.remove('active');
  }

  function update(elapsed, dt) {
    if (!activeRocket || !cardMesh.visible || !camera) return;

    // Ensure 3D card always faces the active camera
    cardMesh.lookAt(camera.position);
    reticleRing.lookAt(camera.position);

    // Subtle gentle float
    cardMesh.position.y += Math.sin(elapsed * 2.5) * 0.001;

    // Pulse reticle ring
    const scale = 1.0 + Math.sin(elapsed * 4.0) * 0.08;
    reticleRing.scale.set(scale, scale, scale);
  }

  return {
    selectRocket,
    deselect,
    update,
    getActiveRocket: () => activeRocket,
  };
}
