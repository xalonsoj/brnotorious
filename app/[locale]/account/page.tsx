'use client';

import { useAuth } from '@/context/AuthContext';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LogOut, Package, User, MapPin, Heart, ChevronRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { getUserOrders, Order } from '@/lib/orders';

export default function AccountPage() {
    const { user, loading, signOut } = useAuth();
    const tAcc = useTranslations('Account');
    const locale = useLocale();
    const router = useRouter();
    const [lastOrder, setLastOrder] = useState<Order | null>(null);
    const [fetchingOrders, setFetchingOrders] = useState(true);

    useEffect(() => {
        if (!loading && !user) {
            router.push(`/${locale}/login`);
            return;
        }

        async function fetchOrders() {
            if (user) {
                const orders = await getUserOrders(user.uid);
                if (orders.length > 0) {
                    setLastOrder(orders[0]);
                }
                setFetchingOrders(false);
            }
        }

        if (user) fetchOrders();
    }, [user, loading, locale, router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="animate-spin h-8 w-8 text-black dark:text-white" />
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 bg-gray-50 dark:bg-black transition-colors">
            <div className="max-w-4xl mx-auto">
                <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-6xl md:text-8xl font-display font-black uppercase tracking-tighter mb-4">
                            {tAcc('title')}
                        </h1>
                        <div className="flex items-center gap-4">
                            <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">{user.email}</p>
                            <span className="opacity-10 text-[10px]">|</span>
                            <button
                                onClick={() => signOut()}
                                className="text-black dark:text-white font-bold uppercase text-[10px] tracking-widest hover:opacity-60 transition-opacity"
                            >
                                {tAcc('signout')}
                            </button>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Orders Summary */}
                    <div className="bg-white dark:bg-gray-900 p-8 border border-gray-100 dark:border-gray-800 shadow-sm transition-all hover:shadow-md">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-4">
                                <Package className="w-5 h-5" />
                                <h2 className="text-xs font-bold uppercase tracking-[0.2em]">{tAcc('orders')}</h2>
                            </div>
                        </div>

                        {fetchingOrders ? (
                            <Loader2 className="w-4 h-4 animate-spin opacity-20" />
                        ) : lastOrder ? (
                            <div className="mb-6">
                                <p className="text-[10px] font-bold uppercase tracking-widest opacity-30 mb-2">Latest Order</p>
                                <p className="text-lg font-display font-bold mb-1">#{lastOrder.id.slice(-6).toUpperCase()}</p>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-green-600">{lastOrder.status}</p>
                            </div>
                        ) : (
                            <p className="text-[10px] font-bold uppercase tracking-widest opacity-30 mb-6 italic">{tAcc('no_orders')}</p>
                        )}

                        <Link
                            href={`/${locale}/account/orders`}
                            className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 group border-b border-transparent hover:border-black dark:hover:border-white w-fit transition-all pb-1"
                        >
                            {tAcc('view_all_orders')}
                            <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {/* Shipping & Adresses */}
                    <div className="bg-white dark:bg-gray-900 p-8 border border-gray-100 dark:border-gray-800 shadow-sm transition-all hover:shadow-md">
                        <div className="flex items-center gap-4 mb-6">
                            <MapPin className="w-5 h-5" />
                            <h2 className="text-xs font-bold uppercase tracking-[0.2em]">{tAcc('shipping')}</h2>
                        </div>

                        <p className="text-[10px] font-bold uppercase tracking-widest opacity-30 mb-6 leading-relaxed">
                            {tAcc('no_address')}<br />
                            Manage your delivery destinations.
                        </p>

                        <Link
                            href={`/${locale}/account/settings`}
                            className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 group border-b border-transparent hover:border-black dark:hover:border-white w-fit transition-all pb-1"
                        >
                            {tAcc('manage_addresses')}
                            <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {/* Collection / Wishlist */}
                    <div className="md:col-span-2 bg-white dark:bg-gray-900 p-8 border border-gray-100 dark:border-gray-800 shadow-sm transition-all hover:shadow-md">
                        <div className="flex items-center gap-4 mb-6">
                            <Heart className="w-5 h-5" />
                            <h2 className="text-xs font-bold uppercase tracking-[0.2em]">{tAcc('collection')}</h2>
                        </div>

                        <p className="text-[10px] font-bold uppercase tracking-widest opacity-30 mb-6 italic">{tAcc('no_collection')}</p>

                        <Link
                            href={`/${locale}/shop`}
                            className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 group border-b border-transparent hover:border-black dark:hover:border-white w-fit transition-all pb-1"
                        >
                            {tAcc('explore')}
                            <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
