/**
 * Example implementation of webhook signature verification for CryptoFlow Payment Gateway
 * 
 * This example shows how to verify webhook signatures in an Express.js application.
 * The same principles apply to other frameworks and languages.
 */

const express = require('express');
const crypto = require('crypto');
const app = express();

// Parse JSON request bodies
app.use(express.json());

/**
 * Verify a webhook signature
 * 
 * @param {Object} payload - The webhook payload
 * @param {string} signature - The signature from the X-Webhook-Signature header
 * @param {string} timestamp - The timestamp from the X-Webhook-Timestamp header
 * @param {string} secret - Your webhook secret
 * @returns {boolean} - Whether the signature is valid
 */
function verifyWebhookSignature(payload, signature, timestamp, secret) {
  try {
    const hmac = crypto.createHmac('sha256', secret);
    const data = timestamp + '.' + JSON.stringify(payload);
    const expectedSignature = hmac.update(data).digest('hex');
    
    // Use timing-safe comparison to prevent timing attacks
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  } catch (error) {
    console.error('Error verifying webhook signature:', error);
    return false;
  }
}

// Webhook endpoint
app.post('/webhooks/crypto', (req, res) => {
  const payload = req.body;
  const signature = req.headers['x-webhook-signature'];
  const timestamp = req.headers['x-webhook-timestamp'];
  
  // Your webhook secret from the CryptoFlow dashboard
  const secret = 'YOUR_WEBHOOK_SECRET';
  
  // Verify the signature
  if (!signature || !timestamp || !verifyWebhookSignature(payload, signature, timestamp, secret)) {
    console.error('Invalid webhook signature');
    return res.status(401).send('Invalid signature');
  }
  
  // Process the webhook based on the event type
  const { type, data } = payload;
  
  switch (type) {
    case 'payment.completed':
      console.log(`Payment ${data.id} completed`);
      // Update order status, send confirmation email, etc.
      break;
      
    case 'payment.failed':
      console.log(`Payment ${data.id} failed`);
      // Notify customer, update order status, etc.
      break;
      
    case 'payment.processing':
      console.log(`Payment ${data.id} is processing`);
      // Update order status to processing
      break;
      
    default:
      console.log(`Received webhook event: ${type}`);
  }
  
  // Always respond with 200 OK to acknowledge receipt
  res.status(200).send('Webhook received');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Webhook server listening on port ${PORT}`);
});

/**
 * Example webhook payload:
 * 
 * {
 *   "id": "evt_123456789",
 *   "type": "payment.completed",
 *   "created": "2025-04-04T12:34:56Z",
 *   "data": {
 *     "id": "tx_abcdef123456",
 *     "status": "COMPLETED",
 *     "amount": "0.5",
 *     "currency": "ETH",
 *     "chainId": 1,
 *     "txHash": "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
 *   }
 * }
 */
