'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/context/AuthContext';
import {
    Package,
    ArrowLeft,
    Loader2,
    ExternalLink,
    ChevronDown,
    ChevronUp
} from 'lucide-react';
import Link from 'next/link';
import { getUserOrders, Order } from '@/lib/orders';

export default function OrdersPage() {
    const { user, loading: authLoading } = useAuth();
    const t = useTranslations('Account');
    const router = useRouter();
    const { locale } = useParams();

    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState<Order[]>([]);
    const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push(`/${locale}/login`);
            return;
        }

        async function fetchOrders() {
            if (user) {
                try {
                    const data = await getUserOrders(user.uid);
                    setOrders(data);
                } catch (err) {
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            }
        }

        if (user) fetchOrders();
    }, [user, authLoading, locale, router]);

    const toggleOrder = (id: string) => {
        setExpandedOrder(expandedOrder === id ? null : id);
    };

    if (authLoading || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="animate-spin w-8 h-8 text-black dark:text-white" />
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 bg-gray-50 dark:bg-black transition-colors text-black dark:text-white">
            <div className="max-w-4xl mx-auto">
                <header className="mb-12 flex items-center gap-6">
                    <Link href={`/${locale}/account`} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <div>
                        <h1 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter">
                            {t('orders')}
                        </h1>
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">Account / Purchase History</p>
                    </div>
                </header>

                <div className="space-y-4">
                    {orders.length > 0 ? (
                        orders.map((order) => (
                            <div
                                key={order.id}
                                className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden"
                            >
                                <div
                                    onClick={() => toggleOrder(order.id)}
                                    className="p-6 md:p-8 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                                >
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 flex-1">
                                        <div>
                                            <p className="text-[8px] font-bold uppercase tracking-widest opacity-30 mb-1">{t('order_id')}</p>
                                            <p className="text-sm font-display font-bold uppercase">#{order.id.slice(-8).toUpperCase()}</p>
                                        </div>
                                        <div>
                                            <p className="text-[8px] font-bold uppercase tracking-widest opacity-30 mb-1">{t('date')}</p>
                                            <p className="text-sm font-light">
                                                {order.createdAt?.toDate().toLocaleDateString(locale as string)}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-[8px] font-bold uppercase tracking-widest opacity-30 mb-1">{t('status')}</p>
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-green-600">{order.status}</p>
                                        </div>
                                        <div>
                                            <p className="text-[8px] font-bold uppercase tracking-widest opacity-30 mb-1">{t('total')}</p>
                                            <p className="text-sm font-bold">{order.total} CZK</p>
                                        </div>
                                    </div>
                                    <div className="ml-4 opacity-20">
                                        {expandedOrder === order.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                    </div>
                                </div>

                                {expandedOrder === order.id && (
                                    <div className="border-t border-gray-100 dark:border-gray-800 p-8 bg-gray-50/50 dark:bg-gray-800/20">
                                        <div className="space-y-6">
                                            {order.items.map((item, idx) => (
                                                <div key={idx} className="flex items-center gap-6">
                                                    <div className="w-16 h-16 bg-white dark:bg-black border border-gray-100 dark:border-gray-800 shrink-0">
                                                        {item.image && (
                                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale" />
                                                        )}
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-sm font-bold uppercase tracking-tight">{item.name}</p>
                                                        <p className="text-[10px] opacity-40 font-bold uppercase">Qty: {item.quantity} × {item.price} CZK</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-sm font-bold">{item.quantity * item.price} CZK</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800 grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div>
                                                <p className="text-[8px] font-bold uppercase tracking-widest opacity-30 mb-4">{t('shipping')}</p>
                                                <address className="not-italic text-xs font-light space-y-1 opacity-60">
                                                    {order.shippingAddress.name}<br />
                                                    {order.shippingAddress.street}<br />
                                                    {order.shippingAddress.zipCode} {order.shippingAddress.city}<br />
                                                    {order.shippingAddress.country}
                                                </address>
                                            </div>
                                            <div className="flex flex-col justify-end items-end">
                                                <Link
                                                    href={`/${locale}/shop`}
                                                    className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:opacity-60 transition-opacity"
                                                >
                                                    Need Help? <ExternalLink className="w-3 h-3" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="py-20 text-center border-2 border-dashed border-gray-100 dark:border-gray-800">
                            <Package className="w-12 h-12 mx-auto mb-4 opacity-10" />
                            <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">{t('no_orders')}</p>
                            <Link
                                href={`/${locale}/shop`}
                                className="mt-6 inline-block bg-black dark:bg-white text-white dark:text-black px-8 py-3 text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-opacity"
                            >
                                {t('explore')}
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
