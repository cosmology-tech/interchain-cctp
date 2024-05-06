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
import {
  INFURA_ARBITRUM_MAINNET_URL,
  INFURA_AVALANCHE_MAINNET_URL,
  INFURA_AVALANCHE_TESTNET_URL,
  INFURA_ETHEREUM_MAINNET_URL,
  INFURA_OPTIMISM_MAINNET_URL,
  INFURA_POLYGON_MAINNET_URL
} from './constants';
import { EVM_CHAINS } from './chains';

export const config = createConfig({
  // @ts-ignore
  chains: EVM_CHAINS,
  connectors: [injected()],
  transports: {
    [base.id]: http(),
    [mainnet.id]: http(INFURA_ETHEREUM_MAINNET_URL),
    [sepolia.id]: http(),
    [polygon.id]: http(INFURA_POLYGON_MAINNET_URL),
    [arbitrum.id]: http(INFURA_ARBITRUM_MAINNET_URL),
    [arbitrumSepolia.id]: http(),
    [optimism.id]: http(INFURA_OPTIMISM_MAINNET_URL),
    [optimismSepolia.id]: http(),
    [avalanche.id]: http(INFURA_AVALANCHE_MAINNET_URL),
    [avalancheFuji.id]: http(INFURA_AVALANCHE_TESTNET_URL)
  }
});
