'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { LayoutDashboard, ShoppingCart, Users, Package, TrendingUp, Settings, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { getProducts } from '@/lib/products';

export default function AdminDashboard() {
    const { user, loading: authLoading, isAdmin } = useAuth();
    const locale = useLocale();
    const router = useRouter();
    const t = useTranslations('Admin');
    const [productCount, setProductCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && (!user || !isAdmin)) {
            router.push(`/${locale}`);
            return;
        }

        async function fetchData() {
            try {
                const products = await getProducts();
                setProductCount(products.length);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        if (isAdmin) fetchData();
    }, [user, authLoading, isAdmin, locale, router]);

    if (authLoading || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="animate-spin h-8 w-8 text-black dark:text-white" />
            </div>
        );
    }

    if (!isAdmin) return null;

    const stats = [
        { label: t('revenue'), value: 'CZK 0.00', icon: TrendingUp, color: 'text-green-500' },
        { label: t('active_orders'), value: '0', icon: ShoppingCart, color: 'text-blue-500' },
        { label: t('customers'), value: '1', icon: Users, color: 'text-purple-500' },
        { label: t('products'), value: productCount.toString(), icon: Package, color: 'text-orange-500' },
    ];

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 bg-gray-50 dark:bg-black transition-colors">
            <div className="max-w-7xl mx-auto">
                <header className="mb-12">
                    <h1 className="text-6xl md:text-8xl font-display font-black uppercase tracking-tighter mb-4">
                        {t('title')}
                    </h1>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">{t('subtitle')}</p>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                    {stats.map((stat) => (
                        <div key={stat.label} className="bg-white dark:bg-gray-900 p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                                <span className="text-[8px] font-black uppercase tracking-widest opacity-30">{t('realtime')}</span>
                            </div>
                            <p className="text-2xl font-display font-bold mb-1">{stat.value}</p>
                            <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Management Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Main Actions */}
                    <div className="md:col-span-2 space-y-4">
                        <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-6">{t('quick_actions')}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Link
                                href={`/${locale}/admin/products`}
                                className="group bg-black dark:bg-white text-white dark:text-black p-8 flex flex-col justify-between h-48 hover:opacity-90 transition-opacity"
                            >
                                <Package className="w-8 h-8" />
                                <div>
                                    <p className="text-xl font-display font-bold uppercase mb-1">{t('add_product')}</p>
                                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Inventory Management</p>
                                </div>
                            </Link>
                            <Link
                                href={`/${locale}/admin/orders`}
                                className="group bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-8 flex flex-col justify-between h-48 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            >
                                <ShoppingCart className="w-8 h-8" />
                                <div>
                                    <p className="text-xl font-display font-bold uppercase mb-1">{t('orders')}</p>
                                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">Fulfillment Center</p>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Secondary Management */}
                    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-8">
                        <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-8">System</h2>
                        <div className="space-y-6">
                            <button className="flex items-center gap-4 group w-full text-left">
                                <div className="p-3 bg-gray-50 dark:bg-gray-800 transition-colors">
                                    <Users className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest">{t('customers')}</p>
                                    <p className="text-[8px] opacity-40 font-bold uppercase">Manage Access</p>
                                </div>
                            </button>
                            <button className="flex items-center gap-4 group w-full text-left">
                                <div className="p-3 bg-gray-50 dark:bg-gray-800 transition-colors">
                                    <Settings className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest">{t('settings')}</p>
                                    <p className="text-[8px] opacity-40 font-bold uppercase">Store Configuration</p>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
