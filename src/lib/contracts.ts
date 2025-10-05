/**
 * Smart contract utilities and configurations
 */

export const CONTRACTS = {
  TACT_TOKEN: process.env.NEXT_PUBLIC_TACT_TOKEN_ADDRESS || '',
  STAKING: process.env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS || '',
};

export const CHAIN_ID = 84532; // Base Goerli testnet

export const CHAIN_CONFIG = {
  chainId: CHAIN_ID,
  name: 'Base Goerli',
  rpcUrl: 'https://goerli.base.org',
  blockExplorer: 'https://goerli.basescan.org',
};

/**
 * Format token amount to human-readable string
 */
export function formatTokenAmount(amount: bigint | string, decimals: number = 18): string {
  const amountBN = BigInt(amount.toString());
  const divisor = BigInt(10 ** decimals);
  const whole = amountBN / divisor;
  const remainder = amountBN % divisor;
  const fractional = remainder.toString().padStart(decimals, '0').slice(0, 4);
  return `${whole}.${fractional}`;
}

/**
 * Parse token amount from human-readable string
 */
export function parseTokenAmount(amount: string, decimals: number = 18): bigint {
  const [whole = '0', fractional = '0'] = amount.split('.');
  const wholeBN = BigInt(whole) * BigInt(10 ** decimals);
  const fractionalPadded = fractional.padEnd(decimals, '0').slice(0, decimals);
  const fractionalBN = BigInt(fractionalPadded);
  return wholeBN + fractionalBN;
}

/**
 * Shorten address for display
 */
export function shortenAddress(address: string): string {
  if (!address || address.length < 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

/**
 * Get block explorer URL for address
 */
export function getExplorerUrl(address: string): string {
  return `${CHAIN_CONFIG.blockExplorer}/address/${address}`;
}

/**
 * Get block explorer URL for transaction
 */
export function getTxExplorerUrl(txHash: string): string {
  return `${CHAIN_CONFIG.blockExplorer}/tx/${txHash}`;
}
