"use client"

import { Brain, Zap, Clock, TrendingUp, Shield, Sparkles, ArrowRight } from "lucide-react"
import { AIBackground } from "@/components/ui/ai-background"

const benefits = [
  {
    icon: Brain,
    title: "Intelligent Call Routing",
    description: "AI analyzes every call instantly, understanding context and urgency to route to the perfect provider. No more manual decisions.",
    stat: "98%",
    statLabel: "Accuracy Rate",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Zap,
    title: "Instant Provider Matching",
    description: "Our AI considers location, skills, availability, and workload in milliseconds. Assignments happen automatically—no waiting.",
    stat: "40%",
    statLabel: "Faster Response",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Clock,
    title: "Predictive Scheduling",
    description: "AI learns patterns and predicts demand, optimizing schedules before you even know you need it. Always one step ahead.",
    stat: "30%",
    statLabel: "Cost Reduction",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    icon: TrendingUp,
    title: "Continuous Learning",
    description: "Every interaction makes our AI smarter. Performance improves automatically, delivering better results over time.",
    stat: "24/7",
    statLabel: "Auto-Optimization",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    icon: Shield,
    title: "Smart Quality Control",
    description: "AI monitors service quality in real-time, flagging issues before they become problems. Proactive, not reactive.",
    stat: "99.9%",
    statLabel: "Uptime",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    icon: Sparkles,
    title: "Natural Language Processing",
    description: "Understands customer requests in plain English. No complex forms—just describe what you need, AI handles the rest.",
    stat: "5x",
    statLabel: "Faster Setup",
    gradient: "from-amber-500 to-orange-500",
  },
]

export function AIBenefitsSection() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <AIBackground intensity="medium" />
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/60 backdrop-blur-md px-3 py-1.5 mb-6">
            <Brain className="h-4 w-4 text-blue-600" />
            <span className="text-xs font-medium text-slate-700 uppercase tracking-wide">Advanced AI Technology</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 mb-4 leading-tight">
            Intelligent Automation
            <br />
            <span className="ai-gradient-text">At Every Step</span>
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed font-light">
            Our AI seamlessly handles complex dispatch operations, transforming manual workflows into automated excellence.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <div
                key={benefit.title}
                className="group relative bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/50 p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                {/* Icon */}
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${benefit.gradient} text-white`}>
                  <Icon className="h-6 w-6" />
                </div>

                {/* Stats Badge */}
                <div className="absolute top-6 right-6 flex flex-col items-end">
                  <div className={`text-2xl font-bold bg-gradient-to-br ${benefit.gradient} bg-clip-text text-transparent`}>
                    {benefit.stat}
                  </div>
                  <div className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">
                    {benefit.statLabel}
                  </div>
                </div>

                {/* Content */}
                <div className="relative pr-16">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors cursor-pointer">
            <span>Explore AI Capabilities</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </section>
  )
}

