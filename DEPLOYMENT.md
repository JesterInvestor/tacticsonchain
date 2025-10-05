# Deployment Guide

This guide walks you through deploying Tactics on Chain to production.

## Quick Start

1. Deploy smart contracts to Base network
2. Configure environment variables
3. Deploy to Vercel

## Detailed Steps

### 1. Smart Contract Deployment

#### Deploy TACT Token

Using Thirdweb Dashboard:
```
1. Visit https://thirdweb.com/dashboard
2. Click "Deploy Contract"
3. Upload src/contracts/TACTToken.sol
4. Select Base network
5. Set parameters:
   - Name: Tactics Token
   - Symbol: TACT
6. Deploy and save contract address
```

#### Deploy Staking Contract

```
1. Upload src/contracts/TACTStaking.sol
2. Select Base network
3. Provide TACT token address as constructor parameter
4. Deploy and save contract address
```

### 2. Environment Configuration

Create `.env.local` with:
```env
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=your_client_id
NEXT_PUBLIC_TACT_TOKEN_ADDRESS=0x...
NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_BASE_URL=https://your-domain.vercel.app
```

### 3. Vercel Deployment

#### Option A: Dashboard
```
1. Go to vercel.com
2. Import GitHub repository
3. Configure:
   - Framework: Next.js
   - Build Command: npm run build
   - Output: .next
4. Add environment variables
5. Deploy
```

#### Option B: CLI
```bash
npm install -g vercel
vercel login
vercel
# Follow prompts
vercel --prod
```

## Verification

After deployment:

- [ ] Visit your deployed URL
- [ ] Test wallet connection
- [ ] Verify contract addresses in UI
- [ ] Test token purchase flow
- [ ] Test staking functionality
- [ ] Test game page loads

## Troubleshooting

### Build Fails
- Check environment variables are set
- Verify Node.js version (18+)
- Clear build cache: `rm -rf .next`

### Contract Errors
- Verify contract addresses in .env
- Check network is Base
- Ensure contracts are verified on block explorer

### Wallet Connection Issues
- Verify Thirdweb client ID is correct
- Check wallet is on Base network
- Try different wallet provider

## Post-Deployment

1. Monitor contract events on Base explorer
2. Set up analytics (optional)
3. Monitor Vercel logs
4. Test all user flows

## Support

For issues:
- Check GitHub issues
- Review Vercel logs
- Check Thirdweb dashboard
