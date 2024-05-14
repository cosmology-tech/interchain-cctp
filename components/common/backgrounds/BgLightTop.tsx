import * as React from 'react';

export function BgLightTop(props: React.SVGProps<SVGSVGElement>) {
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
          d="M-308 367.186V161.738a102.736 102.736 0 0128.168-70.699 102.82 102.82 0 01141.227-7.604 102.75 102.75 0 0135.602 67.265c.328 2.759.46 5.519.526 8.344v206.369c.032.59.032 1.183 0 1.773a102.722 102.722 0 0029.161 74.334 102.821 102.821 0 00147.2 0 102.735 102.735 0 0029.162-74.334l-.001-410.831a102.727 102.727 0 0129.162-74.334A102.8 102.8 0 01205.806-149a102.81 102.81 0 0173.6 31.021 102.727 102.727 0 0129.162 74.334v410.831a308.144 308.144 0 01-74.917 201.183A308.352 308.352 0 0145.504 671.855a308.409 308.409 0 01-210.1-44.415 308.22 308.22 0 01-130.128-170.768A308.693 308.693 0 01-308 367.186z"
          stroke="url(#paint0_linear_332_1044)"
          strokeWidth={3.70702}
          strokeMiterlimit={10}
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_332_1044"
          x1={172.677}
          y1={-14.312}
          x2={-383.863}
          y2={654.406}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#A0ADFF" stopOpacity={0.1} />
          <stop offset={1} stopColor="#4C52D8" stopOpacity={0.75} />
        </linearGradient>
      </defs>
    </svg>
  );
}
