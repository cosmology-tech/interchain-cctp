import { useMemo } from 'react';
import { useWallet } from '@cosmos-kit/react';
import { ChainType, COSMOS_WALLET_KEY_TO_NAME, CosmosWalletKey, NOBLE_CHAIN_ID } from '@/config';
import { useSkipChains } from '@/hooks';

type ChainWallet = ReturnType<typeof useWallet>['chainWallets'][number];

export type UseCosmosWalletReturnType = {
  type: ChainType;
  walletName: string;
  isConnected: boolean;
  isDisconnected: boolean;
  isConnecting: boolean;
  isInstalled: boolean;
  connect: () => void;
  connectAsync: () => Promise<boolean>;
  disconnect: () => void;
  username?: string;
  chain: ChainWallet;
  address: ChainWallet['address'];
};

export const useCosmosWallet = (walletKey: CosmosWalletKey, chainId?: string) => {
  const { data: skipChains = [] } = useSkipChains();
  const { chainWallets } = useWallet(COSMOS_WALLET_KEY_TO_NAME[walletKey]);

  const chain = useMemo(() => {
    const cosmosChains = skipChains.filter(({ chainType }) => chainType === 'cosmos');

    const _chainId = cosmosChains.some(({ chainID }) => chainID === chainId)
      ? chainId
      : NOBLE_CHAIN_ID;
    const chain = chainWallets.find((chainWallet) => chainWallet.chainId === _chainId);

    if (!chain) {
      throw new Error(`Chain ${_chainId} not provided`);
    }

    return chain;
  }, [chainId, chainWallets, skipChains]);

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
    type: 'cosmos',
    walletName: chain.walletPrettyName,
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
  } satisfies UseCosmosWalletReturnType;
};
