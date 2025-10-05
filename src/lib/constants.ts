/**
 * Application constants
 */

export const APP_NAME = 'Tactics on Chain';
export const APP_DESCRIPTION = 'A tactical turn-based strategy game with blockchain integration';

// Staking configuration
export const STAKING_APY = 12; // 12% annual percentage yield
export const COOLDOWN_DAYS = 7;
export const MIN_STAKE_AMOUNT = 10; // Minimum 10 TACT to stake

// Game configuration
export const MIN_GAME_STAKE = 100; // Minimum 100 TACT staked to enter competitive games
export const TOURNAMENT_ENTRY_FEE = 50; // 50 TACT per tournament entry
export const GAME_STAKE_PRESETS = [100, 250, 500, 1000]; // Preset stake amounts for games

// Social links
export const SOCIAL_LINKS = {
  github: 'https://github.com/JesterInvestor/tacticsonchain',
  originalGame: 'https://github.com/pongstylin/tactics',
};

// Feature flags
export const FEATURES = {
  staking: true,
  shop: true,
  tournaments: false, // Coming soon
  nftRewards: false, // Coming soon
};
