"use client"

import { motion, useAnimation, Variants } from "framer-motion"
import { useEffect, useRef } from "react"
import { useInView } from "framer-motion"

interface AnimatedTextProps {
  text: string
  className?: string
}

export default function AnimatedText({ text, className = "" }: AnimatedTextProps) {
  const controls = useAnimation()
  const ref = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const letters = text.split("")

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.04,
      },
    },
  }

  const child: Variants = {
    hidden: {
      y: "120%",
      opacity: 0,
    },
    visible: {
      y: "0%",
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.19, 1, 0.22, 1],
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={controls}
      className={`overflow-hidden ${className}`}
      style={{ display: "inline-block" }}
    >
      {letters.map((char, index) => (
        <motion.span
          key={index}
          variants={child}
          style={{ display: "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  )
}
