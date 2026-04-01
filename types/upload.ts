export type UploadStep =
  | "idle"
  | "file-selected"
  | "uploading"
  | "detecting"
  | "done";

export interface SelectedFile {
  name: string;
  size: number;
  sizeFormatted: string;
  file: File;
}

export interface UploadProgress {
  step: UploadStep;
  percent: number;
}

export interface AnalysisResult {
  message: string;
  filename: string;
  metadata: {
    file_size: string;
    duration: string;
    resolution: string;
    fps: number;
  };
  summary: Array<{
    type: string;
    count: number;
    avg_confidence: string;
  }>;
  counts: Record<string, number>;
  cloudinary_url: string;
  download_url: string;
}
