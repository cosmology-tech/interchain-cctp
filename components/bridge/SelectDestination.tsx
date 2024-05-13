import Image from 'next/image';
import { Key, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { useChains } from '@cosmos-kit/react';
import {
  Box,
  Text,
  Icon,
  useColorModeValue,
  NobleInput,
  NobleSelectNetworkButton,
  NobleButton,
  NobleChainCombobox
} from '@interchain-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { RouteResponse } from '@skip-router/core';

import { ExitIcon } from '@/components/common';
import { CHAIN_TYPE, COSMOS_CHAIN_NAMES, ChainType, colors } from '@/config';
import {
  cosmosAddressToChainId,
  getCosmosChainNameById,
  isValidCosmosAddress,
  isValidEvmAddress
} from '@/utils';
import { SkipChain, useConnectChains, useSkipChains } from '@/hooks';

interface SelectDestinationProps {
  destChain: SkipChain | null;
  setDestChain: (chain: SkipChain | null) => void;
  destAddress: string;
  setDestAddress: (address: string) => void;
  sourceChainId: string;
  route: RouteResponse | undefined;
}

export const SelectDestination = ({
  route,
  destChain,
  setDestChain,
  destAddress,
  setDestAddress,
  sourceChainId
}: SelectDestinationProps) => {
  const searchParams = useSearchParams();
  const { address: evmAddress, isConnected: isEvmWalletConnected } = useAccount();
  const { connect: wagmiConnect, connectors } = useConnect();
  const { disconnect: wagmiDisconnect } = useDisconnect();

  const { data: chains = [] } = useSkipChains();
  const cosmosChainContexts = useChains(COSMOS_CHAIN_NAMES);
  const {
    isAllConnected: isCosmosWalletConnected,
    connectAll,
    disconnectAll
  } = useConnectChains(COSMOS_CHAIN_NAMES);

  const sourceChainType = (searchParams.get('chain-type') ?? CHAIN_TYPE.EVM) as ChainType;

  const destChains = useMemo(() => {
    if (isValidEvmAddress(destAddress)) {
      return chains
        .filter((chain) => chain.chainType === CHAIN_TYPE.EVM)
        .filter((chain) => (sourceChainType === 'evm' ? chain.chainID !== sourceChainId : true));
    }
    return chains.filter((chain) => chain.chainID !== sourceChainId);
  }, [chains, destAddress, sourceChainType, sourceChainId]);

  const handleConnectWallet = () => {
    if (sourceChainType === 'evm') {
      connectAll();
    }
    if (sourceChainType === 'cosmos') {
      wagmiConnect({ connector: connectors[0] });
    }
  };

  const handleDisconnectWallet = () => {
    if (sourceChainType === 'evm') {
      disconnectAll();
    }
    if (sourceChainType === 'cosmos') {
      wagmiDisconnect();
    }
    setDestChain(null);
    setDestAddress('');
  };

  const walletInfo = useMemo(() => {
    let logoUrl = '';
    let username = '';
    let walletName = '';
    if (sourceChainType === 'evm') {
      const chainContext = Object.values(cosmosChainContexts)[0];
      walletName = chainContext.wallet?.prettyName ?? 'Keplr';
      username = chainContext.username ?? '';
      logoUrl = '/logos/keplr.svg';
    }
    if (sourceChainType === 'cosmos') {
      walletName = 'MetaMask';
      logoUrl = '/logos/metamask.svg';
    }
    return { walletName, username, logoUrl };
  }, [sourceChainType, cosmosChainContexts]);

  const handleAddressInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const address = e.target.value;
    setDestAddress(address);
    if (isValidCosmosAddress(address)) {
      const chainId = cosmosAddressToChainId(address);
      setDestChain(chains.find((chain) => chain.chainID === chainId) ?? null);
    }
  };

  const handleSelectChain = (chainId: Key) => {
    const selectedChain = destChains.find((c) => c.chainID === chainId);
    if (selectedChain) {
      setDestChain(selectedChain);
      if (!destAddress) {
        if (selectedChain.chainType === CHAIN_TYPE.COSMOS) {
          const chainName = getCosmosChainNameById(chainId.toString());
          const cosmosAddress = cosmosChainContexts[chainName].address;
          cosmosAddress && setDestAddress(cosmosAddress);
        }
        if (selectedChain.chainType === CHAIN_TYPE.EVM) {
          evmAddress && setDestAddress(evmAddress);
        }
      }
    }
  };

  const handleChangeChain = () => {
    setDestChain(null);
    setDestAddress('');
  };

  const isWalletConnected = useMemo(() => {
    if (sourceChainType === 'evm') return isCosmosWalletConnected;
    if (sourceChainType === 'cosmos') return isEvmWalletConnected;
    return false;
  }, [sourceChainType, isCosmosWalletConnected, isEvmWalletConnected]);

  const showAddrInput = useMemo(() => {
    if (isWalletConnected) return false;
    if (isValidEvmAddress(destAddress) && destChain) return false;
    return true;
  }, [isWalletConnected, destAddress, destChain]);

  const showChainCombobox = useMemo(() => {
    if (isValidEvmAddress(destAddress) && !destChain) return true;
    if (isWalletConnected && !destChain) return true;
    return false;
  }, [isWalletConnected, destAddress, destChain]);

  const showSelectedChain = useMemo(() => {
    return !!destChain && !(!isWalletConnected && isValidCosmosAddress(destAddress));
  }, [destChain, destAddress, isWalletConnected]);

  const isDestAddressValid = useMemo(() => {
    return isValidEvmAddress(destAddress) || isValidCosmosAddress(destAddress);
  }, [destAddress]);

  const usernameTextColor = useColorModeValue(colors.gray500, colors.blue600);
  const sectionTitleColor = useColorModeValue(colors.gray500, colors.blue700);

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Text
            fontSize="14px"
            fontWeight="600"
            color={sectionTitleColor}
            attributes={{ mb: showAddrInput ? '0' : '14px' }}
          >
            Destination
          </Text>

          {isWalletConnected ? (
            <Box mb="20px" display="flex" alignItems="center">
              <Image width="16" height="16" src={walletInfo.logoUrl} alt={walletInfo.walletName} />
              <Text
                fontSize="12px"
                fontWeight="400"
                color={usernameTextColor}
                attributes={{ ml: '10px', mr: '8px' }}
              >
                {walletInfo.username}
              </Text>
              <Box
                width="16px"
                height="16px"
                cursor="pointer"
                attributes={{ onClick: handleDisconnectWallet }}
              >
                <ExitIcon />
              </Box>
            </Box>
          ) : null}
        </Box>

        <Text
          fontSize="16px"
          fontWeight="600"
          color={useColorModeValue(colors.blue50, colors.white)}
          attributes={{ marginRight: '24px', transform: 'translateY(-2px)' }}
        >
          {route ? route.usdAmountOut : ''}
        </Text>
      </Box>

      {showAddrInput ? (
        <NobleInput
          id="destAddress"
          size="sm"
          intent={!destAddress ? undefined : isDestAddressValid ? 'success' : 'error'}
          placeholder="Paste address"
          value={destAddress}
          onChange={handleAddressInput}
          inputContainerProps={{
            paddingRight: '8px'
          }}
          attributes={{
            marginBottom: showChainCombobox ? '20px' : '0'
          }}
          endAddon={
            destAddress ? (
              <Box position="absolute" right="$4" top="50%" transform="translateY(-50%)">
                <NobleButton
                  variant="text"
                  onClick={() => {
                    setDestChain(null);
                    setDestAddress('');
                  }}
                >
                  <Text as="span" fontSize="$2xl" color="$textSecondary">
                    <Icon name="xCircle" />
                  </Text>
                </NobleButton>
              </Box>
            ) : (
              <NobleButton variant="solid" size="sm" onClick={handleConnectWallet}>
                Connect wallet
              </NobleButton>
            )
          }
        />
      ) : null}

      <AnimatePresence>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          {showChainCombobox ? (
            <NobleChainCombobox
              defaultIsOpen
              onSelectionChange={handleSelectChain}
              placeholder="Search network"
              styleProps={{
                width: '100%',
                marginBottom: '36px'
              }}
            >
              {destChains.map((chain) => (
                <NobleChainCombobox.Item key={chain.chainID} textValue={chain.prettyName}>
                  <Box display="flex" justifyContent="flex-start" alignItems="center" gap="13px">
                    <Box
                      as="img"
                      borderRadius="$full"
                      width="26px"
                      height="26px"
                      attributes={{
                        src: chain.logoURI,
                        alt: chain.prettyName
                      }}
                    />
                    <Text fontSize="$sm" fontWeight="$normal" color="$textSecondary">
                      {chain.prettyName}
                    </Text>
                  </Box>
                </NobleChainCombobox.Item>
              ))}
            </NobleChainCombobox>
          ) : null}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {showSelectedChain && destChain ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, height: 0 }}
          >
            <NobleSelectNetworkButton
              logoUrl={destChain.logoURI!}
              title={destChain.prettyName}
              subTitle={destAddress}
              actionLabel="Change"
              size="lg"
              onClick={handleChangeChain}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
};
