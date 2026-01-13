"use client"

import { Canvas } from "@react-three/fiber"
import GradientBackground from "./GradientBackground"

export default function BackgroundScene() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 2] }}>
        <GradientBackground />
      </Canvas>
    </div>
  )
}
