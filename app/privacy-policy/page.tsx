import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, Lock, Eye, Database, UserCheck, FileText } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | GST BABA",
  description: "Learn how GST BABA protects your privacy and handles your data.",
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-primary text-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm font-bold mb-6">
            <Shield className="w-4 h-4" />
            Your Privacy Matters
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Last updated: January 15, 2024
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="mb-12">
            <p className="text-gray-700 leading-relaxed mb-4">
              At GST BABA, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the application.
            </p>
          </div>

          {/* Key Points */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-[#f8f9fa] p-6 rounded-2xl border border-gray-100">
              <Lock className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-bold text-gray-800 mb-2">Local Storage</h3>
              <p className="text-sm text-gray-600">All data stored locally on your device</p>
            </div>
            <div className="bg-[#f8f9fa] p-6 rounded-2xl border border-gray-100">
              <Eye className="w-8 h-8 text-green-600 mb-3" />
              <h3 className="font-bold text-gray-800 mb-2">No Tracking</h3>
              <p className="text-sm text-gray-600">We don't track your activities</p>
            </div>
            <div className="bg-[#f8f9fa] p-6 rounded-2xl border border-gray-100">
              <Database className="w-8 h-8 text-orange-600 mb-3" />
              <h3 className="font-bold text-gray-800 mb-2">No Cloud Sync</h3>
              <p className="text-sm text-gray-600">Your data never leaves your device</p>
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                <UserCheck className="w-6 h-6" />
                Information We Collect
              </h2>
              <div className="prose prose-gray max-w-none">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Personal Information</h3>
                <p className="text-gray-700 mb-4">
                  We may collect personal information that you voluntarily provide when using the app, including:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                  <li>Business name and GSTIN</li>
                  <li>Contact information (phone number, email)</li>
                  <li>Business transaction data (invoices, expenses)</li>
                </ul>

                <h3 className="text-lg font-bold text-gray-800 mb-3">Automatically Collected Information</h3>
                <p className="text-gray-700 mb-4">
                  When you use the app, we may automatically collect certain information, including:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Device information (model, operating system)</li>
                  <li>App usage statistics (features used, crash reports)</li>
                  <li>Log data (access times, errors)</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6" />
                How We Use Your Information
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Provide and maintain the app functionality</li>
                  <li>Improve and optimize the app experience</li>
                  <li>Respond to your inquiries and support requests</li>
                  <li>Send you updates about GST regulations (if opted in)</li>
                  <li>Analyze app usage to improve features</li>
                  <li>Detect and prevent technical issues</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-primary mb-4">Data Storage and Security</h2>
              <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
                <p className="text-gray-700 mb-4">
                  <strong>Important:</strong> All your business data, including invoices, expenses, and calculations, is stored locally on your device. We do not store this information on our servers.
                </p>
                <p className="text-gray-700">
                  We implement appropriate technical and organizational security measures to protect your information. However, no method of transmission over the internet or electronic storage is 100% secure.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-primary mb-4">Third-Party Services</h2>
              <p className="text-gray-700 mb-4">
                The app may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to read their privacy policies.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-primary mb-4">Children's Privacy</h2>
              <p className="text-gray-700">
                Our app is not intended for children under 18 years of age. We do not knowingly collect personal information from children under 18.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-primary mb-4">Your Rights</h2>
              <p className="text-gray-700 mb-4">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Delete your information</li>
                <li>Opt-out of marketing communications</li>
                <li>Export your data</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-primary mb-4">Changes to This Policy</h2>
              <p className="text-gray-700">
                We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "Last updated" date.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-primary mb-4">Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have questions about this Privacy Policy, please contact us:
              </p>
              <div className="bg-[#f8f9fa] p-6 rounded-2xl border border-gray-100">
                <p className="text-gray-700 mb-2">
                  <strong>Email:</strong> privacy@gstbaba.com
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Phone:</strong> +91 123 456 7890
                </p>
                <p className="text-gray-700">
                  <strong>Address:</strong> Mumbai, Maharashtra, India
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
