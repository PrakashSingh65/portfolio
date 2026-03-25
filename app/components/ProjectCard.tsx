import Image from 'next/image';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  link?: string;
}

export default function ProjectCard({ title, description, tags, link }: ProjectCardProps) {
  return (
    <div className="group relative rounded-3xl bg-white/[0.02] border border-white/10 overflow-hidden hover:border-emerald-400/40 hover:bg-white/[0.04] transition-all duration-500">
      <div className="aspect-[16/10] bg-white/5 relative overflow-hidden">
        {/* Placeholder for an actual image */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-transparent group-hover:scale-105 transition-transform duration-700 ease-out" />
        <div className="absolute inset-0 flex items-center justify-center text-white/30 font-bold text-3xl tracking-widest uppercase mix-blend-overlay">
          {title}
        </div>
      </div>
      <div className="p-8">
        <h3 className="text-2xl font-semibold mb-3 group-hover:text-emerald-400 transition-colors">{title}</h3>
        <p className="text-white/60 text-sm mb-8 leading-relaxed line-clamp-3">{description}</p>
        <div className="flex flex-wrap gap-2 relative z-20">
          {tags.map((tag) => (
            <span key={tag} className="px-3 py-1 bg-white/10 rounded-full text-xs font-semibold text-white/80 tracking-wide">
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
