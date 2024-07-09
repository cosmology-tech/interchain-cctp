import type { Chain } from '@skip-router/core';
import { useQuery } from '@tanstack/react-query';
import { useSkipClient } from '@/contexts';
import { isTestnetMode, FILTER_CHAIN_IDS } from '@/config';
import { getChainPrettyName, getChainName } from '@/utils';

export type SkipChain = Chain & {
  prettyName: string;
};

export const useSkipChains = () => {
  const skipClient = useSkipClient();

  return useQuery({
    queryKey: [
      'skip-chains',
      isTestnetMode ? 'testnet' : 'mainnet',
      skipClient ? 'skip-ready' : 'skip-pending'
    ],
    queryFn: async () => {
      if (!skipClient) return [];

      const chains = await skipClient.chains({
        includeEVM: true,
        includeSVM: false,
        onlyTestnets: isTestnetMode
      });

      return chains
        .map((chain): SkipChain => {
          return {
            ...chain,
            chainName: getChainName(chain.chainID, chain.chainName),
            prettyName: getChainPrettyName(chain.chainID, chain.chainName)
          };
        })
        .filter((chain) => !FILTER_CHAIN_IDS.includes(Number(chain.chainID)));
    },
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    gcTime: Infinity
  });
};
