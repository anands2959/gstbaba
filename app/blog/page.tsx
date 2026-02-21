import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, User, ArrowRight, TrendingUp } from "lucide-react";

export const metadata = {
  title: "GST Blog - Latest Updates & Tips | GST BABA",
  description: "Stay updated with latest GST news, tips, and insights for Indian businesses.",
};

const blogPosts = [
  {
    title: "GST Rate Changes in 2024: What You Need to Know",
    excerpt: "The GST Council has announced several rate changes effective from January 2024. Here's a comprehensive breakdown of what's changing and how it affects your business.",
    category: "Updates",
    date: "Jan 15, 2024",
    author: "CA Rajesh Kumar",
    readTime: "5 min read",
    image: "bg-blue-100",
  },
  {
    title: "Maximizing Input Tax Credit: A Complete Guide",
    excerpt: "Learn how to claim maximum ITC and avoid common mistakes that could cost your business thousands of rupees in lost credits.",
    category: "Guide",
    date: "Jan 10, 2024",
    author: "Priya Sharma",
    readTime: "8 min read",
    image: "bg-green-100",
  },
  {
    title: "E-Invoicing Made Simple: Step-by-Step Tutorial",
    excerpt: "E-invoicing is now mandatory for businesses with turnover above ₹5 crores. Here's everything you need to know to get started.",
    category: "Tutorial",
    date: "Jan 5, 2024",
    author: "Amit Patel",
    readTime: "6 min read",
    image: "bg-orange-100",
  },
  {
    title: "Common GST Filing Mistakes and How to Avoid Them",
    excerpt: "Discover the most common errors businesses make while filing GST returns and learn how to prevent them.",
    category: "Tips",
    date: "Dec 28, 2023",
    author: "Sneha Reddy",
    readTime: "7 min read",
    image: "bg-purple-100",
  },
  {
    title: "Composition Scheme vs Regular Scheme: Which is Better?",
    excerpt: "A detailed comparison to help small business owners choose the right GST scheme for their business.",
    category: "Comparison",
    date: "Dec 20, 2023",
    author: "Vikram Singh",
    readTime: "10 min read",
    image: "bg-pink-100",
  },
  {
    title: "GST for E-commerce Sellers: Complete Compliance Guide",
    excerpt: "Special GST rules apply to e-commerce sellers. Learn about TCS, registration requirements, and filing obligations.",
    category: "Guide",
    date: "Dec 15, 2023",
    author: "Meera Iyer",
    readTime: "9 min read",
    image: "bg-indigo-100",
  },
];

const categories = ["All", "Updates", "Guide", "Tutorial", "Tips", "Comparison"];

export default function Blog() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-primary text-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm font-bold mb-6">
            <TrendingUp className="w-4 h-4" />
            Latest Updates
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            GST Insights &
            <span className="block text-accent-yellow">Expert Tips</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Stay updated with the latest GST news, regulations, and best practices
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-3 overflow-x-auto no-scrollbar">
            {categories.map((category) => (
              <button
                key={category}
                className="px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all bg-gray-100 text-gray-600 hover:bg-primary hover:text-white"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <article
                key={index}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all group"
              >
                {/* Image Placeholder */}
                <div className={`h-48 ${post.image} flex items-center justify-center`}>
                  <div className="text-6xl opacity-20">📄</div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-bold text-white bg-primary px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-500">{post.readTime}</span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                  </div>

                  {/* Read More */}
                  <button className="mt-4 flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all">
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-light transition-all shadow-sm">
              Load More Articles
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-primary mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-gray-600 mb-8">
            Get the latest GST updates and tips delivered to your inbox every week
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary"
            />
            <button className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-light transition-all shadow-sm">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
