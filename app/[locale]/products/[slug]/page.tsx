import { mockProducts } from "@/lib/mockData";
import ProductDetail from "@/components/ProductDetail";
import { notFound } from "next/navigation";

interface Params {
    slug: string;
    locale: string;
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
    const resolvedParams = await params;
    const { slug } = resolvedParams;

    const product = mockProducts.find((p) => p.slug === slug);

    if (!product) {
        notFound();
    }

    return <ProductDetail product={product} />;
}

export async function generateStaticParams() {
    // We only need to generate for slugs; next-intl handles the locale mapping
    return mockProducts.map((p) => ({
        slug: p.slug,
    }));
}
