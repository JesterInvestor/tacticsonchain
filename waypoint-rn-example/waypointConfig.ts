export type Network = 'saigon' | 'mainnet';

// Change this constant to 'mainnet' to use Ronin mainnet settings.
// For development and testing, keep 'saigon' (testnet).
export const NETWORK: Network = 'saigon';

// Replace with your client ID from Ronin Developer Console or set programmatically
export const CLIENT_ID = '1f0d1669-9989-44d6-9259-0fba5f6bb34a';

export function getWaypointOptions() {
  const common = {
    waypointOrigin: 'https://waypoint.roninchain.com',
    clientId: CLIENT_ID,
    redirectUri: 'mydapp://',
  } as const;

  if (NETWORK === 'saigon') {
    return {
      ...common,
      rpcUrl: 'https://saigon-testnet.roninchain.com/rpc',
      chainId: 2021,
    };
  }

  // mainnet
  return {
    ...common,
    rpcUrl: 'https://api.roninchain.com/rpc',
    chainId: 2020,
  };
}
