import Link from "next/link";
import Image from "next/image";
import {
  Box,
  useTheme,
  useColorModeValue,
} from "@interchain-ui/react";

export function Header() {
  const { theme, setTheme } = useTheme();

  const toggleColorMode = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Box display="flex" pt="40px" alignItems="center" justifyContent="space-between">
      <Link href="/">
        <Image
          width={206}
          height={36}
          alt="Noble Express"
          src={useColorModeValue(
            "/logos/noble-express-light.svg",
            "/logos/noble-express-dark.svg",
          )}
        />
      </Link>
      <Box
        cursor="pointer"
        attributes={{onClick: toggleColorMode }}
      >
        {theme === "dark"
          ? <Image src="/icons/sun.svg" alt="Light" width={16} height={16} />
          : <Image src="/icons/moon.svg" alt="Dark" width={16} height={16} />
        }
      </Box>
    </Box>
  );
}
