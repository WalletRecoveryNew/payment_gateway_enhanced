/**
 * Test Environment Configuration
 * 
 * This file contains configuration for the test environment, including test API keys,
 * test wallets, and test networks. This allows developers to test the integration
 * without using real cryptocurrency.
 */

import { ChainId } from '../types';

/**
 * Test API Keys
 * These keys can be used for testing the API without creating a merchant account.
 * They are restricted to test networks only.
 */
export const TEST_API_KEYS = {
  // Read-only test API key
  readonly: 'pk_test_readonly_5f9d94b1c7613',
  
  // Full access test API key
  fullAccess: 'pk_test_full_7e3a21d8f5b92',
  
  // Webhook test API key
  webhook: 'pk_test_webhook_3c6f8a2d1e7b9'
};

/**
 * Test Merchant IDs
 * These merchant IDs are associated with the test API keys.
 */
export const TEST_MERCHANT_IDS = {
  default: 'mer_test_123456789',
  webhook: 'mer_test_webhook_123'
};

/**
 * Test Wallet Addresses
 * These wallets can be used for testing payments on test networks.
 * They are pre-funded with test tokens.
 */
export const TEST_WALLETS = {
  // Ethereum (Sepolia)
  ethereum: {
    address: '0x8f5b2b7E5Ce5CC57EE14F9d584Ae84EA6123FAe9',
    privateKey: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef', // Not a real private key
    mnemonic: 'test test test test test test test test test test test junk' // Not a real mnemonic
  },
  
  // Binance Smart Chain (Testnet)
  bsc: {
    address: '0x9e5C143f8d7C0B9e3d7c354BFd88D83BeA0D2772',
    privateKey: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef', // Not a real private key
    mnemonic: 'test test test test test test test test test test test junk' // Not a real mnemonic
  },
  
  // Polygon (Mumbai)
  polygon: {
    address: '0x7a3BC05F0386aAeF85F9D6B3C9f84e12B61F7e13',
    privateKey: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef', // Not a real private key
    mnemonic: 'test test test test test test test test test test test junk' // Not a real mnemonic
  },
  
  // Solana (Devnet)
  solana: {
    address: '5YNmS1R9nNSCDzb5a7mMJ1dwK9uHeAAF4CmPEwKgVWr8',
    privateKey: 'base58private_key_not_real', // Not a real private key
    mnemonic: 'test test test test test test test test test test test junk' // Not a real mnemonic
  }
};

/**
 * Test Networks
 * These are the test networks supported by the payment gateway.
 */
export const TEST_NETWORKS = {
  // Ethereum Sepolia
  [ChainId.ETHEREUM_SEPOLIA]: {
    name: 'Ethereum Sepolia',
    chainId: ChainId.ETHEREUM_SEPOLIA,
    rpcUrl: 'https://rpc.sepolia.org',
    blockExplorer: 'https://sepolia.etherscan.io',
    nativeCurrency: {
      name: 'Sepolia Ether',
      symbol: 'ETH',
      decimals: 18
    }
  },
  
  // Binance Smart Chain Testnet
  [ChainId.BSC_TESTNET]: {
    name: 'BSC Testnet',
    chainId: ChainId.BSC_TESTNET,
    rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545',
    blockExplorer: 'https://testnet.bscscan.com',
    nativeCurrency: {
      name: 'Binance Coin',
      symbol: 'BNB',
      decimals: 18
    }
  },
  
  // Polygon Mumbai
  [ChainId.POLYGON_MUMBAI]: {
    name: 'Polygon Mumbai',
    chainId: ChainId.POLYGON_MUMBAI,
    rpcUrl: 'https://rpc-mumbai.maticvigil.com',
    blockExplorer: 'https://mumbai.polygonscan.com',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18
    }
  },
  
  // Solana Devnet
  [ChainId.SOLANA_DEVNET]: {
    name: 'Solana Devnet',
    chainId: ChainId.SOLANA_DEVNET,
    rpcUrl: 'https://api.devnet.solana.com',
    blockExplorer: 'https://explorer.solana.com/?cluster=devnet',
    nativeCurrency: {
      name: 'SOL',
      symbol: 'SOL',
      decimals: 9
    }
  }
};

