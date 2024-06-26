import { ChainType } from './chains';

// ID refers to the connector ID from wagmi
export const EVM_WALLET_KEY_TO_ID = {
  metamask: 'io.metamask'
} as const;

// https://github.com/cosmology-tech/cosmos-kit/tree/main/wallets
export const COSMOS_WALLET_KEY_TO_NAME = {
  leap: 'leap-extension',
  keplr: 'keplr-extension',
  cosmostation: 'cosmostation-extension',
  capsule: 'leap-capsule-social-login'
} as const;

const WALLET_KEY_MAP = { ...EVM_WALLET_KEY_TO_ID, ...COSMOS_WALLET_KEY_TO_NAME };

export type WalletKey = keyof typeof WALLET_KEY_MAP;
export type EvmWalletKey = keyof typeof EVM_WALLET_KEY_TO_ID;
export type CosmosWalletKey = keyof typeof COSMOS_WALLET_KEY_TO_NAME;

export const WALLET_KEY_TO_PRETTY_NAME: Record<WalletKey, string> = {
  metamask: 'MetaMask',
  leap: 'Leap',
  keplr: 'Keplr',
  cosmostation: 'Cosmostation',
  capsule: 'Capsule'
};

export const WALLET_KEY_TO_LOGO_URL: Record<WalletKey, string> = {
  metamask: '/logos/metamask.svg',
  leap: '/logos/leap.svg',
  keplr: '/logos/keplr.svg',
  cosmostation: '/logos/cosmostation.png',
  capsule: '/logos/capsule.svg'
};

export const WALLET_KEY_TO_DOWNLOAD_URL: Record<WalletKey, string> = {
  metamask: 'https://metamask.io/download/',
  leap: '',
  keplr: '',
  cosmostation: '',
  capsule: ''
};

export const getChainTypeFromWalletKey = (walletKey: WalletKey): ChainType => {
  return walletKey in EVM_WALLET_KEY_TO_ID ? 'evm' : 'cosmos';
};

export const checkIsCosmosWallet = (walletKey: WalletKey): walletKey is CosmosWalletKey => {
  return walletKey in COSMOS_WALLET_KEY_TO_NAME;
};
