import { useRouter } from 'next/router';
import {
  Box,
  NobleSelectWalletButton,
  NobleSelectWalletButtonProps,
  toast
} from '@interchain-ui/react';

import { WALLET_KEY_TO_LOGO_URL, WALLET_KEY_TO_PRETTY_NAME, WalletKey } from '@/config';
import { useCapsuleClient, useCosmosWallet, useEvmWallet } from '@/hooks';
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
  const [showCapsuleModal, setShowCapsuleModal] = useState(false);

  // EVM Wallet
  const {
    connectAsync: connectMetaMaskAsync,
    isConnected: isMetaMaskConnected,
    isInstalled: isMetaMaskInstalled
  } = useEvmWallet('metamask');

  // Cosmos Wallets
  const {
    connectAsync: connectLeapAsync,
    isConnected: isLeapConnected,
    isInstalled: isLeapInstalled
  } = useCosmosWallet('leap');

  const {
    connectAsync: connectKeplrAsync,
    isConnected: isKeplrConnected,
    isInstalled: isKeplrInstalled
  } = useCosmosWallet('keplr');

  const {
    connectAsync: connectCosmostationAsync,
    isConnected: isCosmostationConnected,
    isInstalled: isCosmostationInstalled
  } = useCosmosWallet('cosmostation');

  const { connectAsync: connectCapsuleAsync, isConnected: isCapsuleConnected } =
    useCosmosWallet('capsule');

  const { capsuleClient } = useCapsuleClient();

  const handleConnectWallet =
    (walletKey: WalletKey, isConnected: boolean, connectFunc: () => Promise<boolean>) => () => {
      const href: BridgeHref = {
        pathname: '/bridge',
        query: { wallet: walletKey }
      };
      if (isConnected) {
        return router.push(href);
      }
      connectFunc().then((isSuccess) => {
        if (isSuccess) {
          router.push(href);
          return;
        }
        toast.error('Connect wallet failed. Please try again.');
      });
    };

  const capsuleHref: BridgeHref = {
    pathname: '/bridge',
    query: { wallet: 'capsule' }
  };

  const handleConnectCapsule = () => {
    if (isCapsuleConnected) {
      return router.push(capsuleHref);
    }
    setShowCapsuleModal(true);
  };

  const getWalletButtonProps = (
    walletKey: WalletKey
  ): Pick<NobleSelectWalletButtonProps, 'logoAlt' | 'logoUrl' | 'title'> => {
    return {
      logoUrl: WALLET_KEY_TO_LOGO_URL[walletKey],
      logoAlt: WALLET_KEY_TO_PRETTY_NAME[walletKey],
      title: WALLET_KEY_TO_PRETTY_NAME[walletKey]
    };
  };

  return (
    <>
      <CustomCapsuleModalView
        capsule={capsuleClient}
        showCapsuleModal={showCapsuleModal}
        setShowCapsuleModal={setShowCapsuleModal}
        theme="dark"
        onAfterLoginSuccessful={() => {
          const toastId = toast.success('Login successful. Hang tight...');
          connectCapsuleAsync().then((isSuccess) => {
            if (isSuccess) {
              router.push(capsuleHref);
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
          {...getWalletButtonProps('metamask')}
          onClick={handleConnectWallet('metamask', isMetaMaskConnected, connectMetaMaskAsync)}
          subTitle={isMetaMaskInstalled ? 'Connect' : 'Install MetaMask'}
          disabled={!isMetaMaskInstalled}
        />

        <NobleSelectWalletButton
          {...getWalletButtonProps('keplr')}
          onClick={handleConnectWallet('keplr', isKeplrConnected, connectKeplrAsync)}
          subTitle={isKeplrInstalled ? 'Connect' : 'Install Keplr'}
          disabled={!isKeplrInstalled}
        />

        <NobleSelectWalletButton
          {...getWalletButtonProps('capsule')}
          onClick={handleConnectCapsule}
          subTitle="Log in"
        />

        <NobleSelectWalletButton
          logoUrl="/logos/phantom.svg"
          logoAlt="phantom"
          title="Phantom"
          subTitle="Soon"
          disabled
        />

        {/* Other Wallets */}
        <NobleSelectWalletButton
          {...getWalletButtonProps('leap')}
          onClick={handleConnectWallet('leap', isLeapConnected, connectLeapAsync)}
          subTitle={isLeapInstalled ? 'Connect' : 'Install Leap'}
          disabled={!isLeapInstalled}
        />

        <NobleSelectWalletButton
          {...getWalletButtonProps('cosmostation')}
          onClick={handleConnectWallet(
            'cosmostation',
            isCosmostationConnected,
            connectCosmostationAsync
          )}
          subTitle={isCosmostationInstalled ? 'Connect' : 'Install Cosmostation'}
          disabled={!isCosmostationInstalled}
        />
      </Box>
    </>
  );
}
