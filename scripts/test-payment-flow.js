/**
 * Test Payment Flow Script
 * 
 * This script demonstrates how to use the CryptoFlow Payment Gateway test environment
 * to create and process test payments, and receive webhook notifications.
 * 
 * Usage:
 * node test-payment-flow.js
 */

// Mock implementation of the CryptoFlow SDK for demonstration purposes
class CryptoFlow {
  constructor(apiKey, options = {}) {
    this.apiKey = apiKey;
    this.options = {
      apiUrl: 'https://api.cryptoflow.com/v1',
      debug: false,
      ...options
    };
    
    this.log('Initialized CryptoFlow SDK with API key:', apiKey);
  }
  
  async createPayment(paymentData) {
    this.log('Creating test payment:', paymentData);
    
    // Validate required fields
    if (!paymentData.amount) throw new Error('Amount is required');
    if (!paymentData.currency) throw new Error('Currency is required');
    if (!paymentData.chainId) throw new Error('Chain ID is required');
    
    // Simulate API call
    await this.simulateApiCall();
    
    // Generate a payment ID
    const paymentId = 'pay_test_' + Math.random().toString(36).substring(2, 15);
    
    // Create payment response
    const payment = {
      id: paymentId,
      amount: paymentData.amount,
      currency: paymentData.currency,
      chainId: paymentData.chainId,
      description: paymentData.description || '',
      status: 'PENDING',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      paymentUrl: `https://cryptoflow.com/payment/${paymentId}`
    };
    
    this.log('Payment created:', payment);
    return payment;
  }
  
