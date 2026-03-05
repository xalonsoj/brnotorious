"use client";

import { useCart } from "@/store/useCart";
import { useCurrency } from "@/store/useCurrency";
import { useLocale, useTranslations } from "next-intl";
import { useHasHydrated } from "@/lib/hooks";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, ChevronLeft, Loader2 } from "lucide-react";
import { useState } from "react";

export default function CheckoutPage() {
    const { items, totalPrice } = useCart();
    const { formatPrice } = useCurrency();
    const locale = useLocale() as "en" | "cs";
    const t = useTranslations("Cart");
    const hasHydrated = useHasHydrated();
    const [isLoading, setIsLoading] = useState(false);

    const handleCheckout = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    items,
                    locale,
                }),
            });

            const data = await response.json();

            if (data.id) {
                // Redirect to Stripe Checkout
                window.location.href = `https://checkout.stripe.com/pay/${data.id}`;
            } else {
                alert("Checkout error: " + (data.error || "Unknown error"));
            }
        } catch (error) {
            console.error("Checkout failed:", error);
            alert("Checkout failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
                <ShoppingBag className="w-16 h-16 mb-6 opacity-10" />
                <h1 className="text-3xl font-display font-black uppercase tracking-tighter mb-4 animate-fade-in-up">
                    {t("empty")}
                </h1>
                <Link
                    href={`/${locale}/shop`}
                    className="text-sm font-bold uppercase tracking-widest underline underline-offset-8 hover:opacity-60 transition-opacity"
                >
                    {t("continue_shopping")}
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark pt-32 pb-24 px-6 md:px-12">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">

                {/* Left Side: Forms */}
                <div className="space-y-12 order-2 lg:order-1">
                    <Link
                        href={`/${locale}/shop`}
                        className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity mb-8"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Back to Shop
                    </Link>

                    <section>
                        <h2 className="text-2xl font-display font-black uppercase tracking-tighter mb-8 decoration-black/10 underline underline-offset-8">
                            Customer Information
                        </h2>
                        <div className="grid grid-cols-1 gap-6">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full bg-transparent border-b border-black/10 dark:border-white/10 py-4 focus:border-black dark:focus:border-white transition-colors outline-none font-medium"
                            />
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-display font-black uppercase tracking-tighter mb-8 decoration-black/10 underline underline-offset-8">
                            Shipping Details
                        </h2>
                        <div className="grid grid-cols-2 gap-6">
                            <input type="text" placeholder="First Name" className="bg-transparent border-b border-black/10 dark:border-white/10 py-4 outline-none" />
                            <input type="text" placeholder="Last Name" className="bg-transparent border-b border-black/10 dark:border-white/10 py-4 outline-none" />
                            <input type="text" placeholder="Address" className="col-span-2 bg-transparent border-b border-black/10 dark:border-white/10 py-4 outline-none" />
                            <input type="text" placeholder="City" className="bg-transparent border-b border-black/10 dark:border-white/10 py-4 outline-none" />
                            <input type="text" placeholder="Postal Code" className="bg-transparent border-b border-black/10 dark:border-white/10 py-4 outline-none" />
                        </div>
                    </section>

                    <div className="pt-8">
                        <button
                            onClick={handleCheckout}
                            disabled={isLoading}
                            className="w-full bg-black dark:bg-white text-white dark:text-black py-6 text-sm font-black uppercase tracking-[0.2em] hover:opacity-90 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : null}
                            {isLoading ? "Processing..." : "Proceed to Payment"}
                        </button>
                        <p className="text-[10px] text-center mt-4 opacity-30 uppercase font-bold tracking-widest">
                            Secure Checkout powered by Stripe
                        </p>
                    </div>
                </div>

                {/* Right Side: Order Summary */}
                <div className="order-1 lg:order-2">
                    <div className="sticky top-32 space-y-8 bg-surface-light dark:bg-surface-dark p-8 md:p-12 border border-black/5 dark:border-white/5">
                        <h2 className="text-xl font-display font-black uppercase tracking-tighter mb-8">
                            Order Summary
                        </h2>

                        <div className="space-y-6 max-h-[400px] overflow-y-auto no-scrollbar">
                            {items.map((item) => {
                                const variant = item.product.variants.find(v => v.id === item.variantId);
                                const price = item.product.basePrice + (variant?.priceAdjustment || 0);
                                return (
                                    <div key={`${item.productId}-${item.variantId}`} className="flex gap-4">
                                        <div className="relative w-16 h-20 bg-muted overflow-hidden">
                                            <Image
                                                src={item.product.mainImage}
                                                alt={item.product.name[locale]}
                                                fill
                                                className="object-cover grayscale"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between font-bold text-xs uppercase tracking-tight">
                                                <span>{item.product.name[locale]}</span>
                                                <span>{hasHydrated ? formatPrice(price * item.quantity) : ""}</span>
                                            </div>
                                            <p className="text-[10px] opacity-40 uppercase tracking-widest mt-1">
                                                Qty: {item.quantity} {variant && `/ ${variant.name[locale]}`}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="pt-8 border-t border-black/10 dark:border-white/10 space-y-4">
                            <div className="flex justify-between text-xs font-bold uppercase tracking-widest opacity-40">
                                <span>Subtotal</span>
                                <span>{hasHydrated ? formatPrice(totalPrice()) : ""}</span>
                            </div>
                            <div className="flex justify-between text-xs font-bold uppercase tracking-widest opacity-40">
                                <span>Shipping</span>
                                <span>{formatPrice(0)}</span>
                            </div>
                            <div className="flex justify-between text-xl font-black uppercase tracking-tighter pt-4 border-t border-black/5">
                                <span>Total</span>
                                <span>{hasHydrated ? formatPrice(totalPrice()) : ""}</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
