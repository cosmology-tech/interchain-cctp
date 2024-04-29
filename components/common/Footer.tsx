import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Link, Text, useColorModeValue } from "@interchain-ui/react";
import { colors } from "@/config";
import { FaqTriggerButton } from "@/components/common/FaqList";
import { LayoutContext } from "@/contexts/layout.context";
import { ChevronDown } from "@/components/common/icons/Chevron";

export function Footer() {
  const { isFaqExpanded, setIsFaqExpanded } = React.useContext(LayoutContext);

  return (
    <Box
      as="footer"
      position={{
        mobile: "relative",
        tablet: "absolute",
      }}
      bottom="0"
      left="0"
      width="$full"
    >
      <AnimatePresence>
        {!isFaqExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Box
              display="flex"
              width="$full"
              gap="$8"
              justifyContent="center"
              alignItems="center"
              marginBottom="58px"
            >
              <FaqTriggerButton onPress={() => setIsFaqExpanded(true)} />

              <ChevronDown />
            </Box>
          </motion.div>
        )}
      </AnimatePresence>

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
