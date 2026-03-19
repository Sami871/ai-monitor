import AnalysisStatCard from "@/components/web/AnalysisCard";
import TrendChart from "./components/TrendChart";
import RecentActivity from "./components/RecentActivity";
import DonutChart from "./components/DonutChart";
import DashboardStatCard from "./components/TotalStatCard";
import {
  DASHBOARD_STATS,
  COMPACT_STATS,
  RECENT_ACTIVITY,
} from "@/data/dashboard-data";
import { DUMMY_ANALYSIS_RESULT } from "@/data/analysis-data";

export default function DashboardPage() {
  const { stats, detections, metadata } = DUMMY_ANALYSIS_RESULT;
  return (
    <div className="flex flex-col gap-4">
      {/* ── Row 1: Stat Cards ── */}
      <div className="grid grid-cols-5 gap-4 w-full">
        {/* First 4 equal cards */}
        {stats.map((stat) => (
          <AnalysisStatCard key={stat.id} data={stat} />
        ))}

        {/* Last column (stacked 2 cards) */}
        <div className="flex flex-col gap-4">
          {COMPACT_STATS.map((stat) => (
            <DashboardStatCard key={stat.id} stat={stat} className="flex-1" />
          ))}
        </div>
      </div>

      {/* ── Row 2: Trend Chart ── */}
      <TrendChart />

      {/* ── Row 3: Recent Activity + Donut ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-4 max-w-full">
        <div className="h-[400px]">
          <RecentActivity items={RECENT_ACTIVITY} />
        </div>

        <div className="h-[400px]">
          <DonutChart />
        </div>
      </div>
    </div>
  );
}
