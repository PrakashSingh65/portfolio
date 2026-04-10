"use client"

import React, { useState, useEffect } from 'react'
import { FileText, UserCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import IntroFormDialog, { IntroData } from './IntroFormDialog'

export default function IntroCard() {
  const [introData, setIntroData] = useState<IntroData>({
    username: "",
    description: "",
    titles: [],
    hasPdf: false,
  });
  
  const [hasIntro, setHasIntro] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchIntroData();
  }, []);

  const fetchIntroData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/intro');
      const result = await res.json();
      
      if (res.ok && result?.data) {
        setHasIntro(true);
        setIntroData({
          username: result.data.name,
          description: result.data.description, // Mapped properly to db schema
          titles: result.data.techStack,
          hasPdf: !!result.data.file,
        });
        setImageUrl(result.data.image);
      } else {
        setHasIntro(false);
      }
    } catch (error) {
      console.error("Error fetching intro data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (newData: IntroData) => {
    try {
      setSaving(true);
      const formData = new FormData();
      formData.append("name", newData.username || "Your Name");
      formData.append("desc", newData.description || "Your creative description goes here.");
      
      const safeTechStack = newData.titles.length > 0 ? newData.titles.join(",") : "Developer";
      formData.append("techStack", safeTechStack);
      
      if (newData.imageFile) {
        formData.append("image", newData.imageFile);
      }
      if (newData.resumeFile) {
        formData.append("file", newData.resumeFile);
      }

      const method = hasIntro ? 'PUT' : 'POST';
      const response = await fetch('/api/intro', {
        method,
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.data) {
        setHasIntro(true);
        setIntroData({
          username: result.data.name,
          description: result.data.description,
          titles: result.data.techStack,
          hasPdf: !!result.data.file,
        });
        setImageUrl(result.data.image);
      } else {
        console.error("Error saving intro:", result.error);
        alert(`Failed to save: ${result.error}`);
      }
    } catch (error) {
      console.error("Error saving intro data:", error);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="p-10 flex justify-center items-center text-muted-foreground">Loading intro data...</div>;
  }

  return (
    <Card className="relative overflow-hidden border shadow-sm">
      <IntroFormDialog initialData={introData} onSave={handleSave} isLoading={saving} />

      <CardHeader className="flex flex-col sm:flex-row items-center gap-6 pb-6 mt-4">
        <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center shrink-0 border-2 border-primary/10 overflow-hidden">
          {imageUrl ? (
            <img src={imageUrl} alt="Profile" className="w-full h-full object-cover" />
          ) : (
             <UserCircle className="w-16 h-16 text-muted-foreground" />
          )}
        </div>
        <div className="space-y-2 text-center sm:text-left flex-1 pl-0 sm:pl-2">
          <CardTitle className="text-3xl">{introData.username || "No name set"}</CardTitle>
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
          <p className="text-base leading-relaxed text-foreground/90 whitespace-pre-wrap">
            {introData.description || "No description set"}
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
                 <p className="font-medium text-sm">Resume Data</p>
                 <p className="text-xs text-muted-foreground">Uploaded Successfully</p>
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
