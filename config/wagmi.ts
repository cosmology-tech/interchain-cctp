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
import { injected } from 'wagmi/connectors';
import { EVM_CHAINS } from './chains';

export const config = createConfig({
  // @ts-ignore
  chains: EVM_CHAINS,
  connectors: [injected()],
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
