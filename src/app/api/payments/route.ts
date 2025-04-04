import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { chainNameMap, SOLANA_CHAIN_ID, TRON_CHAIN_ID } from '@/lib/config/chains'

export async function POST(request: Request) {
  try {
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
    
    // In a real implementation, you would verify the merchant's API key
    // and check if the merchant exists
    
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
    
    // Create a new transaction
    const transaction = await prisma.transaction.create({
      data: {
        merchantId: merchant.id,
        userId: merchant.userId,
        amount: body.amount,
        currency: body.currency,
        chainId: body.chainId,
        status: 'PENDING',
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
    
    // In a production environment, we would store this address and associate it with the transaction
    
    return NextResponse.json({
      id: transaction.id,
      status: transaction.status,
      paymentAddress,
      amount: transaction.amount,
      currency: transaction.currency,
      chainId: transaction.chainId,
      expiresAt: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes
    })
  } catch (error) {
    console.error('Payment creation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
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
      skip,
      orderBy: { createdAt: 'desc' },
    })
    
    // Get total count
    const total = await prisma.transaction.count({
      where: filter,
    })
    
    return NextResponse.json({
      transactions,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Get transactions error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Helper functions to generate addresses for different blockchains
function generateEvmAddress(): string {
  // In a real implementation, this would use a secure method to generate or derive addresses
  return '0x' + Array.from({length: 40}, () => 
    Math.floor(Math.random() * 16).toString(16)
  ).join('');
}

function generateSolanaAddress(): string {
  // In a real implementation, this would use Solana's key generation
  return Array.from({length: 44}, () => 
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'[
      Math.floor(Math.random() * 62)
    ]
  ).join('');
}

function generateTronAddress(): string {
  // In a real implementation, this would use Tron's key generation
  return 'T' + Array.from({length: 33}, () => 
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'[
      Math.floor(Math.random() * 62)
    ]
  ).join('');
}
