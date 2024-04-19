import { SkipChain } from "@/skip";

export type UsdcTokenProps = Partial<UsdcToken>

export const BalanceNotAvailable = '--';
export class UsdcToken {
  id: string | number;
  name: string;
  logo: string;
  chain: SkipChain;
  balance: string | '--';
  contract?: `0x${string}`;

  constructor(
    { id, name, logo, chain, balance, contract }: UsdcTokenProps,
  ) {
    this.id = id!;
    this.name = name ?? "USDC";
    this.logo = logo ?? "/coins/usdc.svg";
    this.chain = chain!;
    this.balance = balance!;
    this.contract = contract;
  }

  get isBalanceGtZero() {
    return +this.balance > 0;
  }

  get isBalanceNotAvailable() {
    return this.balance === BalanceNotAvailable;
  }

  value(price: number) {
    return this.isBalanceNotAvailable
      ? BalanceNotAvailable
      : +this.balance > 0
      ? `${(price * parseFloat(this.balance || "0")).toFixed(2)}`
      : "0.00";
  }
}