import Image from 'next/image';

export default function NutritionFacts() {
    return (
        <section className="py-16 lg:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <div className="space-y-6">
                        <h2 className="font-heading text-4xl lg:text-5xl font-bold text-text-dark">
                            Nutritional Powerhouse
                        </h2>
                        <p className="text-lg text-text-light">
                            ROSHNI Multi-Grain Flour is packed with essential nutrients that your body needs. Our
                            unique blend provides a complete nutritional profile:
                        </p>

                        <div className="space-y-4">
                            {/* High Protein */}
                            <div className="flex items-start gap-4 p-4 bg-cream rounded-xl">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-light to-accent flex items-center justify-center flex-shrink-0">
                                    <i className="fas fa-dumbbell text-white text-xl"></i>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg text-text-dark mb-1">High Protein</h4>
                                    <p className="text-text-light">12g per 100g - Supports muscle growth and repair</p>
                                </div>
                            </div>

                            {/* Rich in Fiber */}
                            <div className="flex items-start gap-4 p-4 bg-cream rounded-xl">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-light to-accent flex items-center justify-center flex-shrink-0">
                                    <i className="fas fa-seedling text-white text-xl"></i>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg text-text-dark mb-1">Rich in Fiber</h4>
                                    <p className="text-text-light">14g per 100g - Promotes digestive health</p>
                                </div>
                            </div>

                            {/* Essential Vitamins */}
                            <div className="flex items-start gap-4 p-4 bg-cream rounded-xl">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-light to-accent flex items-center justify-center flex-shrink-0">
                                    <i className="fas fa-bolt text-white text-xl"></i>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg text-text-dark mb-1">Essential Vitamins</h4>
                                    <p className="text-text-light">B1, B3, B9, E - Boosts energy and immunity</p>
                                </div>
                            </div>

                            {/* Key Minerals */}
                            <div className="flex items-start gap-4 p-4 bg-cream rounded-xl">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-light to-accent flex items-center justify-center flex-shrink-0">
                                    <i className="fas fa-gem text-white text-xl"></i>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg text-text-dark mb-1">Key Minerals</h4>
                                    <p className="text-text-light">Iron, Magnesium, Zinc - Supports overall health</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Nutrition Image */}
                    <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg">
                        <Image
                            src="/images/nutrition.png"
                            alt="Nutrition Facts Infographic"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
