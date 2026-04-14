"use client";

import { Download } from "lucide-react";
import { useRouter } from "next/navigation";
import { useBehaviourStore } from "@/store/useBehaviourStore";
import type { BehaviourResult } from "@/types/upload";

interface BehaviourActionButtonsProps {
  result: BehaviourResult;
}

function buildCSV(result: BehaviourResult): string {
  const headers = ["Filename", "Behaviour Type", "Detection Count"];
  const rows = [
    [result.filename, "Sitting", result.counts.sitting.toString()],
    [result.filename, "Standing", result.counts.standing.toString()],
    [result.filename, "Total Persons", result.counts.person.toString()],
  ];
  return [headers, ...rows]
    .map((r) => r.map((c) => `"${c}"`).join(","))
    .join("\n");
}

export default function BehaviourActionButtons({
  result,
}: BehaviourActionButtonsProps) {
  const router = useRouter();
  const clearResult = useBehaviourStore((s) => s.clearResult);

  const handleDownloadCSV = () => {
    const csv = buildCSV(result);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${result.filename.replace(/\.[^.]+$/, "")}_behaviour_report.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleAnalyzeNew = () => {
    clearResult();
    router.push("/behaviour");
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
