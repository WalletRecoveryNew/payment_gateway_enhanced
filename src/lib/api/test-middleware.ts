/**
 * Test API Middleware
 * 
 * This middleware handles test API keys and test environments.
 * It allows developers to test the API without using real cryptocurrency.
 */

import { NextRequest, NextResponse } from 'next/server';
import { isTestApiKey, TEST_API_KEYS, TEST_MERCHANT_IDS } from '../config/test-environment';
import { ChainId } from '../types';

/**
 * Test API middleware
 * 
 * @param req - Next.js request
 * @returns Next.js response or undefined to continue
 */
export async function testApiMiddleware(req: NextRequest): Promise<NextResponse | undefined> {
  // Get API key from Authorization header
  const authHeader = req.headers.get('Authorization');
  if (!authHeader) {
    return undefined; // No API key, let the main middleware handle it
  }
  
  const apiKey = authHeader.replace('Bearer ', '');
  
  // Check if this is a test API key
  if (!isTestApiKey(apiKey)) {
    return undefined; // Not a test API key, let the main middleware handle it
  }
  
  // Validate the test API key
  if (!Object.values(TEST_API_KEYS).includes(apiKey)) {
    return NextResponse.json(
      { error: 'Invalid test API key' },
      { status: 401 }
    );
  }
  
  // Add test merchant ID to request headers
  const merchantId = apiKey === TEST_API_KEYS.webhook
    ? TEST_MERCHANT_IDS.webhook
    : TEST_MERCHANT_IDS.default;
  
  // Clone the request and add the test merchant ID
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('X-Test-Mode', 'true');
  requestHeaders.set('X-Merchant-ID', merchantId);
  
  // Create a new request with the modified headers
  const newRequest = new NextRequest(req.url, {
    method: req.method,
    headers: requestHeaders,
    body: req.body,
    redirect: req.redirect,
    signal: req.signal,
  });
  
  return undefined; // Continue to the next middleware with the modified request
}

/**
 * Validate test chain ID
 * 
 * @param chainId - Chain ID to validate
 * @returns Whether the chain ID is valid for testing
 */
export function isValidTestChainId(chainId: number): boolean {
  const testChainIds = [
    ChainId.ETHEREUM_GOERLI,
    ChainId.ETHEREUM_SEPOLIA,
    ChainId.BSC_TESTNET,
    ChainId.POLYGON_MUMBAI,
    ChainId.AVALANCHE_FUJI,
    ChainId.ARBITRUM_GOERLI,
    ChainId.OPTIMISM_GOERLI,
    ChainId.SOLANA_DEVNET,
    ChainId.SOLANA_TESTNET
  ];
  
  return testChainIds.includes(chainId);
}

/**
 * Validate test payment request
 * 
 * @param body - Payment request body
 * @returns Error message or undefined if valid
 */
export function validateTestPaymentRequest(body: any): string | undefined {
  // Check if chain ID is valid for testing
  if (!isValidTestChainId(body.chainId)) {
    return `Chain ID ${body.chainId} is not supported in test mode. Please use a test network.`;
  }
  
  // Add more validation as needed
  
  return undefined; // Valid request
}

/**
 * Get test merchant data
 * 
 * @param merchantId - Merchant ID
 * @returns Test merchant data
 */
export function getTestMerchantData(merchantId: string) {
  // Return mock merchant data for testing
  return {
    id: merchantId,
    name: merchantId === TEST_MERCHANT_IDS.webhook ? 'Test Webhook Merchant' : 'Test Merchant',
    email: merchantId === TEST_MERCHANT_IDS.webhook ? 'webhook@example.com' : 'test@example.com',
    createdAt: new Date(),
    updatedAt: new Date(),
    isTest: true
  };
}

/**
 * Get test wallet data
 * 
 * @param merchantId - Merchant ID
 * @returns Test wallet data
 */
export function getTestWalletData(merchantId: string) {
  // Return mock wallet data for testing
  return [
    {
      id: 'wal_test_eth_1',
      name: 'Test ETH Wallet',
      address: '0x8f5b2b7E5Ce5CC57EE14F9d584Ae84EA6123FAe9',
      chainId: ChainId.ETHEREUM_SEPOLIA,
      currency: 'ETH',
      merchantId,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'wal_test_bsc_1',
      name: 'Test BSC Wallet',
      address: '0x9e5C143f8d7C0B9e3d7c354BFd88D83BeA0D2772',
      chainId: ChainId.BSC_TESTNET,
      currency: 'BNB',
      merchantId,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'wal_test_polygon_1',
      name: 'Test Polygon Wallet',
      address: '0x7a3BC05F0386aAeF85F9D6B3C9f84e12B61F7e13',
      chainId: ChainId.POLYGON_MUMBAI,
      currency: 'MATIC',
      merchantId,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'wal_test_sol_1',
      name: 'Test Solana Wallet',
      address: '5YNmS1R9nNSCDzb5a7mMJ1dwK9uHeAAF4CmPEwKgVWr8',
      chainId: ChainId.SOLANA_DEVNET,
      currency: 'SOL',
      merchantId,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];
}

/**
 * Get test webhook data
 * 
 * @param merchantId - Merchant ID
 * @returns Test webhook data
 */
export function getTestWebhookData(merchantId: string) {
  // Return mock webhook data for testing
  return [
    {
      id: 'wh_test_1',
      url: 'https://example.com/webhooks/crypto',
      events: ['payment.created', 'payment.completed', 'payment.failed'],
      secret: 'whsec_test_12345678901234567890',
      merchantId,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];
}
