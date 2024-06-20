import { useMemo } from 'react';
import { useWallet } from '@cosmos-kit/react';
import {
  COSMOS_CHAINS,
  COSMOS_CHAIN_NAMES,
  COSMOS_WALLET_KEY_TO_NAME,
  CosmosWalletKey,
  NOBLE_CHAIN_ID
} from '@/config';
import { ChainWalletBase } from 'cosmos-kit';

// TODO: handle Error: Extension context invalidated
export const useCosmosWallet = (walletKey: CosmosWalletKey, chainId: string) => {
  const { chainWallets } = useWallet(COSMOS_WALLET_KEY_TO_NAME[walletKey]);

  const chain = useMemo(() => {
    const _chainId = COSMOS_CHAINS.some(({ chain_id }) => chain_id === chainId)
      ? chainId
      : NOBLE_CHAIN_ID;
    const chain = chainWallets.find((chainWallet) => chainWallet.chainId === _chainId);

    if (!chain) {
      throw new Error(`Chain ${_chainId} not provided`);
    }

    return chain;
  }, [chainWallets]);

  const {
    username,
    address,
    connect,
    disconnect,
    isWalletConnected,
    isWalletConnecting,
    isWalletNotExist
  } = chain;

  // const isConnected = chains.every((chain) => chain.isWalletConnected);

  // const username = chains[0]?.username ?? '';
  // const isInstalled = !chains[0]?.isWalletNotExist ?? false;

  // const connectAsync = async () => {
  //   for (const chain of chains) {
  //     if (chain.isWalletDisconnected) {
  //       await chain.connect(false);
  //     }
  //   }
  //   return chains.every((chain) => chain.isWalletConnected);
  // };

  // const connect = () => {
  //   chains.forEach((chain) => {
  //     if (chain.isWalletDisconnected) {
  //       chain.connect();
  //     }
  //   });
  // };

  // const disconnect = () => {
  //   chains.forEach((chain) => {
  //     if (chain.isWalletConnected) {
  //       chain.disconnect();
  //     }
  //   });
  // };

  return {
    isConnected: isWalletConnected,
    connect,
    connectAsync: () => connect(false),
    disconnect,
    username,
    isInstalled: !isWalletNotExist,
    chain,
    address,
    isConnecting: isWalletConnecting
  };
};

// export const useCosmosWallet = (walletKey: CosmosWalletKey, chainId: string) => {
//   const {
//     chain,
//     wallet,
//     username,
//     address,
//     connect,
//     disconnect,
//     isWalletConnected,
//     isWalletConnecting,
//     isWalletNotExist
//   } = useChainWallet(
//     getCosmosChainNameById(
//       COSMOS_CHAINS.some(({ chain_id }) => chain_id === chainId)
//         ? chainId
//         : DEFAULT_SELECTED_CHAIN_ID
//     ),
//     COSMOS_WALLET_KEY_TO_NAME[walletKey]
//   );

//   return {
//     chainInfo: chain,
//     wallet,
//     address,
//     connect,
//     disconnect,
//     username,
//     walletLogo: WALLET_KEY_TO_LOGO_URL[walletKey],
//     isConnecting: isWalletConnecting,
//     isConnected: isWalletConnected,
//     isInstalled: !isWalletNotExist
//   };
// };
