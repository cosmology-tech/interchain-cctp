import Image from "next/image";
import { useState, useEffect } from "react";
import { useAccount, useReadContracts } from "wagmi";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { Box, Stack, Text, useColorModeValue } from "@interchain-ui/react";
import { shortenAddress, uusdcToUsdc } from "@/utils";
import { CopyIcon, ExitIcon, Layout } from "@/components/common";
import {
  sizes,
  colors,
  USDC_CONTRACT_ABI,
  USDC_ETHEREUM_MAINNET,
  USDC_ARBITRUM_MAINNET,
  USDC_OPTIMISM_MAINNET,
} from "@/config";
import { BalanceNotAvailable, UsdcToken } from "@/models";
import { useRouter } from "next/router";
import { usePrice } from "@/hooks";

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

export default function SelectToken() {
  const { price = 1 } = usePrice();
  const { address } = useAccount();
  const [tokens, setTokens] = useState([
    USDC_ETHEREUM_MAINNET,
    USDC_ARBITRUM_MAINNET,
    USDC_OPTIMISM_MAINNET,
  ]);
  const { data } = useReadContracts({
    enabled: Boolean(address),
    contracts: tokens.map((token) => ({
      abi: USDC_CONTRACT_ABI,
      chainId: token.id,
      address: token.contract,
      functionName: 'balanceOf',
      args: [address]
    })),
  });

  useEffect(() => {
    if (data?.length === tokens.length) {
      setTokens(data.map(({ result, status }, index) =>
        new UsdcToken({
          ...tokens[index],
          balance: status === 'success' ? uusdcToUsdc(result as bigint) : BalanceNotAvailable
        })
      ));
    }
  }, [data])

  return (
    <Layout>
      <Box minHeight="50rem" maxWidth={sizes.main.maxWidth} mx="auto" mt="3.5rem">
        <Box
          mb="3rem"
          fontSize="20px"
          fontWeight="600"
          lineHeight="28px"
          color={useColorModeValue(colors.blue50, colors.white)}
        >
          Select token to bridge
        </Box>
        <Address address={address}  />
        <UsdcTokenList tokens={tokens} price={price} />
      </Box>
    </Layout>
  );
}

type AddressProps = {
  address?: string;
};

function Address({ address = '' }: AddressProps) {
  return (
    <Box display="flex" alignItems="center" gap="8px">
      <Image
        src="/logos/metamask.svg"
        alt="MetaMask"
        width={16}
        height={16}
      />
      <Text
        fontSize="12px"
        lineHeight="16px"
        fontWeight="400"
        color={useColorModeValue(colors.gray500, colors.blue600)}
      >
        {shortenAddress(address)}
      </Text>
      <Box cursor="pointer" height="16px" mx="6px">
        <CopyIcon
          color={useColorModeValue(colors.gray500, colors.blue600)}
        />
      </Box>
      <Box cursor="pointer" height="16px">
        <ExitIcon
          color={useColorModeValue(colors.gray500, colors.blue600)}
        />
      </Box>
    </Box>
  );
}

type UsdcTokenListProps = {
  tokens: UsdcToken[];
  price?: number;
};

function UsdcTokenList({ tokens = [], price = 1 }: UsdcTokenListProps) {
  const router = useRouter();
  return (
    <Stack direction="vertical" space="16px" attributes={{ mt: "24px" }}>
      {tokens.map((token) =>
        <TokenItem
          key={token.id}
          token={token}
          price={price}
          onClick={(token) => router.push(`/select-amount-dest?source_chain_id=${token.id}`)}
        />)}
    </Stack>
  );
}

export type TokenItemProps = {
  token: UsdcToken;
  price?: number
  onClick?: (token: UsdcToken) => void;
};

function TokenItem({
  token,
  price = 1,
  onClick = () => {},
}: TokenItemProps) {
  return (
    <Box
      px="20px"
      height="96px"
      display="flex"
      cursor="pointer"
      alignItems="center"
      borderWidth="1px"
      borderStyle="solid"
      borderRadius="8px"
      borderColor={useColorModeValue(
        colors.border.light,
        colors.border.dark,
      )}
      backgroundColor={useColorModeValue(colors.white, colors.blue200)}
      attributes={{ onClick: () => onClick(token) }}
    >
      <Box
        mr="1rem"
        width="48px"
        height="48px"
        position="relative"
      >
        <Image src={token.logo} alt={token.name} width={48} height={48} />
        <Box
          position="absolute"
          right="-4px"
          bottom="-3px"
          width="22px"
          height="22px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="100%"
          backgroundColor={useColorModeValue(colors.white, colors.blue200)}
        >
          <Image
            src={token.chain.logo_uri!}
            alt={token.chain.chain_name!}
            width={18}
            height={18}
          />
        </Box>
      </Box>
      <Box flex="1">
        <Box
          display="flex"
          justifyContent="space-between"
        >
          <Text
            fontSize="20px"
            fontWeight="600"
            lineHeight="28px"
            color={useColorModeValue(colors.blue50, colors.white)}
          >
            {token.name}
          </Text>
          <Text
            fontSize="20px"
            fontWeight="600"
            lineHeight="28px"
            color={useColorModeValue(colors.blue50, colors.white)}
          >
            {token.balance}
          </Text>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
        >
          <Text
            fontSize="14px"
            fontWeight="400"
            lineHeight="20px"
            color={useColorModeValue(colors.gray500, colors.blue700)}
          >
            on {token.chain.chain_name}
          </Text>
          <Text
            fontSize="14px"
            fontWeight="400"
            lineHeight="20px"
            color={useColorModeValue(colors.gray500, colors.blue700)}
          >
            {token.isBalanceGtZero ? '≈ ': ''}${token.value(price)}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
