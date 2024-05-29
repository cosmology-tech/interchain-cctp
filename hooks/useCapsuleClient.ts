import { useMemo } from 'react';
import { useLazyLoadModule } from './useLazyLoadModule';
import type { CapsuleProvider } from '@leapwallet/cosmos-social-login-capsule-provider';
import { CAPSULE_API_KEY, CAPSULE_ENV } from '@/config';

export const useCapsuleClient = () => {
  const CapsuleProviderModule = useLazyLoadModule<{
    CapsuleProvider: typeof CapsuleProvider;
  }>('@leapwallet/cosmos-social-login-capsule-provider');

  const capsuleClient = useMemo(() => {
    if (!CapsuleProviderModule) return;

    const CapsuleProviderClass = CapsuleProviderModule.CapsuleProvider;

    const capsuleProvider = new CapsuleProviderClass({
      apiKey: CAPSULE_API_KEY,
      env: CAPSULE_ENV
    });

    return capsuleProvider.getClient();
  }, [CapsuleProviderModule]);

  return { capsuleClient };
};
