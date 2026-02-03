import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'About Us - ROSHNI Multi-Grain Flour',
    description: 'Learn about ROSHNI\'s journey, mission, and commitment to providing premium multi-grain flour for healthy living.',
};

export default function AboutPage() {
    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="py-16 lg:py-24 bg-gradient-to-br from-primary-dark to-secondary-dark text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="font-heading text-5xl lg:text-6xl font-bold mb-6">About ROSHNI</h1>
                    <p className="text-xl max-w-3xl mx-auto">
                        Bringing health and nutrition to every home through our premium multi-grain flour
                    </p>
                </div>
            </section>

            {/* Our Story */}
            <section className="py-16 lg:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="font-heading text-4xl font-bold text-text-dark mb-6">Our Story</h2>
                            <div className="space-y-4 text-text-light leading-relaxed">
                                <p>
                                    ROSHNI was born from a simple belief: that healthy eating should be accessible to everyone. Our journey began when we noticed how difficult it was to find truly nutritious, multi-grain flour that didn&apos;t compromise on taste or quality.
                                </p>
                                <p>
                                    We spent years perfecting our blend, combining 11 carefully selected grains to create a flour that&apos;s not just healthy, but delicious. Each ingredient is sourced from trusted farmers and processed with care to preserve maximum nutrition.
                                </p>
                                <p>
                                    Today, ROSHNI serves thousands of families across India, helping them make healthier choices without sacrificing the foods they love.
                                </p>
                            </div>
                        </div>
                        <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg">
                            <Image
                                src="/images/manufacturing.jpg"
                                alt="ROSHNI Manufacturing"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission, Vision, Values */}
            <section className="py-16 lg:py-24 bg-cream">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-2xl shadow-md">
                            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mb-4">
                                <i className="fas fa-bullseye text-3xl text-white"></i>
                            </div>
                            <h3 className="font-heading text-2xl font-bold text-text-dark mb-4">Our Mission</h3>
                            <p className="text-text-light">
                                To provide premium, nutritious multi-grain flour that promotes healthy living and supports the well-being of families across India.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-md">
                            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mb-4">
                                <i className="fas fa-eye text-3xl text-white"></i>
                            </div>
                            <h3 className="font-heading text-2xl font-bold text-text-dark mb-4">Our Vision</h3>
                            <p className="text-text-light">
                                To become India&apos;s most trusted brand for healthy, natural multi-grain products, making nutritious eating simple and accessible.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-md">
                            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mb-4">
                                <i className="fas fa-heart text-3xl text-white"></i>
                            </div>
                            <h3 className="font-heading text-2xl font-bold text-text-dark mb-4">Our Values</h3>
                            <p className="text-text-light">
                                Quality, transparency, sustainability, and customer satisfaction guide everything we do at ROSHNI.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Manufacturing Process */}
            <section className="py-16 lg:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="font-heading text-4xl lg:text-5xl font-bold text-text-dark mb-4 relative inline-block">
                            Our Manufacturing Process
                            <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-primary to-accent rounded-full"></span>
                        </h2>
                        <p className="text-lg text-text-light mt-8">From farm to your kitchen with care</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { step: '01', title: 'Sourcing', description: 'Premium grains from trusted farmers', icon: 'fa-seedling' },
                            { step: '02', title: 'Cleaning', description: 'Thorough cleaning and quality check', icon: 'fa-check-circle' },
                            { step: '03', title: 'Grinding', description: 'Stone-ground to preserve nutrients', icon: 'fa-cog' },
                            { step: '04', title: 'Packaging', description: 'Sealed fresh for maximum quality', icon: 'fa-box' },
                        ].map((item, index) => (
                            <div key={index} className="text-center">
                                <div className="relative inline-block mb-4">
                                    <div className="w-20 h-20 bg-gradient-to-br from-primary-light to-accent rounded-full flex items-center justify-center">
                                        <i className={`fas ${item.icon} text-3xl text-white`}></i>
                                    </div>
                                    <div className="absolute -top-2 -right-2 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                                        {item.step}
                                    </div>
                                </div>
                                <h4 className="font-heading text-xl font-bold text-text-dark mb-2">{item.title}</h4>
                                <p className="text-text-light">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 lg:py-24 bg-gradient-to-br from-primary to-accent text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="font-heading text-4xl font-bold mb-6">Ready to Start Your Healthy Journey?</h2>
                    <p className="text-xl mb-8 opacity-90">
                        Join thousands of happy families who trust ROSHNI for their daily nutrition
                    </p>
                    <a
                        href="/#product"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-semibold rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                    >
                        <span>Shop Now</span>
                        <i className="fas fa-arrow-right"></i>
                    </a>
                </div>
            </section>
        </div>
    );
}
