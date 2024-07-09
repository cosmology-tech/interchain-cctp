import type { Asset } from '@skip-router/core';
import { useQuery } from '@tanstack/react-query';
import { useSkipClient } from '@/contexts';
import { useSkipChains } from './useSkipChains';
import { isTestnetMode, DEFAULT_USDC_LOGO } from '@/config';

type USDCAssetByChain = {
  chainId: string;
  usdcAsset: Asset;
};

export const useUsdcAssets = () => {
  const skipClient = useSkipClient();
  const { data: skipChains = [] } = useSkipChains();

  const supportedChainIds = skipChains.map(({ chainID }) => chainID);

  return useQuery({
    queryKey: [
      'usdc-assets',
      isTestnetMode ? 'testnet' : 'mainnet',
      skipClient ? 'skip-ready' : 'skip-pending',
      supportedChainIds
    ],
    queryFn: async () => {
      if (!skipClient) return {};

      const assets = await Promise.all(
        skipChains.map(async (chain) => {
          const chainAssets = await skipClient.assets({
            chainID: chain.chainID,
            includeEvmAssets: true,
            onlyTestnets: isTestnetMode
          });

          const usdcAsset = chainAssets[chain.chainID].find(
            ({ recommendedSymbol }) => recommendedSymbol === 'USDC'
          );

          if (!usdcAsset) return null;

          return {
            chainId: chain.chainID,
            usdcAsset: {
              ...usdcAsset,
              logoURI: DEFAULT_USDC_LOGO
            }
          };
        })
      );

      return (assets.filter(Boolean) as USDCAssetByChain[]).reduce(
        (res, { chainId, usdcAsset }) => {
          return { ...res, [chainId]: usdcAsset };
        },
        {}
      ) as Record<string, Asset>;
    },
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    gcTime: Infinity
  });
};
