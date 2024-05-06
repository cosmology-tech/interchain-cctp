import { useRouter } from 'next/navigation';
import { useAccount, useConnect } from 'wagmi';
import { CHAIN_TYPE, COSMOS_CHAIN_NAMES } from '@/config';
import { Box, NobleSelectWalletButton } from '@interchain-ui/react';
import { useConnectChains } from '@/hooks/useConnectChains';

export function WalletList() {
  const router = useRouter();
  const { address } = useAccount();
  const { connectAsync, connectors } = useConnect();
  const { connectAll, isAllConnected } = useConnectChains(COSMOS_CHAIN_NAMES);

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

  const handleConnectKeplr = async () => {
    const href = `/bridge?chain-type=${CHAIN_TYPE.COSMOS}`;
    if (isAllConnected) {
      return router.push(href);
    }
    await connectAll();
    router.push(href);
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
