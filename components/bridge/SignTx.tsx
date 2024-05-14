import Image from 'next/image';
import { useRouter } from 'next/router';
import { Box, Text, useColorModeValue } from '@interchain-ui/react';
import { CHAIN_TYPE, ChainType, colors } from '@/config';
import { BaseButton, FadeIn } from '@/components/common';
import { AbstractWallet } from '@/components/common/icons/AbstractWallet';
import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

export function SignTx() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const walletInfo = useMemo(() => {
    const sourceChainType = (searchParams.get('chain_type') ?? CHAIN_TYPE.EVM) as ChainType;
    switch (sourceChainType) {
      case CHAIN_TYPE.EVM:
        return {
          name: 'MetaMask',
          logo: '/logos/metamask.svg'
        };
      case CHAIN_TYPE.COSMOS:
        return {
          name: 'Keplr',
          logo: '/logos/keplr.svg'
        };
      default:
        return {
          name: 'MetaMask',
          logo: '/logos/metamask.svg'
        };
    }
  }, [searchParams]);

  return (
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
            <AbstractWallet />
          </Box>
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
        </Box>
      </Box>
    </FadeIn>
  );
}
