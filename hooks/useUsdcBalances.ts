import { useEffect } from 'react';
import { Asset } from '@skip-router/core';
import { useQuery } from '@tanstack/react-query';
import { readContract } from '@wagmi/core';
import { useChains } from '@cosmos-kit/react';
import { useAccount, useConnect } from 'wagmi';

import { SkipChain } from './useSkipChains';
import { getCosmosChainNameById, shiftDecimals } from '@/utils';
import {
  COSMOS_CHAIN_NAMES,
  NOBLE_CHAIN_IDS,
  USDC_CONTRACT_ABI,
  config as wagmiConfig
} from '@/config';
import { useConnectChains } from './useConnectChains';

export type EVMAddress = `0x${string}`;

interface Args {
  chains?: SkipChain[];
  assets?: Record<string, Asset>;
}

export const useUsdcBalances = ({ chains = [], assets = {} }: Args) => {
  const { connect: wagmiConnect, connectors } = useConnect();
  const { address: evmAddress, isConnected: isEvmWalletConnected } = useAccount();
  const cosmosChains = useChains(COSMOS_CHAIN_NAMES);
  const { isAllConnected: isCosmosWalletConnected, connectAll } =
    useConnectChains(COSMOS_CHAIN_NAMES);

  const isEvmChainsOnly = chains.every((chain) => chain.chainType === 'evm');
  const isCosmosChainsOnly = chains.every((chain) => chain.chainType === 'cosmos');

  useEffect(() => {
    if (isCosmosWalletConnected || isEvmChainsOnly) return;
    connectAll();
  }, [isCosmosWalletConnected]);

  useEffect(() => {
    if (isEvmWalletConnected || isCosmosChainsOnly) return;
    wagmiConnect({ connector: connectors[0] });
  }, [isEvmWalletConnected]);

  const isConnected = isEvmChainsOnly
    ? isEvmWalletConnected
    : isCosmosChainsOnly
    ? isCosmosWalletConnected
    : isEvmWalletConnected && isCosmosWalletConnected;

  const isEnabled = isConnected && chains.length > 0 && Object.keys(assets).length > 0;

  return useQuery({
    queryKey: ['usdc-balances', chains.map((chain) => chain.chainID), Object.keys(assets)],
    queryFn: async () => {
      if (!isEnabled) return {};

      const balances: { chainId: string; usdcBalance: string }[] = await Promise.all(
        chains.map(async (chain) => {
          if (chain.chainType === 'evm') {
            const balance = await readContract(wagmiConfig, {
              abi: USDC_CONTRACT_ABI,
              chainId: Number(chain.chainID),
              address: assets[chain.chainID].tokenContract as EVMAddress,
              functionName: 'balanceOf',
              args: [evmAddress!]
            });
            return {
              chainId: chain.chainID,
              usdcBalance: shiftDecimals(balance, -(assets[chain.chainID].decimals ?? 6))
            };
          }
          if (chain.chainType === 'cosmos') {
            const { address: cosmosAddress, getStargateClient } =
              cosmosChains[getCosmosChainNameById(chain.chainID)];
            const stargateClient = await getStargateClient();
            const coin = await stargateClient.getBalance(
              cosmosAddress!,
              NOBLE_CHAIN_IDS.includes(chain.chainID) ? 'uusdc' : assets[chain.chainID].denom
            );
            return {
              chainId: chain.chainID,
              usdcBalance: shiftDecimals(coin.amount, -(assets[chain.chainID]?.decimals ?? 6))
            };
          }
          return { chainId: chain.chainID, usdcBalance: '0' };
        })
      );

      return balances.reduce((acc, { chainId, usdcBalance }) => {
        return { ...acc, [chainId]: usdcBalance };
      }, {}) as Record<string, string>;
    },
    enabled: isEnabled
  });
};
