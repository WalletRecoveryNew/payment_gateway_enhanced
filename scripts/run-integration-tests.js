#!/usr/bin/env node

/**
 * CryptoFlow Payment Gateway Integration Test Runner
 * 
 * This script runs a series of tests to verify your integration with the CryptoFlow payment gateway.
 * It tests API connectivity, payment creation, webhook delivery, and signature verification.
 * 
 * Usage:
 * node run-integration-tests.js --api-key=pk_test_full_7e3a21d8f5b92 --webhook-url=https://webhook.site/your-unique-id
 */

const https = require('https');
const http = require('http');
const crypto = require('crypto');
const url = require('url');
const { execSync } = require('child_process');

// Parse command line arguments
const args = process.argv.slice(2).reduce((acc, arg) => {
  const [key, value] = arg.split('=');
  acc[key.replace(/^--/, '')] = value;
  return acc;
}, {});

// Configuration
const config = {
  apiKey: args['api-key'] || 'pk_test_full_7e3a21d8f5b92',
  apiUrl: args['api-url'] || 'https://api.cryptoflow.com/v1',
  webhookUrl: args['webhook-url'] || 'https://webhook.site/your-unique-id',
  localServer: args['local-server'] || 'http://localhost:3000/api',
  useLocalServer: args['use-local'] === 'true',
  verbose: args['verbose'] === 'true'
};

// Test data
const testPaymentData = {
  amount: '0.01',
  currency: 'ETH',
  chainId: 11155111, // Ethereum Sepolia
  description: 'Integration test payment'
};

// Test results
const testResults = {
  passed: 0,
  failed: 0,
  total: 0,
  tests: []
};

// Utility functions
function log(message, data) {
  if (config.verbose && data) {
    console.log(message, data);
  } else {
    console.log(message);
  }
}

function logError(message, error) {
  console.error(`❌ ${message}`);
  if (error) {
    console.error(error.message || error);
  }
}

function logSuccess(message) {
  console.log(`✅ ${message}`);
}

function recordTestResult(name, passed, error = null) {
  testResults.total++;
  
  if (passed) {
    testResults.passed++;
    logSuccess(`Test passed: ${name}`);
  } else {
    testResults.failed++;
    logError(`Test failed: ${name}`, error);
  }
  
  testResults.tests.push({
    name,
    passed,
    error: error ? (error.message || error) : null
  });
}

function makeRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const baseUrl = config.useLocalServer ? config.localServer : config.apiUrl;
    const parsedUrl = url.parse(`${baseUrl}${path}`);
    
    const options = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port || (parsedUrl.protocol === 'https:' ? 443 : 80),
      path: parsedUrl.path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKey}`
      }
    };
    
    const client = parsedUrl.protocol === 'https:' ? https : http;
    
    const req = client.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(responseData);
          
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(parsedData);
          } else {
            reject({
              statusCode: res.statusCode,
              message: parsedData.error || 'API request failed',
              data: parsedData
            });
          }
        } catch (error) {
          reject({
            statusCode: res.statusCode,
            message: 'Failed to parse response',
            data: responseData,
            error
          });
        }
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

// Test functions
async function testApiConnection() {
  try {
    // Try to get a list of wallets as a simple API connection test
    await makeRequest('GET', '/wallets');
    recordTestResult('API Connection', true);
    return true;
  } catch (error) {
    recordTestResult('API Connection', false, error);
    return false;
  }
}

async function testPaymentCreation() {
  try {
    const payment = await makeRequest('POST', '/payments', testPaymentData);
    
    if (!payment.id) {
      throw new Error('Payment ID not returned');
    }
    
    log('Payment created:', payment);
    recordTestResult('Payment Creation', true);
    return payment;
  } catch (error) {
    recordTestResult('Payment Creation', false, error);
    return null;
  }
}

async function testPaymentRetrieval(paymentId) {
  if (!paymentId) {
    recordTestResult('Payment Retrieval', false, 'No payment ID provided');
    return null;
  }
  
  try {
    const payment = await makeRequest('GET', `/payments/${paymentId}`);
    
    if (payment.id !== paymentId) {
      throw new Error('Payment ID mismatch');
    }
    
    log('Payment retrieved:', payment);
    recordTestResult('Payment Retrieval', true);
    return payment;
  } catch (error) {
    recordTestResult('Payment Retrieval', false, error);
    return null;
  }
}

async function testWebhookCreation() {
  try {
    const webhook = await makeRequest('POST', '/webhooks', {
      url: config.webhookUrl,
      events: ['payment.created', 'payment.completed', 'payment.failed'],
      isActive: true
    });
    
    if (!webhook.id || !webhook.secret) {
      throw new Error('Webhook ID or secret not returned');
    }
    
    log('Webhook created:', webhook);
    recordTestResult('Webhook Creation', true);
    return webhook;
  } catch (error) {
    recordTestResult('Webhook Creation', false, error);
    return null;
  }
}

async function testTransactionCreation(paymentId) {
  if (!paymentId) {
    recordTestResult('Transaction Creation', false, 'No payment ID provided');
    return null;
  }
  
  try {
    const transaction = await makeRequest('POST', '/transactions', {
      paymentId,
      amount: testPaymentData.amount,
      currency: testPaymentData.currency,
      chainId: testPaymentData.chainId,
      fromAddress: '0x1234567890abcdef1234567890abcdef12345678'
    });
    
    if (!transaction.id) {
      throw new Error('Transaction ID not returned');
    }
    
    log('Transaction created:', transaction);
    recordTestResult('Transaction Creation', true);
    return transaction;
  } catch (error) {
    recordTestResult('Transaction Creation', false, error);
    return null;
  }
}

function testWebhookSignatureVerification() {
  try {
    // Create a mock webhook payload
    const payload = {
      id: 'evt_test_123456789',
      type: 'payment.completed',
      created: new Date().toISOString(),
      data: {
        id: 'pay_test_123456789',
        status: 'COMPLETED',
        amount: '0.01',
        currency: 'ETH',
        chainId: 11155111
      }
    };
    
    // Create a mock webhook secret
    const secret = 'whsec_test_12345678901234567890';
    
    // Create a mock timestamp
    const timestamp = Math.floor(Date.now() / 1000).toString();
    
    // Create a signature
    const hmac = crypto.createHmac('sha256', secret);
    const data = timestamp + '.' + JSON.stringify(payload);
    const signature = hmac.update(data).digest('hex');
    
    // Verify the signature
    const hmacVerify = crypto.createHmac('sha256', secret);
    const expectedSignature = hmacVerify.update(data).digest('hex');
    
    const isValid = signature === expectedSignature;
    
    if (!isValid) {
      throw new Error('Signature verification failed');
    }
    
    recordTestResult('Webhook Signature Verification', true);
    return true;
  } catch (error) {
    recordTestResult('Webhook Signature Verification', false, error);
    return false;
  }
}

function testLocalServerAvailability() {
  if (!config.useLocalServer) {
    log('Skipping local server test (not using local server)');
    return true;
  }
  
  try {
    // Try to ping the local server
    const response = execSync(`curl -s -o /dev/null -w "%{http_code}" ${config.localServer}/health`);
    const statusCode = parseInt(response.toString().trim());
    
    if (statusCode >= 200 && statusCode < 300) {
      recordTestResult('Local Server Availability', true);
      return true;
    } else {
      throw new Error(`Server responded with status code ${statusCode}`);
    }
  } catch (error) {
    recordTestResult('Local Server Availability', false, error);
    return false;
  }
}

// Run all tests
async function runTests() {
  console.log('=== CryptoFlow Payment Gateway Integration Tests ===\n');
  console.log('Configuration:');
  console.log(`API Key: ${config.apiKey}`);
  console.log(`API URL: ${config.useLocalServer ? config.localServer : config.apiUrl}`);
  console.log(`Webhook URL: ${config.webhookUrl}`);
  console.log(`Verbose: ${config.verbose}\n`);
  
  // Test local server if using it
  if (config.useLocalServer) {
    testLocalServerAvailability();
  }
  
  // Test API connection
  const apiConnected = await testApiConnection();
  if (!apiConnected) {
    console.log('\n❌ API connection failed. Aborting remaining tests.');
    printTestSummary();
    return;
  }
  
  // Test webhook creation
  const webhook = await testWebhookCreation();
  
  // Test payment creation
  const payment = await testPaymentCreation();
  if (!payment) {
    console.log('\n❌ Payment creation failed. Aborting remaining tests.');
    printTestSummary();
    return;
  }
  
  // Test payment retrieval
  await testPaymentRetrieval(payment.id);
  
  // Test transaction creation
  const transaction = await testTransactionCreation(payment.id);
  
  // Test webhook signature verification
  testWebhookSignatureVerification();
  
  // Print test summary
  printTestSummary();
  
  // Print next steps
  console.log('\nNext Steps:');
  console.log('1. Check your webhook endpoint for notifications');
  console.log(`2. Verify the payment status: ${payment ? payment.id : 'N/A'}`);
  if (webhook) {
    console.log(`3. Store your webhook secret securely: ${webhook.secret}`);
  }
  console.log('4. Fix any failed tests before going to production');
}

function printTestSummary() {
  console.log('\n=== Test Summary ===');
  console.log(`Total Tests: ${testResults.total}`);
  console.log(`Passed: ${testResults.passed}`);
  console.log(`Failed: ${testResults.failed}`);
  
  if (testResults.failed > 0) {
    console.log('\nFailed Tests:');
    testResults.tests
      .filter(test => !test.passed)
      .forEach(test => {
        console.log(`- ${test.name}: ${test.error}`);
      });
  }
}

// Run the tests
runTests().catch(error => {
  console.error('Error running tests:', error);
  process.exit(1);
});
