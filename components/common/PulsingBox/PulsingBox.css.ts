import { style, keyframes, createVar } from '@vanilla-extract/css';

export const boxWidthVar = createVar();
export const boxHeightVar = createVar();
export const pulseColorVar = createVar();

const rotate = keyframes({
  '100%': {
    transform: 'translate(-50%, -50%) rotate(1turn)'
  }
});

const baseBoxStyles = style({
  maxHeight: boxHeightVar,
  maxWidth: boxWidthVar,
  height: '100%',
  width: '100%',
  position: 'absolute',
  overflow: 'hidden',
  zIndex: 0,
  borderRadius: '8px',
  selectors: {
    '&:before': {
      content: '""',
      zIndex: -2,
      textAlign: 'center',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%) rotate(0deg)',
      position: 'absolute',
      width: '99999px',
      height: '99999px',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '0 0',
      backgroundImage: `conic-gradient(rgba(0, 0, 0, 0), ${pulseColorVar}, #a15fff, rgba(0, 0, 0, 0) 25%)`,
      animation: `${rotate} 5s linear infinite`
    }
  }
});

export const pulsingBox = style([
  baseBoxStyles,
  {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    selectors: {
      '&:after': {
        content: '""',
        position: 'absolute',
        zIndex: -1,
        left: '2px',
        top: '2px',
        width: 'calc(100% - 4px)',
        height: 'calc(100% - 4px)',
        background: '#2C3137',
        borderRadius: '45px'
      }
    }
  }
]);

export const pulsingBoxGlow = style([
  baseBoxStyles,
  {
    filter: 'blur(20px)'
  }
]);
