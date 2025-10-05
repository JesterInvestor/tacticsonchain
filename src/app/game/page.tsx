"use client";

import Link from "next/link";
import styles from "./game.module.css";
import TacticsGame from "@/components/TacticsGame";

export default function GamePage() {
  return (
    <div className={styles.gamePage}>
      <header className={styles.header}>
        <Link href="/" className={styles.backButton}>
          ← Back to Home
        </Link>
        <h1>Tactics Game</h1>
        <div className={styles.gameInfo}>
          {/* Game info and controls will go here */}
        </div>
      </header>
      
      <main className={styles.gameMain}>
        <div id="game-container" className={styles.gameContainer}>
          <TacticsGame />
        </div>
      </main>
    </div>
  );
}
