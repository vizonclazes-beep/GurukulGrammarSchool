// src/core/constants.js — Shared constants for the entire simulation
import * as THREE from 'three';

// ─── Layout ───
export const ATRIUM_RADIUS = 18;
export const ATRIUM_HEIGHT = 12;
export const FLOOR_Y = 0;
export const STATION_RADIUS = 12; // distance of stations from center

// Station angles (radians, counter-clockwise from +X)
export const STATION_ANGLES = {
  physics:    0,
  chemistry:  (2 * Math.PI) / 5,
  biology:    (2 * (2 * Math.PI)) / 5,
  mathematics:(3 * (2 * Math.PI)) / 5,
  astronomy:  (4 * (2 * Math.PI)) / 5,
};

// ─── Station positions ───
export function stationPosition(key) {
  const angle = STATION_ANGLES[key];
  return new THREE.Vector3(
    Math.cos(angle) * STATION_RADIUS,
    FLOOR_Y,
    Math.sin(angle) * STATION_RADIUS
  );
}

// ─── Camera ───
export const CAMERA_FOV = 50;
export const CAMERA_NEAR = 0.1;
export const CAMERA_FAR = 200;
export const SPAWN_POSITION = new THREE.Vector3(0, 3.2, 6.8);
export const SPAWN_TARGET = new THREE.Vector3(0, 1.8, 0);

// ─── Rendering & Post-Processing ───
export const MAX_PIXEL_RATIO = 2;
// Fine-tuned bloom parameters so only plasma filaments & holographic emitters bloom:
export const BLOOM_THRESHOLD = 0.88;
export const BLOOM_STRENGTH = 0.35;
export const BLOOM_RADIUS = 0.25;
export const SHADOW_MAP_SIZE = 1024;

// ─── Architectural Off-White & PBR Colors ───
// Off-white panel finish (sRGB ~0.80–0.83, never pure #FFFFFF to prevent clipping/glare)
export const COLOR_OFFWHITE_PANEL = new THREE.Color(0xE8EAEF);
export const COLOR_OFFWHITE_WALL  = new THREE.Color(0xEAECEF);
export const COLOR_OFFWHITE_CEIL  = new THREE.Color(0xE6E8EC);
export const COLOR_FLOOR_SATIN    = new THREE.Color(0xDFE2E8);
export const COLOR_POD_WHITE      = new THREE.Color(0xF2F4F7); // Light white matte non-reflecting pod finish

// Recessed panel reveal seams & bevel grooves (#1F242D to #2B303A)
export const COLOR_SEAM_GROOVE    = new THREE.Color(0x222630);
export const COLOR_PANEL_DARK     = new THREE.Color(0x1F242D);

// Hardware accents & high-specular trim
export const COLOR_ALUMINUM       = new THREE.Color(0xC8CCD4);

// Soft indirect lighting & LED accents
export const COLOR_CYAN_ACCENT    = new THREE.Color(0x00E5FF);
export const COLOR_VIOLET_ACCENT  = new THREE.Color(0x7C4DFF);
export const COLOR_WARM_WHITE     = new THREE.Color(0xFFF5E6);
export const COLOR_COOL_WHITE     = new THREE.Color(0xE0E8FF);
export const COLOR_COVE_WARM      = new THREE.Color(0xFFF3E0);
export const COLOR_COVE_AMBER     = new THREE.Color(0xFFA726);
