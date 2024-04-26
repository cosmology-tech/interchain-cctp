import {
  Switch as AriaSwitch,
  SwitchProps as AriaSwitchProps,
} from "react-aria-components";
import { useTheme } from "@interchain-ui/react";
import { SunIcon, MoonIcon } from "@/components/common/icons";

import * as styles from "./ThemeSwitcher.css";

export interface ThemeSwitcherProps extends Omit<AriaSwitchProps, "children"> {}

export function ThemeSwitcher({ ...props }: ThemeSwitcherProps) {
  const { theme, setTheme } = useTheme();

  return (
    <AriaSwitch
      {...props}
      isSelected={theme === "dark"}
      onChange={(isSelected) => {
        if (isSelected) return setTheme("dark");
        setTheme("light");
      }}
      className={styles.switcher[theme]}
    >
      <div className={styles.switcherIndicator} />

      {theme === "light" ? <MoonIcon /> : <SunIcon />}
    </AriaSwitch>
  );
}
