import { UsdcToken } from "@/models";
import { skipChainById } from "../skip/chains";
import { mainnet, arbitrum, optimism } from "viem/chains";

export const SKIP_API_CLIENT_ID = "29b79e8e-3d14-4610-893e-0368174b116e";

export const INFURA_ID = "a34977fe7318429d95563b12220c1840"; // Replace with you own Infura ID
export const INFURA_ETHEREUM_MAINNET_URL =
  `https://mainnet.infura.io/v3/${INFURA_ID}`;
export const INFURA_ARBITRUM_MAINNET_URL =
  `https://arbitrum-mainnet.infura.io/v3/${INFURA_ID}`;
export const INFURA_OPTIMISM_MAINNET_URL =
  `https://optimism-mainnet.infura.io/v3/${INFURA_ID}`;

export const USDC_CONTRACT_ADDRESS_ETH_MAINNET =
  "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
export const USDC_CONTRACT_ADDRESS_OPT_MAINNET =
  "0x0b2c639c533813f4aa9d7837caf62653d097ff85";
export const USDC_CONTRACT_ADDRESS_ARB_MAINNET =
  "0xaf88d065e77c8cc2239327c5edb3a432268e5831";

export const USDC_ETHEREUM_MAINNET = new UsdcToken({
  id: mainnet.id,
  chain: skipChainById(mainnet.id),
  contract: USDC_CONTRACT_ADDRESS_ETH_MAINNET
})

export const USDC_OPTIMISM_MAINNET = new UsdcToken({
  id: optimism.id,
  chain: skipChainById(optimism.id),
  contract: USDC_CONTRACT_ADDRESS_OPT_MAINNET
})

export const USDC_ARBITRUM_MAINNET = new UsdcToken({
  id: arbitrum.id,
  chain: skipChainById(arbitrum.id),
  contract: USDC_CONTRACT_ADDRESS_ARB_MAINNET
})

export const USDC_EVM = {
  [mainnet.id]: USDC_ETHEREUM_MAINNET,
  [optimism.id]: USDC_OPTIMISM_MAINNET,
  [arbitrum.id]: USDC_ARBITRUM_MAINNET,
}
