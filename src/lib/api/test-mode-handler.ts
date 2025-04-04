/**
 * Test Mode Handler
 * 
 * This module handles test mode operations for the payment gateway API.
 * It processes test payments, transactions, and webhooks without using real cryptocurrency.
 */

import { NextRequest, NextResponse } from 'next/server';
import { 
  Payment, 
  PaymentStatus, 
  Transaction, 
  TransactionStatus, 
  WebhookEventType 
} from '../types';
import { 
  generateTestPayment, 
  generateTestTransaction, 
  simulateTestPaymentFlow 
} from '../testing/test-data-provider';
import { getTestMerchantData, getTestWalletData, getTestWebhookData } from './test-middleware';
import { sendWebhookNotifications } from '../webhook/sender';

// In-memory storage for test data
const testPayments = new Map<string, Payment>();
const testTransactions = new Map<string, Transaction>();

/**
 * Check if request is in test mode
 * 
 * @param req - Next.js request
 * @returns Whether the request is in test mode
 */
export function isTestMode(req: NextRequest): boolean {
  return req.headers.get('X-Test-Mode') === 'true';
}

/**
 * Get merchant ID from request
 * 
 * @param req - Next.js request
 * @returns Merchant ID
 */
export function getMerchantId(req: NextRequest): string {
  return req.headers.get('X-Merchant-ID') || '';
}

/**
 * Handle test payment creation
 * 
 * @param req - Next.js request
 * @param body - Request body
 * @returns Next.js response
 */
export async function handleTestPaymentCreation(
  req: NextRequest,
  body: any
): Promise<NextResponse> {
  const merchantId = getMerchantId(req);
  
  // Generate a test payment
  const payment = generateTestPayment({
    amount: body.amount,
    currency: body.currency,
    chainId: body.chainId,
    description: body.description,
    redirectUrl: body.redirectUrl,
    cancelUrl: body.cancelUrl,
    metadata: body.metadata
  });
  
  // Store the payment
  testPayments.set(payment.id, payment);
  
  // Generate payment URL
  const host = req.headers.get('host') || 'localhost:3000';
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const paymentUrl = `${protocol}://${host}/payment/${payment.id}`;
  
  // Return the payment response
  return NextResponse.json({
    ...payment,
    paymentUrl
  });
}

/**
 * Handle test payment retrieval
 * 
 * @param req - Next.js request
 * @param paymentId - Payment ID
 * @returns Next.js response
 */
export async function handleTestPaymentRetrieval(
  req: NextRequest,
  paymentId: string
): Promise<NextResponse> {
  // Get the payment from storage
  const payment = testPayments.get(paymentId);
  
  if (!payment) {
    return NextResponse.json(
      { error: 'Payment not found' },
      { status: 404 }
    );
  }
  
  return NextResponse.json(payment);
}

/**
 * Handle test transaction creation
 * 
 * @param req - Next.js request
 * @param body - Request body
 * @returns Next.js response
 */
export async function handleTestTransactionCreation(
  req: NextRequest,
  body: any
): Promise<NextResponse> {
  const merchantId = getMerchantId(req);
  
  // Get the payment
  const payment = testPayments.get(body.paymentId);
  
  if (!payment) {
    return NextResponse.json(
      { error: 'Payment not found' },
      { status: 404 }
    );
  }
  
  // Generate a test transaction
  const transaction = generateTestTransaction(payment.id, {
    amount: body.amount || payment.amount,
    currency: body.currency || payment.currency,
    chainId: body.chainId || payment.chainId,
    fromAddress: body.fromAddress,
    toAddress: body.toAddress,
    status: TransactionStatus.PENDING
  });
  
  // Store the transaction
  testTransactions.set(transaction.id, transaction);
  
  // Update the payment status
  payment.status = PaymentStatus.PROCESSING;
  payment.updatedAt = new Date();
  testPayments.set(payment.id, payment);
  
  // Simulate payment processing
  simulatePaymentProcessing(payment, transaction, merchantId);
  
  return NextResponse.json(transaction);
}

/**
 * Handle test wallet operations
 * 
 * @param req - Next.js request
 * @returns Next.js response
 */
export async function handleTestWalletOperations(
  req: NextRequest
): Promise<NextResponse> {
  const merchantId = getMerchantId(req);
  
  // Get test wallets
  const wallets = getTestWalletData(merchantId);
  
  return NextResponse.json(wallets);
}

/**
 * Handle test webhook operations
 * 
 * @param req - Next.js request
 * @returns Next.js response
 */
export async function handleTestWebhookOperations(
  req: NextRequest
): Promise<NextResponse> {
  const merchantId = getMerchantId(req);
  
  // Get test webhooks
  const webhooks = getTestWebhookData(merchantId);
  
  return NextResponse.json(webhooks);
}

/**
 * Simulate payment processing
 * 
 * @param payment - Payment to process
 * @param transaction - Transaction to process
 * @param merchantId - Merchant ID
 */
async function simulatePaymentProcessing(
  payment: Payment,
  transaction: Transaction,
  merchantId: string
): Promise<void> {
  // Get webhooks
  const webhooks = getTestWebhookData(merchantId);
  
  // Send payment.processing webhook
  if (webhooks.length > 0) {
    await sendWebhookNotifications(
      webhooks.map(webhook => ({
        url: webhook.url,
        secret: webhook.secret,
        events: webhook.events as string[]
      })),
      WebhookEventType.PAYMENT_PROCESSING,
      { ...payment, status: PaymentStatus.PROCESSING }
    );
  }
  
  // Simulate processing delay (2-5 seconds)
  const delay = Math.floor(Math.random() * 3000) + 2000;
  
  setTimeout(async () => {
    // 90% chance of success
    const success = Math.random() < 0.9;
    
    if (success) {
      // Update transaction
      transaction.status = TransactionStatus.COMPLETED;
      transaction.txHash = '0x' + Math.random().toString(16).substring(2, 66);
      transaction.updatedAt = new Date();
      testTransactions.set(transaction.id, transaction);
      
      // Update payment
      payment.status = PaymentStatus.COMPLETED;
      payment.txHash = transaction.txHash;
      payment.updatedAt = new Date();
      testPayments.set(payment.id, payment);
      
      // Send payment.completed webhook
      if (webhooks.length > 0) {
        await sendWebhookNotifications(
          webhooks.map(webhook => ({
            url: webhook.url,
            secret: webhook.secret,
            events: webhook.events as string[]
          })),
          WebhookEventType.PAYMENT_COMPLETED,
          payment
        );
      }
    } else {
      // Update transaction
      transaction.status = TransactionStatus.FAILED;
      transaction.updatedAt = new Date();
      testTransactions.set(transaction.id, transaction);
      
      // Update payment
      payment.status = PaymentStatus.FAILED;
      payment.updatedAt = new Date();
      testPayments.set(payment.id, payment);
      
      // Send payment.failed webhook
      if (webhooks.length > 0) {
        await sendWebhookNotifications(
          webhooks.map(webhook => ({
            url: webhook.url,
            secret: webhook.secret,
            events: webhook.events as string[]
          })),
          WebhookEventType.PAYMENT_FAILED,
          payment
        );
      }
    }
  }, delay);
}
