import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Users, Target, Zap, Heart } from "lucide-react"

export const metadata: Metadata = {
  title: "About",
  description: "Learn about ServiceFlow and our mission to transform field service operations.",
}

const values = [
  {
    icon: Target,
    title: "Customer First",
    description: "Every feature we build starts with understanding our customers' real challenges.",
  },
  {
    icon: Zap,
    title: "Relentless Innovation",
    description: "We continuously push the boundaries of what's possible in service dispatch.",
  },
  {
    icon: Users,
    title: "Empowering Teams",
    description: "We believe in building tools that make service teams more effective, not replace them.",
  },
  {
    icon: Heart,
    title: "Quality Obsessed",
    description: "We hold ourselves to the highest standards in everything we do.",
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              We&apos;re on a mission to modernize field services
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              ServiceFlow was founded in 2023 by a team of engineers and operations experts who saw firsthand how
              outdated dispatch systems were holding service companies back. We built the platform we wished existed.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "2,500+", label: "Companies" },
              { value: "50,000+", label: "Providers" },
              { value: "10M+", label: "Requests Processed" },
              { value: "99.9%", label: "Uptime" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl font-bold text-primary">{stat.value}</p>
                <p className="mt-1 text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">Our Values</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              The principles that guide everything we do at ServiceFlow.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div key={value.title} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                  <value.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mt-4 font-semibold">{value.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold">Want to join our team?</h2>
          <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
            We&apos;re always looking for talented people who share our passion for building great products.
          </p>
          <Button className="mt-6" asChild>
            <Link href="/careers">View Open Positions</Link>
          </Button>
        </div>
      </section>
    </>
  )
}
