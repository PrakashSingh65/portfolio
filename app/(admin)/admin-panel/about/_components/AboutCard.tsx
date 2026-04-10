"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import AboutFormDialog, { AboutData } from './AboutFormDialog'

export default function AboutCard() {
  // State for displaying existing data
  const [aboutData, setAboutData] = useState<AboutData>({
    description: "I am a dedicated software developer with over X years of experience in creating dynamic and user-friendly web applications. My journey started with a fascination for...",
  });

  const handleSave = (newData: AboutData) => {
    setAboutData(newData);
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
            {aboutData.description}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
