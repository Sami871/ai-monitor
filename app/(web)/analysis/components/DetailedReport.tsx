import DetectionIcon from "@/components/DetectionIcon";
import AnalysisActionButtons from "./AnalysisActionButton";
import type { DetectionRow } from "@/types/Analysis";

interface DetailedReportProps {
  filename: string;
  rows: DetectionRow[];
}

export default function DetailedReport({
  filename,
  rows,
}: DetailedReportProps) {
  return (
    <section>
      <div className="bg-secondary rounded-xl p-4 w-full">
        {/* Header */}
        <div>
          <h3 className="text-white text-sm font-semibold">Detailed Report</h3>
          <p className="text-secondary text-xs mt-0.5">
            Breakdown of detected objects in{" "}
            <span className="text-secondary">{filename}</span>
          </p>
        </div>

        {/* Table */}
        <div className="w-full">
          <div className="grid grid-cols-3 pb-2 border-b border-[#2a2d35]">
            <span className="text-[#8b909a] text-xs font-medium">
              Object Type
            </span>
            <span className="text-[#8b909a] text-xs font-medium">
              Detection Count
            </span>
            <span className="text-[#8b909a] text-xs font-medium">
              Avg. Confidence
            </span>
          </div>

          <div className="divide-y divide-[#2a2d35]">
            {rows.map((row) => (
              <div
                key={row.type}
                className="grid grid-cols-3 py-2.5 items-center"
              >
                <div className="flex items-center gap-2">
                  <DetectionIcon
                    type={row.icon}
                    colorClass={row.iconColor}
                    size="sm"
                  />
                  <span className="text-[#c8ccd4] text-xs font-medium">
                    {row.type}
                  </span>
                </div>
                <span className="text-[#c8ccd4] text-xs">
                  {row.detectionCount}
                </span>
                <span className="text-[#c8ccd4] text-xs">
                  {row.avgConfidence}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pass rows + filename so CSV contains the actual report data */}
      <AnalysisActionButtons detections={rows} filename={filename} />
    </section>
  );
}
