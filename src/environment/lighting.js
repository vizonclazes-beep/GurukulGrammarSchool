// src/environment/lighting.js — Multi-light studio rig & architectural accents
import * as THREE from 'three';
import {
  COLOR_WARM_WHITE,
  COLOR_COOL_WHITE,
  COLOR_CYAN_ACCENT,
  COLOR_VIOLET_ACCENT,
  COLOR_COVE_WARM,
  COLOR_COVE_AMBER,
  ATRIUM_RADIUS,
} from '../core/constants.js';

/**
 * Configures the balanced lighting setup for the off-white spaceship atrium:
 * calibrated key light with soft contact shadows, cool fill, subtle ambient, hemisphere gradient,
 * and indirect cove rim strips along ceiling ribs and wall seams.
 * @param {THREE.Scene} scene
 */
export function setupLighting(scene) {
  // ── 1. CALIBRATED KEY DIRECTIONAL LIGHT (WARM OFF-WHITE WITH SOFT SHADOWS) ──
  // Moderate intensity (1.05) prevents specular blowout on off-white matte/satin panels
  const keyLight = new THREE.DirectionalLight(COLOR_WARM_WHITE, 1.05);
  keyLight.position.set(12, 22, 10);
  keyLight.castShadow = true;

  // Shadow camera frustum & resolution
  const d = ATRIUM_RADIUS + 2;
  keyLight.shadow.camera.left = -d;
  keyLight.shadow.camera.right = d;
  keyLight.shadow.camera.top = d;
  keyLight.shadow.camera.bottom = -d;
  keyLight.shadow.camera.near = 1;
  keyLight.shadow.camera.far = 45;
  keyLight.shadow.mapSize.width = 1024;
  keyLight.shadow.mapSize.height = 1024;
  keyLight.shadow.bias = -0.0003;
  keyLight.shadow.normalBias = 0.02;

  scene.add(keyLight);

  // ── 2. RIM / FILL DIRECTIONAL LIGHT (BALANCED SKY BLUE) ──
  const fillLight = new THREE.DirectionalLight(COLOR_COOL_WHITE, 0.28);
  fillLight.position.set(-14, 15, -12);
  fillLight.castShadow = false;
  scene.add(fillLight);

  // ── 3. HEMISPHERE LIGHT (SOFT CALIBRATED HORIZON & OFF-WHITE GROUND BOUNCE) ──
  // sky: soft sky tint, ground: off-white bounce (illuminates ceiling dome softly from below)
  const hemiLight = new THREE.HemisphereLight(0xe6edf7, 0xd5d9e2, 0.50);
  hemiLight.position.set(0, 20, 0);
  scene.add(hemiLight);

  // ── 4. LOW AMBIENT BASE SCATTER ──
  const ambientLight = new THREE.AmbientLight(0x20242e, 0.25);
  scene.add(ambientLight);

  // ── 5. RECESSED INDIRECT COVE LIGHTS ALONG WALL SEAMS & PERIMETER ──
  const accentLightCount = 8;
  const accentRadius = ATRIUM_RADIUS - 0.9;

  for (let i = 0; i < accentLightCount; i++) {
    const angle = (i / accentLightCount) * Math.PI * 2;
    // Alternate subtle warm white and soft cyan/violet accents
    let color;
    if (i % 4 === 0) color = COLOR_COVE_WARM;
    else if (i % 4 === 1) color = COLOR_CYAN_ACCENT;
    else if (i % 4 === 2) color = COLOR_COVE_AMBER;
    else color = COLOR_VIOLET_ACCENT;

    // Placed in floor reveals to cast soft upward glow along recessed seams
    const accentLight = new THREE.PointLight(color, 0.85, 9.0, 1.8);
    accentLight.position.set(
      Math.cos(angle) * accentRadius,
      0.45,
      Math.sin(angle) * accentRadius
    );
    scene.add(accentLight);
  }

  // ── 6. UPPER CEILING RIB INDIRECT COVE LIGHTS ──
  // Placed in upper recessed cove perimeter to cast soft indirect uplight onto the ceiling vault
  const ceilingCoveCount = 8;
  const ceilingCoveRadius = 15.0;
  for (let i = 0; i < ceilingCoveCount; i++) {
    const angle = (i / ceilingCoveCount) * Math.PI * 2;
    const coveColor = i % 2 === 0 ? COLOR_COVE_WARM : COLOR_COVE_AMBER;
    const coveLight = new THREE.PointLight(coveColor, 0.85, 12.0, 1.7);
    coveLight.position.set(
      Math.cos(angle) * ceilingCoveRadius,
      7.75, // Placed on upper architectural ledge
      Math.sin(angle) * ceilingCoveRadius
    );
    scene.add(coveLight);
  }

  // ── 7. CENTRAL OCULUS DOWNLIGHT (SOFT FOCUSED HUB WASH) ──
  const oculusDownlight = new THREE.SpotLight(0xf4f7ff, 0.75, 18, Math.PI / 4.5, 0.45, 1.4);
  oculusDownlight.position.set(0, 11.5, 0);
  oculusDownlight.target.position.set(0, 0, 0);
  scene.add(oculusDownlight);
  scene.add(oculusDownlight.target);
}
