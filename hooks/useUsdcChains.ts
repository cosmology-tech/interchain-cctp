import { EVM_MAINNETS } from '@/config';
import { useSkipClient } from '@/contexts';
import { useQuery } from '@tanstack/react-query';
import noble from 'chain-registry/mainnet/noble/chain';
import { chains as cosmosChains } from 'chain-registry';
import * as evmChainMap from 'wagmi/chains';

export const useUsdcChains = () => {
  const skipClient = useSkipClient();

  return useQuery({
    queryKey: ['usdc-chains'],
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
      const evmChainIDs = EVM_MAINNETS.map((c) => c.id.toString());
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
