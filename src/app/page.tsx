'use client';

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Shield, Coins, CreditCard, BarChart3, Globe, Clock, CheckCircle } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-crypto-blue-dark to-crypto-blue">
      {/* Header */}
      <header className="border-b border-white/10 py-6 backdrop-blur-md bg-crypto-blue-dark/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-white">
              <span className="text-crypto-cyan">Crypto</span>Flow
            </div>
          </div>
          <nav className="hidden lg:flex space-x-8">
            <Link href="#features" className="text-crypto-gray-light hover:text-crypto-cyan transition-colors duration-200">Features</Link>
            <Link href="#how-it-works" className="text-crypto-gray-light hover:text-crypto-cyan transition-colors duration-200">How it Works</Link>
            <Link href="#testimonials" className="text-crypto-gray-light hover:text-crypto-cyan transition-colors duration-200">Testimonials</Link>
            <Link href="/pricing" className="text-crypto-gray-light hover:text-crypto-cyan transition-colors duration-200">Pricing</Link>
            <Link href="/docs" className="text-crypto-gray-light hover:text-crypto-cyan transition-colors duration-200">Documentation</Link>
          </nav>
          <div className="flex space-x-4">
            <Link href="/dashboard" className="text-crypto-gray-light hover:text-crypto-white border border-white/10 px-4 py-2 rounded-md hover:border-white/30 transition-all duration-200">
              Dashboard
            </Link>
            <Link 
              href="/payment" 
              className="bg-crypto-cyan text-crypto-blue-dark px-6 py-2 rounded-md hover:bg-crypto-cyan/90 transition-all duration-200 font-medium shadow-lg shadow-crypto-cyan/20"
            >
              Pay Now
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-crypto-cyan/30 rounded-full filter blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full filter blur-3xl animate-pulse-slow delay-1000"></div>
          <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-blue-500/20 rounded-full filter blur-3xl animate-pulse-slow delay-2000"></div>
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-16 md:mb-0">
              <div className="inline-block px-4 py-1 bg-crypto-cyan/10 rounded-full text-crypto-cyan text-sm font-medium mb-6 border border-crypto-cyan/20">
                Trusted by 10,000+ businesses worldwide
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
                Enterprise-Grade <span className="text-crypto-cyan">Crypto</span> Payment Gateway
              </h1>
              <p className="text-xl text-crypto-gray-light mb-8 max-w-xl leading-relaxed">
                Accept cryptocurrency payments securely and effortlessly. Integrate with your platform in minutes with our enterprise-ready solution.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/payment" 
                  className="inline-flex items-center justify-center bg-crypto-cyan text-crypto-blue-dark px-8 py-4 rounded-md font-medium hover:bg-crypto-cyan/90 transition-all duration-200 shadow-lg shadow-crypto-cyan/20 text-lg"
                >
                  Start Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link 
                  href="/dashboard" 
                  className="inline-flex items-center justify-center border border-white/20 text-crypto-white px-8 py-4 rounded-md font-medium hover:bg-white/5 transition-all duration-200 text-lg"
                >
                  View Demo
                </Link>
              </div>
              <div className="mt-8 flex items-center space-x-6">
                <div className="flex -space-x-2">
                  <Image src="/partners/partner1.svg" alt="Partner" width={40} height={40} className="rounded-full border-2 border-crypto-blue-dark" />
                  <Image src="/partners/partner2.svg" alt="Partner" width={40} height={40} className="rounded-full border-2 border-crypto-blue-dark" />
                  <Image src="/partners/partner3.svg" alt="Partner" width={40} height={40} className="rounded-full border-2 border-crypto-blue-dark" />
                </div>
                <div className="text-crypto-gray-light text-sm">
                  <span className="text-crypto-cyan font-medium">500+</span> businesses onboarded this month
                </div>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="glass-card p-8 w-full max-w-md shadow-2xl shadow-crypto-cyan/5 border border-white/20 rounded-xl relative">
                <div className="absolute -top-3 -right-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full">
                  Live Demo
                </div>
                <div className="flex justify-between items-center mb-6">
                  <div className="text-xl font-medium text-crypto-white">Payment Demo</div>
                  <div className="text-crypto-cyan font-bold">0.0045 BTC</div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="bg-white/10 h-12 rounded-md flex items-center px-4 text-crypto-gray-light">
                    <span className="opacity-50">Amount</span>
                  </div>
                  <div className="bg-white/10 h-12 rounded-md flex items-center px-4 text-crypto-gray-light">
                    <span className="opacity-50">Select Currency</span>
                  </div>
                  <div className="bg-white/10 h-12 rounded-md flex items-center px-4 text-crypto-gray-light">
                    <span className="opacity-50">Select Network</span>
                  </div>
                </div>
                
                <button className="w-full bg-crypto-cyan text-crypto-blue-dark py-3 rounded-md font-medium hover:bg-crypto-cyan/90 transition-all duration-200 shadow-lg shadow-crypto-cyan/20">
                  Connect Wallet
                </button>
                
                <div className="mt-4 flex items-center justify-center text-xs text-crypto-gray-light">
                  <Shield className="h-3 w-3 mr-1" />
                  <span>Secure, encrypted connection</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 bg-crypto-cyan/10 rounded-full text-crypto-cyan text-sm font-medium mb-4">
              Pricing
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-crypto-white mb-6">
              Simple, <span className="text-crypto-cyan">Transparent</span> Pricing
            </h2>
            <p className="text-xl text-crypto-gray-light max-w-3xl mx-auto leading-relaxed">
              Pay only for what you use with our competitive transaction fees
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Standard Plan */}
            <div className="glass-card p-8 rounded-xl hover:shadow-lg hover:shadow-crypto-cyan/10 transition-all duration-300">
              <h3 className="text-2xl font-semibold text-crypto-white mb-4">Standard</h3>
              <div className="text-crypto-cyan text-4xl font-bold mb-6">0.5%</div>
              <p className="text-crypto-gray-light mb-6 leading-relaxed">
                Our standard rate for all transactions with no hidden fees
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-crypto-gray-light">
                  <CheckCircle className="h-5 w-5 text-crypto-cyan mr-2" />
                  All payment methods
                </li>
                <li className="flex items-center text-crypto-gray-light">
                  <CheckCircle className="h-5 w-5 text-crypto-cyan mr-2" />
                  Priority support
                </li>
                <li className="flex items-center text-crypto-gray-light">
                  <CheckCircle className="h-5 w-5 text-crypto-cyan mr-2" />
                  Advanced analytics
                </li>
              </ul>
              <Link 
                href="/signup" 
                className="w-full bg-crypto-cyan text-crypto-blue-dark px-6 py-3 rounded-md font-medium hover:bg-crypto-cyan/90 transition-all duration-200 text-center block"
              >
                Get Started
              </Link>
            </div>
            
            {/* Launch Offer */}
            <div className="glass-card p-8 rounded-xl border-2 border-crypto-cyan/50 relative hover:shadow-lg hover:shadow-crypto-cyan/10 transition-all duration-300">
              <div className="absolute top-0 right-0 bg-crypto-cyan text-crypto-blue-dark px-3 py-1 text-xs font-bold rounded-bl-md rounded-tr-md">
                SPECIAL OFFER
              </div>
              <h3 className="text-2xl font-semibold text-crypto-white mb-4">Launch Offer</h3>
              <div className="text-crypto-cyan text-4xl font-bold mb-6">0.25%</div>
              <p className="text-crypto-gray-light mb-6 leading-relaxed">
                Limited-time discounted rate for early adopters
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-crypto-gray-light">
                  <CheckCircle className="h-5 w-5 text-crypto-cyan mr-2" />
                  All Standard features
                </li>
                <li className="flex items-center text-crypto-gray-light">
                  <CheckCircle className="h-5 w-5 text-crypto-cyan mr-2" />
                  Rate locked for 12 months
                </li>
                <li className="flex items-center text-crypto-gray-light">
                  <CheckCircle className="h-5 w-5 text-crypto-cyan mr-2" />
                  Dedicated onboarding
                </li>
              </ul>
              <Link 
                href="/signup" 
                className="w-full bg-crypto-cyan text-crypto-blue-dark px-6 py-3 rounded-md font-medium hover:bg-crypto-cyan/90 transition-all duration-200 text-center block"
              >
                Claim Offer
              </Link>
            </div>
            
            {/* Enterprise */}
            <div className="glass-card p-8 rounded-xl hover:shadow-lg hover:shadow-crypto-cyan/10 transition-all duration-300">
              <h3 className="text-2xl font-semibold text-crypto-white mb-4">Enterprise</h3>
              <div className="text-crypto-cyan text-4xl font-bold mb-6">Custom</div>
              <p className="text-crypto-gray-light mb-6 leading-relaxed">
                Tailored solutions for high-volume businesses
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-crypto-gray-light">
                  <CheckCircle className="h-5 w-5 text-crypto-cyan mr-2" />
                  Volume discounts
                </li>
                <li className="flex items-center text-crypto-gray-light">
                  <CheckCircle className="h-5 w-5 text-crypto-cyan mr-2" />
                  Dedicated account manager
                </li>
                <li className="flex items-center text-crypto-gray-light">
                  <CheckCircle className="h-5 w-5 text-crypto-cyan mr-2" />
                  Custom integrations
                </li>
              </ul>
              <Link 
                href="/contact" 
                className="w-full border border-crypto-cyan text-crypto-cyan px-6 py-3 rounded-md font-medium hover:bg-crypto-cyan/10 transition-all duration-200 text-center block"
              >
                Contact Sales
              </Link>
            </div>
          </div>
          
          {/* Pricing Comparison Table */}
          <div className="mt-20">
            <h3 className="text-2xl font-semibold text-crypto-white text-center mb-8">Feature Comparison</h3>
            
            <div className="overflow-x-auto">
              <div className="glass-card rounded-xl p-6">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-4 px-4 text-crypto-gray-light">Features</th>
                      <th className="text-center py-4 px-4 text-crypto-white">Standard</th>
                      <th className="text-center py-4 px-4 text-crypto-cyan">Launch Offer</th>
                      <th className="text-center py-4 px-4 text-crypto-white">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/10">
                      <td className="py-4 px-4 text-crypto-gray-light">Transaction Fee</td>
                      <td className="text-center py-4 px-4 text-crypto-white">0.5%</td>
                      <td className="text-center py-4 px-4 text-crypto-cyan font-medium">0.25%</td>
                      <td className="text-center py-4 px-4 text-crypto-white">Custom</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-4 px-4 text-crypto-gray-light">Supported Cryptocurrencies</td>
                      <td className="text-center py-4 px-4 text-crypto-white">10+</td>
                      <td className="text-center py-4 px-4 text-crypto-cyan font-medium">10+</td>
                      <td className="text-center py-4 px-4 text-crypto-white">All Available</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-4 px-4 text-crypto-gray-light">Settlement Time</td>
                      <td className="text-center py-4 px-4 text-crypto-white">24 hours</td>
                      <td className="text-center py-4 px-4 text-crypto-cyan font-medium">12 hours</td>
                      <td className="text-center py-4 px-4 text-crypto-white">Custom</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-4 px-4 text-crypto-gray-light">API Access</td>
                      <td className="text-center py-4 px-4 text-crypto-white">
                        <CheckCircle className="h-5 w-5 text-crypto-cyan mx-auto" />
                      </td>
                      <td className="text-center py-4 px-4 text-crypto-cyan">
                        <CheckCircle className="h-5 w-5 text-crypto-cyan mx-auto" />
                      </td>
                      <td className="text-center py-4 px-4 text-crypto-white">
                        <CheckCircle className="h-5 w-5 text-crypto-cyan mx-auto" />
                      </td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-4 px-4 text-crypto-gray-light">Webhook Notifications</td>
                      <td className="text-center py-4 px-4 text-crypto-white">
                        <CheckCircle className="h-5 w-5 text-crypto-cyan mx-auto" />
                      </td>
                      <td className="text-center py-4 px-4 text-crypto-cyan">
                        <CheckCircle className="h-5 w-5 text-crypto-cyan mx-auto" />
                      </td>
                      <td className="text-center py-4 px-4 text-crypto-white">
                        <CheckCircle className="h-5 w-5 text-crypto-cyan mx-auto" />
                      </td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-4 px-4 text-crypto-gray-light">Transaction Analytics</td>
                      <td className="text-center py-4 px-4 text-crypto-white">Basic</td>
                      <td className="text-center py-4 px-4 text-crypto-cyan font-medium">Advanced</td>
                      <td className="text-center py-4 px-4 text-crypto-white">Custom</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-4 px-4 text-crypto-gray-light">Support</td>
                      <td className="text-center py-4 px-4 text-crypto-white">Email</td>
                      <td className="text-center py-4 px-4 text-crypto-cyan font-medium">Priority Email</td>
                      <td className="text-center py-4 px-4 text-crypto-white">Dedicated Manager</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 text-crypto-gray-light">Custom Integrations</td>
                      <td className="text-center py-4 px-4 text-crypto-white">—</td>
                      <td className="text-center py-4 px-4 text-crypto-cyan">—</td>
                      <td className="text-center py-4 px-4 text-crypto-white">
                        <CheckCircle className="h-5 w-5 text-crypto-cyan mx-auto" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 bg-crypto-cyan/10 rounded-full text-crypto-cyan text-sm font-medium mb-4">
              Powerful Features
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-crypto-white mb-6">
              Everything You Need for <span className="text-crypto-cyan">Crypto Payments</span>
            </h2>
            <p className="text-xl text-crypto-gray-light max-w-3xl mx-auto leading-relaxed">
              Our enterprise-grade platform provides all the tools you need to accept, manage, and scale cryptocurrency payments
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="glass-card p-8 rounded-xl hover:shadow-lg hover:shadow-crypto-cyan/10 transition-all duration-300 group">
              <div className="w-14 h-14 bg-crypto-cyan/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-crypto-cyan/30 transition-all duration-300">
                <Shield className="h-7 w-7 text-crypto-cyan" />
              </div>
              <h3 className="text-2xl font-semibold text-crypto-white mb-4">Enterprise Security</h3>
              <p className="text-crypto-gray-light mb-6 leading-relaxed">
                Military-grade encryption, multi-signature wallets, and advanced fraud protection to secure your transactions.
              </p>
              <Link href="/docs/security" className="inline-flex items-center text-crypto-cyan hover:text-crypto-cyan/80 font-medium group-hover:translate-x-1 transition-transform duration-300">
                Learn more <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="glass-card p-8 rounded-xl hover:shadow-lg hover:shadow-crypto-cyan/10 transition-all duration-300 group">
              <div className="w-14 h-14 bg-crypto-cyan/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-crypto-cyan/30 transition-all duration-300">
                <Coins className="h-7 w-7 text-crypto-cyan" />
              </div>
              <h3 className="text-2xl font-semibold text-crypto-white mb-4">Multi-Currency Support</h3>
              <p className="text-crypto-gray-light mb-6 leading-relaxed">
                Accept payments in Bitcoin, Ethereum, Solana, USDT, USDC and other major cryptocurrencies across multiple networks.
              </p>
              <Link href="/docs/currencies" className="inline-flex items-center text-crypto-cyan hover:text-crypto-cyan/80 font-medium group-hover:translate-x-1 transition-transform duration-300">
                Learn more <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="glass-card p-8 rounded-xl hover:shadow-lg hover:shadow-crypto-cyan/10 transition-all duration-300 group">
              <div className="w-14 h-14 bg-crypto-cyan/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-crypto-cyan/30 transition-all duration-300">
                <CreditCard className="h-7 w-7 text-crypto-cyan" />
              </div>
              <h3 className="text-2xl font-semibold text-crypto-white mb-4">Seamless Integration</h3>
              <p className="text-crypto-gray-light mb-6 leading-relaxed">
                Integrate with your platform in minutes using our comprehensive API, SDKs, and pre-built components.
              </p>
              <Link href="/docs/integration" className="inline-flex items-center text-crypto-cyan hover:text-crypto-cyan/80 font-medium group-hover:translate-x-1 transition-transform duration-300">
                Learn more <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="glass-card p-8 rounded-xl hover:shadow-lg hover:shadow-crypto-cyan/10 transition-all duration-300 group">
              <div className="w-14 h-14 bg-crypto-cyan/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-crypto-cyan/30 transition-all duration-300">
                <BarChart3 className="h-7 w-7 text-crypto-cyan" />
              </div>
              <h3 className="text-2xl font-semibold text-crypto-white mb-4">Advanced Analytics</h3>
              <p className="text-crypto-gray-light mb-6 leading-relaxed">
                Gain valuable insights with comprehensive analytics, custom reports, and real-time transaction monitoring.
              </p>
              <Link href="/docs/analytics" className="inline-flex items-center text-crypto-cyan hover:text-crypto-cyan/80 font-medium group-hover:translate-x-1 transition-transform duration-300">
                Learn more <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="glass-card p-8 rounded-xl hover:shadow-lg hover:shadow-crypto-cyan/10 transition-all duration-300 group">
              <div className="w-14 h-14 bg-crypto-cyan/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-crypto-cyan/30 transition-all duration-300">
                <Globe className="h-7 w-7 text-crypto-cyan" />
              </div>
              <h3 className="text-2xl font-semibold text-crypto-white mb-4">Global Compliance</h3>
              <p className="text-crypto-gray-light mb-6 leading-relaxed">
                Stay compliant with KYC/AML regulations and industry standards across different jurisdictions worldwide.
              </p>
              <Link href="/docs/compliance" className="inline-flex items-center text-crypto-cyan hover:text-crypto-cyan/80 font-medium group-hover:translate-x-1 transition-transform duration-300">
                Learn more <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="glass-card p-8 rounded-xl hover:shadow-lg hover:shadow-crypto-cyan/10 transition-all duration-300 group">
              <div className="w-14 h-14 bg-crypto-cyan/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-crypto-cyan/30 transition-all duration-300">
                <Clock className="h-7 w-7 text-crypto-cyan" />
              </div>
              <h3 className="text-2xl font-semibold text-crypto-white mb-4">Instant Settlement</h3>
              <p className="text-crypto-gray-light mb-6 leading-relaxed">
                Receive funds in your wallet as soon as the blockchain confirms the transaction with our optimized processing.
              </p>
              <Link href="/docs/settlement" className="inline-flex items-center text-crypto-cyan hover:text-crypto-cyan/80 font-medium group-hover:translate-x-1 transition-transform duration-300">
                Learn more <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 border-t border-white/10 bg-gradient-to-b from-crypto-blue to-crypto-blue-dark">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 bg-crypto-cyan/10 rounded-full text-crypto-cyan text-sm font-medium mb-4">
              Simple Process
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-crypto-white mb-6">
              How <span className="text-crypto-cyan">CryptoFlow</span> Works
            </h2>
            <p className="text-xl text-crypto-gray-light max-w-3xl mx-auto leading-relaxed">
              Get started with cryptocurrency payments in just a few simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-1 bg-gradient-to-r from-crypto-cyan/0 via-crypto-cyan/50 to-crypto-cyan/0 transform -translate-y-1/2 z-0"></div>
            
            <div className="glass-card p-8 rounded-xl relative z-10 hover:shadow-lg hover:shadow-crypto-cyan/10 transition-all duration-300">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-crypto-cyan text-crypto-blue-dark flex items-center justify-center font-bold text-lg">1</div>
              <div className="text-center pt-4">
                <div className="w-20 h-20 bg-crypto-cyan/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-10 w-10 text-crypto-cyan">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-crypto-white mb-4">Create an Account</h3>
                <p className="text-crypto-gray-light leading-relaxed">
                  Sign up for a free account and complete our streamlined verification process to get started.
                </p>
              </div>
            </div>
            
            <div className="glass-card p-8 rounded-xl relative z-10 hover:shadow-lg hover:shadow-crypto-cyan/10 transition-all duration-300">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-crypto-cyan text-crypto-blue-dark flex items-center justify-center font-bold text-lg">2</div>
              <div className="text-center pt-4">
                <div className="w-20 h-20 bg-crypto-cyan/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-10 w-10 text-crypto-cyan">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-crypto-white mb-4">Integrate Our API</h3>
                <p className="text-crypto-gray-light leading-relaxed">
                  Use our developer-friendly API or pre-built components to add crypto payment functionality to your platform.
                </p>
              </div>
            </div>
            
            <div className="glass-card p-8 rounded-xl relative z-10 hover:shadow-lg hover:shadow-crypto-cyan/10 transition-all duration-300">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-crypto-cyan text-crypto-blue-dark flex items-center justify-center font-bold text-lg">3</div>
              <div className="text-center pt-4">
                <div className="w-20 h-20 bg-crypto-cyan/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-10 w-10 text-crypto-cyan">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-crypto-white mb-4">Accept Payments</h3>
                <p className="text-crypto-gray-light leading-relaxed">
                  Start accepting cryptocurrency payments from your customers with real-time transaction monitoring and notifications.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <Link 
              href="/docs/getting-started" 
              className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-crypto-white px-8 py-4 rounded-md font-medium transition-all duration-200 text-lg"
            >
              View Integration Guide
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 bg-crypto-cyan/10 rounded-full text-crypto-cyan text-sm font-medium mb-4">
              Testimonials
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-crypto-white mb-6">
              What Our <span className="text-crypto-cyan">Clients</span> Say
            </h2>
            <p className="text-xl text-crypto-gray-light max-w-3xl mx-auto leading-relaxed">
              Join thousands of satisfied businesses using CryptoFlow for their payment needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-8 rounded-xl hover:shadow-lg hover:shadow-crypto-cyan/10 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg mr-4">
                  T
                </div>
                <div>
                  <h4 className="text-crypto-white font-medium">TechNova</h4>
                  <p className="text-crypto-gray-light text-sm">E-commerce Platform</p>
                </div>
              </div>
              <p className="text-crypto-gray-light mb-6 leading-relaxed">
                "CryptoFlow has transformed how we handle payments. The integration was seamless, and our customers love the option to pay with crypto. The analytics dashboard gives us valuable insights into our payment trends."
              </p>
              <div className="flex text-crypto-cyan">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            
            <div className="glass-card p-8 rounded-xl hover:shadow-lg hover:shadow-crypto-cyan/10 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center text-white font-bold text-lg mr-4">
                  G
                </div>
                <div>
                  <h4 className="text-crypto-white font-medium">GlobalPay Solutions</h4>
                  <p className="text-crypto-gray-light text-sm">Financial Services</p>
                </div>
              </div>
              <p className="text-crypto-gray-light mb-6 leading-relaxed">
                "As a financial services provider, security is our top priority. CryptoFlow's enterprise-grade security features and compliance tools have exceeded our expectations. Their support team is also exceptional."
              </p>
              <div className="flex text-crypto-cyan">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            
            <div className="glass-card p-8 rounded-xl hover:shadow-lg hover:shadow-crypto-cyan/10 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-lg mr-4">
                  D
                </div>
                <div>
                  <h4 className="text-crypto-white font-medium">Digital Frontiers</h4>
                  <p className="text-crypto-gray-light text-sm">SaaS Company</p>
                </div>
              </div>
              <p className="text-crypto-gray-light mb-6 leading-relaxed">
                "We've seen a 30% increase in international sales since implementing CryptoFlow. The multi-currency support and instant settlements have eliminated the friction in our global payment process."
              </p>
              <div className="flex text-crypto-cyan">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t border-white/10 bg-gradient-to-r from-crypto-blue-dark to-crypto-blue relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-crypto-cyan/20 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="glass-card p-12 rounded-2xl border border-white/20 max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-2/3 mb-8 md:mb-0">
                <h2 className="text-3xl md:text-4xl font-bold text-crypto-white mb-4">
                  Ready to Accept <span className="text-crypto-cyan">Crypto Payments?</span>
                </h2>
                <p className="text-xl text-crypto-gray-light leading-relaxed">
                  Join thousands of businesses already using CryptoFlow. Get started today with our 30-day free trial.
                </p>
              </div>
              <div>
                <Link 
                  href="/signup" 
                  className="inline-flex items-center justify-center bg-crypto-cyan text-crypto-blue-dark px-8 py-4 rounded-md font-medium hover:bg-crypto-cyan/90 transition-all duration-200 shadow-lg shadow-crypto-cyan/20 text-lg whitespace-nowrap"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
          
          <div className="mt-24 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-crypto-cyan mb-2">10,000+</div>
              <div className="text-crypto-gray-light">Businesses</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-crypto-cyan mb-2">$500M+</div>
              <div className="text-crypto-gray-light">Processed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-crypto-cyan mb-2">99.9%</div>
              <div className="text-crypto-gray-light">Uptime</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-crypto-cyan mb-2">24/7</div>
              <div className="text-crypto-gray-light">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-white/10 bg-crypto-blue-dark">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
            <div className="md:col-span-2">
              <div className="text-2xl font-bold text-white mb-6">
                <span className="text-crypto-cyan">Crypto</span>Flow
              </div>
              <p className="text-crypto-gray-light mb-6 max-w-md">
                Enterprise-grade cryptocurrency payment gateway for businesses of all sizes. Accept crypto payments securely and effortlessly.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-crypto-gray-light hover:text-crypto-cyan transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-crypto-gray-light hover:text-crypto-cyan transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="#" className="text-crypto-gray-light hover:text-crypto-cyan transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="#" className="text-crypto-gray-light hover:text-crypto-cyan transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-crypto-white mb-6">Product</h3>
              <ul className="space-y-4">
                <li><Link href="/features" className="text-crypto-gray-light hover:text-crypto-cyan transition-colors duration-200">Features</Link></li>
                <li><Link href="/pricing" className="text-crypto-gray-light hover:text-crypto-cyan transition-colors duration-200">Pricing</Link></li>
                <li><Link href="/integrations" className="text-crypto-gray-light hover:text-crypto-cyan transition-colors duration-200">Integrations</Link></li>
                <li><Link href="/enterprise" className="text-crypto-gray-light hover:text-crypto-cyan transition-colors duration-200">Enterprise</Link></li>
                <li><Link href="/security" className="text-crypto-gray-light hover:text-crypto-cyan transition-colors duration-200">Security</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-crypto-white mb-6">Resources</h3>
              <ul className="space-y-4">
                <li><Link href="/docs" className="text-crypto-gray-light hover:text-crypto-cyan transition-colors duration-200">Documentation</Link></li>
                <li><Link href="/api" className="text-crypto-gray-light hover:text-crypto-cyan transition-colors duration-200">API Reference</Link></li>
                <li><Link href="/blog" className="text-crypto-gray-light hover:text-crypto-cyan transition-colors duration-200">Blog</Link></li>
                <li><Link href="/guides" className="text-crypto-gray-light hover:text-crypto-cyan transition-colors duration-200">Guides</Link></li>
                <li><Link href="/support" className="text-crypto-gray-light hover:text-crypto-cyan transition-colors duration-200">Support</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-crypto-white mb-6">Company</h3>
              <ul className="space-y-4">
                <li><Link href="/about" className="text-crypto-gray-light hover:text-crypto-cyan transition-colors duration-200">About Us</Link></li>
                <li><Link href="/careers" className="text-crypto-gray-light hover:text-crypto-cyan transition-colors duration-200">Careers</Link></li>
                <li><Link href="/contact" className="text-crypto-gray-light hover:text-crypto-cyan transition-colors duration-200">Contact</Link></li>
                <li><Link href="/privacy" className="text-crypto-gray-light hover:text-crypto-cyan transition-colors duration-200">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-crypto-gray-light hover:text-crypto-cyan transition-colors duration-200">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
            <div className="text-crypto-gray-light mb-4 md:mb-0">
              &copy; 2025 CryptoFlow. All rights reserved.
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center bg-white/10 rounded-md px-3 py-1">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                <span className="text-crypto-gray-light text-sm">All systems operational</span>
              </div>
              <Link href="/status" className="text-crypto-gray-light hover:text-crypto-cyan text-sm transition-colors duration-200">
                Status
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
