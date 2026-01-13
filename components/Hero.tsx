"use client"
import { motion } from "framer-motion"
import dynamic from "next/dynamic"
import MagneticButton from "./MagneticButton"
import AnimatedText from "./AnimatedText"
const Scene = dynamic(() => import("./three/Scene"), { ssr: false, loading: () => <div className="w-full h-full bg-transparent" /> })

export default function Hero() {
  return (
    <section className="h-screen flex items-center justify-between px-16 pt-24">
      {/* Left Content */}
      <div className="max-w-xl">
        <h1 className="text-[64px] leading-[1.05] font-extrabold tracking-tight">
          <AnimatedText text="Scribblecult" />
        </h1>


        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-lg text-neutral-600 dark:text-neutral-400 max-w-md"
        >
          We turn ideas into iconic brands.
        </motion.p>

        <MagneticButton className="mt-8 px-8 py-4 rounded-full bg-black text-white dark:bg-white dark:text-black">
          Build Your Brand
        </MagneticButton>

      </div>

      {/* Right 3D Scene */}
      <div className="w-[40vw] h-[40vw]">
        <Scene />
      </div>
    </section>
  )
}
