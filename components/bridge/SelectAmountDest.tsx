import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useChains, useWallet } from '@cosmos-kit/react';
import { RouteResponse } from '@skip-router/core';
import { useAccount, useReadContracts, useSwitchChain } from 'wagmi';
import {
  Box,
  Stack,
  Text,
  Icon,
  useColorModeValue,
  NobleTokenAvatar,
  NoblePageTitleBar,
  NobleInput,
  NobleTxEstimate,
  NobleSelectNetworkButton,
  NobleButton,
  NobleChainCombobox
} from '@interchain-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDownIcon, ClockIcon, ExitIcon, FaqList } from '@/components/common';
import {
  colors,
  COSMOS_CHAIN_ID_TO_CHAIN_NAME,
  COSMOS_CHAIN_ID_TO_PRETTY_NAME,
  COSMOS_CHAIN_ID_TO_USDC_IBC_DENOM,
  COSMOS_CHAINS,
  getFinalityTime,
  sizes,
  USDC_CONTRACT_ABI,
  USDC_ETHEREUM_MAINNET,
  EVM_CHAIN_ID_TO_TOKEN,
  EVM_CHAINS
} from '@/config';
import { UsdcToken } from '@/models';
import {
  cosmosAddressToSkipChain,
  isValidAddress,
  isValidCosmosAddress,
  isValidEvmAddress,
  USDC_TO_UUSDC,
  uusdcToUsdc
} from '@/utils';
import { usePrice } from '@/hooks';
import { SkipChain, useSkip } from '@/skip';
import { BridgeStep } from '@/pages/bridge';

const PARTIAL_PERCENTAGES = [0.1, 0.25, 0.5, 0.8, 1.0];

function calcFeeFromRoute(route: RouteResponse, price = 1) {
  if (!route) return '0';
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 4
  }).format(((+route.amountIn - +route.amountOut) / USDC_TO_UUSDC) * price);
}

function filterChains(chains: SkipChain[], search: string) {
  if (!search.trim()) return [];
  return chains.filter((chain) => chain.chain_name!.toLowerCase().startsWith(search.toLowerCase()));
}

function getDestChainDenom(chain: SkipChain) {
  // @ts-ignore
  if (chain.chain_type === 'evm') return EVM_CHAIN_ID_TO_TOKEN[chain.chain_id!].contract;
  // @ts-ignore
  if (chain.chain_type === 'cosmos') return COSMOS_CHAIN_ID_TO_USDC_IBC_DENOM[chain.chain_id!];
}

interface SelectAmountDestProps {
  sourceChainId: string;
  setBridgeStep: (bridgeStep: BridgeStep) => void;
}

