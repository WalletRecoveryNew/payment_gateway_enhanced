import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { getExplorerTxUrl } from '@/lib/config/chains'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const transaction = await prisma.transaction.findUnique({
      where: {
        id: params.id,
      },
    })
    
    if (!transaction) {
      return NextResponse.json(
        { error: 'Transaction not found' },
        { status: 404 }
      )
    }
    
    // Add explorer URL to the response
    const response = {
      ...transaction,
      explorerUrl: transaction.txHash 
        ? getExplorerTxUrl(transaction.chainId, transaction.txHash)
        : null
    }
    
    return NextResponse.json(response)
  } catch (error) {
    console.error('Get transaction error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    
    // Validate transaction exists
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
        { error: 'Transaction not found' },
        { status: 404 }
      )
    }
    
    // In a real implementation, you would verify the request
    // is coming from an authorized source
    
    // Update transaction status and txHash if provided
    const updatedTransaction = await prisma.transaction.update({
      where: {
        id: params.id,
      },
      data: {
        status: body.status || transaction.status,
        txHash: body.txHash || transaction.txHash,
      },
    })
    
    // Send webhook notification if merchant has webhook URL configured
    if (transaction.merchant.webhookUrl && body.status && body.status !== transaction.status) {
      await sendWebhookNotification(
        transaction.merchant.webhookUrl,
        transaction.merchant.webhookKey,
        {
          id: updatedTransaction.id,
          status: updatedTransaction.status,
          txHash: updatedTransaction.txHash,
          amount: updatedTransaction.amount,
          currency: updatedTransaction.currency,
          chainId: updatedTransaction.chainId,
          updatedAt: updatedTransaction.updatedAt
        }
      )
    }
    
    return NextResponse.json(updatedTransaction)
  } catch (error) {
    console.error('Update transaction error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Helper function to send webhook notifications
async function sendWebhookNotification(
  webhookUrl: string,
  webhookKey: string | null,
  payload: any
) {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    }
    
    // Add webhook key as authorization if available
    if (webhookKey) {
      headers['Authorization'] = `Bearer ${webhookKey}`
    }
    
    // Add timestamp and signature for security
    const timestamp = Date.now().toString()
    headers['X-Webhook-Timestamp'] = timestamp
    
    // In a real implementation, you would sign the payload with a secret key
    // headers['X-Webhook-Signature'] = createSignature(payload, webhookKey, timestamp)
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
    })
    
    if (!response.ok) {
      console.error(`Webhook notification failed: ${response.status} ${response.statusText}`)
    }
    
    return response.ok
  } catch (error) {
    console.error('Webhook notification error:', error)
    return false
  }
}
