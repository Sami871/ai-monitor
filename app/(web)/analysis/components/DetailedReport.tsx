import Image from "next/image";
import AnalysisActionButtons from "./AnalysisActionButton";
import type { DetectionRow } from "@/types/Analysis";

interface DetailedReportProps {
  filename: string;
  rows: DetectionRow[];
}

const CATEGORIES = [
  { id: "human", label: "Humans", iconPath: "/icons/human.svg" },
  { id: "vehicle", label: "Vehicles", iconPath: "/icons/car.svg" },
  { id: "animal", label: "Animals", iconPath: "/icons/animal.svg" },
  { id: "bird", label: "Birds", iconPath: "/icons/bird.svg" },
];

export default function DetailedReport({
  filename,
  rows,
}: DetailedReportProps) {
  const aggregatedRows = CATEGORIES.map((cat) => {
    const matchedRows = rows.filter((r) => r.icon === cat.id);
    
    const count = matchedRows.reduce((acc, r) => acc + r.detectionCount, 0);

    let avgConf = "-";
    if (matchedRows.length > 0) {
      let totalConf = 0;
      let totalWeight = 0;
      matchedRows.forEach(r => {
        const confVal = parseFloat(r.avgConfidence);
        if (!isNaN(confVal)) {
          totalConf += confVal * r.detectionCount;
          totalWeight += r.detectionCount;
        }
      });
      if (totalWeight > 0) {
        avgConf = (totalConf / totalWeight).toFixed(1) + "%";
      }
    }

    return {
      type: cat.label,
      detectionCount: count,
      avgConfidence: avgConf,
      icon: cat.id as any,
      iconColor: "",
      iconPath: cat.iconPath,
    };
  });

  return (
    <section>
      <div className="bg-secondary rounded-xl p-4 w-full">
        <div>
          <h3 className="text-white text-sm font-semibold">Detailed Report</h3>
          <p className="text-secondary text-xs mt-0.5">
            Breakdown of detected objects in{" "}
            <span className="text-secondary">{filename}</span>
          </p>
        </div>

        <div className="w-full mt-4">
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
            {aggregatedRows.map((row) => (
              <div
                key={row.type}
                className="grid grid-cols-3 py-2.5 items-center"
              >
                <div className="flex items-center gap-2">
                  <Image 
                    src={row.iconPath} 
                    alt={row.type} 
                    width={16} 
                    height={16} 
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

      <AnalysisActionButtons detections={aggregatedRows} filename={filename} />
    </section>
  );
}
