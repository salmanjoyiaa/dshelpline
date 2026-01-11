'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DSLogo } from '@/components/ds-logo';
import {
  CheckCircle,
  Workflow,
  MessageSquare,
  BarChart3,
  Zap,
  Shield,
  Code,
  ArrowRight,
  Sun,
  Moon,
} from 'lucide-react';

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  return (
    <div className={`min-h-screen overflow-hidden ${isDarkMode ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>
      {/* Animated Background Gradient - Black with Yellow accents */}
      <div className="fixed inset-0 z-0">
        <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-br from-black to-black opacity-95' : 'bg-gradient-to-br from-white via-gray-50 to-white opacity-100'}`}></div>
        {isDarkMode ? (
          <>
            <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400 rounded-full blur-3xl opacity-5 animate-pulse"></div>
            <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-yellow-500 rounded-full blur-3xl opacity-4 animate-pulse animation-delay-2000"></div>
            <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-yellow-400 rounded-full blur-3xl opacity-3 animate-pulse animation-delay-4000"></div>
          </>
        ) : (
          <>
            <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-200 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-yellow-100 rounded-full blur-3xl opacity-15 animate-pulse animation-delay-2000"></div>
            <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-yellow-50 rounded-full blur-3xl opacity-10 animate-pulse animation-delay-4000"></div>
          </>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className={`border-b backdrop-blur-md ${isDarkMode ? 'border-yellow-600/20 bg-black/20' : 'border-gray-200 bg-white/80'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DSLogo size={44} />
              <h1 className={`text-2xl font-black ${isDarkMode ? 'text-yellow-400' : 'text-gray-900'}`}>
                Dream State AI
              </h1>
            </div>
            <div className="flex items-center gap-3">
              {/* Light/Dark Toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-lg transition ${isDarkMode ? 'bg-yellow-400/10 hover:bg-yellow-400/20 text-yellow-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
              <Link href="/sign-in">
                <Button className="bg-yellow-400 text-black hover:bg-yellow-500 font-semibold">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className={`inline-flex items-center gap-2 backdrop-blur-sm border rounded-full px-4 py-2 ${isDarkMode ? 'bg-yellow-400/10 border-yellow-600/30' : 'bg-gray-100 border-gray-300'}`}>
                <Zap className={`w-4 h-4 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
                <span className={`text-sm font-medium ${isDarkMode ? 'text-yellow-400' : 'text-gray-900'}`}>AI-Powered Solutions</span>
              </div>

              {/* Main Headline */}
              <div className="space-y-4">
                <h2 className="text-7xl font-black leading-tight">
                  <span>{isDarkMode ? 'Transform' : 'Transform'}</span>
                  <br />
                  <span className={isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}>
                    Your Business
                  </span>
                  <br />
                  <span>with AI</span>
                </h2>
              </div>

              {/* Subheading */}
              <p className={`text-lg max-w-lg leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Dream State AI delivers intelligent automation, custom AI solutions, and scalable systems that drive measurable ROI. From workflows to chatbots to complete backend engineering.
              </p>

              {/* CTA Buttons */}
              <div className="flex items-center gap-4 pt-4">
                <Link href="/sign-in">
                  <Button className="bg-yellow-400 text-black hover:bg-yellow-500 font-bold px-8 py-3 text-lg rounded-full">
                    Get Started Free
                  </Button>
                </Link>
                <button className={`transition flex items-center gap-2 font-semibold ${isDarkMode ? 'text-yellow-400 hover:text-yellow-300' : 'text-gray-900 hover:text-yellow-600'}`}>
                  Learn more <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-3">
                  <div className={`w-10 h-10 rounded-full border-2 ${isDarkMode ? 'bg-yellow-600 border-black/20' : 'bg-yellow-300 border-white/20'}`}></div>
                  <div className={`w-10 h-10 rounded-full border-2 ${isDarkMode ? 'bg-yellow-500 border-black/20' : 'bg-yellow-400 border-white/20'}`}></div>
                  <div className={`w-10 h-10 rounded-full border-2 ${isDarkMode ? 'bg-yellow-400 border-black/20' : 'bg-yellow-500 border-white/20'}`}></div>
                </div>
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Trusted by 100+ companies</span>
              </div>
            </div>

            {/* Right Visual - Feature Showcase */}
            <div className="relative h-96 md:h-full hidden md:block">
              <div className={`absolute inset-0 rounded-3xl backdrop-blur-xl border ${isDarkMode ? 'bg-gradient-to-br from-yellow-500/10 to-black/20 border-yellow-600/20' : 'bg-gradient-to-br from-gray-100 to-white border-gray-200'}`}></div>
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* AI Solutions Container */}
                  <div className="relative w-64 h-64">
                    {/* Animated Glow Ring */}
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full blur-2xl opacity-15 animate-pulse"></div>
                    
                    {/* Main Container */}
                    <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-black rounded-full p-1">
                      <div className="w-full h-full bg-gradient-to-br from-black to-black/80 rounded-full flex items-center justify-center">
                        {/* Container Content */}
                        <div className="text-center">
                          <div className="text-6xl mb-2">✨</div>
                          <div className="text-sm font-bold text-yellow-400">AI Solutions</div>
                          <div className="text-xs text-gray-400 mt-1 animate-pulse">Intelligent & Scalable</div>
                        </div>
                      </div>
                    </div>

                    {/* Status Indicator */}
                    <div className="absolute top-6 right-6 w-6 h-6 bg-yellow-400 rounded-full border-2 border-white shadow-lg animate-pulse"></div>

                    {/* Feature Card 1 */}
                    <div className="absolute -top-8 -right-12 bg-gradient-to-br from-yellow-400/10 to-black/40 backdrop-blur-xl border border-yellow-600/30 rounded-2xl p-4 w-48 transform hover:-translate-y-1 transition">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center text-black text-sm font-bold">⚙️</div>
                        <div>
                          <p className="text-sm font-bold text-white">Automation</p>
                          <p className="text-xs text-gray-400">Workflows & Orchestration</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <div className="text-xs bg-yellow-400/20 text-yellow-400 px-2 py-1 rounded">Fast</div>
                        <div className="text-xs bg-yellow-600/20 text-yellow-300 px-2 py-1 rounded">Scalable</div>
                      </div>
                    </div>

                    {/* Feature Card 2 */}
                    <div className="absolute -bottom-8 -left-12 bg-gradient-to-br from-yellow-400/10 to-black/40 backdrop-blur-xl border border-yellow-600/30 rounded-2xl p-4 w-48 transform hover:translate-y-1 transition">
                      <div className="grid grid-cols-3 gap-3 text-center">
                        <div>
                          <div className="text-lg font-bold text-yellow-400">8+</div>
                          <div className="text-xs text-gray-400">Services</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-yellow-400">100%</div>
                          <div className="text-xs text-gray-400">Custom</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-yellow-400">24/7</div>
                          <div className="text-xs text-gray-400">Support</div>
                        </div>
                      </div>
                    </div>

                    {/* Orbiting Elements */}
                    <div className="absolute top-0 left-0 w-full h-full animate-spin" style={{animationDuration: '20s'}}>
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-24">
                        <div className="w-4 h-4 bg-yellow-400 rounded-full blur-sm"></div>
                      </div>
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-24">
                        <div className="w-4 h-4 bg-yellow-500 rounded-full blur-sm"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      {/* Services Section */}
      <section className={`w-full py-24 px-4 sm:px-6 lg:px-8 relative z-10 ${isDarkMode ? 'bg-black/40' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className={`text-5xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              8 Core Services
            </h3>
            <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Comprehensive AI and automation solutions for your business
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Workflow, title: 'AI Automation', desc: 'Intelligent workflows across your apps' },
              { icon: MessageSquare, title: 'AI Agents', desc: 'Smart conversational systems' },
              { icon: BarChart3, title: 'Dashboards', desc: 'Real-time analytics & insights' },
              { icon: Code, title: 'Backend', desc: 'Scalable API engineering' },
              { icon: Shield, title: 'Security', desc: 'Enterprise-grade protection' },
              { icon: Zap, title: 'Integration', desc: 'Seamless tool connections' },
              { icon: CheckCircle, title: 'Consulting', desc: 'AI strategy & planning' },
              { icon: MessageSquare, title: 'RAG Chatbots', desc: 'Knowledge-driven bots' },
            ].map((service, idx) => {
              const Icon = service.icon;
              return (
                <div
                  key={idx}
                  className={`group backdrop-blur-xl border p-8 rounded-2xl hover:-translate-y-2 transition duration-300 ${isDarkMode ? 'bg-gradient-to-br from-yellow-400/5 to-black/40 border-yellow-600/20 hover:border-yellow-400/50' : 'bg-gradient-to-br from-yellow-50 to-white border-gray-200 hover:border-yellow-500'}`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition ${isDarkMode ? 'bg-yellow-400/20' : 'bg-yellow-400'}`}>
                    <Icon className={`w-6 h-6 ${isDarkMode ? 'text-yellow-400' : 'text-black'}`} />
                  </div>
                  <h4 className={`text-xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {service.title}
                  </h4>
                  <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                    {service.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        <div className="text-center mb-16">
          <h3 className={`text-5xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Why Choose Dream State AI
          </h3>
          <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            End-to-end solutions that deliver measurable ROI
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            { num: '🔄', title: 'End-to-End Solutions', desc: 'From idea to deployment, we handle everything' },
            { num: '🧠', title: 'Business-Centric AI', desc: 'Automation that drives measurable ROI' },
            { num: '🔧', title: 'Flexible Pricing', desc: 'Enterprise, SMB, or freelance projects' },
            { num: '🔐', title: 'Secure & Scalable', desc: 'Enterprise-grade engineering practices' },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`group backdrop-blur-xl border p-8 rounded-2xl hover:-translate-y-2 transition duration-300 ${isDarkMode ? 'bg-gradient-to-br from-yellow-400/5 to-black/40 border-yellow-600/20 hover:border-yellow-400/50' : 'bg-gradient-to-br from-yellow-50 to-white border-gray-200 hover:border-yellow-500'}`}
            >
              <div className={`text-4xl mb-4 group-hover:scale-125 transition duration-300`}>
                {item.num}
              </div>
              <h4 className={`text-xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {item.title}
              </h4>
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <div className={`backdrop-blur-xl border rounded-3xl p-12 text-center ${isDarkMode ? 'bg-gradient-to-br from-yellow-400/10 to-black/40 border-yellow-600/30' : 'bg-gradient-to-br from-yellow-50 to-gray-50 border-gray-200'}`}>
            <h3 className={`text-5xl font-black mb-6 leading-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Ready to Transform Your Business?
            </h3>
            <p className={`text-xl mb-8 max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Join innovative companies using Dream State AI to scale their operations with intelligent automation and custom AI solutions.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link href="/sign-in">
                <Button className={`font-bold px-8 py-3 text-lg rounded-full ${isDarkMode ? 'bg-yellow-400 text-black hover:bg-yellow-500' : 'bg-yellow-500 text-white hover:bg-yellow-600'}`}>
                  Get Started Now
                </Button>
              </Link>
              <button className={`transition px-8 py-3 rounded-full font-semibold ${isDarkMode ? 'text-yellow-400 hover:text-yellow-300 border border-yellow-600/50 hover:border-yellow-400' : 'text-gray-900 hover:text-yellow-600 border border-gray-300 hover:border-yellow-600'}`}>
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`relative z-10 border-t py-12 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-black border-yellow-600/20' : 'bg-gray-50 border-gray-200'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <DSLogo size={40} />
              <span className={`text-xl font-black ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>Dream State AI</span>
            </div>
            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>© 2026 Dream State AI. Transforming businesses with intelligent automation.</p>
          </div>
        </div>
      </footer>
    </div>
  </div>
);
}
