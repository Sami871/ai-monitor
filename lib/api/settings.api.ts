import api from "@/lib/axios";
import type { SystemSettings } from "@/types/Settings";

export const settingsApi = {
  getSettings: async (): Promise<SystemSettings> => {
    const res = await api.get<SystemSettings>("/settings");
    return res.data;
  },

  updateSettings: async (
    partial: Partial<SystemSettings>,
  ): Promise<SystemSettings> => {
    const res = await api.patch<SystemSettings>("/settings", partial);
    return res.data;
  },
};
