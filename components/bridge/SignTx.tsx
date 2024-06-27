import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Box, Text, useColorModeValue } from '@interchain-ui/react';

import { WALLET_KEY_TO_LOGO_URL, WALLET_KEY_TO_PRETTY_NAME, colors, envConfig } from '@/config';
import { FaqList, FadeIn } from '@/components/common';
import { PulsingBox } from '@/components/common/PulsingBox';
import { AbstractWallet } from '@/components/common/icons/AbstractWallet';
import { useCurrentWallets } from '@/contexts';

const TransactionSigningModal = dynamic(
  () =>
    import('@leapwallet/cosmos-social-login-capsule-provider-ui').then(
      (m) => m.TransactionSigningModal
    ),
  { ssr: false }
);

export const SignTx = () => {
  const { srcWallet } = useCurrentWallets();
  const walletKey = srcWallet.walletKey ?? 'keplr';

  const walletInfo = {
    logo: WALLET_KEY_TO_LOGO_URL[walletKey],
    name: WALLET_KEY_TO_PRETTY_NAME[walletKey]
  };

  return (
    <>
      {walletKey === 'capsule' && (
        <TransactionSigningModal dAppInfo={{ name: envConfig.appName ?? 'Interchain CCTP' }} />
      )}

      <FadeIn>
        <Box mx="auto" mt="60px" width="300px">
          <Box minHeight="50rem" textAlign="center">
            <Text
              fontSize="20px"
              fontWeight="600"
              lineHeight="28px"
              color={useColorModeValue(colors.blue50, colors.white)}
            >
              Please sign the transaction
            </Text>
            <Box gap="10px" display="flex" alignItems="center" justifyContent="center">
              <Text
                fontSize="20px"
                fontWeight="600"
                lineHeight="28px"
                color={useColorModeValue(colors.blue50, colors.white)}
              >
                in
              </Text>
              <Image src={walletInfo.logo} width={23} height={23} alt={walletInfo.name} />
              <Text
                fontSize="20px"
                fontWeight="600"
                lineHeight="28px"
                color={useColorModeValue(colors.blue50, colors.white)}
              >
                {walletInfo.name}
              </Text>
            </Box>

            <Box mt="40px" display="flex" alignItems="center" justifyContent="center">
              <PulsingBox width="216px" height="271px">
                <AbstractWallet />
              </PulsingBox>
            </Box>
          </Box>
        </Box>

        <FaqList />
      </FadeIn>
    </>
  );
};
