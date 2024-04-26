import { style } from "@vanilla-extract/css";

export const buttonContainer = style({
  display: "flex",
  selectors: {
    '&[data-expanded="false"]': {
      justifyContent: "center",
    },
  },
});
