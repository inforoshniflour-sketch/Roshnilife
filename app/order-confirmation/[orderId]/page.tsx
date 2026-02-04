'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { formatPrice } from '@/lib/orderUtils';
import { useCart } from '@/components/cart/CartContext';

export default function OrderConfirmationPage() {
    const params = useParams();
    const router = useRouter();
    const { clearCart } = useCart();
    const orderNumber = params.orderId as string;
    const [orderData, setOrderData] = useState<any>(null);

    useEffect(() => {
        // Retrieve order from localStorage
        const orders = JSON.parse(localStorage.getItem('roshniOrders') || '[]');
        const order = orders.find((o: any) => o.orderNumber === orderNumber);

        if (order) {
            setOrderData(order);
            clearCart(); // Clear cart now that order is confirmed
            // Send email notification
            sendEmailNotification(order);
        } else {
            // Order not found, redirect to home
            router.push('/');
        }
    }, [orderNumber, router, clearCart]);

    const sendEmailNotification = async (order: any) => {
        // This will be implemented with EmailJS
        // For now, we'll just log it
        console.log('Email notification would be sent for order:', order.orderNumber);

        // TODO: Implement EmailJS integration
        // const emailjs = require('@emailjs/browser');
        // await emailjs.send('service_id', 'template_id', templateParams, 'public_key');
    };

    if (!orderData) {
        return (
            <div className="min-h-screen bg-cream flex items-center justify-center">
                <div className="text-center">
                    <i className="fas fa-spinner fa-spin text-4xl text-primary mb-4"></i>
                    <p className="text-text-light">Loading order details...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-cream py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Success Message */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                        <i className="fas fa-check text-4xl text-green-600"></i>
                    </div>
                    <h1 className="font-heading text-4xl font-bold text-text-dark mb-2">
                        Order Confirmed!
                    </h1>
                    <p className="text-lg text-text-light">
                        Thank you for your order. We&apos;ve received it and will process it shortly.
                    </p>
                </div>

                {/* Order Number */}
                <div className="bg-gradient-to-r from-primary to-accent text-white rounded-2xl p-6 mb-8 text-center">
                    <p className="text-sm mb-2">Your Order Number</p>
                    <h2 className="font-heading text-3xl font-bold">{orderData.orderNumber}</h2>
                    <p className="text-sm mt-2 opacity-90">
                        Please save this number for tracking your order
                    </p>
                </div>

                {/* Order Details */}
                <div className="bg-white rounded-2xl p-8 shadow-md mb-8">
                    <h3 className="font-heading text-2xl font-bold text-text-dark mb-6">Order Details</h3>

                    {/* Customer Information */}
                    <div className="mb-6">
                        <h4 className="font-semibold text-text-dark mb-3">Customer Information</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-text-light">Name</p>
                                <p className="font-medium text-text-dark">{orderData.customer.name}</p>
                            </div>
                            <div>
                                <p className="text-text-light">Phone</p>
                                <p className="font-medium text-text-dark">{orderData.customer.phone}</p>
                            </div>
                            {orderData.customer.email && (
                                <div>
                                    <p className="text-text-light">Email</p>
                                    <p className="font-medium text-text-dark">{orderData.customer.email}</p>
                                </div>
                            )}
                            <div>
                                <p className="text-text-light">City</p>
                                <p className="font-medium text-text-dark">{orderData.customer.city}</p>
                            </div>
                            <div className="md:col-span-2">
                                <p className="text-text-light">Delivery Address</p>
                                <p className="font-medium text-text-dark">{orderData.customer.address}</p>
                            </div>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="mb-6">
                        <h4 className="font-semibold text-text-dark mb-3">Order Items</h4>
                        <div className="space-y-3">
                            {orderData.items.map((item: any, index: number) => (
                                <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100">
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
                    </div>

                    {/* Order Summary */}
                    <div className="border-t border-gray-200 pt-4">
                        <div className="space-y-2">
                            <div className="flex justify-between text-text-light">
                                <span>Subtotal</span>
                                <span>{formatPrice(orderData.subtotal)}</span>
                            </div>
                            <div className="flex justify-between text-text-light">
                                <span>Shipping</span>
                                <span>{formatPrice(orderData.shippingCost)}</span>
                            </div>
                            <div className="flex justify-between text-xl font-bold text-text-dark pt-2 border-t border-gray-200">
                                <span>Total</span>
                                <span>{formatPrice(orderData.total)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-text-light">Payment Method</p>
                                <p className="font-medium text-text-dark">
                                    {orderData.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Credit/Debit Card'}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-text-light">Order Status</p>
                                <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full">
                                    Pending
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Notes */}
                    {orderData.notes && (
                        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                            <p className="text-sm text-blue-800">
                                <i className="fas fa-sticky-note mr-2"></i>
                                <strong>Order Notes:</strong> {orderData.notes}
                            </p>
                        </div>
                    )}
                </div>

                {/* What's Next */}
                <div className="bg-white rounded-2xl p-8 shadow-md mb-8">
                    <h3 className="font-heading text-2xl font-bold text-text-dark mb-4">What&apos;s Next?</h3>
                    <div className="space-y-4">
                        <div className="flex items-start">
                            <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold mr-4">
                                1
                            </div>
                            <div>
                                <h4 className="font-semibold text-text-dark mb-1">Order Confirmation</h4>
                                <p className="text-sm text-text-light">
                                    We&apos;ve sent your order details to our team via WhatsApp. You&apos;ll receive a confirmation call/message shortly.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold mr-4">
                                2
                            </div>
                            <div>
                                <h4 className="font-semibold text-text-dark mb-1">Processing</h4>
                                <p className="text-sm text-text-light">
                                    Your order will be prepared and packed with care within 1-2 business days.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold mr-4">
                                3
                            </div>
                            <div>
                                <h4 className="font-semibold text-text-dark mb-1">Delivery</h4>
                                <p className="text-sm text-text-light">
                                    Your order will be delivered to your address within 2-4 business days.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Support */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="font-semibold text-text-dark mb-2">Need Help?</h4>
                            <p className="text-sm text-text-light">
                                Contact us on WhatsApp for any questions about your order
                            </p>
                        </div>
                        <a
                            href="https://wa.me/923004720117?text=Hi! I have a question about my order"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full transition-colors"
                        >
                            <i className="fab fa-whatsapp mr-2"></i>
                            Contact Us
                        </a>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/"
                        className="px-8 py-4 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-full text-center hover:shadow-lg transition-all"
                    >
                        Continue Shopping
                    </Link>
                    <button
                        onClick={() => window.print()}
                        className="px-8 py-4 bg-white border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-white transition-all"
                    >
                        <i className="fas fa-print mr-2"></i>
                        Print Order
                    </button>
                </div>
            </div>
        </div>
    );
}
