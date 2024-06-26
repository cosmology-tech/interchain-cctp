import { AnimatePresence, Transition, motion } from 'framer-motion';
import { useId } from 'react-aria';

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
  let animationKey = useId();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={animationKey}
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