export function SelectAmountDest({ sourceChainId, setBridgeStep }: SelectAmountDestProps) {
  const skip = useSkip();

  const wallet = useWallet(); // cosmos wallet, here refers to Keplr
  const cosmos = useChains(Object.values(COSMOS_CHAIN_ID_TO_CHAIN_NAME));

  const [chains, setChains] = useState<SkipChain[]>([]);
  const [destChain, setDestChain] = useState<SkipChain | null>(null); // destination chain
  const [destChainSearch, setDestChainSearch] = useState('');
  const [destAddress, setDestAddress] = useState<string>(''); // destination address

  const [showChainCombo, setShowChainCombo] = useState(false);
  // Tracks the selected chain address button
  const [showAddrInput, setShowAddrInput] = useState(true);
  const [showAddrSelected, setShowAddrSelected] = useState(false);

  const [amount, setAmount] = useState('0');
  const [partialPercent, setPartialPercent] = useState<number | null>(null);
  const [route, setRoute] = useState<RouteResponse | null>(null);
  const [txStatus, setTxStatus] = useState<'pending' | 'success'>(); // TODO: remove later

  const [token, setToken] = useState<UsdcToken>(
    // @ts-ignore
    EVM_CHAIN_ID_TO_TOKEN[sourceChainId || '1'] ?? USDC_ETHEREUM_MAINNET
  ); // token to transfer
  const { price = 1 } = usePrice();
  const { address, chainId: connectedChainId } = useAccount();
  const { switchChainAsync } = useSwitchChain();

  const isSourceChainConnected = connectedChainId === Number(sourceChainId);

  const { data } = useReadContracts({
    contracts: [
      {
        abi: USDC_CONTRACT_ABI,
        chainId: token.id as number,
        address: token.contract,
        functionName: 'balanceOf',
        args: [address!]
      }
    ]
  });

  const balance = data?.[0].result;

  useEffect(() => {
    setToken(new UsdcToken({ ...token, balance: uusdcToUsdc(balance as bigint) }));
  }, [balance]);

  useEffect(() => {
    if (isValidEvmAddress(destAddress)) {
      setShowChainCombo(true);
      if (destChainSearch.trim()) {
        setChains(
          filterChains(
            EVM_CHAINS.filter((chain) => chain.chain_id != token.id),
            destChainSearch.trim()
          )
        );
      }
    } else if (isValidCosmosAddress(destAddress)) {
      const chain = cosmosAddressToSkipChain(destAddress);
      if (chain) {
        setDestChain(chain);
      }
    }
  }, [destAddress, destChainSearch]);

  useEffect(() => {
    if (wallet.mainWallet?.isWalletConnected) {
      setShowAddrInput(false);
      setShowChainCombo(true);
      if (destChainSearch.trim()) {
        setChains(filterChains(COSMOS_CHAINS, destChainSearch.trim()));
      }
    }
  }, [wallet.mainWallet?.isWalletConnected, destChainSearch]);

  useEffect(() => {
    if (+amount > 0 && destChain) {
      skip
        .route({
          allowMultiTx: true,
          allowUnsafe: true,
          smartRelay: true,
          amountIn: `${parseInt(String(+amount * USDC_TO_UUSDC))}`,
          sourceAssetChainID: String(token.id),
          sourceAssetDenom: token.contract!,
          destAssetChainID: destChain.chain_id!,
          // @ts-ignore
          destAssetDenom: getDestChainDenom(destChain),
          bridges: ['IBC', 'CCTP', 'HYPERLANE'],
          experimentalFeatures: ['cctp', 'hyperlane']
        })
        .then(setRoute)
        .catch(console.log);
    } else {
      setRoute(null);
    }
  }, [amount, destChain]);

  async function onTransfer() {
    if (!route || !address || !destAddress) return;

    if (!isSourceChainConnected) {
      await switchChainAsync({ chainId: Number(sourceChainId) });
    }

    const userAddresses = route.chainIDs.reduce((acc, chainID) => {
      // evm
      if (chainID == token.id) {
        acc[chainID] = address;
      } else if (/^\d+/.test(chainID)) {
        acc[chainID] = destAddress;
      } else {
        // @ts-ignore
        acc[chainID] = cosmos[COSMOS_CHAIN_ID_TO_CHAIN_NAME[chainID]].address;
      }
      return acc;
    }, {} as Record<string, string>);

    try {
      await skip.executeRoute({
        route,
        userAddresses,
        validateGasBalance: route.txsRequired === 1,
        onTransactionTracked: async (tx) => {
          console.log('onTransactionTracked:', tx);
        },
        onTransactionBroadcast: async (tx) => {
          setTxStatus('pending');
          console.log('onTransactionBroadcast:', tx);
        },
        onTransactionCompleted: async (tx) => {
          setTxStatus('success');
          setTimeout(() => {
            setTxStatus(undefined);
          }, 10000);
          console.log('onTransactionCompleted:', tx);
        }
      });
      // setBridgeStep('sign-tx');
    } catch (e) {
      console.error('Error:', e);
    }
  }

  function onAmountButtonClick(amount: number, max: boolean, selectedPartialPercent: number) {
    setPartialPercent(selectedPartialPercent);
    setAmount(max ? token.balance : String(amount));
  }

  function onChainSelect(chain: SkipChain) {
    setChains([]);
    setDestChain(chain);
    setShowAddrInput(false);
    setShowChainCombo(false);
    setShowAddrSelected(true);
    if (!destAddress) {
      setDestAddress(cosmos[COSMOS_CHAIN_ID_TO_CHAIN_NAME[chain.chain_id]].address);
    }
  }

  function onChangeChain() {
    if (destChain?.chain_type === 'cosmos') {
      setShowChainCombo(true);
      setShowAddrSelected(false);
      setChains([]);
      setDestChain(null);
      setDestAddress('');
      setDestChainSearch('');
    }
    if (destChain?.chain_type === 'evm') {
      setShowAddrInput(true);
      setShowChainCombo(true);
      setShowAddrSelected(false);
      setChains([]);
      setDestChain(null);
      setDestChainSearch('');
    }
  }

  const KeplrAccount = (
    <Box mb="16px" display="flex" alignItems="center">
      <Image width="16" height="16" src={'/logos/keplr.svg'} alt="Keplr" />
      <Text
        fontSize="12px"
        fontWeight="400"
        color={useColorModeValue(colors.gray500, colors.blue600)}
        attributes={{ ml: '10px', mr: '8px' }}
      >
        {cosmos.cosmoshub.username}
      </Text>
      <Box
        width="16px"
        height="16px"
        cursor="pointer"
        attributes={{
          onClick: () => {
            cosmos.cosmoshub?.disconnect();
            wallet.mainWallet?.disconnect();
            // setChains([])
            // setDestChain(null);
            // setDestAddress("");
            // setDestChainSearch("");
            // setShowChainCombo(false);
            setShowAddrInput(true);
            setShowAddrSelected(false);
          }
        }}
      >
        <ExitIcon />
      </Box>
    </Box>
  );

  const shouldShowPartialButtons = isNaN(+token.balance) ? false : +token.balance > 0;

  const chainWalletAddress = wallet.mainWallet?.getChainWallet('cosmoshub')?.address ?? '';

  const shouldShowEstimates = !!route && !!destChain && !!address;

  return (
    <>
      <Box maxWidth={sizes.main.maxWidth} mx="auto" paddingTop="84px" paddingBottom="120px">
        <NoblePageTitleBar
          title="Select amount and destination"
          onBackButtonClick={() => setBridgeStep('select-token')}
          mb="$14"
        />

        <NobleInput
          id="token-amount"
          size="md"
          label="Select amount"
          placeholder="Enter amount"
          value={amount}
          type="number"
          onChange={(e) => {
            setAmount(e.target.value);
          }}
          inputTextAlign="right"
          startAddon={
            <Box display="flex" gap="$8">
              <NobleTokenAvatar
                mainLogoUrl={token.logo ?? ''}
                mainLogoAlt={token.name}
                subLogoUrl={token.chain.logo_uri ?? ''}
                subLogoAlt={token.chain.chain_name}
              />

              <Box display="flex" flexDirection="column">
                <Text as="span" color="$text" fontSize="$xl" fontWeight="$semibold">
                  {token.name}
                </Text>
                <Text as="span" color="$textSecondary" fontSize="$sm" fontWeight="$normal">
                  On {token.chain.chain_name}
                </Text>
              </Box>
            </Box>
          }
          labelContainerProps={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
          labelExtra={
            shouldShowPartialButtons ? (
              <Stack space="$4">
                {PARTIAL_PERCENTAGES.map((percent, index) => {
                  const amount = +token.balance * percent;
                  const isMax = index === PARTIAL_PERCENTAGES.length - 1;

                  return (
                    <NobleButton
                      key={percent}
                      variant="tag"
                      size="xs"
                      isActive={partialPercent === percent}
                      onClick={() => onAmountButtonClick(amount, isMax, percent)}
                    >
                      {isMax ? 'Max' : `${amount}`}
                    </NobleButton>
                  );
                })}
              </Stack>
            ) : null
          }
          helperText={
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box display="flex" alignItems="center" justifyContent="center" gap="$6">
                <Text color="$textSecondary" fontSize="$sm" fontWeight="$normal">
                  Available: {uusdcToUsdc(balance as bigint)}
                </Text>

                {+amount > +token.balance ? (
                  <Text color="$textWarning" fontSize="$sm" fontWeight="$normal">
                    Insufficient balance
                  </Text>
                ) : null}
              </Box>

              <Text color="$textSecondary" fontSize="$sm" fontWeight="$normal">
                {+token.balance > 0 ? '≈' : ''} ${token.value(price)}
              </Text>
            </Box>
          }
        />

        <Box my="12px" display="flex" alignItems="center" justifyContent="center">
          <ArrowDownIcon />
        </Box>

        <Box>
          <Box
            mb="12px"
            display="flex"
            fontSize="14px"
            fontWeight="600"
            lineHeight="20px"
            justifyContent="space-between"
            color={useColorModeValue(colors.gray500, colors.blue700)}
          >
            <Text fontSize="20px" fontWeight="600" attributes={{ marginRight: '20px' }}>
              {address && destChain && route ? uusdcToUsdc(route.amountOut) : ''}
            </Text>
          </Box>

          {wallet.mainWallet?.isWalletConnected ? KeplrAccount : null}

          {showAddrInput ? (
            <NobleInput
              id="destAddress"
              size="sm"
              label="Destination"
              intent={wallet.mainWallet?.isWalletConnected ? 'success' : undefined}
              readonly={wallet.mainWallet?.isWalletConnected && !!chainWalletAddress}
              placeholder="Paste address"
              value={wallet.mainWallet?.isWalletConnected ? chainWalletAddress : destAddress}
              onChange={(e) => {
                setDestAddress(e.target.value);
              }}
              inputContainerProps={{
                // Space for the connect button
                paddingRight: !!chainWalletAddress
                  ? '8px'
                  : wallet.mainWallet?.isWalletConnected
                  ? '150px'
                  : '8px'
              }}
              endAddon={
                destAddress ? (
                  <Box position="absolute" right="$4" top="50%" transform="translateY(-50%)">
                    <NobleButton
                      variant="text"
                      onClick={() => {
                        // Clear address input
                        setDestAddress('');
                        setShowChainCombo(false);
                      }}
                    >
                      <Text as="span" fontSize="$2xl" color="$textSecondary">
                        <Icon name="xCircle" />
                      </Text>
                    </NobleButton>
                  </Box>
                ) : !wallet.mainWallet?.isWalletConnected ? (
                  <NobleButton
                    variant="solid"
                    size="sm"
                    onClick={() => {
                      cosmos.cosmoshub.connect();
                    }}
                  >
                    Connect wallet
                  </NobleButton>
                ) : null
              }
            />
          ) : null}

          <AnimatePresence>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {showChainCombo && !showAddrSelected ? (
                <NobleChainCombobox
                  defaultIsOpen
                  onSelectionChange={(chainId) => {
                    const selectedChain = COSMOS_CHAINS.find((c) => c.chain_id === chainId);
                    if (selectedChain) {
                      onChainSelect(selectedChain);
                    }
                  }}
                  styleProps={{
                    width: '100%'
                  }}
                >
                  {COSMOS_CHAINS.map((chain) => (
                    <NobleChainCombobox.Item key={chain.chain_id} textValue={chain.chain_name}>
                      <Box
                        display="flex"
                        justifyContent="flex-start"
                        alignItems="center"
                        gap="13px"
                      >
                        <Box
                          as="img"
                          borderRadius="$full"
                          width="26px"
                          height="26px"
                          attributes={{
                            src: chain.logo_uri!,
                            alt: chain.chain_name
                          }}
                        />
                        <Text fontSize="$sm" fontWeight="$normal" color="$textSecondary">
                          {COSMOS_CHAIN_ID_TO_PRETTY_NAME[chain.chain_id] ?? chain.chain_name}
                        </Text>
                      </Box>
                    </NobleChainCombobox.Item>
                  ))}
                </NobleChainCombobox>
              ) : null}
            </motion.div>
          </AnimatePresence>

          <AnimatePresence>
            {showAddrSelected ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, height: 0 }}
              >
                <NobleSelectNetworkButton
                  logoUrl={destChain?.logo_uri!}
                  title={
                    COSMOS_CHAIN_ID_TO_PRETTY_NAME[destChain?.chain_id] ?? destChain?.chain_name
                  }
                  subTitle={cosmos[COSMOS_CHAIN_ID_TO_CHAIN_NAME[destChain?.chain_id!]]?.address!}
                  actionLabel="Change"
                  size="lg"
                  onClick={() => {
                    onChangeChain();
                  }}
                />
              </motion.div>
            ) : null}
          </AnimatePresence>

          <NobleButton
            variant="solid"
            size="lg"
            attributes={{
              marginTop: '20px'
            }}
            onClick={() => onTransfer()}
            disabled={
              !route || !destAddress || !isValidAddress(destAddress) || +amount > +token.balance
            }
          >
            Bridge
          </NobleButton>

          <Box
            mt="1rem"
            display="flex"
            alignItems="center"
            visibility={destChain ? 'visible' : 'hidden'}
          >
            <Image
              width={18}
              height={18}
              src={token.chain.logo_uri!}
              alt={token.chain.chain_name!}
            />
            <Text
              color={useColorModeValue(colors.gray500, colors.blue700)}
              attributes={{ mx: '5px' }}
            >
              →
            </Text>

            {destChain ? (
              <Box
                width={18}
                height={18}
                display="flex"
                overflow="hidden"
                borderRadius="10px"
                alignItems="center"
                justifyContent="center"
              >
                <Image
                  width={18}
                  height={18}
                  src={destChain?.logo_uri!}
                  alt={destChain?.chain_name!}
                />
              </Box>
            ) : null}

            <Box ml="12px" display="flex" alignItems="center">
              <ClockIcon />
              <Text
                fontSize="14px"
                fontWeight="400"
                lineHeight="20px"
                attributes={{ ml: '5px' }}
                color={useColorModeValue(colors.gray500, colors.blue700)}
              >
                ≈ {getFinalityTime(token.id)}
              </Text>
            </Box>

            <Box
              display="flex"
              flex="1"
              justifyContent="right"
              visibility={route ? 'visible' : 'hidden'}
            >
              <Text
                color={useColorModeValue(colors.gray500, colors.blue700)}
                fontSize="14px"
                fontWeight="400"
                lineHeight="20px"
              >
                ${calcFeeFromRoute(route!, price)} Fee
              </Text>
            </Box>
          </Box>
        </Box>

        {/* TODO: remove later */}
        {txStatus && (
          <Box textAlign="center" mt="$12">
            <Text>
              Tx Status: <Text as="span">{txStatus.toUpperCase()}</Text>
            </Text>
          </Box>
        )}
      </Box>

      <FaqList />
    </>
  );
}
