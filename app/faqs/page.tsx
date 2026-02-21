'use client';

import { useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { HelpCircle, ChevronDown, Search } from "lucide-react";

const faqCategories = [
  {
    category: "General",
    questions: [
      {
        q: "What is GST BABA?",
        a: "GST BABA is a comprehensive mobile application designed to help Indian businesses manage their GST compliance. It includes tools for GST calculation, expense tracking, invoice generation, and staying updated with the latest GST regulations.",
      },
      {
        q: "Is GST BABA free to use?",
        a: "Yes, GST BABA is completely free to download and use. All core features including GST calculator, expense tracker, and invoice generator are available at no cost.",
      },
      {
        q: "Do I need an internet connection to use the app?",
        a: "Most features work offline. However, you'll need an internet connection for GST news updates, rate finder, and syncing data across devices.",
      },
    ],
  },
  {
    category: "GST Calculator",
    questions: [
      {
        q: "What calculation modes are available?",
        a: "GST BABA offers three calculation modes: Exclusive (GST added on top), Inclusive (GST included in price), and Reverse (calculate base from tax amount). Each mode is designed for different business scenarios.",
      },
      {
        q: "Does it support composition scheme calculations?",
        a: "Yes, the calculator has a dedicated composition scheme mode with rates of 1% for traders, 5% for restaurants, and 6% for service providers.",
      },
      {
        q: "Can I save my calculations?",
        a: "Absolutely! You can save unlimited calculations to history and restore them anytime. You can also share calculations via WhatsApp, email, or other apps.",
      },
    ],
  },
  {
    category: "Expense Tracker",
    questions: [
      {
        q: "How does the expense tracker help with ITC?",
        a: "The expense tracker automatically calculates eligible Input Tax Credit (ITC) based on your business expenses. It separates business and personal expenses to help you claim maximum ITC.",
      },
      {
        q: "Can I track expenses for multiple businesses?",
        a: "Yes, you can manage multiple businesses from a single account. Each business has its own expense tracking and reporting.",
      },
      {
        q: "How do I export my expense data?",
        a: "You can export your expense data as CSV files for any date range. This is useful for accounting software integration or sharing with your CA.",
      },
    ],
  },
  {
    category: "Invoice Generator",
    questions: [
      {
        q: "Are the invoices GST compliant?",
        a: "Yes, all invoices generated are fully GST compliant with proper GSTIN, tax breakup (CGST/SGST/IGST), and all mandatory fields as per GST regulations.",
      },
      {
        q: "Can I add my business logo?",
        a: "Yes, you can upload your business logo which will appear on all invoices. You can also customize business details, terms, and conditions.",
      },
      {
        q: "How do I share invoices with customers?",
        a: "Invoices can be shared as PDF via WhatsApp, email, or any other app. You can also print directly from the app.",
      },
    ],
  },
  {
    category: "Technical",
    questions: [
      {
        q: "Which devices are supported?",
        a: "GST BABA is currently available for Android devices running Android 6.0 or higher. iOS version is coming soon.",
      },
      {
        q: "Is my data secure?",
        a: "Yes, all your data is stored locally on your device. We don't store any business or financial data on our servers, ensuring complete privacy and security.",
      },
      {
        q: "How do I backup my data?",
        a: "You can create manual backups anytime and restore them when needed. We recommend regular backups to prevent data loss.",
      },
    ],
  },
];

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleQuestion = (categoryIndex: number, questionIndex: number) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setOpenIndex(openIndex === key ? null : key);
  };

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-primary text-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm font-bold mb-6">
            <HelpCircle className="w-4 h-4" />
            Help Center
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Frequently Asked
            <span className="block text-accent-yellow">Questions</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
            Find answers to common questions about GST BABA
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-accent-blue"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#f8f9fa]">
        <div className="max-w-4xl mx-auto">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="text-2xl font-bold text-primary mb-6">{category.category}</h2>
              <div className="space-y-4">
                {category.questions.map((faq, questionIndex) => {
                  const key = `${categoryIndex}-${questionIndex}`;
                  const isOpen = openIndex === key;

                  return (
                    <div
                      key={questionIndex}
                      className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm"
                    >
                      <button
                        onClick={() => toggleQuestion(categoryIndex, questionIndex)}
                        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-bold text-gray-800 pr-4">{faq.q}</span>
                        <ChevronDown
                          className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-5 text-gray-600 leading-relaxed animate-fade-in">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-primary mb-4">Still Have Questions?</h2>
          <p className="text-gray-600 mb-8">
            Can't find the answer you're looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/support"
              className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-light transition-all shadow-sm"
            >
              Contact Support
            </a>
            <a
              href="/gst-guide"
              className="bg-white border-2 border-primary text-primary px-8 py-3 rounded-xl font-bold hover:bg-gray-50 transition-all"
            >
              Read GST Guide
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
