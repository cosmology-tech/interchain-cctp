import { Chain } from '@skip-router/core';
import { useQuery } from '@tanstack/react-query';
import { useSkipClient } from '@/skip';
import { SUPPORTED_CHAIN_IDS, CHAIN_ID_TO_PRETTY_NAME, isTestnetMode } from '@/config';

export type SkipChain = Chain & {
  prettyName: string;
};

export const useSkipChains = () => {
  const skipClient = useSkipClient();

  return useQuery({
    queryKey: ['skip-chains', isTestnetMode ? 'testnet' : 'mainnet'],
    queryFn: async () => {
      const chains = await skipClient.chains({
        includeEVM: true,
        includeSVM: false,
        includeTestnets: isTestnetMode
      });

      return chains
        .map((chain): SkipChain => {
          return {
            ...chain,
            prettyName: CHAIN_ID_TO_PRETTY_NAME[chain.chainID] || chain.chainName
          };
        })
        .filter(({ chainID }) => SUPPORTED_CHAIN_IDS.includes(chainID))
        .sort((chainA, chainB) => chainA.prettyName.localeCompare(chainB.prettyName));
    },
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    gcTime: Infinity
  });
};