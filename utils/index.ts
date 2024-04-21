import { chains } from 'chain-registry';
import { Asset, Chain } from '@chain-registry/types';
import { skipChainById } from "@/skip";
import { COSMOS_BECH32_PREFIX_TO_CHAIN_ID } from '@/config';

export const USDC_TO_UUSDC = 1e6;
export function uusdcToUsdc(uusdc: string | bigint = '0') {
  return new Intl.NumberFormat('en-US', {
    maximumSignificantDigits: 6
  }).format(parseInt(uusdc.toString()) / USDC_TO_UUSDC);
}

export function cosmosAddressToSkipChain(address: string) {
  for (const prefix of Object.keys(COSMOS_BECH32_PREFIX_TO_CHAIN_ID)) {
    if (address.startsWith(prefix)) {
      // @ts-ignore
      return skipChainById(COSMOS_BECH32_PREFIX_TO_CHAIN_ID[prefix]);
    }
  }
}

export function shortenAddress(address: string, partlen = 8) {
  return `${address.slice(0, partlen)}...${address.slice(-partlen)}`;
}

export function getLogo(from: Asset | Chain) {
  return from.logo_URIs?.svg || from.logo_URIs?.png || from.logo_URIs?.jpeg;
}

export function getChainLogo(name: string) {
  const chain = chains.find(chain => chain.chain_name === name)
  return chain ? getLogo(chain) : null;
}