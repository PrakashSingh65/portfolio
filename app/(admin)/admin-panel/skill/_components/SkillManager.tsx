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

  const handleDeleteSkill = async (id: string) => {
    if (!confirm("Are you sure you want to delete this skill?")) return;

    try {
      const res = await fetch(`/api/skill/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchSkills();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete skill.");
      }
    } catch (error) {
      console.error("Failed to delete skill:", error);
      alert("Failed to delete skill.");
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
        <SkillFormDialog onSuccess={fetchSkills} />
      </div>

      {skills.length === 0 ? (
        <Card className="flex flex-col items-center justify-center p-12 text-center border-dashed">
          <Code className="h-10 w-10 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No skills added yet</h3>
          <p className="text-sm text-muted-foreground mb-4">You haven't added any skills to your portfolio.</p>
          <SkillFormDialog onSuccess={fetchSkills} />
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {skills.map((skill) => {
            const skillId = skill._id || skill.id;
            return (
              <Card key={skillId} className="relative overflow-hidden group">
                <CardHeader className="pb-3 flex flex-row items-start justify-between space-y-0">
                  <div className="space-y-1 pr-2">
                    <Badge variant="secondary" className="mb-1">{skill.skillCategory}</Badge>
                    <CardTitle className="text-lg leading-tight">{skill.skillName}</CardTitle>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-secondary/40 border border-border/50 flex items-center justify-center shrink-0 overflow-hidden relative">
                    {skill.image ? (
                      <img 
                        src={skill.image} 
                        alt={skill.skillName} 
                        className="w-full h-full object-contain p-1.5" 
                      />
                    ) : (
                      <Code className="w-6 h-6 text-muted-foreground" />
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mt-2">
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      Priority: <span className="font-medium text-foreground">{skill.priority}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <SkillFormDialog 
                        skillToEdit={skill} 
                        onSuccess={fetchSkills} 
                      />
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={() => skillId && handleDeleteSkill(skillId)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  )
}
