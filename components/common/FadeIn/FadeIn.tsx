import { AnimatePresence, motion } from 'framer-motion';

export interface FadeInProps {
  children: React.ReactNode;
}

export const FadeIn = ({ children }: FadeInProps) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
