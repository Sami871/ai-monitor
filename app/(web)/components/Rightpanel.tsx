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
        <StatCard value={stats.humans}   label="Humans"  icon={<img src="/icons/human.svg"  alt="Humans"  width={38} height={38} />} />
        <StatCard value={stats.vehicles} label="Vehicle" icon={<img src="/icons/car.svg"    alt="Vehicle" width={38} height={38} />} />
        <StatCard value={stats.animals}  label="Animals" icon={<img src="/icons/animal.svg" alt="Animals" width={38} height={38} />} />
        <StatCard value={stats.birds}    label="Birds"   icon={<img src="/icons/bird.svg"   alt="Birds"   width={38} height={38} />} />
      </div>

      {/* Camera Status */}
      <CameraStatusPanel status={cameraStatus} />

      {/* Object Distribution */}
      <ObjectDistributionPanel items={objectDistribution} />
    </div>
  );
}