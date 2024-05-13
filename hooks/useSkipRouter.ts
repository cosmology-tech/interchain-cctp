import { useLazyLoadModule } from './useLazyLoadModule';
import type { SkipRouter } from '@skip-router/core';

export const useSkipRouter = () => {
  const skipRouterModule = useLazyLoadModule<{
    SkipRouter: SkipRouter;
  }>('@skip-router/core');

  return skipRouterModule;
};
