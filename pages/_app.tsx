import "../styles/globals.css";
import "@interchain-ui/react/styles";

import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SignerOptions, wallets } from "cosmos-kit";
import { ChainProvider } from "@cosmos-kit/react";
import { assets, chains } from "chain-registry";
import { WagmiProvider } from "wagmi";
import { SkipProvider } from "@/skip";
import {
  Box,
  ThemeProvider,
  useColorModeValue,
  useTheme,
} from "@interchain-ui/react";
import { config } from "@/config/wagmi";

const queryClient = new QueryClient()

function CreateCosmosApp({ Component, pageProps }: AppProps) {
  const { themeClass } = useTheme();

  const signerOptions: SignerOptions = {
    // signingStargate: () => {
    //   return getSigningCosmosClientOptions();
    // }
  };

  return (
    <ThemeProvider>
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
                className={themeClass}
                minHeight="100dvh"
                backgroundColor={useColorModeValue("#F6F6FE", "#020418")}
              >
                <Component {...pageProps} />
              </Box>
            </SkipProvider>
          </QueryClientProvider> 
        </WagmiProvider>
      </ChainProvider>
    </ThemeProvider>
  );
}

export default CreateCosmosApp;
