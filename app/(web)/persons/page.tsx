"use client";

import Link from "next/link";
import { Users } from "lucide-react";

export default function PersonsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] text-center space-y-6">
      <div className="w-16 h-16 bg-blue/10 rounded-full flex items-center justify-center">
        <Users className="w-8 h-8 text-blue" />
      </div>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-white">Person Counter</h1>
        <p className="text-secondary max-w-md mx-auto">
          Track foot traffic across key entry and exit points. Monitor crowd density, peak hours, and live entry logs.
        </p>
      </div>
      <Link
        href="/persons/result"
        className="px-6 py-3 bg-blue text-white rounded-lg font-medium hover:bg-blue/90 transition-all hover:scale-105 active:scale-95 shadow-lg flex items-center gap-2 mt-4"
      >
        <span>View Counter Dashboard</span>
        <Users className="w-4 h-4 shrink-0" />
      </Link>
    </div>
  );
}