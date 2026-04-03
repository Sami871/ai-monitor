"use client";

import Link from "next/link";
import { Activity } from "lucide-react";

export default function BehaviourPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] text-center space-y-6">
      <div className="w-16 h-16 bg-blue/10 rounded-full flex items-center justify-center">
        <Activity className="w-8 h-8 text-blue" />
      </div>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-white">Behaviour Detection</h1>
        <p className="text-secondary max-w-md mx-auto">
          Monitor your workforce effectively. Identify working status, phone usage, and potential safety hazards in real-time.
        </p>
      </div>
      <Link
        href="/behaviour/result"
        className="px-6 py-3 bg-blue text-white rounded-lg font-medium hover:bg-blue/90 transition-all hover:scale-105 active:scale-95 shadow-lg flex items-center gap-2 mt-4"
      >
        <span>View Sample Results</span>
        <Activity className="w-4 h-4 shrink-0" />
      </Link>
    </div>
  );
}