/**
 * Test Tokens
 * These are the test tokens available on test networks.
 */
export const TEST_TOKENS = {
  // Ethereum Sepolia
  [ChainId.ETHEREUM_SEPOLIA]: [
    {
      name: 'Test USDT',
      symbol: 'USDT',
      decimals: 6,
      address: '0x7169D38820dfd117C3FA1f22a697dBA58d90BA06' // Example address
    },
    {
      name: 'Test USDC',
      symbol: 'USDC',
      decimals: 6,
      address: '0x8267cF9254734C6Eb452a7bb9AAF97B392258b21' // Example address
    }
  ],
  
  // Binance Smart Chain Testnet
  [ChainId.BSC_TESTNET]: [
    {
      name: 'Test BUSD',
      symbol: 'BUSD',
      decimals: 18,
      address: '0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee' // Example address
    },
    {
      name: 'Test USDT',
      symbol: 'USDT',
      decimals: 18,
      address: '0x337610d27c682E347C9cD60BD4b3b107C9d34dDd' // Example address
    }
  ],
  
  // Polygon Mumbai
  [ChainId.POLYGON_MUMBAI]: [
    {
      name: 'Test USDT',
      symbol: 'USDT',
      decimals: 6,
      address: '0x3813e82e6f7098b9583FC0F33a962D02018B6803' // Example address
    },
    {
      name: 'Test USDC',
      symbol: 'USDC',
      decimals: 6,
      address: '0x2058A9D7613eEE744279e3856Ef0eAda5FCbaA7e' // Example address
    }
  ],
  
  // Solana Devnet
  [ChainId.SOLANA_DEVNET]: [
    {
      name: 'Test USDC',
      symbol: 'USDC',
      decimals: 6,
      address: 'Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr' // Example address
    }
  ]
};

/**
 * Test Webhook Endpoints
 * These are webhook endpoints that can be used for testing.
 */
export const TEST_WEBHOOK_ENDPOINTS = {
  // Webhook.site endpoint (for debugging)
  debug: 'https://webhook.site/your-unique-id',
  
  // Example endpoints
  success: 'https://example.com/webhooks/success',
  failure: 'https://example.com/webhooks/failure'
};

/**
 * Test Webhook Secret
 * This is a secret used for signing webhook payloads.
 */
export const TEST_WEBHOOK_SECRET = 'whsec_test_12345678901234567890';

/**
 * Check if an API key is a test key
 * 
 * @param apiKey - API key to check
 * @returns Whether the API key is a test key
 */
export function isTestApiKey(apiKey: string): boolean {
  return apiKey.startsWith('pk_test_');
}

/**
 * Check if a wallet address is a test wallet
 * 
 * @param address - Wallet address to check
 * @returns Whether the wallet address is a test wallet
 */
export function isTestWallet(address: string): boolean {
  return Object.values(TEST_WALLETS).some(wallet => 
    wallet.address.toLowerCase() === address.toLowerCase()
  );
}

/**
 * Get test faucet URL for a specific chain
 * 
 * @param chainId - Chain ID
 * @returns Faucet URL for the chain
 */
export function getTestFaucetUrl(chainId: ChainId): string {
  switch (chainId) {
    case ChainId.ETHEREUM_SEPOLIA:
      return 'https://sepoliafaucet.com/';
    case ChainId.BSC_TESTNET:
      return 'https://testnet.binance.org/faucet-smart';
    case ChainId.POLYGON_MUMBAI:
      return 'https://faucet.polygon.technology/';
    case ChainId.SOLANA_DEVNET:
      return 'https://solfaucet.com/';
    default:
      return '';
  }
}
