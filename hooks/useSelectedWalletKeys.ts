import { useEffect, useState } from 'react';
import { EvmWalletKey, CosmosWalletKey } from '@/config';
import { useSelectedSrcWallets, sourceWalletsAction } from '@/contexts';

export type WalletDirection = 'source' | 'destination';

export const useSelectedWalletKeys = ({ direction }: { direction: WalletDirection }) => {
  const {
    selectedSrcEvmWalletKey: srcEvmWalletKey,
    selectedSrcCosmosWalletKey: srcCosmosWalletKey
  } = useSelectedSrcWallets();
  const {
    setSelectedSrcEvmWalletKey: setSrcEvmWalletKey,
    setSelectedSrcCosmosWalletKey: setSrcCosmosWalletKey
  } = sourceWalletsAction;

  const [destEvmWalletKey, setDestEvmWalletKey] = useState<EvmWalletKey | null>(null);
  const [destCosmosWalletKey, setDestCosmosWalletKey] = useState<CosmosWalletKey | null>(null);

  useEffect(() => {
    setDestEvmWalletKey(srcEvmWalletKey);
  }, [srcEvmWalletKey]);

  useEffect(() => {
    setDestCosmosWalletKey(srcCosmosWalletKey);
  }, [srcCosmosWalletKey]);

  const selectedEvmWalletKey = direction === 'source' ? srcEvmWalletKey : destEvmWalletKey;
  const selectedCosmosWalletKey = direction === 'source' ? srcCosmosWalletKey : destCosmosWalletKey;
  const setSelectedEvmWalletKey = direction === 'source' ? setSrcEvmWalletKey : setDestEvmWalletKey;
  const setSelectedCosmosWalletKey =
    direction === 'source' ? setSrcCosmosWalletKey : setDestCosmosWalletKey;

  return {
    selectedEvmWalletKey,
    selectedCosmosWalletKey,
    setSelectedEvmWalletKey,
    setSelectedCosmosWalletKey
  };
};
