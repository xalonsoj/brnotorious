export type LocalizedString = {
    cs: string;
    en: string;
};

export type ProductVariant = {
    id: string;
    name: LocalizedString;
    stock: number;
    priceAdjustment: number; // e.g., +100 CZK for XL
    sku?: string;
};

export type Product = {
    id: string;
    slug: string;
    name: LocalizedString;
    description: LocalizedString;
    designStory: LocalizedString; // Requested: Historia del diseño
    brnoAttributes: string[];     // Requested: Atributos de Brno (e.g. "Modernist", "Brutalism", "Spilberk")
    mainImage: string;
    gallery: string[];
    category: "prints" | "apparel" | "accessories" | "decor";
    basePrice: number;            // in CZK by default
    variants: ProductVariant[];
    createdAt: string;
    updatedAt: string;
    status: "active" | "draft" | "archived";
    seo?: {
        title?: LocalizedString;
        description?: LocalizedString;
    };
};

export type CartItem = {
    productId: string;
    variantId?: string;
    quantity: number;
    product: Product; // Denormalized for speed/UI
};
