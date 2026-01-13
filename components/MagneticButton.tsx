"use client"

import { useRef } from "react"

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
}

export default function MagneticButton({
  children,
  className = "",
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement | null>(null)

  function handleMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
    const btn = ref.current
    if (!btn) return

    const rect = btn.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    btn.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`
  }

  function handleMouseLeave() {
    const btn = ref.current
    if (!btn) return
    btn.style.transform = "translate(0px, 0px)"
  }

  return (
    <button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full transition-transform duration-300 ease-out ${className}`}
      {...props}
    >
      {/* Shine sweep */}
      <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
        <span className="absolute -left-full top-0 h-full w-full bg-white/20 transform skew-x-12 group-hover:translate-x-[200%] transition-transform duration-700" />
      </span>

      {/* Content */}
      <span className="relative z-10">
        {children}
      </span>
    </button>
  )
}
