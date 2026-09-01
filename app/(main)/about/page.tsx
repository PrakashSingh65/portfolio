import { getAboutData } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const aboutDoc = await getAboutData();
  const description = aboutDoc?.description;

  return (
    <main className="flex min-h-screen flex-col items-center w-full pt-32 transition-colors duration-300">
      <section id="about" className="w-full py-12 px-6 relative flex-1 flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 bg-slate-100/50 dark:bg-white/2" />
        <div className="max-w-4xl mx-auto relative z-10 w-full">
          <div data-aos="fade-down" className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">About Me</h2>
            <div className="h-px flex-1 bg-linear-to-r from-slate-200 dark:from-white/20 to-transparent" />
          </div>
          
          <div data-aos="fade-up" data-aos-delay="200">
            {description ? (
              <p className="text-slate-700 dark:text-white/70 leading-relaxed text-lg whitespace-pre-wrap">
                {description}
              </p>
            ) : (
              <div className="space-y-6">
                <p className="text-slate-700 dark:text-white/70 leading-relaxed text-lg">
                  I specialize in building scalable web applications with a focus on performance and beautiful interfaces. With a strong foundation in modern JavaScript frameworks, I enjoy bridging the gap between design and engineering.
                </p>
                <p className="text-slate-700 dark:text-white/70 leading-relaxed text-lg">
                  When I'm not coding, you can find me exploring new technologies, contributing to open-source, or enjoying a good cup of coffee.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}