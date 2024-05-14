import * as React from 'react';
import { getWalletClient } from '@wagmi/core';
import { WalletClient } from 'viem';
import { SKIP_API_CLIENT_ID } from '@/config';
import { config } from '@/config/wagmi';
import { useWalletClient } from '@cosmos-kit/react';
import { wallets } from 'cosmos-kit';

import type { SkipRouter } from '@skip-router/core';
import { useSkipRouter } from '@/hooks/useSkipRouter';

export const SkipContext = React.createContext<{ skipClient: SkipRouter } | undefined>(undefined);

export function SkipProvider({ children }: { children: React.ReactNode }) {
  const { client } = useWalletClient(wallets.keplr[0].walletName);
  const skipModule = useSkipRouter();

  const [skipClient, setSkipClient] = React.useState<SkipRouter | null>(null);

  React.useEffect(() => {
    if (skipClient) return;
    if (skipModule) {
      const SkipRouterClass = skipModule.SkipRouter as SkipRouter;

      setSkipClient(
        // @ts-ignore
        new SkipRouterClass({
          clientID: SKIP_API_CLIENT_ID,
          getCosmosSigner: async (chainID: string) => {
            const cosmosSigner =
              client?.getOfflineSignerDirect && client.getOfflineSignerDirect(chainID);

            if (!cosmosSigner) {
              throw new Error(
                `getCosmosSigner error: no offline signer available for chain ${chainID}`
              );
            }

            return cosmosSigner;
          },
          // @ts-ignore
          getEVMSigner: async (chainID) => {
            const evmWalletClient = (await getWalletClient(config, {
              chainId: parseInt(chainID)
            })) as WalletClient;

            if (!evmWalletClient) {
              throw new Error(
                `getEVMSigner error: no wallet client available for chain ${chainID}`
              );
            }

            return evmWalletClient;
          }
        })
      );
    }
  }, [client, skipClient, skipModule]);

  if (!skipClient) return null;

  return <SkipContext.Provider value={{ skipClient }}>{children}</SkipContext.Provider>;
}
