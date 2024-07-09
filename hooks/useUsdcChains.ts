import { useSkipClient } from '@/contexts';
import { useQuery } from '@tanstack/react-query';
import noble from 'chain-registry/mainnet/noble/chain';
import { chains as cosmosChains } from 'chain-registry';
import * as evmChainMap from 'wagmi/chains';
import { useSkipChains } from './useSkipChains';

export const useUsdcChains = () => {
  const skipClient = useSkipClient();
  const { data: skipChains = [] } = useSkipChains();

  return useQuery({
    queryKey: ['usdc-chains', skipClient ? 'skip-ready' : 'skip-pending', skipChains],
    queryFn: async () => {
      const cosmosAssets = await skipClient?.assetsFromSource({
        sourceAssetDenom: 'uusdc',
        sourceAssetChainID: noble.chain_id,
        includeCW20Assets: false
      });

      const chains = await skipClient?.chains({
        includeEVM: true
      });

      const evmChains = Object.values(evmChainMap);
      const cosmosChainIDs = Object.keys(cosmosAssets || {});
      const evmChainIDs = skipChains
        .filter((chain) => chain.chainType === 'evm')
        .map((chain) => chain.chainID);
      const usdcChainIDs = [...cosmosChainIDs, ...evmChainIDs];

      return (chains || [])
        .filter((c) => usdcChainIDs.includes(c.chainID))
        .map((chain) => {
          let prettyName = '';

          if (chain.chainType === 'evm') {
            prettyName = evmChains.find((c) => c.id.toString() === chain.chainID)?.name || '';
          } else if (chain.chainType === 'cosmos') {
            prettyName = cosmosChains.find((c) => c.chain_id === chain.chainID)?.pretty_name || '';
          }

          return {
            prettyName,
            chainID: chain.chainID,
            logoUrl: chain.logoURI
          };
        })
        .filter((chain) => chain.prettyName && chain.logoUrl)
        .sort((a, b) => a.prettyName.localeCompare(b.prettyName));
    },
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    gcTime: Infinity
  });
};
