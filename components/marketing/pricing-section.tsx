import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AIBackground } from "@/components/ui/ai-background"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Starter",
    description: "For teams getting started with AI solutions.",
    price: "$99",
    period: "/month",
    features: ["Up to 3 projects", "Basic automations", "Standard support", "Core integrations", "Monthly reports"],
    cta: "Start Free Trial",
    href: "/signup?plan=starter",
    highlighted: false,
  },
  {
    name: "Professional",
    description: "For growing companies needing advanced AI features.",
    price: "$299",
    period: "/month",
    features: [
      "Unlimited projects",
      "Advanced AI agents",
      "Priority support",
      "Custom integrations",
      "API access",
      "Real-time analytics",
      "Custom workflows",
    ],
    cta: "Start Free Trial",
    href: "/signup?plan=professional",
    highlighted: true,
  },
  {
    name: "Enterprise",
    description: "For large organizations with complex requirements.",
    price: "Custom",
    period: "",
    features: [
      "Everything in Professional",
      "Dedicated account manager",
      "24/7 premium support",
      "White-label options",
      "Custom SLAs",
      "On-premise deployment",
      "SSO & advanced security",
    ],
    cta: "Contact Sales",
    href: "/contact",
    highlighted: false,
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="relative border-t border-yellow-600/20 py-20 sm:py-28 overflow-hidden">
      <AIBackground intensity="light" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">Simple, Transparent Pricing</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            Choose the plan that fits your business. All plans include a 14-day free trial.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 backdrop-blur-xl ${
                plan.highlighted 
                  ? "border-2 border-yellow-400 bg-yellow-400/10 shadow-lg shadow-yellow-400/20" 
                  : "border-yellow-600/20 bg-black/40"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-yellow-400 text-black px-4 py-1 text-sm font-bold">
                  Most Popular
                </div>
              )}

              <div className="text-center">
                <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                <p className="mt-2 text-sm text-gray-400">{plan.description}</p>
                <div className="mt-6">
                  <span className="text-4xl font-bold text-yellow-400">{plan.price}</span>
                  <span className="text-gray-400">{plan.period}</span>
                </div>
              </div>

              <ul className="mt-8 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="h-5 w-5 shrink-0 text-yellow-400 mt-0.5" />
                    <span className="text-sm text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className={`mt-8 w-full font-semibold transition-all ${
                  plan.highlighted 
                    ? "bg-yellow-400 hover:bg-yellow-500 text-black" 
                    : "border border-yellow-600/50 bg-transparent text-yellow-400 hover:bg-yellow-400/10 hover:border-yellow-400"
                }`} 
                asChild
              >
                <Link href={plan.href}>{plan.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
