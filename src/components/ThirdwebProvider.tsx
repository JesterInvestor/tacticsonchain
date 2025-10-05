"use client";

import { ThirdwebProvider as ThirdwebSDKProvider } from "@thirdweb-dev/react";
import { BaseGoerli } from "@thirdweb-dev/chains";

const activeChain = BaseGoerli;

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
