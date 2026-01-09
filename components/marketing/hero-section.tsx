import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AIBackground } from "@/components/ui/ai-background"
import { ArrowRight, Play, MapPin, Users, Clock, Zap } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center pt-20 pb-16 sm:pt-32 sm:pb-24">
      <AIBackground intensity="light" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 w-full">
        <div className="grid items-center gap-20 lg:grid-cols-2 lg:gap-32">
          {/* Content */}
          <div className="space-y-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-slate-200/80 bg-white/60 backdrop-blur-md px-4 py-2 shadow-sm">
              <div className="flex h-5 w-5 items-center justify-center rounded-full ai-gradient">
                <Zap className="h-3 w-3 text-white" />
              </div>
              <span className="text-xs font-medium text-slate-700 tracking-wide uppercase">AI-Powered Dispatch</span>
            </div>

            {/* Headline */}
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight text-slate-900 leading-[1.05]">
                Intelligent
                <br />
                <span className="ai-gradient-text">Service Dispatch</span>
                <br />
                <span className="text-slate-900">Made Simple</span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-xl font-light">
                Advanced AI automates every aspect of service dispatch—from call routing to provider assignment. 
                Transform complex operations into effortless workflows.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button 
                size="lg" 
                asChild 
                className="ai-gradient hover:opacity-95 text-white shadow-lg hover:shadow-xl transition-all duration-300 text-sm font-semibold px-8 py-6 rounded-xl group"
              >
                <Link href="/signup">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                asChild 
                className="border border-slate-300 hover:border-slate-400 hover:bg-slate-50 text-sm font-medium px-8 py-6 rounded-xl group bg-white/80 backdrop-blur-sm"
              >
                <Link href="#demo">
                  <Play className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                  Watch Demo
                </Link>
              </Button>
            </div>

            {/* Stats Row */}
            <div className="flex items-center gap-8 pt-8 border-t border-slate-100">
              <div>
                <div className="text-3xl font-bold text-slate-900">98%</div>
                <div className="text-xs text-slate-500 mt-1 font-medium">Accuracy Rate</div>
              </div>
              <div className="h-12 w-px bg-slate-200" />
              <div>
                <div className="text-3xl font-bold text-slate-900">40%</div>
                <div className="text-xs text-slate-500 mt-1 font-medium">Faster Response</div>
              </div>
              <div className="h-12 w-px bg-slate-200" />
              <div>
                <div className="text-3xl font-bold text-slate-900">2.5K+</div>
                <div className="text-xs text-slate-500 mt-1 font-medium">Companies</div>
              </div>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="relative lg:pl-12">
            <div className="relative rounded-2xl bg-white/80 backdrop-blur-xl p-8 shadow-2xl border border-slate-200/50">

              {/* Mock Dashboard */}
              <div className="rounded-lg bg-muted/50 p-4">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-primary" />
                    <div>
                      <div className="h-3 w-24 rounded bg-foreground/20" />
                      <div className="mt-1 h-2 w-16 rounded bg-muted-foreground/30" />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-8 w-8 rounded-lg bg-muted" />
                    <div className="h-8 w-8 rounded-lg bg-muted" />
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {[
                    { icon: MapPin, label: "Active Jobs", value: "24", color: "text-primary" },
                    { icon: Users, label: "Providers", value: "12", color: "text-green-500" },
                    { icon: Clock, label: "Avg. Response", value: "8m", color: "text-amber-500" },
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-lg bg-background p-3">
                      <stat.icon className={`h-5 w-5 ${stat.color}`} />
                      <p className="mt-2 text-xl font-bold">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Map placeholder */}
                <div className="mt-4 h-40 rounded-lg bg-background">
                  <div className="flex h-full items-center justify-center">
                    <div className="text-center">
                      <MapPin className="mx-auto h-8 w-8 text-primary/40" />
                      <p className="mt-2 text-xs text-muted-foreground">Live Map View</p>
                    </div>
                  </div>
                </div>

                {/* Recent requests */}
                <div className="mt-4 space-y-2">
                  {[
                    { status: "In Progress", customer: "John D.", time: "2m ago", statusColor: "bg-blue-500" },
                    { status: "Assigned", customer: "Sarah M.", time: "5m ago", statusColor: "bg-amber-500" },
                    { status: "Completed", customer: "Mike R.", time: "12m ago", statusColor: "bg-green-500" },
                  ].map((request, i) => (
                    <div key={i} className="flex items-center justify-between rounded-lg bg-background p-3">
                      <div className="flex items-center gap-3">
                        <div className={`h-2 w-2 rounded-full ${request.statusColor}`} />
                        <div>
                          <p className="text-sm font-medium">{request.customer}</p>
                          <p className="text-xs text-muted-foreground">{request.status}</p>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">{request.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Notification Cards */}
            <div className="absolute -left-4 top-1/4 rounded-lg bg-white/90 backdrop-blur-md border border-slate-200 p-3 shadow-xl">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-white">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-900">Provider Assigned</p>
                  <p className="text-[10px] text-slate-500">3 min away</p>
                </div>
              </div>
            </div>

            <div className="absolute -right-4 bottom-1/4 rounded-lg bg-white/90 backdrop-blur-md border border-slate-200 p-3 shadow-xl">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg ai-gradient text-white">
                  <Zap className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-900">AI Match</p>
                  <p className="text-[10px] text-slate-500">98% optimal</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
