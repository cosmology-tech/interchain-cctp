import { useMemo } from 'react';
import { wallets } from 'cosmos-kit';
import { useWallet } from '@cosmos-kit/react';
import { COSMOS_CHAIN_NAMES } from '@/config';

export const CosmosWallet = {
  Keplr: 'keplr',
  Leap: 'leap'
} as const;

export type TCosmosWallet = (typeof CosmosWallet)[keyof typeof CosmosWallet];

// TODO: handle Error: Extension context invalidated
export const useConnectWallet = (wallet: TCosmosWallet) => {
  const { chainWallets } = useWallet(
    wallet === 'keplr' ? wallets.keplr.extension?.walletName : wallets.leap.extension?.walletName
  );

  const chains = useMemo(() => {
    return chainWallets.filter((chainWallet) =>
      COSMOS_CHAIN_NAMES.includes(chainWallet.chainRecord.name)
    );
  }, [chainWallets, COSMOS_CHAIN_NAMES]);

  const isConnected = chains.every((chain) => chain.isWalletConnected);

  const connectAsync = async () => {
    for (const chain of chains) {
      if (chain.isWalletDisconnected) {
        await chain.connect(false);
      }
    }
    return chains.every((chain) => chain.isWalletConnected);
  };

  const connect = () => {
    chains.forEach((chain) => {
      if (chain.isWalletDisconnected) {
        chain.connect();
      }
    });
  };

  return { isConnected, connect, connectAsync };
};

export const useDisconnectWallet = (wallet: TCosmosWallet) => {
  const { chainWallets } = useWallet(
    wallet === 'keplr' ? wallets.keplr.extension?.walletName : wallets.leap.extension?.walletName
  );

  const chains = useMemo(() => {
    return chainWallets.filter((chainWallet) =>
      COSMOS_CHAIN_NAMES.includes(chainWallet.chainRecord.name)
    );
  }, [chainWallets, COSMOS_CHAIN_NAMES]);

  const disconnect = () => {
    chains.forEach((chain) => {
      if (chain.isWalletConnected) {
        chain.disconnect();
      }
    });
  };

  return { disconnect };
};
