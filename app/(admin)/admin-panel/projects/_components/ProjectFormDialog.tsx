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
import { Project } from './ProjectList'
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor"),
  { ssr: false }
);

interface ProjectFormDialogProps {
  projectToEdit?: Project;
  onSuccess: () => void;
}

export default function ProjectFormDialog({ projectToEdit, onSuccess }: ProjectFormDialogProps) {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const [projectName, setProjectName] = useState("");
  const [projectSubDesc, setProjectSubDesc] = useState("");
  const [projectDesc, setProjectDesc] = useState("");
  const [projectTechStack, setProjectTechStack] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [liveLink, setLiveLink] = useState("");
  const [priority, setPriority] = useState("0");
  const [projectImage, setProjectImage] = useState<File | null>(null);

  useEffect(() => {
    if (open && projectToEdit) {
      setProjectName(projectToEdit.projectName);
      setProjectSubDesc(projectToEdit.projectSubDesc || "");
      setProjectDesc(projectToEdit.projectDesc);
      setProjectTechStack(projectToEdit.projectTechStack.join(", "));
      setGithubLink(projectToEdit.githubLink);
      setLiveLink(projectToEdit.liveLink);
      setPriority(projectToEdit.priority.toString());
      setProjectImage(null);
    } else if (open && !projectToEdit) {
      setProjectName("");
      setProjectSubDesc("");
      setProjectDesc("");
      setProjectTechStack("");
      setGithubLink("");
      setLiveLink("");
      setPriority("0");
      setProjectImage(null);
    }
  }, [open, projectToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectDesc) {
      alert("Project Description is required");
      return;
    }

    try {
      setSaving(true);
      const formData = new FormData();
      formData.append("projectName", projectName);
      formData.append("projectSubDesc", projectSubDesc);
      formData.append("projectDesc", projectDesc);
      formData.append("projectTechStack", projectTechStack);
      formData.append("githubLink", githubLink);
      formData.append("liveLink", liveLink);
      formData.append("priority", priority);
      
      if (projectImage) {
        formData.append("projectImage", projectImage);
      } else if (!projectToEdit) {
          alert("Project image is required for new projects.");
          setSaving(false);
          return;
      }

      const url = projectToEdit ? `/api/project/${projectToEdit._id}` : '/api/project';
      const method = projectToEdit ? 'PUT' : 'POST';

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
        {projectToEdit ? (
          <Button variant="outline" size="icon">
            <Edit className="w-4 h-4" />
          </Button>
        ) : (
          <Button className="gap-2">
            <Plus className="w-4 h-4" /> Add Project
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto w-full">
        <DialogHeader>
          <DialogTitle>{projectToEdit ? "Edit Project" : "Add New Project"}</DialogTitle>
          <DialogDescription>
            {projectToEdit ? "Update the details of your project below." : "Fill in the details to add a new project to your portfolio."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="space-y-2">
                <Label>Project Name *</Label>
                <Input required value={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder="E.g. E-Commerce Platform" />
             </div>
             <div className="space-y-2">
                <Label>Project Image {projectToEdit ? "(optional to change)" : "*"}</Label>
                <Input type="file" accept="image/*" onChange={(e) => setProjectImage(e.target.files?.[0] || null)} />
             </div>
          </div>

          <div className="space-y-2">
             <Label>Tech Stack * (comma separated)</Label>
             <Input required value={projectTechStack} onChange={(e) => setProjectTechStack(e.target.value)} placeholder="React, Node.js, TailwindCSS" />
          </div>

          <div className="space-y-2">
             <Label>Short Description (Sub-description)</Label>
             <Input value={projectSubDesc} onChange={(e) => setProjectSubDesc(e.target.value)} placeholder="A brief 1-line tag about the project" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
                <Label>Github Link *</Label>
                <Input required value={githubLink} onChange={(e) => setGithubLink(e.target.value)} placeholder="https://github.com/..." />
             </div>
             <div className="space-y-2">
                <Label>Live Link *</Label>
                <Input required value={liveLink} onChange={(e) => setLiveLink(e.target.value)} placeholder="https://..." />
             </div>
             <div className="space-y-2">
                <Label>Priority</Label>
                <Input type="number" required value={priority} onChange={(e) => setPriority(e.target.value)} />
             </div>
          </div>

          <div className="space-y-2">
             <Label>Full Project Description * (Markdown Supported)</Label>
             <div className="border border-border/50 rounded-md overflow-hidden bg-background">
               <div data-color-mode="light">
                 <MDEditor
                    style={{ minHeight: '300px' }}
                    value={projectDesc}
                    onChange={(val) => setProjectDesc(val || "")}
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
              {saving ? "Saving..." : "Save Project"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
