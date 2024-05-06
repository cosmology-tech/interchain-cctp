import { useContext } from 'react';

import { SkipContext } from './context';

export function useSkipClient() {
  const context = useContext(SkipContext);

  if (context === undefined) {
    throw new Error('useSkip must be used within a SkipProvider');
  }

  return context.skipClient;
}
