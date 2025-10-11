"use client";

import { useEffect } from "react";
import styles from "./TacticsIframe.module.css";

interface TacticsIframeProps {
  stake: number;
}

export function TacticsIframe({ stake }: TacticsIframeProps) {
  useEffect(() => {
    let mounted = true;
    const container = document.getElementById("tactics-game-container");
    const bundleUrl = "/game-assets/game.bundle.js";

    const onEnd = async (result: string, score: number) => {
      // Emit a window message for other parts of the app
      window.postMessage({ type: "game-ended", result, score }, "*");

      // Optionally record on-chain (if staking contract set)
      try {
        const contractAddr = (window as any).__TACTS_STAKING_ADDRESS || '';
        if (contractAddr) {
          const res = await import("@/lib/gameAdapter").then((m) =>
            m.recordGameResultOnChain(contractAddr, result, score, stake),
          );
          console.log("recordGameResultOnChain result:", res);
        }
      } catch (e) {
        console.error("Failed to record game result on chain:", e);
      }
    };

    (async () => {
      try {
        // Try to load the bundle and mount
        const { loadGameBundle, mountGame } = await import("@/lib/gameAdapter");
        await loadGameBundle(bundleUrl);
        if (!mounted) return;
        if (container) {
          await mountGame(container, stake, onEnd);
        }
      } catch (err) {
        console.warn("Game bundle not available or mount failed, falling back to placeholder", err);
      }
      // emit ready (so existing listeners behave similarly)
      window.postMessage({ type: "game-ready", stake: String(stake) }, "*");
    })();

    return () => {
      mounted = false;
    };
  }, [stake]);

  return (
    <div className={styles.iframeContainer}>
      <div className={styles.gameInfo}>
        <span className={styles.infoLabel}>Current Stake:</span>
        <span className={styles.infoValue}>{stake} TACT</span>
      </div>

      <div id="tactics-game-container" className={styles.gameContainer}>
        {/* placeholder content — will be replaced by mounted game when bundle is present */}
        <h1 style={{ fontSize: '2rem', color: '#667eea', marginBottom: 8 }}>🎮 Tactics Game Engine</h1>
        <div style={{ color: '#cccccc', lineHeight: 1.6 }}>
          <p>Tactics game engine from <strong>pongstylin/tactics</strong></p>
          <p>will be integrated here</p>
        </div>

        <div style={{ marginTop: 12, padding: '8px 16px', background: 'rgba(102,126,234,0.08)', border: '1px solid #667eea', borderRadius: 8 }}>
          <p>Current Stake: <span style={{ color: '#667eea', fontWeight: 700 }}>{stake}</span> TACT</p>
        </div>

        <div style={{ marginTop: 18, width: 300, height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px solid #667eea', borderRadius: 8, background: 'repeating-linear-gradient(45deg,#2d3748,#2d3748 10px,#1a202c 10px,#1a202c 20px)' }}>
          <div style={{ background: 'rgba(0,0,0,0.7)', padding: '1rem 2rem', borderRadius: 8, fontSize: 16 }}>Game Board<br/>Placeholder</div>
        </div>

        <div style={{ marginTop: 16, padding: 12, background: 'rgba(118,75,162,0.06)', borderLeft: '4px solid #764ba2', borderRadius: 4, color: '#aaaaaa', textAlign: 'left' }}>
          <strong>Note:</strong> This is a placeholder for the game engine. The actual tactics game from pongstylin/tactics repository will be integrated here.
        </div>
      </div>
    </div>
  );
}
