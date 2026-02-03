export default function Testimonials() {
    const testimonials = [
        {
            rating: 5,
            text: 'ROSHNI multi-grain flour has transformed our family\'s health! The taste is amazing and we feel so much better. Highly recommended!',
            author: 'Ayesha Khan',
            location: 'Lahore',
        },
        {
            rating: 5,
            text: 'Best quality flour I\'ve ever used. My rotis are softer and my family loves the nutty flavor. Worth every rupee!',
            author: 'Ahmed Ali',
            location: 'Karachi',
        },
        {
            rating: 5,
            text: 'As a fitness enthusiast, I\'m very particular about what I eat. ROSHNI\'s multi-grain flour is perfect for my diet. Excellent product!',
            author: 'Fatima Malik',
            location: 'Islamabad',
        },
    ];

    return (
        <section id="testimonials" className="py-16 lg:py-24 bg-cream">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="font-heading text-4xl lg:text-5xl font-bold text-text-dark mb-4 relative inline-block">
                        What Our Customers Say
                        <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-primary to-accent rounded-full"></span>
                    </h2>
                    <p className="text-lg text-text-light mt-8">Join thousands of happy families</p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-white p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                        >
                            {/* Rating */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <i key={i} className="fas fa-star text-yellow-500"></i>
                                ))}
                            </div>

                            {/* Text */}
                            <p className="text-text-light italic leading-relaxed mb-6">&quot;{testimonial.text}&quot;</p>

                            {/* Author */}
                            <div>
                                <h4 className="font-heading text-lg font-bold text-text-dark">
                                    {testimonial.author}
                                </h4>
                                <span className="text-text-light text-sm">{testimonial.location}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
