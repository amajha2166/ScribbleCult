"use client"

import { shaderMaterial } from "@react-three/drei"
import { extend, useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"

const GradientMaterial = shaderMaterial(
  { uTime: 0 },
  // vertex shader
  `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  // fragment shader
  `
  varying vec2 vUv;
  uniform float uTime;

  void main() {
    vec2 uv = vUv;

    float wave = sin(uv.y * 10.0 + uTime) * 0.05;
    uv.x += wave;

    vec3 color1 = vec3(0.42, 0.36, 0.91);
    vec3 color2 = vec3(0.0, 0.96, 0.63);
    vec3 color3 = vec3(0.98, 0.35, 0.82);

    vec3 color = mix(color1, color2, uv.y);
    color = mix(color, color3, uv.x);

    gl_FragColor = vec4(color, 1.0);
  }
  `
)

extend({ GradientMaterial })

export default function GradientBackground() {
  const materialRef = useRef<any>(null)

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uTime = clock.getElapsedTime()
    }
  })

  return (
    <mesh scale={[10, 10, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      {/* @ts-ignore */}
      <gradientMaterial ref={materialRef} />
    </mesh>
  )
}
