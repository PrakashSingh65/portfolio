import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface ProjectCardProps {
  _id: string;
  projectName: string;
  projectDesc: string;
  projectSubDesc?: string;
  projectImage?: string;
  projectTechStack: string[];
  githubLink?: string;
  liveLink?: string;
}

export default function ProjectCard({
  projectName,
  projectDesc,
  projectSubDesc,
  projectImage,
  projectTechStack,
  githubLink,
  liveLink,
  _id
}: ProjectCardProps) {
  return (
    <div className="group relative rounded-3xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 overflow-hidden hover:border-emerald-500/40 hover:bg-slate-50 dark:hover:border-emerald-400/40 dark:hover:bg-white/[0.04] transition-all duration-500 shadow-sm hover:shadow-md dark:shadow-none dark:hover:shadow-none flex flex-col h-full">
      <div className="aspect-[16/10] bg-slate-100 dark:bg-white/5 relative overflow-hidden shrink-0">
        {projectImage ? (
          <Image
            src={projectImage}
            alt={projectName}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 dark:from-emerald-400/20 to-transparent group-hover:scale-105 transition-transform duration-700 ease-out" />
            <div className="absolute inset-0 flex items-center justify-center text-slate-900/10 dark:text-white/30 font-bold text-3xl tracking-widest uppercase mix-blend-overlay">
              {projectName}
            </div>
          </>
        )}
      </div>
      <div className="p-8 flex flex-col flex-1">
        <h3 className="text-2xl font-semibold mb-3 text-slate-800 dark:text-white group-hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">
          {projectName}
        </h3>
        {projectSubDesc && (
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-500 dark:text-emerald-400 mb-2">
            {projectSubDesc}
          </p>
        )}
        <p className="text-slate-600 dark:text-white/60 text-sm mb-6 leading-relaxed line-clamp-3 flex-1">
          {projectDesc}
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {projectTechStack.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-slate-200 dark:bg-white/10 rounded-full text-xs font-semibold text-slate-700 dark:text-white/80 tracking-wide"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link
              href={`/projects/${_id}`}
              className="
                flex items-center gap-1 
                text-sm font-medium text-zinc-600 dark:text-zinc-400 
                hover:text-zinc-900 dark:hover:text-white transition-colors
              "
            >
              View Details
              <ArrowRight size={16} />
            </Link>
        <div className="flex gap-4 mt-auto border-t border-slate-100 dark:border-white/5 pt-4">
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-white/70 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              Source
            </a>
          )}
          {liveLink && (
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-white/70 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
            >
              <svg
                className="w-4 h-4 animate-pulse"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
