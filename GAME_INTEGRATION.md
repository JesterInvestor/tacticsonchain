# Game Integration Documentation

This document explains the current game integration implementation and provides guidance for future enhancements.

## Current Implementation

### Overview

The game page now features a **lobby system** where users can select their stake amount before entering the game. The actual game is rendered in an **iframe** that embeds a placeholder HTML file.

### Architecture

```
┌─────────────────────────────────────┐
│     Game Page (/game)               │
│                                     │
│  ┌────────────────────────────┐   │
│  │   GameLobby Component       │   │
│  │   - Wallet Connection       │   │
│  │   - Stake Selection         │   │
│  │   - Start Button            │   │
│  └────────────────────────────┘   │
│              ↓                      │
│  ┌────────────────────────────┐   │
│  │  TacticsIframe Component    │   │
│  │   - Displays game in iframe │   │
│  │   - Passes stake via query  │   │
│  └────────────────────────────┘   │
│              ↓                      │
│  public/game-assets/index.html     │
│  (Placeholder game engine)         │
└─────────────────────────────────────┘
```

### Components

#### 1. GameLobby (`src/components/GameLobby.tsx`)

**Purpose**: Pre-game lobby for stake selection and wallet verification.

**Features**:
- Checks if user has connected their wallet (via Thirdweb `useAddress` hook)
- Shows connect wallet button if not connected
- Displays stake presets (100, 250, 500, 1000 TACT)
- Allows custom stake amount input
- Validates stake amount before starting game

**Props**:
```typescript
interface GameLobbyProps {
  onStart: (stakeAmount: number) => void;
}
```

**Usage**:
```tsx
<GameLobby onStart={(stake) => setStake(stake)} />
```

#### 2. TacticsIframe (`src/components/TacticsIframe.tsx`)

**Purpose**: Embeds and displays the game engine.

**Features**:
- Creates an iframe pointing to `/game-assets/index.html`
- Passes stake amount as query parameter (`?stake=500`)
- Listens for postMessage events from the game
- Displays current stake at the top
- Uses sandbox attribute for security

**Props**:
```typescript
interface TacticsIframeProps {
  stake: number;
}
```

**Usage**:
```tsx
<TacticsIframe stake={500} />
```

#### 3. Game Page (`src/app/game/page.tsx`)

**Purpose**: Main page that orchestrates the lobby and game.

**Flow**:
1. Initially shows `GameLobby` component
2. User selects stake and clicks "Start Game"
3. Switches to `TacticsIframe` component with selected stake
4. Displays stake in header

### Game Assets

#### Placeholder HTML (`public/game-assets/index.html`)

This is a **placeholder** for the actual game engine. It demonstrates:

- How to receive stake amount via query parameters
- Visual styling that matches the app theme
- PostMessage communication setup
- Game board placeholder

**Query Parameters**:
- `stake`: The stake amount (e.g., `?stake=500`)

**JavaScript API**:
```javascript
// Parse stake from URL
const urlParams = new URLSearchParams(window.location.search);
const stake = urlParams.get('stake') || '0';

// Send message to parent
window.parent.postMessage({ 
  type: 'game-ready', 
  stake: stake 
}, '*');

// Listen for messages from parent
window.addEventListener('message', function(event) {
  console.log('Received message:', event.data);
});
```

## Integration with pongstylin/tactics

