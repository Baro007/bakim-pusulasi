'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Animated 3D Gradient Mesh Background
 * Mobile-optimized with reduced vertex count and frame rate throttling
 */

interface AnimatedSphereProps {
  isMobile: boolean;
}

function AnimatedSphere({ isMobile }: AnimatedSphereProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);

  // Optimize geometry based on device
  const geometry = useMemo(() => {
    // Mobile: lower poly count for performance
    const segments = isMobile ? 32 : 64;
    return new THREE.IcosahedronGeometry(2, segments);
  }, [isMobile]);

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return;

    // Slow rotation for elegance
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = time * 0.05;
    meshRef.current.rotation.y = time * 0.08;

    // Pulse effect (subtle)
    const scale = 1 + Math.sin(time * 0.3) * 0.05;
    meshRef.current.scale.setScalar(scale);
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <MeshDistortMaterial
        ref={materialRef}
        color="#0d9488" // teal-600
        attach="material"
        distort={isMobile ? 0.2 : 0.4} // Less distortion on mobile
        speed={1.5}
        roughness={0.4}
        metalness={0.8}
        emissive="#06b6d4" // cyan-500
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

interface GradientMeshProps {
  className?: string;
  opacity?: number;
}

export default function GradientMesh({ className = '', opacity = 0.6 }: GradientMeshProps) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Reduce motion support
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // Fallback to static gradient
    return (
      <div
        className={`absolute inset-0 bg-gradient-to-br from-teal-500/20 via-blue-500/20 to-purple-500/20 ${className}`}
        style={{ opacity }}
      />
    );
  }

  return (
    <div className={`absolute inset-0 ${className}`} style={{ opacity }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={isMobile ? 1 : 1.5} // Lower DPR on mobile
        performance={{ min: 0.5 }} // Adaptive performance
        gl={{
          antialias: !isMobile, // Disable antialiasing on mobile
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#a855f7" />

        {/* Animated sphere */}
        <AnimatedSphere isMobile={isMobile} />
      </Canvas>
    </div>
  );
}




