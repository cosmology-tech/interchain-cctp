import { ReactNode, createContext } from 'react';
import { SkipRouter } from '@skip-router/core';
import { getWalletClient } from '@wagmi/core';
import { WalletClient } from 'viem';
import { SKIP_API_CLIENT_ID } from '@/config';
import { config } from '@/config/wagmi';
import { useChain, useManager } from '@cosmos-kit/react';
import { getCosmosChainNameById } from '@/utils';

export const SkipContext = createContext<{ skipClient: SkipRouter } | undefined>(undefined);

export function SkipProvider({ children }: { children: ReactNode }) {
  const { getWalletRepo } = useManager();

  const skipClient = new SkipRouter({
    clientID: SKIP_API_CLIENT_ID,
    getCosmosSigner: async (chainID) => {
      await window.keplr.enable(chainID);

      return window.getOfflineSigner(chainID);
    },
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
