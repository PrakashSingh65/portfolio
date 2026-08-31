'use client';

import React from 'react';

const skillsData = [
  {
    category: "Frontend",
    skills: [
      { name: "Next.js", color: "bg-black dark:bg-white" },
      { name: "React", color: "bg-cyan-500" },
      { name: "Zustand", color: "bg-amber-500" },
      { name: "TanStack Query", color: "bg-red-500" },
      { name: "CSS", color: "bg-blue-500" },
      { name: "Tailwind CSS", color: "bg-cyan-400" },
      { name: "HTML", color: "bg-orange-500" },
      { name: "Redux Toolkit", color: "bg-purple-500" },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Socket.io", color: "bg-zinc-600" },
      { name: "GraphQL", color: "bg-pink-500" },
      { name: "NodeJS", color: "bg-green-500" },
      { name: "FastAPI", color: "bg-teal-500" },
      { name: "Express", color: "bg-gray-500" },
      { name: "Redis", color: "bg-red-600" },
    ],
  },
  {
    category: "Database",
    skills: [
      { name: "Prisma", color: "bg-indigo-500" },
      { name: "PostgreSQL", color: "bg-blue-600" },
      { name: "MongoDB", color: "bg-emerald-500" },
    ],
  },
  {
    category: "Language",
    skills: [
      { name: "TypeScript", color: "bg-blue-500" },
      { name: "Golang", color: "bg-cyan-500" },
      { name: "Python", color: "bg-yellow-500" },
      { name: "JavaScript", color: "bg-yellow-400" },
    ],
  },
  {
    category: "Tools",
    skills: [
      { name: "Github", color: "bg-zinc-800" },
      { name: "Git", color: "bg-orange-600" },
      { name: "Docker", color: "bg-blue-500" },
    ],
  },
  {
    category: "Other",
    skills: [
      { name: "Postman", color: "bg-orange-500" },
      { name: "Markdown", color: "bg-zinc-700" },
    ],
  },
];

export default function Skill() {
  return (
    <section className="py-8 bg-transparent text-zinc-900 dark:text-white max-w-5xl mx-auto px-4">
      <div className="mb-6">
        <span className="text-zinc-500 dark:text-gray-400 text-xs uppercase tracking-wider font-semibold">
          FEATURED
        </span>
        <h2 className="text-3xl font-bold mt-1">Skills</h2>
      </div>

      <div className="space-y-8">
        {skillsData.map((group, idx) => (
          <div key={idx}>
            <h3 className="text-lg font-semibold mb-3 text-zinc-800 dark:text-gray-200">
              {group.category}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {group.skills.map((skill, sIdx) => (
                <div
                  key={sIdx}
                  className="flex items-center gap-3 p-3 bg-zinc-100/80 dark:bg-zinc-900/80 border border-zinc-300 dark:border-zinc-800 rounded-xl hover:border-zinc-400 dark:hover:border-zinc-700 transition-all cursor-pointer shadow-sm"
                >
                  <span className={`w-2.5 h-2.5 rounded-full ${skill.color}`}></span>
                  <span className="text-sm font-medium text-zinc-700 dark:text-gray-300 truncate">
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