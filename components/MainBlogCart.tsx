"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface MainBlogCardProps {
  _id: string;
  title: string;
  image: string;
  tags: string[];
}

const MainBlogCard: React.FC<MainBlogCardProps> = ({
  _id,
  title,
  image,
  tags,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <article
        className="
          group relative flex flex-col overflow-hidden rounded-2xl 
          border border-zinc-200 dark:border-[#1e2939]
          bg-white dark:bg-[#171717] 
          shadow-md hover:shadow-xl dark:shadow-none
          transition-all duration-300
          h-full
        "
      >
        {/* Image Section */}
        <div className="relative h-48 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900">
          <Image
            src={image}
            alt={`Cover image for blog article: ${title}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <CardContent className="p-4 flex flex-col space-y-3 flex-grow">
          {/* Header: Title */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight line-clamp-2">
              <Link href={`/blog/${_id}`} aria-label={`Read article: ${title}`}>
                {title}
              </Link>
            </h3>
          </div>

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div>
              <div className="flex flex-wrap gap-2" aria-label="Article categories">
                {tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="
                      flex items-center justify-center
                      px-2.5 py-1 rounded-md
                      bg-zinc-100 dark:bg-zinc-800/80
                      border border-zinc-200 dark:border-zinc-700/60
                      text-xs font-medium text-zinc-800 dark:text-zinc-200
                    "
                  >
                    {tag}
                  </span>
                ))}
                {tags.length > 3 && (
                  <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400 flex items-center px-1">
                    +{tags.length - 3}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="pt-4 mt-auto flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800/80">
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
              <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">
                Article
              </span>
            </div>

            <Link
              href={`/blog/${_id}`}
              aria-label={`Read full article: ${title}`}
              className="
                inline-flex items-center gap-1.5 
                text-sm font-semibold text-zinc-700 dark:text-zinc-300 
                hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors
                min-h-[44px] min-w-[44px] justify-center
              "
            >
              Read More
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </CardContent>
      </article>
    </motion.div>
  );
};

export default MainBlogCard;