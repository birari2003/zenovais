import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { useReducedMotion } from 'motion/react';
import { detectSoftwareWebGL, scheduleSoftwareDraw } from './webglUtils';

type CorePreset = 'balanced' | 'precision' | 'network';

interface ZenovaisNeuralCore3DProps {
  className?: string;
}

export const ZenovaisNeuralCore3D: React.FC<ZenovaisNeuralCore3DProps> = ({
  className = '',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const presetRef = useRef<CorePreset>('balanced');
  const [preset, setPreset] = useState<CorePreset>('balanced');
  const [controlsVisible, setControlsVisible] = useState(true);
  const [webglError, setWebglError] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    presetRef.current = preset;
  }, [preset]);

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

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(container.clientWidth || 540, container.clientHeight || 420);

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTexture = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;
    pmremGenerator.dispose();

    const camera = new THREE.PerspectiveCamera(
      40,
      (container.clientWidth || 540) / (container.clientHeight || 420),
      0.1,
      100
    );
    camera.position.set(0, 0.3, 8.2);

    // Three-point studio lighting
    const hemi = new THREE.HemisphereLight(0xeaf2ed, 0x17212b, 0.85);
    scene.add(hemi);

    const keyLight = new THREE.DirectionalLight(0xfff8ed, 2.2);
    keyLight.position.set(5, 7, 6);
    keyLight.castShadow = !isSoftwareGl;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x075b50, 1.8);
    rimLight.position.set(-5, -2, -4);
    scene.add(rimLight);

    // Composite Procedural 3D Intelligence Core Assembly (7+ sub-components)
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 1. Primary Core: Brushed Obsidian Faceted Icosahedron
    const coreGeo = new THREE.IcosahedronGeometry(1.18, 1);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x17212b,
      metalness: 0.86,
      roughness: 0.24,
      clearcoat: 0.9,
      clearcoatRoughness: 0.14,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    rootGroup.add(coreMesh);

    // 2. Emerald Precision Wireframe Cage around Core
    const cageGeo = new THREE.IcosahedronGeometry(1.38, 1);
    const cageMat = new THREE.MeshStandardMaterial({
      color: 0x075b50,
      emissive: 0x075b50,
      emissiveIntensity: 0.45,
      metalness: 0.5,
      roughness: 0.35,
      wireframe: true,
    });
    const cageMesh = new THREE.Mesh(cageGeo, cageMat);
    rootGroup.add(cageMesh);

    // 3. Inner Axial Spindle & Beveled Collars
    const spindleGeo = new THREE.CylinderGeometry(0.11, 0.11, 3.5, 24);
    const brushedMetalMat = new THREE.MeshPhysicalMaterial({
      color: 0xcbd5d0,
      metalness: 0.94,
      roughness: 0.16,
      anisotropy: 0.75,
    });
    const spindle = new THREE.Mesh(spindleGeo, brushedMetalMat);
    spindle.rotation.z = Math.PI / 6;
    rootGroup.add(spindle);

    // 4-6. Three Counter-Rotating Orbital Gimbal Rings
    const emeraldMetalMat = new THREE.MeshPhysicalMaterial({
      color: 0x075b50,
      metalness: 0.78,
      roughness: 0.22,
      clearcoat: 0.7,
    });
    const sageRingMat = new THREE.MeshStandardMaterial({
      color: 0xdce9e3,
      metalness: 0.65,
      roughness: 0.32,
    });

    const ring1Geo = new THREE.TorusGeometry(2.05, 0.036, 18, 110);
    const ring1 = new THREE.Mesh(ring1Geo, emeraldMetalMat);
    ring1.rotation.set(Math.PI / 3, 0.2, 0);
    rootGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(2.45, 0.028, 18, 120);
    const ring2 = new THREE.Mesh(ring2Geo, brushedMetalMat);
    ring2.rotation.set(-Math.PI / 4, Math.PI / 5, 0);
    rootGroup.add(ring2);

    const ring3Geo = new THREE.TorusGeometry(2.85, 0.02, 16, 120);
    const ring3 = new THREE.Mesh(ring3Geo, sageRingMat);
    ring3.rotation.set(Math.PI / 2.2, -Math.PI / 3, 0);
    rootGroup.add(ring3);

    // 7. Instanced Orbiting Neural Nodes (36 precision micro-octahedrons)
    const orbitCount = 36;
    const orbitNodeGeo = new THREE.OctahedronGeometry(0.075, 0);
    const orbitNodeMat = new THREE.MeshStandardMaterial({
      color: 0x075b50,
      emissive: 0x075b50,
      emissiveIntensity: 0.55,
      metalness: 0.4,
      roughness: 0.2,
    });
    const orbitNodes = new THREE.InstancedMesh(orbitNodeGeo, orbitNodeMat, orbitCount);
    orbitNodes.frustumCulled = false;
    rootGroup.add(orbitNodes);

    const nodeOrbits = Array.from({ length: orbitCount }, (_, i) => {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / orbitCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const radius = 2.0 + (i % 3) * 0.44;
      return { phi, theta, radius, speed: 0.25 + (i % 4) * 0.1 };
    });

    // 8. Soft Radial Grounding Shadow Plane
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const ctx = shadowCanvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(128, 128, 10, 128, 128, 120);
      grad.addColorStop(0, 'rgba(7, 91, 80, 0.22)');
      grad.addColorStop(0.6, 'rgba(23, 33, 43, 0.08)');
      grad.addColorStop(1, 'rgba(23, 33, 43, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 256, 256);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    shadowTex.colorSpace = THREE.SRGBColorSpace;
    const shadowGeo = new THREE.PlaneGeometry(5.5, 5.5);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -2.95;
    scene.add(shadowPlane);

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // Pointer interaction
    let pointerX = 0;
    let pointerY = 0;
    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      pointerX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointerY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    };
    const onPointerLeave = () => {
      pointerX = 0;
      pointerY = 0;
    };
    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('pointerleave', onPointerLeave);

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || 540;
      const h = container.clientHeight || 420;
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

    // Pre-allocated animation helpers
    const _dummy = new THREE.Object3D();
    const clock = new THREE.Clock();
    let rafId = 0;
    let timerId = 0;
    let disposed = false;

    const tick = () => {
      if (disposed) return;
      const delta = Math.min(clock.getDelta(), 0.05);
      const elapsed = clock.getElapsedTime();

      if (isVisible) {
        const mode = presetRef.current;
        const speedMult = prefersReduced ? 0.1 : mode === 'precision' ? 0.55 : mode === 'network' ? 1.45 : 1.0;

        // Smooth damped scale transitions per preset
        const targetCageScale = mode === 'network' ? 1.18 : mode === 'precision' ? 1.02 : 1.08;
        const targetRingScale = mode === 'network' ? 1.14 : 1.0;

        cageMesh.scale.setScalar(THREE.MathUtils.damp(cageMesh.scale.x, targetCageScale, 4, delta));
        ring2.scale.setScalar(THREE.MathUtils.damp(ring2.scale.x, targetRingScale, 4, delta));
        ring3.scale.setScalar(THREE.MathUtils.damp(ring3.scale.x, targetRingScale * 1.02, 4, delta));

        coreMesh.rotation.y += delta * 0.28 * speedMult;
        coreMesh.rotation.x += delta * 0.12 * speedMult;
        cageMesh.rotation.y -= delta * 0.18 * speedMult;

        ring1.rotation.z += delta * 0.35 * speedMult;
        ring2.rotation.x += delta * 0.25 * speedMult;
        ring3.rotation.y -= delta * 0.22 * speedMult;

        for (let i = 0; i < orbitCount; i++) {
          const item = nodeOrbits[i];
          const t = item.theta + elapsed * item.speed * speedMult;
          const r = item.radius * (mode === 'network' ? 1.12 : 1.0);
          _dummy.position.set(
            r * Math.sin(item.phi) * Math.cos(t),
            r * Math.cos(item.phi),
            r * Math.sin(item.phi) * Math.sin(t)
          );
          _dummy.rotation.set(t, item.phi, 0);
          _dummy.updateMatrix();
          orbitNodes.setMatrixAt(i, _dummy.matrix);
        }
        orbitNodes.instanceMatrix.needsUpdate = true;

        rootGroup.rotation.y = THREE.MathUtils.damp(rootGroup.rotation.y, pointerX * 0.35, 4.5, delta);
        rootGroup.rotation.x = THREE.MathUtils.damp(rootGroup.rotation.x, pointerY * 0.25, 4.5, delta);
        rootGroup.position.y = Math.sin(elapsed * 1.1) * 0.08;

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
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('resize', onResize);
      renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);

      coreGeo.dispose();
      coreMat.dispose();
      cageGeo.dispose();
      cageMat.dispose();
      spindleGeo.dispose();
      brushedMetalMat.dispose();
      ring1Geo.dispose();
      ring2Geo.dispose();
      ring3Geo.dispose();
      emeraldMetalMat.dispose();
      sageRingMat.dispose();
      orbitNodeGeo.dispose();
      orbitNodeMat.dispose();
      shadowTex.dispose();
      shadowGeo.dispose();
      shadowMat.dispose();
      envTexture.dispose();
      renderer.dispose();
    };
  }, [prefersReduced]);

  return (
    <div className={`relative h-full w-full min-h-[340px] ${className}`}>
      {webglError ? (
        <div className="flex h-full min-h-[340px] items-center justify-center rounded-3xl border border-[var(--z-border)] bg-[var(--z-pale-green)]/40 p-8 text-center">
          <div>
            <p className="font-mono text-xs font-semibold text-[var(--z-primary)]">
              3D Architecture Preview
            </p>
            <p className="mt-2 text-sm text-[var(--z-secondary-text)]">
              Interactive WebGL topology unavailable in this browser context.
            </p>
          </div>
        </div>
      ) : (
        <div
          ref={mountRef}
          aria-label="Interactive 3D Zenovais Neural Architecture Sculpture"
          className="h-full w-full min-h-[340px] cursor-grab active:cursor-grabbing"
        />
      )}

      {/* Sleek Collapsible Bottom Dock */}
      {!webglError && (
        <div className="pointer-events-none absolute right-0 bottom-3 left-0 flex flex-col items-center">
          <button
            type="button"
            onClick={() => setControlsVisible((v) => !v)}
            className="pointer-events-auto mb-1.5 rounded-full border border-[var(--z-border)] bg-[var(--z-surface)]/95 px-3 py-1 text-[11px] font-semibold text-[var(--z-secondary-text)] shadow-sm transition-colors hover:text-[var(--z-primary)]"
          >
            {controlsVisible ? '▾ Hide 3D Modes' : '▴ 3D Architecture Controls'}
          </button>

          {controlsVisible && (
            <div className="pointer-events-auto inline-flex items-center gap-1 rounded-full border border-[var(--z-border)] bg-[var(--z-surface)]/95 p-1 shadow-md">
              {(
                [
                  { id: 'balanced', label: 'Core Orbit' },
                  { id: 'precision', label: 'Precision Lock' },
                  { id: 'network', label: 'Expanded Mesh' },
                ] as const
              ).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setPreset(item.id)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors ${
                    preset === item.id
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
