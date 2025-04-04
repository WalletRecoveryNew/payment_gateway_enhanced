import { PrismaClient, KYCStatus, TransactionStatus } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    // Create test user
    const user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        name: 'Test User',
        walletAddress: '0x' + Math.random().toString(36).substring(7),
      },
    })

    console.log('Created test user:', user)

    // Create test merchant
    const merchant = await prisma.merchant.create({
      data: {
        userId: user.id,
        apiKey: 'test_key_' + Math.random().toString(36).substring(7),
        webhookUrl: 'https://webhook.site/your-test-url',
      },
    })

    console.log('Created test merchant:', merchant)

    // Create test transactions
    const transactions = await Promise.all(
      Array.from({ length: 5 }).map((_, i) =>
        prisma.transaction.create({
          data: {
            merchantId: merchant.id,
            userId: user.id,
            amount: ((i + 1) * 100).toString(),
            currency: i % 2 === 0 ? 'USDT' : 'USDC',
            chainId: i % 2 === 0 ? 1 : 56,
            status: TransactionStatus.COMPLETED,
            txHash: '0x' + Math.random().toString(36).substring(7),
          },
        })
      )
    )

    console.log(`Created ${transactions.length} test transactions`)
  } catch (error) {
    console.error('Seeding error:', error)
    throw error
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 