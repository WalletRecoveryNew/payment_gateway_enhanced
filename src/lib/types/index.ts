/**
 * Common types used throughout the application
 */

/**
 * Chain IDs for supported blockchain networks
 */
export enum ChainId {
  // Mainnets
  ETHEREUM = 1,
  BSC = 56,
  POLYGON = 137,
  AVALANCHE = 43114,
  ARBITRUM = 42161,
  OPTIMISM = 10,
  SOLANA = 501,
  
  // Testnets
  ETHEREUM_GOERLI = 5,
  ETHEREUM_SEPOLIA = 11155111,
  BSC_TESTNET = 97,
  POLYGON_MUMBAI = 80001,
  AVALANCHE_FUJI = 43113,
  ARBITRUM_GOERLI = 421613,
  OPTIMISM_GOERLI = 420,
  SOLANA_DEVNET = 502,
  SOLANA_TESTNET = 503
}

/**
 * Payment status
 */
export enum PaymentStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  EXPIRED = 'EXPIRED',
  CANCELLED = 'CANCELLED'
}

/**
 * Transaction status
 */
export enum TransactionStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED'
}

/**
 * Webhook event types
 */
export enum WebhookEventType {
  PAYMENT_CREATED = 'payment.created',
  PAYMENT_PROCESSING = 'payment.processing',
  PAYMENT_COMPLETED = 'payment.completed',
  PAYMENT_FAILED = 'payment.failed',
  PAYMENT_EXPIRED = 'payment.expired',
  PAYMENT_CANCELLED = 'payment.cancelled'
}

/**
 * Currency type
 */
export interface Currency {
  name: string;
  symbol: string;
  decimals: number;
}

/**
 * Token information
 */
export interface Token extends Currency {
  address: string;
  chainId: ChainId;
}

/**
 * Network information
 */
export interface Network {
  name: string;
  chainId: ChainId;
  rpcUrl: string;
  blockExplorer: string;
  nativeCurrency: Currency;
}

/**
 * Wallet information
 */
export interface Wallet {
  id: string;
  name: string;
  address: string;
  chainId: ChainId;
  currency: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Payment information
 */
export interface Payment {
  id: string;
  amount: string;
  currency: string;
  chainId: ChainId;
  description?: string;
  status: PaymentStatus;
  txHash?: string;
  redirectUrl?: string;
  cancelUrl?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Transaction information
 */
export interface Transaction {
  id: string;
  paymentId: string;
  amount: string;
  currency: string;
  chainId: ChainId;
  fromAddress: string;
  toAddress: string;
  txHash?: string;
  status: TransactionStatus;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Webhook information
 */
export interface Webhook {
  id: string;
  url: string;
  events: string[];
  secret: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Webhook event payload
 */
export interface WebhookPayload {
  id: string;
  type: WebhookEventType;
  created: string;
  data: Payment | Transaction;
}

/**
 * API key information
 */
export interface ApiKey {
  id: string;
  key: string;
  name: string;
  isTest: boolean;
  permissions: string[];
  createdAt: Date;
  expiresAt?: Date;
}
