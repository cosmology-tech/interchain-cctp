import { useState, useEffect } from 'react';

export function useLazyLoadModule<TModule>(modulePath: string) {
  const [module, setModule] = useState<TModule | null>(null);

  useEffect(() => {
    let isActive = true;

    async function loadModule() {
      try {
        let loadedModule;
        switch (modulePath) {
          case '@skip-router/core':
            loadedModule = (await import('@skip-router/core')) as TModule;
            break;
          case '@cosmos-kit/react':
            loadedModule = (await import('@cosmos-kit/react')) as TModule;
            break;
          // Add more cases here for other modules if necessary
          default:
            throw new Error(`Unknown module: ${modulePath}`);
        }

        if (isActive) {
          setModule(loadedModule);
        }
      } catch (error) {
        console.error('Failed to load module:', error);
      }
    }

    loadModule();

    return () => {
      isActive = false; // Prevent updating state after unmount
    };
  }, [modulePath]); // Depend on moduleName to re-load if it changes

  return module;
}
