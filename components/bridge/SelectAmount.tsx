import { useEffect, useState, useMemo } from 'react';
import clsx from 'clsx';
import type { Asset } from '@skip-router/core';
import { matchSorter } from 'match-sorter';
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Transition
} from '@headlessui/react';
import { useVirtualizer } from '@tanstack/react-virtual';
import {
  Box,
  Stack,
  Text,
  NobleTokenAvatar,
  NobleInput,
  NobleButton,
  Skeleton,
  NobleSelectTokenButton,
  NobleSelectTokenButtonProps,
  ThemeProvider,
  NobleProvider,
  useColorModeValue,
  useTheme
} from '@interchain-ui/react';
import { ChevronDown } from '@/components/common';
import { calcDollarValue } from '@/utils';
import { SkipChain, useSkipChains, useUsdcAssets, useUsdcBalance, useUsdcPrice } from '@/hooks';
import BigNumber from 'bignumber.js';
import { NOBLE_CHAIN_ID } from '@/config';
import { WalletConnector } from './WalletConnector';
import { useCurrentWallets } from '@/contexts';

import { scrollBar } from '@/styles/Shared.css';
import * as styles from './SelectAmount.css';

const PARTIAL_PERCENTAGES = [0.1, 0.25, 0.5, 0.8, 1.0];
const DEFAULT_GAS_AMOUNT = (200_000).toString();
const OPTION_ITEM_WIDTH_PX = '466px';
const DEFAULT_USDC_ICON = '/logos/usdc.svg';

export type TokenOption = {
  chain: SkipChain;
  asset: Asset;
};

export type SelectedToken = TokenOption | null;

interface SelectAmountProps {
  amount: string;
  label?: string;
  destChainId: string | undefined;
  setAmount: (amount: string) => void;
  selectedToken: SelectedToken | undefined;
  setSelectedToken: (selectedToken: SelectedToken | undefined) => void;
  setBalance: (balance: string) => void;
  sorter?: (options: Array<TokenOption>, value: string) => Array<TokenOption>;
}

const defaultSorter = (options: Array<TokenOption>, value: string) => {
  return matchSorter(options, value, { keys: ['asset.symbol', 'chain.prettyName'] });
};

const optionToDisplayToken = (option: TokenOption): NobleSelectTokenButtonProps['token'] => {
  return {
    mainLogoUrl: option.asset.logoURI ?? DEFAULT_USDC_ICON,
    mainLogoAlt: option.asset.symbol ?? 'USDC',
    subLogoUrl: option.chain.logoURI ?? '',
    subLogoAlt: option.chain.prettyName ?? '',
    symbol: option.asset.symbol ?? '',
    network: option.chain.prettyName ?? '',
    tokenAmount: '',
    notionalValue: ''
  };
};

