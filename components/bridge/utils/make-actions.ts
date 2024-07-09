import type { BridgeType, RouteResponse } from '@skip-router/core';
import { SkipChain } from '@/hooks';
import { EVM_CHAIN_PRETTY_NAME } from '@/config/chains';

export interface Action {
  text: string;
  bridgeID: Extract<BridgeType, 'IBC' | 'CCTP'>;
  operationIndex: number;
  cctpChainDirection?: 'src' | 'dest';
}

function getChainPrettyName(chainId: string, chains: Array<SkipChain>) {
  const chain = chains.find(({ chainID }) => chainID === chainId);
  return chain?.chainType === 'cosmos' ? chain?.prettyName : EVM_CHAIN_PRETTY_NAME[chainId];
}

export const makeActions = ({
  route,
  chains
}: {
  route: RouteResponse;
  chains: Array<SkipChain>;
}): Action[] => {
  const _actions: Action[] = [];

  route.operations.forEach((operation, i) => {
    if ('cctpTransfer' in operation) {
      const srcChainID = operation.cctpTransfer.fromChainID;
      const destChainID = operation.cctpTransfer.toChainID;

      _actions.push({
        text: `Burn on ${getChainPrettyName(srcChainID, chains)}`,
        bridgeID: 'CCTP',
        operationIndex: i,
        cctpChainDirection: 'src'
      });

      _actions.push({
        text: `Mint on ${getChainPrettyName(destChainID, chains)}`,
        bridgeID: 'CCTP',
        operationIndex: i,
        cctpChainDirection: 'dest'
      });

      return;
    }

    if ('transfer' in operation) {
      const destChainID = operation.transfer.toChainID;

      _actions.push({
        text: `Transfer to ${getChainPrettyName(destChainID, chains)}`,
        bridgeID: 'IBC',
        operationIndex: i
      });
    }
  });

  return _actions;
};
