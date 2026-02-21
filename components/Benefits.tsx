'use client';

import { Clock, DollarSign, Shield, TrendingUp, Users, Zap } from 'lucide-react';

const benefits = [
  {
    icon: Clock,
    title: 'Save Time',
    description: 'Automate GST calculations and reduce manual work by 80%',
    stat: '80%',
    statLabel: 'Time Saved',
  },
  {
    icon: DollarSign,
    title: 'Maximize ITC',
    description: 'Never miss input tax credit claims with smart tracking',
    stat: '₹50K+',
    statLabel: 'Avg. ITC Claimed',
  },
  {
    icon: Shield,
    title: 'Stay Compliant',
    description: 'Always up-to-date with latest GST rules and regulations',
    stat: '100%',
    statLabel: 'Compliance Rate',
  },
  {
    icon: TrendingUp,
    title: 'Better Insights',
    description: 'Detailed analytics to understand your business expenses',
    stat: '15+',
    statLabel: 'Report Types',
  },
  {
    icon: Users,
    title: 'Multi-Business',
    description: 'Manage multiple businesses from a single dashboard',
    stat: '5+',
    statLabel: 'Businesses',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Instant calculations and real-time data synchronization',
    stat: '<1s',
    statLabel: 'Response Time',
  },
];

export default function Benefits() {
  return (
    <section id="benefits" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 px-4 py-2 rounded-full text-sm font-bold mb-4">
            <TrendingUp className="w-4 h-4" />
            Why Choose Us
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-4">
            Benefits That Drive
            <span className="block text-accent-orange">Real Results</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of businesses already saving time and money with GST BABA
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all group"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <benefit.icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">{benefit.stat}</div>
                  <div className="text-xs text-gray-500 font-medium">{benefit.statLabel}</div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{benefit.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
