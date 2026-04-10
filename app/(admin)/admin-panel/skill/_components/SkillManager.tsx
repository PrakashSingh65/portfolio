"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Code, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import SkillFormDialog, { SkillData } from './SkillFormDialog'

export default function SkillManager() {
  const [skills, setSkills] = useState<SkillData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/skill');
      const data = await res.json();
      if (res.ok && data.data) {
        // Map _id from Mongo back to id for the frontend
        const mappedSkills = data.data.map((item: any) => ({
          ...item,
          id: item._id
        }));
        setSkills(mappedSkills);
      }
    } catch (error) {
      console.error("Failed to fetch skills:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleAddSkill = async (newSkill: SkillData) => {
    try {
      const res = await fetch('/api/skill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSkill),
      });
      const data = await res.json();
      if (res.ok) {
        setSkills([...skills, { ...data.data, id: data.data._id }]);
      }
    } catch (error) {
      console.error("Failed to add skill:", error);
    }
  }

  const handleEditSkill = async (updatedSkill: SkillData) => {
    if (!updatedSkill.id) return;
    try {
      const res = await fetch(`/api/skill/${updatedSkill.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedSkill),
      });
      const data = await res.json();
      if (res.ok) {
        setSkills(skills.map(s => (s.id === updatedSkill.id ? { ...data.data, id: data.data._id } : s)));
      }
    } catch (error) {
      console.error("Failed to edit skill:", error);
    }
  }

  const handleDeleteSkill = async (id: string) => {
    try {
      const res = await fetch(`/api/skill/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setSkills(skills.filter(s => s.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete skill:", error);
    }
  }

  if (loading) {
    return <div className="p-10 flex justify-center items-center text-muted-foreground">Loading skills...</div>;
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
