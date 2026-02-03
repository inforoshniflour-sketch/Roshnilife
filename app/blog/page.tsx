import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'Health Tips & Blog - ROSHNI Multi-Grain Flour',
    description: 'Discover health tips, nutrition advice, and wellness articles from ROSHNI.',
};

const blogPosts = [
    {
        id: 1,
        title: '10 Amazing Health Benefits of Multi-Grain Flour',
        image: '/images/blog-health.jpg',
        excerpt: 'Discover how switching to multi-grain flour can transform your health and well-being.',
        date: 'January 15, 2026',
        readTime: '5 min read',
        content: [
            'Multi-grain flour is a powerhouse of nutrition that combines the benefits of multiple grains into one wholesome product.',
            '1. Heart Health: Rich in fiber and whole grains that support cardiovascular health',
            '2. Weight Management: High fiber content keeps you fuller longer',
            '3. Better Digestion: Natural fiber promotes healthy gut function',
            '4. Energy Boost: Complex carbohydrates provide sustained energy',
            '5. Diabetes Management: Lower glycemic index helps regulate blood sugar',
        ],
    },
    {
        id: 2,
        title: 'Weight Loss Tips with Multi-Grain Products',
        image: '/images/blog-weight.jpg',
        excerpt: 'Learn how multi-grain flour can be your secret weapon for healthy weight management.',
        date: 'January 10, 2026',
        readTime: '4 min read',
        content: [
            'Maintaining a healthy weight doesn\'t mean giving up your favorite foods. Multi-grain flour offers a nutritious alternative.',
            '• Replace regular flour with multi-grain in all your recipes',
            '• High fiber content reduces hunger and cravings',
            '• Provides essential nutrients while managing calories',
            '• Supports metabolism with B vitamins and minerals',
            '• Helps maintain stable blood sugar levels',
        ],
    },
    {
        id: 3,
        title: 'Understanding Nutrition Labels',
        image: '/images/nutrition.png',
        excerpt: 'A complete guide to reading and understanding nutrition labels on flour products.',
        date: 'January 5, 2026',
        readTime: '6 min read',
        content: [
            'Understanding nutrition labels helps you make informed choices about the food you eat.',
            'Key things to look for:',
            '• Fiber content: Aim for at least 8-10g per 100g',
            '• Protein: Look for 10-12g per 100g',
            '• No artificial preservatives or additives',
            '• Whole grain ingredients listed first',
            '• Low sodium content',
        ],
    },
];

export default function BlogPage() {
    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="py-16 lg:py-24 bg-gradient-to-br from-primary-dark to-secondary-dark text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="font-heading text-5xl lg:text-6xl font-bold mb-6">Health Tips & Blog</h1>
                    <p className="text-xl max-w-3xl mx-auto">
                        Your guide to healthy living with multi-grain nutrition
                    </p>
                </div>
            </section>

            {/* Blog Posts */}
            <section className="py-16 lg:py-24 bg-cream">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-12">
                        {blogPosts.map((post) => (
                            <article key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-lg">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    {/* Image */}
                                    <div className="relative h-64 lg:h-full">
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="p-8 lg:p-12">
                                        <div className="flex items-center gap-4 text-sm text-text-light mb-4">
                                            <span className="flex items-center gap-1">
                                                <i className="fas fa-calendar"></i> {post.date}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <i className="fas fa-clock"></i> {post.readTime}
                                            </span>
                                        </div>

                                        <h2 className="font-heading text-3xl font-bold text-text-dark mb-4">
                                            {post.title}
                                        </h2>

                                        <p className="text-lg text-text-light mb-6">{post.excerpt}</p>

                                        <div className="space-y-3 text-text-light">
                                            {post.content.map((paragraph, index) => (
                                                <p key={index}>{paragraph}</p>
                                            ))}
                                        </div>

                                        <a
                                            href="https://wa.me/923004720117?text=Hi! I'd like to know more about healthy living with ROSHNI"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-full hover:shadow-lg transition-all"
                                        >
                                            <i className="fab fa-whatsapp"></i>
                                            <span>Ask Us More</span>
                                        </a>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter CTA */}
            <section className="py-16 lg:py-24 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="font-heading text-4xl font-bold text-text-dark mb-6">
                        Stay Updated with Health Tips
                    </h2>
                    <p className="text-lg text-text-light mb-8">
                        Get the latest nutrition advice and healthy recipes delivered to your inbox
                    </p>
                    <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="flex-1 px-6 py-3 rounded-full border-2 border-gray-300 focus:outline-none focus:border-primary"
                        />
                        <button
                            type="submit"
                            className="px-8 py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-full hover:shadow-lg transition-all"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
}
