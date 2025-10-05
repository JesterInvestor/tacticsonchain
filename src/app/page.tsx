"use client";

import Link from "next/link";
import { ConnectButton } from "@/components/ConnectButton";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Tactics on Chain</h1>
        <p className={styles.description}>
          A tactical turn-based strategy game with blockchain integration
        </p>
        
        <div className={styles.walletSection}>
          <ConnectButton />
        </div>

        <div className={styles.menuGrid}>
          <Link href="/game" className={styles.menuButton}>
            <h2>Play Game</h2>
            <p>Start a new tactics battle</p>
          </Link>
          
          <Link href="/stake" className={styles.menuButton}>
            <h2>Stake $TACT</h2>
            <p>Stake tokens to participate in games</p>
          </Link>
          
          <Link href="/shop" className={styles.menuButton}>
            <h2>Get $TACT</h2>
            <p>Purchase $TACT tokens</p>
          </Link>
          
          <Link href="/about" className={styles.menuButton}>
            <h2>About</h2>
            <p>Learn about Tactics on Chain</p>
          </Link>
        </div>
      </div>
    </main>
  );
}
