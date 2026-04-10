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
import { Textarea } from "@/components/ui/textarea"
import { Plus, X, Pencil } from 'lucide-react'

export interface IntroData {
  username: string;
  description: string;
  titles: string[];
  hasPdf: boolean;
  imageFile?: File | null;
  resumeFile?: File | null;
}

interface IntroFormDialogProps {
  initialData: IntroData;
  onSave: (data: IntroData) => void;
  isLoading?: boolean;
}

export default function IntroFormDialog({ initialData, onSave, isLoading }: IntroFormDialogProps) {
  const [open, setOpen] = useState(false);
  
  // Dialog Form State
  const [editUsername, setEditUsername] = useState(initialData.username);
  const [editDescription, setEditDescription] = useState(initialData.description);
  const [editTitles, setEditTitles] = useState<string[]>(initialData.titles);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  // Sync state if initialData changes (or when dialog opens, though simple sync is fine)
  useEffect(() => {
    if (open) {
      setEditUsername(initialData.username);
      setEditDescription(initialData.description);
      
      // Protect against empty titles array
      setEditTitles(initialData.titles?.length ? initialData.titles : [""]);
      setImageFile(null);
      setResumeFile(null);
    }
  }, [open, initialData]);

  const addTitleField = () => setEditTitles([...editTitles, ""]);
  const removeTitleField = (index: number) => setEditTitles(editTitles.filter((_, i) => i !== index));
  const handleTitleChange = (index: number, value: string) => {
    const newTitles = [...editTitles];
    newTitles[index] = value;
    setEditTitles(newTitles);
  }

  const handleSave = () => {
    onSave({
      username: editUsername,
      description: editDescription,
      titles: editTitles.filter(t => t.trim() !== ""),
      hasPdf: initialData.hasPdf || !!resumeFile,
      imageFile,
      resumeFile
    });
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="absolute top-4 right-4">
          <Pencil className="w-4 h-4 mr-2" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Introduction</DialogTitle>
          <DialogDescription>
            Make changes to your intro section here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input 
              id="username" 
              value={editUsername} 
              onChange={e => setEditUsername(e.target.value)} 
              placeholder="e.g., John Doe" 
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              value={editDescription} 
              onChange={e => setEditDescription(e.target.value)} 
              placeholder="Write a brief description about yourself..."
              className="min-h-[100px]"
            />
          </div>

          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label>Titles / Role / Tech Stack array</Label>
              <Button type="button" variant="outline" size="sm" onClick={addTitleField}>
                <Plus className="w-4 h-4 mr-1" /> Add
              </Button>
            </div>
            <div className="space-y-3 mt-2">
              {editTitles.map((title, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input 
                    placeholder="e.g., Full Stack Developer" 
                    value={title}
                    onChange={(e) => handleTitleChange(index, e.target.value)}
                  />
                  {editTitles.length > 1 && (
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon"
                      onClick={() => removeTitleField(index)}
                    >
                      <X className="w-4 h-4 text-destructive" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="profile-image">Profile Image Upload</Label>
            <Input 
              id="profile-image" 
              type="file" 
              accept="image/*" 
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            />
            <p className="text-xs text-muted-foreground">Select a new image to update the existing one.</p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="resume-pdf">Resume / CV (PDF Upload)</Label>
            <Input 
              id="resume-pdf" 
              type="file" 
              accept="application/pdf" 
              onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
            />
            <p className="text-xs text-muted-foreground">Select a new PDF file to update the existing one.</p>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSave} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
