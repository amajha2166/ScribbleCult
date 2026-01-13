import "./globals.css"
import { ThemeProvider } from "next-themes"
import CustomCursor from "@/components/CustomCursor"
import PageTransition from "@/components/PageTransition"
import Preloader from "@/components/Preloader"
import GrainOverlay from "@/components/GrainOverlay"
import ScrollProgress from "@/components/ScrollProgress"
import ClientBackground from "@/components/ClientBackground"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    default: "Scribblecult – Creative Brand Consultancy",
    template: "%s | Scribblecult",
  },
  description:
    "Scribblecult is a creative consultancy helping brands with strategy, content, design, social media and storytelling.",
  keywords: [
    "Scribblecult",
    "brand consultancy",
    "creative agency",
    "content creation",
    "social media management",
    "graphic design",
    "video editing",
    "branding agency india",
  ],
  authors: [{ name: "Scribblecult" }],
  creator: "Scribblecult",
  openGraph: {
    title: "Scribblecult – Creative Brand Consultancy",
    description:
      "We turn ideas into iconic brands through strategy, content, design and storytelling.",
    url: "https://scribblecult.com", // change later
    siteName: "Scribblecult",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Scribblecult – Creative Brand Consultancy",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scribblecult – Creative Brand Consultancy",
    description:
      "We turn ideas into iconic brands through strategy, content, design and storytelling.",
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
}




export default function RootLayout({
  children,
}: {
  children: React.ReactNode
})  {
  return (
    <html lang="en" suppressHydrationWarning>

      <body>
  <ClientBackground />

  <ThemeProvider attribute="class" defaultTheme="system">
    <Preloader />
    <CustomCursor />
    <GrainOverlay />
    <ScrollProgress />
    <PageTransition>
      {children}
    </PageTransition>
  </ThemeProvider>
</body>

    </html>
  )
}
