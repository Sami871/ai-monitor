"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import StatCard from "@/components/web/StatCard";
import DetailedReport from "../components/DetailedReport";
import SourceMetadataPanel from "@/components/web/SourceMetadataPanel";
import { useAnalysisStore } from "@/store/useAnalysisStore";
import { mapApiResultToUI } from "@/lib/mapApiResult";

export default function VideoAnalysisResultsPage() {
  const router = useRouter();
  const apiResult = useAnalysisStore((s) => s.result);

  useEffect(() => {
    if (!apiResult) {
      router.replace("/analysis");
    }
  }, [apiResult, router]);

  if (!apiResult) return null;

  const { stats, detections, metadata } = mapApiResultToUI(apiResult!);

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Stat Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.id}
            title={stat.title}
            count={stat.count}
            icon={stat.icon}
            iconColor={stat.iconColor}
            variant="analysis"
            confidence={stat.confidence}
            confidenceRange={stat.confidenceRange}
          />
        ))}
      </div>

      {/* Bottom Row */}
      <div className="flex gap-4 w-full">
        <div className="w-2/3">
          <DetailedReport filename={metadata.filename} rows={detections} />
        </div>
        <div className="w-1/3">
          <SourceMetadataPanel metadata={metadata} />
        </div>
      </div>
    </div>
  );
}
