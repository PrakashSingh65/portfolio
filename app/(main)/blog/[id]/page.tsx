import React from "react";
import { ConnectDB } from "../../../../lib/db";
import Blog, { IBlog } from "../../../../models/blog.model";
import { MarkdownRender } from "../../../../components/MarkdownRender";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const revalidate = 60;

async function fetchBlog(id: string): Promise<IBlog | null> {
  await ConnectDB();
  try {
    const blog = await Blog.findById(id).lean<IBlog>();
    if (!blog) return null;

    return {
      ...blog,
      _id: blog._id?.toString(),
    };
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const blog = await fetchBlog(id);
  if (!blog) {
    return {
      title: "Blog Not Found",
    };
  }

  return {
    title: blog.title,
    description: blog.content?.slice(0, 160) || `Read article: ${blog.title}`,
    openGraph: {
      title: `${blog.title} | Prakash Singh Blog`,
      description: blog.content?.slice(0, 160) || `Read article: ${blog.title}`,
      images: blog.image ? [{ url: blog.image }] : [],
    },
  };
}

export default async function BlogPageById({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const blog = await fetchBlog(id);

  if (!blog) {
    return (
      <div className="min-h-screen pt-28 flex items-center justify-center">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-800 dark:text-zinc-100">
            404 – Blog Not Found
          </h1>
          <Link
            href="/blog"
            aria-label="Back to all blogs"
            className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 hover:underline font-medium min-h-[44px]"
          >
            <ArrowLeft size={20} aria-hidden="true" />
            Back to blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-16">
      <div className="max-w-5xl mx-auto px-6 lg:px-8 space-y-8">
        <div>
          <Link
            href="/blog"
            aria-label="Back to blogs listing"
            className="inline-flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium min-h-[44px]"
          >
            <ArrowLeft size={16} aria-hidden="true" /> Back to Blogs
          </Link>
        </div>

        {/* Hero Image */}
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 shadow-2xl">
          <Image
            src={blog.image}
            alt={`Hero illustration for ${blog.title}`}
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
            priority
          />
        </div>

        {/* Title */}
        <div className="mt-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight">
            {blog.title}
          </h1>
        </div>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="mt-8">
            <h2 className="text-base font-semibold text-zinc-800 dark:text-zinc-200 mb-3">
              Categories
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3.5 py-1.5 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm font-medium text-zinc-800 dark:text-zinc-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Content */}
        <article className="mt-12 prose prose-zinc dark:prose-invert max-w-none">
          <MarkdownRender content={blog.content} />
        </article>
      </div>
    </div>
  );
}
