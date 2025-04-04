import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import crypto from 'crypto'

// Middleware to validate API key
async function validateApiKey(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { 
      valid: false, 
      error: 'Missing or invalid API key',
      status: 401 as const
    }
  }
  
  const apiKey = authHeader.split(' ')[1]
  
  if (!apiKey) {
    return {
      valid: false,
      error: 'Missing API key',
      status: 401 as const
    }
  }
  
  // Validate API key format
  if (!apiKey.startsWith('pk_live_') && !apiKey.startsWith('pk_test_')) {
    return { 
      valid: false, 
      error: 'Invalid API key format',
      status: 401 as const
    }
  }
  
  // In a production environment, you would validate against stored API keys
  // For now, we'll just check if it's a valid format
  return { valid: true, isTest: apiKey.startsWith('pk_test_') }
}

export async function POST(request: NextRequest) {
  try {
    // Validate API key
    const apiKeyValidation = await validateApiKey(request)
    if (!apiKeyValidation.valid) {
      return NextResponse.json(
        { error: apiKeyValidation.error },
        { status: apiKeyValidation.status as number }
      )
    }
    
    const body = await request.json()
    
    // Validate request body
    if (!body.url || !body.events || !Array.isArray(body.events) || body.events.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // For simplicity, let's get the first merchant from the database
    const merchant = await prisma.merchant.findFirst({
      include: { user: true }
    })
    
    if (!merchant) {
      return NextResponse.json(
        { error: 'Merchant not found' },
        { status: 404 }
      )
    }
    
    // Generate a webhook secret
    const webhookSecret = crypto.randomBytes(32).toString('hex')
    
    // Create a new webhook
    const webhook = await prisma.webhook.create({
      data: {
        merchantId: merchant.id,
        url: body.url,
        events: body.events,
        secret: webhookSecret,
        isActive: true,
      },
    })
    
    return NextResponse.json({
      id: webhook.id,
      url: webhook.url,
      events: webhook.events,
      createdAt: webhook.createdAt,
      isActive: webhook.isActive,
      secret: webhookSecret, // Only show the secret once upon creation
    })
  } catch (error) {
    console.error('Webhook creation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Validate API key
    const apiKeyValidation = await validateApiKey(request)
    if (!apiKeyValidation.valid) {
      return NextResponse.json(
        { error: apiKeyValidation.error },
        { status: apiKeyValidation.status as number }
      )
    }
    
    // For simplicity, let's get the first merchant from the database
    const merchant = await prisma.merchant.findFirst()
    
    if (!merchant) {
      return NextResponse.json(
        { error: 'Merchant not found' },
        { status: 404 }
      )
    }
    
    // Get webhooks for the merchant
    const webhooks = await prisma.webhook.findMany({
      where: {
        merchantId: merchant.id,
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    // Format the response (don't include secrets in the response)
    const formattedWebhooks = webhooks.map((webhook: any) => ({
      id: webhook.id,
      url: webhook.url,
      events: webhook.events,
      createdAt: webhook.createdAt,
      isActive: webhook.isActive,
    }))
    
    return NextResponse.json({
      data: formattedWebhooks
    })
  } catch (error) {
    console.error('Get webhooks error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
