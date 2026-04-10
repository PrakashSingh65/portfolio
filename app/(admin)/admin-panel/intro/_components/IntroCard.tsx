"use client"

import React, { useState } from 'react'
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
import { Plus, X, Pencil, FileText, UserCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function IntroCard() {
  // State for displaying existing data
  const [introData, setIntroData] = useState({
    username: "Jane Doe",
    description: "I am a passionate creative professional dedicated to building amazing web experiences and intuitive designs.",
    titles: ["Full Stack Developer", "UI/UX Designer"],
    hasPdf: true,
  });

  // Dialog Form State
  const [open, setOpen] = useState(false);
  const [editUsername, setEditUsername] = useState(introData.username);
  const [editDescription, setEditDescription] = useState(introData.description);
  const [editTitles, setEditTitles] = useState<string[]>(introData.titles);

  const addTitleField = () => setEditTitles([...editTitles, ""]);
  const removeTitleField = (index: number) => setEditTitles(editTitles.filter((_, i) => i !== index));
  const handleTitleChange = (index: number, value: string) => {
    const newTitles = [...editTitles];
    newTitles[index] = value;
    setEditTitles(newTitles);
  }

  const handleSave = () => {
    setIntroData({
      username: editUsername,
      description: editDescription,
      titles: editTitles.filter(t => t.trim() !== ""),
      hasPdf: true,
    });
    setOpen(false);
  }

  return (
    <Card className="relative overflow-hidden border shadow-sm">
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
                <Label>Titles / Role Details</Label>
                <Button type="button" variant="outline" size="sm" onClick={addTitleField}>
                  <Plus className="w-4 h-4 mr-1" /> Add Title
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
              <Input id="profile-image" type="file" accept="image/*" />
              <p className="text-xs text-muted-foreground">Recommended size: 500x500px</p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="resume-pdf">Resume / CV (PDF Upload)</Label>
              <Input id="resume-pdf" type="file" accept="application/pdf" />
              <p className="text-xs text-muted-foreground">Please upload a valid PDF file.</p>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" onClick={handleSave}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <CardHeader className="flex flex-col sm:flex-row items-center gap-6 pb-6 mt-4">
        <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center shrink-0 border-2 border-primary/10">
          <UserCircle className="w-16 h-16 text-muted-foreground" />
        </div>
        <div className="space-y-2 text-center sm:text-left flex-1 pl-0 sm:pl-2">
          <CardTitle className="text-3xl">{introData.username}</CardTitle>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
            {introData.titles.map((title, idx) => (
              <Badge key={idx} variant="secondary" className="px-3 py-1 font-medium">{title}</Badge>
            ))}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">About</h3>
          <p className="text-base leading-relaxed text-foreground/90">
            {introData.description}
          </p>
        </div>
        
        <div className="pt-2">
          <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Resume / CV</h3>
          {introData.hasPdf ? (
             <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary/50 border shadow-sm w-max pr-8">
               <div className="p-2 bg-background rounded-md text-primary">
                  <FileText className="w-6 h-6" />
               </div>
               <div>
                 <p className="font-medium text-sm">Resume.pdf</p>
                 <p className="text-xs text-muted-foreground">Uploaded CV</p>
               </div>
             </div>
          ) : (
            <p className="text-sm text-muted-foreground italic">No PDF uploaded</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
