"use client"

import dynamic from "next/dynamic"

const BackgroundScene = dynamic(
  () => import("./three/BackgroundScene"),
  { ssr: false }
)

export default function ClientBackground() {
  return <BackgroundScene />
}
