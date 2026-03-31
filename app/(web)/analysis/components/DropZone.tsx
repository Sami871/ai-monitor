import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SelectedFile } from "@/types/upload";
import Image from "next/image";

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
        <Image src="/icons/upload.svg" alt="Upload" width={42} height={42} />
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
          <div className="shrink-0">
            <Image src="/icons/video-white.svg" alt="Video" width={32} height={32} />
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
