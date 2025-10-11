# Tactics on Chain

A blockchain-enabled tactical turn-based strategy game built with Next.js, featuring Web3 integration and on-chain staking with $TACT tokens.

## Features

- 🎮 **Classic Tactics Gameplay** - Based on pongstylin/tactics game
- ⛓️ **Blockchain Integration** - Built on Base network
- 💎 **$TACT Token** - Native ERC20 token for gaming economy
- 🔒 **On-Chain Staking** - Stake tokens to participate in games
-- 🌐 **Wallet integration** - The app includes a lightweight `WalletProvider` for local testing and a Ronin Waypoint React Native example in `waypoint-rn-example/` for mobile deep-link wallet flows.
- ☁️ **Vercel Hosting** - Optimized for serverless deployment

## Tech Stack

- **Frontend:** Next.js 14 with TypeScript
- **Blockchain:** Base (Ethereum L2)
- **Web3:** Thirdweb SDK
- **Smart Contracts:** Solidity (ERC20 token + Staking)
- **Hosting:** Vercel

## Prerequisites

- Node.js 18+ and npm/yarn
- A Web3 wallet (MetaMask, Coinbase Wallet, etc.) or Ronin Waypoint for mobile integrations
- Vercel account (for deployment)

## Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/JesterInvestor/tacticsonchain.git
   cd tacticsonchain
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory (example variables below):
   ```env
   NEXT_PUBLIC_TACT_TOKEN_ADDRESS=your_tact_token_address
   NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS=your_staking_contract_address
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Smart Contract Deployment

### Deploy $TACT Token Contract

1. **Using Hardhat/Forge:**
   ```bash
   # Install dependencies
   npm install --save-dev hardhat @nomiclabs/hardhat-ethers ethers
   
   # Deploy to Base
   npx hardhat run scripts/deploy-token.js --network base
   ```

### Deploy Staking Contract

1. **Using Hardhat/Forge:**
   ```bash
   # Deploy staking contract (example)
   npx hardhat run scripts/deploy-staking.js --network base
   ```

2. Update your `.env.local` with the deployed contract addresses

## Vercel Deployment

### Method 1: Deploy via Vercel Dashboard

1. **Connect Repository:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Project:**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

3. **Set Environment Variables:**
   Add the following environment variables in Vercel dashboard:
   ```
   NEXT_PUBLIC_THIRDWEB_CLIENT_ID
   NEXT_PUBLIC_TACT_TOKEN_ADDRESS
   NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS
   NEXT_PUBLIC_BASE_URL (e.g., https://your-app.vercel.app)
   ```

4. **Deploy:**
   - Click "Deploy"
   - Vercel will automatically build and deploy your application

### Method 2: Deploy via CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **Set environment variables:**
   ```bash
   vercel env add NEXT_PUBLIC_THIRDWEB_CLIENT_ID
   vercel env add NEXT_PUBLIC_TACT_TOKEN_ADDRESS
   vercel env add NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS
   ```

5. **Deploy to production:**
   ```bash
   vercel --prod
   ```

## Project Structure

```
tacticsonchain/
├── src/
│   ├── app/                  # Next.js app directory
│   │   ├── game/            # Game page
│   │   ├── stake/           # Staking page
│   │   ├── shop/            # Token purchase page
│   │   ├── about/           # About page
│   │   ├── api/             # API routes (if needed)
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Home page
│   │   └── globals.css      # Global styles
│   ├── components/          # React components
│   │   ├── ThirdwebProvider.tsx
│   │   └── ConnectButton.tsx
│   ├── contracts/           # Smart contracts
│   │   ├── TACTToken.sol    # ERC20 token
│   │   └── TACTStaking.sol  # Staking contract
│   └── lib/                 # Utility functions
├── public/                  # Static assets
│   └── manifest.json        # PWA manifest
├── .env.example             # Example environment variables
├── next.config.js           # Next.js configuration
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript configuration
└── vercel.json              # Vercel configuration
```

## Key Features

### $TACT Token
- ERC20 token on Base network
- Max supply: 1 billion tokens
- Used for staking and game entry fees

### Staking Mechanism
- Stake $TACT tokens to participate in competitive matches
- Earn 12% APY on staked tokens
- 7-day cooldown period for unstaking
- Real-time reward calculation

### Game Integration
- Classic tactics gameplay preserved from original
- Staking required for competitive matches
- On-chain verification of game stakes
- Tournament support with token prizes

## Wallet Integration

This project provides two approaches:

- Local testing: a lightweight `WalletProvider` (see `src/lib/wallet.tsx`) that stores a pasted address in localStorage. Use this for quick dev and UI testing.
- Mobile deep-link wallet: a Ronin Waypoint React Native example is provided in `waypoint-rn-example/` which demonstrates deep-link flows for authorize, sendNativeToken, personalSign, signTypedData, and sendTransaction.

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_THIRDWEB_CLIENT_ID` | Thirdweb API client ID | `abc123...` |
| `NEXT_PUBLIC_TACT_TOKEN_ADDRESS` | Deployed TACT token contract | `0x1234...` |
| `NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS` | Deployed staking contract | `0x5678...` |
| `NEXT_PUBLIC_BASE_URL` | Base URL of deployment | `https://tacticsonchain.vercel.app` |

## Development Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Credits

This project is based on the original [Tactics game](https://github.com/pongstylin/tactics) by Dave Clark (pongstylin). We've adapted and extended it to work with blockchain technology while preserving the core gameplay experience.

## License

This project is open source and available under the [MIT License](LICENSE).

The original Tactics game source code falls under the Unlicense. Smart contracts and blockchain integration code are MIT licensed.

## Support

For issues, questions, or contributions, please:
- Open an issue on GitHub
- Join our Discord community (link coming soon)

## Game Engine Integration Guide

The game page currently shows a placeholder. To integrate the full game engine from [pongstylin/tactics](https://github.com/pongstylin/tactics), follow these steps:

### Understanding the Original Game Architecture

The pongstylin/tactics repository contains a complete JavaScript-based tactical game engine with:
- **224+ source files** organized in a modular structure
- **Client-side game logic** in vanilla JavaScript
- **Canvas-based rendering** for the game board and units
- **Turn-based combat system** with unit types, abilities, and AI
- **Multiplayer support** with game state synchronization

### Integration Approach

There are three main approaches to integrate the game engine:

#### Option 1: Direct Integration (Recommended for MVP)

1. **Clone the original repository:**
   ```bash
   git clone https://github.com/pongstylin/tactics.git /tmp/tactics
   ```

2. **Copy game engine files:**
   ```bash
   # Create a game engine directory
   mkdir -p src/game-engine
   
   # Copy core game files (adjust paths based on original repo structure)
   cp -r /tmp/tactics/src/tactics/* src/game-engine/
   cp -r /tmp/tactics/static/* public/game-assets/
   ```

3. **Create a Next.js wrapper component:**
   ```typescript
   // src/components/TacticsGame.tsx
   'use client';
   
   import { useEffect, useRef } from 'react';
   
   export default function TacticsGame() {
     const containerRef = useRef<HTMLDivElement>(null);
     
     useEffect(() => {
       // Initialize the game engine
       // Load game scripts dynamically
       const loadGame = async () => {
         // Import game initialization code
         // Set up canvas, event listeners, etc.
       };
       
       loadGame();
       
       return () => {
         // Cleanup game resources
       };
     }, []);
     
     return (
       <div ref={containerRef} id="tactics-game-container">
         <canvas id="game-canvas" />
       </div>
     );
   }
   ```

4. **Update the game page:**
   ```typescript
   // src/app/game/page.tsx
   import TacticsGame from '@/components/TacticsGame';
   
   export default function GamePage() {
     return (
       <div className={styles.gamePage}>
         <TacticsGame />
       </div>
     );
   }
   ```

#### Option 2: TypeScript Migration (Recommended for Production)

1. **Analyze the original codebase:**
   - Review the main entry points and dependencies
   - Identify core modules (game logic, rendering, AI, networking)
   - Document the API surface between modules

2. **Set up the module structure:**
   ```
   src/game-engine/
   ├── core/           # Core game logic
   │   ├── game.ts
   │   ├── board.ts
   │   └── units.ts
   ├── rendering/      # Canvas rendering
   │   ├── renderer.ts
   │   └── sprites.ts
   ├── ai/             # AI opponent logic
   │   └── ai.ts
   ├── network/        # Multiplayer (if needed)
   │   └── sync.ts
   └── types/          # TypeScript definitions
       └── index.ts
   ```

3. **Migrate files incrementally:**
   - Start with type definitions
   - Convert core game logic modules
   - Add proper TypeScript types throughout
   - Test each module as you convert it

4. **Add Web3 hooks:**
   ```typescript
   // Example: Integrate staking verification
   import { useContract } from '@thirdweb-dev/react';
   
   export function useGameAccess() {
     const { contract } = useContract(STAKING_CONTRACT_ADDRESS);
     
     async function verifyStake(address: string): Promise<boolean> {
       // Check if user has required stake
       const stake = await contract.call('getStake', [address]);
       return stake >= MIN_GAME_STAKE;
     }
     
     return { verifyStake };
   }
   ```

#### Option 3: iframe Embedding (Quickest but Limited)

1. **Host the original game separately:**
   - Deploy pongstylin/tactics to a subdomain or separate service
   - Ensure CORS and security headers are properly configured

2. **Embed via iframe:**
   ```typescript
   export default function GamePage() {
     return (
       <div className={styles.gamePage}>
         <iframe
           src="https://game.tacticsonchain.app"
           className={styles.gameFrame}
           allow="fullscreen"
         />
       </div>
     );
   }
   ```

3. **Add postMessage communication:**
   - Send wallet address and stake status to game
   - Receive game results back to main app
   - Update blockchain state based on game outcomes

### Key Considerations

**Asset Management:**
- Move sprite sheets, sounds, and other assets to `public/` directory
- Update asset paths in the game code to work with Next.js static serving
- Consider using Next.js Image component for optimized loading

**State Management:**
- Keep game state separate from React state when possible
- Use React only for UI wrapper and Web3 integration
- Avoid re-renders during gameplay

**Performance:**
- Game loop should run independently of React render cycle
- Use requestAnimationFrame for smooth animations
- Consider using Web Workers for AI calculations

**Web3 Integration Points:**
1. **Pre-game:** Verify user has required stake before allowing entry
2. **During game:** Optionally record moves on-chain for tournaments
3. **Post-game:** Update rewards, rankings, and achievements on-chain

**Testing Strategy:**
- Unit test core game logic separately
- Integration test Web3 hooks
- End-to-end test complete game flow with mock contracts
- Performance test on various devices

### Recommended Development Steps

1. **Phase 1 - Setup (1-2 days)**
   - Clone original repository
   - Analyze code structure and dependencies
   - Create initial directory structure

2. **Phase 2 - Core Integration (3-5 days)**
   - Copy and adapt game engine files
   - Create React wrapper component
   - Test basic game rendering and controls

3. **Phase 3 - Web3 Integration (2-3 days)**
   - Add stake verification before game start
   - Implement reward distribution after game end
   - Add wallet connection state to game

4. **Phase 4 - Polish (2-3 days)**
   - Optimize performance
   - Add error handling
   - Improve mobile responsiveness
   - Add loading states and transitions

5. **Phase 5 - Testing (1-2 days)**
   - Test all game features
   - Verify Web3 integration
   - Fix bugs and edge cases

### Troubleshooting Common Issues

**Module resolution errors:**
- Update import paths for Next.js structure
- Use aliases in `tsconfig.json` for cleaner imports

**Canvas rendering issues:**
- Ensure canvas is properly initialized after mount
- Check for window/document references (use `useEffect`)

**Game state sync problems:**
- Separate game state from React component state
- Use refs for values that shouldn't trigger re-renders

**Asset loading failures:**
- Verify paths are correct for Next.js public directory
- Use dynamic imports for large assets
- Add proper loading states

## Roadmap

- [ ] Complete game engine integration from pongstylin/tactics
- [ ] Tournament system with prize pools
- [ ] NFT rewards for achievements
- [ ] Leaderboard and ranking system
- [ ] Mobile app version
- [ ] Additional game modes
- [ ] Community-driven features

---

Built with ❤️ by the Tactics on Chain team
