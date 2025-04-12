"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stage } from "@react-three/drei"
import { motion } from "framer-motion"
import { useGLTF } from "@react-three/drei"
import * as THREE from "three"
import { Activity, Brain, Zap, BarChart3, ArrowRight } from "lucide-react"

// function BrainMesh({ color = "#4B9FFF", opacity = 0.7, highlightRegion = "" }) {
//   const [scene, setScene] = useState<THREE.Group | null>(null)
//   const gltf = useGLTF("/brain.glb") as unknown as { scene: THREE.Group }

//   useEffect(() => {
//     if (gltf?.scene) {
//       // Clone the scene to allow multiple independent instances
//       const clonedScene = gltf.scene.clone()

//       // Apply material properties to all meshes in the cloned scene
//       clonedScene.traverse((child) => {
//         if (child instanceof THREE.Mesh) {
//           child.material = new THREE.MeshStandardMaterial({
//             color: highlightRegion ? "#FF3B30" : color, // Highlight if region matches
//             transparent: true,
//             opacity: opacity,
//             emissive: highlightRegion ? "#FF3B30" : "#000000",
//             emissiveIntensity: highlightRegion ? 0.5 : 0,
//             depthWrite: false, // Prevent z-fighting issues
//           })
//         }
//       })
//       setScene(clonedScene)
//     }
//   }, [gltf, color, opacity, highlightRegion])

//   if (!scene) {
//     return <div>Loading 3D model...</div>
//   }

//   return <primitive object={scene} />
// }
function BrainMesh({ color = '#4B9FFF', opacity = 0.7, highlightRegion = '' }) {
  try {
    const { scene } = useGLTF('/brain2.glb') as unknown as {
      scene: THREE.Group;
    };

    if (!scene) {
      console.error('GLTF scene could not be loaded.');
      return <div>Error: 3D model could not be loaded.</div>;
    }

    // Clone the scene to allow multiple independent instances
    const clonedScene = scene.clone();

    // Apply material properties to all meshes in the cloned scene
    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: highlightRegion ? '#FF3B30' : color, // Highlight if region matches
          transparent: true,
          opacity: opacity,
          emissive: highlightRegion ? '#FF3B30' : '#000000',
          emissiveIntensity: highlightRegion ? 0.5 : 0,
          depthWrite: false, // Prevent z-fighting issues
        });
      }
    });

    return <primitive object={clonedScene} />;
  } catch (error) {
    console.error('Error loading GLTF file:', error);
    return <div>Error: Unable to load 3D model.</div>;
  }
}

const stats = [
  {
    label: "Activity Index",
    value: "87%",
    color: "from-blue-500 to-blue-600",
    icon: Activity,
    description: "Neural activity compared to baseline",
  },
  {
    label: "Neural Symmetry",
    value: "92%",
    color: "from-emerald-500 to-emerald-600",
    icon: Brain,
    description: "Left-right hemisphere balance",
  },
  {
    label: "Health Score",
    value: "95%",
    color: "from-violet-500 to-purple-600",
    icon: Zap,
    description: "Overall brain health assessment",
  },
]

export function DigitalTwin() {
  const controlsRef = useRef(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8">
      {/* Background decorative elements */}
      <div className="fixed inset-0 z-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-300 to-transparent opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-3/4 h-3/4 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-purple-400 to-transparent opacity-20"></div>
      </div>

      <div className="relative z-10">
        <header className="mb-12">
          <motion.h1
            className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Digital Twin Analysis
          </motion.h1>
          <motion.p
            className="text-slate-300 mt-4 max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Visualize and compare your brain's digital representation with reference models to track neural patterns and
            health metrics.
          </motion.p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Reference Brain */}
          <motion.div
            className="rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 shadow-xl overflow-hidden"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                  <Brain className="w-5 h-5 text-blue-400" />
                </div>
                <h2 className="text-xl font-semibold">Reference Brain</h2>
              </div>
              <p className="text-slate-300 mt-2 text-sm">Standard neural pattern baseline</p>
            </div>
            <div className="h-[400px] w-full relative">
              <Canvas camera={{ position: [0, 0, 5] }} gl={{ antialias: true }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <Stage environment="city" intensity={0.6}>
                  <BrainMesh color="#4B9FFF" opacity={0.9} />
                </Stage>
                <OrbitControls ref={controlsRef} enableZoom={true} enablePan={false} autoRotate autoRotateSpeed={0.5} />
              </Canvas>
              <div className="absolute bottom-4 right-4 bg-black/30 backdrop-blur-md rounded-lg px-3 py-2 text-xs text-white/80">
                <div className="flex items-center">
                  <BarChart3 className="w-3 h-3 mr-1" />
                  <span>Drag to rotate</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* User's Brain */}
          <motion.div
            className="rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 shadow-xl overflow-hidden"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center mr-4">
                  <Brain className="w-5 h-5 text-red-400" />
                </div>
                <h2 className="text-xl font-semibold">Your Brain</h2>
              </div>
              <p className="text-slate-300 mt-2 text-sm">
                <span className="inline-flex items-center bg-red-500/20 text-red-300 px-2 py-0.5 rounded text-xs mr-2">
                  Highlighted: Prefrontal Cortex
                </span>
                Current neural activity visualization
              </p>
            </div>
            <div className="h-[400px] w-full relative">
              <Canvas camera={{ position: [0, 0, 5] }} gl={{ antialias: true }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <Stage environment="city" intensity={0.6}>
                  <BrainMesh color="#FF3B30" opacity={0.9} highlightRegion="prefrontalCortex" />
                </Stage>
                <OrbitControls enableZoom={true} enablePan={false} autoRotate autoRotateSpeed={0.5} />
              </Canvas>
              <div className="absolute bottom-4 right-4 bg-black/30 backdrop-blur-md rounded-lg px-3 py-2 text-xs text-white/80">
                <div className="flex items-center">
                  <BarChart3 className="w-3 h-3 mr-1" />
                  <span>Drag to rotate</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <Activity className="mr-2 text-blue-400" />
            Neural Metrics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="rounded-xl backdrop-blur-md bg-white/10 border border-white/20 shadow-xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className={`h-2 bg-gradient-to-r ${stat.color}`}></div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <div
                      className={`w-10 h-10 rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center mr-3`}
                    >
                      <stat.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold">{stat.label}</h3>
                  </div>
                  <p className="text-sm text-slate-300 mb-4">{stat.description}</p>
                  <div className="flex items-end justify-between">
                    <p className={`text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${stat.color}`}>
                      {stat.value}
                    </p>
                    <div className="flex items-center text-xs text-slate-300">
                      <span className="mr-1">View details</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Additional information section */}
        <motion.div
          className="rounded-xl backdrop-blur-md bg-white/5 border border-white/10 p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <h3 className="text-lg font-semibold mb-3">Analysis Summary</h3>
          <p className="text-slate-300 mb-4">
            Your brain's digital twin shows excellent overall health metrics with strong neural symmetry. The prefrontal
            cortex region shows slightly elevated activity compared to the reference model, which may indicate increased
            cognitive processing or focus.
          </p>
          <div className="flex justify-end">
            <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium text-sm flex items-center">
              View Full Report
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// Preload the GLB file
useGLTF.preload("/brain.glb")
