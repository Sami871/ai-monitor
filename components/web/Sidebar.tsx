"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/assets/image/ai-logo.png";
import { cn } from "@/lib/utils";
import { useProfileStore } from "@/store/useProfileStore";

const NAV_ITEMS = [
  { id: "live", label: "Live Monitoring", icon: "/icons/live-monitoring.svg", href: "/" },
  { id: "analysis", label: "Video Analysis", icon: "/icons/upload.svg", href: "/analysis" },
  {
    id: "dashboard",
    label: "Dashboard Overview",
    icon: "/icons/dashboard.svg",
    href: "/overview",
  },
  {
    id: "reports",
    label: "Reports & History",
    icon: "/icons/reports.svg",
    href: "/reports",
  },
  { id: "configuration", label: "System Configuration", icon: "/icons/configuration.svg", href: "/configuration" },
  { id: "settings", label: "Settings", icon: "/icons/settings.svg", href: "/settings" },
];

interface SidebarProps {
  onLogout?: () => void;
}

export default function Sidebar({ onLogout }: SidebarProps) {
  const pathname = usePathname();
  const { avatarUrl, name, email } = useProfileStore();

  return (
    <aside className="w-[240px] min-w-[240px] bg-secondary flex flex-col h-screen border-r border-default sticky top-0">
      {/* Logo */}
      <div className="h-20 border-b border-default flex items-center justify-center">
        <Image
          src={Logo}
          alt="AI Monitor Logo"
          className="w-full max-w-[153px]"
          priority
        />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map(({ id, label, icon, href }) => {
          const isActive =
            href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={id}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
                isActive
                  ? "bg-blue text-white"
                  : "text-primary hover:text-white hover:bg-[#252830]",
              )}
            >
              <span
                className="w-5 h-5 shrink-0 bg-current"
                style={{
                  maskImage: `url(${icon})`,
                  WebkitMaskImage: `url(${icon})`,
                  maskSize: "contain",
                  WebkitMaskSize: "contain",
                  maskRepeat: "no-repeat",
                  WebkitMaskRepeat: "no-repeat",
                  maskPosition: "center",
                  WebkitMaskPosition: "center",
                }}
              />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom: Logout */}
      <div className="flex flex-col  gap-3">
        <div className="px-2.5 pt-3">
          <button
            onClick={onLogout}
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-[#ef4444] hover:bg-[#252830] transition-all duration-150"
          >
            <span
              className="w-5 h-5 shrink-0 bg-current"
              style={{
                maskImage: `url(/icons/logout.svg)`,
                WebkitMaskImage: `url(/icons/logout.svg)`,
                maskSize: "contain",
                WebkitMaskSize: "contain",
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
                maskPosition: "center",
                WebkitMaskPosition: "center",
              }}
            />
            <span>Logout</span>
          </button>
        </div>
        {/* profile */}
        <div className="flex items-center gap-3 px-2.5 py-3">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover shrink-0"
            />
          ) : (
            <Image
              src={Logo}
              alt="AI Monitor Logo"
              className="w-10 h-10 rounded-full shrink-0"
              priority
            />
          )}
          <p className="flex flex-col min-w-0">
            <span className="text-primary text-sm font-medium truncate">
              {name}
            </span>
            <span className="text-secondary text-xs truncate">{email}</span>
          </p>
        </div>
      </div>
    </aside>
  );
}
