'use client'

import { useState, useEffect } from 'react'
import { Loader2, AlertCircle, Save } from 'lucide-react'

export default function WebhooksPage() {
  const [webhookUrl, setWebhookUrl] = useState('')
  const [webhookKey, setWebhookKey] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [events, setEvents] = useState<string[]>([
    'payment.created',
    'payment.completed',
    'payment.failed'
  ])
  const [selectedEvents, setSelectedEvents] = useState<string[]>([])
  
  // Fetch webhook settings on component mount
  useEffect(() => {
    fetchWebhookSettings()
  }, [])
  
  // Fetch webhook settings from API
  const fetchWebhookSettings = async () => {
    setIsLoading(true)
    try {
      // In a real implementation, this would fetch from your API
      // For now, we'll use mock data
      setTimeout(() => {
        setWebhookUrl('https://example.com/webhooks/crypto')
        setWebhookKey('whsec_12345abcdef67890')
        setSelectedEvents(['payment.created', 'payment.completed'])
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      console.error('Error fetching webhook settings:', error)
      setIsLoading(false)
    }
  }
  
  // Save webhook settings
  const saveWebhookSettings = async () => {
    setIsSaving(true)
    try {
      // In a real implementation, this would call your API
      // For now, we'll simulate saving
      setTimeout(() => {
        // Simulate successful save
        setIsSaving(false)
        alert('Webhook settings saved successfully')
      }, 1500)
    } catch (error) {
      console.error('Error saving webhook settings:', error)
      setIsSaving(false)
    }
  }
  
  // Toggle event selection
  const toggleEvent = (event: string) => {
    if (selectedEvents.includes(event)) {
      setSelectedEvents(selectedEvents.filter(e => e !== event))
    } else {
      setSelectedEvents([...selectedEvents, event])
    }
  }
  
  // Generate new webhook key
  const generateWebhookKey = () => {
    const newKey = 'whsec_' + Array.from({length: 24}, () => 
      'abcdefghijklmnopqrstuvwxyz0123456789'[
        Math.floor(Math.random() * 36)
      ]
    ).join('')
    
    setWebhookKey(newKey)
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-crypto-white">Webhooks</h1>
        <button
          onClick={saveWebhookSettings}
          disabled={isSaving || isLoading}
          className="flex items-center px-4 py-2 bg-crypto-cyan text-crypto-blue rounded-md hover:bg-crypto-cyan/90 disabled:opacity-50"
        >
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Settings
            </>
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
            <h3 className="text-lg font-medium text-crypto-white mb-1">About Webhooks</h3>
            <p className="text-crypto-gray-light">
              Webhooks allow your application to receive real-time updates about payment events.
              When an event occurs, we'll send a POST request to your webhook URL with details about the event.
              Use the webhook key to verify that the requests are coming from our service.
            </p>
          </div>
        </div>
      </div>
      
      {isLoading ? (
        <div className="glass-card p-10 text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-crypto-cyan" />
          <p className="mt-4 text-crypto-gray-light">Loading webhook settings...</p>
        </div>
      ) : (
        <div className="glass-card p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-crypto-white mb-2">
                Webhook URL
              </label>
              <input
                type="url"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder="https://example.com/webhooks/crypto"
                className="block w-full px-3 py-2 bg-crypto-blue-dark border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-crypto-cyan focus:border-crypto-cyan text-crypto-white"
              />
              <p className="mt-1 text-xs text-crypto-gray-light">
                The URL where we'll send webhook events
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-crypto-white mb-2">
                Webhook Key
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={webhookKey}
                  onChange={(e) => setWebhookKey(e.target.value)}
                  placeholder="whsec_..."
                  className="block w-full px-3 py-2 bg-crypto-blue-dark border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-crypto-cyan focus:border-crypto-cyan text-crypto-white font-mono"
                />
                <button
                  onClick={generateWebhookKey}
                  className="px-4 py-2 bg-white/10 text-crypto-white rounded-md hover:bg-white/20"
                >
                  Generate
                </button>
              </div>
              <p className="mt-1 text-xs text-crypto-gray-light">
                Used to verify webhook requests are coming from our service
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-crypto-white mb-2">
                Events to Send
              </label>
              <div className="space-y-2">
                {events.map((event) => (
                  <div key={event} className="flex items-center">
                    <input
                      type="checkbox"
                      id={event}
                      checked={selectedEvents.includes(event)}
                      onChange={() => toggleEvent(event)}
                      className="h-4 w-4 text-crypto-cyan focus:ring-crypto-cyan border-white/30 rounded bg-crypto-blue-dark"
                    />
                    <label htmlFor={event} className="ml-2 text-sm text-crypto-white">
                      {event}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Example payload card */}
      <div className="glass-card mt-6 p-6">
        <h3 className="text-lg font-medium text-crypto-white mb-4">Example Webhook Payload</h3>
        <div className="bg-crypto-blue-dark p-4 rounded-md font-mono text-sm text-crypto-gray-light overflow-x-auto">
          <pre>{`{
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
}`}</pre>
        </div>
      </div>
      
      {/* Verification code example */}
      <div className="glass-card mt-6 p-6">
        <h3 className="text-lg font-medium text-crypto-white mb-4">Verifying Webhooks</h3>
        <div className="bg-crypto-blue-dark p-4 rounded-md font-mono text-sm text-crypto-gray-light overflow-x-auto">
          <pre>{`// Node.js example
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
});`}</pre>
        </div>
      </div>
    </div>
  )
}
