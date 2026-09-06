import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { GlobalChatWidget } from '@/components/GlobalChatWidget'


export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <GlobalChatWidget/>
      <Footer />
    </>
  )
}