import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AIBackground } from "@/components/ui/ai-background"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Starter",
    description: "For small teams getting started with dispatch automation.",
    price: "$49",
    period: "/month",
    features: ["Up to 10 providers", "500 requests/month", "Basic analytics", "Email support", "Standard integrations"],
    cta: "Start Free Trial",
    href: "/signup?plan=starter",
    highlighted: false,
  },
  {
    name: "Professional",
    description: "For growing businesses that need advanced features.",
    price: "$149",
    period: "/month",
    features: [
      "Up to 50 providers",
      "5,000 requests/month",
      "Advanced analytics",
      "Priority support",
      "Custom integrations",
      "API access",
      "SLA management",
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
      "Unlimited providers",
      "Unlimited requests",
      "Custom analytics",
      "24/7 dedicated support",
      "White-label options",
      "On-premise deployment",
      "Custom SLAs",
      "SSO & SAML",
    ],
    cta: "Contact Sales",
    href: "/contact",
    highlighted: false,
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="relative border-t border-border py-20 sm:py-28 overflow-hidden">
      <AIBackground intensity="light" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Simple, transparent pricing</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Choose the plan that fits your business. All plans include a 14-day free trial.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl glass-effect p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
                plan.highlighted ? "border-2 border-blue-400 ai-glow" : ""
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-sm font-medium text-primary-foreground">
                  Most Popular
                </div>
              )}

              <div className="text-center">
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
                <div className="mt-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </div>

              <ul className="mt-8 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="h-5 w-5 shrink-0 text-primary" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button className="mt-8 w-full" variant={plan.highlighted ? "default" : "outline"} asChild>
                <Link href={plan.href}>{plan.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
