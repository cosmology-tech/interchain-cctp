import * as React from "react";

export function MoonIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.352 1.145a.5.5 0 01.108.546 6 6 0 007.849 7.849.5.5 0 01.654.653 7.001 7.001 0 11-9.156-9.156.5.5 0 01.545.108z"
        fill="currentColor"
      />
    </svg>
  );
}
