import { Box, useTheme } from "@interchain-ui/react";
import Image from "next/image";

const bgMap = {
  light: {
    top: "/background/bg-light-top.svg",
    bottom: "/background/bg-light-bottom.svg",
  },
  dark: {
    top: "/background/bg-dark-top.svg",
    bottom: "/background/bg-dark-bottom.svg",
  },
} as const;

export const Container = ({ children }: { children: React.ReactNode }) => {
  const { theme = "light" } = useTheme();

  return (
    <Box
      position="relative"
      attributes={{
        id: "main-container",
      }}
    >
      <Box position="absolute" top="0" left="0" zIndex={0}>
        <Image
          src={bgMap[theme ?? "light"].top}
          alt="bg top"
          width="313"
          height="679"
        />
      </Box>

      <Box
        position="relative"
        maxWidth="936px"
        mx="auto"
        zIndex={1}
        px={{
          mobile: "$6",
          tablet: "$12",
        }}
      >
        {children}
      </Box>

      <Box position="absolute" bottom="0" right="0" zIndex={0}>
        <Image
          src={bgMap[theme ?? "light"].bottom}
          alt="bg bottom"
          width="313"
          height="679"
        />
      </Box>
    </Box>
  );
};
