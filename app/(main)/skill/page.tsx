'use client';

import React from 'react';

const skillsData = [
  {
    category: "Frontend",
    skills: [
      { name: "Next.js" },
      { name: "React" },
      { name: "Zustand" },
      { name: "TanStack Query" },
      { name: "CSS" },
      { name: "Tailwind CSS" },
      { name: "HTML" },
      { name: "Redux Toolkit" },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Socket.io" },
      { name: "GraphQL" },
      { name: "NodeJS" },
      { name: "FastAPI" },
      { name: "Express" },
      { name: "Redis" },
    ],
  },
  {
    category: "Database",
    skills: [
      { name: "Prisma" },
      { name: "PostgreSQL" },
      { name: "MongoDB" },
    ],
  },
  {
    category: "Language",
    skills: [
      { name: "TypeScript" },
      { name: "Golang" },
      { name: "Python" },
      { name: "JavaScript" },
    ],
  },
  {
    category: "Tools",
    skills: [
      { name: "GitHub" },
      { name: "Git" },
      { name: "Docker" },
    ],
  },
  {
    category: "Other",
    skills: [
      { name: "Postman" },
      { name: "Markdown" },
    ],
  },
];

export default function SkillPage() {
  return (
    <section className="min-h-screen bg-background text-foreground px-6 py-12 max-w-5xl mx-auto font-sans transition-colors duration-200">
      <div className="mb-10">
        <span className="text-muted-foreground text-sm tracking-wider uppercase font-medium">
          Featured
        </span>
        <h1 className="text-4xl font-extrabold text-foreground mt-1">
          Skills
        </h1>
      </div>

      <div className="space-y-10">
        {skillsData.map((group, idx) => (
          <div key={idx}>
            <h2 className="text-xl font-bold mb-4 text-foreground/90 tracking-wide">
              {group.category}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
              {group.skills.map((skill, sIdx) => (
                <div
                  key={sIdx}
                  className="flex items-center gap-3 px-4 py-3 bg-card border border-border rounded-xl hover:border-primary/50 hover:bg-accent transition-all duration-200 cursor-pointer group shadow-sm"
                >
                  {/* Shadcn Primary Indicator Dot */}
                  <div className="w-2.5 h-2.5 rounded-full bg-primary/70 group-hover:scale-125 transition-transform duration-200" />
                  
                  {/* Skill Name */}
                  <span className="text-sm font-medium text-card-foreground group-hover:text-accent-foreground truncate">
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