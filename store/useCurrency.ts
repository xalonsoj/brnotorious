import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Currency = "CZK" | "EUR";

interface CurrencyStore {
    currency: Currency;
    rate: number; // EUR to CZK rate (e.g. 25.0)
    setCurrency: (currency: Currency) => void;
    formatPrice: (priceInCzk: number) => string;
}

export const useCurrency = create<CurrencyStore>()(
    persist(
        (set, get) => ({
            currency: "CZK",
            rate: 25.3, // Example rate
            setCurrency: (currency) => set({ currency }),
            formatPrice: (priceInCzk) => {
                const { currency, rate } = get();
                if (currency === "CZK") {
                    return `${priceInCzk.toLocaleString("cs-CZ")} CZK`;
                } else {
                    const priceInEur = priceInCzk / rate;
                    return `${priceInEur.toLocaleString("de-DE", {
                        style: "currency",
                        currency: "EUR",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                    })}`;
                }
            },
        }),
        {
            name: "brnotorious-currency",
        }
    )
);
