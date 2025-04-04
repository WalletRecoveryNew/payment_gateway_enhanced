'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Create wallet context
type WalletContextType = {
  isConnected: boolean;
  address?: string | undefined;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  isSolana: boolean;
  solanaAddress?: string | undefined;
  chainId?: number | undefined;
};

const WalletContext = createContext<WalletContextType>({
  isConnected: false,
  address: undefined,
  connect: async () => {},
  disconnect: async () => {},
  isSolana: false,
  solanaAddress: undefined,
  chainId: undefined
});

export function useWallet() {
  return useContext(WalletContext);
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WalletProvider>
      {children}
    </WalletProvider>
  );
}

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string>();
  const [isSolana, setIsSolana] = useState(false);
  const [solanaAddress, setSolanaAddress] = useState<string>();
  const [chainId, setChainId] = useState<number>();

  const connect = async () => {
    try {
      // For Solana wallets
      if (window.solana && window.solana.isPhantom) {
        setIsSolana(true);
        await window.solana.connect();
        if (window.solana.publicKey) {
          const solPubkey = window.solana.publicKey.toString();
          setAddress(solPubkey);
          setSolanaAddress(solPubkey);
          setChainId(501); // Solana mainnet chain ID
          setIsConnected(true);
        }
      } 
      // For Ethereum wallets
      else if (window.ethereum) {
        setIsSolana(false);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' }) as string[];
        if (accounts.length > 0) {
          setAddress(accounts[0]);
          
          // Get the current chain ID
          const chainIdHex = await window.ethereum.request({ method: 'eth_chainId' }) as string;
          setChainId(parseInt(chainIdHex, 16));
          
          setIsConnected(true);
        }
      } else {
        console.error('No wallet found');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const disconnect = async () => {
    try {
      if (window.solana && isSolana) {
        await window.solana.disconnect();
        setAddress(undefined);
        setSolanaAddress(undefined);
        setIsConnected(false);
        setIsSolana(false);
      }
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
    }
  };

  useEffect(() => {
    // Ethereum wallet events
    if (window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          setIsConnected(false);
          setAddress(undefined);
        } else {
          setIsConnected(true);
          setAddress(accounts[0]);
        }
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged as (...args: unknown[]) => void);

      // Check if already connected
      window.ethereum
        .request({ method: 'eth_accounts' })
        .then((accounts: unknown) => {
          if (Array.isArray(accounts) && accounts.length > 0) {
            setIsConnected(true);
            setAddress(accounts[0] as string);
            setIsSolana(false);
            
            // Get chain ID
            window.ethereum?.request({ method: 'eth_chainId' })
              .then((chainId: unknown) => {
                if (typeof chainId === 'string') {
                  setChainId(parseInt(chainId, 16));
                }
              })
              .catch(console.error);
          }
        })
        .catch(console.error);
    }

    // Solana wallet events
    if (window.solana) {
      const handleSolanaConnect = () => {
        if (window.solana.publicKey) {
          setIsConnected(true);
          setIsSolana(true);
          const pubkey = window.solana.publicKey.toString();
          setAddress(pubkey);
          setSolanaAddress(pubkey);
          setChainId(501); // Solana mainnet
        }
      };

      window.solana.on('connect', handleSolanaConnect);

      // Check if already connected
      if (window.solana.isPhantom && window.solana.publicKey) {
        handleSolanaConnect();
      }
    }

    return () => {
      // Cleanup
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', () => {});
      }
      if (window.solana) {
        window.solana.removeAllListeners();
      }
    };
  }, []);

  const value = {
    isConnected,
    address: isSolana ? solanaAddress : address,
    connect,
    disconnect,
    isSolana,
    solanaAddress,
    chainId
  };
  
  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
}
