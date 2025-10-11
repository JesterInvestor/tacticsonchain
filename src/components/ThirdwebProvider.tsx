"use client";

import { ThirdwebProvider as ThirdwebSDKProvider } from "@thirdweb-dev/react";
// Thirdweb doesn't ship a built-in Ronin chain definition at the time of writing,
// so we provide a minimal custom chain config here. This will point the SDK
// to Ronin mainnet RPC endpoints.

const activeChain = {
  id: 49429111,
  name: "Ronin",
  network: "ronin",
  nativeCurrency: { name: "RON", symbol: "RON", decimals: 18 },
  rpcUrls: ["https://api.roninchain.com/rpc"],
  blockExplorers: [{ name: "Ronin Explorer", url: "https://explorer.roninchain.com" }],
};

export function ThirdwebProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThirdwebSDKProvider
      activeChain={activeChain}
      clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
    >
      {children}
    </ThirdwebSDKProvider>
  );
}
