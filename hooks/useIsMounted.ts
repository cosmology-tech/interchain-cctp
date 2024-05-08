import { useCallback, useEffect, useRef, useState } from 'react';

export function useIsMounted() {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, []);

  return isMounted;
}
