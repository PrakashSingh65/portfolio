"use client"

import React, { useState } from 'react'
import { FileText, UserCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import IntroFormDialog, { IntroData } from './IntroFormDialog'

export default function IntroCard() {
  // State for displaying existing data
  const [introData, setIntroData] = useState<IntroData>({
    username: "Jane Doe",
    description: "I am a passionate creative professional dedicated to building amazing web experiences and intuitive designs.",
    titles: ["Full Stack Developer", "UI/UX Designer"],
    hasPdf: true,
  });

  const handleSave = (newData: IntroData) => {
    setIntroData(newData);
  }

  return (
    <Card className="relative overflow-hidden border shadow-sm">
      <IntroFormDialog initialData={introData} onSave={handleSave} />

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
