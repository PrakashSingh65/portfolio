"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import AboutFormDialog, { AboutData } from './AboutFormDialog'

export default function AboutCard() {
  const [aboutData, setAboutData] = useState<AboutData>({
    description: "",
  });
  const [aboutId, setAboutId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch('/api/about');
        const result = await response.json();
        
        if (response.ok && result?.data) {
          setAboutData({ description: result.data.description });
          setAboutId(result.data._id);
        }
      } catch (error) {
        console.error("Error fetching about data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  const handleSave = async (newData: AboutData) => {
    try {
      const method = aboutId ? 'PUT' : 'POST';
      const url = aboutId ? `/api/about/${aboutId}` : '/api/about';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description: newData.description }),
      });

      const result = await response.json();

      if (response.ok) {
        setAboutData({ description: result.data.description });
        if (!aboutId) {
            setAboutId(result.data._id);
        }
      } else {
        console.error("Error saving about data:", result.error);
      }
    } catch (error) {
      console.error("Error saving about data:", error);
    }
  }

  if (loading) {
    return <div className="p-10 flex justify-center items-center text-muted-foreground">Loading about data...</div>;
  }

  return (
    <Card className="relative overflow-hidden border shadow-sm">
      <AboutFormDialog initialData={aboutData} onSave={handleSave} />

      <CardHeader className="pb-4">
        <CardTitle className="text-2xl">About Section Preview</CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Your Story</h3>
          <p className="text-base leading-relaxed text-foreground/90 whitespace-pre-wrap">
            {aboutData.description || "No about description added yet."}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
