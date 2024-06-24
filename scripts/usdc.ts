import { SkipRouter, Chain, Asset } from '@skip-router/core';

type Group = { chain: Chain; asset: Asset };

(async function main() {
  const router = new SkipRouter({
    apiKey: '29b79e8e-3d14-4610-893e-0368174b116e'
  });

  const chains = await router.chains({
    includeEVM: true,
    includeSVM: true
  });

  const results = await Promise.all(
    chains.map((chain) =>
      router.assets({
        chainID: chain.chainID,
        includeEvmAssets: true,
        includeSvmAssets: true,
        includeCW20Assets: true
      })
    )
  );

  const evm: Group[] = [];
  const svm: Group[] = [];
  const cosmos: Group[] = [];
  const testnets: Group[] = [];

  results.forEach((result, index) => {
    const chain = chains[index];
    const assets = result[chain.chainID];
    const asset = assets.find((asset) => asset.recommendedSymbol === 'USDC');
    if (asset) {
      if (chain.isTestnet) {
        testnets.push({ chain, asset });
      } else if (chain.chainType === 'cosmos') {
        cosmos.push({ chain, asset });
      } else if (chain.chainType === 'evm') {
        evm.push({ chain, asset });
      } else if (chain.chainType === 'svm') {
        svm.push({ chain, asset });
      }
    }
  });

  evm.sort((a, b) => a.chain.chainID.localeCompare(b.chain.chainID));
  svm.sort((a, b) => a.chain.chainID.localeCompare(b.chain.chainID));
  cosmos.sort((a, b) => a.chain.chainID.localeCompare(b.chain.chainID));
  testnets.sort((a, b) => a.chain.chainID.localeCompare(b.chain.chainID));

  console.log('\nEVM:');
  evm.forEach(log);
  console.log('\nSVM:');
  svm.forEach(log);
  console.log('\nCosmos:');
  cosmos.forEach(log);
  console.log('\nTestnets:');
  testnets.forEach(log);
})().catch(console.error);

function log({ chain, asset }: { chain: Chain; asset: Asset }) {
  console.log(
    chain.chainID,
    chain.chainName,
    chain.chainType,
    asset.denom,
    asset.chainID,
    asset.originDenom,
    asset.originChainID
  );
}

// "0xc0a5119053e8e9e31ac3d6257e3e24781705ee8bd179816814a5cc6047af777d"

// EVM:
// 1 Ethereum evm 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48 1 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48 1
// 10 Optimism evm 0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85 10 0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85 10
// 137 Polygon evm 0x3c499c542cef5e3811e1192ce70d8cc03d5c3359 137 0x3c499c542cef5e3811e1192ce70d8cc03d5c3359 137
// 42161 Arbitrum evm 0xaf88d065e77c8cC2239327C5EDb3A432268e5831 42161 0xaf88d065e77c8cC2239327C5EDb3A432268e5831 42161
// 43114 Avalanche evm 0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E 43114 0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E 43114
// 8453 Base evm 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913 8453 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913 8453

// SVM:
// solana Solana svm EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v solana EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v solana

