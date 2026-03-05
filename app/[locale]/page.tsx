import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import Story from '@/components/Story';
import HomeDecor from '@/components/HomeDecor';
import Apparel from '@/components/Apparel';

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    return (
        <main className="min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-300">
            <Hero />
            <ProductGrid />
            <Story />
            <HomeDecor />
            <Apparel />
        </main>
    );
}
