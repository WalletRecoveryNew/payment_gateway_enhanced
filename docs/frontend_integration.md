# Frontend Integration Guide

This guide explains how to integrate CryptoFlow Payment Gateway into your website using our JavaScript SDK and payment button.

## Table of Contents

- [Quick Start](#quick-start)
- [Payment Button](#payment-button)
  - [Basic Implementation](#basic-implementation)
  - [Customization Options](#customization-options)
  - [Available Data Attributes](#available-data-attributes)
  - [Button Themes](#button-themes)
- [JavaScript SDK](#javascript-sdk)
  - [Installation](#installation)
  - [Initialization](#initialization)
  - [Creating Payments](#creating-payments)
  - [Payment Modal](#payment-modal)
  - [Event Handling](#event-handling)
  - [API Reference](#api-reference)
- [Examples](#examples)
  - [E-commerce Checkout](#e-commerce-checkout)
  - [Subscription Payments](#subscription-payments)
  - [Donation Form](#donation-form)

## Quick Start

The fastest way to start accepting crypto payments is to use our payment button:

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

That's it! The script will automatically create a payment button that opens a payment modal when clicked.

## Payment Button

Our payment button is the easiest way to integrate CryptoFlow into your website. It handles everything from creating a payment to displaying the payment modal.

### Basic Implementation

1. Add the payment button script to your website:

```html
<script src="https://cdn.cryptoflow.com/js/payment-button.js"></script>
```

2. Add a payment button container with your configuration:

```html
<div id="crypto-payment-button" 
     data-api-key="YOUR_API_KEY"
     data-amount="0.05" 
     data-currency="ETH" 
     data-chain-id="1"
     data-description="Payment for services">
</div>
```

### Customization Options

You can customize the appearance and behavior of the payment button using data attributes:

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

### Available Data Attributes

| Attribute | Description | Required | Default |
|-----------|-------------|----------|---------|
| data-api-key | Your CryptoFlow API key | Yes | - |
| data-amount | Payment amount | Yes | - |
| data-currency | Payment currency (ETH, BTC, USDT, USDC, SOL) | Yes | - |
| data-chain-id | Blockchain network ID | No | 1 (Ethereum) |
| data-description | Payment description | No | - |
| data-button-text | Text to display on the button | No | Pay with Crypto |
| data-button-theme | Button theme (light, dark, blue, crypto) | No | light |
| data-button-size | Button size (small, medium, large) | No | medium |
| data-redirect-url | URL to redirect to after successful payment | No | - |
| data-cancel-url | URL to redirect to after cancelled payment | No | - |
| data-debug | Enable debug logging (true, false) | No | false |

### Button Themes

The payment button comes with four built-in themes:

- `light`: White background with dark text
- `dark`: Dark background with white text
- `blue`: Blue gradient background with white text
- `crypto`: Purple gradient background with white text

## JavaScript SDK

For more control over the payment process, you can use our JavaScript SDK directly.

### Installation

Add the SDK to your website:

```html
<script src="https://cdn.cryptoflow.com/js/cryptoflow-sdk.js"></script>
```

Or install via npm:

```bash
npm install cryptoflow-sdk
```

### Initialization

Initialize the SDK with your API key:

```javascript
// Browser
const cryptoflow = new CryptoFlow('YOUR_API_KEY');

// Node.js
const CryptoFlow = require('cryptoflow-sdk');
const cryptoflow = new CryptoFlow('YOUR_API_KEY');
```

You can also pass additional options:

```javascript
const cryptoflow = new CryptoFlow('YOUR_API_KEY', {
  apiUrl: 'https://api.cryptoflow.com/v1', // Custom API URL
  debug: true // Enable debug logging
});
```

### Creating Payments

Create a payment with the required parameters:

```javascript
try {
  const payment = await cryptoflow.createPayment({
    amount: '0.1',
    currency: 'ETH',
    chainId: 1,
    description: 'Payment for services',
    redirectUrl: 'https://example.com/success',
    cancelUrl: 'https://example.com/cancel'
  });
  
  console.log('Payment created:', payment);
  // payment.id can be used to check status or open the payment modal
} catch (error) {
  console.error('Error creating payment:', error);
}
```

### Payment Modal

Open the payment modal to allow the user to complete the payment:

```javascript
// Open the payment modal with the payment ID
cryptoflow.openPaymentModal(payment.id);

// Close the payment modal programmatically
cryptoflow.closePaymentModal();
```

### Event Handling

Listen for payment events:

```javascript
// Listen for payment completion
cryptoflow.on('payment.completed', (payment) => {
  console.log('Payment completed:', payment);
  // Update UI or redirect the user
});

// Listen for payment failure
cryptoflow.on('payment.failed', (payment) => {
  console.log('Payment failed:', payment);
  // Show error message or retry options
});

// Remove event listener
cryptoflow.off('payment.completed', myCallback);
```

Available events:

- `payment.created`: Fired when a payment is created
- `payment.processing`: Fired when a payment is being processed
- `payment.completed`: Fired when a payment is completed successfully
- `payment.failed`: Fired when a payment fails

### API Reference

#### CryptoFlow(apiKey, options)

Creates a new instance of the CryptoFlow SDK.

- `apiKey` (string): Your CryptoFlow API key
- `options` (object): Configuration options
  - `apiUrl` (string): Custom API URL
  - `debug` (boolean): Enable debug logging

#### createPayment(paymentData)

Creates a new payment.

- `paymentData` (object): Payment details
  - `amount` (string): Payment amount
  - `currency` (string): Payment currency
  - `chainId` (number): Blockchain network ID
  - `description` (string, optional): Payment description
  - `redirectUrl` (string, optional): URL to redirect after successful payment
  - `cancelUrl` (string, optional): URL to redirect after cancelled payment

Returns a Promise that resolves to the payment object.

#### getPayment(paymentId)

Gets details of an existing payment.

- `paymentId` (string): Payment ID

Returns a Promise that resolves to the payment object.

#### openPaymentModal(paymentId)

Opens the payment modal for a specific payment.

- `paymentId` (string): Payment ID

#### closePaymentModal()

Closes the payment modal.

#### on(event, callback)

Adds an event listener.

- `event` (string): Event name
- `callback` (function): Callback function

#### off(event, callback)

Removes an event listener.

- `event` (string): Event name
- `callback` (function): Callback function

## Examples

### E-commerce Checkout

```html
<div class="checkout-form">
  <h2>Complete Your Purchase</h2>
  <p>Total: $100.00</p>
  
  <!-- Payment options -->
  <div class="payment-options">
    <div id="crypto-payment-button" 
         data-api-key="YOUR_API_KEY"
         data-amount="100" 
         data-currency="USDT" 
         data-chain-id="1"
         data-description="Order #12345"
         data-button-text="Pay with Crypto"
         data-redirect-url="https://example.com/order/complete"
         data-cancel-url="https://example.com/checkout">
    </div>
  </div>
</div>
```

### Subscription Payments

```javascript
document.getElementById('subscribe-button').addEventListener('click', async () => {
  const plan = document.querySelector('input[name="plan"]:checked').value;
  const planPrices = {
    basic: { amount: '10', currency: 'USDT' },
    premium: { amount: '25', currency: 'USDT' },
    enterprise: { amount: '100', currency: 'USDT' }
  };
  
  const cryptoflow = new CryptoFlow('YOUR_API_KEY');
  
  try {
    const payment = await cryptoflow.createPayment({
      amount: planPrices[plan].amount,
      currency: planPrices[plan].currency,
      chainId: 1,
      description: `${plan.charAt(0).toUpperCase() + plan.slice(1)} Plan Subscription`,
      redirectUrl: `https://example.com/subscription/success?plan=${plan}`
    });
    
    cryptoflow.openPaymentModal(payment.id);
    
    cryptoflow.on('payment.completed', (data) => {
      // Store subscription info in your database
      console.log('Subscription payment completed');
    });
  } catch (error) {
    console.error('Error creating subscription payment:', error);
  }
});
```

### Donation Form

```html
<div class="donation-form">
  <h2>Support Our Project</h2>
  
  <div class="donation-options">
    <button onclick="donate('5')">$5</button>
    <button onclick="donate('10')">$10</button>
    <button onclick="donate('25')">$25</button>
    <button onclick="donate('50')">$50</button>
    <button onclick="donate('custom')">Custom</button>
  </div>
  
  <div id="custom-amount" style="display: none;">
    <input type="number" id="donation-amount" placeholder="Enter amount">
    <button onclick="donate('custom-value')">Donate</button>
  </div>
  
  <div id="donation-payment-container"></div>
</div>

<script src="https://cdn.cryptoflow.com/js/cryptoflow-sdk.js"></script>
<script>
  const cryptoflow = new CryptoFlow('YOUR_API_KEY');
  
  function donate(amount) {
    if (amount === 'custom') {
      document.getElementById('custom-amount').style.display = 'block';
      return;
    }
    
    let donationAmount = amount;
    if (amount === 'custom-value') {
      donationAmount = document.getElementById('donation-amount').value;
      if (!donationAmount || isNaN(donationAmount) || donationAmount <= 0) {
        alert('Please enter a valid donation amount');
        return;
      }
    }
    
    createDonation(donationAmount);
  }
  
  async function createDonation(amount) {
    try {
      const payment = await cryptoflow.createPayment({
        amount: amount,
        currency: 'USDT',
        chainId: 1,
        description: 'Donation'
      });
      
      cryptoflow.openPaymentModal(payment.id);
      
      cryptoflow.on('payment.completed', (data) => {
        alert('Thank you for your donation!');
      });
    } catch (error) {
      console.error('Error creating donation:', error);
      alert('Error processing donation. Please try again.');
    }
  }
</script>
```

For more examples and advanced usage, check out our [GitHub repository](https://github.com/cryptoflow/payment-examples).
