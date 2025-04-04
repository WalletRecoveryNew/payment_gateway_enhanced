'use client'

import { useState, useEffect } from 'react'
import { Loader2, Copy, AlertCircle } from 'lucide-react'

export default function ApiKeysPage() {
  const [apiKeys, setApiKeys] = useState<{ key: string; created: string; lastUsed: string | null }[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  
  // Fetch API keys on component mount
  useEffect(() => {
    fetchApiKeys()
  }, [])
  
  // Fetch API keys from API
  const fetchApiKeys = async () => {
    setIsLoading(true)
    try {
      // In a real implementation, this would fetch from your API
      // For now, we'll use mock data
      setTimeout(() => {
        setApiKeys([
          {
            key: 'pk_test_51Abc123DefGhi456JklMno789PqrStu',
            created: '2025-03-15T10:30:45Z',
            lastUsed: '2025-04-03T14:22:10Z'
          }
        ])
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      console.error('Error fetching API keys:', error)
      setIsLoading(false)
    }
  }
  
  // Generate new API key
  const generateApiKey = async () => {
    setIsGenerating(true)
    try {
      // In a real implementation, this would call your API
      // For now, we'll simulate generating a key
      setTimeout(() => {
        const newKey = 'pk_test_' + Array.from({length: 30}, () => 
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'[
            Math.floor(Math.random() * 62)
          ]
        ).join('')
        
        setApiKeys([
          {
            key: newKey,
            created: new Date().toISOString(),
            lastUsed: null
          },
          ...apiKeys
        ])
        setIsGenerating(false)
      }, 1500)
    } catch (error) {
      console.error('Error generating API key:', error)
      setIsGenerating(false)
    }
  }
  
  // Copy API key to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        alert('API key copied to clipboard')
      })
      .catch(err => {
        console.error('Failed to copy API key:', err)
      })
  }
  
  // Format date for display
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never'
    const date = new Date(dateString)
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-crypto-white">API Keys</h1>
        <button
          onClick={generateApiKey}
          disabled={isGenerating}
          className="flex items-center px-4 py-2 bg-crypto-cyan text-crypto-blue rounded-md hover:bg-crypto-cyan/90 disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            'Generate New Key'
          )}
        </button>
      </div>
      
      {/* Info card */}
      <div className="glass-card p-6 mb-6 border border-crypto-cyan/20">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-crypto-cyan/10 rounded-full">
            <AlertCircle className="text-crypto-cyan" size={24} />
          </div>
          <div>
            <h3 className="text-lg font-medium text-crypto-white mb-1">API Key Security</h3>
            <p className="text-crypto-gray-light">
              Your API keys grant access to your payment gateway. Keep them secure and never share them publicly.
              If you suspect a key has been compromised, generate a new one immediately and revoke the old key.
            </p>
          </div>
        </div>
      </div>
      
      {isLoading ? (
        <div className="glass-card p-10 text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-crypto-cyan" />
          <p className="mt-4 text-crypto-gray-light">Loading API keys...</p>
        </div>
      ) : apiKeys.length === 0 ? (
        <div className="glass-card p-10 text-center">
          <div className="flex justify-center mb-4">
            <AlertCircle className="text-crypto-cyan" size={48} />
          </div>
          <h3 className="text-xl font-medium text-crypto-white mb-2">No API keys found</h3>
          <p className="text-crypto-gray-light mb-6">Generate your first API key to start integrating with the payment gateway.</p>
          <button
            onClick={generateApiKey}
            disabled={isGenerating}
            className="px-4 py-2 bg-crypto-cyan text-crypto-blue rounded-md hover:bg-crypto-cyan/90 transition-colors disabled:opacity-50"
          >
            {isGenerating ? 'Generating...' : 'Generate API Key'}
          </button>
        </div>
      ) : (
        <div className="glass-card">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/10">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-crypto-gray-light uppercase tracking-wider">
                    API Key
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-crypto-gray-light uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-crypto-gray-light uppercase tracking-wider">
                    Last Used
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-crypto-gray-light uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {apiKeys.map((apiKey, index) => (
                  <tr key={index} className="hover:bg-white/5">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-crypto-white">
                      {apiKey.key.substring(0, 8)}...{apiKey.key.substring(apiKey.key.length - 4)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-crypto-gray-light">
                      {formatDate(apiKey.created)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-crypto-gray-light">
                      {formatDate(apiKey.lastUsed)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-crypto-gray-light">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => copyToClipboard(apiKey.key)}
                          className="flex items-center text-crypto-cyan hover:underline"
                        >
                          <Copy className="mr-1 h-3 w-3" /> Copy
                        </button>
                        <button
                          className="text-red-400 hover:underline"
                        >
                          Revoke
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* Documentation card */}
      <div className="glass-card mt-6 p-6">
        <h3 className="text-lg font-medium text-crypto-white mb-4">API Usage Example</h3>
        <div className="bg-crypto-blue-dark p-4 rounded-md font-mono text-sm text-crypto-gray-light overflow-x-auto">
          <pre>{`// Create a payment
fetch('https://api.cryptopaymentgateway.com/payments', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    amount: '0.1',
    currency: 'ETH',
    chainId: 1,
    description: 'Payment for services'
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`}</pre>
        </div>
        <p className="mt-4 text-crypto-gray-light">
          For complete API documentation, visit the <a href="/dashboard/documentation" className="text-crypto-cyan hover:underline">Documentation</a> page.
        </p>
      </div>
    </div>
  )
}
