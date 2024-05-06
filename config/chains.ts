import {
  arbitrum,
  arbitrumSepolia,
  avalanche,
  optimism,
  optimismSepolia,
  sepolia,
  mainnet,
  Chain as EVMChain
} from 'wagmi/chains';

import noble from 'chain-registry/mainnet/noble/chain';
import cosmoshub from 'chain-registry/mainnet/cosmoshub/chain';
import stargaze from 'chain-registry/mainnet/stargaze/chain';
import osmosis from 'chain-registry/mainnet/osmosis/chain';
import juno from 'chain-registry/mainnet/juno/chain';
import nobletestnet from 'chain-registry/testnet/nobletestnet/chain';
import osmosistestnet from 'chain-registry/testnet/osmosistestnet/chain';
import type { Chain as CosmosChain } from '@chain-registry/types';

// Supported EVM chains
const EVM_MAINNETS: EVMChain[] = [mainnet, arbitrum, optimism, avalanche];
const EVM_TESTNETS: EVMChain[] = [sepolia, optimismSepolia, arbitrumSepolia];

// Supported Cosmos chains
const COSMOS_MAINNETS: CosmosChain[] = [noble, cosmoshub, stargaze, osmosis, juno];
const COSMOS_TESTNETS: CosmosChain[] = [nobletestnet, osmosistestnet];

// =======================

const getEvmChainId = (chain: EVMChain) => chain.id.toString();
const getCosmosChainId = (chain: CosmosChain) => chain.chain_id;

export const isTestnetMode = process.env.NEXT_PUBLIC_IS_TESTNET === 'true';

export const SUPPORTED_CHAIN_IDS = isTestnetMode
  ? [...EVM_TESTNETS.map(getEvmChainId), ...COSMOS_TESTNETS.map(getCosmosChainId)]
  : [...EVM_MAINNETS.map(getEvmChainId), ...COSMOS_MAINNETS.map(getCosmosChainId)];

export const EVM_CHAINS = isTestnetMode ? EVM_TESTNETS : EVM_MAINNETS;
export const COSMOS_CHAINS = isTestnetMode ? COSMOS_TESTNETS : COSMOS_MAINNETS;

const EVM_CHAIN_ID_TO_PRETTY_NAME = EVM_CHAINS.reduce((res, cur) => {
  return { ...res, [cur.id]: cur.name };
}, {});

const COSMOS_CHAIN_ID_TO_PRETTY_NAME = COSMOS_CHAINS.reduce((res, cur) => {
  return { ...res, [cur.chain_id]: cur.pretty_name };
}, {});

export const CHAIN_ID_TO_PRETTY_NAME: Record<string, string> = {
  ...EVM_CHAIN_ID_TO_PRETTY_NAME,
  ...COSMOS_CHAIN_ID_TO_PRETTY_NAME
};

export const CHAIN_TYPE = {
  EVM: 'evm',
  COSMOS: 'cosmos'
} as const;

export type ChainType = (typeof CHAIN_TYPE)[keyof typeof CHAIN_TYPE];

export const DEFAULT_USDC_LOGO = '/coins/usdc.svg';
