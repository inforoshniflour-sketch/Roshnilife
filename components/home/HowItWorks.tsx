export default function HowItWorks() {
    return (
        <section className="py-16 lg:py-24 bg-cream">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="font-heading text-4xl lg:text-5xl font-bold text-text-dark mb-4 relative inline-block">
                        How It Works
                        <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-primary to-accent rounded-full"></span>
                    </h2>
                    <p className="text-lg text-text-light mt-8">Simple 3-step process to get fresh flour delivered</p>
                </div>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                    {/* Step 1 */}
                    <div className="text-center space-y-4">
                        <div className="relative inline-block">
                            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary-light to-accent rounded-full flex items-center justify-center text-4xl text-white shadow-lg">
                                <i className="fas fa-shopping-cart"></i>
                            </div>
                            <div className="absolute -top-2 -right-2 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                                01
                            </div>
                        </div>
                        <h3 className="font-heading text-2xl font-bold text-text-dark">Browse & Select</h3>
                        <p className="text-text-light">
                            Choose your desired quantity of ROSHNI Multi-Grain Flour and add to cart
                        </p>
                    </div>

                    {/* Arrow */}
                    <div className="hidden md:flex justify-center">
                        <i className="fas fa-arrow-right text-4xl text-primary-light"></i>
                    </div>

                    {/* Step 2 */}
                    <div className="text-center space-y-4">
                        <div className="relative inline-block">
                            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary-light to-accent rounded-full flex items-center justify-center text-4xl text-white shadow-lg">
                                <i className="fas fa-truck"></i>
                            </div>
                            <div className="absolute -top-2 -right-2 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                                02
                            </div>
                        </div>
                        <h3 className="font-heading text-2xl font-bold text-text-dark">Fast Delivery</h3>
                        <p className="text-text-light">
                            We deliver fresh flour to your doorstep within 3-5 business days
                        </p>
                    </div>

                    {/* Arrow */}
                    <div className="hidden md:flex justify-center md:col-start-2">
                        <i className="fas fa-arrow-right text-4xl text-primary-light"></i>
                    </div>

                    {/* Step 3 */}
                    <div className="text-center space-y-4 md:col-start-3 md:row-start-1">
                        <div className="relative inline-block">
                            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary-light to-accent rounded-full flex items-center justify-center text-4xl text-white shadow-lg">
                                <i className="fas fa-smile-beam"></i>
                            </div>
                            <div className="absolute -top-2 -right-2 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                                03
                            </div>
                        </div>
                        <h3 className="font-heading text-2xl font-bold text-text-dark">Receive & Enjoy</h3>
                        <p className="text-text-light">
                            Start cooking healthy, delicious meals for your family
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
