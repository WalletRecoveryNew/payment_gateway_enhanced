'use client'

import { useState, useEffect } from 'react'
import { useWallet } from '@/lib/wallet/providers'
import { chainNameMap, getExplorerAddressUrl } from '@/lib/config/chains'
import { Loader2, Plus, ExternalLink, Copy, AlertCircle } from 'lucide-react'

type Wallet = {
  id: string
  name: string
  address: string
  chain: string
  chainId: number
  balance: string
  currency: string
  isActive: boolean
}

export default function WalletsPage() {
  const { isConnected, address, chainId, isSolana, solanaAddress } = useWallet()
  const [wallets, setWallets] = useState<Wallet[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAddingWallet, setIsAddingWallet] = useState(false)
  const [newWalletName, setNewWalletName] = useState('')
  
  // Fetch wallets on component mount
  useEffect(() => {
    fetchWallets()
  }, [])
  
  // Fetch wallets from API
  const fetchWallets = async () => {
    setIsLoading(true)
    try {
      // In a real implementation, this would fetch from your API
      // For now, we'll use mock data
      setTimeout(() => {
        setWallets([
          {
            id: '1',
            name: 'Main Ethereum Wallet',
            address: '0x1234567890abcdef1234567890abcdef12345678',
            chain: 'Ethereum',
            chainId: 1,
            balance: '1.245',
            currency: 'ETH',
            isActive: true,
          },
          {
            id: '2',
            name: 'USDC Payment Wallet',
            address: '0xabcdef1234567890abcdef1234567890abcdef12',
            chain: 'Polygon',
            chainId: 137,
            balance: '520.50',
            currency: 'USDC',
            isActive: true,
          },
          {
            id: '3',
            name: 'Solana Wallet',
            address: 'Ey4bNH4PTWdZgRwYBAvBrhNZjAK8Z1qw6mH6HKheaQw3',
            chain: 'Solana',
            chainId: 501,
            balance: '12.75',
            currency: 'SOL',
            isActive: true,
          },
        ])
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      console.error('Error fetching wallets:', error)
      setIsLoading(false)
    }
  }
  
  // Add a new wallet
  const addWallet = async () => {
    if (!newWalletName || (!isConnected && !isSolana)) return
    
    setIsAddingWallet(true)
    try {
      // In a real implementation, this would call your API
      // For now, we'll simulate adding a wallet
      const newWallet: Wallet = {
        id: `${wallets.length + 1}`,
        name: newWalletName,
        address: isSolana ? solanaAddress || '' : address || '',
        chain: isSolana ? 'Solana' : chainId ? chainNameMap[chainId] : 'Unknown',
        chainId: isSolana ? 501 : chainId || 1,
        balance: '0.00',
        currency: isSolana ? 'SOL' : 'ETH',
        isActive: true,
      }
      
      setTimeout(() => {
        setWallets([...wallets, newWallet])
        setNewWalletName('')
        setIsAddingWallet(false)
      }, 1000)
    } catch (error) {
      console.error('Error adding wallet:', error)
      setIsAddingWallet(false)
    }
  }
  
  // Copy address to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        alert('Address copied to clipboard')
      })
      .catch(err => {
        console.error('Failed to copy address:', err)
      })
  }
  
  // Truncate address for display
  const truncateAddress = (address: string) => {
    if (address.length <= 15) return address
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }
  
  // Get chain color class
  const getChainColorClass = (chain: string) => {
    switch (chain) {
      case 'Ethereum':
        return 'text-indigo-400'
      case 'Polygon':
        return 'text-purple-400'
      case 'BSC':
        return 'text-yellow-400'
      case 'Optimism':
        return 'text-red-400'
      case 'Arbitrum':
        return 'text-blue-400'
      case 'Tron':
        return 'text-red-500'
      case 'Solana':
        return 'text-green-400'
      default:
        return 'text-crypto-gray-light'
    }
  }
  
  const walletsContent = (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-crypto-white">Wallets</h1>
        <button
          onClick={() => setIsAddingWallet(!isAddingWallet)}
          className="flex items-center px-4 py-2 bg-crypto-cyan text-crypto-blue rounded-md hover:bg-crypto-cyan/90"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Wallet
        </button>
      </div>
      
      {isAddingWallet && (
        <div className="glass-card p-6 mb-6 border border-crypto-cyan/20">
          <h3 className="text-lg font-medium text-crypto-white mb-4">Add New Wallet</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-crypto-white mb-2">
                Wallet Name
              </label>
              <input
                type="text"
                value={newWalletName}
                onChange={(e) => setNewWalletName(e.target.value)}
                placeholder="e.g., Main ETH Wallet"
                className="block w-full px-3 py-2 bg-crypto-blue-dark border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-crypto-cyan focus:border-crypto-cyan text-crypto-white"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-crypto-white mb-2">
                Wallet Address
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={isSolana ? solanaAddress || 'Not connected' : address || 'Not connected'}
                  className="block w-full px-3 py-2 bg-crypto-blue-dark border border-white/10 rounded-md focus:outline-none text-crypto-white"
                  disabled
                />
                <div className="w-40">
                  <ConnectButton />
                </div>
              </div>
              <p className="mt-1 text-xs text-crypto-gray-light">
                Connect your wallet to add it to your account
              </p>
            </div>
            
            <div className="flex justify-end gap-2 pt-4">
              <button
                onClick={() => setIsAddingWallet(false)}
                className="px-4 py-2 border border-white/10 text-crypto-white rounded-md hover:bg-white/5"
              >
                Cancel
              </button>
              <button
                onClick={addWallet}
                disabled={!newWalletName || (!isConnected && !isSolana)}
                className="flex items-center px-4 py-2 bg-crypto-cyan text-crypto-blue rounded-md hover:bg-crypto-cyan/90 disabled:opacity-50"
              >
                {isAddingWallet ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  'Add Wallet'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {isLoading ? (
        <div className="glass-card p-10 text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-crypto-cyan" />
          <p className="mt-4 text-crypto-gray-light">Loading wallets...</p>
        </div>
      ) : wallets.length === 0 ? (
        <div className="glass-card p-10 text-center">
          <div className="flex justify-center mb-4">
            <AlertCircle className="text-crypto-cyan" size={48} />
          </div>
          <h3 className="text-xl font-medium text-crypto-white mb-2">No wallets found</h3>
          <p className="text-crypto-gray-light mb-6">Add your first wallet to start accepting payments.</p>
          <button 
            onClick={() => setIsAddingWallet(true)}
            className="px-4 py-2 bg-crypto-cyan text-crypto-blue rounded-md hover:bg-crypto-cyan/90 transition-colors"
          >
            Add Your First Wallet
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {wallets.map((wallet) => (
            <div key={wallet.id} className={`glass-card p-6 ${!wallet.isActive && 'opacity-70'}`}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium text-crypto-white">{wallet.name}</h3>
                  <p className={`text-sm ${getChainColorClass(wallet.chain)}`}>{wallet.chain}</p>
                </div>
                <div className="flex items-center gap-2">
                  {!wallet.isActive && (
                    <span className="px-2 py-1 text-xs bg-red-500/20 text-red-500 rounded-full">
                      Inactive
                    </span>
                  )}
                  <div className="relative group">
                    <button className="p-1 hover:bg-white/10 rounded">
                      <svg className="w-5 h-5 text-crypto-gray-light" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                    <div className="absolute right-0 mt-2 w-48 bg-crypto-blue-dark border border-crypto-cyan/20 rounded-md shadow-lg z-10 hidden group-hover:block">
                      <div className="py-1">
                        <a href="#" className="block px-4 py-2 text-sm text-crypto-white hover:bg-white/5">Edit Wallet</a>
                        <a href="#" className="block px-4 py-2 text-sm text-crypto-white hover:bg-white/5">View Transactions</a>
                        <a href="#" className="block px-4 py-2 text-sm text-red-400 hover:bg-white/5">
                          {wallet.isActive ? 'Deactivate' : 'Activate'} Wallet
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <code className="text-sm text-crypto-gray-light font-mono bg-white/5 px-2 py-1 rounded">
                  {truncateAddress(wallet.address)}
                </code>
                <button 
                  onClick={() => copyToClipboard(wallet.address)}
                  className="p-1 text-crypto-gray-light hover:text-crypto-cyan"
                  title="Copy address"
                >
                  <Copy size={14} />
                </button>
                <a 
                  href={getExplorerAddressUrl(wallet.chainId, wallet.address)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 text-crypto-gray-light hover:text-crypto-cyan"
                  title="View on blockchain explorer"
                >
                  <ExternalLink size={14} />
                </a>
              </div>
              <div className="flex items-end justify-between mt-6">
                <div>
                  <p className="text-sm text-crypto-gray-light">Balance</p>
                  <p className="text-xl font-medium text-crypto-white">
                    {wallet.balance} <span className="text-crypto-cyan">{wallet.currency}</span>
                  </p>
                </div>
                <button className="text-sm text-crypto-cyan hover:underline">
                  Withdraw
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Informational card */}
      <div className="glass-card mt-8 p-6 border border-crypto-cyan/20">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-crypto-cyan/10 rounded-full">
            <AlertCircle className="text-crypto-cyan" size={24} />
          </div>
          <div>
            <h3 className="text-lg font-medium text-crypto-white mb-1">Security Information</h3>
            <p className="text-crypto-gray-light">
              Wallets added to CryptoFlow are for receiving payments only. Private keys are never stored 
              or accessible through our platform. Always verify wallet addresses before sharing them with customers.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
  
  return walletsContent
}

// Import at the bottom to avoid circular dependency
import { ConnectButton } from '@/components/wallet/connect-button'
