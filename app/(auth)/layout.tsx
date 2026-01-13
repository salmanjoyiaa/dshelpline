import type React from "react"
import Link from "next/link"
import { Zap } from "lucide-react"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen dark">
      {/* Left side - Branding */}
      <div className="hidden w-1/2 flex-col justify-between bg-gradient-to-br from-yellow-500 to-yellow-600 p-12 lg:flex">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black/20">
            <Zap className="h-6 w-6 text-black" />
          </div>
          <span className="text-2xl font-semibold text-black">Dream State AI</span>
        </Link>

        <div className="max-w-md">
          <blockquote className="text-xl leading-relaxed text-black/90">
            &ldquo;Dream State AI transformed how we manage our operations. Efficiency is up 75% and customer
            satisfaction is at an all-time high.&rdquo;
          </blockquote>
          <div className="mt-6 flex items-center gap-4">
            <div
              className="h-12 w-12 rounded-full bg-black/20"
              style={{
                backgroundImage: "url(/placeholder.svg?height=48&width=48&query=professional woman headshot)",
                backgroundSize: "cover",
              }}
            />
            <div>
              <p className="font-semibold text-black">Sarah Johnson</p>
              <p className="text-sm text-black/70">Operations Director, ProServ HVAC</p>
            </div>
          </div>
        </div>

        <p className="text-sm text-black/60">
          &copy; {new Date().getFullYear()} Dream State AI. All rights reserved.
        </p>
      </div>

      {/* Right side - Auth form */}
      <div className="flex flex-1 flex-col bg-black">
        {/* Mobile logo */}
        <div className="p-6 lg:hidden">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-500">
              <Zap className="h-5 w-5 text-black" />
            </div>
            <span className="text-xl font-semibold text-white">Dream State AI</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center p-6 sm:p-12">{children}</div>
      </div>
    </div>
  )
}
