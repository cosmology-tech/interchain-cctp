import * as React from 'react';
import cls from 'clsx';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { Box, Text, useColorModeValue } from '@interchain-ui/react';
import { Button as AriaButton, ButtonProps as AriaButtonProps } from 'react-aria-components';
import { FaqAccordion } from '@/components/common/FaqAccordion/FaqAccordion';
import { LayoutContext } from '@/contexts/layout.context';
import { buttonReset } from '@/styles/Shared.css';
import { data } from '@/data';

const faqs = data.faqList;
const midIndex = Math.ceil(faqs.length / 2);
const firstHalfFAQ = faqs.slice(0, midIndex);
const secondHalfFAQ = faqs.slice(midIndex);

interface FaqListProps {
  isDefaultExpanded?: boolean;
}

export function FaqTriggerButton(
  props: AriaButtonProps & {
    isHightlighted?: boolean;
  }
) {
  const contractedColor = useColorModeValue('$text', '$gray600');
  const { isHightlighted, ...ariaProps } = props;

  return (
    <AriaButton {...ariaProps} className={cls(buttonReset, props.className)}>
      <Text
        as="span"
        color={props.isHightlighted ? '$text' : contractedColor}
        fontSize="$3xl"
        fontWeight="$medium"
        textAlign="left"
        attributes={{
          transition: 'all 200ms'
        }}
      >
        Frequently asked questions
      </Text>
    </AriaButton>
  );
}

export function FaqList(props: FaqListProps) {
  const [activeFaqId, setActiveFaqId] = React.useState<number | null>(null);

  const { isFaqExpanded, setIsFaqExpanded } = React.useContext(LayoutContext);

  const handleExpand = (faqId: number) => {
    setActiveFaqId((prevActiveFaqId) => {
      return prevActiveFaqId === faqId ? null : faqId;
    });
  };

  return (
    <Box
      position="relative"
      attributes={{
        id: 'faq-list'
      }}
    >
      <LayoutGroup>
        <AnimatePresence>
          {isFaqExpanded && (
            <motion.div
              transition={{
                type: 'spring',
                stiffness: 700,
                damping: 30
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, height: 0 }}
            >
              <Box marginBottom="32px">
                <FaqTriggerButton
                  isHightlighted={isFaqExpanded}
                  onPress={() => {
                    setIsFaqExpanded(!isFaqExpanded);
                  }}
                />
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </LayoutGroup>

      <LayoutGroup>
        <AnimatePresence>
          {isFaqExpanded && (
            <motion.div
              transition={{
                type: 'spring',
                stiffness: 700,
                damping: 30
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, height: 0 }}
            >
              <Box
                display="flex"
                mb="112px"
                gap={{
                  mobile: '$6',
                  tablet: '$10'
                }}
                flexWrap={{ mobile: 'wrap', tablet: 'nowrap' }}
                attributes={{
                  'data-expanded': isFaqExpanded
                }}
              >
                <Box display="flex" flexDirection="column" gap="$6" flex="1">
                  {firstHalfFAQ.map((faq) => (
                    <FaqAccordion
                      isExpanded={activeFaqId === faq.id}
                      toggleExpand={() => handleExpand(faq.id)}
                      key={faq.question}
                      answer={faq.answer}
                      question={faq.question}
                    />
                  ))}
                </Box>

                <Box display="flex" flexDirection="column" gap="$6" flex="1">
                  {secondHalfFAQ.map((faq) => (
                    <FaqAccordion
                      isExpanded={activeFaqId === faq.id}
                      toggleExpand={() => handleExpand(faq.id)}
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
