"use client";

import Toggle from "@/components/ui/toggle";
import Slider from "@/components/ui/slider";
import { useSettingsStore } from "@/store/useSettingsStore";
import type { SystemSettings } from "@/types/Settings";

const BEHAVIOUR_TYPES = [
  { id: "behaviour_sitting", label: "Sitting" },
  { id: "behaviour_standing", label: "Standing" },
] as const;

export default function BehaviourSettings() {
  const { settings, updateSetting } = useSettingsStore();

  if (!settings) return null;

  const sensitivityValue = Math.round((settings.behaviour_sensitivity ?? 0.8) * 100);

  const handleSensitivityChange = (val: number) => {
    updateSetting("behaviour_sensitivity", val / 100);
  };

  return (
    <div className="bg-secondary rounded-xl p-5 mt-4">
      <h2 className="text-lg font-medium text-primary mb-6">
        Behaviour Detection Settings
      </h2>

      <div className="flex items-center gap-6 flex-wrap">
        {BEHAVIOUR_TYPES.map(({ id, label }) => (
          <div key={id} className="flex items-center gap-2.5">
            <span className="text-sm text-primary">{label}</span>
            <Toggle
              checked={!!settings[id as keyof SystemSettings]}
              onChange={(val) => updateSetting(id as keyof SystemSettings, val)}
            />
          </div>
        ))}
      </div>

      <div className="border-t border-[#2a2d36] my-5" />

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-primary">
            Behaviour Sensitivity
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
          Adjusting behaviour sensitivity affects threshold for state detections. Lower values reduce false positives but may miss subtle behaviours.
        </p>
      </div>
    </div>
  );
}
