'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Interactive Particle Field
 * Reacts to mouse movement and scroll
 * Mobile-optimized with reduced particle count
 */

interface ParticlesProps {
  count: number;
  mouseX: number;
  mouseY: number;
}

function Particles({ count, mouseX, mouseY }: ParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate particle positions
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const time = state.clock.getElapsedTime();

    // Gentle wave motion
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const x = positions[i3];
      const y = positions[i3 + 1];

      positions[i3 + 2] = Math.sin(x + time * 0.3) * 0.5 + Math.cos(y + time * 0.2) * 0.5;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Mouse parallax (subtle)
    pointsRef.current.rotation.x = mouseY * 0.05;
    pointsRef.current.rotation.y = mouseX * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#06b6d4" // cyan-500
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

interface ParticleFieldProps {
  className?: string;
}

export default function ParticleField({ className = '' }: ParticleFieldProps) {
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const particleCount = isMobile ? 50 : 200; // Drastically reduced for mobile

  // Reduce motion support
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  React.useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return null; // Skip particles if reduced motion is preferred
  }

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={isMobile ? 1 : 1.5}
        gl={{
          antialias: false, // Disable for performance
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <Particles count={particleCount} mouseX={mousePos.x} mouseY={mousePos.y} />
      </Canvas>
    </div>
  );
}

