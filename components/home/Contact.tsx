'use client';

import { useState } from 'react';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const whatsappMessage = `📧 *New Contact Form Submission*\n\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n*Phone:* ${formData.phone}\n*Message:* ${formData.message}`;
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappNumber = '923004720117';

        window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');

        // Reset form
        setFormData({ name: '', email: '', phone: '', message: '' });
        alert('Message sent! We\'ll contact you soon.');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    return (
        <section id="contact" className="py-16 lg:py-24 bg-gradient-to-br from-primary-dark to-secondary-dark text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="font-heading text-4xl lg:text-5xl font-bold mb-4">Get in Touch</h2>
                            <p className="text-lg text-white/80">
                                Have questions? Want to place a bulk order? We&apos;re here to help!
                            </p>
                        </div>

                        <div className="space-y-6">
                            {/* Phone */}
                            <div className="flex items-start gap-4">
                                <i className="fas fa-phone text-2xl text-primary-light mt-1"></i>
                                <div>
                                    <h4 className="text-lg font-semibold mb-1">Phone</h4>
                                    <p className="text-white/80">+92 300 4720117</p>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex items-start gap-4">
                                <i className="fas fa-envelope text-2xl text-primary-light mt-1"></i>
                                <div>
                                    <h4 className="text-lg font-semibold mb-1">Email</h4>
                                    <p className="text-white/80">info@roshnilife.com</p>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="flex items-start gap-4">
                                <i className="fas fa-map-marker-alt text-2xl text-primary-light mt-1"></i>
                                <div>
                                    <h4 className="text-lg font-semibold mb-1">Location</h4>
                                    <p className="text-white/80">Eden Value Homes, Street 3, House 7, Multan Road, Lahore</p>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-4">
                            <a
                                href="#"
                                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-xl transition-colors"
                            >
                                <i className="fab fa-facebook"></i>
                            </a>
                            <a
                                href="#"
                                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-xl transition-colors"
                            >
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a
                                href="#"
                                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-xl transition-colors"
                            >
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a
                                href="https://wa.me/923004720117"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-xl transition-colors"
                            >
                                <i className="fab fa-whatsapp"></i>
                            </a>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
                        <h3 className="font-heading text-2xl font-bold mb-6">Send us a Message</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your Name"
                                required
                                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-primary-light transition-colors"
                            />
                            <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Your Email"
                                required
                                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-primary-light transition-colors"
                            />
                            <input
                                type="tel"
                                id="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Your Phone"
                                required
                                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-primary-light transition-colors"
                            />
                            <textarea
                                id="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows={5}
                                placeholder="Your Message"
                                required
                                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-primary-light transition-colors resize-none"
                            ></textarea>
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-primary to-accent text-white py-4 rounded-full font-semibold text-lg flex items-center justify-center gap-2 hover:shadow-lg transition-all hover:-translate-y-0.5"
                            >
                                <span>Send Message</span>
                                <i className="fas fa-paper-plane"></i>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
