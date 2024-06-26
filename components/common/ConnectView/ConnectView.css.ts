import { style, keyframes } from '@vanilla-extract/css';
import { colors } from '@/config/theme';

export const modalOverlay = style({
  position: 'fixed',
  inset: 0,
  zIndex: 10
});

export const modal = style({
  position: 'absolute',
  bottom: 0,
  width: '100%',
  borderRadius: '12px',
  willChange: 'transform',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  backgroundColor: 'transparent'
});

export const modalBody = style({
  maxWidth: '400px',
  padding: 0,
  borderRadius: '12px',
  outline: 'none',
  backgroundColor: 'transparent',
  transform: 'translate(-50%, -100%)',
  position: 'absolute',
  top: '50%',
  left: '50%',
  zIndex: 20
});

// ==== Other status components ====

const rotateSpinner = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' }
});

export const requestingStatusContainer = style({
  display: 'inline-flex',
  position: 'relative',
  overflow: 'hidden',
  zIndex: 4
});

export const requestingAvatarContainer = style({
  position: 'absolute',
  overflow: 'hidden',
  inset: '6px',
  borderRadius: '24px',
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 2
});

export const requestingStatus = style({
  position: 'absolute',
  inset: '1px',
  overflow: 'hidden'
});

export const requestingStatusSpinner = style({
  inset: '-25%',
  pointerEvents: 'none',
  userSelect: 'none',
  zIndex: 1,
  position: 'absolute',
  selectors: {
    '&::before': {
      position: 'absolute',
      content: '""',
      inset: 0,
      background: `conic-gradient( from -90deg, transparent, transparent, transparent, transparent, transparent, ${colors.blue600} )`,
      animation: `1200ms linear 0s infinite normal none running ${rotateSpinner}`
    },
    '&[data-status="requesting"]': {
      opacity: 1
    },
    '&[data-status="rejected"]': {
      opacity: 0
    },
    '&[data-status="error"]': {
      opacity: 0
    },
    '&[data-status="connected"]': {
      opacity: 0
    }
  }
});

export const requestingStatusBackground = style({
  zIndex: 3,
  position: 'relative',
  display: 'block',
  maxWidth: '100%'
});
