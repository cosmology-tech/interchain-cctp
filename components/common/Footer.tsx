import Image from "next/image";
import { Box, Link, Text, useColorModeValue } from "@interchain-ui/react";
import { colors } from "@/config";

export function Footer() {
  return (
    <Box as="footer" paddingBottom="102px">
      <Box
        position="relative"
        display="flex"
        alignItems="flex-start"
        gap="46px"
        flexWrap="wrap"
        minHeight="118px"
        paddingTop="38px"
        paddingBottom="38px"
        borderTopWidth="1px"
        borderTopStyle="solid"
        borderTopColor={useColorModeValue(
          colors.divider.light,
          colors.divider.dark
        )}
      >
        <Image
          width={149}
          height={39}
          alt="Noble"
          src={useColorModeValue(
            "/logos/noble-light.svg",
            "/logos/noble-dark.svg"
          )}
          style={{
            flexShrink: "0",
          }}
        />

        <Box display="flex" flexDirection="column">
          <Text
            color={useColorModeValue(colors.gray200, colors.white)}
            fontSize="20px"
            fontWeight="600"
          >
            The new standard for digital asset issuance
          </Text>

          <Text
            color={useColorModeValue(colors.gray500, colors.blue700)}
            fontWeight="400"
            fontSize="14px"
            attributes={{
              marginBottom: "16px",
            }}
          >
            We are liquidity infrastructure for asset issuers to participate in
            the Interchain economy
          </Text>

          <Link
            href="https://nobleassets.xyz"
            target="_blank"
            attributes={{
              display: "inline-block",
              fontSize: "16px",
              fontWeight: "500",
            }}
            color={useColorModeValue(colors.gray200, colors.white)}
          >
            Learn more →
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
