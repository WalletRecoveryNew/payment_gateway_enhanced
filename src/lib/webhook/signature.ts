import crypto from 'crypto';

/**
 * Generate a signature for a webhook payload
 * 
 * @param payload The webhook payload to sign
 * @param timestamp The current timestamp
 * @param secret The webhook secret key
 * @returns The generated signature
 */
export function generateWebhookSignature(
  payload: any,
  timestamp: string,
  secret: string
): string {
  const hmac = crypto.createHmac('sha256', secret);
  const data = timestamp + '.' + JSON.stringify(payload);
  return hmac.update(data).digest('hex');
}

/**
 * Verify a webhook signature
 * 
 * @param payload The webhook payload
 * @param signature The signature to verify
 * @param timestamp The timestamp used to generate the signature
 * @param secret The webhook secret key
 * @returns Whether the signature is valid
 */
export function verifyWebhookSignature(
  payload: any,
  signature: string,
  timestamp: string,
  secret: string
): boolean {
  try {
    const expectedSignature = generateWebhookSignature(payload, timestamp, secret);
    
    // Use timing-safe comparison to prevent timing attacks
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  } catch (error) {
    console.error('Error verifying webhook signature:', error);
    return false;
  }
}

/**
 * Generate a new webhook secret
 * 
 * @returns A random string to use as a webhook secret
 */
export function generateWebhookSecret(): string {
  return crypto.randomBytes(32).toString('hex');
}
