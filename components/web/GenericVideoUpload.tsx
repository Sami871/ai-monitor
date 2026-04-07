"use client";

import { useGenericVideoUpload } from "@/hooks/useGenericVideoUpload";
import DropZone from "./DropZone";
import ProgressLoader from "./ProgressLoader";

interface GenericVideoUploadProps {
  apiCallback?: (file: File) => Promise<any>;
  onSuccess?: (result?: any) => void;
  redirectRoute?: string;
  mockMode?: boolean;
  dropZoneTitle?: string;
}

export default function GenericVideoUpload({
  apiCallback,
  onSuccess,
  redirectRoute,
  mockMode = false,
  dropZoneTitle = "Drag & Drop or Click to Upload",
}: GenericVideoUploadProps) {
  const {
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
  } = useGenericVideoUpload({ apiCallback, onSuccess, redirectRoute, mockMode });

  if (step === "uploading" || step === "detecting") {
    return (
      <div className="w-full">
        <ProgressLoader step={step} progress={progress} />
      </div>
    );
  }

  return (
    <div className="w-full mx-auto">
      <DropZone
        selectedFile={selectedFile}
        isDragging={isDragging}
        error={error}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onZoneClick={openFilePicker}
        onRemoveFile={removeFile}
        onSelectFile={openFilePicker}
        onStartAnalysis={startAnalysis}
        fileInputRef={fileInputRef}
        onFileInputChange={onFileInputChange}
        title={dropZoneTitle}
      />
    </div>
  );
}
