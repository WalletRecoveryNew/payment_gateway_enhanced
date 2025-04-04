import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { getExplorerTxUrl } from '@/lib/config/chains'

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
    const paymentId = searchParams.get('paymentId')
    const status = searchParams.get('status')
    const limit = Number(searchParams.get('limit') || 10)
    const page = Number(searchParams.get('page') || 1)
    
    // Calculate offset
    const skip = (page - 1) * limit
    
    // Build query filter
    const filter: any = {}
    
    if (paymentId) {
      filter.paymentId = paymentId
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
      paymentId: tx.paymentId || tx.id, // In some cases, the payment ID might be the same as the transaction ID
      amount: tx.amount,
      currency: tx.currency,
      chainId: tx.chainId,
      status: tx.status,
      txHash: tx.txHash,
      walletAddress: tx.walletAddress,
      createdAt: tx.createdAt,
      updatedAt: tx.updatedAt,
      explorerUrl: tx.txHash 
        ? getExplorerTxUrl(tx.chainId, tx.txHash)
        : null
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
    console.error('Get transactions error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
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
    if (!body.paymentId || !body.txHash) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Find the payment
    const payment = await prisma.transaction.findUnique({
      where: {
        id: body.paymentId,
      }
    })
    
    if (!payment) {
      return NextResponse.json(
        { error: 'Payment not found' },
        { status: 404 }
      )
    }
    
    // Create a transaction record linked to the payment
    const transaction = await prisma.transaction.create({
      data: {
        paymentId: body.paymentId,
        txHash: body.txHash,
        amount: payment.amount,
        currency: payment.currency,
        chainId: payment.chainId,
        status: 'PENDING',
        walletAddress: payment.walletAddress,
        merchantId: payment.merchantId,
        userId: payment.userId,
      },
    })
    
    // Format the response
    const response = {
      id: transaction.id,
      paymentId: transaction.paymentId,
      amount: transaction.amount,
      currency: transaction.currency,
      chainId: transaction.chainId,
      status: transaction.status,
      txHash: transaction.txHash,
      walletAddress: transaction.walletAddress,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt,
      explorerUrl: getExplorerTxUrl(transaction.chainId, transaction.txHash)
    }
    
    return NextResponse.json(response)
  } catch (error) {
    console.error('Transaction creation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
