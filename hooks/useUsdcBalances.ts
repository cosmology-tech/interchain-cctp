import { useEffect, useMemo } from 'react';
import type { Asset } from '@skip-router/core';
import { useQuery } from '@tanstack/react-query';
import { readContract } from '@wagmi/core';

import { SkipChain } from './useSkipChains';
import { shiftDecimals } from '@/utils';
import {
  COSMOS_CHAINS,
  USDC_CONTRACT_ABI,
  WalletKey,
  checkIsCosmosWallet,
  config as wagmiConfig
} from '@/config';
import { useCosmosWallet } from './useCosmosWallet';
import { StargateClients, useStargateClients } from './useStargateClients';
import { useEvmWallet } from './useEvmWallet';

export type EVMAddress = `0x${string}`;

interface Args {
  chains?: SkipChain[];
  assets?: Record<string, Asset>;
  walletKey?: WalletKey;
}

export const useUsdcBalances = ({ chains = [], assets = {}, walletKey = 'keplr' }: Args) => {
  const {
    connect: connectEvmWallet,
    address: evmAddress,
    isConnected: isEvmWalletConnected
  } = useEvmWallet('metamask');

  const {
    isConnected: isCosmosWalletConnected,
    connect: connectCosmosWallet,
    chainIdToChainContext
  } = useCosmosWallet(checkIsCosmosWallet(walletKey) ? walletKey : 'keplr');

  const { data: stargateClients } = useStargateClients();

  const isEvmChainsOnly = chains.every((chain) => chain.chainType === 'evm');
  const isCosmosChainsOnly = chains.every((chain) => chain.chainType === 'cosmos');
  const hasCosmosChains = chains.some((chain) => chain.chainType === 'cosmos');

  useEffect(() => {
    if (isCosmosWalletConnected || isEvmChainsOnly) return;
    connectCosmosWallet();
  }, [connectCosmosWallet, isCosmosWalletConnected, isEvmChainsOnly]);

  useEffect(() => {
    if (isEvmWalletConnected || isCosmosChainsOnly) return;
    connectEvmWallet();
  }, [isCosmosChainsOnly, isEvmWalletConnected, connectEvmWallet]);

  const isConnected = isEvmChainsOnly
    ? isEvmWalletConnected
    : isCosmosChainsOnly
    ? isCosmosWalletConnected
    : isEvmWalletConnected && isCosmosWalletConnected;

  const isEnabled =
    isConnected &&
    chains.length > 0 &&
    Object.keys(assets).length > 0 &&
    (hasCosmosChains ? !!stargateClients : true);

  const queryKey = useMemo(() => {
    const accountAddr = checkIsCosmosWallet(walletKey)
      ? chainIdToChainContext[COSMOS_CHAINS[0].chain_id].address
      : evmAddress;

    return ['usdc-balances', walletKey, accountAddr];
  }, [walletKey, evmAddress, chainIdToChainContext]);

  return useQuery({
    queryKey,
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
            const { address: cosmosAddress } = chainIdToChainContext[chain.chainID];
            const stargateClient = (stargateClients as StargateClients)[chain.chainID];
            const coin = await stargateClient.getBalance(
              cosmosAddress!,
              assets[chain.chainID].denom
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
