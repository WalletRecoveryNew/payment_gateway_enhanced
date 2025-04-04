/**
 * CryptoFlow Payment Gateway JavaScript SDK
 * Version: 1.0.0
 * 
 * This SDK allows merchants to easily integrate CryptoFlow payment processing
 * into their websites with minimal code.
 */

(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.CryptoFlow = factory());
}(this, function() {
  'use strict';
  
  // Default configuration
  const DEFAULT_CONFIG = {
    apiUrl: 'https://api.cryptoflow.com/v1',
    modalId: 'cryptoflow-payment-modal',
    debug: false
  };
  
  /**
   * CryptoFlow SDK main class
   */
  class CryptoFlow {
    /**
     * Initialize the SDK
     * 
     * @param {string} apiKey - Your CryptoFlow API key
     * @param {Object} options - Configuration options
     */
    constructor(apiKey, options = {}) {
      if (!apiKey) {
        throw new Error('API key is required');
      }
      
      this.apiKey = apiKey;
      this.config = { ...DEFAULT_CONFIG, ...options };
      this.eventListeners = {};
      
      this._log('CryptoFlow SDK initialized');
    }
    
    /**
     * Create a new payment
     * 
     * @param {Object} paymentData - Payment details
     * @returns {Promise<Object>} - Payment object
     */
    async createPayment(paymentData) {
      this._validatePaymentData(paymentData);
      
      try {
        const response = await this._apiRequest('/payments', {
          method: 'POST',
          body: JSON.stringify(paymentData)
        });
        
        this._log('Payment created', response);
        this._triggerEvent('payment.created', response);
        
        return response;
      } catch (error) {
        this._log('Error creating payment', error, true);
        throw error;
      }
    }
    
    /**
     * Get payment details
     * 
     * @param {string} paymentId - Payment ID
     * @returns {Promise<Object>} - Payment object
     */
    async getPayment(paymentId) {
      if (!paymentId) {
        throw new Error('Payment ID is required');
      }
      
      try {
        const response = await this._apiRequest(`/payments/${paymentId}`);
        
        this._log('Payment retrieved', response);
        return response;
      } catch (error) {
        this._log('Error retrieving payment', error, true);
        throw error;
      }
    }
    
    /**
     * Open the payment modal
     * 
     * @param {string} paymentId - Payment ID
     */
    openPaymentModal(paymentId) {
      if (!paymentId) {
        throw new Error('Payment ID is required');
      }
      
      // Create or get the modal element
      let modal = document.getElementById(this.config.modalId);
      
      if (!modal) {
        modal = document.createElement('div');
        modal.id = this.config.modalId;
        document.body.appendChild(modal);
      }
      
      // Set up the modal content
      modal.innerHTML = `
        <div class="cryptoflow-modal">
          <div class="cryptoflow-modal-content">
            <div class="cryptoflow-modal-header">
              <h2>Complete Your Payment</h2>
              <button class="cryptoflow-close-button">&times;</button>
            </div>
            <div class="cryptoflow-modal-body">
              <iframe 
                src="${this._getPaymentUrl(paymentId)}" 
                frameborder="0" 
                width="100%" 
                height="600px">
              </iframe>
            </div>
          </div>
        </div>
      `;
      
      // Add styles
      this._injectStyles();
      
      // Add event listeners
      const closeButton = modal.querySelector('.cryptoflow-close-button');
      closeButton.addEventListener('click', () => this.closePaymentModal());
      
      // Show the modal
      modal.style.display = 'block';
      
      // Set up message listener for iframe communication
      this._setupMessageListener();
      
      this._log('Payment modal opened', { paymentId });
    }
    
    /**
     * Close the payment modal
     */
    closePaymentModal() {
      const modal = document.getElementById(this.config.modalId);
      
      if (modal) {
        modal.style.display = 'none';
        this._log('Payment modal closed');
      }
    }
    
    /**
     * Add event listener
     * 
     * @param {string} event - Event name
     * @param {Function} callback - Callback function
     */
    on(event, callback) {
      if (typeof callback !== 'function') {
        throw new Error('Callback must be a function');
      }
      
      if (!this.eventListeners[event]) {
        this.eventListeners[event] = [];
      }
      
      this.eventListeners[event].push(callback);
      this._log(`Event listener added for ${event}`);
      
      return this;
    }
    
    /**
     * Remove event listener
     * 
     * @param {string} event - Event name
     * @param {Function} callback - Callback function
     */
    off(event, callback) {
      if (!this.eventListeners[event]) {
        return this;
      }
      
      this.eventListeners[event] = this.eventListeners[event].filter(
        cb => cb !== callback
      );
      
      this._log(`Event listener removed for ${event}`);
      
      return this;
    }
    
    /**
     * Make an API request
     * 
     * @private
     * @param {string} endpoint - API endpoint
     * @param {Object} options - Fetch options
     * @returns {Promise<Object>} - Response data
     */
    async _apiRequest(endpoint, options = {}) {
      const url = `${this.config.apiUrl}${endpoint}`;
      
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      };
      
      const fetchOptions = {
        ...options,
        headers: {
          ...headers,
          ...(options.headers || {})
        }
      };
      
      const response = await fetch(url, fetchOptions);
      
      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.error || `API request failed with status ${response.status}`);
      }
      
      return response.json();
    }
    
    /**
     * Validate payment data
     * 
     * @private
     * @param {Object} data - Payment data
     */
    _validatePaymentData(data) {
      if (!data) {
        throw new Error('Payment data is required');
      }
      
      if (!data.amount) {
        throw new Error('Payment amount is required');
      }
      
      if (!data.currency) {
        throw new Error('Payment currency is required');
      }
      
      if (!data.chainId) {
        throw new Error('Chain ID is required');
      }
    }
    
    /**
     * Get payment URL
     * 
     * @private
     * @param {string} paymentId - Payment ID
     * @returns {string} - Payment URL
     */
    _getPaymentUrl(paymentId) {
      // Use the actual payment URL from your application
      return `${window.location.origin}/payment/${paymentId}`;
    }
    
    /**
     * Inject modal styles
     * 
     * @private
     */
    _injectStyles() {
      if (document.getElementById('cryptoflow-styles')) {
        return;
      }
      
      const style = document.createElement('style');
      style.id = 'cryptoflow-styles';
      
      style.innerHTML = `
        .cryptoflow-modal {
          display: none;
          position: fixed;
          z-index: 9999;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          overflow: auto;
          background-color: rgba(0, 0, 0, 0.5);
        }
        
        .cryptoflow-modal-content {
          background-color: #fefefe;
          margin: 5% auto;
          padding: 0;
          border: 1px solid #888;
          width: 80%;
          max-width: 600px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        
        .cryptoflow-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 20px;
          border-bottom: 1px solid #eee;
        }
        
        .cryptoflow-modal-header h2 {
          margin: 0;
          font-size: 1.5rem;
          color: #333;
        }
        
        .cryptoflow-close-button {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #aaa;
        }
        
        .cryptoflow-close-button:hover {
          color: #333;
        }
        
        .cryptoflow-modal-body {
          padding: 0;
        }
      `;
      
      document.head.appendChild(style);
    }
    
    /**
     * Set up message listener for iframe communication
     * 
     * @private
     */
    _setupMessageListener() {
      window.addEventListener('message', (event) => {
        // Verify the origin
        if (event.origin !== window.location.origin) {
          return;
        }
        
        const { type, data } = event.data;
        
        if (type && type.startsWith('payment.')) {
          this._log(`Received message: ${type}`, data);
          this._triggerEvent(type, data);
          
          // Close the modal for completed or failed payments
          if (type === 'payment.completed' || type === 'payment.failed') {
            this.closePaymentModal();
          }
        }
      });
    }
    
    /**
     * Trigger an event
     * 
     * @private
     * @param {string} event - Event name
     * @param {Object} data - Event data
     */
    _triggerEvent(event, data) {
      if (!this.eventListeners[event]) {
        return;
      }
      
      this.eventListeners[event].forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          this._log(`Error in event listener for ${event}`, error, true);
        }
      });
    }
    
    /**
     * Log a message
     * 
     * @private
     * @param {string} message - Log message
     * @param {Object} data - Log data
     * @param {boolean} isError - Whether this is an error log
     */
    _log(message, data, isError = false) {
      if (!this.config.debug) {
        return;
      }
      
      const logMethod = isError ? console.error : console.log;
      
      if (data) {
        logMethod(`[CryptoFlow] ${message}:`, data);
      } else {
        logMethod(`[CryptoFlow] ${message}`);
      }
    }
  }
  
  return CryptoFlow;
}));
