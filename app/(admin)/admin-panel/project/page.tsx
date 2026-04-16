import React from 'react'
import ProjectList from './_components/ProjectList'

export default function ProjectPage() {
  return (
    <div className='p-6 md:p-10 max-w-6xl mx-auto'>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Projects Management</h1>
        <p className="text-muted-foreground">Manage your portfolio projects shown on the main page.</p>
      </div>

      <ProjectList />
    </div>
  )
}
