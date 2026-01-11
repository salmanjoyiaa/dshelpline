"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DSLogo } from "@/components/ds-logo"
import { Eye, EyeOff, ArrowRight, Check, X } from "lucide-react"

export default function SignupPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [password, setPassword] = useState("")
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Password strength checker
  const passwordStrength = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
  }

  const isStrongPassword =
    passwordStrength.length && passwordStrength.uppercase && passwordStrength.lowercase && passwordStrength.number

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate signup
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    // Redirect to dashboard
    router.push("/dashboard")
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

        {/* Signup Card */}
        <div className="glass-effect rounded-2xl border border-yellow-500/30 p-8 backdrop-blur-xl">
          <h1 className="text-3xl font-bold text-white mb-2 text-center">Get Started</h1>
          <p className="text-gray-400 text-center mb-8">
            Join 1000+ companies transforming with AI
            <br />
            <span className="text-yellow-400 font-semibold">14-day free trial</span>
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <Label htmlFor="name" className="text-gray-200 font-medium">
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="John Smith"
                required
                className="mt-2 bg-black/50 border-yellow-500/30 text-white placeholder:text-gray-500 focus:border-yellow-400 focus:ring-yellow-400/20"
              />
            </div>

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
              <Label htmlFor="password" className="text-gray-200 font-medium">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

              {/* Password Strength Indicator */}
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  {passwordStrength.length ? (
                    <Check className="w-4 h-4 text-yellow-400" />
                  ) : (
                    <X className="w-4 h-4 text-gray-500" />
                  )}
                  <span className={passwordStrength.length ? "text-gray-300" : "text-gray-500"}>
                    At least 8 characters
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {passwordStrength.uppercase ? (
                    <Check className="w-4 h-4 text-yellow-400" />
                  ) : (
                    <X className="w-4 h-4 text-gray-500" />
                  )}
                  <span className={passwordStrength.uppercase ? "text-gray-300" : "text-gray-500"}>
                    One uppercase letter
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {passwordStrength.lowercase ? (
                    <Check className="w-4 h-4 text-yellow-400" />
                  ) : (
                    <X className="w-4 h-4 text-gray-500" />
                  )}
                  <span className={passwordStrength.lowercase ? "text-gray-300" : "text-gray-500"}>
                    One lowercase letter
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {passwordStrength.number ? (
                    <Check className="w-4 h-4 text-yellow-400" />
                  ) : (
                    <X className="w-4 h-4 text-gray-500" />
                  )}
                  <span className={passwordStrength.number ? "text-gray-300" : "text-gray-500"}>
                    One number
                  </span>
                </div>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <Label htmlFor="confirm-password" className="text-gray-200 font-medium">
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  required
                  className="mt-2 bg-black/50 border-yellow-500/30 text-white placeholder:text-gray-500 focus:border-yellow-400 focus:ring-yellow-400/20 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3">
              <input
                id="terms"
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                required
                className="w-4 h-4 rounded border-yellow-500/30 bg-black/50 text-yellow-500 focus:ring-yellow-400/20 mt-1 flex-shrink-0"
              />
              <Label htmlFor="terms" className="text-gray-300 text-sm cursor-pointer">
                I agree to the{" "}
                <Link href="/terms" className="text-yellow-400 hover:text-yellow-300">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-yellow-400 hover:text-yellow-300">
                  Privacy Policy
                </Link>
              </Label>
            </div>

            {/* Signup Button */}
            <Button
              type="submit"
              disabled={isLoading || !agreeTerms || !isStrongPassword}
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold py-3 text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                  Creating account...
                </>
              ) : (
                <>
                  Start Free Trial
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Button>
          </form>

          {/* Trial Benefits */}
          <div className="mt-6 pt-6 border-t border-yellow-500/20">
            <p className="text-gray-400 text-sm text-center mb-3">Free trial includes:</p>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <span className="text-yellow-400">✓</span> Full access to all features
              </li>
              <li className="flex items-center gap-2">
                <span className="text-yellow-400">✓</span> 24/7 customer support
              </li>
              <li className="flex items-center gap-2">
                <span className="text-yellow-400">✓</span> No credit card required
              </li>
              <li className="flex items-center gap-2">
                <span className="text-yellow-400">✓</span> Cancel anytime
              </li>
            </ul>
          </div>

          {/* Sign In Link */}
          <p className="text-center text-gray-400 mt-8">
            Already have an account?{" "}
            <Link href="/login" className="text-yellow-400 hover:text-yellow-300 font-semibold">
              Sign in
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
