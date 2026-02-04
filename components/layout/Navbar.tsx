'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import CartButton from '../cart/CartButton';
import CartModal from '../cart/CartModal';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <nav
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled
                    ? 'bg-white/95 backdrop-blur-md shadow-md'
                    : 'bg-white/95 backdrop-blur-md shadow-sm'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-24">
                        {/* Logo */}
                        <Link href="/" className="flex-shrink-0 group">
                            <div className="flex items-center gap-3">
                                {/* Logo Icon */}
                                <div className="relative h-16 w-16 transition-transform duration-300 group-hover:scale-110">
                                    <Image
                                        src="/images/logo-improved.png"
                                        alt="ROSHNI Logo"
                                        fill
                                        className="object-contain drop-shadow-md"
                                        priority
                                    />
                                </div>
                                {/* Logo Text */}
                                <div className="hidden sm:block">
                                    <h1 className="font-heading text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                        ROSHNI
                                    </h1>
                                    <p className="text-xs text-text-light font-medium tracking-wide">
                                        Multi-Grain Flour
                                    </p>
                                </div>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <ul className="hidden md:flex items-center space-x-8">
                            <li>
                                <Link
                                    href="/"
                                    className="text-text-dark font-medium hover:text-primary transition-colors relative group"
                                >
                                    Home
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/#product"
                                    className="text-text-dark font-medium hover:text-primary transition-colors relative group"
                                >
                                    Product
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/about"
                                    className="text-text-dark font-medium hover:text-primary transition-colors relative group"
                                >
                                    About Us
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/recipes"
                                    className="text-text-dark font-medium hover:text-primary transition-colors relative group"
                                >
                                    Recipes
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/blog"
                                    className="text-text-dark font-medium hover:text-primary transition-colors relative group"
                                >
                                    Health Tips
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/faq"
                                    className="text-text-dark font-medium hover:text-primary transition-colors relative group"
                                >
                                    FAQ
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/#contact"
                                    className="text-text-dark font-medium hover:text-primary transition-colors relative group"
                                >
                                    Contact
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                                </Link>
                            </li>
                        </ul>

                        {/* Cart and Mobile Menu Button */}
                        <div className="flex items-center space-x-4">
                            <div data-cart-button>
                                <CartButton onClick={() => setIsCartOpen(true)} />
                            </div>
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="md:hidden text-2xl text-text-dark"
                            >
                                <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {isMobileMenuOpen && (
                        <div className="md:hidden py-4 border-t border-gray-200">
                            <ul className="space-y-4">
                                <li>
                                    <Link
                                        href="/"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="block text-text-dark font-medium hover:text-primary transition-colors"
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/#product"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="block text-text-dark font-medium hover:text-primary transition-colors"
                                    >
                                        Product
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/about"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="block text-text-dark font-medium hover:text-primary transition-colors"
                                    >
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/recipes"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="block text-text-dark font-medium hover:text-primary transition-colors"
                                    >
                                        Recipes
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/blog"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="block text-text-dark font-medium hover:text-primary transition-colors"
                                    >
                                        Health Tips
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/faq"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="block text-text-dark font-medium hover:text-primary transition-colors"
                                    >
                                        FAQ
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/#contact"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="block text-text-dark font-medium hover:text-primary transition-colors"
                                    >
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </nav>

            {/* Cart Modal */}
            <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
}
