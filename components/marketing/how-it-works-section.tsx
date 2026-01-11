import { AIBackground } from "@/components/ui/ai-background"
import { Zap, Brain, Workflow, CheckCircle2 } from "lucide-react"

const steps = [
  {
    icon: Zap,
    title: "Consult",
    description: "We understand your business goals, challenges, and vision. Our experts analyze your needs and propose tailored AI solutions.",
  },
  {
    icon: Brain,
    title: "Design",
    description: "We architect custom solutions—whether it's automation, AI agents, APIs, or dashboards. Built for your specific use case.",
  },
  {
    icon: Workflow,
    title: "Build & Deploy",
    description: "Our team develops, tests, and deploys your solution with zero disruption. Seamless integration with your existing systems.",
  },
  {
    icon: CheckCircle2,
    title: "Scale & Support",
    description: "Monitor performance, optimize workflows, and provide 24/7 support. Your solution grows as your business does.",
  },
]

export function HowItWorksSection() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <AIBackground intensity="light" />
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
            How We Transform
            <br/>
            <span className="text-yellow-400">Your Business</span>
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            From consultation to deployment to ongoing optimization. Our end-to-end approach ensures 
            your AI solutions deliver measurable ROI and scale with your growth.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mt-20">
          {/* Connection line */}
          <div className="absolute left-0 right-0 top-1/4 hidden h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 lg:block opacity-60" />

          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step.title} className="relative group">
                {/* Icon Circle */}
                <div className="relative mx-auto mb-8 flex h-28 w-28 items-center justify-center rounded-full border-4 border-yellow-400 bg-gradient-to-br from-black to-black shadow-xl transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-yellow-400/20 group-hover:scale-110 group-hover:rotate-3">
                  <step.icon className="h-12 w-12 text-yellow-400" />
                  
                  {/* Number Badge */}
                  <div className="absolute -right-2 -top-2 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 text-black font-bold text-lg shadow-lg border-2 border-white">
                    {index + 1}
                  </div>
                </div>

                {/* Content */}
                <div className="rounded-2xl border border-yellow-600/20 bg-black/40 backdrop-blur-xl p-6 transition-all duration-300 hover:border-yellow-400/50 hover:shadow-lg hover:shadow-yellow-400/10">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors">{step.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
