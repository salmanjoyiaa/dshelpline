import {
  Zap,
  MessageSquare,
  Search,
  Globe,
  Code,
  BarChart3,
  Workflow,
  Lightbulb,
} from "lucide-react"

const services = [
  {
    icon: Workflow,
    title: "AI Workflow & Business Automation",
    description: "Build powerful, efficient automation using n8n, Zapier, Make.com, and custom orchestrations so teams work smarter, not harder.",
    features: [
      "Automate lead capture, follow-ups, scheduling & CRM flows",
      "Intelligent triggers & conditional logic across apps",
      "End-to-end business process automation",
      "API and webhook integrations with internal systems",
    ],
  },
  {
    icon: MessageSquare,
    title: "AI Agents & Chatbots",
    description: "Develop advanced conversational systems powered by LLMs (OpenAI, Claude, custom models).",
    features: [
      "Smart customer support assistants",
      "RAG-enabled knowledge bots",
      "Voice agents for calls, SMS, and email",
      "Memory & context awareness for richer dialogues",
    ],
  },
  {
    icon: Search,
    title: "RAG & Retrieval Chatbots",
    description: "Deliver state-of-the-art chat experiences with real-time knowledge retrieval that scales with your business.",
    features: [
      "Document ingestion & semantic search",
      "Custom question-answering agents",
      "Phone, web, or app deployments",
      "Real-time knowledge base updates",
    ],
  },
  {
    icon: Globe,
    title: "Custom Web & Portfolio Development",
    description: "Professional websites that elevate brand presence.",
    features: [
      "Portfolio sites for engineers, creatives & agencies",
      "Business landing pages & SaaS product sites",
      "SEO-optimized and conversion-focused UX",
      "Fast, secure, scalable deployments (Vercel, static + dynamic sites)",
    ],
  },
  {
    icon: Code,
    title: "Backend & API Engineering",
    description: "Robust backend systems designed with performance and scale in mind.",
    features: [
      "Python (FastAPI), Node.js, serverless functions",
      "Secure REST & GraphQL APIs",
      "Database architecture & data stores",
      "Authentication + RBAC systems",
    ],
  },
  {
    icon: BarChart3,
    title: "Dashboards & Data Reporting",
    description: "Turn data into insights with interactive dashboards and reports.",
    features: [
      "Real-time metrics & KPIs",
      "Automated analytics reporting",
      "Integrations with BI tools (Metabase, Superset, Grafana)",
      "Forecasting & trend analysis models",
    ],
  },
  {
    icon: Zap,
    title: "CRM, Sales & Marketing Integrations",
    description: "Automate entire customer journeys with synchronized apps.",
    features: [
      "Salesforce, HubSpot, Zoho workflows",
      "Email/SMS outreach & lead scoring",
      "Ongoing maintenance & optimization",
      "Custom workflow automation",
    ],
  },
  {
    icon: Lightbulb,
    title: "AI Consulting & Strategy",
    description: "Expert guidance on AI adoption, ROI analysis, and technical architecture planning.",
    features: [
      "Custom AI TCO strategy",
      "Scalability & governance frameworks",
      "Deployment + monitoring strategy",
      "Technical feasibility assessment",
    ],
  },
]

export function ServicesGrid() {
  return (
    <section className="relative py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-yellow-600/30 bg-black/40 backdrop-blur-md px-4 py-2 shadow-sm mb-6">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-yellow-400">
              <Zap className="h-3 w-3 text-black" />
            </div>
            <span className="text-xs font-medium text-yellow-400 tracking-wide uppercase">Core Services</span>
          </div>

          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.05] mb-6">
            Comprehensive AI Solutions
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto font-light">
            From intelligent automation to custom development, we deliver end-to-end AI solutions that transform your business operations.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div
                key={index}
                className="group relative rounded-2xl border border-yellow-600/20 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-xl p-8 hover:border-yellow-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/10"
              >
                {/* Background gradient on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="mb-6 inline-flex p-3 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-500 text-black shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </div>

                  {/* Title */}
                  <h3 className="mb-3 text-xl font-bold text-white leading-snug">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="mb-5 text-sm text-gray-300 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2">
                    {service.features.slice(0, 3).map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-gray-400">
                        <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-yellow-400" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
