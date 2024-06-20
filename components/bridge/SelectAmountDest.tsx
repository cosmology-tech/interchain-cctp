import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { useWalletClient } from '@cosmos-kit/react';
import { useAccount, useSwitchChain } from 'wagmi';
import { Box, NobleButton, Text, toast, useColorModeValue } from '@interchain-ui/react';

import { ArrowDownIcon, FaqList, FadeIn } from '@/components/common';
import {
  CHAIN_TYPE,
  sizes,
  WalletKey,
  checkIsCosmosWallet,
  COSMOS_WALLET_KEY_TO_NAME,
  colors
} from '@/config';
import { BroadcastedTx, SkipChain, useCosmosWallet, useRoute, useUsdcAssets } from '@/hooks';
import {
  checkIsInvalidRoute,
  isUserRejectedRequestError,
  isValidAddress,
  randomId,
  shiftDecimals
} from '@/utils';
import { useSkipClient } from '@/contexts';
import { BridgeStep, TransferInfo } from '@/pages/bridge';
import { SelectAmount, SelectedToken } from './SelectAmount';
import { SelectDestination } from './SelectDestination';
import { TransferExtraInfo } from './TransferExtraInfo';
import type { RouteResponse } from '@skip-router/core';
import { SignTx } from './SignTx';
import { txHistory } from '@/contexts';
import { PoweredBy } from './PoweredBy';
import { useSearchParams } from 'next/navigation';

interface SelectAmountDestProps {
  setRoute: Dispatch<SetStateAction<RouteResponse | null>>;
  setBridgeStep: Dispatch<SetStateAction<BridgeStep>>;
  setBroadcastedTxs: Dispatch<SetStateAction<BroadcastedTx[]>>;
  setTransferInfo: Dispatch<SetStateAction<TransferInfo | null>>;
}

export function SelectAmountDest({
  setRoute,
  setBridgeStep,
  setTransferInfo,
  setBroadcastedTxs
}: SelectAmountDestProps) {
  const { data: assets } = useUsdcAssets();

  const [balance, setBalance] = useState('0');
  const [selectedToken, setSelectedToken] = useState<SelectedToken>(null);

  const skipClient = useSkipClient();

  const [destChain, setDestChain] = useState<SkipChain | null>(null);
  const [destAddress, setDestAddress] = useState<string | undefined>();
  const [amount, setAmount] = useState('');
  const [showSignTxView, setShowSignTxView] = useState(false);

  const searchParams = useSearchParams();
  const walletKey = (searchParams.get('wallet') ?? 'keplr') as WalletKey;

  const cosmosWalletKey = checkIsCosmosWallet(walletKey) ? walletKey : 'keplr';
  const { address: cosmosAddress } = useCosmosWallet(
    cosmosWalletKey,
    selectedToken?.chain.chainID ?? ''
  );
  const { client: cosmosWalletClient } = useWalletClient(
    COSMOS_WALLET_KEY_TO_NAME[cosmosWalletKey]
  );
  const { address: evmAddress, chainId: connectedChainId } = useAccount();
  const { switchChainAsync } = useSwitchChain();

  const destAsset = assets && destChain ? assets[destChain.chainID] : undefined;

  const {
    data: route,
    isError: routeIsError,
    isFetching: routeIsFetching
  } = useRoute({
    amount: shiftDecimals(amount, selectedToken?.asset?.decimals),
    sourceAssetDenom: selectedToken?.asset?.denom ?? '',
    sourceAssetChainID: selectedToken?.asset?.chainID ?? '',
    destAssetDenom: destAsset ? destAsset.denom : '',
    destAssetChainID: destAsset ? destAsset.chainID : '',
    enabled: !!destAsset && !!selectedToken
  });

  async function onTransfer() {
    if (!route || !evmAddress || !destChain || !destAddress || !selectedToken) return;

    const { chain: sourceChain } = selectedToken;

    const sourceChainAddress =
      sourceChain.chainType === CHAIN_TYPE.EVM ? evmAddress : cosmosAddress!;

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
        acc[chainID] = cosmosAddress!;
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

  const isInvalidRoute = useMemo(() => checkIsInvalidRoute(route), [route]);

  const showTransferInfo = !!route && !!destChain && !!evmAddress && !isInvalidRoute;

  const bridgeButtonText = routeIsFetching
    ? 'Finding best route...'
    : routeIsError || isInvalidRoute
    ? 'No route found'
    : 'Bridge';

  const isBridgeButtonDisabled =
    !route ||
    !destAddress ||
    !isValidAddress(destAddress) ||
    +amount > +balance ||
    routeIsFetching ||
    routeIsError ||
    isInvalidRoute;

  if (showSignTxView) {
    return <SignTx />;
  }

  return (
    <FadeIn>
      <Box maxWidth={sizes.main.maxWidth} mx="auto" paddingTop="84px" paddingBottom="120px">
        <Text
          fontSize="$8xl"
          fontWeight="600"
          lineHeight="1.4"
          textAlign="center"
          color={useColorModeValue(colors.blue50, colors.white)}
          attributes={{ mb: '50px' }}
        >
          Send USDC
        </Text>

        <SelectAmount
          amount={amount}
          setAmount={setAmount}
          selectedToken={selectedToken}
          setSelectedToken={setSelectedToken}
          setBalance={setBalance}
        />

        <Box my="12px" display="flex" alignItems="center" justifyContent="center">
          <ArrowDownIcon />
        </Box>

        <SelectDestination
          route={route}
          sourceChainId={selectedToken?.chain.chainID ?? ''}
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

        {showTransferInfo && selectedToken && (
          <TransferExtraInfo
            route={route}
            destChain={destChain}
            sourceChain={selectedToken.chain}
          />
        )}

        <PoweredBy mt="30px" />
      </Box>

      <FaqList />
    </FadeIn>
  );
}
