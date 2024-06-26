import { AnimatePresence, Transition, motion } from 'framer-motion';

export interface FadeInProps {
  transition?: Transition;
  children: React.ReactNode;
}

const defaultTransition: Transition = {
  type: 'spring',
  damping: 20,
  stiffness: 100
};

export const FadeIn = ({ children, transition = defaultTransition }: FadeInProps) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={transition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
