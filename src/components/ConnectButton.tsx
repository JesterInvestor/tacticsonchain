"use client";

import { ConnectWallet } from "@thirdweb-dev/react";

export function ConnectButton() {
  return (
    <ConnectWallet
      theme="dark"
      btnTitle="Connect Wallet"
      modalTitle="Connect to Tactics on Chain"
      modalSize="wide"
      welcomeScreen={{
        title: "Welcome to Tactics on Chain",
        subtitle: "Connect your wallet to play and stake $TACT tokens",
      }}
    />
  );
}
