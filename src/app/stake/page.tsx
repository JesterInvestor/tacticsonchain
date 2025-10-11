"use client";

import { useState } from "react";
import Link from "next/link";
import { useAddress } from "@/lib/wallet";
import styles from "./stake.module.css";

export default function StakePage() {
  const address = useAddress();
  const [stakeAmount, setStakeAmount] = useState("");
  const [isStaking, setIsStaking] = useState(false);

  const handleStake = async () => {
    if (!address) {
      alert("Please connect your wallet first");
      return;
    }

    if (!stakeAmount || parseFloat(stakeAmount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    setIsStaking(true);
    try {
      // Staking logic will be implemented here
      console.log("Staking", stakeAmount, "TACT tokens");
      alert("Staking functionality will be implemented with smart contract");
    } catch (error) {
      console.error("Staking error:", error);
      alert("Staking failed. Please try again.");
    } finally {
      setIsStaking(false);
    }
  };

  return (
    <div className={styles.stakePage}>
      <header className={styles.header}>
        <Link href="/" className={styles.backButton}>
          ← Back to Home
        </Link>
        <h1>Stake $TACT</h1>
      </header>

      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.infoCard}>
            <h2>Staking Information</h2>
            <div className={styles.statsGrid}>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Your Balance</span>
                <span className={styles.statValue}>0 TACT</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Staked Amount</span>
                <span className={styles.statValue}>0 TACT</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statLabel}>APY</span>
                <span className={styles.statValue}>12%</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Total Staked</span>
                <span className={styles.statValue}>0 TACT</span>
              </div>
            </div>
          </div>

          <div className={styles.stakeCard}>
            <h2>Stake Tokens</h2>
            <p className={styles.description}>
              Stake $TACT tokens to participate in on-chain games on Base network
            </p>

            {!address ? (
              <div className={styles.connectPrompt}>
                <p>Please connect your wallet to stake tokens</p>
              </div>
            ) : (
              <div className={styles.stakeForm}>
                <div className={styles.inputGroup}>
                  <label htmlFor="amount">Amount to Stake</label>
                  <input
                    id="amount"
                    type="number"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                    placeholder="Enter amount"
                    className={styles.input}
                    min="0"
                    step="0.01"
                  />
                  <span className={styles.currency}>TACT</span>
                </div>

                <button
                  onClick={handleStake}
                  disabled={isStaking}
                  className={styles.stakeButton}
                >
                  {isStaking ? "Staking..." : "Stake Tokens"}
                </button>

                <div className={styles.actions}>
                  <button className={styles.secondaryButton}>
                    Unstake Tokens
                  </button>
                  <button className={styles.secondaryButton}>
                    Claim Rewards
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className={styles.infoSection}>
            <h3>How Staking Works</h3>
            <ul>
              <li>Stake $TACT tokens to participate in on-chain games</li>
              <li>Earn rewards while your tokens are staked</li>
              <li>Unstake anytime (with a cooldown period)</li>
              <li>Use staked tokens as entry fees for competitive matches</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
