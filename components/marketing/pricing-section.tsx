import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check, Zap } from "lucide-react"

const plans = [
  {
    name: "Starter",
    description: "For teams getting started with AI solutions.",
    price: "$99",
    period: "/month",
    features: [
      "Up to 3 projects",
      "Basic automations",
      "Standard support",
      "Core integrations",
      "Monthly reports",
    ],
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
    <section id="pricing" className="relative border-t dark:border-yellow-600/20 border-yellow-500/30 py-20 sm:py-28 overflow-hidden dark:bg-gradient-to-b dark:from-black dark:via-black/95 dark:to-black bg-gray-50">
      {/* Background gradient effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-yellow-500/10 px-4 py-2 rounded-full border border-yellow-500/30 mb-4">
            <Zap className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-semibold text-yellow-600 dark:text-yellow-400">Flexible Plans</span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl dark:text-white text-gray-900 mb-4">
            Pricing That Grows With You
          </h2>
          <p className="mx-auto text-lg dark:text-gray-300 text-gray-600 max-w-2xl">
            Choose the perfect plan for your business. All plans include a 14-day free trial and you can upgrade or downgrade anytime.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3 lg:gap-6">
          {plans.map((plan, idx) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 backdrop-blur-sm flex flex-col h-full ${
                plan.highlighted 
                  ? "border-yellow-400/50 bg-gradient-to-br from-yellow-400/10 dark:to-black/40 to-white shadow-lg shadow-yellow-400/20 lg:scale-105" 
                  : "dark:border-yellow-600/20 border-yellow-500/30 dark:bg-black/30 bg-white hover:border-yellow-500/60"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-6 py-1.5 text-sm font-bold shadow-lg">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold dark:text-white text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-sm dark:text-gray-400 text-gray-500">{plan.description}</p>
              </div>

              {/* Pricing */}
              <div className="mb-8 pb-8 border-b dark:border-yellow-600/20 border-yellow-500/30">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black dark:text-white text-gray-900">{plan.price}</span>
                  {plan.period && <span className="dark:text-gray-400 text-gray-500 text-base font-medium">{plan.period}</span>}
                </div>
                <p className="text-sm dark:text-gray-400 text-gray-500 mt-3">
                  Billed monthly. Free trial for 14 days.
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="h-5 w-5 shrink-0 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm dark:text-gray-300 text-gray-600 leading-snug">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button 
                className={`w-full font-semibold transition-all duration-200 h-11 text-base ${
                  plan.highlighted 
                    ? "bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black shadow-lg hover:shadow-xl" 
                    : "border border-yellow-600/50 bg-transparent dark:text-yellow-400 text-yellow-600 hover:bg-yellow-400/10 hover:border-yellow-500"
                }`} 
                asChild
              >
                <Link href={plan.href}>{plan.cta}</Link>
              </Button>
            </div>
          ))}
        </div>

        {/* FAQ hint */}
        <div className="mt-16 text-center">
          <p className="dark:text-gray-400 text-gray-500">
            Need more information? 
            <Link href="/contact" className="ml-2 text-yellow-600 dark:text-yellow-400 hover:text-yellow-500 font-semibold transition-colors">
              Contact our sales team
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
