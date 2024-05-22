import { useMemo } from 'react';
import type { RouteResponse } from '@skip-router/core';
import { getFinalityTime, FinalityTime } from '@/config';
import { useSkipChains } from './useSkipChains';

const DEFAULT_FINALITY_TIME = '2 minutes';

export const useFinalityTimeEstimate = (route: RouteResponse): FinalityTime => {
  const { data: chains = [] } = useSkipChains();

  return useMemo(() => {
    let finalityTime: FinalityTime = DEFAULT_FINALITY_TIME;

    for (const operation of route.operations) {
      if ('cctpTransfer' in operation) {
        const sourceChain = chains.find(
          ({ chainID }) => chainID === operation.cctpTransfer.fromChainID
        );
        if (sourceChain?.chainType === 'evm') {
          return getFinalityTime(sourceChain.chainID);
        }
        return DEFAULT_FINALITY_TIME;
      }
      if ('transfer' in operation) {
        finalityTime = '20 seconds';
      }
    }

    return finalityTime;
  }, [chains, route.operations]);
};
