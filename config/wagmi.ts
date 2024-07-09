import { http, createConfig } from 'wagmi';
import {
  base,
  mainnet,
  sepolia,
  polygon,
  arbitrum,
  arbitrumSepolia,
  optimism,
  optimismSepolia,
  avalanche,
  avalancheFuji
} from 'wagmi/chains';
import { EVM_CHAINS } from './chains';
import { isTestnetMode } from '@/config/chains';
import { SkipChain } from '@/hooks/useSkipChains';

export const config = createConfig({
  // @ts-expect-error
  chains: EVM_CHAINS,
  transports: {
    [base.id]: http(),
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [polygon.id]: http(),
    [arbitrum.id]: http(),
    [arbitrumSepolia.id]: http(),
    [optimism.id]: http(),
    [optimismSepolia.id]: http(),
    [avalanche.id]: http(),
    [avalancheFuji.id]: http()
  }
});

export const wagmiConfigFactory = (skipChains: Array<SkipChain> = []) => {
  const defaultConfig = config;

  if (!skipChains.length || isTestnetMode) {
    return defaultConfig;
  }

  return createConfig({
    // @ts-expect-error
    chains: skipChains,
    transports: skipChains.reduce((acc, chain) => {
      // @ts-expect-error
      acc[chain.chainID] = http();
      return acc;
    }, {})
  });
};
