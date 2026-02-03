export default function Benefits() {
    const benefits = [
        {
            icon: 'fa-heart',
            title: 'Heart Healthy',
            description:
                'Rich in fiber and whole grains that support cardiovascular health and reduce cholesterol levels.',
        },
        {
            icon: 'fa-dumbbell',
            title: 'High in Protein',
            description:
                'Packed with plant-based protein to support muscle growth and overall body strength.',
        },
        {
            icon: 'fa-leaf',
            title: '100% Natural',
            description:
                'No chemicals, no preservatives - just pure, natural grains carefully selected and stone-ground.',
        },
        {
            icon: 'fa-weight',
            title: 'Weight Management',
            description:
                'High fiber content keeps you fuller longer, helping maintain a healthy weight naturally.',
        },
        {
            icon: 'fa-seedling',
            title: 'Rich in Nutrients',
            description:
                'Loaded with vitamins, minerals, and antioxidants from multiple grain sources.',
        },
        {
            icon: 'fa-smile',
            title: 'Better Digestion',
            description:
                'Natural fiber promotes healthy digestion and supports gut health for the whole family.',
        },
    ];

    return (
        <section id="benefits" className="py-16 lg:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="font-heading text-4xl lg:text-5xl font-bold text-text-dark mb-4 relative inline-block">
                        Why Choose ROSHNI?
                        <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-primary to-accent rounded-full"></span>
                    </h2>
                    <p className="text-lg text-text-light mt-8">Health benefits that make a difference</p>
                </div>

                {/* Benefits Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            className="bg-cream p-8 rounded-2xl text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                        >
                            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary-light to-accent rounded-full flex items-center justify-center">
                                <i className={`fas ${benefit.icon} text-3xl text-white`}></i>
                            </div>
                            <h3 className="font-heading text-2xl font-bold text-text-dark mb-3">
                                {benefit.title}
                            </h3>
                            <p className="text-text-light leading-relaxed">{benefit.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
