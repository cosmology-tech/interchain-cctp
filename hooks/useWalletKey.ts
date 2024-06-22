import { useEffect, useState } from 'react';
import { EvmWalletKey, CosmosWalletKey } from '@/config';
import { useSourceWallet, sourceWalletActions } from '@/contexts';

export type WalletDirection = 'source' | 'destination';

export const useWalletKey = ({ direction }: { direction: WalletDirection }) => {
  const { srcEvmWallet, srcCosmosWallet } = useSourceWallet();
  const { setSrcEvmWallet, setSrcCosmosWallet } = sourceWalletActions;

  const [destEvmWallet, setDestEvmWallet] = useState<EvmWalletKey | null>(null);
  const [destCosmosWallet, setDestCosmosWallet] = useState<CosmosWalletKey | null>(null);

  useEffect(() => {
    setDestEvmWallet(srcEvmWallet);
  }, [srcEvmWallet]);

  useEffect(() => {
    setDestCosmosWallet(srcCosmosWallet);
  }, [srcCosmosWallet]);

  const evmWalletKey = direction === 'source' ? srcEvmWallet : destEvmWallet;
  const cosmosWalletKey = direction === 'source' ? srcCosmosWallet : destCosmosWallet;
  const setEvmWalletKey = direction === 'source' ? setSrcEvmWallet : setDestEvmWallet;
  const setCosmosWalletKey = direction === 'source' ? setSrcCosmosWallet : setDestCosmosWallet;

  return { evmWalletKey, cosmosWalletKey, setEvmWalletKey, setCosmosWalletKey };
};
