'use client';

import { Download, UserPlus, Calculator, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: Download,
    title: 'Download the App',
    description: 'Get GST BABA from Google Play Store. Free to download and use.',
    color: 'bg-blue-100 text-blue-600',
    number: '01',
  },
  {
    icon: UserPlus,
    title: 'Set Up Your Profile',
    description: 'Add your business details and GSTIN for personalized experience.',
    color: 'bg-green-100 text-green-600',
    number: '02',
  },
  {
    icon: Calculator,
    title: 'Start Using Tools',
    description: 'Access all GST tools - calculator, tracker, invoice generator, and more.',
    color: 'bg-orange-100 text-orange-600',
    number: '03',
  },
  {
    icon: CheckCircle,
    title: 'Stay Compliant',
    description: 'Get reminders, updates, and insights to maintain GST compliance effortlessly.',
    color: 'bg-purple-100 text-purple-600',
    number: '04',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-600 px-4 py-2 rounded-full text-sm font-bold mb-4">
            <CheckCircle className="w-4 h-4" />
            Simple Process
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-4">
            Get Started in
            <span className="block text-accent-green">4 Easy Steps</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Start managing your GST compliance in minutes with our intuitive app
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-[60%] w-full h-0.5 bg-gray-200">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-300 rounded-full"></div>
                </div>
              )}

              <div className="relative z-10 text-center">
                {/* Icon with Number Badge */}
                <div className={`relative w-24 h-24 ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm`}>
                  <step.icon className="w-12 h-12" />

                  {/* Number Badge */}
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xs shadow-lg border-2 border-white">
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-800 mb-3">{step.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
