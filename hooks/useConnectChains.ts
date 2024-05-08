import { useMemo } from 'react';
import { wallets } from 'cosmos-kit';
import { useWallet } from '@cosmos-kit/react';

export const useConnectChains = (chainNames: string[]) => {
  const { chainWallets } = useWallet(wallets.keplr[0].walletName);

  const chains = useMemo(() => {
    return chainWallets.filter((chainWallet) => chainNames.includes(chainWallet.chainRecord.name));
  }, [chainNames]);

  const isAllConnected = chains.every((chain) => chain.isWalletConnected);

  const connectAllAsync = async () => {
    for (const chain of chains) {
      if (chain.isWalletDisconnected) {
        await chain.connect(false);
      }
    }
    return chains.every((chain) => chain.isWalletConnected);
  };

  const connectAll = () => {
    chains.forEach((chain) => {
      if (chain.isWalletDisconnected) {
        chain.connect();
      }
    });
  };

  const disconnectAll = () => {
    chains.forEach((chain) => {
      if (chain.isWalletConnected) {
        chain.disconnect();
      }
    });
  };

  return { isAllConnected, connectAll, connectAllAsync, disconnectAll };
};
