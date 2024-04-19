export type CopyIconProps = {
  color?: string;
}

export function CopyIcon({ color }: CopyIconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 6.39961H13.6C14.0418 6.39961 14.4 6.75778 14.4 7.19961L14.4 14.3996L7.19998 14.3996C6.75815 14.3996 6.39998 14.0414 6.39998 13.5996V11.9996M7.99998 1.59961L3.19998 1.59961C2.31632 1.59961 1.59998 2.31595 1.59998 3.19961L1.59998 7.99961C1.59998 8.88326 2.31632 9.59961 3.19998 9.59961L7.99998 9.59961C8.88363 9.59961 9.59998 8.88326 9.59998 7.99961L9.59998 3.19961C9.59998 2.31595 8.88363 1.59961 7.99998 1.59961Z"
        stroke={color || "#6B7FFF"}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
