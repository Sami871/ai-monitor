"use client";

import { useEffect } from "react";
import DetectionSettings from "./components/DetectionSettings";
import CountingRules from "./components/CountingRules";
import { useSettingsStore } from "@/store/useSettingsStore";

export default function SystemConfiguration() {
  const { fetchSettings, error, isLoading } = useSettingsStore();

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-48 text-secondary">
        Loading configurations...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 text-primary max-w-4xl">
      {error && (
        <div className="p-3 rounded-lg bg-red-500/10 text-red-500 text-sm border border-red-500/20">
          {error}
        </div>
      )}
      
      <DetectionSettings />
      <CountingRules />
    </div>
  );
}