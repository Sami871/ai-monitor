"use client";

import { useEffect } from "react";
import DetectionSettings from "./components/DetectionSettings";
import BehaviourSettings from "./components/BehaviourSettings";
import PersonCounterSettings from "./components/PersonCounterSettings";
import CountingRules from "./components/CountingRules";
import { useSettingsStore } from "@/store/useSettingsStore";
import { WifiOff, RefreshCw } from "lucide-react";
import type { SystemSettings } from "@/types/Settings";

const DEFAULT_SETTINGS: SystemSettings = {
  detection_humans: true,
  detection_vehicle: true,
  detection_animals: false,
  detection_birds: false,
  detection_sensitivity: 0.7,
  count_humans: true,
  count_vehicle: false,
  count_animals: false,
  count_birds: false,
  counting_interval: 5,
  behaviour_working: true,
  behaviour_sleepy: true,
  behaviour_not_available: true,
  behaviour_phone: true,
  behaviour_sensitivity: 0.6,
  roi_direction: "inward_outward",
  roi_line_position: 50,
  roi_sensitivity: 0.7,
};

export default function SystemConfiguration() {
  const { fetchSettings, error, isLoading, settings } = useSettingsStore();

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  // If backend is offline and no settings loaded, seed defaults so panels render
  useEffect(() => {
    if (error && !settings) {
      useSettingsStore.setState({ settings: DEFAULT_SETTINGS });
    }
  }, [error, settings]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 max-w-4xl w-full pb-10">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="animate-pulse flex flex-col gap-4 p-6 rounded-xl border border-default bg-[#151921]/50">
            <div className="h-6 w-1/3 bg-secondary rounded-md"></div>
            <div className="space-y-3">
              <div className="h-10 w-full bg-secondary/50 rounded-lg"></div>
              <div className="h-10 w-full bg-secondary/50 rounded-lg"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 text-primary max-w-4xl pb-10">
      {/* Offline banner */}
      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3">
          <WifiOff className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-red-400 text-sm font-medium">Offline</p>
            <p className="text-red-400/70 text-xs mt-0.5">
              Showing default values. Changes cannot be saved until the server is back online.
            </p>
          </div>
          <button
            onClick={() => fetchSettings()}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 text-xs font-medium rounded-lg transition-colors shrink-0"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Retry
          </button>
        </div>
      )}

      <DetectionSettings />
      <BehaviourSettings />
      <PersonCounterSettings />
      <CountingRules />
    </div>
  );
}