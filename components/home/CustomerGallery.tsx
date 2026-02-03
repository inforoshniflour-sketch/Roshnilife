import Image from 'next/image';

export default function CustomerGallery() {
    const galleryItems = [
        {
            image: '/images/gallery-1.jpg',
            title: 'Cooking Together',
            description: 'Making memories with healthy meals',
        },
        {
            image: '/images/gallery-2.jpg',
            title: 'Nutritious Breakfast',
            description: 'Start your day right with multi-grain goodness',
        },
        {
            image: '/images/lifestyle.jpg',
            title: 'Fresh & Natural',
            description: 'Quality you can see and taste',
        },
    ];

    return (
        <section className="py-16 lg:py-24 bg-cream">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="font-heading text-4xl lg:text-5xl font-bold text-text-dark mb-4 relative inline-block">
                        Happy Families, Healthy Living
                        <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-primary to-accent rounded-full"></span>
                    </h2>
                    <p className="text-lg text-text-light mt-8">See how our customers are enjoying ROSHNI flour</p>
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {galleryItems.map((item, index) => (
                        <div
                            key={index}
                            className="group relative aspect-square rounded-2xl overflow-hidden shadow-lg cursor-pointer"
                        >
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                                <div className="p-6 text-white">
                                    <h4 className="font-heading text-2xl font-bold mb-2">{item.title}</h4>
                                    <p className="text-white/90">{item.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center">
                    <p className="text-lg text-text-dark mb-4">Share your ROSHNI moments with us!</p>
                    <a
                        href="https://wa.me/923004720117?text=Hi! I'd like to share my ROSHNI experience"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                    >
                        <i className="fab fa-whatsapp text-xl"></i>
                        <span>Share on WhatsApp</span>
                    </a>
                </div>
            </div>
        </section>
    );
}
