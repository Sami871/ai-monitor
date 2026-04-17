"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Camera, BoundingBox } from "@/types/live";
import { DUMMY_CAMERAS, DUMMY_BOUNDING_BOXES } from "@/data/live-data";
import { cn } from "@/lib/utils";

interface LiveFeedProps {
  cameras?: Camera[];
  boundingBoxes?: BoundingBox[];
  selectedCameraId?: string;
  onCameraChange?: (cameraId: string) => void;
}

export default function LiveFeed({
  cameras = DUMMY_CAMERAS,
  boundingBoxes = DUMMY_BOUNDING_BOXES,
  selectedCameraId,
  onCameraChange,
}: LiveFeedProps) {
  const [activeCamera, setActiveCamera] = useState(
    selectedCameraId || cameras[0]?.id,
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const currentCamera =
    cameras.find((c) => c.id === activeCamera) || cameras[0];

  const handleCameraSelect = (cameraId: string) => {
    setActiveCamera(cameraId);
    setDropdownOpen(false);
    onCameraChange?.(cameraId);
  };

  return (
    <div className="relative w-full h-full bg-white/50 rounded-xl overflow-hidden">
      <img
        src="/dummy-feed.jpg"
        alt="Live camera feed"
        className="w-full h-full object-cover"
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = "none";
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1d23]/40 via-transparent to-[#1a1d23]/20 pointer-events-none" />

      {boundingBoxes.map((box) => (
        <div
          key={box.id}
          className="absolute"
          style={{
            left: `${box.x}%`,
            top: `${box.y}%`,
            width: `${box.width}%`,
            height: `${box.height}%`,
          }}
        >
          <div
            className="absolute -top-6 left-0 px-1.5 py-0.5 rounded text-[10px] font-semibold text-white whitespace-nowrap"
            style={{ backgroundColor: "rgba(0,0,0,0.75)" }}
          >
            {box.label} {box.confidence}%
          </div>
          <div
            className="w-full h-full rounded-sm"
            style={{
              border: `2px solid ${box.color}`,
              boxShadow: `0 0 6px ${box.color}55`,
            }}
          />
        </div>
      ))}

      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5 bg-white/50 backdrop-blur-xl pr-2.5 pl-1.5 py-2 h-[33px] border border-white rounded-lg">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-primary text-sm font-medium">Live</span>
          </div>
          <div className="flex items-center gap-2.5 bg-white/50 backdrop-blur-xl pr-2.5 pl-1.5 py-2 h-[33px] border border-white rounded-lg">
            <span className="text-white text-sm font-medium">
              {currentCamera?.name}
            </span>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2.5 bg-white/50 backdrop-blur-xl pr-2.5 pl-1.5 py-2 h-[33px] border border-white rounded-lg text-white text-sm font-medium hover:bg-black/80 transition-colors"
          >
            <span>{currentCamera?.name}</span>
            <ChevronDown
              className={cn(
                "w-3 h-3 transition-transform",
                dropdownOpen && "rotate-180",
              )}
            />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-1 bg-[#252830] border border-[#3a3f4b] rounded-lg shadow-xl z-20 min-w-[140px] overflow-hidden">
              {cameras.map((camera) => (
                <button
                  key={camera.id}
                  onClick={() => handleCameraSelect(camera.id)}
                  className={cn(
                    "w-full text-left px-3 py-2 text-xs font-medium flex items-center justify-between gap-2 hover:bg-[#1a1d23] transition-colors",
                    camera.id === activeCamera
                      ? "text-white"
                      : "text-[#8b909a]",
                  )}
                >
                  <span>{camera.name}</span>
                  {camera.isLive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
