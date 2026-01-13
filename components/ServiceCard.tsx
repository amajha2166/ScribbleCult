"use client"

import { motion, useMotionValue, useTransform } from "framer-motion"
import { useRef, useState } from "react"

interface ServiceCardProps {
  title: string
  desc: string
}

export default function ServiceCard({ title, desc }: ServiceCardProps) {
  const ref = useRef<HTMLDivElement | null>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useTransform(y, [-50, 50], [15, -15])
  const rotateY = useTransform(x, [-50, 50], [-15, 15])

  const [glow, setGlow] = useState({ x: 0, y: 0 })

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const offsetX = e.clientX - rect.left - rect.width / 2
    const offsetY = e.clientY - rect.top - rect.height / 2

    x.set(offsetX)
    y.set(offsetY)

    setGlow({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative p-8 rounded-2xl bg-white dark:bg-neutral-900 shadow-xl cursor-pointer overflow-hidden"
    >
      {/* Cursor Glow */}
      <div
        className="pointer-events-none absolute w-32 h-32 bg-purple-500/30 rounded-full blur-3xl transition-opacity"
        style={{
          left: glow.x - 64,
          top: glow.y - 64,
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/10 to-cyan-400/10 opacity-0 hover:opacity-100 transition" />

      {/* Content */}
      <h3 className="text-2xl font-semibold mb-4 relative z-10">
        {title}
      </h3>

      <p className="opacity-70 relative z-10">
        {desc}
      </p>
    </motion.div>
  )
}
