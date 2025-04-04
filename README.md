# CryptoFlow Payment Gateway

A comprehensive cryptocurrency payment gateway that enables merchants to accept crypto payments across multiple blockchain networks.

![CryptoFlow Logo](public/images/logo.png)

## Features

### Cryptocurrency Support
- Bitcoin (BTC)
- Ethereum (ETH)
- Tether (USDT)
- USD Coin (USDC)
- Solana (SOL)
- And more...

### Blockchain Networks
- Ethereum
- Binance Smart Chain (BSC)
- Polygon
- Optimism
- Arbitrum
- Solana

### Core Functionality
- **Payment Processing**: Accept cryptocurrency payments with real-time status updates
- **Wallet Management**: Create and manage multiple wallet addresses
- **Transaction Tracking**: Monitor all transactions with detailed history
- **Webhook Notifications**: Receive real-time updates for payment events
- **API Integration**: Comprehensive API for custom integrations
- **Merchant Dashboard**: User-friendly interface for payment management
- **JavaScript SDK**: Easy frontend integration for websites and applications
- **Payment Button**: Customizable payment button for quick website integration
- **Testing Infrastructure**: Test API keys, wallets, and networks for development

## Quick Start

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

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Adding the Payment Button to Your Website

```html
<!-- Add the payment button script -->
<script src="https://cdn.cryptoflow.com/js/payment-button.js"></script>

<!-- Add a payment button container -->
<div id="crypto-payment-button" 
     data-api-key="YOUR_API_KEY"
     data-amount="0.05" 
     data-currency="ETH" 
     data-chain-id="1"
     data-description="Payment for services">
</div>
```

### Using the JavaScript SDK

```javascript
// Initialize the SDK with your API key
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

For development and testing, use our test environment:

```javascript
// Use a test API key (starts with pk_test_)
const cryptoflow = new CryptoFlow('pk_test_full_7e3a21d8f5b92');

// Create a test payment on Ethereum Sepolia testnet
const payment = await cryptoflow.createPayment({
  amount: '0.1',
  currency: 'ETH',
  chainId: 11155111, // Ethereum Sepolia
  description: 'Test payment'
});
```

Run the integration tests:

```bash
node scripts/run-integration-tests.js --api-key=pk_test_full_7e3a21d8f5b92 --webhook-url=https://webhook.site/your-unique-id
```

## Documentation

- [User Guide](docs/user_guide.md) - Instructions for merchants
- [Developer Guide](docs/developer_guide.md) - Technical information for developers
- [API Reference](docs/api_reference.md) - Detailed API documentation
- [Frontend Integration Guide](docs/frontend_integration.md) - SDK and payment button documentation
- [Test Environment Guide](docs/test_environment.md) - Testing infrastructure documentation

## Architecture

The project follows a modern architecture using Next.js for both frontend and backend:

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
    /webhook           # Webhook utilities
    /testing           # Testing utilities
    /api               # API middleware
  /prisma              # Prisma schema and migrations
/docs                  # Documentation
/public                # Static assets
  /js                  # JavaScript SDK and payment button
  /examples            # Integration examples
/scripts               # Utility scripts for testing and development
```

## Security

CryptoFlow implements industry-standard security practices:

- API key authentication
- Webhook signature verification
- Transaction validation
- KYC/AML compliance framework
- Secure wallet management

## License

[MIT License](LICENSE)

## Support

For support, please contact support@cryptoflow.com or open an issue on GitHub.
