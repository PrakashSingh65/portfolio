'use client';

import React from 'react';

const certificatesData = [
  {
    title: "Full Stack Web Development",
    issuer: "Udemy",
    date: "2025",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "React & Next.js Advanced Certificate",
    issuer: "Coursera",
    date: "2025",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "Node.js & Backend Architecture",
    issuer: "HackerRank",
    date: "2026",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=600&auto=format&fit=crop",
  },
];

export default function CertificatePage() {
  return (
    <section className="py-8 bg-transparent text-zinc-900 dark:text-white max-w-5xl mx-auto px-4">
      <div className="mb-6">
        <span className="text-zinc-500 dark:text-gray-400 text-xs uppercase tracking-wider font-semibold">
          FEATURED
        </span>
        <h2 className="text-3xl font-bold mt-1">Certificates</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {certificatesData.map((cert, index) => (
          <div 
            key={index} 
            className="p-3 bg-zinc-100/90 dark:bg-zinc-900/90 border border-zinc-300 dark:border-zinc-800 rounded-2xl hover:border-zinc-400 dark:hover:border-zinc-700 transition-all shadow-sm group cursor-pointer"
          >
            <div className="overflow-hidden rounded-xl mb-3 aspect-[16/10] bg-zinc-200 dark:bg-zinc-800">
              <img 
                src={cert.image} 
                alt={cert.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="text-base font-semibold text-zinc-800 dark:text-gray-100 group-hover:text-black dark:group-hover:text-white line-clamp-1">
              {cert.title}
            </h3>
            <p className="text-xs text-zinc-500 dark:text-gray-400 mt-1">
              {cert.issuer} • {cert.date}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button className="px-5 py-2.5 bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-xl text-sm font-medium hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors text-zinc-800 dark:text-gray-200">
          Show all Certificates →
        </button>
      </div>
    </section>
  );
}