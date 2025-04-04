// Extend the Window interface to include the ethereum and solana properties
declare global {
  interface Window {
    ethereum?: {
      request: (request: { method: string; params?: unknown[] }) => Promise<unknown>;
      on: (event: string, callback: (...args: unknown[]) => void) => void;
      removeListener: (event: string, callback: (...args: unknown[]) => void) => void;
    };
    solana: {
      isPhantom: boolean;
      connect: () => Promise<void>;
      disconnect: () => Promise<void>;
      publicKey: string;
      on: (event: string, callback: (...args: unknown[]) => void) => void;
      removeAllListeners: () => void;
    };
  }
}

export {}
