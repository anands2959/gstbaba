'use client';

import { Calculator, TrendingUp, FileText, Bell, Search, BookOpen, Zap, Shield } from 'lucide-react';

const features = [
  {
    icon: Calculator,
    title: 'Advanced GST Calculator',
    description: 'Calculate GST with exclusive, inclusive, and reverse modes. Support for composition scheme and ITC claims.',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: TrendingUp,
    title: 'Expense Tracker',
    description: 'Track business and personal expenses. Automatic ITC calculation and detailed analytics.',
    color: 'bg-green-100 text-green-600',
  },
  {
    icon: FileText,
    title: 'Invoice Generator',
    description: 'Create professional GST-compliant invoices instantly. Support for B2B and B2C transactions.',
    color: 'bg-orange-100 text-orange-600',
  },
  {
    icon: Bell,
    title: 'Smart Reminders',
    description: 'Never miss GST filing deadlines. Get timely notifications for GSTR-1, GSTR-3B, and more.',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    icon: Search,
    title: 'GST Rate Finder',
    description: 'Quickly find GST rates for any product or service with our comprehensive HSN/SAC database.',
    color: 'bg-pink-100 text-pink-600',
  },
  {
    icon: BookOpen,
    title: 'GST News & Updates',
    description: 'Stay updated with latest GST notifications, circulars, and rule changes from CBIC.',
    color: 'bg-indigo-100 text-indigo-600',
  },
  {
    icon: Zap,
    title: 'Power Mode',
    description: 'Advanced features for power users including bulk operations, custom tags, and detailed reports.',
    color: 'bg-yellow-100 text-yellow-600',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Your data stays on your device. No cloud storage, complete privacy and security.',
    color: 'bg-red-100 text-red-600',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-bold mb-4">
            <Zap className="w-4 h-4" />
            Powerful Features
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-4">
            Everything You Need for
            <span className="block text-accent-blue">GST Compliance</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive tools designed specifically for Indian businesses to simplify GST management
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group"
            >
              <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
