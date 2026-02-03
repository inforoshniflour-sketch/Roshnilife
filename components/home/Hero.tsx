import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
    return (
        <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/hero-bg.jpg"
                    alt="Premium Multi-Grain Flour"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#2c2416]/80 to-[#6b5d4f]/60 z-10"></div>

            {/* Content */}
            <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 animate-fade-in-up">
                    <span className="block text-2xl sm:text-3xl lg:text-4xl font-normal text-primary-light mb-2">
                        Pure.
                    </span>
                    <span className="block text-2xl sm:text-3xl lg:text-4xl font-normal text-primary-light mb-2">
                        Nutritious.
                    </span>
                    <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        ROSHNI
                    </span>
                </h1>

                <p className="text-xl sm:text-2xl lg:text-3xl mb-4 animate-fade-in-up opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards]">
                    Premium Multi-Grain Flour for Healthy Living
                </p>

                <p className="text-base sm:text-lg max-w-2xl mx-auto mb-8 opacity-90 animate-fade-in-up opacity-0 [animation-delay:400ms] [animation-fill-mode:forwards]">
                    Experience the perfect blend of wheat, oats, millet, and barley - crafted for your
                    family&apos;s health and wellness.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up opacity-0 [animation-delay:600ms] [animation-fill-mode:forwards]">
                    <Link
                        href="#product"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                    >
                        <span>Shop Now</span>
                        <i className="fas fa-arrow-right"></i>
                    </Link>
                    <Link
                        href="#benefits"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-transparent text-white font-semibold rounded-full border-2 border-white hover:bg-white hover:text-primary transition-all"
                    >
                        <span>Learn More</span>
                    </Link>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white text-2xl animate-bounce-slow">
                <i className="fas fa-chevron-down"></i>
            </div>
        </section>
    );
}
