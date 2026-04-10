"use client"

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Pencil } from 'lucide-react'

export interface SkillData {
  id?: string;
  skillCategory: string;
  skillName: string;
  priority: number;
  image?: string; // We'll represent this via a file or mock URL
}

interface SkillFormDialogProps {
  initialData?: SkillData;
  onSave: (data: SkillData) => void;
  triggerButton?: React.ReactNode;
}

export default function SkillFormDialog({ initialData, onSave, triggerButton }: SkillFormDialogProps) {
  const [open, setOpen] = useState(false);
  
  // Dialog Form State
  const [skillCategory, setSkillCategory] = useState(initialData?.skillCategory || "");
  const [skillName, setSkillName] = useState(initialData?.skillName || "");
  const [priority, setPriority] = useState<number>(initialData?.priority || 0);

  // Sync state if initialData changes
  useEffect(() => {
    if (open) {
      setSkillCategory(initialData?.skillCategory || "");
      setSkillName(initialData?.skillName || "");
      setPriority(initialData?.priority || 0);
    }
  }, [open, initialData]);

  const handleSave = () => {
    onSave({
      id: initialData?.id,
      skillCategory,
      skillName,
      priority,
    });
    setOpen(false);
  }

  const isEdit = !!initialData;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {triggerButton || (
          <Button variant="outline" size="sm">
            {isEdit ? <Pencil className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
            {isEdit ? "Edit Skill" : "Add Skill"}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Skill" : "Add New Skill"}</DialogTitle>
          <DialogDescription>
            {isEdit ? "Update this skill's details." : "Add a new skill to your portfolio."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label htmlFor="skillCategory">Skill Category</Label>
            <Input 
              id="skillCategory" 
              value={skillCategory} 
              onChange={e => setSkillCategory(e.target.value)} 
              placeholder="e.g., Frontend, Backend, Tools" 
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="skillName">Skill Name</Label>
            <Input 
              id="skillName" 
              value={skillName} 
              onChange={e => setSkillName(e.target.value)} 
              placeholder="e.g., React, Node.js, Figma" 
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="priority">Priority</Label>
            <Input 
              id="priority" 
              type="number"
              value={priority} 
              onChange={e => setPriority(Number(e.target.value))} 
              placeholder="e.g., 1 (highest)" 
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="skill-image">Skill Image Upload</Label>
            <Input id="skill-image" type="file" accept="image/*" />
            <p className="text-xs text-muted-foreground">Upload an icon or logo for the skill.</p>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSave}>Save Skill</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
