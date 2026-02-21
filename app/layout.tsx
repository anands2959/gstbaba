import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GST BABA - Complete GST Solution for Indian Businesses",
  description: "Simplify your GST compliance with smart calculators, expense tracking, invoice generation, and real-time GST updates. Built for Indian businesses.",
  keywords: "GST Calculator, GST India, Invoice Generator, Expense Tracker, GST Compliance, Tax Calculator",
  icons: {
    icon: '/icon.png',
    apple: '/icon.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
