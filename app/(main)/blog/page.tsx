'use client';

import React from 'react';

const blogsData = [
  {
    id: 1,
    title: "Building a Secure OAuth Server with Node.js",
    category: "Backend Development",
    date: "Aug 20, 2026",
    readTime: "6 min read",
    description: "Learn how to implement a complete OAuth 2.0 authorization server from scratch using Node.js, Express, and JSON Web Tokens (JWT).",
    tags: ["Node.js", "OAuth", "Security"],
  },
  {
    id: 2,
    title: "Mastering Next.js 14 App Router & Server Actions",
    category: "Frontend",
    date: "Aug 12, 2026",
    readTime: "8 min read",
    description: "A deep dive into Next.js App Directory routing, server components, and replacing legacy API routes with modern Server Actions.",
    tags: ["Next.js", "React", "TypeScript"],
  },
  {
    id: 3,
    title: "Optimizing MongoDB Queries for High-Traffic Apps",
    category: "Database",
    date: "Jul 28, 2026",
    readTime: "5 min read",
    description: "Best practices for indexing, aggregation pipelines, and schema modeling to drastically reduce database latency in production.",
    tags: ["MongoDB", "Database", "Performance"],
  },
  {
    id: 4,
    title: "Containerizing Full-Stack Applications with Docker",
    category: "DevOps",
    date: "Jul 15, 2026",
    readTime: "7 min read",
    description: "Step-by-step guide to writing Dockerfiles and docker-compose files for multi-container Next.js, Express, and Database setups.",
    tags: ["Docker", "DevOps", "Deployment"],
  },
];

export default function BlogPage() {
  return (
    <section className="min-h-screen bg-background text-foreground px-6 py-12 max-w-5xl mx-auto font-sans transition-colors duration-200">
      {/* Header */}
      <div className="mb-10">
        <span className="text-muted-foreground text-sm tracking-wider uppercase font-medium">
          Featured
        </span>
        <h1 className="text-4xl font-extrabold text-foreground mt-1">
          Blogs
        </h1>
      </div>

      {/* Blog Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogsData.map((blog) => (
          <article
            key={blog.id}
            className="flex flex-col justify-between p-6 bg-card border border-border rounded-xl hover:border-primary/50 hover:bg-accent/40 transition-all duration-200 cursor-pointer group shadow-sm"
          >
            <div>
              {/* Meta Info */}
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                <span className="px-2.5 py-1 bg-secondary text-secondary-foreground rounded-md font-medium">
                  {blog.category}
                </span>
                <span>{blog.date} • {blog.readTime}</span>
              </div>

              {/* Title */}
              <h2 className="text-xl font-bold text-card-foreground group-hover:text-primary transition-colors duration-200 mb-2">
                {blog.title}
              </h2>

              {/* Description */}
              <p className="text-sm text-muted-foreground line-clamp-3 mb-4 leading-relaxed">
                {blog.description}
              </p>
            </div>

            {/* Tags & Footer */}
            <div className="pt-4 border-t border-border/50 flex items-center justify-between mt-auto">
              <div className="flex gap-2 flex-wrap">
                {blog.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <span className="text-sm font-semibold text-primary group-hover:translate-x-1 transition-transform duration-200">
                Read →
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}