'use client';

import { Calculator, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="GST BABA Logo" className="w-10 h-10 rounded-xl object-contain" />
              <span className="text-xl font-bold">GST BABA</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Complete GST solution for Indian businesses. Simplify compliance, maximize savings, and grow your business.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="/#features" className="text-gray-400 hover:text-white transition-colors text-sm">Features</a></li>
              <li><a href="/#how-it-works" className="text-gray-400 hover:text-white transition-colors text-sm">How It Works</a></li>
              <li><a href="/#benefits" className="text-gray-400 hover:text-white transition-colors text-sm">Benefits</a></li>
              <li><a href="/#testimonials" className="text-gray-400 hover:text-white transition-colors text-sm">Testimonials</a></li>
              {/* <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Download App</a></li> */}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-bold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><a href="/gst-guide" className="text-gray-400 hover:text-white transition-colors text-sm">GST Guide</a></li>
              {/* <li><a href="/blog" className="text-gray-400 hover:text-white transition-colors text-sm">Blog</a></li> */}
              <li><a href="/faqs" className="text-gray-400 hover:text-white transition-colors text-sm">FAQs</a></li>
              <li><a href="/support" className="text-gray-400 hover:text-white transition-colors text-sm">Support</a></li>
              <li><a href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm text-gray-400">Email</div>
                  <a href="mailto:support@gstbaba.com" className="text-sm hover:text-accent-blue transition-colors">
                    support@gstbaba.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm text-gray-400">Phone</div>
                  <a href="tel:+911234567890" className="text-sm hover:text-accent-blue transition-colors">
                    +91 123 456 7890
                  </a>
                </div>
              </li>
              {/* <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm text-gray-400">Address</div>
                  <p className="text-sm">Mumbai, Maharashtra, India</p>
                </div>
              </li> */}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © 2024 GST BABA. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="/terms-of-service" className="text-sm text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="/privacy-policy" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="/cookie-policy" className="text-sm text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
