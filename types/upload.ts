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
  filename: string;
  metadata: {
    file_size: string;
    duration: string;
  };
  summary: Array<{
    type: string;
    count: number;
    avg_confidence: string;
  }>;
  cloudinary_url: string;
}

export interface BehaviourResult {
  filename: string;
  metadata: {
    duration: string;
    file_size?: string;
  };
  counts: {
    person: number;
    sitting: number;
    standing: number;
  };
  cloudinary_url: string;
}
