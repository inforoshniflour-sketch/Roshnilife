'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/components/cart/CartContext';
import {
    generateOrderNumber,
    calculateShipping,
    formatPrice,
    validatePhone,
    formatPhoneForWhatsApp,
    getAvailablePaymentMethods,
    pakistaniCities,
} from '@/lib/orderUtils';

export default function CheckoutPage() {
    const router = useRouter();
    const { cart, getTotalPrice, clearCart } = useCart();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        notes: '',
        paymentMethod: 'cod',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [shippingCost, setShippingCost] = useState(0);

    // Calculate shipping when city changes
    useEffect(() => {
        if (formData.city) {
            const cost = calculateShipping(formData.city);
            setShippingCost(cost);
        }
    }, [formData.city]);

    // Redirect if cart is empty
    useEffect(() => {
        if (cart.length === 0) {
            router.push('/');
        }
    }, [cart, router]);

    const subtotal = getTotalPrice();
    const total = subtotal + shippingCost;
    const availablePaymentMethods = getAvailablePaymentMethods(total);

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error when user types
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    // Validate form
    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!validatePhone(formData.phone)) {
            newErrors.phone = 'Please enter a valid Pakistani phone number';
        }

        if (!formData.address.trim()) {
            newErrors.address = 'Address is required';
        }

        if (!formData.city) {
            newErrors.city = 'Please select a city';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            // Generate order number
            const orderNumber = generateOrderNumber();

            // Prepare order data
            const orderData = {
                orderNumber,
                customer: {
                    name: formData.fullName,
                    email: formData.email,
                    phone: formData.phone,
                    address: formData.address,
                    city: formData.city,
                    postalCode: formData.postalCode,
                },
                items: cart,
                subtotal,
                shippingCost,
                total,
                paymentMethod: formData.paymentMethod,
                notes: formData.notes,
                status: 'pending',
                createdAt: new Date().toISOString(),
            };

            // Save order to localStorage (temporary solution)
            const orders = JSON.parse(localStorage.getItem('roshniOrders') || '[]');
            orders.push(orderData);
            localStorage.setItem('roshniOrders', JSON.stringify(orders));

            // Send WhatsApp notification to admin
            sendWhatsAppNotification(orderData);

            // Send email notification (will implement with EmailJS)
            // await sendEmailNotification(orderData);

            // Clear cart moved to confirmation page
            // clearCart();

            // Redirect to confirmation page
            router.push(`/order-confirmation/${orderNumber}`);
        } catch (error) {
            console.error('Order submission error:', error);
            alert('There was an error processing your order. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Send WhatsApp and Email notifications via API
    const sendWhatsAppNotification = async (orderData: any) => {
        const adminPhone = '923004720117';

        let message = `🛒 *New Order Received!*\n\n`;
        message += `📋 *Order Number:* ${orderData.orderNumber}\n\n`;
        message += `👤 *Customer Details:*\n`;
        message += `Name: ${orderData.customer.name}\n`;
        message += `Phone: ${orderData.customer.phone}\n`;
        message += `Email: ${orderData.customer.email || 'N/A'}\n`;
        message += `Address: ${orderData.customer.address}\n`;
        message += `City: ${orderData.customer.city}\n`;
        message += `Postal Code: ${orderData.customer.postalCode || 'N/A'}\n\n`;
        message += `📦 *Order Items:*\n`;

        orderData.items.forEach((item: any, index: number) => {
            message += `${index + 1}. ${item.name}\n`;
            message += `   Qty: ${item.quantity} × ${formatPrice(item.price)} = ${formatPrice(item.price * item.quantity)}\n`;
        });

        message += `\n💰 *Order Summary:*\n`;
        message += `Subtotal: ${formatPrice(orderData.subtotal)}\n`;
        message += `Shipping: ${formatPrice(orderData.shippingCost)}\n`;
        message += `*Total: ${formatPrice(orderData.total)}*\n\n`;
        message += `💳 *Payment Method:* ${orderData.paymentMethod.toUpperCase()}\n`;

        if (orderData.notes) {
            message += `\n📝 *Notes:* ${orderData.notes}\n`;
        }

        // Send notification via API (server-side)
        try {
            await fetch('/api/send-order-notification', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData),
            });
        } catch (error) {
            console.error('Notification error:', error);
        }
    };

    if (cart.length === 0) {
        return null;
    }

    return (
        <div className="min-h-screen bg-cream py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="font-heading text-4xl font-bold text-text-dark mb-8 text-center">
                    Checkout
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Checkout Form */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-md">
                            <h2 className="font-heading text-2xl font-bold text-text-dark mb-6">
                                Customer Details
                            </h2>

                            {/* Full Name */}
                            <div className="mb-4">
                                <label htmlFor="fullName" className="block text-sm font-medium text-text-dark mb-2">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 rounded-lg border ${errors.fullName ? 'border-red-500' : 'border-gray-300'
                                        } focus:outline-none focus:ring-2 focus:ring-primary`}
                                    placeholder="Enter your full name"
                                />
                                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                            </div>

                            {/* Email */}
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-text-dark mb-2">
                                    Email (Optional)
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="your.email@example.com"
                                />
                            </div>

                            {/* Phone */}
                            <div className="mb-4">
                                <label htmlFor="phone" className="block text-sm font-medium text-text-dark mb-2">
                                    Phone Number <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-gray-300'
                                        } focus:outline-none focus:ring-2 focus:ring-primary`}
                                    placeholder="03001234567"
                                />
                                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                            </div>

                            {/* Address */}
                            <div className="mb-4">
                                <label htmlFor="address" className="block text-sm font-medium text-text-dark mb-2">
                                    Complete Address <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    rows={3}
                                    className={`w-full px-4 py-3 rounded-lg border ${errors.address ? 'border-red-500' : 'border-gray-300'
                                        } focus:outline-none focus:ring-2 focus:ring-primary`}
                                    placeholder="House/Flat number, Street, Area"
                                />
                                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                            </div>

                            {/* City and Postal Code */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label htmlFor="city" className="block text-sm font-medium text-text-dark mb-2">
                                        City <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="city"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 rounded-lg border ${errors.city ? 'border-red-500' : 'border-gray-300'
                                            } focus:outline-none focus:ring-2 focus:ring-primary`}
                                    >
                                        <option value="">Select City</option>
                                        {pakistaniCities.map((city) => (
                                            <option key={city} value={city}>
                                                {city}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                                </div>

                                <div>
                                    <label htmlFor="postalCode" className="block text-sm font-medium text-text-dark mb-2">
                                        Postal Code (Optional)
                                    </label>
                                    <input
                                        type="text"
                                        id="postalCode"
                                        name="postalCode"
                                        value={formData.postalCode}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                                        placeholder="54000"
                                    />
                                </div>
                            </div>

                            {/* Order Notes */}
                            <div className="mb-6">
                                <label htmlFor="notes" className="block text-sm font-medium text-text-dark mb-2">
                                    Order Notes (Optional)
                                </label>
                                <textarea
                                    id="notes"
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    rows={3}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="Any special instructions for your order?"
                                />
                            </div>

                            {/* Payment Method */}
                            <div className="mb-6">
                                <h3 className="font-heading text-xl font-bold text-text-dark mb-4">Payment Method</h3>

                                {total >= 1500 && (
                                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                                        <p className="text-sm text-yellow-800">
                                            <i className="fas fa-info-circle mr-2"></i>
                                            For orders above PKR 1,500, only card payment is available.
                                        </p>
                                    </div>
                                )}

                                <div className="space-y-3">
                                    {availablePaymentMethods.includes('cod') && (
                                        <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary transition-colors">
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value="cod"
                                                checked={formData.paymentMethod === 'cod'}
                                                onChange={handleChange}
                                                className="w-4 h-4 text-primary"
                                            />
                                            <div className="ml-3">
                                                <p className="font-medium text-text-dark">Cash on Delivery (COD)</p>
                                                <p className="text-sm text-text-light">Pay when you receive your order</p>
                                            </div>
                                        </label>
                                    )}

                                    <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary transition-colors">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="card"
                                            checked={formData.paymentMethod === 'card'}
                                            onChange={handleChange}
                                            className="w-4 h-4 text-primary"
                                        />
                                        <div className="ml-3">
                                            <p className="font-medium text-text-dark">
                                                Credit/Debit Card
                                                <span className="ml-2 text-xs text-gray-500">(Coming Soon)</span>
                                            </p>
                                            <p className="text-sm text-text-light">Visa, Mastercard accepted</p>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting || formData.paymentMethod === 'card'}
                                className="w-full py-4 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-full hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center">
                                        <i className="fas fa-spinner fa-spin mr-2"></i>
                                        Processing...
                                    </span>
                                ) : formData.paymentMethod === 'card' ? (
                                    'Card Payment Coming Soon'
                                ) : (
                                    'Place Order'
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl p-6 shadow-md sticky top-24">
                            <h2 className="font-heading text-2xl font-bold text-text-dark mb-4">Order Summary</h2>

                            {/* Cart Items */}
                            <div className="space-y-4 mb-6">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex justify-between">
                                        <div className="flex-1">
                                            <p className="font-medium text-text-dark">{item.name}</p>
                                            <p className="text-sm text-text-light">
                                                Qty: {item.quantity}
                                            </p>
                                        </div>
                                        <p className="font-medium text-text-dark">
                                            {formatPrice(item.price * item.quantity)}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gray-200 pt-4 space-y-2">
                                <div className="flex justify-between text-text-light">
                                    <span>Subtotal</span>
                                    <span>{formatPrice(subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-text-light">
                                    <span>Shipping</span>
                                    <span>{shippingCost > 0 ? formatPrice(shippingCost) : 'Select city'}</span>
                                </div>
                                <div className="flex justify-between text-xl font-bold text-text-dark pt-2 border-t border-gray-200">
                                    <span>Total</span>
                                    <span>{formatPrice(total)}</span>
                                </div>
                            </div>

                            {/* Shipping Info */}
                            {formData.city && (
                                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                                    <p className="text-sm text-green-800">
                                        <i className="fas fa-truck mr-2"></i>
                                        Delivery to {formData.city}: 2-4 business days
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
