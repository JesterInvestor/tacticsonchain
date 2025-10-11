"use client";

import { useState } from "react";
import Link from "next/link";
import { useAddress } from "@/lib/wallet";
import styles from "./shop.module.css";

const TACT_PACKAGES = [
  { amount: 100, price: "0.01", bonus: 0 },
  { amount: 500, price: "0.045", bonus: 10 },
  { amount: 1000, price: "0.085", bonus: 15 },
  { amount: 5000, price: "0.4", bonus: 20 },
];

export default function ShopPage() {
  const address = useAddress();
  const [purchasing, setPurchasing] = useState(false);

  const handlePurchase = async (pkg: typeof TACT_PACKAGES[0]) => {
    if (!address) {
      alert("Please connect your wallet first");
      return;
    }

    setPurchasing(true);
    try {
      console.log("Purchasing", pkg.amount, "TACT for", pkg.price, "ETH");
      alert(`Purchase functionality will be implemented with smart contract\nAmount: ${pkg.amount} TACT\nPrice: ${pkg.price} ETH`);
    } catch (error) {
      console.error("Purchase error:", error);
      alert("Purchase failed. Please try again.");
    } finally {
      setPurchasing(false);
    }
  };

  return (
    <div className={styles.shopPage}>
      <header className={styles.header}>
        <Link href="/" className={styles.backButton}>
          ← Back to Home
        </Link>
        <h1>Get $TACT Tokens</h1>
      </header>

      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.intro}>
            <h2>Purchase $TACT Tokens</h2>
            <p>
              $TACT is the native token for Tactics on Chain. Use it to stake, 
              enter competitive matches, and earn rewards.
            </p>
          </div>

          {!address ? (
            <div className={styles.connectPrompt}>
              <p>Please connect your wallet to purchase $TACT tokens</p>
            </div>
          ) : (
            <div className={styles.packagesGrid}>
              {TACT_PACKAGES.map((pkg) => (
                <div key={pkg.amount} className={styles.packageCard}>
                  <div className={styles.packageHeader}>
                    <span className={styles.amount}>{pkg.amount}</span>
                    <span className={styles.tactLabel}>TACT</span>
                  </div>
                  
                  {pkg.bonus > 0 && (
                    <div className={styles.bonus}>
                      +{pkg.bonus}% Bonus
                    </div>
                  )}
                  
                  <div className={styles.packagePrice}>
                    <span className={styles.price}>{pkg.price}</span>
                    <span className={styles.currency}>ETH</span>
                  </div>
                  
                  <div className={styles.packageDetails}>
                    <div className={styles.detail}>
                      <span>Total Tokens:</span>
                      <span className={styles.detailValue}>
                        {Math.floor(pkg.amount * (1 + pkg.bonus / 100))}
                      </span>
                    </div>
                    <div className={styles.detail}>
                      <span>Value per Token:</span>
                      <span className={styles.detailValue}>
                        {(parseFloat(pkg.price) / pkg.amount).toFixed(6)} ETH
                      </span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handlePurchase(pkg)}
                    disabled={purchasing}
                    className={styles.purchaseButton}
                  >
                    {purchasing ? "Processing..." : "Purchase"}
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className={styles.infoSection}>
            <h3>About $TACT Token</h3>
            <div className={styles.infoGrid}>
              <div className={styles.infoCard}>
                <h4>🎮 Gaming Utility</h4>
                <p>Use $TACT to enter competitive matches and tournaments</p>
              </div>
              <div className={styles.infoCard}>
                <h4>💰 Staking Rewards</h4>
                <p>Stake your tokens to earn passive rewards</p>
              </div>
              <div className={styles.infoCard}>
                <h4>🏆 Tournament Prizes</h4>
                <p>Win $TACT by competing in tournaments</p>
              </div>
              <div className={styles.infoCard}>
                <h4>⛓️ On-Chain</h4>
                <p>Built on Base for fast and cheap transactions</p>
              </div>
            </div>
          </div>

          <div className={styles.disclaimer}>
            <p>
              <strong>Note:</strong> $TACT tokens are deployed on Base network. 
              Make sure your wallet is connected to the correct network before purchasing.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
