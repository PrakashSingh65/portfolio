"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import ProjectFormDialog from './ProjectFormDialog'

export interface Project {
  _id: string;
  projectName: string;
  projectDesc: string;
  projectSubDesc: string;
  projectImage: string;
  projectTechStack: string[];
  githubLink: string;
  liveLink: string;
  priority: number;
}

export default function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/project');
      const result = await res.json();
      if (res.ok && result?.data) {
        setProjects(result.data);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    
    try {
      const res = await fetch(`/api/project/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        fetchProjects();
      } else {
         const err = await res.json();
         alert(err.error || "Failed to delete");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to delete project");
    }
  }

  if (loading) {
    return <div className="p-10 flex justify-center items-center text-muted-foreground">Loading projects...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-secondary/30 p-4 rounded-lg border border-border/50">
        <p className="text-sm font-medium">You have {projects.length} project(s).</p>
        <ProjectFormDialog onSuccess={() => fetchProjects()} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj) => (
          <Card key={proj._id} className="overflow-hidden flex flex-col">
            <div className="h-48 w-full relative group bg-muted overflow-hidden">
              <img src={proj.projectImage} alt={proj.projectName} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
            </div>
            <CardHeader className="pb-3 border-b border-border/40">
               <div className="flex justify-between items-start">
                   <CardTitle className="text-xl line-clamp-1">{proj.projectName}</CardTitle>
                   <Badge variant="outline">Priority: {proj.priority}</Badge>
               </div>
               <CardDescription className="line-clamp-2 min-h-10 mt-2">{proj.projectSubDesc}</CardDescription>
            </CardHeader>
            <CardContent className="pt-4 flex-1 flex flex-col justify-between space-y-4">
              <div className="flex flex-wrap gap-1.5">
                  {proj.projectTechStack.map((tech, idx) => (
                      <Badge variant="secondary" key={idx} className="text-[10px]">{tech}</Badge>
                  ))}
              </div>
              
              <div className="flex gap-2 justify-end pt-4 border-t border-border/40">
                  <ProjectFormDialog projectToEdit={proj} onSuccess={() => fetchProjects()} />
                  <Button variant="destructive" size="icon" onClick={() => handleDelete(proj._id)}>
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
