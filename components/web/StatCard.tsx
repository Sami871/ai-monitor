import { CheckCircle, Activity, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type StatCardVariant = "dashboard" | "analysis";
export type StatCardSize = "full" | "compact";
export type StatIconType = "human" | "vehicle" | "animal" | "bird" | "activity";

const ICON_SRC: Partial<Record<StatIconType, string>> = {
  human: "/icons/human.svg",
  vehicle: "/icons/car.svg",
  animal: "/icons/animal.svg",
  bird: "/icons/bird.svg",
};

const CONFIDENCE_COLOR: Record<string, string> = {
  High: "text-[#22c55e]",
  Medium: "text-[#f59e0b]",
  Low: "text-[#ef4444]",
};

interface StatCardProps {
  title: string;
  count: number;
  icon: StatIconType;
  iconColor?: string;
  customIcon?: React.ReactNode;
  variant: StatCardVariant;
  size?: StatCardSize;
  // dashboard variant
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  // analysis variant
  confidence?: string;
  confidenceRange?: string;
  className?: string;
}

export default function StatCard({
  title,
  count,
  icon,
  iconColor,
  customIcon,
  variant,
  size = "full",
  change,
  changeType,
  confidence,
  confidenceRange,
  className,
}: StatCardProps) {
  const isCompact = size === "compact";
  const confidenceColor = confidence
    ? (CONFIDENCE_COLOR[confidence] ?? "text-[#22c55e]")
    : "";

  const iconSrc = ICON_SRC[icon];
  const iconSizePx = 24;

  const IconEl = customIcon ? (
    <div className={iconColor}>{customIcon}</div>
  ) : iconSrc ? (
    <img src={iconSrc} alt={icon} width={iconSizePx} height={iconSizePx} />
  ) : (
    <Activity
      className={cn("shrink-0 w-6 h-6", iconColor)}
      strokeWidth={1.8}
    />
  );

  const ChangeIcon =
    changeType === "positive"
      ? TrendingUp
      : changeType === "negative"
        ? TrendingDown
        : null;

  if (isCompact) {
    return (
      <div
        className={cn(
          "bg-secondary rounded-xl w-full relative p-3",
          "grid grid-cols-[1fr_auto] items-center gap-3 max-h-[70px] h-full",
          className,
        )}
      >
        {/* Left: title + count */}
        <div className="flex flex-col gap-3 justify-between min-w-0">
          <span className="text-xs font-medium text-secondary truncate">
            {title}
          </span>
          <div className="text-white font-medium text-base leading-none">
            {count.toLocaleString()}
          </div>
          {variant === "dashboard" && change && (
            <p
              className={cn(
                "text-xs font-medium",
                changeType === "positive" && "text-[#6B7280]",
                changeType === "negative" && "text-[#6B7280]",
                changeType === "neutral" && "text-[#6B7280]",
              )}
            >
              {change}
            </p>
          )}
        </div>

        <div className="flex items-center justify-center shrink-0">
          {IconEl}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "bg-secondary rounded-xl flex flex-col justify-between w-full relative",
        "p-4 pr-6 min-h-[141px]",
        className,
      )}
    >
      {/* Top row: title + icon */}
      <div className="flex items-start justify-between">
        <span className="text-sm font-medium text-secondary">{title}</span>
        <div className="flex items-center justify-center">{IconEl}</div>
      </div>

      {/* Bottom area: count + description */}
      <div className="space-y-1">
        <div className="text-white font-medium text-2xl leading-none">
          {count.toLocaleString()}
        </div>

        {variant === "dashboard" && change && (
          <p
            className={cn(
              "text-xs font-medium flex items-center mt-1",
              changeType === "positive" && "text-[#6B7280]",
              changeType === "negative" && "text-[#6B7280]",
              changeType === "neutral" && "text-[#6B7280]",
            )}
          >
            {change}
          </p>
        )}

        {variant === "analysis" && confidence && (
          <div className="flex items-center gap-1.5 pt-1">
            <CheckCircle className={`w-3 h-3 ${confidenceColor} shrink-0`} />
            <span className={`text-xs ${confidenceColor}`}>
              Confidence{" "}
              <span className="text-secondary">
                {confidence} ({confidenceRange})
              </span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}