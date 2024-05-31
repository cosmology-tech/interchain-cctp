import { useMemo } from 'react';
import { useWallet } from '@cosmos-kit/react';
import { COSMOS_CHAIN_NAMES, COSMOS_WALLET_KEY_TO_NAME, CosmosWalletKey } from '@/config';
import { ChainWalletBase } from 'cosmos-kit';

// TODO: handle Error: Extension context invalidated
export const useCosmosWallet = (walletKey: CosmosWalletKey) => {
  const { chainWallets } = useWallet(COSMOS_WALLET_KEY_TO_NAME[walletKey]);

  const { chains, chainIdToChainContext } = useMemo(() => {
    const chains = chainWallets.filter((chainWallet) =>
      COSMOS_CHAIN_NAMES.includes(chainWallet.chainRecord.name)
    );

    const chainIdToChainContext = chains.reduce((acc, chainWallet) => {
      return { ...acc, [chainWallet.chainId]: chainWallet };
    }, {}) as Record<string, ChainWalletBase>;

    return { chains, chainIdToChainContext };
  }, [chainWallets, COSMOS_CHAIN_NAMES]);

  const isConnected = chains.every((chain) => chain.isWalletConnected);

  const username = chains[0]?.username ?? '';

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

  const disconnect = () => {
    chains.forEach((chain) => {
      if (chain.isWalletConnected) {
        chain.disconnect();
      }
    });
  };

  return { isConnected, connect, connectAsync, disconnect, username, chainIdToChainContext };
};
