import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  BridgeType,
  CCTPTransferState,
  ChainTransaction,
  StatusState,
  TransferState
} from '@skip-router/core';
import { useSkipClient } from '@/skip';

export interface BroadcastedTx {
  chainID: string;
  txHash: string;
}

type BridgeState =
  | {
      state: TransferState;
      bridgeID: Extract<BridgeType, 'IBC'>;
    }
  | {
      state: CCTPTransferState;
      bridgeID: Extract<BridgeType, 'CCTP'>;
    };

type TransferSequence = {
  srcChainID: string;
  destChainID: string;
  txs: {
    sendTx: ChainTransaction | null;
    receiveTx: ChainTransaction | null;
  };
} & BridgeState;

export interface TxsStatusData {
  isSuccess: boolean;
  isSettled: boolean;
  transferSequence: TransferSequence[];
  states: StatusState[];
}

interface Args {
  txs: BroadcastedTx[];
  txsRequired: number | undefined;
}

export const useTxsStatus = ({ txs, txsRequired }: Args) => {
  const skipClient = useSkipClient();
  const [isSettled, setIsSettled] = useState(false);
  const [prevData, setPrevData] = useState<TxsStatusData | undefined>(undefined);

  const queryKey = useMemo(() => ['txs-status', txsRequired, txs] as const, [txsRequired, txs]);

  return useQuery({
    queryKey,
    queryFn: async ({ queryKey: [, txsRequired, txs] }) => {
      if (!txs) return;

      const results = await Promise.all(
        txs.map(async (tx) => {
          const _res = await skipClient.transactionStatus({
            chainID: tx.chainID,
            txHash: tx.txHash
          });

          const cleanTransferSequence = _res.transferSequence.map((transfer) => {
            if ('ibcTransfer' in transfer) {
              return {
                srcChainID: transfer.ibcTransfer.srcChainID,
                destChainID: transfer.ibcTransfer.dstChainID,
                txs: {
                  sendTx: transfer.ibcTransfer.packetTXs.sendTx,
                  receiveTx: transfer.ibcTransfer.packetTXs.receiveTx
                },
                state: transfer.ibcTransfer.state,
                bridgeID: 'IBC'
              };
            }
            if ('cctpTransfer' in transfer) {
              return {
                srcChainID: transfer.cctpTransfer.srcChainID,
                destChainID: transfer.cctpTransfer.dstChainID,
                txs: {
                  sendTx: transfer.cctpTransfer.txs.sendTx,
                  receiveTx: transfer.cctpTransfer.txs.receiveTx
                },
                state: transfer.cctpTransfer.state,
                bridgeID: 'CCTP'
              };
            }
          });

          return {
            state: _res.state,
            transferSequence: cleanTransferSequence.filter(Boolean) as TransferSequence[]
          };
        })
      );

      const SETTLED_STATES: StatusState[] = [
        'STATE_COMPLETED_SUCCESS',
        'STATE_COMPLETED_ERROR',
        'STATE_ABANDONED'
      ];

      const _isSettled = results.every((res) => SETTLED_STATES.includes(res.state));
      const _isSuccess = results.every((res) => res.state === 'STATE_COMPLETED_SUCCESS');

      if (results.length > 0 && txsRequired === results.length && _isSettled) {
        setIsSettled(true);
      }

      const mergedTransferSequence = results.map((res) => res.transferSequence).flat();

      const resData: TxsStatusData = {
        isSuccess: _isSuccess,
        isSettled: _isSettled,
        transferSequence: mergedTransferSequence,
        states: results.map((res) => res.state)
      };

      setPrevData(resData);
      return resData;
    },
    enabled: !isSettled && !!txs && txs.length > 0,
    refetchInterval: 1000 * 2,
    initialData: prevData
  });
};
