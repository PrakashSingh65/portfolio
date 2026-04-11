import React from 'react'
import AboutCard from './_components/AboutCard'

export default function AdminAboutPage() {
  return (
    <div className='p-6 md:p-10 max-w-4xl mx-auto'>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">About Section Data an</h1>
        <p className="text-muted-foreground">Manage the deeply descriptive about information displayed on your portfolio site.</p>
      </div>

      <AboutCard />
    </div>
  )
}