export interface DashboardBreakdown {
  car?: number;
  bicycle?: number;
  person?: number;
  truck?: number;
  animal?: number;
  bird?: number;
  [key: string]: number | undefined;
}

export interface DashboardStats {
  total: number;
  breakdown: DashboardBreakdown;
}

export interface DashboardStatsResponse {
  lifetime: DashboardStats;
  last_24h: DashboardStats;
}
