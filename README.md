# ROSHNI Multi-Grain Flour - Next.js Website

A high-performance e-commerce website for ROSHNI brand built with Next.js 14, optimized for Vercel hosting.

## 🚀 Features

- ⚡ **Lightning Fast** - Next.js 14 with App Router
- 🖼️ **Optimized Images** - Automatic WebP/AVIF conversion
- 🛒 **Shopping Cart** - Full cart functionality with localStorage
- 📱 **Fully Responsive** - Mobile-first design
- 💬 **WhatsApp Integration** - Direct ordering via WhatsApp
- 🎨 **Modern UI** - Tailwind CSS with custom animations
- 🔍 **SEO Optimized** - Meta tags and structured data
- ♿ **Accessible** - WCAG compliant

## 📁 Project Structure

```
multigrain-nextjs/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   ├── about/page.tsx      # About page
│   ├── recipes/page.tsx    # Recipes page
│   ├── blog/page.tsx       # Health tips/blog
│   ├── faq/page.tsx        # FAQ page
│   └── globals.css         # Global styles
├── components/
│   ├── cart/               # Cart components
│   ├── layout/             # Layout components
│   └── home/               # Homepage sections
├── public/
│   └── images/             # All images
└── lib/                    # Utilities
```

## 🛠️ Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Font Awesome
- **Fonts:** Google Fonts (Playfair Display, Inter)
- **Deployment:** Vercel

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📦 Deployment to Vercel

### Option 1: Vercel CLI (Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   cd multigrain-nextjs
   vercel
   ```

3. **Follow prompts:**
   - Link to existing project or create new
   - Confirm settings
   - Deploy!

### Option 2: GitHub Integration

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel auto-detects Next.js and deploys

## ⚙️ Configuration

### Update WhatsApp Number

Replace `923254187846` with your number in:
- `components/cart/CartModal.tsx`
- `components/home/Contact.tsx`
- `components/layout/WhatsAppFloat.tsx`
- `components/home/CustomerGallery.tsx`

### Update Contact Information

Edit in `components/home/Contact.tsx`:
- Phone number
- Email address
- Location

### Update Product Price

Edit in `components/home/ProductShowcase.tsx`:
- Display price
- Original price
- Discount percentage

## 🎨 Customization

### Colors

Edit `tailwind.config.ts` to change brand colors:
```typescript
colors: {
  primary: '#00563F',
  secondary: '#7CB342',
  accent: '#9CCC65',
}
```

### Fonts

Edit `app/layout.tsx` to change fonts:
```typescript
import { YourFont } from 'next/font/google';
```

## 📱 Pages

- **Homepage** - Hero, product showcase, benefits, testimonials, contact
- **About** - Company story, mission/vision, manufacturing process
- **Recipes** - 4 detailed recipes with expandable instructions
- **Blog** - Health tips and nutrition articles
- **FAQ** - 17 questions with accordion interface

## 🔧 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 💰 Hosting Cost

**Vercel Free Tier includes:**
- Unlimited deployments
- 100GB bandwidth/month
- Automatic HTTPS
- Custom domain support

**Estimated cost: FREE** for most small to medium websites

## ✅ Performance

- Lighthouse Score: 90+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Cumulative Layout Shift: < 0.1

## 📞 Support

For questions or issues:
- WhatsApp: +92 325 4187846
- Email: info@roshniflour.com

## 📄 License

This project is created for ROSHNI brand. All rights reserved.

---

**Built with ❤️ for healthy living**

*Converted from static HTML to Next.js for improved performance and Vercel hosting*
