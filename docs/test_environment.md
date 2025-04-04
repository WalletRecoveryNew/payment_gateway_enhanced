# Test Environment Guide

This guide explains how to use the CryptoFlow Payment Gateway test environment for development and testing.

## Table of Contents

- [Overview](#overview)
- [Test API Keys](#test-api-keys)
- [Test Networks](#test-networks)
- [Test Wallets](#test-wallets)
- [Testing Payments](#testing-payments)
- [Testing Webhooks](#testing-webhooks)
- [Test Mode Limitations](#test-mode-limitations)
- [Going to Production](#going-to-production)

## Overview

The CryptoFlow Payment Gateway provides a comprehensive test environment that allows you to:

1. Test API integrations without using real cryptocurrency
2. Simulate payment flows on test networks
3. Test webhook notifications
4. Validate your integration before going to production

All test mode operations are clearly marked and isolated from production data.

## Test API Keys

To use the test environment, you need to use a test API key. Test API keys always start with `pk_test_`.

### Available Test API Keys

| API Key | Description | Permissions |
|---------|-------------|-------------|
| `pk_test_readonly_5f9d94b1c7613` | Read-only access | Read-only access to test data |
| `pk_test_full_7e3a21d8f5b92` | Full access | Full access to test data |
| `pk_test_webhook_3c6f8a2d1e7b9` | Webhook testing | Configured for webhook testing |

### Using Test API Keys

Include the test API key in your API requests:

```bash
curl -X POST https://api.cryptoflow.com/v1/payments \
  -H "Authorization: Bearer pk_test_full_7e3a21d8f5b92" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": "0.1",
    "currency": "ETH",
    "chainId": 11155111,
    "description": "Test payment"
  }'
```

## Test Networks

The test environment supports the following test networks:

| Network | Chain ID | Description |
|---------|----------|-------------|
| Ethereum Sepolia | 11155111 | Ethereum test network |
| BSC Testnet | 97 | Binance Smart Chain test network |
| Polygon Mumbai | 80001 | Polygon test network |
| Solana Devnet | 502 | Solana test network |

### Test Network Faucets

To get test tokens for development, use the following faucets:

- Ethereum Sepolia: [https://sepoliafaucet.com/](https://sepoliafaucet.com/)
- BSC Testnet: [https://testnet.binance.org/faucet-smart](https://testnet.binance.org/faucet-smart)
- Polygon Mumbai: [https://faucet.polygon.technology/](https://faucet.polygon.technology/)
- Solana Devnet: [https://solfaucet.com/](https://solfaucet.com/)

## Test Wallets

The test environment provides pre-configured test wallets for each supported network.

### Available Test Wallets

| Network | Address | Private Key |
|---------|---------|-------------|
| Ethereum Sepolia | `0x8f5b2b7E5Ce5CC57EE14F9d584Ae84EA6123FAe9` | Available in dashboard |
| BSC Testnet | `0x9e5C143f8d7C0B9e3d7c354BFd88D83BeA0D2772` | Available in dashboard |
| Polygon Mumbai | `0x7a3BC05F0386aAeF85F9D6B3C9f84e12B61F7e13` | Available in dashboard |
| Solana Devnet | `5YNmS1R9nNSCDzb5a7mMJ1dwK9uHeAAF4CmPEwKgVWr8` | Available in dashboard |

> **Note**: Never use these wallets for production or store real funds in them.

## Testing Payments

### Creating Test Payments

When using a test API key, all payments are automatically created in test mode. You must use a test network chain ID (e.g., Ethereum Sepolia - 11155111) when creating test payments.

```javascript
// Example using the JavaScript SDK
const cryptoflow = new CryptoFlow('pk_test_full_7e3a21d8f5b92');

const payment = await cryptoflow.createPayment({
  amount: '0.1',
  currency: 'ETH',
  chainId: 11155111, // Ethereum Sepolia
  description: 'Test payment'
});

console.log('Test payment created:', payment);
```

### Simulated Payment Flow

In test mode, payments follow a simulated flow:

1. Payment is created with `PENDING` status
2. When a transaction is created, the payment status changes to `PROCESSING`
3. After a short delay (2-5 seconds), the payment will either:
   - Complete successfully (90% chance) with `COMPLETED` status
   - Fail (10% chance) with `FAILED` status

This simulation allows you to test both successful and failed payment scenarios.

## Testing Webhooks

### Configuring Test Webhooks

You can configure webhooks in test mode to receive notifications about test payments:

```javascript
// Example using the JavaScript SDK
const cryptoflow = new CryptoFlow('pk_test_webhook_3c6f8a2d1e7b9');

const webhook = await cryptoflow.createWebhook({
  url: 'https://example.com/webhooks/crypto',
  events: ['payment.created', 'payment.completed', 'payment.failed'],
  isActive: true
});

console.log('Test webhook created:', webhook);
```

### Testing Webhook Delivery

For testing webhook delivery locally, we recommend using tools like:

- [Webhook.site](https://webhook.site/) - Provides a unique URL to receive and inspect webhooks
- [ngrok](https://ngrok.com/) - Creates a public URL for your local server
- [Postman](https://www.postman.com/) - Can be used to capture and inspect webhook requests

### Webhook Signature Verification

Test webhooks include the same signature headers as production webhooks:

- `X-Webhook-Signature`: HMAC-SHA256 signature of the payload
- `X-Webhook-Timestamp`: Timestamp when the webhook was sent

Use the webhook secret provided when you created the webhook to verify signatures:

```javascript
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
```

## Test Mode Limitations

The test environment has the following limitations:

1. **Test Networks Only**: You can only use test networks (Sepolia, BSC Testnet, etc.)
2. **Simulated Transactions**: Blockchain transactions are simulated, not actual on-chain transactions
3. **Data Isolation**: Test data is stored separately from production data
4. **Rate Limits**: Test mode has higher rate limits than production
5. **Feature Parity**: Some advanced features may be limited in test mode

## Going to Production

When you're ready to go to production:

1. Create a production API key in the dashboard (starts with `pk_live_`)
2. Update your integration to use the production API key
3. Update chain IDs to use mainnet networks (e.g., Ethereum Mainnet - 1)
4. Configure production webhooks with secure endpoints
5. Ensure you have proper error handling for production scenarios

### Production Checklist

- [ ] Replace test API key with production API key
- [ ] Update chain IDs to mainnet values
- [ ] Configure production webhooks with proper security
- [ ] Implement comprehensive error handling
- [ ] Set up monitoring for production payments
- [ ] Test the complete payment flow in production with small amounts
- [ ] Review security best practices in the [Security Guide](./security_guide.md)

## Additional Resources

- [API Reference](./api_reference.md)
- [Developer Guide](./developer_guide.md)
- [Frontend Integration Guide](./frontend_integration.md)
- [Webhook Integration Guide](./webhook_integration.md)
- [Security Guide](./security_guide.md)
