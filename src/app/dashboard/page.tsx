'use client'

import { Wallet, ArrowUpRight, TrendingUp, Activity, BarChart3, CreditCard } from 'lucide-react'
import Link from 'next/link'
import DashboardLayoutClient from '@/components/dashboard/dashboard-layout-client'
import { StatCard } from '@/components/dashboard/stat-card'
import { ChartCard } from '@/components/dashboard/chart-card'
import { DataTable, TableRow, TableCell, StatusBadge } from '@/components/dashboard/data-table'
import '../design-system.css'

export default function DashboardPage() {
  // Sample data for currency distribution
  const currencyData = [
    { currency: 'USDT', percentage: '42%', color: 'crypto-cyan' },
    { currency: 'USDC', percentage: '35%', color: 'purple-400' },
    { currency: 'ETH', percentage: '15%', color: 'yellow-400' },
    { currency: 'BTC', percentage: '8%', color: 'green-400' },
  ];

  // Sample data for recent transactions
  const transactions = [
    { id: 'TX_8f7d3e2a', date: 'May 15, 2023 14:30', amount: '250.00', currency: 'USDT', status: 'completed' },
    { id: 'TX_6e9c5b7a', date: 'May 14, 2023 09:12', amount: '1,500.00', currency: 'USDC', status: 'completed' },
    { id: 'TX_4d2a9f8c', date: 'May 13, 2023 17:45', amount: '0.75', currency: 'ETH', status: 'pending' },
    { id: 'TX_1b3c7d9e', date: 'May 12, 2023 11:20', amount: '890.50', currency: 'USDT', status: 'failed' },
    { id: 'TX_5a8e2f1b', date: 'May 11, 2023 16:05', amount: '350.00', currency: 'USDC', status: 'completed' },
  ];

  return (
    <DashboardLayoutClient>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="heading-3 mb-2">Dashboard</h1>
          <p className="subtitle">
            Manage your crypto payments and view transaction analytics.
          </p>
        </div>
        
        <div className="flex justify-between items-center mb-8">
          <div className="animate-float">
            <p className="body">
              Welcome back, <span className="text-crypto-white font-medium">Alex</span>
            </p>
          </div>
          <Link 
            href="/payment" 
            className="action-button"
          >
            Create Payment
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
        
        {/* Key statistics */}
        <div className="dashboard-grid mb-8">
          <StatCard 
            title="Total Revenue" 
            value="$24,345.62" 
            change="+12.5%" 
            icon={<Wallet className="h-6 w-6 text-crypto-cyan" />}
            color="crypto-cyan"
          />
          
          <StatCard 
            title="Total Transactions" 
            value="1,294" 
            change="+8.2%" 
            icon={<Activity className="h-6 w-6 text-purple-400" />}
            color="purple-400"
          />
          
          <StatCard 
            title="Success Rate" 
            value="98.3%" 
            change="+1.2%" 
            icon={<BarChart3 className="h-6 w-6 text-green-400" />}
            color="green-400"
          />
          
          <StatCard 
            title="Active Wallets" 
            value="534" 
            change="+3.7%" 
            icon={<CreditCard className="h-6 w-6 text-yellow-400" />}
            color="yellow-400"
          />
        </div>
        
        {/* Transaction volume chart */}
        <div className="dashboard-grid-2-1 mb-8">
          <ChartCard title="Transaction Volume">
            <div className="relative w-full h-full">
              {/* Placeholder for actual chart implementation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-[200px] relative overflow-hidden">
                  {/* Simulated chart bars */}
                  <div className="absolute bottom-0 left-[10%] w-[5%] h-[30%] bg-crypto-cyan/40 rounded-t-md"></div>
                  <div className="absolute bottom-0 left-[20%] w-[5%] h-[45%] bg-crypto-cyan/40 rounded-t-md"></div>
                  <div className="absolute bottom-0 left-[30%] w-[5%] h-[60%] bg-crypto-cyan/40 rounded-t-md"></div>
                  <div className="absolute bottom-0 left-[40%] w-[5%] h-[40%] bg-crypto-cyan/40 rounded-t-md"></div>
                  <div className="absolute bottom-0 left-[50%] w-[5%] h-[70%] bg-crypto-cyan/40 rounded-t-md"></div>
                  <div className="absolute bottom-0 left-[60%] w-[5%] h-[55%] bg-crypto-cyan/40 rounded-t-md"></div>
                  <div className="absolute bottom-0 left-[70%] w-[5%] h-[65%] bg-crypto-cyan/40 rounded-t-md"></div>
                  <div className="absolute bottom-0 left-[80%] w-[5%] h-[75%] bg-crypto-cyan/40 rounded-t-md"></div>
                  
                  {/* Animated highlight bar */}
                  <div className="absolute bottom-0 left-[50%] w-[5%] h-[70%] bg-crypto-cyan rounded-t-md animate-pulse-slow"></div>
                </div>
              </div>
            </div>
          </ChartCard>
          
          <ChartCard title="Currency Distribution">
            <div className="flex flex-col h-full">
              <div className="flex-1 relative">
                {/* Placeholder for pie chart */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-32 h-32">
                    <div className="absolute inset-0 rounded-full border-8 border-crypto-cyan/40 animate-pulse-slow"></div>
                    <div className="absolute inset-0 rounded-full border-8 border-transparent border-t-purple-400/40 border-r-purple-400/40 transform rotate-45"></div>
                    <div className="absolute inset-0 rounded-full border-8 border-transparent border-b-yellow-400/40 transform -rotate-45"></div>
                    <div className="absolute inset-0 rounded-full border-8 border-transparent border-l-green-400/40 transform rotate-90"></div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3 mt-4">
                {currencyData.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full bg-${item.color} mr-2`}></div>
                      <span className="text-sm text-crypto-white">{item.currency}</span>
                    </div>
                    <span className="text-sm text-crypto-white">{item.percentage}</span>
                  </div>
                ))}
              </div>
            </div>
          </ChartCard>
        </div>
        
        {/* Recent transactions */}
        <DataTable 
          headers={['Transaction ID', 'Date', 'Amount', 'Currency', 'Status']}
          actionLabel="View All"
          actionHref="/dashboard/transactions"
        >
          {transactions.map((tx, index) => (
            <TableRow key={index}>
              <TableCell highlight>{tx.id}</TableCell>
              <TableCell>{tx.date}</TableCell>
              <TableCell highlight>{tx.amount}</TableCell>
              <TableCell>{tx.currency}</TableCell>
              <TableCell>
                <StatusBadge status={tx.status} />
              </TableCell>
            </TableRow>
          ))}
        </DataTable>
      </div>
    </DashboardLayoutClient>
  )
}
