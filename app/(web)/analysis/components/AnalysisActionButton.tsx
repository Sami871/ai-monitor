"use client";

import { Download } from "lucide-react";
import { useRouter } from "next/navigation";
import type { DetectionRow } from "@/types/Analysis";

interface AnalysisActionButtonsProps {
  detections?: DetectionRow[];
  filename?: string;
}

function buildCSV(detections: DetectionRow[], filename: string): string {
  const headers = [
    "Filename",
    "Object Type",
    "Detection Count",
    "Avg. Confidence",
  ];
  const rows = detections.map((r) => [
    filename,
    r.type,
    r.detectionCount,
    r.avgConfidence,
  ]);
  return [headers, ...rows]
    .map((r) => r.map((c) => `"${c}"`).join(","))
    .join("\n");
}

export default function AnalysisActionButtons({
  detections = [],
  filename = "report",
}: AnalysisActionButtonsProps) {
  const router = useRouter();

  const handleDownloadCSV = () => {
    const csv = buildCSV(detections, filename);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename.replace(/\.[^.]+$/, "")}_report.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleAnalyzeNew = () => {
    router.push("/analysis");
  };

  return (
    <div className="flex items-center justify-end gap-3 mt-3">
      <button
        onClick={handleAnalyzeNew}
        className="px-4 py-2 rounded-lg bg-secondary border border-default text-primary text-xs font-medium hover:bg-[#2a2d35] hover:text-white transition-all duration-150"
      >
        Analyze New Video
      </button>
      <button
        onClick={handleDownloadCSV}
        className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-secondary border border-default text-primary text-xs font-medium hover:bg-[#2a2d35] hover:text-white transition-all duration-150"
      >
        <Download className="w-3.5 h-3.5" />
        Download CSV
      </button>
    </div>
  );
}
