import { useAccount } from 'wagmi';
import { useWallet } from '@cosmos-kit/react';
import { RouteResponse } from '@skip-router/core';

import {
  COSMOS_WALLET_KEY_TO_NAME,
  CosmosWalletKey,
  WalletKey,
  checkIsCosmosWallet
} from '@/config';
import { useCurrentWallets } from '@/contexts';

type UserAddress = {
  chainID: string;
  address: string;
};

export const useUserAddresses = () => {
  const { srcWallet, destWallet } = useCurrentWallets();

  const cosmosWalletKey = getCosmosWalletKey(srcWallet.walletKey, destWallet.walletKey);

  const { chainWallets } = useWallet(COSMOS_WALLET_KEY_TO_NAME[cosmosWalletKey ?? 'keplr']);
  const { address: evmAddress } = useAccount();

  const getUserAddresses = async ({ route }: { route: RouteResponse }): Promise<UserAddress[]> => {
    const srcAddress = {
      chainID: route.sourceAssetChainID,
      address: srcWallet.address!
    };
    const destAddress = {
      chainID: route.destAssetChainID,
      address: destWallet.address!
    };

    let middleAddress: UserAddress | undefined;

    if (route.chainIDs.length === 3) {
      const middleChainId = route.chainIDs[1];

      if (/^\d+/.test(middleChainId)) {
        middleAddress = {
          chainID: middleChainId,
          address: evmAddress!
        };
      } else {
        const middleChain = chainWallets.find(
          (chainWallet) => chainWallet.chainId === middleChainId
        );

        if (!middleChain) {
          throw new Error(`Chain ${middleChainId} not provided`);
        }

        if (!middleChain.address) {
          await middleChain?.connect(false);
          if (!middleChain.address) {
            throw new Error(`Address not found for chain: ${middleChainId}`);
          }
        }

        middleAddress = {
          chainID: middleChainId,
          address: middleChain.address
        };
      }
    }

    return [srcAddress, middleAddress, destAddress].filter(Boolean) as UserAddress[];
  };

  return { getUserAddresses };
};

const getCosmosWalletKey = (
  srcWalletKey: WalletKey | null,
  destWalletKey: WalletKey | null
): CosmosWalletKey | null => {
  if (!srcWalletKey || !destWalletKey) return null;
  if (checkIsCosmosWallet(srcWalletKey) && checkIsCosmosWallet(destWalletKey)) {
    return destWalletKey;
  }
  if (!checkIsCosmosWallet(srcWalletKey) && !checkIsCosmosWallet(destWalletKey)) {
    return null;
  }
  return (checkIsCosmosWallet(srcWalletKey) ? srcWalletKey : destWalletKey) as CosmosWalletKey;
};
