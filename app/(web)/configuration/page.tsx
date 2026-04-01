"use client";

import { useState } from "react";
import Toggle from "@/components/ui/toggle";
import Slider from "@/components/ui/slider";
import TextInput from "@/components/ui/input";

interface DetectionType {
  id: string;
  label: string;
}

interface CountingRule {
  id: string;
  label: string;
  description: string;
}

const DETECTION_TYPES: DetectionType[] = [
  { id: "humans", label: "Humans" },
  { id: "vehicle", label: "Vehicle" },
  { id: "animals", label: "Animals" },
  { id: "birds", label: "Birds" },
];

const COUNTING_RULES: CountingRule[] = [
  {
    id: "humans",
    label: "Count Humans",
    description: "Enable counting statistics for Humans",
  },
  {
    id: "vehicle",
    label: "Count Vehicle",
    description: "Enable counting statistics for Vehicle",
  },
  {
    id: "animals",
    label: "Count Animals",
    description: "Enable counting statistics for Animals",
  },
  {
    id: "birds",
    label: "Count Birds",
    description: "Enable counting statistics for Birds",
  },
];

export default function SystemConfiguration() {
  const [detectionToggles, setDetectionToggles] = useState<
    Record<string, boolean>
  >({
    humans: true,
    vehicle: true,
    animals: true,
    birds: false,
  });

  const [sensitivity, setSensitivity] = useState(50);

  const [countingToggles, setCountingToggles] = useState<
    Record<string, boolean>
  >({
    humans: true,
    vehicle: true,
    animals: true,
    birds: true,
  });

  // Counting interval input
  const [interval, setInterval] = useState("5");

  const handleDetectionToggle = (id: string, value: boolean) => {
    setDetectionToggles((prev) => ({ ...prev, [id]: value }));
  };

  const handleCountingToggle = (id: string, value: boolean) => {
    setCountingToggles((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="flex flex-col gap-4 text-primary">
      {/* ── Detection Settings card ── */}
      <div className="bg-secondary rounded-xl p-5">
        <h2 className="text-lg font-medium text-primary mb-6">
          Detection Settings
        </h2>

        {/* Detection type row */}
        <div className="flex items-center gap-6 flex-wrap">
          {DETECTION_TYPES.map(({ id, label }) => (
            <div key={id} className="flex items-center gap-2.5">
              <span className="text-sm text-primary">{label}</span>
              <Toggle
                checked={detectionToggles[id] ?? false}
                onChange={(val) => handleDetectionToggle(id, val)}
              />
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-[#2a2d36] my-5" />

        {/* Detection Sensitivity */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-primary">
              Detection Sensitivity
            </span>
            <span className="text-sm font-medium text-primary">
              {sensitivity}%
            </span>
          </div>

          <Slider
            value={sensitivity}
            onChange={setSensitivity}
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

      {/* ── Counting Rules card ── */}
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
                  checked={countingToggles[id] ?? false}
                  onChange={(val) => handleCountingToggle(id, val)}
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
            value={interval}
            onChange={(e) => setInterval(e.target.value)}
            min={1}
            placeholder="5"
          />
        </div>
      </div>
    </div>
  );
}