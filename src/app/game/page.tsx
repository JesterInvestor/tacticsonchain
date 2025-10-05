"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./game.module.css";

export default function GamePage() {
  const gameContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Game initialization logic will go here
    // This would load the tactics game engine
    console.log("Game container ready");
  }, []);

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
        <div ref={gameContainerRef} id="game-container" className={styles.gameContainer}>
          <div className={styles.placeholder}>
            <h2>Tactics Game Engine</h2>
            <p>The tactics game will be rendered here</p>
            <p className={styles.note}>
              Game engine from pongstylin/tactics will be integrated here
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
