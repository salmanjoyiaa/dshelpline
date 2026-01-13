"use client"

import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DSLogo } from "@/components/ds-logo"
import { ExternalLink, Star, TrendingUp, Users, Target, Zap } from "lucide-react"

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform Optimization",
      industry: "Retail",
      roi: "340%",
      challenge:
        "Major e-commerce platform struggled with manual inventory management and slow order processing, causing customer dissatisfaction.",
      solution:
        "Implemented AI-powered inventory forecasting system with automated order routing and predictive analytics.",
      results: [
        "Order processing time reduced by 75%",
        "Inventory costs decreased by 45%",
        "Customer satisfaction improved to 98%",
        "$2.4M revenue increase in first year",
      ],
      technologies: ["Python", "TensorFlow", "PostgreSQL", "React"],
      testimonial: {
        author: "Sarah Johnson",
        role: "VP of Operations, RetailCorp",
        text: "Dream State AI transformed our operations. The ROI exceeded expectations by month three.",
        rating: 5,
      },
    },
    {
      id: 2,
      title: "Customer Support Automation",
      industry: "SaaS",
      roi: "220%",
      challenge:
        "Growing SaaS company had 60% of support tickets handled manually, with 48-hour average response time.",
      solution:
        "Deployed intelligent RAG chatbot with multi-language support and seamless handoff to human agents.",
      results: [
        "70% of tickets resolved by AI automatically",
        "Response time reduced to 5 minutes",
        "Support team capacity increased 3x",
        "$1.8M in operational savings annually",
      ],
      technologies: ["LLM Integration", "Vector Database", "Node.js", "React"],
      testimonial: {
        author: "Michael Chen",
        role: "CEO, TechFlow",
        text: "Within 3 months, our support metrics improved dramatically. Best investment we made.",
        rating: 5,
      },
    },
    {
      id: 3,
      title: "Real Estate Market Analysis Platform",
      industry: "Real Estate",
      roi: "280%",
      challenge: "Real estate agents spent 15 hours per week analyzing market trends and property data manually.",
      solution:
        "Built AI-powered dashboard aggregating market data with predictive pricing models and investment recommendations.",
      results: [
        "Market analysis time reduced by 90%",
        "Deal closing time improved by 35%",
        "Average deal size increased by $180K",
        "3,000+ agents adopted within first year",
      ],
      technologies: ["Python", "FastAPI", "React", "PostgreSQL"],
      testimonial: {
        author: "Lisa Rodriguez",
        role: "Director, RealEstate Pro",
        text: "Our agents can now close 50% more deals. The insights are incredibly valuable.",
        rating: 5,
      },
    },
    {
      id: 4,
      title: "Enterprise CRM Integration",
      industry: "Manufacturing",
      roi: "450%",
      challenge: "Data silos across 5 different systems caused poor customer insights and duplicate records.",
      solution:
        "Implemented unified CRM with AI-powered data deduplication, automated data mapping, and real-time sync.",
      results: [
        "Single source of truth established",
        "Data accuracy improved to 99.7%",
        "Sales productivity increased by 55%",
        "$4.2M new revenue in year one",
      ],
      technologies: ["Salesforce API", "Python", "AWS", "Machine Learning"],
      testimonial: {
        author: "James Wilson",
        role: "CTO, ManufactureCo",
        text: "The integration was seamless. Our sales team embraced it immediately.",
        rating: 5,
      },
    },
    {
      id: 5,
      title: "Content Personalization Engine",
      industry: "Media & Publishing",
      roi: "380%",
      challenge: "Publisher had one-size-fits-all content approach, resulting in high bounce rates and low engagement.",
      solution:
        "Developed AI recommendation engine analyzing user behavior, preferences, and content performance.",
      results: [
        "User engagement increased by 210%",
        "Time on site improved by 320%",
        "Subscription conversions up 165%",
        "$5.1M in additional subscription revenue",
      ],
      technologies: ["Machine Learning", "Data Pipeline", "React", "Node.js"],
      testimonial: {
        author: "Emma Thompson",
        role: "Head of Product, MediaHub",
        text: "Our users get genuinely personalized experiences. Engagement metrics are incredible.",
        rating: 5,
      },
    },
    {
      id: 6,
      title: "Marketing Campaign Optimization",
      industry: "B2B SaaS",
      roi: "310%",
      challenge:
        "Marketing team manually managed 50+ campaigns with inconsistent performance and high ad spend waste.",
      solution:
        "Built AI marketing suite with predictive targeting, budget optimization, and performance forecasting.",
      results: [
        "Cost per acquisition reduced by 68%",
        "Campaign ROAS improved to 6.2x",
        "Lead quality score increased by 180%",
        "$3.8M in waste reduction annually",
      ],
      technologies: ["Python", "TensorFlow", "Marketing APIs", "Data Analytics"],
      testimonial: {
        author: "David Kumar",
        role: "VP Marketing, GrowthCo",
        text: "AI-driven targeting gave us competitive advantage. We're crushing our targets.",
        rating: 5,
      },
    },
  ]

  const stats = [
    {
      label: "Successful Projects",
      value: "50+",
      icon: <Target className="w-6 h-6 text-yellow-400" />,
    },
    {
      label: "Client Satisfaction",
      value: "98%",
      icon: <Users className="w-6 h-6 text-yellow-400" />,
    },
    {
      label: "Total ROI Generated",
      value: "$45M+",
      icon: <TrendingUp className="w-6 h-6 text-yellow-400" />,
    },
    {
      label: "Industries Served",
      value: "18+",
      icon: <Zap className="w-6 h-6 text-yellow-400" />,
    },
  ]

  return (
    <main className="min-h-screen dark:bg-black bg-gray-50">
      {/* Header */}
      <div className="border-b dark:border-yellow-500/20 border-yellow-500/30 dark:bg-black/50 bg-white/50 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <DSLogo size={40} />
            <h1 className="text-2xl font-bold dark:text-white text-gray-900">Dream State AI</h1>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-20">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            <span className="dark:text-white text-gray-900">Our Impact in </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">
              Real Projects
            </span>
          </h1>
          <p className="text-xl dark:text-gray-300 text-gray-600 max-w-2xl mx-auto">
            See how Dream State AI has transformed businesses across industries with measurable results and proven ROI.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="dark:bg-black/30 bg-white rounded-xl border dark:border-yellow-500/30 border-yellow-500/30 p-6 text-center hover:border-yellow-500/60 transition-all shadow-sm dark:shadow-none"
            >
              <div className="flex justify-center mb-3">{stat.icon}</div>
              <div className="text-3xl font-bold text-yellow-500 mb-2">{stat.value}</div>
              <div className="dark:text-gray-300 text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="space-y-12 mb-20">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              className={`dark:bg-black/30 bg-white rounded-2xl border dark:border-yellow-500/30 border-yellow-500/30 overflow-hidden hover:border-yellow-500/60 transition-all shadow-sm dark:shadow-none ${
                idx % 2 === 0 ? "lg:grid lg:grid-cols-5 lg:gap-6" : "lg:grid lg:grid-cols-5 lg:gap-6"
              }`}
            >
              {/* Left Content */}
              <div className={`p-8 lg:col-span-3 ${idx % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="inline-block bg-yellow-500/20 text-yellow-600 dark:text-yellow-300 px-3 py-1 rounded-full text-sm font-medium mb-3">
                      {project.industry}
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold dark:text-white text-gray-900 mb-4">{project.title}</h2>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">
                      {project.roi}
                    </div>
                    <p className="dark:text-gray-400 text-gray-500 text-sm mt-1">ROI Achieved</p>
                  </div>
                </div>

                {/* Challenge */}
                <div className="mb-6">
                  <h3 className="text-yellow-500 font-semibold mb-2">The Challenge</h3>
                  <p className="dark:text-gray-300 text-gray-600">{project.challenge}</p>
                </div>

                {/* Solution */}
                <div className="mb-6">
                  <h3 className="text-yellow-500 font-semibold mb-2">Our Solution</h3>
                  <p className="dark:text-gray-300 text-gray-600">{project.solution}</p>
                </div>

                {/* Results */}
                <div className="mb-8">
                  <h3 className="text-yellow-500 font-semibold mb-3">Results & Impact</h3>
                  <ul className="space-y-2">
                    {project.results.map((result, i) => (
                      <li key={i} className="flex items-start gap-3 dark:text-gray-300 text-gray-600">
                        <span className="text-yellow-500 mt-1 flex-shrink-0">✓</span>
                        <span>{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="inline-block bg-yellow-500/10 border border-yellow-500/30 text-yellow-600 dark:text-yellow-300 px-3 py-1 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Testimonial */}
              <div
                className={`p-8 bg-gradient-to-br from-yellow-500/10 to-transparent border-t dark:border-yellow-500/20 border-yellow-500/20 lg:border-t-0 lg:col-span-2 flex flex-col justify-between ${
                  idx % 2 === 1 ? "lg:order-1" : ""
                }`}
              >
                <div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(project.testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-yellow-500 text-yellow-500"
                      />
                    ))}
                  </div>
                  <blockquote className="dark:text-white text-gray-900 text-lg mb-6 leading-relaxed italic">
                    "{project.testimonial.text}"
                  </blockquote>
                </div>
                <div>
                  <p className="font-semibold dark:text-white text-gray-900">{project.testimonial.author}</p>
                  <p className="text-yellow-600 dark:text-yellow-300 text-sm">{project.testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="dark:bg-black/30 bg-white rounded-2xl border dark:border-yellow-500/30 border-yellow-500/30 p-12 text-center bg-gradient-to-r from-yellow-500/10 to-transparent shadow-sm dark:shadow-none">
          <h2 className="text-3xl font-bold dark:text-white text-gray-900 mb-4">Ready to Transform Your Business?</h2>
          <p className="dark:text-gray-300 text-gray-600 mb-8 max-w-2xl mx-auto">
            Join 50+ companies that have achieved extraordinary results with Dream State AI solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 flex items-center justify-center gap-2">
              Start Your Project
              <ExternalLink className="w-4 h-4" />
            </Button>
            <Button variant="outline" className="border-yellow-500/30 dark:text-white text-gray-900 hover:bg-yellow-500/10 px-8 py-3">
              Schedule Consultation
            </Button>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="border-t dark:border-yellow-500/20 border-yellow-500/30 dark:bg-black/40 bg-white/40 py-12 px-4">
        <div className="text-center">
          <p className="dark:text-gray-400 text-gray-500 mb-4">Have a project in mind?</p>
          <Link href="/contact">
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
              Get in Touch
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
