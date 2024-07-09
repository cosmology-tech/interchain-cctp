import * as React from 'react';
import { fromBech32 } from '@cosmjs/encoding';
import { useSkipChains } from '@/hooks';

export interface UseVerifyCosmosChainOptions {}

export function useVerifyCosmosChain(opts?: UseVerifyCosmosChainOptions) {
  const { data: skipChains = [] } = useSkipChains();
  const cosmosChains = React.useMemo(
    () => skipChains.filter(({ chainType }) => chainType === 'cosmos'),
    [skipChains]
  );

  const cosmosAddressToChainId = React.useCallback(
    (address: string) => {
      const { prefix } = fromBech32(address);
      return cosmosChains.find((chain) => chain.bech32Prefix === prefix)!.chainID;
    },
    [cosmosChains]
  );

  const isValidCosmosAddress = React.useCallback(
    (address: string) => {
      try {
        const { prefix } = fromBech32(address);
        return cosmosChains.map((chain) => chain.bech32Prefix).includes(prefix);
      } catch (error) {
        return false;
      }
    },
    [cosmosChains]
  );

  const getCosmosChainNameById = React.useCallback(
    (chainId: string) => {
      return cosmosChains.find((chain) => chain.chainID === chainId)!.chainName;
    },
    [cosmosChains]
  );

  return {
    cosmosAddressToChainId,
    isValidCosmosAddress,
    getCosmosChainNameById
  };
}
