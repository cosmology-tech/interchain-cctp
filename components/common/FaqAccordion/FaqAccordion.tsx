import * as React from "react";
import cls from "clsx";
import {
  Box,
  Text,
  Accordion,
  NobleButton,
  useTheme,
} from "@interchain-ui/react";
import { ChevronDown } from "../icons/Chevron";
import * as styles from "./FaqAccordion.css";
import * as sharedStyles from "@/styles/Shared.css";

export interface FaqAccordionProps {
  isExpanded: boolean;
  toggleExpand: () => void;
  question: string;
  answer: string;
  children?: React.ReactNode;
  className?: string;
}

function Trigger({
  children,
  isExpanded,
  ...otherProps
}: {
  children?: React.ReactNode;
  isExpanded?: boolean;
}) {
  return (
    <NobleButton
      {...otherProps}
      variant="outlined"
      size="lg"
      height="70px"
      className={styles.accordionTrigger}
      domAttributes={{
        "data-expanded": isExpanded,
      }}
    >
      <Box
        as="div"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        height="100%"
        padding="$10"
        color="inherit"
      >
        <Text as="span" color="$text" fontWeight="$semibold" fontSize="$md">
          {children}
        </Text>

        <Text as="span" color="$text">
          <ChevronDown color="currentColor" />
        </Text>
      </Box>
    </NobleButton>
  );
}

export function FaqAccordion(props: FaqAccordionProps) {
  const { theme } = useTheme();
  return (
    <Accordion
      renderTrigger={
        <Trigger isExpanded={props.isExpanded}>{props.question}</Trigger>
      }
      renderContent={
        <Box
          bg="$cardBg"
          paddingLeft="$10"
          paddingRight="$10"
          paddingTop="$10"
          paddingBottom="$10"
          borderRadius="$lg"
          borderWidth="1px"
          borderStyle="$solid"
          borderColor="$inputBorder"
          borderTopLeftRadius="0"
          borderTopRightRadius="0"
          borderTopWidth="0"
          fontSize="$sm"
          fontWeight="$normal"
          color="$textSecondary"
          maxHeight="150px"
          overflowY="auto"
          className={sharedStyles.scrollBar[theme]}
        >
          {props.answer}
        </Box>
      }
      isExpanded={props.isExpanded}
      onToggle={() => props.toggleExpand()}
    />
  );
}
