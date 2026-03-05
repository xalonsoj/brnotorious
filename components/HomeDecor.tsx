import Image from 'next/image';
import Link from 'next/link';
import { Home, ArrowRight, LayoutGrid } from 'lucide-react';

export default function HomeDecor() {
    return (
        <section className="py-16 md:py-24 bg-background-light dark:bg-background-dark transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center space-x-3 mb-10 md:mb-12">
                    <Home className="w-6 h-6 md:w-8 md:h-8 text-primary dark:text-white transition-colors" />
                    <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-gray-900 dark:text-white transition-colors uppercase">
                        Collection 01<br className="md:hidden" /> <span className="md:inline hidden">/</span> Interior
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-10">
                    {/* Main Feature */}
                    <div className="relative group overflow-hidden rounded-sm md:rounded-lg shadow-lg h-[400px] md:h-[450px]">
                        <Image
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJGL5taiPiwfoXj0-1dKWd6ru5fKV0tx9sgxD3te1MbUDW7a_VHvhNrSnIsjZZpLffK4zeUNnTS5dfd9_OZ7PGnZfKNiJormX7qPyEnSSCILcyBBv43qq_N_1AOhiVMkFfkZu8SfW3eTDwUPtdPLc9mHJSrreL4pJUvIHg7Iyo8ENwEl-qFIeWAOqkxAFsl1_YMM1Dbx7fU8tq9bQdFl1GAObhEH3kF_AlujSukSnzKovXiL5H8GkgJbNgIWgd6JUN1Mt6Mon_cLw"
                            alt="Living room with patterned pillows"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-x-4 bottom-4 md:bottom-10 md:left-10 bg-white/95 dark:bg-gray-900/95 p-6 md:p-8 shadow-2xl md:max-w-sm border-l-4 border-secondary backdrop-blur-sm transition-colors">
                            <h3 className="text-xl md:text-2xl font-display font-bold mb-2 md:mb-3 tracking-tight text-gray-900 dark:text-white transition-colors uppercase">
                                Bauhaus Geometric
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm mb-4 md:mb-6 font-light leading-relaxed transition-colors">
                                Bring the 1920s functionalism to your sofa with our premium woven textiles.
                            </p>
                            <Link
                                href="/shop/pillows"
                                className="text-secondary font-display font-bold uppercase text-[10px] md:text-xs tracking-widest flex items-center group-hover:translate-x-2 transition-transform"
                            >
                                Shop Pillows <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-2" />
                            </Link>
                        </div>
                    </div>

                    {/* Grid Section - Linear on small mobile, grid on md+ */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-6">
                        <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-sm md:rounded-lg flex flex-col md:items-center text-left md:text-center hover:shadow-lg transition-all cursor-pointer group">
                            <div className="relative w-full aspect-square md:w-40 md:h-40 mb-4 md:mb-6 overflow-hidden rounded-sm">
                                <Image
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeam_zb3ZbyzvQiqudrnGRcLKOx78bCWrAZgX_iy_EiNPgfp4mpQIltXEFj1tucFvBkhJ1Gvqoo7J0wEBWpXX5CtXYAw2vPYr9BgOJfFAi6QLYqWyJdE0EPOs_XBCgjXuRsEd9jrrt30UKkitPh4bCl2T7N-NHs8yjGYORBx4QooDH1OrxwisCZTUZVom9RzfKOvEhU1_dAY7V8Mtr9uC18m4OqavlXdAR5QX6nF4DLJNj8sD24BSIarUiK3JZNbMo1YvcCpLTtBQ"
                                    alt="Pillow pattern 1"
                                    fill
                                    className="object-cover grayscale group-hover:grayscale-0 transition-all"
                                />
                            </div>
                            <div className="flex justify-between items-end md:block w-full">
                                <div>
                                    <h4 className="font-display font-bold text-sm md:text-base tracking-tight text-gray-900 dark:text-white uppercase">Pattern No. 1</h4>
                                    <p className="text-[10px] text-gray-500 md:hidden">Velvet Cushion</p>
                                </div>
                                <span className="text-gray-900 dark:text-white md:text-gray-500 text-sm md:text-xs font-mono font-bold md:mt-1">€25.00</span>
                            </div>
                        </div>

                        <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-sm md:rounded-lg flex flex-col md:items-center text-left md:text-center hover:shadow-lg transition-all cursor-pointer group">
                            <div className="relative w-full aspect-square md:w-40 md:h-40 mb-4 md:mb-6 overflow-hidden rounded-sm">
                                <Image
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuASTTZA83uUZ9GPp57ueFLXjqJzWrNWZE60mctzE1dfJqZ99wu7XIBN_NDnoCJmLKohW1cyI_Hfih7WWARWYxkEVa7czGKSnTR3s8OQkQ3G4wGtERxwGSSkEtyO5zX7zIWEDZkh4a818f9g8Y0SOBh8D7-XM-fhdUzraxay1ULzoX5GzPdFz4dNtOc5x0KE9bpAlC1FqcUa_cn1ALUTfNYBgoZvBhRxkZa0WKmvggFabcYVBga9K92aOT_eWQUUWvuH1gkr5tVJTXM"
                                    alt="Pillow pattern 2"
                                    fill
                                    className="object-cover grayscale group-hover:grayscale-0 transition-all"
                                />
                            </div>
                            <div className="flex justify-between items-end md:block w-full">
                                <div>
                                    <h4 className="font-display font-bold text-sm md:text-base tracking-tight text-gray-900 dark:text-white uppercase">Pattern No. 2</h4>
                                    <p className="text-[10px] text-gray-500 md:hidden">Velvet Cushion</p>
                                </div>
                                <span className="text-gray-900 dark:text-white md:text-gray-500 text-sm md:text-xs font-mono font-bold md:mt-1">€25.00</span>
                            </div>
                        </div>

                        {/* Button for Show Collection on Mobile */}
                        <div className="sm:col-span-2">
                            <Link
                                href="/shop/home"
                                className="block w-full py-4 border border-black dark:border-white text-black dark:text-white text-center text-[10px] font-bold uppercase tracking-widest font-display hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
                            >
                                Show Full Collection
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
