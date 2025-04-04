import type { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Dashboard - Crypto Payment Gateway',
  description: 'Manage your crypto payments and transactions',
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
} 