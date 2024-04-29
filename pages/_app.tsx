import '../styles/globals.css';
import '@interchain-ui/react/styles';

import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SignerOptions, wallets } from 'cosmos-kit';
import { ChainProvider } from '@cosmos-kit/react';
import { assets, chains } from 'chain-registry';
import { WagmiProvider } from 'wagmi';
import { SkipProvider } from '@/skip';
import {
  Box,
  ThemeProvider,
  NobleProvider,
  Toaster,
  useColorModeValue,
  useTheme
} from '@interchain-ui/react';
import { config } from '@/config/wagmi';

const queryClient = new QueryClient();

function CreateCosmosApp({ Component, pageProps }: AppProps) {
  const { theme } = useTheme();

  const signerOptions: SignerOptions = {
    // signingStargate: () => {
    //   return getSigningCosmosClientOptions();
    // }
  };

  return (
    <ThemeProvider>
      <NobleProvider>
        <ChainProvider
          chains={chains}
          assetLists={assets}
          wallets={[wallets.keplr.extension!]}
          signerOptions={signerOptions}
        >
          <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
              <SkipProvider>
                <Box
                  minHeight="100dvh"
                  display="flex"
                  flexDirection="column"
                  backgroundColor={useColorModeValue('#F6F6FE', '#020418')}
                >
                  <Component {...pageProps} />

                  <Toaster position={'top-right'} closeButton={true} />
                </Box>
              </SkipProvider>
            </QueryClientProvider>
          </WagmiProvider>
        </ChainProvider>
      </NobleProvider>
    </ThemeProvider>
  );
}

export default CreateCosmosApp;
