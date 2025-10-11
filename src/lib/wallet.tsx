"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type WalletContextValue = {
  address: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  setAddress: (addr: string | null) => void;
};

const WalletContext = createContext<WalletContextValue | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [address, setAddressState] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("wallet_address");
      if (stored) setAddressState(stored);
    } catch (e) {
      // ignore (SSR or no localStorage)
    }
  }, []);

  const setAddress = (addr: string | null) => {
    try {
      if (addr) localStorage.setItem("wallet_address", addr);
      else localStorage.removeItem("wallet_address");
    } catch (e) {
      // ignore
    }
    setAddressState(addr);
  };

  const connect = async () => {
    // Minimal UX: prompt user to paste their address.
    // Replace or extend with real wallet/Waypoint integration as needed.
    const input = prompt("Enter your wallet address (0x...)");
    if (input && input.trim()) {
      setAddress(input.trim());
    }
  };

  const disconnect = () => setAddress(null);

  return (
    <WalletContext.Provider value={{ address, connect, disconnect, setAddress }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWallet must be used within WalletProvider");
  return ctx;
}

export function useAddress() {
  const { address } = useWallet();
  return address;
}
