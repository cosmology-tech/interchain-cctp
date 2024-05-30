import { useChains } from '@cosmos-kit/react';
import { useQuery } from '@tanstack/react-query';
import { StargateClient } from '@cosmjs/stargate';
import { COSMOS_CHAIN_NAMES } from '@/config/chains';

export type StargateClients = Record<string, StargateClient>;

export const useStargateClients = () => {
  const cosmosChains = useChains(COSMOS_CHAIN_NAMES);

  return useQuery({
    queryKey: ['stargate-clients', COSMOS_CHAIN_NAMES],
    queryFn: async () => {
      const clients = await Promise.all(
        COSMOS_CHAIN_NAMES.map(async (chainName) => {
          const { getStargateClient, chain } = cosmosChains[chainName];
          const client = await getStargateClient();
          return { chainId: chain.chain_id, client };
        })
      );
      return clients.reduce((acc, { chainId, client }) => {
        return { ...acc, [chainId]: client };
      }, {}) as StargateClients;
    },
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    gcTime: Infinity
  });
};
