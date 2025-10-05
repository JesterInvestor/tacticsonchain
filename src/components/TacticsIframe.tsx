"use client";

import { useEffect, useRef } from "react";
import styles from "./TacticsIframe.module.css";

interface TacticsIframeProps {
  stake: number;
}

export function TacticsIframe({ stake }: TacticsIframeProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Handle messages from the game iframe
      if (event.data?.type === "game-ready") {
        console.log("Game loaded successfully with stake:", event.data.stake);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div className={styles.iframeContainer}>
      <div className={styles.gameInfo}>
        <span className={styles.infoLabel}>Current Stake:</span>
        <span className={styles.infoValue}>{stake} TACT</span>
      </div>
      <iframe
        ref={iframeRef}
        src={`/game-assets/index.html?stake=${stake}`}
        className={styles.iframe}
        title="Tactics Game"
        allow="fullscreen"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
}
