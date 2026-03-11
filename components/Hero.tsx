'use client';

import { Calculator, TrendingUp, FileText, Smartphone } from 'lucide-react';

export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-slide-in">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-bold mb-6">
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
              #1 GST Solution in India
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
              Simplify Your
              <span className="block text-accent-blue">GST Compliance</span>
            </h1>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Complete GST solution for Indian businesses. Calculate taxes, track expenses, generate invoices, and stay updated with the latest GST rules - all in one powerful app.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button className="bg-primary text-white px-8 py-4 rounded-xl font-bold text-base hover:bg-primary-light transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Download for Android
              </button>
              <button className="bg-white text-primary border-2 border-primary px-8 py-4 rounded-xl font-bold text-base hover:bg-gray-50 transition-all">
                View Demo
              </button>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6">
              <div>
                <div className="text-lg sm:text-2xl font-bold text-primary mb-1 leading-tight">GST Expert AI</div>
                <div className="text-[10px] sm:text-sm text-gray-500 font-medium uppercase tracking-wider">Smart Analysis</div>
              </div>
              <div>
                <div className="text-lg sm:text-2xl font-bold text-primary mb-1 leading-tight">Offline Ready</div>
                <div className="text-[10px] sm:text-sm text-gray-500 font-medium uppercase tracking-wider">Work Anywhere</div>
              </div>
              <div>
                <div className="text-lg sm:text-2xl font-bold text-primary mb-1 leading-tight">Full Secure</div>
                <div className="text-[10px] sm:text-sm text-gray-500 font-medium uppercase tracking-wider">Data Privacy</div>
              </div>
            </div>
          </div>

          {/* Right Content - App Preview Image */}
          <div className="relative animate-fade-in flex items-center justify-center p-8">
            <div className="relative z-10 w-full max-h-[500px] max-w-[500px] flex justify-center">
              <img
                src="/hero.png"
                alt="GST BABA App Preview"
                className="w-full h-auto drop-shadow-xl hover:scale-110 transition-transform duration-500 object-contain"
              />
            </div>

            {/* Subtle decorative background (resized for small image) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/5 rounded-full blur-2xl -z-0"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
