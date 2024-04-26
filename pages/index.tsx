import Image from "next/image";
import { useRouter } from "next/navigation";
import { Layout } from "@/components";
import { COSMOS_CHAIN_ID_TO_CHAIN_NAME, colors } from "@/config";
import {
  Box,
  NobleProvider,
  NobleSelectWalletButton,
  Text,
  useColorModeValue,
} from "@interchain-ui/react";
import { Button as AriaButton } from "react-aria-components";
import { useChains } from "@cosmos-kit/react";
import { useAccount, useConnect } from "wagmi";
import { Tooltip } from "@/components/common/Tooltip";
import { buttonReset } from "@/styles/Shared.css";

export default function Home() {
  return (
    <Layout>
      <NobleProvider>
        <Box>
          <Title />

          <Subtitle />

          <ChainList />

          <WalletList />
        </Box>
      </NobleProvider>
    </Layout>
  );
}

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

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="nowrap"
      >
        <Image src="/coins/usdc.svg" alt="USDC" width={48} height={48} />
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
        Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean
        imperdiet. Etiam ultricies nisi vel augue.
      </Text>
    </Box>
  );
}

interface ChainItemProps {
  name: string;
  src: string;
  alt?: string;
  width: number;
  height: number;
}

function ChainItem(props: ChainItemProps) {
  return (
    <Box
      display="flex"
      justifyContent="flex-start"
      alignItems="center"
      gap="$6"
      width="182px"
    >
      <Image
        src={props.src}
        alt={props.alt ?? props.name}
        width={props.width}
        height={props.height}
      />

      <Text
        as="span"
        fontSize="$sm"
        fontWeight="$normal"
        color={useColorModeValue("$gray700", "$text")}
      >
        {props.name}
      </Text>
    </Box>
  );
}

function ChainList() {
  return (
    <Box
      textAlign="center"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Tooltip.Trigger delay={0.2}>
        <AriaButton className={buttonReset}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
          >
            <Image
              src="/coins/ethereum.svg"
              alt="Ethereum"
              width={28}
              height={28}
            />
            <Image
              src={useColorModeValue(
                "/coins/optimism-light.svg",
                "/coins/optimism-dark.svg"
              )}
              alt="Optimism"
              width={33}
              height={32}
              style={{ position: "relative", left: "-6px" }}
            />
            <Image
              src={useColorModeValue(
                "/coins/dydx-light.svg",
                "/coins/dydx-dark.svg"
              )}
              alt="dYdX"
              width={32}
              height={32}
              style={{ position: "relative", left: "-15px" }}
            />
            <Image
              src={useColorModeValue(
                "/coins/arbitrum-light.svg",
                "/coins/arbitrum-dark.svg"
              )}
              alt="Arbitrum"
              width={32}
              height={32}
              style={{ position: "relative", left: "-23px" }}
            />
            <Image
              src={useColorModeValue(
                "/coins/noble-light.svg",
                "/coins/noble-dark.svg"
              )}
              alt="Noble"
              width={32}
              height={32}
              style={{ position: "relative", left: "-32px" }}
            />

            <Text
              color={useColorModeValue(colors.gray500, colors.blue700)}
              lineHeight="20px"
              fontWeight="500"
              attributes={{ marginLeft: "-30px" }}
            >
              +16
            </Text>
          </Box>
        </AriaButton>

        <Tooltip placement="bottom">
          <Box
            display="grid"
            gridTemplateColumns={{
              mobile: "repeat(2, 1fr)",
              tablet: "repeat(3, 1fr)",
            }}
            gridTemplateRows={{
              mobile: "minmax(28px, auto)",
              tablet: "minmax(28px, auto)",
            }}
            gridAutoFlow="row dense"
            columnGap="8px"
            rowGap="12px"
          >
            <ChainItem
              name="Ethereum"
              src="/coins/ethereum.svg"
              alt="Ethereum"
              width={28}
              height={28}
            />

            <ChainItem
              name="Optimism"
              src={useColorModeValue(
                "/coins/optimism-light.svg",
                "/coins/optimism-dark.svg"
              )}
              alt="Optimism"
              width={28}
              height={28}
            />

            <ChainItem
              name="dYdX"
              src={useColorModeValue(
                "/coins/dydx-light.svg",
                "/coins/dydx-dark.svg"
              )}
              alt="dYdX"
              width={28}
              height={28}
            />

            <ChainItem
              name="Arbitrum"
              src={useColorModeValue(
                "/coins/arbitrum-light.svg",
                "/coins/arbitrum-dark.svg"
              )}
              alt="Arbitrum"
              width={28}
              height={28}
            />

            <ChainItem
              name="Noble"
              src={useColorModeValue(
                "/coins/noble-light.svg",
                "/coins/noble-dark.svg"
              )}
              alt="Noble"
              width={28}
              height={28}
            />
            {/* Second column */}
            <ChainItem
              name="Ethereum"
              src="/coins/ethereum.svg"
              alt="Ethereum"
              width={28}
              height={28}
            />

            <ChainItem
              name="Optimism"
              src={useColorModeValue(
                "/coins/optimism-light.svg",
                "/coins/optimism-dark.svg"
              )}
              alt="Optimism"
              width={28}
              height={28}
            />

            <ChainItem
              name="dYdX"
              src={useColorModeValue(
                "/coins/dydx-light.svg",
                "/coins/dydx-dark.svg"
              )}
              alt="dYdX"
              width={28}
              height={28}
            />

            <ChainItem
              name="Arbitrum"
              src={useColorModeValue(
                "/coins/arbitrum-light.svg",
                "/coins/arbitrum-dark.svg"
              )}
              alt="Arbitrum"
              width={28}
              height={28}
            />

            <ChainItem
              name="Noble"
              src={useColorModeValue(
                "/coins/noble-light.svg",
                "/coins/noble-dark.svg"
              )}
              alt="Noble"
              width={28}
              height={28}
            />

            {/* Third column */}

            <ChainItem
              name="Ethereum"
              src="/coins/ethereum.svg"
              alt="Ethereum"
              width={28}
              height={28}
            />

            <ChainItem
              name="Optimism"
              src={useColorModeValue(
                "/coins/optimism-light.svg",
                "/coins/optimism-dark.svg"
              )}
              alt="Optimism"
              width={28}
              height={28}
            />

            <ChainItem
              name="dYdX"
              src={useColorModeValue(
                "/coins/dydx-light.svg",
                "/coins/dydx-dark.svg"
              )}
              alt="dYdX"
              width={28}
              height={28}
            />

            <ChainItem
              name="Arbitrum"
              src={useColorModeValue(
                "/coins/arbitrum-light.svg",
                "/coins/arbitrum-dark.svg"
              )}
              alt="Arbitrum"
              width={28}
              height={28}
            />

            <ChainItem
              name="Noble"
              src={useColorModeValue(
                "/coins/noble-light.svg",
                "/coins/noble-dark.svg"
              )}
              alt="Noble"
              width={28}
              height={28}
            />
          </Box>
        </Tooltip>
      </Tooltip.Trigger>
    </Box>
  );
}

