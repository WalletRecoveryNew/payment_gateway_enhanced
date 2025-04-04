'use client'

import { useState } from 'react'
import { HelpCircle, MessageSquare, Mail, Phone, Send, FileText, ChevronDown, ChevronUp } from 'lucide-react'
import DashboardClient from '@/components/dashboard/dashboard-client'

interface FAQ {
  id: string
  question: string
  answer: string
  isOpen?: boolean
}

export default function SupportPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [category, setCategory] = useState('general')
  const [priority, setPriority] = useState('medium')
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [faqs, setFaqs] = useState<FAQ[]>([
    {
      id: 'faq1',
      question: 'How do I connect my wallet?',
      answer: 'To connect your wallet, click on the "Connect Wallet" button on the payment page. You will be prompted to select your wallet provider (MetaMask, WalletConnect, etc.) and approve the connection. Once connected, you can make payments directly from your wallet.',
      isOpen: false
    },
    {
      id: 'faq2',
      question: 'What cryptocurrencies do you support?',
      answer: 'We currently support Bitcoin (BTC), Ethereum (ETH), Tether (USDT), USD Coin (USDC), and several other major cryptocurrencies. You can find the full list of supported cryptocurrencies in your dashboard under "Settings > Payment Methods".',
      isOpen: false
    },
    {
      id: 'faq3',
      question: 'How do I integrate the payment gateway into my website?',
      answer: 'We offer several integration options, including a JavaScript SDK, API endpoints, and pre-built components for popular frameworks like React, Vue, and Angular. Check our documentation for detailed integration guides and code samples.',
      isOpen: false
    },
    {
      id: 'faq4',
      question: 'How long do crypto payments take to process?',
      answer: 'Processing times vary depending on the cryptocurrency and network congestion. Bitcoin transactions typically take 10-60 minutes for confirmation, while Ethereum and other blockchain transactions may be faster. We provide real-time status updates for all transactions.',
      isOpen: false
    },
    {
      id: 'faq5',
      question: 'What are the fees for using your service?',
      answer: 'Our fee structure is simple and transparent. We charge a small percentage fee per successful transaction, with no setup fees or monthly charges. You can find the current fee rates in your dashboard under "Settings > Billing".',
      isOpen: false
    },
    {
      id: 'faq6',
      question: 'Is there a sandbox or test mode?',
      answer: 'Yes, we provide a comprehensive test environment where you can simulate transactions without using real funds. You can toggle between test and production modes in your dashboard, and we provide test API keys for development and integration testing.',
      isOpen: false
    }
  ])
  
  const toggleFAQ = (id: string) => {
    setFaqs(faqs.map(faq => 
      faq.id === id ? { ...faq, isOpen: !faq.isOpen } : faq
    ))
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // In a real app, this would send the form data to your API
      // Simulating API call with setTimeout
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Reset form after submission
      setName('')
      setEmail('')
      setSubject('')
      setMessage('')
      setCategory('general')
      setPriority('medium')
      
      // Show success message (in a real app, you'd use a toast notification)
      alert('Your support request has been submitted successfully!')
    } catch (error) {
      // Show error message
      alert('An error occurred while submitting your request. Please try again.')
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <DashboardClient>
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-crypto-white">Support</h1>
          <p className="text-crypto-gray-light mt-1">
            Get help with your CryptoFlow payment gateway integration and account.
          </p>
        </div>
        
        {/* Support options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="glass-card p-6 flex flex-col items-center text-center">
            <div className="p-3 bg-crypto-cyan/10 rounded-full mb-4">
              <MessageSquare className="text-crypto-cyan" size={24} />
            </div>
            <h3 className="text-lg font-medium text-crypto-white mb-2">Live Chat</h3>
            <p className="text-crypto-gray-light mb-4">
              Chat with our support team during business hours for immediate assistance.
            </p>
            <button className="mt-auto px-4 py-2 bg-crypto-cyan/10 text-crypto-cyan border border-crypto-cyan/20 rounded-md hover:bg-crypto-cyan/20 transition-colors w-full">
              Start Chat
            </button>
          </div>
          
          <div className="glass-card p-6 flex flex-col items-center text-center">
            <div className="p-3 bg-crypto-cyan/10 rounded-full mb-4">
              <Mail className="text-crypto-cyan" size={24} />
            </div>
            <h3 className="text-lg font-medium text-crypto-white mb-2">Email Support</h3>
            <p className="text-crypto-gray-light mb-4">
              Email our support team for technical issues or account inquiries.
            </p>
            <a 
              href="mailto:support@cryptoflow.io" 
              className="mt-auto px-4 py-2 bg-crypto-cyan text-crypto-blue rounded-md hover:bg-crypto-cyan/90 transition-colors w-full block"
            >
              Email Us
            </a>
          </div>
          
          <div className="glass-card p-6 flex flex-col items-center text-center">
            <div className="p-3 bg-crypto-cyan/10 rounded-full mb-4">
              <FileText className="text-crypto-cyan" size={24} />
            </div>
            <h3 className="text-lg font-medium text-crypto-white mb-2">Documentation</h3>
            <p className="text-crypto-gray-light mb-4">
              Browse our comprehensive guides and API documentation.
            </p>
            <a 
              href="/dashboard/documentation"
              className="mt-auto px-4 py-2 bg-crypto-cyan/10 text-crypto-cyan border border-crypto-cyan/20 rounded-md hover:bg-crypto-cyan/20 transition-colors w-full block"
            >
              View Docs
            </a>
          </div>
        </div>
        
        {/* Contact form and FAQs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact form */}
          <div>
            <h2 className="text-xl font-medium text-crypto-white mb-6">Contact Support</h2>
            <div className="glass-card p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-crypto-gray-light mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-crypto-blue-dark border border-white/10 rounded-md py-2 px-3 text-crypto-white focus:border-crypto-cyan/50 focus:outline-none"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-crypto-gray-light mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-crypto-blue-dark border border-white/10 rounded-md py-2 px-3 text-crypto-white focus:border-crypto-cyan/50 focus:outline-none"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-crypto-gray-light mb-1">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-crypto-blue-dark border border-white/10 rounded-md py-2 px-3 text-crypto-white focus:border-crypto-cyan/50 focus:outline-none"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="technical">Technical Support</option>
                      <option value="billing">Billing & Payments</option>
                      <option value="account">Account Issues</option>
                      <option value="feature">Feature Request</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-crypto-gray-light mb-1">
                      Priority
                    </label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                      className="w-full bg-crypto-blue-dark border border-white/10 rounded-md py-2 px-3 text-crypto-white focus:border-crypto-cyan/50 focus:outline-none"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-crypto-gray-light mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-crypto-blue-dark border border-white/10 rounded-md py-2 px-3 text-crypto-white focus:border-crypto-cyan/50 focus:outline-none"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-crypto-gray-light mb-1">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-crypto-blue-dark border border-white/10 rounded-md py-2 px-3 text-crypto-white focus:border-crypto-cyan/50 focus:outline-none"
                    required
                  />
                </div>
                
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center px-4 py-2 bg-crypto-cyan text-crypto-blue rounded-md hover:bg-crypto-cyan/90 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-crypto-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2" size={16} />
                        Submit Request
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          {/* FAQs */}
          <div>
            <h2 className="text-xl font-medium text-crypto-white mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.id} className="glass-card">
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full flex justify-between items-center p-4 text-left"
                  >
                    <h3 className="text-md font-medium text-crypto-white">{faq.question}</h3>
                    {faq.isOpen ? (
                      <ChevronUp className="h-5 w-5 text-crypto-cyan" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-crypto-cyan" />
                    )}
                  </button>
                  {faq.isOpen && (
                    <div className="px-4 pb-4 text-crypto-gray-light">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-6 glass-card border border-crypto-cyan/20">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-crypto-cyan/10 rounded-full">
                  <HelpCircle className="text-crypto-cyan" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-crypto-white mb-1">Still have questions?</h3>
                  <p className="text-crypto-gray-light mb-4">
                    Our support team is available 24/7 to assist you with any questions or issues you may have.
                  </p>
                  <div className="flex items-center gap-4">
                    <a 
                      href="https://community.cryptoflow.io" 
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="text-crypto-cyan hover:underline flex items-center"
                    >
                      <MessageSquare size={16} className="mr-1" />
                      Join Community
                    </a>
                    <a 
                      href="mailto:support@cryptoflow.io" 
                      className="text-crypto-cyan hover:underline flex items-center"
                    >
                      <Mail size={16} className="mr-1" />
                      Email Support
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Support hours */}
        <div className="mt-10 glass-card p-6">
          <h2 className="text-xl font-medium text-crypto-white mb-4">Support Hours</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-md font-medium text-crypto-white mb-2">Live Chat & Phone Support</h3>
              <table className="w-full">
                <tbody>
                  <tr className="border-b border-white/10">
                    <td className="py-2 text-crypto-gray-light">Monday - Friday</td>
                    <td className="py-2 text-crypto-white text-right">9:00 AM - 8:00 PM EST</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2 text-crypto-gray-light">Saturday</td>
                    <td className="py-2 text-crypto-white text-right">10:00 AM - 6:00 PM EST</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-crypto-gray-light">Sunday</td>
                    <td className="py-2 text-crypto-white text-right">Closed</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div>
              <h3 className="text-md font-medium text-crypto-white mb-2">Email Support</h3>
              <p className="text-crypto-gray-light">
                Our email support is available 24/7. We typically respond to all inquiries within 24 hours.
              </p>
              <div className="mt-4 flex items-center">
                <Phone className="h-5 w-5 text-crypto-cyan mr-2" />
                <span className="text-crypto-white">+1 (888) 123-4567</span>
              </div>
              <div className="mt-2 flex items-center">
                <Mail className="h-5 w-5 text-crypto-cyan mr-2" />
                <span className="text-crypto-white">support@cryptoflow.io</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardClient>
  )
} 