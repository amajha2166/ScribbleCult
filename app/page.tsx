import Hero from "@/components/Hero"
import Navbar from "@/components/Navbar"
import Services from "@/components/Services"
import Process from "@/components/Process"
import ContactSection from "@/components/ContactSection"
import Portfolio from "@/components/Portfolio"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Home",
  description:
    "Scribblecult is a creative brand consultancy providing strategy, content creation, social media management, design and storytelling.",
}

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <Navbar />
      <Hero />
      <Services />
      <Process />
      <Portfolio />
      <ContactSection />
    </main>
  )
}
