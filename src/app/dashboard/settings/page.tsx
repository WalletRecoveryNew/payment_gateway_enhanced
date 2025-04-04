'use client'

import { useState } from 'react'
import { Shield, Bell, CreditCard, Key, User } from 'lucide-react'
import DashboardClient from '@/components/dashboard/dashboard-client'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSettings />
      case 'security':
        return <SecuritySettings />
      case 'notifications':
        return <NotificationSettings />
      case 'payment':
        return <PaymentSettings />
      case 'api':
        return <ApiSettings />
      default:
        return <ProfileSettings />
    }
  }

  return (
    <DashboardClient>
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-crypto-white">Settings</h1>
          <p className="text-crypto-gray-light mt-1">
            Manage your account settings and preferences.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Settings tabs */}
          <div className="glass-card p-4 md:w-64 flex-shrink-0">
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'profile'
                    ? 'bg-crypto-cyan/20 text-crypto-cyan'
                    : 'text-crypto-white hover:bg-white/5'
                }`}
              >
                <User className="mr-3 h-5 w-5" />
                <span>Profile</span>
              </button>

              <button
                onClick={() => setActiveTab('security')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'security'
                    ? 'bg-crypto-cyan/20 text-crypto-cyan'
                    : 'text-crypto-white hover:bg-white/5'
                }`}
              >
                <Shield className="mr-3 h-5 w-5" />
                <span>Security</span>
              </button>

              <button
                onClick={() => setActiveTab('notifications')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'notifications'
                    ? 'bg-crypto-cyan/20 text-crypto-cyan'
                    : 'text-crypto-white hover:bg-white/5'
                }`}
              >
                <Bell className="mr-3 h-5 w-5" />
                <span>Notifications</span>
              </button>

              <button
                onClick={() => setActiveTab('payment')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'payment'
                    ? 'bg-crypto-cyan/20 text-crypto-cyan'
                    : 'text-crypto-white hover:bg-white/5'
                }`}
              >
                <CreditCard className="mr-3 h-5 w-5" />
                <span>Payment Methods</span>
              </button>

              <button
                onClick={() => setActiveTab('api')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'api'
                    ? 'bg-crypto-cyan/20 text-crypto-cyan'
                    : 'text-crypto-white hover:bg-white/5'
                }`}
              >
                <Key className="mr-3 h-5 w-5" />
                <span>API Keys</span>
              </button>
            </nav>
          </div>

          {/* Settings content */}
          <div className="glass-card p-6 flex-grow">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </DashboardClient>
  )
}

function ProfileSettings() {
  return (
    <div>
      <h2 className="text-xl font-medium text-crypto-white mb-6">Profile Settings</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-crypto-gray-light mb-1">
            Profile Picture
          </label>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-crypto-cyan/20 flex items-center justify-center overflow-hidden">
              <User size={32} className="text-crypto-cyan" />
            </div>
            <div>
              <button className="px-3 py-1.5 text-sm bg-crypto-cyan/10 text-crypto-cyan border border-crypto-cyan/20 rounded-md hover:bg-crypto-cyan/20">
                Upload New Picture
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-crypto-gray-light mb-1">
              Full Name
            </label>
            <input
              type="text"
              defaultValue="Alex Crypto"
              className="w-full bg-crypto-blue-dark border border-white/10 rounded-md py-2 px-3 text-crypto-white focus:border-crypto-cyan/50 focus:outline-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-crypto-gray-light mb-1">
              Email Address
            </label>
            <input
              type="email"
              defaultValue="alex@example.com"
              className="w-full bg-crypto-blue-dark border border-white/10 rounded-md py-2 px-3 text-crypto-white focus:border-crypto-cyan/50 focus:outline-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-crypto-gray-light mb-1">
              Company Name
            </label>
            <input
              type="text"
              defaultValue="Crypto Ventures"
              className="w-full bg-crypto-blue-dark border border-white/10 rounded-md py-2 px-3 text-crypto-white focus:border-crypto-cyan/50 focus:outline-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-crypto-gray-light mb-1">
              Website
            </label>
            <input
              type="url"
              defaultValue="https://cryptoventures.example.com"
              className="w-full bg-crypto-blue-dark border border-white/10 rounded-md py-2 px-3 text-crypto-white focus:border-crypto-cyan/50 focus:outline-none"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-crypto-gray-light mb-1">
            Bio
          </label>
          <textarea
            rows={4}
            defaultValue="Crypto enthusiast and business owner accepting cryptocurrency payments."
            className="w-full bg-crypto-blue-dark border border-white/10 rounded-md py-2 px-3 text-crypto-white focus:border-crypto-cyan/50 focus:outline-none"
          />
        </div>
        
        <div className="flex justify-end">
          <button className="px-4 py-2 bg-crypto-cyan text-crypto-blue rounded-md hover:bg-crypto-cyan/90 transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

function SecuritySettings() {
  return (
    <div>
      <h2 className="text-xl font-medium text-crypto-white mb-6">Security Settings</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-md font-medium text-crypto-white mb-4">Change Password</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-crypto-gray-light mb-1">
                Current Password
              </label>
              <input
                type="password"
                className="w-full bg-crypto-blue-dark border border-white/10 rounded-md py-2 px-3 text-crypto-white focus:border-crypto-cyan/50 focus:outline-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-crypto-gray-light mb-1">
                New Password
              </label>
              <input
                type="password"
                className="w-full bg-crypto-blue-dark border border-white/10 rounded-md py-2 px-3 text-crypto-white focus:border-crypto-cyan/50 focus:outline-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-crypto-gray-light mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                className="w-full bg-crypto-blue-dark border border-white/10 rounded-md py-2 px-3 text-crypto-white focus:border-crypto-cyan/50 focus:outline-none"
              />
            </div>
            
            <div>
              <button className="px-4 py-2 bg-crypto-cyan text-crypto-blue rounded-md hover:bg-crypto-cyan/90 transition-colors">
                Update Password
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-6">
          <h3 className="text-md font-medium text-crypto-white mb-4">Two-Factor Authentication</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-crypto-white">
                Protect your account with 2FA
              </p>
              <p className="text-sm text-crypto-gray-light">
                Add an extra layer of security to your account
              </p>
            </div>
            <div className="form-control">
              <label className="cursor-pointer flex items-center">
                <input type="checkbox" className="sr-only" />
                <div className="relative w-10 h-5 bg-crypto-blue-dark rounded-full">
                  <div className="dot absolute left-1 top-1 bg-crypto-gray-light w-3 h-3 rounded-full transition"></div>
                </div>
              </label>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-6">
          <h3 className="text-md font-medium text-crypto-white mb-4">Session Management</h3>
          <p className="text-sm text-crypto-gray-light mb-4">
            You're currently signed in on these devices:
          </p>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-md">
              <div>
                <p className="text-crypto-white">Windows PC - Chrome</p>
                <p className="text-xs text-crypto-gray-light">Current session • New York, USA</p>
              </div>
              <div>
                <span className="px-2 py-1 text-xs bg-green-500/20 text-green-500 rounded-full">
                  Active Now
                </span>
              </div>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-md">
              <div>
                <p className="text-crypto-white">iPhone 13 - Safari</p>
                <p className="text-xs text-crypto-gray-light">Last active: 2 days ago • New York, USA</p>
              </div>
              <div>
                <button className="text-xs text-red-400 hover:underline">
                  Sign Out
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <button className="text-sm text-red-400 hover:underline">
              Sign out of all devices
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function NotificationSettings() {
  return (
    <div>
      <h2 className="text-xl font-medium text-crypto-white mb-6">Notification Settings</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-md font-medium text-crypto-white mb-4">Email Notifications</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-crypto-white">Payment Received</p>
                <p className="text-sm text-crypto-gray-light">Get notified when you receive a new payment</p>
              </div>
              <div className="form-control">
                <label className="cursor-pointer flex items-center">
                  <input type="checkbox" defaultChecked className="sr-only" />
                  <div className="relative w-10 h-5 bg-crypto-cyan/30 rounded-full">
                    <div className="dot absolute left-4 top-1 bg-crypto-cyan w-3 h-3 rounded-full transition"></div>
                  </div>
                </label>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-crypto-white">Failed Payments</p>
                <p className="text-sm text-crypto-gray-light">Get notified when a payment fails to process</p>
              </div>
              <div className="form-control">
                <label className="cursor-pointer flex items-center">
                  <input type="checkbox" defaultChecked className="sr-only" />
                  <div className="relative w-10 h-5 bg-crypto-cyan/30 rounded-full">
                    <div className="dot absolute left-4 top-1 bg-crypto-cyan w-3 h-3 rounded-full transition"></div>
                  </div>
                </label>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-crypto-white">Security Alerts</p>
                <p className="text-sm text-crypto-gray-light">Get notified about security events on your account</p>
              </div>
              <div className="form-control">
                <label className="cursor-pointer flex items-center">
                  <input type="checkbox" defaultChecked className="sr-only" />
                  <div className="relative w-10 h-5 bg-crypto-cyan/30 rounded-full">
                    <div className="dot absolute left-4 top-1 bg-crypto-cyan w-3 h-3 rounded-full transition"></div>
                  </div>
                </label>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-crypto-white">News & Updates</p>
                <p className="text-sm text-crypto-gray-light">Receive updates about new features and improvements</p>
              </div>
              <div className="form-control">
                <label className="cursor-pointer flex items-center">
                  <input type="checkbox" className="sr-only" />
                  <div className="relative w-10 h-5 bg-crypto-blue-dark rounded-full">
                    <div className="dot absolute left-1 top-1 bg-crypto-gray-light w-3 h-3 rounded-full transition"></div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-6">
          <h3 className="text-md font-medium text-crypto-white mb-4">Notification Channels</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-crypto-gray-light mb-1">
                Email Address for Notifications
              </label>
              <input
                type="email"
                defaultValue="alex@example.com"
                className="w-full bg-crypto-blue-dark border border-white/10 rounded-md py-2 px-3 text-crypto-white focus:border-crypto-cyan/50 focus:outline-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-crypto-gray-light mb-1">
                Phone Number for SMS (Optional)
              </label>
              <input
                type="tel"
                placeholder="+1 (555) 123-4567"
                className="w-full bg-crypto-blue-dark border border-white/10 rounded-md py-2 px-3 text-crypto-white focus:border-crypto-cyan/50 focus:outline-none"
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button className="px-4 py-2 bg-crypto-cyan text-crypto-blue rounded-md hover:bg-crypto-cyan/90 transition-colors">
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  )
}

function PaymentSettings() {
  return (
    <div>
      <h2 className="text-xl font-medium text-crypto-white mb-6">Payment Method Settings</h2>
      
      <div className="mb-6">
        <p className="text-crypto-gray-light">
          Configure how you receive your settlement payments.
        </p>
      </div>
      
      <div className="glass-card p-4 mb-6 border border-crypto-cyan/20">
        <h3 className="text-md font-medium text-crypto-white mb-4">Settlement Preferences</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-crypto-gray-light mb-1">
              Default Settlement Currency
            </label>
            <select className="w-full bg-crypto-blue-dark border border-white/10 rounded-md py-2 px-3 text-crypto-white focus:border-crypto-cyan/50 focus:outline-none">
              <option value="USDT">USDT</option>
              <option value="USDC">USDC</option>
              <option value="ETH">ETH</option>
              <option value="BTC">BTC</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-crypto-gray-light mb-1">
              Settlement Frequency
            </label>
            <select className="w-full bg-crypto-blue-dark border border-white/10 rounded-md py-2 px-3 text-crypto-white focus:border-crypto-cyan/50 focus:outline-none">
              <option value="instant">Instant</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="manual">Manual</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-crypto-gray-light mb-1">
              Minimum Settlement Amount
            </label>
            <div className="flex">
              <input
                type="number"
                defaultValue="100"
                className="w-full bg-crypto-blue-dark border border-white/10 rounded-l-md py-2 px-3 text-crypto-white focus:border-crypto-cyan/50 focus:outline-none"
              />
              <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-white/10 bg-white/5 text-crypto-gray-light">
                USDT
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="glass-card p-4 mb-6">
        <h3 className="text-md font-medium text-crypto-white mb-4">Connected Bank Accounts</h3>
        
        <div className="p-4 text-center border border-dashed border-white/10 rounded-md mb-4">
          <p className="text-crypto-gray-light mb-2">
            No bank accounts connected yet.
          </p>
          <button className="px-4 py-2 bg-crypto-cyan/10 text-crypto-cyan border border-crypto-cyan/20 rounded-md hover:bg-crypto-cyan/20">
            Connect Bank Account
          </button>
        </div>
        
        <p className="text-xs text-crypto-gray-light">
          Bank accounts are used for fiat currency settlements. For crypto settlements, 
          use your connected wallets.
        </p>
      </div>
      
      <div className="flex justify-end">
        <button className="px-4 py-2 bg-crypto-cyan text-crypto-blue rounded-md hover:bg-crypto-cyan/90 transition-colors">
          Save Settings
        </button>
      </div>
    </div>
  )
}

function ApiSettings() {
  return (
    <div>
      <h2 className="text-xl font-medium text-crypto-white mb-6">API Keys</h2>
      
      <div className="mb-6">
        <p className="text-crypto-gray-light">
          Manage your API keys for integrating with CryptoFlow payment services.
        </p>
      </div>
      
      <div className="glass-card p-4 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-md font-medium text-crypto-white">Your API Keys</h3>
          <button className="px-3 py-1.5 bg-crypto-cyan/10 text-crypto-cyan border border-crypto-cyan/20 rounded-md hover:bg-crypto-cyan/20 text-sm">
            Generate New Key
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 border border-white/10 rounded-md">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-medium text-crypto-white">Production Key</h4>
                <p className="text-xs text-crypto-gray-light">Created: May 15, 2023</p>
              </div>
              <span className="px-2 py-1 text-xs bg-green-500/20 text-green-500 rounded-full">
                Active
              </span>
            </div>
            <div className="bg-crypto-blue-dark border border-white/10 rounded-md p-2 font-mono text-sm text-crypto-gray-light mb-2">
              pk_live_xxxxxxxxxxxxxxxxxxxxxxxxxxx
            </div>
            <div className="flex justify-end space-x-2">
              <button className="text-xs text-crypto-cyan hover:underline">Reveal</button>
              <button className="text-xs text-red-400 hover:underline">Revoke</button>
            </div>
          </div>
          
          <div className="p-4 border border-white/10 rounded-md">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-medium text-crypto-white">Test Key</h4>
                <p className="text-xs text-crypto-gray-light">Created: May 15, 2023</p>
              </div>
              <span className="px-2 py-1 text-xs bg-green-500/20 text-green-500 rounded-full">
                Active
              </span>
            </div>
            <div className="bg-crypto-blue-dark border border-white/10 rounded-md p-2 font-mono text-sm text-crypto-gray-light mb-2">
              pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxx
            </div>
            <div className="flex justify-end space-x-2">
              <button className="text-xs text-crypto-cyan hover:underline">Reveal</button>
              <button className="text-xs text-red-400 hover:underline">Revoke</button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="glass-card p-4 mb-6">
        <h3 className="text-md font-medium text-crypto-white mb-4">API Usage</h3>
        
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-crypto-gray-light">Current Month</span>
          <span className="text-sm text-crypto-cyan">253 / 10,000 calls</span>
        </div>
        
        <div className="w-full bg-crypto-blue-dark rounded-full h-2">
          <div className="bg-crypto-cyan h-2 rounded-full" style={{ width: '2.5%' }}></div>
        </div>
        
        <p className="text-xs text-crypto-gray-light mt-2">
          Your current plan allows 10,000 API calls per month. 
          <a href="#" className="text-crypto-cyan ml-1 hover:underline">Upgrade for more</a>
        </p>
      </div>
      
      <div className="glass-card p-4">
        <h3 className="text-md font-medium text-crypto-white mb-4">Webhooks</h3>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-crypto-gray-light mb-1">
            Webhook URL
          </label>
          <input
            type="url"
            placeholder="https://your-website.com/webhook"
            className="w-full bg-crypto-blue-dark border border-white/10 rounded-md py-2 px-3 text-crypto-white focus:border-crypto-cyan/50 focus:outline-none"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-crypto-gray-light mb-1">
            Webhook Events
          </label>
          <div className="space-y-2">
            {['payment.created', 'payment.completed', 'payment.failed', 'wallet.updated'].map((event) => (
              <div key={event} className="flex items-center">
                <input
                  type="checkbox"
                  id={event}
                  defaultChecked
                  className="h-4 w-4 text-crypto-cyan focus:ring-crypto-cyan border-white/10 rounded"
                />
                <label htmlFor={event} className="ml-2 block text-sm text-crypto-white">
                  {event}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end">
          <button className="px-4 py-2 bg-crypto-cyan text-crypto-blue rounded-md hover:bg-crypto-cyan/90 transition-colors">
            Save Webhook Settings
          </button>
        </div>
      </div>
    </div>
  )
} 