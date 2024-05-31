import { useRouter } from 'next/router';
import { useAccount, useConnect } from 'wagmi';
import {
  Box,
  NobleSelectWalletButton,
  NobleSelectWalletButtonProps,
  toast
} from '@interchain-ui/react';

import { WALLET_KEY_TO_LOGO_URL, WALLET_KEY_TO_PRETTY_NAME, WalletKey } from '@/config';
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
  const { address: evmAddress } = useAccount();
  const { connectAsync, connectors } = useConnect();
  const [showCapsuleModal, setShowCapsuleModal] = useState(false);

  const { connectAsync: connectLeapAsync, isConnected: isLeapConnected } = useCosmosWallet('leap');
  const { connectAsync: connectKeplrAsync, isConnected: isKeplrConnected } =
    useCosmosWallet('keplr');
  const { connectAsync: connectCosmostationAsync, isConnected: isCosmostationConnected } =
    useCosmosWallet('cosmostation');
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

  const connectMetaMaskAsync = async () => {
    return connectAsync({ connector: connectors[0] }).then((connectData) => !!connectData);
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
          onClick={handleConnectWallet('metamask', !!evmAddress, connectMetaMaskAsync)}
          subTitle={isWalletInstalled.metamask ? 'Connect' : 'Install MetaMask'}
          disabled={!isWalletInstalled.metamask}
        />

        <NobleSelectWalletButton
          {...getWalletButtonProps('keplr')}
          onClick={handleConnectWallet('keplr', isKeplrConnected, connectKeplrAsync)}
          subTitle={isWalletInstalled.keplr ? 'Connect' : 'Install Keplr'}
          disabled={!isWalletInstalled.keplr}
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
          subTitle={isWalletInstalled.leap ? 'Connect' : 'Install Leap'}
          onClick={handleConnectWallet('leap', isLeapConnected, connectLeapAsync)}
          disabled={!isWalletInstalled.leap}
        />

        <NobleSelectWalletButton
          {...getWalletButtonProps('cosmostation')}
          subTitle={isWalletInstalled.cosmostation ? 'Connect' : 'Install Cosmostation'}
          onClick={handleConnectWallet(
            'cosmostation',
            isCosmostationConnected,
            connectCosmostationAsync
          )}
          disabled={!isWalletInstalled.cosmostation}
        />
      </Box>
    </>
  );
}
