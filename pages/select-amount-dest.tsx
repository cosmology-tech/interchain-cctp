import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useChains, useWallet } from "@cosmos-kit/react";
import { useSearchParams } from "next/navigation";
import { RouteResponse } from "@skip-router/core";
import { useAccount, useReadContract } from "wagmi";
import { Box, Text, useColorModeValue } from "@interchain-ui/react";
import {
  ArrowDownIcon,
  BackButton,
  ClockIcon,
  CloseIcon,
  ConnectWalletButton,
  ExitIcon,
  Layout,
  PrimaryButton,
  SearchIcon,
  FaqList,
} from "@/components/common";
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
  USDC_EVM_MAINNET,
  USDC_EVM_MAINNET_CHAINS,
} from "@/config";
import { UsdcToken } from "@/models";
import {
  cosmosAddressToSkipChain,
  isValidAddress,
  isValidCosmosAddress,
  isValidEvmAddress,
  USDC_TO_UUSDC,
  uusdcToUsdc,
} from "@/utils";
import { usePrice } from "@/hooks";
import { SkipChain, SkipChains, useSkip } from "@/skip";

function calcFeeFromRoute(route: RouteResponse, price = 1) {
  if (!route) return "0";
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 4,
  }).format(((+route.amountIn - +route.amountOut) / USDC_TO_UUSDC) * price);
}

function filterChains(chains: SkipChain[], search: string) {
  if (!search.trim()) return [];
  return chains.filter((chain) =>
    chain.chain_name!.toLowerCase().startsWith(search.toLowerCase())
  );
}

function getDestChainDenom(chain: SkipChain) {
  // @ts-ignore
  if (chain.chain_type === "evm")
    return USDC_EVM_MAINNET[chain.chain_id!].contract;
  // @ts-ignore
  if (chain.chain_type === "cosmos")
    return COSMOS_CHAIN_ID_TO_USDC_IBC_DENOM[chain.chain_id!];
}

