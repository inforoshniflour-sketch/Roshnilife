import Hero from '@/components/home/Hero';
import ProductShowcase from '@/components/home/ProductShowcase';
import HowItWorks from '@/components/home/HowItWorks';
import NutritionFacts from '@/components/home/NutritionFacts';
import CustomerGallery from '@/components/home/CustomerGallery';
import Benefits from '@/components/home/Benefits';
import Testimonials from '@/components/home/Testimonials';
import Contact from '@/components/home/Contact';

export default function Home() {
    return (
        <>
            <Hero />
            <ProductShowcase />
            <HowItWorks />
            <NutritionFacts />
            <CustomerGallery />
            <Benefits />
            <Testimonials />
            <Contact />
        </>
    );
}
