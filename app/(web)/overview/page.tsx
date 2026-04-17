"use client";

import { useEffect } from "react";
import StatCard from "@/components/web/StatCard";
import TrendChart from "./components/TrendChart";
import RecentActivity from "./components/RecentActivity";
import DonutChart from "./components/DonutChart";
import {
  DASHBOARD_STATS as STATIC_DASHBOARD_STATS,
  COMPACT_STATS as STATIC_COMPACT_STATS,
  RECENT_ACTIVITY,
} from "@/data/dashboard-data";
import { useDashboardStore } from "@/store/useDashboardStore";

export default function DashboardPage() {
  const { stats, fetchStats } = useDashboardStore();

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const getCount = (id: string) => {
    if (!stats) return 0;
    const { lifetime } = stats;
    const { breakdown } = lifetime;

    switch (id) {
      case "total":
        return lifetime.total || 0;
      case "humans":
        return (breakdown.humans || 0);
      case "vehicles":
        return (
          (breakdown.vehicle || 0) 
        );
      case "animals":
        return (breakdown.animals || 0);
      case "birds":
        return (breakdown.birds || 0);
      default:
        return 0;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/*  overall stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full ">
        {STATIC_DASHBOARD_STATS.map((stat) => (
          <StatCard
            key={stat.id}
            title={stat.title}
            count={getCount(stat.id)}
            icon={stat.icon}
            iconColor={stat.iconColor}
            variant="dashboard"
            change={stat.change}
            changeType={stat.changeType}
          />
        ))}

        <div className="flex flex-col gap-4">
          {STATIC_COMPACT_STATS.map((stat) => (
            <StatCard
              key={stat.id}
              title={stat.title}
              count={getCount(stat.id)}
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

      {/*  Trend Chart */}
      <TrendChart />

      {/*  Recent Activity + Donut*/}
      <div className="flex gap-4 flex-col lg:flex-row w-full h-full">
        <div className="w-full lg:w-[65%]">
          <RecentActivity items={RECENT_ACTIVITY} />
        </div>

        <div className="w-full lg:w-[35%]">
          <DonutChart />
        </div>
      </div>
    </div>
  );
}
