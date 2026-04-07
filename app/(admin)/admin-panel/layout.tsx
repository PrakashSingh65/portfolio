"use client"
import AdminSideBar from '@/components/AdminSideBar'
import React from 'react'
import { SidebarProvider } from '@/components/ui/sidebar'

export default function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
    <AdminSideBar/>
      {children}
    </SidebarProvider>
  )
}
