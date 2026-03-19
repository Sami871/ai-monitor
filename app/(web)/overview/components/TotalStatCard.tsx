import { Activity, Users, Car, PawPrint, Bird } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DashboardStat } from "@/data/dashboard-data";

const ICON_MAP = {
  activity: Activity,
  human: Users,
  vehicle: Car,
  animal: PawPrint,
  bird: Bird,
};

interface DashboardStatCardProps {
  stat: DashboardStat;
  className?: string;
}

export default function DashboardStatCard({
  stat,
  className,
}: DashboardStatCardProps) {
  const Icon = ICON_MAP[stat.icon];

  return (
    <div
      className={cn(
        "bg-secondary rounded-xl p-4 flex flex-col gap-2",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-secondaryext-xs font-medium leading-tight">
          {stat.title}
        </span>
        <Icon
          className={cn("w-4 h-4 flex-shrink-0 mt-0.5", stat.iconColor)}
          strokeWidth={1.8}
        />
      </div>

      <p className="text-white text-2xl font-bold leading-none tracking-tight">
        {stat.count.toLocaleString()}
      </p>

      {stat.change && (
        <p
          className={cn(
            "text-[11px] font-medium",
            stat.changeType === "positive" && "text-[#22c55e]",
            stat.changeType === "negative" && "text-[#ef4444]",
            stat.changeType === "neutral" && "text-[#8b909a]",
          )}
        >
          {stat.change}
        </p>
      )}
    </div>
  );
}
