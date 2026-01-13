"use client"

import { motion } from "framer-motion"
import MagneticButton from "./MagneticButton"

export default function ContactSection() {
  return (
    <section className="min-h-screen px-16 py-32 bg-black text-white dark:bg-white dark:text-black flex flex-col justify-center">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-6xl font-extrabold mb-12"
      >
        Let’s Build Your Brand
      </motion.h2>

      <motion.form
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="max-w-xl space-y-8"
      >
        <Input label="Name" type="text" />
        <Input label="Email" type="email" />
        <Input label="Project Details" type="text" textarea />

        <MagneticButton className="mt-6 px-10 py-4 rounded-full bg-white text-black dark:bg-black dark:text-white text-lg">
          Start the Cult 🚀
        </MagneticButton>
      </motion.form>
    </section>
  )
}

function Input({ label, type, textarea = false }: { label: string; type: string; textarea?: boolean }) {
  return (
    <div className="relative">
      {textarea ? (
        <textarea
          placeholder={label}
          className="w-full bg-transparent border-b border-white/40 dark:border-black/40 py-3 outline-none focus:border-white dark:focus:border-black transition"
          rows={4}
        />
      ) : (
        <input
          type={type}
          placeholder={label}
          className="w-full bg-transparent border-b border-white/40 dark:border-black/40 py-3 outline-none focus:border-white dark:focus:border-black transition"
        />
      )}
    </div>
  )
}
