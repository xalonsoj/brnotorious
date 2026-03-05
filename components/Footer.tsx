import Link from 'next/link';
import { Instagram, Mail, Facebook } from 'lucide-react';
import { useLocale } from 'next-intl';

export default function Footer() {
    const locale = useLocale();
    return (
        <footer className="bg-surface-light dark:bg-surface-dark pt-16 md:pt-24 pb-8 md:pb-12 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-16 mb-16 md:mb-20">
                    <div className="col-span-1">
                        <Link href={`/${locale}`} className="flex items-center mb-6 md:mb-8">
                            <span className="font-display font-bold text-xl md:text-2xl tracking-tighter uppercase text-gray-900 dark:text-white transition-colors">
                                Brnotorious
                            </span>
                        </Link>
                        <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mb-6 md:mb-8 leading-relaxed font-light transition-colors max-w-sm">
                            Limited edition designs from Brno with Moravian spirit. Celebrating local pride since 2023. Architectural gallery-style aesthetics for the urban minimalists.
                        </p>
                        <div className="flex space-x-6">
                            <a href="#" className="text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                                <Mail className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-2 gap-8 md:col-span-2">
                        <div>
                            <h4 className="font-display font-bold text-[10px] uppercase tracking-[0.2em] mb-6 md:mb-8 text-gray-900 dark:text-white">Shop</h4>
                            <ul className="space-y-3 ms:space-y-4 text-xs md:text-sm text-gray-500 dark:text-gray-400 font-light transition-colors">
                                <li><Link href={`/${locale}/shop/prints`} className="hover:text-black dark:hover:text-white transition-colors">Art Prints</Link></li>
                                <li><Link href={`/${locale}/shop/apparel`} className="hover:text-black dark:hover:text-white transition-colors">Apparel</Link></li>
                                <li><Link href={`/${locale}/shop/decor`} className="hover:text-black dark:hover:text-white transition-colors">Home Decor</Link></li>
                                <li><Link href={`/${locale}/gift-cards`} className="hover:text-black dark:hover:text-white transition-colors">Gift Cards</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-display font-bold text-[10px] uppercase tracking-[0.2em] mb-6 md:mb-8 text-gray-900 dark:text-white transition-colors">Support</h4>
                            <ul className="space-y-3 md:space-y-4 text-xs md:text-sm text-gray-500 dark:text-gray-400 font-light transition-colors">
                                <li><Link href={`/${locale}/contact`} className="hover:text-black dark:hover:text-white transition-colors">Contact Us</Link></li>
                                <li><Link href={`/${locale}/shipping`} className="hover:text-black dark:hover:text-white transition-colors">Shipping & Returns</Link></li>
                                <li><Link href={`/${locale}/faq`} className="hover:text-black dark:hover:text-white transition-colors">FAQ</Link></li>
                                <li><Link href={`/${locale}/privacy`} className="hover:text-black dark:hover:text-white transition-colors">Privacy Policy</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-display font-bold text-[10px] uppercase tracking-[0.2em] mb-6 md:mb-8 text-gray-900 dark:text-white transition-colors">Stay Notorious</h4>
                        <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mb-6 font-light transition-colors">Subscribe for exclusive releases and urban updates.</p>
                        <form className="flex flex-col space-y-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-3 md:p-4 text-xs md:text-sm focus:outline-none focus:border-black dark:focus:border-white transition-colors font-light text-gray-900 dark:text-white rounded-none"
                            />
                            <button
                                type="submit"
                                className="bg-black dark:bg-white text-white dark:text-black font-display font-bold uppercase text-[10px] md:text-xs tracking-widest p-3 md:p-4 hover:opacity-90 transition-opacity"
                            >
                                Join the Club
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-8 md:pt-10 flex flex-col md:flex-row justify-between items-center text-[9px] md:text-[10px] text-gray-400 uppercase tracking-widest font-display transition-colors text-center md:text-left">
                    <p className="mb-4 md:mb-0">© {new Date().getFullYear()} Brnotorious. Made in Brno.</p>
                    <div className="flex space-x-6 md:space-x-8">
                        <Link href={`/${locale}/terms`} className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Terms</Link>
                        <Link href={`/${locale}/privacy`} className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Privacy</Link>
                        <Link href={`/${locale}/cookies`} className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
