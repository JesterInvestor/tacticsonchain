import { ethers } from "ethers";
import { CONTRACTS, CHAIN_CONFIG } from "@/lib/contracts";

type OnEndCallback = (result: string, score: number) => void;

/**
 * Injects a script tag for the game bundle and resolves when loaded.
 * Expects the bundle to attach an init function to window: `window.initTactics`
 */
export function loadGameBundle(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // Avoid injecting twice
    if ((window as any).__TACTICS_BUNDLE_LOADED) return resolve();

    const existing = document.querySelector(`script[data-tactics-bundle]`);
    if (existing) return resolve();

    const script = document.createElement("script");
    script.src = url;
    script.async = true;
    script.setAttribute("data-tactics-bundle", "true");
    script.onload = () => {
      (window as any).__TACTICS_BUNDLE_LOADED = true;
      resolve();
    };
    script.onerror = (e) => reject(new Error("Failed to load game bundle: " + url));
    document.body.appendChild(script);
  });
}

/**
 * Mounts the tactics game into a container element.
 * The game bundle should expose `window.initTactics(container, options)` or
 * attach a global `Tactics` object with `init(container, options)`.
 * We also expose helper globals the original game might expect.
 */
export async function mountGame(container: HTMLElement, stake: number, onEnd: OnEndCallback) {
  // Provide simple shims that the original code might use
  (window as any).TACTICS_ENV = {
    getStake: () => stake,
    postMessage: (msg: any) => window.postMessage(msg, "*"),
  };

  // Provide a callback the game can call when it ends
  (window as any).__TACTICS_ON_END = (result: string, score: number) => {
    try {
      onEnd(result, score);
    } catch (e) {
      console.error("Error in onEnd handler", e);
    }
    // also emit a window message for compatibility
    window.postMessage({ type: "game-ended", result, score }, "*");
  };

  // Attempt to call init exposed by bundle
  const tryInit = () => {
    const w: any = window as any;
    if (typeof w.initTactics === "function") {
      w.initTactics(container, { stake, onEnd: w.__TACTICS_ON_END });
      return true;
    }
    if (w.Tactics && typeof w.Tactics.init === "function") {
      w.Tactics.init(container, { stake, onEnd: w.__TACTICS_ON_END });
      return true;
    }
    return false;
  };

  // If an init already exists, try immediately
  if (tryInit()) return;

  // Otherwise try to poll for the init (bundle may register it later)
  const start = Date.now();
  const timeout = 10_000; // 10s
  return new Promise<void>((resolve, reject) => {
    const iv = setInterval(() => {
      if (tryInit()) {
        clearInterval(iv);
        resolve();
        return;
      }
      if (Date.now() - start > timeout) {
        clearInterval(iv);
        reject(new Error("Game bundle loaded but init function not found within timeout"));
      }
    }, 200);
  });
}

/**
 * Record a game result on-chain using ethers. This attempts to use
 * window.ethereum (Metamask) if available; otherwise it returns a message
 * instructing the dapp to sign/send the tx via other means (e.g., Waypoint).
 */
export async function recordGameResultOnChain(
  contractAddress: string,
  result: string,
  score: number,
  stake: number,
) {
  try {
    if (!(window as any).ethereum) {
      console.warn("window.ethereum not available — cannot send tx directly");
      return { success: false, error: "no_ethereum" };
    }

    const provider = new ethers.providers.Web3Provider((window as any).ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const abi = ["function recordGameResult(string result,uint256 score,uint256 stake) public"];
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const tx = await contract.recordGameResult(result, score, stake);
    const receipt = await tx.wait();
    return { success: true, txHash: receipt.transactionHash };
  } catch (e: any) {
    console.error("recordGameResultOnChain failed", e);
    return { success: false, error: String(e?.message ?? e) };
  }
}
