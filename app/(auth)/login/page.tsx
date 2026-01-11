"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DSLogo } from "@/components/ds-logo"
import { Eye, EyeOff, ArrowRight } from "lucide-react"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate login
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
  }

  return (
    <main className="min-h-screen bg-black flex items-center justify-center">
      {/* Background Gradient */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative w-full max-w-md px-4">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <DSLogo size={48} />
            <span className="text-2xl font-bold text-white">Dream State</span>
          </Link>
        </div>

        {/* Login Card */}
        <div className="glass-effect rounded-2xl border border-yellow-500/30 p-8 backdrop-blur-xl">
          <h1 className="text-3xl font-bold text-white mb-2 text-center">Welcome Back</h1>
          <p className="text-gray-400 text-center mb-8">Sign in to your Dream State AI account</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-gray-200 font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
                className="mt-2 bg-black/50 border-yellow-500/30 text-white placeholder:text-gray-500 focus:border-yellow-400 focus:ring-yellow-400/20"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="password" className="text-gray-200 font-medium">
                  Password
                </Label>
                <Link href="/forgot-password" className="text-yellow-400 hover:text-yellow-300 text-sm">
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  className="mt-2 bg-black/50 border-yellow-500/30 text-white placeholder:text-gray-500 focus:border-yellow-400 focus:ring-yellow-400/20 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2">
              <input
                id="remember"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-yellow-500/30 bg-black/50 text-yellow-500 focus:ring-yellow-400/20"
              />
              <Label htmlFor="remember" className="text-gray-300 text-sm cursor-pointer">
                Remember me
              </Label>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold py-3 text-lg flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-yellow-500/20"></div>
            <span className="text-gray-500 text-sm">or</span>
            <div className="flex-1 h-px bg-yellow-500/20"></div>
          </div>

          {/* OAuth Buttons */}
          <div className="space-y-3">
            <Button
              type="button"
              variant="outline"
              className="w-full border-yellow-500/30 text-white hover:bg-yellow-500/10"
            >
              Continue with Google
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full border-yellow-500/30 text-white hover:bg-yellow-500/10"
            >
              Continue with GitHub
            </Button>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-gray-400 mt-8">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-yellow-400 hover:text-yellow-300 font-semibold">
              Sign up now
            </Link>
          </p>
        </div>

        {/* Footer Links */}
        <div className="flex justify-center gap-6 mt-8 text-sm text-gray-500">
          <Link href="/terms" className="hover:text-gray-300">
            Terms
          </Link>
          <Link href="/privacy" className="hover:text-gray-300">
            Privacy
          </Link>
          <Link href="/contact" className="hover:text-gray-300">
            Support
          </Link>
        </div>
      </div>
    </main>
  )
}
