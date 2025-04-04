/**
 * Test Data Provider
 * 
 * This module provides mock data for testing the payment gateway.
 * It generates realistic test data for payments, transactions, wallets, etc.
 */

import { v4 as uuidv4 } from 'uuid';
import { 
  ChainId, 
  Payment, 
  PaymentStatus, 
  Transaction, 
  TransactionStatus, 
  Wallet, 
  Webhook 
} from '../types';
import { TEST_NETWORKS, TEST_TOKENS } from '../config/test-environment';

/**
 * Generate a unique ID with a prefix
 * 
 * @param prefix - ID prefix
 * @returns Unique ID
 */
export function generateId(prefix: string): string {
  const uniquePart = uuidv4().replace(/-/g, '').substring(0, 16);
  return `${prefix}_${uniquePart}`;
}

/**
 * Generate a test payment
 * 
 * @param overrides - Payment data overrides
 * @returns Test payment
 */
export function generateTestPayment(overrides: Partial<Payment> = {}): Payment {
  const now = new Date();
  const chainId = overrides.chainId || ChainId.ETHEREUM_SEPOLIA;
  
  return {
    id: generateId('pay'),
    amount: overrides.amount || '0.1',
    currency: overrides.currency || 'ETH',
    chainId,
    description: overrides.description || 'Test payment',
    status: overrides.status || PaymentStatus.PENDING,
    txHash: overrides.txHash,
    redirectUrl: overrides.redirectUrl,
    cancelUrl: overrides.cancelUrl,
    metadata: overrides.metadata || {},
    createdAt: overrides.createdAt || now,
    updatedAt: overrides.updatedAt || now,
  };
}

/**
 * Generate a test transaction
 * 
 * @param paymentId - Payment ID
 * @param overrides - Transaction data overrides
 * @returns Test transaction
 */
export function generateTestTransaction(
  paymentId: string,
  overrides: Partial<Transaction> = {}
): Transaction {
  const now = new Date();
  const chainId = overrides.chainId || ChainId.ETHEREUM_SEPOLIA;
  
  return {
    id: generateId('tx'),
    paymentId,
    amount: overrides.amount || '0.1',
    currency: overrides.currency || 'ETH',
    chainId,
    fromAddress: overrides.fromAddress || '0x1234567890abcdef1234567890abcdef12345678',
    toAddress: overrides.toAddress || '0x8f5b2b7E5Ce5CC57EE14F9d584Ae84EA6123FAe9',
    txHash: overrides.txHash,
    status: overrides.status || TransactionStatus.PENDING,
    createdAt: overrides.createdAt || now,
    updatedAt: overrides.updatedAt || now,
  };
}

/**
 * Generate a test wallet
 * 
 * @param overrides - Wallet data overrides
 * @returns Test wallet
 */
export function generateTestWallet(overrides: Partial<Wallet> = {}): Wallet {
  const now = new Date();
  const chainId = overrides.chainId || ChainId.ETHEREUM_SEPOLIA;
  
  return {
    id: overrides.id || generateId('wal'),
    name: overrides.name || 'Test Wallet',
    address: overrides.address || '0x8f5b2b7E5Ce5CC57EE14F9d584Ae84EA6123FAe9',
    chainId,
    currency: overrides.currency || 'ETH',
    isActive: overrides.isActive !== undefined ? overrides.isActive : true,
    createdAt: overrides.createdAt || now,
    updatedAt: overrides.updatedAt || now,
  };
}

/**
 * Generate a test webhook
 * 
 * @param overrides - Webhook data overrides
 * @returns Test webhook
 */
export function generateTestWebhook(overrides: Partial<Webhook> = {}): Webhook {
  const now = new Date();
  
  return {
    id: overrides.id || generateId('wh'),
    url: overrides.url || 'https://example.com/webhooks/crypto',
    events: overrides.events || ['payment.created', 'payment.completed', 'payment.failed'],
    secret: overrides.secret || 'whsec_test_' + uuidv4().replace(/-/g, ''),
    isActive: overrides.isActive !== undefined ? overrides.isActive : true,
    createdAt: overrides.createdAt || now,
    updatedAt: overrides.updatedAt || now,
  };
}

/**
 * Generate a test API key
 * 
 * @param isTest - Whether the API key is a test key
 * @returns Test API key
 */
export function generateTestApiKey(isTest: boolean = true): string {
  const prefix = isTest ? 'pk_test_' : 'pk_live_';
  return prefix + uuidv4().replace(/-/g, '').substring(0, 16);
}

/**
 * Generate a test webhook signature
 * 
 * @param payload - Webhook payload
 * @param timestamp - Timestamp
 * @param secret - Webhook secret
 * @returns Test webhook signature
 */
export function generateTestWebhookSignature(
  payload: any,
  timestamp: string,
  secret: string
): string {
  // In a real implementation, this would use crypto.createHmac
  // For testing purposes, we'll just return a mock signature
  return 'mock_signature_' + uuidv4().replace(/-/g, '');
}

/**
 * Get test networks
 * 
 * @returns Test networks
 */
export function getTestNetworks() {
  return TEST_NETWORKS;
}

/**
 * Get test tokens for a specific chain
 * 
 * @param chainId - Chain ID
 * @returns Test tokens
 */
export function getTestTokens(chainId: ChainId) {
  return TEST_TOKENS[chainId] || [];
}

/**
 * Simulate a test payment flow
 * 
 * @param paymentData - Payment data
 * @param simulateSuccess - Whether to simulate a successful payment
 * @returns Simulated payment and transaction
 */
export async function simulateTestPaymentFlow(
  paymentData: Partial<Payment>,
  simulateSuccess: boolean = true
): Promise<{ payment: Payment; transaction: Transaction }> {
  // Create initial payment
  const payment = generateTestPayment({
    ...paymentData,
    status: PaymentStatus.PENDING
  });
  
  // Create initial transaction
  const transaction = generateTestTransaction(payment.id, {
    amount: payment.amount,
    currency: payment.currency,
    chainId: payment.chainId,
    status: TransactionStatus.PENDING
  });
  
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Update payment and transaction status
  if (simulateSuccess) {
    payment.status = PaymentStatus.COMPLETED;
    transaction.status = TransactionStatus.COMPLETED;
    transaction.txHash = '0x' + uuidv4().replace(/-/g, '');
    payment.txHash = transaction.txHash;
  } else {
    payment.status = PaymentStatus.FAILED;
    transaction.status = TransactionStatus.FAILED;
  }
  
  payment.updatedAt = new Date();
  transaction.updatedAt = new Date();
  
  return { payment, transaction };
}
