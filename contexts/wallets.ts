import { CosmosWalletKey, EvmWalletKey, WalletKey } from '@/config';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SelectedSrcWallets {
  selectedSrcEvmWalletKey: EvmWalletKey | null;
  selectedSrcCosmosWalletKey: CosmosWalletKey | null;
}

const defaultSelectedSrcWallets: SelectedSrcWallets = {
  selectedSrcEvmWalletKey: null,
  selectedSrcCosmosWalletKey: null
};

export const useSelectedSrcWallets = create<SelectedSrcWallets>()(
  persist(() => defaultSelectedSrcWallets, {
    name: 'selected-src-wallets-store',
    version: 1
  })
);

export const sourceWalletsAction = {
  setSelectedSrcEvmWalletKey: (walletKey: EvmWalletKey | null) => {
    useSelectedSrcWallets.setState({ selectedSrcEvmWalletKey: walletKey });
  },
  setSelectedSrcCosmosWalletKey: (walletKey: CosmosWalletKey | null) => {
    useSelectedSrcWallets.setState({ selectedSrcCosmosWalletKey: walletKey });
  }
};

interface CurrentWallet {
  walletKey: WalletKey | null;
  chainId: string | undefined;
  address: string | undefined;
}

interface CurrentWallets {
  srcWallet: CurrentWallet;
  destWallet: CurrentWallet;
  setSrcWallet: (wallet: CurrentWallet) => void;
  setDestWallet: (wallet: CurrentWallet) => void;
}

export const useCurrentWallets = create<CurrentWallets>()((set) => ({
  srcWallet: {
    walletKey: null,
    chainId: undefined,
    address: undefined
  },
  destWallet: {
    walletKey: null,
    chainId: undefined,
    address: undefined
  },
  setSrcWallet: (wallet: CurrentWallet) => {
    set({ srcWallet: wallet });
  },
  setDestWallet: (wallet: CurrentWallet) => {
    set({ destWallet: wallet });
  }
}));
