"use client";

import { Users } from "lucide-react";
import StatCard from "@/components/web/StatCard";
import SourceMetadataPanel from "@/components/web/SourceMetadataPanel";

export default function PersonsResultPage() {
  return (
    <div className="flex flex-col gap-6 text-primary">
      <div className="w-full lg:w-1/3 flex flex-col gap-6">
        <div className="grid grid-cols-1 gap-4 shrink-0">
          <StatCard
            title="Today Total Persons"
            count={1432}
            icon="activity"
            customIcon={<Users className="w-6 h-6" />}
            iconColor="text-[#22c55e]"
            variant="dashboard"
          />
        </div>
      </div>

      <div className="w-full flex flex-col gap-4">
        <SourceMetadataPanel 
          metadata={{
            filename: "Person_Counter_Lobby.mp4",
            fileSize: "85 MB",
            duration: "01:20",
            uploadDate: new Date().toLocaleDateString(),
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
          }} 
        />
      </div>
    </div>
  );
}
