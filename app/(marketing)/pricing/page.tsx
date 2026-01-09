import type { Metadata } from "next"
import { PricingSection } from "@/components/marketing/pricing-section"
import { CTASection } from "@/components/marketing/cta-section"

export const metadata: Metadata = {
  title: "Pricing",
  description: "Simple, transparent pricing for ServiceFlow. Choose the plan that fits your business.",
}

export default function PricingPage() {
  return (
    <>
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Pricing Plans</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Start with a 14-day free trial. No credit card required.
          </p>
        </div>
      </section>
      <PricingSection />
      <CTASection />
    </>
  )
}
