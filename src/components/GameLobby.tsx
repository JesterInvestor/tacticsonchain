"use client";

import { useState } from "react";
import { useAddress } from "@thirdweb-dev/react";
import { ConnectButton } from "./ConnectButton";
import { GAME_STAKE_PRESETS } from "@/lib/constants";
import styles from "./GameLobby.module.css";

interface GameLobbyProps {
  onStart: (stakeAmount: number) => void;
}

export function GameLobby({ onStart }: GameLobbyProps) {
  const address = useAddress();
  const [stakeAmount, setStakeAmount] = useState<string>("");
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);

  const handlePresetClick = (preset: number) => {
    setSelectedPreset(preset);
    setStakeAmount(preset.toString());
  };

  const handleCustomAmountChange = (value: string) => {
    setStakeAmount(value);
    setSelectedPreset(null);
  };

  const handleStart = () => {
    const amount = parseFloat(stakeAmount);
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid stake amount");
      return;
    }
    onStart(amount);
  };

  return (
    <div className={styles.lobby}>
      <div className={styles.lobbyContainer}>
        <h2 className={styles.title}>Game Lobby</h2>
        <p className={styles.description}>
          Select your stake amount to enter the game
        </p>

        {!address ? (
          <div className={styles.connectSection}>
            <p className={styles.connectMessage}>
              Connect your wallet to continue
            </p>
            <ConnectButton />
          </div>
        ) : (
          <div className={styles.stakeSelection}>
            <div className={styles.presets}>
              <label className={styles.label}>Quick Select:</label>
              <div className={styles.presetButtons}>
                {GAME_STAKE_PRESETS.map((preset) => (
                  <button
                    key={preset}
                    onClick={() => handlePresetClick(preset)}
                    className={`${styles.presetButton} ${
                      selectedPreset === preset ? styles.selected : ""
                    }`}
                  >
                    {preset} TACT
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.customAmount}>
              <label htmlFor="custom-stake" className={styles.label}>
                Or Enter Custom Amount:
              </label>
              <div className={styles.inputGroup}>
                <input
                  id="custom-stake"
                  type="number"
                  value={stakeAmount}
                  onChange={(e) => handleCustomAmountChange(e.target.value)}
                  placeholder="Enter stake amount"
                  className={styles.input}
                  min="0"
                  step="1"
                />
                <span className={styles.currency}>TACT</span>
              </div>
            </div>

            <button
              onClick={handleStart}
              disabled={!stakeAmount || parseFloat(stakeAmount) <= 0}
              className={styles.startButton}
            >
              Start Game
            </button>

            <div className={styles.info}>
              <p>
                <strong>Note:</strong> In the full version, your stake will be
                verified against your on-chain balance.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
