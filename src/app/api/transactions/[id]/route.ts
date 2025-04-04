import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { getExplorerTxUrl } from '@/lib/config/chains'
import { sendWebhookNotifications } from '@/lib/webhook/sender'

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log(`GET request for transaction ${params.id}`)

  try {
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
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    
    // Find the transaction
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
    
    // Update the transaction
    const updatedTransaction = await prisma.transaction.update({
      where: {
        id: params.id,
      },
      data: {
        status: body.status || transaction.status,
        txHash: body.txHash || transaction.txHash,
      },
    })
    
    // Get active webhooks for the merchant
    const webhooks = await prisma.webhook.findMany({
      where: {
        merchantId: transaction.merchantId,
        isActive: true
      }
    })
    
    // Determine the event type based on the status
    let eventType = 'transaction.updated'
    if (body.status) {
      switch (body.status) {
        case 'COMPLETED':
          eventType = 'payment.completed'
          break
        case 'FAILED':
          eventType = 'payment.failed'
          break
        case 'PROCESSING':
          eventType = 'payment.processing'
          break
      }
    }
    
    // Format the response with explorer URL
    const response = {
      ...updatedTransaction,
      explorerUrl: updatedTransaction.txHash 
        ? getExplorerTxUrl(updatedTransaction.chainId, updatedTransaction.txHash)
        : null
    }
    
    // Send webhook notifications if there are active webhooks
    if (webhooks.length > 0) {
      try {
        await sendWebhookNotifications(
          webhooks.map((webhook: any) => ({
            url: webhook.url,
            secret: webhook.secret,
            events: webhook.events as string[]
          })),
          eventType,
          response
        )
      } catch (error) {
        console.error('Failed to send webhook notifications:', error)
        // Continue even if webhook sending fails
      }
    }
    
    return NextResponse.json(response)
  } catch (error) {
    console.error('Update transaction error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
