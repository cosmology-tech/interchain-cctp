import { useRouter } from 'next/navigation';
import { useAccount, useConnect } from 'wagmi';
import { CHAIN_TYPE, COSMOS_CHAIN_NAMES } from '@/config';
import { useDetectWallets } from '@/hooks/useDetectWallets';
import { Box, NobleSelectWalletButton } from '@interchain-ui/react';
import { useConnectChains } from '@/hooks';

export function WalletList() {
  const router = useRouter();
  const { address } = useAccount();
  const { connectAsync, connectors } = useConnect();
  const { connectAllAsync, isAllConnected } = useConnectChains(COSMOS_CHAIN_NAMES);

  const handleConnectMetamask = () => {
    const href = `/bridge?chain-type=${CHAIN_TYPE.EVM}`;
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
    const href = `/bridge?chain-type=${CHAIN_TYPE.COSMOS}`;
    if (isAllConnected) {
      return router.push(href);
    }
    connectAllAsync().then((isSuccess) => {
      if (isSuccess) {
        router.push(href);
      }
    });
  };

  const isWalletInstalled = useDetectWallets();

  return (
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
        logoAlt="keplr"
        title="Capsule"
        subTitle="Log in"
        disabled
      />

      <NobleSelectWalletButton
        logoUrl={'/logos/phantom.svg'}
        logoAlt="phantom"
        title="Phantom"
        subTitle="Soon"
        disabled
      />
    </Box>
  );
}
