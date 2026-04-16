import React from 'react'
import CertificateList from './_components/CertificateList'

export default function CertificatePage() {
  return (
    <div className='p-6 md:p-10 max-w-6xl mx-auto'>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Certificate Management</h1>
        <p className="text-muted-foreground">Manage your portfolio certificates shown on the main page.</p>
      </div>

      <CertificateList />
    </div>
  )
}
