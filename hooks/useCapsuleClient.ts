import { useMemo } from 'react';
import { useLazyLoadModule } from './useLazyLoadModule';
import type { CapsuleProvider } from '@leapwallet/cosmos-social-login-capsule-provider';
import { envConfig } from '../config/env';

export const useCapsuleClient = () => {
  const CapsuleProviderModule = useLazyLoadModule<{
    CapsuleProvider: typeof CapsuleProvider;
  }>('@leapwallet/cosmos-social-login-capsule-provider');

  const capsuleClient = useMemo(() => {
    if (!CapsuleProviderModule) return;

    const CapsuleProviderClass = CapsuleProviderModule.CapsuleProvider;

    const capsuleProvider = new CapsuleProviderClass({
      apiKey: envConfig.capsuleApiKey,
      env: envConfig.capsuleEnv,
      opts: {
        emailPrimaryColor: '#ff5733',
        portalTheme: {
          backgroundColor: '#ffffff',
          foregroundColor: '#ff5733',
          borderRadius: 'lg'
        }
      }
    });

    return capsuleProvider.getClient();
  }, [CapsuleProviderModule]);

  return { capsuleClient };
};
