import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Box, useColorModeValue } from '@interchain-ui/react';
import { ThemeSwitcher } from '@/components/common/ThemeSwitcher';
import { HistoryLink } from './HistoryLink';

interface HeaderProps {
  children?: React.ReactNode;
}

export function Header(props: HeaderProps) {
  const router = useRouter();
  const isHomePage = router.pathname === '/';

  return (
    <Box
      display="flex"
      pt="40px"
      alignItems="center"
      justifyContent={{
        mobile: 'space-between',
        mdMobile: 'space-between'
      }}
      flexWrap={{
        mobile: isHomePage ? 'nowrap' : 'wrap',
        mdMobile: 'nowrap'
      }}
    >
      <Box paddingRight={isHomePage ? '$0' : '$27'} flexShrink={0}>
        <Link href="/">
          <Image
            width={162.1}
            height={36}
            alt="Interweb"
            src={useColorModeValue(
              '/logos/interweb-logo-light.svg',
              '/logos/interweb-logo-dark.svg'
            )}
          />
        </Link>
      </Box>

      <Box
        display="flex"
        width={{
          mobile: isHomePage ? 'auto' : '100%',
          mdMobile: 'auto'
        }}
        justifyContent={{
          mobile: isHomePage ? 'center' : 'space-between',
          mdMobile: 'center'
        }}
        alignItems="center"
        paddingTop={{
          mobile: isHomePage ? '0' : '24px',
          mdMobile: '0'
        }}
      >
        {isHomePage ? null : <HistoryLink />}

        <ThemeSwitcher />
      </Box>
    </Box>
  );
}
