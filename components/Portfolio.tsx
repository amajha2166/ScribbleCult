"use client"

import { motion } from "framer-motion"

const projects = [
  {
    title: "Luxury Fashion Brand",
    category: "Branding + Social Media",
    desc: "Built a premium visual identity and social presence from scratch.",
    image: "/project1.jpg",
  },
  {
    title: "Tech Startup Launch",
    category: "Content + Strategy",
    desc: "Created launch content and positioning for a SaaS startup.",
    image: "/project2.jpg",
  },
  {
    title: "Restaurant Rebrand",
    category: "Design + Video",
    desc: "Complete visual overhaul with cinematic food content.",
    image: "/project3.avif",
  },
]

export default function Portfolio() {
  return (
    <section className="min-h-screen px-16 py-32 bg-neutral-950 text-white">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-6xl font-extrabold mb-20"
      >
        Selected Work
      </motion.h2>

      <div className="space-y-24">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: index * 0.1 }}
            className="group grid grid-cols-2 gap-16 items-center"
          >
            {/* Image */}
            <div className="relative overflow-hidden rounded-2xl group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-cyan-400/30 opacity-0 group-hover:opacity-100 transition duration-500" />
  
          <img
            src={project.image}
            alt={project.title}
           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          <div className="absolute inset-0 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition duration-500" />
          </div>


            {/* Text */}
            <div>
              <span className="text-sm uppercase tracking-widest opacity-60">
                {project.category}
              </span>
              <h3 className="text-4xl font-bold mt-4 mb-6">
                {project.title}
              </h3>
              <p className="opacity-70 max-w-md">
                {project.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
