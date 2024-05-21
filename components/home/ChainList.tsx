import Image from 'next/image';
import { colors } from '@/config';
import { Box, Text, useColorModeValue } from '@interchain-ui/react';
import { Button as AriaButton } from 'react-aria-components';
import { Tooltip } from '@/components/common/Tooltip';
import { buttonReset } from '@/styles/Shared.css';
import { useUsdcChains } from '@/hooks';

export function ChainList() {
  const { data: chains } = useUsdcChains();

  return (
    <Box textAlign="center" display="flex" justifyContent="center" alignItems="center">
      <Tooltip.Trigger delay={0.2}>
        <AriaButton className={buttonReset}>
          <Box display="flex" alignItems="center" justifyContent="center" cursor="pointer">
            <Image src="/coins/ethereum.svg" alt="Ethereum" width={28} height={28} />
            <Image
              src={useColorModeValue('/coins/optimism-light.svg', '/coins/optimism-dark.svg')}
              alt="Optimism"
              width={33}
              height={32}
              style={{ position: 'relative', left: '-6px' }}
            />
            <Image
              src={useColorModeValue('/coins/dydx-light.svg', '/coins/dydx-dark.svg')}
              alt="dYdX"
              width={32}
              height={32}
              style={{ position: 'relative', left: '-15px' }}
            />
            <Image
              src={useColorModeValue('/coins/arbitrum-light.svg', '/coins/arbitrum-dark.svg')}
              alt="Arbitrum"
              width={32}
              height={32}
              style={{ position: 'relative', left: '-23px' }}
            />
            <Image
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
              +16
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
          >
            <ChainItem
              name="Ethereum"
              src="/coins/ethereum.svg"
              alt="Ethereum"
              width={28}
              height={28}
            />

            <ChainItem
              name="Optimism"
              src={useColorModeValue('/coins/optimism-light.svg', '/coins/optimism-dark.svg')}
              alt="Optimism"
              width={28}
              height={28}
            />

            <ChainItem
              name="dYdX"
              src={useColorModeValue('/coins/dydx-light.svg', '/coins/dydx-dark.svg')}
              alt="dYdX"
              width={28}
              height={28}
            />

            <ChainItem
              name="Arbitrum"
              src={useColorModeValue('/coins/arbitrum-light.svg', '/coins/arbitrum-dark.svg')}
              alt="Arbitrum"
              width={28}
              height={28}
            />

            <ChainItem
              name="Noble"
              src={useColorModeValue('/coins/noble-light.svg', '/coins/noble-dark.svg')}
              alt="Noble"
              width={28}
              height={28}
            />
            {/* Second column */}
            <ChainItem
              name="Ethereum"
              src="/coins/ethereum.svg"
              alt="Ethereum"
              width={28}
              height={28}
            />

            <ChainItem
              name="Optimism"
              src={useColorModeValue('/coins/optimism-light.svg', '/coins/optimism-dark.svg')}
              alt="Optimism"
              width={28}
              height={28}
            />

            <ChainItem
              name="dYdX"
              src={useColorModeValue('/coins/dydx-light.svg', '/coins/dydx-dark.svg')}
              alt="dYdX"
              width={28}
              height={28}
            />

            <ChainItem
              name="Arbitrum"
              src={useColorModeValue('/coins/arbitrum-light.svg', '/coins/arbitrum-dark.svg')}
              alt="Arbitrum"
              width={28}
              height={28}
            />

            <ChainItem
              name="Noble"
              src={useColorModeValue('/coins/noble-light.svg', '/coins/noble-dark.svg')}
              alt="Noble"
              width={28}
              height={28}
            />

            {/* Third column */}

            <ChainItem
              name="Ethereum"
              src="/coins/ethereum.svg"
              alt="Ethereum"
              width={28}
              height={28}
            />

            <ChainItem
              name="Optimism"
              src={useColorModeValue('/coins/optimism-light.svg', '/coins/optimism-dark.svg')}
              alt="Optimism"
              width={28}
              height={28}
            />

            <ChainItem
              name="dYdX"
              src={useColorModeValue('/coins/dydx-light.svg', '/coins/dydx-dark.svg')}
              alt="dYdX"
              width={28}
              height={28}
            />

            <ChainItem
              name="Arbitrum"
              src={useColorModeValue('/coins/arbitrum-light.svg', '/coins/arbitrum-dark.svg')}
              alt="Arbitrum"
              width={28}
              height={28}
            />

            <ChainItem
              name="Noble"
              src={useColorModeValue('/coins/noble-light.svg', '/coins/noble-dark.svg')}
              alt="Noble"
              width={28}
              height={28}
            />
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
      <Image
        src={props.src}
        alt={props.alt ?? props.name}
        width={props.width}
        height={props.height}
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
