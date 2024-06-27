import * as React from 'react';

export const LayoutContext = React.createContext<{
  isFaqExpanded: boolean;
  setIsFaqExpanded: (isExpanded: boolean) => void;
}>({
  isFaqExpanded: true,
  setIsFaqExpanded: () => {}
});
