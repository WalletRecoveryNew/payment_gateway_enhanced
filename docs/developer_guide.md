# CryptoFlow Payment Gateway - Developer Documentation

## Overview

This document provides technical information for developers integrating with the CryptoFlow payment gateway. It covers API endpoints, integration methods, webhook implementation, and best practices for development.

## Technology Stack

- **Frontend**: Next.js, React, TailwindCSS
- **Backend**: Next.js API routes
- **Database**: PostgreSQL with Prisma ORM
- **Blockchain Integration**: viem, wagmi, @solana/web3.js
- **Wallet Connectivity**: Web3Modal, WalletConnect, Solana Wallet Adapter

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- PostgreSQL database
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-org/cryptoflow.git
cd cryptoflow
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env.local` file with the following variables:
```
DATABASE_URL="postgresql://username:password@localhost:5432/cryptoflow"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

4. Run database migrations:
```bash
npx prisma migrate dev
```

5. Start the development server:
```bash
npm run dev
# or
yarn dev
```

## Architecture

### Project Structure

```
/src
  /app                 # Next.js app router
    /api               # API endpoints
    /dashboard         # Dashboard pages
    /payment           # Payment pages
  /components          # React components
  /lib                 # Utility functions and libraries
    /config            # Configuration files
    /db                # Database utilities
    /wallet            # Wallet integration
  /prisma              # Prisma schema and migrations
/public                # Static assets
```

### Database Schema

The database schema is defined in `prisma/schema.prisma` and includes the following models:

- **User**: User account information
- **Merchant**: Merchant account details
- **Wallet**: Cryptocurrency wallet addresses
- **Transaction**: Payment transaction records
- **ApiKey**: API keys for authentication
- **Webhook**: Webhook configuration

## API Reference

### Authentication

All API requests must include an API key in the Authorization header:

```
Authorization: Bearer YOUR_API_KEY
```

### Endpoints

#### Create Payment

```
POST /api/payments
```

Request body:
```json
{
  "amount": "0.1",
  "currency": "ETH",
  "chainId": 1,
  "description": "Payment for services",
  "redirectUrl": "https://example.com/success",
  "cancelUrl": "https://example.com/cancel"
}
```

Response:
```json
{
  "id": "pay_123456789",
  "amount": "0.1",
  "currency": "ETH",
  "chainId": 1,
  "description": "Payment for services",
  "status": "PENDING",
  "paymentUrl": "https://cryptoflow.com/payment/pay_123456789"
}
```

#### Get Payment

```
GET /api/payments/:id
```

Response:
```json
{
  "id": "pay_123456789",
  "amount": "0.1",
  "currency": "ETH",
  "chainId": 1,
  "description": "Payment for services",
  "status": "COMPLETED",
  "txHash": "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
  "createdAt": "2025-04-04T12:34:56Z",
  "updatedAt": "2025-04-04T12:45:67Z"
}
```

#### List Transactions

```
GET /api/transactions
```

Query parameters:
- `status`: Filter by status (PENDING, PROCESSING, COMPLETED, FAILED)
- `currency`: Filter by currency (ETH, BTC, USDT, USDC, SOL)
- `page`: Page number for pagination
- `limit`: Number of results per page

Response:
```json
{
  "data": [
    {
      "id": "tx_123456789",
      "amount": "0.1",
      "currency": "ETH",
      "chainId": 1,
      "status": "COMPLETED",
      "txHash": "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
      "createdAt": "2025-04-04T12:34:56Z"
    }
  ],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "pages": 10
  }
}
```

#### Create Wallet

```
POST /api/wallets
```

Request body:
```json
{
  "name": "Main ETH Wallet",
  "address": "0x1234567890abcdef1234567890abcdef12345678",
  "chainId": 1,
  "currency": "ETH"
}
```

Response:
```json
{
  "id": "wallet_123456789",
  "name": "Main ETH Wallet",
  "address": "0x1234567890abcdef1234567890abcdef12345678",
  "chainId": 1,
  "currency": "ETH",
  "isActive": true,
  "createdAt": "2025-04-04T12:34:56Z"
}
```

## Webhook Integration

### Setting Up Webhooks

To receive real-time notifications about payment events, configure a webhook URL in your dashboard or via the API:

```
POST /api/webhooks
```

Request body:
```json
{
  "url": "https://example.com/webhooks/crypto",
  "events": ["payment.created", "payment.completed", "payment.failed"],
  "isActive": true
}
```

### Webhook Payload

When an event occurs, we'll send a POST request to your webhook URL with the following payload:

```json
{
  "id": "evt_123456789",
  "type": "payment.completed",
  "created": "2025-04-04T12:34:56Z",
  "data": {
    "id": "tx_abcdef123456",
    "status": "COMPLETED",
    "amount": "0.5",
    "currency": "ETH",
    "chainId": 1,
    "txHash": "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
  }
}
```

### Verifying Webhook Signatures

To ensure the webhook request is coming from CryptoFlow, verify the signature:

