"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { RockingChair, PersonStanding, UsersRound } from "lucide-react";
import StatCard from "@/components/web/StatCard";
import SourceMetadataPanel from "@/components/web/SourceMetadataPanel";
import { useBehaviourStore } from "@/store/useBehaviourStore";
import BehaviourActionButtons from "../components/BehaviourActionButtons";

export default function BehaviourResultPage() {
  const router = useRouter();
  const apiResult = useBehaviourStore((s) => s.result);

  useEffect(() => {
    if (!apiResult) {
      router.replace("/behaviour");
    }
  }, [apiResult, router]);

  if (!apiResult) return null;

  return (
    <div className="flex flex-col gap-6 h-full text-white">
      <div className="w-full flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 shrink-0">
          <StatCard
            title="Sitting"
            count={apiResult.counts.sitting}
            icon="activity"
            customIcon={<RockingChair className="w-6 h-6" />}
            iconColor="text-[#22c55e]"
            variant="dashboard"
          />
          <StatCard
            title="Standing"
            count={apiResult.counts.standing}
            icon="activity"
            customIcon={<PersonStanding className="w-6 h-6" />}
            iconColor="text-[#f59e0b]"
            variant="dashboard"
          />
          <StatCard
            title="Total Persons"
            count={apiResult.counts.person}
            icon="activity"
            customIcon={<UsersRound className="w-6 h-6" />}
            iconColor="text-[#ef4444]"
            variant="dashboard"
          />
        </div>
      </div>

      <div className="w-full">
        <SourceMetadataPanel 
          metadata={{
            filename: apiResult.filename,
            fileSize: apiResult.metadata.file_size || "Unknown",
            duration: apiResult.metadata.duration,
            uploadDate: new Date().toLocaleDateString(),
            videoUrl: apiResult.cloudinary_url
          }} 
        />
        <BehaviourActionButtons result={apiResult} />
      </div>
    </div>
  );
}
