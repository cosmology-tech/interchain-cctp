import * as React from 'react';

export const CapsuleContext = React.createContext<{
  isCapsuleModalOpen: boolean;
  setCapsuleModalOpen: (isOpen: boolean) => void;
}>({
  isCapsuleModalOpen: false,
  setCapsuleModalOpen: () => {}
});