export default function SelectAmountPage() {
  const skip = useSkip();
  const router = useRouter();
  const searchParams = useSearchParams();
  const wallet = useWallet(); // cosmos wallet, here refers to Keplr
  const cosmos = useChains(Object.values(COSMOS_CHAIN_ID_TO_CHAIN_NAME));

  const [chains, setChains] = useState<SkipChain[]>([]);
  const [destChain, setDestChain] = useState<SkipChain | null>(null); // destination chain
  const [destChainSearch, setDestChainSearch] = useState("");
  const [destAddress, setDestAddress] = useState<string>(""); // destination address

  const [showChainCombo, setShowChainCombo] = useState(false);
  const [showAddrInput, setShowAddrInput] = useState(true);
  const [showAddrSelected, setShowAddrSelected] = useState(false);

  const [amount, setAmount] = useState("0");
  const [route, setRoute] = useState<RouteResponse | null>(null);

  const [token, setToken] = useState<UsdcToken>(
    // @ts-ignore
    USDC_EVM_MAINNET[searchParams.get("source_chain_id") || "1"] ??
      USDC_ETHEREUM_MAINNET
  ); // token to transfer
  const { price = 1 } = usePrice();
  const { address } = useAccount();

  const { data: balance } = useReadContract({
    abi: USDC_CONTRACT_ABI,
    chainId: token.id,
    address: token.contract,
    functionName: "balanceOf",
    args: [address],
  });

  useEffect(() => {
    setToken(
      new UsdcToken({ ...token, balance: uusdcToUsdc(balance as bigint) })
    );
  }, [balance]);

  useEffect(() => {
    if (isValidEvmAddress(destAddress)) {
      setShowChainCombo(true);
      if (destChainSearch.trim()) {
        setChains(
          filterChains(
            USDC_EVM_MAINNET_CHAINS.filter(
              (chain) => chain.chain_id != token.id
            ),
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
          bridges: ["IBC", "CCTP", "HYPERLANE"],
          experimentalFeatures: ["cctp", "hyperlane"],
        })
        .then(setRoute)
        .catch(console.log);
    } else {
      setRoute(null);
    }
  }, [amount, destChain]);

  async function onTransfer() {
    if (!route || !address || !destAddress) return;
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
      skip.executeRoute({
        route,
        userAddresses,
        onTransactionTracked: async (txStatus) => {
          console.log("Transaction status:", txStatus);
        },
      });
      router.push("/sign-in-metamask");
    } catch (e) {
      console.error("Error:", e);
    }
  }

  function onAmountButtonClick(amount: number, max: boolean) {
    setAmount(max ? token.balance : String(amount));
  }

  function onChainSelect(chain: SkipChain) {
    setChains([]);
    setDestChain(chain);
    setShowAddrInput(false);
    setShowChainCombo(false);
    setShowAddrSelected(true);
    if (!destAddress) {
      setDestAddress(
        cosmos[COSMOS_CHAIN_ID_TO_CHAIN_NAME[chain.chain_id]].address
      );
    }
  }

  function onChangeChain() {
    if (destChain?.chain_type === "cosmos") {
      setShowChainCombo(true);
      setShowAddrSelected(false);
      setChains([]);
      setDestChain(null);
      setDestAddress("");
      setDestChainSearch("");
    }
    if (destChain?.chain_type === "evm") {
      setShowAddrInput(true);
      setShowChainCombo(true);
      setShowAddrSelected(false);
      setChains([]);
      setDestChain(null);
      setDestChainSearch("");
    }
  }

  const KeplrAccount = (
    <Box mb="16px" display="flex" alignItems="center">
      <Image width="16" height="16" src={"/logos/keplr.svg"} alt="Keplr" />
      <Text
        fontSize="12px"
        fontWeight="400"
        color={useColorModeValue(colors.gray500, colors.blue600)}
        attributes={{ ml: "10px", mr: "8px" }}
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
          },
        }}
      >
        <ExitIcon />
      </Box>
    </Box>
  );

  return (
    <Layout>
      <Box
        maxWidth={sizes.main.maxWidth}
        mx="auto"
        paddingTop="84px"
        paddingBottom="120px"
      >
        <Box
          mb="2.5rem"
          gap="1rem"
          display="flex"
          alignItems="center"
          color={useColorModeValue(colors.blue50, colors.white)}
        >
          <BackButton onClick={() => router.push("/select-token")} />
          <Text fontSize="20px" fontWeight="600" lineHeight="28px">
            Select amount and destination
          </Text>
        </Box>
        <Box
          mb="1rem"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text
            fontSize="14px"
            fontWeight="600"
            lineHeight="20px"
            color={useColorModeValue(colors.gray500, colors.blue700)}
          >
            Amount
          </Text>
          {+token.balance > 0 ? (
            <Box gap="10px" display="flex">
              <AmountButton
                amount={+token.balance * 0.1}
                onClick={onAmountButtonClick}
              />
              <AmountButton
                amount={+token.balance * 0.25}
                onClick={onAmountButtonClick}
              />
              <AmountButton
                amount={+token.balance * 0.5}
                onClick={onAmountButtonClick}
              />
              <AmountButton
                amount={+token.balance * 0.8}
                onClick={onAmountButtonClick}
              />
              <AmountButton
                amount={+token.balance * 1.0}
                onClick={onAmountButtonClick}
                maxText={"Max"}
              />
            </Box>
          ) : null}
        </Box>
        <TokenAmountInput token={token} value={amount} onChange={setAmount} />
        <Box
          mt="12px"
          display="flex"
          alignItems="end"
          justifyContent="space-between"
        >
          <Text
            color={useColorModeValue(colors.gray500, colors.blue700)}
            fontSize="14px"
            fontWeight="400"
            lineHeight="20px"
          >
            Available: {uusdcToUsdc(balance as bigint)}
          </Text>
          {+amount > +token.balance ? (
            <Text color="$red500" fontSize="12px" fontWeight="400">
              Insufficient balance
            </Text>
          ) : null}
          <Text
            color={useColorModeValue(colors.gray500, colors.blue700)}
            fontSize="14px"
            fontWeight="400"
            lineHeight="20px"
          >
            {+token.balance > 0 ? "≈" : ""} ${token.value(price)}
          </Text>
        </Box>
        <Box
          my="12px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
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
            Destination
            <Text
              fontSize="20px"
              fontWeight="600"
              attributes={{ marginRight: "20px" }}
            >
              {address && destChain && route
                ? uusdcToUsdc(route.amountOut)
                : ""}
            </Text>
          </Box>
          {wallet.mainWallet?.isWalletConnected ? KeplrAccount : null}
          {showAddrInput ? (
            <AddressInput
              value={destAddress}
              onClear={() => {
                setDestAddress("");
                setShowChainCombo(false);
              }}
              onChange={setDestAddress}
              onConnect={() => cosmos.cosmoshub.connect()}
              isConnected={wallet.mainWallet?.isWalletConnected}
            />
          ) : null}
          {showAddrSelected ? (
            <Box mt="12px">
              <AddressSelected
                logo={destChain?.logo_uri!}
                name={
                  COSMOS_CHAIN_ID_TO_PRETTY_NAME[destChain?.chain_id] ??
                  destChain?.chain_name
                }
                addr={
                  cosmos[COSMOS_CHAIN_ID_TO_CHAIN_NAME[destChain?.chain_id]]
                    ?.address || destAddress
                }
                onChange={onChangeChain}
              />
            </Box>
          ) : null}

          {showChainCombo ? (
            <Box mt="12px">
              <ChainCombo
                value={destChainSearch}
                chains={chains}
                onSelect={onChainSelect}
                onChange={setDestChainSearch}
              />
            </Box>
          ) : null}

          <PrimaryButton
            mt="1rem"
            disabled={
              !route ||
              !destAddress ||
              !isValidAddress(destAddress) ||
              +amount > +token.balance
            }
            onClick={onTransfer}
          >
            Bridge
          </PrimaryButton>
          <Box
            mt="1rem"
            display="flex"
            alignItems="center"
            visibility={destChain ? "visible" : "hidden"}
          >
            <Image
              width={18}
              height={18}
              src={token.chain.logo_uri!}
              alt={token.chain.chain_name!}
            />
            <Text
              color={useColorModeValue(colors.gray500, colors.blue700)}
              attributes={{ mx: "5px" }}
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
                attributes={{ ml: "5px" }}
                color={useColorModeValue(colors.gray500, colors.blue700)}
              >
                ≈ {getFinalityTime(token.id)}
              </Text>
            </Box>

            <Box
              display="flex"
              flex="1"
              justifyContent="right"
              visibility={route ? "visible" : "hidden"}
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
      </Box>

      <FaqList />
    </Layout>
  );
}

