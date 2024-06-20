import {
  // mainnets
  mainnet,
  arbitrum,
  avalanche,
  optimism,
  polygon,
  base,
  // testnets
  sepolia,
  avalancheFuji,
  optimismSepolia,
  // types
  Chain as EVMChain
} from 'wagmi/chains';

import noble from 'chain-registry/mainnet/noble/chain';
import cosmoshub from 'chain-registry/mainnet/cosmoshub/chain';
import stargaze from 'chain-registry/mainnet/stargaze/chain';
import osmosis from 'chain-registry/mainnet/osmosis/chain';
import juno from 'chain-registry/mainnet/juno/chain';
import agoric from 'chain-registry/mainnet/agoric/chain';

import nobletestnet from 'chain-registry/testnet/nobletestnet/chain';
import osmosistestnet from 'chain-registry/testnet/osmosistestnet/chain';

import type { Chain as CosmosChain } from '@chain-registry/types';
import { envConfig } from './env';

// =======================
// Supported chains
// =======================
export const EVM_MAINNETS: EVMChain[] = [mainnet, base, arbitrum, optimism, avalanche, polygon];
const EVM_TESTNETS: EVMChain[] = [sepolia, optimismSepolia, avalancheFuji];

const COSMOS_MAINNETS: CosmosChain[] = [noble, cosmoshub, stargaze, osmosis, juno, agoric];
const COSMOS_TESTNETS: CosmosChain[] = [nobletestnet, osmosistestnet];

// =======================
// Chain IDs
// =======================
const getEvmChainId = (chain: EVMChain) => chain.id.toString();
const getCosmosChainId = (chain: CosmosChain) => chain.chain_id;

export const isTestnetMode = envConfig.isTestnet === 'true';

export const SUPPORTED_CHAIN_IDS = isTestnetMode
  ? [...EVM_TESTNETS.map(getEvmChainId), ...COSMOS_TESTNETS.map(getCosmosChainId)]
  : [...EVM_MAINNETS.map(getEvmChainId), ...COSMOS_MAINNETS.map(getCosmosChainId)];

export const EVM_CHAINS = isTestnetMode ? EVM_TESTNETS : EVM_MAINNETS;
export const COSMOS_CHAINS = isTestnetMode ? COSMOS_TESTNETS : COSMOS_MAINNETS;

// =======================
// Chain ID to pretty name
// =======================
const evmChainIdToPrettyName = [...EVM_MAINNETS, ...EVM_TESTNETS].reduce(
  (res, cur) => ({ ...res, [cur.id]: cur.name }),
  {}
);

const cosmosChainIdToPrettyName = [...COSMOS_MAINNETS, ...COSMOS_TESTNETS].reduce(
  (res, cur) => ({ ...res, [cur.chain_id]: cur.pretty_name }),
  {}
);

export const CHAIN_ID_TO_PRETTY_NAME: Record<string, string> = {
  ...evmChainIdToPrettyName,
  ...cosmosChainIdToPrettyName
};

// =======================
// Other chain info
// =======================
export const COSMOS_CHAIN_NAMES = COSMOS_CHAINS.map((chain) => chain.chain_name);

export const CHAIN_TYPE = {
  EVM: 'evm',
  COSMOS: 'cosmos'
} as const;

export type ChainType = (typeof CHAIN_TYPE)[keyof typeof CHAIN_TYPE];

export const DEFAULT_USDC_LOGO = '/coins/usdc.svg';

export const NOBLE_CHAIN_ID = isTestnetMode ? nobletestnet.chain_id : noble.chain_id;
export const NOBLE_CHAIN_NAME = isTestnetMode ? nobletestnet.chain_name : noble.chain_name;
