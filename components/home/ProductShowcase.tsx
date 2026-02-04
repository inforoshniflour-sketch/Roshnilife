'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCart } from '../cart/CartContext';

const productImages = [
    '/images/product-front.png',
    '/images/product-side.png',
    '/images/product-quarter.png',
    '/images/product-back.png',
];

export default function ProductShowcase() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [notification, setNotification] = useState('');
    const { addToCart } = useCart();

    // Auto-rotate images
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const handleAddToCart = () => {
        addToCart({
            id: 1,
            name: 'ROSHNI Multi-Grain Flour',
            price: 550,
            image: '/images/product-front.png',
            quantity,
        });
        showNotification('Product added to cart!');

        // Auto-open cart after 500ms
        setTimeout(() => {
            const cartButton = document.querySelector('[data-cart-button]') as HTMLElement;
            if (cartButton) cartButton.click();
        }, 500);
    };

    const showNotification = (message: string) => {
        setNotification(message);
        setTimeout(() => setNotification(''), 3500);
    };

    return (
        <section id="product" className="py-16 lg:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="font-heading text-4xl lg:text-5xl font-bold text-text-dark mb-4 relative inline-block">
                        Our Premium Product
                        <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-primary to-accent rounded-full"></span>
                    </h2>
                    <p className="text-lg text-text-light mt-8">Handcrafted with the finest grains for your health</p>
                </div>

                {/* Product Showcase */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Product Images */}
                    <div className="space-y-4">
                        {/* Main Image */}
                        <div className="bg-cream rounded-2xl p-8 shadow-md">
                            <div className="relative aspect-square">
                                <Image
                                    src={productImages[currentImageIndex]}
                                    alt="ROSHNI Multi-Grain Flour Package"
                                    fill
                                    className="object-contain transition-transform hover:scale-105 duration-500"
                                />
                            </div>
                        </div>

                        {/* Thumbnails */}
                        <div className="flex gap-4">
                            {productImages.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentImageIndex(index)}
                                    className={`relative w-24 h-24 rounded-xl overflow-hidden border-3 transition-all ${currentImageIndex === index
                                        ? 'border-primary opacity-100 -translate-y-1'
                                        : 'border-transparent opacity-60 hover:opacity-100'
                                        }`}
                                >
                                    <Image src={img} alt={`View ${index + 1}`} fill className="object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="space-y-6">
                        <h3 className="font-heading text-4xl font-bold text-text-dark">
                            ROSHNI Multi-Grain Flour
                        </h3>

                        {/* Rating */}
                        <div className="flex items-center gap-2">
                            {[...Array(5)].map((_, i) => (
                                <i key={i} className="fas fa-star text-yellow-500 text-lg"></i>
                            ))}
                            <span className="text-text-light ml-2">(500+ Reviews)</span>
                        </div>

                        {/* Price */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-4 flex-wrap">
                                <span className="text-2xl font-semibold text-text-light line-through opacity-70">
                                    Rs. 850
                                </span>
                                <span className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                    Rs. 550
                                </span>
                                <span className="inline-block px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm font-bold rounded-full shadow-lg animate-pulse-slow">
                                    35% OFF
                                </span>
                            </div>
                            <p className="text-lg text-primary font-semibold">You save Rs. 300!</p>
                        </div>

                        {/* Description */}
                        <p className="text-base text-text-light leading-relaxed">
                            Experience the perfect blend of 11 wholesome ingredients in every pack. Our premium
                            multi-grain flour combines <strong>Wheat (42%), Barley (21%), Oats (11%)</strong>,
                            enriched with{' '}
                            <strong>Lentils, Flaxseed, Brown Rice, Soya, Psyllium, Fenugreek</strong>, and more.
                            Each 1kg pack is carefully crafted to provide maximum nutrition, high fiber (8-10g per
                            100g), and rich protein (12g per 100g). 100% natural with no preservatives or
                            artificial additives.
                        </p>

                        {/* Features */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-2">
                                <i className="fas fa-leaf text-secondary text-xl"></i>
                                <span className="text-sm font-medium">11 Natural Grains</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <i className="fas fa-certificate text-secondary text-xl"></i>
                                <span className="text-sm font-medium">100% Organic</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <i className="fas fa-heart text-secondary text-xl"></i>
                                <span className="text-sm font-medium">Heart Healthy</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <i className="fas fa-shield-alt text-secondary text-xl"></i>
                                <span className="text-sm font-medium">No Preservatives</span>
                            </div>
                        </div>

                        {/* Quantity Selector */}
                        <div className="flex items-center gap-4">
                            <label className="font-semibold text-lg">Quantity:</label>
                            <div className="flex items-center gap-2 bg-cream rounded-full px-2 py-1">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-dark transition-colors"
                                >
                                    <i className="fas fa-minus text-sm"></i>
                                </button>
                                <input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Math.max(1, Math.min(50, parseInt(e.target.value) || 1)))}
                                    className="w-16 text-center text-lg font-semibold bg-transparent border-none focus:outline-none"
                                    min="1"
                                    max="50"
                                />
                                <button
                                    onClick={() => setQuantity(Math.min(50, quantity + 1))}
                                    className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-dark transition-colors"
                                >
                                    <i className="fas fa-plus text-sm"></i>
                                </button>
                            </div>
                        </div>

                        {/* Add to Cart Button */}
                        <button
                            onClick={handleAddToCart}
                            className="w-full bg-gradient-to-r from-primary to-accent text-white py-4 rounded-full font-semibold text-lg flex items-center justify-center gap-2 hover:shadow-lg transition-all hover:-translate-y-0.5"
                        >
                            <i className="fas fa-shopping-cart"></i>
                            <span>Add to Cart</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Enhanced Toast Notification */}
            {notification && (
                <div className="fixed top-24 right-4 z-50 animate-[slideInRight_0.3s_ease]">
                    <div className="bg-white border-l-4 border-green-500 shadow-2xl rounded-lg p-4 flex items-center gap-3 min-w-[300px]">
                        {/* Success Icon */}
                        <div className="flex-shrink-0 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center animate-[scaleIn_0.3s_ease]">
                            <i className="fas fa-check text-white text-lg"></i>
                        </div>

                        {/* Message */}
                        <div className="flex-1">
                            <p className="font-semibold text-gray-800">{notification}</p>
                            <p className="text-sm text-gray-600">View cart to checkout</p>
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={() => setNotification('')}
                            className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}
