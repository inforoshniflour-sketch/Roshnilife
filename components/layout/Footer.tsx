import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="bg-gradient-to-br from-primary-dark to-secondary-dark text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div>
                        <div className="relative h-12 w-32 mb-4">
                            <Image
                                src="/images/logo-new.png"
                                alt="ROSHNI Logo"
                                fill
                                className="object-contain brightness-0 invert"
                            />
                        </div>
                        <p className="text-white/80 text-sm">
                            Premium multi-grain flour for healthy living. Made with love, delivered with care.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-white/80 hover:text-white transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/#product" className="text-white/80 hover:text-white transition-colors">
                                    Product
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-white/80 hover:text-white transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/recipes" className="text-white/80 hover:text-white transition-colors">
                                    Recipes
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="text-white/80 hover:text-white transition-colors">
                                    Health Tips
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="text-white/80 hover:text-white transition-colors">
                                    FAQ
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Care */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Customer Care</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/#contact" className="text-white/80 hover:text-white transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <a href="#" className="text-white/80 hover:text-white transition-colors">
                                    Shipping Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-white/80 hover:text-white transition-colors">
                                    Return Policy
                                </a>
                            </li>
                            <li>
                                <Link href="/faq" className="text-white/80 hover:text-white transition-colors">
                                    FAQs
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
                        <p className="text-white/80 text-sm mb-4">
                            Subscribe for exclusive offers and health tips!
                        </p>
                        <form className="flex">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="flex-1 px-4 py-2 rounded-l-full text-text-dark focus:outline-none"
                            />
                            <button
                                type="submit"
                                className="bg-primary-light hover:bg-accent px-4 py-2 rounded-r-full transition-colors"
                            >
                                <i className="fas fa-arrow-right"></i>
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-white/20 text-center text-white/80 text-sm">
                    <p>
                        &copy; 2026 ROSHNI. All rights reserved. | Crafted with{' '}
                        <i className="fas fa-heart text-red-400"></i> for healthy living
                    </p>
                </div>
            </div>
        </footer>
    );
}
