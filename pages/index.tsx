import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronDown, Layout } from "@/components";
import { COSMOS_CHAIN_ID_TO_CHAIN_NAME, colors } from "@/config";
import {
  Box,
  NobleSelectWalletButton,
  Text,
  useColorModeValue,
} from "@interchain-ui/react";
import { Button as AriaButton } from "react-aria-components";
import { useChains } from "@cosmos-kit/react";
import { useAccount, useConnect } from "wagmi";

import { Tooltip } from "@/components/common/Tooltip/Tooltip";
import { FaqAccordion } from "@/components/common/FaqAccordion/FaqAccordion";
import { buttonReset } from "@/styles/Shared.css";

export default function Home() {
  return (
    <Layout>
      <Box minHeight="50rem">
        <Title />

        <Subtitle />

        <ChainList />

        <WalletList />

        <FaqList />
      </Box>
    </Layout>
  );
}

function Title() {
  return (
    <Box
      mt="3rem"
      display="flex"
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
      <Image src="/coins/usdc.svg" alt="USDC" width={48} height={48} />
      <Text
        color={useColorModeValue(colors.gray50, colors.white)}
        fontSize="48px"
        fontWeight="500"
        lineHeight="53px"
      >
        USDC Anywhere
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
            gridTemplateColumns="repeat(3, 1fr)"
            gridTemplateRows="minmax(28px, auto)"
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

const faqs = [
  {
    question: "Which networks are supported?",
    answer: `Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar.`,
  },
  {
    question: "Are there any fees?",
    answer: `Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar.`,
  },
  {
    question: "What tokens can I send?",
    answer: `Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar.`,
  },
  {
    question: "What is Noble?",
    answer: `Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar.`,
  },
  {
    question: "How does Noble Express work?",
    answer: `Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar.`,
  },
];

const midIndex = Math.ceil(faqs.length / 2);
const firstHalfFAQ = faqs.slice(0, midIndex);
const secondHalfFAQ = faqs.slice(midIndex);

function FaqList() {
  return (
    <Box mb="266px" px="$12">
      <Text
        as="p"
        color="$text"
        fontSize="$3xl"
        fontWeight="$medium"
        textAlign="left"
        attributes={{
          marginBottom: "32px",
        }}
      >
        Frequently asked questions
      </Text>

      <Box
        display="flex"
        gap="$10"
        flexWrap={{ mobile: "wrap", tablet: "nowrap" }}
      >
        <Box display="flex" flexDirection="column" gap="$6">
          {firstHalfFAQ.map((faq) => (
            <FaqAccordion
              key={faq.question}
              answer={faq.answer}
              question={faq.question}
            />
          ))}
        </Box>

        <Box display="flex" flexDirection="column" gap="$6">
          {secondHalfFAQ.map((faq) => (
            <FaqAccordion
              key={faq.question}
              answer={faq.answer}
              question={faq.question}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
