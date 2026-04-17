import React from 'react'
import BlogList from './_components/BlogList'

export default function BlogPage() {
  return (
    <div className='p-6 md:p-10 max-w-6xl mx-auto'>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Blog Management</h1>
        <p className="text-muted-foreground">Manage your portfolio blog posts.</p>
      </div>

      <BlogList />
    </div>
  )
}
