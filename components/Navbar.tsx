'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Search, Menu, X, Globe, CreditCard, User as UserIcon } from 'lucide-react';
import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useCart } from "@/store/useCart";
import { useUI } from "@/store/useUI";
import { useAuth } from "@/context/AuthContext";
import CurrencySwitcher from "./CurrencySwitcher";
import { useHasHydrated } from "@/lib/hooks";

export default function Navbar() {
    const { user, isAdmin } = useAuth();
    const locale = useLocale();
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const t = useTranslations('Navigation');
    const totalItems = useCart((state) => state.totalItems());
    const { openCart } = useUI();
    const hasHydrated = useHasHydrated();

    const navLinks = [
        { href: '/shop', label: t('shop') },
        { href: '/shop/prints', label: t('prints') },
        { href: '/shop/apparel', label: t('apparel') },
        { href: '/journal', label: t('journal') },
        { href: '/story', label: t('story') },
    ];



    return (
        <nav className="fixed w-full z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 md:h-20">
                    {/* Left: Mobile Menu Toggle & Logo */}
                    <div className="flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="lg:hidden p-2 -ml-2 rounded-md transition-colors"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>

                        <Link href={`/${locale}`} className="flex items-center ml-2 lg:ml-0 gap-2">
                            <span className="font-display font-black text-xl md:text-2xl tracking-tighter uppercase">
                                Brnotorious
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex ml-12 space-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={`/${locale}${link.href}`}
                                    className="text-[10px] font-bold hover:opacity-60 transition-opacity uppercase tracking-[0.2em]"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center space-x-4 md:space-x-8">
                        {/* Desktop Only: Settings */}
                        <div className="hidden md:flex flex-col items-end gap-0.5">
                            <LocaleSwitcher />
                            <CurrencySwitcher />
                        </div>

                        {/* User / Account */}
                        <div className="flex items-center">
                            {user ? (
                                <Link
                                    href={`/${locale}/${isAdmin ? 'admin' : 'account'}`}
                                    className="flex items-center gap-2 group"
                                >
                                    <span className="hidden sm:inline text-[10px] font-black uppercase tracking-[0.2em] group-hover:opacity-60 transition-opacity">
                                        {isAdmin ? 'Admin' : t('account')}
                                    </span>
                                    {user.photoURL ? (
                                        <img
                                            src={user.photoURL}
                                            alt={user.displayName || 'User'}
                                            className="w-5 h-5 md:w-6 md:h-6 rounded-full border border-gray-200 dark:border-gray-800"
                                        />
                                    ) : (
                                        <UserIcon className="w-5 h-5 md:w-6 md:h-6" />
                                    )}
                                </Link>
                            ) : (
                                <Link
                                    href={`/${locale}/login`}
                                    className="flex items-center gap-2 group"
                                >
                                    <span className="hidden sm:inline text-[10px] font-black uppercase tracking-[0.2em] group-hover:opacity-60 transition-opacity">
                                        {t('login')}
                                    </span>
                                    <UserIcon className="w-5 h-5 md:w-6 md:h-6" />
                                </Link>
                            )}
                        </div>

                        {/* Cart */}
                        <button
                            onClick={openCart}
                            className="flex items-center gap-2 group"
                        >
                            <span className="hidden sm:inline text-[10px] font-black uppercase tracking-[0.2em] group-hover:opacity-60 transition-opacity">
                                {t('cart')}
                            </span>
                            <div className="relative">
                                <ShoppingBag className="w-5 h-5 md:w-6 md:h-6" />
                                {hasHydrated && totalItems > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-black text-white dark:bg-white dark:text-black text-[8px] font-black w-4 h-4 flex items-center justify-center rounded-full">
                                        {totalItems}
                                    </span>
                                )}
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`lg:hidden fixed inset-0 top-16 bg-white dark:bg-black transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} z-40`}>
                <div className="flex flex-col p-8 space-y-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={`/${locale}${link.href}`}
                            onClick={() => setIsMenuOpen(false)}
                            className="text-4xl font-display font-bold uppercase tracking-tighter border-b border-gray-100 dark:border-gray-900 pb-4"
                        >
                            {link.label}
                        </Link>
                    ))}

                    <div className="pt-8 flex flex-col gap-6">
                        <div className="flex items-center gap-4">
                            <Globe className="w-5 h-5 opacity-40" />
                            <LocaleSwitcher />
                        </div>
                        <div className="flex items-center gap-4">
                            <CreditCard className="w-5 h-5 opacity-40" />
                            <CurrencySwitcher />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

function LocaleSwitcher() {
    return (
        <div className="flex gap-2 text-[10px] font-bold uppercase opacity-60">
            <Link href="/en" className="hover:opacity-100 transition-opacity">EN</Link>
            <span>/</span>
            <Link href="/cs" className="hover:opacity-100 transition-opacity">CS</Link>
        </div>
    );
}
