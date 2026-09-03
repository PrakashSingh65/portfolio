import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { formatExternalUrl } from '@/lib/utils';

interface ProjectCardProps {
  _id: string;
  projectName: string;
  projectDesc: string;
  projectSubDesc?: string;
  projectImage?: string;
  projectTechStack?: string[];
  githubLink?: string;
  liveLink?: string;
}

export default function ProjectCard({
  projectName,
  projectDesc,
  projectSubDesc,
  projectImage,
  projectTechStack = [],
  githubLink,
  liveLink,
  _id,
}: ProjectCardProps) {
  const formattedLiveLink = formatExternalUrl(liveLink);
  const formattedGithubLink = formatExternalUrl(githubLink);
  const techList = Array.isArray(projectTechStack) ? projectTechStack : [];

  return (
    <div className="group relative rounded-2xl bg-white dark:bg-[#171717] border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/40 dark:hover:border-emerald-400/40 shadow-sm hover:shadow-xl dark:shadow-none transition-all duration-300 flex flex-col h-full overflow-hidden">
      {/* Top Image & Badge */}
      <div className="aspect-[16/10] bg-zinc-100 dark:bg-zinc-900 relative overflow-hidden shrink-0">
        {projectImage ? (
          <Image
            src={projectImage}
            alt={projectName}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 dark:from-emerald-400/20 to-transparent flex items-center justify-center">
            <span className="text-zinc-400 dark:text-zinc-600 font-bold text-3xl tracking-widest uppercase">
              {projectName}
            </span>
          </div>
        )}

        {/* Live Badge Overlay */}
        {formattedLiveLink && (
          <div className="absolute top-3 right-3 z-10">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-600/90 text-white shadow-md backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Live
            </span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-6 flex flex-col flex-1">
        {projectSubDesc && (
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1.5">
            {projectSubDesc}
          </p>
        )}

        <h3 className="text-xl font-bold mb-2 text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
          <Link href={`/projects/${_id}`}>
            {projectName}
          </Link>
        </h3>

        <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4 leading-relaxed line-clamp-3 flex-1">
          {projectDesc}
        </p>

        {/* Tech Stack */}
        {techList.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {techList.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60 rounded-md text-xs font-medium text-zinc-700 dark:text-zinc-300"
              >
                {tag}
              </span>
            ))}
            {techList.length > 4 && (
              <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800/60 rounded-md text-xs font-medium text-zinc-500 dark:text-zinc-400">
                +{techList.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Card Footer Actions */}
        <div className="flex items-center justify-between mt-auto border-t border-zinc-100 dark:border-zinc-800/80 pt-4">
          <Link
            href={`/projects/${_id}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            View Details
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <div className="flex items-center gap-2">
            {formattedGithubLink && (
              <a
                href={formattedGithubLink}
                target="_blank"
                rel="noopener noreferrer"
                title="View Source Code"
                className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                Code
              </a>
            )}

            {formattedLiveLink && (
              <a
                href={formattedLiveLink}
                target="_blank"
                rel="noopener noreferrer"
                title="View Live Demo"
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs hover:shadow-emerald-500/20 transition-all"
              >
                <ExternalLink size={13} />
                Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
