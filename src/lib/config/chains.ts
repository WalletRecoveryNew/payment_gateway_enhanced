// Define chain IDs for networks
export const TRON_CHAIN_ID = 728126428
export const SOLANA_CHAIN_ID = 501
export const ETHEREUM_MAINNET_CHAIN_ID = 1

// Export all supported chains
export const supportedChains = [
  ETHEREUM_MAINNET_CHAIN_ID,
  SOLANA_CHAIN_ID,
  // Custom chains will be handled separately
]

// Chain name mapping for display and reference
export const chainNameMap: Record<number, string> = {
  [ETHEREUM_MAINNET_CHAIN_ID]: 'Ethereum',
  [TRON_CHAIN_ID]: 'Tron',
  [SOLANA_CHAIN_ID]: 'Solana',
}

// Chain currency mapping
export const chainCurrencyMap: Record<number, string> = {
  [ETHEREUM_MAINNET_CHAIN_ID]: 'ETH',
  [TRON_CHAIN_ID]: 'TRX',
  [SOLANA_CHAIN_ID]: 'SOL',
}

// Chain explorer URL mapping
export const chainExplorerMap: Record<number, string> = {
  [ETHEREUM_MAINNET_CHAIN_ID]: 'https://etherscan.io',
  [TRON_CHAIN_ID]: 'https://tronscan.org',
  [SOLANA_CHAIN_ID]: 'https://explorer.solana.com',
}

// Chain configuration
export const chains = [
  {
    id: ETHEREUM_MAINNET_CHAIN_ID,
    name: 'Ethereum Mainnet',
    network: 'mainnet',
    nativeCurrency: {
      decimals: 18,
      name: 'Ether',
      symbol: 'ETH',
    },
    rpcUrls: {
      default: {
        http: ['https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
      },
    },
  },
  {
    id: SOLANA_CHAIN_ID,
    name: 'Solana Mainnet',
    network: 'mainnet',
    nativeCurrency: {
      decimals: 9,
      name: 'Solana',
      symbol: 'SOL',
    },
    rpcUrls: {
      default: {
        http: ['https://api.mainnet-beta.solana.com'],
      },
    },
  }
]

export function getExplorerTxUrl(chainId: number, txHash: string): string {
  const baseUrl = chainExplorerMap[chainId] || chainExplorerMap[ETHEREUM_MAINNET_CHAIN_ID]
  
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

export function getExplorerAddressUrl(chainId: number, address: string): string {
  const explorerBase = chainExplorerMap[chainId];
  if (!explorerBase) return '';

  switch (chainId) {
    case ETHEREUM_MAINNET_CHAIN_ID:
      return `${explorerBase}/address/${address}`;
    case TRON_CHAIN_ID:
      return `${explorerBase}/#/address/${address}`;
    case SOLANA_CHAIN_ID:
      return `${explorerBase}/address/${address}`;
    default:
      return '';
  }
}
