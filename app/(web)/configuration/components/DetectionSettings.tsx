"use client";

import Toggle from "@/components/ui/toggle";
import Slider from "@/components/ui/slider";
import { useSettingsStore } from "@/store/useSettingsStore";
import type { SystemSettings } from "@/types/Settings";

const DETECTION_TYPES = [
  { id: "detection_humans", label: "Humans" },
  { id: "detection_vehicle", label: "Vehicle" },
  { id: "detection_animals", label: "Animals" },
  { id: "detection_birds", label: "Birds" },
] as const;

export default function DetectionSettings() {
  const { settings, updateSetting } = useSettingsStore();

  if (!settings) return null;

  const sensitivityValue = Math.round(settings.detection_sensitivity * 100);

  const handleSensitivityChange = (val: number) => {
    updateSetting("detection_sensitivity", val / 100);
  };

  return (
    <div className="bg-secondary rounded-xl p-5">
      <h2 className="text-lg font-medium text-primary mb-6">
        Detection Settings
      </h2>

      <div className="flex items-center gap-6 flex-wrap">
        {DETECTION_TYPES.map(({ id, label }) => (
          <div key={id} className="flex items-center gap-2.5">
            <span className="text-sm text-primary">{label}</span>
            <Toggle
              checked={settings[id as keyof SystemSettings] as boolean}
              onChange={(val) => updateSetting(id as keyof SystemSettings, val)}
            />
          </div>
        ))}
      </div>

      <div className="border-t border-[#2a2d36] my-5" />

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-primary">
            Detection Sensitivity
          </span>
          <span className="text-sm font-medium text-primary">
            {sensitivityValue}%
          </span>
        </div>

        <Slider
          value={sensitivityValue}
          onChange={handleSensitivityChange}
          min={0}
          max={100}
          step={1}
        />

        <p className="text-xs text-[#6B7280] mt-1">
          Adjusting sensitivity affects all cameras. Lower values reduce false
          positives but may miss detections.
        </p>
      </div>
    </div>
  );
}
