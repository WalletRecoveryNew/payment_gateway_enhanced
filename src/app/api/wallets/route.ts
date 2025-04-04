import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { chainNameMap } from '@/lib/config/chains'

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
    if (!body.name || !body.address || !body.chainId || !body.currency) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate chain ID
    if (!chainNameMap[body.chainId]) {
      return NextResponse.json(
        { error: 'Unsupported blockchain network' },
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
    
    // Create a new wallet
    const wallet = await prisma.wallet.create({
      data: {
        merchantId: merchant.id,
        userId: merchant.userId,
        name: body.name,
        address: body.address,
        chainId: body.chainId,
        currency: body.currency,
        isActive: true,
      },
    })
    
    return NextResponse.json({
      id: wallet.id,
      name: wallet.name,
      address: wallet.address,
      chainId: wallet.chainId,
      currency: wallet.currency,
      isActive: wallet.isActive,
      createdAt: wallet.createdAt
    })
  } catch (error) {
    console.error('Wallet creation error:', error)
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
    
    // Get query parameters
    const { searchParams } = new URL(request.url)
    const chainId = searchParams.get('chainId') ? Number(searchParams.get('chainId')) : undefined
    const currency = searchParams.get('currency')
    const isActive = searchParams.get('isActive') === 'true' ? true : 
                    searchParams.get('isActive') === 'false' ? false : undefined
    const limit = Number(searchParams.get('limit') || 10)
    const page = Number(searchParams.get('page') || 1)
    
    // Calculate offset
    const skip = (page - 1) * limit
    
    // Build query filter
    const filter: any = {}
    
    if (chainId !== undefined) {
      filter.chainId = chainId
    }
    
    if (currency) {
      filter.currency = currency
    }
    
    if (isActive !== undefined) {
      filter.isActive = isActive
    }
    
    // For simplicity, let's get the first merchant from the database
    const merchant = await prisma.merchant.findFirst()
    
    if (!merchant) {
      return NextResponse.json(
        { error: 'Merchant not found' },
        { status: 404 }
      )
    }
    
    // Add merchant filter
    filter.merchantId = merchant.id
    
    // Get wallets
    const wallets = await prisma.wallet.findMany({
      where: filter,
      take: limit,
      skip: skip,
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    // Get total count for pagination
    const total = await prisma.wallet.count({
      where: filter
    })
    
    return NextResponse.json({
      data: wallets,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Get wallets error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
