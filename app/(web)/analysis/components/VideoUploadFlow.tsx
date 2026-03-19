"use client";

import { useVideoUpload } from "@/hooks/useVideoUpload";
import DropZone from "./DropZone";
import ProgressLoader from "./ProgressLoader";

export default function VideoUploadFlow() {
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
  } = useVideoUpload();

  // Show loader screens during upload/detection
  if (step === "uploading" || step === "detecting") {
    return (
      <div className="w-full">
        <ProgressLoader step={step} progress={progress} />
      </div>
    );
  }

  // Show drop zone for idle and file-selected states
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
      />
    </div>
  );
}
