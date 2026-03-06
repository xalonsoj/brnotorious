import Story from "@/components/Story";

export default function StoryPage() {
    return (
        <main className="pt-20">
            <Story />
            <section className="py-20 bg-white dark:bg-black transition-colors">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h3 className="text-3xl md:text-5xl font-display font-bold uppercase mb-12 tracking-tight">
                        Our Vision
                    </h3>
                    <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-light mb-8">
                        Founded in the heart of Moravia, Brnotorious was born from a desire to celebrate the unique character of Brno. We believe that urban culture isn&apos;t just about buildings; it&apos;s about the stories, the people, and the distinct &quot;State of Mind&quot; that defines our city.
                    </p>
                    <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-light">
                        Every product in our collection is a piece of Brno. Designed locally, produced with care, and meant to be worn or displayed with pride.
                    </p>
                </div>
            </section>
        </main>
    );
}
