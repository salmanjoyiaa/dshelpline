import { HeroSection } from "@/components/marketing/hero-section"
import { ServicesGrid } from "@/components/marketing/services-grid"
import { HowItWorksSection } from "@/components/marketing/how-it-works-section"
import { FeaturesSection } from "@/components/marketing/features-section"
import { TestimonialsSection } from "@/components/marketing/testimonials-section"
import { PricingSection } from "@/components/marketing/pricing-section"
import { CTASection } from "@/components/marketing/cta-section"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesGrid />
      <HowItWorksSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <CTASection />
    </>
  )
}
