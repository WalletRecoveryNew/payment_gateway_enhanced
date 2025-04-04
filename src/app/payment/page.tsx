'use client'

import { Shield, ArrowLeft, Bitcoin, Ethereum, CreditCard, DollarSign } from 'lucide-react'
import Link from 'next/link'
import { PaymentForm } from '@/components/payment/payment-form'
import '../design-system.css'

export default function PaymentPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-crypto-blue-dark to-crypto-blue">
      {/* Header */}
      <header className="border-b border-white/10 py-6 backdrop-blur-md bg-crypto-blue-dark/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-white">
            <span className="text-crypto-cyan">Crypto</span>Flow
          </Link>
          <Link href="/" className="text-crypto-gray-light hover:text-crypto-white flex items-center gap-2 transition-colors duration-200">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-float">
            <div className="badge mb-4">Secure Transaction</div>
            <h1 className="heading-2 mb-3">
              Complete Your <span className="text-crypto-cyan">Crypto Payment</span>
            </h1>
            <p className="subtitle max-w-2xl mx-auto">
              Fast, secure, and reliable cryptocurrency payments across multiple blockchains
            </p>
          </div>
          
          <div className="max-w-xl mx-auto">
            <PaymentForm />
            
            <div className="glass-card p-8 mt-8 rounded-xl border border-white/20 shadow-xl">
              <div className="flex items-start gap-4 mb-6">
                <Shield className="h-6 w-6 text-crypto-cyan flex-shrink-0 mt-1 animate-pulse-slow" />
                <div>
                  <h2 className="text-xl font-semibold text-crypto-white mb-2">Secure Payment Process</h2>
                  <p className="text-crypto-gray-light text-sm mb-4">
                    Your transaction is protected with industry-leading security protocols and encryption
                  </p>
                </div>
              </div>
              
              <div className="space-y-4 pl-10">
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg transform transition-all duration-300 hover:translate-x-2">
                  <div className="w-8 h-8 rounded-full bg-crypto-cyan/20 flex items-center justify-center text-crypto-cyan">1</div>
                  <p className="text-crypto-white">
                    Connect your wallet by clicking the "Connect Wallet" button
                  </p>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg transform transition-all duration-300 hover:translate-x-2">
                  <div className="w-8 h-8 rounded-full bg-crypto-cyan/20 flex items-center justify-center text-crypto-cyan">2</div>
                  <p className="text-crypto-white">
                    Enter the payment amount and select your preferred cryptocurrency
                  </p>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg transform transition-all duration-300 hover:translate-x-2">
                  <div className="w-8 h-8 rounded-full bg-crypto-cyan/20 flex items-center justify-center text-crypto-cyan">3</div>
                  <p className="text-crypto-white">
                    Choose the blockchain network you want to use for the payment
                  </p>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg transform transition-all duration-300 hover:translate-x-2">
                  <div className="w-8 h-8 rounded-full bg-crypto-cyan/20 flex items-center justify-center text-crypto-cyan">4</div>
                  <p className="text-crypto-white">
                    Click "Pay Now" and confirm the transaction in your wallet
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="text-sm text-crypto-gray-light flex items-center">
                    <Shield className="h-4 w-4 mr-2 text-crypto-cyan" />
                    Secured by CryptoFlow Enterprise Security
                  </div>
                  <div className="flex gap-3">
                    <div className="flex items-center gap-1 text-xs text-crypto-gray-light">
                      <Bitcoin className="h-4 w-4 text-amber-500" />
                      BTC
                    </div>
                    <div className="flex items-center gap-1 text-xs text-crypto-gray-light">
                      <Ethereum className="h-4 w-4 text-indigo-400" />
                      ETH
                    </div>
                    <div className="flex items-center gap-1 text-xs text-crypto-gray-light">
                      <DollarSign className="h-4 w-4 text-green-400" />
                      USDT
                    </div>
                    <div className="flex items-center gap-1 text-xs text-crypto-gray-light">
                      <DollarSign className="h-4 w-4 text-blue-400" />
                      USDC
                    </div>
                    <div className="flex items-center gap-1 text-xs text-crypto-gray-light">
                      <CreditCard className="h-4 w-4 text-purple-400" />
                      SOL
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-crypto-gray-light text-sm">
                Need help with your payment? <a href="/support" className="text-crypto-cyan hover:underline">Contact Support</a>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 bg-crypto-blue-dark/50 backdrop-blur-md">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="text-crypto-gray-light text-sm mb-4 md:mb-0">
            © 2025 CryptoFlow. All rights reserved.
          </div>
          <div className="flex gap-8">
            <Link href="/privacy" className="text-crypto-gray-light hover:text-crypto-white text-sm transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-crypto-gray-light hover:text-crypto-white text-sm transition-colors duration-200">
              Terms of Service
            </Link>
            <Link href="/support" className="text-crypto-gray-light hover:text-crypto-white text-sm transition-colors duration-200">
              Support
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
