import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useReducedMotion } from 'motion/react';
import { detectSoftwareWebGL, scheduleSoftwareDraw } from './webglUtils';

interface ZenovaisAmbientLattice3DProps {
  variant?: 'light' | 'dark';
  className?: string;
}

export const ZenovaisAmbientLattice3D: React.FC<ZenovaisAmbientLattice3DProps> = ({
  variant = 'light',
  className = '',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const [fallbackActive, setFallbackActive] = useState(false);

  useEffect(() => {
    if (prefersReduced || !mountRef.current) return;
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
      setFallbackActive(true);
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(container.clientWidth || 800, container.clientHeight || 500);
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      (container.clientWidth || 800) / (container.clientHeight || 500),
      0.1,
      100
    );
    camera.position.set(0, 0, 14);

    const latticeGroup = new THREE.Group();
    scene.add(latticeGroup);

    const nodeColor = variant === 'dark' ? 0xdce9e3 : 0x075b50;
    const lineColor = variant === 'dark' ? 0xeaf2ed : 0x075b50;

    // 44 spatial nodes forming an architectural floating 3D lattice
    const nodeCount = 44;
    const positions: THREE.Vector3[] = [];
    const velocities: THREE.Vector3[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const x = (Math.random() - 0.35) * 18;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 7;
      positions.push(new THREE.Vector3(x, y, z));
      velocities.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.25,
          (Math.random() - 0.5) * 0.22,
          (Math.random() - 0.5) * 0.16
        )
      );
    }

    const nodeGeometry = new THREE.IcosahedronGeometry(0.085, 0);
    const nodeMaterial = new THREE.MeshBasicMaterial({
      color: nodeColor,
      transparent: true,
      opacity: variant === 'dark' ? 0.52 : 0.38,
    });
    const instancedNodes = new THREE.InstancedMesh(nodeGeometry, nodeMaterial, nodeCount);
    instancedNodes.frustumCulled = false;
    latticeGroup.add(instancedNodes);

    // Pre-allocate line buffer for node connections (max pairs)
    const maxSegments = (nodeCount * (nodeCount - 1)) / 2;
    const linePositions = new Float32Array(maxSegments * 6);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setDrawRange(0, 0);

    const lineMaterial = new THREE.LineBasicMaterial({
      color: lineColor,
      transparent: true,
      opacity: variant === 'dark' ? 0.18 : 0.14,
    });
    const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
    lineSegments.frustumCulled = false;
    latticeGroup.add(lineSegments);

    // Delicate architectural wireframe rings in 3D space
    const ringGeo = new THREE.TorusGeometry(4.4, 0.012, 8, 96);
    const ringMat = new THREE.MeshBasicMaterial({
      color: lineColor,
      transparent: true,
      opacity: variant === 'dark' ? 0.14 : 0.1,
    });
    const ringA = new THREE.Mesh(ringGeo, ringMat);
    ringA.position.set(3.2, 0.2, -2);
    ringA.rotation.set(0.65, 0.4, 0);
    latticeGroup.add(ringA);

    const ringB = new THREE.Mesh(ringGeo, ringMat);
    ringB.scale.setScalar(0.72);
    ringB.position.set(3.2, 0.2, -2);
    ringB.rotation.set(-0.5, 0.85, 0.3);
    latticeGroup.add(ringB);

    // Pointer tracking
    let targetRotX = 0;
    let targetRotY = 0;
    const onPointerMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      targetRotY = nx * 0.16;
      targetRotX = ny * 0.1;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || 800;
      const h = container.clientHeight || 500;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    const handleContextLost = (e: Event) => {
      e.preventDefault();
      setFallbackActive(true);
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

    // Pre-allocated matrix helper (zero GC in loop)
    const dummyMatrix = new THREE.Matrix4();
    const clock = new THREE.Clock();
    let rafId = 0;
    let timerId = 0;
    let disposed = false;

    const updateLattice = (delta: number, elapsed: number) => {
      const clampedDelta = Math.min(delta, 0.05);

      for (let i = 0; i < nodeCount; i++) {
        const pos = positions[i];
        const vel = velocities[i];
        pos.addScaledVector(vel, clampedDelta);

        if (pos.x > 10.5 || pos.x < -7.5) vel.x *= -1;
        if (pos.y > 5.2 || pos.y < -5.2) vel.y *= -1;
        if (pos.z > 3.5 || pos.z < -4.5) vel.z *= -1;

        dummyMatrix.makeTranslation(pos.x, pos.y, pos.z);
        instancedNodes.setMatrixAt(i, dummyMatrix);
      }
      instancedNodes.instanceMatrix.needsUpdate = true;

      let vertexOffset = 0;
      let lineCount = 0;
      const maxDistSq = 3.4 * 3.4;

      for (let i = 0; i < nodeCount; i++) {
        const a = positions[i];
        for (let j = i + 1; j < nodeCount; j++) {
          const b = positions[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dz = a.z - b.z;
          const distSq = dx * dx + dy * dy + dz * dz;
          if (distSq < maxDistSq) {
            linePositions[vertexOffset++] = a.x;
            linePositions[vertexOffset++] = a.y;
            linePositions[vertexOffset++] = a.z;
            linePositions[vertexOffset++] = b.x;
            linePositions[vertexOffset++] = b.y;
            linePositions[vertexOffset++] = b.z;
            lineCount += 2;
          }
        }
      }
      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.setDrawRange(0, lineCount);

      ringA.rotation.z = elapsed * 0.08;
      ringB.rotation.z = -elapsed * 0.11;

      latticeGroup.rotation.y = THREE.MathUtils.damp(latticeGroup.rotation.y, targetRotY, 3.2, clampedDelta);
      latticeGroup.rotation.x = THREE.MathUtils.damp(latticeGroup.rotation.x, targetRotX, 3.2, clampedDelta);
    };

    const tick = () => {
      if (disposed) return;
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      if (isVisible) {
        updateLattice(delta, elapsed);
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
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);
      renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);

      nodeGeometry.dispose();
      nodeMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      renderer.dispose();
    };
  }, [variant, prefersReduced]);

  if (prefersReduced || fallbackActive) {
    return null;
  }

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
    />
  );
};
