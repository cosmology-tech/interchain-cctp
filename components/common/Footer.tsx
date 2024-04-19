import Image from "next/image";
import {
  Box,
  Link,
  Text,
  useColorModeValue,
} from "@interchain-ui/react";
import { colors } from "@/config";

export function Footer() {
  return (
    <Box
      display="flex"
      alignItems="center"
      height="118px"
      position="relative"
      borderTopWidth="1px"
      borderTopStyle="solid"
      borderTopColor={useColorModeValue(
        colors.divider.light,
        colors.divider.dark,
      )}
    >
      <Image
        width={149}
        height={39}
        alt="Noble"
        src={useColorModeValue(
          "/logos/noble-light.svg",
          "/logos/noble-dark.svg",
        )}
      />
      <Box ml="2.5rem">
        <Text
          color={useColorModeValue(colors.gray200, colors.white)}
          fontSize="20px"
          fontWeight="600"
          lineHeight="28px"
        >
          The new standard for digital asset issuance
        </Text>
        <Text
          color={useColorModeValue(colors.gray500, colors.blue700)}
          fontWeight="400"
          fontSize="14px"
          lineHeight="20px"
        >
          We are liquidity infrastructure for asset issuers to participate in
          the Interchain economy
        </Text>
        <Link
          href="https://nobleassets.xyz"  
          target="_blank"
          attributes={{
            position: "absolute",
            bottom: "0",
            fontSize: "16px",
            lineHeight: "22px",
            fontWeight: "500",
          }}
          color={useColorModeValue(colors.gray200, colors.white)}
        >
          Learn more →
        </Link>
      </Box>
    </Box>
  );
}
