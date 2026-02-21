import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText, AlertCircle, CheckCircle, XCircle } from "lucide-react";

export const metadata = {
  title: "Terms of Service | GST BABA",
  description: "Terms and conditions for using GST BABA application.",
};

export default function TermsOfService() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-primary text-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm font-bold mb-6">
            <FileText className="w-4 h-4" />
            Legal Agreement
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Terms of Service
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
              Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the GST BABA mobile application (the "Service") operated by GST BABA ("us", "we", or "our").
            </p>
            <p className="text-gray-700 leading-relaxed">
              Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. By accessing or using the Service, you agree to be bound by these Terms.
            </p>
          </div>

          {/* Key Points */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-green-50 p-6 rounded-2xl border border-green-200">
              <CheckCircle className="w-8 h-8 text-green-600 mb-3" />
              <h3 className="font-bold text-gray-800 mb-2">Free to Use</h3>
              <p className="text-sm text-gray-600">No hidden charges or fees</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200">
              <AlertCircle className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-bold text-gray-800 mb-2">Your Responsibility</h3>
              <p className="text-sm text-gray-600">Verify all calculations</p>
            </div>
            <div className="bg-orange-50 p-6 rounded-2xl border border-orange-200">
              <XCircle className="w-8 h-8 text-orange-600 mb-3" />
              <h3 className="font-bold text-gray-800 mb-2">No Warranty</h3>
              <p className="text-sm text-gray-600">Provided "as is"</p>
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-primary mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                By downloading, installing, or using GST BABA, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree to these Terms, you may not use the Service.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-primary mb-4">2. Description of Service</h2>
              <p className="text-gray-700 mb-4">
                GST BABA provides tools and features to help Indian businesses manage GST compliance, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>GST calculation tools</li>
                <li>Expense tracking</li>
                <li>Invoice generation</li>
                <li>GST rate finder</li>
                <li>Filing reminders</li>
                <li>GST news and updates</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-primary mb-4">3. User Responsibilities</h2>
              <p className="text-gray-700 mb-4">
                You agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your device and data</li>
                <li>Use the Service only for lawful purposes</li>
                <li>Verify all calculations and data before using them for official purposes</li>
                <li>Comply with all applicable GST laws and regulations</li>
                <li>Not misuse or attempt to hack the Service</li>
              </ul>
              <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6">
                <p className="text-gray-700">
                  <strong>Important:</strong> GST BABA is a tool to assist with GST compliance. You are solely responsible for ensuring the accuracy of your GST filings and compliance with all applicable laws.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-primary mb-4">4. Intellectual Property</h2>
              <p className="text-gray-700">
                The Service and its original content, features, and functionality are owned by GST BABA and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-primary mb-4">5. Disclaimer of Warranties</h2>
              <p className="text-gray-700 mb-4">
                The Service is provided on an "AS IS" and "AS AVAILABLE" basis. We make no warranties, expressed or implied, regarding:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>The accuracy or completeness of calculations</li>
                <li>The reliability or availability of the Service</li>
                <li>The fitness for a particular purpose</li>
                <li>That the Service will be error-free or uninterrupted</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-primary mb-4">6. Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                To the maximum extent permitted by law, GST BABA shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Loss of profits or revenue</li>
                <li>Loss of data</li>
                <li>Business interruption</li>
                <li>Penalties or fines from tax authorities</li>
                <li>Any other commercial damages or losses</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-primary mb-4">7. Indemnification</h2>
              <p className="text-gray-700">
                You agree to indemnify and hold harmless GST BABA and its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses arising out of your use of the Service or violation of these Terms.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-primary mb-4">8. Termination</h2>
              <p className="text-gray-700">
                We may terminate or suspend your access to the Service immediately, without prior notice, for any reason, including breach of these Terms. Upon termination, your right to use the Service will immediately cease.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-primary mb-4">9. Changes to Terms</h2>
              <p className="text-gray-700">
                We reserve the right to modify these Terms at any time. We will notify users of any material changes by updating the "Last updated" date. Your continued use of the Service after changes constitutes acceptance of the new Terms.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-primary mb-4">10. Governing Law</h2>
              <p className="text-gray-700">
                These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-primary mb-4">11. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about these Terms, please contact us:
              </p>
              <div className="bg-[#f8f9fa] p-6 rounded-2xl border border-gray-100">
                <p className="text-gray-700 mb-2">
                  <strong>Email:</strong> legal@gstbaba.com
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
