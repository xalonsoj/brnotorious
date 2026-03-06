'use client';

import { useState, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/context/AuthContext';
import { Upload, X, Loader2, Save, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { createProduct, uploadProductImage } from '@/lib/products';

export default function NewProductPage() {
    const { user, isAdmin, loading: authLoading } = useAuth();
    const t = useTranslations('Products');
    const router = useRouter();
    const { locale } = useParams();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState<number>(0);
    const [stock, setStock] = useState<number>(10);
    const [category, setCategory] = useState('prints');
    const [featured, setFeatured] = useState(false);
    const [images, setImages] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    if (authLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;
    if (!user || !isAdmin) {
        router.push(`/${locale}`);
        return null;
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            setImages(prev => [...prev, ...selectedFiles]);

            const newPreviews = selectedFiles.map(file => URL.createObjectURL(file));
            setPreviews(prev => [...prev, ...newPreviews]);
        }
    };

    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
        setPreviews(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Upload images first
            const uploadedUrls: string[] = [];
            for (const file of images) {
                const url = await uploadProductImage(file);
                uploadedUrls.push(url);
            }

            // Create product in Firestore
            await createProduct({
                name,
                description,
                price,
                stock,
                category,
                images: uploadedUrls,
                featured,
            });

            router.push(`/${locale}/admin`);
        } catch (err: any) {
            console.error(err);
            setError(t('error_save'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 bg-gray-50 dark:bg-black transition-colors">
            <div className="max-w-3xl mx-auto">
                <header className="mb-12 flex items-center gap-6">
                    <Link href={`/${locale}/admin`} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <div>
                        <h1 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter">
                            {t('add_new')}
                        </h1>
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">Command Center / Products</p>
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

                        {/* Image Upload */}
                        <div className="space-y-6">
                            <label className="text-[10px] font-bold uppercase tracking-widest opacity-40">{t('images')}</label>

                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="aspect-square border-2 border-dashed border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-black dark:hover:border-white transition-colors group"
                            >
                                <Upload className="w-8 h-8 opacity-20 group-hover:opacity-100 transition-opacity" />
                                <span className="text-[8px] font-bold uppercase tracking-widest opacity-40">{t('upload')}</span>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    className="hidden"
                                    ref={fileInputRef}
                                    onChange={handleImageChange}
                                />
                            </div>

                            {/* Previews */}
                            <div className="grid grid-cols-3 gap-2">
                                {previews.map((src, index) => (
                                    <div key={index} className="relative aspect-square group">
                                        <img src={src} alt="Preview" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all border border-gray-200 dark:border-gray-800" />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="absolute -top-2 -right-2 bg-black text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="pt-8 flex gap-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-black dark:bg-white text-white dark:text-black py-4 font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 transition-opacity"
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            {t('save')}
                        </button>
                        <Link
                            href={`/${locale}/admin`}
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
