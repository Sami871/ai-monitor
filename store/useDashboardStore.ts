import { create } from "zustand";
import { dashboardApi } from "@/lib/api/dashboard.api";
import type { DashboardStatsResponse } from "@/types/Dashboard";

interface DashboardStore {
  stats: DashboardStatsResponse | null;
  isLoading: boolean;
  error: string | null;
  fetchStats: () => Promise<void>;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  stats: null,
  isLoading: false,
  error: null,
  fetchStats: async () => {
    set({ isLoading: true, error: null });
    try {
      const stats = await dashboardApi.getStats();
      set({ stats, isLoading: false });
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch dashboard stats", isLoading: false });
    }
  },
}));
