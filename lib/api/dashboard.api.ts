import api from "@/lib/axios";
import type { DashboardStatsResponse, DashboardActivity } from "@/types/Dashboard";

export const dashboardApi = {
  getStats: async (): Promise<DashboardStatsResponse> => {
    const res = await api.get<DashboardStatsResponse>("/dashboard/stats");
    return res.data;
  },
  getActivity: async (limit: number = 5): Promise<DashboardActivity[]> => {
    const res = await api.get<DashboardActivity[]>(`/dashboard/activity?limit=${limit}`);
    return res.data;
  },
};
