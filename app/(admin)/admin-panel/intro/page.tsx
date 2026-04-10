import React from 'react'
import IntroCard from './_components/IntroCard'

export default function AdminIntroPage() {
  return (
    <div className='p-6 md:p-10 max-w-4xl mx-auto'>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Introduction Data</h1>
        <p className="text-muted-foreground">This is the profile data shown on your main intro section.</p>
      </div>

      <IntroCard />
    </div>
  )
}
