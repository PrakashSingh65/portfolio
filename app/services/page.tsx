export default function ServicesPage() {
  const services = [
    {
      title: "Web Development",
      description: "Building responsive, fast, and scalable web applications using modern frameworks like React, Next.js, and Node.js.",
      icon: "🌐"
    },
    {
      title: "UI/UX Design",
      description: "Crafting beautiful, intuitive user interfaces and experiences with a focus on modern design principles and animations.",
      icon: "✨"
    },
    {
      title: "Backend Architecture",
      description: "Designing robust APIs and database schemas to ensure seamless data flow and secure user interactions.",
      icon: "⚙️"
    }
  ];

  return (
    <main className="flex min-h-screen flex-col items-center w-full pt-32 transition-colors duration-300">
      <section className="w-full py-12 px-6 max-w-6xl mx-auto flex-1 flex flex-col justify-center">
        <div className="flex items-center gap-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">My Services</h2>
          <div className="h-px flex-1 bg-linear-to-r from-slate-200 dark:from-white/20 to-transparent" />
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="p-8 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-emerald-500/50 dark:hover:border-emerald-400/30 transition-all group shadow-sm dark:shadow-none hover:shadow-md dark:hover:shadow-none">
              <div className="text-4xl mb-6 bg-emerald-100 dark:bg-emerald-400/10 w-16 h-16 rounded-xl flex items-center justify-center border border-emerald-200 dark:border-emerald-400/20 group-hover:scale-110 transition-transform shadow-inner dark:shadow-none">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-white">{service.title}</h3>
              <p className="text-slate-600 dark:text-white/60 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
