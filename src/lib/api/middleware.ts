/**
 * API Middleware
 * 
 * This middleware handles API authentication and request validation.
 */

import { NextRequest, NextResponse } from 'next/server';
import { testApiMiddleware } from './test-middleware';
import { isTestMode } from './test-mode-handler';
import prisma from '../db/prisma';

/**
 * Validate API key
 * 
 * @param req - Next.js request
 * @returns Next.js response or undefined to continue
 */
export async function validateApiKey(req: NextRequest): Promise<NextResponse | undefined> {
  // First check if this is a test API key
  const testResponse = await testApiMiddleware(req);
  if (testResponse) {
    return testResponse;
  }
  
  // Get API key from Authorization header
  const authHeader = req.headers.get('Authorization');
  if (!authHeader) {
    return NextResponse.json(
      { error: 'Missing API key' },
      { status: 401 }
    );
  }
  
  const apiKey = authHeader.replace('Bearer ', '');
  
  // Skip API key validation in test mode
  if (isTestMode(req)) {
    return undefined;
  }
  
  // Validate API key
  try {
    const apiKeyRecord = await prisma.apiKey.findUnique({
      where: { key: apiKey },
      include: { merchant: true }
    });
    
    if (!apiKeyRecord) {
      return NextResponse.json(
        { error: 'Invalid API key' },
        { status: 401 }
      );
    }
    
    if (apiKeyRecord.expiresAt && apiKeyRecord.expiresAt < new Date()) {
      return NextResponse.json(
        { error: 'Expired API key' },
        { status: 401 }
      );
    }
    
    if (!apiKeyRecord.isActive) {
      return NextResponse.json(
        { error: 'Inactive API key' },
        { status: 401 }
      );
    }
    
    // Add merchant ID to request headers
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('X-Merchant-ID', apiKeyRecord.merchantId);
    
    // Create a new request with the modified headers
    const newRequest = new NextRequest(req.url, {
      method: req.method,
      headers: requestHeaders,
      body: req.body,
      redirect: req.redirect,
      signal: req.signal,
    });
    
    return undefined; // Continue to the next middleware with the modified request
  } catch (error) {
    console.error('Error validating API key:', error);
    
    return NextResponse.json(
      { error: 'Error validating API key' },
      { status: 500 }
    );
  }
}
