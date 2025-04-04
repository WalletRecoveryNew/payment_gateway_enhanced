'use client'

import { useState, useEffect } from 'react'
import { Loader2, ExternalLink } from 'lucide-react'
import { useWallet } from '@/lib/wallet/providers'
import { chainNameMap } from '@/lib/config/chains'

export function ConnectButton() {
  const { 
    isConnected, 
    address, 
    chainId, 
    connect, 
    disconnect,
    isSolana,
    solanaAddress,
    connectSolana,
    disconnectSolana
  } = useWallet()
  
  const [isLoading, setIsLoading] = useState(false)
  const [showSolana, setShowSolana] = useState(false)

  // Handle connection
  const handleConnect = async () => {
    if (showSolana) {
      if (isSolana) {
        disconnectSolana()
      } else {
        setIsLoading(true)
        try {
          connectSolana()
        } finally {
          setIsLoading(false)
        }
      }
    } else {
      if (isConnected) {
        disconnect()
      } else {
        setIsLoading(true)
        try {
          connect()
        } finally {
          setIsLoading(false)
        }
      }
    }
  }

  // Toggle between EVM and Solana
  const toggleWalletType = () => {
    setShowSolana(!showSolana)
  }

  // Format address for display
  const formatAddress = (addr: string | null) => {
    if (!addr) return ''
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  // Get connected status
  const getConnectedStatus = () => {
    if (showSolana) {
      return isSolana
    }
    return isConnected
  }

  // Get display address
  const getDisplayAddress = () => {
    if (showSolana) {
      return formatAddress(solanaAddress)
    }
    return formatAddress(address)
  }

  // Get network name
  const getNetworkName = () => {
    if (showSolana) {
      return 'Solana'
    }
    if (chainId && chainNameMap[chainId]) {
      return chainNameMap[chainId]
    }
    return 'Unknown'
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-crypto-gray-light">
          {showSolana ? 'Solana Wallet' : 'EVM Wallet'}
        </span>
        <button 
          onClick={toggleWalletType}
          className="text-xs text-crypto-cyan hover:underline"
        >
          Switch to {showSolana ? 'EVM' : 'Solana'}
        </button>
      </div>
      
      <button
        onClick={handleConnect}
        disabled={isLoading}
        className="flex items-center justify-center px-4 py-2 rounded-lg bg-crypto-cyan text-crypto-blue-dark hover:bg-crypto-cyan/90 disabled:opacity-50 transition-colors"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Connecting...
          </>
        ) : getConnectedStatus() ? (
          <>
            Disconnect {getDisplayAddress()}
          </>
        ) : (
          <>
            Connect {showSolana ? 'Solana' : 'Wallet'}
          </>
        )}
      </button>
      
      {getConnectedStatus() && (
        <div className="mt-2 text-xs text-crypto-gray-light flex items-center justify-center">
          Connected to {getNetworkName()}
        </div>
      )}
    </div>
  )
}
