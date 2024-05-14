import * as React from 'react';

export function BgDarkBottom(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={313}
      height={679}
      viewBox="0 0 313 679"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <mask
        id="a"
        style={{
          maskType: 'alpha'
        }}
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={313}
        height={679}
      >
        <path fill="#D9D9D9" d="M0 0H313V679H0z" />
      </mask>
      <g mask="url(#a)">
        <path
          d="M620.41 306.913v204.719a102.374 102.374 0 01-28.068 70.447 102.442 102.442 0 01-68.852 31.826 102.452 102.452 0 01-71.873-24.249 102.38 102.38 0 01-35.475-67.026c-.328-2.749-.459-5.499-.524-8.314V308.68a15.782 15.782 0 010-1.767 102.381 102.381 0 00-62.601-96.938 102.477 102.477 0 00-79.591 0 102.398 102.398 0 00-55.563 56.966 102.381 102.381 0 00-7.038 39.972v409.372a102.387 102.387 0 01-29.058 74.07 102.455 102.455 0 01-146.676 0 102.36 102.36 0 01-29.058-74.07V306.913a307.048 307.048 0 0174.65-200.468A307.252 307.252 0 01268.163 3.327a307.31 307.31 0 01209.353 44.257 307.123 307.123 0 01129.666 170.161 307.59 307.59 0 0113.229 89.168z"
          stroke="url(#paint0_linear_332_1047)"
          strokeOpacity={0.5}
          strokeWidth={3.70702}
          strokeMiterlimit={10}
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_332_1047"
          x1={141.441}
          y1={687.056}
          x2={696.003}
          y2={20.7137}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#A0ADFF" stopOpacity={0.1} />
          <stop offset={1} stopColor="#4C52D8" stopOpacity={0.75} />
        </linearGradient>
      </defs>
    </svg>
  );
}
