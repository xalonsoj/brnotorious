'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/context/AuthContext';
import {
    Upload,
    X,
    Loader2,
    Save,
    ArrowLeft,
    Image as ImageIcon,
    Trash2,
    Plus
} from 'lucide-react';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { updateProduct, uploadProductImage, Product, PRODUCTS_COLLECTION } from '@/lib/products';

export default function EditProductPage() {
    const { user, isAdmin, loading: authLoading } = useAuth();
    const t = useTranslations('Products');
    const router = useRouter();
    const { locale, id } = useParams();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [product, setProduct] = useState<Product | null>(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState<number>(0);
    const [stock, setStock] = useState<number>(10);
    const [category, setCategory] = useState('prints');
    const [featured, setFeatured] = useState(false);
    const [existingImages, setExistingImages] = useState<string[]>([]);
    const [newImages, setNewImages] = useState<File[]>([]);
    const [newPreviews, setNewPreviews] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!authLoading && (!user || !isAdmin)) {
            router.push(`/${locale}`);
            return;
        }

        async function fetchProduct() {
            try {
                const docRef = doc(db, PRODUCTS_COLLECTION, id as string);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data() as Product;
                    setProduct(data);
                    setName(data.name);
                    setDescription(data.description);
                    setPrice(data.price);
                    setStock(data.stock);
                    setCategory(data.category);
                    setFeatured(data.featured || false);
                    setExistingImages(data.images || []);
                } else {
                    setError('Product not found');
                }
            } catch (err) {
                console.error(err);
                setError('Error fetching product');
            } finally {
                setLoading(false);
            }
        }

        if (isAdmin) fetchProduct();
    }, [id, isAdmin, authLoading, user, locale, router]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            setNewImages(prev => [...prev, ...selectedFiles]);

            const previews = selectedFiles.map(file => URL.createObjectURL(file));
            setNewPreviews(prev => [...prev, ...previews]);
        }
    };

    const removeExistingImage = (url: string) => {
        setExistingImages(prev => prev.filter(img => img !== url));
    };

    const removeNewImage = (index: number) => {
        setNewImages(prev => prev.filter((_, i) => i !== index));
        setNewPreviews(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError(null);

        try {
            // Upload new images
            const uploadedUrls: string[] = [...existingImages];
            for (const file of newImages) {
                const url = await uploadProductImage(file);
                uploadedUrls.push(url);
            }

            // Update product in Firestore
            await updateProduct(id as string, {
                name,
                description,
                price,
                stock,
                category,
                images: uploadedUrls,
                featured,
            });

            router.push(`/${locale}/admin/products`);
        } catch (err: any) {
            console.error(err);
            setError(t('error_save'));
        } finally {
            setSaving(false);
        }
    };

    if (authLoading || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-black dark:text-white">
                <Loader2 className="animate-spin w-8 h-8" />
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 bg-gray-50 dark:bg-black transition-colors">
            <div className="max-w-3xl mx-auto">
                <header className="mb-12 flex items-center gap-6">
                    <Link href={`/${locale}/admin/products`} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <div>
                        <h1 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter">
                            {t('edit')}
                        </h1>
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">Command Center / {name}</p>
                    </div>
                </header>

                <form onSubmit={handleSubmit} className="space-y-8 bg-white dark:bg-gray-900 p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
                    {error && (
                        <div className="p-4 bg-red-50 text-red-500 text-xs font-bold uppercase tracking-widest border border-red-100">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            {/* Basic Info */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest opacity-40">{t('name')}</label>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-transparent border-b border-gray-200 dark:border-gray-800 py-2 focus:border-black dark:focus:border-white transition-colors outline-none font-light"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest opacity-40">{t('description')}</label>
                                <textarea
                                    required
                                    rows={4}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full bg-transparent border border-gray-200 dark:border-gray-800 p-4 focus:border-black dark:focus:border-white transition-colors outline-none font-light text-sm resize-none"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest opacity-40">{t('price')}</label>
                                    <input
                                        type="number"
                                        required
                                        min="0"
                                        value={price}
                                        onChange={(e) => setPrice(Number(e.target.value))}
                                        className="w-full bg-transparent border-b border-gray-200 dark:border-gray-800 py-2 focus:border-black dark:focus:border-white transition-colors outline-none font-light"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest opacity-40">{t('stock')}</label>
                                    <input
                                        type="number"
                                        required
                                        min="0"
                                        value={stock}
                                        onChange={(e) => setStock(Number(e.target.value))}
                                        className="w-full bg-transparent border-b border-gray-200 dark:border-gray-800 py-2 focus:border-black dark:focus:border-white transition-colors outline-none font-light"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest opacity-40">{t('category')}</label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full bg-transparent border-b border-gray-200 dark:border-gray-800 py-2 focus:border-black dark:focus:border-white transition-colors outline-none font-light appearance-none"
                                >
                                    <option value="prints" className="bg-white dark:bg-black">Prints</option>
                                    <option value="apparel" className="bg-white dark:bg-black">Apparel</option>
                                    <option value="accessories" className="bg-white dark:bg-black">Accessories</option>
                                </select>
                            </div>

                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    id="featured"
                                    checked={featured}
                                    onChange={(e) => setFeatured(e.target.checked)}
                                    className="w-4 h-4 border-gray-200 dark:border-gray-800 rounded-none checked:bg-black"
                                />
                                <label htmlFor="featured" className="text-[10px] font-bold uppercase tracking-widest opacity-40">{t('featured')}</label>
                            </div>
                        </div>

                        {/* Image Management */}
                        <div className="space-y-6">
                            <label className="text-[10px] font-bold uppercase tracking-widest opacity-40">{t('images')}</label>

                            {/* Current Images */}
                            <div className="grid grid-cols-3 gap-2">
                                {existingImages.map((src, index) => (
                                    <div key={`existing-${index}`} className="relative aspect-square group">
                                        <img src={src} alt="Product" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all border border-gray-200 dark:border-gray-800" />
                                        <button
                                            type="button"
                                            onClick={() => removeExistingImage(src)}
                                            className="absolute -top-2 -right-2 bg-black text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}
                                {newPreviews.map((src, index) => (
                                    <div key={`new-${index}`} className="relative aspect-square group">
                                        <img src={src} alt="Preview" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all border border-dashed border-black" />
                                        <button
                                            type="button"
                                            onClick={() => removeNewImage(index)}
                                            className="absolute -top-2 -right-2 bg-black text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}

                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="aspect-square border-2 border-dashed border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center cursor-pointer hover:border-black dark:hover:border-white transition-colors group"
                                >
                                    <Plus className="w-6 h-6 opacity-20 group-hover:opacity-100" />
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        className="hidden"
                                        ref={fileInputRef}
                                        onChange={handleImageChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-8 flex gap-4">
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex-1 bg-black dark:bg-white text-white dark:text-black py-4 font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 transition-opacity"
                        >
                            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            {t('save')}
                        </button>
                        <Link
                            href={`/${locale}/admin/products`}
                            className="flex-1 border border-gray-200 dark:border-gray-800 py-4 font-bold uppercase tracking-widest text-[10px] text-center hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                        >
                            {t('cancel')}
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
