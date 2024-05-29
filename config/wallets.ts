export const COSMOS_WALLET_KEY_TO_NAME = {
  keplr: 'keplr-extension',
  'leap-social-login': 'leap-capsule-social-login'
} as const;

export type CosmosWalletKey = keyof typeof COSMOS_WALLET_KEY_TO_NAME;
