import { useState, useEffect } from 'react';
import {
  useAccount,
  useDisconnect,
  useReadContracts,
  type UseReadContractsParameters
} from 'wagmi';
import { Box, Stack, NobleSelectTokenButton } from '@interchain-ui/react';
import { uusdcToUsdc } from '@/utils';
import { WalletAddress, FaqList } from '@/components/common';
import {
  sizes,
  USDC_CONTRACT_ABI,
  USDC_ETHEREUM_MAINNET,
  USDC_ARBITRUM_MAINNET,
  USDC_OPTIMISM_MAINNET,
  USDC_ARBITRUM_TESTNET,
  USDC_ETHEREUM_TESTNET,
  USDC_OPTIMISM_TESTNET
} from '@/config';
import { BalanceNotAvailable, UsdcToken } from '@/models';
import { useRouter } from 'next/router';
import { usePrice, useIsMounted } from '@/hooks';
import { BridgeStep } from '@/pages/bridge';

interface SelectTokenProps {
  setBridgeStep: (bridgeStep: BridgeStep) => void;
  setSourceChainId: (sourceChainId: string) => void;
}

export function SelectToken({ setBridgeStep, setSourceChainId }: SelectTokenProps) {
  const router = useRouter();
  const { price = 1 } = usePrice();
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const isMounted = useIsMounted();
  const [tokens, setTokens] = useState([
    USDC_ETHEREUM_MAINNET,
    USDC_OPTIMISM_MAINNET,
    // USDC_ARBITRUM_MAINNET,
    USDC_ETHEREUM_TESTNET,
    USDC_OPTIMISM_TESTNET
    // USDC_ARBITRUM_TESTNET,
  ]);

  const { data } = useReadContracts({
    contracts: tokens.map((token) => ({
      abi: USDC_CONTRACT_ABI,
      chainId: token.id as number,
      address: token.contract,
      functionName: 'balanceOf',
      args: [address]
    })) as UseReadContractsParameters['contracts']
  });

  useEffect(() => {
    if (data?.length === tokens.length) {
      setTokens(
        data.map(
          ({ result, status }, index) =>
            new UsdcToken({
              ...tokens[index],
              balance: status === 'success' ? uusdcToUsdc(result as bigint) : BalanceNotAvailable
            })
        )
      );
    }
  }, [data]);

  return (
    <>
      <Box maxWidth={sizes.main.maxWidth} mx="auto" paddingTop="84px" paddingBottom="120px">
        <Box mb="48px" fontSize="20px" fontWeight="$semibold" color="$text">
          Select token to bridge
        </Box>

        {isMounted() ? (
          <WalletAddress
            walletType="metamask"
            address={address}
            onDisconnect={() => {
              disconnect();
              router.push('/');
            }}
          />
        ) : null}

        <UsdcTokenList
          tokens={tokens}
          price={price}
          setBridgeStep={setBridgeStep}
          setSourceChainId={setSourceChainId}
        />
      </Box>

      <FaqList />
    </>
  );
}

type UsdcTokenListProps = {
  tokens: UsdcToken[];
  price?: number;
  setBridgeStep: (bridgeStep: BridgeStep) => void;
  setSourceChainId: (sourceChainId: string) => void;
};

const placeholder = '--';

function UsdcTokenList({
  tokens = [],
  price = 1,
  setBridgeStep,
  setSourceChainId
}: UsdcTokenListProps) {
  const isMounted = useIsMounted();

  return (
    <Stack direction="vertical" space="16px" attributes={{ mt: '24px' }}>
      {tokens.map((token) => (
        <NobleSelectTokenButton
          key={token.id}
          size="xl"
          token={{
            mainLogoUrl: token.logo,
            mainLogoAlt: token.name,
            subLogoUrl: token.chain.logo_uri ?? '',
            subLogoAlt: token.chain.chain_name,
            symbol: token.name,
            network: `On ${token.chain.chain_name}`,
            tokenAmount: isMounted()
              ? `${token.isBalanceNotAvailable ? placeholder : token.balance ?? placeholder}`
              : placeholder,
            notionalValue: isMounted()
              ? `${token.isBalanceGtZero ? '≈ ' : ''}${token.value(price)}`
              : '≈ 0'
          }}
          onClick={() => {
            setBridgeStep('select-amount-dest');
            setSourceChainId(token.id.toString());
          }}
        />
      ))}
    </Stack>
  );
}
