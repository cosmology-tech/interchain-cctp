import { Box } from "@interchain-ui/react";

export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box maxWidth="936px" mx="auto">
      {children}
    </Box>
  );
};
