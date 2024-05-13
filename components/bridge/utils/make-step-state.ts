import { CCTPTransferState, TransferState } from '@skip-router/core';
import { TxsStatusData } from '@/hooks';
import { Action } from './make-actions';

export const makeStepState = ({
  action,
  statusData
}: {
  action: Action;
  statusData?: TxsStatusData;
}) => {
  const { bridgeID, operationIndex, cctpChainDirection } = action;

  const state: TransferState = (() => {
    const _state = statusData?.transferSequence[operationIndex]?.state;

    if (bridgeID === 'CCTP') {
      if (cctpChainDirection === 'src') {
        if (!_state) return operationIndex === 0 ? 'TRANSFER_PENDING' : 'TRANSFER_UNKNOWN';
        const cctpState: TransferState = (() => {
          switch (_state as CCTPTransferState) {
            case 'CCTP_TRANSFER_SENT':
              return 'TRANSFER_PENDING';
            case 'CCTP_TRANSFER_PENDING_CONFIRMATION':
              return 'TRANSFER_PENDING';
            case 'CCTP_TRANSFER_CONFIRMED':
              return 'TRANSFER_SUCCESS';
            case 'CCTP_TRANSFER_RECEIVED':
              return 'TRANSFER_SUCCESS';
            default:
              return 'TRANSFER_UNKNOWN';
          }
        })();
        return cctpState;
      }

      if (cctpChainDirection === 'dest') {
        if (!_state) return 'TRANSFER_UNKNOWN';
        const cctpState: TransferState = (() => {
          switch (_state as CCTPTransferState) {
            case 'CCTP_TRANSFER_SENT':
              return 'TRANSFER_UNKNOWN';
            case 'CCTP_TRANSFER_PENDING_CONFIRMATION':
              return 'TRANSFER_UNKNOWN';
            case 'CCTP_TRANSFER_CONFIRMED':
              return 'TRANSFER_PENDING';
            case 'CCTP_TRANSFER_RECEIVED':
              return 'TRANSFER_SUCCESS';
            default:
              return 'TRANSFER_UNKNOWN';
          }
        })();
        return cctpState;
      }
    }

    if (bridgeID === 'IBC') {
      if (!_state) return operationIndex === 0 ? 'TRANSFER_PENDING' : 'TRANSFER_UNKNOWN';
      return _state as TransferState;
    }

    return 'TRANSFER_UNKNOWN';
  })();

  return { state };
};
