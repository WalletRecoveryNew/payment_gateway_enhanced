'use client'

import { useState } from 'react'
import { Book, Code, CreditCard, FileText, Link as LinkIcon, ExternalLink, Search, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import DashboardClient from '@/components/dashboard/dashboard-client'

interface DocSection {
  id: string
  title: string
  content: string
  code?: string
}

const API_SECTIONS: DocSection[] = [
  {
    id: 'getting-started',
    title: 'Getting Started with the API',
    content: 'The CryptoFlow API is organized around REST. Our API has predictable resource-oriented URLs, accepts JSON-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes and authentication.',
  },
  {
    id: 'authentication',
    title: 'Authentication',
    content: 'The CryptoFlow API uses API keys to authenticate requests. You can view and manage your API keys in the API Keys section of the dashboard. Authentication to the API is performed via Bearer Authentication.',
    code: `curl -X POST https://api.cryptoflow.io/v1/payments \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": "100.00",
    "currency": "USDT",
    "chain_id": 1
  }'`
  },
  {
    id: 'payments',
    title: 'Creating Payments',
    content: 'To create a payment, you need to specify the amount, currency, and blockchain network. You can optionally add metadata to the payment, such as a description or a reference to your internal system.',
    code: `// Using Node.js
const axios = require('axios');

const createPayment = async () => {
  try {
    const response = await axios.post(
      'https://api.cryptoflow.io/v1/payments',
      {
        amount: '10.50',
        currency: 'USDC',
        chain_id: 137, // Polygon network
        description: 'Payment for order #12345',
        metadata: {
          order_id: '12345',
          customer_id: '67890'
        }
      },
      {
        headers: {
          'Authorization': 'Bearer YOUR_API_KEY',
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

createPayment();`
  },
  {
    id: 'webhooks',
    title: 'Using Webhooks',
    content: 'Webhooks allow you to receive real-time updates about payment status changes. You can configure webhooks in the Webhooks section of the dashboard. Each webhook request is signed with a secret key to ensure it comes from CryptoFlow.',
    code: `// Verifying webhook signatures (Node.js/Express)
const crypto = require('crypto');
const express = require('express');
const app = express();

app.post('/webhook', express.json(), (req, res) => {
  const signature = req.headers['cryptoflow-signature'];
  const payload = JSON.stringify(req.body);
  const webhookSecret = 'YOUR_WEBHOOK_SECRET';
  
  const hmac = crypto.createHmac('sha256', webhookSecret);
  const calculatedSignature = hmac.update(payload).digest('hex');
  
  if (crypto.timingSafeEqual(
    Buffer.from(calculatedSignature, 'hex'),
    Buffer.from(signature, 'hex')
  )) {
    // Signature is valid, process the webhook
    const event = req.body;
    
    switch (event.type) {
      case 'payment.created':
        // Handle payment created
        break;
      case 'payment.completed':
        // Handle payment completed
        break;
      case 'payment.failed':
        // Handle payment failed
        break;
    }
    
    res.status(200).send('Webhook received');
  } else {
    res.status(400).send('Invalid signature');
  }
});

app.listen(3000, () => {
  console.log('Webhook server running on port 3000');
});`
  }
];

const INTEGRATION_SECTIONS: DocSection[] = [
  {
    id: 'frontend-sdk',
    title: 'Frontend Integration',
    content: 'The CryptoFlow JavaScript SDK allows you to easily integrate cryptocurrency payments into your web application. It provides a simple interface for creating payment sessions and handling payment callbacks.',
    code: `// Install the SDK
// npm install @cryptoflow/js

import { CryptoFlow } from '@cryptoflow/js';

// Initialize the SDK
const cryptoflow = new CryptoFlow('YOUR_PUBLIC_KEY');

// Create a payment session
const createPayment = async () => {
  try {
    const session = await cryptoflow.createPaymentSession({
      amount: '100.00',
      currency: 'USDT',
      chainId: 1,
      successUrl: 'https://your-website.com/success',
      cancelUrl: 'https://your-website.com/cancel'
    });
    
    // Redirect to the payment page
    window.location.href = session.url;
  } catch (error) {
    console.error(error);
  }
};

// Create a payment button
const payButton = document.getElementById('pay-button');
payButton.addEventListener('click', createPayment);`
  },
  {
    id: 'react-integration',
    title: 'React Integration',
    content: 'The CryptoFlow React component provides a ready-to-use payment form that you can easily integrate into your React application.',
    code: `// Install the SDK
// npm install @cryptoflow/react

import { PaymentForm } from '@cryptoflow/react';

function Checkout() {
  const handlePaymentSuccess = (payment) => {
    console.log('Payment successful:', payment);
    // Redirect or update UI
  };
  
  const handlePaymentError = (error) => {
    console.error('Payment failed:', error);
    // Show error message
  };
  
  return (
    <div>
      <h1>Checkout</h1>
      <PaymentForm
        publicKey="YOUR_PUBLIC_KEY"
        amount="50.00"
        currency="USDC"
        chainId={1}
        onSuccess={handlePaymentSuccess}
        onError={handlePaymentError}
      />
    </div>
  );
}`
  },
  {
    id: 'mobile-integration',
    title: 'Mobile Integration',
    content: 'For mobile applications, you can use our native SDKs for iOS and Android, or integrate using our web-based payment flow.',
  }
];

export default function DocumentationPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState<'api' | 'integration'>('api')
  
  const filteredApiSections = API_SECTIONS.filter(section => 
    section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.content.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  const filteredIntegrationSections = INTEGRATION_SECTIONS.filter(section => 
    section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.content.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  return (
    <DashboardClient>
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-crypto-white">Documentation</h1>
          <p className="text-crypto-gray-light mt-1">
            Comprehensive guides and reference materials for the CryptoFlow payment gateway.
          </p>
        </div>
        
        {/* Search bar */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-crypto-gray-light" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search documentation..."
            className="block w-full pl-10 pr-3 py-2 bg-crypto-blue-dark border border-white/10 rounded-md text-crypto-white focus:outline-none focus:border-crypto-cyan/50"
          />
        </div>
        
        {/* Tab navigation */}
        <div className="flex border-b border-white/10 mb-6">
          <button
            onClick={() => setActiveTab('api')}
            className={`pb-2 px-4 font-medium ${
              activeTab === 'api' 
                ? 'text-crypto-cyan border-b-2 border-crypto-cyan' 
                : 'text-crypto-gray-light hover:text-crypto-white'
            }`}
          >
            API Reference
          </button>
          <button
            onClick={() => setActiveTab('integration')}
            className={`pb-2 px-4 font-medium ${
              activeTab === 'integration' 
                ? 'text-crypto-cyan border-b-2 border-crypto-cyan' 
                : 'text-crypto-gray-light hover:text-crypto-white'
            }`}
          >
            Integration Guides
          </button>
        </div>
        
        {/* Documentation content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass-card p-4 sticky top-20">
              <h3 className="text-md font-medium text-crypto-white mb-4">
                {activeTab === 'api' ? 'API Reference' : 'Integration Guides'}
              </h3>
              <nav className="space-y-1">
                {activeTab === 'api' 
                  ? filteredApiSections.map(section => (
                      <a
                        key={section.id}
                        href={`#${section.id}`}
                        className="block px-3 py-2 text-sm rounded-md hover:bg-white/5 text-crypto-gray-light hover:text-crypto-white"
                      >
                        {section.title}
                      </a>
                    ))
                  : filteredIntegrationSections.map(section => (
                      <a
                        key={section.id}
                        href={`#${section.id}`}
                        className="block px-3 py-2 text-sm rounded-md hover:bg-white/5 text-crypto-gray-light hover:text-crypto-white"
                      >
                        {section.title}
                      </a>
                    ))
                }
              </nav>
            </div>
          </div>
          
          {/* Main content */}
          <div className="lg:col-span-3 space-y-6">
            {activeTab === 'api' 
              ? (
                filteredApiSections.length > 0 
                  ? filteredApiSections.map(section => (
                      <section key={section.id} id={section.id} className="glass-card p-6">
                        <h2 className="text-xl font-medium text-crypto-white mb-4">{section.title}</h2>
                        <p className="text-crypto-gray-light mb-4">{section.content}</p>
                        {section.code && (
                          <div className="bg-crypto-blue-dark border border-white/10 rounded-md p-4 mt-4 overflow-x-auto">
                            <pre className="text-sm text-crypto-gray-light font-mono whitespace-pre-wrap">
                              {section.code}
                            </pre>
                          </div>
                        )}
                      </section>
                    ))
                  : (
                    <div className="glass-card p-10 text-center">
                      <FileText className="h-12 w-12 text-crypto-gray-light mx-auto mb-4" />
                      <h3 className="text-xl font-medium text-crypto-white mb-2">No results found</h3>
                      <p className="text-crypto-gray-light">Try adjusting your search query or browse our documentation sections.</p>
                    </div>
                  )
              ) 
              : (
                filteredIntegrationSections.length > 0 
                  ? filteredIntegrationSections.map(section => (
                      <section key={section.id} id={section.id} className="glass-card p-6">
                        <h2 className="text-xl font-medium text-crypto-white mb-4">{section.title}</h2>
                        <p className="text-crypto-gray-light mb-4">{section.content}</p>
                        {section.code && (
                          <div className="bg-crypto-blue-dark border border-white/10 rounded-md p-4 mt-4 overflow-x-auto">
                            <pre className="text-sm text-crypto-gray-light font-mono whitespace-pre-wrap">
                              {section.code}
                            </pre>
                          </div>
                        )}
                      </section>
                    ))
                  : (
                    <div className="glass-card p-10 text-center">
                      <FileText className="h-12 w-12 text-crypto-gray-light mx-auto mb-4" />
                      <h3 className="text-xl font-medium text-crypto-white mb-2">No results found</h3>
                      <p className="text-crypto-gray-light">Try adjusting your search query or browse our documentation sections.</p>
                    </div>
                  )
              )
            }
            
            {/* Additional resources */}
            <div className="glass-card p-6 border border-crypto-cyan/20">
              <h3 className="text-lg font-medium text-crypto-white mb-4">Additional Resources</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a href="#" className="flex items-center p-4 bg-white/5 rounded-md hover:bg-white/10 transition-colors">
                  <Book className="h-5 w-5 text-crypto-cyan mr-3" />
                  <div>
                    <h4 className="text-crypto-white font-medium">Developer Guide</h4>
                    <p className="text-xs text-crypto-gray-light">Comprehensive guide for developers</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-crypto-gray-light ml-auto" />
                </a>
                <a href="#" className="flex items-center p-4 bg-white/5 rounded-md hover:bg-white/10 transition-colors">
                  <Code className="h-5 w-5 text-crypto-cyan mr-3" />
                  <div>
                    <h4 className="text-crypto-white font-medium">Code Samples</h4>
                    <p className="text-xs text-crypto-gray-light">Example code in various languages</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-crypto-gray-light ml-auto" />
                </a>
                <a href="#" className="flex items-center p-4 bg-white/5 rounded-md hover:bg-white/10 transition-colors">
                  <CreditCard className="h-5 w-5 text-crypto-cyan mr-3" />
                  <div>
                    <h4 className="text-crypto-white font-medium">Payment Flows</h4>
                    <p className="text-xs text-crypto-gray-light">Different payment scenarios explained</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-crypto-gray-light ml-auto" />
                </a>
                <a href="#" className="flex items-center p-4 bg-white/5 rounded-md hover:bg-white/10 transition-colors">
                  <LinkIcon className="h-5 w-5 text-crypto-cyan mr-3" />
                  <div>
                    <h4 className="text-crypto-white font-medium">API Status</h4>
                    <p className="text-xs text-crypto-gray-light">Check the current API status</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-crypto-gray-light ml-auto" />
                </a>
              </div>
            </div>
            
            {/* Help & Support */}
            <div className="glass-card p-6 mt-6">
              <h3 className="text-lg font-medium text-crypto-white mb-4">Need Help?</h3>
              <p className="text-crypto-gray-light mb-4">
                If you can't find what you're looking for in our documentation, our support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/dashboard/support" 
                  className="px-4 py-2 bg-crypto-cyan text-crypto-blue rounded-md hover:bg-crypto-cyan/90 transition-colors flex-1 text-center"
                >
                  Contact Support
                </Link>
                <a 
                  href="https://community.cryptoflow.io" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-crypto-cyan/10 text-crypto-cyan border border-crypto-cyan/20 rounded-md hover:bg-crypto-cyan/20 transition-colors flex-1 text-center"
                >
                  Join Community
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardClient>
  )
} 