  async getPayment(paymentId) {
    this.log('Getting payment:', paymentId);
    
    // Simulate API call
    await this.simulateApiCall();
    
    // Create payment response
    const payment = {
      id: paymentId,
      amount: '0.1',
      currency: 'ETH',
      chainId: 11155111,
      description: 'Test payment',
      status: 'PENDING',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    this.log('Payment retrieved:', payment);
    return payment;
  }
  
  async createWebhook(webhookData) {
    this.log('Creating test webhook:', webhookData);
    
    // Validate required fields
    if (!webhookData.url) throw new Error('URL is required');
    if (!webhookData.events || !webhookData.events.length) throw new Error('Events are required');
    
    // Simulate API call
    await this.simulateApiCall();
    
    // Generate a webhook ID and secret
    const webhookId = 'wh_test_' + Math.random().toString(36).substring(2, 15);
    const webhookSecret = 'whsec_test_' + Math.random().toString(36).substring(2, 15);
    
    // Create webhook response
    const webhook = {
      id: webhookId,
      url: webhookData.url,
      events: webhookData.events,
      secret: webhookSecret,
      isActive: webhookData.isActive !== false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    this.log('Webhook created:', webhook);
    return webhook;
  }
  
  async createTransaction(transactionData) {
    this.log('Creating test transaction:', transactionData);
    
    // Validate required fields
    if (!transactionData.paymentId) throw new Error('Payment ID is required');
    
    // Simulate API call
    await this.simulateApiCall();
    
    // Generate a transaction ID
    const transactionId = 'tx_test_' + Math.random().toString(36).substring(2, 15);
    
    // Create transaction response
    const transaction = {
      id: transactionId,
      paymentId: transactionData.paymentId,
      amount: transactionData.amount || '0.1',
      currency: transactionData.currency || 'ETH',
      chainId: transactionData.chainId || 11155111,
      fromAddress: transactionData.fromAddress || '0x1234567890abcdef1234567890abcdef12345678',
      toAddress: transactionData.toAddress || '0x8f5b2b7E5Ce5CC57EE14F9d584Ae84EA6123FAe9',
      status: 'PENDING',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    this.log('Transaction created:', transaction);
    
    // Simulate transaction processing
    this.simulateTransactionProcessing(transaction);
    
    return transaction;
  }
  
  async simulateApiCall() {
    // Simulate network latency (100-300ms)
    const delay = Math.floor(Math.random() * 200) + 100;
    await new Promise(resolve => setTimeout(resolve, delay));
  }
  
  async simulateTransactionProcessing(transaction) {
    this.log('Simulating transaction processing for:', transaction.id);
    
    // Simulate processing delay (2-5 seconds)
    const delay = Math.floor(Math.random() * 3000) + 2000;
    
    setTimeout(() => {
      // 90% chance of success
      const success = Math.random() < 0.9;
      
      if (success) {
        transaction.status = 'COMPLETED';
        transaction.txHash = '0x' + Math.random().toString(16).substring(2, 66);
        this.log('Transaction completed:', transaction);
        
        // Simulate webhook notification
        this.simulateWebhookNotification('payment.completed', {
          id: transaction.paymentId,
          status: 'COMPLETED',
          txHash: transaction.txHash,
          amount: transaction.amount,
          currency: transaction.currency,
          chainId: transaction.chainId,
          updatedAt: new Date().toISOString()
        });
      } else {
        transaction.status = 'FAILED';
        this.log('Transaction failed:', transaction);
        
        // Simulate webhook notification
        this.simulateWebhookNotification('payment.failed', {
          id: transaction.paymentId,
          status: 'FAILED',
          amount: transaction.amount,
          currency: transaction.currency,
          chainId: transaction.chainId,
          updatedAt: new Date().toISOString()
        });
      }
    }, delay);
  }
  
  simulateWebhookNotification(eventType, paymentData) {
    this.log('Simulating webhook notification:', eventType);
    
    const webhookPayload = {
      id: 'evt_' + Math.random().toString(36).substring(2, 15),
      type: eventType,
      created: new Date().toISOString(),
      data: paymentData
    };
    
    this.log('Webhook payload:', webhookPayload);
    
    // In a real implementation, this would send an HTTP request to the webhook URL
    console.log('\n=== WEBHOOK NOTIFICATION ===');
    console.log(`Event: ${eventType}`);
    console.log(`Timestamp: ${webhookPayload.created}`);
    console.log(`Payment ID: ${paymentData.id}`);
    console.log(`Status: ${paymentData.status}`);
    if (paymentData.txHash) {
      console.log(`Transaction Hash: ${paymentData.txHash}`);
    }
    console.log('=============================\n');
  }
  
  log(message, data) {
    if (!this.options.debug) return;
    
    if (data) {
      console.log(`[CryptoFlow] ${message}`, data);
    } else {
      console.log(`[CryptoFlow] ${message}`);
    }
  }
}

// Run the test payment flow
async function runTestPaymentFlow() {
  console.log('=== CryptoFlow Payment Gateway Test Payment Flow ===\n');
  
  // Initialize the SDK with a test API key
  const cryptoflow = new CryptoFlow('pk_test_full_7e3a21d8f5b92', { debug: true });
  
  try {
    // Step 1: Create a webhook to receive notifications
    console.log('Step 1: Creating a webhook...');
    const webhook = await cryptoflow.createWebhook({
      url: 'https://webhook.site/your-unique-id', // Replace with your webhook URL
      events: ['payment.created', 'payment.completed', 'payment.failed'],
      isActive: true
    });
    console.log('Webhook created successfully. Secret:', webhook.secret);
    console.log('Store this secret securely to verify webhook signatures.\n');
    
    // Step 2: Create a payment
    console.log('Step 2: Creating a payment...');
    const payment = await cryptoflow.createPayment({
      amount: '0.1',
      currency: 'ETH',
      chainId: 11155111, // Ethereum Sepolia
      description: 'Test payment'
    });
    console.log('Payment created successfully. ID:', payment.id);
    console.log('Payment URL:', payment.paymentUrl);
    console.log('Status:', payment.status, '\n');
    
    // Step 3: Create a transaction for the payment
    console.log('Step 3: Creating a transaction...');
    const transaction = await cryptoflow.createTransaction({
      paymentId: payment.id,
      amount: payment.amount,
      currency: payment.currency,
      chainId: payment.chainId
    });
    console.log('Transaction created successfully. ID:', transaction.id);
    console.log('Status:', transaction.status);
    console.log('The transaction will be processed automatically...\n');
    
    // Step 4: Wait for the transaction to be processed
    console.log('Step 4: Waiting for transaction processing...');
    console.log('Check the webhook notifications for updates...\n');
    
    // In a real implementation, you would verify the webhook signature
    console.log('To verify webhook signatures, use the following code:');
    console.log(`
const crypto = require('crypto');

function verifyWebhookSignature(payload, signature, timestamp, secret) {
  const hmac = crypto.createHmac('sha256', secret);
  const data = timestamp + '.' + JSON.stringify(payload);
  const expectedSignature = hmac.update(data).digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}
    `);
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Run the test payment flow
runTestPaymentFlow();
