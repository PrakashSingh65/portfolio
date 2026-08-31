'use client';

import React from 'react';

const blogsData = [
  {
    title: "BUILDING A SECURE OAUTH SERVER WITH NODE.JS",
    category: "SECURITY",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "DOCKER FOR DEVELOPERS: COMPLETE HANDBOOK",
    category: "DEVOPS",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?q=80&w=600&auto=format&fit=crop",
  },
];

export default function BlogPage() {
  return (
    <section className="py-8 bg-transparent text-zinc-900 dark:text-white max-w-5xl mx-auto px-4">
      <div className="mb-6">
        <span className="text-zinc-500 dark:text-gray-400 text-xs uppercase tracking-wider font-semibold">
          FEATURED
        </span>
        <h2 className="text-3xl font-bold mt-1">Blogs</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogsData.map((blog, index) => (
          <div 
            key={index} 
            className="p-3 bg-zinc-100/90 dark:bg-zinc-900/90 border border-zinc-300 dark:border-zinc-800 rounded-2xl hover:border-zinc-400 dark:hover:border-zinc-700 transition-all shadow-sm group cursor-pointer"
          >
            <div className="overflow-hidden rounded-xl mb-3 aspect-[16/9] bg-zinc-200 dark:bg-zinc-800">
              <img 
                src={blog.image} 
                alt={blog.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex items-center gap-2 text-[11px] text-[#00a859] dark:text-[#00FF88] font-semibold mb-1">
              <span>{blog.category}</span>
              <span className="text-zinc-400">•</span>
              <span className="text-zinc-500 dark:text-gray-400 font-normal">{blog.readTime}</span>
            </div>
            <h3 className="text-lg font-bold text-zinc-800 dark:text-gray-100 group-hover:text-black dark:group-hover:text-white leading-snug">
              {blog.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}