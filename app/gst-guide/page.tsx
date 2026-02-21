import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, Calculator, FileText, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";

export const metadata = {
  title: "GST Guide - Complete Guide to GST in India | GST BABA",
  description: "Comprehensive guide to understanding GST in India. Learn about GST rates, filing, compliance, and more.",
};

const guideTopics = [
  {
    icon: BookOpen,
    title: "What is GST?",
    description: "Goods and Services Tax (GST) is an indirect tax levied on the supply of goods and services in India. It replaced multiple cascading taxes with a single unified tax system.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: Calculator,
    title: "GST Rates",
    description: "GST has four main tax slabs: 5%, 12%, 18%, and 28%. Essential items are taxed at 0% or 5%, while luxury items attract 28% GST.",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: FileText,
    title: "GST Registration",
    description: "Businesses with turnover above ₹40 lakhs (₹20 lakhs for services) must register for GST. Registration is done online through the GST portal.",
    color: "bg-orange-100 text-orange-600",
  },
  {
    icon: TrendingUp,
    title: "Input Tax Credit (ITC)",
    description: "ITC allows businesses to claim credit for GST paid on purchases. This reduces the final tax liability and prevents cascading of taxes.",
    color: "bg-purple-100 text-purple-600",
  },
];

const filingTypes = [
  {
    name: "GSTR-1",
    description: "Details of outward supplies of goods and services",
    frequency: "Monthly/Quarterly",
    dueDate: "11th of next month",
  },
  {
    name: "GSTR-3B",
    description: "Summary return with tax liability and ITC claimed",
    frequency: "Monthly",
    dueDate: "20th of next month",
  },
  {
    name: "GSTR-9",
    description: "Annual return consolidating all monthly/quarterly returns",
    frequency: "Yearly",
    dueDate: "31st December",
  },
];

const compositionScheme = [
  "Turnover up to ₹1.5 Crore",
  "Pay fixed rate: 1% (Traders), 5% (Restaurants), 6% (Service Providers)",
  "Cannot claim Input Tax Credit",
  "Cannot collect GST from customers",
  "Simplified compliance with quarterly filing",
];

export default function GSTGuide() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-primary text-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm font-bold mb-6">
            <BookOpen className="w-4 h-4" />
            Complete GST Guide
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Everything You Need to Know
            <span className="block text-accent-yellow">About GST in India</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            A comprehensive guide to understanding GST, from basics to advanced concepts
          </p>
        </div>
      </section>

      {/* Main Topics */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-primary mb-12 text-center">GST Fundamentals</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {guideTopics.map((topic, index) => (
              <div key={index} className="bg-[#f8f9fa] p-6 rounded-2xl border border-gray-100">
                <div className={`w-12 h-12 ${topic.color} rounded-xl flex items-center justify-center mb-4`}>
                  <topic.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{topic.title}</h3>
                <p className="text-gray-600 leading-relaxed">{topic.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GST Filing */}
      {/* <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-primary mb-4 text-center">GST Return Filing</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Different types of GST returns and their filing requirements
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {filingTypes.map((filing, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-primary">{filing.name}</h3>
                  <FileText className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-sm text-gray-600 mb-4">{filing.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Frequency:</span>
                    <span className="font-bold text-gray-800">{filing.frequency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Due Date:</span>
                    <span className="font-bold text-gray-800">{filing.dueDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Composition Scheme */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Composition Scheme</h2>
            <p className="text-gray-600">
              Simplified GST scheme for small businesses with lower compliance burden
            </p>
          </div>
          <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-orange-600" />
              Key Features
            </h3>
            <div className="space-y-4">
              {compositionScheme.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Important Points */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#f8f9fa]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-primary mb-12 text-center">Important Points to Remember</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Inter-State vs Intra-State</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span><strong>Intra-State:</strong> Within same state - CGST + SGST</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span><strong>Inter-State:</strong> Between different states - IGST</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Penalties for Non-Compliance</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">•</span>
                  <span>Late filing: ₹50/day (CGST) + ₹50/day (SGST)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">•</span>
                  <span>Non-registration: 100% of tax due or ₹10,000</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Simplify Your GST Management?</h2>
          <p className="text-gray-300 mb-8">
            Download GST BABA and get all the tools you need for GST compliance
          </p>
          <button className="bg-white text-primary px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg">
            Download App Now
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
