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

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Validate API key
    const apiKeyValidation = await validateApiKey(request)
    if (!apiKeyValidation.valid) {
      return NextResponse.json(
        { error: apiKeyValidation.error },
        { status: apiKeyValidation.status as number }
      )
    }
    
    // Find the transaction by ID
    const transaction = await prisma.transaction.findUnique({
      where: {
        id: params.id,
      },
      include: {
        merchant: true
      }
    })

    if (!transaction) {
      return NextResponse.json(
        { error: 'Payment not found' },
        { status: 404 }
      )
    }

    // Format the response according to the API documentation
    const response = {
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
      walletAddress: transaction.walletAddress,
      explorerUrl: transaction.txHash 
        ? getExplorerTxUrl(transaction.chainId, transaction.txHash)
        : null
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Get payment error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
