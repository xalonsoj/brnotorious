import { mockProducts } from "@/lib/mockData";
import ProductGrid from "@/components/ProductGrid";

export default async function ShopPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    return (
        <section className="pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <header className="mb-16">
                    <h1 className="text-6xl md:text-8xl font-display font-bold uppercase tracking-tighter mb-4">
                        The Shop
                    </h1>
                    <p className="text-xl text-gray-500 max-w-2xl font-light">
                        Explore our full collection of Brno-inspired design objects, apparel, and art prints.
                    </p>
                </header>
                <ProductGrid products={mockProducts} />
            </div>
        </section>
    );
}
