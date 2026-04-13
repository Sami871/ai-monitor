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

export interface DashboardActivity {
  id: string;
  timestamp: string;
  counts: Record<string, number>;
  filename: string;
  duration: string;
  processing_time: number;
}
