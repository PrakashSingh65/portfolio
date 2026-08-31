'use client';

import React from 'react';

const certificatesData = [
  {
    id: 1,
    title: "Full Stack Web Development",
    issuer: "Udemy / Coursera",
    date: "2024",
    credentialId: "CERT-849201",
    link: "#",
    skills: ["React", "Node.js", "MongoDB"],
  },
  {
    id: 2,
    title: "React & Next.js Professional Certification",
    issuer: "Meta / HackerRank",
    date: "2025",
    credentialId: "CERT-392014",
    link: "#",
    skills: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    id: 3,
    title: "Claude AI & Vibe Coding Workshop",
    issuer: "AI Certificate",
    date: "2026",
    credentialId: "CERT-104928",
    link: "#",
    skills: ["AI Agents", "MCP", "Vibe Coding"],
  },
];

export default function CertificatePage() {
  return (
    <section className="min-h-screen bg-background text-foreground px-6 py-12 max-w-5xl mx-auto font-sans transition-colors duration-200">
      <div className="mb-10">
        <span className="text-muted-foreground text-sm tracking-wider uppercase font-medium">
          Featured
        </span>
        <h1 className="text-4xl font-extrabold text-foreground mt-1">
          Certificates
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {certificatesData.map((cert) => (
          <div
            key={cert.id}
            className="flex flex-col justify-between p-5 bg-card border border-border rounded-xl hover:border-primary/50 hover:bg-accent/30 transition-all duration-200 group shadow-sm"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-primary font-bold text-lg mb-4 group-hover:scale-105 transition-transform">
                
              </div>

              <h2 className="text-lg font-bold text-card-foreground group-hover:text-primary transition-colors duration-200 mb-1 leading-snug">
                {cert.title}
              </h2>

              <p className="text-xs text-muted-foreground mb-3">
                {cert.issuer} • <span className="font-medium text-foreground">{cert.date}</span>
              </p>

              <div className="flex gap-1.5 flex-wrap mb-4">
                {cert.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] bg-muted text-muted-foreground px-2 py-0.5 rounded-md font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-border/50 flex items-center justify-between mt-auto">
              <span className="text-[11px] text-muted-foreground font-mono">
                ID: {cert.credentialId}
              </span>
              <a
                href={cert.link}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
              >
                Verify ↗
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}