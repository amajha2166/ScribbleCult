"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 2500) // duration of preloader

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: "-100%" }}
      transition={{ delay: 2, duration: 1, ease: "easeInOut" }}
      className="fixed inset-0 z-[99999] bg-black text-white flex items-center justify-center"
    >
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-6xl font-extrabold tracking-wide"
      >
        Scribblecult
      </motion.h1>
    </motion.div>
  )
}
