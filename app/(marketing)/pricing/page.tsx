import type { Metadata } from "next"
import { PricingSection } from "@/components/marketing/pricing-section"
import { CTASection } from "@/components/marketing/cta-section"

export const metadata: Metadata = {
  title: "Pricing",
  description: "Simple, transparent pricing for Dream State AI. Choose the plan that fits your business.",
}

export default function PricingPage() {
  return (
    <>
      <section className="py-16 sm:py-24 bg-black">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="inline-block bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-yellow-500/30">
            Simple & Transparent Pricing
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-white">Plans for Every Stage</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300">
            Start with a 14-day free trial. No credit card required. Scale as you grow.
          </p>
        </div>
      </section>
      <PricingSection />
      <CTASection />
    </>
  )
}
