import {
  animate,
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useTransform
} from 'framer-motion';
import clx from 'clsx';
import { Dialog, Heading, Modal, ModalOverlay, DialogProps } from 'react-aria-components';
import { XMarkIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';
import { BaseButton } from '@/components/common/BaseButton';
import { Box, NobleProvider, useTheme } from '@interchain-ui/react';
import { useEffect, useState } from 'react';
import * as styles from './ConnectModal.css';

// Wrap React Aria modal components so they support framer-motion values.
const MotionModal = motion(Modal);
const MotionModalOverlay = motion(ModalOverlay);

const inertiaTransition = {
  type: 'inertia' as const,
  bounceStiffness: 300,
  bounceDamping: 40,
  timeConstant: 300
};

const staticTransition = {
  duration: 0.5,
  ease: [0.32, 0.72, 0, 1]
};

const MODAL_MARGIN = 0;
const MODAL_RADIUS = 12;

export interface ConnectModalProps extends DialogProps {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  title?: string;
  showBackButton?: boolean;
  onBack?: () => void;
}

const HeaderButtonText = ({ children }: { children: React.ReactNode }) => (
  <Box
    as="span"
    display="inline-block"
    color={{
      base: '$textSecondary',
      hover: '$text'
    }}
    backgroundColor={{
      base: 'transparent',
      hover: '$background'
    }}
    borderColor={{
      base: '$divider',
      hover: '$progressBg'
    }}
    borderWidth="1px"
    borderStyle="solid"
    padding="$2"
    borderRadius="$lg"
    fontSize="$2xl"
    transition="all 0.2s"
  >
    {children}
  </Box>
);

export function ConnectModal(props: ConnectModalProps) {
  const { theme } = useTheme();

  const [root, setRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setRoot(document.body.firstChild as HTMLElement);
  }, []);

  let h = root ? window?.innerHeight - MODAL_MARGIN : 0;
  let y = useMotionValue(h);
  let bgOpacity = useTransform(y, [0, h], [0.1, 0]);

  let lightBg = useMotionTemplate`rgba(0, 0, 0, ${bgOpacity})`;
  let darkBg = useMotionTemplate`rgba(255, 255, 255, ${bgOpacity})`;

  let bodyBorderRadius = useTransform(y, [0, h], [MODAL_RADIUS, 0]);

  useMotionValueEvent(bodyBorderRadius, 'change', (v) => {
    if (!root) return;
    root.style.borderRadius = `${v}px`;
  });

  return (
    <>
      <AnimatePresence>
        {props.isOpen && (
          <MotionModalOverlay
            // Force the modal to be open when AnimatePresence renders it.
            isOpen
            isDismissable
            onOpenChange={props.setOpen}
            className={styles.modalOverlay}
            style={{ backgroundColor: (theme === 'light' ? lightBg : darkBg) as any }}
          >
            <MotionModal
              isDismissable
              onTap={(e) => {
                const classList = (e.target as HTMLElement).classList;

                // Close the modal when the user taps the overlay but not the inner modal body
                if (props.isOpen && Array.from(classList).includes('modal-root')) {
                  props.setOpen(false);
                }
              }}
              className={clx(styles.modal, 'modal-root')}
              initial={{ y: h }}
              animate={{ y: 0 }}
              exit={{ y: h }}
              transition={staticTransition}
              style={{
                y,
                top: MODAL_MARGIN,
                // Extra padding at the bottom to account for rubber band scrolling.
                paddingBottom: window.screen.height
              }}
              drag="y"
              dragConstraints={{ top: 0 }}
              onDragEnd={(e, { offset, velocity }) => {
                if (offset.y > window.innerHeight * 0.75 || velocity.y > 10) {
                  props.setOpen(false);
                } else {
                  animate(y, 0, { ...inertiaTransition, min: 0, max: 0 });
                }
              }}
            >
              <Dialog className={styles.modalBody}>
                <NobleProvider>
                  <Box
                    bg="$cardBg"
                    padding="$10"
                    borderRadius="$xl"
                    borderWidth="1px"
                    borderStyle="solid"
                    borderColor="$progressBg"
                  >
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Box width="32px" height="32px">
                        {props.showBackButton && (
                          <BaseButton onPress={() => props.onBack?.()}>
                            <HeaderButtonText>
                              <ChevronLeftIcon width="1em" height="1em" />
                            </HeaderButtonText>
                          </BaseButton>
                        )}
                      </Box>

                      <Box
                        flex={1}
                        textAlign="center"
                        color="$text"
                        fontSize="$2xl"
                        fontWeight="$semibold"
                      >
                        <Heading
                          slot="title"
                          style={{
                            fontWeight: 'inherit',
                            fontSize: 'inherit',
                            color: 'inherit'
                          }}
                        >
                          {props.title || 'Connect wallet'}
                        </Heading>
                      </Box>

                      <Box width="32px" height="32px">
                        <BaseButton onPress={() => props.setOpen(false)}>
                          <HeaderButtonText>
                            <XMarkIcon width="1em" height="1em" />
                          </HeaderButtonText>
                        </BaseButton>
                      </Box>
                    </Box>

                    <Box pt="$10">{props.children}</Box>
                  </Box>
                </NobleProvider>
              </Dialog>
            </MotionModal>
          </MotionModalOverlay>
        )}
      </AnimatePresence>
    </>
  );
}
