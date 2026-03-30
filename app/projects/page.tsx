import ProjectCard from "../../components/ProjectCard";

export default function ProjectsPage() {
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

  return (
    <main className="flex min-h-screen flex-col items-center w-full pt-32 transition-colors duration-300">
      <section id="projects" className="w-full py-12 px-6 max-w-6xl mx-auto flex-1 flex flex-col justify-center overflow-hidden">
        <div data-aos="fade-right" className="flex items-center gap-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Featured Projects</h2>
          <div className="h-px flex-1 bg-linear-to-r from-slate-200 dark:from-white/20 to-transparent" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div data-aos="fade-up" data-aos-delay={index * 200} key={index} className="h-full">
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