type WalletProps = {
  logo: string;
  name: string;
  text: string;
  onClick?: () => void;
};

function Wallet({
  logo,
  name,
  text = "Connect",
  onClick = () => {},
}: WalletProps) {
  return (
    <Box
      width="168px"
      height="153px"
      cursor="pointer"
      borderWidth="1px"
      borderStyle="solid"
      borderRadius="8px"
      display="flex"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
      borderColor={useColorModeValue(colors.border.light, colors.border.dark)}
      backgroundColor={useColorModeValue(colors.white, colors.blue200)}
      attributes={{ onClick }}
    >
      <Image src={logo} alt={name} width={42} height={42} />
      <Text
        fontSize="16px"
        fontWeight="600"
        lineHeight="1.5"
        attributes={{ mt: "9px", mb: "8px" }}
        color={useColorModeValue(colors.blue50, colors.white)}
      >
        {name}
      </Text>
      <Text
        fontSize="12px"
        fontWeight="500"
        lineHeight="1.5"
        color={useColorModeValue(colors.gray200, colors.gray600)}
      >
        {text}
      </Text>
    </Box>
  );
}

function WalletList() {
  const router = useRouter();
  const cosmos = useChains(Object.values(COSMOS_CHAIN_ID_TO_CHAIN_NAME));
  const { address } = useAccount();
  const { connectAsync, isSuccess, connectors } = useConnect();

  const handleConnectMetamask = () => {
    if (address) {
      return router.push("/select-token");
    }
    connectAsync({ connector: connectors[0] }).then((isSuccess) => {
      if (isSuccess) {
        router.push("/select-token");
      }
    });
  };

  const handleConnectKeplr = () => {
    if (cosmos.cosmohub?.address) {
      return router.push("/select-token");
    }
    cosmos.cosmoshub.connect();
  };

  return (
    <Box
      pt="72px"
      pb="200px"
      px="$12"
      display="flex"
      gap="24px"
      flexWrap="wrap"
      justifyContent="center"
      alignItems="center"
    >
      <NobleSelectWalletButton
        logoUrl={"/logos/metamask.svg"}
        logoAlt="metamask"
        title="MetaMask"
        subTitle="Connect"
        onClick={handleConnectMetamask}
      />

      <NobleSelectWalletButton
        logoUrl={"/logos/keplr.svg"}
        logoAlt="keplr"
        title="Keplr"
        subTitle="Connect"
        onClick={handleConnectKeplr}
      />

      <NobleSelectWalletButton
        logoUrl={"/logos/capsule.svg"}
        logoAlt="keplr"
        title="Capsule"
        subTitle="Log in"
      />

      <NobleSelectWalletButton
        logoUrl={"/logos/phantom.svg"}
        logoAlt="phantom"
        title="Phantom"
        subTitle="Soon"
        disabled
      />
    </Box>
  );
}
