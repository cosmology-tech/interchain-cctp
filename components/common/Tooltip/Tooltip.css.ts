import { style, styleVariants, createVar, keyframes } from '@vanilla-extract/css';

export const bgVar = createVar();
export const originVar = createVar();
export const paddingVar = createVar();

const slide = keyframes({
  from: { transform: originVar, opacity: 0 },
  to: { transform: 'translateY(0)', opacity: 1 }
});

const baseTooltip = style({
  padding: paddingVar,
  borderRadius: '12px',
  boxShadow: `0 6px 15px 0 rgba(2, 4, 24, 0.15), 0 5px 7px 0 rgba(2, 4, 24, 0.15)`,
  //   Fix FF gap
  transform: 'translate3d(0, 0, 0)',
  outline: 'none',
  forcedColorAdjust: 'none',
  backgroundColor: bgVar,
  selectors: {
    [`&[data-placement=top]`]: {
      vars: {
        [originVar]: 'translateY(4px)'
      }
    },
    [`&[data-placement=bottom]`]: {
      vars: {
        [originVar]: 'translateY(-4px)'
      }
    },
    [`&[data-placement=right]`]: {
      vars: {
        [originVar]: 'translateX(-4px)'
      }
    },
    [`&[data-placement=left]`]: {
      vars: {
        [originVar]: 'translateX(4px)'
      }
    },
    [`&[data-entering]`]: {
      animation: `${slide} 200ms`
    },
    [`&[data-exiting]`]: {
      animation: `${slide} 200ms reverse ease-in`
    }
  }
});

export const tooltip = styleVariants({
  light: [
    baseTooltip,
    {
      vars: {
        [bgVar]: '#020418'
      }
    }
  ],
  dark: [
    baseTooltip,
    {
      vars: {
        [bgVar]: '#0F1331'
      }
    }
  ]
});

const baseArrow = style({
  color: bgVar,
  height: '16px',
  width: '16px'
});

export const arrow = styleVariants({
  light: [baseArrow],
  dark: [baseArrow]
});

export const arrowSvg = style({
  display: 'block',
  selectors: {
    [`${baseArrow}[data-placement=top] &`]: {
      transform: 'translateY(-3px)'
    },
    [`${baseArrow}[data-placement=bottom] &`]: {
      transform: 'rotate(180deg) translateY(-3px)'
    },
    [`${baseArrow}[data-placement=right] &`]: {
      transform: 'rotate(90deg) translateY(-3px)'
    },
    [`${baseArrow}[data-placement=left] &`]: {
      transform: 'rotate(-90deg) translateY(-3px)'
    }
  }
});
