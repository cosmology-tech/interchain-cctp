import { useColorModeValue } from "@interchain-ui/react";
import { colors } from "@/config";

export function ExitIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.85342 2.40039H3.38283C3.00841 2.40039 2.64932 2.54789 2.38457 2.81044C2.11981 3.07299 1.97107 3.42909 1.97107 3.80039V12.2004C1.97107 12.5717 2.11981 12.9278 2.38457 13.1903C2.64932 13.4529 3.00841 13.6004 3.38283 13.6004H5.85342M6.02888 8.00039H14.0289M14.0289 8.00039L10.9721 4.80039M14.0289 8.00039L10.9721 11.2004"
        stroke={useColorModeValue(colors.gray500, colors.blue600)}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
