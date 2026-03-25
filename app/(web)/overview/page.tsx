import StatCard from "@/components/web/StatCard";
import TrendChart from "./components/TrendChart";
import RecentActivity from "./components/RecentActivity";
import DonutChart from "./components/DonutChart";
import {
  DASHBOARD_STATS,
  COMPACT_STATS,
  RECENT_ACTIVITY,
} from "@/data/dashboard-data";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      {/* ── Row 1: Stat Cards ── */}
      <div className="grid grid-cols-4 gap-4 w-full">
        {/* First 3 equal cards */}
        {DASHBOARD_STATS.map((stat) => (
          <StatCard
            key={stat.id}
            title={stat.title}
            count={stat.count}
            icon={stat.icon}
            iconColor={stat.iconColor}
            variant="dashboard"
            change={stat.change}
            changeType={stat.changeType}
          />
        ))}

        {/* Last column (stacked 2 cards) */}
        <div className="flex flex-col gap-4">
          {COMPACT_STATS.map((stat) => (
            <StatCard
              key={stat.id}
              title={stat.title}
              count={stat.count}
              icon={stat.icon}
              iconColor={stat.iconColor}
              variant="dashboard"
              size="compact"
              change={stat.change}
              changeType={stat.changeType}
            />
          ))}
        </div>
      </div>

      {/* ── Row 2: Trend Chart ── */}
      <TrendChart />

      {/* ── Row 3: Recent Activity + Donut ── */}
      <div className="flex gap-4 flex-col lg:flex-row w-full h-full">
        <div className="w-[65%]">
          <RecentActivity items={RECENT_ACTIVITY} />
        </div>

        <div className="w-[35%]">
          <DonutChart />
        </div>
      </div>
    </div>
  );
}
