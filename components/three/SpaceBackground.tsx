import React, { useRef, useMemo, useEffect, RefObject, forwardRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

type ClockStateType = { clock: { getElapsedTime: () => number } };

// A floating object in space with a glow effect
interface FloatingObjectProps {
  position: THREE.Vector3 | [number, number, number];
  size: number;
  color: string;
}

const FloatingObject: React.FC<FloatingObjectProps> = ({ position = [0, 0, 0], size = 1, color = '#6644ff' }) => {
  const mesh = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    // Type assertion here as react-three-fiber includes clock but TypeScript doesn't recognize it
    const time = (state as unknown as ClockStateType).clock.getElapsedTime();
    if (mesh.current) {
      mesh.current.rotation.x = Math.sin(time / 4) * 0.3;
      mesh.current.rotation.y = Math.sin(time / 2) * 0.2;
      mesh.current.position.y = Math.sin(time / 4) * 0.5;
    }
  });

  // Convert position array to Vector3 if needed
  const positionVector = Array.isArray(position) ? new THREE.Vector3(...position) : position;

  return (
    <mesh ref={mesh} position={positionVector}>
      <octahedronGeometry args={[size, 0]} />
      <meshStandardMaterial 
        color={color} 
        roughness={0.3}
        metalness={0.8}
        emissive={color}
        emissiveIntensity={0.5}
      />
    </mesh>
  );
};

// A planet object that rotates slowly
interface PlanetProps {
  position: THREE.Vector3 | [number, number, number];
  size: number;
  color: string;
  texture?: string; // Making texture optional with ?
}

const Planet = forwardRef<THREE.Mesh, PlanetProps>((props, ref) => {
  const mesh = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    // Type assertion here as react-three-fiber includes clock but TypeScript doesn't recognize it
    const time = (state as unknown as ClockStateType).clock.getElapsedTime();
    if (mesh.current) {
      mesh.current.rotation.y = time * 0.1;
    }
  });

  // Convert position array to Vector3 if needed
  const positionVector = Array.isArray(props.position) ? new THREE.Vector3(...props.position) : props.position;

  return (
    <mesh ref={ref as RefObject<THREE.Mesh>} position={positionVector}>
      <sphereGeometry args={[props.size, 32, 32]} />
      <meshStandardMaterial 
        color={props.color}
        roughness={0.8}
        metalness={0.2}
      />
    </mesh>
  );
});

// The particles effect for stars
const ParticleField: React.FC = () => {
  const count = 2000;
  const { viewport } = useThree();
  
  // Generate random positions for particles
  const particles = useMemo(() => {
    const temp: number[] = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 100;
      const y = (Math.random() - 0.5) * 100;
      const z = (Math.random() - 0.5) * 100;
      temp.push(x, y, z);
    }
    return temp;
  }, []);
  
  const particlesRef = useRef<THREE.Points>(null!);
  
  useFrame((state) => {
    if (particlesRef.current) {
      // Type assertion here as react-three-fiber includes clock but TypeScript doesn't recognize it
      const time = (state as unknown as ClockStateType).clock.getElapsedTime();
      particlesRef.current.rotation.x = time * 0.01;
      particlesRef.current.rotation.y = time * 0.02;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={new Float32Array(particles)}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.1} 
        color="#ffffff" 
        sizeAttenuation 
        transparent
      />
    </points>
  );
};

// The main scene component
const SpaceScene: React.FC = () => {
  const { camera } = useThree();
  
  // Apply scroll parallax effect to camera
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      camera.position.y = -scrollY * 0.005;
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [camera]);

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={new THREE.Vector3(10, 10, 5)} intensity={1} />
      <pointLight position={new THREE.Vector3(-10, -10, -10)} color="#6644ff" intensity={1} />
      
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <ParticleField />
      
      <FloatingObject position={new THREE.Vector3(3, 0, 0)} size={0.8} color="#a480ff" />
      <FloatingObject position={new THREE.Vector3(-4, 2, -6)} size={1.2} color="#6644ff" />
      <FloatingObject position={new THREE.Vector3(0, -2, -10)} size={1.5} color="#8866ff" />
      
      <Planet position={new THREE.Vector3(-8, -3, -10)} size={3} color="#243c6f" texture={undefined} />
      <Planet position={new THREE.Vector3(10, 5, -15)} size={2} color="#1a1a2e" texture={undefined} />
    </>
  );
};

// The main exported component

const SpaceBackground: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-0 bg-black">
      <Canvas camera={{ position: new THREE.Vector3(0, 0, 10), fov: 60 }}>
        <SpaceScene />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          enableRotate={true} 
          rotateSpeed={0.1} 
          autoRotate 
          autoRotateSpeed={0.2}
        />
      </Canvas>
    </div>
  );
};

export default SpaceBackground;
