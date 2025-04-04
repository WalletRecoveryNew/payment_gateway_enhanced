'use client'

import { useState, useEffect } from 'react'
import { Loader2, ExternalLink, Download, Filter } from 'lucide-react'
import { chainNameMap, getExplorerTxUrl } from '@/lib/config/chains'

type Transaction = {
  id: string
  date: string
  amount: string
  currency: string
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED'
  chainId: number
  txHash?: string
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [currencyFilter, setCurrencyFilter] = useState<string>('all')
  
  // Fetch transactions on component mount and when filters change
  useEffect(() => {
    fetchTransactions()
  }, [currentPage, statusFilter, currencyFilter])
  
  // Fetch transactions from API
  const fetchTransactions = async () => {
    setIsLoading(true)
    try {
      // In a real implementation, this would fetch from your API
      // For now, we'll use mock data
      setTimeout(() => {
        const mockTransactions: Transaction[] = [
          {
            id: 'tx_1',
            date: '2025-04-04T12:30:45Z',
            amount: '0.5',
            currency: 'ETH',
            status: 'COMPLETED',
            chainId: 1,
            txHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
          },
          {
            id: 'tx_2',
            date: '2025-04-03T10:15:22Z',
            amount: '100',
            currency: 'USDC',
            status: 'COMPLETED',
            chainId: 137,
            txHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890'
          },
          {
            id: 'tx_3',
            date: '2025-04-02T18:45:12Z',
            amount: '0.01',
            currency: 'BTC',
            status: 'PENDING',
            chainId: 1
          },
          {
            id: 'tx_4',
            date: '2025-04-01T09:22:33Z',
            amount: '5',
            currency: 'SOL',
            status: 'COMPLETED',
            chainId: 501,
            txHash: '4sCJGxKQqWuEijCmqLtb2ccBJvkek9QEwm8qxLq4cWiCXHX5pQEYxMRuZY7yTka3P4'
          },
          {
            id: 'tx_5',
            date: '2025-03-31T14:10:05Z',
            amount: '50',
            currency: 'USDT',
            status: 'FAILED',
            chainId: 56
          }
        ]
        
        // Apply filters
        let filteredTransactions = [...mockTransactions]
        
        if (statusFilter !== 'all') {
          filteredTransactions = filteredTransactions.filter(tx => tx.status === statusFilter)
        }
        
        if (currencyFilter !== 'all') {
          filteredTransactions = filteredTransactions.filter(tx => tx.currency === currencyFilter)
        }
        
        setTransactions(filteredTransactions)
        setTotalPages(Math.ceil(filteredTransactions.length / 10))
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      console.error('Error fetching transactions:', error)
      setIsLoading(false)
    }
  }
  
  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
  }
  
  // Get status badge class
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-500/20 text-green-500'
      case 'PENDING':
        return 'bg-yellow-500/20 text-yellow-500'
      case 'PROCESSING':
        return 'bg-blue-500/20 text-blue-500'
      case 'FAILED':
        return 'bg-red-500/20 text-red-500'
      default:
        return 'bg-gray-500/20 text-gray-500'
    }
  }
  
  // Export transactions as CSV
  const exportTransactions = () => {
    const headers = ['ID', 'Date', 'Amount', 'Currency', 'Status', 'Chain', 'Transaction Hash']
    const csvContent = [
      headers.join(','),
      ...transactions.map(tx => [
        tx.id,
        formatDate(tx.date),
        tx.amount,
        tx.currency,
        tx.status,
        chainNameMap[tx.chainId] || 'Unknown',
        tx.txHash || ''
      ].join(','))
    ].join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', `transactions_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-crypto-white">Transactions</h1>
        <div className="flex gap-2">
          <button
            onClick={exportTransactions}
            className="flex items-center px-4 py-2 bg-white/10 text-crypto-white rounded-md hover:bg-white/20"
          >
            <Download className="mr-2 h-4 w-4" />
            Export
          </button>
          <div className="relative">
            <button
              className="flex items-center px-4 py-2 bg-white/10 text-crypto-white rounded-md hover:bg-white/20"
            >
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </button>
          </div>
        </div>
      </div>
      
      {/* Filters */}
      <div className="glass-card p-4 mb-6 flex flex-wrap gap-4">
        <div>
          <label className="block text-sm font-medium text-crypto-gray-light mb-1">
            Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-40 px-3 py-2 bg-crypto-blue-dark border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-crypto-cyan focus:border-crypto-cyan text-crypto-white"
          >
            <option value="all">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="PROCESSING">Processing</option>
            <option value="COMPLETED">Completed</option>
            <option value="FAILED">Failed</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-crypto-gray-light mb-1">
            Currency
          </label>
          <select
            value={currencyFilter}
            onChange={(e) => setCurrencyFilter(e.target.value)}
            className="w-40 px-3 py-2 bg-crypto-blue-dark border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-crypto-cyan focus:border-crypto-cyan text-crypto-white"
          >
            <option value="all">All Currencies</option>
            <option value="BTC">Bitcoin (BTC)</option>
            <option value="ETH">Ethereum (ETH)</option>
            <option value="USDT">Tether (USDT)</option>
            <option value="USDC">USD Coin (USDC)</option>
            <option value="SOL">Solana (SOL)</option>
          </select>
        </div>
      </div>
      
      <div className="glass-card">
        {isLoading ? (
          <div className="p-8 flex justify-center">
            <div className="animate-pulse text-crypto-gray-light">Loading transactions...</div>
          </div>
        ) : transactions.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-crypto-gray-light">No transactions found.</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-white/10">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-crypto-gray-light uppercase tracking-wider">
                      Transaction ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-crypto-gray-light uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-crypto-gray-light uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-crypto-gray-light uppercase tracking-wider">
                      Currency
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-crypto-gray-light uppercase tracking-wider">
                      Network
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-crypto-gray-light uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-crypto-gray-light uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-white/5">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-crypto-white">
                        {transaction.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-crypto-gray-light">
                        {formatDate(transaction.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-crypto-white">
                        {transaction.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-crypto-gray-light">
                        {transaction.currency}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-crypto-gray-light">
                        {chainNameMap[transaction.chainId] || 'Unknown'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeClass(transaction.status)}`}>
                          {transaction.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-crypto-gray-light">
                        {transaction.txHash && (
                          <a
                            href={getExplorerTxUrl(transaction.chainId, transaction.txHash)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-crypto-cyan hover:underline flex items-center"
                          >
                            View <ExternalLink className="ml-1 h-3 w-3" />
                          </a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="px-6 py-4 flex items-center justify-between border-t border-white/10">
              <div className="text-sm text-crypto-gray-light">
                Showing page {currentPage} of {totalPages}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded text-sm ${
                    currentPage === 1
                      ? 'bg-white/5 text-crypto-gray-light cursor-not-allowed'
                      : 'bg-white/10 text-crypto-white hover:bg-white/20'
                  }`}
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 rounded text-sm ${
                      currentPage === page
                        ? 'bg-crypto-cyan text-crypto-blue'
                        : 'bg-white/10 text-crypto-white hover:bg-white/20'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded text-sm ${
                    currentPage === totalPages
                      ? 'bg-white/5 text-crypto-gray-light cursor-not-allowed'
                      : 'bg-white/10 text-crypto-white hover:bg-white/20'
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
