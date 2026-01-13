"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    title: "Chaos",
    desc: "Raw ideas, scattered thoughts, undefined vision.",
    big: "CHAOS",
  },
  {
    title: "Strategy",
    desc: "We shape direction, define voice & build structure.",
    big: "STRATEGY",
  },
  {
    title: "Creation",
    desc: "Content, visuals, videos – everything comes alive.",
    big: "CREATION",
  },
  {
    title: "Cult Brand",
    desc: "Your brand becomes recognizable, trusted, followed.",
    big: "CULT",
  },
]

export default function Process() {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
  if (!containerRef.current) return

  const sections = containerRef.current.querySelectorAll(".process-step")

  sections.forEach((section) => {
    gsap.fromTo(
  section,
  { opacity: 0, y: 100, scale: 0.95, filter: "blur(10px)" },
  {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    duration: 1,
    ease: "power4.out",
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
      end: "top 20%",
      toggleActions: "play reverse play reverse",
    },
  }
)

  })
}, [])


  return (
    <section
      ref={containerRef}
      className="relative min-h-screen px-16 py-32 bg-white dark:bg-black overflow-hidden"
    >
      <h2 className="text-5xl font-bold mb-24">How We Build Brands</h2>

      <div className="space-y-32">
        {steps.map((step, index) => (
          <div
            key={index}
            className="process-step relative flex items-center gap-16"
          >
            {/* Big Background Word */}
            <span className="absolute -top-20 left-0 text-[120px] font-black opacity-5 select-none">
              {step.big}
            </span>

            {/* Index */}
            <div className="text-4xl font-bold opacity-40">0{index + 1}</div>

            {/* Content */}
            <div>
              <h3 className="text-3xl font-semibold mb-4">{step.title}</h3>
              <p className="text-lg opacity-70 max-w-xl">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
