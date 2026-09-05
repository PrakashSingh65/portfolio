import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AIChatModal from '@/components/AIChatModal'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <AIChatModal/>
      <Footer />
    </>
  )
}