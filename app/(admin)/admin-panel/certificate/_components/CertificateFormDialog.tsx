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
import { Certificate } from './CertificateList'

interface CertificateFormDialogProps {
  certificateToEdit?: Certificate;
  onSuccess: () => void;
}

export default function CertificateFormDialog({ certificateToEdit, onSuccess }: CertificateFormDialogProps) {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const [priority, setPriority] = useState("0");
  const [certificateImage, setCertificateImage] = useState<File | null>(null);

  useEffect(() => {
    if (open && certificateToEdit) {
      setPriority(certificateToEdit.priority.toString());
      setCertificateImage(null);
    } else if (open && !certificateToEdit) {
      setPriority("0");
      setCertificateImage(null);
    }
  }, [open, certificateToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSaving(true);
      const formData = new FormData();
      formData.append("priority", priority);
      
      if (certificateImage) {
        formData.append("certificateImage", certificateImage);
      } else if (!certificateToEdit) {
          alert("Certificate image is required for new certificates.");
          setSaving(false);
          return;
      }

      const url = certificateToEdit ? `/api/certificate/${certificateToEdit._id}` : '/api/certificate';
      const method = certificateToEdit ? 'PUT' : 'POST';

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
        {certificateToEdit ? (
          <Button variant="outline" size="icon">
            <Edit className="w-4 h-4" />
          </Button>
        ) : (
          <Button className="gap-2">
            <Plus className="w-4 h-4" /> Add Certificate
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{certificateToEdit ? "Edit Certificate" : "Add New Certificate"}</DialogTitle>
          <DialogDescription>
            {certificateToEdit ? "Update the priority or change the certificate image." : "Upload a new certificate image and set its priority."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-4">
             <div className="space-y-2">
                <Label>Certificate Image {certificateToEdit ? "(optional to change)" : "*"}</Label>
                <Input type="file" accept="image/*" onChange={(e) => setCertificateImage(e.target.files?.[0] || null)} />
             </div>

             <div className="space-y-2">
                <Label>Priority</Label>
                <Input type="number" required value={priority} onChange={(e) => setPriority(e.target.value)} />
                <p className="text-xs text-muted-foreground">Lower numbers appear first.</p>
             </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={saving}>
              {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              {saving ? "Saving..." : "Save Certificate"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
