import * as React from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Box, Text, useColorModeValue } from "@interchain-ui/react";
import { Button as AriaButton } from "react-aria-components";
import { FaqAccordion } from "@/components/common/FaqAccordion/FaqAccordion";
import { buttonReset } from "@/styles/Shared.css";
import * as styles from "./FaqList.css";

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

interface FaqListProps {
  isDefaultExpanded?: boolean;
}

export function FaqList(props: FaqListProps) {
  const [isExpanded, setIsExpanded] = React.useState<boolean>(
    !!props.isDefaultExpanded
  );

  const contractedColor = useColorModeValue("$text", "$gray600");

  return (
    <Box
      position="relative"
      attributes={{
        id: "faq-list",
      }}
      //   minHeight={{
      //     mobile: "600px",
      //     tablet: "unset",
      //   }}
    >
      <LayoutGroup>
        <motion.div
          layout
          transition={{
            type: "spring",
            stiffness: 700,
            damping: 30,
          }}
          data-expanded={isExpanded}
          className={styles.buttonContainer}
        >
          <AriaButton
            className={buttonReset}
            onPress={() => {
              setIsExpanded((prevIsExpanded) => !prevIsExpanded);
            }}
          >
            <Text
              as="span"
              color={isExpanded ? "$text" : contractedColor}
              fontSize="$3xl"
              fontWeight="$medium"
              textAlign="left"
              attributes={{
                marginBottom: isExpanded ? "32px" : "58px",
              }}
            >
              Frequently asked questions
            </Text>
          </AriaButton>
        </motion.div>
      </LayoutGroup>

      <LayoutGroup>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              transition={{
                type: "spring",
                stiffness: 700,
                damping: 30,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, height: 0 }}
            >
              <Box
                display="flex"
                mb="112px"
                gap={{
                  mobile: "$6",
                  tablet: "$10",
                }}
                flexWrap={{ mobile: "wrap", tablet: "nowrap" }}
                attributes={{
                  "data-expanded": isExpanded,
                }}
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
            </motion.div>
          )}
        </AnimatePresence>
      </LayoutGroup>
    </Box>
  );
}
