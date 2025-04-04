'use client'

import React, { FormEvent, useState } from 'react'
import { Loader2 } from 'lucide-react'
import { useWallet } from '@/lib/wallet/providers'
import '../../app/design-system.css'

export function PaymentForm() {
  const { isConnected, address, connect, disconnect, isSolana, solanaAddress } = useWallet()
  
  const SOLANA_CHAIN_ID: string = '501';
  
  const [amount, setAmount] = useState('')
  const [currency] = useState('SOL')
  const [selectedChainId] = useState(SOLANA_CHAIN_ID)
  const [description, setDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [paymentAddress, setPaymentAddress] = useState('')
  const [paymentStatus, setPaymentStatus] = useState('')
  
  // Check if wallet is connected
  const walletConnected = isConnected
  const walletAddress = isSolana ? solanaAddress : address
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // Create payment request
      const response = await fetch('/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          currency,
          chainId: selectedChainId,
          description,
          walletAddress,
        }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to create payment')
      }
      
      const data = await response.json()
      
      setPaymentAddress(data.paymentAddress)
      setPaymentStatus('PENDING')
      
    } catch (error) {
      console.error('Payment error:', error)
      setPaymentStatus('ERROR')
    } finally {
      setIsLoading(false)
    }
  }

  const handleConnect = async () => {
    try {
      await connect()
    } catch (error) {
      console.error('Connection error:', error)
    }
  }

  const handleDisconnect = async () => {
    try {
      await disconnect()
    } catch (error) {
      console.error('Disconnection error:', error)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-crypto-cyan mb-2">Make a Payment</h2>
        <p className="text-crypto-gray-light">Send cryptocurrency to your wallet</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {!walletConnected ? (
          <div className="text-center">
            <button
              onClick={handleConnect}
              className="cta-button"
            >
              Connect Wallet
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              <div>
                <label className="block text-crypto-gray-light mb-2">
                  Amount
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full p-4 rounded-lg bg-crypto-blue-dark/10 border border-crypto-blue-dark/20 text-crypto-white focus:outline-none focus:ring-2 focus:ring-crypto-cyan"
                    placeholder="0.00"
                    required
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-crypto-cyan">
                    {currency}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-crypto-gray-light mb-2">
                  Description
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-4 rounded-lg bg-crypto-blue-dark/10 border border-crypto-blue-dark/20 text-crypto-white focus:outline-none focus:ring-2 focus:ring-crypto-cyan"
                  placeholder="Payment description"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full cta-button"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2" />
                  Processing Payment
                </>
              ) : (
                'Send Payment'
              )}
            </button>

            <button
              onClick={handleDisconnect}
              className="w-full secondary-button mt-4"
            >
              Disconnect Wallet
            </button>
          </>
        )}
      </form>

      {paymentAddress && (
        <div className="mt-8 p-6 rounded-lg bg-crypto-blue-dark/10 border border-crypto-blue-dark/20">
          <h3 className="text-xl font-bold text-crypto-cyan mb-4">
            Payment Details
          </h3>
          <div className="space-y-4">
            <div>
              <span className="block text-crypto-gray-light mb-2">
                Payment Address:
              </span>
              <div className="flex items-center">
                <span className="text-crypto-white truncate">
                  {paymentAddress}
                </span>
              </div>
            </div>
            <div>
              <span className="block text-crypto-gray-light mb-2">
                Status:
              </span>
              <span className={`px-3 py-1 rounded-full ${
                paymentStatus === 'PENDING' 
                  ? 'bg-crypto-cyan/10 text-crypto-cyan' 
                  : paymentStatus === 'ERROR' 
                    ? 'bg-red-500/10 text-red-500' 
                    : 'bg-green-500/10 text-green-500'
              }`}>
                {paymentStatus}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
