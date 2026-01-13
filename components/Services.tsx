"use client"

import AnimatedText from "./AnimatedText"
import ServiceCard from "./ServiceCard"




import { motion } from "framer-motion"

const services = [
  {
    title: "Script Writing",
    desc: "Compelling scripts that convert attention into action.",
  },
  {
    title: "Content Creation",
    desc: "High-impact content tailored for each platform.",
  },
  {
    title: "Social Media Management",
    desc: "We grow, manage & scale your digital presence.",
  },
  {
    title: "Content Shooting",
    desc: "Cinematic shoots that define your brand identity.",
  },
  {
    title: "Video Editing",
    desc: "Fast, sharp & engaging edits that keep viewers hooked.",
  },
  {
    title: "Graphic Designing",
    desc: "Visuals that make your brand instantly recognizable.",
  },
]

export default function Services() {
  return (
    <section className="min-h-screen px-16 py-32 bg-gray-50 dark:bg-neutral-950">
      <h2 className="text-5xl font-bold mb-16">
      <AnimatedText text="What We Do" />
      </h2>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {services.map((service, index) => (
          <ServiceCard key={index} title={service.title} desc={service.desc} />
        ))}
      </div>
    </section>
  )
}
