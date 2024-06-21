import { useEffect, useState } from 'react';
import type { Asset } from '@skip-router/core';
import {
  Box,
  Stack,
  Text,
  NobleTokenAvatar,
  NobleInput,
  NobleButton,
  Skeleton,
  Icon,
  useColorModeValue,
  Popover,
  PopoverTrigger,
  PopoverContent,
  NobleSelectTokenButton
} from '@interchain-ui/react';
import { calcDollarValue } from '@/utils';
import { SkipChain, useSkipChains, useUsdcAssets, useUsdcBalance, useUsdcPrice } from '@/hooks';
import BigNumber from 'bignumber.js';
import { NOBLE_CHAIN_ID, colors } from '@/config';
import { WalletConnector } from './WalletConnector';

const PARTIAL_PERCENTAGES = [0.1, 0.25, 0.5, 0.8, 1.0];
const DEFAULT_GAS_AMOUNT = (200_000).toString();

export type SelectedToken = {
  chain: SkipChain;
  asset: Asset;
} | null;

interface SelectAmountProps {
  amount: string;
  setAmount: (amount: string) => void;
  selectedToken: SelectedToken;
  setSelectedToken: (selectedToken: SelectedToken) => void;
  setBalance: (balance: string) => void;
}

export const SelectAmount = ({
  amount,
  setAmount,
  selectedToken,
  setSelectedToken,
  setBalance
}: SelectAmountProps) => {
  const { data: chains = [], isLoading: isFetchingChains } = useSkipChains();
  const { data: assets = {}, isLoading: isFetchingAssets } = useUsdcAssets();

  const [isChainDropdownOpened, setIsChainDropdownOpened] = useState(false);
  const [address, setAddress] = useState<string | undefined>();

  const isLoading = isFetchingChains || isFetchingAssets;

  useEffect(() => {
    if (isLoading || !chains.length || selectedToken) return;

    const defaultSelectedChain = chains.find(({ chainID }) => chainID === NOBLE_CHAIN_ID)!;

    setSelectedToken({
      chain: defaultSelectedChain,
      asset: assets[defaultSelectedChain.chainID]
    });
  }, [isLoading]);

  const [partialPercent, setPartialPercent] = useState<number | null>(null);
  const { data: usdcPrice } = useUsdcPrice();

  const { data: balance, isPending: isFetchingBalance } = useUsdcBalance({
    chain: selectedToken?.chain,
    asset: selectedToken?.asset,
    address
  });

  useEffect(() => {
    if (balance) {
      setBalance(balance);
    }
  }, [balance]);

  const onPartialButtonClick = (selectedPartialPercent: number) => {
    if (!selectedToken || !balance) return;

    const { asset: sourceAsset } = selectedToken;

    setPartialPercent(selectedPartialPercent);

    if (BigNumber(selectedPartialPercent).eq(1)) {
      onMaxAmountClick();
      return;
    }

    const decimals = sourceAsset.decimals ?? 6;
    const amount = BigNumber(balance)
      .times(selectedPartialPercent)
      .decimalPlaces(decimals)
      .toString();
    setAmount(amount);
  };

  const onMaxAmountClick = () => {
    if (!selectedToken || !balance) return;

    const { asset: sourceAsset, chain: sourceChain } = selectedToken;

    const isNobleChain = sourceChain.chainID === NOBLE_CHAIN_ID;

    if (!isNobleChain) {
      setAmount(balance);
      return;
    }

    const feeAsset = sourceChain.feeAssets.find(({ denom }) => denom === 'uusdc');
    const gasPrice = feeAsset?.gasPrice.average ?? '0.1';
    const decimals = sourceAsset.decimals ?? 6;
    const gasRequired = BigNumber(gasPrice)
      .multipliedBy(DEFAULT_GAS_AMOUNT)
      .shiftedBy(-decimals)
      .toString();
    let newAmountIn = BigNumber(balance).minus(gasRequired);
    newAmountIn = newAmountIn.isNegative() ? BigNumber(0) : newAmountIn;
    setAmount(newAmountIn.decimalPlaces(decimals).toString());
  };

  const handleSelectChain = (chain: SkipChain, asset: Asset) => async () => {
    setSelectedToken({ chain, asset });
    setIsChainDropdownOpened(false);
  };

  const parsedAmount = amount ? (isNaN(+amount) ? '0' : amount) : '0';
  const amountInUsdcValue = usdcPrice ? calcDollarValue(parsedAmount, usdcPrice) : '$0';
  const dropdownIconColor = useColorModeValue(colors.gray500, colors.blue700);

  return (
    <NobleInput
      id="token-amount"
      size="md"
      // label="Select amount"
      placeholder="0"
      value={amount}
      type="number"
      onChange={(e) => {
        if (BigNumber(e.target.value).isNegative()) return;
        setAmount(e.target.value);
        setPartialPercent(null);
      }}
      inputTextAlign="right"
      startAddon={
        selectedToken ? (
          <Popover
            placement="bottom"
            // @ts-ignore
            arrowRef={null}
            triggerType="click"
            offset={{ mainAxis: 30, crossAxis: 130 }}
            isOpen={isChainDropdownOpened}
            setIsOpen={setIsChainDropdownOpened}
          >
            <PopoverTrigger>
              <Box display="flex" alignItems="center" cursor="pointer">
                <NobleTokenAvatar
                  mainLogoUrl={selectedToken.asset.logoURI ?? ''}
                  mainLogoAlt={selectedToken.asset.symbol}
                  subLogoUrl={selectedToken.chain.logoURI ?? ''}
                  subLogoAlt={selectedToken.chain.prettyName}
                />
                <Box display="flex" flexDirection="column" ml="$8" mr="$7">
                  <Text as="span" color="$text" fontSize="$xl" fontWeight="$semibold">
                    {selectedToken.asset.symbol}
                  </Text>
                  <Text as="span" color="$textSecondary" fontSize="$sm" fontWeight="$normal">
                    {selectedToken.chain.prettyName}
                  </Text>
                </Box>
                <Icon name="arrowDropDown" size="$2xl" color={dropdownIconColor} />
              </Box>
            </PopoverTrigger>
            <PopoverContent showArrow={false}>
              <Box
                bg="$white"
                width="466px"
                maxHeight="400px"
                display="flex"
                flexDirection="column"
                overflowY="auto"
              >
                {chains.map((chain) => {
                  const usdcAsset = assets[chain.chainID];

                  return (
                    <NobleSelectTokenButton
                      key={chain.chainID}
                      token={{
                        mainLogoUrl: usdcAsset?.logoURI ?? '',
                        mainLogoAlt: usdcAsset?.symbol ?? '',
                        subLogoUrl: chain.logoURI ?? '',
                        subLogoAlt: chain.prettyName,
                        symbol: usdcAsset?.symbol ?? '',
                        network: chain.prettyName,
                        tokenAmount: '',
                        notionalValue: ''
                      }}
                      onClick={handleSelectChain(chain, usdcAsset)}
                    />
                  );
                })}
              </Box>
            </PopoverContent>
          </Popover>
        ) : (
          <Skeleton width="120px" height="48px" borderRadius="$md" />
        )
      }
      labelContainerProps={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
      labelExtra={
        <>
          <WalletConnector
            label="Origin"
            chain={selectedToken?.chain}
            setAddress={setAddress}
            direction="source"
          />
          <Stack space="$4">
            {PARTIAL_PERCENTAGES.map((percent, index) => {
              const isMax = index === PARTIAL_PERCENTAGES.length - 1;

              return (
                <NobleButton
                  key={percent}
                  variant="tag"
                  size="xs"
                  isActive={partialPercent === percent}
                  onClick={() => onPartialButtonClick(percent)}
                >
                  {isMax ? 'Max' : `${percent * 100}%`}
                </NobleButton>
              );
            })}
          </Stack>
        </>
      }
      helperText={
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center" justifyContent="center" gap="$6">
            <Box display="flex" alignItems="center">
              <Text color="$textSecondary" fontSize="$sm" fontWeight="$normal">
                Available:&nbsp;
              </Text>
              {isFetchingBalance && address ? (
                <Skeleton width="40px" height="20px" borderRadius="$md" />
              ) : (
                <Text color="$textSecondary" fontSize="$sm" fontWeight="$normal">
                  {balance ? balance : '--'}
                </Text>
              )}
            </Box>

            {balance && +amount > +balance && (
              <Text color="$textWarning" fontSize="$sm" fontWeight="$normal">
                Insufficient balance
              </Text>
            )}
          </Box>

          <Text color="$textSecondary" fontSize="$sm" fontWeight="$normal">
            {amountInUsdcValue}
          </Text>
        </Box>
      }
    />
  );
};
