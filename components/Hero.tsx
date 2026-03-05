import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
    return (
        <header className="pt-16 md:pt-20">
            <div className="flex flex-col md:flex-row min-h-screen md:min-h-0 overflow-hidden">
                {/* Left Section: Urban Lifestyle / Mobile Top */}
                <div className="w-full md:w-1/2 relative h-[60vh] md:h-auto overflow-hidden group">
                    <Image
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2LAXwaTt1sR8rrchDW0NoHTaNYAVfuJQVre2XRn5eYkU7Z24ETB49TT_PvIUK0nsXl7L0B03INs3nv5JvDilqV4rLhlWTy-si5GDp3TPJXAntCQJndhMzqkg-4WzfGcIn922I7HrGVXl8aKjJIjTi5YGObyv54Ewk_fcSWuH8yOjN4wkQdmO_AuRcyQNaO6lbu7w3JRagKsv-YzU6c4bwwiaDl6dgwjvdRiBmJYhZbh3reaJ563K2fkgBbYaqHHD6HMgXn-6XQPg"
                        alt="Brno city lifestyle, minimalist street view"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-end p-8 md:p-20">
                        <div className="text-white w-full">
                            <span className="bg-white text-black px-4 py-1.5 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] mb-6 inline-block font-display shadow-sm">
                                New Season
                            </span>
                            <h2 className="text-5xl md:text-8xl font-display font-bold leading-[0.9] mb-6 tracking-tighter">
                                The Soul<br />of the City.
                            </h2>
                            <Link
                                href="/collections/streets"
                                className="inline-flex items-center text-white font-bold uppercase tracking-[0.2em] border-b-2 border-white pb-2 hover:opacity-80 transition-opacity font-display text-[10px] md:text-xs"
                            >
                                Explore Streets <ArrowRight className="ml-2 w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Right Section: Featured Product / Mobile Bottom */}
                <div className="w-full md:w-1/2 bg-[#F5F5F5] dark:bg-surface-dark flex flex-col justify-center items-center p-8 md:p-20 relative transition-colors duration-300">
                    <div className="absolute top-8 right-8 md:top-12 md:right-12 z-10">
                        <span className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 text-[10px] md:text-xs font-bold uppercase rounded-full font-display tracking-[0.2em] shadow-xl">
                            Limited Edition
                        </span>
                    </div>

                    <div className="relative w-full max-w-sm md:max-w-md aspect-[4/5] md:aspect-[3/4] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] bg-white dark:bg-gray-800 p-8 md:p-10 transform -rotate-3 transition-transform hover:-rotate-1 duration-700 mb-8 md:mb-0 group cursor-crosshair">
                        <div className="relative w-full h-full border-[12px] md:border-[16px] border-[#1A1A1A] dark:border-gray-600 bg-white flex items-center justify-center overflow-hidden">
                            <Image
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCO40zby-a0wEAy9pjR2BHYGkZdKIsa_ekxHNqKv9AFlnKU7sv_WyfftPdhD9Xc6rMekRAlegN8i5VT-P025-v-lWa3UD2gVTtn5NhqpNAwSsz5jVt8zAiz5AZsnNGNPNIUNhXYk0VHzqGgENWMb6dMKFhnpoe8NOFHxbuWqZ9lWxjS7xOak-KEMqQwqSbQrdqism2mDiXi0vkq2PYsE33IBMqK9icce3uSaNS3PVrS9sFeEpELszdEzQ2INxiUJpKCdSd0sqbZNmg"
                                alt="Yellow Greyhound Print"
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-1000"
                            />
                        </div>
                    </div>

                    <div className="mt-12 md:mt-16 text-left md:text-center w-full max-w-sm md:max-w-none">
                        <h1 className="text-4xl md:text-6xl font-display font-bold mb-2 md:mb-3 text-gray-900 dark:text-white tracking-tighter uppercase">
                            Yellow Greyhound
                        </h1>
                        <p className="text-gray-400 dark:text-gray-500 mb-8 md:mb-10 font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase">
                            Print Series #042 • Designed in Brno
                        </p>
                        <Link
                            href="/product/yellow-greyhound"
                            className="bg-black hover:bg-gray-800 text-white dark:bg-white dark:text-black dark:hover:bg-gray-200 px-10 py-5 md:px-12 md:py-6 rounded-none font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs transition-all transform hover:-translate-y-1 font-display inline-block w-full md:w-auto text-center shadow-lg"
                        >
                            Shop This Print
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
