"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { SelectedFile, UploadStep } from "@/types/upload";

// Formats bytes into human-readable string
function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

// Accepted video MIME types
const ACCEPTED_TYPES = [
  "video/mp4",
  "video/avi",
  "video/quicktime",
  "video/x-msvideo",
];
const MAX_SIZE_BYTES = 500 * 1024 * 1024; // 500 MB

export function useVideoUpload() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState<UploadStep>("idle");
  const [selectedFile, setSelectedFile] = useState<SelectedFile | null>(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Validate and set file
  const processFile = useCallback((file: File) => {
    setError(null);

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError("Unsupported format. Please upload MP4, AVI, or MOV.");
      return;
    }
    if (file.size > MAX_SIZE_BYTES) {
      setError("File exceeds 500MB limit.");
      return;
    }

    setSelectedFile({
      name: file.name,
      size: file.size,
      sizeFormatted: formatFileSize(file.size),
      file,
    });
    setStep("file-selected");
  }, []);

  // Trigger native file picker
  const openFilePicker = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  // Handle file input change
  const onFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) processFile(file);
      // Reset input so same file can be re-selected
      e.target.value = "";
    },
    [processFile],
  );

  // Drag events
  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files?.[0];
      if (file) processFile(file);
    },
    [processFile],
  );

  // Remove selected file
  const removeFile = useCallback(() => {
    setSelectedFile(null);
    setStep("idle");
    setError(null);
  }, []);

  // Simulate upload progress with setTimeout
  const simulateProgress = useCallback(
    (from: number, to: number, durationMs: number, onComplete: () => void) => {
      const steps = 20;
      const intervalMs = durationMs / steps;
      const increment = (to - from) / steps;
      let current = from;
      let count = 0;

      const interval = setInterval(() => {
        count++;
        current = Math.min(from + increment * count, to);
        setProgress(Math.round(current));

        if (count >= steps) {
          clearInterval(interval);
          onComplete();
        }
      }, intervalMs);
    },
    [],
  );

  // Start the full upload + detection flow
  const startAnalysis = useCallback(() => {
    if (!selectedFile) return;

    // Step 1: Uploading to server (0 → 100% over ~3s)
    setStep("uploading");
    setProgress(0);

    simulateProgress(0, 100, 3000, () => {
      // Step 2: Running object detection (0 → 100% over ~3s)
      setStep("detecting");
      setProgress(0);

      simulateProgress(0, 100, 3000, () => {
        // Step 3: Done — navigate to results
        setStep("done");
        router.push("/analysis/results");
      });
    });
  }, [selectedFile, simulateProgress, router]);

  return {
    // State
    step,
    selectedFile,
    progress,
    error,
    isDragging,
    fileInputRef,
    // Actions
    openFilePicker,
    onFileInputChange,
    onDragOver,
    onDragLeave,
    onDrop,
    removeFile,
    startAnalysis,
  };
}
