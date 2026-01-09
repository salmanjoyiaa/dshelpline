import type React from "react"
import Link from "next/link"
import { Zap } from "lucide-react"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Left side - Branding */}
      <div className="hidden w-1/2 flex-col justify-between bg-primary p-12 lg:flex">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground/20">
            <Zap className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-2xl font-semibold text-primary-foreground">ServiceFlow</span>
        </Link>

        <div className="max-w-md">
          <blockquote className="text-xl leading-relaxed text-primary-foreground/90">
            &ldquo;ServiceFlow transformed how we manage our field operations. Response times are down 40% and customer
            satisfaction is at an all-time high.&rdquo;
          </blockquote>
          <div className="mt-6 flex items-center gap-4">
            <div
              className="h-12 w-12 rounded-full bg-primary-foreground/20"
              style={{
                backgroundImage: "url(/placeholder.svg?height=48&width=48&query=professional woman headshot)",
                backgroundSize: "cover",
              }}
            />
            <div>
              <p className="font-semibold text-primary-foreground">Sarah Johnson</p>
              <p className="text-sm text-primary-foreground/70">Operations Director, ProServ HVAC</p>
            </div>
          </div>
        </div>

        <p className="text-sm text-primary-foreground/60">
          &copy; {new Date().getFullYear()} ServiceFlow. All rights reserved.
        </p>
      </div>

      {/* Right side - Auth form */}
      <div className="flex flex-1 flex-col">
        {/* Mobile logo */}
        <div className="p-6 lg:hidden">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold">ServiceFlow</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center p-6 sm:p-12">{children}</div>
      </div>
    </div>
  )
}
