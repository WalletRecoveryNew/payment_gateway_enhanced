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
    
    // Find the wallet by ID
    const wallet = await prisma.wallet.findUnique({
      where: {
        id: params.id,
      }
    })

    if (!wallet) {
      return NextResponse.json(
        { error: 'Wallet not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      id: wallet.id,
      name: wallet.name,
      address: wallet.address,
      chainId: wallet.chainId,
      currency: wallet.currency,
      isActive: wallet.isActive,
      createdAt: wallet.createdAt,
      updatedAt: wallet.updatedAt
    })
  } catch (error) {
    console.error('Get wallet error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PATCH(
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
    
    const body = await request.json()
    
    // Find the wallet first to make sure it exists
    const existingWallet = await prisma.wallet.findUnique({
      where: {
        id: params.id,
      }
    })

    if (!existingWallet) {
      return NextResponse.json(
        { error: 'Wallet not found' },
        { status: 404 }
      )
    }
    
    // Validate chain ID if provided
    if (body.chainId && !chainNameMap[body.chainId]) {
      return NextResponse.json(
        { error: 'Unsupported blockchain network' },
        { status: 400 }
      )
    }
    
    // Update the wallet
    const updateData: any = {}
    
    if (body.name !== undefined) updateData.name = body.name
    if (body.address !== undefined) updateData.address = body.address
    if (body.chainId !== undefined) updateData.chainId = body.chainId
    if (body.currency !== undefined) updateData.currency = body.currency
    if (body.isActive !== undefined) updateData.isActive = body.isActive
    
    // Only update if there are fields to update
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: 'No valid fields to update' },
        { status: 400 }
      )
    }
    
    const updatedWallet = await prisma.wallet.update({
      where: {
        id: params.id,
      },
      data: updateData,
    })
    
    return NextResponse.json({
      id: updatedWallet.id,
      name: updatedWallet.name,
      address: updatedWallet.address,
      chainId: updatedWallet.chainId,
      currency: updatedWallet.currency,
      isActive: updatedWallet.isActive,
      createdAt: updatedWallet.createdAt,
      updatedAt: updatedWallet.updatedAt
    })
  } catch (error) {
    console.error('Update wallet error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
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
    
    // Find the wallet first to make sure it exists
    const existingWallet = await prisma.wallet.findUnique({
      where: {
        id: params.id,
      }
    })

    if (!existingWallet) {
      return NextResponse.json(
        { error: 'Wallet not found' },
        { status: 404 }
      )
    }
    
    // Check if the wallet is associated with any transactions
    const transactionCount = await prisma.transaction.count({
      where: {
        walletAddress: existingWallet.address
      }
    })
    
    if (transactionCount > 0) {
      // Instead of deleting, just mark as inactive if there are transactions
      const deactivatedWallet = await prisma.wallet.update({
        where: {
          id: params.id,
        },
        data: {
          isActive: false
        }
      })
      
      return NextResponse.json({
        message: 'Wallet deactivated (has associated transactions)',
        id: deactivatedWallet.id,
        isActive: deactivatedWallet.isActive
      })
    }
    
    // Delete the wallet if no transactions are associated
    await prisma.wallet.delete({
      where: {
        id: params.id,
      }
    })
    
    return NextResponse.json({
      message: 'Wallet deleted successfully'
    })
  } catch (error) {
    console.error('Delete wallet error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
