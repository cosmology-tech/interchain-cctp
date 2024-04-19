export type ChevronProps = {
  color?: string;
};

export function ChevronDown({ color }: ChevronProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 9L12 15L6 9"
        stroke={color || "#4D5270"}
        stroke-width="2"
        stroke-linecap="square"
      />
    </svg>
  );
}
