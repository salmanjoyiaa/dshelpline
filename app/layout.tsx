import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

export const metadata: Metadata = {
  title: {
    default: "Dream State AI - Intelligent AI Solutions & Automation",
    template: "%s | Dream State AI",
  },
  description:
    "Transform your business with AI-powered automation, custom solutions, and intelligent systems. 50+ successful projects, 98% client satisfaction, $45M+ ROI generated.",
  keywords: ["AI automation", "AI solutions", "custom development", "AI consulting", "business automation", "machine learning"],
  generator: 'v0.app',
  icons: {
    icon: "/ds-icon.svg",
    apple: "/ds-icon.svg",
  },
}

export const viewport: Viewport = {
  themeColor: "#FFD700",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">
        <ThemeProvider>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
