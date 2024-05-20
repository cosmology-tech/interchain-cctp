import type { RouteResponse } from '@skip-router/core';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { BroadcastedTx } from '@/hooks';
import { TransferInfo } from '@/pages/bridge';

type HistoryItemStatus = 'pending' | 'success' | 'failed';

export interface TxHistoryItem {
  route: RouteResponse;
  broadcastedTxs: BroadcastedTx[];
  transferInfo: TransferInfo;
  status: HistoryItemStatus;
}

export type TxHistoryState = Record<string, TxHistoryItem>;

const defaultState: TxHistoryState = {};

export const useTxHistory = create(
  persist(() => defaultState, {
    name: 'tx-history-state',
    version: 1
  })
);

export const txHistory = {
  addItem: ({
    id,
    route,
    transferInfo,
    broadcastedTx
  }: {
    id: string;
    route: RouteResponse;
    transferInfo: TransferInfo;
    broadcastedTx: BroadcastedTx;
  }) => {
    useTxHistory.setState((state) => {
      const current = state[id];
      if (!current) {
        const newItem: TxHistoryItem = {
          broadcastedTxs: [broadcastedTx],
          status: 'pending',
          route,
          transferInfo
        };
        return { [id]: newItem };
      }

      const latest: TxHistoryItem = {
        ...current,
        broadcastedTxs: [...current.broadcastedTxs, broadcastedTx]
      };

      return { [id]: latest };
    });
  },
  updateStatus: (id: string, status: HistoryItemStatus) => {
    useTxHistory.setState((state) => {
      const current = state[id];
      if (!current) return state;

      const latest: TxHistoryItem = {
        ...current,
        status
      };

      return { [id]: latest };
    });
  },
  removeItem: (id: string) => {
    useTxHistory.setState((state) => {
      const { [id]: _, ...newState } = state;
      return newState;
    }, true);
  }
};
