import ProjectCard from "@/components/ProjectCard";
import { getProjectsData } from "@/lib/data";
import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const revalidate = 60;

const defaultProjects = [
  {
    _id: "default-1",
    projectName: "Neon E-Commerce",
    projectDesc: "A high-performance modern e-commerce platform with Next.js and Stripe integration. Features a stunning dark mode design.",
    projectTechStack: ["Next.js", "Tailwind", "Stripe"],
    githubLink: "https://github.com/PrakashSingh65",
    liveLink: "https://github.com/PrakashSingh65",
  },
  {
    _id: "default-2",
    projectName: "AI Chat Interface",
    projectDesc: "A sleek, responsive chat application utilizing OpenAI's API. Designed with a focus on typography and micro-interactions.",
    projectTechStack: ["React", "OpenAI", "Framer Motion"],
    githubLink: "https://github.com/PrakashSingh65",
    liveLink: "https://github.com/PrakashSingh65",
  },
  {
    _id: "default-3",
    projectName: "FinTech Dashboard",
    projectDesc: "An analytics dashboard for tracking personal finance with beautiful charts and real-time data sync.",
    projectTechStack: ["TypeScript", "Next.js", "Recharts"],
    githubLink: "https://github.com/PrakashSingh65",
    liveLink: "https://github.com/PrakashSingh65",
  },
];

export default async function ProjectsPage() {
  const dbProjects = await getProjectsData();
  const projects = dbProjects.length > 0 ? dbProjects : defaultProjects;

  return (
    <section id="projects" aria-label="Featured Projects" className="w-full max-w-6xl mx-auto px-4 lg:px-8 py-12 md:py-16">
      {/* Section Header */}
      <div className="flex flex-col mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold dark:text-emerald-400 text-emerald-600 uppercase tracking-wider">
              Featured
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
              Projects
            </h2>
          </div>
          <Link
            href="/projects/all-projects"
            aria-label="View all projects in detail"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:underline min-h-[44px]"
          >
            All projects <MoveRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div
            data-aos="fade-up"
            data-aos-delay={index * 150}
            key={project._id || index}
            className="h-full"
          >
            <ProjectCard {...project} />
          </div>
        ))}
      </div>

      {/* Centered Show All Projects CTA */}
      <div className="flex justify-center w-full mt-12">
        <Link href="/projects/all-projects" aria-label="Browse full portfolio of projects">
          <Button variant="outline" className="hover:bg-emerald-50 dark:hover:bg-zinc-800 cursor-pointer min-h-[44px]">
            Show all projects <MoveRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
