export type UploadStep =
  | "idle"
  | "file-selected"
  | "uploading"
  | "detecting"
  | "done";

export interface SelectedFile {
  name: string;
  size: number; // bytes
  sizeFormatted: string; // e.g. "147.31 KB"
  file: File;
}

export interface UploadProgress {
  step: UploadStep;
  percent: number; // 0-100
}
