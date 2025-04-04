'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  ArrowRightLeft, 
  Key, 
  Webhook, 
  Settings, 
  Menu, 
  X
} from 'lucide-react'

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
  { name: 'Transactions', href: '/dashboard/transactions', icon: <ArrowRightLeft className="h-5 w-5" /> },
  { name: 'API Keys', href: '/dashboard/api-keys', icon: <Key className="h-5 w-5" /> },
  { name: 'Webhooks', href: '/dashboard/webhooks', icon: <Webhook className="h-5 w-5" /> },
  { name: 'Settings', href: '/dashboard/settings', icon: <Settings className="h-5 w-5" /> },
]

export default function DashboardClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="flex flex-col min-h-screen bg-crypto-blue">
      <div className="flex-grow flex">
        <div className="md:hidden">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="fixed bottom-4 right-4 p-3 rounded-full bg-crypto-cyan text-crypto-blue shadow-lg z-50"
          >
            {isSidebarOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
        
        <div className={`md:block ${isSidebarOpen ? 'block fixed inset-0 z-40' : 'hidden'}`}>
          <div 
            className={`md:hidden ${isSidebarOpen ? 'fixed inset-0 bg-black opacity-25' : 'hidden'}`}
            onClick={() => setIsSidebarOpen(false)}
          ></div>
          
          <div className={`
            md:relative md:translate-x-0 
            ${isSidebarOpen ? 'fixed inset-y-0 left-0 translate-x-0' : 'fixed inset-y-0 left-0 -translate-x-full'}
            transition-transform duration-300 ease-in-out
            w-64 min-h-screen bg-crypto-blue-dark border-r border-white/10 z-50
          `}>
            <div className="flex flex-col h-full">
              <div className="h-16 flex items-center px-6 border-b border-white/10">
                <Link href="/" className="text-xl font-bold text-crypto-cyan">
                  CryptoFlow
                </Link>
              </div>
              
              <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      flex items-center px-3 py-2 text-sm font-medium rounded-md
                      ${pathname === item.href || pathname?.startsWith(item.href + '/')
                        ? 'bg-white/10 text-crypto-cyan'
                        : 'text-crypto-gray-light hover:bg-white/5 hover:text-crypto-white'}
                    `}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.name}
                  </Link>
                ))}
              </nav>
              
              <div className="p-4 border-t border-white/10">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-crypto-cyan/20 flex items-center justify-center text-crypto-cyan font-bold">
                      M
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-crypto-white">Merchant Name</p>
                    <p className="text-xs text-crypto-gray-light">merchant@example.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
} 