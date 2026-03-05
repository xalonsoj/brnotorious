import Link from 'next/link';
import ProductCard from './ProductCard';
import { Product } from '@/types/product';
import { useLocale } from 'next-intl';

export default function ProductGrid({ products = [] }: { products: Product[] }) {
    const locale = useLocale();
    return (
        <div className="bg-background-light dark:bg-background-dark transition-colors duration-300">
            {/* Category Bar */}
            <div className="py-6 border-b border-gray-100 dark:border-gray-800">
                <div className="px-4 md:max-w-7xl md:mx-auto overflow-x-auto no-scrollbar flex space-x-4">
                    <button className="whitespace-nowrap px-5 py-2 rounded-full border border-gray-200 dark:border-gray-700 text-[10px] font-bold uppercase tracking-widest font-display hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">Abstract</button>
                    <button className="whitespace-nowrap px-5 py-2 rounded-full bg-black text-white border border-black text-[10px] font-bold uppercase tracking-widest font-display">Born in Brno</button>
                    <button className="whitespace-nowrap px-5 py-2 rounded-full border border-gray-200 dark:border-gray-700 text-[10px] font-bold uppercase tracking-widest font-display hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">For Business</button>
                    <button className="whitespace-nowrap px-5 py-2 rounded-full border border-gray-200 dark:border-gray-700 text-[10px] font-bold uppercase tracking-widest font-display hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">Home Decor</button>
                </div>
            </div>

            <div className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-10 md:mb-16">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-2 md:mb-3 tracking-tight uppercase">
                            OMG! Picks <span className="text-2xl">🔥</span>
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base font-light">
                            Curated favorites for the modern apartment.
                        </p>
                    </div>
                    <Link
                        href={`/${locale}/shop`}
                        className="hidden md:flex items-center font-bold uppercase text-xs tracking-widest border-b border-gray-300 dark:border-gray-700 pb-1 hover:border-black dark:hover:border-white transition-colors font-display"
                    >
                        View All Products
                    </Link>
                </div>

                <div className="asym-grid">
                    {products.map((product, index) => {
                        let spanClass = "";
                        // Apply asymmetric classes for visual variety based on index
                        if (index === 0) spanClass = "asym-item-large";
                        else if (index === 1) spanClass = "asym-item-tall";
                        else if (index === 4) spanClass = "asym-item-wide";

                        return (
                            <div key={product.id} className={spanClass}>
                                <ProductCard product={product} />
                            </div>
                        );
                    })}
                </div>

                {products.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-500 font-light italic">No products found in this category.</p>
                    </div>
                )}

                <div className="mt-12 text-center md:hidden">
                    <Link
                        href={`/${locale}/shop`}
                        className="block w-full border-2 border-black dark:border-white text-black dark:text-white px-8 py-4 font-bold uppercase text-xs font-display tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                    >
                        View All Products
                    </Link>
                </div>
            </div>
        </div>
    );
}


