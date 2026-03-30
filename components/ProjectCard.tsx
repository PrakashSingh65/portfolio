import Image from 'next/image';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  link?: string;
}

export default function ProjectCard({ title, description, tags, link }: ProjectCardProps) {
  return (
    <div className="group relative rounded-3xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 overflow-hidden hover:border-emerald-500/40 hover:bg-slate-50 dark:hover:border-emerald-400/40 dark:hover:bg-white/[0.04] transition-all duration-500 shadow-sm hover:shadow-md dark:shadow-none dark:hover:shadow-none">
      <div className="aspect-[16/10] bg-slate-100 dark:bg-white/5 relative overflow-hidden">
        {/* Placeholder for an actual image */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 dark:from-emerald-400/20 to-transparent group-hover:scale-105 transition-transform duration-700 ease-out" />
        <div className="absolute inset-0 flex items-center justify-center text-slate-900/10 dark:text-white/30 font-bold text-3xl tracking-widest uppercase mix-blend-overlay">
          {title}
        </div>
      </div>
      <div className="p-8">
        <h3 className="text-2xl font-semibold mb-3 text-slate-800 dark:text-white group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">{title}</h3>
        <p className="text-slate-600 dark:text-white/60 text-sm mb-8 leading-relaxed line-clamp-3">{description}</p>
        <div className="flex flex-wrap gap-2 relative z-20">
          {tags.map((tag) => (
            <span key={tag} className="px-3 py-1 bg-slate-200 dark:bg-white/10 rounded-full text-xs font-semibold text-slate-700 dark:text-white/80 tracking-wide">
              {tag}
            </span>
          ))}
        </div>
        {link && (
          <a href={link} className="absolute inset-0 z-10" aria-label={`View ${title}`} target="_blank" rel="noreferrer" />
        )}
      </div>
    </div>
  );
}
