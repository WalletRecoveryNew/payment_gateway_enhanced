# CryptoFlow Payment Gateway - API Documentation

## Introduction

The CryptoFlow API allows you to integrate cryptocurrency payment processing into your applications. This document provides detailed information about all available API endpoints, request/response formats, and authentication methods.

## Base URL

All API requests should be made to:

```
https://api.cryptoflow.com/v1
```

## Authentication

### API Keys

All requests must include your API key in the Authorization header:

```
Authorization: Bearer YOUR_API_KEY
```

You can generate API keys in the CryptoFlow dashboard under API Keys section.

### API Key Types

- **Production Keys**: Used for live transactions (prefix: `pk_live_`)
- **Test Keys**: Used for testing and development (prefix: `pk_test_`)

## Payments API

### Create Payment

Creates a new payment request.

**Endpoint:** `POST /payments`

**Request Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| amount | string | Yes | Payment amount (e.g., "0.1") |
| currency | string | Yes | Currency code (ETH, BTC, USDT, USDC, SOL) |
| chainId | integer | Yes | Blockchain network ID |
| description | string | No | Payment description |
| redirectUrl | string | No | URL to redirect after successful payment |
| cancelUrl | string | No | URL to redirect after cancelled payment |
| metadata | object | No | Additional custom data |

**Example Request:**

```json
{
  "amount": "0.1",
  "currency": "ETH",
  "chainId": 1,
  "description": "Payment for services",
  "redirectUrl": "https://example.com/success",
  "cancelUrl": "https://example.com/cancel",
  "metadata": {
    "orderId": "12345",
    "customerEmail": "customer@example.com"
  }
}
```

**Example Response:**

```json
{
  "id": "pay_123456789",
  "amount": "0.1",
  "currency": "ETH",
  "chainId": 1,
  "description": "Payment for services",
  "status": "PENDING",
  "paymentUrl": "https://cryptoflow.com/payment/pay_123456789",
  "createdAt": "2025-04-04T12:34:56Z",
  "expiresAt": "2025-04-04T13:34:56Z",
  "metadata": {
    "orderId": "12345",
    "customerEmail": "customer@example.com"
  }
}
```

### Get Payment

Retrieves details of an existing payment.

**Endpoint:** `GET /payments/{id}`

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | Yes | Payment ID |

**Example Response:**

```json
{
  "id": "pay_123456789",
  "amount": "0.1",
  "currency": "ETH",
  "chainId": 1,
  "description": "Payment for services",
  "status": "COMPLETED",
  "txHash": "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
  "paymentUrl": "https://cryptoflow.com/payment/pay_123456789",
  "createdAt": "2025-04-04T12:34:56Z",
  "updatedAt": "2025-04-04T12:45:67Z",
  "expiresAt": "2025-04-04T13:34:56Z",
  "metadata": {
    "orderId": "12345",
    "customerEmail": "customer@example.com"
  }
}
```

### List Payments

Retrieves a list of payments.

**Endpoint:** `GET /payments`

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| status | string | No | Filter by status (PENDING, PROCESSING, COMPLETED, FAILED) |
| currency | string | No | Filter by currency (ETH, BTC, USDT, USDC, SOL) |
| from | string | No | Start date (ISO format) |
| to | string | No | End date (ISO format) |
| page | integer | No | Page number (default: 1) |
| limit | integer | No | Results per page (default: 10, max: 100) |

**Example Response:**

