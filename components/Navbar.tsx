"use client"
import ThemeToggle from "./ThemeToggle"
import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 px-10 py-6 flex justify-between items-center backdrop-blur-md bg-white/60 dark:bg-black/60">
      <h1 className="text-2xl font-bold tracking-wide">Scribblecult</h1>
      <div className="flex items-center gap-6">
        <Link
          href="/"
          className="relative group overflow-hidden"
        >
          <span className="block transition-transform duration-300 group-hover:-translate-y-full">
            Home
          </span>
          <span className="block absolute left-0 top-full transition-transform duration-300 group-hover:-translate-y-full">
            Home
          </span>
          <span className="absolute left-0 bottom-0 w-full h-[2px] bg-current scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
        </Link>
        <Link
          href="/about"
          className="relative group overflow-hidden"
        >
          <span className="block transition-transform duration-300 group-hover:-translate-y-full">
            About
          </span>
          <span className="block absolute left-0 top-full transition-transform duration-300 group-hover:-translate-y-full">
            About
          </span>
          <span className="absolute left-0 bottom-0 w-full h-[2px] bg-current scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
        </Link>

        <Link
          href="/contact"
          className="relative group overflow-hidden"
        >
          <span className="block transition-transform duration-300 group-hover:-translate-y-full">
            Contact
          </span>
          <span className="block absolute left-0 top-full transition-transform duration-300 group-hover:-translate-y-full">
            Contact
          </span>
          <span className="absolute left-0 bottom-0 w-full h-[2px] bg-current scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
        </Link>
        <ThemeToggle />
      
      
      
      
      
      
      
      
      
      </div>

      <ThemeToggle />
    </nav>
    
  )
}
