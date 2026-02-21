import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Cookie, Settings, Eye, Shield } from "lucide-react";

export const metadata = {
  title: "Cookie Policy | GST BABA",
  description: "Learn about how GST BABA uses cookies and similar technologies.",
};

export default function CookiePolicy() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-primary text-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm font-bold mb-6">
            <Cookie className="w-4 h-4" />
            Cookie Information
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Cookie Policy
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
              This Cookie Policy explains how GST BABA ("we", "us", or "our") uses cookies and similar technologies when you visit our website or use our mobile application.
            </p>
            <p className="text-gray-700 leading-relaxed">
              By using our Service, you consent to the use of cookies in accordance with this Cookie Policy.
            </p>
          </div>

          {/* Key Points */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200 text-center">
              <Cookie className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-800 mb-2">Essential</h3>
              <p className="text-xs text-gray-600">Required for app function</p>
            </div>
            <div className="bg-green-50 p-6 rounded-2xl border border-green-200 text-center">
              <Settings className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-800 mb-2">Functional</h3>
              <p className="text-xs text-gray-600">Remember preferences</p>
            </div>
            <div className="bg-orange-50 p-6 rounded-2xl border border-orange-200 text-center">
              <Eye className="w-8 h-8 text-orange-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-800 mb-2">Analytics</h3>
              <p className="text-xs text-gray-600">Understand usage</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-2xl border border-purple-200 text-center">
              <Shield className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-800 mb-2">Security</h3>
              <p className="text-xs text-gray-600">Protect your data</p>
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-primary mb-4">What Are Cookies?</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Cookies are small text files that are placed on your device when you visit a website or use an application. They are widely used to make websites and apps work more efficiently and provide information to the owners.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Cookies can be "persistent" or "session" cookies. Persistent cookies remain on your device after you close your browser, while session cookies are deleted when you close your browser.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-primary mb-4">How We Use Cookies</h2>
              <p className="text-gray-700 mb-4">
                We use cookies for the following purposes:
              </p>

              <div className="space-y-6">
                <div className="bg-[#f8f9fa] p-6 rounded-2xl border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">1. Essential Cookies</h3>
                  <p className="text-gray-700 mb-3">
                    These cookies are necessary for the Service to function properly. They enable core functionality such as:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>User authentication and security</li>
                    <li>Remembering your preferences</li>
                    <li>Enabling features you have requested</li>
                  </ul>
                </div>

                <div className="bg-[#f8f9fa] p-6 rounded-2xl border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">2. Functional Cookies</h3>
                  <p className="text-gray-700 mb-3">
                    These cookies allow us to remember choices you make and provide enhanced features:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Language preferences</li>
                    <li>Display settings</li>
                    <li>Recently used features</li>
                  </ul>
                </div>

                <div className="bg-[#f8f9fa] p-6 rounded-2xl border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">3. Analytics Cookies</h3>
                  <p className="text-gray-700 mb-3">
                    These cookies help us understand how users interact with our Service:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Number of visitors and usage patterns</li>
                    <li>Most popular features</li>
                    <li>Error tracking and performance monitoring</li>
                  </ul>
                </div>

                <div className="bg-[#f8f9fa] p-6 rounded-2xl border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">4. Security Cookies</h3>
                  <p className="text-gray-700 mb-3">
                    These cookies help us keep the Service secure:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Detecting and preventing fraud</li>
                    <li>Protecting against malicious activity</li>
                    <li>Ensuring secure connections</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-primary mb-4">Third-Party Cookies</h2>
              <p className="text-gray-700 mb-4">
                We may use third-party services that also use cookies. These include:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Google Analytics:</strong> To analyze website traffic and usage</li>
                <li><strong>Firebase:</strong> For app analytics and crash reporting</li>
                <li><strong>Social Media Platforms:</strong> For social sharing features</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-primary mb-4">Managing Cookies</h2>
              <p className="text-gray-700 mb-4">
                You have the right to decide whether to accept or reject cookies. You can manage your cookie preferences through:
              </p>

              <div className="space-y-4">
                <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
                  <h3 className="font-bold text-gray-800 mb-2">Browser Settings</h3>
                  <p className="text-gray-700 text-sm">
                    Most web browsers allow you to control cookies through their settings. You can set your browser to refuse cookies or delete certain cookies.
                  </p>
                </div>

                <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6">
                  <h3 className="font-bold text-gray-800 mb-2">Mobile App Settings</h3>
                  <p className="text-gray-700 text-sm">
                    You can manage app permissions and data collection through your device settings.
                  </p>
                </div>

                <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-6">
                  <h3 className="font-bold text-gray-800 mb-2">Opt-Out Tools</h3>
                  <p className="text-gray-700 text-sm">
                    You can opt-out of analytics cookies through Google Analytics Opt-out Browser Add-on.
                  </p>
                </div>
              </div>

              <div className="mt-6 bg-red-50 border-2 border-red-200 rounded-2xl p-6">
                <p className="text-gray-700">
                  <strong>Note:</strong> Blocking or deleting cookies may impact your experience and some features may not function properly.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-primary mb-4">Updates to This Policy</h2>
              <p className="text-gray-700">
                We may update this Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page and updating the "Last updated" date.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-primary mb-4">Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have questions about this Cookie Policy, please contact us:
              </p>
              <div className="bg-[#f8f9fa] p-6 rounded-2xl border border-gray-100">
                <p className="text-gray-700 mb-2">
                  <strong>Email:</strong> privacy@gstbaba.com
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Phone:</strong> +91 7878787878
                </p>
                <p className="text-gray-700">
                  <strong>Address:</strong> Renukoot, UP - 231217
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
