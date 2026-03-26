export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center w-full">
      {/* Hero Section */}
      <section id="hero" className="w-full min-h-screen flex flex-col items-center justify-center pt-20 px-6">
        <div className="max-w-4xl flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-400/10 text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-8 border border-emerald-200 dark:border-emerald-400/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 dark:bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 dark:bg-emerald-400"></span>
            </span>
            Available for Work
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-linear-to-r from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-white/80 dark:to-white/40 bg-clip-text text-transparent">
            Crafting Digital <br className="hidden md:block" /> Experiences That Matter
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-white/60 mb-10 max-w-2xl">
            Hi, I'm John Doe. A Full Stack Developer passionate about elevating user experiences through clean code and modern design.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="/projects" className="px-8 py-3.5 bg-emerald-500 text-white dark:bg-emerald-400 dark:text-[#0b0416] font-semibold rounded-full hover:bg-emerald-600 dark:hover:bg-emerald-300 transition-colors">
              View My Work
            </a>
            <a href="/contact" className="px-8 py-3.5 bg-slate-100 text-slate-700 dark:bg-white/5 dark:text-white font-medium rounded-full hover:bg-slate-200 dark:hover:bg-white/10 transition-colors border border-slate-300 dark:border-white/10 shrink-0">
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}