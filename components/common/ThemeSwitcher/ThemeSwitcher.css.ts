import { style, styleVariants, createVar } from "@vanilla-extract/css";

const borderColorVar = createVar();
const bgVar = createVar();
const fillColorVar = createVar();

const switcherBase = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  forcedColorAdjust: "none",
  color: fillColorVar,
});

export const switcher = styleVariants({
  light: [
    switcherBase,
    {
      vars: {
        [bgVar]: "#ffffff",
        [borderColorVar]: "#D5D5E8",
        [fillColorVar]: "#6D6D88",
      },
    },
  ],
  dark: [
    switcherBase,
    {
      vars: {
        [bgVar]: "#0F1331",
        [borderColorVar]: "#1E2457",
        [fillColorVar]: "#4E5DBC",
      },
    },
  ],
});

export const switcherIndicator = style({
  borderRadius: "18px",
  border: `1px solid ${borderColorVar}`,
  transition: "all 200ms",
  backgroundColor: bgVar,
  width: "34px",
  height: "17px",
  marginRight: "8px",
  selectors: {
    "&:before": {
      content: "''",
      display: "block",
      width: "12px",
      height: "12px",
      margin: "1.5px",
      background: fillColorVar,
      borderRadius: "50%",
      transform: "translateX(15%)",
      transition: "all 200ms",
    },
    [`${switcherBase}[data-selected] &:before`]: {
      transform: "translateX(130%)",
    },
  },
});
