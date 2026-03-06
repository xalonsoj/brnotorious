import Image from 'next/image';

export default function Story() {
    return (
        <section className="py-20 md:py-32 bg-gray-50 dark:bg-gray-900 relative overflow-hidden transition-colors duration-300">
            <div className="absolute inset-0 opacity-10 paper-texture pointer-events-none"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    <div className="lg:col-span-6">
                        <div className="inline-block border-l-4 border-black dark:border-white pl-4 mb-6 md:mb-8 transition-colors">
                            <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 font-display">
                                Our Story
                            </span>
                        </div>
                        <h2 className="text-5xl md:text-8xl font-display font-bold mb-8 md:mb-12 leading-[0.9] tracking-tighter text-gray-900 dark:text-white transition-colors uppercase">
                            Not Just<br />a City.<br /><span className="text-gray-400">A State of Mind.</span>
                        </h2>
                        <p className="text-base md:text-xl text-gray-500 dark:text-gray-400 mb-10 md:mb-14 leading-relaxed font-light max-w-lg transition-colors">
                            Brnotorious is an exploration of urban identity. From functionalist architecture to local absurdism, we distill the essence of Brno into high-end design objects.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 md:gap-8">
                            <button className="bg-black hover:bg-gray-800 text-white dark:bg-white dark:text-black dark:hover:bg-gray-200 px-10 md:px-12 py-5 md:py-6 font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs font-display transition-all shadow-xl hover:-translate-y-1">
                                Read the Story
                            </button>
                            <button className="border-2 border-black dark:border-white text-black dark:text-white px-10 md:px-12 py-5 md:py-6 font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs font-display hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
                                Follow Journal
                            </button>
                        </div>
                    </div>

                    <div className="lg:col-span-6 relative mt-12 lg:mt-0">
                        <div className="grid grid-cols-2 gap-3 md:gap-6">
                            <div className="space-y-3 md:space-y-6 pt-8 md:pt-16">
                                <div className="relative aspect-square overflow-hidden rounded-sm md:rounded-lg shadow-xl md:shadow-2xl">
                                    <Image
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCk9nBB1UQuid5nqPmWJHeFTz9DHzCkvH51qA2oXi4216WjoDmBTvCRxgSgbJbBWO03hzjL8wtZdEYigyzsfOBFF1Q1G8_0YHJGmy4z4sNoGvjOXYt9_g_NQiIUyWmgajsj14mKh2mrDt0sd1pVybL8GB_yjChd4tQH-6UDRh1McnUjYmzYkX_6CqcfZKBmb0i_gLmGWzhT9nebCXY9JleNGbaIkSjRP7nTdqI0umXUIBC7mNXmWsrgKlcHmmjWR_gVtGJTimF36d4"
                                        alt="Brno architecture detail"
                                        fill
                                        className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                                    />
                                </div>
                                <div className="bg-white dark:bg-gray-800 p-4 md:p-8 rounded-sm md:rounded-lg shadow-xl md:shadow-2xl border-t-2 md:border-t-4 border-black dark:border-white transition-colors">
                                    <p className="font-serif italic text-sm md:text-xl text-center text-gray-800 dark:text-gray-200 leading-relaxed transition-colors">
                                        &quot;Every corner tells a story...&quot;
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-3 md:space-y-6">
                                <div className="bg-black dark:bg-white text-white dark:text-black p-4 md:p-8 rounded-sm md:rounded-lg shadow-xl md:shadow-2xl flex items-center justify-center aspect-square transition-colors">
                                    <span className="font-display font-bold text-2xl md:text-5xl transform -rotate-12 tracking-tighter leading-none">
                                        BRNO<br />VIBE
                                    </span>
                                </div>
                                <div className="relative aspect-square overflow-hidden rounded-sm md:rounded-lg shadow-xl md:shadow-2xl">
                                    <Image
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBw4eRF05yPR9FHohge-pVV3P48d6daiVsfCGHpKrgQsi8vJC2JunpzBuQPBhXLztpQZeNVYYCMDv0fOoWoex3MCKpnRV61i68MM9z22nOKEeA819m161SpfE7v7TFxAm_7Yhn5-hVYSadp_4wwHTs2dEsKDgYcT5rByD0V8tapdDC9k2_oeTABHrpCFVxOn1Qg_K0NQScC047TR49p0U8hCP2kGX2phcRY_s7d1kEiQE6wUZOziKF2_ETSBsSNaa3xhcwA2MmOQuk"
                                        alt="Urban texture"
                                        fill
                                        className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
