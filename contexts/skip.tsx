import * as React from 'react';
import { getWalletClient } from '@wagmi/core';
import { WalletClient } from 'viem';
import { SKIP_API_CLIENT_ID } from '@/config';
import { config } from '@/config/wagmi';
import type { SkipRouter } from '@skip-router/core';
import { useSkipRouter } from '@/hooks/useSkipRouter';

export const SkipContext = React.createContext<{ skipClient: SkipRouter | null } | undefined>(
  undefined
);

export function SkipProvider({ children }: { children: React.ReactNode }) {
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
  }, [skipClient, skipModule]);

  return <SkipContext.Provider value={{ skipClient }}>{children}</SkipContext.Provider>;
}

export function useSkipClient() {
  const context = React.useContext(SkipContext);

  if (context === undefined) {
    throw new Error('useSkip must be used within a SkipProvider');
  }

  return context.skipClient;
}
