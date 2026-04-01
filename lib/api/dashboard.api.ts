import api from "@/lib/axios";
import type { DashboardStatsResponse } from "@/types/Dashboard";

export const dashboardApi = {
  getStats: async (): Promise<DashboardStatsResponse> => {
    const res = await api.get<DashboardStatsResponse>("/dashboard/stats");
    return res.data;
  },
};
