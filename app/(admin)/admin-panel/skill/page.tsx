import React from 'react'
import SkillManager from './_components/SkillManager'

export default function AdminSkillPage() {
  return (
    <div className='p-6 md:p-10 max-w-5xl mx-auto'>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Skill Management</h1>
        <p className="text-muted-foreground">Manage the skills that are displayed on your portfolio sections.</p>
      </div>

      <SkillManager />
    </div>
  )
}