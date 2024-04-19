import { chains } from 'chain-registry';
import { Asset, Chain } from '@chain-registry/types';
import { skipChainById } from "@/skip";

export const USDC_TO_UUSDC = 1e6;
export function uusdcToUsdc(uusdc: string | bigint = '0') {
  return new Intl.NumberFormat('en-US', {
    maximumSignificantDigits: 6
  }).format(parseInt(uusdc.toString()) / USDC_TO_UUSDC);
}

export const COSMOS_BECH32_PREFIX_TO_CHAIN_ID = {
  "cosmos1": "cosmoshub-4",
  "noble1": "noble-1",
  "stars1": "stargaze-1",
  "osmo1": "osmosis-1",
  "juno1": "juno-1",
}

export const COSMOS_CHAIN_ID_TO_USDC_IBC_DENOM = {
  "cosmoshub-4": "ibc/F663521BF1836B00F5F177680F74BFB9A8B5654A694D0D2BC249E03CF2509013",
  "noble-1": "uusdc",
  "stargaze-1": "ibc/4A1C18CA7F50544760CF306189B810CE4C1CB156C7FC870143D401FE7280E591",
  "osmosis-1": "ibc/498A0751C798A0D9A389AA3691123DADA57DAA4FE165D5C75894505B876BA6E4",
  "juno-1": "ibc/4A482FA914A4B9B05801ED81C33713899F322B24F76A06F4B8FE872485EA22FF",
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