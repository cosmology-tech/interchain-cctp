import { useRouter } from 'next/navigation';
import { useChains } from '@cosmos-kit/react';
import { useAccount, useConnect } from 'wagmi';
import { COSMOS_CHAIN_ID_TO_CHAIN_NAME } from '@/config';
import { Box, NobleSelectWalletButton } from '@interchain-ui/react';

export function WalletList() {
  const router = useRouter();
  const cosmos = useChains(Object.values(COSMOS_CHAIN_ID_TO_CHAIN_NAME));
  const { address } = useAccount();
  const { connectAsync, isSuccess, connectors } = useConnect();

  const handleConnectMetamask = () => {
    if (address) {
      return router.push('/bridge');
    }
    connectAsync({ connector: connectors[0] }).then((isSuccess) => {
      if (isSuccess) {
        router.push('/bridge');
      }
    });
  };

  const handleConnectKeplr = () => {
    if (cosmos.cosmohub?.address) {
      return router.push('/bridge');
    }
    cosmos.cosmoshub.connect();
  };

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
        subTitle="Connect"
        onClick={handleConnectMetamask}
      />

      <NobleSelectWalletButton
        logoUrl={'/logos/keplr.svg'}
        logoAlt="keplr"
        title="Keplr"
        subTitle="Connect"
        onClick={handleConnectKeplr}
      />

      <NobleSelectWalletButton
        logoUrl={'/logos/capsule.svg'}
        logoAlt="keplr"
        title="Capsule"
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
  );
}
