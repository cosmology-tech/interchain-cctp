import { SkipProvider } from '@/skip';
import { WagmiProvider } from 'wagmi';
import { ChainProvider } from '@cosmos-kit/react';
import { config } from '@/config/wagmi';
import { assets, chains } from 'chain-registry';
import { SignerOptions, wallets } from 'cosmos-kit';

export const AppProvider = ({ children }: { children?: React.ReactNode }) => {
  const signerOptions: SignerOptions = {
    // signingStargate: () => {
    //   return getSigningCosmosClientOptions();
    // }
  };

  return (
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
  );
};
