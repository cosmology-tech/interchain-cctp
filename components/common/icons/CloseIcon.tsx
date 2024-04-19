import { useColorModeValue } from "@interchain-ui/react";
export function CloseIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="9" cy="9" r="9" fill={useColorModeValue("#6D6D88", "#4E5DBC")} />
      <rect
        x="5.46436"
        y="4.05029"
        width="12"
        height="2"
        rx="1"
        transform="rotate(45 5.46436 4.05029)"
        fill={useColorModeValue("#EEF2F8", "#0F1331")}
      />
      <rect
        x="13.9497"
        y="5.46436"
        width="12"
        height="2"
        rx="1"
        transform="rotate(135 13.9497 5.46436)"
        fill={useColorModeValue("#EEF2F8", "#0F1331")}
      />
    </svg>
  );
}