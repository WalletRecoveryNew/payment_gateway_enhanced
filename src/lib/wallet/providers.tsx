'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { createConfig, WagmiProvider, useAccount, useConnect, useDisconnect } from 'wagmi'
import { createWeb3Modal } from '@web3modal/wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { supportedChains } from '../config/chains'
import { mainnet } from 'viem/chains'
import { http, createPublicClient } from 'viem'

// Solana imports
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { PhantomWalletAdapter, SolflareWalletAdapter, TorusWalletAdapter } from '@solana/wallet-adapter-wallets'
import { clusterApiUrl } from '@solana/web3.js'

// Create wagmi config
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID'

const metadata = {
  name: 'Crypto Payment Gateway',
  description: 'A multi-chain crypto payment gateway',
  url: 'https://crypto-payment-gateway.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const config = createConfig({
  chains: supportedChains,
  transports: {
    [mainnet.id]: http('https://eth-mainnet.g.alchemy.com/v2/YOUR_ALCHEMY_KEY'),
    // Add other chain transports as needed
  },
})

// Create web3modal instance
const web3modal = createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true,
  themeMode: 'dark',
  themeVariables: {
    '--w3m-accent': '#00FFFF',
    '--w3m-background-color': '#0A1929',
  },
})

// Create query client
const queryClient = new QueryClient()

// Create Solana wallet adapters
const getSolanaWalletAdapters = () => {
  return [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
    new TorusWalletAdapter(),
  ]
}

// Create wallet context
type WalletContextType = {
  isConnected: boolean
  address: string | null
  chainId: number | null
  connect: () => void
  disconnect: () => void
  isSolana: boolean
  connectSolana: () => void
  disconnectSolana: () => void
  solanaAddress: string | null
}

const WalletContext = createContext<WalletContextType>({
  isConnected: false,
  address: null,
  chainId: null,
  connect: () => {},
  disconnect: () => {},
  isSolana: false,
  connectSolana: () => {},
  disconnectSolana: () => {},
  solanaAddress: null,
})

export const useWallet = () => useContext(WalletContext)

// Wallet provider component
export function WalletProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        <ConnectionProvider endpoint={clusterApiUrl('mainnet-beta')}>
          <WalletProvider wallets={getSolanaWalletAdapters()} autoConnect>
            <WalletContextProvider>
              {children}
            </WalletContextProvider>
          </WalletProvider>
        </ConnectionProvider>
      </WagmiProvider>
    </QueryClientProvider>
  )
}

// Wallet context provider
function WalletContextProvider({ children }: { children: React.ReactNode }) {
  const { isConnected, address, chainId } = useAccount()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()
  
  // Solana state
  const [isSolana, setIsSolana] = useState(false)
  const [solanaAddress, setSolanaAddress] = useState<string | null>(null)
  
  // Mock Solana functions for now - will be replaced with actual Solana wallet adapter
  const connectSolana = () => {
    setIsSolana(true)
    setSolanaAddress('SoL' + Math.random().toString(36).substring(2, 10))
  }
  
  const disconnectSolana = () => {
    setIsSolana(false)
    setSolanaAddress(null)
  }
  
  const value = {
    isConnected,
    address: address || null,
    chainId: chainId || null,
    connect: () => {
      web3modal.open()
    },
    disconnect,
    isSolana,
    connectSolana,
    disconnectSolana,
    solanaAddress,
  }
  
  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  )
}