export const SelectAmount = ({
  amount,
  destChainId,
  setAmount,
  selectedToken,
  setSelectedToken,
  setBalance,
  sorter = defaultSorter,
  label
}: SelectAmountProps) => {
  const { theme } = useTheme();
  const { data: chains = [], isLoading: isFetchingChains } = useSkipChains();
  const { data: assets = {}, isLoading: isFetchingAssets } = useUsdcAssets();
  const { data: usdcPrice } = useUsdcPrice();
  const { srcWallet } = useCurrentWallets();

  const [query, setQuery] = useState<string>('');

  const { data: balance, isPending: isFetchingBalance } = useUsdcBalance({
    chain: selectedToken?.chain,
    asset: selectedToken?.asset,
    address: srcWallet.address
  });

  const isLoading = isFetchingChains || isFetchingAssets;

  const options: Array<TokenOption> = useMemo(() => {
    if (isLoading) return [];

    const rawOptions = Object.entries(assets)
      .filter(([chainId]) => {
        return chainId !== destChainId;
      })
      .map(([chainId, asset]) => {
        const chain = chains.find(({ chainID }) => chainID === chainId)!;

        return {
          asset,
          chain
        };
      });

    // Apply filtering
    if (query === '') {
      return rawOptions;
    }

    return sorter(rawOptions, query);
  }, [assets, chains, destChainId, isLoading, query, sorter]);

  const [partialPercent, setPartialPercent] = useState<number | null>(null);

  useEffect(() => {
    if (balance) {
      setBalance(balance);
    }
  }, [balance, setBalance]);

  const [scrollElement, setScrollElement] = useState<HTMLElement | null>(null);

  const isListboxOpen = !!scrollElement;

  const rowVirtualizer = useVirtualizer({
    count: options.length,
    getScrollElement: () => scrollElement,
    estimateSize: () => 96,
    overscan: 5
  });

  useEffect(() => {
    // Reset query when closed
    if (!isListboxOpen) {
      setQuery('');
    }
  }, [isListboxOpen]);

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
    const gasPrice = feeAsset?.gasPrice?.average ?? '0.1';
    const decimals = sourceAsset.decimals ?? 6;
    const gasRequired = BigNumber(gasPrice)
      .multipliedBy(DEFAULT_GAS_AMOUNT)
      .shiftedBy(-decimals)
      .toString();
    let newAmountIn = BigNumber(balance).minus(gasRequired);
    newAmountIn = newAmountIn.isNegative() ? BigNumber(0) : newAmountIn;
    setAmount(newAmountIn.decimalPlaces(decimals).toString());
  };

  const parsedAmount = amount ? (isNaN(+amount) ? '0' : amount) : '0';
  const amountInUsdcValue = usdcPrice ? calcDollarValue(parsedAmount, usdcPrice) : '$0';
  const listboxBg = useColorModeValue('$body', '$blue300');

  const assetCombobox = (
    <Box display="flex" gap="$8" top="0" left="0">
      <NobleTokenAvatar
        mainLogoUrl={selectedToken?.asset.logoURI ?? DEFAULT_USDC_ICON}
        mainLogoAlt={selectedToken?.asset.symbol}
        subLogoUrl={selectedToken?.chain.logoURI ?? ''}
        subLogoAlt={selectedToken?.chain.prettyName}
        isLoadingSubLogo={isFetchingChains || isFetchingAssets || !selectedToken}
      />

      <Combobox value={selectedToken} onChange={setSelectedToken} onClose={() => setQuery('')}>
        {({ open }) => (
          <>
            <Box display="flex" justifyContent="center" alignItems="center" gap="$4">
              <Box display="flex" flexDirection="column" gap="$1" justifyContent="space-between">
                <ComboboxInput
                  aria-label="Asset name"
                  placeholder="Choose an asset"
                  displayValue={(asset: TokenOption) => asset?.asset?.symbol ?? ''}
                  onChange={(event) => setQuery(event.target.value)}
                  data-is-selected={!!selectedToken}
                  className={clsx(styles.selectAmountTokenInput[theme])}
                />
                {selectedToken && (
                  <Text color="$textSecondary" fontSize="$sm" fontWeight="$normal">
                    {selectedToken.chain.prettyName}
                  </Text>
                )}
              </Box>

              <ComboboxButton className={styles.comboboxButton}>
                <Text as="span" fontSize="$xl" color="$textSecondary">
                  <ChevronDown color="currentColor" className={styles.comboboxButtonArrow} />
                </Text>
              </ComboboxButton>
            </Box>

            <Transition show={open}>
              <ComboboxOptions
                anchor={{
                  to: 'bottom start',
                  gap: '52px',
                  offset: '-89px'
                }}
                className={clsx(styles.comboboxDropdown[theme], scrollBar[theme])}
              >
                <ThemeProvider>
                  <NobleProvider>
                    <Box
                      boxRef={setScrollElement}
                      position="relative"
                      boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
                      backgroundColor={listboxBg}
                      // 5 items * 96px + input height
                      maxHeight={`calc(5 * 96px + 56px)`}
                      zIndex="$100"
                      width={OPTION_ITEM_WIDTH_PX}
                      overflowX="hidden"
                      overflowY="auto"
                    >
                      <div
                        className="virtual-container"
                        style={{
                          height: `${rowVirtualizer.getTotalSize()}px`,
                          width: OPTION_ITEM_WIDTH_PX,
                          position: 'relative'
                        }}
                      >
                        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                          const option = options[virtualRow.index];

                          return (
                            <div
                              key={virtualRow.index}
                              style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: `${virtualRow.size}px`,
                                transform: `translateY(${virtualRow.start}px)`
                              }}
                            >
                              <ComboboxOption
                                key={`${option.chain.chainName}_${option.asset.symbol}_${virtualRow.index}`}
                                value={options[virtualRow.index]}
                                style={{
                                  width: OPTION_ITEM_WIDTH_PX
                                }}
                              >
                                {({ focus, selected }) => (
                                  <NobleSelectTokenButton
                                    size="xl"
                                    borderless
                                    isActive={selected || focus}
                                    token={optionToDisplayToken(options[virtualRow.index])}
                                    attributes={{
                                      borderRadius: '0px'
                                    }}
                                  />
                                )}
                              </ComboboxOption>
                            </div>
                          );
                        })}
                      </div>
                    </Box>
                  </NobleProvider>
                </ThemeProvider>
              </ComboboxOptions>
            </Transition>
          </>
        )}
      </Combobox>
    </Box>
  );

  return (
    <Box className="select-amount-dropdown" width={OPTION_ITEM_WIDTH_PX} position="relative">
      <NobleInput
        id="token-amount"
        size="md"
        placeholder="Enter amount"
        value={amount}
        type="number"
        disabled={!selectedToken}
        onChange={(e) => {
          if (BigNumber(e.target.value).isNegative()) return;
          setAmount(e.target.value);
          setPartialPercent(null);
        }}
        inputTextAlign="right"
        startAddon={assetCombobox}
        endAddon={selectedToken ? null : <Skeleton width="60px" height="18px" borderRadius="$sm" />}
        labelContainerProps={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
        label={
          <>
            <WalletConnector label="Origin" chain={selectedToken?.chain} direction="source" />

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
                {isFetchingBalance && srcWallet.address ? (
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
    </Box>
  );
};
