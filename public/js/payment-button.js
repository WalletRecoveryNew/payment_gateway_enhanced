/**
 * CryptoFlow Payment Button
 * Version: 1.0.0
 * 
 * This script allows merchants to easily add a payment button to their website.
 * Simply include this script and add a div with the id "crypto-payment-button"
 * and the necessary data attributes.
 */

(function() {
  'use strict';
  
  // Default configuration
  const DEFAULT_CONFIG = {
    apiUrl: 'https://api.cryptoflow.com/v1',
    buttonText: 'Pay with Crypto',
    buttonTheme: 'light',
    buttonSize: 'medium'
  };
  
  // Button themes
  const THEMES = {
    light: {
      background: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
      color: '#333333',
      border: '1px solid #e0e0e0',
      hoverBackground: 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
    },
    dark: {
      background: 'linear-gradient(135deg, #333333 0%, #222222 100%)',
      color: '#ffffff',
      border: '1px solid #444444',
      hoverBackground: 'linear-gradient(135deg, #444444 0%, #333333 100%)',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
    },
    blue: {
      background: 'linear-gradient(135deg, #0088cc 0%, #0077b5 100%)',
      color: '#ffffff',
      border: '1px solid #0077b5',
      hoverBackground: 'linear-gradient(135deg, #0099dd 0%, #0088cc 100%)',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    },
    crypto: {
      background: 'linear-gradient(135deg, #7b3fe4 0%, #5a2da0 100%)',
      color: '#ffffff',
      border: '1px solid #5a2da0',
      hoverBackground: 'linear-gradient(135deg, #8c4ff5 0%, #7b3fe4 100%)',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.15)'
    }
  };
  
  // Button sizes
  const SIZES = {
    small: {
      padding: '8px 16px',
      fontSize: '14px',
      borderRadius: '4px'
    },
    medium: {
      padding: '12px 20px',
      fontSize: '16px',
      borderRadius: '6px'
    },
    large: {
      padding: '16px 24px',
      fontSize: '18px',
      borderRadius: '8px'
    }
  };
  
  /**
   * Initialize the payment button
   */
  function init() {
    // Find all payment button containers
    const containers = document.querySelectorAll('[id^="crypto-payment-button"]');
    
    if (containers.length === 0) {
      return;
    }
    
    // Load the SDK if not already loaded
    loadSdk().then(() => {
      // Initialize each button
      containers.forEach(initializeButton);
    });
  }
  
  /**
   * Load the CryptoFlow SDK
   * 
   * @returns {Promise} - Promise that resolves when the SDK is loaded
   */
  function loadSdk() {
    return new Promise((resolve, reject) => {
      if (window.CryptoFlow) {
        resolve();
        return;
      }
      
      const script = document.createElement('script');
      script.src = 'https://cdn.cryptoflow.com/js/cryptoflow-sdk.js';
      script.async = true;
      
      script.onload = resolve;
      script.onerror = reject;
      
      document.head.appendChild(script);
    });
  }
  
  /**
   * Initialize a payment button
   * 
   * @param {HTMLElement} container - Button container element
   */
  function initializeButton(container) {
    // Get configuration from data attributes
    const config = {
      ...DEFAULT_CONFIG,
      apiKey: container.getAttribute('data-api-key'),
      amount: container.getAttribute('data-amount'),
      currency: container.getAttribute('data-currency'),
      chainId: parseInt(container.getAttribute('data-chain-id') || '1', 10),
      description: container.getAttribute('data-description') || '',
      buttonText: container.getAttribute('data-button-text') || DEFAULT_CONFIG.buttonText,
      buttonTheme: container.getAttribute('data-button-theme') || DEFAULT_CONFIG.buttonTheme,
      buttonSize: container.getAttribute('data-button-size') || DEFAULT_CONFIG.buttonSize,
      redirectUrl: container.getAttribute('data-redirect-url') || '',
      cancelUrl: container.getAttribute('data-cancel-url') || ''
    };
    
    // Validate required fields
    if (!config.apiKey) {
      console.error('[CryptoFlow] API key is required');
      return;
    }
    
    if (!config.amount) {
      console.error('[CryptoFlow] Amount is required');
      return;
    }
    
    if (!config.currency) {
      console.error('[CryptoFlow] Currency is required');
      return;
    }
    
    // Create the button
    const button = createButton(config);
    container.appendChild(button);
    
    // Initialize the SDK
    const cryptoflow = new window.CryptoFlow(config.apiKey, {
      debug: container.getAttribute('data-debug') === 'true'
    });
    
    // Set up button click handler
    button.addEventListener('click', async () => {
      try {
        button.disabled = true;
        button.innerHTML = 'Loading...';
        
        // Create the payment
        const payment = await cryptoflow.createPayment({
          amount: config.amount,
          currency: config.currency,
          chainId: config.chainId,
          description: config.description,
          redirectUrl: config.redirectUrl,
          cancelUrl: config.cancelUrl
        });
        
        // Open the payment modal
        cryptoflow.openPaymentModal(payment.id);
        
        // Reset button state
        button.disabled = false;
        button.innerHTML = config.buttonText;
        
        // Set up event listeners
        cryptoflow.on('payment.completed', (data) => {
          if (config.redirectUrl) {
            window.location.href = config.redirectUrl;
          }
        });
        
        cryptoflow.on('payment.failed', (data) => {
          if (config.cancelUrl) {
            window.location.href = config.cancelUrl;
          }
        });
      } catch (error) {
        console.error('[CryptoFlow] Payment error:', error);
        
        // Reset button state
        button.disabled = false;
        button.innerHTML = config.buttonText;
        
        // Show error message
        alert('Payment initialization failed. Please try again.');
      }
    });
  }
  
  /**
   * Create a payment button
   * 
   * @param {Object} config - Button configuration
   * @returns {HTMLElement} - Button element
   */
  function createButton(config) {
    const button = document.createElement('button');
    button.type = 'button';
    button.innerHTML = config.buttonText;
    button.className = 'cryptoflow-payment-button';
    
    // Get theme and size styles
    const theme = THEMES[config.buttonTheme] || THEMES.light;
    const size = SIZES[config.buttonSize] || SIZES.medium;
    
    // Apply styles
    Object.assign(button.style, {
      background: theme.background,
      color: theme.color,
      border: theme.border,
      boxShadow: theme.boxShadow,
      padding: size.padding,
      fontSize: size.fontSize,
      borderRadius: size.borderRadius,
      cursor: 'pointer',
      fontWeight: 'bold',
      transition: 'all 0.2s ease',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    });
    
    // Add hover effect
    button.addEventListener('mouseover', () => {
      button.style.background = theme.hoverBackground;
    });
    
    button.addEventListener('mouseout', () => {
      button.style.background = theme.background;
    });
    
    return button;
  }
  
  // Initialize when the DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
