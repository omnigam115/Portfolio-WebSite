// HeroScene3D.jsx — Three.js / R3F hero canvas scene
// Floating distortion orb + orbit rings + satellite orbs + star field
import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Float, Torus, Sphere, MeshDistortMaterial, Line } from '@react-three/drei'
import * as THREE from 'three'

/* ── Central distortion sphere ────────────────────────────────── */
function CoreOrb() {
  const meshRef = useRef()
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.15
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.2
    }
  })
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1.3, 64, 64]}>
        <MeshDistortMaterial
          color="#00d4ff"
          emissive="#003d5c"
          emissiveIntensity={0.6}
          distort={0.45}
          speed={2.5}
          roughness={0}
          metalness={0.9}
          transparent
          opacity={0.88}
        />
      </Sphere>
    </Float>
  )
}

/* ── Orbit ring ───────────────────────────────────────────────── */
function OrbitRing({ radius, color, speed, tilt = 0 }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * speed
      ref.current.rotation.z = tilt
    }
  })
  return (
    <Torus ref={ref} args={[radius, 0.018, 16, 120]}>
      <meshBasicMaterial color={color} transparent opacity={0.5} />
    </Torus>
  )
}

/* ── Satellite orb ────────────────────────────────────────────── */
function SatelliteOrb({ orbitRadius, orbitSpeed, orbitOffset, size, color }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime() * orbitSpeed + orbitOffset
      ref.current.position.x = Math.cos(t) * orbitRadius
      ref.current.position.z = Math.sin(t) * orbitRadius
      ref.current.position.y = Math.sin(t * 0.5) * 0.5
    }
  })
  return (
    <Float speed={3} floatIntensity={0.5}>
      <Sphere ref={ref} args={[size, 16, 16]}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.2}
          roughness={0.1}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  )
}

/* ── DNA double-helix — COMMENTED OUT (hidden from hero scene) ── */
// function DNAHelix() {
//   const groupRef = useRef()
//   const COUNT = 60
//
//   const points = useMemo(() => {
//     const strand1 = [], strand2 = []
//     for (let i = 0; i < COUNT; i++) {
//       const t = i / COUNT
//       const a = t * Math.PI * 8
//       const y = (t - 0.5) * 7
//       strand1.push(new THREE.Vector3(Math.cos(a) * 0.9, y, Math.sin(a) * 0.9))
//       strand2.push(new THREE.Vector3(Math.cos(a + Math.PI) * 0.9, y, Math.sin(a + Math.PI) * 0.9))
//     }
//     return { strand1, strand2 }
//   }, [])
//
//   useFrame(({ clock }) => {
//     if (groupRef.current) groupRef.current.rotation.y = clock.getElapsedTime() * 0.25
//   })
//
//   return (
//     <group ref={groupRef} position={[4.5, 0, 0]}>
//       {points.strand1.map((p, i) => (
//         <mesh key={`s1-${i}`} position={p}>
//           <sphereGeometry args={[0.04, 6, 6]} />
//           <meshBasicMaterial color="#00d4ff" />
//         </mesh>
//       ))}
//       {points.strand2.map((p, i) => (
//         <mesh key={`s2-${i}`} position={p}>
//           <sphereGeometry args={[0.04, 6, 6]} />
//           <meshBasicMaterial color="#7b2ff7" />
//         </mesh>
//       ))}
//       {points.strand1.filter((_, i) => i % 4 === 0).map((p, i) => {
//         const q = points.strand2[i * 4]
//         if (!q) return null
//         return (
//           <Line
//             key={`b-${i}`}
//             points={[p, q]}
//             color="rgba(255,255,255,0.15)"
//             lineWidth={0.5}
//           />
//         )
//       })}
//     </group>
//   )
// }

/* ── Floating tech label planes ──────────────────────────────── */
function FloatingLabel({ position, color, delay = 0 }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 0.8 + delay) * 0.4
      ref.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.3 + delay) * 0.2
    }
  })
  return (
    <mesh ref={ref} position={position}>
      <planeGeometry args={[1.1, 0.45]} />
      <meshBasicMaterial color={color} transparent opacity={0.12} side={THREE.DoubleSide} />
    </mesh>
  )
}

/* ── Scene camera auto-rotate ─────────────────────────────────── */
function CameraRig() {
  useFrame(({ camera, clock }) => {
    const t = clock.getElapsedTime()
    camera.position.x = Math.sin(t * 0.08) * 1.5
    camera.position.y = Math.cos(t * 0.06) * 0.6
    camera.lookAt(0, 0, 0)
  })
  return null
}

/* ── Root export ─────────────────────────────────────────────── */
export default function HeroScene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 55 }}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[6,  6, 6]}  color="#00d4ff" intensity={3} />
      <pointLight position={[-5,-4, 4]}  color="#7b2ff7" intensity={2} />
      <pointLight position={[0,  0, 12]} color="#ff006e" intensity={0.8} />

      <Suspense fallback={null}>
        <Stars radius={120} depth={60} count={3500} factor={4} fade speed={0.8} />

        {/* Core orb */}
        <CoreOrb />

        {/* Orbit rings */}
        <OrbitRing radius={2.4} color="#00d4ff" speed={0.6}  tilt={0} />
        <OrbitRing radius={3.2} color="#7b2ff7" speed={-0.4} tilt={Math.PI / 5} />
        <OrbitRing radius={4.0} color="#ff006e" speed={0.25} tilt={Math.PI / 3} />

        {/* Satellite orbs */}
        <SatelliteOrb orbitRadius={2.4} orbitSpeed={0.6}  orbitOffset={0}         size={0.22} color="#00d4ff" />
        <SatelliteOrb orbitRadius={3.2} orbitSpeed={-0.4} orbitOffset={Math.PI}   size={0.18} color="#7b2ff7" />
        <SatelliteOrb orbitRadius={4.0} orbitSpeed={0.25} orbitOffset={Math.PI/2} size={0.14} color="#ff006e" />

        {/* DNA helix — removed ❌ */}
        {/* <DNAHelix /> */}

        {/* Floating label cards (left side) */}
        <FloatingLabel position={[-5,   2, 0]} color="#00d4ff" delay={0} />
        <FloatingLabel position={[-5.5, 0, 0]} color="#7b2ff7" delay={1} />
        <FloatingLabel position={[-4.8,-2, 0]} color="#00ff88" delay={2} />
      </Suspense>

      <CameraRig />
    </Canvas>
  )
}