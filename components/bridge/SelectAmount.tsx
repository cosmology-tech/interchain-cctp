import { useState } from 'react';
import type { Asset } from '@skip-router/core';
import { Box, Stack, Text, NobleTokenAvatar, NobleInput, NobleButton } from '@interchain-ui/react';
import { calcDollarValue } from '@/utils';
import { SkipChain, useUsdcPrice } from '@/hooks';
import BigNumber from 'bignumber.js';
import { NOBLE_CHAIN_IDS } from '@/config';

const PARTIAL_PERCENTAGES = [0.1, 0.25, 0.5, 0.8, 1.0];
const DEFAULT_GAS_AMOUNT = (200_000).toString();

interface SelectAmountProps {
  amount: string;
  setAmount: (amount: string) => void;
  balance: string;
  sourceAsset: Asset;
  sourceChain: SkipChain;
}

export const SelectAmount = ({
  balance,
  amount,
  setAmount,
  sourceAsset,
  sourceChain
}: SelectAmountProps) => {
  const [partialPercent, setPartialPercent] = useState<number | null>(null);
  const { data: usdcPrice } = useUsdcPrice();

  const onPartialButtonClick = (selectedPartialPercent: number) => {
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
    const isNobleChain = NOBLE_CHAIN_IDS.includes(sourceChain.chainID);

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

  const shouldShowPartialButtons = isNaN(+balance) ? false : +balance > 0;
  const parsedAmount = amount ? (isNaN(+amount) ? '0' : amount) : '0';
  const amountInUsdcValue = usdcPrice ? calcDollarValue(parsedAmount, usdcPrice) : '$0';

  return (
    <NobleInput
      id="token-amount"
      size="md"
      label="Select amount"
      placeholder="Enter amount"
      value={amount}
      type="number"
      onChange={(e) => {
        setAmount(e.target.value);
        setPartialPercent(null);
      }}
      inputTextAlign="right"
      startAddon={
        <Box display="flex" gap="$8">
          <NobleTokenAvatar
            mainLogoUrl={sourceAsset.logoURI ?? ''}
            mainLogoAlt={sourceAsset.symbol}
            subLogoUrl={sourceChain.logoURI ?? ''}
            subLogoAlt={sourceChain.prettyName}
          />

          <Box display="flex" flexDirection="column">
            <Text as="span" color="$text" fontSize="$xl" fontWeight="$semibold">
              {sourceAsset.symbol}
            </Text>
            <Text as="span" color="$textSecondary" fontSize="$sm" fontWeight="$normal">
              On {sourceChain.prettyName}
            </Text>
          </Box>
        </Box>
      }
      labelContainerProps={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
      labelExtra={
        shouldShowPartialButtons ? (
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
        ) : null
      }
      helperText={
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center" justifyContent="center" gap="$6">
            <Text color="$textSecondary" fontSize="$sm" fontWeight="$normal">
              Available: {balance}
            </Text>

            {+amount > +balance ? (
              <Text color="$textWarning" fontSize="$sm" fontWeight="$normal">
                Insufficient balance
              </Text>
            ) : null}
          </Box>

          <Text color="$textSecondary" fontSize="$sm" fontWeight="$normal">
            {amountInUsdcValue}
          </Text>
        </Box>
      }
    />
  );
};
