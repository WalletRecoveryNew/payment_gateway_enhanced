'use client'

import { ReactNode, useState } from 'react'
import Link from 'next/link'
import { Home, Wallet, Key, Bell, Settings, FileText, Clock, LogOut, Menu, X } from 'lucide-react'

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayoutClient({ children }: DashboardLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const navLinks = [
    { name: 'Overview', href: '/dashboard', icon: <Home size={20} /> },
    { name: 'Wallets', href: '/dashboard/wallets', icon: <Wallet size={20} /> },
    { name: 'Transactions', href: '/dashboard/transactions', icon: <Clock size={20} /> },
    { name: 'API Keys', href: '/dashboard/api-keys', icon: <Key size={20} /> },
    { name: 'Webhooks', href: '/dashboard/webhooks', icon: <Bell size={20} /> },
    { name: 'Documentation', href: '/dashboard/documentation', icon: <FileText size={20} /> },
    { name: 'Settings', href: '/dashboard/settings', icon: <Settings size={20} /> },
  ]

  return (
    <div className="min-h-screen bg-crypto-blue flex">
      {/* Sidebar for desktop */}
      <div className="hidden md:block md:w-64 shrink-0">
        <div className="glass-card h-full flex flex-col">
          <div className="flex items-center justify-center py-8">
            <Link href="/" className="text-2xl font-bold text-crypto-white">
              Crypto<span className="text-crypto-cyan">Flow</span>
            </Link>
          </div>
          
          <nav className="flex-1 px-4 pb-4">
            <ul className="space-y-1">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="flex items-center px-4 py-3 text-crypto-gray-light hover:text-crypto-white hover:bg-white/5 rounded-md transition-colors"
                  >
                    <span className="mr-3 text-crypto-cyan">{link.icon}</span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            <div className="pt-8 mt-auto">
              <Link
                href="/"
                className="flex items-center px-4 py-3 text-crypto-gray-light hover:text-crypto-white hover:bg-white/5 rounded-md transition-colors"
              >
                <LogOut size={20} className="mr-3 text-crypto-cyan" />
                Sign Out
              </Link>
            </div>
          </nav>
        </div>
      </div>
      
      {/* Mobile sidebar */}
      <div className="md:hidden">
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="fixed top-4 left-4 z-50 p-2 bg-crypto-blue-dark rounded-md text-crypto-white"
        >
          <Menu size={24} />
        </button>
        
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 glass-card">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4">
                <Link href="/" className="text-2xl font-bold text-crypto-white">
                  Crypto<span className="text-crypto-cyan">Flow</span>
                </Link>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-crypto-white"
                >
                  <X size={24} />
                </button>
              </div>
              
              <nav className="flex-1 px-4 py-8">
                <ul className="space-y-4">
                  {navLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="flex items-center px-4 py-3 text-crypto-gray-light hover:text-crypto-white hover:bg-white/5 rounded-md transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span className="mr-3 text-crypto-cyan">{link.icon}</span>
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                
                <div className="pt-8">
                  <Link
                    href="/"
                    className="flex items-center px-4 py-3 text-crypto-gray-light hover:text-crypto-white hover:bg-white/5 rounded-md transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <LogOut size={20} className="mr-3 text-crypto-cyan" />
                    Sign Out
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 md:ml-64">
        {/* Header */}
        <header className="bg-crypto-blue-dark/30 backdrop-blur-md border-b border-white/5 sticky top-0 z-10">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center md:hidden">
              <span className="text-xl font-bold text-crypto-white ml-8">
                Crypto<span className="text-crypto-cyan">Flow</span>
              </span>
            </div>
            
            <div className="flex items-center ml-auto">
              <div className="relative">
                <button className="flex items-center space-x-2 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-crypto-cyan/20 flex items-center justify-center text-crypto-cyan">
                    A
                  </div>
                  <span className="text-crypto-white hidden md:inline-block">Alex</span>
                </button>
              </div>
            </div>
          </div>
        </header>
        
        {/* Page content */}
        <main>
          {children}
        </main>
      </div>
    </div>
  )
} 