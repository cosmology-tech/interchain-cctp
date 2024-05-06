import { Asset } from '@skip-router/core';
import { useQuery } from '@tanstack/react-query';
import { useSkipClient } from '@/skip';
import { SUPPORTED_CHAIN_IDS, isTestnetMode, DEFAULT_USDC_LOGO } from '@/config';

export const useUsdcAssets = () => {
  const skipClient = useSkipClient();

  return useQuery({
    queryKey: ['usdc-assets', isTestnetMode ? 'testnet' : 'mainnet'],
    queryFn: async () => {
      const assets = await Promise.all(
        SUPPORTED_CHAIN_IDS.map(async (chainId) => {
          const chainAssets = await skipClient.assets({
            chainID: chainId,
            includeEvmAssets: true
          });
          return {
            chainId,
            usdcAsset: {
              ...chainAssets[chainId].find(({ symbol }) => symbol === 'USDC'),
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
