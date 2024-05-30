import { useRouter } from 'next/router';
import { useAccount, useConnect } from 'wagmi';
import { Box, NobleSelectWalletButton, toast } from '@interchain-ui/react';

import { WalletKey } from '@/config';
import { useCapsuleClient, useCosmosWallet, useDetectWallets } from '@/hooks';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const CustomCapsuleModalView = dynamic(
  () =>
    import('@leapwallet/cosmos-social-login-capsule-provider-ui').then(
      (m) => m.CustomCapsuleModalView
    ),
  { ssr: false }
);

export type BridgeHref = {
  pathname: string;
  query: {
    wallet: WalletKey;
  };
};

export function WalletList() {
  const router = useRouter();
  const { address } = useAccount();
  const { connectAsync, connectors } = useConnect();
  const [showCapsuleModal, setShowCapsuleModal] = useState(false);

  const { connectAsync: connectKeplrAsync, isConnected: isKeplrConnected } =
    useCosmosWallet('keplr');
  const { connectAsync: connectLeapAsync, isConnected: isLeapConnected } =
    useCosmosWallet('leap-social-login');

  const { capsuleClient } = useCapsuleClient();

  const handleConnectMetamask = () => {
    const href: BridgeHref = {
      pathname: '/bridge',
      query: { wallet: 'metamask' }
    };
    if (address) {
      return router.push(href);
    }
    connectAsync({ connector: connectors[0] }).then((isSuccess) => {
      if (isSuccess) {
        router.push(href);
      }
    });
  };

  const handleConnectKeplr = () => {
    const href: BridgeHref = {
      pathname: '/bridge',
      query: { wallet: 'keplr' }
    };
    if (isKeplrConnected) {
      return router.push(href);
    }
    connectKeplrAsync().then((isSuccess) => {
      if (isSuccess) {
        router.push(href);
      }
    });
  };

  const leapHref: BridgeHref = {
    pathname: '/bridge',
    query: { wallet: 'leap-social-login' }
  };

  const handleConnectLeap = () => {
    if (isLeapConnected) {
      return router.push(leapHref);
    }
    setShowCapsuleModal(true);
  };

  const isWalletInstalled = useDetectWallets();

  return (
    <>
      <CustomCapsuleModalView
        capsule={capsuleClient}
        showCapsuleModal={showCapsuleModal}
        setShowCapsuleModal={setShowCapsuleModal}
        theme="dark"
        onAfterLoginSuccessful={() => {
          const toastId = toast.success('Login successful. Hang tight...');
          connectLeapAsync().then((isSuccess) => {
            if (isSuccess) {
              router.push(leapHref);
              toast.dismiss(toastId);
            }
          });
        }}
        onLoginFailure={() => {
          toast.error('Login failed. Please try again.');
        }}
      />

      <Box
        pt="72px"
        pb="200px"
        px="$12"
        display="flex"
        gap="24px"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
      >
        <NobleSelectWalletButton
          logoUrl={'/logos/metamask.svg'}
          logoAlt="metamask"
          title="MetaMask"
          onClick={handleConnectMetamask}
          subTitle={isWalletInstalled.metamask ? 'Connect' : 'Install MetaMask'}
          disabled={!isWalletInstalled.metamask}
        />

        <NobleSelectWalletButton
          logoUrl={'/logos/keplr.svg'}
          logoAlt="keplr"
          title="Keplr"
          onClick={handleConnectKeplr}
          subTitle={isWalletInstalled.keplr ? 'Connect' : 'Install Keplr'}
          disabled={!isWalletInstalled.keplr}
        />

        <NobleSelectWalletButton
          logoUrl={'/logos/capsule.svg'}
          logoAlt="capsule"
          title="Capsule"
          onClick={handleConnectLeap}
          subTitle="Log in"
        />

        <NobleSelectWalletButton
          logoUrl={'/logos/phantom.svg'}
          logoAlt="phantom"
          title="Phantom"
          subTitle="Soon"
          disabled
        />
      </Box>
    </>
  );
}
