"use client";

import { Users } from "lucide-react";
import StatCard from "@/components/web/StatCard";
import SourceMetadataPanel from "@/components/web/SourceMetadataPanel";
import { useAnalysisStore } from "@/store/useAnalysisStore";
import { mapApiResultToUI } from "@/lib/mapApiResult";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PersonsResultPage() {
  const router = useRouter();
  const apiResult = useAnalysisStore((s) => s.result);
  
  useEffect(() => {
    if (!apiResult) {
      router.replace("/persons");
    }
  }, [apiResult, router]);

  if (!apiResult) return null;

  const { stats, metadata } = mapApiResultToUI(apiResult!);
  return (
    <div className="flex flex-col gap-6 text-primary">
      <div className="w-full lg:w-1/3 flex flex-col gap-6">
        <div className="grid grid-cols-1 gap-4 shrink-0">
            <StatCard
              key={stats[0].id}
              title={stats[0].title}
              count={stats[0].count}
              icon={stats[0].icon}
              customIcon={<Users className="w-6 h-6" />}
              iconColor="text-[#22c55e]"
              variant="dashboard"
            />
        </div>
      </div>

      <div className="w-full flex flex-col gap-4">
        <SourceMetadataPanel metadata={metadata} />
      </div>
    </div>
  );
}
