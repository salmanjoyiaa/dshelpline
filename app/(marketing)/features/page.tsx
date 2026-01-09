import type { Metadata } from "next"
import { FeaturesSection } from "@/components/marketing/features-section"
import { CTASection } from "@/components/marketing/cta-section"
import { AIBackground } from "@/components/ui/ai-background"
import { MapPin, Users, BarChart3, Webhook } from "lucide-react"

export const metadata: Metadata = {
  title: "Features",
  description: "Explore all the powerful features ServiceFlow offers for managing your field service operations.",
}

const detailedFeatures = [
  {
    icon: MapPin,
    title: "Live Map Tracking",
    description:
      "See all your providers and active requests on a real-time map. Powered by Mapbox with custom markers, clustering, and route visualization.",
    details: [
      "Real-time GPS updates every 30 seconds",
      "Custom provider and request markers",
      "Route optimization suggestions",
      "Geofencing for job sites",
    ],
  },
  {
    icon: Users,
    title: "Provider Management",
    description: "Complete workforce management with skills tracking, availability schedules, and performance metrics.",
    details: [
      "Skill-based assignment matching",
      "Availability calendar integration",
      "Performance scorecards",
      "Mobile app for providers",
    ],
  },
  {
    icon: Webhook,
    title: "Webhook Integrations",
    description:
      "Connect ServiceFlow to your existing systems with powerful webhook support. Works with N8N, Zapier, and custom integrations.",
    details: [
      "Incoming webhooks for request creation",
      "Outgoing webhooks for status updates",
      "Retry logic and error handling",
      "Complete audit logging",
    ],
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description:
      "Make data-driven decisions with comprehensive dashboards showing KPIs, trends, and actionable insights.",
    details: [
      "Real-time metrics dashboard",
      "Custom report builder",
      "Scheduled email reports",
      "Data export capabilities",
    ],
  },
]

export default function FeaturesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <AIBackground intensity="light" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-slate-900">
              Powerful features for modern field service
            </h1>
            <p className="mt-6 text-lg text-slate-600">
              Everything you need to manage, dispatch, and optimize your field service operations in one platform.
            </p>
          </div>
        </div>
      </section>

      {/* Detailed Features - Right Aligned */}
      <section className="relative border-t border-border py-16 sm:py-24 overflow-hidden">
        <AIBackground intensity="light" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {detailedFeatures.map((feature, index) => (
              <div
                key={feature.title}
                className={`flex justify-end ${index % 2 === 0 ? "lg:flex-row-reverse" : ""}`}
              >
                <div className={`grid items-center gap-12 lg:grid-cols-2 w-full max-w-6xl ${index % 2 === 0 ? "lg:flex-row-reverse" : ""}`}>
                  <div className={`${index % 2 === 0 ? "lg:order-2" : ""} glass-effect rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1`}>
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl ai-gradient text-white shadow-lg">
                      <feature.icon className="h-7 w-7" />
                    </div>
                    <h2 className="mt-4 text-3xl font-bold text-slate-900">{feature.title}</h2>
                    <p className="mt-4 text-lg text-slate-600">{feature.description}</p>
                    <ul className="mt-6 space-y-3">
                      {feature.details.map((detail) => (
                        <li key={detail} className="flex items-center gap-3">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-cyan-100 to-blue-100 text-blue-600">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-slate-600">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={`rounded-xl glass-effect p-4 ${index % 2 === 0 ? "lg:order-1" : ""} transition-all duration-300 hover:shadow-2xl`}>
                    <div
                      className="aspect-video rounded-lg bg-gradient-to-br from-blue-100 to-purple-100"
                      style={{
                        backgroundImage: `url(/placeholder.svg?height=400&width=600&query=${feature.title} dashboard screenshot)`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Features Grid */}
      <FeaturesSection />

      <CTASection />
    </>
  )
}
