import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-12-18.acacia" as any,
});

export async function POST(req: Request) {
    try {
        const { items, locale } = await req.json();

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: items.map((item: any) => {
                const variant = item.product.variants.find((v: any) => v.id === item.variantId);
                const price = item.product.basePrice + (variant?.priceAdjustment || 0);

                return {
                    price_data: {
                        currency: "eur",
                        product_data: {
                            name: item.product.name[locale] || item.product.name["en"],
                            images: [item.product.mainImage],
                            description: variant ? `Size: ${variant.name[locale]}` : "",
                        },
                        unit_amount: Math.round(price * 100),
                    },
                    quantity: item.quantity,
                };
            }),
            mode: "payment",
            success_url: `${process.env.NEXT_PUBLIC_URL}/${locale}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_URL}/${locale}/checkout`,
            locale: locale === "cs" ? "cs" : "en",
        });

        return NextResponse.json({ id: session.id });
    } catch (err: any) {
        console.error("Stripe Checkout Error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
