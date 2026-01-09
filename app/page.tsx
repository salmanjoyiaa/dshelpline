'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  CheckCircle,
  Users,
  MapPin,
  BarChart3,
  Zap,
  Shield,
  Sparkles,
  ArrowRight,
  Sun,
  Moon,
} from 'lucide-react';

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  return (
    <div className={`min-h-screen overflow-hidden ${isDarkMode ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>
      {/* Animated Background Gradient */}
      <div className="fixed inset-0 z-0">
        <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-br from-black to-black opacity-85' : 'bg-gradient-to-br from-white via-gray-50 to-white opacity-100'}`}></div>
        {isDarkMode ? (
          <>
            <div className="absolute top-0 right-0 w-96 h-96 bg-red-600 rounded-full blur-3xl opacity-10 animate-pulse"></div>
            <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-red-700 rounded-full blur-3xl opacity-10 animate-pulse animation-delay-2000"></div>
            <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-red-600 rounded-full blur-3xl opacity-5 animate-pulse animation-delay-4000"></div>
          </>
        ) : (
          <>
            <div className="absolute top-0 right-0 w-96 h-96 bg-red-200 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-15 animate-pulse animation-delay-2000"></div>
            <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-red-50 rounded-full blur-3xl opacity-10 animate-pulse animation-delay-4000"></div>
          </>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className={`border-b backdrop-blur-md ${isDarkMode ? 'border-white/10 bg-black/20' : 'border-gray-200 bg-white/80'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-red-700' : 'bg-red-600'}`}>
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h1 className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                ServiceFlow
              </h1>
            </div>
            <div className="flex items-center gap-3">
              {/* Light/Dark Toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-lg transition ${isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-yellow-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
              <Link href="/sign-in">
                <Button className="bg-white text-black hover:bg-gray-100 font-semibold">
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
              <div className={`inline-flex items-center gap-2 backdrop-blur-sm border rounded-full px-4 py-2 ${isDarkMode ? 'bg-white/10 border-white/20' : 'bg-gray-100 border-gray-300'}`}>
                <Sparkles className={`w-4 h-4 ${isDarkMode ? 'text-red-600' : 'text-red-500'}`} />
                <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Intelligent Dispatch Platform</span>
              </div>

              {/* Main Headline */}
              <div className="space-y-4">
                <h2 className="text-7xl font-black leading-tight">
                  <span>{isDarkMode ? 'Work' : 'Work'}</span>
                  <br />
                  <span className={isDarkMode ? 'text-red-600' : 'text-red-500'}>
                    smarter,
                  </span>
                  <br />
                  <span>faster</span>
                </h2>
              </div>

              {/* Subheading */}
              <p className={`text-lg max-w-lg leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                ServiceFlow connects your entire dispatch operation. Manage providers, track requests, and deliver exceptional service with intelligent automation and real-time insights.
              </p>

              {/* CTA Buttons */}
              <div className="flex items-center gap-4 pt-4">
                <Link href="/sign-in">
                  <Button className="bg-white text-black hover:bg-gray-100 font-bold px-8 py-3 text-lg rounded-full">
                    Try it for free
                  </Button>
                </Link>
                <button className={`transition flex items-center gap-2 font-semibold ${isDarkMode ? 'text-white hover:text-red-600' : 'text-gray-900 hover:text-red-500'}`}>
                  Learn more <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-3">
                  <div className={`w-10 h-10 rounded-full border-2 ${isDarkMode ? 'bg-slate-700 border-black/20' : 'bg-gray-300 border-white/20'}`}></div>
                  <div className={`w-10 h-10 rounded-full border-2 ${isDarkMode ? 'bg-slate-800 border-black/20' : 'bg-gray-400 border-white/20'}`}></div>
                  <div className={`w-10 h-10 rounded-full border-2 ${isDarkMode ? 'bg-red-700 border-black/20' : 'bg-red-600 border-white/20'}`}></div>
                </div>
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Used by 500+ service teams</span>
              </div>
            </div>

            {/* Right Visual - AI Agent Avatar */}
            <div className="relative h-96 md:h-full hidden md:block">
              <div className={`absolute inset-0 rounded-3xl backdrop-blur-xl border ${isDarkMode ? 'bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-white/10' : 'bg-gradient-to-br from-gray-100 to-white border-gray-200'}`}></div>
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* AI Agent Avatar Container */}
                  <div className="relative w-64 h-64">
                    {/* Animated Glow Ring */}
                    <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                    
                    {/* Main Avatar Circle */}
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-black rounded-full p-1">
                      <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 rounded-full flex items-center justify-center">
                        {/* Avatar Content */}
                        <div className="text-center">
                          <div className="text-6xl mb-2">🤖</div>
                          <div className="text-sm font-bold text-white">AI Agent</div>
                          <div className="text-xs text-red-600 mt-1 animate-pulse">Active Now</div>
                        </div>
                      </div>
                    </div>

                    {/* Status Indicator */}
                    <div className="absolute top-6 right-6 w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>

                    {/* Floating Request Cards */}
                    <div className="absolute -top-8 -right-12 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-4 w-48 transform hover:-translate-y-1 transition">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-red-700 rounded-lg flex items-center justify-center text-white text-sm font-bold">📍</div>
                        <div>
                          <p className="text-sm font-bold text-white">New Request</p>
                          <p className="text-xs text-gray-400">Lock Repair</p>
                        </div>
                      </div>
                      <div className="text-xs text-gray-300 mb-2">123 Main St, Downtown</div>
                      <div className="flex gap-2">
                        <div className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">Urgent</div>
                        <div className="text-xs bg-red-700/20 text-red-500 px-2 py-1 rounded">1 min ago</div>
                      </div>
                    </div>

                    {/* Floating Stats Card */}
                    <div className="absolute -bottom-8 -left-12 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-4 w-48 transform hover:translate-y-1 transition">
                      <div className="grid grid-cols-3 gap-3 text-center">
                        <div>
                          <div className="text-lg font-bold text-red-600">42</div>
                          <div className="text-xs text-gray-400">Assigned</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-red-700">18</div>
                          <div className="text-xs text-gray-400">Active</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-green-400">24</div>
                          <div className="text-xs text-gray-400">Done</div>
                        </div>
                      </div>
                    </div>

                    {/* Orbiting Elements */}
                    <div className="absolute top-0 left-0 w-full h-full animate-spin" style={{animationDuration: '20s'}}>
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-24">
                        <div className="w-4 h-4 bg-red-500 rounded-full blur-sm"></div>
                      </div>
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-24">
                        <div className="w-4 h-4 bg-red-600 rounded-full blur-sm"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      {/* Features Section */}
      <section className={`w-full py-24 px-4 sm:px-6 lg:px-8 relative z-10 ${isDarkMode ? 'bg-black/40' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className={`text-5xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Powerful Features for Modern Teams
            </h3>
            <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Everything you need to manage, track, and scale your service business
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className={`group backdrop-blur-xl border p-8 rounded-2xl hover:-translate-y-2 transition duration-300 ${isDarkMode ? 'bg-gradient-to-br from-white/10 to-white/5 border-white/20 hover:border-red-700/30' : 'bg-gradient-to-br from-gray-50 to-white border-gray-200 hover:border-red-500'}`}>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition ${isDarkMode ? 'bg-red-700' : 'bg-red-600'}`}>
                <Users className="w-6 h-6 text-white" />
              </div>
              <h4 className={`text-xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Provider Management
              </h4>
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                Easily manage your service providers, track their jobs, and monitor
                ratings and performance metrics.
              </p>
            </div>

            <div className={`group backdrop-blur-xl border p-8 rounded-2xl hover:-translate-y-2 transition duration-300 ${isDarkMode ? 'bg-gradient-to-br from-white/10 to-white/5 border-white/20 hover:border-red-800/30' : 'bg-gradient-to-br from-gray-50 to-white border-gray-200 hover:border-red-500'}`}>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition ${isDarkMode ? 'bg-red-800' : 'bg-red-500'}`}>
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h4 className={`text-xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Request Management
              </h4>
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                Create, assign, and track service requests with real-time status
                updates and customer information.
              </p>
            </div>

            <div className={`group backdrop-blur-xl border p-8 rounded-2xl hover:-translate-y-2 transition duration-300 ${isDarkMode ? 'bg-gradient-to-br from-white/10 to-white/5 border-white/20 hover:border-red-900/30' : 'bg-gradient-to-br from-gray-50 to-white border-gray-200 hover:border-red-500'}`}>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition ${isDarkMode ? 'bg-red-900' : 'bg-red-400'}`}>
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h4 className={`text-xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Analytics Dashboard
              </h4>
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                Monitor key metrics, track provider performance, and analyze your
                service delivery data.
              </p>
            </div>

            <div className={`group backdrop-blur-xl border p-8 rounded-2xl hover:-translate-y-2 transition duration-300 ${isDarkMode ? 'bg-gradient-to-br from-white/10 to-white/5 border-white/20 hover:border-green-400/50' : 'bg-gradient-to-br from-gray-50 to-white border-gray-200 hover:border-green-500'}`}>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition ${isDarkMode ? 'bg-gradient-to-br from-green-400 to-green-600' : 'bg-gradient-to-br from-green-400 to-green-500'}`}>
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h4 className={`text-xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Smart Assignment
              </h4>
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                Assign requests to the best available providers and manage your
                workforce efficiently.
              </p>
            </div>

            <div className={`group backdrop-blur-xl border p-8 rounded-2xl hover:-translate-y-2 transition duration-300 ${isDarkMode ? 'bg-gradient-to-br from-white/10 to-white/5 border-white/20 hover:border-red-400/50' : 'bg-gradient-to-br from-gray-50 to-white border-gray-200 hover:border-red-500'}`}>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition ${isDarkMode ? 'bg-gradient-to-br from-red-400 to-red-600' : 'bg-gradient-to-br from-red-400 to-red-500'}`}>
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h4 className={`text-xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Secure & Private
              </h4>
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                Multi-tenant architecture ensures your data is secure and isolated
                from other organizations.
              </p>
            </div>

            <div className={`group backdrop-blur-xl border p-8 rounded-2xl hover:-translate-y-2 transition duration-300 ${isDarkMode ? 'bg-gradient-to-br from-white/10 to-white/5 border-white/20 hover:border-yellow-400/50' : 'bg-gradient-to-br from-gray-50 to-white border-gray-200 hover:border-yellow-500'}`}>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition ${isDarkMode ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' : 'bg-gradient-to-br from-yellow-400 to-yellow-500'}`}>
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h4 className={`text-xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Easy to Use
              </h4>
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                Intuitive interface designed for service businesses of all sizes.
                Get started in minutes.
              </p>
            </div>
        </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        <div className="text-center mb-16">
          <h3 className={`text-5xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            How It Works
          </h3>
          <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Simple, intuitive workflow designed for service professionals
          </p>
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { num: 1, title: 'Sign Up', desc: 'Create your account and organization' },
            { num: 2, title: 'Add Providers', desc: 'Register your service providers' },
            { num: 3, title: 'Create Requests', desc: 'Create and manage service requests' },
            { num: 4, title: 'Track Progress', desc: 'Monitor status and analytics' },
          ].map((step) => (
            <div key={step.num} className="text-center group">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl text-white font-black text-2xl mb-6 group-hover:scale-110 transition duration-300 ${isDarkMode ? 'bg-red-800' : 'bg-red-600'}`}>
                {step.num}
              </div>
              <h4 className={`text-xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{step.title}</h4>
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <div className={`backdrop-blur-xl border rounded-3xl p-12 text-center ${isDarkMode ? 'bg-gradient-to-br from-red-900/10 to-black/40 border-white/20' : 'bg-gradient-to-br from-red-50 to-gray-50 border-gray-200'}`}>
            <h3 className={`text-5xl font-black mb-6 leading-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Ready to transform your service business?
            </h3>
            <p className={`text-xl mb-8 max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Join hundreds of service teams already using ServiceFlow to manage requests, providers, and deliver exceptional service.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link href="/sign-in">
                <Button className={`font-bold px-8 py-3 text-lg rounded-full ${isDarkMode ? 'bg-white text-black hover:bg-gray-100' : 'bg-red-600 text-white hover:bg-red-700'}`}>
                  Get Started Now
                </Button>
              </Link>
              <button className={`transition px-8 py-3 rounded-full font-semibold ${isDarkMode ? 'text-white hover:text-blue-400 border border-white/30 hover:border-blue-400' : 'text-gray-900 hover:text-red-600 border border-gray-300 hover:border-red-600'}`}>
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`relative z-10 border-t py-12 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-black border-white/10' : 'bg-gray-50 border-gray-200'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-gradient-to-br from-blue-400 to-purple-500' : 'bg-gradient-to-br from-red-600 to-red-500'}`}>
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className={`text-xl font-black ${isDarkMode ? 'bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent' : 'bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent'}`}>ServiceFlow</span>
            </div>
            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>© 2026 ServiceFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  </div>
);
}
