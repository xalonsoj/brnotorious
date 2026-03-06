'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/context/AuthContext';
import {
    Save,
    ArrowLeft,
    Loader2,
    User as UserIcon,
    MapPin,
    Phone,
    CheckCircle2
} from 'lucide-react';
import Link from 'next/link';
import { getUserProfile, updateUserProfile, UserProfile } from '@/lib/users';

export default function SettingsPage() {
    const { user, loading: authLoading } = useAuth();
    const t = useTranslations('Account');
    const router = useRouter();
    const { locale } = useParams();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Form states
    const [displayName, setDisplayName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [country, setCountry] = useState('Czech Republic');

    useEffect(() => {
        if (!authLoading && !user) {
            router.push(`/${locale}/login`);
            return;
        }

        async function fetchProfile() {
            if (user) {
                try {
                    const profile = await getUserProfile(user.uid);
                    if (profile) {
                        setDisplayName(profile.displayName || '');
                        setPhoneNumber(profile.phoneNumber || '');
                        if (profile.address) {
                            setStreet(profile.address.street || '');
                            setCity(profile.address.city || '');
                            setZipCode(profile.address.zipCode || '');
                            setCountry(profile.address.country || 'Czech Republic');
                        }
                    }
                } catch (err) {
                    console.error(err);
                    setError('Failed to load profile');
                } finally {
                    setLoading(false);
                }
            }
        }

        if (user) fetchProfile();
    }, [user, authLoading, locale, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setSaving(true);
        setError(null);
        setSuccess(false);

        try {
            await updateUserProfile(user.uid, {
                displayName,
                phoneNumber,
                address: {
                    street,
                    city,
                    zipCode,
                    country,
                }
            });
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            console.error(err);
            setError('Failed to update profile');
        } finally {
            setSaving(false);
        }
    };

    if (authLoading || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="animate-spin w-8 h-8 text-black dark:text-white" />
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 bg-gray-50 dark:bg-black transition-colors text-black dark:text-white">
            <div className="max-w-3xl mx-auto">
                <header className="mb-12 flex items-center gap-6">
                    <Link href={`/${locale}/account`} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <div>
                        <h1 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter">
                            {t('settings')}
                        </h1>
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">Account / Preferences</p>
                    </div>
                </header>

                <form onSubmit={handleSubmit} className="space-y-12 bg-white dark:bg-gray-900 p-8 md:p-12 border border-gray-100 dark:border-gray-800 shadow-sm relative">
                    {success && (
                        <div className="absolute top-0 left-0 right-0 p-4 bg-black text-white text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 animate-in fade-in slide-in-from-top-4">
                            <CheckCircle2 className="w-4 h-4" />
                            {t('save_changes')} Success
                        </div>
                    )}

                    {error && (
                        <div className="p-4 bg-red-50 text-red-500 text-[10px] font-bold uppercase tracking-widest border border-red-100">
                            {error}
                        </div>
                    )}

                    {/* Profile Section */}
                    <section>
                        <div className="flex items-center gap-3 mb-8">
                            <UserIcon className="w-4 h-4 opacity-20" />
                            <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">{t('profile')}</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest opacity-30">{t('first_name')}</label>
                                <input
                                    type="text"
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                    className="w-full bg-transparent border-b border-gray-200 dark:border-gray-800 py-2 focus:border-black dark:focus:border-white transition-colors outline-none font-light"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest opacity-30">{t('phone')}</label>
                                <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 focus-within:border-black dark:focus-within:border-white transition-colors">
                                    <Phone className="w-3 h-3 opacity-20" />
                                    <input
                                        type="tel"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        className="w-full bg-transparent py-2 outline-none font-light"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Shipping Section */}
                    <section>
                        <div className="flex items-center gap-3 mb-8">
                            <MapPin className="w-4 h-4 opacity-20" />
                            <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">{t('shipping')}</h2>
                        </div>
                        <div className="space-y-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest opacity-30">{t('street')}</label>
                                <input
                                    type="text"
                                    value={street}
                                    onChange={(e) => setStreet(e.target.value)}
                                    className="w-full bg-transparent border-b border-gray-200 dark:border-gray-800 py-2 focus:border-black dark:focus:border-white transition-colors outline-none font-light"
                                />
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest opacity-30">{t('city')}</label>
                                    <input
                                        type="text"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        className="w-full bg-transparent border-b border-gray-200 dark:border-gray-800 py-2 focus:border-black dark:focus:border-white transition-colors outline-none font-light"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest opacity-30">{t('zip')}</label>
                                    <input
                                        type="text"
                                        value={zipCode}
                                        onChange={(e) => setZipCode(e.target.value)}
                                        className="w-full bg-transparent border-b border-gray-200 dark:border-gray-800 py-2 focus:border-black dark:focus:border-white transition-colors outline-none font-light"
                                    />
                                </div>
                                <div className="space-y-2 col-span-2 md:col-span-1">
                                    <label className="text-[10px] font-bold uppercase tracking-widest opacity-30">{t('country')}</label>
                                    <input
                                        type="text"
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                        className="w-full bg-transparent border-b border-gray-200 dark:border-gray-800 py-2 focus:border-black dark:focus:border-white transition-colors outline-none font-light"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="pt-8">
                        <button
                            type="submit"
                            disabled={saving}
                            className="w-full bg-black dark:bg-white text-white dark:text-black py-6 font-bold uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-3 hover:opacity-90 disabled:opacity-50 transition-all group"
                        >
                            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 group-hover:scale-110 transition-transform" />}
                            {t('save_changes')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
