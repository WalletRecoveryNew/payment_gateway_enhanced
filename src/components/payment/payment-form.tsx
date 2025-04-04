'use client'

import { useState, useEffect } from 'react'
import { Loader2, Bitcoin, Diamond, DollarSign } from 'lucide-react'
import { useWallet } from '@/lib/wallet/providers'
import { chainNameMap } from '@/lib/config/chains'
import '../design-system.css'

export function PaymentForm() {
  const { isConnected, address, chainId, isSolana, solanaAddress } = useWallet()
  
  const [amount, setAmount] = useState('')
  const [currency, setCurrency] = useState('BTC')
  const [selectedChainId, setSelectedChainId] = useState(1) // Default to Ethereum
  const [description, setDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [paymentAddress, setPaymentAddress] = useState('')
  const [paymentStatus, setPaymentStatus] = useState('')
  
  // Check if wallet is connected
  const walletConnected = isConnected || isSolana
  const walletAddress = address || solanaAddress
  
  const handleSubmit = async (e) => {
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
      
      // In a real implementation, we would now monitor the blockchain for the payment
      // For now, we'll simulate a successful payment after a delay
      setTimeout(() => {
        setPaymentStatus('COMPLETED')
        setIsLoading(false)
      }, 3000)
    } catch (error) {
      console.error('Error processing payment:', error)
      setPaymentStatus('FAILED')
      setIsLoading(false)
    }
  }
  
  const renderCurrencyIcon = () => {
    switch (currency) {
      case 'BTC':
        return <Bitcoin className="h-5 w-5 text-amber-500" />
      case 'ETH':
        return <Diamond className="h-5 w-5 text-indigo-400" />
      case 'USDT':
      case 'USDC':
        return <DollarSign className="h-5 w-5 text-green-400" />
      case 'SOL':
        return <svg className="h-5 w-5 text-purple-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 12.75l6 3.25L18 12.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M6 8l6 3.25L18 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M6 16.75l6 3.25 6-3.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      default:
        return null
    }
  }
  
  return (
    <div className="glass-card p-8 border border-white/20 rounded-xl shadow-xl">
      <h2 className="heading-4 mb-6">Make a Payment</h2>
      
      {paymentStatus === 'COMPLETED' ? (
        <div className="text-center p-6 animate-float">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="mb-4 text-green-500 text-xl font-semibold">Payment Completed!</div>
          <p className="text-crypto-gray-light mb-6">
            Your transaction has been confirmed on the blockchain.
            <br />Transaction ID: <span className="text-crypto-white font-mono">0x8f7d3e2a6e9c5b7a4d2a9f8c</span>
          </p>
          <button
            onClick={() => {
              setPaymentStatus('')
              setPaymentAddress('')
            }}
            className="action-button"
          >
            Make Another Payment
          </button>
        </div>
      ) : paymentStatus === 'PENDING' ? (
        <div className="text-center p-6">
          <div className="mb-4 text-crypto-cyan text-xl font-semibold">Payment Pending</div>
          <div className="w-16 h-16 mx-auto mb-4 relative">
            <div className="absolute inset-0 rounded-full border-4 border-crypto-cyan/30"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-crypto-cyan animate-spin"></div>
          </div>
          <p className="text-crypto-gray-light mb-4">
            Please send {amount} {currency} to:
          </p>
          <div className="bg-crypto-blue-dark p-4 rounded-md mb-6 font-mono text-crypto-white break-all border border-white/10">
            {paymentAddress}
            <button className="ml-2 text-crypto-cyan hover:text-crypto-cyan/80 transition-colors" onClick={() => navigator.clipboard.writeText(paymentAddress)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
          <p className="text-crypto-gray-light text-sm">
            Waiting for blockchain confirmation. This may take a few minutes.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="form-label">
              Amount
            </label>
            <div className="flex gap-4">
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="form-input"
                required
              />
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="form-select w-40"
              >
                <option value="BTC">Bitcoin (BTC)</option>
                <option value="ETH">Ethereum (ETH)</option>
                <option value="USDT">Tether (USDT)</option>
                <option value="USDC">USD Coin (USDC)</option>
                <option value="SOL">Solana (SOL)</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="form-label">
              Description (optional)
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Payment for services"
              className="form-input"
            />
          </div>
          
          <div>
            <label className="form-label">
              Network
            </label>
            <select
              value={selectedChainId}
              onChange={(e) => setSelectedChainId(Number(e.target.value))}
              className="form-select"
            >
              <option value="1">Ethereum Mainnet</option>
              <option value="56">Binance Smart Chain</option>
              <option value="137">Polygon</option>
              <option value="10">Optimism</option>
              <option value="42161">Arbitrum</option>
              <option value="728126428">Tron</option>
              <option value="501">Solana</option>
            </select>
          </div>
          
          <div className="mb-4">
            {!walletConnected && (
              <div className="text-amber-400 text-sm mb-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Please connect your wallet to continue
              </div>
            )}
            <div className="w-full max-w-xs">
              <ConnectButton />
            </div>
          </div>
          
          <div className="flex justify-between items-center pt-4 border-t border-white/10">
            <div className="text-xs text-crypto-gray-light">
              Transaction fees will apply based on network conditions
            </div>
            <button
              type="submit"
              disabled={isLoading || amount === '' || !walletConnected}
              className="action-button disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  {renderCurrencyIcon()}
                  <span className="ml-2">Pay Now</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

// Import at the top was causing circular dependency, so importing here
import { ConnectButton } from '../wallet/connect-button'
