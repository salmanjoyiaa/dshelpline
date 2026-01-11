"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { DSLogo } from "@/components/ds-logo"

const navLinks = [
  { href: "/learn-more", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
]

export function MarketingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-yellow-600/20 bg-black/80 backdrop-blur-2xl supports-[backdrop-filter]:bg-black/70">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-12">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl shadow-lg group-hover:shadow-xl transition-shadow">
            <DSLogo size={44} />
          </div>
          <span className="text-2xl font-bold text-yellow-400 hidden sm:inline">Dream State AI</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-gray-300 transition-colors hover:text-yellow-400 relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" asChild className="text-sm text-gray-300 hover:text-yellow-400 hover:bg-yellow-400/10 font-medium">
            <Link href="/login">Log in</Link>
          </Button>
          <Button asChild className="bg-yellow-400 hover:bg-yellow-500 text-black text-sm font-semibold px-5 py-2.5 rounded-lg shadow-sm transition-all duration-300">
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg md:hidden text-yellow-400 hover:bg-yellow-400/10 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="border-t border-yellow-600/20 md:hidden">
          <nav className="flex flex-col gap-1 p-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-yellow-400/10 hover:text-yellow-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-2 border-t border-yellow-600/20 pt-4">
              <Button variant="outline" asChild className="w-full bg-transparent border-yellow-400 text-yellow-400 hover:bg-yellow-400/10">
                <Link href="/login">Log in</Link>
              </Button>
              <Button asChild className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
                <Link href="/signup">Start Free Trial</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
