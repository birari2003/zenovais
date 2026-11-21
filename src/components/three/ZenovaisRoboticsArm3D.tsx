import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { useReducedMotion } from 'motion/react';
import { detectSoftwareWebGL, scheduleSoftwareDraw } from './webglUtils';

export type RoboticsMode = 'perceive' | 'reason' | 'act' | 'explode';

interface ZenovaisRoboticsArm3DProps {
  mode?: RoboticsMode;
  onModeChange?: (mode: RoboticsMode) => void;
  className?: string;
  showDock?: boolean;
}

const MODE_LABELS: { id: RoboticsMode; label: string }[] = [
  { id: 'perceive', label: '1. See (Vision)' },
  { id: 'reason', label: '2. Think (AI Plan)' },
  { id: 'act', label: '3. Act (Robotics)' },
  { id: 'explode', label: '4. Inside (CAD)' },
];

export const ZenovaisRoboticsArm3D: React.FC<ZenovaisRoboticsArm3DProps> = ({
  mode: controlledMode,
  onModeChange,
  className = '',
  showDock = true,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [internalMode, setInternalMode] = useState<RoboticsMode>('act');
  const activeMode = controlledMode ?? internalMode;
  const modeRef = useRef<RoboticsMode>(activeMode);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [webglError, setWebglError] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    modeRef.current = activeMode;
  }, [activeMode]);

  const handleSelectMode = (next: RoboticsMode) => {
    if (onModeChange) onModeChange(next);
    if (controlledMode === undefined) setInternalMode(next);
  };

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const isSoftwareGl = detectSoftwareWebGL();

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglError(true);
      return;
    }

    const width = container.clientWidth || 560;
    const height = container.clientHeight || 440;

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(width, height);

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTexture = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;
    pmremGenerator.dispose();

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0.4, 2.55, 6.9);
    camera.lookAt(0, 1.35, 0);

    // Three-point studio lighting rig
    const hemiLight = new THREE.HemisphereLight(0xfafaf7, 0x17212b, 0.9);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff7ea, 2.35);
    keyLight.position.set(4.5, 7.5, 5.5);
    keyLight.castShadow = !isSoftwareGl;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.bias = -0.0005;
    keyLight.shadow.normalBias = 0.02;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x075b50, 2.1);
    rimLight.position.set(-5.0, 3.0, -4.5);
    scene.add(rimLight);

    // Material palette (varied roughness & metalness >= 0.25 delta between adjacent surfaces)
    const obsidianChassisMat = new THREE.MeshPhysicalMaterial({
      color: 0x17212b,
      metalness: 0.78,
      roughness: 0.34,
      clearcoat: 0.55,
      clearcoatRoughness: 0.2,
    });
    const brushedAlloyMat = new THREE.MeshPhysicalMaterial({
      color: 0xd6deda,
      metalness: 0.94,
      roughness: 0.14,
      anisotropy: 0.75,
    });
    const emeraldServoMat = new THREE.MeshPhysicalMaterial({
      color: 0x075b50,
      metalness: 0.7,
      roughness: 0.22,
      clearcoat: 0.85,
    });
    const sageTrimMat = new THREE.MeshStandardMaterial({
      color: 0xdce9e3,
      metalness: 0.25,
      roughness: 0.52,
    });
    const opticalLensMat = new THREE.MeshPhysicalMaterial({
      color: 0x0a7c6d,
      emissive: 0x075b50,
      emissiveIntensity: 0.65,
      metalness: 0.15,
      roughness: 0.08,
      clearcoat: 1.0,
      transparent: true,
      opacity: isSoftwareGl ? 0.88 : 0.92,
    });
    const scanBeamMat = new THREE.MeshBasicMaterial({
      color: 0x0e8c7b,
      transparent: true,
      opacity: 0.16,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    // Ground Contact Platform & Soft Shadow Plane
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sCtx = shadowCanvas.getContext('2d');
    if (sCtx) {
      const grad = sCtx.createRadialGradient(128, 128, 12, 128, 128, 122);
      grad.addColorStop(0, 'rgba(6, 68, 60, 0.34)');
      grad.addColorStop(0.55, 'rgba(23, 33, 43, 0.12)');
      grad.addColorStop(1, 'rgba(23, 33, 43, 0)');
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 256, 256);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    shadowTex.colorSpace = THREE.SRGBColorSpace;
    const shadowPlaneGeo = new THREE.PlaneGeometry(5.6, 5.6);
    const shadowPlaneMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
    });
    const shadowPlane = new THREE.Mesh(shadowPlaneGeo, shadowPlaneMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -0.02;
    scene.add(shadowPlane);

    const disposables: Array<{ dispose: () => void }> = [
      obsidianChassisMat,
      brushedAlloyMat,
      emeraldServoMat,
      sageTrimMat,
      opticalLensMat,
      scanBeamMat,
      shadowTex,
      shadowPlaneGeo,
      shadowPlaneMat,
    ];
    const trackGeo = <T extends THREE.BufferGeometry>(g: T): T => {
      disposables.push(g);
      return g;
    };

    // Root Robotic Assembly grounded at y = 0
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // Subtle Precision Calibration Grid Ring on floor
    const floorRingGeo = trackGeo(new THREE.RingGeometry(1.72, 1.78, 72));
    const floorRing = new THREE.Mesh(floorRingGeo, emeraldServoMat);
    floorRing.rotation.x = -Math.PI / 2;
    floorRing.position.y = 0.01;
    worldGroup.add(floorRing);

    const floorInnerRingGeo = trackGeo(new THREE.RingGeometry(1.05, 1.08, 64));
    const floorInnerRing = new THREE.Mesh(floorInnerRingGeo, sageTrimMat);
    floorInnerRing.rotation.x = -Math.PI / 2;
    floorInnerRing.position.y = 0.015;
    worldGroup.add(floorInnerRing);

    // 1. Stationary Machined Pedestal Base
    const baseGroup = new THREE.Group();
    worldGroup.add(baseGroup);

    const basePlateGeo = trackGeo(new THREE.CylinderGeometry(0.95, 1.08, 0.22, 40));
    const basePlate = new THREE.Mesh(basePlateGeo, obsidianChassisMat);
    basePlate.position.y = 0.11;
    basePlate.castShadow = true;
    basePlate.receiveShadow = true;
    baseGroup.add(basePlate);

    const baseCollarGeo = trackGeo(new THREE.TorusGeometry(0.92, 0.04, 14, 60));
    const baseCollar = new THREE.Mesh(baseCollarGeo, emeraldServoMat);
    baseCollar.rotation.x = Math.PI / 2;
    baseCollar.position.y = 0.22;
    baseGroup.add(baseCollar);

    // 2. Rotating Turret Yoke (Axis 1 - Yaw)
    const turretPivot = new THREE.Group();
    turretPivot.position.y = 0.22;
    worldGroup.add(turretPivot);

    const turretDrumGeo = trackGeo(new THREE.CylinderGeometry(0.68, 0.78, 0.34, 36));
    const turretDrum = new THREE.Mesh(turretDrumGeo, brushedAlloyMat);
    turretDrum.position.y = 0.17;
    turretPivot.add(turretDrum);

    // Dual Beveled Yoke Brackets via ExtrudeGeometry
    const yokeShape = new THREE.Shape();
    yokeShape.moveTo(-0.34, 0);
    yokeShape.lineTo(0.34, 0);
    yokeShape.lineTo(0.24, 0.72);
    yokeShape.absarc(0, 0.72, 0.24, 0, Math.PI, false);
    yokeShape.closePath();

    const yokeGeo = trackGeo(
      new THREE.ExtrudeGeometry(yokeShape, {
        depth: 0.14,
        bevelEnabled: true,
        bevelThickness: 0.025,
        bevelSize: 0.02,
        bevelSegments: 3,
      })
    );
    yokeGeo.center();

    const yokeLeft = new THREE.Mesh(yokeGeo, obsidianChassisMat);
    yokeLeft.position.set(-0.28, 0.62, 0);
    yokeLeft.rotation.y = Math.PI / 2;
    turretPivot.add(yokeLeft);

    const yokeRight = new THREE.Mesh(yokeGeo, obsidianChassisMat);
    yokeRight.position.set(0.28, 0.62, 0);
    yokeRight.rotation.y = Math.PI / 2;
    turretPivot.add(yokeRight);

    // Shoulder Servo Drum & Bearing Caps
    const shoulderCapGeo = trackGeo(new THREE.CylinderGeometry(0.24, 0.24, 0.78, 28));
    const shoulderDrum = new THREE.Mesh(shoulderCapGeo, emeraldServoMat);
    shoulderDrum.rotation.z = Math.PI / 2;
    shoulderDrum.position.y = 0.78;
    turretPivot.add(shoulderDrum);

    // 3. Lower Articulated Arm (Axis 2 - Pitch)
    const shoulderPivot = new THREE.Group();
    shoulderPivot.position.set(0, 0.78, 0);
    turretPivot.add(shoulderPivot);

    const armBeamShape = new THREE.Shape();
    armBeamShape.moveTo(-0.18, 0);
    armBeamShape.lineTo(0.18, 0);
    armBeamShape.lineTo(0.14, 1.38);
    armBeamShape.absarc(0, 1.38, 0.14, 0, Math.PI, false);
    armBeamShape.closePath();

    const lowerArmGeo = trackGeo(
      new THREE.ExtrudeGeometry(armBeamShape, {
        depth: 0.22,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.02,
        bevelSegments: 2,
      })
    );
    lowerArmGeo.translate(0, 0, -0.11);

    const lowerArmMesh = new THREE.Mesh(lowerArmGeo, brushedAlloyMat);
    shoulderPivot.add(lowerArmMesh);

    const spineTubeGeo = trackGeo(new THREE.CylinderGeometry(0.055, 0.055, 1.24, 16));
    const lowerSpine = new THREE.Mesh(spineTubeGeo, emeraldServoMat);
    lowerSpine.position.set(0, 0.7, 0.14);
    shoulderPivot.add(lowerSpine);

    // 4. Elbow Gearbox Assembly (Axis 3 - Pitch)
    const elbowPivot = new THREE.Group();
    elbowPivot.position.set(0, 1.38, 0);
    shoulderPivot.add(elbowPivot);

    const elbowHousingGeo = trackGeo(new THREE.CylinderGeometry(0.21, 0.21, 0.42, 28));
    const elbowHousing = new THREE.Mesh(elbowHousingGeo, obsidianChassisMat);
    elbowHousing.rotation.z = Math.PI / 2;
    elbowPivot.add(elbowHousing);

    const elbowTrimGeo = trackGeo(new THREE.TorusGeometry(0.22, 0.025, 12, 36));
    const elbowTrimL = new THREE.Mesh(elbowTrimGeo, emeraldServoMat);
    elbowTrimL.rotation.y = Math.PI / 2;
    elbowTrimL.position.x = -0.21;
    elbowPivot.add(elbowTrimL);

    const elbowTrimR = new THREE.Mesh(elbowTrimGeo, emeraldServoMat);
    elbowTrimR.rotation.y = Math.PI / 2;
    elbowTrimR.position.x = 0.21;
    elbowPivot.add(elbowTrimR);

    // Forearm Shell
    const forearmGeo = trackGeo(new THREE.CylinderGeometry(0.11, 0.16, 1.18, 24));
    const forearm = new THREE.Mesh(forearmGeo, obsidianChassisMat);
    forearm.position.set(0, 0.59, 0);
    elbowPivot.add(forearm);

    const forearmSleeveGeo = trackGeo(new THREE.CylinderGeometry(0.145, 0.145, 0.48, 24));
    const forearmSleeve = new THREE.Mesh(forearmSleeveGeo, brushedAlloyMat);
    forearmSleeve.position.set(0, 0.42, 0);
    elbowPivot.add(forearmSleeve);

    // 5. Wrist Gimbal & Optical Vision Sensor Head (Axis 4)
    const wristPivot = new THREE.Group();
    wristPivot.position.set(0, 1.18, 0);
    elbowPivot.add(wristPivot);

    const wristSphereGeo = trackGeo(new THREE.SphereGeometry(0.15, 24, 24));
    const wristSphere = new THREE.Mesh(wristSphereGeo, emeraldServoMat);
    wristPivot.add(wristSphere);

    // Sensor / Vision Head Housing + Optical Lens
    const headHousingGeo = trackGeo(new THREE.BoxGeometry(0.32, 0.24, 0.36));
    const headHousing = new THREE.Mesh(headHousingGeo, obsidianChassisMat);
    headHousing.position.set(0, 0.22, 0.04);
    wristPivot.add(headHousing);

    const lensBezelGeo = trackGeo(new THREE.CylinderGeometry(0.085, 0.095, 0.08, 24));
    const lensBezel = new THREE.Mesh(lensBezelGeo, brushedAlloyMat);
    lensBezel.rotation.x = Math.PI / 2;
    lensBezel.position.set(0, 0.24, 0.23);
    wristPivot.add(lensBezel);

    const lensGlassGeo = trackGeo(new THREE.SphereGeometry(0.072, 20, 20));
    const lensGlass = new THREE.Mesh(lensGlassGeo, opticalLensMat);
    lensGlass.position.set(0, 0.24, 0.25);
    wristPivot.add(lensGlass);

    // Volumetric Vision Scan Cone (Visible cleanly in Perceive / Reason modes)
    const scanConeGeo = trackGeo(new THREE.ConeGeometry(0.68, 1.65, 28, 1, true));
    const scanCone = new THREE.Mesh(scanConeGeo, scanBeamMat);
    scanCone.rotation.x = -Math.PI / 2;
    scanCone.position.set(0, 0.24, 1.08);
    wristPivot.add(scanCone);

    // Dual Parallel Robotic Gripper Claws
    const clawGeo = trackGeo(new THREE.BoxGeometry(0.055, 0.34, 0.1));
    const leftClaw = new THREE.Mesh(clawGeo, brushedAlloyMat);
    leftClaw.position.set(-0.11, 0.44, 0.05);
    wristPivot.add(leftClaw);

    const rightClaw = new THREE.Mesh(clawGeo, brushedAlloyMat);
    rightClaw.position.set(0.11, 0.44, 0.05);
    wristPivot.add(rightClaw);

    // 6. Holographic Reasoning Halo around Arm (for AI Planning visualization)
    const logicRingGeo = trackGeo(new THREE.TorusGeometry(1.58, 0.016, 12, 90));
    const logicRingMat = new THREE.MeshBasicMaterial({
      color: 0x075b50,
      transparent: true,
      opacity: 0.48,
    });
    disposables.push(logicRingMat);
    const logicRing = new THREE.Mesh(logicRingGeo, logicRingMat);
    logicRing.position.y = 1.6;
    logicRing.rotation.x = Math.PI / 2.3;
    worldGroup.add(logicRing);

    // 7. Instanced Precision Target Data Cubes arranged on workbench arc
    const nodeCount = 5;
    const nodeGeo = trackGeo(new THREE.OctahedronGeometry(0.14, 0));
    const nodeMat = new THREE.MeshPhysicalMaterial({
      color: 0x075b50,
      emissive: 0x075b50,
      emissiveIntensity: 0.35,
      metalness: 0.65,
      roughness: 0.2,
    });
    disposables.push(nodeMat);
    const targetNodes = new THREE.InstancedMesh(nodeGeo, nodeMat, nodeCount);
    targetNodes.frustumCulled = false;
    worldGroup.add(targetNodes);

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // Pointer Drag Orbit + Smooth Gimbal Tracking
    let isDragging = false;
    let prevPointerX = 0;
    let dragAzimuth = 0.28;
    let targetDragAzimuth = 0.28;
    let cursorX = 0;
    let cursorY = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevPointerX = e.clientX;
    };
    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      if (rect.width && rect.height) {
        cursorX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        cursorY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      }
      if (isDragging) {
        const dx = e.clientX - prevPointerX;
        prevPointerX = e.clientX;
        targetDragAzimuth += dx * 0.008;
      }
    };
    const onPointerUp = () => {
      isDragging = false;
    };
    const onPointerLeave = () => {
      isDragging = false;
      cursorX = 0;
      cursorY = 0;
    };

    container.addEventListener('pointerdown', onPointerDown);
    container.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    container.addEventListener('pointerleave', onPointerLeave);

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || 560;
      const h = container.clientHeight || 440;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    const handleContextLost = (e: Event) => {
      e.preventDefault();
      setWebglError(true);
    };
    renderer.domElement.addEventListener('webglcontextlost', handleContextLost);

    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Pre-allocated animation helpers (Zero GC)
    const _dummy = new THREE.Object3D();
    const clock = new THREE.Clock();
    let rafId = 0;
    let timerId = 0;
    let disposed = false;

    const tick = () => {
      if (disposed) return;
      const delta = Math.min(clock.getDelta(), 0.05);
      const elapsed = clock.getElapsedTime();
      const speed = prefersReduced ? 0.12 : 1.0;

      if (isVisible) {
        const mode = modeRef.current;

        // Smooth azimuth drag orbit + subtle idle rotation
        if (!isDragging && !prefersReduced) {
          targetDragAzimuth += delta * 0.14;
        }
        dragAzimuth = THREE.MathUtils.damp(dragAzimuth, targetDragAzimuth, 5.5, delta);
        worldGroup.rotation.y = dragAzimuth + cursorX * 0.18;

        // Target kinematic angles per mode
        let tYaw = cursorX * 0.55;
        let tShoulder = 0.28 + cursorY * 0.16;
        let tElbow = -0.82 - cursorY * 0.18;
        let tWrist = -0.45;
        let tGrip = 0.12;
        let tScanOpacity = 0.0;
        let tExplode = 0.0;
        let tRingOpacity = 0.2;

        if (mode === 'perceive') {
          tYaw = Math.sin(elapsed * 1.15 * speed) * 0.72 + cursorX * 0.35;
          tShoulder = 0.22 + Math.sin(elapsed * 0.8 * speed) * 0.1;
          tElbow = -0.68;
          tWrist = -0.85 + Math.sin(elapsed * 1.6 * speed) * 0.18;
          tGrip = 0.15;
          tScanOpacity = 0.24 + Math.sin(elapsed * 4.0) * 0.06;
          tRingOpacity = 0.35;
        } else if (mode === 'reason') {
          tYaw = Math.sin(elapsed * 0.75 * speed) * 0.45 + cursorX * 0.4;
          tShoulder = 0.12;
          tElbow = -0.58 + Math.sin(elapsed * 1.4 * speed) * 0.08;
          tWrist = -0.5 + Math.cos(elapsed * 1.4 * speed) * 0.15;
          tGrip = 0.09 + Math.abs(Math.sin(elapsed * 2.0)) * 0.06;
          tScanOpacity = 0.1;
          tRingOpacity = 0.72;
        } else if (mode === 'act') {
          const cycle = elapsed * 1.35 * speed;
          tYaw = Math.sin(cycle * 0.7) * 0.85 + cursorX * 0.25;
          tShoulder = 0.35 + Math.sin(cycle) * 0.28;
          tElbow = -0.95 + Math.cos(cycle) * 0.32;
          tWrist = -0.42 - Math.sin(cycle) * 0.22;
          tGrip = 0.08 + (Math.sin(cycle * 2.0) * 0.5 + 0.5) * 0.085;
          tScanOpacity = 0.12;
          tRingOpacity = 0.42;
        } else if (mode === 'explode') {
          tYaw = 0.35 + cursorX * 0.3;
          tShoulder = 0.18;
          tElbow = -0.52;
          tWrist = -0.35;
          tGrip = 0.19;
          tScanOpacity = 0.05;
          tExplode = 0.38;
          tRingOpacity = 0.65;
        }

        // Exponential damping kinematics
        turretPivot.rotation.y = THREE.MathUtils.damp(turretPivot.rotation.y, tYaw, 5.2, delta);
        shoulderPivot.rotation.x = THREE.MathUtils.damp(shoulderPivot.rotation.x, tShoulder, 5.0, delta);
        elbowPivot.rotation.x = THREE.MathUtils.damp(elbowPivot.rotation.x, tElbow, 5.0, delta);
        wristPivot.rotation.x = THREE.MathUtils.damp(wristPivot.rotation.x, tWrist, 5.5, delta);

        leftClaw.position.x = THREE.MathUtils.damp(leftClaw.position.x, -tGrip, 7, delta);
        rightClaw.position.x = THREE.MathUtils.damp(rightClaw.position.x, tGrip, 7, delta);

        // CAD Exploded view offsets
        turretPivot.position.y = THREE.MathUtils.damp(turretPivot.position.y, 0.22 + tExplode * 0.75, 5, delta);
        elbowPivot.position.y = THREE.MathUtils.damp(elbowPivot.position.y, 1.38 + tExplode * 0.85, 5, delta);
        wristPivot.position.y = THREE.MathUtils.damp(wristPivot.position.y, 1.18 + tExplode * 0.9, 5, delta);
        yokeLeft.position.x = THREE.MathUtils.damp(yokeLeft.position.x, -0.28 - tExplode * 0.65, 5, delta);
        yokeRight.position.x = THREE.MathUtils.damp(yokeRight.position.x, 0.28 + tExplode * 0.65, 5, delta);
        forearmSleeve.position.y = THREE.MathUtils.damp(forearmSleeve.position.y, 0.42 + tExplode * 0.45, 5, delta);

        scanBeamMat.opacity = THREE.MathUtils.damp(scanBeamMat.opacity, tScanOpacity, 6, delta);
        scanCone.visible = scanBeamMat.opacity > 0.015;

        logicRingMat.opacity = THREE.MathUtils.damp(logicRingMat.opacity, tRingOpacity, 5, delta);
        logicRing.rotation.z += delta * (mode === 'reason' ? 1.1 : 0.35) * speed;
        logicRing.position.y = 1.65 + Math.sin(elapsed * 1.4) * 0.06 + tExplode * 0.5;

        // Orbit target inspection nodes cleanly along pedestal rim
        for (let i = 0; i < nodeCount; i++) {
          const angle = (i / nodeCount) * Math.PI * 2 + elapsed * (mode === 'reason' ? 0.5 : 0.18) * speed;
          const r = 1.65 + tExplode * 0.35;
          _dummy.position.set(
            Math.cos(angle) * r,
            0.32 + Math.sin(elapsed * 1.8 + i) * 0.09,
            Math.sin(angle) * r
          );
          _dummy.rotation.set(elapsed * 0.8 + i, angle, 0);
          _dummy.updateMatrix();
          targetNodes.setMatrixAt(i, _dummy.matrix);
        }
        targetNodes.instanceMatrix.needsUpdate = true;

        renderer.render(scene, camera);
      }

      if (isSoftwareGl) {
        scheduleSoftwareDraw(renderer, tick, (id) => {
          timerId = id;
        });
      } else {
        rafId = requestAnimationFrame(tick);
      }
    };

    tick();

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      clearTimeout(timerId);
      observer.disconnect();
      container.removeEventListener('pointerdown', onPointerDown);
      container.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      container.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('resize', onResize);
      renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);

      for (const item of disposables) {
        item.dispose();
      }
      envTexture.dispose();
      renderer.dispose();
    };
  }, [prefersReduced]);

  return (
    <div className={`relative h-full w-full min-h-[380px] ${className}`}>
      {webglError ? (
        <div className="flex h-full min-h-[380px] items-center justify-center rounded-3xl border border-[var(--z-border)] bg-[var(--z-pale-green)]/40 p-8 text-center">
          <div>
            <p className="font-mono text-xs font-semibold text-[var(--z-primary)]">
              3D Robotics & Intelligence Lab
            </p>
            <p className="mt-2 text-sm text-[var(--z-secondary-text)]">
              Interactive WebGL robotics simulator unavailable in this browser context.
            </p>
          </div>
        </div>
      ) : (
        <div
          ref={mountRef}
          aria-label="Interactive 3D Zenovais Articulated Robotics Simulation — drag to rotate"
          className="h-full w-full min-h-[380px] cursor-grab active:cursor-grabbing"
        />
      )}

      {/* Sleek Collapsible Bottom Dock — Zero center viewport occlusion */}
      {showDock && !webglError && (
        <div className="pointer-events-none absolute right-0 bottom-3 left-0 flex flex-col items-center px-3">
          <button
            type="button"
            onClick={() => setControlsVisible((v) => !v)}
            className="pointer-events-auto mb-1.5 rounded-full border border-[var(--z-border)] bg-[var(--z-surface)] px-3 py-1 text-[11px] font-semibold text-[var(--z-secondary-text)] shadow-sm transition-colors hover:text-[var(--z-primary)]"
          >
            {controlsVisible ? '▾ Hide 3D Controls' : '▴ Robotics 3D Modes'}
          </button>

          {controlsVisible && (
            <div className="pointer-events-auto flex flex-wrap items-center justify-center gap-1 rounded-full border border-[var(--z-border)] bg-[var(--z-surface)] p-1 shadow-md">
              {MODE_LABELS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectMode(item.id)}
                  className={`rounded-full px-3 py-1.5 text-[11px] font-semibold whitespace-nowrap transition-colors sm:text-xs ${
                    activeMode === item.id
                      ? 'bg-[var(--z-primary)] text-white'
                      : 'text-[var(--z-secondary-text)] hover:text-[var(--z-charcoal)]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
