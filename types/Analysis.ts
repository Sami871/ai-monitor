export type DetectionType = "Human" | "Vehicle" | "Animal" | "Bird" | string;
export type ConfidenceLevel = "High" | "Medium" | "Low";

export interface StatCardData {
  id: string;
  title: string;
  count: number;
  confidence: ConfidenceLevel;
  confidenceRange: string;
  icon: "human" | "vehicle" | "animal" | "bird";
  iconColor: string;
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
  videoUrl?: string;
}

export interface AnalysisResult {
  stats: StatCardData[];
  detections: DetectionRow[];
  metadata: SourceMetadata;
}
