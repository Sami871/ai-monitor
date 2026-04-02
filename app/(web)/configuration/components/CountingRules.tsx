"use client";

import Toggle from "@/components/ui/toggle";
import TextInput from "@/components/ui/input";
import { useSettingsStore } from "@/store/useSettingsStore";

const COUNTING_RULES = [
  {
    id: "count_humans",
    label: "Count Humans",
    description: "Enable counting statistics for Humans",
  },
  {
    id: "count_vehicle",
    label: "Count Vehicle",
    description: "Enable counting statistics for Vehicle",
  },
  {
    id: "count_animals",
    label: "Count Animals",
    description: "Enable counting statistics for Animals",
  },
  {
    id: "count_birds",
    label: "Count Birds",
    description: "Enable counting statistics for Birds",
  },
] as const;

export default function CountingRules() {
  const { settings, updateSetting } = useSettingsStore();

  if (!settings) return null;

  const handleIntervalChange = (val: string) => {
    const num = parseInt(val, 10);
    if (!isNaN(num)) {
      updateSetting("counting_interval", num);
    }
  };

  return (
    <div className="bg-secondary rounded-xl px-4 py-5">
      <h2 className="text-[15px] font-semibold text-primary mb-4">
        Counting Rules
      </h2>

      <div className="flex flex-col">
        {COUNTING_RULES.map(({ id, label, description }, index) => (
          <div key={id}>
            <div className="flex items-center justify-between py-3">
              <div className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-primary">
                  {label}
                </span>
                <span className="text-xs text-[#6B7280]">{description}</span>
              </div>
              <Toggle
                checked={settings[id] as boolean}
                onChange={(val) => updateSetting(id, val)}
              />
            </div>
            {index < COUNTING_RULES.length - 1 && (
              <div className="border-t border-[#2a2d36]" />
            )}
          </div>
        ))}
      </div>

      {/* Counting Interval */}
      <div className="mt-4 flex flex-col gap-2">
        <label className="text-[13px] font-medium text-primary">
          Counting Interval (Seconds)
        </label>
        <TextInput
          type="number"
          value={settings.counting_interval.toString()}
          onChange={(e) => handleIntervalChange(e.target.value)}
          min={1}
          placeholder="5"
        />
      </div>
    </div>
  );
}
