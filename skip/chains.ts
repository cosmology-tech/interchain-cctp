import { ChainJSON } from "@skip-router/core";

export type SkipChain = Partial<ChainJSON> & {
  "ibc_capabilities": {
    "cosmos_pfm": boolean;
    "cosmos_ibc_hooks": boolean;
    "cosmos_memo": boolean;
    "cosmos_autopilot": boolean;
  },
  "fee_assets": {
    "denom": string;
    "gas_price": {
      "low": string;
      "average": string;
      "high": string;
    } | null
  }[]
};

export const SkipChains: SkipChain[] = [
  {
    "chain_name": "ethereum-2-testnet",
    "chain_id": "5",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": false,
      "feegrant": false,
    },
    "supports_memo": false,
    "logo_uri":
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/goerlitestnet/info/logo.png",
    "bech32_prefix": "",
    "fee_assets": [],
    "chain_type": "evm",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": false,
      "cosmos_autopilot": false,
    },
    "is_testnet": true,
  },
  {
    "chain_name": "pryzmtestnet",
    "chain_id": "indigo-1",
    "pfm_enabled": true,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/cosmos/chain-registry/master/testnets/pryzmtestnet/images/pryzm-logo.png",
    "bech32_prefix": "pryzm",
    "fee_assets": [],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": true,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": true,
  },
  {
    "chain_name": "miniwasm",
    "chain_id": "miniwasm-2",
    "pfm_enabled": true,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/initia-labs/initia-registry/main/devnets/miniwasm/images/INIT.png",
    "bech32_prefix": "init",
    "fee_assets": [],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": true,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": true,
  },
  {
    "chain_name": "minimove",
    "chain_id": "minimove-2",
    "pfm_enabled": true,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/initia-labs/initia-registry/main/devnets/minimove/images/INIT.png",
    "bech32_prefix": "init",
    "fee_assets": [],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": true,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": true,
  },
  {
    "chain_name": "cronos",
    "chain_id": "cronosmainnet_25-1",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": false,
      "feegrant": true,
    },
    "supports_memo": false,
    "logo_uri":
      "https://raw.githubusercontent.com/cosmos/chain-registry/master/cronos/images/cronos.png",
    "bech32_prefix": "crc",
    "fee_assets": [],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": false,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "doravota",
    "chain_id": "vota-ash",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": true,
    "bech32_prefix": "dora",
    "fee_assets": [],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "Arbitrum",
    "chain_id": "42161",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": false,
      "feegrant": false,
    },
    "supports_memo": false,
    "logo_uri":
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/arbitrum/info/logo.png",
    "bech32_prefix": "",
    "fee_assets": [],
    "chain_type": "evm",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": false,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "gateway",
    "chain_id": "wormchain",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": false,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/wormchain/chain.png",
    "bech32_prefix": "wormhole",
    "fee_assets": [
      {
        "denom": "utest",
        "gas_price": {
          "low": "1",
          "average": "1",
          "high": "1",
        },
      },
    ],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "noble-testnet",
    "chain_id": "grand-1",
    "pfm_enabled": true,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/grand/chain.png",
    "bech32_prefix": "noble",
    "fee_assets": [
      {
        "denom": "uusdc",
        "gas_price": {
          "low": "0.1",
          "average": "0.1",
          "high": "0.2",
        },
      },
    ],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": true,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": true,
  },
  {
    "chain_name": "Avalanche",
    "chain_id": "43114",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": false,
      "feegrant": false,
    },
    "supports_memo": false,
    "logo_uri":
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/avalanchec/info/logo.png",
    "bech32_prefix": "",
    "fee_assets": [],
    "chain_type": "evm",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": false,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "stargaze",
    "chain_id": "stargaze-1",
    "pfm_enabled": true,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/stargaze/chain.png",
    "bech32_prefix": "stars",
    "fee_assets": [
      {
        "denom": "ustars",
        "gas_price": {
          "low": "1",
          "average": "1.1",
          "high": "1.2",
        },
      },
    ],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": true,
      "cosmos_ibc_hooks": true,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "evmos",
    "chain_id": "evmos_9001-2",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/evmos_9001/chain.png",
    "bech32_prefix": "evmos",
    "fee_assets": [
      {
        "denom": "aevmos",
        "gas_price": {
          "low": "80000000000",
          "average": "80000000000",
          "high": "80000000000",
        },
      },
    ],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "sentinel",
    "chain_id": "sentinelhub-2",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/sentinelhub/chain.png",
    "bech32_prefix": "sent",
    "fee_assets": [
      {
        "denom": "udvpn",
        "gas_price": {
          "low": "0.1",
          "average": "0.25",
          "high": "0.4",
        },
      },
    ],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "stargaze-testnet",
    "chain_id": "elgafar-1",
    "pfm_enabled": true,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/stargaze/chain.png",
    "bech32_prefix": "stars",
    "fee_assets": [
      {
        "denom": "ustars",
        "gas_price": null,
      },
    ],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": true,
      "cosmos_ibc_hooks": true,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": true,
  },
  {
    "chain_name": "sei",
    "chain_id": "pacific-1",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": false,
    "logo_uri":
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/pacific/chain.png",
    "bech32_prefix": "sei",
    "fee_assets": [
      {
        "denom": "usei",
        "gas_price": {
          "low": "0.1",
          "average": "0.2",
          "high": "0.3",
        },
      },
    ],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": false,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "cheqd",
    "chain_id": "cheqd-mainnet-1",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/cheqd-mainnet/chain.png",
    "bech32_prefix": "cheqd",
    "fee_assets": [
      {
        "denom": "ncheq",
        "gas_price": {
          "low": "25",
          "average": "50",
          "high": "100",
        },
      },
    ],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "agoric",
    "chain_id": "agoric-3",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/agoric/chain.png",
    "bech32_prefix": "agoric",
    "fee_assets": [
      {
        "denom": "ubld",
        "gas_price": {
          "low": "0.03",
          "average": "0.05",
          "high": "0.07",
        },
      },
      {
        "denom": "uist",
        "gas_price": {
          "low": "0.0034",
          "average": "0.007",
          "high": "0.02",
        },
      },
    ],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "akash",
    "chain_id": "akashnet-2",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/akashnet/chain.png",
    "bech32_prefix": "akash",
    "fee_assets": [
      {
        "denom": "uakt",
        "gas_price": null,
      },
    ],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "Celo",
    "chain_id": "42220",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": false,
      "feegrant": false,
    },
    "supports_memo": false,
    "bech32_prefix": "",
    "fee_assets": [],
    "chain_type": "evm",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": false,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "canto",
    "chain_id": "canto_7700-1",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": false,
    "logo_uri":
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/canto_7700/chain.png",
    "bech32_prefix": "canto",
    "fee_assets": [
      {
        "denom": "acanto",
        "gas_price": {
          "low": "1250000000000",
          "average": "2500000000000",
          "high": "3750000000000",
        },
      },
    ],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": false,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "quasar",
    "chain_id": "quasar-1",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/quasar/chain.png",
    "bech32_prefix": "quasar",
    "fee_assets": [
      {
        "denom":
          "ibc/FA0006F056DB6719B8C16C551FC392B62F5729978FC0B125AC9A432DBB2AA1A5",
        "gas_price": {
          "low": "0.01",
          "average": "0.01",
          "high": "0.02",
        },
      },
      {
        "denom":
          "ibc/0471F1C4E7AFD3F07702BEF6DC365268D64570F7C1FDC98EA6098DD6DE59817B",
        "gas_price": {
          "low": "0.01",
          "average": "0.01",
          "high": "0.02",
        },
      },
      {
        "denom": "uqsr",
        "gas_price": {
          "low": "0.1",
          "average": "0.1",
          "high": "0.2",
        },
      },
      {
        "denom":
          "ibc/FA7775734CC73176B7425910DE001A1D2AD9B6D9E93129A5D0750EAD13E4E63A",
        "gas_price": {
          "low": "0.01",
          "average": "0.01",
          "high": "0.02",
        },
      },
    ],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": true,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "sommelier",
    "chain_id": "sommelier-3",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/sommelier/chain.png",
    "bech32_prefix": "somm",
    "fee_assets": [
      {
        "denom": "usomm",
        "gas_price": null,
      },
    ],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "stride",
    "chain_id": "stride-1",
    "pfm_enabled": true,
    "cosmos_module_support": {
      "authz": false,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/stride/chain.png",
    "bech32_prefix": "stride",
    "fee_assets": [
      {
        "denom": "stadym",
        "gas_price": {
          "low": "15000000000",
          "average": "15000000000",
          "high": "50000000000",
        },
      },
      {
        "denom":
          "ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2",
        "gas_price": {
          "low": "0.0001",
          "average": "0.001",
          "high": "0.01",
        },
      },
      {
        "denom":
          "ibc/BF3B4F53F3694B66E13C23107C84B6485BD2B96296BB7EC680EA77BBA75B4801",
        "gas_price": {
          "low": "0.01",
          "average": "0.01",
          "high": "0.01",
        },
      },
      {
        "denom":
          "ibc/561C70B20188A047BFDE6F9946BDDC5D8AC172B9BE04FF868DFABF819E5A9CCE",
        "gas_price": {
          "low": "15000000000",
          "average": "15000000000",
          "high": "15000000000",
        },
      },
      {
        "denom":
          "ibc/A7454562FF29FE068F42F9DE4805ABEF54F599D1720B345D6518D9B5C64EA6D2",
        "gas_price": {
          "low": "500000000",
          "average": "500000000",
          "high": "500000000",
        },
      },
      {
        "denom": "stusaga",
        "gas_price": {
          "low": "0.01",
          "average": "0.01",
          "high": "0.01",
        },
      },
      {
        "denom":
          "ibc/520D9C4509027DE66C737A1D6A6021915A3071E30DBA8F758B46532B060D7AA5",
        "gas_price": {
          "low": "0.01",
          "average": "0.01",
          "high": "0.01",
        },
      },
      {
        "denom":
          "ibc/4B322204B4F59D770680FE4D7A565DDC3F37BFF035474B717476C66A4F83DD72",
        "gas_price": {
          "low": "20000000000",
          "average": "20000000000",
          "high": "20000000000",
        },
      },
      {
        "denom":
          "ibc/E1C22332C083574F3418481359733BA8887D171E76C80AD9237422AEABB66018",
        "gas_price": {
          "low": "15000000000",
          "average": "15000000000",
          "high": "50000000000",
        },
      },
      {
        "denom": "ustrd",
        "gas_price": {
          "low": "0.0005",
          "average": "0.005",
          "high": "0.05",
        },
      },
      {
        "denom":
          "ibc/D24B4564BCD51D3D02D9987D92571EAC5915676A9BD6D9B0C1D0254CB8A5EA34",
        "gas_price": {
          "low": "0.001",
          "average": "0.01",
          "high": "0.1",
        },
      },
      {
        "denom": "staevmos",
        "gas_price": {
          "low": "20000000000",
          "average": "20000000000",
          "high": "20000000000",
        },
      },
      {
        "denom": "stuatom",
        "gas_price": {
          "low": "0.0001",
          "average": "0.001",
          "high": "0.01",
        },
      },
      {
        "denom": "stutia",
        "gas_price": {
          "low": "0.01",
          "average": "0.01",
          "high": "0.01",
        },
      },
      {
        "denom": "stinj",
        "gas_price": {
          "low": "500000000",
          "average": "500000000",
          "high": "500000000",
        },
      },
      {
        "denom": "stadydx",
        "gas_price": {
          "low": "15000000000",
          "average": "15000000000",
          "high": "15000000000",
        },
      },
      {
        "denom": "stuosmo",
        "gas_price": {
          "low": "0.001",
          "average": "0.01",
          "high": "0.1",
        },
      },
    ],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": true,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": true,
      "cosmos_autopilot": true,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "shentu",
    "chain_id": "shentu-2.2",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/cosmos/chain-registry/master/shentu/images/ctk.png",
    "bech32_prefix": "shentu",
    "fee_assets": [],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "passage",
    "chain_id": "passage-1",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": false,
      "feegrant": false,
    },
    "supports_memo": false,
    "bech32_prefix": "",
    "fee_assets": [],
    "chain_type": "",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": false,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "carbon",
    "chain_id": "carbon-1",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/carbon/chain.png",
    "bech32_prefix": "swth",
    "fee_assets": [
      {
        "denom":
          "ibc/07FA7831E1920D0C87C9388F86B0108677F6ED0C9DE7E4063F05ED675192405C",
        "gas_price": {
          "low": "0.116666666667",
          "average": "0.116666666667",
          "high": "0.116666666667",
        },
      },
      {
        "denom":
          "ibc/75249A18DEFBEFE55F83B1C70CAD234DF164F174C6BC51682EE92C2C81C18C93",
        "gas_price": {
          "low": "0.005",
          "average": "0.005",
          "high": "0.005",
        },
      },
      {
        "denom":
          "ibc/A4DB47A9D3CF9A068D454513891B526702455D3EF08FB9EB558C561F9DC2B701",
        "gas_price": {
          "low": "0.000333333334",
          "average": "0.000333333334",
          "high": "0.000333333334",
        },
      },
      {
        "denom": "swth",
        "gas_price": {
          "low": "100",
          "average": "100",
          "high": "100",
        },
      },
      {
        "denom":
          "ibc/B7864B03E1B9FD4F049243E92ABD691586F682137037A9F3FCA5222815620B3C",
        "gas_price": {
          "low": "0.000333333334",
          "average": "0.000333333334",
          "high": "0.000333333334",
        },
      },
      {
        "denom":
          "ibc/4E06CF24FEBFB3F5AF645377DCC0B70AA6183BAF6B918B8B6243FCDEB7D38118",
        "gas_price": {
          "low": "0.02",
          "average": "0.02",
          "high": "0.02",
        },
      },
      {
        "denom": "zil.1.18.1a4a06",
        "gas_price": {
          "low": "200000",
          "average": "200000",
          "high": "200000",
        },
      },
      {
        "denom": "busd.1.6.754a80",
        "gas_price": {
          "low": "3333333333.33334",
          "average": "3333333333.33334",
          "high": "3333333333.33334",
        },
      },
      {
        "denom": "cgt/1",
        "gas_price": {
          "low": "3333333333.33334",
          "average": "3333333333.33334",
          "high": "3333333333.33334",
        },
      },
      {
        "denom":
          "ibc/ED07A3391A112B175915CD8FAF43A2DA8E4790EDE12566649D0C2F97716B8518",
        "gas_price": {
          "low": "0.005",
          "average": "0.005",
          "high": "0.005",
        },
      },
      {
        "denom": "bneo.1.14.e2e5f6",
        "gas_price": {
          "low": "0.05",
          "average": "0.05",
          "high": "0.05",
        },
      },
      {
        "denom":
          "ibc/2B58B8C147E8718EECCB3713271DF46DEE8A3A00A27242628604E31C2F370EF5",
        "gas_price": {
          "low": "0.001666666667",
          "average": "0.001666666667",
          "high": "0.001666666667",
        },
      },
      {
        "denom": "usdc.1.6.53ff75",
        "gas_price": {
          "low": "3333333333.33334",
          "average": "3333333333.33334",
          "high": "3333333333.33334",
        },
      },
      {
        "denom": "cglp.1.19.1698d3",
        "gas_price": {
          "low": "3333333333.33334",
          "average": "3333333333.33334",
          "high": "3333333333.33334",
        },
      },
      {
        "denom": "usc",
        "gas_price": {
          "low": "0.003333333334",
          "average": "0.003333333334",
          "high": "0.003333333334",
        },
      },
      {
        "denom":
          "ibc/92E974290AF9E2BC3AEEEC35305C8FD76AC5A22A74CF8D91270FDF5A1C41E861",
        "gas_price": {
          "low": "6666666666.66667",
          "average": "6666666666.66667",
          "high": "6666666666.66667",
        },
      },
      {
        "denom": "eth.1.2.942d87",
        "gas_price": {
          "low": "3333333.33333334",
          "average": "3333333.33333334",
          "high": "3333333.33333334",
        },
      },
      {
        "denom":
          "ibc/35E771B8682D828173F4B795F6C307780F96DC64D6F914FAE4CC9B4666F66364",
        "gas_price": {
          "low": "10000000000",
          "average": "10000000000",
          "high": "10000000000",
        },
      },
      {
        "denom": "eth.1.19.c3b805",
        "gas_price": {
          "low": "3333333.33333334",
          "average": "3333333.33333334",
          "high": "3333333.33333334",
        },
      },
      {
        "denom":
          "ibc/662914D0C1CEBCB070C68F061D035E8B10A07C79AB286E7342C85F3BE74612C5",
        "gas_price": {
          "low": "0.005",
          "average": "0.005",
          "high": "0.005",
        },
      },
      {
        "denom":
          "ibc/3552CECB7BCE1891DB6070D37EC6E954C972B1400141308FCD85FD148BD06DE5",
        "gas_price": {
          "low": "0.010666666667",
          "average": "0.010666666667",
          "high": "0.010666666667",
        },
      },
      {
        "denom": "bnb.1.6.773edb",
        "gas_price": {
          "low": "33333333.3333334",
          "average": "33333333.3333334",
          "high": "33333333.3333334",
        },
      },
      {
        "denom": "usdc.1.2.343151",
        "gas_price": {
          "low": "0.00333333333333334",
          "average": "0.00333333333333334",
          "high": "0.00333333333333334",
        },
      },
    ],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "saga",
    "chain_id": "ssc-1",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/ssc/chain.png",
    "bech32_prefix": "saga",
    "fee_assets": [
      {
        "denom": "usaga",
        "gas_price": {
          "low": "0.01",
          "average": "0.025",
          "high": "0.04",
        },
      },
    ],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "arbitrum-sepolia-testnet",
    "chain_id": "421614",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": false,
      "feegrant": false,
    },
    "supports_memo": false,
    "logo_uri":
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/arbitrum/info/logo.png",
    "bech32_prefix": "",
    "fee_assets": [],
    "chain_type": "evm",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": false,
      "cosmos_autopilot": false,
    },
    "is_testnet": true,
  },
  {
    "chain_name": "comdex",
    "chain_id": "comdex-1",
    "pfm_enabled": true,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": false,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/comdex/chain.png",
    "bech32_prefix": "comdex",
    "fee_assets": [
      {
        "denom":
          "ibc/D031367F58DFD5EED54A49ADCB4EFB44AD9ECCAE383708BFDCCACF3CF463B77C",
        "gas_price": {
          "low": "0.0002",
          "average": "0.0005",
          "high": "0.0008",
        },
      },
      {
        "denom": "ucmdx",
        "gas_price": {
          "low": "2",
          "average": "3",
          "high": "4",
        },
      },
      {
        "denom":
          "ibc/961FA3E54F5DCCA639F37A7C45F7BBE41815579EF1513B5AFBEFCFEB8F256352",
        "gas_price": {
          "low": "0.0001",
          "average": "0.001",
          "high": "0.01",
        },
      },
    ],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": true,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "jackal",
    "chain_id": "jackal-1",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/jackal/chain.png",
    "bech32_prefix": "jkl",
    "fee_assets": [
      {
        "denom": "ujkl",
        "gas_price": {
          "low": "0.002",
          "average": "0.002",
          "high": "0.02",
        },
      },
    ],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "crescent",
    "chain_id": "crescent-1",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/crescent/chain.png",
    "bech32_prefix": "cre",
    "fee_assets": [
      {
        "denom":
          "ibc/CA1261224952DF089EFD363D8DBB30A8AB6D8CD181E60EE9E68E432F8DE14FE3",
        "gas_price": {
          "low": "0.000842",
          "average": "0.002105",
          "high": "0.002526",
        },
      },
      {
        "denom":
          "ibc/61DF64ADF65230540C14C63D64897BE08A3DC9A516A91425913F01240E2F432F",
        "gas_price": {
          "low": "0.008146",
          "average": "0.020365",
          "high": "0.024438",
        },
      },
      {
        "denom":
          "ibc/C4CFF46FD6DE35CA4CF4CE031E643C8FDC9BA4B99AE598E9B0ED98FE3A2319F9",
        "gas_price": {
          "low": "0.000063",
          "average": "0.0001575",
          "high": "0.000189",
        },
      },
      {
        "denom":
          "ibc/764D1629980B02BAFF3D25BEE4FB1E0C5E350AFA252FDF66E68E10D2179A826A",
        "gas_price": {
          "low": "200000000",
          "average": "500000000",
          "high": "600000000",
        },
      },
      {
        "denom":
          "ibc/D64F87FAE0B35C1954DD7921BA7A2939705DE77CBF72B8002F2E3552EDE4DE52",
        "gas_price": {
          "low": "0.00006",
          "average": "0.00015",
          "high": "0.00018",
        },
      },
      {
        "denom":
          "ibc/5A76568E079A31FA12165E4559BA9F1E9D4C97F9C2060B538C84DCD503815E30",
        "gas_price": {
          "low": "3350000000",
          "average": "8375000000",
          "high": "10050000000",
        },
      },
      {
        "denom":
          "ibc/8F865D9760B482FF6254EDFEC1FF2F1273B9AB6873A7DE484F89639795D73D75",
        "gas_price": {
          "low": "0.0004",
          "average": "0.001",
          "high": "0.0012",
        },
      },
      {
        "denom":
          "ibc/CD01034D6749F20AAC5330EF4FD8B8CA7C40F7527AB8C4A302FBD2A070852EE1",
        "gas_price": {
          "low": "0.000842",
          "average": "0.002105",
          "high": "0.002526",
        },
      },
      {
        "denom":
          "ibc/C814F0B662234E24248AE3B2FE2C1B54BBAF12934B757F6E7BC5AEC119963895",
        "gas_price": {
          "low": "0.000568",
          "average": "0.00142",
          "high": "0.001704",
        },
      },
      {
        "denom":
          "ibc/C950356239AD2A205DE09FDF066B1F9FF19A7CA7145EA48A5B19B76EE47E52F7",
        "gas_price": {
          "low": "0.065405",
          "average": "0.1635125",
          "high": "0.196215",
        },
      },
      {
        "denom":
          "ibc/11F940BCDFD7CFBFD7EDA13F25DA95D308286D441209D780C9863FD4271514EB",
        "gas_price": {
          "low": "0.002",
          "average": "0.005",
          "high": "0.006",
        },
      },
      {
        "denom": "ucre",
        "gas_price": {
          "low": "0.01",
          "average": "0.025",
          "high": "0.03",
        },
      },
      {
        "denom":
          "ibc/4627AD2524E3E0523047E35BB76CC90E37D9D57ACF14F0FCBCEB2480705F3CB8",
        "gas_price": {
          "low": "5",
          "average": "12.5",
          "high": "15",
        },
      },
      {
        "denom":
          "ibc/0634D0993744740D675AD01E81156EAC945AEAAE17C074918DC7FF52F41B263E",
        "gas_price": {
          "low": "0.0014",
          "average": "0.0035",
          "high": "0.0042",
        },
      },
      {
        "denom":
          "ibc/9EC8A1701813BB7B73BFED2496009ABB2C8BF187E6CDFA788D77F68E08BC05CD",
        "gas_price": {
          "low": "0.000842",
          "average": "0.002105",
          "high": "0.002526",
        },
      },
      {
        "denom":
          "ibc/BFF0D3805B50D93E2FA5C0B2DDF7E0B30A631076CD80BC12A48C0E95404B4A41",
        "gas_price": {
          "low": "0.000842",
          "average": "0.002105",
          "high": "0.002526",
        },
      },
      {
        "denom": "ubcre",
        "gas_price": {
          "low": "0.0083",
          "average": "0.02075",
          "high": "0.0249",
        },
      },
    ],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "coreum",
    "chain_id": "coreum-mainnet-1",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/coreum-mainnet/chain.png",
    "bech32_prefix": "core",
    "fee_assets": [
      {
        "denom": "ucore",
        "gas_price": {
          "low": "0.0625",
          "average": "0.0625",
          "high": "0.0625",
        },
      },
    ],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "lum",
    "chain_id": "lum-network-1",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/lum-network/chain.png",
    "bech32_prefix": "lum",
    "fee_assets": [
      {
        "denom": "ulum",
        "gas_price": {
          "low": "0.01",
          "average": "0.025",
          "high": "0.04",
        },
      },
    ],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "celestia",
    "chain_id": "celestia",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/celestia/chain.png",
    "bech32_prefix": "celestia",
    "fee_assets": [
      {
        "denom": "utia",
        "gas_price": {
          "low": "0.01",
          "average": "0.02",
          "high": "0.1",
        },
      },
    ],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "xpla",
    "chain_id": "dimension_37-1",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/dimension_37/chain.png",
    "bech32_prefix": "xpla",
    "fee_assets": [
      {
        "denom": "axpla",
        "gas_price": {
          "low": "850000000000",
          "average": "1147500000000",
          "high": "1487500000000",
        },
      },
    ],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "base-sepolia-testnet",
    "chain_id": "84532",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": false,
      "feegrant": false,
    },
    "supports_memo": false,
    "logo_uri":
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/base/info/logo.png",
    "bech32_prefix": "",
    "fee_assets": [],
    "chain_type": "evm",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": false,
      "cosmos_autopilot": false,
    },
    "is_testnet": true,
  },
  {
    "chain_name": "kujira",
    "chain_id": "kaiyo-1",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/kaiyo/chain.png",
    "bech32_prefix": "kujira",
    "fee_assets": [
      {
        "denom":
          "factory/kujira1qk00h5atutpsv900x202pxx42npjr9thg58dnqpa72f2p7m2luase444a7/uusk",
        "gas_price": null,
      },
      {
        "denom":
          "ibc/004EBF085BBED1029326D56BE8A2E67C08CECE670A94AC1947DF413EF5130EB2",
        "gas_price": null,
      },
      {
        "denom":
          "ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2",
        "gas_price": null,
      },
      {
        "denom":
          "ibc/3607EB5B5E64DD1C0E12E07F077FF470D5BC4706AFCBC98FE1BA960E5AE4CE07",
        "gas_price": null,
      },
      {
        "denom":
          "ibc/4F393C3FCA4190C0A6756CE7F6D897D5D1BE57D6CCB80D0BC87393566A7B6602",
        "gas_price": null,
      },
      {
        "denom":
          "ibc/295548A78785A1007F232DE286149A6FF512F180AF5657780FC89C009E2C348F",
        "gas_price": null,
      },
      {
        "denom": "ukuji",
        "gas_price": null,
      },
      {
        "denom":
          "ibc/1B38805B1C75352B28169284F96DF56BDEBD9E8FAC005BDCC8CF0378C82AA8E7",
        "gas_price": null,
      },
      {
        "denom": "factory/kujira1643jxg8wasy5cfcn7xm8rd742yeazcksqlg4d7/umnta",
        "gas_price": null,
      },
      {
        "denom":
          "ibc/F3AA7EF362EC5E791FE78A0F4CCC69FEE1F9A7485EB1A8CAB3F6601C00522F10",
        "gas_price": null,
      },
      {
        "denom":
          "ibc/47BD209179859CDE4A2806763D7189B6E6FE13A17880FE2B42DE1E6C1E329E23",
        "gas_price": null,
      },
      {
        "denom":
          "ibc/A358D7F19237777AF6D8AD0E0F53268F8B18AE8A53ED318095C14D6D7F3B2DB5",
        "gas_price": null,
      },
      {
        "denom":
          "ibc/EFF323CC632EC4F747C61BCE238A758EFDB7699C3226565F7C20DA06509D59A5",
        "gas_price": null,
      },
    ],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "initia",
    "chain_id": "mahalo-1",
    "pfm_enabled": true,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/initia-labs/initia-registry/main/devnets/mahalo/images/INIT.png",
    "bech32_prefix": "init",
    "fee_assets": [],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": true,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": true,
  },
  {
    "chain_name": "Solana Devnet",
    "chain_id": "solana-devnet",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": false,
      "feegrant": false,
    },
    "supports_memo": false,
    "logo_uri":
      "https://raw.githubusercontent.com/skip-mev/skip-api-registry/main/chains/solana-devnet/logo.svg",
    "bech32_prefix": "",
    "fee_assets": [],
    "chain_type": "svm",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": false,
      "cosmos_autopilot": false,
    },
    "is_testnet": true,
  },
  {
    "chain_name": "celestia-testnet",
    "chain_id": "mocha-4",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/mocha/chain.png",
    "bech32_prefix": "celestia",
    "fee_assets": [
      {
        "denom": "utia",
        "gas_price": {
          "low": "0.01",
          "average": "0.02",
          "high": "0.1",
        },
      },
    ],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": true,
  },
  {
    "chain_name": "Optimism",
    "chain_id": "10",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": false,
      "feegrant": false,
    },
    "supports_memo": false,
    "logo_uri":
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/optimism/info/logo.png",
    "bech32_prefix": "",
    "fee_assets": [],
    "chain_type": "evm",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": false,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "Ethereum",
    "chain_id": "1",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": false,
      "feegrant": false,
    },
    "supports_memo": false,
    "logo_uri":
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png",
    "bech32_prefix": "",
    "fee_assets": [],
    "chain_type": "evm",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": false,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "initia",
    "chain_id": "mahalo-2",
    "pfm_enabled": true,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/initia-labs/initia-registry/main/devnets/mahalo/images/INIT.png",
    "bech32_prefix": "init",
    "fee_assets": [],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": true,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": true,
  },
  {
    "chain_name": "ethereum-sepolia-testnet",
    "chain_id": "11155111",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": false,
      "feegrant": false,
    },
    "supports_memo": false,
    "logo_uri":
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/sepolia/info/logo.png",
    "bech32_prefix": "",
    "fee_assets": [],
    "chain_type": "evm",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": false,
      "cosmos_autopilot": false,
    },
    "is_testnet": true,
  },
  {
    "chain_name": "Base",
    "chain_id": "8453",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": false,
      "feegrant": false,
    },
    "supports_memo": false,
    "logo_uri":
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/base/info/logo.png",
    "bech32_prefix": "",
    "fee_assets": [],
    "chain_type": "evm",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": false,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "provenance",
    "chain_id": "pio-mainnet-1",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/pio-mainnet/chain.png",
    "bech32_prefix": "pb",
    "fee_assets": [
      {
        "denom": "nhash",
        "gas_price": {
          "low": "1905",
          "average": "1905",
          "high": "2500",
        },
      },
    ],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "Binance",
    "chain_id": "56",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": false,
      "feegrant": false,
    },
    "supports_memo": false,
    "logo_uri":
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/binance/info/logo.png",
    "bech32_prefix": "",
    "fee_assets": [],
    "chain_type": "evm",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": false,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "neutron",
    "chain_id": "neutron-1",
    "pfm_enabled": true,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/neutron/chain.png",
    "bech32_prefix": "neutron",
    "fee_assets": [
      {
        "denom":
          "ibc/2CB87BCE0937B1D1DFCEE79BE4501AAF3C265E923509AEAC410AD85D27F35130",
        "gas_price": {
          "low": "2564102564.1026",
          "average": "2564102564.1026",
          "high": "2564102564.1026",
        },
      },
      {
        "denom": "untrn",
        "gas_price": {
          "low": "0.0053",
          "average": "0.0053",
          "high": "0.0053",
        },
      },
      {
        "denom":
          "factory/neutron1ug740qrkquxzrk2hh29qrlx3sktkfml3je7juusc2te7xmvsscns0n2wry/wstETH",
        "gas_price": {
          "low": "2903231.6597",
          "average": "2903231.6597",
          "high": "2903231.6597",
        },
      },
      {
        "denom":
          "ibc/773B4D0A3CD667B2275D5A4A7A2F0909C0BA0F4059C0B9181E680DDF4965DCC7",
        "gas_price": {
          "low": "0.0004",
          "average": "0.0004",
          "high": "0.0004",
        },
      },
      {
        "denom":
          "ibc/C4CFF46FD6DE35CA4CF4CE031E643C8FDC9BA4B99AE598E9B0ED98FE3A2319F9",
        "gas_price": {
          "low": "0.0008",
          "average": "0.0008",
          "high": "0.0008",
        },
      },
      {
        "denom":
          "ibc/B7864B03E1B9FD4F049243E92ABD691586F682137037A9F3FCA5222815620B3C",
        "gas_price": {
          "low": "0.0006",
          "average": "0.0006",
          "high": "0.0006",
        },
      },
      {
        "denom":
          "ibc/F082B65C88E4B6D5EF1DB243CDA1D331D002759E938A0F5CD3FFDC5D53B3E349",
        "gas_price": {
          "low": "0.008",
          "average": "0.008",
          "high": "0.008",
        },
      },
    ],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": true,
      "cosmos_ibc_hooks": true,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "finschia-testnet",
    "chain_id": "ebony-2",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/ebony/chain.png",
    "bech32_prefix": "tlink",
    "fee_assets": [
      {
        "denom": "tcony",
        "gas_price": {
          "low": "0.015",
          "average": "0.015",
          "high": "0.015",
        },
      },
    ],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": true,
  },
  {
    "chain_name": "ununifi",
    "chain_id": "ununifi-beta-v1",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/cosmos/chain-registry/master/ununifi/images/ununifi.png",
    "bech32_prefix": "ununifi",
    "fee_assets": [],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "fetchhub",
    "chain_id": "fetchhub-4",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": false,
    "logo_uri":
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/fetchhub/fet.png",
    "bech32_prefix": "fetch",
    "fee_assets": [
      {
        "denom": "afet",
        "gas_price": {
          "low": "0.025",
          "average": "0.025",
          "high": "0.035",
        },
      },
    ],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": false,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "kava",
    "chain_id": "kava_2222-10",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": false,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/kava_2222/chain.png",
    "bech32_prefix": "kava",
    "fee_assets": [
      {
        "denom": "ukava",
        "gas_price": {
          "low": "0.05",
          "average": "0.1",
          "high": "0.25",
        },
      },
    ],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "aura",
    "chain_id": "xstaxy-1",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/xstaxy/chain.png",
    "bech32_prefix": "aura",
    "fee_assets": [
      {
        "denom": "uaura",
        "gas_price": {
          "low": "0.001",
          "average": "0.0025",
          "high": "0.004",
        },
      },
    ],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "sagatestnet",
    "chain_id": "ssc-testnet-1",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/ssc-testnet/chain.png",
    "bech32_prefix": "saga",
    "fee_assets": [
      {
        "denom": "utsaga",
        "gas_price": {
          "low": "0.0025",
          "average": "0.025",
          "high": "0.04",
        },
      },
    ],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": true,
  },
  {
    "chain_name": "passage",
    "chain_id": "passage-2",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/passage/chain.png",
    "bech32_prefix": "pasg",
    "fee_assets": [
      {
        "denom": "upasg",
        "gas_price": null,
      },
    ],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "bitsong",
    "chain_id": "bitsong-2b",
    "pfm_enabled": true,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/cosmos/chain-registry/master/bitsong/images/btsg.png",
    "bech32_prefix": "bitsong",
    "fee_assets": [],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": true,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "gitopia",
    "chain_id": "gitopia",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/gitopia/chain.png",
    "bech32_prefix": "gitopia",
    "fee_assets": [
      {
        "denom": "ulore",
        "gas_price": {
          "low": "0.0012",
          "average": "0.0016",
          "high": "0.0024",
        },
      },
    ],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "omniflixhub",
    "chain_id": "omniflixhub-1",
    "pfm_enabled": true,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/omniflixhub/chain.png",
    "bech32_prefix": "omniflix",
    "fee_assets": [
      {
        "denom": "uflix",
        "gas_price": {
          "low": "0.001",
          "average": "0.0025",
          "high": "0.025",
        },
      },
    ],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": true,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "regen",
    "chain_id": "regen-1",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/regen/chain.png",
    "bech32_prefix": "regen",
    "fee_assets": [
      {
        "denom": "uregen",
        "gas_price": {
          "low": "0.015",
          "average": "0.025",
          "high": "0.04",
        },
      },
    ],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "archway",
    "chain_id": "archway-1",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/archway/chain.png",
    "bech32_prefix": "archway",
    "fee_assets": [
      {
        "denom": "aarch",
        "gas_price": {
          "low": "140000000000",
          "average": "196000000000",
          "high": "225400000000",
        },
      },
    ],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "Polygon",
    "chain_id": "137",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": false,
      "feegrant": false,
    },
    "supports_memo": false,
    "logo_uri":
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygon/info/logo.png",
    "bech32_prefix": "",
    "fee_assets": [],
    "chain_type": "evm",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": false,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "Linea",
    "chain_id": "59144",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": false,
      "feegrant": false,
    },
    "supports_memo": false,
    "logo_uri":
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/linea/info/logo.png",
    "bech32_prefix": "",
    "fee_assets": [],
    "chain_type": "evm",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": false,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "planq",
    "chain_id": "planq_7070-2",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/planq_7070/chain.png",
    "bech32_prefix": "plq",
    "fee_assets": [
      {
        "denom": "aplanq",
        "gas_price": {
          "low": "30000000000",
          "average": "35000000000",
          "high": "40000000000",
        },
      },
    ],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "cryptoorgchain",
    "chain_id": "crypto-org-chain-mainnet-1",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/crypto-org-chain-mainnet/chain.png",
    "bech32_prefix": "cro",
    "fee_assets": [
      {
        "denom": "basecro",
        "gas_price": {
          "low": "0.025",
          "average": "0.03",
          "high": "0.04",
        },
      },
    ],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "kyve",
    "chain_id": "kyve-1",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/kyve/chain.png",
    "bech32_prefix": "kyve",
    "fee_assets": [
      {
        "denom": "ukyve",
        "gas_price": {
          "low": "0.02",
          "average": "0.03",
          "high": "0.06",
        },
      },
    ],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "odin",
    "chain_id": "odin-mainnet-freya",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/cosmos/chain-registry/master/odin/images/odin.png",
    "bech32_prefix": "odin",
    "fee_assets": [],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "avalanche-fuji-testnet",
    "chain_id": "43113",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": false,
      "feegrant": false,
    },
    "supports_memo": false,
    "logo_uri":
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/avalanchec/info/logo.png",
    "bech32_prefix": "",
    "fee_assets": [],
    "chain_type": "evm",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": false,
      "cosmos_autopilot": false,
    },
    "is_testnet": true,
  },
  {
    "chain_name": "cosmoshub",
    "chain_id": "cosmoshub-4",
    "pfm_enabled": true,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/cosmoshub/chain.png",
    "bech32_prefix": "cosmos",
    "fee_assets": [
      {
        "denom": "uatom",
        "gas_price": {
          "low": "0.005",
          "average": "0.025",
          "high": "0.03",
        },
      },
    ],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": true,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "nyx",
    "chain_id": "nyx",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/nyx/chain.png",
    "bech32_prefix": "n",
    "fee_assets": [
      {
        "denom": "unym",
        "gas_price": {
          "low": "0.025",
          "average": "0.025",
          "high": "0.04",
        },
      },
      {
        "denom": "unyx",
        "gas_price": {
          "low": "0.025",
          "average": "0.025",
          "high": "0.04",
        },
      },
    ],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "andromeda",
    "chain_id": "andromeda-1",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/andromeda/andromeda.png",
    "bech32_prefix": "andr",
    "fee_assets": [
      {
        "denom": "uandr",
        "gas_price": {
          "low": "0.03",
          "average": "0.05",
          "high": "0.075",
        },
      },
    ],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "Filecoin",
    "chain_id": "314",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": false,
      "feegrant": false,
    },
    "supports_memo": false,
    "logo_uri":
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/filecoin/info/logo.png",
    "bech32_prefix": "",
    "fee_assets": [],
    "chain_type": "evm",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": false,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "empowerchain",
    "chain_id": "empowerchain-1",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": true,
    "bech32_prefix": "empower",
    "fee_assets": [],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "Blast",
    "chain_id": "81457",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": false,
      "feegrant": false,
    },
    "supports_memo": false,
    "logo_uri": "https://avatars.githubusercontent.com/u/146996960",
    "bech32_prefix": "",
    "fee_assets": [],
    "chain_type": "evm",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": false,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "composable",
    "chain_id": "centauri-1",
    "pfm_enabled": true,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/centauri/chain.png",
    "bech32_prefix": "centauri",
    "fee_assets": [
      {
        "denom": "ppica",
        "gas_price": {
          "low": "0",
          "average": "0",
          "high": "0",
        },
      },
    ],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": true,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "persistence",
    "chain_id": "core-1",
    "pfm_enabled": true,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/core/chain.png",
    "bech32_prefix": "persistence",
    "fee_assets": [
      {
        "denom":
          "ibc/A6E3AF63B3C906416A9AF7A556C59EA4BD50E617EFFE6299B99700CCB780E444",
        "gas_price": {
          "low": "100000000",
          "average": "1000000000",
          "high": "10000000000",
        },
      },
      {
        "denom": "stk/uatom",
        "gas_price": {
          "low": "0.0001",
          "average": "0.001",
          "high": "0.01",
        },
      },
      {
        "denom": "stk/adydx",
        "gas_price": {
          "low": "15000000000",
          "average": "15000000000",
          "high": "15000000000",
        },
      },
      {
        "denom": "uxprt",
        "gas_price": {
          "low": "0",
          "average": "0.025",
          "high": "0.04",
        },
      },
      {
        "denom":
          "ibc/646315E3B0461F5FA4C5C8968A88FC45D4D5D04A45B98F1B8294DD82F386DD85",
        "gas_price": {
          "low": "0.0001",
          "average": "0.001",
          "high": "0.01",
        },
      },
      {
        "denom":
          "ibc/B3792E4A62DF4A934EF2DF5968556DB56F5776ED25BDE11188A4F58A7DD406F0",
        "gas_price": {
          "low": "0.01",
          "average": "0.05",
          "high": "0.1",
        },
      },
      {
        "denom": "stk/uosmo",
        "gas_price": {
          "low": "0.0001",
          "average": "0.001",
          "high": "0.01",
        },
      },
      {
        "denom":
          "ibc/23DC3FF0E4CBB53A1915E4C62507CB7796956E84C68CA49707787CB8BDE90A1E",
        "gas_price": {
          "low": "15000000000",
          "average": "15000000000",
          "high": "15000000000",
        },
      },
      {
        "denom":
          "ibc/C8A74ABBE2AF892E15680D916A7C22130585CE5704F9B17A10F184A90D53BECA",
        "gas_price": {
          "low": "0.0001",
          "average": "0.001",
          "high": "0.01",
        },
      },
    ],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": true,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "osmosis-testnet",
    "chain_id": "osmo-test-5",
    "pfm_enabled": true,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": false,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/osmosis/chain.png",
    "bech32_prefix": "osmo",
    "fee_assets": [
      {
        "denom": "uosmo",
        "gas_price": {
          "low": "0.0025",
          "average": "0.025",
          "high": "0.04",
        },
      },
    ],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": true,
      "cosmos_ibc_hooks": true,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": true,
  },
  {
    "chain_name": "mars",
    "chain_id": "mars-1",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/mars/chain.png",
    "bech32_prefix": "mars",
    "fee_assets": [
      {
        "denom": "umars",
        "gas_price": {
          "low": "0",
          "average": "0",
          "high": "0.01",
        },
      },
    ],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "oraichain",
    "chain_id": "Oraichain",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/Oraichain/chain.png",
    "bech32_prefix": "orai",
    "fee_assets": [
      {
        "denom": "orai",
        "gas_price": {
          "low": "0.003",
          "average": "0.005",
          "high": "0.007",
        },
      },
    ],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": true,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "neutron-testnet",
    "chain_id": "pion-1",
    "pfm_enabled": true,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/neutron/chain.png",
    "bech32_prefix": "neutron",
    "fee_assets": [
      {
        "denom": "untrn",
        "gas_price": {
          "low": "0.02",
          "average": "0.02",
          "high": "0.02",
        },
      },
    ],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": true,
      "cosmos_ibc_hooks": true,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": true,
  },
  {
    "chain_name": "assetmantle",
    "chain_id": "mantle-1",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/mantle/chain.png",
    "bech32_prefix": "mantle",
    "fee_assets": [
      {
        "denom": "umntl",
        "gas_price": {
          "low": "0.01",
          "average": "0.025",
          "high": "0.04",
        },
      },
    ],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "Solana",
    "chain_id": "solana",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": false,
      "feegrant": false,
    },
    "supports_memo": false,
    "logo_uri":
      "https://raw.githubusercontent.com/skip-mev/skip-api-registry/main/chains/solana/logo.svg",
    "bech32_prefix": "",
    "fee_assets": [],
    "chain_type": "svm",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": false,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "secret",
    "chain_id": "secret-4",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/secret/chain.png",
    "bech32_prefix": "secret",
    "fee_assets": [
      {
        "denom": "uscrt",
        "gas_price": {
          "low": "0.05",
          "average": "0.1",
          "high": "0.25",
        },
      },
    ],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": true,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "miniwasm",
    "chain_id": "miniwasm-1",
    "pfm_enabled": true,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/initia-labs/initia-registry/main/devnets/miniwasm/images/INIT.png",
    "bech32_prefix": "init",
    "fee_assets": [],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": true,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": true,
  },
  {
    "chain_name": "gravitybridge",
    "chain_id": "gravity-bridge-3",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": false,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/gravity-bridge/chain.png",
    "bech32_prefix": "gravity",
    "fee_assets": [
      {
        "denom": "gravity0xa47c8bf37f92aBed4A126BDA807A7b7498661acD",
        "gas_price": null,
      },
      {
        "denom": "gravity0x01e0E2e61f554eCAaeC0cC933E739Ad90f24a86d",
        "gas_price": null,
      },
      {
        "denom": "gravity0x07baC35846e5eD502aA91AdF6A9e7aA210F2DcbE",
        "gas_price": null,
      },
      {
        "denom": "gravity0x60e683C6514Edd5F758A55b6f393BeBBAfaA8d5e",
        "gas_price": null,
      },
      {
        "denom": "gravity0x514910771AF9Ca656af840dff83E8264EcF986CA",
        "gas_price": null,
      },
      {
        "denom": "gravity0xBA11D00c5f74255f56a5E366F4F77f5A186d7f55",
        "gas_price": null,
      },
      {
        "denom": "gravity0xc0a4Df35568F116C370E6a6A6022Ceb908eedDaC",
        "gas_price": null,
      },
      {
        "denom": "gravity0x30D20208d987713f46DFD34EF128Bb16C404D10f",
        "gas_price": null,
      },
      {
        "denom":
          "ibc/D157AD8A50DAB0FC4EB95BBE1D9407A590FA2CDEE04C90A76C005089BF76E519",
        "gas_price": null,
      },
      {
        "denom": "gravity0xa693B19d2931d498c5B318dF961919BB4aee87a5",
        "gas_price": null,
      },
      {
        "denom": "gravity0xa670d7237398238DE01267472C6f13e5B8010FD1",
        "gas_price": null,
      },
      {
        "denom": "gravity0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84",
        "gas_price": null,
      },
      {
        "denom": "gravity0xd8e2F184EedC79A9bdE9Eb7E34B0fF34e98692B7",
        "gas_price": null,
      },
      {
        "denom": "gravity0xB64ef51C888972c908CFacf59B47C1AfBC0Ab8aC",
        "gas_price": null,
      },
      {
        "denom":
          "ibc/048BE20AE2E6BFD4142C547E04F17E5F94363003A12B7B6C084E08101BFCF7D1",
        "gas_price": null,
      },
      {
        "denom": "gravity0xaea46A60368A7bD060eec7DF8CBa43b7EF41Ad85",
        "gas_price": null,
      },
      {
        "denom":
          "ibc/00F2B62EB069321A454B708876476AFCD9C23C8C9C4A5A206DDF1CD96B645057",
        "gas_price": null,
      },
      {
        "denom":
          "ibc/29A7122D024B5B8FA8A2EFBB4FA47272C25C8926AA005A96807127208082DAB3",
        "gas_price": null,
      },
      {
        "denom": "gravity0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
        "gas_price": null,
      },
      {
        "denom": "gravity0x467719aD09025FcC6cF6F8311755809d45a5E5f3",
        "gas_price": null,
      },
      {
        "denom": "gravity0x147faF8De9d8D8DAAE129B187F0D02D819126750",
        "gas_price": null,
      },
      {
        "denom": "gravity0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE",
        "gas_price": null,
      },
      {
        "denom": "gravity0x93581991f68DBaE1eA105233b67f7FA0D6BDeE7b",
        "gas_price": null,
      },
      {
        "denom": "gravity0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        "gas_price": {
          "low": "0.0002",
          "average": "0.0005",
          "high": "0.0008",
        },
      },
      {
        "denom": "gravity0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        "gas_price": null,
      },
      {
        "denom": "gravity0x8D983cb9388EaC77af0474fA441C4815500Cb7BB",
        "gas_price": null,
      },
      {
        "denom": "gravity0x2C5Bcad9Ade17428874855913Def0A02D8bE2324",
        "gas_price": null,
      },
      {
        "denom": "gravity0x45804880De22913dAFE09f4980848ECE6EcbAf78",
        "gas_price": null,
      },
      {
        "denom": "gravity0x817bbDbC3e8A1204f3691d14bB44992841e3dB35",
        "gas_price": null,
      },
      {
        "denom": "gravity0x892A6f9dF0147e5f079b0993F486F9acA3c87881",
        "gas_price": null,
      },
      {
        "denom":
          "ibc/5012B1C96F286E8A6604A87037CE51241C6F1CA195B71D1E261FCACB69FB6BC2",
        "gas_price": null,
      },
      {
        "denom":
          "ibc/2E5D0AC026AC1AFA65A23023BA4F24BB8DDF94F118EDC0BAD6F625BFC557CDED",
        "gas_price": null,
      },
      {
        "denom": "ugraviton",
        "gas_price": null,
      },
      {
        "denom": "gravity0x35a532d376FFd9a705d0Bb319532837337A398E7",
        "gas_price": null,
      },
      {
        "denom":
          "ibc/4F393C3FCA4190C0A6756CE7F6D897D5D1BE57D6CCB80D0BC87393566A7B6602",
        "gas_price": null,
      },
      {
        "denom": "gravity0x8a854288a5976036A725879164Ca3e91d30c6A1B",
        "gas_price": null,
      },
      {
        "denom": "gravity0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
        "gas_price": null,
      },
      {
        "denom": "gravity0x2B89bF8ba858cd2FCee1faDa378D5cd6936968Be",
        "gas_price": null,
      },
      {
        "denom": "gravity0xA0b73E1Ff0B80914AB6fe0444E65848C4C34450b",
        "gas_price": null,
      },
      {
        "denom": "gravity0x4f6103BAd230295baCF30f914FDa7D4273B7F585",
        "gas_price": null,
      },
      {
        "denom": "gravity0xdAC17F958D2ee523a2206206994597C13D831ec7",
        "gas_price": {
          "low": "0.0002",
          "average": "0.0005",
          "high": "0.0008",
        },
      },
      {
        "denom": "gravity0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
        "gas_price": null,
      },
      {
        "denom":
          "ibc/0C273962C274B2C05B22D9474BFE5B84D6A6FCAD198CB9B0ACD35EA521A36606",
        "gas_price": null,
      },
      {
        "denom": "gravity0x6B175474E89094C44Da98b954EedeAC495271d0F",
        "gas_price": null,
      },
      {
        "denom": "gravity0xc3761EB917CD790B30dAD99f6Cc5b4Ff93C4F9eA",
        "gas_price": null,
      },
      {
        "denom": "gravity0x853d955aCEf822Db058eb8505911ED77F175b99e",
        "gas_price": null,
      },
    ],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "Polygon-testnet",
    "chain_id": "80001",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": false,
      "feegrant": false,
    },
    "supports_memo": false,
    "logo_uri":
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygonmumbai/info/logo.png",
    "bech32_prefix": "",
    "fee_assets": [],
    "chain_type": "evm",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": false,
      "cosmos_autopilot": false,
    },
    "is_testnet": true,
  },
  {
    "chain_name": "umee",
    "chain_id": "umee-1",
    "pfm_enabled": true,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/umee/chain.png",
    "bech32_prefix": "umee",
    "fee_assets": [
      {
        "denom": "uumee",
        "gas_price": {
          "low": "0.06",
          "average": "0.1",
          "high": "0.14",
        },
      },
    ],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": true,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "migaloo",
    "chain_id": "migaloo-1",
    "pfm_enabled": true,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/migaloo/chain.png",
    "bech32_prefix": "migaloo",
    "fee_assets": [
      {
        "denom": "uwhale",
        "gas_price": {
          "low": "1",
          "average": "1.2",
          "high": "1.4",
        },
      },
    ],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": true,
      "cosmos_ibc_hooks": true,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "manta-pacific",
    "chain_id": "169",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": false,
      "feegrant": false,
    },
    "supports_memo": false,
    "logo_uri":
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/manta/info/logo.png",
    "bech32_prefix": "",
    "fee_assets": [],
    "chain_type": "evm",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": false,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "quicksilver",
    "chain_id": "quicksilver-2",
    "pfm_enabled": true,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/quicksilver/chain.png",
    "bech32_prefix": "quick",
    "fee_assets": [
      {
        "denom": "uqck",
        "gas_price": {
          "low": "0.0001",
          "average": "0.0001",
          "high": "0.00025",
        },
      },
    ],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": true,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "axelar",
    "chain_id": "axelar-dojo-1",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": false,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/axelar-dojo/chain.png",
    "bech32_prefix": "axelar",
    "fee_assets": [
      {
        "denom": "uaxl",
        "gas_price": {
          "low": "0.007",
          "average": "0.007",
          "high": "0.01",
        },
      },
    ],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": true,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "chihuahua",
    "chain_id": "chihuahua-1",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/chihuahua/chain.png",
    "bech32_prefix": "chihuahua",
    "fee_assets": [
      {
        "denom": "uhuahua",
        "gas_price": {
          "low": "500",
          "average": "1250",
          "high": "2000",
        },
      },
    ],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": true,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "sifchain",
    "chain_id": "sifchain-1",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/sifchain/chain.png",
    "bech32_prefix": "sif",
    "fee_assets": [
      {
        "denom": "rowan",
        "gas_price": {
          "low": "1000000000000",
          "average": "1500000000000",
          "high": "2000000000000",
        },
      },
    ],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "nolus",
    "chain_id": "pirin-1",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/pirin/nolus.png",
    "bech32_prefix": "nolus",
    "fee_assets": [
      {
        "denom": "unls",
        "gas_price": {
          "low": "0.01",
          "average": "0.025",
          "high": "0.05",
        },
      },
    ],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "optimism-sepolia-testnet",
    "chain_id": "11155420",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": false,
      "feegrant": false,
    },
    "supports_memo": false,
    "logo_uri":
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/optimism/info/logo.png",
    "bech32_prefix": "",
    "fee_assets": [],
    "chain_type": "evm",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": false,
      "cosmos_autopilot": false,
    },
    "is_testnet": true,
  },
  {
    "chain_name": "osmosis",
    "chain_id": "osmosis-1",
    "pfm_enabled": true,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": false,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/osmosis/chain.png",
    "bech32_prefix": "osmo",
    "fee_assets": [
      {
        "denom": "uosmo",
        "gas_price": {
          "low": "0.0025",
          "average": "0.025",
          "high": "0.04",
        },
      },
    ],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": true,
      "cosmos_ibc_hooks": true,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "noble",
    "chain_id": "noble-1",
    "pfm_enabled": true,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/noble/chain.png",
    "bech32_prefix": "noble",
    "fee_assets": [
      {
        "denom": "uusdc",
        "gas_price": {
          "low": "0.1",
          "average": "0.1",
          "high": "0.2",
        },
      },
      {
        "denom":
          "ibc/EF48E6B1A1A19F47ECAEA62F5670C37C0580E86A9E88498B7E393EB6F49F33C0",
        "gas_price": {
          "low": "0.01",
          "average": "0.01",
          "high": "0.02",
        },
      },
    ],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": true,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "Fantom",
    "chain_id": "250",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": false,
      "feegrant": false,
    },
    "supports_memo": false,
    "logo_uri":
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/fantom/info/logo.png",
    "bech32_prefix": "",
    "fee_assets": [],
    "chain_type": "evm",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": false,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "injective",
    "chain_id": "injective-1",
    "pfm_enabled": true,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/injective/chain.png",
    "bech32_prefix": "inj",
    "fee_assets": [
      {
        "denom": "inj",
        "gas_price": {
          "low": "500000000",
          "average": "1000000000",
          "high": "1500000000",
        },
      },
    ],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": true,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "dymension",
    "chain_id": "dymension_1100-1",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/dymension_1100/chain.png",
    "bech32_prefix": "dym",
    "fee_assets": [
      {
        "denom": "adym",
        "gas_price": {
          "low": "20000000000",
          "average": "20000000000",
          "high": "20000000000",
        },
      },
    ],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "axelar-testnet",
    "chain_id": "axelar-testnet-lisbon-3",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": false,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/cosmos/chain-registry/master/axelar/images/axelar-chain-logo.png",
    "bech32_prefix": "axelar",
    "fee_assets": [
      {
        "denom": "uaxl",
        "gas_price": {
          "low": "0.007",
          "average": "0.007",
          "high": "0.01",
        },
      },
    ],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": true,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": true,
  },
  {
    "chain_name": "teritori",
    "chain_id": "teritori-1",
    "pfm_enabled": true,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/teritori/chain.png",
    "bech32_prefix": "tori",
    "fee_assets": [
      {
        "denom": "utori",
        "gas_price": {
          "low": "0",
          "average": "0.025",
          "high": "0.04",
        },
      },
    ],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": true,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "minimove",
    "chain_id": "minimove-1",
    "pfm_enabled": true,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/initia-labs/initia-registry/main/devnets/minimove/images/INIT.png",
    "bech32_prefix": "init",
    "fee_assets": [],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": true,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": true,
  },
  {
    "chain_name": "terra2",
    "chain_id": "phoenix-1",
    "pfm_enabled": true,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/phoenix/chain.png",
    "bech32_prefix": "terra",
    "fee_assets": [
      {
        "denom": "uluna",
        "gas_price": {
          "low": "0.015",
          "average": "0.02",
          "high": "0.04",
        },
      },
      {
        "denom":
          "ibc/2C962DAB9F57FE0921435426AE75196009FAA1981BF86991203C8411F8980FDB",
        "gas_price": {
          "low": "0.018",
          "average": "0.02",
          "high": "0.04",
        },
      },
      {
        "denom":
          "ibc/B3504E092456BA618CC28AC671A71FB08C6CA0FD0BE7C8A5B5A3E2DD933CC9E4",
        "gas_price": {
          "low": "0.018",
          "average": "0.02",
          "high": "0.04",
        },
      },
    ],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": true,
      "cosmos_ibc_hooks": true,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "Moonbeam",
    "chain_id": "1284",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": false,
      "feegrant": false,
    },
    "supports_memo": false,
    "logo_uri":
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/moonbeam/info/logo.png",
    "bech32_prefix": "",
    "fee_assets": [],
    "chain_type": "evm",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": false,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "nois",
    "chain_id": "nois-1",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/nois/chain.png",
    "bech32_prefix": "nois",
    "fee_assets": [
      {
        "denom": "unois",
        "gas_price": {
          "low": "0.05",
          "average": "0.05",
          "high": "0.1",
        },
      },
    ],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "nibiru",
    "chain_id": "cataclysm-1",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/cataclysm/chain.png",
    "bech32_prefix": "nibi",
    "fee_assets": [
      {
        "denom": "unibi",
        "gas_price": {
          "low": "0.025",
          "average": "0.05",
          "high": "0.1",
        },
      },
    ],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "stride-testnet",
    "chain_id": "stride-internal-1",
    "pfm_enabled": true,
    "cosmos_module_support": {
      "authz": false,
      "feegrant": true,
    },
    "supports_memo": true,
    "bech32_prefix": "stride",
    "fee_assets": [],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": true,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": true,
  },
  {
    "chain_name": "dydx",
    "chain_id": "dydx-mainnet-1",
    "pfm_enabled": false,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/dydx-mainnet/adydx.png",
    "bech32_prefix": "dydx",
    "fee_assets": [
      {
        "denom":
          "ibc/8E27BA2D5493AF5636760E354E46004562C46AB7EC0CC4C1CA14E9E20E2545B5",
        "gas_price": {
          "low": "0.025",
          "average": "0.025",
          "high": "0.03",
        },
      },
      {
        "denom": "adydx",
        "gas_price": {
          "low": "12500000000",
          "average": "12500000000",
          "high": "20000000000",
        },
      },
    ],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": false,
      "cosmos_ibc_hooks": false,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
  {
    "chain_name": "juno",
    "chain_id": "juno-1",
    "pfm_enabled": true,
    "cosmos_module_support": {
      "authz": true,
      "feegrant": true,
    },
    "supports_memo": true,
    "logo_uri":
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/juno/chain.png",
    "bech32_prefix": "juno",
    "fee_assets": [
      {
        "denom":
          "ibc/C4CFF46FD6DE35CA4CF4CE031E643C8FDC9BA4B99AE598E9B0ED98FE3A2319F9",
        "gas_price": {
          "low": "0.003",
          "average": "0.003",
          "high": "0.003",
        },
      },
      {
        "denom": "ujuno",
        "gas_price": {
          "low": "0.075",
          "average": "0.075",
          "high": "0.075",
        },
      },
    ],
    "chain_type": "cosmos",
    "ibc_capabilities": {
      "cosmos_pfm": true,
      "cosmos_ibc_hooks": true,
      "cosmos_memo": true,
      "cosmos_autopilot": false,
    },
    "is_testnet": false,
  },
];

// Set Ethereum logo
SkipChains.find((chain) => chain.chain_id === "1")!.logo_uri = "/logos/ethereum.svg";

export function skipChainById(chainId: string | number) {
  return SkipChains.find((chain) => chain.chain_id === `${chainId}`);
}

export function skipChainsByIds(chainIds: string[]) {
  return SkipChains.filter((chain) => chainIds.includes(chain.chain_id!));
}