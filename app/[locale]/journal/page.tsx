export default function JournalPage() {
    return (
        <main className="pt-32 pb-20 bg-white dark:bg-black min-h-screen transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <header className="mb-20">
                    <h1 className="text-7xl md:text-9xl font-display font-bold uppercase tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-r from-black to-gray-500 dark:from-white dark:to-gray-600">
                        Journal
                    </h1>
                    <p className="text-2xl text-gray-500 max-w-2xl font-light">
                        Chronicles of Brno&apos;s culture, design updates, and artist spotlights.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {[1, 2, 3].map((i) => (
                        <article key={i} className="group cursor-pointer">
                            <div className="aspect-[16/10] bg-gray-100 dark:bg-gray-900 mb-6 overflow-hidden relative">
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
                                <div className="w-full h-full flex items-center justify-center text-gray-300 font-display font-bold text-4xl">
                                    POST 0{i}
                                </div>
                            </div>
                            <div className="flex items-center gap-4 mb-4">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 font-display">
                                    Culture
                                </span>
                                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 font-display">
                                    March 0{i}, 2026
                                </span>
                            </div>
                            <h2 className="text-2xl font-display font-bold uppercase mb-4 group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors">
                                Explaining Brno Absurdism through Design
                            </h2>
                            <p className="text-gray-500 dark:text-gray-400 font-light leading-relaxed mb-6">
                                Why we chose the crocodile as our spirit animal and what it means for our upcoming collection...
                            </p>
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] border-b border-black dark:border-white pb-1 group-hover:pr-4 transition-all duration-300">
                                Read More
                            </span>
                        </article>
                    ))}
                </div>
            </div>
        </main>
    );
}
