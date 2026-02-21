import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { UserX, Smartphone, ShieldAlert, ArrowRight } from "lucide-react";

export const metadata = {
    title: "Delete Account | GST BABA",
    description: "Instructions on how to delete your GST BABA account permanently.",
};

export default function DeleteAccount() {
    return (
        <main className="min-h-screen flex flex-col">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-primary text-white">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm font-bold mb-6">
                        <UserX className="w-4 h-4" />
                        Account Management
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                        Delete Your Account
                    </h1>
                    <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                        We're sorry to see you go. If you wish to permanently delete your GST BABA account and all associated data, please follow the instructions below.
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white flex-grow">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-red-50 border-2 border-red-100 rounded-3xl p-8 mb-12 flex items-start gap-6">
                        <ShieldAlert className="w-12 h-12 text-red-600 flex-shrink-0" />
                        <div>
                            <h2 className="text-xl font-bold text-red-900 mb-2">Important Notice</h2>
                            <p className="text-red-800 leading-relaxed">
                                Deleting your account is permanent and cannot be undone. This will permanently remove all your personal information, business details, invoices, expenses, and saved records from our systems.
                            </p>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-primary mb-8 flex items-center gap-3">
                        <Smartphone className="w-6 h-6" />
                        How to Delete via Mobile App
                    </h2>

                    <div className="space-y-6">
                        {[
                            {
                                step: "1",
                                text: "Open the GST BABA Mobile App on your device.",
                            },
                            {
                                step: "2",
                                text: "Navigate to the 'Profile' section from the bottom navigation or side menu.",
                            },
                            {
                                step: "3",
                                text: "Tap on 'Customer Support' or 'Account Settings'.",
                            },
                            {
                                step: "4",
                                text: "Select the 'Delete My Account' option at the bottom of the screen.",
                            },
                            {
                                step: "5",
                                text: "Confirm your decision when prompted to complete the process.",
                            },
                        ].map((item, index) => (
                            <div key={index} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-primary/20 transition-colors group">
                                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0 group-hover:scale-110 transition-transform">
                                    {item.step}
                                </div>
                                <p className="text-gray-700 font-medium">{item.text}</p>
                                <ArrowRight className="w-5 h-5 text-gray-300 ml-auto group-hover:text-primary transition-colors" />
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 p-8 bg-primary rounded-3xl text-white">
                        <h3 className="text-xl font-bold mb-4">Need Help or Have Concerns?</h3>
                        <p className="mb-6 text-primary-light">
                            If you're having trouble deleting your account or have feedback on how we can improve, please reach out to our support team.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <a href="mailto:support@gstbaba.com" className="bg-white text-primary px-6 py-3 rounded-xl font-bold hover:bg-accent-blue hover:text-white transition-all">
                                Email Support
                            </a>
                            <a href="/support" className="bg-primary-dark text-white px-6 py-3 rounded-xl font-bold border border-white/20 hover:bg-white/10 transition-all">
                                Visit Support Center
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
