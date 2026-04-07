"use client";

import { RockingChair, PersonStanding, UsersRound } from "lucide-react";
import StatCard from "@/components/web/StatCard";
import SourceMetadataPanel from "@/components/web/SourceMetadataPanel";

export default function BehaviourResultPage() {
  return (
    <div className="flex flex-col gap-6 h-full text-white">
      <div className="w-full flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 shrink-0">
          <StatCard
            title="Sitting"
            count={12}
            icon="activity"
            customIcon={<RockingChair className="w-6 h-6" />}
            iconColor="text-[#22c55e]"
            variant="dashboard"
          />
          <StatCard
            title="Standing"
            count={2}
            icon="activity"
            customIcon={<PersonStanding className="w-6 h-6" />}
            iconColor="text-[#f59e0b]"
            variant="dashboard"
          />
          <StatCard
            title="Total"
            count={15}
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
            filename: "Behaviour_Analysis_Video.mp4",
            fileSize: "124 MB",
            duration: "00:45",
            uploadDate: new Date().toLocaleDateString(),
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
          }} 
        />
      </div>
    </div>
  );
}
