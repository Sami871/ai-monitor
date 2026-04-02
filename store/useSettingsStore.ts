import { create } from "zustand";
import { settingsApi } from "@/lib/api/settings.api";
import type { SystemSettings } from "@/types/Settings";

interface SettingsStore {
  settings: SystemSettings | null;
  isLoading: boolean;
  isUpdating: boolean;
  error: string | null;
  fetchSettings: () => Promise<void>;
  updateSetting: <K extends keyof SystemSettings>(key: K, value: SystemSettings[K]) => Promise<void>;
}

export const useSettingsStore = create<SettingsStore>((set, get) => ({
  settings: null,
  isLoading: false,
  isUpdating: false,
  error: null,
  fetchSettings: async () => {
    set({ isLoading: true, error: null });
    try {
      const settings = await settingsApi.getSettings();
      set({ settings, isLoading: false });
    } catch (err: any) {
      set({ error: "Failed to fetch settings", isLoading: false });
    }
  },
  updateSetting: async (key, value) => {
    const currentSettings = get().settings;
    if (!currentSettings) return;

    // Local update
    set({
      settings: { ...currentSettings, [key]: value },
      isUpdating: true,
    });

    try {
      await settingsApi.updateSettings({ [key]: value });
      set({ isUpdating: false });
    } catch (err: any) {
      // Rollback on failure
      set({ settings: currentSettings, error: "Failed to update setting", isUpdating: false });
    }
  },
}));
