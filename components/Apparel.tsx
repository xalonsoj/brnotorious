import Image from 'next/image';

const apparelItems = [
    {
        id: 1,
        name: 'Identity Tee',
        material: '100% Organic Cotton',
        price: '€28.00',
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZDxK5xQjUX8jm99HzViWH01VISxDjEsiyICnExFFGNNI6XYRfL0N8FFLGG47JK5um4WZTLrhFUZgZVKk1vjy9KGJGixj-NSBO5YpS67VXnLGOOT4VrlDjXEzdVBlnecPnh3QnxEcYD71ozx2o4z-S-wJy8HtfmQZLz44fi_bwM2G_sFoUErdwe5kkrfd_tqxe4DxkqQf_QAbbz752qw9KdbwUqGYc7nCIvY5pKq4tauo_p9JPxYoDyhVu4RXBkX6Zgra6MlA1Jzc',
    },
    {
        id: 2,
        name: 'Market Tote',
        material: 'Heavy Canvas',
        price: '€15.00',
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcui9_nBHWKvHXlhjAcHaI25RREvva0GuNFKG3FiV13Pq5JsR59oWPQXY-LdFK2SyG2iMQGIs7ESyYVDJigF7anNcYU0622_WpaQjisp5v1yj3EMilssoF8-w_fXFwsoXVxCE7BRuZWgdxrLnlU_L5AcRzJ3ctQNt-OWLuyinClNsrCPqg8kX3znTfYUhl7Hhed75fFh6VfYJs1Wx-Wpen_-Ntlf4iNmpxNs7PG1CrjG4ZRBVRrqnadYFIxns7xWjC8-_iv4t3pPE',
    },
    {
        id: 3,
        name: 'Urban Cap',
        material: 'Adjustable Fit',
        price: '€22.00',
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASDwlfl6Z_cdBe6OwTQItN6KRNtrdfJsW2ELeaO35Wp0c6CW7el1MUstmvg276Ovx0MWqN4zlYAV1AZpC6zwfjAlRNAWnFb48_fWi16t8nRJJbANa5syBQX-KO5zDdyoxTSqeB5Fp1M2eMAzpoJSo7Gfo1MIvNhMtsPtrbbcdnO2HvpkxEd6bHQTzRNigH12casOsEcrFxRTQ4ID_nzpExt8Ic7oVyibHTyWa9QhFEfE3jBG8kwKF0RB9StoetaMeu9q7hXv3VNWM',
    },
    {
        id: 4,
        name: 'Backprint Edition',
        material: 'Limited Run',
        price: '€32.00',
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCX2GKNR7AOSqz5gvCrWyYt51J3qdPzdx2DP9_MQ6Qcu0M9wIlxcHD3KbW5BSoTw_KWh8PE7yYUCbRK3DxGLz7Jl3Gd4nBfZgBiQ_4a8-NcUbrXtGC0JUFB8eCa_nFHG5pm-migyA7XsQymVu5XidIKX40hJhdqLH8OOBzuutirkzwI5KuiNNuFadBeanMLzEOsuFuDHxfEr0gzd7vHLoKQQPQuXzLQ8bNX9i1fKIP0D8Pa5EdJ0cGMacG-aRTJqHJ8x3p06xjamxo',
    },
];

export default function Apparel() {
    return (
        <section className="py-16 md:py-24 border-t border-gray-100 dark:border-gray-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 md:mb-16">
                    <div className="flex items-center space-x-4 mb-8 md:mb-0">
                        <span className="bg-black text-white dark:bg-white dark:text-black px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] font-display transition-colors">
                            Wear Brno
                        </span>
                        <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tighter text-gray-900 dark:text-white transition-colors uppercase">
                            Collection 02 <span className="md:inline hidden opacity-20">/</span> Apparel
                        </h2>
                    </div>
                    <div className="flex space-x-8 overflow-x-auto pb-4 md:pb-0 no-scrollbar whitespace-nowrap -mx-4 px-4 md:mx-0 md:px-0">
                        <button className="px-2 py-2 text-[10px] font-display font-bold tracking-[0.3em] border-b-2 border-black dark:border-white uppercase text-gray-900 dark:text-white transition-colors">
                            All Items
                        </button>
                        <button className="px-2 py-2 text-[10px] font-display font-bold text-gray-300 hover:text-black dark:hover:text-white transition-colors uppercase tracking-[0.3em]">
                            T-Shirts
                        </button>
                        <button className="px-2 py-2 text-[10px] font-display font-bold text-gray-300 hover:text-black dark:hover:text-white transition-colors uppercase tracking-[0.3em]">
                            Tote Bags
                        </button>
                        <button className="px-2 py-2 text-[10px] font-display font-bold text-gray-300 hover:text-black dark:hover:text-white transition-colors uppercase tracking-[0.3em]">
                            Caps & More
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
                    {apparelItems.map((item) => (
                        <div key={item.id} className="group cursor-pointer">
                            <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-sm md:rounded-lg aspect-[4/5] mb-4 md:mb-6 transition-colors">
                                <Image
                                    src={item.src}
                                    alt={item.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                />
                            </div>
                            <div className="flex flex-col">
                                <h3 className="font-display font-bold text-sm md:text-lg tracking-tight text-gray-900 dark:text-white transition-colors uppercase">
                                    {item.name}
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400 text-[10px] md:text-sm font-light mt-0.5 md:mt-1 transition-colors">
                                    {item.material}
                                </p>
                                <p className="font-mono text-xs md:text-sm mt-2 md:mt-3 font-bold text-gray-900 dark:text-white transition-colors">
                                    {item.price}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
