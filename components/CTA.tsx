'use client';

import { Download, ArrowRight, Smartphone } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Ready to Simplify Your
              <span className="block text-accent-yellow">GST Management?</span>
            </h2>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Join 50,000+ businesses already using GST BABA to save time, maximize ITC claims, and stay compliant with GST regulations.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button className="bg-white text-primary px-8 py-4 rounded-xl font-bold text-base hover:bg-gray-100 transition-all shadow-lg flex items-center justify-center gap-2 group">
                <Download className="w-5 h-5 group-hover:animate-bounce" />
                Download Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-base hover:bg-white/10 transition-all">
                Learn More
              </button>
            </div>

            {/* Features List */}
            <div className="space-y-3">
              {[
                'Free to download and use',
                'No credit card required',
                'Works offline',
                'Regular updates with new features',
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-200">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - App Preview */}
          <div className="relative">
            <div className="relative z-10">
              {/* Phone Mockup */}
              <div className="bg-white rounded-[3rem] p-4 shadow-2xl mx-auto max-w-sm">
                <div className="bg-[#f8f9fa] rounded-[2.5rem] overflow-hidden">
                  {/* Status Bar */}
                  <div className="bg-primary text-white px-6 py-3 flex justify-between items-center text-xs">
                    <span className="font-medium">9:41</span>
                    <div className="flex gap-1">
                      <div className="w-4 h-4 bg-white/30 rounded-sm"></div>
                      <div className="w-4 h-4 bg-white/30 rounded-sm"></div>
                      <div className="w-4 h-4 bg-white/30 rounded-sm"></div>
                    </div>
                  </div>

                  {/* App Content */}
                  <div className="p-6">
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
                      <div className="text-xs text-gray-500 mb-2">FINAL INVOICE AMOUNT</div>
                      <div className="text-3xl font-bold text-green-600 mb-4">₹11,800</div>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Base Price</span>
                          <span className="font-bold">₹10,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">GST (18%)</span>
                          <span className="font-bold">₹1,800</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <button className="bg-primary text-white py-3 rounded-xl text-xs font-bold">
                        Save
                      </button>
                      <button className="bg-white border border-gray-200 text-gray-700 py-3 rounded-xl text-xs font-bold">
                        Share
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-yellow-400 rounded-2xl opacity-20 blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-400 rounded-2xl opacity-20 blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
