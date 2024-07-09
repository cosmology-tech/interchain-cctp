import { style, styleVariants } from '@vanilla-extract/css';
import { inputReset } from '@/styles/Shared.css';
import { colors } from '@/config/theme';

const baseDropdown = style({
  // 5 items * 96px + input height
  maxHeight: `calc(5 * 96px + 56px) !important`,
  width: '466px',
  // @ts-ignore
  overflowX: 'hidden !important',
  selectors: {
    '&[data-open]': {
      borderRadius: '8px',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      outline: 'none',
      border: 'none'
    }
  }
});

export const comboboxDropdown = styleVariants({
  light: [
    {
      backgroundColor: '#ffffff'
    },
    baseDropdown
  ],
  dark: [
    {
      backgroundColor: '#0F1331'
    },
    baseDropdown
  ]
});

export const comboboxButton = style({
  position: 'relative',
  cursor: 'pointer',
  flexShrink: 0,
  selectors: {
    '&[data-focus], &[data-hover][data-active]:not([data-open])': {
      outline: 'none',
      border: 'none'
    }
  }
});

export const comboboxButtonArrow = style({
  transition: 'transform 0.2s',
  selectors: {
    [`${comboboxButton}[aria-expanded="true"] &`]: {
      transform: 'rotate(180deg)'
    }
  }
});

const selectAmountTokenInputBase = style({
  fontSize: '20px',
  maxWidth: '150px',
  selectors: {
    '&[data-is-selected="true"]': {
      maxWidth: '100px',
      width: 'min-content'
    }
  }
});

export const selectAmountTokenInput = styleVariants({
  light: [
    inputReset,
    selectAmountTokenInputBase,
    style({
      selectors: {
        '&::placeholder': {
          color: colors.gray700
        }
      }
    })
  ],
  dark: [
    inputReset,
    selectAmountTokenInputBase,
    style({
      selectors: {
        '&::placeholder': {
          color: colors.gray700
        }
      }
    })
  ]
});
