import type { AnalysisResult as ApiResult } from "@/types/upload";
import type {
  AnalysisResult as UIResult,
  StatCardData,
  DetectionRow,
  SourceMetadata,
} from "@/types/Analysis";

type IconKey = "human" | "vehicle" | "animal" | "bird";

interface CategoryDef {
  id: string;
  title: string;
  icon: IconKey;
  iconColor: string;
  aliases: string[];
}

const FIXED_CATEGORIES: CategoryDef[] = [
  {
    id: "humans",
    title: "Humans Detected",
    icon: "human",
    iconColor: "text-[#22c55e]",
    aliases: ["human", "humans", "person", "people", "pedestrian"],
  },
  {
    id: "vehicles",
    title: "Vehicles Detected",
    icon: "vehicle",
    iconColor: "text-[#f59e0b]",
    aliases: [
      "vehicle",
      "vehicles",
      "car",
      "truck",
      "bus",
      "bicycle",
      "bike",
      "motorbike",
      "motorcycle",
      "van",
      "suv",
    ],
  },
  {
    id: "animals",
    title: "Animals Detected",
    icon: "animal",
    iconColor: "text-[#ef4444]",
    aliases: [
      "animal",
      "animals",
      "dog",
      "cat",
      "horse",
      "cow",
      "sheep",
      "elephant",
      "bear",
      "zebra",
      "giraffe",
    ],
  },
  {
    id: "birds",
    title: "Birds Detected",
    icon: "bird",
    iconColor: "text-[#a855f7]",
    aliases: ["bird", "birds", "pigeon", "sparrow", "eagle", "duck"],
  },
];

function findCategory(type: string): CategoryDef | null {
  const lower = type.toLowerCase();
  return FIXED_CATEGORIES.find((cat) => cat.aliases.includes(lower)) ?? null;
}

function parseConfidence(avgPct: string): {
  level: "High" | "Medium" | "Low";
  range: string;
} {
  const pct = parseFloat(avgPct);
  if (pct >= 80) return { level: "High", range: ">80%" };
  if (pct >= 60) return { level: "Medium", range: ">60%" };
  return { level: "Low", range: "<60%" };
}

function todayString(): string {
  return new Date().toLocaleDateString("en-US");
}

export function mapApiResultToUI(api: ApiResult): UIResult {
  const stats: StatCardData[] = FIXED_CATEGORIES.map((cat) => {
    const matched = api.summary.filter(
      (item) => findCategory(item.type)?.id === cat.id,
    );

    const totalCount = matched.reduce((sum, item) => sum + item.count, 0);
    const { level, range } =
      matched.length > 0
        ? (() => {
            const weightedSum = matched.reduce((sum, item) => {
              return sum + parseFloat(item.avg_confidence) * item.count;
            }, 0);
            const totalItems = matched.reduce((s, i) => s + i.count, 0) || 1;
            const avgPct = `${(weightedSum / totalItems).toFixed(1)}%`;
            return parseConfidence(avgPct);
          })()
        : { level: "High" as const, range: ">80%" };

    return {
      id: cat.id,
      title: cat.title,
      count: totalCount,
      confidence: level,
      confidenceRange: range,
      icon: cat.icon,
      iconColor: cat.iconColor,
    };
  });

  const detections: DetectionRow[] = api.summary.map((item) => {
    const cat = findCategory(item.type);
    return {
      type: item.type.charAt(0).toUpperCase() + item.type.slice(1),
      icon: cat?.icon ?? "vehicle",
      iconColor: cat?.iconColor ?? "text-[#6b7280]",
      detectionCount: item.count,
      avgConfidence: item.avg_confidence,
    };
  });

  const metadata: SourceMetadata = {
    filename: api.filename,
    fileSize: api.metadata.file_size,
    duration: api.metadata.duration,
    uploadDate: todayString(),
    videoUrl: api.cloudinary_url ?? undefined,
  };

  return { stats, detections, metadata };
}
