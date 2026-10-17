import React from "react";
import MainBlogCard from "../../../../components/MainBlogCart";
import { ConnectDB } from "../../../../lib/db";
import Blog, { IBlog } from "../../../../models/blog.model";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Blogs",
  description: "Read in-depth tutorials, technical deep-dives, and engineering insights written by Prakash Singh.",
};

export const revalidate = 60;

async function fetchBlogs(): Promise<IBlog[]> {
  try {
    await ConnectDB();
    const blogs = await Blog.find().sort({ createdAt: -1 }).lean<IBlog[]>();
    return blogs.map((blog) => ({
      ...blog,
      _id: blog._id?.toString(),
    }));
  } catch (error) {
    console.error("Error fetching all blogs:", error);
    return [];
  }
}

export default async function AllBlogsPage() {
  const blogs = await fetchBlogs();

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 md:px-8 max-w-6xl mx-auto space-y-8">
      <div>
        <Link
          href="/blog"
          aria-label="Back to Featured Blogs"
          className="inline-flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium min-h-[44px]"
        >
          <ArrowLeft size={16} aria-hidden="true" /> Back to Featured
        </Link>
      </div>

      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
          All Blogs
        </h1>
        <p className="text-zinc-700 dark:text-zinc-300 font-medium max-w-lg text-sm md:text-base">
          My thoughts and writings on web performance, software engineering, and full-stack development.
        </p>
      </div>
      <Separator />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogs.map((blog) => (
          <MainBlogCard
            key={blog._id}
            _id={blog._id!}
            title={blog.title}
            image={blog.image}
            tags={blog.tags}
          />
        ))}
      </div>
    </div>
  );
}
