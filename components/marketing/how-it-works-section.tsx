import { AIBackground } from "@/components/ui/ai-background"
import { Webhook, Brain, MapPin, CheckCircle2 } from "lucide-react"

const steps = [
  {
    icon: Webhook,
    title: "Call Comes In",
    description: "A customer calls or submits a request. AI instantly captures all details—no forms, no waiting.",
  },
  {
    icon: Brain,
    title: "AI Instantly Analyzes",
    description: "In milliseconds, AI understands urgency, location, skills needed, and finds the perfect match from thousands of data points.",
  },
  {
    icon: MapPin,
    title: "Auto-Assignment",
    description: "AI automatically assigns the best provider—considering distance, availability, skills, and workload. Zero human input needed.",
  },
  {
    icon: CheckCircle2,
    title: "Done. That's It.",
    description: "Provider notified, customer updated, route optimized—all automatically. You're free to focus on what matters.",
  },
]

export function HowItWorksSection() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <AIBackground intensity="light" />
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-6">
            How AI Makes It
            <br/>
            <span className="ai-gradient-text">Effortlessly Simple</span>
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            Four steps. Zero manual work. Our AI handles everything automatically—from the moment a call comes in 
            to the instant a provider is assigned. You just watch it happen.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mt-20">
          {/* Connection line */}
          <div className="absolute left-0 right-0 top-1/4 hidden h-1 ai-gradient lg:block opacity-60" />

          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step.title} className="relative group">
                {/* Icon Circle */}
                <div className="relative mx-auto mb-8 flex h-28 w-28 items-center justify-center rounded-full border-4 border-white/50 ai-gradient shadow-xl transition-all duration-300 group-hover:shadow-2xl group-hover:scale-110 group-hover:rotate-3 ai-glow">
                  <step.icon className="h-12 w-12 text-white" />
                  
                  {/* Number Badge */}
                  <div className="absolute -right-2 -top-2 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-500 text-white font-bold text-lg shadow-lg border-2 border-white">
                    {index + 1}
                  </div>
                </div>

                {/* Content */}
                <div className="text-center glass-effect rounded-2xl p-6 transition-all duration-300 hover:shadow-xl">
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">{step.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
