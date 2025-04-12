import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useGLTF } from '@react-three/drei';
import { useUIStore } from '../store/uiStore';
import * as THREE from 'three'; // Import everything from 'three' as THREE
// import { useGLTF } from '@react-three/drei'; // Ensure this is correctly imported

function BrainMesh({ highlightRegion = '' }) {
  const { scene, nodes, materials } = useGLTF('/brain2.glb'); // Load the GLB file

  // Example: Highlight specific regions by modifying material properties
  if (highlightRegion && nodes[highlightRegion]) {
    (nodes[highlightRegion] as THREE.Mesh).material = new THREE.MeshStandardMaterial({
      color: '#FF3B30',
      emissive: '#FF3B30',
      emissiveIntensity: 0.5,
    });
  }

  return <primitive object={scene} />;
}

export function BrainModel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isNotificationsOpen } = useUIStore();

  return (
    <motion.div
      ref={containerRef}
      className={`w-full h-[600px] relative ${isNotificationsOpen ? 'opacity-20' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isNotificationsOpen ? 0.2 : 1 }}
      transition={{ duration: 0.5 }}
    >
      <Canvas camera={{ position: [0, 0, 5] }}>
        <Stage environment="city" intensity={0.5}>
          <BrainMesh highlightRegion="prefrontalCortex" />
        </Stage>
        <OrbitControls enableZoom={true} enablePan={false} />
      </Canvas>
    </motion.div>
  );
}

// Ensure to preload the GLB file
useGLTF.preload('/brain.glb');