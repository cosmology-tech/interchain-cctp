import { Dispatch, SetStateAction, useState } from 'react';
import { useWalletClient, useChain } from '@cosmos-kit/react';
import { Text, toast } from '@interchain-ui/react';
import { RouteResponse } from '@skip-router/core';

import { COSMOS_WALLET_KEY_TO_NAME, CosmosWalletKey, checkIsCosmosWallet } from '@/config';
import { BroadcastedTx, SkipChain } from '@/hooks';
import { isUserRejectedRequestError, randomId } from '@/utils';
import { useSkipClient, useCurrentWallets } from '@/contexts';
import { BridgeStep, TransferInfo } from '@/pages/bridge';
import { txHistory } from '@/contexts';
import { useUserAddresses } from './useUserAddresses';

export const useUsdcTransfer = ({
  setRoute,
  setBridgeStep,
  setBroadcastedTxs,
  setTransferInfo
}: {
  setRoute: (route: RouteResponse | undefined) => void;
  setBridgeStep: (step: BridgeStep) => void;
  setBroadcastedTxs: Dispatch<SetStateAction<BroadcastedTx[]>>;
  setTransferInfo: (info: TransferInfo | undefined) => void;
}) => {
  const skipClient = useSkipClient();
  const { srcWallet, destWallet } = useCurrentWallets();

  const cosmosWalletKey: CosmosWalletKey =
    srcWallet.walletKey && checkIsCosmosWallet(srcWallet.walletKey) ? srcWallet.walletKey : 'keplr';

  const [showSignTxView, setShowSignTxView] = useState(false);

  const { client: cosmosWalletClient } = useWalletClient(
    COSMOS_WALLET_KEY_TO_NAME[cosmosWalletKey]
  );

  const { getUserAddresses } = useUserAddresses();

  const srcAddress = srcWallet.address;
  const destAddress = destWallet.address;

  const onTransfer = async ({
    route,
    amount,
    srcChain,
    destChain
  }: {
    route: RouteResponse | undefined;
    amount: string;
    srcChain: SkipChain | undefined;
    destChain: SkipChain | undefined;
  }) => {
    if (!route || !srcChain || !destChain || !srcAddress || !destAddress) return;

    const transferInfo: TransferInfo = {
      amount,
      fromChainID: srcChain.chainID,
      fromChainAddress: srcAddress,
      fromChainLogo: srcChain.logoURI || '',
      toChainID: destChain.chainID,
      toChainAddress: destAddress,
      toChainLogo: destChain.logoURI || ''
    };

    setRoute(route);
    setShowSignTxView(true);
    setTransferInfo(transferInfo);

    const historyId = randomId();

    try {
      const userAddresses = await getUserAddresses({ route });

      await skipClient?.executeRoute({
        route,
        userAddresses,
        getCosmosSigner: async (chainID: string) => {
          const cosmosSigner =
            cosmosWalletClient?.getOfflineSignerDirect &&
            cosmosWalletClient.getOfflineSignerDirect(chainID);

          if (!cosmosSigner) {
            throw new Error(
              `getCosmosSigner error: no offline signer available for chain ${chainID}`
            );
          }

          return cosmosSigner;
        },
        onTransactionTracked: async (tx) => {
          txHistory.addItem({
            route,
            transferInfo,
            id: historyId,
            broadcastedTx: tx
          });

          setBroadcastedTxs((prev) => {
            const txs = [...prev, { chainID: tx.chainID, txHash: tx.txHash }];
            if (route.txsRequired === txs.length) {
              setBridgeStep('view-status');
            }
            return txs;
          });
        }
      });
    } catch (err: any) {
      console.error(err);
      !isUserRejectedRequestError(err) && toastTxError(err.message);
      txHistory.removeItem(historyId);
      setBroadcastedTxs([]);
      setShowSignTxView(false);
    }
  };

  return { showSignTxView, onTransfer };
};

function toastTxError(msg: string) {
  toast.error(
    <Text
      as="p"
      color="inherit"
      attributes={{
        maxHeight: '250px',
        overflow: 'auto'
      }}
    >
      {`Failed to execute transaction: ${msg}`}
    </Text>,
    {
      duration: 6000
    }
  );
}
