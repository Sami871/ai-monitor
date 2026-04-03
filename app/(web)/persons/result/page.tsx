"use client";

import { useState, useRef } from "react";
import { Play, Pause, AlertCircle, Clock, Activity, Users, TrendingUp, ArrowRight, UserPlus, ArrowLeftRight } from "lucide-react";
import StatCard from "@/components/web/StatCard";

export default function PersonsResultPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full text-white min-h-[calc(100vh-100px)] lg:max-h-[calc(100vh-100px)]">
      {/* Left side: Video section */}
      <div className="w-full lg:w-2/3 flex flex-col gap-4">
        <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden border border-white/10 group shadow-lg">
          <video
            ref={videoRef}
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            className="w-full h-full object-cover"
            loop
            muted
          />
          {/* Controls overlay */}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={togglePlay}
              className="w-16 h-16 flex items-center justify-center bg-blue rounded-full text-white hover:bg-blue/90 transition-transform hover:scale-105 shadow-xl"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8" />
              ) : (
                <Play className="w-8 h-8 ml-1" />
              )}
            </button>
          </div>
        </div>
        <div className="bg-secondary border border-white/10 rounded-xl p-5 flex items-center justify-between shadow-sm shrink-0">
          <div className="flex flex-col">
            <span className="font-semibold text-lg text-white">Main Entrance Cam</span>
            <span className="text-secondary text-sm">Zone 1 - Lobby area</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#3b82f6] bg-[#3b82f6]/10 px-4 py-1.5 rounded-full font-medium">
            <div className="w-2.5 h-2.5 rounded-full bg-[#3b82f6] animate-pulse" />
            Live Crowd Tracking
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="w-full lg:w-1/3 flex flex-col gap-6 lg:h-[calc(100vh-100px)]">
        {/* Stat Cards */}
        <div className="grid grid-cols-2 gap-4 shrink-0">
          <StatCard
            title="Today Total Persons"
            count={1432}
            icon="activity"
            customIcon={<Users className="w-6 h-6" />}
            iconColor="text-[#22c55e]"
            variant="dashboard"
          />
          <StatCard
            title="Peak Hour Count"
            count={215}
            icon="activity"
            customIcon={<TrendingUp className="w-6 h-6" />}
            iconColor="text-[#f59e0b]"
            variant="dashboard"
          />
          <StatCard
            title="Last 10 Min"
            count={24}
            icon="activity"
            customIcon={<Clock className="w-6 h-6" />}
            iconColor="text-[#a855f7]"
            variant="dashboard"
          />
          <StatCard
            title="Currently Inside"
            count={89}
            icon="activity"
            customIcon={<UserPlus className="w-6 h-6" />}
            iconColor="text-[#3b82f6]"
            variant="dashboard"
          />
        </div>

        {/* Session Info Section */}
        <div className="bg-secondary border border-white/10 rounded-xl p-5 flex-col flex shadow-sm shrink-0">
          <h3 className="text-base font-semibold mb-4 text-white">Session Info</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3.5 bg-white/5 rounded-lg text-sm border border-white/5">
              <div className="flex items-center gap-2 text-primary">
                <ArrowRight className="w-4 h-4 text-white/50" />
                <span>Direction Flow</span>
              </div>
              <span className="text-[#3b82f6] font-medium">Inward heavy</span>
            </div>
            <div className="flex justify-between items-center p-3.5 bg-white/5 rounded-lg text-sm border border-white/5">
              <div className="flex items-center gap-2 text-primary">
                <Activity className="w-4 h-4 text-white/50" />
                <span>Avg Stay Duration</span>
              </div>
              <span className="text-[#22c55e] font-medium">42 mins</span>
            </div>
            <div className="flex justify-between items-center p-3.5 bg-white/5 rounded-lg text-sm border border-white/5">
              <div className="flex items-center gap-2 text-primary">
                <Clock className="w-4 h-4 text-white/50" />
                <span>Last Updated</span>
              </div>
              <span className="text-white font-medium">Just now</span>
            </div>
          </div>
        </div>

        {/* Live Entry Log */}
        <div className="bg-secondary border border-white/10 rounded-xl p-5 flex-col flex shadow-sm flex-1 min-h-0 overflow-hidden">
          <h3 className="text-base font-semibold mb-4 text-white shrink-0">Live Entry Log</h3>
          <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar flex-1 min-h-0">
            {[
              { id: 1, type: "Person Entered", time: "Just now", color: "text-[#22c55e]", bg: "bg-[#22c55e]/10" },
              { id: 2, type: "Person Exited", time: "1 min ago", color: "text-[#ef4444]", bg: "bg-[#ef4444]/10" },
              { id: 3, type: "Group Entered (3)", time: "5 mins ago", color: "text-[#3b82f6]", bg: "bg-[#3b82f6]/10" },
              { id: 4, type: "Person Entered", time: "8 mins ago", color: "text-[#22c55e]", bg: "bg-[#22c55e]/10" },
              { id: 5, type: "Person Exited", time: "12 mins ago", color: "text-[#ef4444]", bg: "bg-[#ef4444]/10" },
              { id: 6, type: "Person Entered", time: "15 mins ago", color: "text-[#22c55e]", bg: "bg-[#22c55e]/10" },
            ].map((log) => (
              <div key={log.id} className="flex items-center gap-4 p-3.5 bg-white/5 rounded-lg text-sm border border-white/5">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${log.bg}`}>
                   <ArrowLeftRight className={`w-4 h-4 ${log.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">{log.type}</p>
                  <p className="text-secondary text-xs mt-0.5">{log.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}