```javascript
const crypto = require('crypto');

function verifyWebhook(payload, signature, timestamp, secret) {
  const hmac = crypto.createHmac('sha256', secret);
  const data = timestamp + '.' + JSON.stringify(payload);
  const expectedSignature = hmac.update(data).digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

// Express.js route handler
app.post('/webhooks/crypto', (req, res) => {
  const payload = req.body;
  const signature = req.headers['x-webhook-signature'];
  const timestamp = req.headers['x-webhook-timestamp'];
  const secret = 'YOUR_WEBHOOK_KEY';
  
  if (!verifyWebhook(payload, signature, timestamp, secret)) {
    return res.status(401).send('Invalid signature');
  }
  
  // Handle the webhook event
  console.log('Received valid webhook:', payload);
  res.status(200).send('Webhook received');
});
```

## JavaScript SDK and Payment Button Integration

### Overview

CryptoFlow provides a JavaScript SDK and a payment button for easy integration with your website or application.

### JavaScript SDK

Our JavaScript SDK allows you to create payments, display a payment modal, and handle payment events.

#### Installation

Add the SDK to your website:

```html
<script src="https://cdn.cryptoflow.com/js/cryptoflow-sdk.js"></script>
```

Or install via npm:

```bash
npm install cryptoflow-sdk
```

#### Basic Usage

```javascript
// Initialize the SDK with your API key
const cryptoflow = new CryptoFlow('YOUR_API_KEY');

// Create a payment
async function createPayment() {
  try {
    const payment = await cryptoflow.createPayment({
      amount: '0.1',
      currency: 'ETH',
      chainId: 1,
      description: 'Payment for services'
    });
    
    // Open the payment modal
    cryptoflow.openPaymentModal(payment.id);
    
    // Listen for payment events
    cryptoflow.on('payment.completed', (payment) => {
      console.log('Payment completed:', payment);
    });
  } catch (error) {
    console.error('Payment error:', error);
  }
}
```

### Payment Button

For an even simpler integration, you can use our payment button, which requires minimal code.

#### Basic Implementation

```html
<!-- Add the payment button script to your website -->
<script src="https://cdn.cryptoflow.com/js/payment-button.js"></script>

<!-- Add a payment button container with your configuration -->
<div id="crypto-payment-button" 
     data-api-key="YOUR_API_KEY"
     data-amount="0.05" 
     data-currency="ETH" 
     data-chain-id="1"
     data-description="Payment for services">
</div>
```

#### Customization

The payment button can be customized using data attributes:

```html
<div id="crypto-payment-button" 
     data-api-key="YOUR_API_KEY"
     data-amount="100" 
     data-currency="USDT" 
     data-chain-id="56"
     data-description="Premium subscription"
     data-button-text="Pay $100 USDT"
     data-button-theme="crypto"
     data-button-size="large"
     data-redirect-url="https://example.com/success"
     data-cancel-url="https://example.com/cancel">
</div>
```

## Frontend Integration

CryptoFlow provides multiple options for integrating payments into your website or application.

### Payment Button

Add a payment button to your website:

```html
<script src="https://cdn.cryptoflow.com/js/payment-button.js"></script>
<div id="crypto-payment-button" 
     data-amount="0.05" 
     data-currency="ETH" 
     data-description="Payment for services">
</div>
```

### Custom Integration

For more control, use our JavaScript SDK:

```javascript
import { CryptoFlow } from '@cryptoflow/sdk';

const cryptoflow = new CryptoFlow('YOUR_API_KEY');

// Create a payment
const payment = await cryptoflow.createPayment({
  amount: '0.1',
  currency: 'ETH',
  chainId: 1,
  description: 'Payment for services'
});

// Open the payment modal
cryptoflow.openPaymentModal(payment.id);

// Listen for payment events
cryptoflow.on('payment.completed', (payment) => {
  console.log('Payment completed:', payment);
});
```

## Testing

### Test Wallets

For testing, use the following test wallets:

- Ethereum (Goerli): `0xTestWallet1234567890abcdef1234567890abcdef`
- Polygon (Mumbai): `0xTestWallet1234567890abcdef1234567890abcdef`
- Solana (Devnet): `TestWalletSolana1234567890abcdef1234567890abcdef`

### Test API Keys

Use the following test API key for development:
```
pk_test_51Abc123DefGhi456JklMno789PqrStu
```

## Security Considerations

- **API Keys**: Store API keys securely and never expose them in client-side code
- **Webhook Verification**: Always verify webhook signatures to prevent spoofing
- **Input Validation**: Validate all user inputs to prevent injection attacks
- **HTTPS**: Always use HTTPS for API requests and webhook endpoints
- **Rate Limiting**: Implement rate limiting to prevent abuse

## Troubleshooting

### Common Errors

- **401 Unauthorized**: Invalid or missing API key
- **400 Bad Request**: Invalid request parameters
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server-side error

### Debugging

Enable debug mode in the SDK for detailed logging:

```javascript
const cryptoflow = new CryptoFlow('YOUR_API_KEY', { debug: true });
```

## Support

For technical support, contact our developer team:

- Email: dev-support@cryptoflow.com
- Developer Forum: https://developers.cryptoflow.com/forum
- GitHub Issues: https://github.com/cryptoflow/issues
