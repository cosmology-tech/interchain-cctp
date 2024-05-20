import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsStore {
  hideZeroBalances: boolean;
}

const defaultValues: SettingsStore = {
  hideZeroBalances: false
};

export const useSettingsStore = create<SettingsStore>()(
  persist(() => defaultValues, {
    name: 'settings-store',
    version: 1
  })
);