// Cosmos:
// agoric-3 agoric cosmos ibc/FE98AAD68F02F03565E9FA39A5E627946699B2B07115889ED812D8BA639576A9 agoric-3 uusdc noble-1
// archway-1 archway cosmos ibc/43897B9739BD63E3A08A88191999C632E052724AB96BD4C74AE31375C991F48D archway-1 uusdc noble-1
// carbon-1 carbon cosmos ibc/43897B9739BD63E3A08A88191999C632E052724AB96BD4C74AE31375C991F48D carbon-1 uusdc noble-1
// cataclysm-1 nibiru cosmos ibc/F082B65C88E4B6D5EF1DB243CDA1D331D002759E938A0F5CD3FFDC5D53B3E349 cataclysm-1 uusdc noble-1
// core-1 persistence cosmos ibc/B3792E4A62DF4A934EF2DF5968556DB56F5776ED25BDE11188A4F58A7DD406F0 core-1 uusdc noble-1
// coreum-mainnet-1 coreum cosmos ibc/E1E3674A0E4E1EF9C69646F9AF8D9497173821826074622D831BAB73CCB99A2D coreum-mainnet-1 uusdc noble-1
// cosmoshub-4 cosmoshub cosmos ibc/F663521BF1836B00F5F177680F74BFB9A8B5654A694D0D2BC249E03CF2509013 cosmoshub-4 uusdc noble-1
// crescent-1 crescent cosmos ibc/F47D6F6C38DC1B5B72FFB71CC4D8A12FC4C57A5A79BAFA65286723D56B85197D crescent-1 uusdc noble-1
// dydx-mainnet-1 dydx cosmos ibc/8E27BA2D5493AF5636760E354E46004562C46AB7EC0CC4C1CA14E9E20E2545B5 dydx-mainnet-1 uusdc noble-1
// dymension_1100-1 dymension cosmos ibc/B3504E092456BA618CC28AC671A71FB08C6CA0FD0BE7C8A5B5A3E2DD933CC9E4 dymension_1100-1 uusdc noble-1
// empowerchain-1 empowerchain cosmos ibc/7C0807A56073C4A27B0DE1C21BA3EB75DF75FD763F4AD37BC159917FC01145F0 empowerchain-1 uusdc noble-1
// evmos_9001-2 evmos cosmos ibc/35357FE55D81D88054E135529BB2AEB1BB20D207292775A19BD82D83F27BE9B4 evmos_9001-2 uusdc noble-1
// injective-1 injective cosmos ibc/2CBC2EA121AE42563B08028466F37B600F2D7D4282342DE938283CC3FB2BC00E injective-1 uusdc noble-1
// juno-1 juno cosmos ibc/4A482FA914A4B9B05801ED81C33713899F322B24F76A06F4B8FE872485EA22FF juno-1 uusdc noble-1
// kaiyo-1 kujira cosmos ibc/FE98AAD68F02F03565E9FA39A5E627946699B2B07115889ED812D8BA639576A9 kaiyo-1 uusdc noble-1
// kava_2222-10 kava cosmos erc20/axelar/usdc kava_2222-10 erc20/axelar/usdc kava_2222-10
// migaloo-1 migaloo cosmos ibc/BC5C0BAFD19A5E4133FDA0F3E04AE1FBEE75A4A226554B2CBB021089FF2E1F8A migaloo-1 uusdc noble-1
// neutron-1 neutron cosmos ibc/B559A80D62249C8AA07A380E2A2BEA6E5CA9A6F079C912C3A9E9B494105E4F81 neutron-1 uusdc noble-1
// noble-1 noble cosmos uusdc noble-1 uusdc noble-1
// omniflixhub-1 omniflixhub cosmos ibc/F47D6F6C38DC1B5B72FFB71CC4D8A12FC4C57A5A79BAFA65286723D56B85197D omniflixhub-1 uusdc noble-1
// osmosis-1 osmosis cosmos ibc/498A0751C798A0D9A389AA3691123DADA57DAA4FE165D5C75894505B876BA6E4 osmosis-1 uusdc noble-1
// pacific-1 sei cosmos ibc/CA6FBFAF399474A06263E10D0CE5AEBBE15189D6D4B2DD9ADE61007E68EB9DB0 pacific-1 uusdc noble-1
// phoenix-1 terra2 cosmos ibc/2C962DAB9F57FE0921435426AE75196009FAA1981BF86991203C8411F8980FDB phoenix-1 uusdc noble-1
// pirin-1 nolus cosmos ibc/F5FABF52B54E65064B57BF6DBD8E5FAD22CEE9F4B8A57ADBB20CCD0173AA72A4 pirin-1 uusdc noble-1
// secret-4 secret cosmos ibc/9162FF8AC138FFAB8723606E1FD726A95A2A153831ED6786396C374004AC28F8 secret-4 uusdc noble-1
// sifchain-1 sifchain cosmos ibc/8FCD92E4B97E69EC1A334EADDFF903A6C44408A8C9B03A40B3FBCABE575A8359 sifchain-1 uusdc noble-1
// stargaze-1 stargaze cosmos ibc/4A1C18CA7F50544760CF306189B810CE4C1CB156C7FC870143D401FE7280E591 stargaze-1 uusdc noble-1
// teritori-1 teritori cosmos ibc/FE98AAD68F02F03565E9FA39A5E627946699B2B07115889ED812D8BA639576A9 teritori-1 uusdc noble-1
// umee-1 umee cosmos ibc/92BC8E5C50E6664B4DA748B62C1FFBE321967E1F8868EE03B005977F9AA7C0B8 umee-1 uusdc noble-1
// xstaxy-1 aura cosmos ibc/295548A78785A1007F232DE286149A6FF512F180AF5657780FC89C009E2C348F xstaxy-1 uusdc noble-1

// Testnets:
// 11155111 ethereum-sepolia-testnet evm 0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238 11155111 0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238 11155111
// 11155420 optimism-sepolia-testnet evm 0x5fd84259d66Cd46123540766Be93DFE6D43130D7 11155420 0x5fd84259d66Cd46123540766Be93DFE6D43130D7 11155420
// 421614 arbitrum-sepolia-testnet evm 0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d 421614 0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d 421614
// 43113 avalanche-fuji-testnet evm 0x5425890298aed601595a70ab815c96711a31bc65 43113 0x5425890298aed601595a70ab815c96711a31bc65 43113
// 5 ethereum-2-testnet evm 0x07865c6e87b9f70255377e024ace6630c1eaa37f 5 0x07865c6e87b9f70255377e024ace6630c1eaa37f 5
// 80001 Polygon-testnet evm 0x07865c6e87b9f70255377e024ace6630c1eaa37f 80001 0x07865c6e87b9f70255377e024ace6630c1eaa37f 80001
// 84532 base-sepolia-testnet evm 0x036CbD53842c5426634e7929541eC2318f3dCF7e 84532 0x036CbD53842c5426634e7929541eC2318f3dCF7e 84532
// grand-1 noble-testnet cosmos uusdc grand-1 uusdc grand-1
// mahalo-1 initia cosmos uusdc mahalo-1 uusdc mahalo-1
// mahalo-2 initia cosmos uusdc mahalo-2 uusdc mahalo-2
// minimove-1 minimove cosmos ibc/8E27BA2D5493AF5636760E354E46004562C46AB7EC0CC4C1CA14E9E20E2545B5 minimove-1 uusdc mahalo-1
// minimove-2 minimove cosmos ibc/8E27BA2D5493AF5636760E354E46004562C46AB7EC0CC4C1CA14E9E20E2545B5 minimove-2 uusdc mahalo-2
// miniwasm-1 miniwasm cosmos ibc/8E27BA2D5493AF5636760E354E46004562C46AB7EC0CC4C1CA14E9E20E2545B5 miniwasm-1 uusdc mahalo-1
// miniwasm-2 miniwasm cosmos ibc/8E27BA2D5493AF5636760E354E46004562C46AB7EC0CC4C1CA14E9E20E2545B5 miniwasm-2 uusdc mahalo-2
// osmo-test-5 osmosis-testnet cosmos ibc/DE6792CF9E521F6AD6E9A4BDF6225C9571A3B74ACC0A529F92BC5122A39D2E58 osmo-test-5 uusdc grand-1
// solana-devnet Solana Devnet svm 4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU solana-devnet 4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU solana-devnet
