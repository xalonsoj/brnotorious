"use client";

import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/store/useCart";
import { useUI } from "@/store/useUI";
import { useCurrency } from "@/store/useCurrency";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useHasHydrated } from "@/lib/hooks";

export default function CartDrawer() {
    const { isCartOpen, closeCart } = useUI();
    const { items, updateQuantity, removeFromCart, totalPrice } = useCart();
    const { formatPrice } = useCurrency();
    const locale = useLocale() as "en" | "cs";
    const t = useTranslations("Cart");
    const hasHydrated = useHasHydrated();

    if (!isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] overflow-hidden">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={closeCart}
            />

            {/* Drawer */}
            <div className="absolute inset-y-0 right-0 max-w-full flex">
                <div className="w-screen max-w-md bg-white dark:bg-black shadow-2xl flex flex-col transition-transform duration-500 ease-in-out transform">
                    {/* Header */}
                    <div className="px-6 py-8 border-b border-gray-100 dark:border-gray-900 flex justify-between items-center">
                        <h2 className="text-2xl font-display font-black uppercase tracking-tighter">
                            {t("title")}
                        </h2>
                        <button
                            onClick={closeCart}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-full transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Items List */}
                    <div className="flex-1 overflow-y-auto py-8 px-6 no-scrollbar">
                        {items.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                <ShoppingBag className="w-12 h-12 opacity-10" />
                                <p className="text-gray-500 font-light italic">
                                    {t("empty")}
                                </p>
                                <button
                                    onClick={closeCart}
                                    className="text-xs font-bold uppercase tracking-widest underline underline-offset-4"
                                >
                                    {t("continue_shopping")}
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-8">
                                {items.map((item) => {
                                    const variant = item.product.variants.find(v => v.id === item.variantId);
                                    const price = item.product.basePrice + (variant?.priceAdjustment || 0);

                                    return (
                                        <div key={`${item.productId}-${item.variantId}`} className="flex gap-4">
                                            <div className="relative w-24 h-32 bg-muted overflow-hidden flex-shrink-0">
                                                <Image
                                                    src={item.product.mainImage}
                                                    alt={item.product.name[locale]}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="flex-1 flex flex-col justify-between py-1">
                                                <div>
                                                    <div className="flex justify-between items-start">
                                                        <h3 className="text-sm font-bold uppercase tracking-tight leading-tight">
                                                            {item.product.name[locale]}
                                                        </h3>
                                                        <button
                                                            onClick={() => removeFromCart(item.productId, item.variantId)}
                                                            className="text-[10px] font-black uppercase tracking-widest opacity-30 hover:opacity-100 transition-opacity"
                                                        >
                                                            {t("remove")}
                                                        </button>
                                                    </div>
                                                    {variant && (
                                                        <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 mt-1">
                                                            Size/Variant: {variant.name[locale]}
                                                        </p>
                                                    )}
                                                </div>

                                                <div className="flex justify-between items-end">
                                                    <div className="flex items-center border border-gray-100 dark:border-gray-900">
                                                        <button
                                                            onClick={() => updateQuantity(item.productId, item.quantity - 1, item.variantId)}
                                                            className="p-1 px-2 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                                                        >
                                                            <Minus className="w-3 h-3" />
                                                        </button>
                                                        <span className="text-[10px] font-bold w-8 text-center">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variantId)}
                                                            className="p-1 px-2 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                                                        >
                                                            <Plus className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                    <p className="text-sm font-black">
                                                        {hasHydrated ? formatPrice(price * item.quantity) : ""}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Footer - Only visible if items exist */}
                    {items.length > 0 && (
                        <div className="p-6 pb-10 border-t border-gray-100 dark:border-gray-900 space-y-6 bg-white dark:bg-black">
                            <div className="flex justify-between items-end">
                                <span className="text-xs font-bold uppercase tracking-widest opacity-40">
                                    {t("total")}
                                </span>
                                <span className="text-2xl font-black">
                                    {hasHydrated ? formatPrice(totalPrice()) : ""}
                                </span>
                            </div>
                            <Link
                                href={`/${locale}/checkout`}
                                onClick={closeCart}
                                className="block w-full bg-black dark:bg-white text-white dark:text-black py-5 text-center text-sm font-black uppercase tracking-widest hover:opacity-90 transition-opacity"
                            >
                                {t("checkout")}
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
