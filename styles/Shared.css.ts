import { style, createVar, styleVariants } from '@vanilla-extract/css';

export const buttonReset = style({
  backgroundColor: 'transparent',
  cursor: 'pointer',
  appearance: 'none',
  border: 'none',
  position: 'relative',
  userSelect: 'none',
  whiteSpace: 'nowrap',
  padding: 0,
  verticalAlign: 'middle',
  lineHeight: 1.2,
  transitionProperty:
    'background-color,border-color,color,fill,stroke,opacity,box-shadow,transform,filter',
  transitionDuration: '200ms',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  selectors: {
    '&:focus': {
      outline: 'none'
    }
  }
});

export const inputReset = style({
  appearance: 'none',
  backgroundColor: 'transparent',
  border: 'none',
  outline: 'none',
  width: '100%',
  padding: '0',
  margin: '0',
  color: 'inherit',
  font: 'inherit'
});

export const scrollBarThumbBgVar = createVar();

const scrollBarBase = style({
  // Firefox
  scrollbarWidth: 'thin' /* "auto" or "thin" */,
  scrollbarColor: `${scrollBarThumbBgVar} transparent` /* scroll thumb and track */,
  selectors: {
    '&::-webkit-scrollbar': {
      width: '8px'
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: scrollBarThumbBgVar,
      borderRadius: '4px'
    }
  }
});

export const scrollBar = styleVariants({
  light: [
    style({
      vars: {
        [scrollBarThumbBgVar]: '#6D6D88'
      }
    }),
    scrollBarBase
  ],
  dark: [
    style({
      vars: {
        [scrollBarThumbBgVar]: '#4E5DBC'
      }
    }),
    scrollBarBase
  ]
});
