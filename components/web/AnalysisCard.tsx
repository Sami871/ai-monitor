import { CheckCircle } from "lucide-react";
import DetectionIcon from "@/components/DetectionIcon";
import type { StatCardData } from "@/types/Analysis";

interface AnalysisStatCardProps {
  data: StatCardData;
}

const CONFIDENCE_COLOR: Record<string, string> = {
  High: "text-[#22c55e]",
  Medium: "text-[#f59e0b]",
  Low: "text-[#ef4444]",
};

export default function AnalysisStatCard({ data }: AnalysisStatCardProps) {
  const confidenceColor = CONFIDENCE_COLOR[data.confidence] ?? "text-[#22c55e]";

  return (
    <div className="bg-secondary rounded-xl p-4 pr-6 flex flex-col justify-between w-full min-h-[141px] relative">
      {/* Top row: title + icon */}
      <div className="flex items-center justify-between">
        <span className="text-secondary text-xs font-medium leading-tight">
          {data.title}
        </span>
        <DetectionIcon type={data.icon} colorClass={data.iconColor} size="lg" />
      </div>

      <div className="space-y-1">
        {/* Count */}
        <div className="text-white text-2xl font-medium leading-none">
          {data.count}
        </div>

        {/* Confidence badge */}
        <div className="flex items-center gap-1.5">
          <CheckCircle className={`w-3 h-3 ${confidenceColor} shrink-0`} />
          <span className={`text-xs ${confidenceColor}`}>
            Confidence{" "}
            <span className="text-secondary">
              {data.confidence} ({data.confidenceRange})
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
