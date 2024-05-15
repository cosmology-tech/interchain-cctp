import { SkipProvider } from '@/contexts';
import { WagmiProvider } from 'wagmi';
import { ChainProvider } from '@cosmos-kit/react';
import { config } from '@/config/wagmi';
import { assets, chains } from 'chain-registry';
import { SignerOptions, wallets } from 'cosmos-kit';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider, NobleProvider } from '@interchain-ui/react';

const queryClient = new QueryClient();

export const AppProvider = ({ children }: { children?: React.ReactNode }) => {
  const signerOptions: SignerOptions = {
    // signingStargate: () => {
    //   return getSigningCosmosClientOptions();
    // }
  };

  return (
    <ThemeProvider>
      <NobleProvider>
        <QueryClientProvider client={queryClient}>
          <ChainProvider
            chains={chains}
            assetLists={assets}
            wallets={[wallets.keplr.extension!]}
            signerOptions={signerOptions}
          >
            <SkipProvider>
              <WagmiProvider config={config}>{children}</WagmiProvider>
            </SkipProvider>
          </ChainProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </NobleProvider>
    </ThemeProvider>
  );
};
