import * as React from "react";
import { Layout } from "@/components";
import { sizes } from "@/config";
import {
  Accordion,
  Box,
  Text,
  Stack,
  NobleTxDirectionCard,
  NobleTxProgressBar,
  NobleTxStepItem,
  NoblePageTitleBar,
  NobleTxHistoryOverviewItem,
  NobleTxStatus,
  Divider,
} from "@interchain-ui/react";
import { FaqList } from "@/components/common/FaqList/FaqList";

const USDC_LOGO_URL =
  "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/usdc.svg";
const OSMO_LOGO_URL =
  "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.png";

const TransactionChains = () => (
  <Stack space="$18" attributes={{ mt: "$9", pb: "$8" }}>
    <NobleTxDirectionCard
      direction="From"
      chainName="Ethereum Mainnet"
      address="0x1f9090...e676c326"
      logoUrl={USDC_LOGO_URL}
    />
    <NobleTxDirectionCard
      direction="To"
      chainName="Osmosis"
      address="osmo1w59t7...pl4rsz0d"
      logoUrl={OSMO_LOGO_URL}
    />
  </Stack>
);

const TransactionProgress = () => (
  <Box
    bg="$cardBg"
    px="$14"
    py="$12"
    mt="$9"
    borderRadius="$2xl"
    display="flex"
    flexDirection="column"
    alignItems="center"
  >
    <Text
      color="$text"
      fontSize="$sm"
      fontWeight="$semibold"
      attributes={{ mb: "$8" }}
    >
      ~12 minutes remaining
    </Text>
    <NobleTxProgressBar progress={50} mb="$12" />
    <Stack
      direction="vertical"
      space="14px"
      attributes={{ alignSelf: "flex-start", mb: "$9" }}
    >
      <NobleTxStepItem status="completed" step="Burn on Ethereum" />
      <NobleTxStepItem status="processing" step="Mint on Noble" />
      <NobleTxStepItem status="pending" step="Transfer to Osmosis" />
    </Stack>
  </Box>
);

const transactions = [
  {
    overview: {
      amount: "1,000",
      status: "processing",
      sourceChainLogoSrc: USDC_LOGO_URL,
      destinationChainLogoSrc: OSMO_LOGO_URL,
    },
    details: (
      <>
        <TransactionChains />
        <TransactionProgress />
      </>
    ),
  },
  {
    overview: {
      amount: "128.43",
      status: "successful",
      sourceChainLogoSrc: USDC_LOGO_URL,
      destinationChainLogoSrc: OSMO_LOGO_URL,
    },
    details: <TransactionChains />,
  },
  {
    overview: {
      amount: "2,000",
      status: "successful",
      sourceChainLogoSrc: USDC_LOGO_URL,
      destinationChainLogoSrc: OSMO_LOGO_URL,
    },
    details: <TransactionChains />,
  },
];

export default function TransactionHistoryPage() {
  return (
    <Layout>
      <Box
        maxWidth={sizes.main.maxWidth}
        mx="auto"
        paddingTop="84px"
        paddingBottom="120px"
      >
        <NoblePageTitleBar
          title="History"
          onBackButtonClick={() => alert("Go back")}
          mb="$14"
        />
        {transactions.map(({ overview, details }, index) => (
          <React.Fragment key={overview.amount}>
            <Accordion
              renderTrigger={
                <NobleTxHistoryOverviewItem
                  amount={overview.amount}
                  status={overview.status as NobleTxStatus}
                  sourceChainLogoSrc={overview.sourceChainLogoSrc}
                  destinationChainLogoSrc={overview.destinationChainLogoSrc}
                />
              }
              renderContent={details}
              isExpanded={index === 0}
            />
            {index < transactions.length - 1 && <Divider my="$8" />}
          </React.Fragment>
        ))}
      </Box>

      <FaqList />
    </Layout>
  );
}
