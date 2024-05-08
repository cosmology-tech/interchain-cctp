import Link from 'next/link';
import Image from 'next/image';
import { Box, useColorModeValue } from '@interchain-ui/react';
import { ThemeSwitcher } from '@/components/common/ThemeSwitcher';

interface HeaderProps {
  children?: React.ReactNode;
}

export function Header(props: HeaderProps) {
  return (
    <Box display="flex" pt="40px" alignItems="center" justifyContent="space-between">
      <Link href="/">
        <Image
          width={206}
          height={36}
          alt="Noble Express"
          src={useColorModeValue('/logos/noble-express-light.svg', '/logos/noble-express-dark.svg')}
        />
      </Link>

      {props.children}

      <ThemeSwitcher />
    </Box>
  );
}
