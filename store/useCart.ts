import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Product, ProductVariant } from "@/types/product";

interface CartStore {
    items: CartItem[];
    addToCart: (product: Product, variant?: ProductVariant) => void;
    removeFromCart: (productId: string, variantId?: string) => void;
    updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
    setItems: (items: CartItem[]) => void;
    clearCart: () => void;
    totalItems: () => number;
    totalPrice: () => number;
}

export const useCart = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [] as CartItem[],
            addToCart: (product, variant) => {
                const items = get().items;
                const existingItem = items.find(
                    (item) => item.productId === product.id && item.variantId === variant?.id
                );

                if (existingItem) {
                    set({
                        items: items.map((item) =>
                            item.productId === product.id && item.variantId === variant?.id
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        ),
                    });
                } else {
                    set({
                        items: [...items, { productId: product.id, variantId: variant?.id, quantity: 1, product }],
                    });
                }
            },
            removeFromCart: (productId, variantId) => {
                set({
                    items: get().items.filter(
                        (item) => !(item.productId === productId && item.variantId === variantId)
                    ),
                });
            },
            updateQuantity: (productId, quantity, variantId) => {
                set({
                    items: get().items.map((item) =>
                        item.productId === productId && item.variantId === variantId
                            ? { ...item, quantity: Math.max(0, quantity) }
                            : item
                    ).filter(item => item.quantity > 0),
                });
            },
            setItems: (items) => set({ items }),
            clearCart: () => set({ items: [] }),
            totalItems: () => get().items.reduce((acc, item) => acc + item.quantity, 0),
            totalPrice: () =>
                get().items.reduce((acc, item) => {
                    const variant = item.product.variants.find((v) => v.id === item.variantId);
                    const price = item.product.basePrice + (variant?.priceAdjustment || 0);
                    return acc + price * item.quantity;
                }, 0),
        }),
        {
            name: "brnotorious-cart",
        }
    )
);
