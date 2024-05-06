import Image from 'next/image';
import { Box, Text, useColorModeValue } from '@interchain-ui/react';
import { ClockIcon } from '@/components/common';
import { colors, getFinalityTime } from '@/config';
import { SkipChain, useUsdcPrice } from '@/hooks';
import { RouteResponse } from '@skip-router/core';
import { USDC_TO_UUSDC } from '@/utils';

function calcFeeFromRoute(route: RouteResponse, price = 1) {
  if (!route) return '0';
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 4
  }).format(((+route.amountIn - +route.amountOut) / USDC_TO_UUSDC) * price);
}

interface TransferExtraInfoProps {
  route: RouteResponse | undefined;
  destChain: SkipChain | null;
  sourceChain: SkipChain;
}

export const TransferExtraInfo = ({ route, sourceChain, destChain }: TransferExtraInfoProps) => {
  const { data: usdcPrice } = useUsdcPrice();

  return (
    <Box mt="1rem" display="flex" alignItems="center" visibility={destChain ? 'visible' : 'hidden'}>
      <Image width={18} height={18} src={sourceChain.logoURI ?? ''} alt={sourceChain.prettyName} />
      <Text color={useColorModeValue(colors.gray500, colors.blue700)} attributes={{ mx: '5px' }}>
        →
      </Text>

      {destChain ? (
        <Box
          width={18}
          height={18}
          display="flex"
          overflow="hidden"
          borderRadius="10px"
          alignItems="center"
          justifyContent="center"
        >
          <Image width={18} height={18} src={destChain.logoURI!} alt={destChain.prettyName} />
        </Box>
      ) : null}

      <Box ml="12px" display="flex" alignItems="center">
        <ClockIcon />
        <Text
          fontSize="14px"
          fontWeight="400"
          lineHeight="20px"
          attributes={{ ml: '5px' }}
          color={useColorModeValue(colors.gray500, colors.blue700)}
        >
          ≈ {getFinalityTime(sourceChain.chainID)}
        </Text>
      </Box>

      <Box display="flex" flex="1" justifyContent="right" visibility={route ? 'visible' : 'hidden'}>
        <Text
          color={useColorModeValue(colors.gray500, colors.blue700)}
          fontSize="14px"
          fontWeight="400"
          lineHeight="20px"
        >
          ${calcFeeFromRoute(route!, usdcPrice)} Fee
        </Text>
      </Box>
    </Box>
  );
};
