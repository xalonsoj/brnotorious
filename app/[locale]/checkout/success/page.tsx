"use client";

import { useEffect } from "react";
import { useCart } from "@/store/useCart";
import { useLocale } from "next-intl";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function SuccessPage() {
    const { items, totalPrice, clearCart } = useCart();
    const locale = useLocale();

    useEffect(() => {
        // In a production app, you'd verify the Stripe session on the server 
        // and save the order to Firestore via a webhook.
        // For this high-fidelity prototype, we'll clear the cart on success.
        if (items.length > 0) {
            console.log("Order processed successfully for locale:", locale);
            clearCart();
        }
    }, [clearCart, items.length, locale]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-background-light dark:bg-background-dark">
            <div className="w-24 h-24 bg-black dark:bg-white rounded-full flex items-center justify-center mb-12 animate-bounce">
                <CheckCircle className="w-12 h-12 text-white dark:text-black" />
            </div>

            <h1 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tighter mb-6 leading-none animate-fade-in-up">
                {locale === "cs" ? "Děkujeme za objednávku!" : "Thank You for Your Order!"}
            </h1>

            <p className="text-lg md:text-xl opacity-60 mb-12 max-w-lg font-medium leading-relaxed">
                {locale === "cs"
                    ? "Vaše brněnské artefakty jsou na cestě. Potvrzení jsme odeslali na váš e-mail."
                    : "Your Brno artifacts are on their way. We've sent a confirmation to your email."}
            </p>

            <Link
                href={`/${locale}/shop`}
                className="btn-primary px-12 py-5 text-sm font-black uppercase tracking-widest hover:opacity-80 transition-opacity"
            >
                {locale === "cs" ? "Zpět do obchodu" : "Back to Shop"}
            </Link>
        </div>
    );
}
