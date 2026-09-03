import React from "react";
import mongoose from "mongoose";
import { ConnectDB } from "@/lib/db";
import Project, { IProject } from "@/models/project.model";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { MarkdownRender } from "@/components/MarkdownRender";
import { formatExternalUrl } from "@/lib/utils";

async function fetchProject(id: string): Promise<IProject | null> {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    await ConnectDB();
    const project = await Project.findById(id).lean<IProject>();
    if (!project) return null;

    return {
      ...project,
      _id: project._id?.toString(),
    };
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}

export default async function ProjectPageById({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await fetchProject(id);

  if (!project) {
    return (
      <div className="min-h-screen pt-28 flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4">
        <div className="text-center space-y-6">
          <h1 className="text-3xl md:text-5xl font-bold text-zinc-800 dark:text-zinc-100">
            Project Not Found
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            The project you are looking for does not exist or has been removed.
          </p>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 hover:underline font-medium"
          >
            <ArrowLeft size={18} />
            Back to all projects
          </Link>
        </div>
      </div>
    );
  }

  const formattedLiveLink = formatExternalUrl(project.liveLink);
  const formattedGithubLink = formatExternalUrl(project.githubLink);

  return (
    <div className="min-h-screen pt-28 pb-16">
      <div className="max-w-5xl mx-auto px-6 lg:px-8 space-y-8">
        {/* Back Link */}
        <div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium"
          >
            <ArrowLeft size={16} /> Back to Projects
          </Link>
        </div>

        {/* Hero Image */}
        {project.projectImage && (
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl">
            <Image
              src={project.projectImage}
              alt={project.projectName}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Title & Actions */}
        <div className="text-center pt-4">
          {project.projectSubDesc && (
            <p className="text-xs md:text-sm font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2">
              {project.projectSubDesc}
            </p>
          )}

          <h1 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight">
            {project.projectName}
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            {formattedLiveLink && (
              <a
                href={formattedLiveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-medium hover:scale-105 transition-all shadow-md hover:shadow-emerald-500/20"
              >
                <ExternalLink size={18} />
                View Live Demo
              </a>
            )}

            {formattedGithubLink && (
              <a
                href={formattedGithubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-white rounded-full font-medium hover:scale-105 transition-all border border-zinc-700"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                Source Code
              </a>
            )}
          </div>
        </div>

        {/* Tech Stack */}
        {project.projectTechStack && project.projectTechStack.length > 0 && (
          <div className="pt-6">
            <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mb-4">
              Built with
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {project.projectTechStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3.5 py-1.5 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Markdown Description */}
        {project.projectDesc && (
          <article className="pt-6 prose prose-zinc dark:prose-invert max-w-none">
            <MarkdownRender content={project.projectDesc} />
          </article>
        )}
      </div>
    </div>
  );
}