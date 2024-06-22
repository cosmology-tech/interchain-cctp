import { useMemo } from 'react';
import { useWallet } from '@cosmos-kit/react';
import {
  COSMOS_CHAINS,
  COSMOS_WALLET_KEY_TO_NAME,
  CosmosWalletKey,
  NOBLE_CHAIN_ID
} from '@/config';

export const useCosmosWallet = (walletKey: CosmosWalletKey, chainId: string) => {
  const { chainWallets } = useWallet(COSMOS_WALLET_KEY_TO_NAME[walletKey]);

  const chain = useMemo(() => {
    const _chainId = COSMOS_CHAINS.some(({ chain_id }) => chain_id === chainId)
      ? chainId
      : NOBLE_CHAIN_ID;
    const chain = chainWallets.find((chainWallet) => chainWallet.chainId === _chainId);

    if (!chain) {
      throw new Error(`Chain ${_chainId} not provided`);
    }

    return chain;
  }, [chainWallets]);

  const {
    username,
    address,
    connect,
    disconnect,
    isWalletConnected,
    isWalletConnecting,
    isWalletDisconnected,
    isWalletNotExist
  } = chain;

  const connectAsync = async () => {
    try {
      await connect(false);
    } catch (error) {
      console.error(error);
    }
    return chain.isWalletConnected;
  };

  return {
    isConnected: isWalletConnected,
    isDisconnected: isWalletDisconnected,
    connect,
    connectAsync,
    disconnect,
    username,
    isInstalled: !isWalletNotExist,
    chain,
    address,
    isConnecting: isWalletConnecting
  };
};
