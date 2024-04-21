import { UsdcToken } from "@/models";
import { skipChainById } from "../skip/chains";
import {
  arbitrum,
  arbitrumSepolia,
  avalanche,
  avalancheFuji,
  base,
  baseSepolia,
  mainnet as ethereum,
  optimism,
  optimismSepolia,
  polygon,
  sepolia,
} from "viem/chains";

export const SKIP_API_CLIENT_ID = "29b79e8e-3d14-4610-893e-0368174b116e";

export const INFURA_ID = "a34977fe7318429d95563b12220c1840"; // Replace with you own Infura ID
export const INFURA_ETHEREUM_MAINNET_URL =
  `https://mainnet.infura.io/v3/${INFURA_ID}`;
export const INFURA_ARBITRUM_MAINNET_URL =
  `https://arbitrum-mainnet.infura.io/v3/${INFURA_ID}`;
export const INFURA_OPTIMISM_MAINNET_URL =
  `https://optimism-mainnet.infura.io/v3/${INFURA_ID}`;
export const INFURA_POLYGON_MAINNET_URL =
  `https://polygon-mainnet.infura.io/v3/${INFURA_ID}`;
export const INFURA_AVALANCHE_MAINNET_URL =
  `https://avalanche-mainnet.infura.io/v3/${INFURA_ID}`;

export const INFURA_AVALANCHE_TESTNET_URL =
  `https://avalanche-fuji.infura.io/v3/${INFURA_ID}`;

export const USDC_BASE_MAINNET = new UsdcToken({
  id: base.id,
  chain: skipChainById(base.id),
  contract: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
});

export const USDC_ETHEREUM_MAINNET = new UsdcToken({
  id: ethereum.id,
  chain: skipChainById(ethereum.id),
  contract: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
});

export const USDC_POLYGON_MAINNET = new UsdcToken({
  id: polygon.id,
  chain: skipChainById(polygon.id),
  contract: "0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
});

export const USDC_OPTIMISM_MAINNET = new UsdcToken({
  id: optimism.id,
  chain: skipChainById(optimism.id),
  contract: "0x0b2c639c533813f4aa9d7837caf62653d097ff85",
});

export const USDC_ARBITRUM_MAINNET = new UsdcToken({
  id: arbitrum.id,
  chain: skipChainById(arbitrum.id),
  contract: "0xaf88d065e77c8cc2239327c5edb3a432268e5831",
});

export const USDC_AVALANCHE_MAINNET = new UsdcToken({
  id: avalanche.id,
  chain: skipChainById(avalanche.id),
  contract: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
});

export const USDC_EVM_MAINNET = {
  [base.id]: USDC_BASE_MAINNET,
  [polygon.id]: USDC_POLYGON_MAINNET,
  [ethereum.id]: USDC_ETHEREUM_MAINNET,
  [optimism.id]: USDC_OPTIMISM_MAINNET,
  [arbitrum.id]: USDC_ARBITRUM_MAINNET,
  [avalanche.id]: USDC_AVALANCHE_MAINNET,
};

export const USDC_BASE_TESTNET = new UsdcToken({
  id: "84532",
  chain: skipChainById("84532"),
  contract: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
});

export const USDC_ETHEREUM_TESTNET = new UsdcToken({
  id: "11155111",
  chain: skipChainById("11155111"),
  contract: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
});

export const USDC_OPTIMISM_TESTNET = new UsdcToken({
  id: "11155420",
  chain: skipChainById("11155420"),
  contract: "0x5fd84259d66Cd46123540766Be93DFE6D43130D7",
});

export const USDC_ARBITRUM_TESTNET = new UsdcToken({
  id: "421614",
  chain: skipChainById("421614"),
  contract: "0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d",
});

export const USDC_AVALANCHE_TESTNET = new UsdcToken({
  id: "43113",
  chain: skipChainById("43113"),
  contract: "0x5425890298aed601595a70ab815c96711a31bc65",
});

