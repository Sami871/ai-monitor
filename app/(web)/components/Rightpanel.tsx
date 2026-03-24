import { Users, Car, PawPrint, Bird } from "lucide-react";
import StatCard from "./Statcard";
import CameraStatusPanel from "./Camerastatuspanel";
import ObjectDistributionPanel from "./Objctdistributionpanel";
import {
  DUMMY_STATS,
  DUMMY_CAMERA_STATUS,
  DUMMY_OBJECT_DISTRIBUTION,
} from "@/data/live-data";
import type {
  DetectionStats,
  CameraStatus,
  ObjectDistributionItem,
} from "@/types/live";

interface RightPanelProps {
  stats?: DetectionStats;
  cameraStatus?: CameraStatus;
  objectDistribution?: ObjectDistributionItem[];
}

export default function RightPanel({
  stats = DUMMY_STATS,
  cameraStatus = DUMMY_CAMERA_STATUS,
  objectDistribution = DUMMY_OBJECT_DISTRIBUTION,
}: RightPanelProps) {
  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Stat Cards Grid */}
      <div className="grid grid-cols-2 gap-6">
        <StatCard
          value={stats.humans}
          label="Humans"
          icon={<Users className="w-7 h-7 text-[#22c55e]" strokeWidth={1.5} />}
        />
        <StatCard
          value={stats.vehicles}
          label="Vehicle"
          icon={<Car className="w-7 h-7 text-[#f59e0b]" strokeWidth={1.5} />}
        />
        <StatCard
          value={stats.animals}
          label="Animals"
          icon={<PawPrint className="w-7 h-7 text-[#ef4444]" strokeWidth={1.5} />}
        />
        <StatCard
          value={stats.birds}
          label="Birds"
          icon={<Bird className="w-7 h-7 text-[#a855f7]" strokeWidth={1.5} />}
        />
      </div>

      {/* Camera Status */}
      <CameraStatusPanel status={cameraStatus} />

      {/* Object Distribution */}
      <ObjectDistributionPanel items={objectDistribution} />
    </div>
  );
}