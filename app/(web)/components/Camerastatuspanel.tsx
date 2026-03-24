import type { CameraStatus } from "@/types/live";

interface CameraStatusPanelProps {
  status: CameraStatus;
}

export default function CameraStatusPanel({ status }: CameraStatusPanelProps) {
  return (
    <div className="bg-secondary rounded-xl p-4">
      <h3 className="text-primary font-medium text-lg mb-5">Camera Status</h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-secondary text-sm">Detected Today</span>
          <span className="text-primary text-lg font-medium">
            {status.detectedToday.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-secondary text-sm">Last Detection</span>
          <span className="text-primary text-baslge font-medium">
            {status.lastDetection}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-secondary text-sm">Active Time</span>
          <span className="text-primary text-lg font-medium">
            {status.activeTime}
          </span>
        </div>
      </div>
    </div>
  );
}