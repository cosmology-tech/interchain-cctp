import type { Asset } from '@skip-router/core';
import { useQuery } from '@tanstack/react-query';
import { readContract } from '@wagmi/core';

import { SkipChain } from './useSkipChains';
import { shiftDecimals } from '@/utils';
import {
  CHAIN_TYPE,
  NOBLE_CHAIN_ID,
  NOBLE_CHAIN_NAME,
  USDC_CONTRACT_ABI,
  config as wagmiConfig
} from '@/config';
import { useStargateClient } from './useStargateClient';
import { useVerifyCosmosChain } from './useVerifyCosmosChain';

export type EVMAddress = `0x${string}`;

export const useUsdcBalance = ({
  chain,
  asset,
  address
}: {
  chain: SkipChain | undefined;
  asset: Asset | undefined;
  address: string | undefined;
}) => {
  const isCosmosChain = chain?.chainType === CHAIN_TYPE.COSMOS;

  const { getCosmosChainNameById } = useVerifyCosmosChain();

  const { data: stargateClient } = useStargateClient(
    isCosmosChain ? getCosmosChainNameById(chain?.chainID || NOBLE_CHAIN_ID) : NOBLE_CHAIN_NAME
  );

  return useQuery({
    queryKey: ['useUsdcBalance', chain?.chainID, asset?.denom, address],
    queryFn: async () => {
      if (!address || !chain || !asset) return;

      if (isCosmosChain) {
        if (!stargateClient) return;
        const coin = await stargateClient.getBalance(address, asset.denom);
        return shiftDecimals(coin.amount, -(asset.decimals ?? 6));
      }

      const balance = await readContract(wagmiConfig, {
        abi: USDC_CONTRACT_ABI,
        chainId: Number(chain.chainID),
        address: asset.tokenContract as EVMAddress,
        functionName: 'balanceOf',
        args: [address as EVMAddress]
      });

      return shiftDecimals(balance, -(asset.decimals ?? 6));
    },
    enabled: !!address && !!chain && !!asset && (isCosmosChain ? !!stargateClient : true)
  });
};