```json
{
  "data": [
    {
      "id": "pay_123456789",
      "amount": "0.1",
      "currency": "ETH",
      "chainId": 1,
      "status": "COMPLETED",
      "txHash": "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
      "createdAt": "2025-04-04T12:34:56Z"
    },
    {
      "id": "pay_987654321",
      "amount": "50",
      "currency": "USDC",
      "chainId": 137,
      "status": "PENDING",
      "createdAt": "2025-04-04T11:22:33Z"
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

## Transactions API

### Get Transaction

Retrieves details of a specific transaction.

**Endpoint:** `GET /transactions/{id}`

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | Yes | Transaction ID |

**Example Response:**

```json
{
  "id": "tx_123456789",
  "paymentId": "pay_123456789",
  "amount": "0.1",
  "currency": "ETH",
  "chainId": 1,
  "status": "COMPLETED",
  "txHash": "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
  "fromAddress": "0xabcdef1234567890abcdef1234567890abcdef12",
  "toAddress": "0x1234567890abcdef1234567890abcdef12345678",
  "explorerUrl": "https://etherscan.io/tx/0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
  "createdAt": "2025-04-04T12:34:56Z",
  "updatedAt": "2025-04-04T12:45:67Z"
}
```

### List Transactions

Retrieves a list of transactions.

**Endpoint:** `GET /transactions`

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| status | string | No | Filter by status (PENDING, PROCESSING, COMPLETED, FAILED) |
| currency | string | No | Filter by currency (ETH, BTC, USDT, USDC, SOL) |
| chainId | integer | No | Filter by blockchain network ID |
| from | string | No | Start date (ISO format) |
| to | string | No | End date (ISO format) |
| page | integer | No | Page number (default: 1) |
| limit | integer | No | Results per page (default: 10, max: 100) |

**Example Response:**

```json
{
  "data": [
    {
      "id": "tx_123456789",
      "paymentId": "pay_123456789",
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

## Wallets API

### Create Wallet

Adds a new wallet to your account.

**Endpoint:** `POST /wallets`

**Request Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| name | string | Yes | Wallet name |
| address | string | Yes | Wallet address |
| chainId | integer | Yes | Blockchain network ID |
| currency | string | Yes | Currency code (ETH, BTC, USDT, USDC, SOL) |
| isActive | boolean | No | Whether the wallet is active (default: true) |

**Example Request:**

```json
{
  "name": "Main ETH Wallet",
  "address": "0x1234567890abcdef1234567890abcdef12345678",
  "chainId": 1,
  "currency": "ETH"
}
```

**Example Response:**

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

### List Wallets

Retrieves a list of wallets.

**Endpoint:** `GET /wallets`

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| currency | string | No | Filter by currency (ETH, BTC, USDT, USDC, SOL) |
| chainId | integer | No | Filter by blockchain network ID |
| isActive | boolean | No | Filter by active status |

**Example Response:**

```json
{
  "data": [
    {
      "id": "wallet_123456789",
      "name": "Main ETH Wallet",
      "address": "0x1234567890abcdef1234567890abcdef12345678",
      "chainId": 1,
      "currency": "ETH",
      "isActive": true,
      "createdAt": "2025-04-04T12:34:56Z"
    }
  ]
}
```

## Webhooks API

### Create Webhook

Configures a webhook endpoint.

**Endpoint:** `POST /webhooks`

**Request Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| url | string | Yes | Webhook URL |
| events | array | Yes | Array of event types to subscribe to |
| isActive | boolean | No | Whether the webhook is active (default: true) |

**Example Request:**

```json
{
  "url": "https://example.com/webhooks/crypto",
  "events": ["payment.created", "payment.completed", "payment.failed"],
  "isActive": true
}
```

**Example Response:**

```json
{
  "id": "webhook_123456789",
  "url": "https://example.com/webhooks/crypto",
  "events": ["payment.created", "payment.completed", "payment.failed"],
  "isActive": true,
  "secret": "whsec_12345abcdef67890",
  "createdAt": "2025-04-04T12:34:56Z"
}
```

### List Webhooks

Retrieves a list of configured webhooks.

**Endpoint:** `GET /webhooks`

**Example Response:**

```json
{
  "data": [
    {
      "id": "webhook_123456789",
      "url": "https://example.com/webhooks/crypto",
      "events": ["payment.created", "payment.completed", "payment.failed"],
      "isActive": true,
      "createdAt": "2025-04-04T12:34:56Z"
    }
  ]
}
```

## Webhook Events

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

### Event Types

| Event Type | Description |
|------------|-------------|
| payment.created | A new payment has been created |
| payment.processing | A payment is being processed |
| payment.completed | A payment has been successfully completed |
| payment.failed | A payment has failed |
| payment.expired | A payment has expired |

### Webhook Security

To verify that webhook requests are coming from CryptoFlow, check the signature in the `X-Webhook-Signature` header:

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
```

## Error Handling

### Error Codes

| HTTP Status | Error Code | Description |
|-------------|------------|-------------|
| 400 | invalid_request | The request was invalid |
| 401 | unauthorized | Invalid API key |
| 403 | forbidden | Insufficient permissions |
| 404 | not_found | Resource not found |
| 429 | rate_limit_exceeded | Too many requests |
| 500 | server_error | Internal server error |

### Error Response Format

```json
{
  "error": {
    "code": "invalid_request",
    "message": "Invalid amount format",
    "param": "amount",
    "doc_url": "https://docs.cryptoflow.com/api/errors#invalid_request"
  }
}
```

## Rate Limits

API requests are subject to rate limiting:

- 100 requests per minute for standard accounts
- 1000 requests per minute for enterprise accounts

Rate limit information is included in the response headers:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1617567890
```

## Blockchain Network IDs

| Network ID | Name | Description |
|------------|------|-------------|
| 1 | Ethereum | Ethereum Mainnet |
| 56 | BSC | Binance Smart Chain |
| 137 | Polygon | Polygon Mainnet |
| 10 | Optimism | Optimism Mainnet |
| 42161 | Arbitrum | Arbitrum One |
| 501 | Solana | Solana Mainnet |
| 8995 | Tron | Tron Mainnet |

## Testing

For testing, use the test API key and the following test wallets:

- Ethereum (Goerli): `0xTestWallet1234567890abcdef1234567890abcdef`
- Polygon (Mumbai): `0xTestWallet1234567890abcdef1234567890abcdef`
- Solana (Devnet): `TestWalletSolana1234567890abcdef1234567890abcdef`

## Support

For API support, contact our developer team:

- Email: dev-support@cryptoflow.com
- Developer Forum: https://developers.cryptoflow.com/forum
