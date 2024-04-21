
import Image from "next/image"
import { Layout } from "@/components";
import { Box, Text, useColorModeValue } from '@interchain-ui/react';
import { colors } from "@/config";
import { AbstractWallet } from "@/components/common/icons/AbstractWallet";

export default function SignInMetaMask() {
  return <Layout>
    <Box
      mx="auto"
      mt="60px"
      width="300px"
    >
      <Box
        minHeight="50rem"
        textAlign="center"    
      >
        <Text                
          fontSize="20px"
          fontWeight="600"
          lineHeight="28px"
          color={useColorModeValue(colors.blue50, colors.white)}
          >Please sign the transaction
        </Text>
        <Box
          gap="10px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text                
            fontSize="20px"
            fontWeight="600"
            lineHeight="28px"
            color={useColorModeValue(colors.blue50, colors.white)}
          >in</Text>
          <Image
            src={"/logos/metamask.svg"}
            width={23}
            height={23}
            alt="MetaMask"
          />
          <Text                
            fontSize="20px"
            fontWeight="600"
            lineHeight="28px"
            color={useColorModeValue(colors.blue50, colors.white)}
          >MetaMask</Text>
        </Box>
        <Box mt="40px">
          <AbstractWallet />
        </Box>
        <Box
          mt="12px"
          textAlign="center"
        >
          <Text
            fontSize="14px"
            fontWeight="600"
            lineHeight="20px"
            attributes={{ cursor: "pointer" }}
            color={useColorModeValue(colors.gray500, colors.blue700)}
          >
            Cancel
          </Text>
        </Box>
      </Box>
    </Box>
  </Layout>
}