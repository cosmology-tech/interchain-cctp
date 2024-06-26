export type ChevronProps = {
  color?: string;
  className?: string;
};

export function ChevronDown({ color, className }: ChevronProps) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M18 9L12 15L6 9"
        stroke={color || '#4D5270'}
        strokeWidth="2"
        strokeLinecap="square"
      />
    </svg>
  );
}
