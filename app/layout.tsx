import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppFloat from '@/components/layout/WhatsAppFloat';
import { CartProvider } from '@/components/cart/CartContext';
import Script from 'next/script';
import StructuredData from '@/components/seo/StructuredData';

const playfair = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-heading',
    display: 'swap',
});

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-body',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'ROSHNI Multi-Grain Flour Pakistan | Premium Healthy Atta | Order Online Lahore',
    description:
        'Buy ROSHNI Premium Multi-Grain Flour in Pakistan. 100% natural, stone-ground atta made from 7 grains. High protein, fiber-rich, no preservatives. Order online in Lahore, Karachi, Islamabad. WhatsApp: +92 300 4720117',
    keywords: [
        // Primary Keywords
        'multi grain flour Pakistan',
        'ROSHNI flour',
        'healthy atta Pakistan',
        'whole grain flour Lahore',
        'premium flour Pakistan',

        // Product Keywords
        '7 grain flour',
        'stone ground flour',
        'organic flour Pakistan',
        'natural atta',
        'multigrain atta',
        'chakki atta',
        'whole wheat flour',

        // Health Keywords
        'high protein flour',
        'high fiber atta',
        'diabetic friendly flour',
        'weight loss flour',
        'healthy roti flour',
        'nutritious atta',
        'heart healthy flour',

        // Location Keywords
        'flour Lahore',
        'atta Karachi',
        'flour Islamabad',
        'flour Rawalpindi',
        'atta Faisalabad',
        'flour delivery Pakistan',

        // Brand Keywords
        'ROSHNI atta',
        'ROSHNI multigrain',
        'roshnilife flour',
        'ROSHNI Pakistan',

        // Usage Keywords
        'roti flour',
        'chapati atta',
        'paratha flour',
        'baking flour Pakistan',
        'bread flour',

        // Quality Keywords
        'best flour Pakistan',
        'premium quality atta',
        'fresh flour',
        'no preservatives flour',
        'chemical free atta',
        'GMO free flour',

        // Purchase Keywords
        'buy flour online Pakistan',
        'order atta online',
        'flour home delivery',
        'WhatsApp flour order',
        'online grocery Pakistan',
    ].join(', '),
    authors: [{ name: 'ROSHNI' }],
    creator: 'ROSHNI',
    publisher: 'ROSHNI',
    robots: 'index, follow',
    openGraph: {
        type: 'website',
        locale: 'en_PK',
        url: 'https://roshnilife.com',
        siteName: 'ROSHNI Multi-Grain Flour',
        title: 'ROSHNI - Premium Multi-Grain Flour Pakistan | Healthy Atta',
        description:
            'Buy ROSHNI Premium Multi-Grain Flour in Pakistan. 100% natural, stone-ground atta made from 7 grains. Order online in Lahore, Karachi, Islamabad.',
        images: [
            {
                url: 'https://roshnilife.com/images/hero-bg.jpg',
                width: 1200,
                height: 630,
                alt: 'ROSHNI Multi-Grain Flour Pakistan',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'ROSHNI - Premium Multi-Grain Flour Pakistan',
        description:
            'Buy ROSHNI Premium Multi-Grain Flour. 100% natural, stone-ground atta made from 7 grains. Order online in Pakistan.',
        images: ['https://roshnilife.com/images/hero-bg.jpg'],
    },
    alternates: {
        canonical: 'https://roshnilife.com',
    },
    verification: {
        google: 'your-google-verification-code',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
            <head>
                {/* Font Awesome */}
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
                />
                <StructuredData />
            </head>
            <body className="font-body">
                <CartProvider>
                    <Navbar />
                    <main>{children}</main>
                    <Footer />
                    <WhatsAppFloat />
                </CartProvider>
            </body>
        </html>
    );
}
