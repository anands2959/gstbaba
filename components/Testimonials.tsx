'use client';

import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Rajesh Kumar',
    role: 'Retail Shop Owner',
    location: 'Delhi',
    rating: 5,
    text: 'GST BABA has made my life so much easier. I can calculate GST, generate invoices, and track expenses all in one place. Highly recommended!',
    avatar: 'RK',
  },
  {
    name: 'Priya Sharma',
    role: 'CA Professional',
    location: 'Mumbai',
    rating: 5,
    text: 'As a CA, I recommend this app to all my clients. The accuracy of calculations and the comprehensive features are impressive.',
    avatar: 'PS',
  },
  {
    name: 'Amit Patel',
    role: 'Restaurant Owner',
    location: 'Ahmedabad',
    rating: 5,
    text: 'The composition scheme calculator is perfect for my restaurant. The app is simple to use and saves me hours every month.',
    avatar: 'AP',
  },
  {
    name: 'Sneha Reddy',
    role: 'E-commerce Seller',
    location: 'Bangalore',
    rating: 5,
    text: 'Managing GST for my online business was a nightmare. GST BABA simplified everything. The expense tracker is a game-changer!',
    avatar: 'SR',
  },
  {
    name: 'Vikram Singh',
    role: 'Textile Trader',
    location: 'Surat',
    rating: 5,
    text: 'The ITC tracking feature helped me claim ₹2 lakhs in input tax credit that I would have missed otherwise. Worth every penny!',
    avatar: 'VS',
  },
  {
    name: 'Meera Iyer',
    role: 'Freelance Consultant',
    location: 'Chennai',
    rating: 5,
    text: 'Perfect for freelancers like me. The invoice generator creates professional bills in seconds. Love the clean interface!',
    avatar: 'MI',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-600 px-4 py-2 rounded-full text-sm font-bold mb-4">
            <Star className="w-4 h-4 fill-current" />
            Testimonials
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-4">
            Loved by
            <span className="block text-accent-blue">50,000+ Users</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See what our users have to say about their experience with GST BABA
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-[#f8f9fa] p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 opacity-10">
                <Quote className="w-12 h-12 text-primary" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Text */}
              <p className="text-sm text-gray-700 leading-relaxed mb-6 relative z-10">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-bold text-gray-800 text-sm">{testimonial.name}</div>
                  <div className="text-xs text-gray-500">
                    {testimonial.role} • {testimonial.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
