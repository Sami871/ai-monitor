"use client";

import Slider from "@/components/ui/slider";
import { useSettingsStore } from "@/store/useSettingsStore";

export default function PersonCounterSettings() {
  const { settings, updateSetting } = useSettingsStore();

  if (!settings) return null;

  const linePosition = settings.roi_line_position ?? 50;
  const sensitivityValue = Math.round((settings.roi_sensitivity ?? 0.8) * 100);

  const handleLinePositionChange = (val: number) => {
    updateSetting("roi_line_position", val);
  };

  const handleSensitivityChange = (val: number) => {
    updateSetting("roi_sensitivity", val / 100);
  };

  const handleDirectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateSetting("roi_direction", e.target.value as any);
  };

  return (
    <div className="bg-secondary rounded-xl p-5 mt-4">
      <h2 className="text-lg font-medium text-primary mb-6">
        Person Counter Settings (ROI & Entry Line)
      </h2>

      <div className="flex flex-col gap-6">
        {/* Direction Selection */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-primary">Track Direction</label>
          <select 
            value={settings.roi_direction || "inward_outward"} 
            onChange={handleDirectionChange}
            className="w-full md:w-64 bg-[#1e1e1e] border border-white/10 rounded-lg p-2.5 text-sm text-white outline-none focus:border-blue transition-colors appearance-none"
          >
            <option value="inward_outward">Both (Inward & Outward)</option>
            <option value="inward">Inward Only</option>
            <option value="outward">Outward Only</option>
          </select>
          <p className="text-xs text-[#6B7280]">
            Determines whether to count people coming in, going out, or both directions.
          </p>
        </div>

        <div className="border-t border-[#2a2d36]" />

        {/* Line Position Slider */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-primary">Line Position (Y-Axis)</span>
            <span className="text-sm font-medium text-primary">{linePosition}%</span>
          </div>
          <Slider
            value={linePosition}
            onChange={handleLinePositionChange}
            min={0}
            max={100}
            step={1}
          />
          <p className="text-xs text-[#6B7280] mt-1">
            Adjust the vertical position of the virtual counting line on the camera preview.
          </p>
        </div>

        <div className="border-t border-[#2a2d36]" />

        {/* ROI Sensitivity Slider */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-primary">Detection Sensitivity</span>
            <span className="text-sm font-medium text-primary">{sensitivityValue}%</span>
          </div>
          <Slider
            value={sensitivityValue}
            onChange={handleSensitivityChange}
            min={0}
            max={100}
            step={1}
          />
          <p className="text-xs text-[#6B7280] mt-1">
            Lower values reduce false triggers for shadows or small objects near the entry line.
          </p>
        </div>

      </div>
    </div>
  );
}
