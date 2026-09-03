import React from "react";
import ProjectCard from "@/components/ProjectCard";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ConnectDB } from "@/lib/db";
import Project, { IProject } from "@/models/project.model";
import { Separator } from "@/components/ui/separator";

async function fetchProjects(): Promise<IProject[]> {
  await ConnectDB();
  const projects = await Project.find()
    .sort({ priority: 1, createdAt: -1 })
    .lean<IProject[]>();
  return projects.map((project) => ({
    ...project,
    _id: project._id?.toString(),
  }));
}

export default async function AllProjectsPage() {
  const projects = await fetchProjects();

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 md:px-8 max-w-6xl mx-auto space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium"
        >
          <ArrowLeft size={16} /> Back to Featured
        </Link>
      </div>

      {/* Header */}
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
          All Projects
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 font-medium max-w-lg text-sm md:text-base">
          Explore my complete collection of projects, applications, and experiments across various tech stacks.
        </p>
      </div>

      <Separator />

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard
            key={project._id}
            _id={project._id!}
            projectName={project.projectName}
            projectSubDesc={project.projectSubDesc}
            projectDesc={project.projectDesc}
            projectImage={project.projectImage}
            projectTechStack={project.projectTechStack}
            githubLink={project.githubLink}
            liveLink={project.liveLink}
          />
        ))}
      </div>
    </div>
  );
}