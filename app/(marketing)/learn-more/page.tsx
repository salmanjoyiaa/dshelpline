"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { DSLogo } from "@/components/ds-logo"
import {
  Zap,
  MessageSquare,
  Search,
  Globe,
  Code,
  BarChart3,
  Workflow,
  Lightbulb,
  ArrowRight,
  CheckCircle,
} from "lucide-react"

export default function LearnMorePage() {
  const services = [
    {
      id: 1,
      title: "AI Automation",
      icon: <Zap className="w-8 h-8" />,
      description:
        "Streamline repetitive processes with intelligent automation powered by machine learning and AI.",
      benefits: [
        "Reduce manual work by 80%+",
        "Improve accuracy and consistency",
        "Scale operations without adding headcount",
        "Cut operational costs significantly",
      ],
      useCases: [
        "Data entry and document processing",
        "Workflow orchestration",
        "Invoice and receipt automation",
        "Customer onboarding",
        "Report generation",
      ],
    },
    {
      id: 2,
      title: "AI Agents",
      icon: <MessageSquare className="w-8 h-8" />,
      description:
        "Deploy intelligent agents that can understand, decide, and act autonomously on complex tasks.",
      benefits: [
        "24/7 autonomous operation",
        "Multi-step task completion",
        "Real-time decision making",
        "Continuous learning and improvement",
      ],
      useCases: [
        "Customer service automation",
        "Lead qualification and outreach",
        "Meeting scheduling",
        "Inventory management",
        "Compliance monitoring",
      ],
    },
    {
      id: 3,
      title: "RAG Chatbots",
      icon: <Search className="w-8 h-8" />,
      description:
        "Intelligent chatbots that retrieve and reason over your knowledge base to provide accurate answers.",
      benefits: [
        "Instant answer to customer questions",
        "Reduce support ticket volume by 70%+",
        "Available 24/7 in multiple languages",
        "Seamless handoff to human agents",
      ],
      useCases: [
        "Customer support automation",
        "Internal knowledge management",
        "Sales enablement",
        "Product documentation",
        "FAQ automation",
      ],
    },
    {
      id: 4,
      title: "Custom Web Solutions",
      icon: <Globe className="w-8 h-8" />,
      description:
        "Build modern, scalable web applications tailored to your specific business needs.",
      benefits: [
        "Modern, responsive design",
        "Fast performance and SEO optimized",
        "Secure and scalable architecture",
        "Easy to maintain and extend",
      ],
      useCases: [
        "Customer portals",
        "SaaS applications",
        "E-commerce platforms",
        "Admin dashboards",
        "Landing pages",
      ],
    },
    {
      id: 5,
      title: "Backend APIs",
      icon: <Code className="w-8 h-8" />,
      description:
        "Robust backend systems that power your applications with scalability and reliability.",
      benefits: [
        "High performance and reliability",
        "Infinite scalability",
        "Enterprise-grade security",
        "Easy API integration",
      ],
      useCases: [
        "Microservices architecture",
        "Real-time data processing",
        "Integration platforms",
        "Third-party service integration",
        "Mobile app backends",
      ],
    },
    {
      id: 6,
      title: "Dashboards & Analytics",
      icon: <BarChart3 className="w-8 h-8" />,
      description:
        "Visual intelligence platforms that transform data into actionable business insights.",
      benefits: [
        "Real-time data visualization",
        "Predictive analytics",
        "Custom reports and exports",
        "Mobile-friendly dashboards",
      ],
      useCases: [
        "Business intelligence",
        "Sales performance tracking",
        "Customer analytics",
        "Operational monitoring",
        "Financial reporting",
      ],
    },
    {
      id: 7,
      title: "CRM Integration",
      icon: <Workflow className="w-8 h-8" />,
      description:
        "Seamlessly connect your business systems for unified customer data and workflows.",
      benefits: [
        "Single source of truth",
        "Automated data synchronization",
        "Reduced data entry",
        "Better customer insights",
      ],
      useCases: [
        "Salesforce integration",
        "Data migration projects",
        "System consolidation",
        "Custom CRM development",
        "API-to-CRM bridges",
      ],
    },
    {
      id: 8,
      title: "AI Consulting",
      icon: <Lightbulb className="w-8 h-8" />,
      description:
        "Strategic guidance on AI adoption, implementation roadmaps, and digital transformation.",
      benefits: [
        "Clear AI strategy",
        "Implementation roadmap",
        "Risk mitigation",
        "ROI optimization",
      ],
      useCases: [
        "AI strategy workshops",
        "Technology evaluation",
        "Proof of concepts",
        "Change management",
        "Team training",
      ],
    },
  ]

  const process = [
    {
      step: 1,
      title: "Discovery & Analysis",
      description:
        "We deeply understand your business, challenges, and goals. We analyze your current systems and processes.",
    },
    {
      step: 2,
      title: "Strategy & Planning",
      description:
        "We create a comprehensive roadmap with clear timelines, resource allocation, and success metrics.",
    },
    {
      step: 3,
      title: "Implementation",
      description:
        "Our expert team builds, integrates, and deploys your solution with rigorous testing and quality assurance.",
    },
    {
      step: 4,
      title: "Launch & Support",
      description:
        "We launch your solution and provide ongoing support, training, and optimization for maximum impact.",
    },
  ]

  return (
    <main className="min-h-screen bg-black">
      {/* Header */}
      <div className="border-b border-yellow-500/20 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <DSLogo size={40} />
              <h1 className="text-2xl font-bold text-white">Dream State AI</h1>
            </div>
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
              Get Started
            </Button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-20">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            <span className="text-white">Comprehensive AI </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              Solutions
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore our complete suite of AI and software solutions designed to transform every aspect of your business.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-20">
          {services.map((service) => (
            <div
              key={service.id}
              className="glass-effect rounded-xl border border-yellow-500/30 p-6 hover:border-yellow-400/60 transition-all group cursor-pointer"
            >
              <div className="text-yellow-400 mb-4 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Detailed Services Section */}
        <div className="space-y-16 mb-20">
          {services.map((service, idx) => (
            <div
              key={service.id}
              className={`glass-effect rounded-2xl border border-yellow-500/30 overflow-hidden p-8 sm:p-12 ${
                idx % 2 === 0 ? "lg:grid lg:grid-cols-5 lg:gap-8" : "lg:grid lg:grid-cols-5 lg:gap-8"
              }`}
            >
              <div className={`lg:col-span-3 ${idx % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="text-yellow-400 mb-4">{service.icon}</div>
                <h2 className="text-3xl font-bold text-white mb-4">{service.title}</h2>
                <p className="text-gray-300 mb-8 text-lg">{service.description}</p>

                {/* Benefits */}
                <div className="mb-8">
                  <h3 className="text-yellow-400 font-semibold mb-4 text-lg">Key Benefits</h3>
                  <ul className="space-y-3">
                    {service.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-300">
                        <CheckCircle className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold flex items-center gap-2">
                  Learn More <ArrowRight className="w-4 h-4" />
                </Button>
              </div>

              {/* Use Cases */}
              <div
                className={`mt-8 lg:mt-0 lg:col-span-2 bg-gradient-to-br from-yellow-500/10 to-transparent rounded-xl p-6 ${
                  idx % 2 === 1 ? "lg:order-1" : ""
                }`}
              >
                <h3 className="text-yellow-400 font-semibold mb-4">Use Cases</h3>
                <ul className="space-y-3">
                  {service.useCases.map((useCase, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-300">
                      <span className="text-yellow-400 mt-1">→</span>
                      <span>{useCase}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Process Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Our Process</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              From initial consultation to ongoing support, we guide you through every step of your transformation.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {process.map((item, idx) => (
              <div key={idx} className="glass-effect rounded-xl border border-yellow-500/30 p-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-black font-bold text-lg mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="glass-effect rounded-2xl border border-yellow-500/30 p-12 bg-gradient-to-r from-yellow-500/10 to-transparent mb-20">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-yellow-400 text-3xl font-bold mb-3">98%</div>
              <p className="text-gray-300">Client satisfaction rate with ongoing relationships</p>
            </div>
            <div>
              <div className="text-yellow-400 text-3xl font-bold mb-3">$45M+</div>
              <p className="text-gray-300">Total ROI generated for our clients</p>
            </div>
            <div>
              <div className="text-yellow-400 text-3xl font-bold mb-3">50+</div>
              <p className="text-gray-300">Successful projects across 18+ industries</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss how our AI solutions can drive growth and efficiency in your organization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3">
              Schedule Consultation
            </Button>
            <Button variant="outline" className="border-yellow-500/30 text-white hover:bg-yellow-500/10 px-8 py-3">
              View Case Studies
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
