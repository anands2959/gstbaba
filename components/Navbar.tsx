'use client';

import { useState } from 'react';
import { Menu, X, Calculator } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="GST BABA Logo" className="w-10 h-10 rounded-xl object-contain" />
            <span className="text-xl font-bold text-primary">GST BABA</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="/#features" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
              Features
            </a>
            <a href="/gst-guide" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
              GST Guide
            </a>
            <a href="/blog" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
              Blog
            </a>
            <a href="/faqs" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
              FAQs
            </a>
            <button className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-primary-light transition-colors shadow-sm">
              Download App
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 animate-fade-in">
            <div className="flex flex-col gap-4">
              <a href="/#features" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
                Features
              </a>
              <a href="/gst-guide" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
                GST Guide
              </a>
              <a href="/blog" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
                Blog
              </a>
              <a href="/faqs" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
                FAQs
              </a>
              <a href="/support" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
                Support
              </a>
              <button className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-primary-light transition-colors shadow-sm">
                Download App
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
