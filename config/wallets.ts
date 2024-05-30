import { ChainType } from './chains';

export const EVM_WALLET_KEY_TO_NAME = {
  metamask: 'metamask'
} as const;

export const COSMOS_WALLET_KEY_TO_NAME = {
  keplr: 'keplr-extension',
  'leap-social-login': 'leap-capsule-social-login'
} as const;

export const WALLET_KEY_TO_NAME = { ...EVM_WALLET_KEY_TO_NAME, ...COSMOS_WALLET_KEY_TO_NAME };

export type WalletKey = keyof typeof WALLET_KEY_TO_NAME;
export type CosmosWalletKey = keyof typeof COSMOS_WALLET_KEY_TO_NAME;

export const getChainTypeFromWalletKey = (walletKey: WalletKey): ChainType => {
  return walletKey in EVM_WALLET_KEY_TO_NAME ? 'evm' : 'cosmos';
};

export const checkIsCosmosWallet = (walletKey: WalletKey): walletKey is CosmosWalletKey => {
  return walletKey in COSMOS_WALLET_KEY_TO_NAME;
};
