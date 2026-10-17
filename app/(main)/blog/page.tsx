import React from "react";
import { getBlogsData } from "@/lib/data";
import MainBlogCard from "../../../components/MainBlogCart";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const revalidate = 60;

export default async function BlogPage() {
  const blogs = await getBlogsData(2);

  return (
    <section id="blog" aria-label="Featured Blog Articles" className="container mx-auto px-4 py-8">
      <div className="flex flex-col mb-6">
        <p className="text-sm font-semibold dark:text-emerald-400 text-emerald-600 uppercase tracking-wider">
          Featured
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
          Blogs
        </h2>
      </div>

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

      <div className="text-center mt-10">
        <Link href="/blog/all-blogs" aria-label="Browse all technical blog posts">
          <Button variant="outline" className="hover:bg-emerald-50 dark:hover:bg-zinc-800 cursor-pointer min-h-[44px]">
            Show all blogs <MoveRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Button>
        </Link>
      </div>
    </section>
  );
}