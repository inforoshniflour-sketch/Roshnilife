'use client';

import type { Metadata } from 'next';
import { useState } from 'react';

const faqData = [
    {
        category: 'Product Information',
        questions: [
            {
                q: 'What grains are included in ROSHNI Multi-Grain Flour?',
                a: 'ROSHNI contains 11 carefully selected grains: Wheat (42%), Barley (21%), Oats (11%), Lentils, Flaxseed, Brown Rice, Soya, Psyllium, Fenugreek, and more.',
            },
            {
                q: 'Is ROSHNI flour 100% natural?',
                a: 'Yes! ROSHNI is 100% natural with no preservatives, artificial additives, or chemicals. Just pure, wholesome grains.',
            },
            {
                q: 'What is the nutritional value?',
                a: 'Per 100g: 12g protein, 14g fiber, essential vitamins (B1, B3, B9, E), and minerals (Iron, Magnesium, Zinc).',
            },
            {
                q: 'How is it different from regular wheat flour?',
                a: 'ROSHNI combines 11 grains for superior nutrition, higher fiber and protein content, and a more complete nutritional profile than single-grain flour.',
            },
        ],
    },
    {
        category: 'Ordering & Delivery',
        questions: [
            {
                q: 'How do I place an order?',
                a: 'Simply add items to your cart and checkout via WhatsApp. We\'ll confirm your order and arrange delivery.',
            },
            {
                q: 'What is the delivery time?',
                a: 'We deliver within 3-5 business days across India. Express delivery available in select cities.',
            },
            {
                q: 'Do you offer bulk orders?',
                a: 'Yes! Contact us via WhatsApp for special pricing on bulk orders for businesses, gyms, or large families.',
            },
            {
                q: 'What are the shipping charges?',
                a: 'Free shipping on orders above Rs. 1000. Standard shipping charges apply for smaller orders.',
            },
            {
                q: 'Can I track my order?',
                a: 'Yes, you\'ll receive tracking information via WhatsApp once your order is shipped.',
            },
        ],
    },
    {
        category: 'Usage & Storage',
        questions: [
            {
                q: 'How should I store the flour?',
                a: 'Store in an airtight container in a cool, dry place. Refrigeration extends freshness up to 6 months.',
            },
            {
                q: 'What is the shelf life?',
                a: 'When stored properly, ROSHNI flour stays fresh for 3-4 months at room temperature, 6 months refrigerated.',
            },
            {
                q: 'Can I use it for all recipes?',
                a: 'Yes! Use ROSHNI for rotis, parathas, bread, pancakes, cookies, and any recipe calling for flour.',
            },
            {
                q: 'Does it taste different?',
                a: 'ROSHNI has a slightly nutty, wholesome flavor that most customers love. It makes softer, more nutritious rotis.',
            },
        ],
    },
    {
        category: 'Payment & Returns',
        questions: [
            {
                q: 'What payment methods do you accept?',
                a: 'We accept UPI, credit/debit cards, net banking, and cash on delivery in select areas.',
            },
            {
                q: 'Do you have a return policy?',
                a: 'Yes, we offer a 7-day return policy if you\'re not satisfied. Contact us for hassle-free returns.',
            },
            {
                q: 'Is my payment information secure?',
                a: 'Absolutely! We use secure payment gateways and never store your payment information.',
            },
        ],
    },
];

export default function FAQPage() {
    const [openQuestion, setOpenQuestion] = useState<string | null>(null);

    const toggleQuestion = (questionId: string) => {
        setOpenQuestion(openQuestion === questionId ? null : questionId);
    };

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="py-16 lg:py-24 bg-gradient-to-br from-primary-dark to-secondary-dark text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="font-heading text-5xl lg:text-6xl font-bold mb-6">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-xl max-w-3xl mx-auto">
                        Find answers to common questions about ROSHNI Multi-Grain Flour
                    </p>
                </div>
            </section>

            {/* FAQ Content */}
            <section className="py-16 lg:py-24 bg-cream">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-8">
                        {faqData.map((category, categoryIndex) => (
                            <div key={categoryIndex}>
                                <h2 className="font-heading text-3xl font-bold text-text-dark mb-6">
                                    {category.category}
                                </h2>
                                <div className="space-y-4">
                                    {category.questions.map((item, questionIndex) => {
                                        const questionId = `${categoryIndex}-${questionIndex}`;
                                        const isOpen = openQuestion === questionId;

                                        return (
                                            <div
                                                key={questionId}
                                                className="bg-white rounded-xl overflow-hidden shadow-md"
                                            >
                                                <button
                                                    onClick={() => toggleQuestion(questionId)}
                                                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                                                >
                                                    <span className="font-semibold text-lg text-text-dark pr-4">
                                                        {item.q}
                                                    </span>
                                                    <i
                                                        className={`fas fa-chevron-${isOpen ? 'up' : 'down'} text-primary flex-shrink-0`}
                                                    ></i>
                                                </button>
                                                {isOpen && (
                                                    <div className="px-6 pb-4 text-text-light animate-fade-in-up">
                                                        {item.a}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Still Have Questions CTA */}
            <section className="py-16 lg:py-24 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="font-heading text-4xl font-bold text-text-dark mb-6">
                        Still Have Questions?
                    </h2>
                    <p className="text-lg text-text-light mb-8">
                        Our team is here to help! Reach out to us on WhatsApp
                    </p>
                    <a
                        href="https://wa.me/923004720117?text=Hi! I have a question about ROSHNI flour"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                    >
                        <i className="fab fa-whatsapp text-xl"></i>
                        <span>Contact Us on WhatsApp</span>
                    </a>
                </div>
            </section>
        </div>
    );
}
