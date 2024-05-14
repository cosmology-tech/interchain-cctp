import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import { useAccount, useDisconnect } from 'wagmi';
import { Box, NobleSelectTokenButton, Skeleton } from '@interchain-ui/react';

import { calcDollarValue } from '@/utils';
import { WalletAddress, FaqList, StaggerList } from '@/components/common';
import { CHAIN_TYPE, DEFAULT_USDC_LOGO, sizes } from '@/config';
import { useUsdcPrice, useIsMounted, useSkipChains, useUsdcAssets, useUsdcBalances } from '@/hooks';
import { BridgeStep, SelectedToken } from '@/pages/bridge';

interface SelectTokenProps {
  setBridgeStep: (bridgeStep: BridgeStep) => void;
  setSelectedToken: (selectedToken: SelectedToken) => void;
}

// TODO: switch to the network that's selected in metamask
export function SelectToken({ setBridgeStep, setSelectedToken }: SelectTokenProps) {
  const router = useRouter();
  const { address: evmAddress } = useAccount();
  const searchParams = useSearchParams();
  const { disconnect } = useDisconnect();
  const isMounted = useIsMounted();

  const { data: chains = [], isLoading: isChainsLoading } = useSkipChains();
  const { data: assets } = useUsdcAssets();

  const sourceChainType = searchParams.get('chain_type') ?? CHAIN_TYPE.EVM;
  const displayedChains = chains.filter((chain) => chain.chainType === sourceChainType);

  const { data: balances } = useUsdcBalances({ chains: displayedChains, assets });
  const { data: usdcPrice } = useUsdcPrice();

  return (
    <>
      <Box maxWidth={sizes.main.maxWidth} mx="auto" paddingTop="84px" paddingBottom="120px">
        <Box mb="48px" fontSize="20px" fontWeight="$semibold" color="$text">
          Select token to bridge
        </Box>

        {isMounted ? (
          <WalletAddress
            walletType={sourceChainType === 'cosmos' ? 'keplr' : 'metamask'}
            address={sourceChainType === 'cosmos' ? '' : evmAddress}
            onDisconnect={() => {
              disconnect();
              router.push('/');
            }}
          />
        ) : null}

        {isChainsLoading ? (
          <Skeleton width="$full" height="$20" mt="24px" borderRadius="$md" />
        ) : (
          <StaggerList
            numItems={displayedChains.length}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              marginTop: '24px'
            }}
          >
            {displayedChains.map((chain) => {
              const usdcAsset = assets?.[chain.chainID];
              return (
                <NobleSelectTokenButton
                  key={chain.chainID}
                  size="xl"
                  token={{
                    mainLogoUrl: usdcAsset?.logoURI ?? DEFAULT_USDC_LOGO,
                    mainLogoAlt: usdcAsset?.name ?? 'USDC',
                    subLogoUrl: chain.logoURI ?? '',
                    subLogoAlt: chain.prettyName,
                    symbol: usdcAsset?.symbol ?? 'USDC',
                    network: `On ${chain.prettyName}`,
                    tokenAmount: balances ? balances[chain.chainID] : '--',
                    notionalValue:
                      balances && usdcPrice
                        ? calcDollarValue(balances[chain.chainID], usdcPrice)
                        : ''
                  }}
                  onClick={() => {
                    if (!balances || !usdcAsset) return;
                    setBridgeStep('select-amount-dest');
                    setSelectedToken({
                      chain,
                      asset: usdcAsset,
                      balance: balances[chain.chainID]
                    });
                  }}
                />
              );
            })}
          </StaggerList>
        )}
      </Box>

      <FaqList />
    </>
  );
}
