"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { SelectedFile, UploadStep } from "@/types/upload";

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

const ACCEPTED_TYPES = [
  "video/mp4",
  "video/avi",
  "video/quicktime",
  "video/x-msvideo",
];
const MAX_SIZE_BYTES = 500 * 1024 * 1024;

interface UseGenericUploadProps {
  apiCallback?: (file: File) => Promise<any>;
  onSuccess?: (result?: any) => void;
  redirectRoute?: string;
  mockMode?: boolean;
}

export function useGenericVideoUpload({
  apiCallback,
  onSuccess,
  redirectRoute,
  mockMode = false,
}: UseGenericUploadProps = {}) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState<UploadStep>("idle");
  const [selectedFile, setSelectedFile] = useState<SelectedFile | null>(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

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

  const openFilePicker = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const onFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) processFile(file);
      e.target.value = "";
    },
    [processFile],
  );

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

  const removeFile = useCallback(() => {
    setSelectedFile(null);
    setStep("idle");
    setError(null);
  }, []);

  const animateProgress = useCallback(
    (from: number, to: number, durationMs: number): Promise<void> => {
      return new Promise((resolve) => {
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
            resolve();
          }
        }, intervalMs);
      });
    },
    [],
  );

  const startAnalysis = useCallback(async () => {
    if (!selectedFile) return;

    setError(null);
    setStep("uploading");
    setProgress(0);
    await animateProgress(0, 100, 2500);
    setStep("detecting");
    setProgress(0);

    try {
      let result = null;
      if (mockMode) {
        // simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } else if (apiCallback) {
        result = await apiCallback(selectedFile.file);
      }

      setStep("done");
      if (onSuccess) {
        onSuccess(result);
      }
      if (redirectRoute) {
        router.push(redirectRoute);
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong.";
      setError(message);
      setStep("file-selected");
      setProgress(0);
    }
  }, [
    selectedFile,
    animateProgress,
    apiCallback,
    mockMode,
    onSuccess,
    redirectRoute,
    router,
  ]);

  return {
    step,
    selectedFile,
    progress,
    error,
    isDragging,
    fileInputRef,
    openFilePicker,
    onFileInputChange,
    onDragOver,
    onDragLeave,
    onDrop,
    removeFile,
    startAnalysis,
  };
}
