"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import BlogFormDialog from './BlogFormDialog'

export interface Blog {
  _id: string;
  title: string;
  image: string;
  content: string;
  tags: string[];
  createdAt: string;
}

export default function BlogList() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/blog');
      const result = await res.json();
      if (res.ok && result?.data) {
        setBlogs(result.data);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    
    try {
      const res = await fetch(`/api/blog/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        fetchBlogs();
      } else {
         const err = await res.json();
         alert(err.error || "Failed to delete");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to delete blog post");
    }
  }

  if (loading) {
    return <div className="p-10 flex justify-center items-center text-muted-foreground">Loading blogs...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-secondary/30 p-4 rounded-lg border border-border/50">
        <p className="text-sm font-medium">You have {blogs.length} blog post(s).</p>
        <BlogFormDialog onSuccess={() => fetchBlogs()} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <Card key={blog._id} className="overflow-hidden flex flex-col">
            <div className="h-48 w-full relative group bg-muted overflow-hidden">
              <img src={blog.image} alt={blog.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
            </div>
            <CardHeader className="pb-3 border-b border-border/40">
               <div className="flex justify-between items-start">
                   <CardTitle className="text-xl line-clamp-2">{blog.title}</CardTitle>
               </div>
               <CardDescription className="text-xs mt-1">
                  {new Date(blog.createdAt).toLocaleDateString()}
               </CardDescription>
            </CardHeader>
            <CardContent className="pt-4 flex-1 flex flex-col justify-between space-y-4">
              <div className="flex flex-wrap gap-1.5">
                  {blog.tags.map((tag, idx) => (
                      <Badge variant="secondary" key={idx} className="text-[10px]">{tag}</Badge>
                  ))}
              </div>
              
              <div className="flex gap-2 justify-end pt-4 border-t border-border/40">
                  <BlogFormDialog blogToEdit={blog} onSuccess={() => fetchBlogs()} />
                  <Button variant="destructive" size="icon" onClick={() => handleDelete(blog._id)}>
                     <Trash2 className="w-4 h-4" />
                  </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
