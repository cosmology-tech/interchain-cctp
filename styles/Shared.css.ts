import { style } from "@vanilla-extract/css";

export const buttonReset = style({
  backgroundColor: "transparent",
  cursor: "pointer",
  appearance: "none",
  border: "none",
  position: "relative",
  userSelect: "none",
  whiteSpace: "nowrap",
  verticalAlign: "middle",
  lineHeight: 1.2,
  transitionProperty:
    "background-color,border-color,color,fill,stroke,opacity,box-shadow,transform,filter",
  transitionDuration: "200ms",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  selectors: {
    "&:focus": {
      outline: "none",
    },
  },
});
