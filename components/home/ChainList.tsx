import { colors } from '@/config';
import { Box, Text, Skeleton, useColorModeValue, useTheme } from '@interchain-ui/react';
import { Button as AriaButton } from 'react-aria-components';
import { Tooltip } from '@/components/common/Tooltip';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { buttonReset, scrollBar } from '@/styles/Shared.css';
import { useUsdcChains } from '@/hooks';

export function ChainList() {
  const { theme } = useTheme();
  const { data: chains } = useUsdcChains();

  return (
    <Box textAlign="center" display="flex" justifyContent="center" alignItems="center">
      <Tooltip.Trigger delay={0.2}>
        <AriaButton className={buttonReset}>
          <Box display="flex" alignItems="center" justifyContent="center" cursor="pointer">
            <ImageWithFallback src="/coins/ethereum.svg" alt="Ethereum" width={28} height={28} />

            <ImageWithFallback
              src={useColorModeValue('/coins/optimism-light.svg', '/coins/optimism-dark.svg')}
              alt="Optimism"
              width={33}
              height={32}
              style={{ position: 'relative', left: '-6px' }}
            />

            <ImageWithFallback
              src={useColorModeValue('/coins/dydx-light.svg', '/coins/dydx-dark.svg')}
              alt="dYdX"
              width={32}
              height={32}
              style={{ position: 'relative', left: '-15px' }}
            />

            <ImageWithFallback
              src={useColorModeValue('/coins/arbitrum-light.svg', '/coins/arbitrum-dark.svg')}
              alt="Arbitrum"
              width={32}
              height={32}
              style={{ position: 'relative', left: '-23px' }}
            />

            <ImageWithFallback
              src={useColorModeValue('/coins/noble-light.svg', '/coins/noble-dark.svg')}
              alt="Noble"
              width={32}
              height={32}
              style={{ position: 'relative', left: '-32px' }}
            />

            <Text
              color={useColorModeValue(colors.gray500, colors.blue700)}
              lineHeight="20px"
              fontWeight="500"
              attributes={{ marginLeft: '-30px' }}
            >
              +30
            </Text>
          </Box>
        </AriaButton>

        <Tooltip placement="bottom">
          <Box
            display="grid"
            gridTemplateColumns={{
              mobile: 'repeat(2, 1fr)',
              tablet: 'repeat(3, 1fr)'
            }}
            gridTemplateRows={{
              mobile: 'minmax(28px, auto)',
              tablet: 'minmax(28px, auto)'
            }}
            gridAutoFlow="row dense"
            columnGap="8px"
            rowGap="12px"
            maxHeight="240px"
            overflowY="auto"
            className={scrollBar[theme]}
          >
            {!chains && (
              <>
                {Array.from({ length: 15 }).map((_, index) => (
                  <ChainItemSkeleton key={index} />
                ))}
              </>
            )}

            {chains &&
              chains?.map((chain) => (
                <ChainItem
                  key={chain.chainID}
                  name={chain.prettyName}
                  src={chain.logoUrl ?? ''}
                  alt={chain.prettyName}
                  width={28}
                  height={28}
                />
              ))}
          </Box>
        </Tooltip>
      </Tooltip.Trigger>
    </Box>
  );
}

interface ChainItemProps {
  name: string;
  src: string;
  alt?: string;
  width: number;
  height: number;
}

function ChainItem(props: ChainItemProps) {
  return (
    <Box display="flex" justifyContent="flex-start" alignItems="center" gap="$6" width="182px">
      <ImageWithFallback
        src={props.src}
        alt={props.alt ?? props.name}
        width={props.width}
        height={props.height}
        style={{
          borderRadius: '100%'
        }}
      />

      <Text
        as="span"
        fontSize="$sm"
        fontWeight="$normal"
        color={useColorModeValue('$gray700', '$text')}
      >
        {props.name}
      </Text>
    </Box>
  );
}

function ChainItemSkeleton() {
  return (
    <Box display="flex" justifyContent="flex-start" alignItems="center" gap="$6" width="182px">
      <Skeleton width="28px" height="28px" borderRadius="$full" />

      <Skeleton width="80px" height="20px" borderRadius="$sm" />
    </Box>
  );
}
