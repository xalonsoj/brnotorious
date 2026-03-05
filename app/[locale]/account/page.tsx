'use client';

import { useAuth } from '@/context/AuthContext';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { LogOut, Package, User, MapPin, Heart } from 'lucide-react';

export default function AccountPage() {
    const { user, loading, signOut } = useAuth();
    const tNav = useTranslations('Navigation');
    const tAcc = useTranslations('Account');
    const locale = useLocale();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push(`/${locale}/login`);
        }
    }, [user, loading, locale, router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black"></div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen pt-32 pb-20 px-4">
            <div className="max-w-4xl mx-auto">
                <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-6xl md:text-8xl font-display font-black uppercase tracking-tighter mb-4">
                            {tAcc('title')}
                        </h1>
                        <p className="text-gray-500 font-light flex items-center gap-2">
                            {user.email} <span className="opacity-20">|</span>
                            <button onClick={() => signOut()} className="text-black font-bold uppercase text-[10px] tracking-widest hover:opacity-60 transition-opacity">
                                {tAcc('signout')}
                            </button>
                        </p>
                    </div>
                    {user.photoURL && (
                        <img
                            src={user.photoURL}
                            alt={user.displayName || 'User'}
                            className="w-20 h-20 md:w-32 md:h-32 rounded-none border-4 border-white dark:border-gray-900 shadow-xl"
                        />
                    )}
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Orders Summary */}
                    <div className="bg-gray-50 dark:bg-gray-900/50 p-8 border border-gray-100 dark:border-gray-800 transition-colors">
                        <div className="flex items-center gap-4 mb-6">
                            <Package className="w-6 h-6" />
                            <h2 className="text-xl font-display font-bold uppercase tracking-tight">{tAcc('orders')}</h2>
                        </div>
                        <p className="text-gray-400 font-light italic mb-6">{tAcc('no_orders')}</p>
                        <button className="text-[10px] font-bold uppercase tracking-widest border-b border-black dark:border-white pb-1 hover:opacity-60 transition-opacity">
                            {tAcc('view_all_orders')}
                        </button>
                    </div>

                    {/* Profile & Settings */}
                    <div className="bg-gray-50 dark:bg-gray-900/50 p-8 border border-gray-100 dark:border-gray-800 transition-colors">
                        <div className="flex items-center gap-4 mb-6">
                            <User className="w-6 h-6" />
                            <h2 className="text-xl font-display font-bold uppercase tracking-tight">{tAcc('shipping')}</h2>
                        </div>
                        <address className="not-italic text-sm text-gray-500 font-light mb-6">
                            {tAcc('no_address')}<br />
                            Add your details to speed up checkout.
                        </address>
                        <button className="text-[10px] font-bold uppercase tracking-widest border-b border-black dark:border-white pb-1 hover:opacity-60 transition-opacity">
                            {tAcc('manage_addresses')}
                        </button>
                    </div>

                    {/* Wishlist Placeholder */}
                    <div className="md:col-span-2 bg-gray-50 dark:bg-gray-900/50 p-8 border border-gray-100 dark:border-gray-800 transition-colors">
                        <div className="flex items-center gap-4 mb-6">
                            <Heart className="w-6 h-6" />
                            <h2 className="text-xl font-display font-bold uppercase tracking-tight">{tAcc('collection')}</h2>
                        </div>
                        <p className="text-gray-400 font-light italic mb-6">{tAcc('no_collection')}</p>
                        <button className="text-[10px] font-bold uppercase tracking-widest border-b border-black dark:border-white pb-1 hover:opacity-60 transition-opacity">
                            {tAcc('explore')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
