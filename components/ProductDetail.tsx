"use client";

import { Product } from "@/types/product";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useCart } from "@/store/useCart";
import { useUI } from "@/store/useUI";
import { useCurrency } from "@/store/useCurrency";
import { useState } from "react";

export default function ProductDetail({ product }: { product: Product }) {
    const locale = useLocale() as "en" | "cs";
    const t = useTranslations("Navigation");
    const { formatPrice } = useCurrency();
    const addToCart = useCart((state) => state.addToCart);
    const { openCart } = useUI();
    const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 px-6 md:px-12 py-12 pb-32 md:pb-12">
            {/* Product Image with High-fidelity Zoom Effect */}
            <div className="relative aspect-[3/4] bg-muted overflow-hidden cursor-zoom-in group">
                <Image
                    src={product.mainImage}
                    alt={product.name[locale]}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-150 origin-center"
                    priority
                />
                <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-[8px] font-black uppercase tracking-widest">
                    {product.category}
                </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-center">
                <div className="mb-12">
                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 leading-none">
                        {product.name[locale]}
                    </h1>
                    <p className="text-2xl font-black mb-8 opacity-80">
                        {formatPrice(product.basePrice + (selectedVariant?.priceAdjustment || 0))}
                    </p>

                    <div className="space-y-6 max-w-lg">
                        <p className="text-lg leading-relaxed opacity-70">
                            {product.description[locale]}
                        </p>

                        {/* Brno Attributes */}
                        <div className="flex flex-wrap gap-2 pt-4">
                            {product.brnoAttributes.map((attr) => (
                                <span key={attr} className="px-3 py-1 border border-black/10 text-[10px] uppercase font-bold tracking-widest bg-muted">
                                    {attr}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Variants Selector */}
                <div className="mb-12 space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Select Size / Dimension</label>
                    <div className="flex gap-4">
                        {product.variants.map((v) => (
                            <button
                                key={v.id}
                                onClick={() => setSelectedVariant(v)}
                                className={`w-12 h-12 border-2 flex items-center justify-center text-xs font-bold transition-colors uppercase ${selectedVariant.id === v.id ? "border-black bg-black text-white" : "border-black/5 hover:border-black"
                                    }`}
                            >
                                {v.name[locale]}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Add to Cart Sticky Button (Mobile) / Regular (Desktop) */}
                <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-xl border-t border-muted md:relative md:p-0 md:bg-transparent md:border-none z-40">
                    <button
                        onClick={() => {
                            addToCart(product, selectedVariant);
                            openCart();
                        }}
                        className="btn-primary w-full px-12 py-5 text-sm md:text-base flex justify-between items-center group"
                    >
                        <span>Add to Cart</span>
                        <span className="opacity-40 group-hover:opacity-100 transition-opacity">→</span>
                    </button>
                </div>

                {/* Design Story Section */}
                <div className="mt-20 pt-12 border-t border-muted">
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-6 opacity-40">The Story Behind</h3>
                    <p className="text-sm italic leading-loose opacity-60 font-medium">
                        "{product.designStory[locale]}"
                    </p>
                </div>
            </div>
        </div>
    );
}
