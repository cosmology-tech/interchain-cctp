// @ts-nocheck
// ==============================
// This file is for reference only
// ==============================

import { useSearchParams } from 'next/navigation';
import { useAccount, useSwitchChain } from 'wagmi';
import {
  Box,
  NobleSelectTokenButton,
  Skeleton,
  Text,
  useColorModeValue
} from '@interchain-ui/react';

import { calcDollarValue } from '@/utils';
import {
  WalletAddress,
  FaqList,
  StaggerList,
  BaseButton,
  EyeSlashIcon,
  EyeIcon
} from '@/components/common';
import {
  CHAIN_TYPE,
  CosmosWalletKey,
  DEFAULT_USDC_LOGO,
  WalletKey,
  colors,
  getChainTypeFromWalletKey,
  sizes
} from '@/config';
import {
  useUsdcPrice,
  useIsMounted,
  useSkipChains,
  useUsdcAssets,
  useUsdcBalance,
  SkipChain
} from '@/hooks';
import { BridgeStep } from '@/pages/bridge';
import { Asset } from '@skip-router/core';
import BigNumber from 'bignumber.js';
import { useMemo } from 'react';
import { useSettingsStore } from '@/contexts';

type SelectedToken = {
  chain: SkipChain;
  asset: Asset;
  balance: string;
};

interface SelectTokenProps {
  setBridgeStep: (bridgeStep: BridgeStep) => void;
  setSelectedToken: (selectedToken: SelectedToken) => void;
}

export function SelectToken({ setBridgeStep, setSelectedToken }: SelectTokenProps) {
  const searchParams = useSearchParams();
  const isMounted = useIsMounted();

  const { switchChainAsync } = useSwitchChain();
  const { chainId: connectedChainId } = useAccount();

  const { hideZeroBalances } = useSettingsStore();

  const { data: chains = [], isLoading: isChainsLoading } = useSkipChains();
  const { data: assets } = useUsdcAssets();

  const walletKey = (searchParams.get('wallet') ?? 'keplr') as WalletKey;
  const sourceChainType = getChainTypeFromWalletKey(walletKey);
  const sourceChains = chains.filter((chain) => chain.chainType === sourceChainType);

  const { data: balances } = useUsdcBalance({
    assets,
    chains: sourceChains,
    walletKey
  });

  const { data: usdcPrice } = useUsdcPrice();

  const displayedChains = useMemo(() => {
    if (!balances) return sourceChains;
    return sourceChains
      .sort((a, b) => {
        const aBalance = BigNumber(balances[a.chainID] ?? 0);
        const bBalance = BigNumber(balances[b.chainID] ?? 0);
        return bBalance.comparedTo(aBalance);
      })
      .filter((chain) => {
        return hideZeroBalances ? BigNumber(balances[chain.chainID]).gt(0) : true;
      });
  }, [balances, sourceChains, hideZeroBalances]);

  const handleSelectToken =
    (selectedChain: SkipChain, selectedAsset: Asset | undefined) => async () => {
      if (!balances || !selectedAsset) return;

      if (
        selectedChain.chainType === CHAIN_TYPE.EVM &&
        connectedChainId !== Number(selectedChain.chainID)
      ) {
        try {
          await switchChainAsync({ chainId: Number(selectedChain.chainID) });
        } catch (error) {
          console.error(error);
          return;
        }
      }

      setBridgeStep('select-amount-dest');
      setSelectedToken({
        chain: selectedChain,
        asset: selectedAsset,
        balance: balances[selectedChain.chainID]
      });
    };

  return (
    <>
      <Box maxWidth={sizes.main.maxWidth} mx="auto" paddingTop="84px" paddingBottom="120px">
        <Box mb="48px" fontSize="20px" fontWeight="$semibold" color="$text">
          Select token to bridge
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="center">
          {isMounted && <WalletAddress />}

          <BaseButton
            onPress={() => {
              useSettingsStore.setState((prev) => ({ hideZeroBalances: !prev.hideZeroBalances }));
            }}
          >
            <Box as="span" display="flex" alignItems="center" gap="9px">
              <Text
                as="span"
                color={useColorModeValue(colors.gray500, colors.blue600)}
                fontSize="12px"
                fontWeight="400"
              >
                {hideZeroBalances ? 'Show all balances' : 'Hide zero balances'}
              </Text>

              {hideZeroBalances ? <EyeIcon /> : <EyeSlashIcon />}
            </Box>
          </BaseButton>
        </Box>

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
              const usdcBalanceDisplay = balances ? balances[chain.chainID] : '--';
              const usdcBalanceNotional =
                balances && usdcPrice ? calcDollarValue(balances[chain.chainID], usdcPrice) : '';

              return (
                <NobleSelectTokenButton
                  key={`${chain.chainID}__${usdcBalanceDisplay}`}
                  size="xl"
                  token={{
                    mainLogoUrl: usdcAsset?.logoURI ?? DEFAULT_USDC_LOGO,
                    mainLogoAlt: usdcAsset?.name ?? 'USDC',
                    subLogoUrl: chain.logoURI ?? '',
                    subLogoAlt: chain.prettyName,
                    symbol: usdcAsset?.symbol ?? 'USDC',
                    network: `On ${chain.prettyName}`,
                    tokenAmount: usdcBalanceDisplay,
                    notionalValue: usdcBalanceNotional
                  }}
                  onClick={handleSelectToken(chain, usdcAsset)}
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