type AmountButtonProps = {
  amount: number;
  maxText?: string;
  onClick?: (amount: number, max: boolean) => void;
};

function AmountButton({
  amount,
  maxText,
  onClick = () => {},
}: AmountButtonProps) {
  return (
    <Box
      px="8px"
      py="4px"
      minWidth="40px"
      cursor="pointer"
      textAlign="center"
      borderRadius="4px"
      backgroundColor={useColorModeValue(colors.gray700, colors.blue300)}
      attributes={{ onClick: () => onClick(amount, !!maxText) }}
    >
      <Text
        fontSize="14px"
        fontWeight="600"
        lineHeight="20px"
        color={useColorModeValue(colors.gray400, colors.blue700)}
      >
        {maxText ? maxText : amount}
      </Text>
    </Box>
  );
}

type TokenAmountInputProps = {
  token: UsdcToken;
  value?: string;
  onChange?: (value: string) => void;
};

function TokenAmountInput({
  token,
  value = "0",
  onChange = () => {},
}: TokenAmountInputProps) {
  return (
    <Box
      px="20px"
      height="96px"
      display="flex"
      alignItems="center"
      borderWidth="1px"
      borderStyle="solid"
      borderRadius="8px"
      borderColor={useColorModeValue(colors.border.light, colors.border.dark)}
      backgroundColor={useColorModeValue(colors.white, colors.blue200)}
    >
      <Box mr="1rem" width="48px" height="48px" position="relative">
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
        <Box display="flex">
          <Text
            fontSize="20px"
            fontWeight="600"
            lineHeight="28px"
            color={useColorModeValue(colors.blue50, colors.white)}
          >
            {token.name}
          </Text>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Text
            fontSize="14px"
            fontWeight="400"
            lineHeight="20px"
            color={useColorModeValue(colors.gray500, colors.blue700)}
          >
            on {token.chain.chain_name}
          </Text>
        </Box>
      </Box>
      <Box display="flex" alignItems="center" maxWidth="250px">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            fontSize: "24px",
            fontWeight: "600",
            textAlign: "right",
            border: "none",
            outline: "none",
            maxWidth: "250px",
            appearance: "none",
            backgroundColor: "transparent",
            color: useColorModeValue(colors.blue50, colors.white),
          }}
        />
      </Box>
    </Box>
  );
}

type AddressInputProps = {
  value?: string;
  onClear?: () => void;
  onChange?: (value: string) => void;
  onConnect?: () => void;
  isConnected?: boolean;
};

