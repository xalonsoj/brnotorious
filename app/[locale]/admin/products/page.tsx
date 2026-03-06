'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/context/AuthContext';
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    Loader2,
    ArrowLeft,
    ExternalLink,
    Package,
    Tag
} from 'lucide-react';
import Link from 'next/link';
import { getProducts, deleteProduct, Product } from '@/lib/products';

export default function AdminProductsPage() {
    const { user, isAdmin, loading: authLoading } = useAuth();
    const t = useTranslations('Products');
    const router = useRouter();
    const { locale } = useParams();

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (!authLoading && (!user || !isAdmin)) {
            router.push(`/${locale}`);
            return;
        }

        async function fetchProducts() {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        }

        if (!authLoading && isAdmin) {
            fetchProducts();
        }
    }, [user, isAdmin, authLoading, locale, router]);

    const handleDelete = async (product: Product) => {
        if (window.confirm(t('confirm_delete'))) {
            try {
                setLoading(true);
                await deleteProduct(product.id, product.images);
                setProducts(prev => prev.filter(p => p.id !== product.id));
            } catch (error) {
                console.error('Error deleting product:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (authLoading || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="animate-spin w-8 h-8" />
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 bg-gray-50 dark:bg-black transition-colors">
            <div className="max-w-6xl mx-auto">
                <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <Link href={`/${locale}/admin`} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-full transition-colors">
                            <ArrowLeft className="w-6 h-6" />
                        </Link>
                        <div>
                            <h1 className="text-6xl font-display font-black uppercase tracking-tighter">
                                {t('title')}
                            </h1>
                            <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">Command Center / Inventory</p>
                        </div>
                    </div>

                    <Link
                        href={`/${locale}/admin/products/new`}
                        className="bg-black dark:bg-white text-white dark:text-black px-6 py-4 font-bold uppercase tracking-widest text-[10px] flex items-center gap-2 hover:opacity-90 transition-opacity"
                    >
                        <Plus className="w-4 h-4" />
                        {t('add_new')}
                    </Link>
                </header>

                <div className="mb-8 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-20" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-4 pl-12 focus:border-black dark:focus:border-white outline-none transition-colors font-light text-sm"
                    />
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {filteredProducts.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white dark:bg-gray-900 p-4 md:p-6 border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row items-center gap-6 hover:shadow-lg transition-all"
                        >
                            <div className="w-24 h-24 bg-gray-50 dark:bg-black border border-gray-100 dark:border-gray-800 overflow-hidden shrink-0">
                                {product.images[0] ? (
                                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center opacity-10">
                                        <Package className="w-8 h-8" />
                                    </div>
                                )}
                            </div>

                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-xl font-display font-bold uppercase mb-1">{product.name}</h3>
                                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                    <span className="flex items-center gap-1 text-[8px] font-bold uppercase tracking-widest opacity-40">
                                        <Tag className="w-3 h-3" />
                                        {product.category}
                                    </span>
                                    <span className="text-[8px] font-bold uppercase tracking-widest opacity-40">
                                        Stock: {product.stock}
                                    </span>
                                    <span className="text-[8px] font-bold uppercase tracking-widest opacity-40">
                                        {product.price} CZK
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <Link
                                    href={`/${locale}/shop/${product.id}`}
                                    className="p-3 hover:bg-gray-50 dark:hover:bg-gray-800 border border-transparent hover:border-gray-100 dark:hover:border-gray-700 transition-all"
                                >
                                    <ExternalLink className="w-4 h-4 opacity-40" />
                                </Link>
                                <Link
                                    href={`/${locale}/admin/products/${product.id}`}
                                    className="p-3 hover:bg-gray-50 dark:hover:bg-gray-800 border border-transparent hover:border-gray-100 dark:hover:border-gray-700 transition-all text-black dark:text-white"
                                >
                                    <Edit2 className="w-4 h-4 opacity-40" />
                                </Link>
                                <button
                                    onClick={() => handleDelete(product)}
                                    className="p-3 hover:bg-red-50 dark:hover:bg-red-900/20 border border-transparent hover:border-red-100 dark:hover:border-red-900/50 transition-all text-red-500"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}

                    {filteredProducts.length === 0 && (
                        <div className="py-20 text-center border-2 border-dashed border-gray-100 dark:border-gray-800">
                            <Package className="w-12 h-12 mx-auto mb-4 opacity-10" />
                            <p className="text-xs font-bold uppercase tracking-widest opacity-40">No products found</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
