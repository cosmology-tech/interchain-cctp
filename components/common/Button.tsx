import { PropsWithChildren } from "react";
import { Box, useColorModeValue } from "@interchain-ui/react";
import { colors } from "@/config";

export function BackButton({
  onClick = () => {},
}: ButtonProps) {
  return (
    <Box
      width="32px"
      height="32px"
      display="flex"
      cursor="pointer"
      borderRadius="4px"
      borderWidth="1px"
      borderStyle="solid"
      alignItems="center"
      justifyContent="center"
      borderColor={useColorModeValue(colors.gray700, colors.blue300)}
      backgroundColor={useColorModeValue(colors.white, colors.blue200)}
      attributes={{ onClick }}
    >
      <svg
        width="7"
        height="13"
        viewBox="0 0 7 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.000716336 6.54039C0.00895049 6.80682 0.109819 7.0581 0.284794 7.25089L5.22528 12.6663C5.41467 12.8742 5.67404 12.9934 5.94783 12.9999C6.22161 13.0042 6.48511 12.8959 6.68273 12.6966C6.88035 12.4973 6.99357 12.2244 6.99974 11.9363C7.00592 11.6482 6.90093 11.3709 6.71155 11.163L2.45861 6.49923L6.71155 1.83549C7.10473 1.40442 7.09237 0.717749 6.68273 0.301847C6.27102 -0.11189 5.62052 -0.0988924 5.22528 0.332173L0.284794 5.74757C0.0912919 5.95986 -0.00957636 6.24579 0.000716336 6.54039Z"
          fill={useColorModeValue(colors.gray500, colors.gray600)}
        />
      </svg>
    </Box>
  );
}

export function ConnectWalletButton({
  onClick = () => {},
}: ButtonProps) {
  return (
    <Box
      top="8px"
      right="8px"
      width="130px"
      height="38px"
      display="flex"
      fontSize="14px"
      lineHeight="17px"
      cursor="pointer"
      position="absolute"
      alignItems="center"
      borderRadius="4px"
      justifyContent="center"
      backgroundColor={colors.blue600}
      color={useColorModeValue("#F5F5F5", colors.white)}
      borderWidth="1px"
      borderStyle="solid"
      borderColor={useColorModeValue("#5064E2", colors.blue600)}
      attributes={{ onClick }}
    >
      Connect wallet
    </Box>
  )
}

export type ButtonProps = PropsWithChildren<{
  mt?: string;
  mb?: string;
  width?: string;
  height?: string;
  disabled?: boolean;
  onClick?: () => void;
}>;

export function PrimaryButton({
  mt, mb,
  width = "auto",
  height = "64px",
  children,
  disabled,
  onClick = () => {},
}: ButtonProps) {
  const txPrimary = useColorModeValue("#F5F5F5", colors.white);
  const txDisabled = useColorModeValue(colors.gray600, colors.blue400);
  const bgDisabled = useColorModeValue(colors.gray700, colors.blue100);

  return (
    <Box
      mt={mt}
      mb={mb}
      width={width}
      height={height}
      fontSize="18px"
      fontWeight="600"
      lineHeight="22px"
      display="flex"
      borderRadius="6px"
      alignItems="center"
      justifyContent="center"
      cursor={disabled ? "not-allowed" : "pointer"}
      color={disabled ? txDisabled : txPrimary}
      backgroundColor={disabled ? bgDisabled : colors.blue600 }
      attributes={{ onClick }}
    >
      {children }
    </Box>
  )
}