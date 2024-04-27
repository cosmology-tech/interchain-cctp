import cls from "clsx";
import { Button as AriaButton, ButtonProps } from "react-aria-components";
import { buttonReset } from "@/styles/Shared.css";

export function BaseButton(props: ButtonProps) {
  return (
    <AriaButton {...props} className={cls(props.className, buttonReset)} />
  );
}
