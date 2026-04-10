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
import { Plus, X } from 'lucide-react'

export default function AdminIntroPage() {
  const [titles, setTitles] = useState<string[]>([""])

  const addTitleField = () => {
    setTitles([...titles, ""])
  }

  const removeTitleField = (index: number) => {
    setTitles(titles.filter((_, i) => i !== index))
  }

  const handleTitleChange = (index: number, value: string) => {
    const newTitles = [...titles]
    newTitles[index] = value
    setTitles(newTitles)
  }

  return (
    <div className='flex flex-col items-center justify-center p-8 h-[calc(100vh-100px)]'>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Introduction Details</h1>
        <p className="text-muted-foreground">Manage the intro section of your portfolio here.</p>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button size="lg">Edit Introduction</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Introduction</DialogTitle>
            <DialogDescription>
              Make changes to your intro section here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            {/* Username Field */}
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" placeholder="e.g., John Doe" />
            </div>

            {/* Description Field */}
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                placeholder="Write a brief description about yourself..."
                className="min-h-[100px]"
              />
            </div>

            {/* Multiple Titles Field */}
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label>Titles / Role Details</Label>
                <Button type="button" variant="outline" size="sm" onClick={addTitleField}>
                  <Plus className="w-4 h-4 mr-1" /> Add Title
                </Button>
              </div>
              <div className="space-y-3 mt-2">
                {titles.map((title, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input 
                      placeholder="e.g., Full Stack Developer" 
                      value={title}
                      onChange={(e) => handleTitleChange(index, e.target.value)}
                    />
                    {titles.length > 1 && (
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

            {/* Image Upload Field */}
            <div className="grid gap-2">
              <Label htmlFor="profile-image">Profile Image Upload</Label>
              <Input id="profile-image" type="file" accept="image/*" />
              <p className="text-xs text-muted-foreground">Recommended size: 500x500px</p>
            </div>

            {/* PDF Upload Field */}
            <div className="grid gap-2">
              <Label htmlFor="resume-pdf">Resume / CV (PDF Upload)</Label>
              <Input id="resume-pdf" type="file" accept="application/pdf" />
              <p className="text-xs text-muted-foreground">Please upload a valid PDF file.</p>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
