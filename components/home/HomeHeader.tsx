import Image from 'next/image';
import { Box, Text, useColorModeValue } from '@interchain-ui/react';
import { DEFAULT_USDC_LOGO, colors } from '@/config';
import { ChainList } from './ChainList';
import { data } from '@/data';

export const HomeHeader = () => {
  return (
    <>
      <Title />
      <Subtitle />
      <ChainList />
    </>
  );
};

function Title() {
  return (
    <Box
      mt="3rem"
      display="flex"
      flexWrap="wrap"
      gap="10px"
      flex="1"
      alignItems="center"
      justifyContent="center"
    >
      <Text
        color={useColorModeValue(colors.gray50, colors.white)}
        fontSize="48px"
        fontWeight="500"
        lineHeight="53px"
      >
        Send
      </Text>

      <Box display="flex" justifyContent="center" alignItems="center" flexWrap="nowrap">
        <Image src={DEFAULT_USDC_LOGO} alt="USDC" width={48} height={48} />
        &nbsp;
        <Text
          color={useColorModeValue(colors.gray50, colors.white)}
          fontSize="48px"
          fontWeight="500"
          lineHeight="53px"
        >
          USDC
        </Text>
      </Box>

      <Text
        color={useColorModeValue(colors.gray50, colors.white)}
        fontSize="48px"
        fontWeight="500"
        lineHeight="53px"
      >
        Anywhere
      </Text>
    </Box>
  );
}

function Subtitle() {
  return (
    <Box textAlign="center" maxWidth="440px" mx="auto" my="16px">
      <Text
        color={useColorModeValue(colors.gray50, colors.blue700)}
        fontWeight="400"
        lineHeight="20px"
      >
        {data.header.subtitle}
      </Text>
    </Box>
  );
}
