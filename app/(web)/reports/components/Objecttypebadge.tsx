import { cn } from "@/lib/utils";
import type { ObjectType } from "@/data/reports-data";

interface ObjectTypeBadgeProps {
  type: ObjectType;
  className?: string;
}

const BADGE_STYLES: Record<ObjectType, string> = {
  Human: "border-[#22c55e]  text-[#22c55e]",
  Vehicle: "border-[#f59e0b]  text-[#f59e0b]",
  Animal: "border-[#ef4444]  text-[#ef4444]",
  Bird: "border-[#a855f7]  text-[#a855f7]",
};

export default function ObjectTypeBadge({
  type,
  className,
}: ObjectTypeBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-md border text-xs font-medium",
        BADGE_STYLES[type],
        className,
      )}
    >
      {type}
    </span>
  );
}
