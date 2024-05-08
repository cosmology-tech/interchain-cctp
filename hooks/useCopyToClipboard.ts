import * as React from 'react';
import writeText from 'copy-to-clipboard';
import { useIsMounted } from './useIsMounted';

export interface CopyToClipboardState {
  value?: string;
  noUserInteraction: boolean;
  error?: Error;
}

export interface CopyToClipboardParams {
  onError?: (error: any) => void;
  onSuccess?: () => void;
}

export const useCopyToClipboard = (
  params?: CopyToClipboardParams
): [CopyToClipboardState, (value: string) => void] => {
  const isMounted = useIsMounted();
  const [state, setState] = React.useState<CopyToClipboardState>({
    value: undefined,
    error: undefined,
    noUserInteraction: true
  });

  const copyToClipboard = React.useCallback((value: string) => {
    if (!isMounted) {
      return;
    }

    let noUserInteraction;
    let normalizedValue;

    try {
      // only strings and numbers casted to strings can be copied to clipboard
      if (typeof value !== 'string' && typeof value !== 'number') {
        const error = new Error(
          `Cannot copy typeof ${typeof value} to clipboard, must be a string`
        );
        if (process.env.NODE_ENV === 'development') console.error(error);
        setState({
          value,
          error,
          noUserInteraction: true
        });
        return;
      }
      // empty strings are also considered invalid
      else if (value === '') {
        const error = new Error(`Cannot copy empty string to clipboard.`);
        if (process.env.NODE_ENV === 'development') console.error(error);
        setState({
          value,
          error,
          noUserInteraction: true
        });
        return;
      }
      normalizedValue = value.toString();
      noUserInteraction = writeText(normalizedValue);
      setState({
        value: normalizedValue,
        error: undefined,
        noUserInteraction
      });

      params?.onSuccess?.();
    } catch (error) {
      setState({
        value: normalizedValue,
        error: error as Error,
        noUserInteraction: noUserInteraction ?? false
      });
      params?.onError?.(error);
    }
  }, []);

  return [state, copyToClipboard];
};
