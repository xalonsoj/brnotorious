"use client";

import { useCurrency, Currency } from "@/store/useCurrency";
import { useEffect } from "react";
import { useLocale } from "next-intl";
import { useHasHydrated } from "@/lib/hooks";

export default function CurrencySwitcher() {
    const { currency, setCurrency } = useCurrency();
    const locale = useLocale();
    const hasHydrated = useHasHydrated();

    // Auto-detect currency based on locale on first load
    useEffect(() => {
        const saved = localStorage.getItem("brnotorious-currency");
        if (!saved) {
            if (locale === "cs") setCurrency("CZK");
            else setCurrency("EUR");
        }
    }, [locale, setCurrency]);

    return (
        <div className="flex gap-2 text-[10px] font-black uppercase tracking-widest">
            <button
                onClick={() => setCurrency("CZK")}
                className={`hover:opacity-100 transition-opacity ${hasHydrated && currency === "CZK" ? "opacity-100 underline decoration-2 underline-offset-4" : "opacity-30"}`}
            >
                CZK
            </button>
            <span className="opacity-10">/</span>
            <button
                onClick={() => setCurrency("EUR")}
                className={`hover:opacity-100 transition-opacity ${hasHydrated && currency === "EUR" ? "opacity-100 underline decoration-2 underline-offset-4" : "opacity-30"}`}
            >
                EUR
            </button>
        </div>
    );
}
