# Tactics on Chain

A blockchain-enabled tactical turn-based strategy game built with Next.js, featuring Web3 integration via Thirdweb, on-chain staking with $TACT tokens, and Farcaster Frames compatibility.

## Features

- 🎮 **Classic Tactics Gameplay** - Based on pongstylin/tactics game
- ⛓️ **Blockchain Integration** - Built on Base network
- 💎 **$TACT Token** - Native ERC20 token for gaming economy
- 🔒 **On-Chain Staking** - Stake tokens to participate in games
- 🌐 **Thirdweb SDK** - Easy wallet connection and Web3 onboarding
- 📱 **Farcaster Frames** - Compatible as a miniapp
- ☁️ **Vercel Hosting** - Optimized for serverless deployment

## Tech Stack

- **Frontend:** Next.js 14 with TypeScript
- **Blockchain:** Base (Ethereum L2)
- **Web3:** Thirdweb SDK
- **Smart Contracts:** Solidity (ERC20 token + Staking)
- **Hosting:** Vercel
- **Social:** Farcaster Frames

## Prerequisites

- Node.js 18+ and npm/yarn
- A Thirdweb account and API key
- A Web3 wallet (MetaMask, Coinbase Wallet, etc.)
- Vercel account (for deployment)
- Farcaster account (for Frame deployment)

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
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_THIRDWEB_CLIENT_ID=your_thirdweb_client_id
   NEXT_PUBLIC_TACT_TOKEN_ADDRESS=your_tact_token_address
   NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS=your_staking_contract_address
   NEXT_PUBLIC_FARCASTER_APP_ID=your_farcaster_app_id
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

1. **Using Thirdweb Dashboard:**
   - Go to [thirdweb.com/dashboard](https://thirdweb.com/dashboard)
   - Click "Deploy Contract"
   - Select "Token" or upload `src/contracts/TACTToken.sol`
   - Choose Base network
   - Configure token parameters:
     - Name: Tactics Token
     - Symbol: TACT
     - Initial Supply: 10,000,000
   - Deploy and save the contract address

2. **Using Hardhat/Forge (Alternative):**
   ```bash
   # Install dependencies
   npm install --save-dev hardhat @nomiclabs/hardhat-ethers ethers
   
   # Deploy to Base
   npx hardhat run scripts/deploy-token.js --network base
   ```

### Deploy Staking Contract

1. **Using Thirdweb Dashboard:**
   - Upload `src/contracts/TACTStaking.sol`
   - Select Base network
   - Provide the TACT token address as constructor parameter
   - Deploy and save the contract address

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
   NEXT_PUBLIC_FARCASTER_APP_ID
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
   vercel env add NEXT_PUBLIC_FARCASTER_APP_ID
   ```

5. **Deploy to production:**
   ```bash
   vercel --prod
   ```

## Farcaster Frame Deployment

### Setup Farcaster Frame

1. **Register your Frame:**
   - Go to [Farcaster Developer Portal](https://developers.farcaster.xyz/)
   - Create a new Frame application
   - Set the Frame URL to: `https://your-app.vercel.app/api/frame`

2. **Configure Frame Metadata:**
   The frame metadata is automatically generated via the API route at `/api/frame`

3. **Test your Frame:**
   - Use the Farcaster Frame Validator: [https://warpcast.com/~/developers/frames](https://warpcast.com/~/developers/frames)
   - Enter your Frame URL and validate

4. **Share your Frame:**
   - Post on Warpcast with your Frame URL
   - Users can interact with the Frame directly in their feed

### Frame Features

- **Launch Game:** Opens the full game in a new window
- **View Stats:** Shows user stats and $TACT balance
- **Quick Stake:** Allows staking directly from the Frame

## Project Structure

```
tacticsonchain/
├── src/
│   ├── app/                  # Next.js app directory
│   │   ├── game/            # Game page
│   │   ├── stake/           # Staking page
│   │   ├── shop/            # Token purchase page
│   │   ├── about/           # About page
│   │   ├── api/             # API routes
│   │   │   └── frame/       # Farcaster Frame endpoints
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

### Wallet Integration
- Connect with any Web3 wallet via Thirdweb
- Seamless onboarding for new users
- Multi-wallet support (MetaMask, Coinbase Wallet, WalletConnect)

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_THIRDWEB_CLIENT_ID` | Thirdweb API client ID | `abc123...` |
| `NEXT_PUBLIC_TACT_TOKEN_ADDRESS` | Deployed TACT token contract | `0x1234...` |
| `NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS` | Deployed staking contract | `0x5678...` |
| `NEXT_PUBLIC_FARCASTER_APP_ID` | Farcaster app ID | `farcaster-app-id` |
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
- Contact via Farcaster: [@tacticsonchain](https://warpcast.com/tacticsonchain)
- Join our Discord community (link coming soon)

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
