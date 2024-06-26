import * as React from 'react';

export function ExchangeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={36}
      height={36}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M21 12v18l6-6M15 24V6l-6 6"
        stroke="#AFB4D0"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
