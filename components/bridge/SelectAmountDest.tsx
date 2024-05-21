import { Dispatch, SetStateAction, useState } from 'react';
import { useChains } from '@cosmos-kit/react';
import { useAccount, useSwitchChain } from 'wagmi';
import { Box, NoblePageTitleBar, NobleButton, Text, toast } from '@interchain-ui/react';

import { ArrowDownIcon, FaqList, FadeIn } from '@/components/common';
import { CHAIN_TYPE, COSMOS_CHAIN_NAMES, sizes } from '@/config';
import { BroadcastedTx, SkipChain, useRoute, useUsdcAssets } from '@/hooks';
import {
  getCosmosChainNameById,
  isUserRejectedRequestError,
  isValidAddress,
  randomId,
  shiftDecimals
} from '@/utils';
import { useSkipClient } from '@/contexts';
import { BridgeStep, SelectedToken, TransferInfo } from '@/pages/bridge';
import { SelectAmount } from './SelectAmount';
import { SelectDestination } from './SelectDestination';
import { TransferExtraInfo } from './TransferExtraInfo';
import type { RouteResponse } from '@skip-router/core';
import { SignTx } from './SignTx';
import { txHistory } from '@/contexts';
import { PoweredBy } from './PoweredBy';

interface SelectAmountDestProps {
  selectedToken: SelectedToken;
  setRoute: Dispatch<SetStateAction<RouteResponse | null>>;
  setBridgeStep: Dispatch<SetStateAction<BridgeStep>>;
  setBroadcastedTxs: Dispatch<SetStateAction<BroadcastedTx[]>>;
  setTransferInfo: Dispatch<SetStateAction<TransferInfo | null>>;
}

export function SelectAmountDest({
  selectedToken,
  setRoute,
  setBridgeStep,
  setTransferInfo,
  setBroadcastedTxs
}: SelectAmountDestProps) {
  const { chain: sourceChain, asset: sourceAsset, balance } = selectedToken;

  const skipClient = useSkipClient();
  const cosmosChainContexts = useChains(COSMOS_CHAIN_NAMES);

  const [destChain, setDestChain] = useState<SkipChain | null>(null);
  const [destAddress, setDestAddress] = useState<string>('');
  const [amount, setAmount] = useState('0');
  const [showSignTxView, setShowSignTxView] = useState(false);

  const { address: evmAddress, chainId: connectedChainId } = useAccount();
  const { switchChainAsync } = useSwitchChain();
  const { data: assets } = useUsdcAssets();

  const destAsset = assets && destChain ? assets[destChain.chainID] : undefined;

  const {
    data: route,
    isError: routeIsError,
    isFetching: routeIsFetching
  } = useRoute({
    amount: shiftDecimals(amount, sourceAsset.decimals),
    sourceAssetDenom: sourceAsset.denom,
    sourceAssetChainID: sourceAsset.chainID,
    destAssetDenom: destAsset ? destAsset.denom : '',
    destAssetChainID: destAsset ? destAsset.chainID : '',
    enabled: !!destAsset
  });

  async function onTransfer() {
    if (!route || !evmAddress || !destChain || !destAddress) return;

    const sourceChainAddress =
      sourceChain.chainType === CHAIN_TYPE.EVM
        ? evmAddress
        : cosmosChainContexts[getCosmosChainNameById(sourceChain.chainID)].address!;

    const transferInfo: TransferInfo = {
      amount,
      fromChainID: sourceChain.chainID,
      fromChainAddress: sourceChainAddress,
      fromChainLogo: sourceChain.logoURI || '',
      toChainID: destChain.chainID,
      toChainAddress: destAddress,
      toChainLogo: destChain.logoURI || ''
    };

    setRoute(route);
    setShowSignTxView(true);
    setTransferInfo(transferInfo);

    const userAddresses = route.chainIDs.reduce((acc, chainID) => {
      if (/^\d+/.test(chainID)) {
        acc[chainID] = evmAddress;
      } else {
        acc[chainID] = cosmosChainContexts[getCosmosChainNameById(chainID)].address!;
      }
      return acc;
    }, {} as Record<string, string>);

    const historyId = randomId();

    try {
      if (
        sourceChain.chainType === CHAIN_TYPE.EVM &&
        connectedChainId !== Number(sourceChain.chainID)
      ) {
        await switchChainAsync({ chainId: Number(sourceChain.chainID) });
      }

      await skipClient?.executeRoute({
        route,
        userAddresses,
        validateGasBalance: route.txsRequired === 1,
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
      if (isUserRejectedRequestError(err)) {
        setShowSignTxView(false);
        return;
      }
      toast.error(
        <Text
          as="p"
          color="inherit"
          attributes={{
            maxHeight: '250px',
            overflow: 'auto'
          }}
        >
          {`Failed to execute transaction: ${err.message}`}
        </Text>,
        {
          duration: 6000
        }
      );
      setShowSignTxView(false);
    }
  }

  const shouldShowEstimates = !!route && !!destChain && !!evmAddress;
  const bridgeButtonText = routeIsFetching
    ? 'Finding best route...'
    : routeIsError
    ? 'No route found'
    : 'Bridge';

  const isBridgeButtonDisabled =
    !route ||
    !destAddress ||
    !isValidAddress(destAddress) ||
    +amount > +balance ||
    routeIsFetching ||
    routeIsError;

  if (showSignTxView) {
    return <SignTx />;
  }

  return (
    <FadeIn>
      <Box maxWidth={sizes.main.maxWidth} mx="auto" paddingTop="84px" paddingBottom="120px">
        <NoblePageTitleBar
          title="Select amount and destination"
          onBackButtonClick={() => setBridgeStep('select-token')}
          mb="$14"
        />

        <SelectAmount
          amount={amount}
          setAmount={setAmount}
          sourceAsset={sourceAsset}
          sourceChain={sourceChain}
          balance={balance}
        />

        <Box my="12px" display="flex" alignItems="center" justifyContent="center">
          <ArrowDownIcon />
        </Box>

        <SelectDestination
          route={route}
          sourceChainId={sourceChain.chainID}
          destChain={destChain}
          destAddress={destAddress}
          setDestChain={setDestChain}
          setDestAddress={setDestAddress}
        />

        <NobleButton
          variant="solid"
          size="lg"
          attributes={{
            marginTop: '20px',
            fontWeight: '$semibold'
          }}
          onClick={() => onTransfer()}
          disabled={isBridgeButtonDisabled}
        >
          {bridgeButtonText}
        </NobleButton>

        {shouldShowEstimates && (
          <TransferExtraInfo route={route} destChain={destChain} sourceChain={sourceChain} />
        )}

        <PoweredBy mt="30px" />
      </Box>

      <FaqList />
    </FadeIn>
  );
}
