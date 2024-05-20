import { useColorModeValue } from '@interchain-ui/react';
import { colors } from '@/config';

export const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M8 3.5C3 3.5 1 8 1 8C1 8 3 12.5 8 12.5C13 12.5 15 8 15 8C15 8 13 3.5 8 3.5Z"
      stroke={useColorModeValue(colors.gray500, colors.blue600)}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z"
      stroke={useColorModeValue(colors.gray500, colors.blue600)}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const EyeSlashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M3 2.5L13 13.5"
      stroke={useColorModeValue(colors.gray500, colors.blue600)}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.625 4.2875C2.075 5.575 1 8 1 8C1 8 3 12.5 8 12.5C9.17161 12.5095 10.3286 12.2396 11.375 11.7125"
      stroke={useColorModeValue(colors.gray500, colors.blue600)}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.4 10.225C14.5062 9.10625 15 8 15 8C15 8 13 3.5 8 3.5C7.7625 3.5 7.5375 3.5125 7.3125 3.53125"
      stroke={useColorModeValue(colors.gray500, colors.blue600)}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
