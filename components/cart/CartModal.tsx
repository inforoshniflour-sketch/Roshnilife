'use client';

import { useCart } from './CartContext';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface CartModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
    const { cart, removeFromCart, updateCartItemQuantity, getTotalPrice } = useCart();
    const router = useRouter();
    const total = getTotalPrice();

    const handleCheckout = () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        // Close modal first, then navigate
        onClose();
        router.push('/checkout');
    };

    if (!isOpen) return null;

    // Free shipping threshold
    const freeShippingThreshold = 2000;
    const amountUntilFreeShipping = Math.max(0, freeShippingThreshold - total);
    const progressPercentage = Math.min(100, (total / freeShippingThreshold) * 100);

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300"
            onClick={onClose}
        >
            {/* Slide-in Drawer from Right */}
            <div
                className={`fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h3 className="text-2xl font-heading font-bold text-primary">Your cart</h3>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                    >
                        <i className="fas fa-times text-xl text-gray-600"></i>
                    </button>
                </div>

                {/* Free Shipping Progress Bar */}
                {cart.length > 0 && (
                    <div className="px-6 py-4 bg-gradient-to-r from-green-50 to-blue-50 border-b border-gray-200">
                        {amountUntilFreeShipping > 0 ? (
                            <>
                                <p className="text-sm text-gray-700 mb-2">
                                    You are <span className="font-bold text-primary">Rs.{amountUntilFreeShipping}</span> away from free shipping!
                                </p>
                                <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                                        style={{ width: `${progressPercentage}%` }}
                                    ></div>
                                </div>
                            </>
                        ) : (
                            <p className="text-sm font-semibold text-green-600 flex items-center gap-2">
                                <i className="fas fa-check-circle"></i>
                                Congratulations! You've unlocked free shipping!
                            </p>
                        )}
                    </div>
                )}

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-6" style={{ maxHeight: 'calc(100vh - 300px)' }}>
                    {cart.length === 0 ? (
                        <div className="text-center py-12">
                            <i className="fas fa-shopping-cart text-6xl text-gray-300 mb-4"></i>
                            <p className="text-gray-500 text-lg">Your cart is empty</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {cart.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                                >
                                    <div className="relative w-20 h-20 flex-shrink-0 bg-white rounded-lg p-2">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-semibold text-text-dark text-sm mb-1 truncate">{item.name}</h4>
                                        <p className="text-primary font-bold mb-2">Rs. {item.price.toLocaleString()}</p>
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-2 bg-white rounded-full px-2 py-1 border border-gray-200">
                                                <button
                                                    onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                                                    className="w-7 h-7 rounded-full bg-gray-100 hover:bg-primary hover:text-white flex items-center justify-center transition-colors"
                                                >
                                                    <i className="fas fa-minus text-xs"></i>
                                                </button>
                                                <span className="w-8 text-center font-semibold text-sm">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                                                    className="w-7 h-7 rounded-full bg-gray-100 hover:bg-primary hover:text-white flex items-center justify-center transition-colors"
                                                >
                                                    <i className="fas fa-plus text-xs"></i>
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-gray-400 hover:text-red-500 transition-colors"
                                            >
                                                <i className="fas fa-trash text-sm"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {cart.length > 0 && (
                    <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 bg-white">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-lg font-semibold text-gray-700">Estimated total</span>
                            <span className="text-2xl font-bold text-primary">Rs. {total.toLocaleString()} PKR</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-4">Taxes, discounts and shipping calculated at checkout</p>
                        <button
                            onClick={handleCheckout}
                            className="w-full bg-gradient-to-r from-primary to-accent text-white py-4 rounded-full font-semibold text-lg flex items-center justify-center gap-2 hover:shadow-xl transition-all hover:-translate-y-0.5"
                        >
                            <span>Check out</span>
                            <i className="fas fa-arrow-right"></i>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
