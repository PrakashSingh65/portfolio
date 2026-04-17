"use client"

import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Edit, Loader2 } from 'lucide-react'
import dynamic from 'next/dynamic'
import { Blog } from './BlogList'
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor"),
  { ssr: false }
);

interface BlogFormDialogProps {
  blogToEdit?: Blog;
  onSuccess: () => void;
}

export default function BlogFormDialog({ blogToEdit, onSuccess }: BlogFormDialogProps) {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [blogImage, setBlogImage] = useState<File | null>(null);

  useEffect(() => {
    if (open && blogToEdit) {
      setTitle(blogToEdit.title);
      setContent(blogToEdit.content);
      setTags(blogToEdit.tags.join(", "));
      setBlogImage(null);
    } else if (open && !blogToEdit) {
      setTitle("");
      setContent("");
      setTags("");
      setBlogImage(null);
    }
  }, [open, blogToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content) {
      alert("Blog Content is required");
      return;
    }

    try {
      setSaving(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("tags", tags);
      
      if (blogImage) {
        formData.append("image", blogImage);
      } else if (!blogToEdit) {
          alert("Blog cover image is required for new posts.");
          setSaving(false);
          return;
      }

      const url = blogToEdit ? `/api/blog/${blogToEdit._id}` : '/api/blog';
      const method = blogToEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        body: formData,
      });

      const result = await res.json();
      
      if (res.ok) {
        setOpen(false);
        onSuccess();
      } else {
        alert(result.error || "Failed to save");
      }
      
    } catch (error) {
       console.error("Error saving form:", error);
       alert("An error occurred. Check console for details.");
    } finally {
       setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {blogToEdit ? (
          <Button variant="outline" size="icon">
            <Edit className="w-4 h-4" />
          </Button>
        ) : (
          <Button className="gap-2">
            <Plus className="w-4 h-4" /> Add Blog Post
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto w-full">
        <DialogHeader>
          <DialogTitle>{blogToEdit ? "Edit Blog Post" : "Add New Blog Post"}</DialogTitle>
          <DialogDescription>
            {blogToEdit ? "Update the details of your post below." : "Write a new blog post for your portfolio."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="space-y-2">
                <Label>Blog Title *</Label>
                <Input required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="E.g. How to Build a Portfolio" />
             </div>
             <div className="space-y-2">
                <Label>Cover Image {blogToEdit ? "(optional to change)" : "*"}</Label>
                <Input type="file" accept="image/*" onChange={(e) => setBlogImage(e.target.files?.[0] || null)} />
             </div>
          </div>

          <div className="space-y-2">
             <Label>Tags (comma separated)</Label>
             <Input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="React, Frontend, Web Dev" />
          </div>

          <div className="space-y-2">
             <Label>Blog Content * (Markdown Supported)</Label>
             <div className="border border-border/50 rounded-md overflow-hidden bg-background">
               <div data-color-mode="light">
                 <MDEditor
                    style={{ minHeight: '300px' }}
                    value={content}
                    onChange={(val) => setContent(val || "")}
                    preview="edit"
                    height={400}
                 />
               </div>
             </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={saving}>
              {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              {saving ? "Saving..." : "Save Blog Post"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