To integrate the actual game engine from [pongstylin/tactics](https://github.com/pongstylin/tactics):

### Option 1: Replace the HTML File

1. Clone the pongstylin/tactics repository
2. Build or copy the game's HTML/JS/CSS files
3. Place them in `public/game-assets/`
4. Update paths and ensure assets load correctly
5. Modify the game to read stake from query parameters
6. Add postMessage communication for game results

### Option 2: Deploy Separately and Update URL

1. Deploy pongstylin/tactics to a separate domain
2. Update `TacticsIframe.tsx` to point to the deployed URL:
   ```tsx
   src={`https://game.tacticsonchain.app?stake=${stake}`}
   ```
3. Ensure CORS headers are properly configured
4. Add postMessage communication between domains

### Option 3: Convert to React Component

1. Refactor the game code to work as a React component
2. Handle CommonJS/ESM module issues
3. Import and render directly instead of using iframe
4. See README.md for detailed migration guide

---

Direct integration (what this repo now provides)

This repository includes a small adapter that allows you to drop a compiled game bundle into `public/game-assets/game.bundle.js` and mount it directly inside the React app.

Files added:

- `src/lib/gameAdapter.ts` — helpers to load the bundle, mount the game into a container element, and provide shims/bridges for legacy globals. It also provides `recordGameResultOnChain` which attempts to send a transaction via `window.ethereum` (Metamask) when available.
- `src/components/TacticsIframe.tsx` — updated to dynamically load and mount the game bundle into `#tactics-game-container`. Falls back to the placeholder UI if the bundle is not present or fails to initialize.

Bundle expectations

- The game bundle should attach an init function the adapter can call. Supported entry points (in order):
  - `window.initTactics(container, { stake, onEnd })`
  - `window.Tactics.init(container, { stake, onEnd })`

- The `onEnd(result, score)` callback should be called by the game when a match finishes. The adapter will forward that to window messages and optionally call `recordGameResultOnChain`.

How to use

1. Build or compile the original `pongstylin/tactics` into a single bundle that exposes `initTactics` or `Tactics.init` as described above.
2. Place the bundle at `public/game-assets/game.bundle.js`.
3. Open the game page in the app, select a stake, and click Start — the adapter will load and mount the bundle automatically.

Notes on shimming

- The adapter exposes `window.TACTICS_ENV` with helpers the game can call to read the stake or post messages.
- If your game expects other globals (e.g., PIXI, Howler, or direct access to `document` lifecycle in a specific way), you may need to adapt the game's build or add small shims inside `gameAdapter.ts`.

Recording game results on-chain

- `gameAdapter.recordGameResultOnChain(contractAddress, result, score, stake)` attempts to use `window.ethereum` to sign/send a transaction. If you prefer using Waypoint deep-links (mobile/keyless wallets), modify the onEnd handler to build a Waypoint deep link and open it for the user to approve.


## PostMessage Communication

The current implementation sets up bidirectional communication between the parent page and game iframe.

### From Game to Parent

```javascript
// In game HTML
window.parent.postMessage({
  type: 'game-ready',
  stake: 500
}, '*');

window.parent.postMessage({
  type: 'game-ended',
  result: 'win',
  score: 1500
}, '*');
```

### From Parent to Game

```typescript
// In TacticsIframe.tsx
useEffect(() => {
  const handleMessage = (event: MessageEvent) => {
    if (event.data?.type === 'game-ready') {
      console.log('Game loaded successfully');
    }
  };
  window.addEventListener('message', handleMessage);
  return () => window.removeEventListener('message', handleMessage);
}, []);
```

## Security Considerations

The iframe uses the `sandbox` attribute with restricted permissions:

```tsx
sandbox="allow-scripts allow-same-origin"
```

**Allowed**:
- JavaScript execution
- Same-origin requests

**Blocked**:
- Form submission
- Popup windows
- Top-level navigation
- Pointer lock

Adjust sandbox permissions based on game requirements.

## Future Enhancements

### 1. On-Chain Stake Verification

Before allowing game entry, verify user has sufficient staked tokens:

```typescript
// In GameLobby.tsx (example using ethers)
import { ethers } from "ethers";
import { STAKING_CONTRACT_ADDRESS, CHAIN_CONFIG } from "@/lib/contracts";

// Minimal example: use an ethers provider connected to the configured RPC
const provider = new ethers.providers.JsonRpcProvider(CHAIN_CONFIG.rpcUrl);
const stakingAbi = [
  // add the relevant ABI fragments for getStakeInfo
  "function getStakeInfo(address account) view returns (uint256 amount)",
];

const stakingContract = new ethers.Contract(STAKING_CONTRACT_ADDRESS, stakingAbi, provider);

async function verifyStake(address: string, requiredAmount: number) {
  const stakeInfo = await stakingContract.getStakeInfo(address);
  return stakeInfo.toString() >= requiredAmount;
}

// Alternatively, use the Waypoint SDK (mobile deep-link) to trigger contract calls via the user's keyless wallet.
```

### 2. Game Result Recording

Record game outcomes on-chain:

```typescript
// In TacticsIframe.tsx
const handleMessage = async (event: MessageEvent) => {
  if (event.data?.type === 'game-ended') {
    // Call smart contract to record result
    await contract.call("recordGameResult", [
      event.data.result,
      event.data.score,
      stake
    ]);
  }
};
```

### 3. Loading States

Add loading indicators while game loads:

```tsx
const [isLoading, setIsLoading] = useState(true);

<iframe
  onLoad={() => setIsLoading(false)}
  ...
/>
```

### 4. Error Handling

Handle iframe loading errors:

```tsx
const [error, setError] = useState<string | null>(null);

<iframe
  onError={() => setError("Failed to load game")}
  ...
/>
```

## Testing

To test the integration:

1. **Start dev server**: `npm run dev`
2. **Navigate to game page**: `http://localhost:3000/game`
3. **Verify lobby appears** with connect wallet prompt
4. **Click stake preset** or enter custom amount
5. **Click "Start Game"**
6. **Verify iframe loads** with correct stake amount
7. **Check browser console** for postMessage communication

## Troubleshooting

### Iframe doesn't load
- Check browser console for errors
- Verify `/game-assets/index.html` exists
- Check for CORS issues if using external URL

### Stake amount not passed
- Verify query parameter in iframe src
- Check browser network tab for request
- Look for JavaScript errors in game HTML

### PostMessage not working
- Ensure origins match or use '*' for testing
- Check event.data structure matches expected format
- Verify event listeners are properly attached

## Constants

Stake presets are defined in `src/lib/constants.ts`:

```typescript
export const GAME_STAKE_PRESETS = [100, 250, 500, 1000];
```

Modify this array to change the available preset amounts.

## Styling

- `src/components/GameLobby.module.css` - Lobby styling
- `src/components/TacticsIframe.module.css` - Iframe container styling
- `src/app/game/game.module.css` - Game page layout
- `public/game-assets/index.html` - Inline styles for game placeholder

All styles follow the existing dark theme with purple/blue accents (#667eea, #764ba2).
