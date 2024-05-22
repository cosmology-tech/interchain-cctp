import { arbitrum, avalanche, base, mainnet as ethereum, optimism, polygon } from 'viem/chains';

export type FinalityTime = `${number} ${'minutes' | 'seconds' | 'minute' | 'second'}`;

/** @see https://docs.axelar.dev/learn/txduration#common-finality-time-for-interchain-transactions */
const finalityTimeMap: Record<string, FinalityTime> = {
  [`${ethereum.id}`]: '16 minutes',
  [`${avalanche.id}`]: '3 seconds',
  [`${polygon.id}`]: '5 minutes',
  [`${optimism.id}`]: '30 minutes',
  [`${arbitrum.id}`]: '20 minutes',
  [`${base.id}`]: '24 minutes'
};

/** @see https://docs.axelar.dev/learn/txduration#common-finality-time-for-interchain-transactions */
export function getFinalityTime(id: string | FinalityTime) {
  return finalityTimeMap[`${id}`] || '30 minutes';
}
