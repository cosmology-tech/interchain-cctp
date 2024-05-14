import { CHAIN_ID_TO_PRETTY_NAME } from '@/config';
import type { BridgeType, RouteResponse } from '@skip-router/core';

export interface Action {
  text: string;
  bridgeID: Extract<BridgeType, 'IBC' | 'CCTP'>;
  operationIndex: number;
  cctpChainDirection?: 'src' | 'dest';
}

export const makeActions = ({ route }: { route: RouteResponse }): Action[] => {
  const _actions: Action[] = [];

  route.operations.forEach((operation, i) => {
    if ('cctpTransfer' in operation) {
      const srcChainID = operation.cctpTransfer.fromChainID;
      const destChainID = operation.cctpTransfer.toChainID;

      _actions.push({
        text: `Burn on ${CHAIN_ID_TO_PRETTY_NAME[srcChainID]}`,
        bridgeID: 'CCTP',
        operationIndex: i,
        cctpChainDirection: 'src'
      });

      _actions.push({
        text: `Mint on ${CHAIN_ID_TO_PRETTY_NAME[destChainID]}`,
        bridgeID: 'CCTP',
        operationIndex: i,
        cctpChainDirection: 'dest'
      });

      return;
    }

    if ('transfer' in operation) {
      const destChainID = operation.transfer.toChainID;

      _actions.push({
        text: `Transfer to ${CHAIN_ID_TO_PRETTY_NAME[destChainID]}`,
        bridgeID: 'IBC',
        operationIndex: i
      });
    }
  });

  return _actions;
};
