import { style } from "@vanilla-extract/css";
import { breakpoints } from "@/styles/breakpoints";

export const containerBackgroundTop = style({
  transform: "scale(0.5) translate(-200px, -100px)",
  "@media": {
    [`screen and (min-width: ${breakpoints.tablet}px)`]: {
      transform: "scale(0.65) translate(-100px, -100px)",
    },
    [`screen and (min-width: ${breakpoints.desktop}px)`]: {
      transform: "scale(1) translate(0, 0)",
    },
  },
});

export const containerBackgroundBottom = style({
  transform: "scale(0.5) translate(200px, 100px)",
  "@media": {
    [`screen and (min-width: ${breakpoints.tablet}px)`]: {
      transform: "scale(0.65) translate(100px, 100px)",
    },
    [`screen and (min-width: ${breakpoints.desktop}px)`]: {
      transform: "scale(1) translate(0, 0)",
    },
  },
});
