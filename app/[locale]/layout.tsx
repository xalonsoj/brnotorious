import { Inter } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import "../globals.css";


const inter = Inter({ subsets: ["latin"] });

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const messages = await getMessages({ locale });

    return (
        <html lang={locale} suppressHydrationWarning>
            <body
                className={`${inter.className} antialiased bg-background-light dark:bg-background-dark text-text-light transition-colors duration-300`}
                suppressHydrationWarning
            >
                <NextIntlClientProvider messages={messages} locale={locale}>
                    <Navbar />
                    <CartDrawer />
                    <main className="min-h-screen">
                        {children}
                    </main>
                    <Footer />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
