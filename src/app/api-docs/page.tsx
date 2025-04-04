import MainLayout from '@/components/layout/main-layout'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export default function ApiDocsPage() {
  return (
    <MainLayout>
      <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
            API Documentation
          </h1>
          <p className="text-xl text-gray-500 max-w-3xl">
            Integrate our payment gateway into your application with our comprehensive API.
          </p>
        </div>

        <div className="space-y-12">
          {/* Authentication */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Authentication</h2>
            <Card>
              <CardContent className="pt-5">
                <p className="mb-4">All API requests must be authenticated using your API key.</p>
                <div className="bg-gray-100 p-4 rounded-md mb-4">
                  <pre className="text-sm text-gray-800">
                    <code>{`// Example request with authentication header
fetch('https://api.cryptopay.com/v1/payments', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': 'your_api_key_here'
  },
  body: JSON.stringify({
    amount: '100.50',
    currency: 'USDT',
    chain_id: 1
  })
})`}</code>
                  </pre>
                </div>
                <p className="mb-2 font-medium">API Key Management</p>
                <p>You can generate and manage your API keys in the <a href="/dashboard/api-keys" className="text-primary-600 hover:text-primary-500">API Keys section</a> of your dashboard.</p>
              </CardContent>
            </Card>
          </section>

          {/* Endpoints */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">API Endpoints</h2>
            
            {/* Create Payment */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Create Payment</CardTitle>
                <CardDescription>Create a new payment request</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-4">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium mr-2">POST</span>
                  <code className="text-sm">/v1/payments</code>
                </div>
                
                <p className="font-medium mb-2">Request Body:</p>
                <div className="bg-gray-100 p-4 rounded-md mb-4">
                  <pre className="text-sm text-gray-800">
                    <code>{`{
  "amount": "100.50",
  "currency": "USDT",
  "chain_id": 1,
  "description": "Payment for order #12345",
  "callback_url": "https://your-website.com/webhook"
}`}</code>
                  </pre>
                </div>
                
                <p className="font-medium mb-2">Response:</p>
                <div className="bg-gray-100 p-4 rounded-md">
                  <pre className="text-sm text-gray-800">
                    <code>{`{
  "id": "pay_1234567890",
  "status": "pending",
  "amount": "100.50",
  "currency": "USDT",
  "chain_id": 1,
  "payment_address": "0x1234567890abcdef1234567890abcdef12345678",
  "created_at": "2023-05-15T14:30:45Z",
  "expires_at": "2023-05-15T15:30:45Z"
}`}</code>
                  </pre>
                </div>
              </CardContent>
            </Card>
            
            {/* Get Payment */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Get Payment</CardTitle>
                <CardDescription>Retrieve details of an existing payment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-4">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium mr-2">GET</span>
                  <code className="text-sm">/v1/payments/:id</code>
                </div>
                
                <p className="font-medium mb-2">Response:</p>
                <div className="bg-gray-100 p-4 rounded-md">
                  <pre className="text-sm text-gray-800">
                    <code>{`{
  "id": "pay_1234567890",
  "status": "completed",
  "amount": "100.50",
  "currency": "USDT",
  "chain_id": 1,
  "payment_address": "0x1234567890abcdef1234567890abcdef12345678",
  "tx_hash": "0xabcdef1234567890abcdef1234567890abcdef1234567890",
  "created_at": "2023-05-15T14:30:45Z",
  "completed_at": "2023-05-15T14:35:12Z"
}`}</code>
                  </pre>
                </div>
              </CardContent>
            </Card>
            
            {/* List Transactions */}
            <Card>
              <CardHeader>
                <CardTitle>List Transactions</CardTitle>
                <CardDescription>Retrieve a list of transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-4">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium mr-2">GET</span>
                  <code className="text-sm">/v1/transactions</code>
                </div>
                
                <p className="font-medium mb-2">Query Parameters:</p>
                <ul className="list-disc pl-5 mb-4 space-y-1">
                  <li><code className="text-sm">start_date</code> - Filter by start date (ISO 8601)</li>
                  <li><code className="text-sm">end_date</code> - Filter by end date (ISO 8601)</li>
                  <li><code className="text-sm">status</code> - Filter by status (pending, completed, failed)</li>
                  <li><code className="text-sm">limit</code> - Number of results per page (default: 20, max: 100)</li>
                  <li><code className="text-sm">page</code> - Page number for pagination (default: 1)</li>
                </ul>
                
                <p className="font-medium mb-2">Response:</p>
                <div className="bg-gray-100 p-4 rounded-md">
                  <pre className="text-sm text-gray-800">
                    <code>{`{
  "data": [
    {
      "id": "tx_1234567890",
      "payment_id": "pay_1234567890",
      "status": "completed",
      "amount": "100.50",
      "currency": "USDT",
      "chain_id": 1,
      "tx_hash": "0xabcdef1234567890abcdef1234567890abcdef1234567890",
      "created_at": "2023-05-15T14:30:45Z",
      "completed_at": "2023-05-15T14:35:12Z"
    },
    // ...
  ],
  "pagination": {
    "total": 45,
    "page": 1,
    "limit": 20,
    "pages": 3
  }
}`}</code>
                  </pre>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Webhook Integration */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Webhook Integration</h2>
            <Card>
              <CardContent className="pt-5">
                <p className="mb-4">Set up webhook notifications to receive real-time updates about payment status changes.</p>
                
                <p className="font-medium mb-2">Webhook Payload:</p>
                <div className="bg-gray-100 p-4 rounded-md mb-4">
                  <pre className="text-sm text-gray-800">
                    <code>{`{
  "event": "payment.completed",
  "data": {
    "id": "pay_1234567890",
    "status": "completed",
    "amount": "100.50",
    "currency": "USDT",
    "chain_id": 1,
    "payment_address": "0x1234567890abcdef1234567890abcdef12345678",
    "tx_hash": "0xabcdef1234567890abcdef1234567890abcdef1234567890",
    "created_at": "2023-05-15T14:30:45Z",
    "completed_at": "2023-05-15T14:35:12Z"
  }
}`}</code>
                  </pre>
                </div>
                
                <p className="mb-4">Your server should respond with a 200 status code to acknowledge receipt of the webhook.</p>
                
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        For security reasons, we recommend verifying the webhook signature included in the <code>X-Cryptopay-Signature</code> header.
                      </p>
                    </div>
                  </div>
                </div>
                
                <p className="mb-2 font-medium">Available Events:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><code className="text-sm">payment.created</code> - A new payment was created</li>
                  <li><code className="text-sm">payment.pending</code> - A payment is waiting for confirmation</li>
                  <li><code className="text-sm">payment.completed</code> - A payment was confirmed and completed</li>
                  <li><code className="text-sm">payment.failed</code> - A payment failed or expired</li>
                </ul>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </MainLayout>
  )
} 