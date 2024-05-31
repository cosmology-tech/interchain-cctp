import { useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import {
  Box,
  NobleSelectWalletButton,
  NobleSelectWalletButtonProps,
  Text,
  useTheme,
  toast
} from '@interchain-ui/react';

import { WALLET_KEY_TO_LOGO_URL, WALLET_KEY_TO_PRETTY_NAME, WalletKey } from '@/config';
import { useCapsuleClient, useCosmosWallet, useEvmWallet } from '@/hooks';
import { SelectWalletModal } from '@/components/bridge/SelectWalletModal';
import { BaseButton } from '@/components/common';

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
  const { theme } = useTheme();
  const router = useRouter();
  const [showCapsuleModal, setShowCapsuleModal] = useState(false);
  const [isOpenWalletModal, setIsOpenWalletModal] = useState(false);

  // EVM Wallet
  const {
    connectAsync: connectMetaMaskAsync,
    isConnected: isMetaMaskConnected,
    isInstalled: isMetaMaskInstalled
  } = useEvmWallet('metamask');

  // Cosmos Wallets
  const {
    connectAsync: connectKeplrAsync,
    isConnected: isKeplrConnected,
    isInstalled: isKeplrInstalled
  } = useCosmosWallet('keplr');

  const { connectAsync: connectCapsuleAsync, isConnected: isCapsuleConnected } =
    useCosmosWallet('capsule');

  const { capsuleClient } = useCapsuleClient();

  const goToBridgeView = (walletKey: WalletKey) => {
    const href: BridgeHref = {
      pathname: '/bridge',
      query: { wallet: walletKey }
    };
    return router.push(href);
  };

  const handleConnectWallet =
    (walletKey: WalletKey, isConnected: boolean, connectFunc: () => Promise<boolean>) => () => {
      if (isConnected) {
        return goToBridgeView(walletKey);
      }
      connectFunc().then((isSuccess) => {
        if (isSuccess) {
          return goToBridgeView(walletKey);
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
        theme={theme}
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

      <SelectWalletModal
        isOpen={isOpenWalletModal}
        setIsOpen={setIsOpenWalletModal}
        wallets={['leap', 'cosmostation']}
        onConnectSuccess={(walletKey) => {
          goToBridgeView(walletKey);
        }}
        onConnectError={() => {
          toast.error('Connect wallet failed. Please try again.');
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

        <BaseButton
          onPress={() => {
            setIsOpenWalletModal(true);
          }}
        >
          <Text fontSize="$sm" as="span" fontWeight="$semibold" color="$textSecondary">
            Other wallets
          </Text>
        </BaseButton>
      </Box>
    </>
  );
}
