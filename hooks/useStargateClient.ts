import { useChain } from '@cosmos-kit/react';
import { useQuery } from '@tanstack/react-query';
import { StargateClient } from '@cosmjs/stargate';

export type StargateClients = Record<string, StargateClient>;

export const useStargateClient = (chainName: string) => {
  const { getStargateClient } = useChain(chainName);

  return useQuery({
    queryKey: ['stargate-client', chainName],
    queryFn: async () => {
      const client = await getStargateClient();
      return client;
    },
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    gcTime: Infinity
  });
};
