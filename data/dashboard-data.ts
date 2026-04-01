export interface DashboardStat {
  id: string;
  title: string;
  count: number;
  change: string; // e.g. "+10% from yesterday"
  changeType: "positive" | "negative" | "neutral";
  icon: "activity" | "human" | "vehicle" | "animal" | "bird";
  iconColor: string;
  /** If true, renders as a smaller stacked card (Animals + Birds on the right) */
  compact?: boolean;
}

export interface TrendPoint {
  time: string; // "00:00", "02:00" etc.
  humans: number;
  vehicles: number;
}

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timeAgo: string;
}

export interface DonutSegment {
  label: string;
  value: number;
  color: string;
}

// ── Stat Cards ──────────────────────────────────────────────
export const DASHBOARD_STATS: DashboardStat[] = [
  {
    id: "total",
    title: "Total Detections",
    count: 10229,
    change: "+10% from yesterday",
    changeType: "positive",
    icon: "activity",
    iconColor: "text-[#2a6ef5]",
  },
  {
    id: "humans",
    title: "Humans Detected",
    count: 10229,
    change: "+10% from yesterday",
    changeType: "positive",
    icon: "human",
    iconColor: "text-[#22c55e]",
  },
  {
    id: "vehicles",
    title: "Vehicles Detected",
    count: 10229,
    change: "+10% from yesterday",
    changeType: "positive",
    icon: "vehicle",
    iconColor: "text-[#f59e0b]",
  },
];

export const COMPACT_STATS: DashboardStat[] = [
  {
    id: "animals",
    title: "Animals Detected",
    count: 10229,
    change: "",
    changeType: "neutral",
    icon: "animal",
    iconColor: "text-[#ef4444]",
    compact: true,
  },
  {
    id: "birds",
    title: "Birds Detected",
    count: 10229,
    change: "",
    changeType: "neutral",
    icon: "bird",
    iconColor: "text-[#a855f7]",
    compact: true,
  },
];

// ── Trend Chart Data ─────────────────────────────────────────
export const TREND_DATA: TrendPoint[] = [
  { time: "00:00", humans: 5, vehicles: 2 },
  { time: "02:00", humans: 8, vehicles: 4 },
  { time: "04:00", humans: 12, vehicles: 6 },
  { time: "06:00", humans: 45, vehicles: 30 },
  { time: "08:00", humans: 110, vehicles: 85 },
  { time: "10:00", humans: 130, vehicles: 100 },
  { time: "12:00", humans: 150, vehicles: 120 },
  { time: "14:00", humans: 140, vehicles: 110 },
  { time: "16:00", humans: 120, vehicles: 95 },
  { time: "18:00", humans: 90, vehicles: 70 },
  { time: "20:00", humans: 50, vehicles: 35 },
  { time: "22:00", humans: 20, vehicles: 10 },
  { time: "23:00", humans: 8, vehicles: 5 },
];

// ── Recent Activity ──────────────────────────────────────────
export const RECENT_ACTIVITY: ActivityItem[] = [
  {
    id: "1",
    title: "Detection Alert #1001",
    description: "Camera 01 • Human detected in restricted zone",
    timeAgo: "5 min ago",
  },
  {
    id: "2",
    title: "Detection Alert #1002",
    description: "Camera 02 • Vehicle detected in loading area",
    timeAgo: "10 min ago",
  },
  {
    id: "3",
    title: "Detection Alert #1003",
    description: "Camera 02 • Multiple individuals gathering near exit",
    timeAgo: "25 min ago",
  },
  {
    id: "4",
    title: "Detection Alert #1004",
    description: "Camera 04 • Bird detected in corridor",
    timeAgo: "38 min ago",
  },
];

// ── Donut Chart ──────────────────────────────────────────────
export const DONUT_SEGMENTS: DonutSegment[] = [
  { label: "Humans", value: 40, color: "#22c55e" },
  { label: "Vehicle", value: 30, color: "#f59e0b" },
  { label: "Animals", value: 20, color: "#ef4444" },
  { label: "Birds", value: 10, color: "#a855f7" },
];

export const DONUT_TOTAL = 100;
