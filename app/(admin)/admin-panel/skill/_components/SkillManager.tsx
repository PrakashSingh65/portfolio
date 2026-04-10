"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Code, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import SkillFormDialog, { SkillData } from './SkillFormDialog'

export default function SkillManager() {
  // Mock skills data
  const [skills, setSkills] = useState<SkillData[]>([
    { id: '1', skillCategory: 'Frontend', skillName: 'React', priority: 1 },
    { id: '2', skillCategory: 'Frontend', skillName: 'Next.js', priority: 2 },
    { id: '3', skillCategory: 'Backend', skillName: 'Node.js', priority: 1 },
  ]);

  const handleAddSkill = (newSkill: SkillData) => {
    setSkills([...skills, { ...newSkill, id: Date.now().toString() }]);
  }

  const handleEditSkill = (updatedSkill: SkillData) => {
    setSkills(skills.map(s => (s.id === updatedSkill.id ? updatedSkill : s)));
  }

  const handleDeleteSkill = (id: string) => {
    setSkills(skills.filter(s => s.id !== id));
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Your Skills</h2>
          <p className="text-sm text-muted-foreground">Manage the skills shown on your portfolio.</p>
        </div>
        <SkillFormDialog onSave={handleAddSkill} />
      </div>

      {skills.length === 0 ? (
        <Card className="flex flex-col items-center justify-center p-12 text-center border-dashed">
          <Code className="h-10 w-10 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No skills added yet</h3>
          <p className="text-sm text-muted-foreground mb-4">You haven't added any skills to your portfolio.</p>
          <SkillFormDialog onSave={handleAddSkill} />
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {skills.map((skill) => (
            <Card key={skill.id} className="relative overflow-hidden group">
              <CardHeader className="pb-3 flex flex-row items-start justify-between space-y-0">
                <div className="space-y-1">
                  <Badge variant="secondary" className="mb-1">{skill.skillCategory}</Badge>
                  <CardTitle className="text-lg">{skill.skillName}</CardTitle>
                </div>
                <div className="w-10 h-10 rounded-md bg-secondary/50 flex items-center justify-center shrink-0">
                  {/* Placeholder for Skill Image */}
                  <Code className="w-5 h-5 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mt-2">
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    Priority: <span className="font-medium text-foreground">{skill.priority}</span>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <SkillFormDialog 
                      initialData={skill} 
                      onSave={handleEditSkill} 
                    />
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => skill.id && handleDeleteSkill(skill.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