function AddressInput({
  value = "",
  isConnected = false,
  onClear = () => {},
  onChange = () => {},
  onConnect = () => {},
}: AddressInputProps) {
  return (
    <Box
      pl="1rem"
      height="54px"
      display="flex"
      position="relative"
      alignItems="center"
      borderWidth="1px"
      borderStyle="solid"
      borderRadius="8px"
      borderColor={useColorModeValue(colors.border.light, colors.border.dark)}
      backgroundColor={useColorModeValue(colors.white, colors.blue200)}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste address"
        style={{
          fontSize: "14px",
          fontWeight: "400",
          lineHeight: "20px",
          minWidth: "360px",
          border: "none",
          outline: "none",
          maxWidth: "250px",
          appearance: "none",
          paddingTop: "0.5rem",
          paddingBottom: "0.5rem",
          backgroundColor: "transparent",
          color: useColorModeValue(colors.gray500, colors.blue700),
        }}
      />
      {value ? (
        <Box
          position="absolute"
          top="17px"
          right="1rem"
          cursor="pointer"
          attributes={{ onClick: onClear }}
        >
          <CloseIcon />
        </Box>
      ) : isConnected ? null : (
        <ConnectWalletButton onClick={() => onConnect()} />
      )}
    </Box>
  );
}

type AddressSelectedProps = {
  logo: string;
  name: string;
  addr: string;
  onChange: () => void;
};

function AddressSelected({
  logo,
  name,
  addr,
  onChange = () => {},
}: AddressSelectedProps) {
  return (
    <Box
      px="14px"
      height="64px"
      borderRadius="8px"
      display="flex"
      alignItems="center"
      borderStyle="solid"
      borderWidth="1px"
      borderColor={useColorModeValue(colors.border.light, colors.border.dark)}
      backgroundColor={useColorModeValue(colors.white, colors.blue300)}
    >
      <Box
        width="26"
        height="26"
        display="flex"
        alignItems="center"
        justifyContent="center"
        overflow="hidden"
        borderRadius="100%"
      >
        <Image width={26} height={26} src={logo} alt={name} />
      </Box>
      <Box flex="1" ml="12px">
        <Box
          fontSize="14px"
          fontWeight="600"
          lineHeight="20px"
          color={useColorModeValue(colors.gray50, colors.blue700)}
        >
          {name}
        </Box>
        <Box
          fontSize="10px"
          fontWeight="400"
          lineHeight="14px"
          color={useColorModeValue(colors.gray500, colors.blue700)}
        >
          {addr}
        </Box>
      </Box>
      <Box
        fontSize="12px"
        fontWeight="500"
        cursor="pointer"
        color={colors.gray600}
        attributes={{ onClick: onChange }}
      >
        Change
      </Box>
    </Box>
  );
}

type ChainComboProps = {
  value?: string;
  chains?: SkipChain[];
  onChange?: (value: string) => void;
  onSelect?: (chain: SkipChain) => void;
};

export function ChainCombo({
  value = "",
  chains = [],
  onChange = () => {},
  onSelect = () => {},
}: ChainComboProps) {
  const color = useColorModeValue(colors.gray500, colors.blue700);

  const Chains = (
    <Box
      py="10px"
      maxHeight="220px"
      overflow="auto"
      borderTopWidth="1px"
      borderTopStyle="solid"
      borderTopColor={useColorModeValue(
        colors.border.light,
        colors.border.dark
      )}
    >
      {chains.map((chain) => (
        <Box
          px="18px"
          py="7px"
          cursor="pointer"
          key={chain.chain_id}
          display="flex"
          alignItems="center"
          attributes={{ onClick: () => onSelect(chain) }}
        >
          <Box
            width={26}
            height={26}
            display="flex"
            overflow="hidden"
            borderRadius="100%"
          >
            <Image
              width={26}
              height={26}
              src={chain.logo_uri!}
              alt={chain.chain_name!}
            />
          </Box>
          <Box ml="12px" color={color}>
            {COSMOS_CHAIN_ID_TO_PRETTY_NAME[chain.chain_id] ?? chain.chain_name}
          </Box>
        </Box>
      ))}
    </Box>
  );

  return (
    <Box
      borderRadius="8px"
      borderWidth="1xp"
      borderStyle="solid"
      borderColor={useColorModeValue(colors.border.light, colors.border.dark)}
      backgroundColor={useColorModeValue(colors.white, colors.blue200)}
    >
      <Box px="12px" height="52px" display="flex" alignItems="center">
        <SearchIcon />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search network"
          style={{
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "20px",
            minWidth: "360px",
            border: "none",
            outline: "none",
            appearance: "none",
            paddingTop: "0.5rem",
            paddingLeft: "0.5rem",
            paddingBottom: "0.5rem",
            backgroundColor: "transparent",
            color: useColorModeValue(colors.gray500, colors.blue700),
          }}
        />
      </Box>
      {chains.length ? Chains : null}
    </Box>
  );
}
