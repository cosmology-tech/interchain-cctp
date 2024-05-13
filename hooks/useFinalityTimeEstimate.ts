import { useMemo } from 'react';
import { RouteResponse } from '@skip-router/core';
import { getFinalityTime } from '@/config';
import { useSkipChains } from './useSkipChains';

export const useFinalityTimeEstimate = (route: RouteResponse) => {
  const { data: chains = [] } = useSkipChains();

  return useMemo(() => {
    for (const operation of route.operations) {
      if ('cctpTransfer' in operation) {
        const sourceChain = chains.find(
          ({ chainID }) => chainID === operation.cctpTransfer.fromChainID
        );
        if (sourceChain?.chainType === 'evm') {
          return getFinalityTime(sourceChain.chainID);
        }
      }
    }

    return '30 minutes';
  }, [chains, route.operations]);
};
