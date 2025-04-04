import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { chainNameMap, SOLANA_CHAIN_ID, TRON_CHAIN_ID } from '@/lib/config/chains'

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
    if (!body.amount || !body.currency || !body.chainId) {
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
    
    // Create a new transaction with all supported fields
    const transaction = await prisma.transaction.create({
      data: {
        merchantId: merchant.id,
        userId: merchant.userId,
        amount: body.amount,
        currency: body.currency,
        chainId: body.chainId,
        status: 'PENDING',
        description: body.description || '',
        metadata: body.metadata || {},
        // Store redirect URLs if provided
        redirectUrl: body.redirectUrl,
        cancelUrl: body.cancelUrl,
      },
    })
    
    // Generate a payment address based on the blockchain
    let paymentAddress = '';
    
    if (body.chainId === SOLANA_CHAIN_ID) {
      // Solana address format
      paymentAddress = generateSolanaAddress();
    } else if (body.chainId === TRON_CHAIN_ID) {
      // Tron address format
      paymentAddress = generateTronAddress();
    } else {
      // EVM address format
      paymentAddress = generateEvmAddress();
    }
    
    // Update the transaction with the wallet address
    await prisma.transaction.update({
      where: { id: transaction.id },
      data: { walletAddress: paymentAddress }
    });
    
    // Format the response according to the API documentation
    return NextResponse.json({
      id: transaction.id,
      amount: transaction.amount,
      currency: transaction.currency,
      chainId: transaction.chainId,
      description: transaction.description || '',
      status: transaction.status,
      paymentUrl: `https://cryptoflow.com/payment/${transaction.id}`,
      createdAt: transaction.createdAt,
      expiresAt: new Date(transaction.createdAt.getTime() + 60 * 60 * 1000), // 1 hour expiry
      metadata: transaction.metadata || {},
      walletAddress: paymentAddress,
    })
  } catch (error) {
    console.error('Payment creation error:', error)
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
    const merchantId = searchParams.get('merchantId')
    const status = searchParams.get('status')
    const limit = Number(searchParams.get('limit') || 10)
    const page = Number(searchParams.get('page') || 1)
    
    // Calculate offset
    const skip = (page - 1) * limit
    
    // Build query filter
    const filter: any = {}
    
    if (merchantId) {
      filter.merchantId = merchantId
    }
    
    if (status) {
      filter.status = status
    }
    
    // Get transactions
    const transactions = await prisma.transaction.findMany({
      where: filter,
      take: limit,
      skip: skip,
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    // Get total count for pagination
    const total = await prisma.transaction.count({
      where: filter
    })
    
    // Format the response according to the API documentation
    const formattedTransactions = transactions.map((tx: any) => ({
      id: tx.id,
      amount: tx.amount,
      currency: tx.currency,
      chainId: tx.chainId,
      description: tx.description || '',
      status: tx.status,
      paymentUrl: `https://cryptoflow.com/payment/${tx.id}`,
      createdAt: tx.createdAt,
      expiresAt: new Date(tx.createdAt.getTime() + 60 * 60 * 1000), // 1 hour expiry
      metadata: tx.metadata || {},
      walletAddress: tx.walletAddress,
    }));
    
    return NextResponse.json({
      data: formattedTransactions,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Get payments error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Helper functions to generate addresses for different blockchains
function generateEvmAddress(): string {
  // In a real implementation, this would generate a secure Ethereum address
  // For demo purposes, we'll return a static address
  return '0x' + Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('');
}

function generateSolanaAddress(): string {
  // In a real implementation, this would generate a secure Solana address
  // For demo purposes, we'll return a static address
  return Array(44).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('');
}

function generateTronAddress(): string {
  // In a real implementation, this would generate a secure Tron address
  // For demo purposes, we'll return a static address
  return 'T' + Array(33).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('');
}
