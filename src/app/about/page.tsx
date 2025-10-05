"use client";

import Link from "next/link";
import styles from "./about.module.css";

export default function AboutPage() {
  return (
    <div className={styles.aboutPage}>
      <header className={styles.header}>
        <Link href="/" className={styles.backButton}>
          ← Back to Home
        </Link>
        <h1>About Tactics on Chain</h1>
      </header>

      <main className={styles.main}>
        <div className={styles.container}>
          <section className={styles.section}>
            <h2>What is Tactics on Chain?</h2>
            <p>
              Tactics on Chain is a blockchain-enabled version of the tactical turn-based 
              strategy game originally created by pongstylin. We&apos;ve rebuilt this beloved game 
              as a Next.js application with full Web3 integration, bringing competitive gaming 
              to the blockchain.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Key Features</h2>
            <div className={styles.featuresGrid}>
              <div className={styles.feature}>
                <h3>🎮 Classic Gameplay</h3>
                <p>Experience the authentic tactical strategy gameplay from the original Tactics game</p>
              </div>
              <div className={styles.feature}>
                <h3>💎 $TACT Token</h3>
                <p>Native cryptocurrency for staking, rewards, and tournament entry fees</p>
              </div>
              <div className={styles.feature}>
                <h3>⛓️ Base Network</h3>
                <p>Built on Base for fast, cheap, and secure transactions</p>
              </div>
              <div className={styles.feature}>
                <h3>🔒 Thirdweb Integration</h3>
                <p>Easy wallet connection and seamless Web3 onboarding</p>
              </div>
              <div className={styles.feature}>
                <h3>🏆 On-Chain Staking</h3>
                <p>Stake your tokens to participate in competitive matches</p>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2>How to Play</h2>
            <ol className={styles.steps}>
              <li>
                <strong>Connect Your Wallet:</strong> Use any Web3 wallet to connect to the game
              </li>
              <li>
                <strong>Get $TACT Tokens:</strong> Purchase tokens in the shop to participate
              </li>
              <li>
                <strong>Stake Tokens:</strong> Stake your $TACT to enter competitive matches
              </li>
              <li>
                <strong>Play & Win:</strong> Compete in tactical battles and earn rewards
              </li>
            </ol>
          </section>

          <section className={styles.section}>
            <h2>Technology Stack</h2>
            <div className={styles.techStack}>
              <div className={styles.tech}>
                <strong>Frontend:</strong> Next.js 14 with TypeScript
              </div>
              <div className={styles.tech}>
                <strong>Blockchain:</strong> Base (Ethereum L2)
              </div>
              <div className={styles.tech}>
                <strong>Web3:</strong> Thirdweb SDK
              </div>
              <div className={styles.tech}>
                <strong>Hosting:</strong> Vercel
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2>Credits</h2>
            <p>
              This project is based on the original Tactics game by Dave Clark (pongstylin). 
              The original game source code is available at{" "}
              <a 
                href="https://github.com/pongstylin/tactics" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.link}
              >
                github.com/pongstylin/tactics
              </a>
            </p>
            <p>
              We&apos;ve adapted and extended the game to work with blockchain technology while 
              preserving the core gameplay experience that made the original so beloved.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Open Source</h2>
            <p>
              Like the original Tactics game, this project is open source. The source code 
              is available on GitHub for anyone to review, contribute to, or fork.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
