import Image from 'next/image';
import { Box, Text, useColorModeValue } from '@interchain-ui/react';
import { WalletKey, colors } from '@/config';
import { FadeIn } from '@/components/common';
import { PulsingBox } from '@/components/common/PulsingBox';
import { AbstractWallet } from '@/components/common/icons/AbstractWallet';
import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';

const TransactionSigningModal = dynamic(
  () =>
    import('@leapwallet/cosmos-social-login-capsule-provider-ui').then(
      (m) => m.TransactionSigningModal
    ),
  { ssr: false }
);

export function SignTx() {
  const searchParams = useSearchParams();

  const walletInfo = useMemo(() => {
    const walletKey = (searchParams.get('wallet') ?? 'keplr') as WalletKey;

    const walletKeyToWalletInfo: Record<WalletKey, { name: string; logo: string }> = {
      keplr: {
        name: 'Keplr',
        logo: '/logos/keplr.svg'
      },
      metamask: {
        name: 'MetaMask',
        logo: '/logos/metamask.svg'
      },
      'leap-social-login': {
        name: 'Leap',
        logo: '/logos/leap.svg'
      }
    };

    return walletKeyToWalletInfo[walletKey];
  }, [searchParams]);

  return (
    <>
      <TransactionSigningModal dAppInfo={{ name: 'Noble Express' }} />
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
            {/* 
            * The button is included in the design but actually useless
            * The user can reject from the wallet itself if they want to cancel the transaction
            <Box mt="12px" textAlign="center">
              <BaseButton
                style={{
                  margin: '0 auto'
                }}
                onPress={() => {
                  router.back();
                }}
              >
                <Text
                  as="span"
                  fontSize="14px"
                  fontWeight="600"
                  lineHeight="20px"
                  attributes={{ cursor: 'pointer' }}
                  color={useColorModeValue(colors.gray500, colors.blue700)}
                >
                  Cancel
                </Text>
              </BaseButton>
            </Box> 
            */}
          </Box>
        </Box>
      </FadeIn>
    </>
  );
}
