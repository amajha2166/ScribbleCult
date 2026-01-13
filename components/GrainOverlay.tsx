"use client"

export default function GrainOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[9998] opacity-[100%]">
      <div
        className="w-full h-full"
        style={{
          backgroundImage: `
            repeating-radial-gradient(circle at 0 0, transparent 0, rgba(0,0,0,0.15) 1px, transparent 2px),
            repeating-linear-gradient(transparent, rgba(0,0,0,0.1) 1px, transparent 2px)
          `,
          mixBlendMode: "overlay",
        }}
      />
    </div>
  )
}
