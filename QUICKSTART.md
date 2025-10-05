# Quick Start Guide

Get Tactics on Chain running locally in 5 minutes.

## Prerequisites

- Node.js 18+ installed
- Git installed
- A Web3 wallet (MetaMask recommended)

## Steps

### 1. Clone and Install

```bash
git clone https://github.com/JesterInvestor/tacticsonchain.git
cd tacticsonchain
npm install
```

### 2. Configure Environment

Copy the example environment file:

```bash
cp .env.example .env.local
```

Get a Thirdweb API key at [https://thirdweb.com/create-api-key](https://thirdweb.com/create-api-key) and add it to `.env.local`:

```env
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=your_actual_client_id_here
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

> **Note:** The other variables (contract addresses) can be left empty for local development without blockchain features.

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## What You Can Do

### Without Blockchain Setup
- ✅ View all pages and UI
- ✅ Navigate between pages
- ✅ See the application structure
- ❌ Connect wallet (requires Thirdweb API key)
- ❌ Purchase tokens (requires deployed contracts)
- ❌ Stake tokens (requires deployed contracts)

### With Thirdweb API Key
- ✅ Everything above, plus:
- ✅ Connect your Web3 wallet
- ✅ View wallet address and balance
- ❌ Purchase tokens (requires deployed contracts)
- ❌ Stake tokens (requires deployed contracts)

### With Deployed Contracts
- ✅ Everything above, plus:
- ✅ Purchase $TACT tokens
- ✅ Stake tokens
- ✅ View staking rewards
- ✅ Full blockchain interaction

## Next Steps

1. **Get Thirdweb API Key** (5 minutes)
   - Visit [thirdweb.com](https://thirdweb.com/create-api-key)
   - Sign up and create a new API key
   - Add to `.env.local`

2. **Deploy Smart Contracts** (15 minutes)
   - See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions
   - Deploy to Base Goerli testnet (free)
   - Update contract addresses in `.env.local`

3. **Deploy to Vercel** (10 minutes)
   - Push to GitHub
   - Import to Vercel
   - Add environment variables
   - Deploy

## Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

### Port Already in Use
```bash
# Use different port
npm run dev -- -p 3001
```

### Environment Variables Not Working
- Make sure file is named `.env.local` (not `.env`)
- Restart development server after changing variables
- Check for typos in variable names

## Useful Commands

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint

# Clean
rm -rf .next         # Remove build cache
```

## Resources

- [README.md](./README.md) - Full documentation
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guide
- [Next.js Docs](https://nextjs.org/docs)
- [Thirdweb Docs](https://portal.thirdweb.com/)
- [Base Network Docs](https://docs.base.org/)

## Getting Help

- 📖 Check the full [README](./README.md)
- 🐛 [Open an issue](https://github.com/JesterInvestor/tacticsonchain/issues)

---

Happy building! 🎮⛓️
