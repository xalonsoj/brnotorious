import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import Story from '@/components/Story';
import HomeDecor from '@/components/HomeDecor';
import Apparel from '@/components/Apparel';
import { mockProducts } from '@/lib/mockData';

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    return (
        <main className="min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-300">
            <Hero />
            <ProductGrid products={mockProducts.slice(0, 6)} />
            <Story />
            <HomeDecor />
            <Apparel />
        </main>
    );
}
