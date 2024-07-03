import { TxsStatusData } from '@/hooks';

type ExplorerLink = string | null;

const getRangeUsdcExplorerUrl = (txHash: string) =>
  `https://usdc.range.org/usdc?showPending=true&txhash=${txHash}`;

export const makeExplorerLinks = (txStatus: TxsStatusData | undefined) => {
  let rangeLink: ExplorerLink = null;
  let originLink: ExplorerLink = null;
  let destinationLink: ExplorerLink = null;

  if (!txStatus?.transferSequence.length) {
    return { rangeLink, originLink, destinationLink };
  }

  const transferSequence = txStatus.transferSequence;
  const isMultiTransferSequence = transferSequence.length > 1;

  if (isMultiTransferSequence) {
    const isFirstTxCCTP = transferSequence[0].bridgeID === 'CCTP';
    if (isFirstTxCCTP) {
      originLink = getRangeUsdcExplorerUrl(transferSequence[0].txs.sendTx?.txHash ?? '');
      destinationLink = transferSequence[1].txs.receiveTx?.explorerLink ?? '';
    } else {
      originLink = transferSequence[0].txs.sendTx?.explorerLink ?? '';
      const isLastTxCCTP = transferSequence[1].bridgeID === 'CCTP';
      if (isLastTxCCTP) {
        destinationLink = getRangeUsdcExplorerUrl(transferSequence[1].txs.receiveTx?.txHash ?? '');
      } else {
        destinationLink = transferSequence[1].txs.receiveTx?.explorerLink ?? '';
      }
    }
  } else {
    const isCCTP = transferSequence[0].bridgeID === 'CCTP';
    if (isCCTP) {
      rangeLink = getRangeUsdcExplorerUrl(transferSequence[0].txs.sendTx?.txHash ?? '');
    } else {
      originLink = transferSequence[0].txs.sendTx?.explorerLink ?? '';
      destinationLink = transferSequence[0].txs.receiveTx?.explorerLink ?? '';
    }
  }

  return {
    rangeLink,
    originLink,
    destinationLink
  };
};
