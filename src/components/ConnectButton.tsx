"use client";

import { useWallet } from "@/lib/wallet";

export function ConnectButton() {
  const { address, connect, disconnect } = useWallet();

  if (address) {
    return (
      <div>
        <span style={{ marginRight: 8 }}>{address}</span>
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    );
  }

  return <button onClick={() => connect()}>Connect Wallet</button>;
}
