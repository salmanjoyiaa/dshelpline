import { MapPin, Users, BarChart3, Bell, Zap, Shield, Clock, Globe } from "lucide-react"

const features = [
  {
    icon: MapPin,
    title: "Live Map Tracking",
    description: "Real-time GPS tracking of all providers and active service requests on an interactive map.",
  },
  {
    icon: Users,
    title: "Provider Management",
    description: "Manage your entire workforce with availability tracking, skills, and performance metrics.",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Comprehensive dashboards with KPIs, trends, and actionable insights to optimize operations.",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Automated alerts for assignments, status changes, and SLA breaches via email and SMS.",
  },
  {
    icon: Zap,
    title: "AI-Powered Matching",
    description: "Intelligent algorithm considers proximity, skills, availability, and historical performance.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "SOC 2 compliant with role-based access control and complete audit logging.",
  },
  {
    icon: Clock,
    title: "SLA Management",
    description: "Define and track service level agreements with automatic escalation rules.",
  },
  {
    icon: Globe,
    title: "Multi-tenant Ready",
    description: "White-label solution with custom branding, domains, and isolated data per organization.",
  },
]

import { AIBackground } from "@/components/ui/ai-background"

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 sm:py-32 overflow-hidden">
      <AIBackground intensity="light" />
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 mb-4 leading-tight">
            Comprehensive
            <br />
            <span className="ai-gradient-text">Feature Suite</span>
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed font-light">
            Everything you need to manage, optimize, and scale your service operations.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/50 p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              role="article"
              aria-label={`Feature: ${feature.title}`}
            >
              {/* Icon */}
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg ai-gradient text-white">
                <feature.icon className="h-6 w-6" />
              </div>

              {/* Content */}
              <h3 className="text-base font-bold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
