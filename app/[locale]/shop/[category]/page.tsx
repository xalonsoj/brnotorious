import { mockProducts } from "@/lib/mockData";
import ProductGrid from "@/components/ProductGrid";
import { notFound } from "next/navigation";

export default async function CategoryPage({
    params
}: {
    params: Promise<{ locale: string; category: string }>
}) {
    const { locale, category } = await params;

    const validCategories = ['prints', 'apparel', 'decor'];
    if (!validCategories.includes(category)) {
        notFound();
    }

    const filteredProducts = mockProducts.filter(p => p.category === category);

    return (
        <section className="pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <header className="mb-16">
                    <h1 className="text-6xl md:text-8xl font-display font-bold uppercase tracking-tighter mb-4">
                        {category}
                    </h1>
                    <p className="text-xl text-gray-500 max-w-2xl font-light capitalize">
                        Collection 02 / {category}
                    </p>
                </header>
                <ProductGrid products={filteredProducts} />
            </div>
        </section>
    );
}
