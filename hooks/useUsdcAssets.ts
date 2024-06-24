import type { Asset } from '@skip-router/core';
import { useQuery } from '@tanstack/react-query';
import { useSkipClient } from '@/contexts';
import { SUPPORTED_CHAIN_IDS, isTestnetMode, DEFAULT_USDC_LOGO } from '@/config';

export const useUsdcAssets = () => {
  const skipClient = useSkipClient();

  return useQuery({
    queryKey: [
      'usdc-assets',
      isTestnetMode ? 'testnet' : 'mainnet',
      skipClient ? 'skip-ready' : 'skip-pending'
    ],
    queryFn: async () => {
      if (!skipClient) return {};

      const assets = await Promise.all(
        SUPPORTED_CHAIN_IDS.map(async (chainId) => {
          const chainAssets = await skipClient.assets({
            chainID: chainId,
            includeEvmAssets: true,
            onlyTestnets: isTestnetMode
          });
          const usdcAsset = chainAssets[chainId].find(
            ({ recommendedSymbol }) => recommendedSymbol === 'USDC'
          );
          return {
            chainId,
            usdcAsset: {
              ...usdcAsset,
              logoURI: DEFAULT_USDC_LOGO
            }
          };
        })
      );

      return assets.reduce((res, { chainId, usdcAsset }) => {
        return { ...res, [chainId]: usdcAsset };
      }, {}) as Record<string, Asset>;
    },
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    gcTime: Infinity
  });
};
