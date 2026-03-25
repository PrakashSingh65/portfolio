import ProjectCard from "./components/ProjectCard";

export default function Home() {
  const projects = [
    {
      title: "Neon E-Commerce",
      description: "A high-performance modern e-commerce platform with Next.js and Stripe integration. Features a stunning dark mode design.",
      tags: ["Next.js", "Tailwind", "Stripe"]
    },
    {
      title: "AI Chat Interface",
      description: "A sleek, responsive chat application utilizing OpenAI's API. Designed with a focus on typography and micro-interactions.",
      tags: ["React", "OpenAI", "Framer Motion"]
    },
    {
      title: "FinTech Dashboard",
      description: "An analytics dashboard for tracking personal finance with beautiful charts and real-time data sync.",
      tags: ["TypeScript", "Next.js", "Recharts"]
    }
  ];

  const skills = [
    "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "Node.js", "GraphQL", "PostgreSQL"
  ];

  return (
    <main className="flex min-h-screen flex-col items-center w-full">
      {/* Hero Section */}
      <section id="hero" className="w-full min-h-screen flex flex-col items-center justify-center pt-20 px-6">
        <div className="max-w-4xl flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/10 text-emerald-400 text-sm font-medium mb-8 border border-emerald-400/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            Available for Work
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-linear-to-r from-white via-white/80 to-white/40 bg-clip-text text-transparent">
            Crafting Digital <br className="hidden md:block" /> Experiences That Matter
          </h1>
          <p className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl">
            Hi, I'm John Doe. A Full Stack Developer passionate about elevating user experiences through clean code and modern design.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#projects" className="px-8 py-3.5 bg-emerald-400 text-[#0b0416] font-semibold rounded-full hover:bg-emerald-300 transition-colors">
              View My Work
            </a>
            <a href="#contact" className="px-8 py-3.5 bg-white/5 text-white font-medium rounded-full hover:bg-white/10 transition-colors border border-white/10 shrink-0">
              Get in Touch
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="w-full py-24 px-6 relative">
        <div className="absolute inset-0 bg-white/2" />
        <div className="max-w-6xl mx-auto relative z-10 w-full">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">About Me</h2>
            <div className="h-px flex-1 bg-linear-to-r from-white/20 to-transparent" />
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-white/70 leading-relaxed mb-6 text-lg">
                I specialize in building scalable web applications with a focus on performance and beautiful interfaces. With a strong foundation in modern JavaScript frameworks, I enjoy bridging the gap between design and engineering.
              </p>
              <p className="text-white/70 leading-relaxed text-lg">
                When I'm not coding, you can find me exploring new technologies, contributing to open-source, or enjoying a good cup of coffee.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <span className="text-emerald-400">⚡</span> Technologies I use
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-medium text-white/80 hover:bg-emerald-400/10 hover:text-emerald-400 hover:border-emerald-400/30 transition-all cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="w-full py-24 px-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">Featured Projects</h2>
          <div className="h-px flex-1 bg-linear-to-r from-white/20 to-transparent" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full py-32 px-6">
        <div className="max-w-2xl mx-auto text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-emerald-400/10 rounded-full flex items-center justify-center mb-6 border border-emerald-400/20">
            <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's work together</h2>
          <p className="text-white/60 text-lg mb-10">
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
          <a href="mailto:hello@example.com" className="px-8 py-4 bg-white text-[#0b0416] font-bold rounded-full hover:bg-emerald-400 transition-colors text-lg">
            Say Hello
          </a>
        </div>
      </section>
    </main>
  );
}