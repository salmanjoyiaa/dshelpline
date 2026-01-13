import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AIBackground } from "@/components/ui/ai-background"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      {/* Gradient background - Black to Yellow */}
      <div className="absolute inset-0 dark:bg-gradient-to-r dark:from-black dark:via-black/90 dark:to-black bg-gradient-to-r from-gray-50 via-white to-gray-50" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-yellow-400/5 to-transparent" />
      
      {/* AI Background overlay */}
      <div className="absolute inset-0 opacity-20">
        <AIBackground intensity="medium" />
      </div>

      <div className="relative mx-auto max-w-3xl px-6 text-center sm:px-8 lg:px-12">
        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black dark:text-white text-gray-900 mb-4 leading-tight">
          Ready to Transform Your Business?
        </h2>

        {/* Subheading */}
        <p className="text-lg dark:text-gray-300 text-gray-600 max-w-xl mx-auto mb-10 leading-relaxed font-light">
          Join innovative companies using Dream State AI to scale with intelligent automation, custom AI solutions, and expert guidance.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center mb-8">
          <Button size="lg" asChild className="bg-yellow-500 hover:bg-yellow-600 text-black hover:text-black font-semibold shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-6 rounded-xl text-sm">
            <Link href="/signup">
              Start Free Trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            size="lg"
            className="border border-yellow-600/50 bg-yellow-400/10 backdrop-blur-sm text-yellow-600 dark:text-yellow-400 hover:bg-yellow-400/20 hover:border-yellow-500 font-medium transition-all duration-300 px-8 py-6 rounded-xl text-sm"
            asChild
          >
            <Link href="/contact">Contact Sales</Link>
          </Button>
        </div>

        {/* Trust message */}
        <p className="text-sm dark:text-gray-400 text-gray-500 font-medium">
          No credit card required • 14-day free trial • Cancel anytime
        </p>
      </div>
    </section>
  )
}
