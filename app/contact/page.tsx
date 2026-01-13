import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Scribblecult to build your brand, content strategy and digital presence.",
}








export default function Contact() {
  return (
    <div className="min-h-screen px-16 py-32">
      <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
      <p className="text-lg opacity-70 max-w-2xl">
        Let’s build something iconic together.
      </p>
    </div>
  )
}
