import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Scribblecult, our philosophy, and how we build brands with culture, identity and impact.",
}








export default function About() {
  return (
    <div className="min-h-screen px-16 py-32">
      <h1 className="text-5xl font-bold mb-6">About Scribblecult</h1>
      <p className="text-lg opacity-70 max-w-2xl">
        We are a creative consultancy building brands with identity, culture, and impact.
      </p>
    </div>
  )
}
