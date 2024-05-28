import { useRouter } from 'next/router';
import { useAccount, useConnect } from 'wagmi';
import { Box, NobleSelectWalletButton } from '@interchain-ui/react';

import { ChainType } from '@/config';
import { TCosmosWallet, useConnectWallet, useDetectWallets } from '@/hooks';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useWallet } from '@cosmos-kit/react';

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
    wallet?: TCosmosWallet;
    chain_type: ChainType;
  };
};

export function WalletList() {
  const router = useRouter();
  const { address } = useAccount();
  const { connectAsync, connectors } = useConnect();
  const [showCapsuleModal, setShowCapsuleModal] = useState(false);

  const { connectAsync: connectKeplrAsync, isConnected: isKeplrConnected } =
    useConnectWallet('keplr');
  const { connectAsync: connectLeapAsync, isConnected: isLeapConnected } = useConnectWallet('leap');

  const [capsuleProvider, setCapsuleProvider] = useState<any>();

  useEffect(() => {
    import('@leapwallet/cosmos-social-login-capsule-provider').then((m) => {
      const capsuleProvider = new m.CapsuleProvider({
        apiKey: '066e2ad566ffb06c1dab2a06dfe0ff46'
        // env: Environment.BETA
      });
      setCapsuleProvider(capsuleProvider);
    });
  }, []);

  const handleConnectMetamask = () => {
    const href: BridgeHref = {
      pathname: '/bridge',
      query: { chain_type: 'evm' }
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
      query: { chain_type: 'cosmos', wallet: 'keplr' }
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

  const { chainWallets } = useWallet('leap-capsule-social-login');

  const cosmoshub = chainWallets.find(
    (chainWallet) => chainWallet.chainRecord.name === 'cosmoshub'
  );

  console.log({
    isConnected: cosmoshub?.isWalletConnected,
    address: cosmoshub?.address
  });

  const handleConnectLeap = () => {
    setShowCapsuleModal(true);

    // const href: BridgeHref = {
    //   pathname: '/bridge',
    //   query: { chain_type: 'cosmos', wallet: 'leap' }
    // };
    // if (isLeapConnected) {
    //   return router.push(href);
    // }
    // connectLeapAsync().then((isSuccess) => {
    //   if (isSuccess) {
    //     router.push(href);
    //   }
    // });
  };

  const isWalletInstalled = useDetectWallets();

  return (
    <>
      <CustomCapsuleModalView
        capsule={capsuleProvider?.getClient()}
        showCapsuleModal={showCapsuleModal}
        setShowCapsuleModal={setShowCapsuleModal}
        theme="dark"
        onAfterLoginSuccessful={() => {
          console.log('login successful');
          // window.successFromCapsuleModal();
        }}
        onLoginFailure={() => {
          console.log('login failed');
          // window.failureFromCapsuleModal();
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
          subTitle={isWalletInstalled.leap ? 'Connect' : 'Install Leap'}
          disabled={!isWalletInstalled.leap}
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
