import { useId } from 'react';
import { create } from 'zustand';

interface DisclosureState {
  [key: string]: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onToggle: () => void;
  };
}

const useDisclosureStore = create<DisclosureState>(() => ({}));

type DisclosureKey = 'source_wallet_popover' | 'dest_wallet_popover';

export const useDisclosure = (key?: DisclosureKey) => {
  const storeKey = key || useId();

  const disclosure = useDisclosureStore((state) => state[storeKey]);

  if (!disclosure) {
    const newDisclosure = {
      isOpen: false,
      onOpen: () => {
        useDisclosureStore.setState((state) => ({
          ...state,
          [storeKey]: { ...state[storeKey], isOpen: true }
        }));
      },
      onClose: () => {
        useDisclosureStore.setState((state) => ({
          ...state,
          [storeKey]: { ...state[storeKey], isOpen: false }
        }));
      },
      onToggle: () => {
        useDisclosureStore.setState((state) => ({
          ...state,
          [storeKey]: { ...state[storeKey], isOpen: !state[storeKey].isOpen }
        }));
      }
    };

    useDisclosureStore.setState((state) => ({
      ...state,
      [storeKey]: newDisclosure
    }));

    return newDisclosure;
  }

  return disclosure;
};
