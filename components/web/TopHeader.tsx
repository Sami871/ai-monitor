"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const PAGE_TITLES: Record<string, string> = {
  "/": "Live Monitoring",
  "/analysis": "Video Analysis",
  "/dashboard": "Dashboard Overview",
  "/reports": "Reports & History",
  "/settings": "Settings",
};

export default function TopHeader() {
  const pathname = usePathname();
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const date = now.toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      });
      const time = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      setDateTime(`${date}  ${time}`);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const title = PAGE_TITLES[pathname] ?? "Dashboard";

  return (
    <header className="h-20 bg-secondary border-b border-white/5 flex items-center justify-between px-6 shrink-0 sticky top-0 z-10">
      <h1 className="text-primary text-xl font-medium">{title}</h1>

      <div className="flex items-center">
        <span className="text-secondary text-sm">{dateTime}</span>
      </div>
    </header>
  );
}
