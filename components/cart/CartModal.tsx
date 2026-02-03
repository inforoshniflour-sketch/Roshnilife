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

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h3 className="text-2xl font-heading font-bold text-text-dark">Shopping Cart</h3>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                    >
                        <i className="fas fa-times text-xl text-gray-600"></i>
                    </button>
                </div>

                {/* Cart Items */}
                <div className="p-6 overflow-y-auto max-h-96">
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
                                    className="flex items-center gap-4 p-4 bg-cream rounded-xl"
                                >
                                    <div className="relative w-20 h-20 flex-shrink-0">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-contain rounded-lg"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-text-dark">{item.name}</h4>
                                        <p className="text-primary font-bold">Rs. {item.price}</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <button
                                                onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                                                className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-dark transition-colors"
                                            >
                                                <i className="fas fa-minus text-xs"></i>
                                            </button>
                                            <span className="w-12 text-center font-semibold">{item.quantity}</span>
                                            <button
                                                onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                                                className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-dark transition-colors"
                                            >
                                                <i className="fas fa-plus text-xs"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="w-10 h-10 rounded-full hover:bg-red-100 flex items-center justify-center transition-colors"
                                    >
                                        <i className="fas fa-trash text-red-500"></i>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {cart.length > 0 && (
                    <div className="p-6 border-t border-gray-200 bg-gray-50">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-xl font-semibold text-text-dark">Total:</span>
                            <span className="text-3xl font-bold text-primary">Rs. {total}</span>
                        </div>
                        <button
                            onClick={handleCheckout}
                            className="w-full bg-gradient-to-r from-primary to-accent text-white py-4 rounded-full font-semibold text-lg flex items-center justify-center gap-2 hover:shadow-lg transition-all hover:-translate-y-0.5"
                        >
                            <i className="fas fa-shopping-bag text-xl"></i>
                            <span>Proceed to Checkout</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
