import { http, createConfig } from "wagmi";
import {
  mainnet,
  sepolia,
  arbitrum,
  arbitrumSepolia,
  optimism,
  optimismSepolia,
} from "wagmi/chains";
import { INFURA_ARBITRUM_MAINNET_URL, INFURA_ETHEREUM_MAINNET_URL, INFURA_OPTIMISM_MAINNET_URL } from "./constants";

export const config = createConfig({
  chains: [mainnet, sepolia, arbitrum, arbitrumSepolia, optimism, optimismSepolia],
  transports: {
    [mainnet.id]: http(INFURA_ETHEREUM_MAINNET_URL),
    [sepolia.id]: http(),
    [arbitrum.id]: http(INFURA_ARBITRUM_MAINNET_URL),
    [arbitrumSepolia.id]: http(),
    [optimism.id]: http(INFURA_OPTIMISM_MAINNET_URL),
    [optimismSepolia.id]: http(),
  }
});
