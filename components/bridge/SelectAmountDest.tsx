import { useState } from 'react';
import { useChains } from '@cosmos-kit/react';
import { useAccount, useSwitchChain } from 'wagmi';
import { Box, Text, NoblePageTitleBar, NobleButton } from '@interchain-ui/react';

import { ArrowDownIcon, FaqList, FadeIn } from '@/components/common';
import { CHAIN_TYPE, COSMOS_CHAIN_NAMES, sizes } from '@/config';
import { SkipChain, useRoute, useUsdcAssets } from '@/hooks';
import { getCosmosChainNameById, isValidAddress, shiftDecimals } from '@/utils';
import { useSkipClient } from '@/skip';
import { BridgeStep, SelectedToken } from '@/pages/bridge';
import { SelectAmount } from './SelectAmount';
import { SelectDestination } from './SelectDestination';
import { TransferExtraInfo } from './TransferExtraInfo';

interface SelectAmountDestProps {
  selectedToken: SelectedToken;
  setBridgeStep: (bridgeStep: BridgeStep) => void;
}

export function SelectAmountDest({ selectedToken, setBridgeStep }: SelectAmountDestProps) {
  const { chain: sourceChain, asset: sourceAsset, balance } = selectedToken;

  const skipClient = useSkipClient();
  const cosmosChainContexts = useChains(COSMOS_CHAIN_NAMES);

  const [destChain, setDestChain] = useState<SkipChain | null>(null);
  const [destAddress, setDestAddress] = useState<string>('');
  const [amount, setAmount] = useState('0');
  const [txStatus, setTxStatus] = useState<'pending' | 'success'>(); // TODO: remove later

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
    if (!route || !evmAddress || !destAddress) return;

    if (
      sourceChain.chainType === CHAIN_TYPE.EVM &&
      connectedChainId !== Number(sourceChain.chainID)
    ) {
      await switchChainAsync({ chainId: Number(sourceChain.chainID) });
    }

    const userAddresses = route.chainIDs.reduce((acc, chainID) => {
      if (/^\d+/.test(chainID)) {
        acc[chainID] = evmAddress;
      } else {
        acc[chainID] = cosmosChainContexts[getCosmosChainNameById(chainID)].address!;
      }
      return acc;
    }, {} as Record<string, string>);

    try {
      await skipClient.executeRoute({
        route,
        userAddresses,
        validateGasBalance: route.txsRequired === 1,
        onTransactionTracked: async (tx) => {
          console.log('onTransactionTracked:', tx);
        },
        onTransactionBroadcast: async (tx) => {
          setTxStatus('pending');
          console.log('onTransactionBroadcast:', tx);
        },
        onTransactionCompleted: async (tx) => {
          setTxStatus('success');
          setTimeout(() => {
            setTxStatus(undefined);
          }, 10000);
          console.log('onTransactionCompleted:', tx);
        }
      });
      // setBridgeStep('sign-tx');
    } catch (e) {
      console.error('Error:', e);
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
            marginTop: '20px'
          }}
          onClick={() => onTransfer()}
          disabled={isBridgeButtonDisabled}
        >
          {bridgeButtonText}
        </NobleButton>

        {shouldShowEstimates && (
          <TransferExtraInfo route={route} destChain={destChain} sourceChain={sourceChain} />
        )}

        {/* TODO: remove later */}
        {txStatus && (
          <Box textAlign="center" mt="$12">
            <Text>
              Tx Status: <Text as="span">{txStatus.toUpperCase()}</Text>
            </Text>
          </Box>
        )}
      </Box>

      <FaqList />
    </FadeIn>
  );
}
