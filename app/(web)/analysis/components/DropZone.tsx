import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SelectedFile } from "@/types/upload";

interface DropZoneProps {
  selectedFile: SelectedFile | null;
  isDragging: boolean;
  error: string | null;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent) => void;
  onZoneClick: () => void;
  onRemoveFile: () => void;
  onSelectFile: () => void;
  onStartAnalysis: () => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onFileInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function DropZone({
  selectedFile,
  isDragging,
  error,
  onDragOver,
  onDragLeave,
  onDrop,
  onZoneClick,
  onRemoveFile,
  onSelectFile,
  onStartAnalysis,
  fileInputRef,
  onFileInputChange,
}: DropZoneProps) {
  const hasFile = !!selectedFile;

  return (
    <div
      className={cn(
        "relative w-full mx-auto mt-10",
        "rounded-2xl border-4 border-default border-dashed",
        "flex flex-col items-center justify-center",
        "gap-6 p-12",
        isDragging ? "border-[#3B82F6]" : "border-default",
        "min-h-[326px] max-w-[860px]",
      )}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={!hasFile ? onZoneClick : undefined}
    >
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="video/mp4,video/avi,video/quicktime,.mp4,.avi,.mov"
        className="hidden"
        onChange={onFileInputChange}
      />

      {/* Upload icon */}
      <div className="w-20 h-20 min-w-[80px] min-h-[80px] rounded-full flex items-center justify-center bg-secondary">
        <svg
          className="w-7 h-7 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
      </div>

      {/* Text */}
      <div className="flex flex-col items-center gap-2 text-center">
        <h2 className="text-priamry text-lg font-semibold">
          Drag &amp; Drop or Click to Upload
        </h2>
        <p className="text-[#8b909a] text-sm">
          Support for MP4, AVI, MOV formats. Max file siz 500MB.
        </p>
      </div>

      {/* Error */}
      {error && <p className="text-[#ef4444] text-xs text-center">{error}</p>}

      {/* File chip - shown after file selected */}
      {hasFile && (
        <div
          className="flex items-center gap-3 border border-secondary bg-secondary rounded-xl px-4 py-3 w-full max-w-sm"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Video file icon */}
          <div className="shrink-0 text-secondary">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <path d="M10 11l5 3-5 3v-6z" />
            </svg>
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-primary text-sm font-medium truncate">
              {selectedFile.name}
            </p>
            <p className="text-secondary text-xs mt-0.5">
              {selectedFile.sizeFormatted}
            </p>
          </div>

          {/* Remove button */}
          <button
            onClick={onRemoveFile}
            className="shrink-0 text-primary hover:text-white transition-colors p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* CTA button */}
      {!hasFile ? (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelectFile();
          }}
          className="w-[205px] h-[48px] bg-blue flex items-center justify-center rounded-xl text-white text-base font-semibold hover:opacity-90"
        >
          Select Video File
        </button>
      ) : (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onStartAnalysis();
          }}
          className="min-w-[205px] h-[48px] bg-blue flex justify-center items-center rounded-xl text-white text-base font-semibold transition-colors duration-150 hover:opacity-90 w-full max-w-sm"
        >
          Start Analysis
        </button>
      )}
    </div>
  );
}
