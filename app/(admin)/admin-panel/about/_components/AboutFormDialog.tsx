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
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Pencil } from 'lucide-react'

export interface AboutData {
  description: string;
}

interface AboutFormDialogProps {
  initialData: AboutData;
  onSave: (data: AboutData) => void;
}

export default function AboutFormDialog({ initialData, onSave }: AboutFormDialogProps) {
  const [open, setOpen] = useState(false);
  
  // Dialog Form State
  const [editDescription, setEditDescription] = useState(initialData.description);

  // Sync state if initialData changes
  useEffect(() => {
    if (open) {
      setEditDescription(initialData.description);
    }
  }, [open, initialData]);

  const handleSave = () => {
    onSave({
      description: editDescription,
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
          <DialogTitle>Edit About Section</DialogTitle>
          <DialogDescription>
            Update the detailed description about yourself that appears on your about page.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label htmlFor="description">About Description</Label>
            <Textarea 
              id="description" 
              value={editDescription} 
              onChange={e => setEditDescription(e.target.value)} 
              placeholder="Write a detailed description about your background, experience, etc..."
              className="min-h-[250px]"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSave}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
