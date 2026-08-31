'use client';

import React from 'react';

const skillsData = [
  {
    category: "Frontend",
    skills: [
      { name: "Next.js", color: "bg-black text-white border-zinc-700" },
      { name: "React", color: "bg-cyan-950/40 text-cyan-400 border-cyan-800/50" },
      { name: "Zustand", color: "bg-amber-950/30 text-amber-500 border-amber-800/40" },
      { name: "TanStack Query", color: "bg-rose-950/30 text-rose-400 border-rose-800/40" },
      { name: "CSS", color: "bg-blue-950/40 text-blue-400 border-blue-800/50" },
      { name: "Tailwind CSS", color: "bg-teal-950/40 text-teal-300 border-teal-800/50" },
      { name: "HTML", color: "bg-orange-950/30 text-orange-400 border-orange-800/40" },
      { name: "Redux Toolkit", color: "bg-purple-950/40 text-purple-400 border-purple-800/50" },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Socket.io", color: "bg-zinc-900 text-gray-200 border-zinc-700" },
      { name: "GraphQL", color: "bg-pink-950/30 text-pink-400 border-pink-800/40" },
      { name: "NodeJS", color: "bg-emerald-950/40 text-emerald-400 border-emerald-800/50" },
      { name: "FastAPI", color: "bg-teal-950/30 text-teal-400 border-teal-800/40" },
      { name: "Express", color: "bg-zinc-900 text-gray-200 border-zinc-700" },
      { name: "Redis", color: "bg-red-950/40 text-red-400 border-red-800/50" },
    ],
  },
  {
    category: "Database",
    skills: [
      { name: "Prisma", color: "bg-indigo-950/40 text-indigo-300 border-indigo-800/50" },
      { name: "PostgreSQL", color: "bg-sky-950/40 text-sky-400 border-sky-800/50" },
      { name: "MongoDB", color: "bg-green-950/40 text-green-400 border-green-800/50" },
    ],
  },
  {
    category: "Language",
    skills: [
      { name: "TypeScript", color: "bg-blue-950/50 text-blue-400 border-blue-700/60" },
      { name: "Golang", color: "bg-cyan-950/40 text-cyan-300 border-cyan-800/50" },
      { name: "Python", color: "bg-yellow-950/30 text-yellow-400 border-yellow-800/40" },
      { name: "JavaScript", color: "bg-amber-950/40 text-amber-300 border-amber-700/50" },
    ],
  },
  {
    category: "Tools",
    skills: [
      { name: "GitHub", color: "bg-zinc-900 text-white border-zinc-700" },
      { name: "Git", color: "bg-orange-950/40 text-orange-500 border-orange-800/50" },
      { name: "Docker", color: "bg-sky-950/40 text-sky-400 border-sky-800/50" },
    ],
  },
  {
    category: "Other",
    skills: [
      { name: "Postman", color: "bg-orange-950/30 text-orange-400 border-orange-800/40" },
      { name: "Markdown", color: "bg-zinc-900 text-gray-300 border-zinc-700" },
    ],
  },
];

export default function SkillPage() {
  return (
    <section className="min-h-screen bg-[#090a0f] text-white px-6 py-12 max-w-5xl mx-auto font-sans">
      <div className="mb-10">
        <span className="text-gray-400 text-sm tracking-wider uppercase font-medium">Featured</span>
        <h1 className="text-4xl font-extrabold text-white mt-1">Skills</h1>
      </div>

      <div className="space-y-10">
        {skillsData.map((group, idx) => (
          <div key={idx}>
            <h2 className="text-xl font-bold mb-4 text-gray-200 tracking-wide">
              {group.category}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
              {group.skills.map((skill, sIdx) => (
                <div
                  key={sIdx}
                  className={`flex items-center gap-3 px-4 py-3 bg-[#12131a] border border-zinc-800/90 rounded-xl hover:border-emerald-500/50 hover:bg-[#181a24] transition-all duration-200 cursor-pointer group shadow-sm`}
                >
                  {/* Skill Badge Icon */}
                  <div className={`w-3 h-3 rounded-full border ${skill.color} group-hover:scale-125 transition-transform duration-200`} />
                  
                  {/* Skill Name */}
                  <span className="text-sm font-medium text-gray-300 group-hover:text-white truncate">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}