import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronDown, Layout } from "@/components";
import { COSMOS_CHAIN_ID_TO_CHAIN_NAME, colors } from "@/config";
import { Box, Text, useColorModeValue } from "@interchain-ui/react";
import { useChains } from "@cosmos-kit/react";
import { useEffect } from "react";
import { useAccount, useConnect } from "wagmi";

export default function Home() {
  return (
    <Layout>
      <Box minHeight="50rem">
        <Title />
        <Subtitle />
        <Coins />
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
      <Image
        src="/coins/usdc.svg"
        alt="USDC"
        width={48}
        height={48}
      />
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

function Coins() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      cursor="pointer"
    >
      <Image
        src="/coins/ethereum.svg"
        alt="Etheruem"
        width={28}
        height={28}
      />
      <Image
        src={useColorModeValue(
          "/coins/optimism-light.svg",
          "/coins/optimism-dark.svg",
        )}
        alt="Optimism"
        width={33}
        height={32}
        style={{ position: "relative", left: "-6px" }}
      />
      <Image
        src={useColorModeValue("/coins/dydx-light.svg", "/coins/dydx-dark.svg")}
        alt="dYdX"
        width={+useColorModeValue("33", "30")}
        height={+useColorModeValue("32", "29")}
        style={{ position: "relative", left: "-15px" }}
      />
      <Image
        src={useColorModeValue(
          "/coins/arbitrum-light.svg",
          "/coins/arbitrum-dark.svg",
        )}
        alt="Arbitrum"
        width={+useColorModeValue("32", "28")}
        height={+useColorModeValue("32", "28")}
        style={{ position: "relative", left: "-23px" }}
      />
      <Image
        src={useColorModeValue(
          "/coins/noble-light.svg",
          "/coins/noble-dark.svg",
        )}
        alt="Noble"
        width={+useColorModeValue("33", "29")}
        height={+useColorModeValue("32", "28")}
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
      <Image
        src={logo}
        alt={name}
        width={42}
        height={42}
      />
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
  const cosmos = useChains(Object.values(COSMOS_CHAIN_ID_TO_CHAIN_NAME))
  const { address } = useAccount()
  const { connectAsync, isSuccess, connectors } = useConnect();
  
  return (
    <Box mt="4rem" mb="10rem" display="flex" mx="100px" gap="24px">
      <Wallet
        logo="/logos/metamask.svg"
        name="MetaMask"
        text="Connect"
        onClick={() => {
          address ? router.push("/select-token") :
          connectAsync({ connector: connectors[0] }) 
            .then((isSuccess) => {
              if (isSuccess) {
                router.push("/select-token")
              }
            })
        }}
      />
      <Wallet
        logo="/logos/keplr.svg"
        name="Keplr"
        text="Connect"
        onClick={() => {
          cosmos.cosmohub?.address
          ? router.push("/select-token")
          : cosmos.cosmoshub.connect()
        }}
      />
      <Wallet
        logo="/logos/capsule.svg"
        name="Capsule"
        text="Log in"
      />
    </Box>
  );
}

function FaqList() {
  const faqs = [
    { question: "Which networks are supported?" },
    { question: "Are there any fees?" },
    { question: "What tokens can I send?" },
    { question: "How does Noble Express work?" },
    { question: "What is Noble?" },
  ];
  return (
    <Box mb="7rem">
      <Text
        color={useColorModeValue(colors.gray200, colors.white)}
        fontSize="24px"
        fontWeight="500"
        lineHeight="28px"
        textAlign="center"
      >
        Frequently asked questions
      </Text>
      <Box
        mt="30px"
        display="grid"
        gap="12px 1.5rem"
        gridTemplateColumns="repeat(2, minmax(0, 1fr))"
      >
        {faqs.map((faq, index) => <Faq key={index} question={faq.question} />)}
      </Box>
    </Box>
  );
}

type FaqProps = {
  question: string;
};

function Faq({ question }: FaqProps) {
  return (
    <Box
      px="20px"
      height="70px"
      cursor="pointer"
      borderWidth="1px"
      borderStyle="solid"
      borderRadius="8px"
      display="flex"
      alignItems="center"
      borderColor={useColorModeValue(colors.border.light, colors.border.dark)}
      backgroundColor={useColorModeValue(colors.white, colors.blue200)}
    >
      <Text
        color={useColorModeValue(colors.gray100, colors.white)}
        fontSize="16px"
        fontWeight="500"
        lineHeight="20px"
        attributes={{ flex: 1 }}
      >
        {question}
      </Text>
      <ChevronDown color={useColorModeValue(colors.gray400, colors.gray600)} />
    </Box>
  );
}
