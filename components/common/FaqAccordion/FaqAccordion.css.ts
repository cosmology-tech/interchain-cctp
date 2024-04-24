import { style } from "@vanilla-extract/css";

export const accordionTrigger = style({
  padding: `0 !important`,
  selectors: {
    '&[data-expanded="true"]': {
      borderBottomLeftRadius: "0 !important",
      borderBottomRightRadius: "0 !important",
      borderBottomWidth: "0 !important",
    },
  },
});
