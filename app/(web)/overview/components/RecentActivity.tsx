import type { ActivityItem } from "@/data/dashboard-data";
import { cn } from "@/lib/utils";

interface RecentActivityProps {
  items: ActivityItem[];
  className?: string;
}

export default function RecentActivity({
  items,
  className,
}: RecentActivityProps) {
  return (
    <div
      className={cn(
        "bg-secondary rounded-xl p-4 flex flex-col",
        className,
      )}
    >
      <h3 className="text-white text-lg font-medium mb-5">Recent Activity</h3>

      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-start justify-between gap-4 first:pt-0 last:pb-0"
          >
            <div className="flex flex-col min-w-0">
              <span className="text-primary text-sm font-medium truncate">
                {item.title}
              </span>
              <span className="text-secondary text-xs leading-relaxed truncate">
                {item.description}
              </span>
            </div>
            <span className="text-secondary text-xs whitespace-nowrap shrink-0 mt-0.5">
              {item.timeAgo}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
