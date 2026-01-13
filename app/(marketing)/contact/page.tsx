"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin, Send, Loader } from "lucide-react"
import { DSLogo } from "@/components/ds-logo"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    projectType: "general",
    budget: "not-specified",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setSubmitted(true)
    setIsSubmitting(false)
  }

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
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            <span className="dark:text-white text-gray-900">Let&apos;s Build Something </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">
              Amazing Together
            </span>
          </h2>
          <p className="text-xl dark:text-gray-300 text-gray-600 max-w-2xl mx-auto">
            Ready to transform your business with AI? Our team of experts is here to discuss your unique needs and create a custom solution.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-12 lg:grid-cols-3 mb-20">
          {/* Contact Info Cards */}
          <div className="space-y-6">
            {/* Email Card */}
            <div className="dark:bg-black/30 bg-white rounded-xl border dark:border-yellow-500/30 border-yellow-500/30 p-6 hover:border-yellow-500/60 transition-all shadow-sm dark:shadow-none">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-yellow-500/20">
                  <Mail className="h-6 w-6 text-yellow-500" />
                </div>
                <div>
                  <p className="font-semibold dark:text-white text-gray-900">Email Us</p>
                  <p className="text-yellow-600 dark:text-yellow-300 hover:text-yellow-500 cursor-pointer mt-1">hello@dreamstateai.com</p>
                  <p className="text-sm dark:text-gray-400 text-gray-500 mt-2">Response time: Under 2 hours</p>
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div className="dark:bg-black/30 bg-white rounded-xl border dark:border-yellow-500/30 border-yellow-500/30 p-6 hover:border-yellow-500/60 transition-all shadow-sm dark:shadow-none">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-yellow-500/20">
                  <Phone className="h-6 w-6 text-yellow-500" />
                </div>
                <div>
                  <p className="font-semibold dark:text-white text-gray-900">Call Us</p>
                  <p className="text-yellow-600 dark:text-yellow-300 hover:text-yellow-500 cursor-pointer mt-1">+1 (555) 123-4567</p>
                  <p className="text-sm dark:text-gray-400 text-gray-500 mt-2">Mon-Fri, 9AM-6PM EST</p>
                </div>
              </div>
            </div>

            {/* Location Card */}
            <div className="dark:bg-black/30 bg-white rounded-xl border dark:border-yellow-500/30 border-yellow-500/30 p-6 hover:border-yellow-500/60 transition-all shadow-sm dark:shadow-none">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-yellow-500/20">
                  <MapPin className="h-6 w-6 text-yellow-500" />
                </div>
                <div>
                  <p className="font-semibold dark:text-white text-gray-900">Visit Us</p>
                  <p className="dark:text-gray-300 text-gray-600 mt-1 text-sm">
                    San Francisco, CA<br />
                    New York, NY
                  </p>
                  <p className="text-sm dark:text-gray-400 text-gray-500 mt-2">Remote-first, global team</p>
                </div>
              </div>
            </div>

            {/* Response Time Stats */}
            <div className="dark:bg-black/30 bg-white rounded-xl border dark:border-yellow-500/30 border-yellow-500/30 p-6 bg-gradient-to-br from-yellow-500/10 to-transparent shadow-sm dark:shadow-none">
              <h3 className="font-semibold dark:text-white text-gray-900 mb-4">Response Time</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="dark:text-gray-300 text-gray-600 text-sm">Email Support</span>
                  <span className="text-yellow-600 dark:text-yellow-300 text-sm font-medium">~2 hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="dark:text-gray-300 text-gray-600 text-sm">Phone Support</span>
                  <span className="text-yellow-600 dark:text-yellow-300 text-sm font-medium">~30 min</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="dark:text-gray-300 text-gray-600 text-sm">Emergency Support</span>
                  <span className="text-yellow-600 dark:text-yellow-300 text-sm font-medium">24/7</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="dark:bg-black/30 bg-white rounded-2xl border dark:border-yellow-500/30 border-yellow-500/30 p-8 sm:p-10 shadow-sm dark:shadow-none">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 border border-yellow-400/50 mb-6">
                    <svg className="h-10 w-10 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold dark:text-white text-gray-900 mb-2">Message Received!</h3>
                  <p className="dark:text-gray-300 text-gray-600 mb-8">
                    Thank you for your inquiry. Our team will review your project details and get back to you within 2 hours.
                  </p>
                  <Button
                    onClick={() => {
                      setSubmitted(false)
                      setFormData({
                        name: "",
                        email: "",
                        company: "",
                        phone: "",
                        projectType: "general",
                        budget: "not-specified",
                        message: "",
                      })
                    }}
                    className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name and Email */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="name" className="dark:text-gray-200 text-gray-700 font-medium">
                        Your Name *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Smith"
                        required
                        className="mt-2 dark:bg-black/50 bg-gray-50 border-yellow-500/30 dark:text-white text-gray-900 placeholder:text-gray-500 focus:border-yellow-500 focus:ring-yellow-500/20"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="dark:text-gray-200 text-gray-700 font-medium">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        required
                        className="mt-2 dark:bg-black/50 bg-gray-50 border-yellow-500/30 dark:text-white text-gray-900 placeholder:text-gray-500 focus:border-yellow-500 focus:ring-yellow-500/20"
                      />
                    </div>
                  </div>

                  {/* Company and Phone */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="company" className="dark:text-gray-200 text-gray-700 font-medium">
                        Company Name
                      </Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Acme Inc."
                        className="mt-2 dark:bg-black/50 bg-gray-50 border-yellow-500/30 dark:text-white text-gray-900 placeholder:text-gray-500 focus:border-yellow-500 focus:ring-yellow-500/20"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="dark:text-gray-200 text-gray-700 font-medium">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 123-4567"
                        className="mt-2 dark:bg-black/50 bg-gray-50 border-yellow-500/30 dark:text-white text-gray-900 placeholder:text-gray-500 focus:border-yellow-500 focus:ring-yellow-500/20"
                      />
                    </div>
                  </div>

                  {/* Project Type and Budget */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="projectType" className="dark:text-gray-200 text-gray-700 font-medium">
                        Project Type *
                      </Label>
                      <Select value={formData.projectType} onValueChange={(value) => handleSelectChange("projectType", value)}>
                        <SelectTrigger className="mt-2 dark:bg-black/50 bg-gray-50 border-yellow-500/30 dark:text-white text-gray-900 focus:border-yellow-500 focus:ring-yellow-500/20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="dark:bg-black/90 bg-white border-yellow-500/30">
                          <SelectItem value="general" className="dark:text-white text-gray-900">General Inquiry</SelectItem>
                          <SelectItem value="automation" className="dark:text-white text-gray-900">AI Automation</SelectItem>
                          <SelectItem value="chatbot" className="dark:text-white text-gray-900">Chatbot Development</SelectItem>
                          <SelectItem value="rag" className="dark:text-white text-gray-900">RAG Solution</SelectItem>
                          <SelectItem value="web" className="dark:text-white text-gray-900">Web Development</SelectItem>
                          <SelectItem value="backend" className="dark:text-white text-gray-900">Backend API</SelectItem>
                          <SelectItem value="dashboard" className="dark:text-white text-gray-900">Dashboard/Analytics</SelectItem>
                          <SelectItem value="consulting" className="dark:text-white text-gray-900">AI Consulting</SelectItem>
                          <SelectItem value="integration" className="dark:text-white text-gray-900">System Integration</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="budget" className="dark:text-gray-200 text-gray-700 font-medium">
                        Budget Range
                      </Label>
                      <Select value={formData.budget} onValueChange={(value) => handleSelectChange("budget", value)}>
                        <SelectTrigger className="mt-2 dark:bg-black/50 bg-gray-50 border-yellow-500/30 dark:text-white text-gray-900 focus:border-yellow-500 focus:ring-yellow-500/20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="dark:bg-black/90 bg-white border-yellow-500/30">
                          <SelectItem value="not-specified" className="dark:text-white text-gray-900">Not Specified</SelectItem>
                          <SelectItem value="10k-25k" className="dark:text-white text-gray-900">$10K - $25K</SelectItem>
                          <SelectItem value="25k-50k" className="dark:text-white text-gray-900">$25K - $50K</SelectItem>
                          <SelectItem value="50k-100k" className="dark:text-white text-gray-900">$50K - $100K</SelectItem>
                          <SelectItem value="100k-250k" className="dark:text-white text-gray-900">$100K - $250K</SelectItem>
                          <SelectItem value="250k+" className="dark:text-white text-gray-900">$250K+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <Label htmlFor="message" className="dark:text-gray-200 text-gray-700 font-medium">
                      Project Details *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project, goals, timeline, and any specific requirements..."
                      rows={6}
                      required
                      className="mt-2 dark:bg-black/50 bg-gray-50 border-yellow-500/30 dark:text-white text-gray-900 placeholder:text-gray-500 focus:border-yellow-500 focus:ring-yellow-500/20 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold py-3 text-lg flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader className="h-5 w-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </Button>

                  <p className="text-center text-sm dark:text-gray-400 text-gray-500">
                    We respect your privacy. We&apos;ll only use your information to respond to your inquiry.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
