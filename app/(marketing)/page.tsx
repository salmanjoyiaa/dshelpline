import { HeroSection } from "@/components/marketing/hero-section"
import { AIBenefitsSection } from "@/components/marketing/ai-benefits-section"
import { HowItWorksSection } from "@/components/marketing/how-it-works-section"
import { FeaturesSection } from "@/components/marketing/features-section"
import { TestimonialsSection } from "@/components/marketing/testimonials-section"
import { PricingSection } from "@/components/marketing/pricing-section"
import { CTASection } from "@/components/marketing/cta-section"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AIBenefitsSection />
      <HowItWorksSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <CTASection />
    </>
  )
}
