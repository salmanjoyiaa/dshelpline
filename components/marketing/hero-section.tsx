import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AIBackground } from "@/components/ui/ai-background"
import { ArrowRight, Play, Zap } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center pt-20 pb-16 sm:pt-32 sm:pb-24">
      <AIBackground intensity="light" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 w-full">
        <div className="grid items-center gap-20 lg:grid-cols-2 lg:gap-32">
          {/* Content */}
          <div className="space-y-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-yellow-600/30 bg-black/40 backdrop-blur-md px-4 py-2 shadow-sm">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-yellow-400">
                <Zap className="h-3 w-3 text-black" />
              </div>
              <span className="text-xs font-medium text-yellow-400 tracking-wide uppercase">Transforming Businesses with AI</span>
            </div>

            {/* Headline */}
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight text-white leading-[1.05]">
                Intelligent
                <br />
                <span className="text-yellow-400">Automation</span>
                <br />
                <span className="text-gray-300">at Scale</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-xl font-light">
                From intelligent workflows to AI agents—Dream State AI delivers end-to-end solutions that drive measurable ROI and transform how your business operates.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button 
                size="lg" 
                asChild 
                className="bg-yellow-400 hover:bg-yellow-500 text-black shadow-lg hover:shadow-xl transition-all duration-300 text-sm font-semibold px-8 py-6 rounded-xl group"
              >
                <Link href="/signup">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                asChild 
                className="border border-yellow-600/50 hover:border-yellow-400 hover:bg-yellow-400/10 text-sm font-medium px-8 py-6 rounded-xl group text-gray-300 hover:text-yellow-400"
              >
                <Link href="#demo">
                  <Play className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                  Watch Demo
                </Link>
              </Button>
            </div>

            {/* Stats Row */}
            <div className="flex items-center gap-8 pt-8 border-t border-yellow-600/20">
              <div>
                <div className="text-3xl font-bold text-yellow-400">8</div>
                <div className="text-xs text-gray-400 mt-1 font-medium">Core Services</div>
              </div>
              <div className="h-12 w-px bg-yellow-600/20" />
              <div>
                <div className="text-3xl font-bold text-yellow-400">100%</div>
                <div className="text-xs text-gray-400 mt-1 font-medium">Custom Solutions</div>
              </div>
              <div className="h-12 w-px bg-yellow-600/20" />
              <div>
                <div className="text-3xl font-bold text-yellow-400">24/7</div>
                <div className="text-xs text-gray-400 mt-1 font-medium">Support</div>
              </div>
            </div>
          </div>

          {/* Feature Showcase */}
          <div className="relative lg:pl-12">
            <div className="relative rounded-2xl bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-xl p-8 shadow-2xl border border-yellow-600/20 hover:border-yellow-400/50 transition-all duration-300">

              {/* Feature Cards */}
              <div className="space-y-4">
                {[
                  { icon: "⚙️", title: "Smart Automation", desc: "AI-powered workflows across your entire business" },
                  { icon: "🤖", title: "AI Agents", desc: "Conversational systems that scale with your needs" },
                  { icon: "📊", title: "Data Insights", desc: "Real-time dashboards and analytics" },
                  { icon: "🔗", title: "Seamless Integration", desc: "Connect all your tools and platforms" },
                ].map((feature, i) => (
                  <div
                    key={i}
                    className="group rounded-xl border border-yellow-600/20 bg-black/30 p-4 hover:border-yellow-400/50 hover:bg-yellow-400/5 transition-all duration-300"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 text-2xl mt-1">{feature.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white group-hover:text-yellow-400 transition-colors">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-gray-400 mt-1">{feature.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Accent Border */}
              <div className="absolute -top-1 -left-1 w-32 h-32 bg-yellow-400/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-1 -right-1 w-24 h-24 bg-yellow-400/5 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
