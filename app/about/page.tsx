export default function AboutPage() {
  const skills = [
    "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "Node.js", "GraphQL", "PostgreSQL"
  ];

  return (
    <main className="flex min-h-screen flex-col items-center w-full pt-32 transition-colors duration-300">
      <section id="about" className="w-full py-12 px-6 relative flex-1 flex flex-col justify-center">
        <div className="absolute inset-0 bg-slate-100/50 dark:bg-white/2" />
        <div className="max-w-6xl mx-auto relative z-10 w-full">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">About Me</h2>
            <div className="h-px flex-1 bg-linear-to-r from-slate-200 dark:from-white/20 to-transparent" />
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-slate-700 dark:text-white/70 leading-relaxed mb-6 text-lg">
                I specialize in building scalable web applications with a focus on performance and beautiful interfaces. With a strong foundation in modern JavaScript frameworks, I enjoy bridging the gap between design and engineering.
              </p>
              <p className="text-slate-700 dark:text-white/70 leading-relaxed text-lg">
                When I'm not coding, you can find me exploring new technologies, contributing to open-source, or enjoying a good cup of coffee.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-slate-800 dark:text-white">
                <span className="text-emerald-500 dark:text-emerald-400">⚡</span> Technologies I use
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill} className="px-4 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm font-medium text-slate-700 dark:text-white/80 hover:bg-emerald-50 dark:hover:bg-emerald-400/10 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-200 dark:hover:border-emerald-400/30 transition-all cursor-default shadow-sm dark:shadow-none">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
