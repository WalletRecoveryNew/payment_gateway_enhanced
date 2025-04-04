'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'
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
    solanaAddress
  } = useWallet()
  
  const [isLoading, setIsLoading] = useState(false)
  const [showSolana, setShowSolana] = useState(false)

  // Handle connection
  const handleConnect = async () => {
    if (isConnected) {
      disconnect()
    } else {
      setIsLoading(true)
      try {
        await connect()
      } finally {
        setIsLoading(false)
      }
    }
  }

  // Toggle between EVM and Solana
  const toggleWalletType = () => {
    setShowSolana(!showSolana)
  }

  // Format address for display
  const formatAddress = (addr: string) => {
    if (!addr) return ''
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`
  }

  // Get current wallet address
  const currentAddress = isSolana ? solanaAddress : address
  
  // Get current chain name
  const currentChain = isSolana 
    ? 'Solana' 
    : (chainId && chainId in chainNameMap) 
      ? chainNameMap[chainId] 
      : 'Unknown'

  return (
    <div>
      {isConnected ? (
        <div className="flex flex-col items-center">
          <div className="flex items-center mb-2">
            <div className={`w-3 h-3 rounded-full mr-2 ${isSolana ? 'bg-purple-500' : 'bg-green-500'}`}></div>
            <span className="text-crypto-white text-sm">{currentChain}</span>
          </div>
          
          <div className="bg-crypto-blue-dark/30 px-4 py-2 rounded-lg mb-3 border border-white/10">
            <span className="text-crypto-white font-mono">{formatAddress(currentAddress || '')}</span>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={handleConnect}
              className="px-4 py-2 bg-crypto-cyan/10 text-crypto-cyan border border-crypto-cyan/20 rounded-md hover:bg-crypto-cyan/20 transition-colors"
            >
              Disconnect
            </button>
            
            <button
              onClick={toggleWalletType}
              className="px-4 py-2 bg-white/10 text-crypto-white rounded-md hover:bg-white/20 transition-colors"
            >
              Switch to {showSolana ? 'EVM' : 'Solana'}
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={handleConnect}
          disabled={isLoading}
          className="px-6 py-3 bg-crypto-cyan text-crypto-blue-dark rounded-md font-medium hover:bg-crypto-cyan/90 transition-colors disabled:opacity-70 flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
              Connecting...
            </>
          ) : (
            <>Connect {showSolana ? 'Solana' : 'Wallet'}</>
          )}
        </button>
      )}
    </div>
  )
}
