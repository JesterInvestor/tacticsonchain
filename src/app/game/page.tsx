"use client";

import { useState } from "react";
import Link from "next/link";
import { GameLobby } from "@/components/GameLobby";
import { TacticsIframe } from "@/components/TacticsIframe";
import styles from "./game.module.css";

export default function GamePage() {
  const [stake, setStake] = useState<number | null>(null);

  const handleStartGame = (stakeAmount: number) => {
    setStake(stakeAmount);
  };

  return (
    <div className={styles.gamePage}>
      <header className={styles.header}>
        <Link href="/" className={styles.backButton}>
          ← Back to Home
        </Link>
        <h1>Tactics Game</h1>
        <div className={styles.gameInfo}>
          {stake && (
            <span className={styles.stakeDisplay}>Stake: {stake} TACT</span>
          )}
        </div>
      </header>

      {!stake ? (
        <GameLobby onStart={handleStartGame} />
      ) : (
        <main className={styles.gameMain}>
          <TacticsIframe stake={stake} />
        </main>
      )}
    </div>
  );
}
