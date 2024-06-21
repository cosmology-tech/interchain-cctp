import { CosmosWalletKey, EvmWalletKey } from '@/config';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SourceWallet {
  srcEvmWallet: EvmWalletKey | null;
  srcCosmosWallet: CosmosWalletKey | null;
}

const defaultValues: SourceWallet = {
  srcEvmWallet: null,
  srcCosmosWallet: null
};

export const useSourceWallet = create<SourceWallet>()(
  persist(() => defaultValues, {
    name: 'source-wallet-store',
    version: 1
  })
);

export const sourceWalletActions = {
  setSrcEvmWallet: (srcEvmWallet: EvmWalletKey | null) => {
    useSourceWallet.setState({ srcEvmWallet });
  },
  setSrcCosmosWallet: (srcCosmosWallet: CosmosWalletKey | null) => {
    useSourceWallet.setState({ srcCosmosWallet });
  }
};
