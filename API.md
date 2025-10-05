# API Documentation

## Farcaster Frame API

### GET /api/frame

Returns Frame metadata for Farcaster integration.

**Response:**
```json
{
  "version": "next",
  "imageUrl": "https://tacticsonchain.vercel.app/og-image.png",
  "button": {
    "title": "Play Tactics",
    "action": {
      "type": "launch_frame",
      "name": "Tactics on Chain",
      "url": "https://tacticsonchain.vercel.app/game",
      "splashImageUrl": "https://tacticsonchain.vercel.app/splash.png",
      "splashBackgroundColor": "#1a1a1a"
    }
  }
}
```

### POST /api/frame

Handles Frame action interactions from Farcaster.

**Request Body:**
```json
{
  "action": "button_click",
  "buttonIndex": 1,
  "fid": 12345,
  "castId": "0x..."
}
```

**Response:**
```json
{
  "success": true
}
```

## Smart Contract ABIs

### TACTToken Contract

**Address:** `process.env.NEXT_PUBLIC_TACT_TOKEN_ADDRESS`

**Network:** Base (Chain ID: 84532 for testnet)

#### Methods

##### balanceOf
```solidity
function balanceOf(address account) external view returns (uint256)
```
Get token balance of an address.

##### transfer
```solidity
function transfer(address to, uint256 amount) external returns (bool)
```
Transfer tokens to another address.

##### approve
```solidity
function approve(address spender, uint256 amount) external returns (bool)
```
Approve spender to use tokens.

##### mint (owner only)
```solidity
function mint(address to, uint256 amount) external
```
Mint new tokens (up to MAX_SUPPLY).

##### burn
```solidity
function burn(uint256 amount) external
```
Burn tokens from caller's balance.

### TACTStaking Contract

**Address:** `process.env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS`

**Network:** Base (Chain ID: 84532 for testnet)

#### Methods

##### stake
```solidity
function stake(uint256 amount) external
```
Stake TACT tokens. Automatically claims pending rewards.

**Parameters:**
- `amount`: Amount of TACT to stake (in wei)

**Events:**
- `Staked(address indexed user, uint256 amount)`

##### initiateUnstake
```solidity
function initiateUnstake() external
```
Start the 7-day cooldown period before unstaking.

**Events:**
- `CooldownInitiated(address indexed user)`

##### unstake
```solidity
function unstake() external
```
Unstake all tokens after cooldown period. Claims pending rewards.

**Requirements:**
- Cooldown must be initiated
- 7 days must have passed since cooldown start

**Events:**
- `Unstaked(address indexed user, uint256 amount)`

##### claimRewards
```solidity
function claimRewards() external
```
Claim accumulated staking rewards.

**Events:**
- `RewardsClaimed(address indexed user, uint256 amount)`

##### calculateRewards
```solidity
function calculateRewards(address user) external view returns (uint256)
```
Calculate pending rewards for a user.

**Returns:** Pending reward amount in wei

##### canEnterGame
```solidity
function canEnterGame(address user, uint256 requiredAmount) external view returns (bool)
```
Check if user has sufficient stake to enter a game.

**Parameters:**
- `user`: Address to check
- `requiredAmount`: Minimum stake required

**Returns:** `true` if user can enter, `false` otherwise

##### getStakeInfo
```solidity
function getStakeInfo(address user) external view returns (StakeInfo memory)
```
Get detailed stake information for a user.

**Returns:**
```solidity
struct StakeInfo {
  uint256 amount;
  uint256 startTime;
  uint256 lastClaimTime;
  uint256 cooldownStart;
}
```

## Client-Side Utilities

### Contract Utilities (`src/lib/contracts.ts`)

#### formatTokenAmount
```typescript
function formatTokenAmount(amount: bigint | string, decimals: number = 18): string
```
Format token amount to human-readable string.

**Example:**
```typescript
formatTokenAmount("1000000000000000000") // "1.0000"
```

#### parseTokenAmount
```typescript
function parseTokenAmount(amount: string, decimals: number = 18): bigint
```
Parse human-readable amount to wei.

**Example:**
```typescript
parseTokenAmount("1.5") // 1500000000000000000n
```

#### shortenAddress
```typescript
function shortenAddress(address: string): string
```
Shorten Ethereum address for display.

**Example:**
```typescript
shortenAddress("0x1234...7890") // "0x1234...7890"
```

#### getExplorerUrl
```typescript
function getExplorerUrl(address: string): string
```
Get block explorer URL for address.

#### getTxExplorerUrl
```typescript
function getTxExplorerUrl(txHash: string): string
```
Get block explorer URL for transaction.

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_THIRDWEB_CLIENT_ID` | Yes | Thirdweb API client ID |
| `NEXT_PUBLIC_TACT_TOKEN_ADDRESS` | Yes | Deployed TACT token address |
| `NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS` | Yes | Deployed staking contract address |
| `NEXT_PUBLIC_FARCASTER_APP_ID` | Optional | Farcaster app ID for Frame |
| `NEXT_PUBLIC_BASE_URL` | Yes | Base URL of deployment |

## Error Handling

### Common Errors

#### Wallet Not Connected
```typescript
if (!address) {
  throw new Error("Please connect your wallet");
}
```

#### Insufficient Balance
```typescript
if (balance < amount) {
  throw new Error("Insufficient balance");
}
```

#### Contract Reverts
```typescript
try {
  await contract.stake(amount);
} catch (error) {
  if (error.code === "INSUFFICIENT_ALLOWANCE") {
    // Handle approval needed
  } else if (error.code === "INSUFFICIENT_BALANCE") {
    // Handle insufficient balance
  }
}
```

## Rate Limits

No rate limits are currently enforced on API endpoints.

## Versioning

Current API version: `v1`

All endpoints are subject to change. Check this documentation for updates.
