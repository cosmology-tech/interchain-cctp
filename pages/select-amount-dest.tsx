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
} from "@/components/common";
import {
  colors,
  COSMOS_CHAIN_ID_TO_CHAIN_NAME,
  COSMOS_CHAIN_ID_TO_USDC_IBC_DENOM,
  getFinalityTime,
  sizes,
  USDC_CONTRACT_ABI,
  USDC_ETHEREUM_MAINNET,
  USDC_EVM_MAINNET,
} from "@/config";
import { UsdcToken } from "@/models";
import {
  cosmosAddressToSkipChain,
  isValidAddress,
  USDC_TO_UUSDC,
  uusdcToUsdc,
} from "@/utils";
import { usePrice } from "@/hooks";
import { SkipChain, useSkip } from "@/skip";

function calcFeeFromRoute(route: RouteResponse, price = 1) {
  if (!route) return "0";
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 4,
  }).format((+route.amountIn - +route.amountOut) / USDC_TO_UUSDC * price);
}

export default function SelectAmount() {
  const skip = useSkip();
  const router = useRouter();
  const searchParams = useSearchParams();
  const wallet = useWallet(); // cosmos wallet, here refers to Keplr
  const cosmos = useChains(Object.values(COSMOS_CHAIN_ID_TO_CHAIN_NAME));

  const [destChain, setDestChain] = useState<SkipChain | null>(null); // destination chain
  const [destAddress, setDestAddress] = useState<string>(""); // destination address
  const [amount, setAmount] = useState("0");
  const [route, setRoute] = useState<RouteResponse | null>(null);

  const [token, setToken] = useState<UsdcToken>(
    // @ts-ignore
    USDC_EVM_MAINNET[searchParams.get("source_chain_id") || "1"] ??
      USDC_ETHEREUM_MAINNET,
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
      new UsdcToken({ ...token, balance: uusdcToUsdc(balance as bigint) }),
    );
  }, [balance]);

  useEffect(() => {
    const chain = cosmosAddressToSkipChain(destAddress);
    setDestChain(chain ? chain : null);
  }, [destAddress]);

  useEffect(() => {
    if (+amount > 0 && destChain) {
      skip.route({
        allowMultiTx: true,
        amountIn: `${parseInt(String(+amount * USDC_TO_UUSDC))}`,
        sourceAssetChainID: String(token.id),
        sourceAssetDenom: token.contract!,
        destAssetChainID: destChain.chain_id!,
        // @ts-ignore
        destAssetDenom: COSMOS_CHAIN_ID_TO_USDC_IBC_DENOM[destChain.chain_id!],
        bridges: ["IBC", "CCTP", "HYPERLANE"],
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
      if (chainID == token.id) return { ...acc, [chainID]: address };

      if (typeof +chainID === "number") {
        return { ...acc, [chainID]: destAddress };
      }
      // cosmos
      return {
        ...acc,
        [chainID]: cosmos[COSMOS_CHAIN_ID_TO_CHAIN_NAME[chainID]].address,
      };
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

  const KeplrAccount = (
    <Box mb="16px" display="flex" alignItems="center">
      <Image
        width="16"
        height="16"
        src={"/logos/keplr.svg"}
        alt="Keplr"
      />
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
            wallet.mainWallet?.disconnect();
            cosmos.cosmoshub.disconnect();
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
        minHeight="50rem"
        maxWidth={sizes.main.maxWidth}
        mx="auto"
        mt="3.5rem"
      >
        <Box
          mb="2.5rem"
          gap="1rem"
          display="flex"
          alignItems="center"
          color={useColorModeValue(colors.blue50, colors.white)}
        >
          <BackButton onClick={() => router.push("/select-token")} />
          <Text
            fontSize="20px"
            fontWeight="600"
            lineHeight="28px"
          >
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
          {+token.balance > 0
            ? (
              <Box
                gap="10px"
                display="flex"
              >
                <AmountButton
                  amount={+token.balance * 0.10}
                  onClick={onAmountButtonClick}
                />
                <AmountButton
                  amount={+token.balance * 0.25}
                  onClick={onAmountButtonClick}
                />
                <AmountButton
                  amount={+token.balance * 0.50}
                  onClick={onAmountButtonClick}
                />
                <AmountButton
                  amount={+token.balance * 0.80}
                  onClick={onAmountButtonClick}
                />
                <AmountButton
                  amount={+token.balance * 1.00}
                  onClick={onAmountButtonClick}
                  maxText={"Max"}
                />
              </Box>
            )
            : null}
        </Box>
        <TokenAmountInput
          token={token}
          value={amount}
          onChange={setAmount}
        />
        <Box
          mt="12px"
          display="flex"
          alignItems="center"
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
          {+amount > +token.balance
            ? (
              <Text
                color="$red500"
                fontSize="12px"
                fontWeight="400"
              >
                Insufficient balance
              </Text>
            )
            : null}
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
          <AddressInput
            value={destAddress}
            onChange={setDestAddress}
            onConnect={() => cosmos.cosmoshub.connect()}
            isConnected={wallet.mainWallet?.isWalletConnected}
          />

          <Box mt="12px">
            <AddressSelected
              logo={"https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/optimism/info/logo.png"}
              name={"Optimism"}
              addr={"0xe72a851567b56a0C4F825sg4d0020c905D1194cf"}
            />
          </Box>

          <PrimaryButton
            mt="1rem"
            disabled={!route || !destAddress || !isValidAddress(destAddress) ||
              +amount > +token.balance}
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

            {destChain
              ? (
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
              )
              : null}

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
      borderColor={useColorModeValue(
        colors.border.light,
        colors.border.dark,
      )}
      backgroundColor={useColorModeValue(colors.white, colors.blue200)}
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
  onChange?: (value: string) => void;
  onConnect?: () => void;
  isConnected?: boolean;
};

function AddressInput({
  value = "",
  isConnected = false,
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
      borderColor={useColorModeValue(
        colors.border.light,
        colors.border.dark,
      )}
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
      {value
        ? (
          <Box
            position="absolute"
            top="17px"
            right="1rem"
            cursor="pointer"
            attributes={{
              onClick: () => onChange(""),
            }}
          >
            <CloseIcon />
          </Box>
        )
        : isConnected
        ? null
        : <ConnectWalletButton onClick={() => onConnect()} />}
    </Box>
  );
}

type AddressSelectedProps = {
  logo: string;
  name: string;
  addr: string;
}

function AddressSelected({
  logo,
  name,
  addr,
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
      borderColor={useColorModeValue(
        colors.border.light,
        colors.border.dark,
      )}
      backgroundColor={useColorModeValue(colors.white, colors.blue300)}
    >
      <Image
        width={26}
        height={26}
        src={logo}
        alt={name}
      />
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
      >
        Change
      </Box>
    </Box>
  )
}
