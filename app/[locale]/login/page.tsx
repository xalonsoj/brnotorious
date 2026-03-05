'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { Chrome, Mail, Lock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
    const t = useTranslations('Login');
    const locale = useLocale();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleGoogleLogin = async () => {
        setLoading(true);
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            router.push(`/${locale}`);
        } catch (err: any) {
            setError(t('error'));
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push(`/${locale}`);
        } catch (err: any) {
            setError(t('error'));
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark px-4 transition-colors duration-300">
            <div className="max-w-md w-full">
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter mb-4">
                        {t('title')}
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 font-light max-w-xs mx-auto">
                        {t('subtitle')}
                    </p>
                </div>

                <div className="space-y-4">
                    <button
                        onClick={handleGoogleLogin}
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 py-4 px-6 rounded-none font-bold uppercase text-[10px] tracking-widest hover:bg-gray-50 dark:hover:bg-gray-800 transition-all group disabled:opacity-50"
                    >
                        <Chrome className="w-4 h-4" />
                        {t('google')}
                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>

                    <div className="relative py-4 flex items-center">
                        <div className="flex-grow border-t border-gray-100 dark:border-gray-900"></div>
                        <span className="flex-shrink mx-4 text-[8px] font-black uppercase tracking-[0.3em] opacity-20">OR</span>
                        <div className="flex-grow border-t border-gray-100 dark:border-gray-900"></div>
                    </div>

                    <form onSubmit={handleEmailLogin} className="space-y-4">
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={t('email_placeholder')}
                                required
                                className="w-full bg-gray-50 dark:bg-gray-900/50 border-none py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-black dark:focus:ring-white transition-all outline-none"
                            />
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder={t('password_placeholder')}
                                required
                                className="w-full bg-gray-50 dark:bg-gray-900/50 border-none py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-black dark:focus:ring-white transition-all outline-none"
                            />
                        </div>

                        {error && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest text-center">{error}</p>}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-black dark:bg-white text-white dark:text-black py-4 font-black uppercase text-[10px] tracking-[0.2em] hover:opacity-80 transition-opacity disabled:opacity-50"
                        >
                            {t('signin')}
                        </button>
                    </form>

                    <div className="text-center pt-8">
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                            {t('no_account')}{' '}
                            <Link href={`/${locale}/signup`} className="text-black dark:text-white border-b border-black dark:border-white pb-0.5">
                                {t('signup')}
                            </Link>
                        </p>
                    </div>
                </div>

                <div className="mt-20 text-center">
                    <Link href={`/${locale}`} className="text-[8px] font-black uppercase tracking-[0.4em] opacity-30 hover:opacity-100 transition-opacity">
                        ← Back to Brand Hub
                    </Link>
                </div>
            </div>
        </div>
    );
}