export const USDC_EVM_TESTNET = {
  [sepolia.id]: USDC_ETHEREUM_TESTNET,
  [baseSepolia.id]: USDC_BASE_TESTNET,
  [avalancheFuji.id]: USDC_AVALANCHE_TESTNET,
  [optimismSepolia.id]: USDC_OPTIMISM_TESTNET,
  [arbitrumSepolia.id]: USDC_ARBITRUM_TESTNET,
};

export const COSMOS_BECH32_PREFIX_TO_CHAIN_ID = {
  "cosmos1": "cosmoshub-4",
  "noble1": "noble-1",
  "stars1": "stargaze-1",
  "osmo1": "osmosis-1",
  "juno1": "juno-1",
  "inj1": "injective-1",
  "dydx1": "dydx-mainnet-1",
  "agoric1": "agoric-3",
  "archway1": "archway-1",
  "migaloo1": "migaloo-1",
};

export const COSMOS_CHAIN_ID_TO_CHAIN_NAME = {
  "juno-1": "juno",
  "noble-1": "noble",
  "agoric-3": "agoric",
  "archway-1": "archway",
  "cosmoshub-4": "cosmoshub",
  "injective-1": "injective",
  "stargaze-1": "stargaze",
  "dydx-mainnet-1": "dydx",
  "osmosis-1": "osmosis",
  "migaloo-1": "migaloo",
};

export const COSMOS_CHAIN_ID_TO_PRETTY_NAME = {
  "juno-1": "Juno",
  "noble-1": "Noble",
  "agoric-3": "Agoric",
  "archway-1": "Archway",
  "cosmoshub-4": "Cosmos Hub",
  "injective-1": "Injective",
  "stargaze-1": "Stargaze",
  "dydx-mainnet-1": "DyDx",
  "osmosis-1": "Osmosis",
  "migaloo-1": "Migaloo",
};

export const COSMOS_CHAIN_ID_TO_USDC_IBC_DENOM = {
  "agoric-3":
    "ibc/FE98AAD68F02F03565E9FA39A5E627946699B2B07115889ED812D8BA639576A9",
  "cosmoshub-4":
    "ibc/F663521BF1836B00F5F177680F74BFB9A8B5654A694D0D2BC249E03CF2509013",
  "noble-1": "uusdc",
  "stargaze-1":
    "ibc/4A1C18CA7F50544760CF306189B810CE4C1CB156C7FC870143D401FE7280E591",
  "dydx-mainnet-1":
    "ibc/8E27BA2D5493AF5636760E354E46004562C46AB7EC0CC4C1CA14E9E20E2545B5",
  "osmosis-1":
    "ibc/498A0751C798A0D9A389AA3691123DADA57DAA4FE165D5C75894505B876BA6E4",
  "juno-1":
    "ibc/4A482FA914A4B9B05801ED81C33713899F322B24F76A06F4B8FE872485EA22FF",
  "archway-1":
    "ibc/43897B9739BD63E3A08A88191999C632E052724AB96BD4C74AE31375C991F48D",
  "miagloo-1":
    "ibc/BC5C0BAFD19A5E4133FDA0F3E04AE1FBEE75A4A226554B2CBB021089FF2E1F8A",
  "injective-1":
    "ibc/2CBC2EA121AE42563B08028466F37B600F2D7D4282342DE938283CC3FB2BC00E",
};


/** @see https://docs.axelar.dev/learn/txduration#common-finality-time-for-interchain-transactions */
const finalityTimeMap: Record<string, string> = {
  [`${ethereum.id}`]: "16 minutes",
  [`${avalanche.id}`]: "3 seconds",
  [`${polygon.id}`]: "~5 minutes",
  [`${optimism.id}`]: "30 minutes",
  [`${arbitrum.id}`]: "~20 minutes",
  [`${base.id}`]: "24 minutes",
};

/** @see https://docs.axelar.dev/learn/txduration#common-finality-time-for-interchain-transactions */
export function getFinalityTime(id: string | number) {
  return finalityTimeMap[`${id}`] || "~30 minutes";
}
