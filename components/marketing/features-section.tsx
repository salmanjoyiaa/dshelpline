import { MapPin, Users, BarChart3, Bell, Zap, Shield, Code, Globe } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Intelligent Automation",
    description: "AI-powered workflows that handle repetitive tasks and optimize operations across your business.",
  },
  {
    icon: Users,
    title: "Smart Agent Systems",
    description: "Deploy conversational AI that learns, responds intelligently, and handles customer interactions 24/7.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description: "Interactive dashboards with KPIs, trends, and actionable insights to drive business decisions.",
  },
  {
    icon: Bell,
    title: "Instant Notifications",
    description: "Real-time alerts and status updates via email, SMS, and in-app for seamless communication.",
  },
  {
    icon: Code,
    title: "Custom Integrations",
    description: "Connect all your tools with robust APIs, webhooks, and pre-built integrations.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "SOC 2 compliant with role-based access control, encryption, and complete audit logging.",
  },
  {
    icon: MapPin,
    title: "Scalable Solutions",
    description: "Architecture built to grow with your business, from startups to enterprises.",
  },
  {
    icon: Globe,
    title: "Multi-Tenant Ready",
    description: "White-label, customizable, and isolated per organization with domain support.",
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
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
            Comprehensive
            <br />
            <span className="text-yellow-400">Feature Suite</span>
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed font-light">
            Everything you need to build, deploy, and scale AI-powered solutions.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group bg-black/40 backdrop-blur-sm rounded-xl border border-yellow-600/20 p-6 transition-all duration-300 hover:border-yellow-400/50 hover:-translate-y-1 hover:shadow-lg hover:shadow-yellow-400/10"
              role="article"
              aria-label={`Feature: ${feature.title}`}
            >
              {/* Icon */}
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-400 text-black group-hover:scale-110 transition-transform">
                <feature.icon className="h-6 w-6" />
              </div>

              {/* Content */}
              <h3 className="text-base font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-300 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
