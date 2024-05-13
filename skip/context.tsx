import { ReactNode, createContext } from 'react';
import { SkipRouter } from '@skip-router/core';
import { getWalletClient } from '@wagmi/core';
import { WalletClient } from 'viem';
import { SKIP_API_CLIENT_ID } from '@/config';
import { config } from '@/config/wagmi';
import { useWalletClient } from '@cosmos-kit/react';
import { wallets } from 'cosmos-kit';

export const SkipContext = createContext<{ skipClient: SkipRouter } | undefined>(undefined);

export function SkipProvider({ children }: { children: ReactNode }) {
  const { client } = useWalletClient(wallets.keplr[0].walletName);

  const skipClient = new SkipRouter({
    clientID: SKIP_API_CLIENT_ID,
    getCosmosSigner: async (chainID) => {
      const cosmosSigner = client?.getOfflineSignerDirect && client.getOfflineSignerDirect(chainID);

      if (!cosmosSigner) {
        throw new Error(`getCosmosSigner error: no offline signer available for chain ${chainID}`);
      }

      return cosmosSigner;
    },
    // @ts-ignore
    getEVMSigner: async (chainID) => {
      const evmWalletClient = (await getWalletClient(config, {
        chainId: parseInt(chainID)
      })) as WalletClient;

      if (!evmWalletClient) {
        throw new Error(`getEVMSigner error: no wallet client available for chain ${chainID}`);
      }

      return evmWalletClient;
    }
  });

  return <SkipContext.Provider value={{ skipClient }}>{children}</SkipContext.Provider>;
}
