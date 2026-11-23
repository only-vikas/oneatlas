"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * ModelField Scene (used on "/" and "/models"):
 * 120 softly drifting points in --signal-sky (#38BDF8)
 */
function ModelField({ isCompact = false }: { isCompact?: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, originalY] = useMemo(() => {
    const count = 120;
    const pos = new Float32Array(count * 3);
    const origY = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const radius = 2.5 + Math.random() * 3.5;
      const theta = Math.random() * Math.PI * 2;
      const ySpread = isCompact ? 1.0 : 3.0;
      const y = (Math.random() - 0.5) * ySpread + (isCompact ? 1.2 : 0);

      pos[i * 3] = Math.cos(theta) * radius;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(theta) * radius;
      origY[i] = y;
    }
    return [pos, origY];
  }, [isCompact]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.04;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;

    // Subtle breathing displacement
    const geom = pointsRef.current.geometry;
    const posAttr = geom.attributes.position;
    if (posAttr) {
      const time = state.clock.elapsedTime;
      for (let i = 0; i < 120; i++) {
        const currY = originalY[i] + Math.sin(time + i * 0.5) * 0.08;
        posAttr.setY(i, currY);
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={isCompact ? 0.04 : 0.05}
        color="#38BDF8"
        transparent
        opacity={isCompact ? 0.45 : 0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/**
 * RoutingGraph Scene (used on "/models/[slug]"):
 * Central --signal-amber (#F59E0B) model node orbited by 4 provider nodes with lines
 */
function RoutingGraph() {
  const groupRef = useRef<THREE.Group>(null);
  const centralMeshRef = useRef<THREE.Mesh>(null);
  const [pulseIntensity, setPulseIntensity] = useState(1);

  // Listen for routing pulse event from cost simulator or endpoint tests
  useEffect(() => {
    const handlePulse = () => {
      setPulseIntensity(2.2);
      setTimeout(() => setPulseIntensity(1), 600);
    };
    window.addEventListener("oneatlas:routing-pulse", handlePulse);
    return () => window.removeEventListener("oneatlas:routing-pulse", handlePulse);
  }, []);

  const providerOffsets = useMemo(
    () => [
      [-1.8, 0.7, 0.5],
      [1.8, 0.9, -0.4],
      [-1.2, -1.0, 0.8],
      [1.4, -0.8, -0.6],
    ],
    []
  );

  const lineGeometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const center = new THREE.Vector3(0, 0, 0);
    providerOffsets.forEach((pos) => {
      points.push(center);
      points.push(new THREE.Vector3(...pos));
    });
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [providerOffsets]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.08;

    if (centralMeshRef.current) {
      const scale = THREE.MathUtils.lerp(
        centralMeshRef.current.scale.x,
        pulseIntensity,
        delta * 6
      );
      centralMeshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Model Node (Amber) */}
      <mesh ref={centralMeshRef}>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshBasicMaterial
          color="#F59E0B"
          wireframe
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Orbiting Provider Nodes (Sky Blue) */}
      {providerOffsets.map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshBasicMaterial color="#38BDF8" transparent opacity={0.7} />
        </mesh>
      ))}

      {/* Interconnect Lines */}
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial
          color="rgba(255,255,255,0.14)"
          transparent
          opacity={0.35}
        />
      </lineSegments>
    </group>
  );
}

/**
 * Persistent Ambient Canvas:
 * Reads route pathname and switches modes or pauses frameloop gracefully
 */
export default function AmbientCanvas() {
  const pathname = usePathname();
  const [hasWebGL, setHasWebGL] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Detect prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPrefersReducedMotion(true);
    }

    // Detect basic WebGL support
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }
  }, []);

  const routeMode = useMemo(() => {
    if (!pathname || pathname === "/") return "hero-field";
    if (pathname === "/models") return "models-compact";
    if (pathname.startsWith("/models/")) return "routing-graph";
    return "idle";
  }, [pathname]);

  // Fallback if reduced motion or WebGL is unsupported
  if (!hasWebGL || prefersReducedMotion) {
    return (
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-20 bg-dot-matrix [mask-image:linear-gradient(to_bottom,black_30%,transparent_100%)]"
        aria-hidden="true"
      />
    );
  }

  const isVisible = routeMode !== "idle";

  return (
    <div
      className={`fixed inset-0 z-0 pointer-events-none transition-opacity duration-700 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      <Canvas
        dpr={[1, 1.5]}
        frameloop={isVisible ? "always" : "demand"}
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "low-power",
        }}
        style={{ pointerEvents: "none" }}
      >
        {routeMode === "hero-field" && <ModelField isCompact={false} />}
        {routeMode === "models-compact" && <ModelField isCompact={true} />}
        {routeMode === "routing-graph" && <RoutingGraph />}
      </Canvas>
    </div>
  );
}
