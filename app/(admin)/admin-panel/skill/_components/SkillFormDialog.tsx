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
import { Plus, Pencil, Loader2, ImageIcon } from 'lucide-react'

export interface SkillData {
  id?: string;
  _id?: string;
  skillCategory: string;
  skillName: string;
  priority: number;
  image?: string;
  imagePublicId?: string;
}

interface SkillFormDialogProps {
  skillToEdit?: SkillData;
  initialData?: SkillData;
  onSuccess?: () => void;
  onSave?: (data: SkillData) => void;
  triggerButton?: React.ReactNode;
}

export default function SkillFormDialog({
  skillToEdit,
  initialData,
  onSuccess,
  onSave,
  triggerButton,
}: SkillFormDialogProps) {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const activeSkill = skillToEdit || initialData;
  const isEdit = !!activeSkill;

  // Dialog Form State
  const [skillCategory, setSkillCategory] = useState("");
  const [skillName, setSkillName] = useState("");
  const [priority, setPriority] = useState<number>(0);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Sync state when dialog opens or editing target changes
  useEffect(() => {
    if (open) {
      if (activeSkill) {
        setSkillCategory(activeSkill.skillCategory || "");
        setSkillName(activeSkill.skillName || "");
        setPriority(activeSkill.priority ?? 0);
        setImageFile(null);
        setPreviewUrl(activeSkill.image || null);
      } else {
        setSkillCategory("");
        setSkillName("");
        setPriority(0);
        setImageFile(null);
        setPreviewUrl(null);
      }
    }
  }, [open, activeSkill]);

  // Clean up object URL when component unmounts or preview changes
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);

    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    } else {
      setPreviewUrl(activeSkill?.image || null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!skillCategory.trim()) {
      alert("Please enter a skill category.");
      return;
    }

    if (!skillName.trim()) {
      alert("Please enter a skill name.");
      return;
    }

    if (!isEdit && !imageFile) {
      alert("Please select an icon or image for the new skill.");
      return;
    }

    if (imageFile && imageFile.size > 5 * 1024 * 1024) {
      alert("Image size exceeds 5MB. Please choose a smaller image.");
      return;
    }

    try {
      setSaving(true);
      const formData = new FormData();
      formData.append("skillCategory", skillCategory.trim());
      formData.append("skillName", skillName.trim());
      formData.append("priority", priority.toString());

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const skillId = activeSkill?._id || activeSkill?.id;
      const url = isEdit ? `/api/skill/${skillId}` : '/api/skill';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        body: formData,
      });

      const result = await res.json();

      if (res.ok) {
        setOpen(false);
        if (onSuccess) onSuccess();
        if (onSave) {
          onSave({
            ...result.data,
            id: result.data?._id || skillId,
          });
        }
      } else {
        alert(result.error || "Failed to save skill.");
      }
    } catch (error) {
      console.error("Error saving skill:", error);
      alert("An unexpected error occurred while saving the skill.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {triggerButton || (
          <Button variant={isEdit ? "outline" : "default"} size="sm">
            {isEdit ? <Pencil className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
            {isEdit ? "Edit Skill" : "Add Skill"}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Skill" : "Add New Skill"}</DialogTitle>
          <DialogDescription>
            {isEdit ? "Update this skill's details and icon." : "Add a new skill and icon to your portfolio."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-5 py-4">
            <div className="grid gap-2">
              <Label htmlFor="skillCategory">Skill Category *</Label>
              <Input 
                id="skillCategory" 
                required
                value={skillCategory} 
                onChange={e => setSkillCategory(e.target.value)} 
                placeholder="e.g., Frontend, Backend, Tools, Database" 
                list="skill-category-suggestions"
              />
              <datalist id="skill-category-suggestions">
                <option value="Frontend" />
                <option value="Backend" />
                <option value="Database" />
                <option value="Language" />
                <option value="Tools" />
                <option value="Other" />
              </datalist>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="skillName">Skill Name *</Label>
              <Input 
                id="skillName" 
                required
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
                placeholder="e.g., 1 (lower numbers appear first)" 
              />
              <p className="text-xs text-muted-foreground">Lower numbers appear first on your portfolio.</p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="skill-image">
                Skill Icon / Image {isEdit ? "(optional to change)" : "*"}
              </Label>
              <Input 
                id="skill-image" 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange}
              />
              <p className="text-xs text-muted-foreground">Upload an icon or logo for the skill (PNG, SVG, JPG, etc. Max 5MB).</p>
              
              {previewUrl && (
                <div className="flex items-center gap-3 mt-1 p-2 border rounded-md bg-muted/30">
                  <div className="w-12 h-12 relative flex items-center justify-center bg-background rounded border p-1 shrink-0 overflow-hidden">
                    <img 
                      src={previewUrl} 
                      alt="Skill preview" 
                      className="max-h-full max-w-full object-contain" 
                    />
                  </div>
                  <div className="flex flex-col text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">
                      {imageFile ? "Selected file preview" : "Current skill icon"}
                    </span>
                    <span>{imageFile ? imageFile.name : "Saved image"}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
              {saving ? "Saving..." : (isEdit ? "Update Skill" : "Save Skill")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
