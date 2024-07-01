import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, NobleButton, Text, Callout, useColorModeValue } from '@interchain-ui/react';
import type { RouteResponse } from '@skip-router/core';
import BigNumber from 'bignumber.js';

import { ArrowDownIcon, ExchangeIcon, FaqList, FadeIn, BaseButton } from '@/components';
import { sizes, colors } from '@/config';
import {
  BroadcastedTx,
  SkipChain,
  useDisclosure,
  useRoute,
  useUsdcAssets,
  useUsdcTransfer
} from '@/hooks';
import { checkIsInvalidRoute, shiftDecimals } from '@/utils';
import { useCurrentWallets } from '@/contexts';
import { BridgeStep, TransferInfo } from '@/pages/bridge';
import { SelectAmount, SelectedToken } from './SelectAmount';
import { SelectDestination } from './SelectDestination';
import { TransferExtraInfo } from './TransferExtraInfo';
import { SignTx } from './SignTx';
import { PoweredBy } from './PoweredBy';

interface SelectAmountDestProps {
  setRoute: (route: RouteResponse | undefined) => void;
  setBridgeStep: (step: BridgeStep) => void;
  setBroadcastedTxs: Dispatch<SetStateAction<BroadcastedTx[]>>;
  setTransferInfo: (info: TransferInfo | undefined) => void;
}

export const SelectAmountDest = ({
  setRoute,
  setBridgeStep,
  setTransferInfo,
  setBroadcastedTxs
}: SelectAmountDestProps) => {
  const { data: assets } = useUsdcAssets();

  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState('0');
  const [selectedToken, setSelectedToken] = useState<SelectedToken>();
  const [destChain, setDestChain] = useState<SkipChain>();
  const destAsset = assets && destChain ? assets[destChain.chainID] : undefined;

  const { srcWallet, destWallet } = useCurrentWallets();

  const {
    data: route,
    error: routeError,
    isError: routeIsError,
    isFetching: routeIsFetching
  } = useRoute({
    amount: shiftDecimals(amount, selectedToken?.asset?.decimals),
    sourceAssetDenom: selectedToken?.asset?.denom ?? '',
    sourceAssetChainID: selectedToken?.asset?.chainID ?? '',
    destAssetDenom: destAsset ? destAsset.denom : '',
    destAssetChainID: destAsset ? destAsset.chainID : '',
    enabled: !!selectedToken && !!destAsset
  });

  const { onTransfer, showSignTxView } = useUsdcTransfer({
    setRoute,
    setBridgeStep,
    setTransferInfo,
    setBroadcastedTxs
  });

  const isInvalidRoute = useMemo(() => checkIsInvalidRoute(route), [route]);

  const showTransferInfo = !!route && !!destChain && !!destWallet.address && !isInvalidRoute;

  const { onOpen: openSrcWalletPopover } = useDisclosure('source_wallet_popover');
  const { onOpen: openDestWalletPopover } = useDisclosure('dest_wallet_popover');

  const [isSwitchHovered, setIsSwitchHovered] = useState(false);

  const isSrcWalletDisconnected = !!srcWallet.chainId && !srcWallet.address;
  const isDestWalletDisconnected = !!destWallet.chainId && !destWallet.address;
  const isSrcAndDestUnset = !selectedToken && !destChain;

  const onSwitchDirection = () => {
    // Both unset, do nothing
    if (isSrcAndDestUnset) return;

    setDestChain(selectedToken?.chain);
    setSelectedToken(
      destChain && destAsset
        ? {
            chain: destChain,
            asset: destAsset
          }
        : null
    );
  };

  const onButtonClick = () => {
    if (isSrcWalletDisconnected) {
      openSrcWalletPopover();
      return;
    }
    if (isDestWalletDisconnected) {
      openDestWalletPopover();
      return;
    }
    onTransfer({
      route,
      amount,
      destChain,
      srcChain: selectedToken?.chain
    });
  };

  const buttonText = useMemo(() => {
    if (isSrcWalletDisconnected) return 'Connect Wallet';
    if (isDestWalletDisconnected) return 'Set Destination Address';
    if (routeIsFetching) return 'Finding best route...';
    return 'Bridge';
  }, [routeIsFetching, isSrcWalletDisconnected, isDestWalletDisconnected]);

  const isButtonEnabled = useMemo(() => {
    const isWalletDisconnected = isSrcWalletDisconnected || isDestWalletDisconnected;

    const isAmountValid = !!amount && BigNumber(amount).lte(balance);
    const isRouteValid = !!route && !routeIsFetching && !routeIsError && !isInvalidRoute;
    const isReadyToTransfer = isAmountValid && isRouteValid && !!destWallet.address;

    return isWalletDisconnected || isReadyToTransfer;
  }, [
    amount,
    balance,
    destWallet.address,
    route,
    routeIsFetching,
    routeIsError,
    isInvalidRoute,
    isSrcWalletDisconnected,
    isDestWalletDisconnected
  ]);

  const textColor = useColorModeValue(colors.blue50, colors.white);

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
          color={textColor}
          attributes={{ mb: '50px' }}
        >
          Send USDC
        </Text>

        <SelectAmount
          amount={amount}
          destChainId={destChain?.chainID}
          setAmount={setAmount}
          selectedToken={selectedToken}
          setSelectedToken={setSelectedToken}
          setBalance={setBalance}
        />

        <Box my="12px" display="flex" alignItems="center" justifyContent="center">
          <BaseButton onPress={onSwitchDirection}>
            <div
              onMouseEnter={() => {
                if (isSrcAndDestUnset) return;
                setIsSwitchHovered(true);
              }}
              onMouseLeave={() => setIsSwitchHovered(false)}
              style={{
                position: 'relative',
                width: '36px',
                height: '36px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key="arrow-down-icon"
                  animate={{ opacity: isSwitchHovered ? 0 : 1 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <ArrowDownIcon />
                </motion.div>
                <motion.div
                  key="exchange-icon"
                  animate={{ opacity: isSwitchHovered ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <ExchangeIcon />
                </motion.div>
              </AnimatePresence>
            </div>
          </BaseButton>
        </Box>

        <SelectDestination
          route={route}
          sourceChainId={selectedToken?.chain.chainID}
          destChain={destChain}
          setDestChain={setDestChain}
        />

        <NobleButton
          variant="solid"
          size="lg"
          attributes={{
            marginTop: '20px',
            fontWeight: '$semibold'
          }}
          onClick={onButtonClick}
          disabled={!isButtonEnabled}
        >
          {buttonText}
        </NobleButton>

        {routeError && (
          <Callout
            title="Error getting routes:"
            intent="error"
            attributes={{
              my: '$6',
              width: '100%'
            }}
          >
            {routeError?.message ?? ''}
          </Callout>
        )}

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
};
