"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"

export default function Logo3D() {
  const ref = useRef<any>(null)
  const { scene } = useGLTF("/logo3d.glb")

  useFrame(() => {
    if (!ref.current) return
    ref.current.rotation.y += 0.003
  })

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={3}
      position={[0, 0, 0]}
    />
  )
}
