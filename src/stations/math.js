// src/stations/math.js — 4D Hypercube (Tesseract) & Spherical Harmonic Projector with Vector Fields
import * as THREE from 'three';
import {
  stationPosition,
  COLOR_ALUMINUM,
  COLOR_POD_WHITE,
  COLOR_CYAN_ACCENT,
  COLOR_VIOLET_ACCENT,
  COLOR_SEAM_GROOVE,
  COLOR_PANEL_DARK,
} from '../core/constants.js';
import { createHologramMaterial } from '../shaders/hologramShader.js';

/**
 * Builds the complete Mathematics Station featuring:
 * 1. Anodized aluminum & satin pedestal with recessed dark reveal seams.
 * 2. 4D Hypercube (Tesseract) with 4D rotation & perspective stereographic projection.
 * 3. 3D Spherical harmonic mesh with dynamic morphing.
 * 4. Animated tangent vector field instanced arrows.
 * 5. Floating LaTeX-style mathematical equation sprites.
 * @param {THREE.Scene} scene
 * @param {Object} globalUniforms
 * @returns {{ group: THREE.Group, update: Function, controls: Object }}
 */
export function buildMathStation(scene, globalUniforms) {
  const group = new THREE.Group();
  group.name = 'MathStation';
  const basePos = stationPosition('mathematics');
  group.position.copy(basePos);
  scene.add(group);

  const controls = {
    displayMode: { value: 'hypercube' }, // 'hypercube', 'harmonic', 'dual'
    rotationSpeed: { value: 1.0 },
    morphSpeed: { value: 1.0 },
  };

  // ── 1. HOLOGRAPHIC PROJECTOR TABLE (LIGHT WHITE MATTE NO REFLECTING SURFACE) ──
  const tableBaseMat = new THREE.MeshStandardMaterial({
    color: COLOR_POD_WHITE,
    roughness: 0.92,
    metalness: 0.0,
  });

  const trimMat = new THREE.MeshPhysicalMaterial({
    color: COLOR_ALUMINUM,
    metalness: 0.94,
    roughness: 0.22,
    clearcoat: 0.6,
  });

  const grooveMat = new THREE.MeshStandardMaterial({
    color: COLOR_SEAM_GROOVE,
    roughness: 0.88,
    metalness: 0.1,
  });

  // Stepped round pedestal base
  const pedestal = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 2.7, 0.7, 64), tableBaseMat);
  pedestal.position.y = 0.35;
  pedestal.castShadow = true;
  pedestal.receiveShadow = true;
  group.add(pedestal);

  // Recessed dark groove ring around pedestal rim
  const grooveRing = new THREE.Mesh(new THREE.TorusGeometry(2.38, 0.04, 8, 64), grooveMat);
  grooveRing.position.y = 0.69;
  grooveRing.rotation.x = Math.PI / 2;
  group.add(grooveRing);

  // Brushed aluminum bezel top
  const bezel = new THREE.Mesh(new THREE.CylinderGeometry(2.35, 2.35, 0.08, 64), trimMat);
  bezel.position.y = 0.74;
  group.add(bezel);

  // Cyan projection aperture disc
  const apertureMat = new THREE.MeshPhysicalMaterial({
    color: 0x001a2a,
    emissive: COLOR_CYAN_ACCENT,
    emissiveIntensity: 2.2,
    roughness: 0.15,
  });
  const aperture = new THREE.Mesh(new THREE.CircleGeometry(1.9, 64), apertureMat);
  aperture.rotateX(-Math.PI / 2);
  aperture.position.y = 0.781;
  group.add(aperture);

  // Upward holographic cone beam
  const coneGeo = new THREE.ConeGeometry(1.9, 2.6, 64, 1, true);
  coneGeo.translate(0, 1.3, 0);
  const beamMat = new THREE.MeshBasicMaterial({
    color: 0x00e5ff,
    transparent: true,
    opacity: 0.07,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const coneMesh = new THREE.Mesh(coneGeo, beamMat);
  coneMesh.position.y = 0.78;
  group.add(coneMesh);

  // ── 2. 4D HYPERCUBE (TESSERACT) PROJECTION ──
  // A 4D hypercube has 16 vertices: (±1, ±1, ±1, ±1)
  const vertices4D = [];
  for (let i = 0; i < 16; i++) {
    vertices4D.push([
      (i & 1 ? 1 : -1) * 0.72,
      (i & 2 ? 1 : -1) * 0.72,
      (i & 4 ? 1 : -1) * 0.72,
      (i & 8 ? 1 : -1) * 0.72,
    ]);
  }

  // A 4D hypercube has 32 edges (pairs of vertices differing in exactly 1 coordinate)
  const hypercubeEdges = [];
  for (let i = 0; i < 16; i++) {
    for (let j = i + 1; j < 16; j++) {
      let diff = 0;
      for (let k = 0; k < 4; k++) {
        if (vertices4D[i][k] !== vertices4D[j][k]) diff++;
      }
      if (diff === 1) {
        hypercubeEdges.push([i, j]);
      }
    }
  }

  // 32 edges * 2 points * 3 floats = 192 floats
  const edgePositions = new Float32Array(hypercubeEdges.length * 2 * 3);
  const hypercubeGeo = new THREE.BufferGeometry();
  hypercubeGeo.setAttribute('position', new THREE.BufferAttribute(edgePositions, 3));

  const hypercubeLineMat = new THREE.LineBasicMaterial({
    color: 0x00f0ff,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
    linewidth: 2,
  });

  const hypercubeLines = new THREE.LineSegments(hypercubeGeo, hypercubeLineMat);
  hypercubeLines.position.set(0, 2.3, 0);
  group.add(hypercubeLines);

  // 16 Vertex Holographic Nodes (Spheres)
  const nodeGeo = new THREE.SphereGeometry(0.045, 16, 16);
  const nodeMat = new THREE.MeshPhysicalMaterial({
    color: 0x00e5ff,
    emissive: 0x7c4dff,
    emissiveIntensity: 2.5,
    roughness: 0.1,
  });
  const nodeInstances = new THREE.InstancedMesh(nodeGeo, nodeMat, 16);
  hypercubeLines.add(nodeInstances);

  // 4D Rotation and 3D Perspective Projection function
  const dFocal = 2.4; // 4D distance to projection plane
  function project4Dto3D(v, thetaXW, thetaYZ) {
    let [x, y, z, w] = v;

    // Rotation in X-W plane
    const cosXW = Math.cos(thetaXW), sinXW = Math.sin(thetaXW);
    const x1 = x * cosXW - w * sinXW;
    const w1 = x * sinXW + w * cosXW;

    // Rotation in Y-Z plane
    const cosYZ = Math.cos(thetaYZ), sinYZ = Math.sin(thetaYZ);
    const y1 = y * cosYZ - z * sinYZ;
    const z1 = y * sinYZ + z * cosYZ;

    // Perspective projection from 4D to 3D
    const scale = 1.0 / (dFocal - w1);
    return {
      pos: new THREE.Vector3(x1 * scale * 2.2, y1 * scale * 2.2, z1 * scale * 2.2),
      w: w1,
    };
  }

  // ── 3. 3D SPHERICAL HARMONIC MESH GENERATION ──
  const uSegments = 48;
  const vSegments = 24;
  const harmonicGeo = new THREE.BufferGeometry();

  const vertexCount = (uSegments + 1) * (vSegments + 1);
  const positions = new Float32Array(vertexCount * 3);
  const uvs = new Float32Array(vertexCount * 2);
  const indices = [];

  function computeHarmonic(u, v, time = 0) {
    const theta = v * Math.PI; // 0 to PI
    const phi = u * Math.PI * 2; // 0 to 2PI

    const morph = Math.sin(time * 0.8) * 0.5 + 0.5;

    // Y_3^2 term: sin^2(theta)*cos(theta)*cos(2*phi)
    const y32 = Math.pow(Math.sin(theta), 2) * Math.cos(theta) * Math.cos(2 * phi);
    // Y_4^3 term: sin^3(theta)*cos(theta)*cos(3*phi)
    const y43 = Math.pow(Math.sin(theta), 3) * Math.cos(theta) * Math.cos(3 * phi);

    const harmonic = (1.0 - morph) * y32 + morph * y43;
    const r = 0.52 + Math.abs(harmonic) * 1.15;

    const x = r * Math.sin(theta) * Math.cos(phi);
    const y = r * Math.cos(theta);
    const z = r * Math.sin(theta) * Math.sin(phi);

    return new THREE.Vector3(x, y, z);
  }

  let pIdx = 0;
  let uvIdx = 0;
  for (let iv = 0; iv <= vSegments; iv++) {
    const v = iv / vSegments;
    for (let iu = 0; iu <= uSegments; iu++) {
      const u = iu / uSegments;
      const pos = computeHarmonic(u, v, 0);

      positions[pIdx] = pos.x;
      positions[pIdx + 1] = pos.y;
      positions[pIdx + 2] = pos.z;

      uvs[uvIdx] = u;
      uvs[uvIdx + 1] = v;

      pIdx += 3;
      uvIdx += 2;
    }
  }

  for (let iv = 0; iv < vSegments; iv++) {
    for (let iu = 0; iu < uSegments; iu++) {
      const a = iv * (uSegments + 1) + iu;
      const b = (iv + 1) * (uSegments + 1) + iu;
      const c = (iv + 1) * (uSegments + 1) + (iu + 1);
      const d = iv * (uSegments + 1) + (iu + 1);

      indices.push(a, b, d);
      indices.push(b, c, d);
    }
  }

  harmonicGeo.setIndex(indices);
  harmonicGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  harmonicGeo.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
  harmonicGeo.computeVertexNormals();

  const harmonicMat = createHologramMaterial(globalUniforms, {
    color: 0x7c4dff,
    opacity: 0.65,
    scanlineSpeed: 1.8,
    scanlineDensity: 60.0,
  });

  const harmonicMesh = new THREE.Mesh(harmonicGeo, harmonicMat);
  harmonicMesh.position.set(0, 2.3, 0);
  harmonicMesh.scale.setScalar(0.85);
  group.add(harmonicMesh);

  // Wireframe contour overlay
  const wireMat = new THREE.MeshBasicMaterial({
    color: 0xb388ff,
    wireframe: true,
    transparent: true,
    opacity: 0.22,
  });
  const wireMesh = new THREE.Mesh(harmonicGeo, wireMat);
  harmonicMesh.add(wireMesh);

  // ── 4. ANIMATED VECTOR FIELD (INSTANCED TANGENT ARROWS) ──
  const arrowCount = 48;
  const arrowGeo = new THREE.ConeGeometry(0.03, 0.10, 8);
  arrowGeo.rotateX(Math.PI / 2);
  const arrowMat = new THREE.MeshPhysicalMaterial({
    color: 0xffe600,
    emissive: 0xffa000,
    emissiveIntensity: 1.8,
    roughness: 0.2,
  });

  const arrowInstances = new THREE.InstancedMesh(arrowGeo, arrowMat, arrowCount);
  arrowInstances.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  harmonicMesh.add(arrowInstances);

  const dummy = new THREE.Object3D();
  const samplePoints = [];
  for (let i = 0; i < arrowCount; i++) {
    samplePoints.push({
      u: Math.random(),
      v: 0.1 + Math.random() * 0.8,
      speed: 0.15 + Math.random() * 0.25,
      phase: Math.random() * Math.PI * 2,
    });
  }

  // ── 5. FLOATING LATEX-STYLE EQUATION SPRITES ──
  const equations = [
    '∇²ψ + k²ψ = 0',
    'V_4 = ½π²r⁴  (Tesseract)',
    'Y_l^m(θ, φ) = N e^{imφ} P_l^m',
    'χ = V - E + F - C = 0',
  ];

  const equationSprites = [];

  equations.forEach((formula, idx) => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.font = 'italic 32px "Times New Roman", Times, serif';
    ctx.fillStyle = '#00f0ff';
    ctx.shadowColor = '#00e5ff';
    ctx.shadowBlur = 10;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(formula, 256, 64);

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;

    const spriteMat = new THREE.SpriteMaterial({
      map: tex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const sprite = new THREE.Sprite(spriteMat);
    sprite.scale.set(1.4, 0.35, 1.0);

    const angle = (idx / equations.length) * Math.PI * 2;
    const radius = 1.75;
    sprite.position.set(Math.cos(angle) * radius, 2.1 + (idx % 2) * 0.45, Math.sin(angle) * radius);
    group.add(sprite);

    equationSprites.push({ sprite, angle, baseY: sprite.position.y });
  });

  // ── 6. UPDATE LOOP ──
  const nodeDummy = new THREE.Object3D();

  const update = (elapsed, dt) => {
    const rotSpeed = controls.rotationSpeed.value;
    const morphSpd = controls.morphSpeed.value;

    // 1. Update 4D Hypercube rotation & projection
    const thetaXW = elapsed * 0.65 * rotSpeed;
    const thetaYZ = elapsed * 0.48 * rotSpeed;

    const projectedVertices = vertices4D.map((v) => project4Dto3D(v, thetaXW, thetaYZ));

    // Update 32 edge line segment positions
    const posArr = hypercubeGeo.attributes.position.array;
    let ptr = 0;
    for (let e = 0; e < hypercubeEdges.length; e++) {
      const [i, j] = hypercubeEdges[e];
      const p1 = projectedVertices[i].pos;
      const p2 = projectedVertices[j].pos;

      posArr[ptr++] = p1.x;
      posArr[ptr++] = p1.y;
      posArr[ptr++] = p1.z;

      posArr[ptr++] = p2.x;
      posArr[ptr++] = p2.y;
      posArr[ptr++] = p2.z;
    }
    hypercubeGeo.attributes.position.needsUpdate = true;

    // Update 16 vertex node instances
    for (let i = 0; i < 16; i++) {
      const p = projectedVertices[i].pos;
      const scale = 0.8 + projectedVertices[i].w * 0.25;
      nodeDummy.position.copy(p);
      nodeDummy.scale.setScalar(Math.max(scale, 0.4));
      nodeDummy.updateMatrix();
      nodeInstances.setMatrixAt(i, nodeDummy.matrix);
    }
    nodeInstances.instanceMatrix.needsUpdate = true;

    // 2. Morph Spherical Harmonic vertices
    const harmArr = harmonicGeo.attributes.position.array;
    let hIdx = 0;
    for (let iv = 0; iv <= vSegments; iv++) {
      const v = iv / vSegments;
      for (let iu = 0; iu <= uSegments; iu++) {
        const u = iu / uSegments;
        const p = computeHarmonic(u, v, elapsed * morphSpd);
        harmArr[hIdx++] = p.x;
        harmArr[hIdx++] = p.y;
        harmArr[hIdx++] = p.z;
      }
    }
    harmonicGeo.attributes.position.needsUpdate = true;
    harmonicGeo.computeVertexNormals();
    harmonicMesh.rotation.y = elapsed * 0.15;

    // 3. Update Vector Field Arrows
    samplePoints.forEach((sp, i) => {
      const currentU = (sp.u + elapsed * sp.speed) % 1.0;
      const currentPos = computeHarmonic(currentU, sp.v, elapsed * morphSpd);
      const nextPos = computeHarmonic((currentU + 0.02) % 1.0, sp.v, elapsed * morphSpd);
      const tangent = nextPos.clone().sub(currentPos).normalize();

      dummy.position.copy(currentPos);
      dummy.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), tangent);
      dummy.scale.setScalar(0.6 + Math.sin(elapsed * 3.0 + sp.phase) * 0.18);
      dummy.updateMatrix();
      arrowInstances.setMatrixAt(i, dummy.matrix);
    });
    arrowInstances.instanceMatrix.needsUpdate = true;

    // 4. Bob and Orbit Equation Sprites
    equationSprites.forEach((item, i) => {
      const currentAngle = item.angle + elapsed * 0.12;
      item.sprite.position.x = Math.cos(currentAngle) * 1.75;
      item.sprite.position.z = Math.sin(currentAngle) * 1.75;
      item.sprite.position.y = item.baseY + Math.sin(elapsed * 1.5 + i) * 0.05;
    });

    // 5. Visibility mode
    const mode = controls.displayMode.value;
    if (mode === 'hypercube') {
      hypercubeLines.visible = true;
      harmonicMesh.visible = false;
    } else if (mode === 'harmonic') {
      hypercubeLines.visible = false;
      harmonicMesh.visible = true;
    } else {
      hypercubeLines.visible = true;
      harmonicMesh.visible = true;
    }
  };

  return { group, update, controls };
}
