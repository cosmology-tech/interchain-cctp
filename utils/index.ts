import { chains } from 'chain-registry';
import { Asset, Chain } from '@chain-registry/types';
import { CHAIN_TYPE } from '@/config/chains';
import BigNumber from 'bignumber.js';
import { RouteResponse } from '@skip-router/core';
import { SkipChain } from '@/hooks';
import { chains as chainList } from 'chain-registry';

export const USDC_TO_UUSDC = 1e6;
export function uusdcToUsdc(uusdc: string | bigint = '0') {
  return new Intl.NumberFormat('en-US', {
    maximumSignificantDigits: 6
  }).format(parseInt(uusdc.toString()) / USDC_TO_UUSDC);
}

export function shortenAddress(address: string, partlen = 8) {
  return `${address.slice(0, partlen)}...${address.slice(-partlen)}`;
}

export function isValidEvmAddress(address: string) {
  return address.startsWith('0x') && address.length === 42;
}

export function getLogo(from: Asset | Chain) {
  return from.logo_URIs?.svg || from.logo_URIs?.png || from.logo_URIs?.jpeg;
}

export function getChainLogo(name: string) {
  const chain = chains.find((chain) => chain.chain_name === name);
  return chain ? getLogo(chain) : null;
}

export const isCosmosChain = (chain: SkipChain) => {
  return chain.chainType === CHAIN_TYPE.COSMOS;
};

export const shiftDecimals = (number: string | number | bigint = 0, decimalPlaces: number = -6) => {
  return BigNumber(Number(number)).shiftedBy(decimalPlaces).toString();
};

export const calcDollarValue = (
  amount: string | number,
  price: number,
  formatted: boolean = true
) => {
  const dollarValue = BigNumber(amount).multipliedBy(price).toFormat(2);
  return formatted ? `${BigNumber(amount).gt(0) ? '≈' : ''} $${dollarValue}` : dollarValue;
};

export const calcEstimatedRemainingTime = (totalTime: string, percent: number) => {
  const timeValue = totalTime.split(' ')[0];
  const timeUnit = totalTime.split(' ')[1].slice(0, 6); // both 'minute' and 'second' are 6 characters long
  const remainingTime = BigNumber(timeValue)
    .multipliedBy(1 - percent)
    .decimalPlaces(0, BigNumber.ROUND_UP)
    .toString();

  return `${remainingTime} ${timeUnit}${remainingTime === '1' ? '' : 's'}`;
};

export const randomId = (length: number = 8) => {
  return Math.random()
    .toString(16)
    .substring(2, length + 2);
};

export function isUserRejectedRequestError(input: unknown): input is Error {
  if (input instanceof Error) {
    if (
      // keplr | metamask
      input.message.toLowerCase().includes('rejected') ||
      // leap
      input.message.toLowerCase().includes('declined') ||
      // @ts-expect-error common user rejected request error code
      input.code === 4001
    ) {
      return true;
    }
  }
  return false;
}

const USDC_DECIMALS = 6;

export const getOutAmount = (route: RouteResponse | undefined) => {
  if (!route) return '';
  return route.usdAmountOut
    ? route.usdAmountOut
    : BigNumber(route.estimatedAmountOut || route.amountOut)
        .shiftedBy(-USDC_DECIMALS)
        .toString();
};

export const checkIsInvalidRoute = (route: RouteResponse | undefined) => {
  if (!route) return false;
  return BigNumber(getOutAmount(route)).lte(0);
};

export const getChainPrettyName = (chainId: string, fallback?: string) => {
  const correspondingChain = chainList.find((c) => c.chain_id === chainId);
  return correspondingChain?.pretty_name ?? fallback ?? '';
};

export const getChainName = (chainId: string, fallback?: string) => {
  const correspondingChain = chainList.find((c) => c.chain_id === chainId);
  return correspondingChain?.chain_name ?? fallback ?? '';
};

export const getSkipChainPrettyName = (chainId: string, skipChains: SkipChain[]) => {
  const correspondingChain = skipChains.find((c) => c.chainID === chainId);
  return correspondingChain?.prettyName ?? '';
};
