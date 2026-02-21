# GST BABA - Landing Page Website

A modern, professional landing page for GST BABA mobile app built with Next.js 14, TypeScript, and Tailwind CSS.

## 🎨 Design Features

- **Static Color Scheme**: Uses the same colors as the mobile app (#1e293b primary, #3b82f6 blue, #10b981 green, #f97316 orange)
- **Modern UI**: Clean, professional design without gradients
- **Fully Responsive**: Works perfectly on all devices
- **Smooth Animations**: Subtle fade-in and slide animations
- **SEO Optimized**: Proper meta tags and semantic HTML

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd gst-baba-website
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
gst-baba-website/
├── app/
│   ├── page.tsx          # Home page
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/
│   ├── Navbar.tsx        # Navigation bar
│   ├── Hero.tsx          # Hero section
│   ├── Features.tsx      # Features section
│   ├── HowItWorks.tsx    # How it works section
│   ├── Benefits.tsx      # Benefits section
│   ├── Testimonials.tsx  # Testimonials section
│   ├── CTA.tsx           # Call to action section
│   └── Footer.tsx        # Footer
├── public/               # Static assets
├── tailwind.config.ts    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies
```

## 🎯 Sections

1. **Hero Section**: Eye-catching introduction with app preview
2. **Features**: 8 key features with icons and descriptions
3. **How It Works**: 4-step process to get started
4. **Benefits**: 6 benefits with statistics
5. **Testimonials**: 6 user reviews with ratings
6. **CTA**: Final call-to-action with download button
7. **Footer**: Links, contact info, and social media

## 🎨 Color Palette

- **Primary**: #1e293b (Dark slate)
- **Primary Dark**: #0f172a
- **Primary Light**: #334155
- **Accent Blue**: #3b82f6
- **Accent Green**: #10b981
- **Accent Orange**: #f97316
- **Accent Yellow**: #fbbf24
- **Background**: #f8f9fa

## 🛠️ Built With

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🚀 Deployment

Deploy easily to Vercel:

```bash
npm install -g vercel
vercel
```

Or deploy to any hosting platform that supports Next.js.

## 📝 Customization

### Update Content

Edit the component files in the `components/` directory to update:
- Features list
- Testimonials
- Benefits
- Contact information

### Update Colors

Modify `tailwind.config.ts` to change the color scheme.

### Add New Sections

Create new components in `components/` and import them in `app/page.tsx`.

## 📄 License

This project is part of the GST BABA application suite.

## 🤝 Support

For support, email support@gstbaba.com or visit our website.
