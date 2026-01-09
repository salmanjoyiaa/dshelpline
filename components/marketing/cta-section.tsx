import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AIBackground } from "@/components/ui/ai-background"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      {/* Gradient background */}
      <div className="absolute inset-0 ai-gradient" />
      
      {/* AI Background overlay */}
      <div className="absolute inset-0 opacity-30">
        <AIBackground intensity="medium" />
      </div>

      <div className="relative mx-auto max-w-3xl px-6 text-center sm:px-8 lg:px-12">
        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
          Ready to Get Started?
        </h2>

        {/* Subheading */}
        <p className="text-lg text-white/90 max-w-xl mx-auto mb-10 leading-relaxed font-light">
          Join thousands of service companies using AI-powered dispatch to transform their operations.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center mb-8">
          <Button size="lg" asChild className="bg-white hover:bg-slate-50 text-slate-900 hover:text-slate-700 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-6 rounded-xl text-sm">
            <Link href="/signup">
              Start Free Trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            size="lg"
            className="border border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 font-medium transition-all duration-300 px-8 py-6 rounded-xl text-sm"
            asChild
          >
            <Link href="/contact">Contact Sales</Link>
          </Button>
        </div>

        {/* Trust message */}
        <p className="text-sm text-white/70 font-medium">
          No credit card required • 14-day free trial • Cancel anytime
        </p>
      </div>
    </section>
  )
}
