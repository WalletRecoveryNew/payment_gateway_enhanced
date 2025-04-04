import { 
  mainnet, 
  polygon, 
  bsc, 
  optimism, 
  arbitrum 
} from 'viem/chains'

// Define chain IDs for networks not included in viem
export const TRON_CHAIN_ID = 728126428
export const SOLANA_CHAIN_ID = 501

// Export all supported chains
export const supportedChains = [
  mainnet,      // Ethereum Mainnet
  polygon,      // Polygon
  bsc,          // Binance Smart Chain
  optimism,     // Optimism
  arbitrum,     // Arbitrum
  // Custom chains will be handled separately
]

// Chain name mapping for display and reference
export const chainNameMap: Record<number, string> = {
  [mainnet.id]: 'Ethereum',
  [polygon.id]: 'Polygon',
  [bsc.id]: 'BSC',
  [optimism.id]: 'Optimism',
  [arbitrum.id]: 'Arbitrum',
  [TRON_CHAIN_ID]: 'Tron',
  [SOLANA_CHAIN_ID]: 'Solana',
}

// Chain currency mapping
export const chainCurrencyMap: Record<number, string> = {
  [mainnet.id]: 'ETH',
  [polygon.id]: 'MATIC',
  [bsc.id]: 'BNB',
  [optimism.id]: 'ETH',
  [arbitrum.id]: 'ETH',
  [TRON_CHAIN_ID]: 'TRX',
  [SOLANA_CHAIN_ID]: 'SOL',
}

// Chain explorer URL mapping
export const chainExplorerMap: Record<number, string> = {
  [mainnet.id]: 'https://etherscan.io',
  [polygon.id]: 'https://polygonscan.com',
  [bsc.id]: 'https://bscscan.com',
  [optimism.id]: 'https://optimistic.etherscan.io',
  [arbitrum.id]: 'https://arbiscan.io',
  [TRON_CHAIN_ID]: 'https://tronscan.org',
  [SOLANA_CHAIN_ID]: 'https://explorer.solana.com',
}

// Function to get explorer URL for a transaction
export function getExplorerTxUrl(chainId: number, txHash: string): string {
  const baseUrl = chainExplorerMap[chainId] || chainExplorerMap[mainnet.id]
  
  // Solana has a different URL structure
  if (chainId === SOLANA_CHAIN_ID) {
    return `${baseUrl}/tx/${txHash}`
  }
  
  // Tron has a different URL structure
  if (chainId === TRON_CHAIN_ID) {
    return `${baseUrl}/#/transaction/${txHash}`
  }
  
  // Default EVM-compatible chains
  return `${baseUrl}/tx/${txHash}`
}

// Function to get explorer URL for an address
export function getExplorerAddressUrl(chainId: number, address: string): string {
  const baseUrl = chainExplorerMap[chainId] || chainExplorerMap[mainnet.id]
  
  // Solana has a different URL structure
  if (chainId === SOLANA_CHAIN_ID) {
    return `${baseUrl}/address/${address}`
  }
  
  // Tron has a different URL structure
  if (chainId === TRON_CHAIN_ID) {
    return `${baseUrl}/#/address/${address}`
  }
  
  // Default EVM-compatible chains
  return `${baseUrl}/address/${address}`
}
