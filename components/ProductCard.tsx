"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { useState } from "react";
import { useLocale } from "next-intl";
import { useCurrency } from "@/store/useCurrency";
import { useHasHydrated } from "@/lib/hooks";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const locale = useLocale() as "en" | "cs";
    const { formatPrice } = useCurrency();
    const [isHovered, setIsHovered] = useState(false);
    const hasHydrated = useHasHydrated();

    return (
        <Link
            href={`/${locale}/products/${product.slug}`}
            className="group block cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="aspect-[3/4] bg-muted mb-6 overflow-hidden relative">
                {/* Progressive Loading with next/image */}
                <Image
                    src={product.mainImage}
                    alt={product.name[locale]}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className={`object-cover transition-all duration-1000 ease-out ${isHovered ? "scale-110 grayscale-0" : "scale-100 grayscale"
                        }`}
                    priority={false}
                />
                {/* Subtle Map Coordinates Overlay (Brno Reference) */}
                <div className="absolute bottom-4 left-4 text-[8px] font-black uppercase tracking-[0.3em] opacity-30 mix-blend-difference text-white">
                    49.1951° N, 16.6068° E
                </div>
            </div>

            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-base font-bold uppercase tracking-tight mb-1 group-hover:underline underline-offset-4">
                        {product.name[locale]}
                    </h3>
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">
                        {product.category === "prints" ? "Limited Edition / Giclée" : "Premium Apparel"}
                    </p>
                </div>
                <p className="text-sm font-black whitespace-nowrap">
                    {hasHydrated ? formatPrice(product.basePrice) : "\u00A0"}
                </p>
            </div>
        </Link>
    );
}
