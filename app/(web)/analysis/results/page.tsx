import AnalysisStatCard from "@/components/web/AnalysisCard";
import DetailedReport from "../components/DetailedReport";
import SourceMetadataPanel from "../components/SourcePanel";
import { DUMMY_ANALYSIS_RESULT } from "@/data/analysis-data";

export default function VideoAnalysisPage() {
  const { stats, detections, metadata } = DUMMY_ANALYSIS_RESULT;

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Stat Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <AnalysisStatCard key={stat.id} data={stat} />
        ))}
      </div>

      {/* Bottom Row */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-[67%_33%]">
        <DetailedReport filename={metadata.filename} rows={detections} />
        <SourceMetadataPanel metadata={metadata} />
      </div>
    </div>
  );
}
