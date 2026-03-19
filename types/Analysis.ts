export type DetectionType = "Human" | "Vehicle" | "Animal" | "Bird";
export type ConfidenceLevel = "High" | "Medium" | "Low";

export interface StatCardData {
  id: string;
  title: string;
  count: number;
  confidence: ConfidenceLevel;
  confidenceRange: string; // e.g. ">90%"
  icon: "human" | "vehicle" | "animal" | "bird";
  iconColor: string; // tailwind text color class
}

export interface DetectionRow {
  type: DetectionType;
  icon: "human" | "vehicle" | "animal" | "bird";
  iconColor: string;
  detectionCount: number;
  avgConfidence: string; // e.g. "98.2%"
}

export interface SourceMetadata {
  filename: string;
  fileSize: string;
  duration: string;
  uploadDate: string;
  thumbnailUrl?: string;
}

export interface AnalysisResult {
  stats: StatCardData[];
  detections: DetectionRow[];
  metadata: SourceMetadata;
}
