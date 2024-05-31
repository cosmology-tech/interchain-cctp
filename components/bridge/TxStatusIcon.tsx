import { Box, useColorModeValue } from '@interchain-ui/react';
import { colors } from '@/config';

export const TxStatusIcon = {
  Success: () => (
    <svg width="87" height="87" viewBox="0 0 87 87" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Box
        as="circle"
        fill={useColorModeValue('$gray800', '$blue300')}
        stroke={useColorModeValue('$gray700', '$blue400')}
        attributes={{ cx: '43.5', cy: '43.5', r: '43' }}
      />
      <Box
        as="path"
        fill={useColorModeValue('$gray500', '$blue600')}
        attributes={{
          d: 'M24.238 42.136C25.6793 40.7448 28.0077 40.7448 29.449 42.136L37.9516 50.4022L59.3502 29.5985C60.8158 28.3758 63.0021 28.46 64.3672 29.7872C65.7324 31.1144 65.8155 33.2365 64.5612 34.6647L40.5398 58.0182H40.5363C39.095 59.4128 36.7666 59.4128 35.3253 58.0182L24.2379 47.2391C23.538 46.5654 23.1465 45.6458 23.1465 44.6892C23.1465 43.7292 23.5381 42.813 24.238 42.136Z'
        }}
      />
    </svg>
  ),
  Failed: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="87" height="87" viewBox="0 0 87 87" fill="none">
      <Box
        as="circle"
        fill={useColorModeValue(colors.red50, colors.blue300)}
        stroke={useColorModeValue(colors.red100, colors.red400)}
        attributes={{ cx: '43.5', cy: '43.5', r: '43' }}
      />
      <Box
        as="path"
        fill={colors.red200}
        attributes={{
          fillRule: 'evenodd',
          clipRule: 'evenodd',
          d: 'M34.1213 30.8787C32.9497 29.7071 31.0503 29.7071 29.8787 30.8787C28.7071 32.0503 28.7071 33.9497 29.8787 35.1213L38.7416 43.9843L29.8787 52.8473C28.7071 54.0188 28.7071 55.9183 29.8787 57.0899C31.0503 58.2615 32.9497 58.2615 34.1213 57.0899L42.9843 48.2269L51.8472 57.0899C53.0188 58.2614 54.9183 58.2614 56.0899 57.0899C57.2614 55.9183 57.2614 54.0188 56.0899 52.8472L47.2269 43.9843L56.0899 35.1214C57.2614 33.9498 57.2614 32.0503 56.0899 30.8787C54.9183 29.7071 53.0188 29.7071 51.8472 30.8787L42.9843 39.7416L34.1213 30.8787Z'
        }}
      />
    </svg>
  )
};
