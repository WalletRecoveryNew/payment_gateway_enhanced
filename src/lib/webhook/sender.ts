import { generateWebhookSignature } from './signature';

/**
 * Send a webhook notification to the specified URL
 * 
 * @param webhookUrl The URL to send the webhook to
 * @param webhookSecret The secret used to sign the webhook
 * @param payload The payload to send
 * @returns The response from the webhook endpoint
 */
export async function sendWebhookNotification(
  webhookUrl: string,
  webhookSecret: string,
  payload: any
): Promise<Response> {
  // Generate timestamp for the webhook
  const timestamp = Date.now().toString();
  
  // Generate signature
  const signature = generateWebhookSignature(payload, timestamp, webhookSecret);
  
  // Prepare headers
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-Webhook-Signature': signature,
    'X-Webhook-Timestamp': timestamp
  };
  
  try {
    // Send the webhook
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
    });
    
    // Log the result
    if (!response.ok) {
      console.error(`Webhook to ${webhookUrl} failed with status ${response.status}`);
    } else {
      console.log(`Webhook to ${webhookUrl} sent successfully`);
    }
    
    return response;
  } catch (error) {
    console.error('Webhook notification failed:', error);
    throw error;
  }
}

/**
 * Send a webhook notification to multiple URLs
 * 
 * @param webhooks Array of webhook configurations
 * @param eventType The type of event
 * @param payload The payload to send
 * @returns Array of responses from the webhook endpoints
 */
export async function sendWebhookNotifications(
  webhooks: Array<{ url: string; secret: string; events: string[] }>,
  eventType: string,
  payload: any
): Promise<Response[]> {
  // Filter webhooks that are subscribed to this event type
  const relevantWebhooks = webhooks.filter(webhook => 
    webhook.events.includes(eventType) || webhook.events.includes('*')
  );
  
  if (relevantWebhooks.length === 0) {
    console.log(`No webhooks found for event type: ${eventType}`);
    return [];
  }
  
  // Format the webhook payload
  const webhookPayload = {
    id: `evt_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`,
    type: eventType,
    created: new Date().toISOString(),
    data: payload
  };
  
  // Send to all relevant webhooks
  const promises = relevantWebhooks.map(webhook => 
    sendWebhookNotification(webhook.url, webhook.secret, webhookPayload)
  );
  
  return Promise.all(promises);
}
